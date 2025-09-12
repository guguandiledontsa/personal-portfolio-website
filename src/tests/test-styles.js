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
    ['marginLeft', 'auto'],
    ['marginRight', 'auto'],
    ['marginBottom', '32px'], // mb-8
    ['paddingTop', '16px'],
    ['paddingRight', '16px'],
    ['paddingBottom', '16px'],
    ['paddingLeft', '16px'],
    ['borderRadius', '12px'],
    ['boxShadow', 'rgb(0, 0, 0) 0px 20px 25px -5px, rgb(0, 0, 0) 0px 10px 10px -5px']
  ]);

  testBlock('body', [
    ['backgroundColor', 'rgb(241, 245, 249)'],
    ['color', 'rgb(30, 41, 59)'],
    ['paddingTop', '16px'],
    ['paddingRight', '16px'],
    ['paddingBottom', '16px'],
    ['paddingLeft', '16px']
  ]);
}

window.addEventListener('DOMContentLoaded', runStyleChecks);
