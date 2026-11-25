import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/footer/Footer';
import { SmoothScroll, useLenis } from '@/components/layout/SmoothScroll';
import { IntroContext } from '@/components/layout/IntroContext';
const SparkAwakening = lazy(() => import('@/components/3d/SparkAwakening').then((m) => ({ default: m.SparkAwakening })));

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function RouteEffects() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  const first = useRef(true);
  useIso(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (hash) return;
    lenis.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    // Move focus to the new page for keyboard and screen reader users.
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);
  useEffect(() => {
    const t = window.setTimeout(() => {
      import('@/components/animation/gsap').then(({ getGsap }) => getGsap().ScrollTrigger.refresh());
    }, 400);
    return () => window.clearTimeout(t);
  }, [pathname]);
  return null;
}

function RouteFallback() {
  return (
    <div className="grid min-h-[100svh] place-items-center" role="status">
      <span className="sr-only">Loading page</span>
      <span aria-hidden className="h-px w-24 overflow-hidden bg-white/10">
        <span className="block h-full w-1/2 animate-[load_1s_ease-in-out_infinite] bg-spark" />
      </span>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  // The first render must match the prerendered HTML exactly (fully visible), so the fade only
  // applies to client-side navigations.
  const firstPaint = useRef(true);
  useEffect(() => {
    firstPaint.current = false;
  }, []);
  const [introDone, setIntroDone] = useState(true);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('intro-pending')) {
      setIntroDone(false);
      setShowIntro(true);
    }
  }, []);

  const finishIntro = () => {
    document.documentElement.classList.remove('intro-pending');
    setIntroDone(true);
    setShowIntro(false);
  };

  return (
    <>
      <IntroContext.Provider value={{ done: introDone, setDone: finishIntro }}>
        <SmoothScroll>
          <a href="#main" className="sr-only z-[200] rounded-full bg-spark px-5 py-3 font-semibold text-void focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
            Skip to content
          </a>
          <RouteEffects />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            <Suspense fallback={<RouteFallback />}>
              <div key={pathname} className={firstPaint.current ? undefined : 'page-enter'}>
                {children}
              </div>
            </Suspense>
          </main>
          <Footer />
          {showIntro && (
            <Suspense fallback={null}>
              <SparkAwakening onDone={finishIntro} />
            </Suspense>
          )}
        </SmoothScroll>
      </IntroContext.Provider>
    </>
  );
}
