import { useLayoutEffect as useLE, useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { getGsap, isInView, prefersReducedMotion } from './gsap';
import { Lines } from '@/components/common/Display';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLE;

interface Props {
  as?: ElementType;
  lines: string[];
  accent?: number[];
  className?: string;
  delay?: number;
  id?: string;
  children?: ReactNode;
}

/** Display headline whose lines rise from behind a mask as they scroll into view. */
export function MaskReveal({ as: Tag = 'h2', lines, accent, className, delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isInView(el)) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.mask-line > span:not(.sr-only)'), {
        yPercent: 115,
        rotate: 3,
        duration: 1.25,
        ease: 'expo.out',
        stagger: 0.09,
        delay,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay]);
  return (
    <Tag ref={ref} id={id} className={className}>
      <Lines lines={lines} accent={accent} />
    </Tag>
  );
}
