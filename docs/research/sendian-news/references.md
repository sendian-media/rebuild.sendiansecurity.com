# News detail reference

- Source: https://sendiansecurity.com/news/ongoing-project-cctv-surveillance-system-installation-at-qatar-finland-international-school
- Authorized scope: all news detail pages, local-only; existing site shell retained.
- Route map: `/news/<source-slug>` for the five articles listed in `src/data/news.ts`; listing links point to these routes.
- Ownership: `src/pages/news/[slug].astro`, `src/components/sites/sendian-news/NewsDetail.astro`, and news data. Listing titles link to the new pages.
- Reference observed: a wide article column with category, headline, summary, date, 16:9 image, topic, body text, and related-news sidebar. At a 1280px viewport the measured content grid was 1200px wide, with 816px main content, 64px gap, and 320px sidebar. Browser inspection was at the initial desktop state.
- Text: sourced from the five corresponding sendiansecurity.com news pages. Categories and dates retain the existing local listing values.
- Images: existing local `/images/news/` listing assets reused as detail and related images; no new remote assets downloaded. The reference article's additional in-body photograph is omitted. The existing local Montserrat and Roboto fonts and shared header/footer are retained rather than replacing the site's shell.
- Changes from the reference: added an all-news return link and a sidebar link to the listing; the sidebar stacks after the article on narrow screens.
