// Budget Estimator rules. Everything here is configurable.
//
// IMPORTANT: ratesVerified is false until FLINTORA confirms its own rate card. While false,
// the estimator tells visitors the figures are illustrative planning ranges, not studio rates.
// Amounts are in the currency set by VITE_CURRENCY (default INR).

export const ratesVerified = false;

export interface ProjectType {
  id: string;
  label: string;
  note: string;
  base: [number, number]; // low, high
  recurring?: boolean; // monthly engagement
}

export const projectTypes: ProjectType[] = [
  { id: 'identity', label: 'Brand identity', note: 'Strategy, logo suite and guidelines', base: [60000, 250000] },
  { id: 'website', label: 'Website', note: 'Design and development', base: [80000, 400000] },
  { id: 'product', label: 'UI/UX for an app or platform', note: 'Research, flows, UI and design system', base: [120000, 500000] },
  { id: 'marketing', label: 'Digital marketing', note: 'Campaign management per month, excluding ad spend', base: [40000, 150000], recurring: true },
  { id: 'seo', label: 'SEO programme', note: 'Technical and content SEO per month', base: [25000, 100000], recurring: true },
  { id: 'content', label: 'Creative content', note: 'Design and copy per month', base: [30000, 120000], recurring: true },
  { id: 'production', label: 'Photography or video', note: 'Planning, shoot and post-production', base: [40000, 300000] },
  { id: 'automation', label: 'Automation and AI workflows', note: 'Mapping, build and training', base: [50000, 300000] },
];

export const scopes = [
  { id: 'focused', label: 'Focused', note: 'A small, well-defined piece of work', factor: 0.75 },
  { id: 'standard', label: 'Standard', note: 'A typical project of this kind', factor: 1 },
  { id: 'extensive', label: 'Extensive', note: 'Many pages, markets or deliverables', factor: 1.6 },
];

export const complexities = [
  { id: 'simple', label: 'Simple', note: 'Clear requirements, few integrations', factor: 0.85 },
  { id: 'moderate', label: 'Moderate', note: 'Some custom features or stakeholders', factor: 1 },
  { id: 'advanced', label: 'Advanced', note: 'Custom functionality, motion or 3D, many decision makers', factor: 1.35 },
];

export const addOns = [
  { id: 'copy', label: 'Copywriting', amount: [15000, 60000] as [number, number] },
  { id: 'photo', label: 'Photography day', amount: [25000, 80000] as [number, number] },
  { id: 'motion', label: 'Motion or 3D graphics', amount: [30000, 150000] as [number, number] },
  { id: 'cms', label: 'Content management setup', amount: [20000, 80000] as [number, number] },
  { id: 'seo-setup', label: 'SEO foundation', amount: [15000, 50000] as [number, number] },
  { id: 'training', label: 'Team training session', amount: [10000, 30000] as [number, number] },
];

export const timelines = [
  { id: 'flexible', label: 'Flexible', note: 'No fixed deadline', factor: 0.95 },
  { id: 'standard', label: 'Standard', note: 'A normal schedule for the scope', factor: 1 },
  { id: 'urgent', label: 'Urgent', note: 'A fixed, tight deadline', factor: 1.25 },
];

/** Round to a friendly number for display. */
export const roundNice = (n: number) => {
  const step = n >= 200000 ? 10000 : n >= 50000 ? 5000 : 1000;
  return Math.round(n / step) * step;
};
