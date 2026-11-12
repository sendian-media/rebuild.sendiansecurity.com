import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import test from 'node:test';

const output = new URL('../.vercel/output/', import.meta.url);
const config = JSON.parse(await readFile(new URL('config.json', output), 'utf8'));
const functionDir = new URL('functions/_render.func/', output);
const runtime = JSON.parse(await readFile(new URL('.vc-config.json', functionDir), 'utf8'));
const { default: app } = await import(new URL(runtime.handler, functionDir));
const servicePages = [
  ['cctv-surveillance', 'CCTV Surveillance'],
  ['access-control', 'Access Control Solutions'],
  ['cyber-security', 'Cyber Security Solutions'],
  ['structured-cabling', 'Structured Cabling System'],
  ['data-center', 'Data Center Solution'],
  ['storage-solutions', 'Storage Solution'],
  ['parking-management', 'Parking Management Systems'],
  ['parking-guidance', 'Parking Guidance Systems'],
  ['lpr-anpr', 'LPR Solutions'],
  ['unified-communications', 'Unified Communication'],
  ['enterprise-network', 'Enterprise Network Solutions'],
  ['home-automation', 'Home Automation Systems'],
  ['audio-visual', 'Audio Visual Systems'],
  ['video-solutions', 'Video Solutions'],
  ['annual-maintenance', 'Annual Maintenance Contracts'],
  ['intercom', 'Intercom System'],
  ['smart-wifi', 'Smart WiFi Solution'],
  ['cloud-solutions', 'Cloud Solutions'],
];

for (const path of ['/', '/about', '/portfolio', '/services']) {
  test(`Vercel routes and renders ${path}`, async () => {
    assert.equal(config.version, 3);
    assert.equal(runtime.runtime, 'nodejs22.x');
    assert(config.routes.some((route) => route.dest === '_render' && new RegExp(route.src).test(path)));
    const response = await app.fetch(new Request(`https://example.test${path}`));
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.match(await response.text(), /<main id="main">/);
  });
}

test('homepage renders the accessible process carousel and all five steps', async () => {
  const response = await app.fetch(new Request('https://example.test/'));
  const html = await response.text();
  assert.match(html, /aria-roledescription="carousel" data-process-carousel/);
  assert.equal((html.match(/<article[^>]*data-process-card/g) ?? []).length, 5);
  for (const title of ['Consult', 'Design', 'Deploy', 'Commission', 'Maintain']) {
    assert(html.includes(`>${title}</h3>`), title);
  }
  assert.match(html, /aria-label="Previous process step"/);
  assert.match(html, /aria-label="Next process step"/);
  assert.match(html, /id="process-track" tabindex="0"/);
  assert(!html.includes('class="process-grid"'));
});

test('linked vendor and legal pages render locally', async () => {
  for (const [path, text] of [
    ['/vendor-registration', 'Register your company'],
    ['/privacy', 'Privacy information will be published before launch'],
    ['/terms', 'Terms and conditions will be published before launch'],
  ]) {
    const response = await app.fetch(new Request(`https://example.test${path}`));
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert(html.includes(text), path);
    if (path === '/vendor-registration') {
      assert.match(html, /<fieldset disabled/);
      assert(html.includes('cannot submit information'));
    }
  }
});

test('all service detail routes render and index cards link to them', async () => {
  const indexResponse = await app.fetch(new Request('https://example.test/services'));
  const indexHtml = await indexResponse.text();
  for (const [slug, title] of servicePages) {
    const response = await app.fetch(new Request(`https://example.test/services/${slug}`));
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, new RegExp(`<h1[^>]*>${title}</h1>`), slug);
    assert(html.includes('id="applications"'), slug);
    assert(indexHtml.includes(`href="/services/${slug}"`), slug);
  }
  const missing = await app.fetch(new Request('https://example.test/services/not-a-service'));
  assert.equal(missing.status, 404);
});

test('portfolio query filtering still runs at request time', async () => {
  for (const [slug, name] of [['towers', 'Towers'], ['healthcare', 'Healthcare']]) {
    const response = await app.fetch(new Request(`https://example.test/portfolio?industry=${slug}`));
    assert.equal(response.status, 200);
    const html = await response.text();
    assert(html.includes(`<title>${name} projects — Sendian Security</title>`));
    assert(!html.includes('class="pf-industry-head"'));
  }
});

