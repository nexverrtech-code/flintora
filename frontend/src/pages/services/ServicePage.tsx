import { Link, useParams } from 'react-router';
import { ArrowUpRight, Check } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Eyebrow } from '@/components/common/Eyebrow';
import { CtaLink } from '@/components/common/CtaLink';
import { Lines } from '@/components/common/Display';
import { Faq } from '@/components/common/Faq';
import { MaskReveal } from '@/components/animation/MaskReveal';
import { Reveal } from '@/components/animation/Reveal';
import { Parallax } from '@/components/animation/Parallax';
import { ImageReveal } from '@/components/animation/ImageReveal';
import { ServiceArt } from '@/components/art/ServiceArt';
import { VisualMedia } from '@/components/art/VisualMedia';
import { EmberField } from '@/components/interactive/EmberField';
import { getService, services, type Service } from '@/data/services';
import { projectsForService } from '@/data/projects';
import { faqSchema, serviceSchema } from '@/utils/schema';
import { cn } from '@/utils/cn';
import NotFoundPage from '@/pages/not-found/NotFoundPage';

/* ---------- Hero variants ---------- */
function Hero({ s }: { s: Service }) {
  const crumbs = [{ name: 'Capabilities', path: '/capabilities' }, { name: s.name, path: `/capabilities/${s.slug}` }];
  const title = (
    <h1 className="display hero-rise t-xl">
      <span className="sr-only">{s.name}: </span>
      <Lines lines={s.headline} accent={[s.headline.length - 1]} />
    </h1>
  );
  const label = (
    <p className="eyebrow hero-fade mt-10 flex items-center gap-3 text-spark" style={{ ['--d' as string]: '0.1s' }}>
      <span className="font-display">{s.n}</span> <span aria-hidden className="h-px w-8 bg-current" /> {s.name}
    </p>
  );
  const cta = (
    <div className="hero-fade mt-10 flex flex-wrap gap-4" style={{ ['--d' as string]: '0.6s' }}>
      <CtaLink to={`/start-a-project?service=${s.slug}`}>Discuss your project</CtaLink>
    </div>
  );

  if (s.layout === 'fullbleed')
    return (
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-void">
        <div aria-hidden className="absolute inset-0">
          <Parallax speed={14} scale={[1.08, 1]} className="h-full w-full">
            <ServiceArt art={s.art} className="h-full w-full opacity-80" />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/10" />
        </div>
        <div className="shell relative pb-16 pt-[calc(var(--header-h)+6rem)] md:pb-24">
          <Breadcrumbs items={crumbs} />
          {label}
          <div className="mt-6 max-w-5xl">{title}</div>
          {cta}
        </div>
      </section>
    );

  if (s.layout === 'index')
    return (
      <section className="relative overflow-hidden bg-void pb-20 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+6rem)]">
        <p aria-hidden className="display pointer-events-none absolute -right-[4vw] top-[8vh] select-none text-[38vw] leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,128,13,0.25)] md:text-[30vw]">
          {s.n}
        </p>
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          {label}
          <div className="mt-6 max-w-4xl">{title}</div>
          <div className="mt-14 grid items-end gap-10 md:grid-cols-12">
            <div className="aspect-[4/3] overflow-hidden rounded-[1rem] border border-white/10 md:col-span-5">
              <ServiceArt art={s.art} className="h-full w-full" />
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="hero-fade t-lead text-soft" style={{ ['--d' as string]: '0.45s' }}>{s.intro}</p>
              {cta}
            </div>
          </div>
        </div>
      </section>
    );

  if (s.layout === 'stacked')
    return (
      <section className="relative overflow-hidden bg-void pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+6rem)]">
        <div className="shell text-center">
          <Breadcrumbs items={crumbs} className="flex justify-center" />
          <div className="flex justify-center">{label}</div>
          <div className="mx-auto mt-6 max-w-5xl">{title}</div>
          <div className="flex justify-center">{cta}</div>
        </div>
        <div className="shell mt-16 md:mt-24">
          <ImageReveal className="aspect-[21/9] rounded-[1.25rem] border border-white/10 max-md:aspect-[4/3]">
            <ServiceArt art={s.art} className="h-full w-full" />
          </ImageReveal>
        </div>
      </section>
    );

  // split
  return (
    <section className="relative overflow-hidden bg-void pb-16 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+6rem)]">
      <div className="shell grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Breadcrumbs items={crumbs} />
          {label}
          <div className="mt-6">{title}</div>
          {cta}
        </div>
        <div className="lg:col-span-6">
          <Parallax speed={-10} className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 max-lg:aspect-[4/3]">
            <ServiceArt art={s.art} className="h-full w-full" />
          </Parallax>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sections ---------- */
function Intro({ s }: { s: Service }) {
  if (s.layout === 'index') return null; // the index hero already carries the intro
  return (
    <section className="section-y bg-void">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3"><Eyebrow>Introduction</Eyebrow></div>
        <Reveal className="lg:col-span-8">
          <p className="text-[clamp(1.35rem,1rem+1.6vw,2.4rem)] font-light leading-[1.35] tracking-[-0.01em]">{s.intro}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Problems({ s, paper }: { s: Service; paper?: boolean }) {
  return (
    <section className={paper ? 'bg-paper text-ink' : 'bg-charcoal'}>
      <div className="shell section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow className={paper ? 'text-[#a34b00]' : undefined}>Problems we solve</Eyebrow>
          <MaskReveal className="display t-md mt-6" lines={['Sound', 'familiar?']} />
        </div>
        <ul className="lg:col-span-7 lg:col-start-6">
          {s.problems.map((p, i) => (
            <Reveal as="li" key={p} className={cn('flex gap-5 border-t py-4 text-[clamp(1rem,0.95rem+0.5vw,1.35rem)] leading-snug md:py-7', paper ? 'border-ink/15' : 'border-white/10')}>
              <span className={cn('font-display text-sm', paper ? 'text-[#a34b00]' : 'text-spark')}>0{i + 1}</span>
              <span>{p}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Approach({ s, style }: { s: Service; style: 'grid' | 'rows' }) {
  return (
    <section className="section-y bg-void">
      <div className="shell">
        <Eyebrow>Creative approach</Eyebrow>
        <MaskReveal className="display t-lg mt-6 max-w-[16ch]" lines={['How we', 'approach it.']} />
        {style === 'grid' ? (
          <Reveal className="mt-16 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 md:grid-cols-2" stagger={0.08}>
            {s.approach.map((a, i) => (
              <div key={a.title} className="bg-void p-6 md:p-12">
                <span className="font-display text-3xl text-spark">{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold">{a.title}</h3>
                <p className="mt-3 text-soft">{a.text}</p>
              </div>
            ))}
          </Reveal>
        ) : (
          <div className="mt-16 space-y-4">
            {s.approach.map((a, i) => (
              <Reveal key={a.title} className={cn('grid gap-3 rounded-[1rem] border border-white/10 p-6 md:grid-cols-12 md:gap-4 md:p-10', i % 2 && 'md:ml-[12%]')}>
                <span className="font-display text-spark md:col-span-1">{i + 1}</span>
                <h3 className="text-2xl font-semibold md:col-span-4">{a.title}</h3>
                <p className="text-soft md:col-span-6 md:col-start-7">{a.text}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Deliverables({ s, paper }: { s: Service; paper?: boolean }) {
  return (
    <section className={paper ? 'bg-paper text-ink' : 'bg-charcoal'}>
      <div className="shell section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow className={paper ? 'text-[#a34b00]' : undefined}>Deliverables</Eyebrow>
          <MaskReveal className="display t-md mt-6" lines={['What you', 'receive.']} />
          <p className={cn('mt-6 max-w-sm', paper ? 'text-ink/70' : 'text-soft')}>Every engagement is scoped to your goals. These are the deliverables most projects of this kind include.</p>
        </div>
        <Reveal as="ul" className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7" stagger={0.05}>
          {s.deliverables.map((d) => (
            <li key={d} className={cn('flex items-start gap-4 border-b py-3.5 md:py-5', paper ? 'border-ink/15' : 'border-white/10')}>
              <Check aria-hidden className={cn('mt-1 size-4 shrink-0', paper ? 'text-[#a34b00]' : 'text-spark')} />
              <span>{d}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Method({ s }: { s: Service }) {
  return (
    <section className="section-y bg-void">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-[min(100%,30rem)] flex-1">
            <Eyebrow>Working methodology</Eyebrow>
            <MaskReveal className="display t-md mt-6" lines={['Four clear', 'stages.']} />
          </div>
          <Link to="/process" className="link-line text-soft hover:text-white">Our full eight-stage process</Link>
        </div>
        <Reveal as="ol" className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6" stagger={0.1}>
          {s.method.map((m, i) => (
            <li key={m.title} className="relative border-t border-white/15 pt-8">
              <span aria-hidden className="absolute -top-[5px] left-0 size-[9px] rotate-45 bg-spark" />
              <span className="font-display text-sm text-muted">Step {i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{m.title}</h3>
              <p className="mt-2 text-[0.95rem] text-soft">{m.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Related({ s }: { s: Service }) {
  const related = projectsForService(s.slug);
  if (!related.length) return null;
  return (
    <section className="section-y bg-charcoal">
      <div className="shell">
        <Eyebrow>Relevant work</Eyebrow>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {related.slice(0, 2).map((p) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem]">
                <div className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-silk)] group-hover:scale-105">
                  <VisualMedia visual={p.cover} sizes="(min-width:768px) 45vw, 100vw" />
                </div>
                {p.kind === 'concept' && <span className="absolute left-4 top-4 rounded-full bg-void/75 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.12em] text-flare uppercase">Concept study</span>}
              </div>
              <h3 className="mt-5 text-xl font-semibold group-hover:text-spark">{p.title}</h3>
              <p className="mt-1 text-soft">{p.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Questions({ s }: { s: Service }) {
  return (
    <section className="section-y bg-void">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="display t-md mt-6">Common questions</h2>
        </div>
        <Faq items={s.faqs} className="lg:col-span-7 lg:col-start-6" />
      </div>
    </section>
  );
}

function Closing({ s }: { s: Service }) {
  const idx = services.findIndex((x) => x.slug === s.slug);
  const next = services[(idx + 1) % services.length];
  return (
    <>
      <section className="relative overflow-hidden bg-void">
        <EmberField density={0.5} />
        <div className="shell relative grid gap-10 border-t border-white/10 py-[clamp(3rem,1.5rem+8vw,10rem)] lg:grid-cols-12 lg:items-end">
          <MaskReveal className="display t-lg lg:col-span-7" lines={['Ready when', 'you are.']} />
          <div className="lg:col-span-5">
            <p className="text-soft">Tell us about your goals and we will reply with honest thoughts on how {s.name.toLowerCase()} could help.</p>
            <CtaLink to={`/start-a-project?service=${s.slug}`} className="mt-8">Start a project</CtaLink>
          </div>
        </div>
      </section>
      <Link to={`/capabilities/${next.slug}`} className="group block border-t border-white/10 bg-charcoal">
        <div className="shell flex items-center justify-between gap-6 py-12 md:py-16">
          <div>
            <p className="eyebrow text-muted">Next capability</p>
            <p className="mt-3 text-[clamp(1.5rem,1rem+2.4vw,3.4rem)] font-semibold leading-tight transition-colors group-hover:text-spark">{next.name}</p>
          </div>
          <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-spark group-hover:bg-spark group-hover:text-void md:size-20">
            <ArrowUpRight aria-hidden className="size-6" />
          </span>
        </div>
      </Link>
    </>
  );
}

export default function ServicePage() {
  const { slug = '' } = useParams();
  const s = getService(slug);
  if (!s) return <NotFoundPage />;

  const body = {
    split: (
      <>
        <Intro s={s} />
        <Problems s={s} paper />
        <Approach s={s} style="grid" />
        <Deliverables s={s} />
        <Method s={s} />
      </>
    ),
    fullbleed: (
      <>
        <Intro s={s} />
        <Approach s={s} style="rows" />
        <Problems s={s} />
        <Deliverables s={s} paper />
        <Method s={s} />
      </>
    ),
    index: (
      <>
        <Problems s={s} />
        <Method s={s} />
        <Approach s={s} style="grid" />
        <Deliverables s={s} paper />
      </>
    ),
    stacked: (
      <>
        <Intro s={s} />
        <Deliverables s={s} paper />
        <Problems s={s} />
        <Approach s={s} style="rows" />
        <Method s={s} />
      </>
    ),
  }[s.layout];

  return (
    <>
      <Seo
        path={`/capabilities/${s.slug}`}
        title={s.metaTitle}
        description={s.metaDescription}
        breadcrumbs={[{ name: 'Capabilities', path: '/capabilities' }, { name: s.name, path: `/capabilities/${s.slug}` }]}
        schema={[serviceSchema(s), faqSchema(s.faqs)]}
      />
      <Hero s={s} />
      {body}
      <Related s={s} />
      <Questions s={s} />
      <Closing s={s} />
    </>
  );
}
