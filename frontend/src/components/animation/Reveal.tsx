import { useEffect, useLayoutEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from 'react';
import { getGsap, isInView, prefersReducedMotion } from './gsap';

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect;

interface Props {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number; // when set, animates direct children in sequence
  style?: CSSProperties;
  id?: string;
}

/** Gentle fade and rise on scroll. Content is visible without JavaScript. */
export function Reveal({ as: Tag = 'div', children, className, delay = 0, y = 36, stagger, style, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useIso(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isInView(el)) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(stagger ? el.children : el, {
        autoAlpha: 0,
        y,
        duration: 1.1,
        ease: 'power3.out',
        delay,
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, y, stagger]);
  return (
    <Tag ref={ref} className={className} style={style} id={id}>
      {children}
    </Tag>
  );
}
