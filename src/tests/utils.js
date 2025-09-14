// utils.js

export function $style(selector, prop) {
  const el = document.querySelector(selector);
  if (!el) {
    return null;
  }
  const computedStyle = getComputedStyle(el);
  
  // Convert camelCase to kebab-case for CSS property lookup
  const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
  
  return computedStyle.getPropertyValue(cssProp).trim(); // trim to avoid whitespace issues
}
