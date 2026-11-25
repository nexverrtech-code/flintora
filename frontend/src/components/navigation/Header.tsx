import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { CtaLink } from '@/components/common/CtaLink';
import { MobileDrawer } from './MobileDrawer';
import { primaryNav, toolsNav } from '@/routes/navigation';
import { cn } from '@/utils/cn';

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [tools, setTools] = useState(false);
  const toolsRef = useRef<HTMLLIElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > lastY.current + 2);
      if (y < lastY.current - 2) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setTools(false);
  }, [pathname]);

  useEffect(() => {
    if (!tools) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !toolsRef.current?.contains(e.target as Node)) setTools(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [tools]);

  const toolsActive = toolsNav.some((t) => pathname.startsWith(t.to));

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[100] transition-[transform,background-color,border-color,backdrop-filter] duration-700 ease-[var(--ease-silk)]',
          'border-b pt-[env(safe-area-inset-top)]',
          scrolled || open ? 'border-white/[0.07] bg-void/80 backdrop-blur-xl' : 'border-transparent bg-transparent',
          hidden && !open && !tools ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <div className="shell flex h-[var(--header-h)] items-center gap-8">
          <Logo className="relative z-[2]" />
          <nav aria-label="Main" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.9rem]">
              {primaryNav.slice(0, 4).map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn('relative py-2 text-soft transition-colors hover:text-white', isActive && 'text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-spark')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="relative" ref={toolsRef}>
                <button
                  type="button"
                  aria-expanded={tools}
                  aria-controls="tools-menu"
                  onClick={() => setTools((v) => !v)}
                  className={cn('flex items-center gap-1.5 py-2 text-soft transition-colors hover:text-white', (tools || toolsActive) && 'text-white')}
                >
                  Studio tools
                  <ChevronDown aria-hidden className={cn('size-4 transition-transform duration-300', tools && 'rotate-180')} />
                </button>
                <div
                  id="tools-menu"
                  hidden={!tools}
                  className="absolute right-0 top-[calc(100%+18px)] w-[22rem] rounded-2xl border border-white/10 bg-surface/95 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                >
                  <ul>
                    {toolsNav.map((t) => (
                      <li key={t.to}>
                        <Link to={t.to} className="group block rounded-xl px-4 py-3.5 transition-colors hover:bg-white/[0.05] focus-visible:bg-white/[0.05]">
                          <span className="block font-semibold text-white transition-colors group-hover:text-spark">{t.label}</span>
                          <span className="block text-[0.82rem] leading-snug text-muted">{t.note}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => cn('py-2 text-soft transition-colors hover:text-white', isActive && 'text-white')}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="hidden lg:block">
            <CtaLink to="/start-a-project" size="sm">Start a project</CtaLink>
          </div>
          <button
            type="button"
            className="relative z-[2] ml-auto grid size-12 place-items-center rounded-full border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className={cn('absolute left-0 top-0 h-px w-5 bg-white transition-transform duration-500', open && 'translate-y-1.5 rotate-45')} />
              <span className={cn('absolute bottom-0 left-0 h-px w-5 bg-white transition-transform duration-500', open && '-translate-y-1.5 -rotate-45')} />
            </span>
          </button>
        </div>
      </header>
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