test('archived SEO data is rendered without removing staging protections', async () => {
  const response = await app.fetch(new Request('https://example.test/'));
  const html = await response.text();
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const organization = schemas.find((schema) => schema['@type'] === 'Organization');
  assert.equal(organization.name, 'Sendian Integrated Security Services');
  assert.equal(organization.address.addressLocality, 'Doha');
  assert.match(html, /noindex, nofollow/);
  assert.match(html, /href="\/favicon.ico"/);
  const article = await app.fetch(new Request('https://example.test/news/ai-security-solutions-qatar'));
  const articleHtml = await article.text();
  const articleSchema = [...articleHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1])).find((schema) => schema['@type'] === 'BlogPosting');
  assert.equal(articleSchema.datePublished, '2021-11-14');
});

test('matching archived URLs redirect permanently', async () => {
  for (const [from, to] of [
    ['/projects', '/portfolio'],
    ['/portfolios', '/portfolio'],
    ['/portfolio/towers', '/portfolio?industry=towers'],
    ['/security/ai-security-solutions-qatar', '/news/ai-security-solutions-qatar'],
    ['/security/ongoing-project-cctv-surveillance-system-installation-at-qatar-finland-international-school', '/news/ongoing-project-cctv-surveillance-system-installation-at-qatar-finland-international-school'],
    ['/security/ongoing-project-moi-regulated-cctv-system-deployment-at-kreeq-sports-club-al-wakra', '/news/ongoing-project-moi-regulated-cctv-system-deployment-at-kreeq-sports-club-al-wakra'],
  ]) {
    const response = await app.fetch(new Request(`https://example.test${from}`));
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('location'), to);
  }
  const missing = await app.fetch(new Request('https://example.test/security/unknown'));
  assert.equal(missing.status, 404);
});

test('public assets are included in Vercel static output', async () => {
  for (const asset of ['images/home/logo-header.png', 'images/services/services-banner.jpg', 'fonts/montserrat-latin.woff2', 'robots.txt', 'favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png']) {
    await access(new URL(`static/${asset}`, output));
  }
});

test('contact preview does not request an external map', async () => {
  const response = await app.fetch(new Request('https://example.test/contact'));
  const html = await response.text();
  assert.match(html, /Map unavailable in local preview/);
  assert.doesNotMatch(html, /<iframe\b|google\.com\/maps\/embed/i);
});

test('integrations default to off without network access', async () => {
  const previous = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('Unexpected external request'); };
  try {
    for (const path of ['/news', '/news/ai-security-solutions-qatar', '/contact', '/vendor-registration']) {
      const response = await app.fetch(new Request(`https://example.test${path}`));
      const html = await response.text();
      assert.equal(response.status, 200, path);
      assert.doesNotMatch(html, /<section[^>]*data-analytics-consent/);
      if (path === '/contact' || path === '/vendor-registration') assert.match(html, /<fieldset disabled/);
    }
    const response = await app.fetch(new Request('https://example.test/api/forms', { method: 'POST', body: 'form=contact' }));
    assert.equal(response.status, 503);
    const native = await app.fetch(new Request('https://example.test/api/forms', { method: 'POST', headers: { accept: 'text/html' }, body: 'form=contact' }));
    assert.match(native.headers.get('content-type'), /text\/html/);
    assert.match(await native.text(), /Forms are unavailable/);
  } finally { globalThis.fetch = previous; }
});

