# Desktop responsive scaling — implementation standard

Prepared 3 November 2026 for Sendian Paints and Sendian Security.

## 1. Desired result and scope

Use the approved medium desktop as the reference composition. Keep the same content order, column counts, alignment, image ratios and visual hierarchy as desktop windows grow. Make container width, type, spacing, cards, logos and controls follow a coordinated scale rather than adjusting each one independently.

Scope: desktop CSS viewports, provisionally 1280–3840 CSS pixels. Existing tablet and mobile rules remain separate. The 1280 boundary is a project choice, not a device classification; replace it if the existing desktop navigation needs a different boundary.

Work with CSS viewport width, not the monitor's physical pixels or inches. A 4K monitor can expose a 1920-CSS-pixel window at common display scaling settings. Record viewport size, operating-system scaling, browser zoom and device-pixel ratio before comparing screenshots. A browser window that is not maximized also has a smaller viewport.

The two supplied screenshots show different apparent scale and whitespace, but do not establish their original CSS viewports, zoom or operating-system scaling. Do not derive production breakpoints from their bitmap sizes.

## 2. Findings from the current sites

Read-only inspection on 3 November 2026; no website files were changed.

### Sendian Paints staging

URL inspected: https://staging.sendianpaints.com/en

At the inspection viewport (1363 CSS pixels wide, DPR 1), the browser reported:

| Element | Computed value |
|---|---:|
| Root font size | 16px |
| `.spc-container` outer maximum width | 1280px |
| Container inline padding at this width | 32px per side |
| Hero H1 | 56px |
| Standard section H2 | 30px |
| Hero paragraph | 20px |

The loaded stylesheet and rendered classes also contain the following rules. The breakpoint is `min-width: 96rem` (1536 CSS pixels with a 16px browser default):

| Existing rule | Consequence at the breakpoint |
|---|---|
| `2xl:max-w-none` | Removes the 1280px shell limit. |
| `2xl:px-[clamp(2rem,5vw,8rem)]` | Sets each gutter to 76.8px at 1536, after a 32px gutter below the breakpoint. |
| H2: `2xl:text-[clamp(2.25rem,3vw,3.75rem)]` | Becomes 46.08px at 1536, compared with the 30px base section heading: approximately a 54% increase. |
| Hero paragraph: `2xl:text-[clamp(1.125rem,1.1vw,1.375rem)]` | Becomes 18px at 1536, compared with 20px immediately below the breakpoint. |
| `gap: clamp(1.5rem,0.75vw,1rem)` | Minimum exceeds maximum. With this fixed rem relationship, the result is always 1.5rem; it does not supply the intended fluid gap. |

The breakpoint values above are calculated from the loaded rules, not a claim that a full screenshot regression has been performed at 1536. These independent rules explain a concrete source of inconsistent desktop proportions. Replace them with shared tokens rather than layering another collection of independent `2xl` overrides over them.

### Sendian Security

URL inspected: https://sendiansecurity.com/

The portfolio section uses `container mx-auto px-8`, a four-column desktop grid, a 16px desktop grid gap and 80px vertical section padding at the inspected width. Its title was 36px. These dimensions are not all tied to a shared viewport scale.

Keep its four-card composition and existing brand styling. Coordinate its container, image sizing, heading, captions, grid gaps and section padding through tokens. Use its own measured baseline values; do not impose the Paints heading sizes on SISS.

## 3. Architecture and scaling policy

Use a shared desktop design unit with semantic tokens. Do not scale the entire document using `transform: scale()`, CSS `zoom`, JavaScript resize loops, or a viewport-only root font size. Those methods can introduce document-flow, overflow or text-enlargement problems.

Keep `html { font-size: 100%; }` or the browser's equivalent default. Leaving the default unchanged does not itself fix existing fixed-pixel or independently bounded component rules.

The starter uses:

```css
--ds-u: clamp(1rem, calc(0.25rem + 0.833333vw), 2.25rem);
```

