/* =====================================================================
   three-scene.js — hero "sunlit pollen drift" (three.js from CDN, ES module)

   Warm green-gold motes drifting slowly upward, like pollen/dust caught
   in golden-hour sunlight through trees — the playbook's dust-drift
   recipe re-coloured for a landscaping vertical. Renders over KGP's real
   job-site photo (set as the .hero background), so it reads as light
   filtering through foliage rather than a generic starfield. Self-hosted,
   no Spline, no watermark.

   All motion is a pure function of the rAF timestamp (position = base +
   f(t), wrapped by modulo), so stepped/virtual-clock capture renders it
   deterministically for TikTok recording.

   Guardrails:
   - skips entirely on prefers-reduced-motion (photo + gradient stay)
   - fewer motes on small screens
   - pauses rendering when the hero is off-screen or the tab is hidden
   - DPR clamped to 2; CDN/WebGL failure leaves the photo — nothing breaks
   ===================================================================== */

const canvas = document.getElementById("heroCanvas");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && !reduced) {
  init().catch(() => { /* CDN or WebGL unavailable — hero photo/gradient fallback stays */ });
}

async function init() {
  const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");

  const hero = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x10160f, 8, 24);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
  camera.position.set(0, 0.4, 12);
  camera.lookAt(0, 0.5, 0);

  // --- Pollen motes: two layers (warm gold near, soft sage-green haze far) ---
  const small = window.innerWidth < 768;
  const SPAN_X = 30, SPAN_Y = 16, SPAN_Z = 12;

  // Per-mote randoms are fixed at init; every frame derives position from
  // (base + time) — no accumulated state, fully deterministic.
  function makeLayer(count, size, opacity, zOffset, color) {
    const base = new Float32Array(count * 3);   // resting position
    const seed = new Float32Array(count * 3);   // riseSpeed, swayPhase, swayAmp
    for (let i = 0; i < count; i++) {
      base[i * 3] = (Math.random() - 0.5) * SPAN_X;
      base[i * 3 + 1] = (Math.random() - 0.5) * SPAN_Y;
      base[i * 3 + 2] = (Math.random() - 0.5) * SPAN_Z + zOffset;
      seed[i * 3] = 0.1 + Math.random() * 0.22;           // rise speed (slow, upward)
      seed[i * 3 + 1] = Math.random() * Math.PI * 2;      // sway phase
      seed[i * 3 + 2] = 0.25 + Math.random() * 0.55;      // sway amplitude
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(base.slice(), 3));
    const mat = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(geo, mat));
    return { geo, base, seed, count };
  }

  const layers = [
    makeLayer(small ? 200 : 380, 0.055, 0.5, 0, 0xe0b96e),    // near motes — warm gold
    makeLayer(small ? 150 : 280, 0.04, 0.26, -4, 0x9fb098),   // far haze — soft sage green
  ];

  // --- Light shafts: two tall, faint additive planes like sun through trees ---
  const shaftGeo = new THREE.PlaneGeometry(3.2, 22);
  const shaftMat = new THREE.MeshBasicMaterial({
    color: 0xd9b869,
    transparent: true,
    opacity: 0.045,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const shaft1 = new THREE.Mesh(shaftGeo, shaftMat);
  shaft1.position.set(-4.5, 2, -3);
  shaft1.rotation.z = 0.32;
  scene.add(shaft1);
  const shaft2 = new THREE.Mesh(shaftGeo, shaftMat.clone());
  shaft2.material.opacity = 0.03;
  shaft2.position.set(5.5, 1, -5);
  shaft2.rotation.z = -0.26;
  scene.add(shaft2);

  // --- Cursor parallax (lerped so it feels weighty, not twitchy) ---
  let targetX = 0, targetY = 0;
  window.addEventListener("pointermove", (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 1.1;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
  }, { passive: true });

  // --- Resize to the hero box ---
  function resize() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  // --- Pause when hero is off-screen or tab hidden ---
  let heroVisible = true;
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);

  const wrap = (v, span) => ((v % span) + span) % span - span / 2;

  function frame(t) {
    requestAnimationFrame(frame);
    if (!heroVisible || document.hidden) return;
    const time = t * 0.001;

    for (const { geo, base, seed, count } of layers) {
      const pos = geo.attributes.position;
      for (let i = 0; i < count; i++) {
        const bx = base[i * 3], by = base[i * 3 + 1], bz = base[i * 3 + 2];
        const rise = seed[i * 3], phase = seed[i * 3 + 1], amp = seed[i * 3 + 2];
        pos.array[i * 3] = bx + Math.sin(time * 0.25 + phase) * amp;                 // sway
        pos.array[i * 3 + 1] = wrap(by + time * rise + SPAN_Y / 2, SPAN_Y);          // slow rise, wraps
        pos.array[i * 3 + 2] = bz + Math.cos(time * 0.18 + phase) * amp * 0.4;       // gentle depth drift
      }
      pos.needsUpdate = true;
    }

    // shafts breathe almost imperceptibly
    shaft1.material.opacity = 0.045 + Math.sin(time * 0.35) * 0.012;
    shaft2.material.opacity = 0.03 + Math.sin(time * 0.28 + 2) * 0.009;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (0.4 - targetY - camera.position.y) * 0.04;
    camera.lookAt(0, 0.5, 0);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
}