test('forms validate submissions and only send to mocked providers', async () => {
  const env = { FORMS_ENABLED: 'true', FORMS_ABUSE_PROTECTION_CONFIRMED: 'true', SITE_URL: 'https://example.test', HUBSPOT_PORTAL_ID: '123', HUBSPOT_CONTACT_FORM_ID: '00000000-0000-0000-0000-000000000001', HUBSPOT_VENDOR_FORM_ID: '00000000-0000-0000-0000-000000000002', MAILJET_API_KEY: 'test-key', MAILJET_API_SECRET: 'test-secret', MAILJET_FROM_EMAIL: 'sender@example.test', MAILJET_NOTIFICATION_TO: 'team@example.test' };
  const old = Object.fromEntries(Object.keys(env).map((key) => [key, process.env[key]]));
  Object.assign(process.env, env);
  const previous = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, init) => { calls.push({ url: String(url), body: JSON.parse(init.body) }); return Response.json({ Messages: [{ Status: 'success' }] }); };
  const submit = (data, origin = 'https://example.test') => app.fetch(new Request('https://example.test/api/forms', { method: 'POST', headers: { origin, 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data) }));
  const contact = { form: 'contact', _gotcha: '', firstname: 'Ada', lastname: 'Lovelace', phone: '+974 1234', email: 'ada@example.test', service: 'Other enquiry', message: 'Hello' };
  const vendor = { form: 'vendor', _gotcha: '', name: 'Ada', phone: '+974 1234', email: 'ada@example.test', company: 'Example', 'company-type': 'Supplier', category: 'Other', overview: 'Example vendor', consent: 'on' };
  try {
    const enabledPage = await (await app.fetch(new Request('https://example.test/contact'))).text();
    assert.match(enabledPage, /<fieldset\s+data-astro-cid-/);
    assert.doesNotMatch(enabledPage, /<fieldset disabled/);
    assert.doesNotMatch(enabledPage, /test-secret|test-key/);
    assert.equal((await submit(contact, 'https://attacker.test')).status, 403);
    assert.equal((await submit({ ...contact, service: 'invalid' })).status, 400);
    assert.equal((await submit({ ...vendor, consent: '' })).status, 400);
    assert.equal((await submit({ ...contact, _gotcha: 'spam' })).status, 400);
    assert.equal((await submit({ ...contact, message: 'x'.repeat(17000) })).status, 413);
    assert.equal(calls.length, 0);
    assert.equal((await submit(contact)).status, 200);
    assert.match(calls[0].url, /^https:\/\/api\.hsforms\.com\//);
    assert.equal(calls[0].body.fields.find((field) => field.name === 'message').value, 'Service: Other enquiry\n\nHello');
    assert.match(calls[1].url, /^https:\/\/api\.mailjet\.com\//);
    assert.equal((await submit(vendor)).status, 200);
    assert.equal(calls[2].body.fields.find((field) => field.name === 'industry').value, 'supplier');
    assert.equal(calls[2].body.fields.find((field) => field.name === 'client_type').value, 'Other');
    assert.equal(calls.length, 4);
    globalThis.fetch = async () => new Response('', { status: 500 });
    assert.equal((await submit(contact)).status, 502);
  } finally {
    globalThis.fetch = previous;
    for (const [key, value] of Object.entries(old)) if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
});

test('CMS content and settings are validated, with local fallback', async () => {
  const env = { CMS_ENABLED: 'true', SANITY_PROJECT_ID: 'testproject', SANITY_DATASET: 'testing', SANITY_API_READ_TOKEN: '' };
  const old = Object.fromEntries(Object.keys(env).map((key) => [key, process.env[key]]));
  Object.assign(process.env, env);
  const previous = globalThis.fetch;
  let cmsPhone = '+974 12345678';
  const article = { slug: 'cms-example', title: 'CMS Example', summary: 'CMS summary', publishedAt: '2025-01-03', category: 'Updates', image: 'https://cdn.sanity.io/images/testproject/testing/example.jpg', body: [{ _type: 'block', children: [{ _type: 'span', text: 'CMS body' }] }] };
  globalThis.fetch = async (url) => {
    const query = new URL(url instanceof Request ? url.url : String(url)).searchParams.get('query') ?? '';
    return Response.json({ result: query.includes('securitySiteSettings') ? { name: 'CMS company', email: 'cms@example.test', phone: cmsPhone } : [article, { ...article, slug: 'bad-image', image: 'https://evil.test/pixel' }] });
  };
  try {
    const index = await (await app.fetch(new Request('https://example.test/news'))).text();
    assert.match(index, /CMS Example/);
    assert.match(index, /CCTV Surveillance System Installation/);
    assert.doesNotMatch(index, /evil\.test/);
    assert.match(index, /cms@example.test/);
    assert.match(index, /href="tel:\+97412345678"/);
    for (const invalidPhone of ['+-----', '123 45', '+1234567890123456']) {
      cmsPhone = invalidPhone;
      const html = await (await app.fetch(new Request('https://example.test/news'))).text();
      assert.match(html, /href="tel:\+97444866766"/);
      assert.match(html, /\+974 44866766/);
    }
    const detail = await (await app.fetch(new Request('https://example.test/news/cms-example'))).text();
    assert.match(detail, /CMS body/);
    globalThis.fetch = async () => { throw new Error('offline'); };
    const fallback = await (await app.fetch(new Request('https://example.test/news'))).text();
    assert.match(fallback, /CCTV Surveillance System Installation/);
    assert.doesNotMatch(fallback, /CMS Example/);
  } finally {
    globalThis.fetch = previous;
    for (const [key, value] of Object.entries(old)) if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
});
