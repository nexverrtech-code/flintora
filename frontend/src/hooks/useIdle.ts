import { useEffect, useState } from 'react';

/** Becomes true once the browser is idle after load. Used to defer heavy modules such as 3D. */
export function useIdle(timeout = 1200) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    let id: number;
    const go = () => setIdle(true);
    const start = () => {
      if (w.requestIdleCallback) id = w.requestIdleCallback(go, { timeout });
      else id = window.setTimeout(go, 300);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      window.clearTimeout(id);
    };
  }, [timeout]);
  return idle;
}
