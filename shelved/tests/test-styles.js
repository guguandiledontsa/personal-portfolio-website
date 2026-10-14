/* eslint-disable no-unused-vars */
import { expect } from 'https://cdn.jsdelivr.net/npm/chai@5.1.1/chai.js';
import { $style, $filteredStyles, styleData, supblockConfigs } from './utils.js';

const isWMedium = window.innerWidth >= 768;

mocha.setup({ ui: 'bdd', reporter: 'spec' });

function testElementStyles(selectorOrElement, styles, uniqueAssertions = {}, context = '') {
  const elements = typeof selectorOrElement === 'string' ?
    Array.from(document.querySelectorAll(selectorOrElement)) :
    (selectorOrElement instanceof NodeList ? Array.from(selectorOrElement) : [selectorOrElement]);
  
  if (elements.length === 0 || elements[0] == null) {
    describe(context || selectorOrElement, () => {
      it('should exist on the page', () => expect(elements[0], `Element with selector "${selectorOrElement}" was not found`).to.exist);
    });
    return;
  }
  
  elements.forEach((el, index) => {
    const selectorClass = (typeof selectorOrElement === 'string' && selectorOrElement.startsWith('.')) ? selectorOrElement.slice(1) : '';
    const allClasses = [...el.classList];
    const filteredClasses = selectorClass ? allClasses.filter(c => c !== selectorClass) : allClasses;
    const count = elements.length > 1 ? ` (${index + 1} of ${elements.length})` : '';
    const mainClass = selectorClass ? `.${selectorClass}` : allClasses.length ? `.${allClasses[0]}` : el.tagName.toLowerCase();
    
    const textContent = el.textContent.trim().replace(/\s+/g, ' ');
    const textSnippet = textContent.length > 0 ?
      ` [Text: "${textContent.substring(0, 30)}${textContent.length > 30 ? '...' : ''}"]` :
      el.id ? ` #${el.id}` : '';
    
    const classListSnippet = filteredClasses.length ? ` [Classes: "${filteredClasses.join(' ')}"]` : '';
    const desc = `${mainClass}${count}${textSnippet}${classListSnippet}`;
    
    describe(desc, () => {
      it('should exist', () => expect(el).to.exist);
      
      for (const [label, props] of Object.entries(styles)) {
        describe(`Category: ${label}`, () => {
          if (!Array.isArray(props)) {
            it(`should have a valid array of styles for "${label}"`, () => {
              throw new Error(`Expected array of [prop, val] tuples for "${label}", but got ${typeof props}`);
            });
            return;
          }
          
          props.forEach(([prop, smallVal, mediumVal]) => {
            const isResponsiveTest = typeof mediumVal !== 'undefined' && typeof isWMedium !== 'undefined' && isWMedium;
            const expected = isResponsiveTest ? mediumVal : smallVal;
            const viewportContext = isResponsiveTest ? ' (on medium screen)' : '';
            
            it(`should have ${prop}: "${expected}"${viewportContext}`, () => {
              const verboseMessage = `\n${JSON.stringify($filteredStyles(el), null, 2)}\n`;
              const computed = getComputedStyle(el)[prop];
              expect(computed, `The property "${prop}" did not return a value. ${verboseMessage}`).to.not.be.empty;
              
              if (prop === 'boxShadow' || !expected.endsWith('px')) {
                expect(computed, `Expected ${prop} to be "${expected}", but got "${computed}". ${verboseMessage}`).to.equal(expected);
              } else {
                expect(parseFloat(computed)).to.be.closeTo(parseFloat(expected), 0.6,
                  `Expected ${prop} to be ~${expected}, but got ${computed}. ${verboseMessage}`);
              }
            });
          });
        });
      }
      
      for (const [assertLabel, assertFunc] of Object.entries(uniqueAssertions))
        it(assertLabel, () => assertFunc(el));
    });
  });
}

describe('Block and Container Tests', () => {
  describe('body Element', () => {
    testElementStyles('body', styleData['body']);
  });
  
  describe('tests for elements of supblock modifiers', () => {
    testElementStyles(`.supblock--header .card__code-block`, styleData['.card__code-block']);
    testElementStyles(`.supblock--header .card__subtitle`, styleData['.card__subtitle']);
    testElementStyles(`.supblock--main .card__figcaption`, styleData['.card__figcaption']);
    testElementStyles(`.supblock--main .card__label`, styleData['.card__label']);
    testElementStyles(`.supblock--main .card__form`, styleData['.card__form']);
    testElementStyles(`.supblock--main .card__media`, styleData['.card__media']);
    
    // testElementStyles(`.supblock--main .card__input`, styleData['.card__input']);
    // testElementStyles(`.supblock--main .card__fieldset`, styleData['.card__fieldset']);
  });
  
  // --- Global Supblock Assertions Setup ---
  let allSupblocks = [];
  before(() => {
    allSupblocks = document.querySelectorAll('.supblock');
    expect(allSupblocks.length).to.be.at.least(3, 'At least 3 supblock elements must exist.');
  });
  
  describe('Global Supblock Assertions', () => {
    it('should have consistent horizontal padding', () => {
      const pL = $style('.supblock', 'padding-left');
      const pR = $style('.supblock', 'padding-right');
      expect(pL).to.equal(pR);
    });
    
    it('should have matching widths', () => {
      const widths = Array.from(allSupblocks).map(b => b.getBoundingClientRect().width);
      expect(new Set(widths).size).to.equal(1, 'All supblocks should have the same width.');
    });
    
    it('should not visually overlap', () => {
      const isOverlapping = (a, b) => {
        const rA = a.getBoundingClientRect();
        const rB = b.getBoundingClientRect();
        return !(rA.bottom <= rB.top || rA.top >= rB.bottom);
      };
      const anyOverlap = Array.from(allSupblocks).some((a, i) =>
        Array.from(allSupblocks).slice(i + 1).some(b => isOverlapping(a, b))
      );
      expect(anyOverlap).to.be.false;
    });
  });
  
  // --- Dynamic Supblock Tests using a Loop (The Cleaned-Up Part) ---
  supblockConfigs.forEach(config => {
    const selector = `.supblock--${config.modifier}`;
    
    describe(`(${selector})`, () => {
      // Test the main supblock
      testElementStyles(selector, {
        ...styleData['.supblock'],
        'Unique Properties': [
          ['marginBottom', config.marginBottom]
        ]
      });
      
      // Test container, card, title, and subtitle
      testElementStyles(`${selector} .supblock__container`, styleData['.supblock__container'], config.assertions, selector);
      testElementStyles(`${selector} .supblock__card`, styleData['.supblock__card'], {}, selector);
      testElementStyles(`${selector} .card__title`, styleData['.card__title'], {}, selector);
      if (config.modifier !== 'main') {
        testElementStyles(`${selector} .card__inline-link`, styleData['.card__inline-link'], {}, selector);
      }
      
      if (config.modifier === 'footer') {
        // testElementStyles(`.supblock--main .card__audio`, styleData['.card__audio'], config.assertions, '.supblock--main');
        testElementStyles(`.supblock--main .card__image`, styleData['.card__image'], config.assertions, '.supblock--main');
      }
    });
  });
  
});

mocha.run();