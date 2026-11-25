import { Link, useParams } from 'react-router';
import { ArrowUpRight, Info } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Eyebrow } from '@/components/common/Eyebrow';
import { CtaLink } from '@/components/common/CtaLink';
import { Reveal } from '@/components/animation/Reveal';
import { ImageReveal } from '@/components/animation/ImageReveal';
import { Parallax } from '@/components/animation/Parallax';
import { VisualMedia } from '@/components/art/VisualMedia';
import { getProject, projects, type CaseSection, type Project } from '@/data/projects';
import { getService } from '@/data/services';
import { creativeWorkSchema } from '@/utils/schema';
import { cn } from '@/utils/cn';
import NotFoundPage from '@/pages/not-found/NotFoundPage';

function Caption({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="mt-3 text-[0.8rem] text-muted">{text}</p>;
}

/** Each section picks a composition from its position and content, so the story never repeats a pattern twice in a row. */
function Section({ s, i, p }: { s: CaseSection; i: number; p: Project }) {
  const label = (
    <p className="eyebrow flex items-center gap-3" style={{ color: p.accent }}>
      <span aria-hidden className="h-px w-8 bg-current" /> {s.title}
    </p>
  );
  const body = (
    <div className="space-y-5">
      {s.text.map((t) => (
        <p key={t.slice(0, 24)} className={cn(i === 0 ? 't-lead text-white/90' : 'text-soft')}>{t}</p>
      ))}
    </div>
  );

  if (!s.visual)
    return (
      <section className="shell grid gap-8 py-[clamp(2.5rem,1.5rem+5vw,8rem)] lg:grid-cols-12">
        <div className="lg:col-span-3">{label}</div>
        <Reveal className="lg:col-span-7 lg:col-start-5">{body}</Reveal>
      </section>
    );

  const mode = i % 3;
  if (mode === 0)
    return (
      <section className="py-[clamp(2.5rem,1.5rem+5vw,8rem)]">
        <div className="shell grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">{label}</div>
          <Reveal className="lg:col-span-7 lg:col-start-5">{body}</Reveal>
        </div>
        <div className="shell mt-14">
          <ImageReveal className="aspect-[16/9] rounded-[1rem] bg-surface">
            <VisualMedia visual={s.visual} sizes="100vw" />
          </ImageReveal>
          <Caption text={s.visual.alt} />
        </div>
      </section>
    );

  const imageLeft = mode === 1;
  return (
    <section className="shell grid items-center gap-12 py-[clamp(2.5rem,1.5rem+5vw,8rem)] lg:grid-cols-12">
      <div className={cn('lg:col-span-7', imageLeft ? 'lg:order-1' : 'lg:order-2 lg:col-start-6')}>
        <ImageReveal from={imageLeft ? 'left' : 'right'} className="aspect-[16/10] rounded-[1rem] bg-surface">
          <VisualMedia visual={s.visual} sizes="(min-width:1024px) 58vw, 100vw" />
        </ImageReveal>
        <Caption text={s.visual.alt} />
      </div>
      <Reveal className={cn('lg:col-span-4', imageLeft ? 'lg:order-2 lg:col-start-9' : 'lg:order-1')}>
        {label}
        <div className="mt-6">{body}</div>
      </Reveal>
    </section>
  );
}

export default function CaseStudyPage() {
  const { slug = '' } = useParams();
  const p = getProject(slug);
  if (!p) return <NotFoundPage />;
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const crumbs = [{ name: 'Work', path: '/work' }, { name: p.title, path: `/work/${p.slug}` }];
  const typeLabel = p.kind === 'concept' ? 'Concept study' : p.kind === 'in-house' ? 'In-house project' : 'Client project';

  return (
    <>
      <Seo
        path={`/work/${p.slug}`}
        title={`${p.title}${p.kind === 'concept' ? ' (Concept Study)' : ''}`}
        description={`${p.summary} ${p.kind === 'concept' ? 'A FLINTORA concept study for a fictional brand.' : `A ${p.categories.join(', ').toLowerCase()} project by FLINTORA.`}`}
        type="article"
        image={p.cover.type === 'image' ? `${p.cover.src}-1600.webp` : undefined}
        imageAlt={p.cover.alt}
        breadcrumbs={crumbs}
        schema={[creativeWorkSchema(p)]}
      />

      {/* Cover */}
      <section className="relative bg-void pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow hero-fade flex items-center gap-3" style={{ color: p.accent }}>
                <span aria-hidden className="h-px w-8 bg-current" /> {typeLabel}
              </p>
              <h1 className="hero-rise mt-6 text-[clamp(2.6rem,1.4rem+5.4vw,7rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
                <span className="mask-line"><span>{p.title}</span></span>
              </h1>
            </div>
            <p className="hero-fade t-lead text-soft lg:col-span-4" style={{ ['--d' as string]: '0.4s' }}>{p.summary}</p>
          </div>
        </div>
        <div className="mt-14 overflow-hidden md:mt-20">
          <Parallax speed={10} scale={[1.06, 1]} className="aspect-[16/9] max-h-[88vh] w-full bg-surface max-md:aspect-[4/3]">
            <VisualMedia visual={p.cover} sizes="100vw" priority />
          </Parallax>
        </div>
      </section>

      {/* Facts */}
      <section className="border-b border-white/10 bg-void">
        <div className="shell">
          {p.kind === 'concept' && (
            <div role="note" className="mt-10 flex gap-4 rounded-[1rem] border border-flare/30 bg-flare/[0.06] p-6 text-[0.95rem]">
              <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-flare" />
              <p className="text-soft">
                <strong className="font-semibold text-white">This is a concept study.</strong> {p.title} is a fictional brand created by FLINTORA to explore an idea. It is not a client commission, and no results are claimed.
              </p>
            </div>
          )}
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 py-12 md:grid-cols-4">
            <div>
              <dt className="eyebrow text-muted">Client</dt>
              <dd className="mt-2">{p.client}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Industry</dt>
              <dd className="mt-2">{p.industry}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Year</dt>
              <dd className="mt-2">{p.year}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Disciplines</dt>
              <dd className="mt-2">
                <ul>
                  {p.services.map((slug) => {
                    const s = getService(slug);
                    return s ? <li key={slug}><Link to={`/capabilities/${slug}`} className="link-line hover:text-spark">{s.name}</Link></li> : null;
                  })}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Story */}
      <div className="bg-void">
        {p.sections.map((s, i) => (
          <Section key={s.key} s={s} i={i} p={p} />
        ))}
      </div>

      {p.gallery.length > 0 && (
        <section className="bg-charcoal py-[clamp(2.5rem,1.5rem+5vw,8rem)]">
          <div className="shell">
            <Eyebrow>More from the project</Eyebrow>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {p.gallery.map((v, i) => (
                <figure key={i} className={cn(i % 2 === 1 && 'md:mt-24')}>
                  <ImageReveal className="aspect-[16/9] rounded-[1rem] bg-surface">
                    <VisualMedia visual={v} sizes="(min-width:768px) 45vw, 100vw" />
                  </ImageReveal>
                  <figcaption className="mt-3 text-[0.8rem] text-muted">{v.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {p.results.length > 0 && (
        <section className="bg-paper py-[clamp(2.5rem,1.5rem+5vw,8rem)] text-ink">
          <div className="shell">
            <Eyebrow className="text-[#a34b00]">Verified results</Eyebrow>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {p.results.map((r) => <li key={r} className="border-t border-ink/15 pt-5 text-lg">{r}</li>)}
            </ul>
          </div>
        </section>
      )}

      {/* Next project */}
      <Link to={`/work/${next.slug}`} className="group relative block overflow-hidden bg-void">
        <div className="absolute inset-0 opacity-25 transition-opacity duration-700 group-hover:opacity-45">
          <VisualMedia visual={next.cover} sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-void/30" />
        <div className="shell relative flex items-end justify-between gap-6 py-[clamp(3rem,1.5rem+8vw,10rem)]">
          <div>
            <p className="eyebrow text-muted">Next project</p>
            <p className="mt-4 text-[clamp(2rem,1.2rem+4vw,5.5rem)] font-semibold leading-none tracking-[-0.03em] transition-colors group-hover:text-spark">{next.title}</p>
            <p className="mt-3 text-soft">{next.summary}</p>
          </div>
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-spark group-hover:bg-spark group-hover:text-void md:size-24">
            <ArrowUpRight aria-hidden className="size-7" />
          </span>
        </div>
      </Link>

      <section className="bg-charcoal">
        <div className="shell flex flex-wrap items-center justify-between gap-8 py-16">
          <p className="display t-md max-w-[18ch]">Have a project like this in mind?</p>
          <CtaLink to="/start-a-project">Start a project</CtaLink>
        </div>
      </section>
    </>
  );
}
