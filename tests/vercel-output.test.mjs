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

test('public assets are included in Vercel static output', async () => {
  for (const asset of ['images/home/logo-header.png', 'images/services/services-banner.jpg', 'fonts/montserrat-latin.woff2', 'robots.txt']) {
    await access(new URL(`static/${asset}`, output));
  }
});
