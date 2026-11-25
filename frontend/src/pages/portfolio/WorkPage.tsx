import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Eyebrow } from '@/components/common/Eyebrow';
import { CtaLink } from '@/components/common/CtaLink';
import { Lines } from '@/components/common/Display';
import { VisualMedia } from '@/components/art/VisualMedia';
import { projects, projectCategories, type ProjectCategory } from '@/data/projects';
import { absoluteUrl } from '@/data/company';
import { cn } from '@/utils/cn';

// Asymmetric rhythm: column spans and vertical offsets for an editorial, non-grid feel.
const rhythm = [
  'md:col-span-7',
  'md:col-span-5 md:mt-40',
  'md:col-span-5 md:col-start-2',
  'md:col-span-6 md:mt-24',
  'md:col-span-8 md:col-start-3',
];

export default function WorkPage() {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const list = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))), [filter]);
  const crumbs = [{ name: 'Work', path: '/work' }];

  return (
    <>
      <Seo
        path="/work"
        title="Selected Works"
        pageType="CollectionPage"
        description="Selected work from FLINTORA: brand identity, websites, UI/UX, marketing and technology projects, including in-house work and clearly labelled concept studies."
        breadcrumbs={crumbs}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'FLINTORA selected works',
            itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/work/${p.slug}`), name: p.title })),
          },
        ]}
      />
      <section className="bg-void pb-12 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+7rem)]">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
            <h1 className="display hero-rise t-hero lg:col-span-8">
              <Lines lines={['Selected', 'works.']} accent={[1]} />
            </h1>
            <div className="hero-fade lg:col-span-4" style={{ ['--d' as string]: '0.45s' }}>
              <p className="text-soft">
                Real work comes with real context. Alongside our own projects we publish concept studies: self-initiated explorations for fictional brands. They are always labelled, and never presented as client work or given results.
              </p>
            </div>
          </div>

          <div role="group" aria-label="Filter projects by category" className="mt-16 flex flex-wrap gap-2">
            {(['All', ...projectCategories] as const).map((c) => {
              const count = c === 'All' ? projects.length : projects.filter((p) => p.categories.includes(c)).length;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-[0.85rem] transition-colors',
                    filter === c ? 'border-spark bg-spark text-void' : 'border-white/15 text-soft hover:border-white/40 hover:text-white',
                  )}
                >
                  {c} <span className={filter === c ? 'text-void/60' : 'text-muted'}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-live="polite" className="bg-void pb-[clamp(3rem,1.5rem+8vw,10rem)]">
        <div className="shell">
          {list.length === 0 ? (
            <p className="max-w-xl border-t border-white/10 pt-10 text-soft">
              No {filter.toLowerCase()} projects are published yet. We only show work we can present honestly, with permission and context.{' '}
              <Link to="/contact" className="link-line text-white">Ask us about this discipline.</Link>
            </p>
          ) : (
            <div className="grid gap-x-10 gap-y-20 md:grid-cols-12">
              <AnimatePresence mode="popLayout">
                {list.map((p, i) => (
                  <motion.article
                    layout
                    key={p.slug}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={rhythm[i % rhythm.length]}
                  >
                    <Link to={`/work/${p.slug}`} className="group block">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem] bg-surface">
                        <div className="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.05]">
                          <VisualMedia visual={p.cover} sizes="(min-width:768px) 60vw, 100vw" priority={i === 0} />
                        </div>
                        <span className="absolute left-4 top-4 rounded-full bg-void/75 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.12em] uppercase backdrop-blur">
                          <span className={p.kind === 'concept' ? 'text-flare' : 'text-white'}>{p.kind === 'concept' ? 'Concept study' : 'In-house'}</span>
                        </span>
                      </div>
                      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                        <h2 className="text-[clamp(1.4rem,1rem+1.4vw,2.2rem)] font-semibold leading-tight transition-colors group-hover:text-spark">{p.title}</h2>
                        <p className="text-[0.75rem] tracking-[0.14em] text-muted uppercase">{p.categories.join(' · ')} — {p.year}</p>
                      </div>
                      <p className="mt-2 max-w-[52ch] text-soft">{p.summary}</p>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="shell section-y grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="text-[#a34b00]">Your project here</Eyebrow>
            <h2 className="display t-lg mt-6">The next case study could be yours.</h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-ink/70">We take on a limited number of projects at a time, so each one gets real attention.</p>
            <CtaLink to="/start-a-project" variant="dark" className="mt-8">Start a project</CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
