const stillShot = location.search.includes('still');
const reduceMotion = stillShot || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (stillShot) document.documentElement.classList.add('still');

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
  const links = [...document.querySelectorAll('.idx a[href^="#"]')];
  const linkFor = new Map(links.map(link => [link.hash.slice(1), link]));
  const records = [...document.querySelectorAll('.rec[id]')];
  if (!records.length) return;

  let marked;
  let queued = false;

  function mark() {
    queued = false;

    const line = window.innerHeight * 0.4;
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let current = records[0].id;

    if (atEnd) {
      current = records[records.length - 1].id;
    } else {
      for (const record of records) {
        if (record.getBoundingClientRect().top <= line) current = record.id;
      }
    }

    if (current === marked) return;
    marked = current;

    for (const link of links) {
      const active = link === linkFor.get(current);
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(mark);
  }

  mark();
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
}

function backToTop() {
  const button = document.querySelector('.totop');
  const hero = document.querySelector('.ident');
  if (!button || !hero) return;

  new IntersectionObserver(([entry]) => {
    button.classList.toggle('show', !entry.isIntersecting);
  }).observe(hero);
}

const fallback = document.querySelector('.typed noscript');
typeStatus(fallback ? fallback.textContent.trim() : '');
highlightRailOnScroll();
backToTop();
