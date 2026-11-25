import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Gauge, Calculator, FileText } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Lines } from '@/components/common/Display';
import { Assessment } from './Assessment';
import { Estimator } from './Estimator';
import { BriefBuilder } from './BriefBuilder';
import { faqSchema } from '@/utils/schema';
import { cn } from '@/utils/cn';

const tools = [
  { id: 'assessment', label: 'Digital Presence Assessment', short: 'Assessment', icon: Gauge, intro: 'A quick, honest look at your brand, website, search, content and lead handling. Indicative, based only on your answers.' },
  { id: 'estimator', label: 'Project Budget Estimator', short: 'Budget', icon: Calculator, intro: 'An indicative budget range from your project type, scope, complexity, extras and timeline. Not a formal quotation.' },
  { id: 'brief', label: 'Creative Brief Builder', short: 'Brief', icon: FileText, intro: 'Turn your thoughts into a structured brief. Copy it, download it or bring it into a project enquiry.' },
] as const;

type ToolId = (typeof tools)[number]['id'];

const faqs = [
  { q: 'Do these tools store or send my answers?', a: 'No. Everything runs in your browser. Nothing is sent to FLINTORA unless you choose to continue to the Start a Project form and send your enquiry yourself.' },
  { q: 'How accurate is the assessment score?', a: 'It is indicative. The score reflects your own answers to a short set of questions. A proper review of your website and channels would look at real data.' },
  { q: 'Is the budget estimate a quote?', a: 'No. It is a planning range calculated from published, configurable rules. A real proposal depends on your goals, scope and constraints.' },
];

export default function GrowthIntelligencePage() {
  const crumbs = [{ name: 'Growth Intelligence', path: '/growth-intelligence' }];
  const [tab, setTab] = useState<ToolId>('assessment');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Deep links: /growth-intelligence#estimator
  useEffect(() => {
    const h = location.hash.slice(1) as ToolId;
    if (tools.some((t) => t.id === h)) setTab(h);
  }, []);

  const select = (id: ToolId) => {
    setTab(id);
    history.replaceState(null, '', `#${id}`);
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + tools.length) % tools.length;
    select(tools[n].id);
    tabRefs.current[n]?.focus();
  };

  const active = tools.find((t) => t.id === tab)!;

  return (
    <>
      <Seo
        path="/growth-intelligence"
        title="Growth Intelligence"
        description="Free planning tools from FLINTORA: a Digital Presence Assessment, a Project Budget Estimator and a Creative Brief Builder. No sign-up, runs in your browser."
        breadcrumbs={crumbs}
        schema={[
          ...tools.map((t) => ({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: t.label,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any (web browser)',
            description: t.intro,
            isAccessibleForFree: true,
          })),
          faqSchema(faqs),
        ]}
      />
      <section className="relative overflow-hidden bg-void pb-10 pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <div aria-hidden className="absolute right-0 top-0 size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(255,169,18,0.1),transparent_62%)]" />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid items-end gap-8 lg:grid-cols-12">
            <h1 className="display hero-rise t-xl lg:col-span-8">
              <Lines lines={['Growth', 'intelligence.']} accent={[1]} />
            </h1>
            <p className="hero-fade text-soft lg:col-span-4" style={{ ['--d' as string]: '0.4s' }}>
              Three practical tools to help you think clearly about your next step. No accounts, no data collection, no sales pitch.
            </p>
          </div>

          <div role="tablist" aria-label="Growth tools" className="mt-14 grid gap-2 sm:grid-cols-3">
            {tools.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                onClick={() => select(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  'flex items-center gap-4 rounded-2xl border p-5 text-left transition-colors',
                  tab === t.id ? 'border-spark bg-spark/10' : 'border-white/10 hover:border-white/30',
                )}
              >
                <span className={cn('grid size-11 shrink-0 place-items-center rounded-full', tab === t.id ? 'bg-spark text-void' : 'bg-surface text-spark')}>
                  <t.icon aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold leading-tight">{t.label}</span>
                  <span className="text-[0.8rem] text-muted">Tool 0{i + 1}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-void pb-[clamp(3rem,1.5rem+6vw,9rem)]">
        <div className="shell">
          <div role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`} className="border-t border-white/10 pt-12">
            <h2 className="text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] font-semibold tracking-[-0.02em]">{active.label}</h2>
            <p className="mt-3 max-w-2xl text-soft">{active.intro}</p>
            <div className="mt-12">
              {tab === 'assessment' && <Assessment />}
              {tab === 'estimator' && <Estimator />}
              {tab === 'brief' && <BriefBuilder />}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-charcoal py-16">
        <div className="shell grid gap-8 md:grid-cols-3">
          {faqs.map((f) => (
            <div key={f.q}>
              <h2 className="font-semibold">{f.q}</h2>
              <p className="mt-2 text-[0.92rem] text-soft">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
