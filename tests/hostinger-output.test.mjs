import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { once } from 'node:events';
import test from 'node:test';

const socket = createServer();
socket.listen(0, '127.0.0.1');
await once(socket, 'listening');
const port = socket.address().port;
await new Promise((resolve, reject) => socket.close((error) => error ? reject(error) : resolve()));
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['dist/server/entry.mjs'], {
  env: { ...process.env, HOST: '127.0.0.1', PORT: String(port), CMS_ENABLED: 'false', FORMS_ENABLED: 'false', ANALYTICS_ENABLED: 'false' },
  stdio: 'ignore',
});

test('Hostinger standalone server serves pages, filters, redirects and assets', async () => {
  try {
    let response;
    for (let attempt = 0; attempt < 50; attempt++) {
      if (server.exitCode !== null) throw new Error(`Server exited with code ${server.exitCode}`);
      try { response = await fetch(origin); break; } catch { await new Promise((resolve) => setTimeout(resolve, 100)); }
    }
    assert(response, 'Server did not start');
    assert.equal(response.status, 200);
    assert.match(await response.text(), /<main id="main">/);

    response = await fetch(`${origin}/portfolio?industry=healthcare`);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /<title>Healthcare projects — Sendian Security<\/title>/);

    response = await fetch(`${origin}/projects`, { redirect: 'manual' });
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('location'), '/portfolio');

    response = await fetch(`${origin}/robots.txt`);
    assert.equal(response.status, 200);
    response = await fetch(`${origin}/images/home/logo-header.png`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /image\/png/);
    response = await fetch(`${origin}/api/forms`, { method: 'POST', body: 'form=contact' });
    assert.equal(response.status, 503);
  } finally {
    server.kill();
  }
});
