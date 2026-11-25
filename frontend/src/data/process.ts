export interface Stage {
  n: string;
  title: string;
  question: string;
  text: string;
  activities: string[];
  you: string;
}

export const stages: Stage[] = [
  {
    n: '01',
    title: 'Discovery',
    question: 'What are we really solving?',
    text: 'We listen first. Conversations with you and your team uncover the goal behind the request, the constraints and what success looks like.',
    activities: ['Kick-off workshop', 'Stakeholder conversations', 'Review of existing material'],
    you: 'Share context, access and honest opinions.',
  },
  {
    n: '02',
    title: 'Research',
    question: 'What does the world around you look like?',
    text: 'Audiences, competitors, references and data. We look for patterns, gaps and the quiet opportunities others miss.',
    activities: ['Audience and competitor review', 'Visual and market references', 'Analytics and content audit'],
    you: 'Introduce us to customers or data where possible.',
  },
  {
    n: '03',
    title: 'Strategy',
    question: 'Where should we aim?',
    text: 'Research becomes direction: positioning, priorities and a plan everyone can repeat in a sentence.',
    activities: ['Positioning and messaging', 'Priorities and scope', 'Measures of success'],
    you: 'Agree the direction before design begins.',
  },
  {
    n: '04',
    title: 'Creative Direction',
    question: 'How should it feel?',
    text: 'Mood, tone, references and early sketches. The creative idea is agreed before we polish anything.',
    activities: ['Mood boards and references', 'Concept routes', 'Tone of voice'],
    you: 'Choose a route and tell us what resonates.',
  },
  {
    n: '05',
    title: 'Design',
    question: 'What does it look like in detail?',
    text: 'The chosen idea is designed across every touchpoint, with reviews at clear milestones.',
    activities: ['Identity, layouts or interfaces', 'Prototypes and mock-ups', 'Milestone reviews'],
    you: 'Give consolidated feedback at each review.',
  },
  {
    n: '06',
    title: 'Development',
    question: 'How does it come to life?',
    text: 'Websites are built, content is produced and systems are connected, tested on real devices along the way.',
    activities: ['Build and integration', 'Content production', 'Device and accessibility testing'],
    you: 'Supply content and test on your own devices.',
  },
  {
    n: '07',
    title: 'Refinement',
    question: 'What can be better?',
    text: 'The difference between good and excellent lives here: timing, spacing, copy and performance, tuned until they feel right.',
    activities: ['Detail and motion polish', 'Performance tuning', 'Final proofreading'],
    you: 'Final review and sign-off.',
  },
  {
    n: '08',
    title: 'Delivery',
    question: 'How do we hand it over well?',
    text: 'Launch, handover files, documentation and training, so your team is confident from the first day.',
    activities: ['Launch or release', 'Files and guidelines', 'Training and support plan'],
    you: 'Take ownership, with us one message away.',
  },
];
