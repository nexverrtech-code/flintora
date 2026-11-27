import type { CSSProperties } from 'react';
import { Parallax } from '@/components/animation/Parallax';
import { cn } from '@/utils/cn';

/*
 * Real-looking stones (rendered from the procedural stone generator, see lab/) that drift
 * slowly and move with scroll parallax. Decorative only. Each preset is a composed cluster.
 */

type StoneName =
  | 'stone-flint-1'
  | 'stone-flint-2'
  | 'stone-flint-3'
  | 'stone-flint-4'
  | 'stone-granite-1'
  | 'stone-granite-2'
  | 'stone-jade-1'
  | 'stone-jade-2';

interface Placed {
  name: StoneName;
  /** CSS position within the container */
  style: CSSProperties;
  /** width, e.g. 'clamp(6rem,14vw,14rem)' */
  size: string;
  speed: number;
  rotate: number;
  mobile?: boolean;
  blur?: boolean;
}

const presets: Record<string, Placed[]> = {
  right: [
    { name: 'stone-flint-1', style: { right: '6%', top: '18%' }, size: 'clamp(8rem,17vw,17rem)', speed: -24, rotate: 10, mobile: true },
    { name: 'stone-flint-3', style: { right: '26%', top: '58%' }, size: 'clamp(4rem,7vw,7rem)', speed: 30, rotate: -16 },
    { name: 'stone-granite-1', style: { right: '2%', bottom: '4%' }, size: 'clamp(3rem,5vw,5rem)', speed: 45, rotate: 20, blur: true },
  ],
  pair: [
    { name: 'stone-flint-2', style: { right: '8%', top: '22%' }, size: 'clamp(7rem,14vw,14rem)', speed: -20, rotate: -8, mobile: true },
    { name: 'stone-jade-1', style: { right: '24%', bottom: '10%' }, size: 'clamp(3.5rem,6vw,6rem)', speed: 35, rotate: 14 },
  ],
  scatter: [
    { name: 'stone-flint-4', style: { right: '10%', top: '16%' }, size: 'clamp(7rem,13vw,13rem)', speed: -26, rotate: 12, mobile: true },
    { name: 'stone-granite-2', style: { right: '34%', top: '8%' }, size: 'clamp(3rem,5vw,5rem)', speed: 40, rotate: -20, blur: true },
    { name: 'stone-jade-2', style: { right: '20%', bottom: '6%' }, size: 'clamp(4rem,7vw,7rem)', speed: 22, rotate: 18 },
  ],
  single: [{ name: 'stone-flint-3', style: { right: '6%', top: '20%' }, size: 'clamp(6rem,11vw,11rem)', speed: -18, rotate: 10, mobile: true }],
};

export function FloatingStones({ preset = 'right', className }: { preset?: keyof typeof presets; className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {presets[preset].map((s, i) => (
        <div key={s.name + i} className={cn('absolute', !s.mobile && 'max-md:hidden', s.mobile && 'max-md:opacity-40')} style={{ ...s.style, width: s.size }}>
          <Parallax speed={s.speed} rotate={s.rotate}>
            <img
              src={`/images/stones/${s.name}-800.webp`}
              srcSet={`/images/stones/${s.name}-400.webp 400w, /images/stones/${s.name}-800.webp 800w`}
              sizes={s.size.replace(/^clamp\(([^,]+),([^,]+),([^)]+)\)$/, '$2')}
              alt=""
              width={800}
              height={800}
              loading="lazy"
              decoding="async"
              className={cn('stone-drift h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.65)]', s.blur && 'blur-[2px] opacity-70')}
              style={{ animationDelay: `${-i * 2.3}s` }}
            />
          </Parallax>
        </div>
      ))}
    </div>
  );
}
