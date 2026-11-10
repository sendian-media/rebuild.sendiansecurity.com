// Run in the home page's browser console (or agent-browser eval --stdin),
// then call await checkHomeScaling() after each desktop viewport change.
window.checkHomeScaling = async () => {
  await document.fonts.ready;
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const close = (actual, expected, label) => assert(Math.abs(actual - expected) < 1.1, `${label}: ${actual}, expected ${expected}`);
  const style = (selector) => getComputedStyle(document.querySelector(selector));
  const width = innerWidth;
  const scale = width / 1920;
  const textScale = Number(document.body.style.getPropertyValue('--ds-user-text-scale') || 1);
  assert(width >= 1280, 'This check covers the desktop scaling layout.');
  assert(document.body.classList.contains('page-home'), 'Home-only scope is missing.');
  assert(document.documentElement.scrollWidth <= width, 'Document overflows horizontally.');
  for (const container of document.querySelectorAll('.container')) {
    close(container.getBoundingClientRect().width, 1440 * scale, 'Container');
  }
  close(parseFloat(style('.hero h1').fontSize), 64 * scale * textScale, 'Hero type');
  close(parseFloat(style('.about h2').fontSize), 45 * scale * textScale, 'Section type');
  close(parseFloat(style('.solutions-grid').gap), 24 * scale, 'Grid gap');
  close(document.querySelector('.hero-feature').getBoundingClientRect().width, 444 * scale, 'Hero media');
  close(document.querySelector('.site-header').getBoundingClientRect().height, parseFloat(style('body').getPropertyValue('--ds-header-height')), 'Sticky offset');
  const columns = Object.fromEntries([
    ['.metrics-grid', 4], ['.solutions-grid', 4], ['.process-grid', 5],
    ['.trust-grid', 3], ['.certificates-grid', 5], ['.projects-grid', 3],
  ].map(([selector, expected]) => {
    const count = style(selector).gridTemplateColumns.split(' ').length;
    assert(count === expected, `${selector}: ${count} columns, expected ${expected}`);
    return [selector, count];
  }));
  const clipped = [...document.querySelectorAll('h1, h2, h3, p, .button, .vendor-link, .main-nav, .process-step')]
    .filter((element) => element.clientWidth && element.scrollWidth > element.clientWidth + 2)
    .map((element) => `${element.tagName}.${element.className}`);
  assert(!clipped.length, `Clipped text/controls: ${clipped.join(', ')}`);
  return {
    width, height: innerHeight, dpr: devicePixelRatio, textScale,
    container: document.querySelector('.container').getBoundingClientRect().width,
    heroType: parseFloat(style('.hero h1').fontSize),
    heroHeight: document.querySelector('.hero').getBoundingClientRect().height,
    headerHeight: document.querySelector('.site-header').getBoundingClientRect().height,
    columns, pass: true,
  };
};
checkHomeScaling();
