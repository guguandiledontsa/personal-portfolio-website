import { expect } from 'https://cdn.jsdelivr.net/npm/chai@5.1.1/chai.js';
import { $style } from './utils.js';

mocha.setup({ ui: 'bdd', reporter: 'spec' });

function testStyles(selector, label, styles) {
  const screenW = window.innerWidth;
  const isWMedium = screenW >= 768;
  
  describe(label, () => {
    // Add a check to ensure the element exists before running style tests
    it('should exist on the page', () => {
      const el = document.querySelector(selector);
      expect(el).to.exist;
    });
    
    styles.forEach(([prop, smallVal, mediumVal]) => {
      const expected = isWMedium && mediumVal !== undefined ? mediumVal : smallVal;
      it(`should have ${prop} = ${expected}`, () => {
        const actual = $style(selector, prop);
        expect(actual).to.equal(expected);
      });
    });
  });
}

// ─────────────────────────────────────────────
// <body> tests
// ─────────────────────────────────────────────
describe('<body> style tests', () => {
  const sel = 'body';
  // Use a special testStyles call for the body tag to show existence and styles
  testStyles(sel, '@layer typography', [
    ['color', 'rgb(30, 41, 59)'],
    ['fontFamily', 'Inter, sans-serif'],
    ['fontSize', '13.6px'],
    ['lineHeight', '20.4px']
  ]);
  
  testStyles(sel, '@layer layout', [
    ['paddingTop', '16px', '32px'],
    ['paddingRight', '16px', '32px'],
    ['paddingBottom', '16px', '32px'],
    ['paddingLeft', '16px', '32px']
  ]);
  
  testStyles(sel, '@layer appearance', [
    ['backgroundColor', 'rgb(241, 245, 249)']
  ]);
});

// ─────────────────────────────────────────────
// Common styles organized by layer
// ─────────────────────────────────────────────
const commonLayoutStyles = [
  ['marginLeft', '0px'], //tailwind class: mx-auto had no effect bc the element had no defined with or max-width 
  ['marginRight', '0px'],
  ['paddingTop', '16px', '32px'],
  ['paddingRight', '16px', '32px'],
  ['paddingBottom', '16px', '32px'],
  ['paddingLeft', '16px', '32px'],
];

const commonAppearanceStyles = [
  ['backgroundColor', 'rgb(255, 255, 255)'],
  ['borderRadius', '12px'],
  ['boxShadow', 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px'], // not testinv as not fully understood
];

describe('.supblock--header tests', () => {
  const sel = '.supblock--header';
  testStyles(sel, '@layer layout (common)', commonLayoutStyles);
  testStyles(sel, '@layer appearance (common)', commonAppearanceStyles);
  testStyles(sel, '@layer layout (unique)', [
    ['marginBottom', '32px']
  ]);
});

describe('.supblock--main tests', () => {
  const sel = '.supblock--main';
  testStyles(sel, '@layer layout (common)', commonLayoutStyles);
  testStyles(sel, '@layer appearance (common)', commonAppearanceStyles);
  testStyles(sel, '@layer layout (unique)', [
    ['marginBottom', '32px']
  ]);
});

describe('.supblock--footer tests', () => {
  const sel = '.supblock--footer';
  testStyles(sel, '@layer layout (common)', commonLayoutStyles);
  testStyles(sel, '@layer appearance (common)', commonAppearanceStyles);
  testStyles(sel, '@layer layout (unique)', [
    ['marginBottom', '0px']
  ]);
});

mocha.run();