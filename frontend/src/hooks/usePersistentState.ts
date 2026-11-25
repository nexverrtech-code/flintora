import { useEffect, useRef, useState } from 'react';
import { storage } from '@/utils/storage';

/**
 * State that can optionally be remembered in localStorage.
 * Starts from `initial` on the server and first client render, then restores (if `remember`).
 */
export function usePersistentState<T>(key: string, initial: T, remember: boolean) {
  const [value, setValue] = useState<T>(initial);
  const restored = useRef(false);
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    if (remember) setValue(storage.get<T>(key, initial));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!restored.current) return;
    if (remember) storage.set(key, value);
    else storage.remove(key);
  }, [key, value, remember]);
  return [value, setValue] as const;
}
