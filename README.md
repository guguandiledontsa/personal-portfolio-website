# Personal Portfolio Website

A hand-built portfolio exercising an ontological CSS naming system
(BEM blocks named by purpose — see `docs` doctrine in the Bionic workspace).

## Copyrighted materials — attribution & terms of use

This project is a **private educational study**. Several assets included here are
not mine; they belong to their respective owners and are included solely to study
how the original page is designed. Nothing in this repository is licensed for
redistribution, publication, or deployment.

| Asset | Owner | What it is | Why it's here |
| --- | --- | --- | --- |
| `src/assets/hero-desktop.png` | Superpower (`superpower.com`) | Reference screenshot of their landing-page hero | The design target this study reconstructs |
| `src/assets/videoframe_*.png` | Superpower — photography believed © Superpower / Daybreak Studio | Frames extracted from their public hero video (`videoframe_2234.png` is the one in use) | Stand-in hero artwork for the private rebuild |
| "superpower" wordmark | Superpower — custom-drawn logotype by Daybreak Studio | Brand wordmark visible in the reference only | **Not reproduced as an asset**; our build sets the name in styled text |

**Terms, plainly:**

1. All third-party imagery remains the property of its owners. No license is
   claimed or implied.
2. These assets are used **without permission**, under fair-dealing-style
   private-study intent only — to learn layout, typography, and CSS architecture.
3. **Do not publish, deploy, or share** this repository or any build containing
   these assets. Before any public use, third-party imagery must be replaced with
   original or licensed work.
4. If the owners of Superpower or Daybreak Studio wish any of this removed, it
   will be removed immediately upon request.

## Typefaces

- The reference site uses **NB International Pro** (Neubau, Vienna) — a
  commercially licensed typeface that is **not included** in this repository.
- This build uses free stand-ins: **Inter Tight** (display) and **Inter** (body),
  both under the SIL Open Font License via Google Fonts.

## Structure

```
src/
├── portfolio.html      ← the document (BEM-marked)
├── styles/main.css     ← layered tokens + blocks (see increment key in §1)
└── assets/             ← imagery (see attribution above)
```
