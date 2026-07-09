/* =====================================================================
   K.G.P Landscaping & Property Maintenance
   ---------------------------------------------------------------------
   Personalise for a client:
   • Brand/colours: :root tokens in styles.css + brand text in index.html.
   • Services & projects: edit the SERVICES and PROJECTS arrays below.
   • Real photos: give an item an `image:` path (e.g. "assets/driveway.jpg")
     to override the Pexels placeholder — drop in KGP's real project photos
     once they can supply high-resolution originals (their current photos are
     low-res GBP downloads, so this demo runs entirely on Pexels for now).
   • Quote form: see quoteForm handler — wire to email (Web3Forms) or Firebase.
   ===================================================================== */

const CONFIG = {
  heroQuery: "landscaped backyard lawn",
  // === LEAD DELIVERY (set this before selling the site) ===============
  // Get a FREE key at https://web3forms.com — enter the client's email, then
  // paste the key here. Quote requests then email the client automatically.
  // Until it's set, the form opens the visitor's email app as a fallback.
  web3formsKey: "a8ef39e0-3aa6-410d-ae9e-79ea37995540",
  contactEmail: "kgplandscaping@gmail.com", // KGP's public email — mailto fallback + shown on errors
  businessName: "K.G.P Landscaping & Property Maintenance",
};

const SERVICES = [
  { id: "lawn-care", name: "Lawn Care & Mowing", desc: "Weekly mowing, edging, trimming, and lawn health programs.", query: "lawn mowing green grass",
    lead: "Keep your lawn thick, green, and neatly kept all season long with regular care from a local crew.",
    points: ["Weekly or bi-weekly mowing", "Edging, trimming, and cleanup", "Fertilizing and weed control", "Aeration and overseeding", "Seasonal spring and fall cleanups"] },
  { id: "landscaping", name: "Landscaping & Design", desc: "Sod installation, garden beds, and full yard transformations.", query: "landscaping garden design yard",
    lead: "From a fresh lawn to a full backyard redesign, we build outdoor spaces that add value and curb appeal.",
    points: ["New sod installation", "Garden bed design and planting", "Mulching and edging", "Interlocking stone walkways and patios", "Retaining walls and drainage solutions"] },
  { id: "snow-removal", name: "Snow Removal", desc: "Residential and commercial snow clearing all winter long.", query: "snow removal driveway plow",
    lead: "Don't get snowed in — we clear driveways, walkways, and lots fast, before and after every storm.",
    points: ["Driveway and walkway clearing", "Residential and commercial contracts", "Salting and ice management", "Same-day and after-storm service", "Reliable, on-time crews"] },
  { id: "property-maintenance", name: "Property Maintenance", desc: "Year-round upkeep for homes, rentals, and commercial properties.", query: "property maintenance yard cleanup",
    lead: "One call handles it all — ongoing upkeep so your property always looks its best, every season.",
    points: ["Seasonal cleanups (spring & fall)", "Hedge and shrub trimming", "Yard waste and debris removal", "Gutter cleaning", "Custom maintenance plans for landlords & businesses"] },
];

// Project gallery — cat drives the filter chips.
// Gallery uses hi-res Pexels placeholders (crisp at fullscreen). KGP's real
// photos stay in assets/ for the hero + service cards; swap them back in
// here via `image:` once KGP provides high-resolution originals.
const PROJECTS = [
  { id: "p1", title: "Gravel driveway & lawn edge",  cat: "Landscaping", query: "gravel driveway landscaping" },
  { id: "p2", title: "Backyard sod installation",    cat: "Landscaping", query: "new sod backyard" },
  { id: "p3", title: "Fresh cut front lawn",         cat: "Lawn Care",   query: "manicured front lawn" },
  { id: "p4", title: "Stone paver walkway",          cat: "Landscaping", query: "stone paver walkway garden" },
  { id: "p5", title: "Weekly lawn mowing",           cat: "Lawn Care",   query: "lawn mowing stripes" },
  { id: "p6", title: "Driveway snow clearing",       cat: "Snow Removal",query: "snow removal driveway plow truck" },
  { id: "p7", title: "Garden bed & planting",        cat: "Property Maintenance", query: "garden bed mulch cleanup" },
  { id: "p8", title: "Hedge trimming & edging",      cat: "Property Maintenance", query: "hedge trimming yard" },
  { id: "p9", title: "Backyard patio & pergola",     cat: "Landscaping", query: "backyard pergola landscaping" },
];

