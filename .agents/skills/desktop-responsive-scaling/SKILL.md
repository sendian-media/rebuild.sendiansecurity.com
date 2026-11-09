---
name: desktop-responsive-scaling
description: Preserves an approved desktop composition across large displays using uncapped, coordinated CSS scaling of containers, typography, spacing, images, controls, headers and footers. Use when a user says content looks too small on 4K or ultrawide monitors, wants the same proportions on different displays, requests no fixed container max-width, or asks to apply desktop scaling rules. Distinguishes proportional scaling from ordinary capped responsive layouts and verifies text enlargement and inherited framework container limits.
---

# Desktop responsive scaling

## Intended result

Keep the approved composition at the same relative size as desktop CSS viewport width grows. Scale geometry and normal typography together, without a fixed upper cap, unless the user explicitly chooses a capped policy. Preserve existing content, branding, grid counts, media ratios and narrower layouts.

This is not whole-page zoom, a redesign, or a guarantee of identical physical sizes or visible sections on different aspect ratios.

## 1. Establish the reference and write boundary

- Read repository instructions and inspect the requested routes, layout, styles, shared header/footer, assets and existing tests.
- Use an already approved reference from the conversation. Otherwise confirm the CSS reference width and desired composition before editing; do not guess from screenshot bitmap dimensions.
- Distinguish “same proportions” from “same fixed pixel width.” Explain a numerical example if the intent is ambiguous.
- Confirm which routes may change. Scope shared-component geometry to the requested page when other routes must stay unchanged.
- Make a reversible source checkpoint. Do not create commits, reset work, or deploy without authorization.

## 2. Measure the rendered baseline

Wait for fonts and images, then record CSS viewport width/height, DPR, browser zoom and available display-scaling information. Mark unknown settings as unknown.

Measure container width including padding, H1/H2/body/action/caption type, line heights, gaps, section spacing, card/media sizes, logo dimensions, header height and grid counts. Match carousel/reveal/hover states during comparisons.

Inspect computed winners, not source declarations alone. Audit inherited `max-width`, framework `.container` rules, breakpoint overrides, independent clamps, fixed text heights and duplicated gutters. Tailwind's container max-width can remain active even after a custom width changes.

## 3. Derive one uncapped scale

Read [implementation patterns](references/implementation.md) before changing CSS.

For approved CSS reference width `R`, let one reference pixel be `100vw / R`. Express each measured geometric value as its reference number multiplied by that unit. Keep semantic tokens for repeated roles.

Example only: at `R = 1920`, a 1200px content width becomes 1600px at 2560 and 2400px at 3840. A 64px H1 becomes 85.33px and 128px. Calibrate another project from its own reference; do not impose these numbers everywhere.

For the uncapped policy, do not introduce a fixed maximum or a `clamp()` ceiling on migrated geometry/type. Clear inherited container limits inside the approved scope. Keep paragraph reading-measure limits: removing a page-shell cap does not mean unlimited text line length.

## 4. Migrate the complete composition

- Map containers, typography, margins, padding, gaps, cards, imagery, logos, buttons, navigation, footer and overlay/carousel offsets to the same scale.
- Retain explicit grid counts with `repeat(N, minmax(0, 1fr))`; use `min-inline-size: 0` and safe wrapping for content.
- Preserve fonts, colors, weights, unitless line heights, em letter spacing, media ratios and appropriate `cover`/`contain` treatment. Hairline borders and minimum hit targets may remain unscaled.
- Keep full-width backgrounds separate from the shared content shell. Avoid double-counting gutters or section padding.
- Use normal flow, wrapping rows, content-based buttons and `min-height` for text-containing cards/hero/header. Enlarged text must not be clipped to preserve the screenshot.
- Derive sticky anchor offsets from actual header height; a header-only observer may measure wrapping, but JavaScript must not drive responsive layout scaling.
- Remove migrated competing rules where safely scoped; keep base styles required by other pages or narrow layouts.
- Keep the root font size user-relative. Do not implement sizing through document transforms, CSS `zoom`, a viewport-only root font size, or JavaScript resize loops.
- Supply adequate authorized local image variants where available; do not disguise upscaled thumbnails as high-resolution sources.

## 5. Provide independent text enlargement

Viewport-proportional type can counteract browser zoom. Keeping the root unchanged or wrapping viewport type in `clamp()` does not prove accessible enlargement.

Use an existing accessible text-size mechanism, or integrate discoverable keyboard-operable 100/125/150/200% controls with an independent multiplier on **every** mapped text token. Include navigation, buttons, captions, overlays, footer, skip link and the controls themselves. Honor the browser's default font preference, validate saved values, tolerate unavailable storage and expose selection with `aria-pressed`.

At a fixed desktop viewport, compare actual computed sizes at 100% and 200%; every text-bearing element should double while content/functions remain available. Let layout heights grow. If a new control is not approved, propose a rem-based type alternative and explain the proportionality trade-off instead of silently omitting enlargement.

## 6. Verify, then report

- Run the project's checks and build after implementation changes; this Astro project uses `npm run check` and `npm run build`.
- Check 1280, 1366, 1440, 1535/1536/1537, 1600, 1920, 2560, 3440, 3840 and a width beyond the previous cap. Adapt the lower boundary to the project.
- Assert measured values against `reference value × viewport / R`, expected column counts, no horizontal document overflow, no clipped/overlapping text or controls, and correct sticky offsets.
- Verify normal/200% text, keyboard controls, stored preference and invalid stored values. Check real browser zoom and default-font preferences separately when available.
- Compare changed-page scope on/off below the desktop boundary and regression-check unaffected routes. Document an intentional boundary jump; do not call it smooth interpolation.
- Compare screenshots at the same aspect ratio, section top, loaded fonts/media and animation state. Different aspect ratios may show different folds; do not force section counts with fixed heights.
- Recheck the built local site, not only the development server. Bind previews to `127.0.0.1`; do not tunnel, upload, deploy or activate external services.

Deliver changed paths, approved reference/formula, representative measured values, local preview, screenshots/check evidence and precise remaining gaps. Distinguish executed browser checks from formulas, prepared test prompts and unrun cross-browser checks.

## Project references

Paths below are relative to this repository root:
- `src/styles/home-desktop.css`: implemented home-only 1920px reference.
- `src/components/home/TextSize.astro`: tested text controls and header measurement.
- `docs/home-scaling/check.browser.js`: project-specific browser assertions; adapt selectors/values before reuse.
- `docs/home-scaling/validation.md`: measurements, evidence, boundary behavior and image-resolution limits.

The sibling `Desktop_Responsive_Scaling_SOP/` is the earlier **capped** proposal. Do not copy its curve into an uncapped implementation or treat its illustrative portfolio counts as this home page's approved composition.
