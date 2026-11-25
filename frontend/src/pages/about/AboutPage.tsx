import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Eyebrow } from '@/components/common/Eyebrow';
import { CtaLink } from '@/components/common/CtaLink';
import { Picture } from '@/components/common/Picture';
import { SparkMark } from '@/components/common/SparkMark';
import { Lines } from '@/components/common/Display';
import { MaskReveal } from '@/components/animation/MaskReveal';
import { Reveal } from '@/components/animation/Reveal';
import { Parallax } from '@/components/animation/Parallax';
import { ImageReveal } from '@/components/animation/ImageReveal';
import { EmberField } from '@/components/interactive/EmberField';
import { company, industries, values } from '@/data/company';
import { services } from '@/data/services';
import { team } from '@/data/team';
import { personSchema } from '@/utils/schema';

const approach = [
  { title: 'Listen longer', text: 'The brief is a starting point, not the answer. We ask the questions behind the request before proposing anything.' },
  { title: 'Find the angle', text: 'Every project gets one clear idea that guides every later decision, from colour to code.' },
  { title: 'Make it, then make it better', text: 'We prototype early and refine relentlessly. The last ten percent of polish is where quality becomes visible.' },
  { title: 'Leave you stronger', text: 'Guidelines, files, training and documentation, so your team can carry the work forward with confidence.' },
];

const disciplines = [
  { role: 'Strategy', text: 'Positioning, research and planning that give the creative work a clear purpose.' },
  { role: 'Design', text: 'Identity, interface, editorial and campaign design, led by a single creative direction.' },
  { role: 'Technology', text: 'Front-end engineering, platforms, integrations and automation.' },
  { role: 'Content and production', text: 'Writing, photography, video and social content.' },
  { role: 'Growth', text: 'Search, campaigns and analytics that connect the work to results.' },
];

