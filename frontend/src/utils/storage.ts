// Safe wrappers: storage can be unavailable (private mode, blocked site data, SSR).
export const storage = {
  get<T>(key: string, fallback: T, area: 'local' | 'session' = 'local'): T {
    try {
      if (typeof window === 'undefined') return fallback;
      const raw = (area === 'local' ? localStorage : sessionStorage).getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown, area: 'local' | 'session' = 'local') {
    try {
      (area === 'local' ? localStorage : sessionStorage).setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  },
  remove(key: string, area: 'local' | 'session' = 'local') {
    try {
      (area === 'local' ? localStorage : sessionStorage).removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

/** Hand-off between the planning tools and the Start a Project form (session only). */
export const PROJECT_PREFILL_KEY = 'flintora:project-prefill';
export interface ProjectPrefill {
  services?: string[];
  description?: string;
  budget?: string;
  timeline?: string;
  industry?: string;
  source?: string;
}
