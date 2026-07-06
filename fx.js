/* =====================================================================
   fx.js — PowerStudio premium-effects library (reusable, zero deps)
   Drop into any framework. Everything is opt-in via data attributes:

     data-fx              → fade-up reveal on scroll (stagger: --fx-delay or data-fx-delay="ms")
     data-count-to="60"   → animate number from 0 when scrolled into view
     data-tilt            → 3D tilt toward cursor + glare position (--gx/--gy)
     data-magnetic        → button leans toward the cursor, springs back
     data-parallax        → slow vertical drift on scroll (background strips)
     .marquee-track       → content auto-duplicated for a seamless CSS loop
     .site-header         → gets .scrolled after 10px (style it in CSS)

   Respects prefers-reduced-motion: reveals/counters snap to final state,
   tilt/magnetic/parallax are skipped entirely.
   ===================================================================== */

(function () {
  "use strict";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll reveals ----------
     Simple scroll + rAF visibility check. Chosen over IntersectionObserver
     because IO's initial callback can miss above-the-fold content on some
     first paints — leaving a hero invisible. This reveals in-view content
     immediately and can never leave an element stuck hidden. */
  const revealEls = Array.from(document.querySelectorAll("[data-fx]"));
  revealEls.forEach((el) => {
    const d = el.getAttribute("data-fx-delay");
    if (d) el.style.setProperty("--fx-delay", d + "ms");
  });
  if (reduced) {
    revealEls.forEach((el) => el.classList.add("fx-in"));
  } else {
    const vh = () => window.innerHeight || document.documentElement.clientHeight;
    let pending = revealEls.slice();
    const check = () => {
      for (let i = pending.length - 1; i >= 0; i--) {
        const r = pending[i].getBoundingClientRect();
        if (r.top < vh() * 0.92 && r.bottom > 0) { pending[i].classList.add("fx-in"); pending.splice(i, 1); }
      }
      if (!pending.length) { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); }
    };
    // Direct handler (no requestAnimationFrame) so reveals fire even where rAF is
    // throttled; the work is trivial for a handful of elements and self-removes
    // once everything is shown.
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    check();                 // reveal above-the-fold right away
    setTimeout(check, 300);  // re-check after late layout (fonts/images)
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count-to]");
  function runCounter(el) {
    const target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
    const dur = 1400;
    const start = performance.now();
    const fmt = (n) => n.toLocaleString("en-CA");
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (reduced || !("IntersectionObserver" in window)) {
    counters.forEach((el) => { el.textContent = (parseInt(el.getAttribute("data-count-to"), 10) || 0).toLocaleString("en-CA"); });
  } else {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- 3D tilt cards (delegated — works on re-rendered content) ---------- */
  const MAX_TILT = 7; // degrees
  if (!reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("pointermove", (ev) => {
      const card = ev.target.closest && ev.target.closest("[data-tilt]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      const nx = (ev.clientX - r.left) / r.width;   // 0..1
      const ny = (ev.clientY - r.top) / r.height;
      card.style.transform = `perspective(800px) rotateX(${(0.5 - ny) * MAX_TILT}deg) rotateY(${(nx - 0.5) * MAX_TILT}deg)`;
      card.style.setProperty("--gx", (nx * 100).toFixed(1) + "%");
      card.style.setProperty("--gy", (ny * 100).toFixed(1) + "%");
    }, { passive: true });
    document.addEventListener("pointerout", (ev) => {
      const card = ev.target.closest && ev.target.closest("[data-tilt]");
      if (card && !card.contains(ev.relatedTarget)) card.style.transform = "";
    }, { passive: true });
  }

  /* ---------- Magnetic buttons (delegated) ---------- */
  const MAG_PULL = 0.22;
  if (!reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("pointermove", (ev) => {
      const btn = ev.target.closest && ev.target.closest("[data-magnetic]");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const dx = ev.clientX - (r.left + r.width / 2);
      const dy = ev.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${dx * MAG_PULL}px, ${dy * MAG_PULL}px)`;
    }, { passive: true });
    document.addEventListener("pointerout", (ev) => {
      const btn = ev.target.closest && ev.target.closest("[data-magnetic]");
      if (btn && !btn.contains(ev.relatedTarget)) btn.style.transform = "";
    }, { passive: true });
  }

  /* ---------- Parallax strips ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (!reduced && parallaxEls.length) {
    let ticking = false;
    function update() {
      ticking = false;
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const progress = (r.top + r.height / 2 - vh / 2) / vh; // -0.5..0.5-ish
        el.style.transform = `translateY(${progress * -60}px)`;
      });
    }
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Marquee: duplicate content for seamless loop ---------- */
  document.querySelectorAll(".marquee-track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- Header scrolled state ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
