import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../src/components/analytics/AnalyticsConsent.astro', import.meta.url), 'utf8');
const script = ts.transpile(source.match(/<script>([\s\S]*?)<\/script>/)[1], { target: ts.ScriptTarget.ES2022 });

function page(storage) {
  const buttons = {}, scripts = [], status = { textContent: '' };
  const box = { dataset: { ga: 'G-TEST123', clarity: 'test123' }, querySelector(selector) {
    if (selector === '[data-analytics-status]') return status;
    return { addEventListener(_event, handler) { buttons[selector] = handler; } };
  } };
  const document = { querySelector: () => box, createElement: () => ({}), head: { append: (script) => scripts.push(script.src) } };
  const localStorage = { getItem: (key) => storage[key] ?? null, setItem: (key, value) => { storage[key] = value; }, removeItem: (key) => { delete storage[key]; } };
  let reloads = 0;
  runInNewContext(script, { document, window: {}, localStorage, location: { reload() { reloads++; } }, Date, encodeURIComponent });
  return { scripts, buttons, status, get reloads() { return reloads; } };
}

test('analytics scripts load only after consent and rejection persists after reload', () => {
  const storage = {};
  const initial = page(storage);
  assert.deepEqual(initial.scripts, []);
  initial.buttons['[data-analytics-reject]']();
  assert.deepEqual(initial.scripts, []);
  const rejected = page(storage);
  assert.deepEqual(rejected.scripts, []);
  rejected.buttons['[data-analytics-accept]']();
  assert.equal(rejected.scripts.length, 2);
  assert.match(rejected.scripts[0], /^https:\/\/www\.googletagmanager\.com\//);
  assert.match(rejected.scripts[1], /^https:\/\/www\.clarity\.ms\//);
  rejected.buttons['[data-analytics-accept]']();
  assert.equal(rejected.scripts.length, 2);
  rejected.buttons['[data-analytics-reject]']();
  assert.equal(rejected.reloads, 1);
  assert.deepEqual(page(storage).scripts, []);
});
