// Portfolio data.
//
// kind:
//   'in-house'  Real FLINTORA work for its own brand.
//   'client'    Commissioned client work. Add only with the client's approval.
//   'concept'   Self-initiated concept study for a fictional brand. Always labelled on the site,
//               never presented as commissioned work, and never given results or metrics.
//
// results: only verified, client-approved outcomes. Leave empty otherwise.

export type ProjectCategory =
  | 'Branding'
  | 'Websites'
  | 'UI/UX'
  | 'Marketing'
  | 'Creative Campaigns'
  | 'Photography'
  | 'Technology';

export const projectCategories: ProjectCategory[] = [
  'Branding',
  'Websites',
  'UI/UX',
  'Marketing',
  'Creative Campaigns',
  'Photography',
  'Technology',
];

export type Visual =
  | { type: 'image'; src: string; alt: string; width: number; height: number; caption?: string }
  | { type: 'art'; art: string; alt: string; caption?: string };

export interface CaseSection {
  key: 'background' | 'challenge' | 'research' | 'direction' | 'development' | 'implementation' | 'outcome';
  title: string;
  text: string[];
  visual?: Visual;
}

export interface Project {
  slug: string;
  title: string;
  kind: 'in-house' | 'client' | 'concept';
  client: string;
  industry: string;
  year: string;
  categories: ProjectCategory[];
  services: string[]; // service slugs
  summary: string;
  cover: Visual;
  accent: string;
  sections: CaseSection[];
  gallery: Visual[];
  results: string[];
}

const pdf = (n: number, alt: string, caption?: string): Visual => ({
  type: 'image',
  src: `/images/work/flintora-identity-${n}`,
  alt,
  width: 1600,
  height: 900,
  caption,
});

