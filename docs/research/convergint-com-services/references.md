# Convergint systems layout reference

- Source: https://www.convergint.com/sa/systems/
- Local route and owner: `/services` — `src/pages/services.astro`; existing service copy remains in `src/data/services.ts`.
- Scope: adapt the systems-section composition and card treatment only. Keep Sendian’s existing header, hero, three service groups, descriptions, calls to action, and metrics. Do not copy Convergint copy, branding, scripts, or remote assets.
- Approved composition: retain three service groups; each group has its eyebrow, heading, and introduction in a left rail beside three columns of image cards. Cards use a wide local image, blue title, short description, and blue pill link. Two-column tablet and single-column mobile layouts.
- Source evidence: user supplied local screenshot at `/Users/farsin/Library/Caches/com.raycast.macos/Clipboard/c2b77b933171e2837b17cdc6b04a27f7d8201832740bc060e0803b961f9f6a96.png` (1920 × 874). Browser inspection: 1920 × 874 viewport, scroll position 1136; source cards appear three across, 448 × 464 px, with a 16:9 image above a white text panel. The source page also has a cookie dialog; it is not part of the requested design and is not reproduced.
- Local comparison: browser screenshot `/Users/farsin/.agent-browser/tmp/screenshots/screenshot-1794301961085.png` at 1920 × 874, first group top; measured 1440px content shell, 347 × 195px card images and no horizontal overflow. At 768 × 1024, cards use two 350px columns with no horizontal overflow; at 375 × 812, cards collapse to one 335px column with no horizontal overflow. Current card mapping has 18 unique local image paths; browser inspection confirmed all 18 loaded with nonzero natural width.
- Assets: every service card uses a distinct local image; no external runtime image requests are added. Four images are reused from Sendian's previous live site: `security-solutions.png` (CCTV), `infrastructure-solutions.png` (structured cabling), `parking-systems.jpeg` (LPR), and `other-solutions.png` (annual maintenance). Other prior category images remain untouched but are not mapped where they do not fit the individual service.
- External image provenance: selected from Pexels after reviewing source pages and downloaded into `public/images/services/`. Pexels license: https://www.pexels.com/license/ (free use subject to license restrictions). Pinterest results were reviewed during discovery but not used.

| Service card | Local file | Source |
| --- | --- | --- |
| Access Control Solutions | `access-control-reader.jpeg` | [Modern Fingerprint Access Control System — panumas nikhomkhai](https://www.pexels.com/photo/modern-fingerprint-access-control-system-37538043/) |
| Cyber Security Solutions | `cyber-security-screen.jpeg` | [Close-Up View of System Hacking — Tima Miroshnichenko](https://www.pexels.com/photo/close-up-view-of-system-hacking-5380618/) |
| Data Center Solution | `data-center-racks.jpeg` | [Server Racks on Data Center — Brett Sayles](https://www.pexels.com/photo/server-racks-on-data-center-4508751/) |
| Storage Solution | `storage-array.jpeg` | [Close-up of a Data Hub DiskStation — Jakub Zerdzicki](https://www.pexels.com/photo/close-up-of-a-data-hub-diskstation-19825057/) |
| Parking Management Systems | `parking-management-entry.jpeg` | [Entrance and Exit from Car Park — Chris F](https://www.pexels.com/photo/entrance-and-exit-from-car-park-11850871/) |
| Parking Guidance Systems | `parking-guidance-arrows.jpeg` | [Road with White Arrow in Parking Garage — Jakub Zerdzicki](https://www.pexels.com/photo/road-with-white-arrow-in-parking-garage-20589694/) |
| Unified Communication | `unified-communications-phone.jpeg` | [IP Phone in data center room — panumas nikhomkhai](https://www.pexels.com/photo/ip-phone-in-data-center-room-17636234/) |
| Enterprise Network Solutions | `enterprise-network-switch.jpeg` | [Close Up Photo of Network Switch — Brett Sayles](https://www.pexels.com/photo/close-up-photo-of-network-switch-2881227/) |
| Home Automation Systems | `home-automation-control.jpeg` | [smart home control — Jakub Zerdzicki](https://www.pexels.com/photo/smart-home-control-16423104/) |
| Audio Visual Systems | `audio-visual-microphone.jpeg` | [Black microphone in light conference hall — Borta](https://www.pexels.com/photo/black-microphone-in-light-conference-hall-4331578/) |
| Video Solutions | `video-solutions-conference.jpeg` | [An Empty Chairs and a Screen Projector Inside the Conference Room — Pavel Danilyuk](https://www.pexels.com/photo/an-empty-chairs-and-a-screen-projector-inside-the-conference-room-8761301/) |
| Intercom System | `intercom-system.jpeg` | [Door Intercom in Residential Building — Joshua Brown](https://www.pexels.com/photo/door-intercom-in-residential-building-13007854/) |
| Smart WiFi Solution | `wifi-router.jpeg` | [Modern WiFi 6 Router on Wooden Desk — Pascal](https://www.pexels.com/photo/modern-wifi-6-router-on-wooden-desk-32698507/) |
| Cloud Solutions | `cloud-solutions.jpeg` | [Two Mobile Devices — Chengxin Zhao](https://www.pexels.com/photo/two-mobile-devices-15470522/) |
- Unchecked: source mobile states and full source page interaction behavior were not relevant to the approved static card layout; no production form or outbound CTA was activated.
