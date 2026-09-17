/* =========================================================================
   Single-page interactions — kept intentionally lean.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------- Theme (default: light) ---------- */
  const themeBtn = document.querySelector('.theme-toggle');
  const stored = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', stored);
  setThemeIcon(stored);

  function setThemeIcon(t) { if (themeBtn) themeBtn.textContent = t === 'dark' ? '☀' : '☾'; }

  themeBtn && themeBtn.addEventListener('click', function () {
    const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setThemeIcon(next);
  });

  /* ---------- Mobile nav ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle && navToggle.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
  nav && nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); });
  });

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    const btt = document.querySelector('.back-to-top');
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scrollspy (active nav link) ---------- */
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('id');
          navLinks.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  if ('IntersectionObserver' in window) {
    const rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { rev.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.querySelector('.back-to-top');
  backToTop && backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Collapsible "show more" toggles ---------- */
  document.querySelectorAll('[data-toggle-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = document.getElementById(btn.getAttribute('data-toggle-target'));
      if (!target) return;
      const isHidden = target.hasAttribute('hidden');
      if (isHidden) { target.removeAttribute('hidden'); btn.textContent = btn.getAttribute('data-hide-label'); }
      else { target.setAttribute('hidden', ''); btn.textContent = btn.getAttribute('data-show-label'); }
    });
  });

  /* ---------- Project modal ---------- */
  const modal = document.getElementById('project-modal');
  if (modal) {
    const mTitle = modal.querySelector('#modal-title');
    const mYear = modal.querySelector('#modal-year');
    const mImg = modal.querySelector('#modal-img');
    const mDesc = modal.querySelector('#modal-desc');
    const mClose = modal.querySelector('#modal-close');

    function open(data) {
      mTitle.textContent = data.title || 'Project';
      mYear.textContent = data.year || '';
      if (data.img) {
        mImg.src = data.img; mImg.alt = data.title || ''; mImg.style.display = '';
        mImg.onerror = function () { mImg.style.display = 'none'; };
      } else { mImg.style.display = 'none'; }
      mDesc.textContent = data.desc || '';
      modal.setAttribute('data-open', '');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      modal.removeAttribute('data-open');
      document.body.style.overflow = '';
    }
    document.querySelectorAll('.project').forEach(function (card) {
      card.addEventListener('click', function () {
        try { open(JSON.parse(card.getAttribute('data-project') || '{}')); }
        catch (err) { /* ignore malformed */ }
      });
    });
    mClose && mClose.addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------- Graceful image fallbacks ---------- */
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () {
      const fb = img.parentElement && img.parentElement.querySelector('.thumb-fallback, .portrait-fallback');
      img.style.display = 'none';
      if (fb) fb.style.display = 'grid';
    });
    // already broken before listener attached
    if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event('error'));
  });
})();
