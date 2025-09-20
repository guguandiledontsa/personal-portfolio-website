import { expect } from 'https://cdn.jsdelivr.net/npm/chai@5.1.1/chai.js';
import { $style } from './utils.js';

mocha.setup({ ui: 'bdd', reporter: 'spec' });

// Utility: Test styles for a given selector
function testStyles(selector, label, styles) {
  const isWMedium = window.innerWidth >= 768;
  
  describe(`${selector} → ${label}`, () => {
    let el;
    
    before(() => {
      el = document.querySelector(selector);
    });
    
    it('should exist on the page', () => {
      expect(el).to.exist;
    });
    
    styles.forEach(([prop, smallVal, mediumVal]) => {
      const expected = isWMedium && mediumVal !== undefined ? mediumVal : smallVal;
      
      it(`should have "${prop}" = "${expected}"`, () => {
        const actual = el ? $style(selector, prop) : null;
        expect(actual).to.equal(expected);
      });
    });
  });
}

// ─────────────────────────────────────────────
// Shared styles
const bodyTypographyStyles = [
  ['color', 'rgb(30, 41, 59)'],
  ['fontFamily', 'Inter, sans-serif'],
  ['fontSize', '13.6px'],
  ['lineHeight', '20.4px']
];

// ─────────────────────────────────────────────
// <body> tests
testStyles('body', 'Typography', bodyTypographyStyles);
testStyles('body', 'Layout', [
  ['paddingTop', '16px', '32px'],
  ['paddingRight', '16px', '32px'],
  ['paddingBottom', '16px', '32px'],
  ['paddingLeft', '16px', '32px']
]);
testStyles('body', 'Appearance', [
  ['backgroundColor', 'rgb(241, 245, 249)']
]);

// ─────────────────────────────────────────────
// Supblock Modifier Tests with Shared styles
const blocks = []
describe('Supblock Modifier Tests', () => {
  const supblockLayoutStyles = [
    ['maxWidth', '1280px'],
    ['marginLeft', '0px'],
    ['marginRight', '0px'],
    ['paddingTop', '16px', '32px'],
    ['paddingRight', '16px', '32px'],
    ['paddingBottom', '16px', '32px'],
    ['paddingLeft', '16px', '32px']
  ];
  const supblockAppearanceStyles = [
    ['backgroundColor', 'rgb(255, 255, 255)'],
    ['borderRadius', '12px'],
    ['boxShadow', 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px']
  ];
  ['header', 'main', 'footer'].forEach(section => {
    const sel = `.supblock--${section}`;
    const el = document.querySelector(sel);
    
    it('Header, main, and footer should exist', () => {
      ['header', 'main', 'footer'].forEach(tag => {
        expect(el).to.exist;
      });
    });
    
    testStyles(sel, 'Typography', bodyTypographyStyles);
    testStyles(sel, 'Layout', supblockLayoutStyles);
    testStyles(sel, 'Appearance', supblockAppearanceStyles);
    testStyles(sel, 'Layout (unique)', [
      ['marginBottom', section === 'footer' ? '0px' : '32px']
    ]);
    
    it('Should have either border or shadow', () => {
      const style = getComputedStyle(el);
      const hasBorder = style.borderWidth !== '0px';
      const hasShadow = style.boxShadow !== 'none';
      expect(hasBorder || hasShadow).to.be.true;
    });
    
    it('Should have inner padding > 10px', () => {
      const pad = parseFloat(getComputedStyle(el).padding);
      expect(pad).to.be.greaterThan(10);
    });
    
    blocks.push(el)
  });
  
  it('Should have matching width', () => {
    const widths = blocks.map(block => block.getBoundingClientRect().width);
    
    expect(new Set(widths).size).to.equal(1); // all widths equal
  });
  
  it('Cards should not visually overlap', () => {
    
    const isOverlapping = (a, b) => {
      const rA = a.getBoundingClientRect();
      const rB = b.getBoundingClientRect();
      return !(rA.bottom <= rB.top || rA.top >= rB.bottom);
    };
    
    const anyOverlap = blocks.some((elA, i) =>
      blocks.slice(i + 1).some(elB => isOverlapping(elA, elB))
    );
    
    expect(anyOverlap).to.be.false;
  });
});

// ──────────────────────────────────────────────────────────────────────────────────────────

mocha.run();