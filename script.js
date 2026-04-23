/* ═══════════════════════════════════════════════
   VINUTHNA DASARAPU — DARK ATELIER
   Loader · Cursor · Live time · Tilt · Reveal
   ═══════════════════════════════════════════════ */

'use strict';

/* ── 0. Loader counter ───────────────────────── */
(function loader() {
  const el = document.getElementById('loader');
  const num = document.getElementById('loadNum');
  if (!el || !num) return;

  document.body.style.overflow = 'hidden';
  const dur = 1500;
  const start = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    num.textContent = Math.floor(eased * 100);
    if (t < 1) requestAnimationFrame(tick);
    else {
      num.textContent = 100;
      setTimeout(() => {
        el.classList.add('done');
        document.body.style.overflow = '';
      }, 250);
    }
  }
  requestAnimationFrame(tick);
})();

/* ── 1. Live time (IST) ──────────────────────── */
(function liveClock() {
  const el = document.getElementById('liveTime');
  if (!el) return;
  function render() {
    const d = new Date();
    const ist = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const hh = String(ist.getHours()).padStart(2, '0');
    const mm = String(ist.getMinutes()).padStart(2, '0');
    el.textContent = `${hh}:${mm}`;
  }
  render();
  setInterval(render, 30000);
})();

/* ── 2. Custom cursor ────────────────────────── */
/* Custom cursor disabled - using normal cursor */

/* ── 3. Nav scroll state ─────────────────────── */
(function nav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
})();

/* ── 4. Smooth anchor scroll ─────────────────── */
(function anchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();

/* ── 5. In-view triggers (projects, skills, signature) ── */
(function inView() {
  const targets = document.querySelectorAll('.proj, .sb-main, .foot-sig, .b, .jr, .sec-head, .hero-foot');
  if (!targets.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in-view', 'visible');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(t => obs.observe(t));
})();

/* ── 6. Counter animation for [data-count] ───── */
(function counters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const dur = 1100;
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(eased * target);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => obs.observe(el));
})();

/* ── 7. 3D tilt on project cards ─────────────── */
(function tilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cards = document.querySelectorAll('[data-tilt]');
  const max = 4;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform =
        `perspective(1400px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1400px) rotateX(0) rotateY(0)';
    });
  });
})();

/* ── 8. Magnetic hover (CTAs) ────────────────── */
(function magnetic() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const strength = 0.25;
  document.querySelectorAll('.nav-cta, .big-btn, .c-email, .ghost-btn').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top  + r.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.transition = 'transform 0.15s ease-out';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0,0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });
  });
})();

/* ── 9. Marquee pause on hover ───────────────── */
(function marquee() {
  const track = document.querySelector('.mar-track');
  const wrap  = document.querySelector('.mar');
  if (!track || !wrap) return;
  wrap.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  wrap.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
})();

/* ── 10. Active nav link ─────────────────────── */
(function activeLink() {
  const links = document.querySelectorAll('#nav .nav-pills a');
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
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(s => obs.observe(s));
})();

/* ── 11. Floating chip parallax ──────────────── */
(function chipParallax() {
  const chips = document.querySelectorAll('.float-chip');
  if (!chips.length) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    chips.forEach((c, i) => {
      const shift = y * (i === 0 ? -0.15 : 0.1);
      c.style.transform = `translateY(${shift}px)`;
    });
  }, { passive: true });
})();
