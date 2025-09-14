// test-styles.js

import { expect } from 'https://cdn.jsdelivr.net/npm/chai@5.1.1/chai.js';
import { $style } from './utils.js';

// Load and setup mocha
mocha.setup({ ui: 'bdd', reporter: 'spec' });

function runTests() {
  const screenW = window.innerWidth;
  const isWMedium = screenW >= 768;
  
  const tests = {
    'body': [
      ['backgroundColor', 'rgb(241, 245, 249)'],
      ['color', 'rgb(30, 41, 59)'],
      ['paddingTop', '16px', '32px'],
      ['paddingRight', '16px', '32px'],
      ['paddingBottom', '16px', '32px'],
      ['paddingLeft', '16px', '32px']
    ],
    'header.supblock': [
      ['backgroundColor', 'rgb(255, 255, 255)'],
      ['marginLeft', '0px'],
      ['marginRight', '0px'],
      ['marginBottom', '32px'],
      ['paddingTop', '16px', '32px'],
      ['paddingRight', '16px', '32px'],
      ['paddingBottom', '16px', '32px'],
      ['paddingLeft', '16px', '32px'],
      ['borderRadius', '12px'],
      ['boxShadow', 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px']
    ],
    'article.supblock__block-container': [
      // Note: I'm only including a few key properties here for brevity.
      // You should check only the properties directly set by your Tailwind classes.
      ['padding', '24px'],
      ['backgroundColor', 'rgb(248, 250, 252)'],
      ['borderRadius', '8px'],
      ['borderTopWidth', '1px']
    ],
  };
  
  Object.entries(tests).forEach(([selector, properties]) => {
    describe(selector, function() {
      properties.forEach(([prop, wSmall, wMedium]) => {
        it(`should have correct '${prop}' style`, function() {
          const actual = $style(selector, prop);
          const expected = isWMedium && wMedium !== undefined ? wMedium : wSmall;
          expect(actual).to.equal(expected);
        });
      });
    });
  });
  
  mocha.run();
}

// Attach the runTests function to the 'load' event
window.addEventListener('load', runTests);