import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Eyebrow } from '@/components/common/Eyebrow';
import { CtaLink } from '@/components/common/CtaLink';
import { Lines } from '@/components/common/Display';
import { Faq } from '@/components/common/Faq';
import { MaskReveal } from '@/components/animation/MaskReveal';
import { Reveal } from '@/components/animation/Reveal';
import { ServiceArt } from '@/components/art/ServiceArt';
import { services } from '@/data/services';
import { useFinePointer, useReducedMotionPref } from '@/hooks/useMediaQuery';
import { faqSchema } from '@/utils/schema';
import { cn } from '@/utils/cn';

const faqs = [
  { q: 'Can we hire FLINTORA for just one service?', a: 'Yes. Many projects start with a single discipline, such as a brand identity or a website. Others combine several under one creative direction.' },
  { q: 'How do you decide which services a project needs?', a: 'We start with your goals, not our service list. A short discovery conversation usually makes the right mix obvious. The Brand Transformation Studio on this site is a quick way to explore it yourself.' },
  { q: 'Do you work with existing in-house teams?', a: 'Yes. We can lead, support or fill specific gaps, and we hand over files and documentation your team can use.' },
  { q: 'Where are you based and who do you work with?', a: 'We work with clients remotely and in person. Get in touch with your location and project and we will tell you how we can work together.' },
];

/** Index rows with a preview that follows the cursor on desktop. */
function ServiceIndex() {
  const fine = useFinePointer();
  const reduce = useReducedMotionPref();
  const [hover, setHover] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    if (!fine || reduce) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
    };
    const tick = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.14;
      p.y += (p.ty - p.y) * 0.14;
      if (preview.current) preview.current.style.transform = `translate3d(${p.x + 28}px, ${p.y - 140}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduce]);

  return (
    <div className="relative" onMouseLeave={() => setHover(null)}>
      <ol className="border-t border-white/10">
        {services.map((s, i) => (
          <li key={s.slug} className="border-b border-white/10">
            <Link
              to={`/capabilities/${s.slug}`}
              onMouseEnter={() => setHover(i)}
              className="group grid gap-x-8 gap-y-3 py-8 md:grid-cols-[5rem_minmax(0,1.1fr)_minmax(0,1fr)_3rem] md:items-center md:py-10"
            >
              <span className="font-display text-spark">{s.n}</span>
              <span className="text-[clamp(1.6rem,1.1rem+2.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.02em] transition-[color,transform] duration-500 ease-[var(--ease-silk)] group-hover:translate-x-3 group-hover:text-spark group-focus-visible:text-spark">
                {s.name}
              </span>
              <span className="text-soft md:text-[0.95rem]">{s.short}</span>
              <span className="hidden size-12 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-spark group-hover:bg-spark group-hover:text-void md:grid">
                <ArrowUpRight aria-hidden className="size-5" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
      {fine && !reduce && (
        <div ref={preview} aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[22rem] md:block">
          <div className={cn('aspect-[4/3] overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] transition-[opacity,transform] duration-500 ease-[var(--ease-silk)]', hover === null ? 'scale-90 opacity-0' : 'scale-100 opacity-100')}>
            {services.map((s, i) => (
              <div key={s.slug} className={cn('absolute inset-0 transition-opacity duration-300', hover === i ? 'opacity-100' : 'opacity-0')}>
                <ServiceArt art={s.art} className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CapabilitiesPage() {
  const crumbs = [{ name: 'Capabilities', path: '/capabilities' }];
  return (
    <>
      <Seo
        path="/capabilities"
        title="Capabilities"
        pageType="CollectionPage"
        description="Nine disciplines, one studio: brand identity, websites, UI/UX, digital marketing, SEO, content, photography and video, automation and digital transformation."
        breadcrumbs={crumbs}
        schema={[faqSchema(faqs)]}
      />
      <section className="relative overflow-hidden bg-void pb-16 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+7rem)]">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
            <h1 className="display hero-rise t-hero lg:col-span-8">
              <Lines lines={['Nine', 'disciplines.', 'One spark.']} accent={[2]} />
            </h1>
            <p className="hero-fade t-lead text-soft lg:col-span-4" style={{ ['--d' as string]: '0.5s' }}>
              Strategy, design, technology and growth under one roof. Choose a single discipline or bring several together under one creative direction.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="All capabilities" className="bg-void pb-[clamp(3rem,1.5rem+8vw,10rem)]">
        <div className="shell">
          <ServiceIndex />
        </div>
      </section>

      {/* Two ways to explore */}
      <section className="bg-paper text-ink">
        <div className="shell section-y grid gap-6 md:grid-cols-2">
          <Reveal className="flex flex-col justify-between gap-12 rounded-[1.25rem] bg-ink p-10 text-paper md:p-14">
            <div>
              <Eyebrow>Explore visually</Eyebrow>
              <h2 className="display t-md mt-6">Creative Universe</h2>
              <p className="mt-4 max-w-sm text-paper/70">See how every discipline connects to a single spark, then dive into the one that fits.</p>
            </div>
            <CtaLink to="/creative-universe">Enter the universe</CtaLink>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-between gap-12 rounded-[1.25rem] border border-ink/15 p-10 md:p-14">
            <div>
              <Eyebrow className="text-[#a34b00]">Not sure where to start?</Eyebrow>
              <h2 className="display t-md mt-6">Brand Studio</h2>
              <p className="mt-4 max-w-sm text-ink/70">Answer six quick questions and get a transparent suggestion of the support that fits your situation.</p>
            </div>
            <CtaLink to="/brand-studio" variant="outlineDark">Try the Brand Studio</CtaLink>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-void">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <MaskReveal className="display t-md mt-6" lines={['Working', 'with us.']} />
          </div>
          <Faq items={faqs} className="lg:col-span-7 lg:col-start-6" />
        </div>
      </section>
    </>
  );
}
