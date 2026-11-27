import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Eyebrow } from '@/components/common/Eyebrow';
import { CtaLink } from '@/components/common/CtaLink';
import { Lines } from '@/components/common/Display';
import { Faq } from '@/components/common/Faq';
import { MaskReveal } from '@/components/animation/MaskReveal';
import { Reveal } from '@/components/animation/Reveal';
import { ImageReveal } from '@/components/animation/ImageReveal';
import { StockPhoto } from '@/components/common/StockPhoto';
import { stages } from '@/data/process';
import { faqSchema } from '@/utils/schema';

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
            {stages.map((s) => (
              <li key={s.n}>
                <div className="h-full bg-void p-4 md:p-5">
                  <span className="font-display text-sm text-spark">{s.n}</span>
                  <span className="mt-2 block text-[0.8rem] font-semibold leading-tight md:text-[0.88rem]">{s.title}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-void pb-[clamp(3rem,2rem+4vw,6rem)]">
        <div className="shell">
          <ImageReveal className="aspect-[16/9] rounded-[1.25rem] md:aspect-[21/9]">
            <StockPhoto name="process" ratio="21:9" sizes="(min-width:1360px) 1360px, 100vw" className="h-full w-full" />
          </ImageReveal>
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
            <CtaLink to="/contact" className="mt-10">Start a project</CtaLink>
          </div>
          <Faq items={faqs} className="lg:col-span-7 lg:col-start-6" />
        </div>
      </section>
    </>
  );
}
