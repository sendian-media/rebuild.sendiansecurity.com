// Run on a rendered desktop route, then await checkDesktopPage() after resizing.
window.checkDesktopPage = async () => {
  await document.fonts.ready;
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const near = (actual, expected, name) => assert(Math.abs(actual - expected) < 1.5, `${name}: ${actual}, expected ${expected}`);
  const style = (selector) => getComputedStyle(document.querySelector(selector));
  const scale = innerWidth / 1920;
  const textScale = Number(document.body.style.getPropertyValue('--ds-user-text-scale') || 1);
  assert(innerWidth >= 1280, 'Desktop viewport required');
  assert(document.documentElement.scrollWidth <= innerWidth, 'Horizontal document overflow');
  for (const container of document.querySelectorAll('.container')) {
    near(container.getBoundingClientRect().width, 1440 * scale, 'Container');
  }
  const about = document.body.classList.contains('page-about');
  const portfolio = document.body.classList.contains('page-portfolio');
  const home = document.body.classList.contains('page-home');
  const services = document.body.classList.contains('page-services');
  assert(about || portfolio || home || services, 'Unknown page');
  // Preserve the current fixed-size PageHero on Portfolio/Services; this change only widens shells.
  near(parseFloat(style('h1').fontSize), (home ? 64 : 56) * (home || about ? scale * textScale : 1), 'H1');
  if (about) {
    assert(style('.ab-pillars-grid').gridTemplateColumns.split(' ').length === 3, 'About pillars');
    assert(style('.ab-caps-grid').gridTemplateColumns.split(' ').length === 2, 'About capabilities');
    assert(style('.certificates-grid').gridTemplateColumns.split(' ').length === 5, 'Certificates');
    near(parseFloat(style('.ab-who h2').fontSize), 38 * scale * textScale, 'About heading');
  }
  if (portfolio) {
    const grid = document.querySelector('.pf-grid').getBoundingClientRect().width;
    const gap = 24 * scale;
    for (const card of document.querySelectorAll('.pf-card')) {
      const expected = card.classList.contains('pf-w-std') ? (grid - 2 * gap) / 3 : card.classList.contains('pf-w-mid') ? (grid - gap) / 2 : (grid - 2 * gap) * 2 / 3 + gap;
      near(card.getBoundingClientRect().width, expected, 'Portfolio card width');
    }
  }
  const clipped = [...document.querySelectorAll('h1, h2, h3, h4, p, .button, .vendor-link, .main-nav, .pf-chip, .pf-badge')]
    .filter((element) => element.clientWidth && element.scrollWidth > element.clientWidth + 2)
    .map((element) => `${element.tagName}.${element.className}`);
  assert(!clipped.length, `Clipped text: ${clipped.join(', ')}`);
  return { route: location.pathname + location.search, width: innerWidth, textScale, container: document.querySelector('.container').getBoundingClientRect().width, h1: parseFloat(style('h1').fontSize), ok: true };
};
checkDesktopPage();
