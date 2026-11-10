# Wider desktop content — current approved width

The user approved **1440px content at a 1920px CSS viewport** (75% of the screen), replacing the earlier 1200px/62.5% shell. Header, section containers and footer share this width across Home, About, Portfolio (including filtered views) and Services. The existing uncapped viewport scale remains; this is not a fixed 1440px maximum.

| CSS viewport | Content width | Margin per side |
| ---: | ---: | ---: |
| 1280 | 960 | 160 |
| 1536 | 1152 | 192 |
| 1920 | 1440 | 240 |
| 2560 | 1920 | 320 |
| 3840 | 2880 | 480 |

## Changes and preservation

Only two application CSS declarations changed: Home's `--ds-shell` and the shared About/Portfolio/Services `.container` width, both from 1200 to 1440 reference pixels. Existing typography, cards' column counts, hero designs, source assets and rules below 1280px were left unchanged. Source checkpoint: `/tmp/sendian-width-1440.h3MxDN/src` (temporary).

The updated browser checks assert **every** `.container`, including header and footer. Portfolio card widths are checked relative to the enlarged grid, preserving the standard/medium/wide layout rather than imposing fixed pixel widths.

## Verification actually run

- `npm run check`: 0 errors, warnings or hints.
- `npm run build`: passed with the existing Vercel adapter. It warned that local Node 26 is unsupported by Vercel Functions and selected Node 24; no runtime/configuration changes were made.
- Both browser assertion scripts passed `node --check`. Generated Vercel static CSS contains the wider rules; no deployment was performed.
- Local Chrome at DPR 1, default font settings: all header/section/footer containers measured 1440px at 1920 and 2880px at 3840 on all four pages. Intermediate/small desktop widths are recorded in `portfolio-about-checks.json` and `home-services-checks.json`; checks covered 1280 and 2560 on Home, Portfolio and Services, 1536 on Portfolio, and 1280 on About.
- Expected About grid counts and Portfolio card width ratios passed; no horizontal document overflow or horizontally clipped tested text/controls was observed in those checks.
- Home's full existing grid/media/type/sticky-offset regression assertions passed at 1920 and 3840 (`home-regression.json`). H1 remained 64px at 1920 and hero minimum height remained 720px.
- Existing 200% text preference: About checked at 1920/1280, filtered Portfolio at 1280, Home at 1280/3840. Shell sizes remained unchanged by text enlargement and the layout checks passed (`enlarged-mobile-checks.json`). This does not certify all text on every route doubles.
- All four pages checked at 390px: original 350px container retained and no horizontal document overflow (`enlarged-mobile-checks.json`). App CSS diff confirmed no narrow-layout or typography rule changes.
- Four 1920px screenshots saved here: `home-1920.png`, `about-1920.png`, `portfolio-1920.png`, `services-1920.png`.

## Limits and existing behavior

The user's current shared `PageHero` design was preserved. Portfolio and Services currently use its fixed-size typography, while About maps it to the desktop text scale. Existing Services text controls are not initialized by the current shared script's page selector. Those pre-existing typography/control differences were not expanded into this width-only change.

Browser checks used the development server at `127.0.0.1:3889`; the Vercel production bundle was built, not launched or deployed. Safari/Firefox/Edge, real browser zoom, screen readers and high-DPR media quality were not retested. Existing source images may soften at larger sizes. The previously documented desktop/narrow boundary switch remains unchanged.
