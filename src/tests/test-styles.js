/* eslint-disable no-unused-vars */
import { expect } from 'https://cdn.jsdelivr.net/npm/chai@5.1.1/chai.js';
import { $style } from './utils.js';

mocha.setup({ ui: 'bdd', reporter: 'spec' });

const isWMedium = window.innerWidth >= 768;

/**
 * Utility function to test styles of a single element or a collection of elements.
 * @param {string|HTMLElement|NodeList} selectorOrElement - CSS selector, single element, or a NodeList.
 * @param {object} styles - An object where keys are style labels and values are arrays of [prop, smallVal, mediumVal] or [prop, expectedVal].
 * @param {object} [uniqueAssertions={}] - An object of custom test assertions.
 */
function testElementStyles(selectorOrElement, styles, uniqueAssertions = {}) {
  const elements = selectorOrElement instanceof NodeList ?
    Array.from(selectorOrElement) : [document.querySelector(selectorOrElement)];
  
  if (elements.length === 0 || elements[0] === null) {
    it(`should exist`, () => expect(elements[0]).to.exist);
    return;
  }
  
  elements.forEach((el, index) => {
    const desc = elements.length > 1 ? `Element #${index + 1}` : el.tagName + (el.className ? `.${el.className}` : '');
    describe(desc, () => {
      it('should exist', () => expect(el).to.exist);
      
      for (const [label, props] of Object.entries(styles)) {
        describe(label, () => {
          props.forEach(([prop, smallVal, mediumVal]) => {
            const expected = mediumVal !== undefined && isWMedium ? mediumVal : smallVal;
            it(`should have "${prop}" = "${expected}"`, () => {
              const computed = getComputedStyle(el)[prop];
              
              // Corrected logic: Handle boxShadow as a string
              if (prop === 'boxShadow' || !expected.endsWith('px')) {
                expect(computed).to.equal(expected);
              } else {
                const actual = parseFloat(computed);
                const expectedPx = parseFloat(expected);
                expect(actual).to.be.closeTo(expectedPx, 0.6, `${prop} ≠ ${expected}`);
              }
            });
          });
        });
      }
      
      for (const [assertLabel, assertFunc] of Object.entries(uniqueAssertions)) {
        it(assertLabel, () => assertFunc(el));
      }
    });
  });
}

// ─────────────────────────────────────────────
// Shared styles & data objects
const styleData = {
  'body': {
    'Typography': [
      ['color', 'rgb(30, 41, 59)'],
      ['fontFamily', 'Inter, sans-serif'],
      ['fontSize', '13.6px'],
      ['lineHeight', '20.4px']
    ],
    'Layout': [
      ['paddingTop', '16px', '32px'],
      ['paddingRight', '16px', '32px'],
      ['paddingBottom', '16px', '32px'],
      ['paddingLeft', '16px', '32px']
    ],
    'Appearance': [
      ['backgroundColor', 'rgb(241, 245, 249)']
    ]
  },
  '.supblock': {
    'Layout': [
      ['maxWidth', '1280px'],
      ['marginLeft', '0px'],
      ['marginRight', '0px']
    ],
    'Appearance': [
      ['backgroundColor', 'rgb(255, 255, 255)'],
      ['borderRadius', '12px'],
    ],
    'Padding': [
      ['paddingTop', '16px', '32px'],
      ['paddingRight', '16px', '32px'],
      ['paddingBottom', '16px', '32px'],
      ['paddingLeft', '16px', '32px']
    ]
  },
  '.supblock__container': {
    'Layout': [
      ['paddingTop', '24px'],
      ['paddingRight', '24px'],
      ['paddingBottom', '24px'],
      ['paddingLeft', '24px'],
    ],
    'Appearance': [
      ['backgroundColor', 'rgb(248, 250, 252)'],
      ['borderColor', 'rgb(226, 232, 240)'],
      ['borderStyle', 'solid'],
      ['borderRadius', '8px']
    ]
  },
  '.supblock__card': {
    'Layout': [
      ['paddingTop', '16px'],
      ['paddingRight', '16px'],
      ['paddingBottom', '16px'],
      ['paddingLeft', '16px'],
      ['marginBottom', '16px']
    ],
    'Appearance': [
      ['backgroundColor', 'rgb(255, 255, 255)'],  // bg-white
      ['borderRadius', '8px'], // rounded-lg is 0.5rem
    ],
  },
};

// ─────────────────────────────────────────────
// Test Suite: Body & Supblocks
describe('HTML Showcase: Block and Container Tests', () => {
  
  // Global body and layout checks
  describe('body Element', () => {
    testElementStyles('body', styleData['body']);
  });
  
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
      // find out why this works even thou on desktop some subblocks are full width some are not 
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
  
  // --- Header Supblock Tests ---
  describe('Header Supblock (.supblock--header)', () => {
    const selector = '.supblock--header';
    testElementStyles(selector, {
      ...styleData['.supblock'],
      'Unique Properties': [
        ['marginBottom', '32px']
      ]
    });
    testElementStyles(document.querySelectorAll(`${selector} .supblock__container`), styleData['.supblock__container']);
    testElementStyles(document.querySelectorAll(`${selector} .supblock__card`), styleData['.supblock__card']);
  });
  
  // --- Main Supblock Tests ---
  describe('Main Supblock (.supblock--main)', () => {
    const selector = '.supblock--main';
    testElementStyles(selector, {
      ...styleData['.supblock'],
      'Unique Properties': [
        ['marginBottom', '32px']
      ]
    });
    testElementStyles(document.querySelectorAll(`${selector} .supblock__container`), styleData['.supblock__container']);
    testElementStyles(document.querySelectorAll(`${selector} .supblock__card`), styleData['.supblock__card']);
  });
  
  // --- Footer Supblock Tests ---
  describe('Footer Supblock (.supblock--footer)', () => {
    const selector = '.supblock--footer';
    testElementStyles(selector, {
      ...styleData['.supblock'],
      'Unique Properties': [
        ['marginBottom', '0px']
      ]
    });
    testElementStyles(document.querySelectorAll(`${selector} .supblock__container`), styleData['.supblock__container'], {
      'should span full width': (el) => {
        const parent = el.parentElement;
        const w1 = el.getBoundingClientRect().width;
        const w2 = parent.getBoundingClientRect().width;
        expect(Math.abs(w1 - w2)).to.be.lessThan(2);
      }
    });
    testElementStyles(document.querySelectorAll(`${selector} .supblock__card`), styleData['.supblock__card']);
  });
});

// Run the tests
mocha.run();