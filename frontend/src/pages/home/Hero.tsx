import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { CtaLink } from '@/components/common/CtaLink';
import { Lines } from '@/components/common/Display';
import { SparkMark } from '@/components/common/SparkMark';
import { useIdle } from '@/hooks/useIdle';
import { useIsDesktop, useReducedMotionPref } from '@/hooks/useMediaQuery';
import { useIntro } from '@/components/layout/IntroContext';
import { cn } from '@/utils/cn';

const HeroScene = lazy(() => import('@/components/3d/HeroScene'));

function canWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export function Hero() {
  const idle = useIdle();
  const reduce = useReducedMotionPref();
  const desktop = useIsDesktop();
  const { done } = useIntro();
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setWebgl(canWebGL()), []);
  const show3d = idle && webgl && !reduce && done;

  useEffect(() => {
    if (!show3d) return;
    const t = window.setTimeout(() => setReady(true), 250);
    return () => window.clearTimeout(t);
  }, [show3d]);

  return (
    <section aria-labelledby="hero-title" className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-void">
      {/* Atmosphere */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-[58%] top-1/2 size-[min(120vw,1300px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,128,13,0.2),rgba(255,128,13,0.05)_38%,transparent_66%)] max-lg:left-1/2 max-lg:top-[30%]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void to-transparent" />
      </div>

      {/* Static composition: always present for first paint, no-JS and reduced motion */}
      <div aria-hidden className={cn('absolute inset-0 transition-opacity duration-[1.4s]', ready && 'opacity-0')}>
        <SparkMark className="absolute right-[12%] top-1/2 h-[min(40vh,26rem)] w-auto -translate-y-1/2 drop-shadow-[0_40px_90px_rgba(255,128,13,0.45)] max-lg:right-1/2 max-lg:top-[22%] max-lg:h-[17vh] max-lg:translate-x-1/2" />
      </div>

      {show3d && (
        <div aria-hidden className={cn('absolute inset-0 opacity-0 transition-opacity duration-[1.6s]', ready && 'opacity-100')}>
          <Suspense fallback={null}>
            <HeroScene key={desktop ? 'desktop' : 'compact'} compact={!desktop} />
          </Suspense>
        </div>
      )}

      <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-24 pt-[calc(var(--header-h)+30vh)] lg:justify-center lg:pb-28 lg:pt-[var(--header-h)]">
        <p className="eyebrow hero-fade mb-7 flex items-center gap-3 text-spark" style={{ ['--d' as string]: '0.05s' }}>
          <span aria-hidden className="h-px w-8 bg-current" /> Creative &amp; digital studio
        </p>
        <h1 id="hero-title" className="display hero-rise max-w-[min(100%,46rem)] text-[clamp(2.4rem,1rem+4.2vw,5.2rem)] lg:max-w-[50%]">
          <Lines lines={['We create', "what's", 'next.']} accent={[1, 2]} />
        </h1>
        <p className="hero-fade t-lead mt-8 max-w-[34ch] text-soft" style={{ ['--d' as string]: '0.55s' }}>
          Creative thinking. Thoughtful design. Extraordinary digital experiences.
        </p>
        <div className="hero-fade mt-10 flex flex-wrap gap-4" style={{ ['--d' as string]: '0.7s' }}>
          <CtaLink to="/work">Explore Our Work</CtaLink>
          <CtaLink to="/contact" variant="ghost">Start a Conversation</CtaLink>
        </div>
      </div>

      <div className="shell relative z-10 hidden items-center justify-between pb-8 text-[0.78rem] text-muted md:flex">
        <a href="#philosophy" className="hero-fade flex items-center gap-3 hover:text-white" style={{ ['--d' as string]: '1s' }}>
          <span className="grid size-9 place-items-center rounded-full border border-white/15"><ArrowDown aria-hidden className="size-3.5 animate-bounce" /></span>
          Scroll to explore
        </a>
        <p className="hero-fade tracking-[0.18em] uppercase" style={{ ['--d' as string]: '1.1s' }}>Brand · Digital · Motion · Growth</p>
      </div>
    </section>
  );
}
