// Digital Presence Assessment. Each answer scores 0-3. Category scores are the share of the
// maximum available points. The result is indicative and based only on the visitor's answers.

export interface Question {
  id: string;
  text: string;
  options: string[]; // index = score
}

export interface AssessmentCategory {
  id: string;
  label: string;
  questions: Question[];
  gap: string;
  improvements: string[];
  service: string; // related service slug
}

export const assessment: AssessmentCategory[] = [
  {
    id: 'brand',
    label: 'Brand',
    service: 'brand-identity-strategy',
    gap: 'Your brand may not be communicating clearly or consistently.',
    improvements: [
      'Write down, in one sentence, who you serve and why they should choose you.',
      'Create simple guidelines for logo, colours and fonts so every piece looks related.',
      'Audit your materials side by side and retire anything that feels off-brand.',
    ],
    questions: [
      {
        id: 'b1',
        text: 'Can your team describe what makes your business different in one sentence?',
        options: ['No', 'Everyone says something different', 'Mostly', 'Yes, consistently'],
      },
      {
        id: 'b2',
        text: 'Do you have brand guidelines that people actually use?',
        options: ['No guidelines', 'Just a logo file', 'Basic guidelines', 'Full guidelines in daily use'],
      },
      {
        id: 'b3',
        text: 'How consistent do your website, social media and printed materials look?',
        options: ['Very inconsistent', 'Somewhat inconsistent', 'Mostly consistent', 'Fully consistent'],
      },
    ],
  },
  {
    id: 'website',
    label: 'Website',
    service: 'website-design-development',
    gap: 'Your website may be holding back trust or enquiries.',
    improvements: [
      'Check your key pages on a phone. Fix anything slow, cramped or hard to tap.',
      'Make the main action obvious on every page: call, book, buy or enquire.',
      'Replace generic stock imagery with real photos of your work, team or products.',
    ],
    questions: [
      {
        id: 'w1',
        text: 'How well does your website reflect the quality of your business today?',
        options: ['We have no website', 'Poorly, it feels dated', 'Reasonably well', 'Very well'],
      },
      {
        id: 'w2',
        text: 'How does your website perform on mobile phones?',
        options: ['Not sure or no website', 'Hard to use', 'Works, but could be better', 'Fast and easy to use'],
      },
      {
        id: 'w3',
        text: 'Is it obvious what a visitor should do next on each page?',
        options: ['No', 'On some pages', 'On most pages', 'Yes, everywhere'],
      },
    ],
  },
  {
    id: 'search',
    label: 'Search',
    service: 'search-engine-optimization',
    gap: 'Potential customers may not be finding you when they search.',
    improvements: [
      'Claim and complete your Google Business Profile with photos, hours and services.',
      'Give each service its own page with a clear title and description.',
      'Answer the questions customers ask most, in plain language, on your site.',
    ],
    questions: [
      {
        id: 's1',
        text: 'Do you appear when people search for your service in your area?',
        options: ['Not that I know of', 'Rarely', 'Sometimes', 'Consistently near the top'],
      },
      {
        id: 's2',
        text: 'Is your Google Business Profile (or equivalent) complete and up to date?',
        options: ['We do not have one', 'Claimed but incomplete', 'Mostly complete', 'Complete and active'],
      },
      {
        id: 's3',
        text: 'Does your website have dedicated pages for each service you offer?',
        options: ['No', 'One page lists everything', 'Some services', 'Every service'],
      },
    ],
  },
  {
    id: 'content',
    label: 'Social & content',
    service: 'creative-design-content',
    gap: 'Your content may not be building attention or trust.',
    improvements: [
      'Pick three content themes and plan a simple monthly calendar around them.',
      'Show real work, people and processes. They outperform polished generic posts.',
      'Reuse each strong idea across several formats instead of starting from scratch.',
    ],
    questions: [
      {
        id: 'c1',
        text: 'How regularly do you publish content on your main channels?',
        options: ['Rarely or never', 'Occasionally', 'Most weeks', 'On a planned schedule'],
      },
      {
        id: 'c2',
        text: 'How would you rate the visual quality of your content?',
        options: ['Low', 'Inconsistent', 'Good', 'Excellent and recognisable'],
      },
      {
        id: 'c3',
        text: 'Do people engage with your content (comments, shares, messages)?',
        options: ['Almost never', 'A little', 'Regularly', 'Very actively'],
      },
    ],
  },
  {
    id: 'conversion',
    label: 'Leads & data',
    service: 'ai-business-automation',
    gap: 'Enquiries may be slipping through or going unmeasured.',
    improvements: [
      'Set up analytics and track the actions that matter: calls, forms, bookings and sales.',
      'Reply to every enquiry within one working day. Automate the acknowledgement.',
      'Keep every lead in one place, with a clear next step and an owner.',
    ],
    questions: [
      {
        id: 'l1',
        text: 'Do you know which channels bring you customers?',
        options: ['No idea', 'A rough guess', 'Mostly', 'Yes, we measure it'],
      },
      {
        id: 'l2',
        text: 'How are new enquiries tracked and followed up?',
        options: ['Not tracked', 'Email and memory', 'A spreadsheet', 'A CRM or automated system'],
      },
      {
        id: 'l3',
        text: 'How much of your follow-up and admin is automated?',
        options: ['None', 'A little', 'Some', 'Most of it'],
      },
    ],
  },
];

export const scoreBand = (pct: number) =>
  pct >= 80
    ? { label: 'Strong', text: 'A solid foundation. Focus on refinement and scale.' }
    : pct >= 55
      ? { label: 'Developing', text: 'Good pieces are in place, with clear room to improve.' }
      : pct >= 30
        ? { label: 'Emerging', text: 'Some basics exist. A few focused changes would make a visible difference.' }
        : { label: 'Early', text: 'There is a lot of untapped opportunity. Start with the fundamentals.' };
