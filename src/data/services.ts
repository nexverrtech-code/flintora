export interface Service {
  slug: string;
  name: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  headline: string; // Konexy: letters, digits, periods and commas only
  intro: string;
  outcomes: string[];
  includes: { title: string; text: string }[];
  process: { title: string; text: string }[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: 'seo',
    name: 'Search Engine Optimisation',
    short: 'Technical, content and authority work that earns durable rankings and qualified organic traffic.',
    metaTitle: 'SEO Services',
    metaDescription:
      'Technical SEO, content strategy and authority building from Flintora. Earn durable rankings and qualified organic traffic that converts.',
    headline: 'Be found first.',
    intro:
      'Search is where intent lives. We fix what holds your site back, build the content your buyers are looking for, and earn the authority that keeps you on page one.',
    outcomes: [
      'More qualified organic traffic, not just more traffic',
      'Rankings for the terms that drive revenue',
      'A faster, cleaner site that search engines can crawl',
      'Content that keeps compounding month after month',
    ],
    includes: [
      { title: 'Technical SEO', text: 'Crawlability, indexation, Core Web Vitals, site architecture and structured data, audited and fixed.' },
      { title: 'Keyword and intent research', text: 'We map what your buyers search for at every stage and cluster it into pages worth building.' },
      { title: 'On page optimisation', text: 'Titles, headings, copy, internal links and schema tuned page by page.' },
      { title: 'Content strategy', text: 'Topic clusters and briefs that build topical authority instead of one off posts.' },
      { title: 'Authority building', text: 'Digital PR and earned links from relevant publications. No link farms.' },
      { title: 'Local SEO', text: 'Google Business Profile, citations and location pages for brands that serve a region.' },
    ],
    process: [
      { title: 'Audit', text: 'A full technical, content and competitor audit that shows where the growth is.' },
      { title: 'Roadmap', text: 'Priorities ranked by impact and effort, agreed with your team.' },
      { title: 'Build', text: 'Fixes shipped, pages written, links earned, every month.' },
      { title: 'Measure', text: 'Rankings, traffic and revenue reported against the goals we set together.' },
    ],
    deliverables: ['Technical audit and fix list', 'Keyword map and content plan', 'Monthly optimised content', 'Link acquisition report', 'Live performance dashboard'],
    faqs: [
      { q: 'How long does SEO take to show results?', a: 'Technical fixes can move the needle within weeks. Competitive rankings usually take three to six months of consistent work, and the gains compound after that.' },
      { q: 'Do you guarantee number one rankings?', a: 'No. Nobody can honestly guarantee a position on Google. We commit to a clear plan, transparent reporting and steady progress on the metrics that matter to your business.' },
      { q: 'Will you work with our existing website?', a: 'Yes. We work with most platforms, including WordPress, Shopify, Webflow and custom builds, and we can brief your developers or ship changes ourselves.' },
    ],
  },
  {
    slug: 'performance-marketing',
    name: 'Performance Marketing',
    short: 'Paid search and paid social managed against revenue, with creative and landing pages built to convert.',
    metaTitle: 'Performance Marketing and Paid Ads',
    metaDescription:
      'Google Ads, Meta Ads and paid social managed against revenue. Flintora builds, tests and scales campaigns with full funnel tracking.',
    headline: 'Spend with intent.',
    intro:
      'Every rupee, dollar or dirham should have a job. We plan, launch and optimise paid campaigns around the numbers that matter: cost per acquisition, return on ad spend and lifetime value.',
    outcomes: [
      'Lower cost per lead or sale',
      'Budgets moved toward what is working, weekly',
      'Creative tested with a clear method',
      'Tracking you can trust from click to revenue',
    ],
    includes: [
      { title: 'Paid search', text: 'Google and Microsoft search, shopping and Performance Max structured for control and scale.' },
      { title: 'Paid social', text: 'Meta, LinkedIn, YouTube and TikTok campaigns matched to audience and stage.' },
      { title: 'Creative testing', text: 'Hooks, formats and offers tested in a structured way so winners are obvious.' },
      { title: 'Landing pages', text: 'Fast, focused pages designed around one action.' },
      { title: 'Tracking and attribution', text: 'GA4, server side tagging and conversion APIs set up properly.' },
      { title: 'Remarketing', text: 'Sequenced messaging that brings warm audiences back to finish what they started.' },
    ],
    process: [
      { title: 'Baseline', text: 'We audit accounts, tracking and unit economics to set realistic targets.' },
      { title: 'Structure', text: 'Campaigns rebuilt around intent, audience and margin.' },
      { title: 'Test', text: 'Creative, audience and offer tests run every cycle.' },
      { title: 'Scale', text: 'Budget follows proof. Winners get more, the rest gets cut.' },
    ],
    deliverables: ['Account audit', 'Media plan and forecast', 'Ad creative and copy', 'Conversion tracking setup', 'Weekly optimisation log', 'Monthly performance review'],
    faqs: [
      { q: 'What budget do we need to start?', a: 'It depends on your market and goals. We will tell you honestly whether your budget can reach statistical significance, and suggest a smaller, sharper test if it cannot.' },
      { q: 'Do we keep ownership of the ad accounts?', a: 'Always. Campaigns run in accounts you own, so your data and history stay with you.' },
      { q: 'How do you report results?', a: 'You get a live dashboard and a monthly review that ties spend to leads, sales and revenue, not just clicks.' },
    ],
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    short: 'Strategy, content and community management that builds an audience people actually want to be part of.',
    metaTitle: 'Social Media Marketing',
    metaDescription:
      'Social media strategy, content production and community management from Flintora. Build an engaged audience on the platforms your buyers use.',
    headline: 'Earn the scroll stop.',
    intro:
      'Social is where brands are judged in seconds. We give yours a clear voice, a consistent look and content made for how each platform really works.',
    outcomes: [
      'A consistent, recognisable presence',
      'Content designed for reach and saves',
      'A community that replies, shares and buys',
      'Clear reporting on what content earns',
    ],
    includes: [
      { title: 'Platform strategy', text: 'Where to show up, how often and with what, based on your audience.' },
      { title: 'Content calendars', text: 'A month of planned, approved content, built around content pillars.' },
      { title: 'Short form video', text: 'Reels, Shorts and TikToks scripted, shot and edited for retention.' },
      { title: 'Design and copy', text: 'Carousels, statics and captions in your brand voice.' },
      { title: 'Community management', text: 'Comments and messages answered quickly and in character.' },
      { title: 'Creator partnerships', text: 'Creators selected for fit and audience quality, not follower counts.' },
    ],
    process: [
      { title: 'Listen', text: 'Audience, competitor and content audit.' },
      { title: 'Plan', text: 'Pillars, formats and a calendar you sign off.' },
      { title: 'Create', text: 'Content produced in batches and scheduled.' },
      { title: 'Learn', text: 'Monthly review of what earned attention and why.' },
    ],
    deliverables: ['Social strategy document', 'Monthly content calendar', 'Designed posts and edited video', 'Community management', 'Monthly insight report'],
    faqs: [
      { q: 'Which platforms should we be on?', a: 'Only the ones your buyers use. We would rather run two channels well than five badly.' },
      { q: 'Do you create the content or do we?', a: 'Either. We can run full production, or direct and edit footage your team captures.' },
      { q: 'Can social media drive sales directly?', a: 'Yes, especially paired with paid social and a strong landing page. We track that path and report on it.' },
    ],
  },
  {
    slug: 'content-marketing',
    name: 'Content Marketing',
    short: 'Articles, video scripts, email and lead magnets that answer real questions and move buyers forward.',
    metaTitle: 'Content Marketing',
    metaDescription:
      'Content strategy, SEO articles, email and lead magnets from Flintora. Useful content that attracts, educates and converts your audience.',
    headline: 'Say something useful.',
    intro:
      'Good content does the selling before the sales call. We plan and produce work that answers the questions your buyers are already asking.',
    outcomes: [
      'A content engine that runs every month',
      'Pages that rank and convert',
      'Email sequences that nurture leads',
      'One idea reused across every channel',
    ],
    includes: [
      { title: 'Content strategy', text: 'Audience research, topic clusters and an editorial calendar.' },
      { title: 'Long form articles', text: 'Researched, expert reviewed pieces written for people first.' },
      { title: 'Email marketing', text: 'Newsletters, welcome flows and lifecycle automation.' },
      { title: 'Lead magnets', text: 'Guides, templates and tools worth trading an email for.' },
      { title: 'Video and scripts', text: 'Scripts and storyboards for explainers and social.' },
      { title: 'Content refresh', text: 'Existing pages updated and consolidated to win back rankings.' },
    ],
    process: [
      { title: 'Research', text: 'Customer interviews, search data and competitor gaps.' },
      { title: 'Plan', text: 'A quarter of topics tied to funnel stages.' },
      { title: 'Produce', text: 'Briefed, written, edited and designed.' },
      { title: 'Distribute', text: 'Published, repurposed and promoted.' },
    ],
    deliverables: ['Editorial calendar', 'Content briefs', 'Published articles', 'Email flows', 'Repurposed social assets'],
    faqs: [
      { q: 'Who writes the content?', a: 'Writers with subject experience, guided by a strategist and reviewed by an editor. Your experts stay in the loop for accuracy.' },
      { q: 'How much content do we need?', a: 'Enough to cover your key topics properly. For most brands that is four to eight strong pieces a month rather than daily filler.' },
      { q: 'Do you use AI to write?', a: 'We use AI for research and outlining. Final copy is written and edited by people who are accountable for it.' },
    ],
  },
  {
    slug: 'branding-and-creative',
    name: 'Branding and Creative',
    short: 'Identity, messaging and campaign creative that make your brand unmistakable wherever it appears.',
    metaTitle: 'Branding and Creative Design',
    metaDescription:
      'Brand strategy, visual identity, messaging and campaign creative from Flintora. Build a brand people recognise and remember.',
    headline: 'Look like the leader.',
    intro:
      'A brand is a promise people can recognise at a glance. We shape the strategy, the identity and the creative that make yours clear and consistent.',
    outcomes: [
      'A positioning your team can repeat',
      'An identity that scales to every surface',
      'Guidelines that keep work consistent',
      'Campaign creative with a clear idea',
    ],
    includes: [
      { title: 'Brand strategy', text: 'Positioning, audience and a message hierarchy.' },
      { title: 'Visual identity', text: 'Logo, colour, type and a flexible design system.' },
      { title: 'Brand guidelines', text: 'Clear rules and templates your team can use.' },
      { title: 'Campaign creative', text: 'Concepts, key visuals and ad sets.' },
      { title: 'Motion and video', text: 'Logo animation, explainers and social edits.' },
      { title: 'Sales collateral', text: 'Decks, brochures and one pagers.' },
    ],
    process: [
      { title: 'Discover', text: 'Workshops, interviews and market review.' },
      { title: 'Define', text: 'Positioning and creative direction.' },
      { title: 'Design', text: 'Identity explored, refined and tested.' },
      { title: 'Deliver', text: 'Guidelines, files and rollout support.' },
    ],
    deliverables: ['Brand strategy deck', 'Logo suite', 'Colour and type system', 'Brand guidelines', 'Template library'],
    faqs: [
      { q: 'Can you refresh an existing brand?', a: 'Yes. Many projects are evolutions that keep the equity you have built and sharpen everything around it.' },
      { q: 'How long does a brand project take?', a: 'A focused identity project usually runs six to ten weeks, depending on the number of stakeholders and deliverables.' },
      { q: 'Do we own the final files?', a: 'Yes. On completion you receive full ownership and all source files.' },
    ],
  },
  {
    slug: 'web-design-and-development',
    name: 'Web Design and Development',
    short: 'Fast, search ready websites and landing pages designed to turn visitors into customers.',
    metaTitle: 'Web Design and Development',
    metaDescription:
      'Fast, SEO ready websites, ecommerce stores and landing pages from Flintora. Designed for conversion and built for performance.',
    headline: 'Build to convert.',
    intro:
      'Your website is the one channel you fully own. We design and build sites that load fast, rank well and make the next step obvious.',
    outcomes: [
      'A site that loads in a blink',
      'Clear journeys from landing to enquiry',
      'A CMS your team can run alone',
      'A technical base ready for SEO',
    ],
    includes: [
      { title: 'UX and UI design', text: 'Wireframes, prototypes and a design system.' },
      { title: 'Website development', text: 'Modern, accessible, responsive builds.' },
      { title: 'Ecommerce', text: 'Shopify and custom stores tuned for conversion.' },
      { title: 'Landing pages', text: 'Campaign pages built to test and iterate.' },
      { title: 'Conversion optimisation', text: 'Analytics, heatmaps and A/B tests.' },
      { title: 'Care plans', text: 'Hosting, updates, monitoring and support.' },
    ],
    process: [
      { title: 'Scope', text: 'Goals, sitemap and content plan.' },
      { title: 'Design', text: 'From wireframe to approved prototype.' },
      { title: 'Build', text: 'Developed, tested and optimised.' },
      { title: 'Launch', text: 'Migrated, measured and improved.' },
    ],
    deliverables: ['Sitemap and wireframes', 'UI design system', 'Developed website', 'Analytics setup', 'Training and handover'],
    faqs: [
      { q: 'Which platforms do you build on?', a: 'We choose based on your needs. That may be WordPress, Shopify, Webflow or a modern framework such as Astro or Next.js.' },
      { q: 'Will our rankings survive a redesign?', a: 'We plan migrations carefully, with redirects, content parity and monitoring, so you keep the equity you have earned.' },
      { q: 'Can we update the site ourselves?', a: 'Yes. Every build includes a content management setup and training.' },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
