# K.G.P Landscaping & Property Maintenance — Website

A fast, mobile-friendly one-page website for **K.G.P Landscaping & Property Maintenance** (Hamilton, ON).
Built as a static site — pure HTML, CSS, and JavaScript with **zero build step** and no dependencies.

**Live demo:** _(GitHub Pages URL added on deploy)_

---

## What's on the site

- **Hero** with the business tagline, click-to-call phone, and a "Free estimate" call to action
- **Trust strip** — 5.0★ Google rating, locally owned, free estimates, year-round service
- **Services** — Lawn Care & Mowing, Landscaping & Design, Snow Removal, Property Maintenance (each opens a detail card)
- **Recent projects** gallery — filterable by category, click any photo to enlarge (real K.G.P job photos)
- **Full-bleed parallax banner**
- **How it works** — 4-step process
- **Reviews** — customer testimonials
- **Free-estimate request form** — emails the lead straight to the business
- SEO: `LocalBusiness` structured data, Open Graph tags, semantic HTML

## Tech

| File | Purpose |
|------|---------|
| `index.html` | Page structure and content |
| `styles.css` | All styling (CSS custom properties in `:root` for easy theming) |
| `app.js` | Data arrays (services, projects, photos) + all interactivity |
| `fx.js` | Reusable scroll-reveal / tilt / parallax effects |
| `assets/` | Real K.G.P project photos + logo |
| `favicon.svg` | Site icon |

## Run locally

```bash
python3 -m http.server 5650
# then open http://localhost:5650
```

## Going live — before launch

1. **Lead delivery:** create a free key at [web3forms.com](https://web3forms.com) with the business email, then paste it into `CONFIG.web3formsKey` in `app.js`. Until then, the estimate form opens the visitor's email app as a fallback so no lead is lost.
2. **Contact email:** set `CONFIG.contactEmail` in `app.js`.
3. **Custom domain** (optional): point a domain like `kgplandscaping.ca` at the host.

## Deploy (GitHub Pages)

Settings → Pages → Source: `main` branch, root folder. The site is served at
`https://<user>.github.io/<repo>/`. All asset paths are relative, so it works from any subpath.

---

_Site by [Power Studio](https://joshpower32.github.io/Power-Studio-Storefront/) — clean, mobile-friendly websites for local Hamilton businesses._