export const projects: Project[] = [
  {
    slug: 'flintora-brand-identity',
    title: 'FLINTORA Identity',
    kind: 'in-house',
    client: 'FLINTORA (in-house)',
    industry: 'Creative and digital services',
    year: '2026',
    categories: ['Branding'],
    services: ['brand-identity-strategy', 'creative-design-content'],
    summary: 'A spark drawn as the letter F. The identity system behind our own studio.',
    cover: pdf(1, 'FLINTORA brand identity cover: the orange spark F above the wide FLINTORA wordmark on black'),
    accent: '#FF800D',
    sections: [
      {
        key: 'background',
        title: 'Background',
        text: [
          'FLINTORA needed an identity before it had a single client. The brief was simple to say and hard to do: look established from day one, while signalling that the studio is built for what comes next.',
          'The identity had to work on a presentation deck, a digital ad, an ID card and a 32px favicon without losing its character.',
        ],
        visual: pdf(2, 'The brief slide: Igniting digital growth, with three principles: Innovative, Dynamic, Scalable'),
      },
      {
        key: 'challenge',
        title: 'The challenge',
        text: [
          'Creative agencies tend to look alike: a neutral wordmark, a single accent colour and very little meaning. We wanted a mark with an idea inside it, one that could be explained in a sentence and remembered after a glance.',
        ],
      },
      {
        key: 'direction',
        title: 'Creative direction',
        text: [
          'Flint makes fire by striking. The mark turns the letter F into that moment of ignition: two sharp shards, slanted forward, meeting at a single point of energy.',
          'The forward slant signals momentum. The faceted shading, in Primary Spark, Solar Flare and Ember Depth, gives the mark depth without a gradient that would blur at small sizes.',
        ],
        visual: pdf(3, 'The idea slide: The F is a spark, with the mark presented on black'),
      },
      {
        key: 'development',
        title: 'Design development',
        text: [
          'The palette is deliberately narrow: Void Black for authority and depth, and three related oranges for energy, highlight and structure.',
          'Konexy, an extended geometric capital, carries the wordmark and primary headlines. Its wide stance gives the name weight. Sora handles everything else, quietly, so the spark and the colour can lead.',
        ],
        visual: pdf(4, 'Colour palette: Void Black #040404, Primary Spark #FF800D, Solar Flare #FFA912, Ember Depth #FF9810'),
      },
      {
        key: 'implementation',
        title: 'Implementation',
        text: [
          'The mark was produced in primary, reversed and mono versions, and tested on stationery, ID cards and signage before it was signed off.',
          'Clear usage rules protect it: generous clear space, no stretching, no recolouring and no busy backgrounds.',
        ],
        visual: pdf(6, 'Logo versions: primary on dark, reversed on light and mono black'),
      },
      {
        key: 'outcome',
        title: 'Outcome',
        text: [
          'A compact identity system that FLINTORA now uses everywhere, including the website you are reading. The spark appears in the intro animation, the 3D hero, the navigation and the smallest favicon.',
        ],
        visual: pdf(7, 'The identity applied to a business card, an ID badge and a sign'),
      },
    ],
    gallery: [
      pdf(5, 'Typography slide: Konexy for the wordmark, Sora for supporting text'),
      pdf(8, 'Usage slide: clear space and things not to do with the logo'),
    ],
    results: [],
  },
  {
    slug: 'flintora-digital-flagship',
    title: 'FLINTORA Digital Flagship',
    kind: 'in-house',
    client: 'FLINTORA (in-house)',
    industry: 'Creative and digital services',
    year: '2026',
    categories: ['Websites', 'UI/UX', 'Technology'],
    services: ['website-design-development', 'ui-ux-design', 'search-engine-optimization'],
    summary: 'This website. A studio portfolio that behaves like a piece of work, not a brochure.',
    cover: { type: 'art', art: 'flagship', alt: 'Abstract composition of the FLINTORA website: a dark editorial layout with an orange spark' },
    accent: '#FFA912',
    sections: [
      {
        key: 'background',
        title: 'Background',
        text: [
          'A creative studio’s website is its most visible piece of work. Ours had to show the brand idea in motion, explain what we do in plain language, and give visitors useful tools rather than empty promises.',
        ],
      },
      {
        key: 'challenge',
        title: 'The challenge',
        text: [
          'Cinematic motion and 3D usually come at the cost of speed and accessibility. We wanted both: an expressive experience that still loads quickly, works with a keyboard and respects people who prefer reduced motion.',
        ],
      },
      {
        key: 'research',
        title: 'Research',
        text: [
          'We studied editorial magazines, architectural photography and luxury retail sites for their pacing: long pauses, large type and very few colours. The common thread was restraint.',
        ],
      },
      {
        key: 'direction',
        title: 'Creative direction',
        text: [
          'Soft luxury meets human creativity. Mostly black and charcoal, warm paper-coloured pauses, and orange reserved for moments that matter.',
          'The site opens with a short Spark Awakening: two flint fragments strike, sparks swirl and the F forms. It plays once, can be skipped and never blocks navigation.',
        ],
        visual: { type: 'art', art: 'awakening', alt: 'Storyboard of the Spark Awakening intro: fragments, collision, spark and logo reveal' },
      },
      {
        key: 'implementation',
        title: 'Implementation',
        text: [
          'Built with React, TypeScript and Vite, with every page prerendered to static HTML for speed and search engines. Three.js powers the hero and is loaded only after the page is ready.',
          'The planning tools (Brand Transformation Studio, Digital Presence Assessment, Budget Estimator and Creative Brief Builder) run entirely in the browser. No accounts and no hidden data collection.',
        ],
      },
      {
        key: 'outcome',
        title: 'Outcome',
        text: [
          'A flagship that demonstrates the studio’s approach in practice: brand, design, motion, technology and search working as one system.',
        ],
      },
    ],
    gallery: [],
    results: [],
  },
  {
    slug: 'halden-atelier-concept',
    title: 'Halden Atelier',
    kind: 'concept',
    client: 'Concept study, fictional brand',
    industry: 'Architecture and interiors',
    year: '2026',
    categories: ['Websites', 'UI/UX'],
    services: ['website-design-development', 'ui-ux-design'],
    summary: 'How a quiet architecture practice could present its work online: slow, spacious, image-first.',
    cover: { type: 'art', art: 'halden', alt: 'Concept website for a fictional architecture studio with a large warm-lit arch' },
    accent: '#C9A27E',
    sections: [
      {
        key: 'background',
        title: 'Why this study',
        text: [
          'Architecture practices often hide beautiful work inside cluttered portfolio grids. We set ourselves a question: what would a website feel like if it behaved like walking through one of their buildings?',
          'Halden Atelier is a fictional brand created for this study. It is not a client.',
        ],
      },
      {
        key: 'direction',
        title: 'Direction',
        text: [
          'One project per screen. Generous margins. Warm stone and plaster tones instead of pure white. Navigation that recedes until you need it.',
        ],
        visual: { type: 'art', art: 'halden-screens', alt: 'Concept screens for Halden Atelier: project list and project detail on desktop and mobile' },
      },
      {
        key: 'development',
        title: 'Interface thinking',
        text: [
          'Projects are ordered by mood rather than date. Each project page opens with a single image and a short line of text, then reveals plans and details as you scroll.',
        ],
      },
      {
        key: 'outcome',
        title: 'What it shows',
        text: [
          'Restraint is a design decision. The fewer elements on screen, the more each one has to be right.',
        ],
      },
    ],
    gallery: [],
    results: [],
  },
  {
    slug: 'kesar-coast-concept',
    title: 'Kesar Coast',
    kind: 'concept',
    client: 'Concept study, fictional brand',
    industry: 'Food and D2C retail',
    year: '2026',
    categories: ['Branding', 'Creative Campaigns', 'Marketing'],
    services: ['brand-identity-strategy', 'creative-design-content', 'digital-marketing'],
    summary: 'A spice brand built around one colour and one sentence. Identity, packaging and launch campaign.',
    cover: { type: 'art', art: 'kesar', alt: 'Concept identity for a fictional saffron brand: deep red tins with a sun mark' },
    accent: '#E8692E',
    sections: [
      {
        key: 'background',
        title: 'Why this study',
        text: [
          'D2C food brands compete on shelves they will never stand on: a thumbnail on a phone. This study explores how a premium spice brand could stay recognisable at that size.',
          'Kesar Coast is a fictional brand created for this study. It is not a client.',
        ],
      },
      {
        key: 'direction',
        title: 'Direction',
        text: [
          'Saffron is harvested at dawn, so the mark is a rising sun made from saffron threads. One deep colour family, warm paper and a single serif carry the whole system.',
        ],
        visual: { type: 'art', art: 'kesar-system', alt: 'Kesar Coast concept system: logo, colour palette and packaging tins' },
      },
      {
        key: 'implementation',
        title: 'Launch campaign concept',
        text: [
          'A campaign line, “Picked before sunrise”, carried across posters, social and packaging. Each poster pairs a single ingredient with a time of day.',
        ],
        visual: { type: 'art', art: 'kesar-posters', alt: 'Three concept campaign posters for Kesar Coast' },
      },
      {
        key: 'outcome',
        title: 'What it shows',
        text: [
          'A narrow, confident system scales further than a busy one. One colour, one sentence and one idea can carry a brand from tin to timeline.',
        ],
      },
    ],
    gallery: [],
    results: [],
  },
  {
    slug: 'loop-desk-concept',
    title: 'Loop Desk',
    kind: 'concept',
    client: 'Concept study, fictional brand',
    industry: 'Professional services',
    year: '2026',
    categories: ['Technology', 'UI/UX'],
    services: ['ai-business-automation', 'ui-ux-design', 'digital-transformation'],
    summary: 'Mapping and automating the enquiry-to-invoice journey of a small service business.',
    cover: { type: 'art', art: 'loop', alt: 'Concept automation flow: enquiry, qualification, proposal, project and invoice connected by orange lines' },
    accent: '#FFA912',
    sections: [
      {
        key: 'background',
        title: 'Why this study',
        text: [
          'Small service businesses lose time between tools: an enquiry arrives by email, gets copied into a spreadsheet, then into a proposal, then into an invoice. This study maps that journey and shows where automation helps.',
          'Loop Desk is a fictional business created for this study. It is not a client.',
        ],
      },
      {
        key: 'research',
        title: 'Mapping the work',
        text: [
          'We charted each step from first message to final invoice and marked which steps needed human judgement and which were simply copying information from one place to another.',
        ],
        visual: { type: 'art', art: 'loop-flow', alt: 'Workflow map with manual steps in grey and automated steps in orange' },
      },
      {
        key: 'development',
        title: 'The interface',
        text: [
          'A single overview shows every live enquiry and what it is waiting for. Automation handles reminders and data entry, while people approve proposals and talk to clients.',
        ],
        visual: { type: 'art', art: 'loop-dashboard', alt: 'Concept dashboard listing enquiries by stage with next actions' },
      },
      {
        key: 'outcome',
        title: 'What it shows',
        text: [
          'Automation works best when it is invisible and humble: it removes the busywork and leaves the decisions with people.',
        ],
      },
    ],
    gallery: [],
    results: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsForService = (slug: string) => projects.filter((p) => p.services.includes(slug));
