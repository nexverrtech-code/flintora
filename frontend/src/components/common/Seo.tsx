import { createContext, useContext, useEffect } from 'react';
import { company, absoluteUrl } from '@/data/company';
import { breadcrumbSchema, organizationSchema, webPageSchema, websiteSchema } from '@/utils/schema';

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  pageType?: string; // schema.org WebPage subtype, e.g. AboutPage, ContactPage, CollectionPage
  noindex?: boolean;
  breadcrumbs?: { name: string; path: string }[];
  schema?: Record<string, unknown>[];
}

export interface HeadData {
  title: string;
  tags: string; // serialised <meta>/<link>/<script> tags
}

/** During prerendering a collector is provided; in the browser the context is null. */
export const HeadContext = createContext<{ head?: HeadData } | null>(null);

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function build(p: SeoProps) {
  const title = p.path === '/' ? `${company.name} | Creative & Digital Studio. ${company.tagline}` : `${p.title} | ${company.name}`;
  const url = absoluteUrl(p.path);
  const image = absoluteUrl(p.image ?? '/images/og/flintora-og.jpg');
  const meta: [string, string, string][] = [
    ['name', 'description', p.description],
    ['name', 'robots', p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'],
    ['property', 'og:site_name', company.name],
    ['property', 'og:type', p.type ?? 'website'],
    ['property', 'og:title', title],
    ['property', 'og:description', p.description],
    ['property', 'og:url', url],
    ['property', 'og:image', image],
    ['property', 'og:image:alt', p.imageAlt ?? 'The FLINTORA spark mark and wordmark on black'],
    ['property', 'og:locale', 'en_IN'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', p.description],
    ['name', 'twitter:image', image],
  ];
  const schema = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema({ path: p.path, title, description: p.description, type: p.pageType }),
    ...(p.breadcrumbs?.length ? [breadcrumbSchema(p.breadcrumbs)] : []),
    ...(p.schema ?? []),
  ];
  return { title, url, meta, schema };
}

/** Sets title, meta, canonical and JSON-LD for the current page. */
export function Seo(props: SeoProps) {
  const collector = useContext(HeadContext);
  const { title, url, meta, schema } = build(props);

  if (collector) {
    // Prerender: serialise once, synchronously, so the static HTML ships complete metadata.
    const tags = [
      ...meta.map(([attr, key, val]) => `<meta ${attr}="${key}" content="${esc(val)}" data-seo>`),
      `<link rel="canonical" href="${esc(url)}" data-seo>`,
      `<script type="application/ld+json" data-seo>${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`,
    ].join('\n    ');
    collector.head = { title, tags };
  }

  const key = JSON.stringify([title, meta, url, schema]);
  useEffect(() => {
    document.title = title;
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
    const frag = document.createDocumentFragment();
    for (const [attr, k, val] of meta) {
      const m = document.createElement('meta');
      m.setAttribute(attr, k);
      m.setAttribute('content', val);
      m.setAttribute('data-seo', '');
      frag.appendChild(m);
    }
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = url;
    link.setAttribute('data-seo', '');
    frag.appendChild(link);
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.setAttribute('data-seo', '');
    ld.textContent = JSON.stringify(schema);
    frag.appendChild(ld);
    document.head.appendChild(frag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return null;
}
