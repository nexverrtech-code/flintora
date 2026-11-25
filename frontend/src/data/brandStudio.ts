// Brand Transformation Studio rules. Transparent and predefined: every recommendation can be
// traced back to an answer. This is a planning aid, not an AI diagnosis or a professional audit.
import { industries } from './company';

export interface Option {
  id: string;
  label: string;
}

export const businessTypes: Option[] = [
  { id: 'startup', label: 'New business or startup' },
  { id: 'small', label: 'Established small business' },
  { id: 'growing', label: 'Growing company' },
  { id: 'large', label: 'Large organisation' },
  { id: 'nonprofit', label: 'Non-profit or institution' },
  { id: 'personal', label: 'Personal brand or creator' },
];

export const industryOptions: Option[] = [...industries, 'Other'].map((label) => ({
  id: label.toLowerCase().replace(/[^a-z]+/g, '-'),
  label,
}));

export const presenceOptions: Option[] = [
  { id: 'none', label: 'Nothing yet' },
  { id: 'social', label: 'Social media only' },
  { id: 'basic', label: 'A basic website' },
  { id: 'active', label: 'A website and active marketing' },
];

export const challengeOptions: Option[] = [
  { id: 'unclear', label: 'People do not understand what makes us different' },
  { id: 'dated', label: 'Our look feels dated' },
  { id: 'leads', label: 'Not enough enquiries or sales' },
  { id: 'visibility', label: 'Customers cannot find us online' },
  { id: 'inconsistent', label: 'Our content is inconsistent' },
  { id: 'manual', label: 'Too much manual work behind the scenes' },
  { id: 'launch', label: 'We are launching something new' },
];

export const resultOptions: Option[] = [
  { id: 'recognition', label: 'A brand people recognise and trust' },
  { id: 'growth', label: 'More leads and sales' },
  { id: 'experience', label: 'A better online experience' },
  { id: 'visibility', label: 'More visibility in search and social' },
  { id: 'efficiency', label: 'Time saved through automation' },
  { id: 'launch', label: 'A confident launch' },
];

/** Each answer adds weight to services. Higher totals rank first. */
export const rules: Record<string, Record<string, number>> = {
  // challenge
  'challenge:unclear': { 'brand-identity-strategy': 3, 'creative-design-content': 1 },
  'challenge:dated': { 'brand-identity-strategy': 2, 'website-design-development': 2 },
  'challenge:leads': { 'digital-marketing': 3, 'website-design-development': 1, 'search-engine-optimization': 1 },
  'challenge:visibility': { 'search-engine-optimization': 3, 'digital-marketing': 1 },
  'challenge:inconsistent': { 'creative-design-content': 3, 'brand-identity-strategy': 1 },
  'challenge:manual': { 'ai-business-automation': 3, 'digital-transformation': 2 },
  'challenge:launch': { 'brand-identity-strategy': 2, 'website-design-development': 2, 'digital-marketing': 1 },
  // desired result
  'result:recognition': { 'brand-identity-strategy': 2, 'photography-videography': 1 },
  'result:growth': { 'digital-marketing': 2, 'search-engine-optimization': 1 },
  'result:experience': { 'ui-ux-design': 2, 'website-design-development': 2 },
  'result:visibility': { 'search-engine-optimization': 2, 'creative-design-content': 1 },
  'result:efficiency': { 'ai-business-automation': 2, 'digital-transformation': 1 },
  'result:launch': { 'brand-identity-strategy': 1, 'website-design-development': 1, 'photography-videography': 1 },
  // current presence
  'presence:none': { 'brand-identity-strategy': 1, 'website-design-development': 2 },
  'presence:social': { 'website-design-development': 2 },
  'presence:basic': { 'website-design-development': 1, 'search-engine-optimization': 1 },
  'presence:active': { 'digital-marketing': 1, 'ui-ux-design': 1 },
};

/** Services the visitor picked themselves get this weight. */
export const SELECTED_WEIGHT = 3;

export const directions: Record<string, string> = {
  unclear:
    'Start with words before visuals. Define one clear positioning statement, then let the identity express it with a single, memorable idea.',
  dated:
    'Evolve rather than erase. Keep the recognisable parts of your brand and modernise type, colour and imagery around them.',
  leads:
    'Make the path to enquiry shorter and clearer. Pair focused campaigns with landing pages built around a single action.',
  visibility:
    'Be useful where people are already searching. Clear service pages, a complete business profile and content that answers real questions.',
  inconsistent:
    'Fewer, better pieces. A small set of content pillars and templates will make everything you publish feel related.',
  manual:
    'Map the workflow, then automate the repetitive steps first. Keep people in charge of judgement and relationships.',
  launch:
    'Look established from day one. A confident identity, a focused launch page and a short campaign with one message.',
};

export const nextSteps: Record<string, string[]> = {
  none: [
    'Agree your positioning and a simple identity before building anything else.',
    'Launch a focused website with one clear action per page.',
  ],
  social: [
    'Give your social audience a home you own: a fast, well-structured website.',
    'Bring your social content and website into the same visual system.',
  ],
  basic: [
    'Review your current site against your goals before deciding to redesign or improve.',
    'Set up analytics so the next decisions are based on evidence.',
  ],
  active: [
    'Audit which channels genuinely drive results and where effort is wasted.',
    'Look for experience and automation improvements that compound.',
  ],
};
