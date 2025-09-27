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
 * @param {string} [context=''] - Optional context string (e.g., a parent selector) to add to descriptions.
 */
function testElementStyles(selectorOrElement, styles, uniqueAssertions = {}, context = '') {
  const elements = typeof selectorOrElement === 'string' ?
    Array.from(document.querySelectorAll(selectorOrElement)) :
    (selectorOrElement instanceof NodeList ? Array.from(selectorOrElement) : [selectorOrElement]);
  
  if (elements.length === 0 || elements[0] === null) {
    describe(context || selectorOrElement, () => {
      it('should exist on the page', () => {
        expect(elements[0], `Element with selector "${selectorOrElement}" was not found`).to.exist;
      });
    });
    return;
  }
  
  elements.forEach((el, index) => {
    const mainClass = el.className ? '.' + el.className.split(' ')[0] : el.tagName.toLowerCase();
    const count = elements.length > 1 ? ` (${index + 1} of ${elements.length})` : '';
    
    let elementTextSnippet = '';
    const textContent = el.textContent.trim().replace(/\s+/g, ' '); // Normalize whitespace
    
    if (textContent.length > 0) {
      elementTextSnippet = ` [Text: "${textContent.substring(0, 30)}${textContent.length > 30 ? '...' : ''}"]`;
    } else if (el.id) {
      elementTextSnippet = ` #${el.id}`;
    }
    const desc = `${mainClass}${count}${elementTextSnippet}`;
    
    describe(desc, () => {
      it('should exist', () => expect(el).to.exist);
      
      for (const [label, props] of Object.entries(styles)) {
        describe(`Category: ${label}`, () => {
          props.forEach(([prop, smallVal, mediumVal]) => {
            const isResponsiveTest = mediumVal !== undefined && isWMedium;
            const expected = isResponsiveTest ? mediumVal : smallVal;
            const viewportContext = isResponsiveTest ? ' (on medium screen)' : '';
            
            it(`should have ${prop}: "${expected}"${viewportContext}`, () => {
              const computed = getComputedStyle(el)[prop];
              
              expect(computed, `The property "${prop}" did not return a value.`).to.not.be.empty;
              
              if (prop === 'boxShadow' || !expected.endsWith('px')) {
                expect(computed).to.equal(expected);
              } else {
                const actual = parseFloat(computed);
                const expectedPx = parseFloat(expected);
                
                expect(actual).to.be.closeTo(expectedPx, 0.6,
                  `Expected ${prop} to be ~${expected}, but got ${computed}`);
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
      ['marginLeft', '0px'], // should be auto on desktop
      ['marginRight', '0px'], // ..., auto
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
      ['backgroundColor', 'rgb(255, 255, 255)'], // bg-white
      ['borderRadius', '8px'], // rounded-lg is 0.5rem
    ],
  },
  '.card__title': {
    'Typography': [
      ['fontWeight', '600'], // font-semibold
      ['fontSize', '15.8px'], // text-lg should be 18px
      ['lineHeight', '23.8px'] // default line-height for text-lg should be 28px
    ]
  },
  '.card__subtitle': {
    'Typography': [
      ['fontSize', '11.9px'], // text-sm should be 14px
      ['color', 'rgb(71, 85, 105)'], // text-slate-600
    ]
  },
  'h2': {
    'Typography': [
      ['fontSize', '36px'], // text-4xl
      ['fontWeight', '700'], // font-bold
      ['lineHeight', '40px'] // default line-height
    ],
    'Layout': [
      ['marginBottom', '24px'] // mb-6
    ]
  },
  'h3': {
    'Typography': [
      ['fontSize', '24px'], // text-2xl
      ['fontWeight', '700'], // font-bold
      ['lineHeight', '32px'] // default line-height
    ],
    'Layout': [
      ['marginBottom', '16px'] // mb-4
    ]
  },
  // new elements ↓
  '.card__label': {
    'Typography': [
      ['fontSize', '12px'], // text-xs
      ['fontWeight', '500'], // font-medium
      ['color', 'rgb(100, 116, 139)'], // text-slate-500
    ],
    'Layout': [
      ['display', 'block'],
    ]
  },
  
  '.card__code-block': {
    'Appearance': [
      ['backgroundColor', 'rgb(30, 41, 59)'], // slate-800
      ['color', 'rgb(248, 250, 252)'], // slate-50
      ['borderRadius', '6px'], // rounded-md
    ],
    'Layout': [
      ['padding', '12px'], // p-3 (12px)
      ['marginTop', '8px'], // mt-2
      ['overflowX', 'auto']
    ],
    'Typography': [
      ['fontSize', '12px'], // text-xs
    ]
  },
  '.card__figcaption': {
    'Typography': [
      ['fontSize', '14px'], // text-sm
      ['color', 'rgb(100, 116, 139)'], // text-slate-500
      ['fontStyle', 'italic'],
    ],
    'Layout': [
      ['marginBottom', '8px'], // mb-2
    ]
  },
  '.card__image': {
    'Layout': [
      ['width', '100%'], // w-full
      ['borderRadius', '6px'], // rounded-md
    ]
  },
  '.card__media': {
    'Layout': [
      ['marginTop', '8px'], // mt-2
    ],
    'Appearance': [
      ['borderRadius', '6px'], // rounded-md
      ['backgroundColor', 'rgb(226, 232, 240)'], // bg-slate-200
    ]
  },
  '.card__audio': {
    'Layout': [
      ['width', '100%'], // w-full
      ['marginTop', '16px'], // mt-4
    ]
  },
  '.card__form': {
    'Layout': [
      ['marginTop', '8px'], // mt-2
      // space-y-3 (12px gap) is tricky to test on the form element itself
    ]
  },
  '.card__fieldset': {
    'Layout': [
      ['padding', '12px'], // p-3
      ['borderRadius', '6px'], // rounded-md
      ['borderWidth', '1px'] // border
    ],
    'Appearance': [
      ['borderColor', 'rgb(203, 213, 225)'], // border-slate-300
      ['borderStyle', 'solid']
    ]
  },
}

// ─────────────────────────────────────────────

// Configuration for the Supblock loop
const supblockConfigs = [
{
  modifier: 'header',
  marginBottom: '32px',
  assertions: {}
},
{
  modifier: 'main',
  marginBottom: '32px',
  assertions: {}
},
{
  modifier: 'footer',
  marginBottom: '0px',
  assertions: {
    'container should span full width': (el) => {
      const containerEl = el.querySelector('.supblock__container');
      if (!containerEl) return;
      const parentWidth = el.getBoundingClientRect().width;
      const elWidth = containerEl.getBoundingClientRect().width;
      expect(Math.abs(elWidth - parentWidth)).to.be.lessThan(2);
    }
  }
}];

describe('HTML Showcase: Block and Container Tests (Refactored)', () => {
  describe('body Element', () => {
    testElementStyles('body', styleData['body']);
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
      testElementStyles(`${selector} .card__subtitle`, styleData['.card__subtitle'], {}, selector);
      testElementStyles(`${selector} .card__label`, styleData['.card__label'], {}, selector);
    });
  });
  
});

mocha.run();