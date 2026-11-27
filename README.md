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

## Contact form (sends real emails)

The Contact page form posts to [Web3Forms](https://web3forms.com) (free). Create an access key with the inbox that should receive enquiries and set `VITE_WEB3FORMS_KEY` as a build variable in Cloudflare. A success message is only shown when Web3Forms confirms delivery. Without a key, the form opens the visitor's email app addressed to `VITE_CONTACT_EMAIL`.

## Search: SEO, GEO, AEO and Google Business

Already built in:
- Prerendered HTML for every page, unique titles and descriptions, canonical URLs, Open Graph, `sitemap.xml`, `robots.txt`.
- `ProfessionalService` (LocalBusiness) structured data with address, phone, geo coordinates, opening hours, service area, map link and Google Business Profile link, filled from the `VITE_*` variables.
- Service, FAQPage (home, capabilities, services, process), BreadcrumbList, CreativeWork and HowTo structured data for answer engines and rich results.
- `llms.txt` with a plain-language summary of services, industries and contact details for AI assistants (GEO).
- Google Search Console and Bing verification tags (`VITE_GSC_VERIFICATION`, `VITE_BING_VERIFICATION`).

Your checklist (these happen outside the website and matter most for local ranking):
1. Set `VITE_SITE_URL` to the live domain.
2. Create or claim the Google Business Profile. Use exactly the same business name, address and phone (NAP) as in the `VITE_ADDRESS_*` and `VITE_CONTACT_PHONE` values, choose accurate categories (for example "Marketing agency", "Website designer", "Graphic designer"), add photos, services and opening hours.
3. Put the profile link in `VITE_GOOGLE_BUSINESS_URL` and the map link in `VITE_GOOGLE_MAPS_URL`, plus `VITE_GEO_LAT` / `VITE_GEO_LNG` and `VITE_SERVICE_AREA`.
4. Verify the site in Google Search Console and Bing Webmaster Tools and submit `/sitemap.xml`.
5. Ask happy clients for Google reviews and reply to every review.
6. List the business with the same NAP on trusted directories (JustDial, IndiaMART, Clutch, LinkedIn company page).
7. Publish real case studies as projects finish; genuine work is the strongest ranking and trust signal.

Nobody can guarantee a top position on Google or in AI answers; these are the factors that the site and you control.

## Stock photography

Service, About, Process and Contact photos come from Unsplash (free licence, commercial use, no attribution required) and are listed in `frontend/src/data/stock.ts`. To use your own photos, replace an `id` with the full URL of your image.

## Deployment

The output in `frontend/dist` is static and works on any static host.

**Netlify:** connect the repository. The root `netlify.toml` builds `frontend` and publishes `frontend/dist`. Add the `VITE_*` variables under Site settings → Environment variables.

**Vercel:** import the repository, set the root directory to `frontend` (framework preset: Vite). `frontend/vercel.json` enables clean URLs and headers. Add the environment variables.

**Cloudflare (Workers Builds, current setup):** project root directory `frontend`, build command `npm run build`, deploy command `npx wrangler deploy`. `frontend/wrangler.jsonc` deploys `dist/` as static assets (clean URLs, real 404 page) and must stay in the repo: without it Wrangler auto-configures the project, adds the Cloudflare Vite plugin and breaks the prerender step. Add the `VITE_*` values as build variables. `public/_headers` is applied automatically.

**Cloudflare Pages:** root directory `frontend`, build command `npm run build`, output `dist`, environment variable `NODE_VERSION=22` plus the `VITE_*` values.

After the first deploy: confirm `VITE_SITE_URL` matches the live domain, submit `/sitemap.xml` in Google Search Console, and test the enquiry channels.
