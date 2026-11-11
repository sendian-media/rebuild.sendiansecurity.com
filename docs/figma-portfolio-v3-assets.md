# Portfolio V3 — assets and provenance

Source: Figma file **SISS** (`mK5eOnzVXzLA9E5iJO6ffW`), section **“Sendian · Portfolio V3 — All projects”** → frame **“Portfolio V3 · All projects · desktop 1440”** (root frame `55:87`, register frame `56:1439` after redesign). The file is owned by the client (Sendian); design copy was reviewed directly from the live file.

Exported `2026-11-09` via the Figma Desktop Bridge plugin (`figma.getImageByHash → getBytesAsync`, original embedded pixels). 16 unique photos are embedded in the V3 register; they are illustrative placeholders per the design. On review (`2026-11-09`) the in-UI credit chips and “Image credits” band were removed — attribution is kept in this document: photos by Alex Sergeev (CC BY-SA 3.0), kaartcam / kaart_2 / mfairhurst (Mapillary, CC BY-SA 4.0), Preacher lad (CC BY-SA 4.0).

| File (`public/sites/sendiansecurity-com/portfolio/projects/`) | Figma image hash | Pixels | Used by |
| --- | --- | --- | --- |
| `ghanem-office-building.jpg` | `1871e993b374ebf12ecf88e0fa96e16a0c100e3b` | 1000×650 | hero band + Commercial-02 |
| `marina-mix-49.jpg` | `88a0558febe589af54b295025b2d171fb4bec9ba` | 1000×650 | Original Towers-01 image; replaced by user-supplied photo |
| `marina-mix-52.png` | `0e2504dcf14b2a2bfc9bae772f6356b4050cacb5` | 1000×650 | Towers-02 |
| `doha-bank.png` | `0c913d07a1f7e4653d5c43b96e9c63e22c41900f` | 1000×650 | Towers-04 |
| `qatar-petroleum.png` | `d2025cbeeb5a5dbd2678b46a24411fcd31bdc1d5` | 1000×650 | Commercial-04 |
| `al-jazi-compounds.jpg` | `0d1aa22f696b20d806eefe47721b5536c6f2d34e` | 1838×1054 | Commercial-08 |
| `sendian-compound.jpg` | `5680a0178a512d07725e3278cf95a9a9f794eab0` | 1647×1094 | Original Residential-01 image; replaced by user-supplied photo |
| `al-eeb-compound.jpg` | `0b27a117de202c1ebe38369f1d01c3259297f83d` | 1773×1029 | Residential-02 |
| `capri-garden.jpg` | `759ebd8bc9a6c1d84bb41776801941f2ea485e36` | 1446×955 | Residential-03 |
| `sendian-residence-al-sadd.jpg` | `28150a832dfd824f2253d2d76024be9983065f40` | 1647×1094 | Residential-05 |
| `eve-medical-clinic.jpg` | `2dd8833f59ebdaabaea38d711c3582c7461e4229` | 1000×650 | Healthcare-01 |
| `lebanese-school.jpg` | `c18df024d54395aaad531694c81c50f6742d476b` | 1000×650 | Education-01 |
| `b-square-mall.jpg` | `75e46bdaa8bfa1864edfb377db0fea5592d92a64` | 2592×1728 | Retail-01 |
| `domasco-watch.png` | `3f2f56cb3d0f30f5ab7eae13eb589f084ddcae41` | 1000×650 | Retail-02 |
| `showroom.png` | `bf42ba1aa0ae870d2ab9974f55ed7b9d3090cbc6` | 1000×650 | Showrooms-01 and Showrooms-02 |
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

## User-supplied photographs

The following images replace placeholders on the education, retail, showroom, residential, commercial, and towers cards. Their usage rights and identification have not been independently verified; the illustrative badges remain in place.

