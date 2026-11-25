import { Link } from 'react-router';
import { Seo } from '@/components/common/Seo';
import { SparkMark } from '@/components/common/SparkMark';
import { CtaLink } from '@/components/common/CtaLink';
import { EmberField } from '@/components/interactive/EmberField';
import { useLocation } from 'react-router';

export default function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <>
      <Seo path={pathname === '/404' ? '/404' : pathname} title="Page not found" description="The page you were looking for could not be found." noindex />
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-void pt-[var(--header-h)]">
        <EmberField density={0.6} />
        <div aria-hidden className="absolute right-[8%] top-1/2 -translate-y-1/2 opacity-[0.12] max-md:hidden">
          <SparkMark className="h-[60vh] w-auto animate-[flicker_3.2s_steps(1)_infinite]" />
        </div>
        <div className="shell relative">
          <p className="eyebrow text-spark">Error 404</p>
          <h1 className="display t-hero mt-6 max-w-[10ch]">No spark here.</h1>
          <p className="t-lead mt-8 max-w-[38ch] text-soft">The page you were looking for has moved or never existed. Here are a few places to start instead.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <CtaLink to="/">Back to home</CtaLink>
            <CtaLink to="/work" variant="ghost">See our work</CtaLink>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-soft">
            {[['Capabilities', '/capabilities'], ['About', '/about'], ['Process', '/process'], ['Contact', '/contact']].map(([l, to]) => (
              <li key={to}><Link to={to} className="link-line hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
