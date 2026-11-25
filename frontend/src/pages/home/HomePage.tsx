import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Hero } from './Hero';
import { MaskReveal } from '@/components/animation/MaskReveal';
import { Reveal } from '@/components/animation/Reveal';
import { Parallax } from '@/components/animation/Parallax';
import { ImageReveal } from '@/components/animation/ImageReveal';
import { getGsap, prefersReducedMotion } from '@/components/animation/gsap';
import { Eyebrow } from '@/components/common/Eyebrow';
import { CtaLink } from '@/components/common/CtaLink';
import { Picture } from '@/components/common/Picture';
import { ServiceArt } from '@/components/art/ServiceArt';
import { EmberField } from '@/components/interactive/EmberField';
import { services } from '@/data/services';
import { stages } from '@/data/process';
import { company, values } from '@/data/company';
import { cn } from '@/utils/cn';

/* ---------- 03 Brand introduction ---------- */
function Philosophy() {
  const path = useRef<SVGPathElement>(null);
  useEffect(() => {
    const el = path.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const len = el.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { strokeDasharray: len, strokeDashoffset: len }, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: { trigger: el.closest('section'), start: 'top 70%', end: 'bottom 60%', scrub: 1 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="relative overflow-hidden bg-paper text-ink">
      <svg aria-hidden viewBox="0 0 1440 900" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
        <path ref={path} d="M-20 760 C 280 700, 420 520, 640 520 S 980 640, 1120 380 S 1360 120, 1460 90" fill="none" stroke="#FF800D" strokeWidth="2" />
      </svg>
      <div className="shell section-y relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow n="01" className="text-[#a34b00]">Philosophy</Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <MaskReveal id="philosophy-title" className="display t-xl max-w-[14ch]" lines={['Every great idea', 'begins with', 'a spark.']} accent={[2]} />
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <Parallax speed={18} rotate={-6} className="relative mx-auto aspect-square w-[min(62%,26rem)] md:w-[min(100%,26rem)]">
              <div aria-hidden className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(255,169,18,0.55),rgba(255,128,13,0.12)_50%,transparent_70%)] blur-md" />
              <Picture src="/images/flint-stone" widths={[600, 1200]} width={1200} height={1200} sizes="(min-width: 1024px) 26rem, 80vw" alt="Two halves of a flint stone split by a glowing orange crack" className="relative block" imgClassName="object-contain" />
            </Parallax>
          </div>
          <Reveal className="grid content-start gap-8 lg:col-span-6 lg:col-start-7 md:grid-cols-2" stagger={0.12}>
            <p className="t-lead md:col-span-2">
              Flint does nothing on its own. Struck at the right angle, it throws a spark that can light something much bigger. That moment is the idea behind our name, and behind the way we work.
            </p>
            <p className="text-ink/70 max-md:hidden">
              We begin every project by looking for the angle: the insight, the story or the small detail that makes a brand impossible to confuse with anyone else.
            </p>
            <p className="text-ink/70 max-md:hidden">
              Then we craft it with care across identity, digital products, campaigns and content, so the spark carries all the way to the people you want to reach.
            </p>
            <div className="md:col-span-2">
              <CtaLink to="/about" variant="outlineDark">How we think</CtaLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 Capabilities: interactive editorial index ---------- */
function Capabilities() {
  const [active, setActive] = useState(0);
  const s = services[active];
  return (
    <section aria-labelledby="cap-title" className="section-y relative bg-void">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="min-w-[min(100%,34rem)] flex-1">
            <Eyebrow n="02">Capabilities</Eyebrow>
            <MaskReveal id="cap-title" className="display t-xl mt-6" lines={['Creativity,', 'with purpose.']} />
          </div>
          <Reveal className="max-w-sm text-soft">
            <p>Nine disciplines, one studio. Each starts from strategy and ends with something you can see, use and measure.</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
          <ol className="lg:col-span-7" onMouseLeave={() => undefined}>
            {services.map((svc, i) => (
              <li key={svc.slug} className="border-t border-white/10 last:border-b">
                <Link
                  to={`/capabilities/${svc.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-3.5 md:grid-cols-[3rem_1fr_auto] md:gap-4 md:py-6"
                >
                  <span className={cn('font-display text-sm transition-colors', active === i ? 'text-spark' : 'text-muted')}>{svc.n}</span>
                  <span>
                    <span className={cn('block text-[clamp(1.3rem,1rem+1.6vw,2.3rem)] font-semibold leading-tight tracking-[-0.01em] transition-[color,transform] duration-500 ease-[var(--ease-silk)] group-hover:translate-x-2', active === i ? 'text-white' : 'text-white/55')}>
                      {svc.name}
                    </span>
                    <span className="mt-2 hidden max-w-[46ch] text-[0.92rem] text-muted md:block lg:hidden">{svc.short}</span>
                  </span>
                  <ArrowUpRight aria-hidden className={cn('size-5 transition-all duration-500', active === i ? 'text-spark opacity-100' : 'opacity-30')} />
                </Link>
              </li>
            ))}
          </ol>
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-white/10">
                {services.map((svc, i) => (
                  <div key={svc.slug} className={cn('absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-silk)]', i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0')}>
                    <ServiceArt art={svc.art} className="h-full w-full" />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-soft" aria-live="polite">{s.short}</p>
              <Link to={`/capabilities/${s.slug}`} className="link-line mt-4 inline-flex items-center gap-2 font-semibold text-spark">
                Explore {s.name} <ArrowUpRight aria-hidden className="size-4" />
              </Link>
              <p className="mt-10 text-sm text-muted">
                Prefer to explore visually? <Link to="/creative-universe" className="link-line text-white">Enter the Creative Universe</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 06 The human creative process: scroll-linked timeline ---------- */
function ProcessTimeline() {
  const line = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  useEffect(() => {
    if (!line.current || !list.current || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(line.current, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list.current, start: 'top 60%', end: 'bottom 60%', scrub: true } });
      list.current!.querySelectorAll('li').forEach((li) => {
        gsap.fromTo(li, { opacity: 0.25 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: li, start: 'top 75%', end: 'top 55%', scrub: true } });
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section aria-labelledby="process-title" className="section-y relative bg-void">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <Eyebrow n="03">Process</Eyebrow>
            <MaskReveal id="process-title" className="display mt-6 text-[clamp(2rem,1rem+3.2vw,4rem)]" lines={['Great work', 'comes from', 'great', 'thinking.']} accent={[3]} />
            <p className="mt-8 max-w-sm text-soft">Eight stages, from the first conversation to a confident handover. You always know where we are and what comes next.</p>
            <CtaLink to="/process" variant="ghost" className="mt-10">Our process in detail</CtaLink>
          </div>
        </div>
        <div className="relative lg:col-span-6 lg:col-start-7">
          <div aria-hidden className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-white/10">
            <div ref={line} className="h-full w-full origin-top bg-gradient-to-b from-spark to-flare" />
          </div>
          <ol ref={list} className="space-y-6 md:space-y-14">
            {stages.map((s) => (
              <li key={s.n} className="relative pl-14 md:pl-16">
                <span aria-hidden className="absolute left-0 top-0 grid size-[2.3rem] place-items-center rounded-full border border-white/15 bg-void font-display text-[0.75rem] text-spark">{s.n}</span>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm italic text-flare/80">{s.question}</p>
                <p className="mt-3 max-w-[48ch] text-soft max-md:hidden">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- 07 About preview ---------- */
function AboutPreview() {
  return (
    <section aria-labelledby="about-title" className="section-y relative overflow-hidden bg-charcoal">
      <div className="shell grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <ImageReveal className="aspect-[16/10] rounded-[1rem]">
            <Picture src="/images/work/flintora-identity-7" width={1600} height={900} sizes="(min-width: 1024px) 50vw, 100vw" alt="The FLINTORA identity on a business card, ID badge and sign" />
          </ImageReveal>
          <p className="mt-4 text-[0.8rem] text-muted max-md:hidden">Our own identity in use. From the FLINTORA brand book.</p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Eyebrow n="04">About</Eyebrow>
          <MaskReveal id="about-title" className="display t-lg mt-6" lines={['Creativity with', 'a clear purpose.']} />
          <p className="mt-8 text-soft">{company.summary}</p>
          <Reveal as="ul" className="mt-10 space-y-5 border-t border-white/10 pt-8 max-md:hidden" stagger={0.1}>
            {values.slice(0, 3).map((v) => (
              <li key={v.title} className="grid grid-cols-[1.5rem_1fr] gap-3">
                <span aria-hidden className="mt-2 h-2 w-3 bg-spark [clip-path:polygon(30%_0,100%_0,70%_100%,0_100%)]" />
                <span><strong className="font-semibold text-white">{v.title}.</strong> <span className="text-soft">{v.text}</span></span>
              </li>
            ))}
          </Reveal>
          <CtaLink to="/about" className="mt-10">Discover Our Story</CtaLink>
        </div>
      </div>
    </section>
  );
}

/* ---------- 08 Final conversion ---------- */
function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-void">
      <EmberField density={0.9} />
      <div aria-hidden className="absolute left-1/2 top-full size-[90rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,128,13,0.28),transparent_60%)]" />
      <div className="shell relative py-[clamp(4rem,2.5rem+12vw,15rem)] text-center">
        <Eyebrow className="justify-center">Start a conversation</Eyebrow>
        <MaskReveal id="cta-title" className="display t-xl mx-auto mt-8 max-w-[14ch]" lines={['Have something', 'in mind?']} />
        <Reveal>
          <p className="t-lead mx-auto mt-8 max-w-[36ch] text-soft">Let&rsquo;s turn your next idea into something extraordinary.</p>
          <div className="mt-12 flex justify-center">
            <CtaLink to="/start-a-project" size="lg">Start a Conversation</CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Seo
        path="/"
        title="Home"
        description="FLINTORA is a creative and digital studio: brand identity, websites, UI/UX, digital marketing, SEO, content, photography and automation. Where Ideas Spark."
      />
      <Hero />
      <Philosophy />
      <Capabilities />
      {/* Selected Works is hidden on the home page. To restore it: import { SelectedWorks } from './SelectedWorks' and render <SelectedWorks /> here. */}
      <ProcessTimeline />
      <AboutPreview />
      <FinalCta />
    </>
  );
}
