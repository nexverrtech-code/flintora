import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import { matchPath } from 'react-router';
import { services } from '@/data/services';
import { projects } from '@/data/projects';

type Loader = () => Promise<{ default: ComponentType }>;

interface RouteDef {
  path: string;
  load: Loader;
  Component: LazyExoticComponent<ComponentType>;
}

const def = (path: string, load: Loader): RouteDef => ({ path, load, Component: lazy(load) });

// Route-based code splitting: every page is its own chunk.
export const routes: RouteDef[] = [
  def('/', () => import('@/pages/home/HomePage')),
  def('/about', () => import('@/pages/about/AboutPage')),
  def('/capabilities', () => import('@/pages/capabilities/CapabilitiesPage')),
  def('/capabilities/:slug', () => import('@/pages/services/ServicePage')),
  def('/work', () => import('@/pages/portfolio/WorkPage')),
  def('/work/:slug', () => import('@/pages/case-studies/CaseStudyPage')),
  def('/creative-universe', () => import('@/pages/creative-universe/CreativeUniversePage')),
  def('/process', () => import('@/pages/process/ProcessPage')),
  def('/contact', () => import('@/pages/contact/ContactPage')),
  def('/privacy-policy', () => import('@/pages/legal/PrivacyPage')),
  def('/terms', () => import('@/pages/legal/TermsPage')),
];

export const notFound = def('*', () => import('@/pages/not-found/NotFoundPage'));

/** Warm the chunk for a URL before hydrating, so the prerendered HTML is adopted without a flash. */
export function preloadRoute(pathname: string) {
  const r = routes.find((r) => matchPath(r.path, pathname)) ?? notFound;
  return r.load();
}

/** Every URL that is prerendered to static HTML and listed in the sitemap. */
export const staticPaths = [
  '/',
  '/about',
  '/capabilities',
  ...services.map((s) => `/capabilities/${s.slug}`),
  '/work',
  ...projects.map((p) => `/work/${p.slug}`),
  '/creative-universe',
  '/process',
  '/contact',
  '/privacy-policy',
  '/terms',
];
