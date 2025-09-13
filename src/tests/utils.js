// utils.js

export function $style(selector, prop) {
  const el = document.querySelector(selector);
  return el ? getComputedStyle(el)[prop] : null;
}
