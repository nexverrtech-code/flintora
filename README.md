# Flintora website

Marketing website for **Flintora**, a digital marketing agency. *Where Ideas Spark.*

Built with [Astro](https://astro.build) as a fully static site, with a three.js 3D hero, scroll-driven parallax and complete technical SEO.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
npm run check      # TypeScript and Astro diagnostics
npm run assets     # regenerate images/icons in public/ from brand-assets/
```

Requires Node 22 or newer.

## Before launch: fill these in

| Where | What |
| --- | --- |
| `src/data/site.ts` | Confirm `email`; add `phone`, `whatsapp`, `address` and social profile URLs. Empty values are hidden automatically. |
| `.env` (copy from `.env.example`) | `SITE_URL`, `PUBLIC_WEB3FORMS_KEY`, `PUBLIC_GA_ID`, `PUBLIC_GSC_VERIFICATION` |
| `src/pages/privacy-policy.astro`, `src/pages/terms.astro` | Template legal text. Have it reviewed for your jurisdiction. |
| Konexy font | `brand-assets/fonts/konexy/KonexyPersonalUse.otf` is the **personal-use** version. Buy a commercial licence before going live, then replace `public/fonts/konexy.woff2`. |

## Integrations

| Integration | Env variable | Without it |
| --- | --- | --- |
| Contact form (Web3Forms, free tier) | `PUBLIC_WEB3FORMS_KEY` | Form opens a pre-filled email to `site.email` instead |
| Google Analytics 4 | `PUBLIC_GA_ID` | No analytics and no cookie banner |
| Google Search Console | `PUBLIC_GSC_VERIFICATION` | Verify via DNS instead |

GA only loads after a visitor accepts the consent banner.

## Project structure

```
brand-assets/           Original brand files (PDF, logo, stone artwork, fonts). Not deployed.
public/                 Static files: subset WOFF2 fonts, images, icons, _headers
scripts/build-assets.mjs  Generates web images, OG image and icons from brand-assets/
src/
  content/blog/         Blog articles (Markdown)
  content.config.ts     Blog schema
  data/                 site.ts (business details), services.ts, playbooks.ts
  components/           Header, Footer, SEO, Hero3D, PageHero, FlintScene, ProcessScroll, CTA, FAQ, ...
  layouts/BaseLayout.astro
  pages/                All routes (see below)
  scripts/motion.ts     Reveals, parallax, scroll progress, 3D tilt, magnetic buttons
  scripts/hero3d.ts     three.js hero scene (lazy loaded)
  styles/global.css     Design tokens and base styles from the brand guide
```

## Pages

`/`, `/services/` plus 6 service pages, `/playbooks/` plus 4 playbooks, `/about/`, `/blog/` plus articles, `/contact/`, `/privacy-policy/`, `/terms/`, `404`, `/rss.xml`, `/robots.txt`, `/sitemap-index.xml`, `/manifest.webmanifest`.

### Adding content

- **Blog post:** add a `.md` file in `src/content/blog/` with `title`, `description`, `date`, `category` and `readingTime` front matter.
- **Service or playbook:** add an entry in `src/data/services.ts` or `src/data/playbooks.ts`. Pages, navigation, sitemap and schema update automatically.
- **Konexy headlines:** Konexy only has letters, digits, `.` and `,`. Other characters fall back to Sora, so keep display headlines to those characters.

## Brand system

- Colours: Void Black `#040404`, Primary Spark `#FF800D`, Solar Flare `#FFA912`, Ember Depth `#FF9810`
- Type: Konexy for the wordmark and primary headlines, Sora for everything else
- The spark mark is redrawn as vector in `src/components/SparkMark.astro` and extruded in 3D in `src/scripts/hero3d.ts`

## Motion and accessibility

- The 3D hero loads after the page is idle. It is skipped for `prefers-reduced-motion`, Save-Data and devices without WebGL; the static SVG mark shows instead.
- Rendering pauses when the hero is off screen or the tab is hidden.
- Parallax, reveals and tilt are disabled under reduced motion; all content is server-rendered and visible without JavaScript.
- Skip link, focus styles, semantic landmarks, labelled form fields and keyboard support for the mobile menu (Escape closes it).

## Deployment

The output is static (`dist/`), so it runs on any static host.

**Netlify:** connect the repo. `netlify.toml` sets the build command, and `public/_headers` sets caching and security headers. Add env variables in Site settings.

**Vercel:** import the repo with the Astro preset. `vercel.json` sets the headers. Add env variables in Project settings.

**Cloudflare Pages:** build command `npm run build`, output `dist`, set `NODE_VERSION=22`. `_headers` is applied automatically.

After the first deploy:
1. Point the domain at the host and make sure `SITE_URL` matches it.
2. Add the property in Google Search Console and submit `/sitemap-index.xml`.
3. Send a test enquiry through the contact form.
4. Check the home page in PageSpeed Insights.
