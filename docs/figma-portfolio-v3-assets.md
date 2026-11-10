# Portfolio V3 — assets and provenance

Source: Figma file **SISS** (`mK5eOnzVXzLA9E5iJO6ffW`), section **“Sendian · Portfolio V3 — All projects”** → frame **“Portfolio V3 · All projects · desktop 1440”** (root frame `55:87`, register frame `56:1439` after redesign). The file is owned by the client (Sendian); design copy was reviewed directly from the live file.

Exported `2026-11-09` via the Figma Desktop Bridge plugin (`figma.getImageByHash → getBytesAsync`, original embedded pixels). 16 unique photos are embedded in the V3 register; they are illustrative placeholders per the design. On review (`2026-11-09`) the in-UI credit chips and “Image credits” band were removed — attribution is kept in this document: photos by Alex Sergeev (CC BY-SA 3.0), kaartcam / kaart_2 / mfairhurst (Mapillary, CC BY-SA 4.0), Preacher lad (CC BY-SA 4.0).

| File (`public/sites/sendiansecurity-com/portfolio/projects/`) | Figma image hash | Pixels | Used by |
| --- | --- | --- | --- |
| `ghanem-office-building.jpg` | `1871e993b374ebf12ecf88e0fa96e16a0c100e3b` | 1000×650 | hero band + Commercial-02 |
| `marina-mix-49.jpg` | `88a0558febe589af54b295025b2d171fb4bec9ba` | 1000×650 | Towers-01 |
| `marina-mix-52.png` | `0e2504dcf14b2a2bfc9bae772f6356b4050cacb5` | 1000×650 | Towers-02 |
| `doha-bank.png` | `0c913d07a1f7e4653d5c43b96e9c63e22c41900f` | 1000×650 | Towers-04 |
| `qatar-petroleum.png` | `d2025cbeeb5a5dbd2678b46a24411fcd31bdc1d5` | 1000×650 | Commercial-04 |
| `al-jazi-compounds.jpg` | `0d1aa22f696b20d806eefe47721b5536c6f2d34e` | 1838×1054 | Commercial-08 |
| `sendian-compound.jpg` | `5680a0178a512d07725e3278cf95a9a9f794eab0` | 1647×1094 | Residential-01 |
| `al-eeb-compound.jpg` | `0b27a117de202c1ebe38369f1d01c3259297f83d` | 1773×1029 | Residential-02 |
| `capri-garden.jpg` | `759ebd8bc9a6c1d84bb41776801941f2ea485e36` | 1446×955 | Residential-03 |
| `sendian-residence-al-sadd.jpg` | `28150a832dfd824f2253d2d76024be9983065f40` | 1647×1094 | Residential-05 |
| `eve-medical-clinic.jpg` | `2dd8833f59ebdaabaea38d711c3582c7461e4229` | 1000×650 | Healthcare-01 |
| `lebanese-school.jpg` | `c18df024d54395aaad531694c81c50f6742d476b` | 1000×650 | Education-01 |
| `b-square-mall.jpg` | `75e46bdaa8bfa1864edfb377db0fea5592d92a64` | 2592×1728 | Retail-01 |
| `domasco-watch.png` | `3f2f56cb3d0f30f5ab7eae13eb589f084ddcae41` | 1000×650 | Retail-02 |
| `showroom.png` | `bf42ba1aa0ae870d2ab9974f55ed7b9d3090cbc6` | 1000×650 | Showrooms-01 |
| `industrial-yard.jpg` | `f48e54c15598a71c54c839b645f52d197da1aade` | 1000×650 | Industrial-01 |

The original V3 images above remain unchanged. Repeated project-card placeholders are supplemented with locally stored Pexels illustrations below.

Other V3 assets reused as-is from the existing home implementation: header/footer logo `/images/home/logo-header.png`.

Design notes captured while auditing the file (2026-11-09):

- Card layout per industry: `std` 384px (image 384×300), `mid` 588px (588×380), `wide` 792px (792×420) inside the 1200px container; vertical gap 52, horizontal gap 24.
- Colours: ink `#09182d`, blue `#233f90`, muted `#526176`, rule `#e0e6ee/#dee6f0`, register background `#f4f7fb`, chip stroke `#dee6f0`.
- Hero gradient: `#071629` 96% → 80% (60%) → 20% (100%), left→right.
- Type: Montserrat 700 headings (hero 72/79, register 42/48, industry 32/38, std titles 20/26, big titles 24/31), Montserrat 600 labels 11/17 with `0.19em` tracking, Roboto body.
- Chip states: active = blue fill/white text; idle = white/1px `#dee6f0` border.
- Sector frames (Towers/Commercial/…) still contained the earlier masonry layout while the file refactor groups industries inside the all-projects page; implementation follows the newest grouped layout and reuses it for filtered views.

## Added illustrative photography — Pexels

These local JPEGs replace repeated Figma placeholders while preserving the portfolio layout and card order. Every added photo is an illustrative sector match, not a photograph of the named Sendian project; the corresponding cards display the “Illustrative image” badge. Files are stored in `public/sites/sendiansecurity-com/portfolio/projects/` so the page has no remote image dependency.

