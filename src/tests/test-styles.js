import { expect } from 'https://cdn.jsdelivr.net/npm/chai@5.1.1/chai.js';
import { $style } from './utils.js';

mocha.setup({ ui: 'bdd', reporter: 'spec' });

const screenW = window.innerWidth;
const isWMedium = screenW >= 768;

function testStyles(selector, label, styles) {
  describe(label, () => {
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

  testStyles(sel, '@layer typography', [
    ['color', 'rgb(30, 41, 59)'],            // text-slate-800
    ['fontFamily', 'Inter, sans-serif'],  // Tailwind default sans
    ['fontSize', '13.6px'],                   // base
    ['lineHeight', '20.4px']                  // leading-normal
  ]);

  testStyles(sel, '@layer layout', [
    ['paddingTop', '16px', '32px'],       // p-4 md:p-8
    ['paddingRight', '16px', '32px'],
    ['paddingBottom', '16px', '32px'],
    ['paddingLeft', '16px', '32px']
  ]);

  testStyles(sel, '@layer appearance', [
    ['backgroundColor', 'rgb(241, 245, 249)']  // transparent by default unless overridden
  ]);
});

mocha.run();
