/* Optional integration example, required if independent text enlargement
 * is the mechanism used to satisfy the proportional typography preset.
 * Load with defer. CSS selectors and controls are documented in SOP.md.
 */
(() => {
  'use strict';
  const key = 'desktop-text-size';
  const allowed = [1, 1.25, 1.5, 2];
  const controls = [...document.querySelectorAll('[data-ds-text-scale]')];
  if (!controls.length) return;
  function apply(value) {
    if (!allowed.includes(value)) value = 1;
    document.documentElement.style.setProperty('--ds-user-text-scale', String(value));
    for (const button of controls) {
      button.setAttribute('aria-pressed', String(Number(button.dataset.dsTextScale) === value));
    }
    try { localStorage.setItem(key, String(value)); } catch (_) { /* Storage may be unavailable. */ }
  }
  let saved = 1;
  try { saved = Number(localStorage.getItem(key) || 1); } catch (_) { /* Keep default. */ }
  apply(saved);
  for (const button of controls) {
    button.addEventListener('click', () => apply(Number(button.dataset.dsTextScale)));
  }
})();
