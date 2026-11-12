# Integration preparation (local preview)

All integrations are disabled by default. No credentials, service configuration, deployment, webhook, or activation are included. `.env.example` lists names only; keep credentials in a secret manager, never in git. The map is a local placeholder to avoid third-party requests.

## Sanity

`CMS_ENABLED=true` plus `SANITY_PROJECT_ID` and `SANITY_DATASET` permits published read-only server queries; `SANITY_API_READ_TOKEN` is optional for private datasets and must be read-only. The runtime queries archived `newsArticle` and `securitySiteSettings` shapes. Local articles remain available; valid CMS articles replace matching slugs or are appended. Missing/invalid records and network failures retain local content. CMS images must be on the configured Sanity project's dataset CDN path. The current text renderer preserves headings and paragraph text, but not Portable Text marks, links, lists, or embedded images. Settings currently cover name, phone and email; address remains local. CMS-enabled rendering makes server requests and uses remote CMS images in the browser, so do not enable for local-only previews.

## Contact and vendor forms

Forms and `/api/forms` remain disabled unless `FORMS_ENABLED=true`, `FORMS_ABUSE_PROTECTION_CONFIRMED=true`, an HTTPS `SITE_URL`, both HubSpot form IDs and portal ID, Mailjet credentials, sender and recipient addresses are configured. Setting the confirmation flag does **not** implement abuse controls. Before any future enablement independently configure and verify distributed rate limiting and bot protection at the hosting edge; the honeypot alone is not sufficient. Review privacy notices, provider data handling, field mappings and consent with the owner. Exact-origin validation, request size limits, server-side allowlists and field validation are included. No client secrets are rendered. Contact first/last name and service are mapped to archived HubSpot fields, with service prepended to the message; vendor categories use archived option values. The original full-name contact field was split with approval.

HubSpot acceptance is reported as success even if the subsequent Mailjet notification fails, to avoid suggesting a duplicate submission; failures are logged without form content. There is no durable retry queue, and a timeout can leave HubSpot delivery uncertain. Notifications use plain text, not HTML. Provider IDs and credentials are deliberately blank. For native non-JavaScript submissions the API returns an HTML status; JavaScript progressively enhances the forms with an accessible live status.

## Analytics

`ANALYTICS_ENABLED=true` plus valid `GA_MEASUREMENT_ID` and/or `CLARITY_PROJECT_ID` displays a consent panel. No vendor script is loaded before acceptance; rejection is remembered, and withdrawing consent reloads the page without loading analytics. Both vendors are controlled together; advertising consent is denied. Browser storage holds the preference. Consent does not delete existing vendor cookies or retroactively erase data. The existing privacy page is a placeholder: publish reviewed privacy/cookie disclosures and verify consent, revocation and applicable retention requirements before any future enablement. No vendor IDs are included.

The implementation has only offline mocked provider tests. Before enabling anything, conduct authorized integration, accessibility, privacy and security testing using approved environments and credentials. Never activate these settings as part of local preview work.
