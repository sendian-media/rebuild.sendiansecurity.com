# Uncapped proportional implementation patterns

## Reference arithmetic

For CSS reference viewport `R`, reference dimension `D`, and current CSS viewport `W`:

```text
scale = W / R
computed dimension = D × scale
```

Use CSS viewport width, not physical display resolution. A screenshot bitmap cannot establish `R` without its viewport/DPR/zoom information. Two monitors exposing the same CSS viewport should compute the same layout regardless of their physical pixels.

The approved Sendian home reference is 1920px, not the earlier SOP's 1440px starter. Its content width is 1200px, or 62.5% of the viewport:

| CSS width | Content | H1 (64px reference) | Hero minimum (720px reference) |
| ---: | ---: | ---: | ---: |
| 1280 | 800 | 42.67 | 480 |
| 1440 | 900 | 48 | 540 |
| 1920 | 1200 | 64 | 720 |
| 2560 | 1600 | 85.33 | 960 |
| 3440 | 2150 | 114.67 | 1290 |
| 3840 | 2400 | 128 | 1440 |
| 5120 | 3200 | 170.67 | 1920 |

A different reference uses different values. For example, a 1184px shell and 56px H1 at 1440 become approximately 1578.67px and 74.67px at 1920.

## CSS pattern

This pattern demonstrates sizing, not a complete site patch. Scope the desktop boundary and calibrate every token from rendered measurements.

```css
@media (min-width: 1280px) {
  .page-scope {
    /* R = 1920: u is 16px at the reference; px is one reference pixel. */
    --ds-u: calc(100vw / 120);
    --ds-px: calc(var(--ds-u) / 16);
    --ds-type-px: calc(var(--ds-px) * var(--ds-user-text-scale, 1));
    --ds-shell: calc(1200 * var(--ds-px));
    --ds-grid-gap: calc(24 * var(--ds-px));
    --ds-text-h1: calc(64 * var(--ds-type-px));
    --ds-text-body: calc(16 * var(--ds-type-px));
    font-size: var(--ds-text-body);
  }
  .page-scope .container {
    width: var(--ds-shell);
    max-width: none;
    margin-inline: auto;
  }
  .page-scope .hero {
    min-height: calc(720 * var(--ds-px));
  }
  .page-scope .hero h1 { font-size: var(--ds-text-h1); }
  .page-scope .cards {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--ds-grid-gap);
  }
  .page-scope .cards > * { min-inline-size: 0; }
}
```

For another reference width, use `--ds-px: calc(100vw / R)` with the approved numeric width substituted for `R`. Do not add a JavaScript resize implementation.

### Cascade and container checks

1. Find every page shell and nested shell; determine whether reference measurements include padding.
2. Inspect both computed `width` and `max-width` at the reference and beyond each framework breakpoint.
3. A custom `width` alone does not remove Tailwind's inherited `max-width`. Scope `max-width: none` (and clear logical equivalents if present) to the migrated shell.
4. Check the actual winning rule. Use deliberate specificity or stylesheet/layer order rather than blanket `!important`.
5. Preserve unrelated shared styles. If home alone is in scope, changing a shared `.container` globally would leak the migration to other routes.

Removing a fixed maximum does not mean edge-to-edge content. The approved shell may retain proportional outer margins. Paragraphs may still use a `60–65ch` reading measure.

### Narrow-layout boundary

The new desktop policy and the old narrower layout can have different proportions at the handoff. In the current home, 1279px uses the old layout, while 1280px starts the 1920-reference desktop composition. This is intentional but visibly discontinuous.

If the user requires a smooth boundary too, surface that additional decision: choose another handoff or explicitly approve adjustments to the narrow layout. Do not silently reshape tablet/mobile to conceal the jump, and do not claim continuity from wide-screen checks alone.

## Text and flow

At normal settings, type and geometry share the same viewport unit. An independent multiplier changes only type:

```text
normal type = reference type × W / R × default-font preference factor
200% type = normal type × 2
```

Use an existing appearance/settings UI where available. Otherwise the tested project example uses native footer `<details>` and buttons with `aria-pressed`. The script accepts only 1, 1.25, 1.5 or 2; storage failures preserve a working in-session preference. Its default-font factor is computed from the user-relative root at page load; it never overwrites the root.

Map all text, including text inherited from body, labels, navigation, headings, descriptions, buttons, carousel captions and footer. Enumerating text-bearing elements and comparing computed sizes catches missed fixed-pixel declarations better than checking H1 alone.

Use `min-height` and wrapping for header, hero, cards and actions. Keep media boxes at their approved aspect ratios; inspect absolute captions for overlap with slide controls and numbers. Growing text should cause legitimate wrapping/flow changes rather than be shrunk or clipped back into the reference image.

Measure an enlarged sticky header's real height for scroll margins. A header `ResizeObserver` is an offset measurement, not a layout scaling engine. Avoid a resize feedback loop by not using its output to set the observed header's height.

If JavaScript-dependent text controls cannot be approved or supported, offer rem-based typography with fluid geometry and verify the available resizing mechanism. That is a different typography policy; disclose the trade-off.

## Media and comparison

Keep approved image ratios and focal points. Use `object-fit: cover` for cropped photography and `contain` for logos/certificates. Preserve intrinsic logo proportions even if their layout boxes are scaled.

Required source pixels are approximately `rendered CSS width × DPR`. Reuse authorized local source variants with accurate `srcset`/`sizes` where available. Do not fabricate resolution by upscaling a small original; report missing high-DPR sources.

Freeze carousels/reveal/wave states only for deterministic QA, without changing production behavior. Compare matching-aspect-ratio screenshots normalized to the same width. Border rasterization and hairlines can differ; judge composition and measured ratios, not arbitrary pixel identity.

## Verification status

The existing Sendian home has browser evidence in `docs/home-scaling/`. That evidence validates the implementation, not future execution of this skill. Prepared prompts in `evals/evals.json` are not proof of independent agent performance.

Record each check as passed, failed or not run. Compilation is not a visual check; a formula is not a rendered measurement; independent 200% text sizing is not a claim that real browser zoom or all accessibility criteria passed.
