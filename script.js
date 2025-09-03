// Tutelaris Landing — small JS helpers

(function () {
  const nav = document.getElementById('primary-nav');
  const toggle = document.querySelector('.nav-toggle');
  const year = document.getElementById('year');

  // Footer year
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  if (toggle && nav) {
    const setCollapsed = (collapsed) => {
      nav.dataset.collapsed = String(collapsed);
      toggle.setAttribute('aria-expanded', String(!collapsed));
    };
    setCollapsed(true);
    toggle.addEventListener('click', () => setCollapsed(nav.dataset.collapsed !== 'false'));
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.matches('a[href^="#"]')) setCollapsed(true);
    });
  }

  // Smooth scroll for on-page anchors
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (!id || id === '#' || id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', id);
  });
})();

