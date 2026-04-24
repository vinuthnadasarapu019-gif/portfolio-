/* ═══════════════════════════════════════════════
   VASIREDDY GUNA PRIYA — ALMANAC EDITION
   Intro curtain · Reveals · Active nav · Marquee
   ═══════════════════════════════════════════════ */

'use strict';

/* ── 0. Intro curtain with progress bar ──────── */
(function intro() {
  const el  = document.getElementById('intro');
  const bar = document.getElementById('introBar');
  if (!el || !bar) return;

  document.body.style.overflow = 'hidden';
  const dur   = 1500;
  const start = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    bar.style.width = `${(eased * 100).toFixed(1)}%`;
    if (t < 1) requestAnimationFrame(tick);
    else {
      bar.style.width = '100%';
      setTimeout(() => {
        el.classList.add('done');
        document.body.style.overflow = '';
      }, 280);
    }
  }
  requestAnimationFrame(tick);
})();

/* ── 1. Smooth anchor scroll ─────────────────── */
(function anchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();

/* ── 2. In-view reveal triggers ──────────────── */
(function reveal() {
  // Tag reveal targets
  const revealSelectors = [
    '.hm-box', '.hero-grid', '.hero-cta',
    '.about-prose', '.about-card',
    '.sk-col', '.xp', '.pj',
    '.ct', '.life-card',
    '.contact-big', '.contact-email', '.cr-item',
    '.sec-h', '.sec-rule'
  ];
  const targets = document.querySelectorAll(revealSelectors.join(','));
  targets.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in-view');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -50px 0px' });

  targets.forEach(t => obs.observe(t));
})();

/* ── 3. Active nav link based on scroll ──────── */
(function activeNav() {
  const links = document.querySelectorAll('.site-nav a');
  const sections = [...links]
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => {
        const match = l.getAttribute('href') === `#${e.target.id}`;
        l.classList.toggle('active', match);
      });
    });
  }, { rootMargin: '-50% 0px -48% 0px' });

  sections.forEach(s => obs.observe(s));
})();

/* ── 4. Marquee pause on hover ───────────────── */
(function marqueeHover() {
  const track = document.querySelector('.mar-track');
  const wrap  = document.querySelector('.mar-band');
  if (!track || !wrap) return;
  wrap.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  wrap.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
})();

/* ── 5. Magnetic CTA hover ───────────────────── */
(function magnetic() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const strength = 0.22;
  const buttons  = document.querySelectorAll('.cta-primary, .cta-ghost, .head-cta, .contact-email');

  buttons.forEach(el => {
    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * strength;
      const dy = (e.clientY - (r.top  + r.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.transition = 'transform 0.15s ease-out';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform  = 'translate(0,0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });
  });
})();

/* ── 6. Counter animation for hero-grid numbers ── */
(function counters() {
  const els = document.querySelectorAll('.hg-num');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.textContent, 10);
      if (isNaN(target)) return;
      const dur = 1100;
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.floor(eased * target)).padStart(2, '0');
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = String(target).padStart(2, '0');
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => obs.observe(el));
})();