export default function AboutPage() {
  const crumbs = [{ name: 'About', path: '/about' }];
  return (
    <>
      <Seo
        path="/about"
        title="About Us"
        pageType="AboutPage"
        description="Meet FLINTORA, a creative and digital studio. Our philosophy, vision, mission, creative approach, capabilities and the values behind the work."
        breadcrumbs={crumbs}
        schema={team.map(personSchema)}
      />

      {/* 1. Introduction: oversized type over a quiet stage */}
      <section className="grain relative overflow-hidden bg-void pb-20 pt-[calc(var(--header-h)+4rem)] md:pb-32 md:pt-[calc(var(--header-h)+7rem)]">
        <div aria-hidden className="absolute -right-[10%] top-[10%] size-[60rem] rounded-full bg-[radial-gradient(circle,rgba(255,128,13,0.14),transparent_62%)]" />
        <Parallax speed={-30} className="pointer-events-none absolute right-[6%] top-[22%] hidden md:block">
          <SparkMark mono className="h-[50vh] w-auto text-white/[0.04]" />
        </Parallax>
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <h1 className="display hero-rise t-hero mt-10 max-w-[12ch]">
            <Lines lines={['A studio', 'built around', 'the spark.']} accent={[2]} />
          </h1>
          <div className="mt-14 grid gap-10 md:grid-cols-12">
            <p className="hero-fade t-lead text-soft md:col-span-6 md:col-start-6" style={{ ['--d' as string]: '0.5s' }}>
              {company.summary} We bring strategy, design, technology and storytelling together, so a brand looks, sounds and works as one.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Brand philosophy: long editorial quote on paper */}
      <section className="bg-paper text-ink">
        <div className="shell section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow n="01" className="text-[#a34b00]">Brand philosophy</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <Reveal as="blockquote" className="text-[clamp(1.6rem,1.1rem+2.1vw,3rem)] font-light leading-[1.25] tracking-[-0.01em]">
              “Flint does nothing on its own. Strike it at the right angle and it throws a spark that can start something much bigger. We exist to find that angle for every brand we work with.”
            </Reveal>
            <Reveal className="mt-10 grid gap-8 text-ink/70 md:grid-cols-2" stagger={0.1}>
              <p>{company.brandConcept} The forward slant signals momentum; the faceted light gives it depth.</p>
              <p>That idea shapes how we work. We look for the insight first, then craft it with care, and we stay with it until it reaches the people it was meant for.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 + 4. Vision and mission: two monumental statements */}
      <section className="relative overflow-hidden bg-charcoal">
        <div className="shell section-y grid gap-20 md:grid-cols-2 md:gap-10">
          <div>
            <Eyebrow n="02">Vision</Eyebrow>
            <MaskReveal className="display t-md mt-8 max-w-[16ch]" lines={['Brands that feel', 'as good as the', 'ideas behind them.']} />
            <p className="mt-8 max-w-md text-soft">We picture a world where growing businesses can look and behave like the best in their field, because thoughtful design is no longer reserved for the largest budgets.</p>
          </div>
          <div className="md:mt-40">
            <Eyebrow n="03">Mission</Eyebrow>
            <MaskReveal className="display t-md mt-8 max-w-[16ch]" lines={['Strike the spark,', 'then keep it', 'burning.']} />
            <p className="mt-8 max-w-md text-soft">To combine human imagination with careful craft and modern technology, and to deliver work that is beautiful, useful and measurable.</p>
          </div>
        </div>
      </section>

      {/* 5. Creative approach: numbered horizontal rules */}
      <section className="section-y bg-void">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow n="04">Creative approach</Eyebrow>
              <MaskReveal className="display t-lg mt-6" lines={['How the', 'work happens.']} />
            </div>
            <ol className="lg:col-span-7 lg:col-start-6">
              {approach.map((a, i) => (
                <Reveal as="li" key={a.title} className="grid grid-cols-[3rem_1fr] gap-3 border-t border-white/10 py-5 last:border-b md:grid-cols-[4rem_1fr] md:gap-4 md:py-8">
                  <span className="font-display text-3xl text-spark">{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{a.title}</h3>
                    <p className="mt-2 text-soft">{a.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="mt-20">
            <CtaLink to="/process" variant="ghost">See the full process</CtaLink>
          </div>
        </div>
      </section>

      {/* 6. Capabilities: a compact typographic list */}
      <section className="section-y relative overflow-hidden bg-charcoal">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ImageReveal className="aspect-[16/9] rounded-[1rem]">
              <Picture src="/images/work/flintora-identity-4" width={1600} height={900} sizes="(min-width:1024px) 40vw, 100vw" alt="The FLINTORA colour palette: Void Black, Primary Spark, Solar Flare and Ember Depth" />
            </ImageReveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow n="05">Capabilities</Eyebrow>
            <h2 className="display t-md mt-6">What we do</h2>
            <ul className="mt-8 flex flex-wrap gap-x-2 gap-y-3 text-[clamp(1.1rem,0.9rem+0.8vw,1.6rem)] font-semibold leading-snug">
              {services.map((s, i) => (
                <li key={s.slug}>
                  <Link to={`/capabilities/${s.slug}`} className="link-line hover:text-spark">{s.name}</Link>
                  {i < services.length - 1 && <span aria-hidden className="ml-2 text-spark">/</span>}
                </li>
              ))}
            </ul>
            <h3 className="eyebrow mt-14 text-muted">Industries we design for</h3>
            <p className="mt-4 text-soft">{industries.join(' · ')}</p>
          </div>
        </div>
      </section>

      {/* 7 + 8. Founder, leadership and team */}
      <section className="section-y bg-void" aria-labelledby="people-title">
        <div className="shell">
          <Eyebrow n="06">People</Eyebrow>
          <MaskReveal id="people-title" className="display t-lg mt-6" lines={['The people', 'behind the work.']} />
          {team.length > 0 ? (
            <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <Reveal key={m.name}>
                  {m.image && (
                    <div className="aspect-[4/5] overflow-hidden rounded-[1rem] bg-surface">
                      <Picture src={m.image} width={800} height={1000} widths={[800]} sizes="(min-width:1024px) 30vw, 90vw" alt={`Portrait of ${m.name}`} />
                    </div>
                  )}
                  <h3 className="mt-5 text-xl font-semibold">{m.name}</h3>
                  <p className="text-sm text-spark">{m.role}</p>
                  <p className="mt-3 text-soft">{m.bio}</p>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-14 grid gap-10 lg:grid-cols-12">
              <p className="t-lead text-soft lg:col-span-5">
                Every FLINTORA project is led by one creative direction and staffed with the disciplines it needs. You work with the people doing the work, not a chain of account managers.
              </p>
              <ul className="grid gap-px overflow-hidden rounded-[1rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
                {disciplines.map((d) => (
                  <li key={d.role} className="bg-void p-5 md:p-7">
                    <h3 className="font-semibold text-white">{d.role}</h3>
                    <p className="mt-2 text-[0.92rem] text-soft">{d.text}</p>
                  </li>
                ))}
                <li className="flex items-end bg-spark p-7 text-void">
                  <Link to="/contact" className="group inline-flex items-center gap-2 font-semibold">
                    Talk to the team <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 9. Values: typographic grid on paper */}
      <section className="bg-paper text-ink">
        <div className="shell section-y">
          <Eyebrow n="07" className="text-[#a34b00]">Values</Eyebrow>
          <MaskReveal className="display t-lg mt-6 max-w-[14ch]" lines={['What we will', 'always protect.']} />
          <Reveal className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {values.map((v, i) => (
              <div key={v.title} className="border-t border-ink/15 pt-6">
                <span className="font-display text-sm text-[#a34b00]">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-ink/70">{v.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* At a glance: clear, factual summary (useful for people and answer engines alike) */}
      <section className="section-y bg-charcoal" aria-labelledby="glance-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>At a glance</Eyebrow>
            <h2 id="glance-title" className="display t-md mt-6">FLINTORA in brief</h2>
          </div>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {[
              ['Who we are', 'A creative and digital studio. Our name and mark come from flint: the stone that creates a spark.'],
              ['What we do', services.map((s) => s.name).join(', ') + '.'],
              ['Who we work with', 'Businesses and organisations that want a distinctive brand and a better digital presence, from new ventures to established companies.'],
              ['How we work', 'Discovery, research, strategy, creative direction, design, development, refinement and delivery.'],
              ['Tagline', company.tagline],
              ['Get in touch', 'Use the Start a Project page to describe your project, or see the Contact page for direct channels.'],
            ].map(([dt, dd]) => (
              <div key={dt} className="border-t border-white/10 pt-5">
                <dt className="eyebrow text-spark">{dt}</dt>
                <dd className="mt-3 text-soft">{dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 10. Collaboration CTA */}
      <section className="relative overflow-hidden bg-void">
        <EmberField density={0.6} />
        <div className="shell relative py-[clamp(3.5rem,2rem+10vw,12rem)]">
          <MaskReveal className="display t-xl max-w-[13ch]" lines={['Let us build', 'something', 'together.']} accent={[2]} />
          <div className="mt-12 flex flex-wrap gap-4">
            <CtaLink to="/start-a-project" size="lg">Start a project</CtaLink>
            <CtaLink to="/work" variant="ghost" size="lg">See our work</CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
