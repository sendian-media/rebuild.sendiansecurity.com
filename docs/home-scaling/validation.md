# Home desktop scaling verification

## Approved rule

The user selected the first supplied screenshot's proportions, superseding the SOP's capped 1440px preset **for the home page only**.

- Reference: 1920 CSS pixels; 1200px content; 64px H1; 720px hero; 92px header.
- Desktop unit: `100vw / 120` (16px at the reference). Geometry and typography grow without a maximum.
- Content occupies 62.5% of the viewport. Tailwind's inherited container `max-width` is explicitly removed within `.page-home`.
- Retained compositions: metrics/solutions 4 columns, process/certificates 5, trust/projects 3.
- Existing styles below 1280px and on other routes remain separate. Crossing 1280px intentionally switches from the old narrow layout to the new proportional desktop composition; this is not a continuous interpolation with the old layout.
- Text enlargement is independent, via footer **Text size** controls (100–200%). Geometry stays unchanged; text containers grow/wrap. Root font size is not changed. A browser font preference present on page load is included in the multiplier.
- A `ResizeObserver` measures only the wrapping header for anchor offsets; it does not drive layout scaling.
- Hairline borders remain 1px, so this is proportional composition, not a bitmap-identical enlargement.

## Checks performed

Local automated Chrome, DPR 1, default root 16px, browser visual scale 1. OS display scaling is not applicable to these controlled CSS viewports; the supplied screenshots' original zoom/DPR settings are unknown.

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, warnings or hints |
| `npm run build` | Passed |
| Reference 1920×1080 | Container 1200px, H1 64px, hero 720px, header 92px |
| Desktop widths 1280, 1366, 1440, 1535, 1536, 1537, 1600, 1920, 2560, 3440, 3840 | Proportional container/type/gaps/media, expected columns, no document overflow or horizontally clipped tested text/controls |
| 5120×2880 | Container 3200px; no cap; assertions passed |
| 200% text at 1920 | All 117 text-bearing nodes doubled; `aria-pressed` updated; keyboard Space activated the control |
| 200% text at 1280, 2560, 3840 | Layout assertions passed; no document overflow; header and hero grew with content |
| Saved preference | 200% survived reload; invalid saved value `3` reverted to 100% |
| Existing narrow rules at 320, 390, 800, 1024, 1279 | 264 elements' sampled width/height/font/spacing/display values unchanged when toggling the home scope; no document overflow |
| `/about`, `/portfolio` at 3840 | Original 1200px container and 56px/72px H1 retained; no home text-size UI |
| Built server at 3840×2160 | Container 2400px, H1 128px, header 184px, text controls initialized, no overflow |

### Representative outputs

| Viewport | Content width | H1 | Hero minimum height |
| ---: | ---: | ---: | ---: |
| 1280 | 800 | 42.67 | 480 |
| 1440 | 900 | 48 | 540 |
| 1920 | 1200 | 64 | 720 |
| 2560 | 1600 | 85.33 | 960 |
| 3440 | 2150 | 114.67 | 1290 |
| 3840 | 2400 | 128 | 1440 |
| 5120 | 3200 | 170.67 | 1920 |

## Evidence and repeatable check

- `home-1920.png`, `home-3840.png`: corresponding first-slide viewport screenshots; wave animations paused at the same time for comparison.
- `check.browser.js`: run in the home page console, then call `await checkHomeScaling()` after changing each desktop viewport. Throws on incorrect scale, column counts, sticky offset or tested horizontal clipping. Not shipped to the page.
- `desktop-matrix.json`, `wide-matrix.json`, `enlarged-matrix.json`, `text-200.json`, `narrow-matrix.json`, `route-check.json`, `build-smoke.json`: local browser results.
- Source checkpoint before implementation: `/tmp/sendian-home-scaling.0ujRQx/src` (temporary, not a durable Git commit). The repository had no commits; no commit or deployment was made.

## Limits / unverified

- Same proportions do not mean the same visible fold on different aspect ratios or when independent text enlargement is enabled.
- Safari, Firefox/Edge, real browser-zoom levels, changed browser default-font settings and screen-reader testing were not run. Independent 200% text sizing was tested, not claimed as a substitute for a full accessibility audit.
- Existing English copy was retained. Arabic and synthetic longest-case copy were not tested.
- Existing local images were reused without downloading, upscaling or substituting assets. Provenance remains in the existing `docs/figma-*-assets.md` records. Hero sources are 800px wide and project images 1000px wide: uncapped displays and DPR 2 can exceed those resolutions. No responsive image variants were fabricated; high-DPR image QA remains outstanding.
- Broader pre-existing animation/accessibility behavior is outside this scaling change.
