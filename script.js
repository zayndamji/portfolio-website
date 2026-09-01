const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeStatus(text) {
  const target = document.getElementById('now');
  if (!target || !text) return;

  if (reduceMotion) {
    target.textContent = text;
    return;
  }

  let length = 0;

  (function next() {
    target.textContent = text.slice(0, ++length);
    if (length < text.length) setTimeout(next, 62);
  })();
}

function highlightRailOnScroll() {
  const links = [...document.querySelectorAll('.rail a[href^="#"]')];
  const linkFor = new Map(links.map(link => [link.hash.slice(1), link]));
  const onScreen = new Set();

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) onScreen.add(entry.target.id);
      else onScreen.delete(entry.target.id);
    }

    const current = [...linkFor.keys()].filter(id => onScreen.has(id)).pop();
    for (const link of links) {
      const active = link === linkFor.get(current);
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-10% 0px -60% 0px' });

  for (const project of document.querySelectorAll('.rec[id]')) {
    observer.observe(project);
  }
}

const fallback = document.querySelector('.typed noscript');
typeStatus(fallback ? fallback.textContent.trim() : '');
highlightRailOnScroll();
