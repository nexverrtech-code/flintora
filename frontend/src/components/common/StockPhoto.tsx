import { stock, type StockKey } from '@/data/stock';
import { cn } from '@/utils/cn';

interface Props {
  name: StockKey;
  /** Crop ratio for the CDN, e.g. "16:9" */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Subtle warm grade so photography sits with the brand palette */
  tint?: boolean;
}

const WIDTHS = [480, 800, 1200, 1800];

export function StockPhoto({ name, ratio = '16:10', sizes = '100vw', priority, className, imgClassName, tint = true }: Props) {
  const { id, alt } = stock[name];
  const base = id.startsWith('http') ? id : `https://images.unsplash.com/${id}`;
  const join = base.includes('?') ? '&' : '?';
  const url = (w: number) => `${base}${join}auto=format&fit=crop&ar=${encodeURIComponent(ratio)}&w=${w}&q=72`;
  const [rw, rh] = ratio.split(':').map(Number);
  return (
    <div className={cn('relative overflow-hidden bg-surface', className)}>
      <img
        src={url(1200)}
        srcSet={WIDTHS.map((w) => `${url(w)} ${w}w`).join(', ')}
        sizes={sizes}
        alt={alt}
        width={1200}
        height={Math.round((1200 * rh) / rw)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
      {tint && <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,4,4,0.05),rgba(4,4,4,0.35))] mix-blend-multiply" />}
      {tint && <div aria-hidden className="pointer-events-none absolute inset-0 bg-spark/10 mix-blend-soft-light" />}
    </div>
  );
}
