# Contact page reference and ownership

- Sources: https://disignnetworks.com/contact/ and https://bidvestnoonan.com/contact-us/; authorized by the user for reproduction. Both inform the single Sendian-branded `/contact` route rather than being reproduced as separate sites.
- Ownership: `src/pages/contact.astro` owns the route; `src/components/sites/sendian-contact/` owns the page-specific presentation; `src/data/navigation.ts` updates the existing Contact link. Existing shared layout and styles remain unchanged.
- Observed: DI-SIGN has a “Talk to us” contact-details area and “Send a message” form with service and location selectors. Bidvest Noonan has a wide city-image banner and an enquiry form beside its contact introduction. Bidvest initial viewport inspected at 1280 × 633, scroll position 0; interaction snapshots inspected for both sites. No forms were submitted.
- Substitutions: Sendian contact details, branding, local fonts, and existing local assets replace third-party copy, brands, images, and fonts. No third-party assets or scripts were downloaded. The enquiry form is an inactive local mockup; no data is sent.
- Contact details checked against https://sendiansecurity.com/contact: head-office address, +974 44866766, +974 74720643, and info@sendiansecurity.com. Its Google Maps embed is included with explicit user approval; the browser contacts Google when the map loads.
- Reference mobile views, complete scroll states, and direct pixel comparisons were not captured; this is an adapted blend, not a pixel-perfect clone.
