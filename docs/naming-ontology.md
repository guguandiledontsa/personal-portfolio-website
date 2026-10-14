# The HTML Portal — element taxonomy for naming

> The analog of Wikipedia's *Book design* navbox, for HTML. Three real indexes exist;
> this document condenses them into one reference, then derives from it the rule for
> **ontological naming by proper names** — the vocabulary our BEM blocks draw from.
>
> Sources: [MDN HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
> · [WHATWG index of elements](https://html.spec.whatwg.org/multipage/indices.html#elements-3)
> · [WHATWG content categories](https://html.spec.whatwg.org/multipage/dom.html#kinds-of-content)
> · [MDN content categories](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories)

---

## Part 1 — The navbox

### Page layout & typography  *(WHATWG spec chapters + MDN functional groups)*

| Group (MDN) | ≈ Spec chapter | Elements |
| --- | --- | --- |
| **Main root** | — | `html` |
| **Document metadata** | 4.2 | `head`, `title`, `base`, `link`, `meta`, `style` |
| **Sectioning root** | 4.3 | `body` |
| **Content sectioning** | 4.3 | `address`, `article`, `aside`, `footer`, `header`, `h1–h6`, `hgroup`, `main`, `nav`, `section`, `search` |
| **Text content (grouping)** | 4.4 | `blockquote`, `dd`, `div`, `dl`, `dt`, `figcaption`, `figure`, `hr`, `li`, `menu`, `ol`, `p`, `pre`, `ul` |
| **Inline text semantics** | 4.5 | `a`, `abbr`, `b`, `bdi`, `bdo`, `br`, `cite`, `code`, `data`, `dfn`, `em`, `i`, `kbd`, `mark`, `q`, `rp`, `rt`, `ruby`, `s`, `samp`, `small`, `span`, `strong`, `sub`, `sup`, `time`, `u`, `var`, `wbr` |
| **Demarcating edits** | 4.6 | `del`, `ins` |
| **Image & multimedia** | 4.7 | `area`, `audio`, `img`, `map`, `track`, `video` |
| **Embedded content** | 4.8 | `embed`, `iframe`, `object`, `picture`, `portal`, `source` |
| **SVG & MathML** | — | `svg`, `math` |
| **Scripting** | 4.12 | `canvas`, `noscript`, `script`, `template`, `slot` |
| **Table content** | 4.9 | `caption`, `col`, `colgroup`, `table`, `tbody`, `td`, `tfoot`, `th`, `thead`, `tr` |
| **Forms** | 4.10 | `button`, `datalist`, `fieldset`, `form`, `input`, `label`, `legend`, `meter`, `optgroup`, `option`, `output`, `progress`, `select`, `textarea` |
| **Interactive elements** | 4.11 | `details`, `dialog`, `summary` |
| **Web components** | — | custom elements, `slot` |
| **Obsolete & deprecated** | 15 | `acronym`, `big`, `center`, `font`, `frame`, `keygen`, `tt`… |

### Cross-cutting axes *(the "categories" column — orthogonal membership, not folders)*

- **Content categories**: metadata · flow · sectioning · heading · phrasing · embedded · interactive · palpable · script-supporting
- **Sectioning roots** (own outlines): `blockquote`, `body`, `details`, `dialog`, `fieldset`, `figure`, `td`
- **Form-associated families**: listed · submittable · resettable · labelable · autocapitalize-inheriting
- **ARIA classes**: landmark (banner, main, navigation, complementary, contentinfo, search, region, form) · widget (command, composite, input, range, select) · window (dialog) · structure (article, group, heading…)
- **Global attributes** (orthogonal to all elements): `id class lang dir hidden tabindex title translate spellcheck contenteditable popover inert data-* aria-* …`

---

## Part 2 — Naming by proper names (the rule)

Book design works because every element has a **proper name** (colophon, folio,
catchword) that carries its function in one word. HTML already has the same gift —
its element names and ARIA roles *are* proper names. The rule:

> **A block's name should be the most specific proper name for its role — borrowed
> first from HTML/ARIA's own taxonomy, then from established page-design vocabulary,
> and only lastly invented.**

Three tiers of proper name, in preference order:

| Tier | Source | Examples |
| --- | --- | --- |
| **1. HTML/ARIA proper names** | The element/role itself names the block | `navigation` (nav), `disclosure` (details/summary), `dialog` (dialog), `tabular`/`data-table` (table), `form-input` (input) |
| **2. Page-design vocabulary** | Names shared by print & web (book-design terms the web kept) | `masthead`, `wordmark`, `byline`, `hero`, `colophon`, `epigraph`, `sidebar`, `toc`, `specimen` |
| **3. Purpose phrases** | When no proper name exists — phrase the *job*, never the location/looks | `value-comparison`, `process`, `showcase` |

**Anti-names (never):** location (`page-item--header`), looks (`red-text`, `blue-pill`),
vague containers (`content-wrapper`), tag-echoes (`hgroup__body-text` — name the *role*,
`hgroup__subtitle`).

**The test:** read the class name aloud. If a stranger in the trade would recognize the
thing from the name alone (navigation, colophon, stat, ledger), it's a proper name.
If they'd have to see the markup, it isn't.

### Project vocabulary starter (portfolio context)

| Proper name | Tier | Promise |
| --- | --- | --- |
| `page` | 3 | the document's single root block |
| `masthead` | 2 | identity + orientation at the top (may replace `site-head`) |
| `wordmark` | 2 | the name set as type |
| `navigation` | 1 | the link system (`__menu`, `__item`, `__link`) |
| `notice` | 2 | out-of-band interruption (noscript etc.) |
| `hero` | 2 | the offer in one breath |
| `prose` | 2 | the reading voice |
| `stat` | 3 | one quantified claim |
| `button` | 3 | one action gesture (tiers: `--primary`, `--ghost`) |
| `colophon` | 2 | how the site was made |

---

## Part 3 — How this revamps our naming

1. Inventory every block name in the project (done: `page, notice, region, panel,
   panel-group, prose, navigation, heading, hgroup, data-table, user-form,
   choice-group, disclosure, modal-dialog, figure, quote, code-sample, …`).
2. Classify each against the three tiers + anti-names (audit table exists in the
   workspace Atlas, `02-bem-naming-rules.md` §3).
3. Renames happen **only by approval**, JetBrains-style: one proposal, one diff, one
   decision.
