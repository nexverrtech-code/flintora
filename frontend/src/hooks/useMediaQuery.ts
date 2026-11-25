import { useSyncExternalStore } from 'react';

/** SSR-safe media query hook. Returns `serverValue` during prerender and hydration. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const useReducedMotionPref = () => useMediaQuery('(prefers-reduced-motion: reduce)');
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
