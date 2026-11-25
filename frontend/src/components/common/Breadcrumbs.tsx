import { Link } from 'react-router';
import { cn } from '@/utils/cn';

export function Breadcrumbs({ items, className, light }: { items: { name: string; path: string }[]; className?: string; light?: boolean }) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={cn('text-[0.8rem]', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className={light ? 'text-ink/30' : 'text-white/25'}>/</span>}
            {i < all.length - 1 ? (
              <Link to={c.path} className={cn('link-line', light ? 'text-ink/60 hover:text-ink' : 'text-soft/70 hover:text-white')}>
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className={light ? 'text-ink' : 'text-white'}>{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
