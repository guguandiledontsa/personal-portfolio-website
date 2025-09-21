import { expect } from 'https://cdn.jsdelivr.net/npm/chai@5.1.1/chai.js';
import { $style } from './utils.js';

mocha.setup({ ui: 'bdd', reporter: 'spec' });

const isWMedium = window.innerWidth >= 768;

// Utility: Style tester
function testStyles(selector, label, styles) {
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

// Utility: Precise pixel comparison
function expectStyle(el, prop, expected) {
  const computed = getComputedStyle(el)[prop];
  if (expected.endsWith('px')) {
    const actual = parseFloat(computed);
    const expectedPx = parseFloat(expected);
    expect(actual).to.be.closeTo(expectedPx, 0.6, `${prop} ≠ ${expected}`);
  } else {
    expect(computed).to.equal(expected);
  }
}

// ─────────────────────────────────────────────
// Shared styles
const bodyTypographyStyles = [
  ['color', 'rgb(30, 41, 59)'],
  ['fontFamily', 'Inter, sans-serif'],
  ['fontSize', '13.6px'],
  ['lineHeight', '20.4px']
];

const sharedPaddingStyles = [
  ['paddingTop', '16px', '32px'],
  ['paddingRight', '16px', '32px'],
  ['paddingBottom', '16px', '32px'],
  ['paddingLeft', '16px', '32px']
];

const supblockLayoutStyles = [
  ['maxWidth', '1280px'],
  ['marginLeft', '0px'],
  ['marginRight', '0px'],
  ...sharedPaddingStyles
];

const supblockAppearanceStyles = [
  ['backgroundColor', 'rgb(255, 255, 255)'],
  ['borderRadius', '12px'],
  ['boxShadow', 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px']
];

const tailwindExpectedStyles = [
  ['paddingTop', '24px'],
  ['paddingRight', '24px'],
  ['paddingBottom', '24px'],
  ['paddingLeft', '24px'],
  ['backgroundColor', 'rgb(248, 250, 252)'],
  ['borderColor', 'rgb(226, 232, 240)'],
  ['borderStyle', 'solid'],
  ['borderRadius', '8px']
];

// ─────────────────────────────────────────────
// <body> tests
testStyles('body', 'Typography', bodyTypographyStyles);
testStyles('body', 'Layout', sharedPaddingStyles);
testStyles('body', 'Appearance', [['backgroundColor', 'rgb(241, 245, 249)']]);

// ─────────────────────────────────────────────
// Supblock Tests
describe('Supblock Modifier', () => {
  const blocks = [];

  ['header', 'main', 'footer'].forEach(section => {
    const selector = `.supblock--${section}`;
    const el = document.querySelector(selector);

    describe(selector, () => {
      it('should exist', () => {
        expect(el).to.exist;
      });

      if (!el) return; // avoid running tests if not found

      testStyles(selector, 'Typography', bodyTypographyStyles);
      testStyles(selector, 'Layout', supblockLayoutStyles);
      testStyles(selector, 'Appearance', supblockAppearanceStyles);

      testStyles(selector, 'Layout (unique)', [
        ['marginBottom', section === 'footer' ? '0px' : '32px']
      ]);

      it('should have either border or shadow', () => {
        const style = getComputedStyle(el);
        const hasBorder = style.borderWidth !== '0px';
        const hasShadow = style.boxShadow !== 'none';
        expect(hasBorder || hasShadow).to.be.true;
      });

      it('should have padding > 10px on all sides', () => {
        const style = getComputedStyle(el);
        ['Top', 'Right', 'Bottom', 'Left'].forEach(side => {
          const val = parseFloat(style[`padding${side}`]);
          expect(val).to.be.greaterThan(10);
        });
      });

      describe('Container Blocks (.supblock__container)', () => {
        const containers = el.querySelectorAll('.supblock__container');

        it('should have at least one container', () => {
          expect(containers.length).to.be.greaterThan(0);
        });

        containers.forEach(container => {
          tailwindExpectedStyles.forEach(([prop, expected]) => {
            it(`should have "${prop}" = "${expected}"`, () => {
              expectStyle(container, prop, expected);
            });
          });

          it('should have padding ≥ 24px on all sides', () => {
            const style = getComputedStyle(container);
            ['Top', 'Right', 'Bottom', 'Left'].forEach(side => {
              const pad = parseFloat(style[`padding${side}`]);
              expect(pad).to.be.at.least(24);
            });
          });

          if (section === 'footer') {
            it('should span full width', () => {
              const parent = container.parentElement;
              const w1 = container.getBoundingClientRect().width;
              const w2 = parent.getBoundingClientRect().width;
              expect(Math.abs(w1 - w2)).to.be.lessThan(2);
            });
          }
        });
      });

      blocks.push(el);
    });
  });

  // Group-level assertions
  describe('Block-wide Assertions', () => {
    it('should have matching widths', () => {
      const widths = blocks.map(b => b.getBoundingClientRect().width);
      expect(new Set(widths).size).to.equal(1);
    });

    it('should not visually overlap', () => {
      const isOverlapping = (a, b) => {
        const rA = a.getBoundingClientRect();
        const rB = b.getBoundingClientRect();
        return !(rA.bottom <= rB.top || rA.top >= rB.bottom);
      };

      const anyOverlap = blocks.some((a, i) =>
        blocks.slice(i + 1).some(b => isOverlapping(a, b))
      );

      expect(anyOverlap).to.be.false;
    });
  });
});

// ─────────────────────────────────────────────
mocha.run();
