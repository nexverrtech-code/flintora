import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Eyebrow } from '@/components/common/Eyebrow';
import { Lines } from '@/components/common/Display';
import { CtaLink } from '@/components/common/CtaLink';
import { VisualMedia } from '@/components/art/VisualMedia';
import { getGsap, prefersReducedMotion } from '@/components/animation/gsap';
import { projects } from '@/data/projects';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

// Home page "Selected work" section: a pinned horizontal gallery on desktop, a stacked list on
// phones. Currently not rendered on the home page (see HomePage.tsx for how to restore it).
/* ---------- 05 Selected works: pinned horizontal story on desktop ---------- */
export function SelectedWorks() {
  const desktop = useIsDesktop();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!desktop || prefersReducedMotion() || !wrap.current || !track.current) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: wrap.current, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
      });
    }, wrap);
    return () => ctx.revert();
  }, [desktop]);

  return (
    <section aria-labelledby="works-title" className="relative bg-charcoal">
      <div ref={wrap} className="overflow-hidden lg:flex lg:h-[100svh] lg:items-center">
        <div
          ref={track}
          className="flex flex-col gap-10 px-[var(--gutter)] py-14 lg:w-max lg:gap-16 lg:flex-row lg:items-center lg:gap-[4vw] lg:py-0 lg:pl-[max(var(--gutter),calc((100vw-var(--maxw))/2))] lg:pr-[10vw]"
        >
          <div className="shrink-0 lg:w-[32rem]">
            <Eyebrow n="03">Selected work</Eyebrow>
            <h2 id="works-title" className="display mt-6 text-[clamp(2rem,1rem+3.4vw,4.2rem)]">
              <Lines lines={['Our work', 'speaks through', 'details.']} accent={[2]} />
            </h2>
            <p className="mt-8 max-w-sm text-soft">In-house work and clearly labelled concept studies.<span className="hidden lg:inline"> Scroll to explore.</span></p>
          </div>
          {projects.map((p, i) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className={cn('group block shrink-0 lg:w-[min(48vw,52rem)]', i % 2 === 1 && 'lg:w-[min(36vw,40rem)] lg:translate-y-[8vh]', i > 2 && 'max-lg:hidden')}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem] bg-surface">
                <div className="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.04]">
                  <VisualMedia visual={p.cover} sizes="(min-width: 1024px) 48vw, 100vw" />
                </div>
                {p.kind === 'concept' && (
                  <span className="absolute left-4 top-4 rounded-full bg-void/75 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.12em] text-flare uppercase backdrop-blur">Concept study</span>
                )}
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-[clamp(1.25rem,1rem+1vw,1.9rem)] font-semibold leading-tight transition-colors group-hover:text-spark">{p.title}</h3>
                  <p className="mt-1 text-[0.92rem] text-muted max-md:hidden">{p.summary}</p>
                </div>
                <span className="shrink-0 text-[0.75rem] tracking-[0.14em] text-soft uppercase">{p.categories[0]} · {p.year}</span>
              </div>
            </Link>
          ))}
          <div className="shrink-0 lg:w-[24rem]">
            <p className="display t-md">Every project starts with a question.</p>
            <CtaLink to="/work" className="mt-8" variant="ghost">View all work</CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