The links below record the Pexels search query used to find each image, not its individual photo page. Photographer/page metadata was not retained with the downloaded candidate files. Pexels states that photos may be used for free, attribution is optional, and modification is allowed; restrictions include not implying endorsement by people or brands and not redistributing unmodified files as stock. Reviewed: [Pexels License](https://www.pexels.com/license/).

| Local file | Used by | Pexels discovery query |
| --- | --- | --- |
| `pexels-tornado-tower-doha.jpeg` | Towers-03 | [Doha tornado tower](https://www.pexels.com/search/doha%20tornado%20tower/) |
| `pexels-sendian-hq-doha.jpeg` | Commercial-01 | [Doha office building](https://www.pexels.com/search/doha%20office%20building/) |
| `pexels-ministry-office-building.jpeg` | Commercial-03 | [Ministry office building](https://www.pexels.com/search/ministry%20office%20building/) |
| `pexels-qatar-petroleum-it-building.jpeg` | Commercial-05 | [Qatar office tower](https://www.pexels.com/search/qatar%20office%20tower/) |
| `pexels-lusail-foxhills-office.jpeg` | Commercial-06 | [Lusail office building](https://www.pexels.com/search/lusail%20office%20building/) |
| `pexels-sinjer-car-rent-fleet.jpeg` | Commercial-07 | [Car rental fleet](https://www.pexels.com/search/car%20rental%20fleet/) |
| `pexels-birkat-al-awamer-industrial.jpeg` | Commercial-09 | [Industrial building](https://www.pexels.com/search/industrial%20building/) |
| `pexels-villa-compound-4.jpeg` | Residential-04 | [Villa compound](https://www.pexels.com/search/villa%20compound/) |
| `pexels-sendian-residence-madinat-khalifa.jpeg` | Residential-06 | [Modern residence building](https://www.pexels.com/search/modern%20residence%20building/) |
| `pexels-madinat-khalifa-apartments.jpeg` | Residential-07 | [Apartment complex aerial](https://www.pexels.com/search/apartment%20complex%20aerial/) |
| `pexels-private-palace-al-rayyan.jpeg` | Residential-08 | [Luxury villa pool](https://www.pexels.com/search/luxury%20villa%20pool/) |
| `pexels-private-villa-lusail.jpeg` | Residential-09 | [Modern villa exterior](https://www.pexels.com/search/modern%20villa%20exterior/) |
| `pexels-villa-compound-22.jpeg` | Residential-10 | [Villa community aerial](https://www.pexels.com/search/villa%20community%20aerial/) |
| `pexels-bin-mahmoud-residential.jpeg` | Residential-11 | [Residential apartment building](https://www.pexels.com/search/residential%20apartment%20building/) |
| `pexels-pharmacist-counter.jpeg` | Healthcare-02 | [Pharmacist at pharmacy counter](https://www.pexels.com/search/pharmacist%20pharmacy%20counter/) |
| `pexels-pharmacist-shelves.jpeg` | Healthcare-03 | [Pharmacist selecting medicine](https://www.pexels.com/search/pharmacist%20selecting%20medicine/) |
| `pexels-pharmacy-consultation.jpeg` | Healthcare-04 | [Pharmacy consultation](https://www.pexels.com/search/pharmacy%20consultation/) |
| `pexels-pharmacy-shelf-arranging.jpeg` | Healthcare-05 | [Pharmacist arranging shelves](https://www.pexels.com/search/pharmacist%20arranging%20shelves/) |
| `pexels-qatar-finland-school.jpeg` | Education-02 | [Modern school campus](https://www.pexels.com/search/modern%20school%20campus/) |
| `pexels-english-modern-school-al-khor.jpeg` | Education-03 | [Modern school building](https://www.pexels.com/search/modern%20school%20building/) |
| `pexels-domasco-watch-city-center.jpeg` | Retail-03 | [Watches in display case](https://www.pexels.com/search/watches%20display%20case/) |
| `pexels-domasco-watch-gharrafa-lulu.jpeg` | Retail-04 | [Watch display](https://www.pexels.com/search/watch%20display/) |
| `pexels-domasco-watch-d-ring-lulu.jpeg` | Retail-05 | [Black watch close up](https://www.pexels.com/search/black%20watch%20close%20up/) |
| `pexels-domasco-watch-asian-town.jpeg` | Retail-06 | [Wristwatch collection](https://www.pexels.com/search/wristwatch%20collection/) |
| `pexels-gac-showroom.jpeg` | Showrooms-02 | [Car showroom customers](https://www.pexels.com/search/car%20showroom%20customers/) |
| `pexels-birkat-material-store.jpeg` | Industrial-02 | [Industrial warehouse](https://www.pexels.com/search/industrial%20warehouse/) |
| `pexels-tss-material-store.jpeg` | Industrial-03 | [Materials warehouse](https://www.pexels.com/search/materials%20warehouse/) |
| `pexels-jaidah-car-yard.jpeg` | Industrial-04 | [Car storage yard](https://www.pexels.com/search/car%20storage%20yard/) |
