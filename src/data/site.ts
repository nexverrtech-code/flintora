// Single source of truth for business details. Update these before launch.
export const site = {
  name: 'Flintora',
  legalName: 'Flintora',
  tagline: 'Where Ideas Spark',
  description:
    'Flintora is a digital marketing agency turning sharp ideas into measurable growth with SEO, paid ads, social, content, branding and web design.',
  email: 'hello@flintora.com', // TODO: confirm the public inbox
  phone: '', // TODO: add a real number, e.g. '+91 98765 43210'. Empty hides it site-wide.
  whatsapp: '', // TODO: digits only with country code, e.g. '919876543210'. Empty hides the button.
  address: {
    // TODO: fill in for LocalBusiness schema. Empty values are left out.
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
  },
  social: {
    // TODO: add real profile URLs. Empty entries are hidden.
    instagram: '',
    linkedin: '',
    x: '',
    youtube: '',
    facebook: '',
  },
  web3formsKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
  gaId: import.meta.env.PUBLIC_GA_ID ?? '',
  gscVerification: import.meta.env.PUBLIC_GSC_VERIFICATION ?? '',
};

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Playbooks', href: '/playbooks/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];

export const socialLinks = Object.entries(site.social)
  .filter(([, url]) => url)
  .map(([name, url]) => ({ name, url }));
