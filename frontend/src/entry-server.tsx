import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App';
import { HeadContext, type HeadData } from './components/common/Seo';
import { staticPaths } from './routes/routes';
import { services } from './data/services';
import { projects } from './data/projects';
import { company, absoluteUrl, industries, addressLines } from './data/company';

export { staticPaths };

export async function render(url: string): Promise<{ html: string; head?: HeadData }> {
  const collector: { head?: HeadData } = {};
  const { prelude } = await prerenderToNodeStream(
    <HeadContext.Provider value={collector}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HeadContext.Provider>,
  );
  const chunks: Buffer[] = [];
  for await (const c of prelude) chunks.push(Buffer.from(c));
  return { html: Buffer.concat(chunks).toString('utf8'), head: collector.head };
}

/** Plain-text summary for AI assistants and answer engines (llms.txt). Facts only. */
export function llmsTxt() {
  return [
    `# ${company.name}`,
    '',
    `> ${company.description}`,
    '',
    `Tagline: ${company.tagline}`,
    '',
    '## Capabilities',
    ...services.map((s) => `- [${s.name}](${absoluteUrl(`/capabilities/${s.slug}`)}): ${s.short}`),
    '',
    '## Work',
    ...projects.map(
      (p) =>
        `- [${p.title}](${absoluteUrl(`/work/${p.slug}`)}): ${p.summary}${p.kind === 'concept' ? ' (Concept study for a fictional brand, not client work.)' : ''}`,
    ),
    '',
    '## Industries served',
    ...industries.map((i) => `- ${i}`),
    '',
    '## How we work',
    '- Discovery, research, strategy, creative direction, design, development, refinement and delivery.',
    '',
    '## Contact',
    `- Contact form: ${absoluteUrl('/contact')}`,
    ...(company.contact.email ? [`- Email: ${company.contact.email}`] : []),
    ...(company.contact.phone ? [`- Phone: ${company.contact.phone}`] : []),
    ...(addressLines.length ? [`- Address: ${addressLines.join(', ')}`] : []),
    ...(company.local.serviceArea.length ? [`- Service area: ${company.local.serviceArea.join(', ')}`] : []),
    '',
    '## Key pages',
    `- [About](${absoluteUrl('/about')})`,
    `- [Process](${absoluteUrl('/process')})`,
    `- [Contact](${absoluteUrl('/contact')})`,
    '',
  ].join('\n');
}

export const siteUrl = company.siteUrl;
