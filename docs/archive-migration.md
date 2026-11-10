# Archived site migration

Source: the local, private `archive/sendian-security-before-rebuild-2026-11-09_124101.tar.gz`. The archive is not published. Existing homepage and services images and their provenance are documented in `docs/figma-homepage-assets.md` and `docs/figma-services-assets.md`.

- Restored `public/favicon.ico`, `public/favicon-16x16.png`, and `public/favicon-32x32.png` from the archive's `public/` directory.
- The existing `public/images/home/logo-header.png` already matches the archived logo (SHA-256 `1c9ef79ca463ae31b0ceff8d02dad6b692bd35b3117216dc00001405a91c3b6c`); it remains in the existing header and footer.
- Organization and article structured data and selected page metadata are adapted from the archived `src/components/seo/SeoHead.astro` and `docs/seo-audit-2026-10-19.md`, using current page content and contact details.
- The archived audit's three matching `/security/` article URLs and `/projects`, `/portfolios`, and `/portfolio/towers` redirect to the corresponding current pages. Other legacy routes have not been recreated or redirected without a suitable equivalent.
- The staging `noindex` and `robots.txt` block remain in place. External services, forms, analytics, hosting redirects and deployment were not enabled. Review current business information and SEO before launch.