At a 16px root, this is a deliberately near-proportional curve: 16px at 1440, 20px at 1920 and 36px at 3840. The unit stops shrinking below its minimum and stops growing above its maximum. Every geometric token and default type token is a multiple of that unit, preserving their internal ratios while the unit is fluid.

This is a proposed preset, not a web standard or an exact screenshot-enlargement equation. It was chosen to demonstrate coordinated scaling across a wide desktop range. Set the reference width and upper limit from the approved project, then derive the curve once.

For two target unit values, with a 16px root:

```text
m = (upper_unit_px - reference_unit_px) / (upper_viewport_px - reference_viewport_px)
b = reference_unit_px - m * reference_viewport_px
preferred_value = (b / 16)rem + (100 * m)vw
```

Keep the rem term and test it with user font preferences. If the default root differs, the numerical reference widths and values change; do not overwrite the user's preference to recover a screenshot.

Example output from the supplied preset, assuming 16px root and normal text size:

| CSS viewport | Unit | Shell outer width | H1 | Section H2 | 24px reference gap |
|---:|---:|---:|---:|---:|---:|
| 1440 | 16.00 | 1280 | 56.0 | 30.0 | 24.0 |
| 1920 | 20.00 | 1600 | 70.0 | 37.5 | 30.0 |
| 2560 | 25.33 | 2027 | 88.7 | 47.5 | 38.0 |
| 3440 | 32.67 | 2613 | 114.3 | 61.3 | 49.0 |
| 3840 | 36.00 | 2880 | 126.0 | 67.5 | 54.0 |

Shell width includes its padding. At the reference size it has 32px internal gutters and 1216px usable content. Avoid adding a second set of gutters to nested containers.

The shell occupies a slightly smaller percentage of the screen as the viewport grows: this preset preserves internal component ratios, not an identical screen occupancy percentage. Above the cap it intentionally centers the composition and lets outer margins grow. Choose a different cap if the website is primarily intended for a fixed large display.

Exact width-based enlargement would use `scale = viewport_width / reference_width`, so 24px at 1440 becomes 32px at 1920. A corresponding unit would be `1.111111vw`. That can preserve screen proportions within an uncapped range, but applying it to all text can counteract browser zoom. It is not the recommended default for a public website. Do not call a viewport-only font system accessible simply because it is wrapped in `clamp()`.

Different viewport aspect ratios will still reveal different amounts of vertical content. Keep sections in normal flow; do not force the same number of sections into every screen height.

## 4. Rules for each part of the website

| Part | Rule |
|---|---|
| Page shell | One shared outer container token; centered. No separate fixed `max-width` at each desktop breakpoint. |
| Full-width sections | Let the background fill the viewport; put readable content inside the shared shell. |
| Section spacing | Apply a shared vertical padding token to one owner only. Avoid both parent and child adding the full section padding. |
| Headings | Use visual classes such as `.ds-h1`, `.ds-h2`, `.ds-h3`; keep semantic heading levels appropriate to the content. |
| Typography | Shared tokens, relative font sizing, unitless line heights and em letter spacing. Preserve existing font families, weights and brand treatment. |
| Paragraphs | Constrain reading measure, approximately `60–65ch` as a project starting point. A paragraph is not obliged to fill a wide grid column. |
| Grids | Preserve the reference count explicitly, e.g. four columns. Avoid `auto-fit` if an extra column would change the approved desktop composition. |
| Cards | Fluid grid tracks; `minmax(0,1fr)` and `min-inline-size:0` to allow content to fit. No fixed text-box heights. |
| Photography | Approved `aspect-ratio`; image width and height fill that box using `object-fit:cover`. Review the focal point. Use `contain` for logos and uncropped product assets. |
| Buttons | Content-based sizing, padding tokens, `min-height` rather than fixed height, and room for text wrapping. |
| Header/footer | Same sizing tokens; text-containing rows can wrap when text is enlarged. Keep logos at their intrinsic aspect ratio. |
| Icons | Use `em` when the icon should follow its label; geometric tokens when it should follow layout scale. SVG is preferable for simple icons. |
| Borders | Usually keep a visual hairline at 1px. Scaling every border is not necessary. |
| Hero | Normal content flow and an appropriate `min-height`; do not use a hard fixed height that clips enlarged text. |
| Sticky header | Derive sticky offsets and `scroll-margin-block-start` from the header dimensions, including its enlarged-text state. |
| Images served | Supply `srcset` and accurate `sizes`, not just a stretched thumbnail. At the 4K preset, a four-column card is approximately 657 CSS pixels wide; select enough source pixels for its DPR. |

