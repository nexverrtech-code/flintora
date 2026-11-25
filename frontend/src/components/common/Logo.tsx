import { Link } from 'react-router';
import { SparkMark } from './SparkMark';
import { cn } from '@/utils/cn';

/** Horizontal lock-up used in navigation: spark mark + Konexy wordmark. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className={cn('group inline-flex items-center gap-3', className)} aria-label="FLINTORA, home">
      <SparkMark className="h-7 w-auto transition-transform duration-700 ease-[var(--ease-silk)] group-hover:-rotate-6 group-hover:scale-110" />
      <span className="display text-[1.15rem] leading-none tracking-[0.06em]">Flintora</span>
    </Link>
  );
}
