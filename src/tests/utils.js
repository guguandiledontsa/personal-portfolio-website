// utils.js

export function $style(selector, prop) {
  const el = document.querySelector(selector);
  return el ? getComputedStyle(el)[prop] : null;
}

export function testBlock(selector, tests) {
  let passed = 0;
  const total = tests.length;
  const screenW = window.innerWidth;

  for (const [prop, WSmall, WMedium] of tests) {
    const expected = screenW >= 768 ?  WMedium ?? WSmall : WSmall;
    const actual = $style(selector, prop);
    if (actual === expected) {
      passed++;
    } else {
      console.error(`❌ ${selector} ${prop}. Got: ${actual}, Expected: ${expected}`);
    }
  }

  const symbol = passed === total ? '✔︎' : '⚠︎';
  console.log(`${symbol} ${selector}: ${passed}/${total} tests passed`);
}