`ch` measures font character width; it does not guarantee an exact number of characters per line. Different languages need their own measure and line-height review.

## 5. SOP A — retrofit an existing website

1. **Create a reversible staging checkpoint.** Keep a backup or commit of the current approved design. Inventory page templates and shared components before editing.
2. **Confirm the reference viewport.** Use the actual medium desktop size at 100% browser zoom. The starter assumes 1440; replace that assumption if the approved reference is 1366 or 1536.
3. **Record computed values.** Capture container width including padding, type sizes and line heights, grid counts, gaps, section padding, image ratios, button padding and header height. Record English and Arabic states where applicable.
4. **Audit inconsistent rules.** Find `px`, `max-width`, `min-width`, fixed heights, `vw`, `clamp()`, `xl:` and `2xl:` overrides, inline styles, `!important`, manual line breaks and theme/builder settings. Inspect rendered computed styles, not source text alone.
5. **Define tokens from the reference.** Convert each reference value to a multiple of the reference unit: for example, 80px section padding becomes `5 * unit`, 30px H2 becomes `1.875 * unit`, and 16px grid gap becomes `1 * unit` when unit = 16px.
6. **Integrate one representative section.** Add `.ds-system` to a stable page or body wrapper; use the shared container, section, heading, grid and media classes. Start with the portfolio or sector section and preserve its content, colours, font family and layout.
7. **Remove competing rules at their source.** On Paints, replace migrated `2xl:max-w-none`, independent `2xl:px-[...]`, individual text clamps and gap clamps. Update the shared header/footer too. Do not remove unrelated breakpoint rules needed by narrower layouts.
8. **Check the cascade.** Prefer a maintained global stylesheet after the theme/builder styles, or a deliberate CSS layer order in the project. Tailwind utility layers and unlayered custom rules have different cascade precedence; confirm the winning declaration in DevTools. Do not accumulate blanket `!important` overrides. Preserve existing Arabic typography exceptions intentionally.
9. **Verify the reference before scaling out.** The reference viewport should match the approved design. The starter H2 = 30px is Paints-inspired; SISS needs its own 36px reference token. Copying the starter without token calibration is not a faithful retrofit.
10. **Roll through shared components and templates.** Migrate header, footer, home, about, services, project grids, project detail pages, news and contact forms. Each migrated component must use tokens consistently.
11. **Provide text enlargement.** Follow section 8. Do not assume a mixed `rem + vw` expression automatically passes zoom requirements.
12. **Run the acceptance matrix.** Fix the token or shared component responsible for a problem. Add a viewport exception only when there is a real content-fit or composition reason.
13. **Release and retain rollback.** Clear only relevant caches, verify the public CSS version, and repeat a focused check on the released site.

### Framework and builder notes

**Paints' current build:** shared `.spc-container` and `font-display-*` classes plus responsive utility classes are visible in the delivered page. Change the shared style definitions and remove the migrated competing utilities in the component source. Editing compiled production CSS is not the durable fix.

**Tailwind-style projects:** use shared semantic classes or utilities that reference the tokens, such as `gap-[var(--ds-grid-gap)]`. Do not redefine the framework's entire spacing variable unless every affected component has been audited.

**WordPress/Elementor projects:** put the token definitions in a maintained global stylesheet or child theme; add semantic classes in the builder; remove conflicting widget-level desktop width, typography and spacing settings. Export/checkpoint templates first. This is conditional integration guidance, not a claim that the inspected Paints site uses WordPress.

## 6. SOP B — build a new website