// --- Demo photos: pinned Pexels shots, keyed by each item's `query` -----
// Direct image URLs load with the page — no API call, no key, no pop-in.
// To change a photo: browse pexels.com, copy the image address, paste here.
const PEXELS_PHOTOS = {
  "lawn mowing green grass": { u: "https://images.pexels.com/photos/4162009/pexels-photo-4162009.jpeg", p: "Pexels" },
  "landscaping garden design yard": { u: "https://images.pexels.com/photos/7174103/pexels-photo-7174103.jpeg", p: "Pexels" },
  "snow removal driveway plow": { u: "https://images.pexels.com/photos/11049307/pexels-photo-11049307.jpeg", p: "Pexels" },
  "property maintenance yard cleanup": { u: "https://images.pexels.com/photos/32427440/pexels-photo-32427440.jpeg", p: "Pexels" },
  "gravel driveway landscaping": { u: "https://images.pexels.com/photos/1315919/pexels-photo-1315919.jpeg", p: "Pexels" },
  "new sod backyard": { u: "https://images.pexels.com/photos/5231237/pexels-photo-5231237.jpeg", p: "Pexels" },
  "manicured front lawn": { u: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg", p: "Pexels" },
  "stone paver walkway garden": { u: "https://images.pexels.com/photos/33078884/pexels-photo-33078884.jpeg", p: "Pexels" },
  "lawn mowing stripes": { u: "https://images.pexels.com/photos/6728919/pexels-photo-6728919.jpeg", p: "Pexels" },
  "snow removal driveway plow truck": { u: "https://images.pexels.com/photos/20088977/pexels-photo-20088977.jpeg", p: "Pexels" },
  "garden bed mulch cleanup": { u: "https://images.pexels.com/photos/5231083/pexels-photo-5231083.jpeg", p: "Pexels" },
  "hedge trimming yard": { u: "https://images.pexels.com/photos/24595772/pexels-photo-24595772.jpeg", p: "Pexels" },
  "backyard patio lawn": { u: "https://images.pexels.com/photos/32103585/pexels-photo-32103585.jpeg", p: "Pexels" },
  "backyard pergola landscaping": { u: "https://images.pexels.com/photos/13871294/pexels-photo-13871294.jpeg", p: "Pexels" },
  "landscaped backyard lawn": { u: "https://images.pexels.com/photos/13871294/pexels-photo-13871294.jpeg", p: "Pexels" },
};
// Size an image via Pexels CDN params (w = target width in px)
const px = (u, w) => `${u}?auto=compress&cs=tinysrgb&w=${w}`;

const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// --- SVG fallback placeholder (shown if a photo fails to load) ---------
function placeholderSVG(seed = 0) {
  const h = (seed * 47) % 360;
  return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Project photo placeholder">
    <defs><linearGradient id="pg${seed}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${h},24%,28%)"/><stop offset="1" stop-color="hsl(${h},20%,16%)"/></linearGradient></defs>
    <rect width="300" height="200" fill="url(#pg${seed})"/>
    <path d="M40 150 L110 80 L160 130 L210 95 L260 150 Z" fill="hsl(${h},30%,38%)" opacity=".5"/>
    <circle cx="230" cy="55" r="18" fill="hsl(40,60%,55%)" opacity=".7"/>
  </svg>`;
}

// --- Item imagery: real photo > pinned Pexels photo > SVG fallback ------
const itemImage = (item, w = 640) =>
  item.image || (PEXELS_PHOTOS[item.query] ? px(PEXELS_PHOTOS[item.query].u, w) : null);

function mediaHTML(item, seed) {
  const url = itemImage(item);
  const credit = !item.image && PEXELS_PHOTOS[item.query]?.p;
  if (url) return `<img src="${esc(url)}" alt="${esc(item.name || item.title)}"${credit ? ` title="Photo: ${esc(credit)} / Pexels"` : ""} loading="lazy" decoding="async" onerror="this.outerHTML = placeholderSVG(${seed})">`;
  return placeholderSVG(seed);
}

// --- Hero background ----------------------------------------------------
function loadHero() {
  if (CONFIG.heroImage) { document.getElementById("hero").style.backgroundImage = `url("${CONFIG.heroImage}")`; return; }
  const ph = PEXELS_PHOTOS[CONFIG.heroQuery];
  if (ph) document.getElementById("hero").style.backgroundImage = `url("${px(ph.u, 1600)}")`;
}

// --- Render: services ---------------------------------------------------
const servicesGrid = document.getElementById("servicesGrid");
function renderServices() {
  servicesGrid.innerHTML = SERVICES.map((s, i) => `
    <article class="service-card" data-service="${s.id}" data-tilt data-fx data-fx-delay="${i * 70}" role="button" tabindex="0" aria-label="${esc(s.name)} — view details">
      <div class="service-media" data-id="${s.id}">${mediaHTML(s, i + 1)}</div>
      <div class="service-body"><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p><span class="service-more">View details →</span></div>
    </article>`).join("");
  servicesGrid.querySelectorAll(".service-card[data-service]").forEach((c) => {
    const open = () => openService(c.dataset.service);
    c.addEventListener("click", open);
    c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
}

// --- Service detail modal ----------------------------------------------
function openService(id) {
  const s = SERVICES.find((x) => x.id === id);
  if (!s) return;
  const modal = document.getElementById("serviceModal");
  document.getElementById("serviceModalBody").innerHTML = `
    <div class="sm-media">${mediaHTML(s, 1)}</div>
    <div class="sm-body">
      <h3>${esc(s.name)}</h3>
      <p class="sm-lead">${esc(s.lead || s.desc)}</p>
      <h4>What's included</h4>
      <ul class="sm-list">${(s.points || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <div class="sm-actions">
        <button class="btn btn-primary" id="smQuote">Get a free estimate</button>
        <button class="btn btn-ghost" id="smProjects">See our work</button>
      </div>
    </div>`;
  document.getElementById("smQuote").addEventListener("click", () => { closeService(); document.getElementById("contact").scrollIntoView({ behavior: "smooth" }); });
  document.getElementById("smProjects").addEventListener("click", () => { closeService(); document.getElementById("projects").scrollIntoView({ behavior: "smooth" }); });
  modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
}
function closeService() {
  const modal = document.getElementById("serviceModal");
  modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = "";
}
document.getElementById("serviceClose").addEventListener("click", closeService);
document.getElementById("serviceModal").addEventListener("click", (e) => { if (e.target.id === "serviceModal") closeService(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeService(); });

// --- Render: projects gallery + filters ---------------------------------
const galleryEl = document.getElementById("projectGallery");
const filtersEl = document.getElementById("projectFilters");
let activeCat = "All";

function renderFilters() {
  const cats = ["All", ...new Set(PROJECTS.map((p) => p.cat))];
  filtersEl.innerHTML = cats.map((c) =>
    `<button class="filter-chip ${c === activeCat ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
  filtersEl.querySelectorAll(".filter-chip").forEach((b) =>
    b.addEventListener("click", () => { activeCat = b.dataset.cat; renderFilters(); renderGallery(); }));
}
let visibleList = [];   // the currently filtered projects, in gallery order
function renderGallery() {
  visibleList = PROJECTS.filter((p) => activeCat === "All" || p.cat === activeCat);
  galleryEl.innerHTML = visibleList.map((p, i) => `
    <figure class="gallery-item" data-index="${i}" data-tilt tabindex="0" role="button" aria-label="View ${esc(p.title)}">
      ${mediaHTML(p, i + 1)}
      <figcaption class="gallery-cap">${esc(p.title)}</figcaption>
    </figure>`).join("");
}

// --- Lightbox: fullscreen slideshow with arrows / keys / swipe ----------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lbCaption = document.getElementById("lightbox-caption");
const lbCounter = document.getElementById("lightbox-counter");
let lbIndex = 0;

function lbShow(i) {
  const n = visibleList.length;
  if (!n) return;
  lbIndex = ((i % n) + n) % n;                      // wrap both directions
  const p = visibleList[lbIndex];
  const src = itemImage(p, 1920);                   // full-res for big screens
  if (!src) return;
  lightboxImg.classList.add("switching");
  const pre = new Image();
  pre.onload = () => {
    lightboxImg.src = src; lightboxImg.alt = p.title;
    lightboxImg.classList.remove("switching");
  };
  pre.src = src;
  lbCaption.textContent = p.title;
  lbCounter.textContent = `${lbIndex + 1} / ${n}`;
  // hint the neighbours into cache so arrows feel instant
  [lbIndex + 1, lbIndex - 1].forEach((j) => {
    const q = visibleList[((j % n) + n) % n];
    const u = q && itemImage(q, 1920);
    if (u) { const im = new Image(); im.src = u; }
  });
}
function openLightbox(i) {
  lbShow(i);
  lightbox.classList.add("show"); document.body.style.overflow = "hidden";
}
function closeLightbox() { lightbox.classList.remove("show"); lightboxImg.src = ""; document.body.style.overflow = ""; }

galleryEl.addEventListener("click", (e) => {
  const item = e.target.closest(".gallery-item");
  if (item) openLightbox(+item.dataset.index);
});
galleryEl.addEventListener("keydown", (e) => {
  const item = e.target.closest(".gallery-item");
  if (item && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openLightbox(+item.dataset.index); }
});
document.getElementById("lightbox-prev").addEventListener("click", (e) => { e.stopPropagation(); lbShow(lbIndex - 1); });
document.getElementById("lightbox-next").addEventListener("click", (e) => { e.stopPropagation(); lbShow(lbIndex + 1); });
lightbox.addEventListener("click", (e) => {
  if (e.target === lightboxImg || e.target.closest(".lightbox-arrow")) return;
  closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;
  if (e.key === "ArrowRight") lbShow(lbIndex + 1);
  if (e.key === "ArrowLeft") lbShow(lbIndex - 1);
});
// Touch swipe between photos
let lbTouchX = null;
lightbox.addEventListener("touchstart", (e) => { lbTouchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", (e) => {
  if (lbTouchX === null) return;
  const dx = e.changedTouches[0].clientX - lbTouchX;
  if (Math.abs(dx) > 48) lbShow(lbIndex + (dx < 0 ? 1 : -1));
  lbTouchX = null;
}, { passive: true });

// --- Quote form (real delivery via Web3Forms) ---------------------------
const KEY_PLACEHOLDER = "YOUR_WEB3FORMS_ACCESS_KEY";
document.getElementById("quoteForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const fd = new FormData(form);
  const firstName = String(fd.get("name") || "there").split(" ")[0];
  const note = document.getElementById("quoteNote");
  const btn = form.querySelector('button[type="submit"]');

  // No key yet → open the visitor's email app so no lead is ever lost.
  if (!CONFIG.web3formsKey || CONFIG.web3formsKey === KEY_PLACEHOLDER) {
    const subject = encodeURIComponent(`New estimate request — ${fd.get("name") || ""}`);
    const body = encodeURIComponent([...fd.entries()].filter(([k]) => k !== "botcheck").map(([k, v]) => `${k}: ${v}`).join("\n"));
    window.location.href = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
    toast("Opening your email app to send your request…");
    return;
  }

  fd.append("access_key", CONFIG.web3formsKey);
  fd.append("subject", `🔔 NEW LEAD — Estimate request from ${fd.get("name") || "website"}`);
  fd.append("from_name", CONFIG.businessName);
  btn.disabled = true; const orig = btn.textContent; btn.textContent = "Sending…";
  try {
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { Accept: "application/json" }, body: fd });
    const data = await res.json();
    if (res.ok && data.success) {
      form.reset();
      toast(`Thanks ${firstName} — we'll be in touch within 1 business day!`);
      if (note) note.textContent = "Request sent ✓ — we'll reply by email shortly.";
    } else { throw new Error(data.message || "Send failed"); }
  } catch (_) {
    toast(`Couldn't send — please call ${CONFIG.businessName}.`);
    if (note) note.textContent = `Something went wrong sending the form. Please call 289-439-5882 directly.`;
  } finally { btn.disabled = false; btn.textContent = orig; }
});

// --- Mobile nav + misc --------------------------------------------------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
function setNav(open) {
  navLinks.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open);
  navToggle.textContent = open ? "✕" : "☰";
}
navToggle.addEventListener("click", (e) => { e.stopPropagation(); setNav(!navLinks.classList.contains("open")); });
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setNav(false)));
// Tap anywhere outside the menu to close it
document.addEventListener("pointerdown", (e) => {
  if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !navToggle.contains(e.target)) setNav(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeLightbox(); setNav(false); }
});

let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.hidden = false;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.classList.remove("show"); setTimeout(() => (t.hidden = true), 250); }, 3200);
}
document.getElementById("year").textContent = new Date().getFullYear();

// --- Init ---------------------------------------------------------------
renderServices();
renderFilters();
renderGallery();
loadHero();
