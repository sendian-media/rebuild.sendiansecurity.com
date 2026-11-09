# Services page design and asset provenance

- Reference: Figma file `SISS`, Page 1, section `Sendian · Services page — desktop 1440` (`57:1852`), frame `Services page · Sendian services × convergint-inspired` (`58:2079`), inspected through the connected Figma Desktop Bridge.
- The section also contains an earlier `Services page · Sendian website content structure` variant (`58:2080`-range frame); the convergint-inspired design was approved for implementation and the simpler variant was not built.
- The frame's single image, the services banner, was restored from `archive/sendian-security-before-rebuild-2026-11-09_124101.tar.gz` (`public/images/services/services-banner.jpg`). Its SHA-1 matched the Figma image-fill hash (`6471789172d2d98589ab2e08cd90394656f50e1d`) byte-for-byte before restoration.
- Fonts are the locally served Montserrat and Roboto already used by the homepage; no new fonts were added. The design's Roboto Medium "Learn more" labels render with the loaded Roboto weights.
- The Figma file provides only a desktop (1440) frame, so smaller-screen layouts are adaptations, not separate designs. The dark band and hero use 45° gradients transcribed from the frame's gradient fills.
- Service cards have no destination pages in the Figma file; "Learn more" links to the homepage contact section (`/#contact`). The hero vendor-registration button reuses the shared `/vendor-registration` route from the header.
- Shared header, footer, SEO head, and the 1920px-reference desktop scaling (`src/styles/desktop-pages.css`) are reused; services-specific styles use the `sv-` prefix in `src/styles/global.css`.
