import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import test from 'node:test';

const output = new URL('../.vercel/output/', import.meta.url);
const config = JSON.parse(await readFile(new URL('config.json', output), 'utf8'));
const functionDir = new URL('functions/_render.func/', output);
const runtime = JSON.parse(await readFile(new URL('.vc-config.json', functionDir), 'utf8'));
const { default: app } = await import(new URL(runtime.handler, functionDir));

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
