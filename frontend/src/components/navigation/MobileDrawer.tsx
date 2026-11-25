import { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router';
import { primaryNav, toolsNav } from '@/routes/navigation';
import { company, socialLinks } from '@/data/company';
import { CtaLink } from '@/components/common/CtaLink';
import { useLenis } from '@/components/layout/SmoothScroll';
import { cn } from '@/utils/cn';

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const l = lenis.current;
    l?.stop();
    document.documentElement.style.overflow = 'hidden';
    const first = panel.current?.querySelector<HTMLElement>('a, button');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panel.current) {
        // Keep focus inside the drawer (the toggle button lives in the header, so include it).
        const toggle = document.querySelector<HTMLElement>('[aria-controls="mobile-drawer"]');
        const items = [...panel.current.querySelectorAll<HTMLElement>('a, button'), ...(toggle ? [toggle] : [])];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      l?.start();
    };
  }, [open, onClose, lenis]);

  return (
    <>
      {open && (
        <div
          id="mobile-drawer"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[99] overflow-y-auto bg-void pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(var(--header-h)+env(safe-area-inset-top)+1.5rem)] lg:hidden"
          style={{ animation: 'drawer-in 0.7s cubic-bezier(0.76,0,0.24,1) both' }}
        >
          <div className="shell flex min-h-full flex-col">
            <nav aria-label="Mobile">
              <ul>
                {primaryNav.map((item, i) => (
                  <li
                    key={item.to}
                    className="border-b border-white/[0.08]"
                    style={{ animation: `fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${0.25 + i * 0.05}s both` }}
                  >
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) => cn('display flex items-baseline justify-between py-4 text-[2.1rem] xs:text-[2.5rem]', isActive && 'text-spark')}
                    >
                      {item.label}
                      <span className="font-sans text-xs tracking-normal text-muted">0{i + 1}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
              <ul className="mt-8 space-y-1">
                {toolsNav.map((t) => (
                  <li key={t.to}>
                    <Link to={t.to} onClick={onClose} className="block py-2 text-lg text-soft hover:text-white">
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-10">
              <CtaLink to="/start-a-project" magnetic={false}>Start a project</CtaLink>
            </div>
            <div className="mt-auto pt-12 text-sm text-muted">
              {company.contact.email && <a className="block text-soft" href={`mailto:${company.contact.email}`}>{company.contact.email}</a>}
              {socialLinks.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-5">
                  {socialLinks.map((s) => (
                    <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer me">{s.name}</a></li>
                  ))}
                </ul>
              )}
              <p className="mt-4">{company.tagline}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
