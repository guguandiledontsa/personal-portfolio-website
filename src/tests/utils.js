// Get the computed style of a specific property
export function $style(selector, prop) {
  const el = document.querySelector(selector);
  return el ? getComputedStyle(el)[prop] : null;
}

// Run tests on a selector's style properties
export function testBlock(selector, tests) {
  let passed = 0;
  const total = tests.length;

  for (const [prop, expected] of tests) {
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
