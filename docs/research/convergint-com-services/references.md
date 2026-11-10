# Convergint systems layout reference

- Source: https://www.convergint.com/sa/systems/
- Local route and owner: `/services` — `src/pages/services.astro`; existing service copy remains in `src/data/services.ts`.
- Scope: adapt the systems-section composition and card treatment only. Keep Sendian’s existing header, hero, three service groups, descriptions, calls to action, and metrics. Do not copy Convergint copy, branding, scripts, or remote assets.
- Approved composition: retain three service groups; each group has its eyebrow, heading, and introduction in a left rail beside three columns of image cards. Cards use a wide local image, blue title, short description, and blue pill link. Two-column tablet and single-column mobile layouts.
- Source evidence: user supplied local screenshot at `/Users/farsin/Library/Caches/com.raycast.macos/Clipboard/c2b77b933171e2837b17cdc6b04a27f7d8201832740bc060e0803b961f9f6a96.png` (1920 × 874). Browser inspection: 1920 × 874 viewport, scroll position 1136; source cards appear three across, 448 × 464 px, with a 16:9 image above a white text panel. The source page also has a cookie dialog; it is not part of the requested design and is not reproduced.
- Local comparison: browser screenshot `/Users/farsin/.agent-browser/tmp/screenshots/screenshot-1794301961085.png` at 1920 × 874, first group top; measured 1440px content shell, 347 × 195px card images, all 18 local images loaded, no horizontal overflow. At 768 × 1024, cards use two 350px columns with no horizontal overflow; at 375 × 812, cards collapse to one 335px column with no horizontal overflow.
- Assets: use only existing local Sendian images from `public/sites/sendiansecurity-com/home/services/`, mapped to matching service categories. No external runtime assets are added.
- Unchecked: source mobile states and full source page interaction behavior were not relevant to the approved static card layout; no production form or outbound CTA was activated.