1. Approve one desktop reference width and a maximum supported width. Define the large-screen cap and content-fill policy explicitly.
2. Design the reference composition: container, gutter, type hierarchy, spacing scale, grid counts, image ratios and button treatment.
3. Implement tokens before page-specific sections. Use the same shared header, container, section, typography and card primitives across the project.
4. Build one representative page with real longest-case copy and actual image ratios. Verify the medium reference and the largest viewport before replicating its sections.
5. Keep layout choices distinct from sizing. A four-column reference stays four columns throughout the approved desktop range unless there is an intentional documented exception.
6. Use content-based heights, semantic headings, logical properties (`inline`, `block`) and normal-flow layouts. Keep brand styling separate from geometry and text tokens.
7. Serve appropriate image variants and actual web fonts. Wait for fonts and images to load before approving line wraps or screenshot comparisons.
8. Integrate and verify text enlargement; test the header, form fields, buttons, captions and long headings as well as body text.
9. Run the acceptance matrix before adding more page templates. Document approved exceptions with their reason.
10. Keep tablet/mobile implementation in its own responsive rules. A narrow desktop window or browser zoom may activate those layouts, so their existence still matters even though this SOP does not prescribe them.

## 7. Integration example

This markup demonstrates the shared classes; keep the site's existing colours, fonts and button skin. Include the CSS once in the layout. Add `.ds-system` to the body or a wrapper containing both shared navigation and page content.

```html
<body class="existing-brand ds-system">
  <!-- Existing header, mapped to the same token system -->
  <main>
    <section class="ds-section" aria-labelledby="portfolio-heading">
      <div class="ds-container">
        <div class="ds-section-head ds-stack">
          <p class="ds-caption">Our work</p>
          <h2 id="portfolio-heading" class="ds-h2">Our portfolio of excellence</h2>
          <p class="ds-body ds-prose">Existing approved introduction.</p>
        </div>
        <div class="ds-grid ds-grid--4 ds-grid--tight">
          <article class="ds-card">
            <div class="ds-card-media">
              <img src="/project.jpg" alt="Descriptive project name"
                   width="1200" height="800" loading="lazy">
            </div>
            <h3 class="ds-card-title">Existing project name</h3>
          </article>
          <!-- Repeat existing cards; retain the approved order. -->
        </div>
      </div>
    </section>
  </main>
</body>
```

Use `.ds-grid--3` for an existing three-column section. Add section-specific visual modifiers without hardcoding a different scale.

## 8. Text enlargement — required decision for proportional type

The starter deliberately scales text and geometry together because that matches the requested visual behaviour. Width-driven typography can partially counteract browser zoom as the CSS viewport shrinks. Mixing rem and vw helps retain a user-relative component, but is not proof of adequate text enlargement.

WCAG 1.4.4 requires a way to enlarge text to 200% without losing content or functionality. Test the finished layout. If relying on browser zoom, check actual visual enlargement across applicable breakpoints, not just whether the browser indicator says 200%.

Choose one of these routes before release:

- Keep the proportional preset and integrate the supplied independent text-size controls. The control multiplies **all mapped text tokens**, not the viewport or the entire document. At a fixed viewport, 200% produces twice the normal computed type size. Test the resulting content wrapping and functionality.
- Replace type tokens with a less fluid or rem-based typography system and prove the supported browser/text resizing mechanism reaches 200%. This trades exact type-to-card proportions for more stable reading sizes. Layout geometry may keep its shared fluid scale.

Example controls for the included JavaScript (place in an accessible, discoverable appearance/settings area and retain existing button styling):

```html
<div class="ds-actions" role="group" aria-label="Text size">
  <button type="button" class="ds-button" data-ds-text-scale="1" aria-pressed="true">100%</button>
  <button type="button" class="ds-button" data-ds-text-scale="1.25" aria-pressed="false">125%</button>
  <button type="button" class="ds-button" data-ds-text-scale="1.5" aria-pressed="false">150%</button>
  <button type="button" class="ds-button" data-ds-text-scale="2" aria-pressed="false">200%</button>
</div>
<script src="/text-size-controls.js" defer></script>
```

