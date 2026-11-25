import { useEffect, useRef, useState } from 'react';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Eyebrow } from '@/components/common/Eyebrow';
import { CtaLink } from '@/components/common/CtaLink';
import { Lines } from '@/components/common/Display';
import { Faq } from '@/components/common/Faq';
import { MaskReveal } from '@/components/animation/MaskReveal';
import { Reveal } from '@/components/animation/Reveal';
import { stages } from '@/data/process';
import { faqSchema } from '@/utils/schema';
import { cn } from '@/utils/cn';

const expectations = [
  { title: 'One point of contact', text: 'A named lead who knows your project end to end and answers your questions directly.' },
  { title: 'Clear milestones', text: 'Agreed review points with dates, so feedback is focused and nothing drifts.' },
  { title: 'Work in the open', text: 'Shared folders and working files throughout, not a big reveal at the end.' },
  { title: 'Honest trade-offs', text: 'When time, budget and scope pull against each other, we lay out the options plainly.' },
];

const faqs = [
  { q: 'How long does a typical project take?', a: 'It depends on scope. A focused identity often takes six to ten weeks; a custom website eight to fourteen. We agree a timeline before starting.' },
  { q: 'How much of our time will the project need?', a: 'Most at the start (discovery and strategy) and at each review. We keep meetings purposeful and give you clear decisions to make.' },
  { q: 'How many rounds of feedback are included?', a: 'Each stage includes structured review rounds, agreed in the proposal, so expectations are clear on both sides.' },
  { q: 'What happens after delivery?', a: 'You receive all files, guidelines and documentation. Ongoing support, content or marketing can continue as a separate arrangement.' },
];

export default function ProcessPage() {
  const crumbs = [{ name: 'Process', path: '/process' }];
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Seo
        path="/process"
        title="Our Process"
        description="How FLINTORA works, in eight clear stages: discovery, research, strategy, creative direction, design, development, refinement and delivery."
        breadcrumbs={crumbs}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How FLINTORA delivers a creative project',
            step: stages.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text })),
          },
          faqSchema(faqs),
        ]}
      />

      <section className="relative overflow-hidden bg-void pb-16 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+7rem)]">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <h1 className="display hero-rise t-hero mt-10 max-w-[13ch]">
            <Lines lines={['From first', 'spark to', 'delivery.']} accent={[2]} />
          </h1>
          <p className="hero-fade t-lead mt-10 max-w-[44ch] text-soft" style={{ ['--d' as string]: '0.5s' }}>
            Good work is rarely an accident. Our process gives every project room to think, and enough structure that you always know what happens next.
          </p>
          {/* Overview strip */}
          <ol className="hero-fade mt-16 grid grid-cols-4 gap-px overflow-hidden rounded-[1rem] border border-white/10 bg-white/10 md:grid-cols-8" style={{ ['--d' as string]: '0.7s' }}>
            {stages.map((s, i) => (
              <li key={s.n}>
                <a href={`#stage-${s.n}`} className={cn('block h-full bg-void p-4 transition-colors hover:bg-surface md:p-5', active === i && 'bg-surface')}>
                  <span className={cn('font-display text-sm', active === i ? 'text-spark' : 'text-muted')}>{s.n}</span>
                  <span className="mt-2 block text-[0.8rem] font-semibold leading-tight md:text-[0.88rem]">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="The eight stages" className="bg-void pb-[clamp(3rem,1.5rem+8vw,10rem)]">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+3rem)] h-[calc(100svh-var(--header-h)-6rem)]">
              <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-charcoal">
                <div aria-hidden className="absolute -bottom-1/3 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,128,13,0.22),transparent_62%)]" />
                {stages.map((s, i) => (
                  <div key={s.n} aria-hidden className={cn('absolute inset-0 flex flex-col justify-between p-10 transition-[opacity,transform] duration-700 ease-[var(--ease-silk)]', active === i ? 'opacity-100' : 'translate-y-6 opacity-0')}>
                    <span className="display text-[clamp(8rem,14vw,14rem)] leading-none text-spark">{s.n}</span>
                    <div>
                      <p className="display text-3xl">{s.title}</p>
                      <p className="mt-3 italic text-flare/80">{s.question}</p>
                    </div>
                  </div>
                ))}
                {/* progress rail */}
                <div aria-hidden className="absolute right-6 top-10 bottom-10 w-px bg-white/10">
                  <div className="w-full origin-top bg-spark transition-[height] duration-700" style={{ height: `${((active + 1) / stages.length) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {stages.map((s, i) => (
              <li
                key={s.n}
                id={`stage-${s.n}`}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="scroll-mt-32 border-t border-white/10 py-9 lg:min-h-[70vh] lg:py-20"
              >
                <p className="font-display text-spark">{s.n}</p>
                <h2 className="mt-3 text-[clamp(1.8rem,1.3rem+2vw,3rem)] font-semibold leading-tight tracking-[-0.02em]">{s.title}</h2>
                <p className="mt-2 italic text-flare/80">{s.question}</p>
                <p className="t-lead mt-6 text-soft">{s.text}</p>
                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="eyebrow text-muted">What happens</h3>
                    <ul className="mt-4 space-y-2">
                      {s.activities.map((a) => (
                        <li key={a} className="flex gap-3"><span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-spark" />{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="eyebrow text-muted">Your part</h3>
                    <p className="mt-4">{s.you}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="shell section-y">
          <Eyebrow className="text-[#a34b00]">Working together</Eyebrow>
          <MaskReveal className="display t-lg mt-6 max-w-[16ch]" lines={['What you can', 'count on.']} />
          <Reveal className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {expectations.map((e) => (
              <div key={e.title} className="border-t border-ink/20 pt-6">
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <p className="mt-2 text-ink/70">{e.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-void">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="display t-md mt-6">Process questions</h2>
            <CtaLink to="/start-a-project" className="mt-10">Start a project</CtaLink>
          </div>
          <Faq items={faqs} className="lg:col-span-7 lg:col-start-6" />
        </div>
      </section>
    </>
  );
}
