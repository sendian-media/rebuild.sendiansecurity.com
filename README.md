# Sendian Security — New website

A new website in progress, with a homepage based on the approved Figma design. The previous website is archived locally; its pages, CMS helpers, forms, analytics, and Sanity rebuild workflow are no longer active.

## Stack

Astro 7, Tailwind CSS 4, React 19, and TypeScript, using the existing npm dependencies and lockfile without upgrades. The standalone Node adapter is retained: this is a server-output project, not a static-only deployment. Prefer Astro components; add React islands only when needed.

Sanity and Portable Text packages remain installed for optional future use, but no service is connected. No credentials are required to check, build, or run this starter.

## Commands

Use Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
# Alternatively, run the built standalone server:
npm start
```

Development, preview, and start bind to `127.0.0.1:3888`. If that port is occupied, preview on a different local port:

```sh
npm run preview -- --port 3889
```

## Active files

- `src/pages/index.astro`: assembles the Figma-based homepage.
- `src/pages/services.astro`: the Figma-based services page; content in `src/data/services.ts`.
- `src/components/home/`: homepage sections and their content.
- `src/components/layout/`: shared header and footer.
- `src/components/seo/SeoHead.astro`: shared metadata and canonical URLs.
- `src/data/`: homepage content, navigation, and shared contact details.
- `src/layouts/BaseLayout.astro`: document shell, shared navigation, and main landmark.
- `src/styles/global.css`: Tailwind entry point and homepage styles.
- `public/`: local images and fonts. See `docs/figma-homepage-assets.md` for provenance.
- `astro.config.mjs`: React, Tailwind, sitemap, and standalone Node configuration.
- `.github/workflows/quality.yml`: check and build only; no deployment or CMS secrets.

The existing private `.env` is untouched and excluded from the backup and Git. The starter does not call CMS, email, forms, or analytics services. `.env.example` lists only the optional site URL setting.

## Previous website archive

- File: `archive/sendian-security-before-rebuild-2026-11-09_124101.tar.gz`
- SHA-256: `f20e42ac57a32b6eee0ad8d74d32108a258595723ee7cd22bbbd79106e00056e`
- Verified: 1,353 files matched the original working tree byte-for-byte by SHA-256 before replacement.
- Includes: previous source, public assets, documentation, tests, configuration, `.git` history, uncommitted edits, and the untracked homepage PDF.
- Excludes: `.env`, `node_modules/`, `.astro/`, `dist/`, `archive/`, and `.DS_Store` files.

The archive is private, Git-ignored, and outside `public/`; it is not shipped with the website. It contains Git metadata and local configuration: do not publish or upload it. It is a local backup only, not an off-device backup.

To inspect or restore the old website, extract into a **separate directory**, never over this active project:

```sh
shasum -a 256 archive/sendian-security-before-rebuild-2026-11-09_124101.tar.gz
mkdir ../sendian-security-previous
tar -xzf archive/sendian-security-before-rebuild-2026-11-09_124101.tar.gz -C ../sendian-security-previous
```

Dependencies and private environment values must be supplied separately if running the restored website. The preserved `.git` also retains the original remote configuration; do not push from a restored copy unintentionally.

## Before launch

This is an unfinished local website. The homepage, about, portfolio, and services pages are implemented; other linked routes still need their pages built. The shared SEO component uses `noindex, nofollow`, and `public/robots.txt` blocks crawling. Review both before launch. Rebuild required pages, review SEO and old-URL redirects, and explicitly approve any external services or deployment before activation. Do not deploy this work over the existing public site.
