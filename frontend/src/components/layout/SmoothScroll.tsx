import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext<{ current: Lenis | null }>({ current: null });
export const useLenis = () => useContext(LenisContext);

/** Lenis smooth scrolling. Off for reduced motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Lenis scrolls the real window, so GSAP ScrollTrigger (loaded per page) stays in sync
    // through native scroll events. Keeping GSAP out of this file keeps it out of the main bundle.
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, anchors: { offset: -90 }, autoRaf: true });
    ref.current = lenis;
    return () => {
      lenis.destroy();
      ref.current = null;
    };
  }, []);

  return <LenisContext.Provider value={ref}>{children}</LenisContext.Provider>;
}
