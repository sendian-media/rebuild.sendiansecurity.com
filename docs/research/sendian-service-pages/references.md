# Sendian service-detail page research

## Scope and route map

- Reference design: [SafePath Networking Services](https://www.safepathtechnologies.com/services/networking-services/)
- Section-navigation reference: [Johnson Controls Video Surveillance Systems](https://www.johnsoncontrols.com/Security/Video-Surveillance/Video-Surveillance-Systems)
- Local routes: `/services/<slug>` for the 18 services already listed in `src/data/services.ts`.
- Page owner: `src/pages/services/[slug].astro`; shared SISS presentation: `src/components/sites/sendian-service-pages/ServiceDetail.astro`; original service briefs: `src/data/service-details.ts`.
- Existing `/services` route and Sendian header, footer, layouts, global styles and contact route are retained. Service index cards now link to the detailed routes.
- Work is local-only. No source scripts, analytics, external forms, remote widgets or third-party runtime assets are copied or activated.

## Design observations and adaptation

SafePath’s networking page has a dark, full-width banner with a fixed background image (`background-attachment: fixed`), a bold white service heading at the left, and a translucent breadcrumb panel at the right. At the 375px view the heading and breadcrumb stack and center. The page content below is an image-and-sidebar composition followed by a service overview, a “Why Choose Us” list, numbered solution sections, CTA and FAQs.

Johnson Controls’ page presents a compact white section-navigation row immediately after its banner: the service label, a divider, Overview and Solution anchors, and a Contact us CTA. The supplied screenshot shows the desktop treatment. The live text fetch confirmed those labels and content groupings; direct browser inspection timed out, so no interaction behavior is inferred beyond the supplied screenshot and fetched page text.

SISS adaptation: retain the SISS global shell and colors; use a local service image with a dark overlay for the parallax banner; put the title left and Home / Services / current-page breadcrumb right; place Overview, Solutions and Applications anchor links under the banner with a local `/contact` CTA. The overview uses a two-column story and related-services sidebar inspired by the supplied second screenshot. The page has no separate Support/AMC block or FAQ section. Mobile uses a stacked banner and horizontally scrollable section links; reduced-motion and narrow screens disable fixed-background movement.

## Source evidence

SafePath browser captures were made at scroll position 0:

| Capture | Viewport | File |
| --- | ---: | --- |
| SafePath desktop | 1440 × 900 | `docs/design-references/sendian-service-pages/safepath-networking-1440x900.png` |
| SafePath tablet | 768 × 1024 | `docs/design-references/sendian-service-pages/safepath-networking-768x1024.png` |
| SafePath mobile | 375 × 812 | `docs/design-references/sendian-service-pages/safepath-networking-375x812.png` |
| SISS CCTV desktop | 1440 × 900 | `docs/design-references/sendian-service-pages/siss-cctv-1440x900.png` |
| SISS CCTV tablet | 768 × 1024 | `docs/design-references/sendian-service-pages/siss-cctv-768x1024.png` |
| SISS CCTV mobile | 375 × 812 | `docs/design-references/sendian-service-pages/siss-cctv-375x812.png` |

The SISS captures show the initial hero state at scroll position 0. A SafePath FAQ question was opened during inspection without submitting a form. The captures above show the initial hero state. The user-supplied Johnson Controls screenshot and the supplied two-column content screenshot remain at their original clipboard-cache paths; they are treated as layout references, not runtime assets.

## Service content references

Service copy in `src/data/service-details.ts` is original SISS-oriented wording synthesized from these public pages and the current SISS service list. It is not competitor copy. Statements about SISS certifications, MOI/SSD approvals, response times, vendor partnerships, project experience, SLAs, pricing or service availability are intentionally not imported; confirm any such claims with SISS before publication.

| SISS service | Primary reference(s) |
| --- | --- |
| CCTV Surveillance — `/services/cctv-surveillance` | [Premier Infotech CCTV services](https://premierinfotech.qa/service/cctv-services/) |
| Access Control — `/services/access-control` | [Techspine Qatar](https://techspineqatar.com/access-control-system-qatar/) |
| Cyber Security — `/services/cyber-security` | [QCS Qatar Cyber Security](https://www.qcs-qatar.com/cyber-security-solutions/) |
| Structured Cabling — `/services/structured-cabling` | [AlphaStone Structured Cabling](https://alphastonecontracting.com/structured-cabling/) |
| Data Center — `/services/data-center` | [Electra Qatar Data Centre Solutions](https://www.electraqatar.com/service/data-centre-solutions) |
| Storage — `/services/storage-solutions` | [BCS / Pure Storage](https://bcs-me.com/ourvendor/pure-storage); [HPE Enterprise Storage](https://www.hpe.com/us/en/products/storage.html) |
| Parking Management — `/services/parking-management` | [Quest ME Parking Management](https://www.quest-me.com/parking-management-system/) |
| Parking Guidance — `/services/parking-guidance` | [KTC Qatar Parking Guidance](https://ktc-qatar.com/index.php/activities/details/car-parking-guidance-systems) |
| LPR / ANPR — `/services/lpr-anpr` | [Emirtech ANPR](https://emirtech.ae/anpr-licence-plate-recognition-abu-dhabi.html) |
| Unified Communication — `/services/unified-communications` | [Cisco Unified Communications Services](https://www.cisco.com/c/en/us/products/unified-communications/service-listing.html); [NetCare Qatar IP telephony](https://netcare.qa/unified-communication-ip-telephony/) |
| Enterprise Network — `/services/enterprise-network` | [Netcom Enterprise Networking](https://netcomss.com/services/enterprise-networking/) |
| Home Automation — `/services/home-automation` | [Aman Link Smart Home](https://aman.qa/smart-home/) |
| Audio Visual — `/services/audio-visual` | [ConvoSync AV Integration](https://www.convosync.com/services/av-systems-integration-smart-boardroom-solutions) |
| Video Solutions — `/services/video-solutions` | [Smart Wave AV](https://smartwaveav.com/); [ConvoSync AV Integration](https://www.convosync.com/services/av-systems-integration-smart-boardroom-solutions) |
| Annual Maintenance Contracts — `/services/annual-maintenance` | [Aman Link AMC](https://aman.qa/amc-services/) |
| Intercom — `/services/intercom` | [AlphaStone Video Intercom](https://alphastonecontracting.com/video-intercom/); [Aiphone IX / IXG](https://www.aiphone.com/products/ix-ixg-series/) |
| Smart WiFi — `/services/smart-wifi` | [EZELINK Enterprise WiFi](https://www.ezelink.com/solutions/enterprise-wifi-solutions/) |
| Cloud Solutions — `/services/cloud-solutions` | [FixIT Managed IT and Cloud](https://www.fixit-me.com/) |

Quest ME’s parking-management page was retrievable; an earlier Stebilex parking-management URL returned 403. For unified communications, the initially listed GulfTech URL exposed only generic carousel copy, so Cisco and Qatar IP-telephony references were used instead.

## Asset provenance and substitutions

- Detail-page hero backgrounds reuse the matching existing local service-card image; no SafePath or Johnson Controls image is downloaded or used at runtime.
- Image sources are recorded in [`docs/research/convergint-com-services/references.md`](../convergint-com-services/references.md). Most service imagery is Pexels-licensed; CCTV, cabling, LPR and AMC images are prior Sendian assets.
- The SafePath fixed-background effect is recreated with local photos and an overlay. SafePath logo, header, colors, body copy, floating contact widgets and remote form/chat behavior are not copied.
- The Johnson Controls navigation is adapted with Sendian styles and local anchors; its branding, green CTA and imagery are not copied.
