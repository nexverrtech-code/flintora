import { useEffect, useState } from 'react';

/** False during prerender and the hydration pass, true afterwards. */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
