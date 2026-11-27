// Schema.org helpers. Only facts that exist in the data files are emitted; empty values are dropped.
import { company, absoluteUrl, socialLinks, hasAddress, industries } from '@/data/company';
import { services, type Service } from '@/data/services';
import type { Project } from '@/data/projects';
import type { TeamMember } from '@/data/team';

type Json = Record<string, unknown>;

/** Remove undefined, empty strings and empty arrays so we never publish blank facts. */
export function prune<T>(v: T): T {
  if (Array.isArray(v)) return v.map(prune).filter((x) => x !== undefined) as T;
  if (v && typeof v === 'object') {
    const out: Json = {};
    for (const [k, val] of Object.entries(v as Json)) {
      const p = prune(val);
      if (p === undefined || p === '' || (Array.isArray(p) && p.length === 0)) continue;
      out[k] = p;
    }
    return out as T;
  }
  return v;
}

export const ORG_ID = `${company.siteUrl}/#organization`;
export const SITE_ID = `${company.siteUrl}/#website`;

export const organizationSchema = (): Json =>
  prune({
    '@context': 'https://schema.org',
    // ProfessionalService is a LocalBusiness and an Organization: it lets Google connect the site
    // to a Google Business Profile (matching name, address and phone) for local results.
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: company.name,
    alternateName: company.displayName,
    slogan: company.tagline,
    description: company.description,
    url: absoluteUrl('/'),
    logo: { '@type': 'ImageObject', url: absoluteUrl('/logo/flintora-logo-1200.png'), width: 1200, height: 1200 },
    email: company.contact.email,
    telephone: company.contact.phone,
    address: hasAddress
      ? {
          '@type': 'PostalAddress',
          streetAddress: company.address.street,
          addressLocality: company.address.city,
          addressRegion: company.address.region,
          postalCode: company.address.postcode,
          addressCountry: company.address.country,
        }
      : undefined,
    image: absoluteUrl('/images/og/flintora-og.jpg'),
    geo:
      company.local.lat && company.local.lng
        ? { '@type': 'GeoCoordinates', latitude: Number(company.local.lat), longitude: Number(company.local.lng) }
        : undefined,
    hasMap: company.local.mapsUrl,
    openingHours: company.local.openingHours,
    areaServed: company.local.serviceArea.map((name) => ({ '@type': 'Place', name })),
    sameAs: [...socialLinks.map((s) => s.url), company.local.googleBusinessUrl].filter(Boolean),
    knowsAbout: [...services.map((s) => s.name), ...industries.map((i) => `Marketing and design for ${i.toLowerCase()}`)],
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, url: absoluteUrl(`/capabilities/${s.slug}`) },
    })),
  });

export const websiteSchema = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  name: company.name,
  url: absoluteUrl('/'),
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
});

export const webPageSchema = (opts: { path: string; title: string; description: string; type?: string }): Json => ({
  '@context': 'https://schema.org',
  '@type': opts.type ?? 'WebPage',
  '@id': `${absoluteUrl(opts.path)}#webpage`,
  url: absoluteUrl(opts.path),
  name: opts.title,
  description: opts.description,
  inLanguage: 'en',
  isPartOf: { '@id': SITE_ID },
  about: { '@id': ORG_ID },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]): Json => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...items].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const serviceSchema = (s: Service): Json =>
  prune({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(`/capabilities/${s.slug}`)}#service`,
    name: s.name,
    serviceType: s.name,
    description: s.metaDescription,
    url: absoluteUrl(`/capabilities/${s.slug}`),
    provider: { '@id': ORG_ID },
    areaServed: company.local.serviceArea.map((name) => ({ '@type': 'Place', name })),
    audience: { '@type': 'BusinessAudience', name: industries.join(', ') },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${s.name} deliverables`,
      itemListElement: s.deliverables.map((d) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: d } })),
    },
  });

export const creativeWorkSchema = (p: Project): Json =>
  prune({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${absoluteUrl(`/work/${p.slug}`)}#work`,
    name: p.title,
    headline: p.title,
    abstract: p.summary,
    url: absoluteUrl(`/work/${p.slug}`),
    dateCreated: p.year,
    genre: p.categories,
    creator: { '@id': ORG_ID },
    // Concept studies are clearly marked as such in structured data too.
    creativeWorkStatus: p.kind === 'concept' ? 'Concept study (fictional brand, not a client commission)' : undefined,
    image:
      p.cover.type === 'image' ? absoluteUrl(`${p.cover.src}-1600.webp`) : undefined,
  });

export const faqSchema = (items: { q: string; a: string }[]): Json => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
});

export const personSchema = (m: TeamMember): Json =>
  prune({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: m.name,
    jobTitle: m.role,
    description: m.bio,
    worksFor: { '@id': ORG_ID },
    image: m.image ? absoluteUrl(`${m.image}.webp`) : undefined,
    sameAs: m.links?.map((l) => l.url),
  });
