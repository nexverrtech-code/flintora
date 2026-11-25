import type { ProjectCategory } from './projects';

export type ServiceLayout = 'split' | 'fullbleed' | 'index' | 'stacked';
export type ServiceArt =
  | 'identity'
  | 'web'
  | 'interface'
  | 'growth'
  | 'search'
  | 'content'
  | 'lens'
  | 'automation'
  | 'transform';

export interface Service {
  slug: string;
  n: string;
  name: string;
  short: string;
  /** Display headline. Konexy-only text; ' ? - : are drawn by the Display component. */
  headline: string[];
  metaTitle: string;
  metaDescription: string;
  intro: string;
  problems: string[];
  approach: { title: string; text: string }[];
  deliverables: string[];
  method: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  categories: ProjectCategory[];
  layout: ServiceLayout;
  art: ServiceArt;
  keywords: string[];
}

export const services: Service[] = [
  {
    slug: 'brand-identity-strategy',
    n: '01',
    name: 'Brand Identity & Strategy',
    short: 'Positioning, naming, visual identity and the guidelines that keep a brand consistent everywhere it appears.',
    headline: ['Brands people', 'recognise.'],
    metaTitle: 'Brand Identity & Strategy',
    metaDescription:
      'Brand strategy, positioning, logo and visual identity design by FLINTORA. Identity systems with clear guidelines that work from a pitch deck to a 32px favicon.',
    intro:
      'A brand is the feeling people carry away after every encounter with you. We help you decide what that feeling should be, then design an identity that delivers it with the same clarity on a storefront, a slide or a phone screen.',
    problems: [
      'Your business has grown, but the brand still describes who you were at the start.',
      'Every new piece of material looks slightly different, because there are no real rules.',
      'You struggle to explain in one sentence why a customer should choose you.',
      'You are launching something new and need it to look established from day one.',
    ],
    approach: [
      { title: 'Strategy first', text: 'Workshops and interviews to agree on audience, positioning, personality and the promise the brand must keep.' },
      { title: 'One clear idea', text: 'Every identity we design grows from a single concept, the way the FLINTORA F grows from the idea of a spark.' },
      { title: 'Systems, not just logos', text: 'Colour, type, layout, imagery and motion designed together so the identity stays recognisable at any size.' },
      { title: 'Tested in the real world', text: 'We apply the identity to real touchpoints before it is final, from business cards to social posts and signage.' },
    ],
    deliverables: [
      'Brand strategy and positioning document',
      'Naming and tagline exploration (when needed)',
      'Logo suite: primary, reversed, mono and symbol',
      'Colour, typography and graphic language',
      'Brand guidelines with usage rules',
      'Stationery and core templates',
    ],
    method: [
      { title: 'Discover', text: 'Stakeholder interviews, market and competitor review, audit of existing material.' },
      { title: 'Define', text: 'Positioning, personality and creative direction agreed in writing.' },
      { title: 'Design', text: 'Identity routes explored, one refined in detail and tested on real applications.' },
      { title: 'Deliver', text: 'Guidelines, master files and a handover session for your team.' },
    ],
    faqs: [
      { q: 'How long does a brand identity project take?', a: 'A focused identity usually takes six to ten weeks, depending on the number of decision makers and the size of the application set.' },
      { q: 'Can you refresh our brand rather than replace it?', a: 'Yes. Many projects are evolutions that keep the recognition you have built and modernise everything around it.' },
      { q: 'Do we receive the source files?', a: 'Yes. On completion you receive the master logo files, guidelines and editable templates, along with full usage rights.' },
    ],
    categories: ['Branding'],
    layout: 'split',
    art: 'identity',
    keywords: ['brand identity design', 'logo design', 'brand strategy', 'brand guidelines'],
  },
  {
    slug: 'website-design-development',
    n: '02',
    name: 'Website Design & Development',
    short: 'Fast, accessible, search-ready websites designed around your story and built to convert.',
    headline: ['Websites with', 'presence.'],
    metaTitle: 'Website Design & Development',
    metaDescription:
      'Custom website design and development by FLINTORA. Fast, accessible, SEO-ready websites and landing pages with bespoke art direction and motion.',
    intro:
      'Your website is often the first proof that you are as good as you say. We design and build sites that load quickly, read beautifully and make the next step obvious, without falling back on templates that look like everyone else.',
    problems: [
      'Your site looks dated and no longer reflects the quality of your work.',
      'It is slow, hard to update or breaks on phones.',
      'Visitors arrive but rarely enquire, buy or book.',
      'You are not sure whether to rebuild, redesign or simply fix what you have.',
    ],
    approach: [
      { title: 'Story before screens', text: 'We plan what each page must say and do before a single layout is drawn.' },
      { title: 'Bespoke art direction', text: 'Typography, imagery and motion shaped around your brand, not borrowed from a theme.' },
      { title: 'Performance as a feature', text: 'Modern frameworks, optimised images and careful code so pages feel instant.' },
      { title: 'Built to be found', text: 'Clean structure, metadata and structured data from the first build.' },
    ],
    deliverables: [
      'Sitemap, content plan and wireframes',
      'Visual design for desktop and mobile',
      'Front-end development with motion and interactions',
      'CMS or content workflow where needed',
      'Technical SEO and analytics setup',
      'Launch, handover and training',
    ],
    method: [
      { title: 'Scope', text: 'Goals, audiences, page list and the actions each page should drive.' },
      { title: 'Design', text: 'Wireframes, then high-fidelity design and a clickable prototype.' },
      { title: 'Build', text: 'Development, content population and testing across devices and browsers.' },
      { title: 'Launch', text: 'Redirects, performance checks, analytics and a calm go-live.' },
    ],
    faqs: [
      { q: 'Which platforms do you build on?', a: 'We choose per project. That may be a modern framework such as React, a headless CMS, Shopify or WordPress. We will explain the trade-offs before you decide.' },
      { q: 'Will a redesign hurt our search rankings?', a: 'Not if it is planned properly. We map existing URLs, set up redirects and keep the content that already performs.' },
      { q: 'Can our team update the site after launch?', a: 'Yes. We set up the editing workflow that suits your team and walk you through it.' },
    ],
    categories: ['Websites', 'Technology'],
    layout: 'fullbleed',
    art: 'web',
    keywords: ['website design', 'web development', 'custom website', 'landing page design'],
  },
  {
    slug: 'ui-ux-design',
    n: '03',
    name: 'UI/UX Design',
    short: 'Research-led interface and experience design for apps, platforms and digital products.',
    headline: ['Interfaces that', 'feel obvious.'],
    metaTitle: 'UI/UX Design',
    metaDescription:
      'UI and UX design by FLINTORA: user research, information architecture, prototypes and design systems for web apps, mobile apps and digital products.',
    intro:
      'Good interfaces disappear. People simply get what they came for. We study how your users think, then design flows, screens and systems that make complex tasks feel natural.',
    problems: [
      'Users drop off at the same steps and you do not know why.',
      'Your product has grown feature by feature and now feels inconsistent.',
      'Developers keep rebuilding the same components in slightly different ways.',
      'You need to validate an idea before committing to full development.',
    ],
    approach: [
      { title: 'Understand the user', text: 'Interviews, analytics review and usability testing to find where people struggle.' },
      { title: 'Structure first', text: 'Information architecture and user flows agreed before visual design begins.' },
      { title: 'Prototype early', text: 'Clickable prototypes that let you test ideas with real people, quickly and cheaply.' },
      { title: 'Design systems', text: 'Reusable components, tokens and documentation that keep the product consistent as it grows.' },
    ],
    deliverables: [
      'Research findings and user journey maps',
      'Information architecture and flows',
      'Wireframes and interactive prototypes',
      'High-fidelity UI for all key screens',
      'Component library and design system',
      'Developer handover specification',
    ],
    method: [
      { title: 'Research', text: 'Understand users, their goals and the current experience.' },
      { title: 'Map', text: 'Define flows, structure and priorities.' },
      { title: 'Prototype', text: 'Build, test and iterate on the riskiest ideas first.' },
      { title: 'Systemise', text: 'Final UI and a design system ready for development.' },
    ],
    faqs: [
      { q: 'Do you do usability testing?', a: 'Yes. Even five well-chosen participants reveal most usability problems, and we fold testing into every phase.' },
      { q: 'Can you work with our development team?', a: 'Yes. We hand over in the tools your developers already use and stay available during build.' },
      { q: 'Do you design mobile apps?', a: 'Yes, for iOS and Android, following each platform’s conventions where they help users.' },
    ],
    categories: ['UI/UX', 'Technology'],
    layout: 'index',
    art: 'interface',
    keywords: ['UI design', 'UX design', 'product design', 'design system', 'app design'],
  },
  {
    slug: 'digital-marketing',
    n: '04',
    name: 'Digital Marketing',
    short: 'Campaigns across search, social and email, planned around clear goals and measured honestly.',
    headline: ['Momentum you', 'can measure.'],
    metaTitle: 'Digital Marketing',
    metaDescription:
      'Digital marketing by FLINTORA: campaign strategy, paid search, paid social, email and analytics, planned around clear business goals and reported honestly.',
    intro:
      'Marketing works when every channel pulls in the same direction. We plan campaigns around one goal, connect the creative and the media, and report what actually happened, good or bad.',
    problems: [
      'You are spending on ads but cannot tell what is working.',
      'Each channel is run separately, with different messages and no shared plan.',
      'Your campaigns look generic next to competitors.',
      'You have traffic but very few enquiries or sales.',
    ],
    approach: [
      { title: 'Goals before channels', text: 'We agree what success means and how it will be measured before any money is spent.' },
      { title: 'Creative that earns attention', text: 'Campaign ideas and assets designed for each platform, in your brand’s voice.' },
      { title: 'Disciplined testing', text: 'Structured tests on audiences, messages and offers, so decisions come from evidence.' },
      { title: 'Honest reporting', text: 'Reports tied to leads, sales and costs, not vanity metrics.' },
    ],
    deliverables: [
      'Marketing strategy and channel plan',
      'Campaign concepts and ad creative',
      'Paid search and paid social management',
      'Email and lifecycle campaigns',
      'Analytics and conversion tracking setup',
      'Monthly performance reviews',
    ],
    method: [
      { title: 'Audit', text: 'Review of channels, tracking, audience and competitors.' },
      { title: 'Plan', text: 'Goals, budget split, messages and calendar.' },
      { title: 'Launch', text: 'Creative produced, campaigns set live with tracking in place.' },
      { title: 'Optimise', text: 'Weekly adjustments and monthly reviews of what to scale or stop.' },
    ],
    faqs: [
      { q: 'Do you guarantee results?', a: 'No honest agency can guarantee outcomes from advertising. We commit to a clear plan, careful execution and transparent reporting.' },
      { q: 'Do we keep ownership of our ad accounts?', a: 'Always. Campaigns run in accounts you own, so your data stays with your business.' },
      { q: 'What budget do we need?', a: 'It depends on your market and goals. We will tell you if a budget is too small to learn anything useful and suggest a sharper starting test.' },
    ],
    categories: ['Marketing', 'Creative Campaigns'],
    layout: 'stacked',
    art: 'growth',
    keywords: ['digital marketing agency', 'performance marketing', 'social media ads', 'Google Ads'],
  },
  {
    slug: 'search-engine-optimization',
    n: '05',
    name: 'Search Engine Optimization',
    short: 'Technical, content and local SEO that helps the right people find you when they are actively looking.',
    headline: ['Found by the', 'right people.'],
    metaTitle: 'Search Engine Optimization (SEO)',
    metaDescription:
      'SEO services by FLINTORA: technical SEO, content strategy, on-page optimisation and local search to help the right customers find your business.',
    intro:
      'Search is where intent lives. People typing a question are already halfway to a decision. We make sure your site is technically sound, genuinely useful and clearly understood by search engines.',
    problems: [
      'Competitors appear for the searches that matter to you.',
      'Your site has technical issues you cannot see but search engines can.',
      'You publish content, but it rarely brings in visitors.',
      'Local customers cannot find you on maps or in nearby searches.',
    ],
    approach: [
      { title: 'Technical foundation', text: 'Crawlability, indexation, speed, structured data and site architecture, audited and fixed.' },
      { title: 'Search intent', text: 'Keyword research grouped by what people actually want, mapped to the right pages.' },
      { title: 'Useful content', text: 'Pages and articles written to answer real questions better than anyone else.' },
      { title: 'Local visibility', text: 'Business profiles, consistent listings and location content for regional search.' },
    ],
    deliverables: [
      'Technical SEO audit and fix plan',
      'Keyword and topic research',
      'On-page optimisation',
      'Content briefs and writing',
      'Local SEO setup',
      'Monthly search performance reporting',
    ],
    method: [
      { title: 'Audit', text: 'Technical, content and competitor review.' },
      { title: 'Prioritise', text: 'A ranked list of fixes and opportunities by impact and effort.' },
      { title: 'Improve', text: 'Fixes shipped, pages optimised, content published.' },
      { title: 'Track', text: 'Rankings, traffic and enquiries monitored and reported.' },
    ],
    faqs: [
      { q: 'How long does SEO take?', a: 'Technical fixes can help within weeks. Competitive rankings usually take several months of consistent work.' },
      { q: 'Can you guarantee first-page rankings?', a: 'No. Search engines decide rankings, and anyone guaranteeing positions is overpromising. We focus on the work that earns visibility.' },
      { q: 'Does SEO help with AI search tools?', a: 'Clear, well-structured, accurate content helps both search engines and AI assistants understand your business. Nobody can guarantee how AI tools will present it.' },
    ],
    categories: ['Marketing', 'Websites'],
    layout: 'split',
    art: 'search',
    keywords: ['SEO services', 'technical SEO', 'local SEO', 'SEO agency'],
  },
  {
    slug: 'creative-design-content',
    n: '06',
    name: 'Creative Design & Content',
    short: 'Campaign visuals, social content, editorial design and writing with a recognisable point of view.',
    headline: ['Content with a', 'point of view.'],
    metaTitle: 'Creative Design & Content',
    metaDescription:
      'Creative design and content by FLINTORA: social media content, campaign visuals, editorial and print design, copywriting and content strategy.',
    intro:
      'Attention is earned in a second and lost just as fast. We create design and content with a distinct point of view, so people stop, understand and remember who it came from.',
    problems: [
      'Your social channels feel busy but forgettable.',
      'Design is produced in a rush, so quality varies from post to post.',
      'You have plenty to say but struggle to say it well.',
      'Brochures, decks and presentations no longer match your brand.',
    ],
    approach: [
      { title: 'Content pillars', text: 'A small set of themes that give every piece a reason to exist.' },
      { title: 'Platform-native', text: 'Formats, pacing and copy shaped for how each channel is actually used.' },
      { title: 'Editorial craft', text: 'Typography and layout that make long-form material a pleasure to read.' },
      { title: 'Words that work', text: 'Copywriting in your brand voice, from headlines to captions.' },
    ],
    deliverables: [
      'Content strategy and pillars',
      'Social media design and calendars',
      'Campaign key visuals and assets',
      'Presentations, brochures and print',
      'Copywriting and editing',
      'Template systems for your team',
    ],
    method: [
      { title: 'Listen', text: 'Audience, competitors and existing content reviewed.' },
      { title: 'Plan', text: 'Pillars, formats and a production calendar.' },
      { title: 'Create', text: 'Design and copy produced in reviewable batches.' },
      { title: 'Refine', text: 'Monthly review of what resonates and what to change.' },
    ],
    faqs: [
      { q: 'Do you write the copy as well as design?', a: 'Yes. Design and words are developed together so they support each other.' },
      { q: 'Can you produce content on a monthly basis?', a: 'Yes. Many clients work with us on an ongoing content calendar.' },
      { q: 'Do you use AI-generated imagery?', a: 'Only where it is appropriate and clearly agreed with you. We never pass generated material off as real photography.' },
    ],
    categories: ['Creative Campaigns', 'Branding', 'Marketing'],
    layout: 'fullbleed',
    art: 'content',
    keywords: ['content creation', 'social media design', 'graphic design', 'copywriting'],
  },
  {
    slug: 'photography-videography',
    n: '07',
    name: 'Photography & Videography',
    short: 'Art-directed photography and film for products, places, people and brand stories.',
    headline: ['Light, frame,', 'story.'],
    metaTitle: 'Photography & Videography',
    metaDescription:
      'Art-directed photography and video production by FLINTORA: product, brand, interior and people photography, brand films and social video.',
    intro:
      'Real images build trust that stock photography never will. We plan, direct and produce photography and video that shows your work, your spaces and your people at their best.',
    problems: [
      'Your website and social channels rely on stock imagery.',
      'Product photos are inconsistent across your catalogue.',
      'You need video content but do not know where to start.',
      'Your imagery does not match the quality of what you offer.',
    ],
    approach: [
      { title: 'Planned like a campaign', text: 'Shot lists, mood boards and schedules agreed before the shoot.' },
      { title: 'Art direction', text: 'Light, styling and composition that match your brand identity.' },
      { title: 'Made for every format', text: 'We frame for web banners, vertical social and print in the same shoot.' },
      { title: 'Careful post-production', text: 'Retouching and grading that look polished without looking fake.' },
    ],
    deliverables: [
      'Creative direction and shot lists',
      'Product and still-life photography',
      'Brand, team and interior photography',
      'Brand films and short social video',
      'Editing, colour grading and retouching',
      'Delivered in web, social and print formats',
    ],
    method: [
      { title: 'Plan', text: 'Objectives, references, locations and shot lists.' },
      { title: 'Prepare', text: 'Styling, props, talent and logistics organised.' },
      { title: 'Shoot', text: 'Directed production on location or in studio.' },
      { title: 'Finish', text: 'Selection, retouching, grading and delivery.' },
    ],
    faqs: [
      { q: 'Do you shoot on location?', a: 'Yes. We shoot at your premises, on location or in a hired studio depending on the brief.' },
      { q: 'Who owns the photographs?', a: 'Usage rights are agreed in writing before the shoot so you know exactly how you can use the images.' },
      { q: 'Can you produce vertical video for social?', a: 'Yes. We plan shoots so the same session delivers horizontal and vertical formats.' },
    ],
    categories: ['Photography', 'Creative Campaigns'],
    layout: 'stacked',
    art: 'lens',
    keywords: ['product photography', 'brand photography', 'video production', 'brand film'],
  },
  {
    slug: 'ai-business-automation',
    n: '08',
    name: 'AI & Business Automation',
    short: 'Practical automation of repetitive work, with AI tools used only where they genuinely help.',
    headline: ['Less busywork.', 'More thinking.'],
    metaTitle: 'AI & Business Automation',
    metaDescription:
      'Practical AI and business automation by FLINTORA: workflow automation, tool integration and responsible use of AI to remove repetitive work.',
    intro:
      'Most teams lose hours every week to copying, chasing and re-typing. We map those workflows, automate the repetitive parts and introduce AI tools carefully, with people kept in charge of the decisions that matter.',
    problems: [
      'Your team spends hours on manual data entry and follow-ups.',
      'Tools do not talk to each other, so information gets lost.',
      'You are curious about AI but unsure what is useful and what is hype.',
      'Leads and enquiries slip through the cracks.',
    ],
    approach: [
      { title: 'Map the workflow', text: 'We document how work really flows today before changing anything.' },
      { title: 'Automate the obvious', text: 'Start with repetitive, rules-based tasks where automation is low risk.' },
      { title: 'AI with guardrails', text: 'AI tools introduced for specific jobs, with human review and clear data handling.' },
      { title: 'Train the team', text: 'Documentation and training so your people trust and own the new process.' },
    ],
    deliverables: [
      'Workflow audit and automation roadmap',
      'Tool integrations and automated workflows',
      'Lead capture and follow-up automation',
      'AI-assisted content and operations workflows',
      'Data handling and access guidelines',
      'Team documentation and training',
    ],
    method: [
      { title: 'Observe', text: 'Shadow the work, measure where time goes.' },
      { title: 'Prioritise', text: 'Rank opportunities by time saved and risk.' },
      { title: 'Build', text: 'Automations built, tested and documented.' },
      { title: 'Adopt', text: 'Rolled out with training and refined from feedback.' },
    ],
    faqs: [
      { q: 'Will automation replace our staff?', a: 'Our aim is to remove repetitive tasks so people can spend more time on work that needs judgement and relationships.' },
      { q: 'Is our data safe with AI tools?', a: 'We assess each tool’s data handling with you and choose options and settings that fit your requirements before anything goes live.' },
      { q: 'Which tools do you use?', a: 'We work with the tools you already have where possible and only recommend new ones when they clearly help.' },
    ],
    categories: ['Technology'],
    layout: 'index',
    art: 'automation',
    keywords: ['business automation', 'workflow automation', 'AI integration', 'process automation'],
  },
  {
    slug: 'digital-transformation',
    n: '09',
    name: 'Digital Transformation',
    short: 'Rethinking how a business presents itself, sells and operates online, one practical step at a time.',
    headline: ['Ready for', 'what is next.'],
    metaTitle: 'Digital Transformation',
    metaDescription:
      'Digital transformation consulting by FLINTORA: digital strategy, customer journeys, technology roadmaps and phased change for growing businesses.',
    intro:
      'Transformation does not have to mean a disruptive overhaul. We look at your business as a whole, from how customers discover you to how work gets done inside, and plan practical steps that compound.',
    problems: [
      'Your business runs on spreadsheets, paper and memory.',
      'Customers expect to find, buy and book online, and you are not there yet.',
      'You have tried several tools, but nothing feels joined up.',
      'You know change is needed but not where to begin.',
    ],
    approach: [
      { title: 'See the whole picture', text: 'Brand, customer journey, technology and operations reviewed together.' },
      { title: 'Phase the change', text: 'A roadmap of small, valuable steps instead of one risky leap.' },
      { title: 'Design around people', text: 'New processes designed with the people who will use them every day.' },
      { title: 'Measure progress', text: 'Clear milestones so you can see what each phase achieved.' },
    ],
    deliverables: [
      'Digital maturity review',
      'Customer journey mapping',
      'Technology and platform roadmap',
      'Phased implementation plan',
      'Vendor and tool selection support',
      'Change and training plan',
    ],
    method: [
      { title: 'Assess', text: 'Where you are today across brand, digital and operations.' },
      { title: 'Envision', text: 'Where you want to be in one to three years.' },
      { title: 'Roadmap', text: 'Prioritised phases with owners and budgets.' },
      { title: 'Deliver', text: 'Each phase designed, built and adopted.' },
    ],
    faqs: [
      { q: 'Is this only for large companies?', a: 'No. Small and mid-sized businesses often benefit most, because a few well-chosen changes make a visible difference quickly.' },
      { q: 'Do you implement or only advise?', a: 'Both. We can deliver the design, web and automation work ourselves or support your chosen partners.' },
      { q: 'Where do we start?', a: 'Usually with a short assessment. Our free Digital Presence Assessment on this site is an informal first step.' },
    ],
    categories: ['Technology', 'Websites'],
    layout: 'split',
    art: 'transform',
    keywords: ['digital transformation', 'digital strategy', 'technology roadmap'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
