import { useEffect, useRef, type ReactNode } from 'react';
import { prefersReducedMotion } from './gsap';

/** Gently pulls its child toward the cursor on desktop pointers. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => (el.style.transform = `translate3d(${x}px, ${y}px, 0)`));
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}>
      {children}
    </span>
  );
}
