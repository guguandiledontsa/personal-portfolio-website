// utils.js

export const styleData = {
  'body': {
    'Typography': [
      ['color', 'rgb(30, 41, 59)'],
      ['fontFamily', 'Inter, sans-serif'],
      ['fontSize', '13.6px'],
      ['lineHeight', '20.4px']
    ],
    'Layout': [
      ['paddingTop', '16px', '32px'],
      ['paddingRight', '16px', '32px'],
      ['paddingBottom', '16px', '32px'],
      ['paddingLeft', '16px', '32px']
    ],
    'Appearance': [
      ['backgroundColor', 'rgb(241, 245, 249)']
    ]
  },
  '.supblock': {
    'Layout': [
      ['maxWidth', '1280px'],
      ['marginLeft', '0px'], // should be auto on desktop
      ['marginRight', '0px'], // ..., auto
    ],
    'Appearance': [
      ['backgroundColor', 'rgb(255, 255, 255)'],
      ['borderRadius', '12px'],
    ],
    'Padding': [
      ['paddingTop', '16px', '32px'],
      ['paddingRight', '16px', '32px'],
      ['paddingBottom', '16px', '32px'],
      ['paddingLeft', '16px', '32px']
    ]
  },
  '.supblock__container': {
    'Layout': [
      ['paddingTop', '24px'],
      ['paddingRight', '24px'],
      ['paddingBottom', '24px'],
      ['paddingLeft', '24px'],
    ],
    'Appearance': [
      ['backgroundColor', 'rgb(248, 250, 252)'],
      ['borderColor', 'rgb(226, 232, 240)'],
      ['borderStyle', 'solid'],
      ['borderRadius', '8px']
    ]
  },
  '.supblock__card': {
    'Layout': [
      ['paddingTop', '16px'],
      ['paddingRight', '16px'],
      ['paddingBottom', '16px'],
      ['paddingLeft', '16px'],
      ['marginBottom', '16px']
    ],
    'Appearance': [
      ['backgroundColor', 'rgb(255, 255, 255)'], // bg-white
      ['borderRadius', '8px'], // rounded-lg is 0.5rem
    ],
  },
  '.card__title': {
    'Typography': [
      ['fontWeight', '600'], // font-semibold
      ['fontSize', '15.8px'], // text-lg should be 18px
      ['lineHeight', '23.8px'] // default line-height for text-lg should be 28px
    ]
  },
  '.card__subtitle': {
    'Typography': [
      ['fontSize', '11.9px'], // text-sm should be 14px
      ['color', 'rgb(71, 85, 105)'], // text-slate-600
    ]
  },
  'h2': {
    'Typography': [
      ['fontSize', '36px'], // text-4xl
      ['fontWeight', '700'], // font-bold
      ['lineHeight', '40px'] // default line-height
    ],
    'Layout': [
      ['marginBottom', '24px'] // mb-6
    ]
  },
  'h3': {
    'Typography': [
      ['fontSize', '24px'], // text-2xl
      ['fontWeight', '700'], // font-bold
      ['lineHeight', '32px'] // default line-height
    ],
    'Layout': [
      ['marginBottom', '16px'] // mb-4
    ]
  },
  '.card__label': {
    'Typography': [
      ['fontSize', '12px'], // text-xs
      ['fontWeight', '500'], // font-medium
      ['color', 'rgb(100, 116, 139)'], // text-slate-500
    ],
    'Layout': [
      ['display', 'block'],
    ]
  },
  '.card__inline-link': {
    'Typography': [
      ['color', 'rgb(59, 130, 246)'], // text-blue-500
      ['textDecoration', 'none'], // underline on hover
    ],
  },
  '.card__code-block': {
    'Appearance': [
      ['backgroundColor', 'rgb(30, 41, 59)'], // slate-800
      ['color', 'rgb(248, 250, 252)'], // slate-50
      ['borderRadius', '6px'], // rounded-md
    ],
    'Layout': [
      ['padding', '12px'], // p-3 (12px)
      // ['marginTop', '8px'], // mt-2
      ['overflowX', 'auto'] // overflow-x-auto
    ],
    'Typography': [
      ['fontSize', '13.6px'], // text-xs should be 12px
    ]
  },
  '.card__figcaption': {
    'Typography': [
      ['fontSize', '17px'], // text-sm shoukd be 14px
      ['color', 'rgb(100, 116, 139)'], // text-slate-500
      ['fontStyle', 'italic'], // italic
    ],
    'Layout': [
      ['marginBottom', '8px'], // mb-2
    ]
  },
  '.card__form': {
    'Layout': [
      ['marginTop', '8px'], // mt-2
      // space-y-3 (12px gap) is tricky to test on the form element itself
    ]
  },
  '.card__media': {
    'Appearance': [
      ['borderRadius', '6px'], // rounded-md
      ['backgroundColor', 'rgb(226, 232, 240)'], // bg-slate-200
    ]
  },
  '.card__audio': {
    'Layout': [
      ['marginTop', '16px'], // mt-4
    ]
  },
  '.card__image': {
    'Layout': [
      ['borderRadius', '6px'], // rounded-md
    ]
  },
  '.card__input': {
    'Layout': [
      //['width', '100%'], // w-full
      ['padding', '8px'], // p-2 (8px)
      ['marginTop', '4px'], // mt-1
    ],
    'Appearance': [
      ['borderColor', 'rgb(203, 213, 225)'], // border-slate-300
      ['borderStyle', 'solid'], // border
      ['borderRadius', '6px'], // rounded-md
    ]
  },
  '.card__fieldset': {
    'Layout': [
      ['padding', '12px'], // p-3
      ['borderRadius', '6px'], // rounded-md
      ['borderWidth', '1px'] // border
    ],
    'Appearance': [
      ['borderColor', 'rgb(203, 213, 225)'], // border-slate-300
      ['borderStyle', 'solid'] // border
    ]
  },
}

// Configuration for the Supblock loop
export const supblockConfigs = [
{
  modifier: 'header',
  marginBottom: '32px',
  assertions: {}
},
{
  modifier: 'main',
  marginBottom: '32px',
  assertions: {}
},
{
  modifier: 'footer',
  marginBottom: '0px',
  assertions: {
    'container should span full width': (el) => {
      const containerEl = el.querySelector('.supblock__container');
      if (!containerEl) return;
      const parentWidth = el.getBoundingClientRect().width;
      const elWidth = containerEl.getBoundingClientRect().width;
      expect(Math.abs(elWidth - parentWidth)).to.be.lessThan(2);
    }
  }
}];

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