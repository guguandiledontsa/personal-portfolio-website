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


export function $allStyles(el) {
  if (!el) return null;
  
  const computedStyle = getComputedStyle(el);
  const styles = {};
  
  for (const prop of computedStyle) {
    styles[prop] = computedStyle.getPropertyValue(prop);
  }
  
  return JSON.stringify(styles, null, 2);
}

export function $filteredStyles(el, {
  include = [],
  exclude = []
} = {}) {
  if (!el) return null;

  const computed = getComputedStyle(el);
  const tag = el.tagName;

  // Insert default element into same parent (or body fallback)
  const defaultEl = document.createElement(tag);
  const parent = el.parentNode || document.body;

  // Try to match display context
  defaultEl.style.display = computed.display;

  parent.appendChild(defaultEl);

  const defaultStyles = getComputedStyle(defaultEl);
  const diff = {};

  for (const prop of computed) {
    const value = computed.getPropertyValue(prop);
    const defaultValue = defaultStyles.getPropertyValue(prop);

    const isIncluded = include.length === 0 || include.includes(prop);
    const isExcluded = exclude.includes(prop);

    if (!isExcluded && isIncluded && value !== defaultValue) {
      diff[prop] = value;
    }
  }

  parent.removeChild(defaultEl);

  return diff;
}





const styleCategories = {
  typography: [
    "color", "text-align", "line-height", "letter-spacing", "word-spacing",
    "white-space", "text-transform", "text-decoration", "text-indent"
  ],
  font: [
    "font", "font-family", "font-size", "font-weight", "font-style", "font-variant"
  ],
  layout: [
    "display", "position", "top", "left", "right", "bottom", "z-index", "overflow"
  ],
  spacing: [
    "margin", "padding", "gap", "row-gap", "column-gap"
  ],
  sizing: [
    "width", "height", "min-width", "max-width", "aspect-ratio", "box-sizing"
  ],
  flex: [
    "display", "flex-direction", "flex-wrap", "align-items", "justify-content"
  ],
  grid: [
    "display", "grid-template-columns", "grid-template-rows", "gap", "place-items"
  ]
};


// const include = styleCategories.typography.concat(styleCategories.font);

// $filteredStyles(el, {
//   include,
//   diffFromDefaults: true
// });