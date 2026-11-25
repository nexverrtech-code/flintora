import { Link } from 'react-router';
import { ArrowUp } from 'lucide-react';
import { SparkMark } from '@/components/common/SparkMark';
import { company, socialLinks, addressLines } from '@/data/company';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { primaryNav, toolsNav } from '@/routes/navigation';
import { useLenis } from '@/components/layout/SmoothScroll';

const year = new Date().getFullYear();

export function Footer() {
  const lenis = useLenis();
  const toTop = () => {
    if (lenis.current) lenis.current.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };
  const contactLines = [
    company.contact.email && { label: company.contact.email, href: `mailto:${company.contact.email}` },
    company.contact.phone && { label: company.contact.phone, href: `tel:${company.contact.phone.replace(/[^\d+]/g, '')}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-charcoal pb-[env(safe-area-inset-bottom)]">
      <div className="pointer-events-none absolute -right-24 -top-40 size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,128,13,0.12),transparent_65%)]" aria-hidden />
      <div className="shell relative pt-14 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-4" aria-label="FLINTORA, home">
              <SparkMark className="h-14 w-auto" />
              <span className="display text-3xl tracking-[0.06em]">Flintora</span>
            </Link>
            <p className="display mt-8 text-xl text-spark">Where ideas spark.</p>
            <p className="mt-5 max-w-sm text-[0.95rem] text-soft">{company.summary}</p>
            {contactLines.length > 0 && (
              <ul className="mt-8 space-y-1.5">
                {contactLines.map((c) => (
                  <li key={c.href}><a href={c.href} className="link-line text-lg text-white">{c.label}</a></li>
                ))}
              </ul>
            )}
            {addressLines.length > 0 && <address className="mt-4 not-italic text-sm text-muted">{addressLines.join(', ')}</address>}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:col-span-8">
            <div>
              <h2 className="eyebrow mb-5 text-muted">Studio</h2>
              <ul className="space-y-2.5 text-[0.92rem]">
                {primaryNav.map((n) => (
                  <li key={n.to}><Link to={n.to} className="link-line text-soft hover:text-white">{n.label}</Link></li>
                ))}
                <li><Link to="/start-a-project" className="link-line text-soft hover:text-white">Start a project</Link></li>
              </ul>
            </div>
            <div className="max-md:hidden">
              <h2 className="eyebrow mb-5 text-muted">Capabilities</h2>
              <ul className="space-y-2.5 text-[0.92rem]">
                {services.map((s) => (
                  <li key={s.slug}><Link to={`/capabilities/${s.slug}`} className="link-line text-soft hover:text-white">{s.name}</Link></li>
                ))}
              </ul>
            </div>
            <div className="max-md:hidden">
              <h2 className="eyebrow mb-5 text-muted">Portfolio</h2>
              <ul className="space-y-2.5 text-[0.92rem]">
                {projects.map((p) => (
                  <li key={p.slug}><Link to={`/work/${p.slug}`} className="link-line text-soft hover:text-white">{p.title}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-5 text-muted">Tools</h2>
              <ul className="space-y-2.5 text-[0.92rem]">
                {toolsNav.map((t) => (
                  <li key={t.to}><Link to={t.to} className="link-line text-soft hover:text-white">{t.label}</Link></li>
                ))}
              </ul>
              {socialLinks.length > 0 && (
                <>
                  <h2 className="eyebrow mb-5 mt-10 text-muted">Follow</h2>
                  <ul className="space-y-2.5 text-[0.92rem]">
                    {socialLinks.map((s) => (
                      <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer me" className="link-line text-soft hover:text-white">{s.name}</a></li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </nav>
        </div>

        <p aria-hidden className="display pointer-events-none mt-12 select-none whitespace-nowrap text-center text-[clamp(2.2rem,12.4vw,14rem)] leading-[0.78] tracking-[0.02em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.13)] md:mt-28">
          Flintora
        </p>

        <div className="mt-8 flex flex-col gap-5 border-t border-white/[0.07] py-8 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {company.name}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-6">
            <li><Link to="/privacy-policy" className="link-line hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="link-line hover:text-white">Terms &amp; Conditions</Link></li>
            <li>
              <button type="button" onClick={toTop} className="inline-flex items-center gap-2 hover:text-white">
                Back to top <ArrowUp aria-hidden className="size-3.5" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
