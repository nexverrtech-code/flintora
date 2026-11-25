import { useEffect, useRef, type ReactNode } from 'react';
import { getGsap, prefersReducedMotion } from './gsap';

interface Props {
  children: ReactNode;
  className?: string;
  /** Distance in % of the element's height travelled across the viewport. Negative moves up. */
  speed?: number;
  rotate?: number;
  scale?: [number, number];
}

/** Scroll-scrubbed parallax layer. */
export function Parallax({ children, className, speed = 12, rotate = 0, scale }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed / 2, rotate: -rotate / 2, scale: scale?.[0] ?? 1 },
        {
          yPercent: speed / 2,
          rotate: rotate / 2,
          scale: scale?.[1] ?? 1,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [speed, rotate, scale]);
  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
