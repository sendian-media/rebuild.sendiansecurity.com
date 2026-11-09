# All-page desktop scaling verification

## Scope and baseline

Existing routes are `/`, `/about`, and `/portfolio` (including its industry query views). The user requested the previously approved home scaling rule across all of them. About and Portfolio retain their own measured 1920px compositions; desktop content width is 1200px, with no fixed upper cap. Header, footer, contact and text-size controls scale as well. Existing rules below 1280px are unchanged.

Baseline measurements were captured from the local dev site at 1920×1080 CSS pixels, Chrome, DPR 1, default root 16px and visual scale 1. OS scaling is not applicable to this automated viewport. `pages-baseline.json` records observed values. About H1: 56px; its pillar/capability/certificate grids have 3/2/5 columns. Portfolio H1: 72px; standard/medium/wide project cards use 384/588/792px reference widths. These are not Home's H1 or grid sizes.

At 3840 CSS pixels the shared content width is 2400px, About H1 is 112px and Portfolio H1 is 144px. The desktop unit is `100vw / 1920` per reference pixel. Borders remain hairlines and content can reflow with enlarged text.

## Checks run

- `npm run check`: 0 errors, warnings or hints. `npm run build`: passed.
- Built local server at `127.0.0.1:3891`: About and Portfolio checked at 1280, 1440, 1535/1536/1537, 1920, 2560, 3440, 3840, and 5120 CSS pixels. `about-matrix.json` and `portfolio-matrix.json` record measured shell/H1/card sizes, grid counts and horizontal-overflow checks.
- At 1920 and 200% independent text, all 90 About and 157 Portfolio text-bearing elements tested doubled. Text clipping and horizontal overflow checks also passed at 1280 and 3840 with the same setting (`about-enlarged.json`, `portfolio-enlarged.json`). This is not a complete accessibility audit or a real browser zoom test.
- Healthcare filter rendering, switching to Retail, shared text-size preference across navigation and return to Home were checked (`pages-route-check.json`). Home has one set of controls, retains the saved scale, and passes the shared desktop measurement check.
- At 320 and 800 CSS pixels, About and filtered Portfolio showed no document horizontal overflow and hid desktop-only text controls (`pages-narrow-check.json`). No narrow-layout stylesheet rules were changed.
- `about-1920.png`, `about-3840.png`, `portfolio-1920.png`, and `portfolio-3840.png` are built-site viewport captures. `check-all-pages.browser.js` contains repeatable assertions; paste it into the page console and call `await checkDesktopPage()` after changing a desktop viewport.
- Reversible pre-change source checkpoint: `/tmp/sendian-all-pages-scaling.T7b8k1/src` (temporary; repository has no commits). No deployment or external service was activated.

## Remaining limits

Safari, Firefox/Edge, OS font preferences, real browser zoom, screen readers, synthetic longest-case copy, and high-DPR image quality were not checked. Existing local images were not replaced or upscaled; photographs may soften when displayed wider than their source resolution. Aspect ratios can change the visible fold. The existing intentional switch at 1280px is not a smooth interpolation from the unchanged narrow layout.