The helper remembers the preference where storage is available. Its CSS scope applies the scaling on desktop only; other layouts retain their own rules and still need their own accessibility checks. Existing elements with hardcoded type sizes do not inherit the mapped token behaviour: migrate them too. The example is an integration aid, not a certification of either live website.

Do not block browser zoom, hide overflowing text, shrink enlarged text to make it fit, or add fixed text heights to preserve the screenshot.

## 9. Acceptance and regression matrix

Test in the project's supported Chrome/Edge, Firefox and Safari versions. Widths below are CSS pixels, not physical screen resolutions.

| Check | Sizes / states | Pass condition |
|---|---|---|
| Reference | Chosen medium viewport at 100% zoom | Matches approved composition and measured reference values. |
| Desktop interpolation | 1280, 1366, 1440, 1536, 1600, 1920, 2560, 3440, 3840 | No unexpected changes in column count, order, alignment or component ratios. |
| Breakpoint edges | Existing breakpoint minus/plus 1px; especially 1535/1536/1537 while migrating | No heading/paragraph jumps or shrinking caused by contradictory rules. |
| Height/aspect ratio | Include 1440×900, 1920×1080, 2560×1440, 3440×1440, 3840×2160 | Normal flow; different visible fold positions are acceptable. |
| Overflow | Every template at normal and enlarged text | No unwanted horizontal document scrolling; no clipped controls or text. |
| Browser zoom | 100%, 125%, 150%, 200%, plus further zoom if needed for reflow checks | Usable navigation and forms; record actual type enlargement and layout state. |
| Independent text sizing | Normal and 200% at the same desktop viewport if using the supplied control | Every mapped text size doubles; content/functionality remain available. |
| User font preference | Change the browser default font size | Text is usable; no reliance on forcing a 16px root. |
| Content extremes | Long project names, paragraphs, dropdowns, form errors | Wraps without overlap or missing content. |
| Language | English and Arabic, where supported | Proper direction, line heights, wrapping, menu fit and logical spacing. |
| Media | Largest display plus DPR 1 and 2 cases where relevant | Appropriate image source size, consistent crop, undistorted logos. |
| Shared elements | Header, footer, menus, sticky elements, forms, modal dialogs | Same token system and working keyboard interactions. |

For visual comparison, capture each section at its own top edge and normalize screenshot width. Compare layout proportions and hierarchy rather than demanding the same fold on different aspect ratios. Preserve animation/reveal states consistently during screenshot QA.

Record each intentional exception, its owner and reason. Do not hide an overflow defect with `overflow-x:hidden` on the body.

## 10. Developer handoff

> Preserve the approved medium desktop composition of the existing website. Audit its current computed dimensions, define a shared desktop design unit and semantic sizing tokens, and migrate containers, headings, body text, spacing, grids, imagery, header, footer and controls to those tokens. Remove migrated independent large-screen overrides at their source. Keep the approved desktop column counts and brand styling. Calibrate the supplied starter to the actual reference viewport and baseline values. Keep narrower layouts in their own rules. Verify intermediate widths, wide monitors, text enlargement, long copy, Arabic where applicable, image resolution, and interactions before release. Do not use whole-page zoom or transforms as the responsive implementation. Deliver the source changes, reference measurements, screenshots and completed acceptance matrix.

## 11. Package and validation status

- `desktop-system.css`: scoped desktop token system and reusable layout classes.
- `text-size-controls.js`: independent text-size integration example for the proportional typography route.
- `SOP.md`: findings, design decisions, migration and new-build workflows, and acceptance criteria.
- `validation.md`: static formula and JavaScript syntax checks, with browser validation still required. These do not mean the live websites were modified or fully tested.

## Primary references

- MDN, clamp(): https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp
- MDN, responsive design and fluid typography: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design
- MDN, font-size and relative units: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-size
- W3C, Resize Text: https://www.w3.org/WAI/WCAG21/Understanding/resize-text
- W3C, viewport-unit text resizing failure F94: https://www.w3.org/WAI/WCAG22/Techniques/failures/F94
- MDN, aspect-ratio: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio
- MDN, responsive images: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images
