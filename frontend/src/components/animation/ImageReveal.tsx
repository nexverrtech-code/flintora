import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { getGsap, isInView, prefersReducedMotion } from './gsap';
import { cn } from '@/utils/cn';

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Clip-path wipe with a slow inner zoom, then a subtle scroll-linked drift. */
export function ImageReveal({ children, className, from = 'bottom' }: { children: ReactNode; className?: string; from?: 'bottom' | 'left' | 'right' }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useIso(() => {
    const el = outer.current;
    const img = inner.current;
    if (!el || !img || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const clip = { bottom: 'inset(100% 0% 0% 0%)', left: 'inset(0% 100% 0% 0%)', right: 'inset(0% 0% 0% 100%)' }[from];
    const ctx = gsap.context(() => {
      if (!isInView(el)) {
        gsap.from(el, { clipPath: clip, duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
        gsap.from(img, { scale: 1.25, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      }
      gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    }, el);
    return () => ctx.revert();
  }, [from]);
  return (
    <div ref={outer} className={cn('relative overflow-hidden', className)} style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
      <div ref={inner} className="h-[108%] w-full -translate-y-[4%] will-change-transform">
        {children}
      </div>
    </div>
  );
}
