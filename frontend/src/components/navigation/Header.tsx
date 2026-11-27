import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Logo } from '@/components/common/Logo';
import { CtaLink } from '@/components/common/CtaLink';
import { MobileDrawer } from './MobileDrawer';
import { primaryNav, toolsNav } from '@/routes/navigation';
import { cn } from '@/utils/cn';

const linkCls = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative py-2 text-soft transition-colors hover:text-white',
    isActive && 'text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-spark',
  );

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
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
  }, [pathname]);

  // Order: Home, Work, Process, About, Creative Universe, Contact
  const desktopNav = [...primaryNav.slice(0, 4), ...toolsNav, primaryNav[4]];

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[100] transition-[transform,background-color,border-color,backdrop-filter] duration-700 ease-[var(--ease-silk)]',
          'border-b pt-[env(safe-area-inset-top)]',
          scrolled || open ? 'border-white/[0.07] bg-void/80 backdrop-blur-xl' : 'border-transparent bg-transparent',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <div className="shell flex h-[var(--header-h)] items-center gap-8">
          <Logo className="relative z-[2]" />
          <nav aria-label="Main" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.9rem]">
              {desktopNav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'} className={linkCls}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden lg:block">
            <CtaLink to="/contact" size="sm">Start a project</CtaLink>
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
