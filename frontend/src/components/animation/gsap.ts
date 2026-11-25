import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;
export function getGsap() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True when the element is already (partly) on screen. Those are not hidden for a reveal, to avoid a flash. */
export const isInView = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight * 0.92 && r.bottom > 0;
};
