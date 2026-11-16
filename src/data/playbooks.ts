// Playbooks describe how Flintora approaches common growth situations.
// They are frameworks, not client case studies. When real case studies with
// approved results exist, add them here (or in a new /work section).
export interface Playbook {
  slug: string;
  sector: string;
  title: string; // Konexy safe: letters, digits, periods, commas
  summary: string;
  metaDescription: string;
  situation: string;
  moves: { title: string; text: string }[];
  measures: string[];
  services: string[]; // service slugs
}

export const playbooks: Playbook[] = [
  {
    slug: 'd2c-launch',
    sector: 'D2C and ecommerce',
    title: 'Launch a D2C brand.',
    summary: 'From zero awareness to a repeatable acquisition engine in the first ninety days.',
    metaDescription:
      'The Flintora playbook for launching a D2C brand: positioning, creative testing, paid social, landing pages and retention in the first ninety days.',
    situation:
      'A new product, a small budget and no audience. The risk is spending on ads before the offer, the creative and the store are ready to convert.',
    moves: [
      { title: 'Sharpen the offer', text: 'One clear promise, one hero product and proof that makes the claim believable.' },
      { title: 'Build the conversion path', text: 'A fast product page, clean checkout and tracking that reports revenue correctly.' },
      { title: 'Test creative in volume', text: 'Many hooks and formats on small budgets to find what earns attention.' },
      { title: 'Scale what proves out', text: 'Budget moves to winning creative and audiences, with search capturing the demand that social creates.' },
      { title: 'Turn buyers into repeat buyers', text: 'Email and messaging flows for welcome, post purchase and win back.' },
    ],
    measures: ['Customer acquisition cost', 'Return on ad spend', 'Conversion rate', 'Repeat purchase rate'],
    services: ['performance-marketing', 'social-media-marketing', 'web-design-and-development'],
  },
  {
    slug: 'b2b-lead-engine',
    sector: 'B2B and SaaS',
    title: 'Build a B2B lead engine.',
    summary: 'A steady flow of qualified pipeline from search, content and LinkedIn.',
    metaDescription:
      'The Flintora playbook for B2B lead generation: intent led SEO, expert content, LinkedIn and paid search working together to build qualified pipeline.',
    situation:
      'Long sales cycles, several decision makers and a sales team that needs better leads, not more of them.',
    moves: [
      { title: 'Define the ideal customer', text: 'Clear firmographics, roles and pains, agreed with sales.' },
      { title: 'Own high intent search', text: 'Pages for the problems, comparisons and categories buyers search before they shortlist.' },
      { title: 'Publish real expertise', text: 'Content built with your subject experts that earns trust early.' },
      { title: 'Activate LinkedIn', text: 'Founder and company content, plus paid campaigns to named account lists.' },
      { title: 'Close the loop with sales', text: 'CRM integrated tracking so marketing is judged on pipeline and revenue.' },
    ],
    measures: ['Marketing qualified leads', 'Sales accepted leads', 'Pipeline value', 'Cost per opportunity'],
    services: ['seo', 'content-marketing', 'performance-marketing'],
  },
  {
    slug: 'local-domination',
    sector: 'Local and multi location',
    title: 'Win your local market.',
    summary: 'Be the first name people see and the easiest one to call, in every area you serve.',
    metaDescription:
      'The Flintora playbook for local businesses: Google Business Profile, local SEO, reviews and call focused ads to win your service area.',
    situation:
      'Customers are searching nearby right now. The businesses that appear in the map pack and look trustworthy get the call.',
    moves: [
      { title: 'Fix the foundations', text: 'Accurate profiles, consistent listings and location pages that deserve to rank.' },
      { title: 'Earn reviews', text: 'A simple system that asks every happy customer and replies to every review.' },
      { title: 'Capture urgent demand', text: 'Local search and call ads, scheduled around when people actually book.' },
      { title: 'Show the work', text: 'Photos, short videos and local stories on social.' },
      { title: 'Track calls and bookings', text: 'Call tracking and booking attribution, so spend follows results.' },
    ],
    measures: ['Map pack visibility', 'Calls and direction requests', 'Bookings', 'Review volume and rating'],
    services: ['seo', 'performance-marketing', 'social-media-marketing'],
  },
  {
    slug: 'brand-relaunch',
    sector: 'Established brands',
    title: 'Relaunch a tired brand.',
    summary: 'A sharper story, a modern identity and a website that reflects where the business is going.',
    metaDescription:
      'The Flintora playbook for relaunching an established brand: strategy, identity, website and a launch campaign that brings customers along.',
    situation:
      'The business has moved on, but the brand and website still describe who you were five years ago.',
    moves: [
      { title: 'Find the truth', text: 'Customer and team interviews to learn what the brand really stands for.' },
      { title: 'Reposition', text: 'A clear statement of who you serve, what you do and why it matters.' },
      { title: 'Redesign', text: 'An identity system that keeps your equity and modernises everything else.' },
      { title: 'Rebuild the site', text: 'New structure, new content and a careful SEO migration.' },
      { title: 'Launch with a campaign', text: 'A coordinated rollout across owned, earned and paid channels.' },
    ],
    measures: ['Brand search volume', 'Direct traffic', 'Enquiry quality', 'Share of voice'],
    services: ['branding-and-creative', 'web-design-and-development', 'content-marketing'],
  },
];
