// test-styles.js

import { $style, testBlock } from './utils.js';

function runStyleChecks() {
  testBlock('header.supblock', [
    ['display', 'block'],
    ['position', 'static'],
    ['top', 'auto'],
    ['right', 'auto'],
    ['bottom', 'auto'],
    ['left', 'auto'],
    ['z-index', 'auto'],
    ['overflow', 'visible'],
    ['overflow-x', 'visible'],
    ['overflow-y', 'visible'],
    ['float', 'none'],
    ['clear', 'none'],
    ['contain', 'none'],
    ['backgroundColor', 'rgb(255, 255, 255)'],
    
    ['marginLeft', '0px'],  // WSmall, WMedium
    ['marginRight', '0px'],
    ['marginBottom', '32px', '32px'], // mb-8
    ['paddingTop', '16px', '32px'],
    ['paddingRight', '16px', '32px'],
    ['paddingBottom', '16px', '32px'],
    ['paddingLeft', '16px', '32px'],
    ['borderRadius', '12px', '12px'],
    ['boxShadow', 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px']
  ]);

  testBlock('body', [
    ['backgroundColor', 'rgb(241, 245, 249)'],
    ['color', 'rgb(30, 41, 59)'],
    ['paddingTop', '16px', '32px'],
    ['paddingRight', '16px', '32px'],
    ['paddingBottom', '16px', '32px'],
    ['paddingLeft', '16px', '32px']
  ]);
}

window.addEventListener('DOMContentLoaded', runStyleChecks);
