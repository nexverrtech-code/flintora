import { cn } from '@/utils/cn';

interface Props {
  /** Base path without size/extension, e.g. /images/work/flintora-identity-1 */
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  widths?: number[];
}

/** Responsive AVIF + WebP picture. Expects files named `${src}-${w}.avif|webp`. */
export function Picture({ src, alt, width, height, sizes = '100vw', className, imgClassName, priority, widths = [800, 1600] }: Props) {
  const set = (ext: string) => widths.map((w) => `${src}-${w}.${ext} ${w}w`).join(', ');
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`${src}-${widths[widths.length - 1]}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </picture>
  );
}
