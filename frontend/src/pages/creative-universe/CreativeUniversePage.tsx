import { Link } from 'react-router';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Lines } from '@/components/common/Display';
import { EmberField } from '@/components/interactive/EmberField';
import { SolarSystem } from '@/components/interactive/SolarSystem';
import { services } from '@/data/services';

/*
 * THE CREATIVE UNIVERSE
 * The full-page version of the FLINTORA solar system (see components/interactive/SolarSystem).
 * The same system also appears on the home page.
 */

export default function CreativeUniversePage() {
  const crumbs = [{ name: 'Creative Universe', path: '/creative-universe' }];
  return (
    <>
      <Seo
        path="/creative-universe"
        title="Creative Universe"
        description="Explore FLINTORA's creative disciplines around a single spark: brand, web, UI/UX, marketing, SEO, content, photography, automation and digital transformation."
        breadcrumbs={crumbs}
      />
      <section className="relative overflow-hidden bg-void pt-[calc(var(--header-h)+2.5rem)]">
        <EmberField density={0.7} />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 grid items-end gap-6 lg:grid-cols-12">
            <h1 className="display hero-rise t-lg lg:col-span-7">
              <Lines lines={['One spark.', 'Many disciplines.']} accent={[0]} />
            </h1>
            <p className="hero-fade text-soft lg:col-span-5" style={{ ['--d' as string]: '0.4s' }}>
              Every discipline we practise orbits the same idea. Hover, tap or use your arrow keys to explore a planet. Select it again to open its page.
            </p>
          </div>
        </div>

        <div className="shell relative pb-20 pt-6 lg:pb-28">
          <SolarSystem />
        </div>
      </section>

      {/* Plain list for quick scanning */}
      <section aria-labelledby="all-title" className="border-t border-white/10 bg-charcoal py-16">
        <div className="shell">
          <h2 id="all-title" className="eyebrow text-muted">All disciplines</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {services.map((sv) => (
              <li key={sv.slug}>
                <Link to={`/capabilities/${sv.slug}`} className="inline-block rounded-full border border-white/15 px-4 py-2 text-[0.9rem] text-soft transition-colors hover:border-spark hover:text-white">
                  {sv.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
