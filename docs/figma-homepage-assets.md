# Homepage design and asset provenance

- Reference: Figma file `SISS`, Page 1, frame `Sendian — Desktop Homepage · 1440` (`4:2`), inspected through the connected Figma Desktop Bridge.
- All 17 unique images used in the frame were restored from `archive/sendian-security-before-rebuild-2026-11-09_124101.tar.gz`. Each image's SHA-1 matched its Figma image-fill hash byte-for-byte before restoration. Paths are under `public/images/` and `public/sites/sendiansecurity-com/home/`.
- Figma specifies Montserrat and Roboto. Their Latin WOFF2 files were downloaded from Google Fonts and are served locally from `public/fonts/`. Arrows not present in the Latin subsets use the browser's fallback font.
- The Figma file contains only a desktop homepage frame, so the smaller-screen layout is an adaptation rather than a separate Figma design. The hero wave paths were transcribed from the frame's vector nodes.
- Figma did not specify a LinkedIn destination; its icon is non-interactive until a destination is supplied. Non-homepage routes are not part of this implementation. The consultation link opens the email address shown in the Figma footer; no external form or analytics is activated.