| Local file | Used by | Source |
| --- | --- | --- |
| `qatar-finland-school.jpg` | Education-02 | [User-supplied Blogger image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyDbzhLCVUfhLqP2f7mV_DdxZPsPJ31xi9qR1iy7najTB9x5AmHydMdHWpZO61Diz3jwxCu89e8cIF022cgWiTbOCTApPLuH08njb7vByzePGx9awOmjbtkEWAMZ916g_zcVA4fkvSf28/s1600/20181127_123714.jpg) |
| `english-modern-school-al-khor.jpg` | Education-03 | [User-supplied Teacher Horizons image](https://www.teacherhorizons.com/static/mediav2/schools/3775/images/504327_main.jpg) |
| `b-square-mall-thumama.jpg` | Retail-01 | [User-supplied Google image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyPUk09UDqRxbGlRgUEBtW-Uefy02F00XygutFNckY-w&s=10) |
| `domasco-watch-city-center.jpg` | Retail-03 and Retail-05 | [User-supplied City Center Doha image](https://citycenterdoha.com/wp-content/uploads/2024/11/CC-95-800x533-1.jpg) |
| `domasco-watch-gharrafa-lulu.webp` | Retail-04 and Retail-06 | [User-supplied Doha Directory image](https://cdn2.advanceinfotech.org/doha.directory/1200x675/business/629/domasco-watches7-1651905388.webp) |
| `honda-showroom.jpg` | Showrooms-01 | [User-supplied Google image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGRNJ4noEK_PAAPzGF94nCRXNOE26LkrlgLKlkZcbQTlEhYNbiNUNW1Yk&s=10) |
| `gac-showroom.jpg` | Previously supplied; not currently used | [User-supplied Al-Futtaim image](https://dam.alfuttaim.com/dx/api/dam/v1/collections/74997eb3-ad83-43c1-be3a-140cd95c78ae/items/fac6c4a9-087b-4518-8455-7cc18f8135bb/renditions/3bfd17c8-9537-4db6-95b4-ed846ae9b2a2?binary=true&mformat=true) |
| `pmc-pharmacy-1.webp` | Healthcare-02 and Healthcare-05 | [User-supplied Doha Directory image](https://cdn2.advanceinfotech.org/doha.directory/1200x675/business/1031/pmc-pharmacy-and-more-0258-1653557974.webp) |
| `pmc-pharmacy-2.webp` | Healthcare-03 | [User-supplied Doha Directory image](https://cdn2.advanceinfotech.org/doha.directory/1200x675/business/913/pmc-pharmacy-and-more-1652870392.webp) |
| `pmc-pharmacy-3.webp` | Healthcare-04 | [User-supplied Doha Directory image](https://cdn2.advanceinfotech.org/doha.directory/1200x675/business/1032/pmc-pharmacy-and-more-0355-1-1653558672.webp) |
| `sendian-compound.png` | Residential-01 | [User-supplied Sendian Group image](https://sendiangroup.com/images/sectors/real-estate-building.png) |
| `foxhills-residential.jpg` | Commercial-06 | [User-supplied AEB Qatar image](https://aeb-qatar.com/wp-content/uploads/2016/06/Residential-Foxhills-01.jpg) |
| `qatar-petroleum-it-building.jpg` | Commercial-05 | [User-supplied Skyscraper Center image](https://images.skyscrapercenter.com/building/qatar-petroleum-district_astad-project-management12.jpg) |
| `ministry-of-interior.jpg` | Commercial-03 | [User-supplied AEB Qatar image](https://aeb-qatar.com/wp-content/uploads/2016/06/Ministry-of-Interior-01.jpg) |
| `sendian-head-quarter.jpg` | Commercial-01 | [User-supplied AEB Qatar image](https://aeb-qatar.com/wp-content/uploads/2025/04/Seven-Seas-HQ-01-510x382.jpg) |
| `tornado-tower.jpg` | Towers-03 | [User-supplied Google image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKYVMeJQaGq_5BU2RxOFP-_4zh95FPgl2ZmAubvduS8NvP9ivWvYAfUGg&s=10) |
| `marina-mix-49-user.jpg` | Towers-01 | [User-supplied R.C. Almana image](https://rcalmana.com/wp-content/uploads/2020/08/IMG_9150-scaled.jpg) |

## Added illustrative photography — Pexels

These local JPEGs replace repeated Figma placeholders while preserving the portfolio layout and card order. Every added photo is an illustrative sector match, not a photograph of the named Sendian project; the corresponding cards display the “Illustrative image” badge. Files are stored in `public/sites/sendiansecurity-com/portfolio/projects/` so the page has no remote image dependency.

The links below record the Pexels search query used to find each image, not its individual photo page. Photographer/page metadata was not retained with the downloaded candidate files. Pexels states that photos may be used for free, attribution is optional, and modification is allowed; restrictions include not implying endorsement by people or brands and not redistributing unmodified files as stock. Reviewed: [Pexels License](https://www.pexels.com/license/).

| Local file | Used by | Pexels discovery query |
| --- | --- | --- |





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
| `pexels-birkat-material-store.jpeg` | Industrial-02 | [Industrial warehouse](https://www.pexels.com/search/industrial%20warehouse/) |
| `pexels-tss-material-store.jpeg` | Industrial-03 | [Materials warehouse](https://www.pexels.com/search/materials%20warehouse/) |
| `pexels-jaidah-car-yard.jpeg` | Industrial-04 | [Car storage yard](https://www.pexels.com/search/car%20storage%20yard/) |
