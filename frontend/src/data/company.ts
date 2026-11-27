// Company facts. Only verified information belongs here.
// Contact channels come from build-time environment variables (see .env.example)
// so nothing unverified is ever published by default.

const env = import.meta.env;
const clean = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export const company = {
  name: 'FLINTORA',
  displayName: 'Flintora',
  tagline: 'Where Ideas Spark.',
  siteUrl: (clean(env.VITE_SITE_URL) || 'https://flintora.nexverrtech.com').replace(/\/$/, ''),
  summary:
    'FLINTORA is a creative and digital studio. We shape brands, design and build websites and digital products, and run the marketing, content and automation that help them grow.',
  // Long-form description used for structured data and the About page "at a glance" block.
  description:
    'FLINTORA is a creative and digital agency combining brand strategy, design, technology and marketing. The studio works across brand identity, website design and development, UI/UX, digital marketing, search engine optimisation, creative content, photography and video, AI-assisted business automation and digital transformation.',
  brandConcept:
    'The FLINTORA mark is a letter F drawn as a spark: an ignition point that stands for innovation, dynamic energy and forward momentum.',
  contact: {
    email: clean(env.VITE_CONTACT_EMAIL),
    phone: clean(env.VITE_CONTACT_PHONE),
    whatsapp: clean(env.VITE_WHATSAPP_NUMBER).replace(/\D/g, ''),
    enquiryUrl: clean(env.VITE_ENQUIRY_URL),
    /** Web3Forms access key: the contact form emails enquiries to the address registered with it. */
    formKey: clean(env.VITE_WEB3FORMS_KEY),
  },
  /** Local search signals (Google Business Profile and maps). All optional. */
  local: {
    serviceArea: clean(env.VITE_SERVICE_AREA)
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean),
    lat: clean(env.VITE_GEO_LAT),
    lng: clean(env.VITE_GEO_LNG),
    /** schema.org format, e.g. "Mo-Fr 09:30-18:30, Sa 10:00-14:00" */
    openingHours: clean(env.VITE_OPENING_HOURS)
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean),
    googleBusinessUrl: clean(env.VITE_GOOGLE_BUSINESS_URL),
    mapsUrl: clean(env.VITE_GOOGLE_MAPS_URL),
  },
  verification: {
    google: clean(env.VITE_GSC_VERIFICATION),
    bing: clean(env.VITE_BING_VERIFICATION),
  },
  address: {
    street: clean(env.VITE_ADDRESS_STREET),
    city: clean(env.VITE_ADDRESS_CITY),
    region: clean(env.VITE_ADDRESS_REGION),
    postcode: clean(env.VITE_ADDRESS_POSTCODE),
    country: clean(env.VITE_ADDRESS_COUNTRY),
  },
  social: {
    Instagram: clean(env.VITE_SOCIAL_INSTAGRAM),
    LinkedIn: clean(env.VITE_SOCIAL_LINKEDIN),
    Behance: clean(env.VITE_SOCIAL_BEHANCE),
    X: clean(env.VITE_SOCIAL_X),
    YouTube: clean(env.VITE_SOCIAL_YOUTUBE),
  },
  currency: clean(env.VITE_CURRENCY) || 'INR',
  locale: clean(env.VITE_LOCALE) || 'en-IN',
} as const;

export const socialLinks = Object.entries(company.social)
  .filter(([, url]) => Boolean(url))
  .map(([name, url]) => ({ name, url }));

export const hasAddress = Object.values(company.address).some(Boolean);
export const addressLines = [
  company.address.street,
  [company.address.city, company.address.region, company.address.postcode].filter(Boolean).join(', '),
  company.address.country,
].filter(Boolean);

/** True when at least one direct channel for enquiries has been configured. */
export const hasEnquiryChannel = Boolean(
  company.contact.whatsapp || company.contact.email || company.contact.enquiryUrl,
);

export const absoluteUrl = (path = '/') => `${company.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

/** Industries the studio's services are designed for. Describes scope, not past clients. */
export const industries = [
  'Retail and D2C',
  'Fashion and apparel',
  'Food and hospitality',
  'Real estate',
  'Construction',
  'Manufacturing',
  'Education',
  'Healthcare and wellness',
  'Technology and startups',
  'Professional services',
  'Logistics',
  'Non-profits',
];

export const values = [
  {
    title: 'Ideas before effects',
    text: 'A strong idea survives being sketched on a napkin. We find it first, then decide how it should look, move and sound.',
  },
  {
    title: 'Craft you can feel',
    text: 'Spacing, timing, the weight of a word. Details are where quality becomes visible, so we sweat them.',
  },
  {
    title: 'Plain, honest work',
    text: 'Clear proposals, realistic timelines and no inflated promises. If something will not work, we say so early.',
  },
  {
    title: 'Made with people',
    text: 'The best work is built with our clients, not delivered to them. Your knowledge of your business is part of the brief.',
  },
  {
    title: 'Built to last',
    text: 'Identities, sites and systems that your team can run, extend and grow with long after launch.',
  },
  {
    title: 'Curious by default',
    text: 'New tools, new platforms, new ways of telling a story. We test them so you only adopt what genuinely helps.',
  },
];
