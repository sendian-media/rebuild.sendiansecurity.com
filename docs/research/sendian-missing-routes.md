# Missing linked routes

Reference: the previous local site archive `archive/sendian-security-before-rebuild-2026-11-09_124101.tar.gz` and `https://sendiansecurity.com/`, inspected for this local rebuild. Existing header, footer, and service links identify these missing routes:

| Reference | Local route | Owner | Substitution |
| --- | --- | --- | --- |
| `/vendor-registration` | `/vendor-registration` | `src/pages/vendor-registration.astro`, `src/components/sites/sendian-vendor-registration/` | Current site's shared hero, layout and existing contact details; disabled registration preview rather than external submission. |
| `/privacy` | `/privacy` | `src/pages/privacy.astro` | Archived placeholder, using the current site's shared hero. |
| `/terms` | `/terms` | `src/pages/terms.astro` | Archived placeholder, using the current site's shared hero. |

The archive also contains longer documents at `/privacy-policy-2` and `/terms-and-conditions`; these are not substituted for the placeholders without legal review. No assets were copied: the pages reuse existing local site assets. The archived vendor form fields and copy informed the preview; no archived scripts or form integration were used. Source screenshots and viewport comparisons were not captured for this pass.
