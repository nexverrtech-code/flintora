# FLINTORA — Where Ideas Spark.

The website of FLINTORA, a creative and digital studio. A frontend-only React site: every page is prerendered to static HTML, with no backend, database or accounts.

```
brand-assets/   Official brand files (identity PDF, logo, flint stone artwork, Sora and Konexy fonts). Not deployed.
frontend/       The website (React 19, TypeScript, Vite, Tailwind CSS).
```

## Quick start

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck, client build, server build, prerender -> dist/
npm run preview    # serve dist/ at http://localhost:4173
npm run lint
npm run assets     # regenerate images in public/ from ../brand-assets (needs poppler's pdftoppm)
```

Node 22 or newer.

## Before launch

| What | Where |
| --- | --- |
| Domain, verified email, phone, WhatsApp, enquiry form URL, address and social profiles | `frontend/.env` (copy `.env.example`). Anything left empty is hidden everywhere, including structured data. |
| Budget Estimator rates | `frontend/src/data/pricing.ts`. The figures are **illustrative placeholders**. Replace them with FLINTORA's real rates, then set `ratesVerified = true` so the page wording changes. |
| Team and leadership | `frontend/src/data/team.ts` (empty). Add real people with their approval; the About page and Person schema pick them up automatically. |
| Testimonials | `frontend/src/data/testimonials.ts` (empty, hidden until filled). Genuine, approved quotes only. |
| Client case studies | `frontend/src/data/projects.ts`. Add with `kind: 'client'`; only add `results` that the client has verified. |
| Legal pages | `frontend/src/pages/legal/*`. Templates, written to match how the site works. Have them reviewed. |
| Konexy font licence | The supplied file is **Konexy Personal Use**. A commercial licence is needed for a business website. |

## Architecture

- **Routing:** React Router with route-level code splitting (`src/routes/routes.tsx`).
- **Prerendering:** `scripts/prerender.mjs` renders every route with `react-dom/static` into `dist/<route>/index.html`, with full metadata and JSON-LD, then writes `sitemap.xml`, `robots.txt` and `llms.txt`. The browser hydrates the existing HTML.
- **SEO:** `src/components/common/Seo.tsx` produces identical tags at prerender time and on client navigation. Schema helpers live in `src/utils/schema.ts` (Organization, WebSite, WebPage, Service, CreativeWork, BreadcrumbList, FAQPage, HowTo, Person once team data exists).
- **Content:** all copy and data are in `src/data/*`.
- **Motion:** GSAP + ScrollTrigger (masked reveals, parallax, pinned horizontal works, scroll-linked timeline), Lenis smooth scroll, Framer Motion (filters and wizard transitions), CSS for first-paint animations, React Three Fiber for the hero. Everything respects `prefers-reduced-motion`.
- **Spark Awakening intro:** `src/components/3d/SparkAwakening.tsx`. Plays on every load or reload of the home page (not on in-site navigation), uses the real flint stone artwork split along its crack, can be skipped (button or Escape), is hidden behind a pre-paint cover so the page never flashes, and is skipped entirely for reduced motion.
- **Forms:** Start a Project uses React Hook Form + Zod. Nothing is submitted by the page: the visitor reviews their enquiry and continues on WhatsApp, by email or to an external form (only those configured), or copies or downloads it.

## Deployment

The output in `frontend/dist` is static and works on any static host.

**Netlify:** connect the repository. The root `netlify.toml` builds `frontend` and publishes `frontend/dist`. Add the `VITE_*` variables under Site settings → Environment variables.

**Vercel:** import the repository, set the root directory to `frontend` (framework preset: Vite). `frontend/vercel.json` enables clean URLs and headers. Add the environment variables.

**Cloudflare (Workers Builds, current setup):** project root directory `frontend`, build command `npm run build`, deploy command `npx wrangler deploy`. `frontend/wrangler.jsonc` deploys `dist/` as static assets (clean URLs, real 404 page) and must stay in the repo: without it Wrangler auto-configures the project, adds the Cloudflare Vite plugin and breaks the prerender step. Add the `VITE_*` values as build variables. `public/_headers` is applied automatically.

**Cloudflare Pages:** root directory `frontend`, build command `npm run build`, output `dist`, environment variable `NODE_VERSION=22` plus the `VITE_*` values.

After the first deploy: confirm `VITE_SITE_URL` matches the live domain, submit `/sitemap.xml` in Google Search Console, and test the enquiry channels.
