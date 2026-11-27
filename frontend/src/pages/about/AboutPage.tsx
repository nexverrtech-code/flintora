import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Eyebrow } from '@/components/common/Eyebrow';
import { CtaLink } from '@/components/common/CtaLink';
import { Lines } from '@/components/common/Display';
import { MaskReveal } from '@/components/animation/MaskReveal';
import { Reveal } from '@/components/animation/Reveal';
import { ImageReveal } from '@/components/animation/ImageReveal';
import { StockPhoto } from '@/components/common/StockPhoto';
import { EmberField } from '@/components/interactive/EmberField';
import { company, values } from '@/data/company';
import { team } from '@/data/team';
import { FloatingStones } from '@/components/common/FloatingStones';
import { personSchema } from '@/utils/schema';

export default function AboutPage() {
  const crumbs = [{ name: 'About', path: '/about' }];
  return (
    <>
      <Seo
        path="/about"
        title="About Us"
        pageType="AboutPage"
        description="Meet FLINTORA, a creative and digital studio. The philosophy, vision, mission and values behind our work."
        breadcrumbs={crumbs}
        schema={team.map(personSchema)}
      />

      {/* Introduction */}
      <section className="grain relative overflow-hidden bg-void pb-16 pt-[calc(var(--header-h)+3rem)] md:pb-24 md:pt-[calc(var(--header-h)+6rem)]">
        <div aria-hidden className="absolute -right-[10%] top-[10%] size-[60rem] rounded-full bg-[radial-gradient(circle,rgba(255,128,13,0.14),transparent_62%)]" />
        <FloatingStones preset="right" />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <h1 className="display hero-rise t-hero mt-8 max-w-[12ch]">
            <Lines lines={['A studio', 'built around', 'the spark.']} accent={[2]} />
          </h1>
          <p className="hero-fade t-lead mt-10 max-w-[46ch] text-soft md:ml-[40%]" style={{ ['--d' as string]: '0.5s' }}>
            {company.summary}
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-paper text-ink">
        <div className="shell section-y grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow n="01" className="text-[#a34b00]">Philosophy</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <Reveal as="blockquote" className="text-[clamp(1.4rem,1rem+2vw,2.8rem)] font-light leading-[1.25] tracking-[-0.01em]">
              “Flint does nothing on its own. Strike it at the right angle and it throws a spark that can start something much bigger. We exist to find that angle for every brand we work with.”
            </Reveal>
            <Reveal as="p" className="mt-8 max-w-[60ch] text-ink/70">
              {company.brandConcept}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Image band */}
      <section className="bg-paper pb-[clamp(3rem,2rem+4vw,6rem)]">
        <div className="shell">
          <ImageReveal className="aspect-[16/9] rounded-[1.25rem] md:aspect-[21/9]">
            <StockPhoto name="about" ratio="21:9" sizes="(min-width:1360px) 1360px, 100vw" className="h-full w-full" />
          </ImageReveal>
        </div>
      </section>

      {/* Vision and mission */}
      <section className="relative overflow-hidden bg-charcoal">
        <div className="shell section-y grid gap-14 md:grid-cols-2 md:gap-10">
          <div>
            <Eyebrow n="02">Vision</Eyebrow>
            <MaskReveal className="display t-md mt-6 max-w-[16ch]" lines={['Brands that feel', 'as good as the', 'ideas behind them.']} />
            <p className="mt-6 max-w-md text-soft">Thoughtful design should not be reserved for the biggest budgets. Growing businesses deserve to look and behave like the best in their field.</p>
          </div>
          <div className="md:mt-32">
            <Eyebrow n="03">Mission</Eyebrow>
            <MaskReveal className="display t-md mt-6 max-w-[16ch]" lines={['Strike the spark,', 'then keep it', 'burning.']} />
            <p className="mt-6 max-w-md text-soft">Combine human imagination, careful craft and modern technology to deliver work that is beautiful, useful and measurable.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-void">
        <div className="shell section-y">
          <Eyebrow n="04">Values</Eyebrow>
          <MaskReveal className="display t-lg mt-6 max-w-[14ch]" lines={['What we', 'stand for.']} />
          <Reveal className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {values.slice(0, 4).map((v, i) => (
              <div key={v.title} className="border-t border-white/10 pt-5">
                <span className="font-display text-sm text-spark">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-[0.95rem] text-soft">{v.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Collaboration */}
      <section className="relative overflow-hidden bg-charcoal">
        <EmberField density={0.6} />
        <div className="shell relative py-[clamp(3.5rem,2rem+8vw,10rem)]">
          <MaskReveal className="display t-xl max-w-[13ch]" lines={['Let us build', 'something', 'together.']} accent={[2]} />
          <div className="mt-10 flex flex-wrap gap-4">
            <CtaLink to="/contact" size="lg">Start a project</CtaLink>
            <CtaLink to="/process" variant="ghost" size="lg">How we work</CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
