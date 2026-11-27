import type { CSSProperties } from 'react';
import {
  siBlender,
  siCloudflare,
  siDavinciresolve,
  siFigma,
  siFramer,
  siGoogleads,
  siGoogleanalytics,
  siGooglesearchconsole,
  siHubspot,
  siMeta,
  siNextdotjs,
  siReact,
  siSemrush,
  siShopify,
  siTailwindcss,
  siTypescript,
  siWordpress,
  siYoutube,
  type SimpleIcon,
} from 'simple-icons';
import { SparkMark } from '@/components/common/SparkMark';
import { cn } from '@/utils/cn';

/*
 * The FLINTORA "solar system": the tools we work with orbit the spark in three rings.
 *   inner  = design and production, middle = build, outer = growth and marketing.
 * Rings rotate slowly in alternating directions; each logo counter-rotates to stay upright.
 * Hover pauses the motion. Reduced motion shows it still. Logos: Simple Icons (CC0).
 */

interface Ring {
  label: string;
  radius: number; // % of the container width
  duration: number; // seconds per revolution
  reverse?: boolean;
  icons: SimpleIcon[];
}

const rings: Ring[] = [
  { label: 'Design and production', radius: 19, duration: 46, icons: [siFigma, siBlender, siFramer, siDavinciresolve] },
  { label: 'Build', radius: 32, duration: 70, reverse: true, icons: [siReact, siNextdotjs, siTypescript, siTailwindcss, siWordpress, siShopify] },
  { label: 'Growth', radius: 46, duration: 96, icons: [siGoogleads, siMeta, siGoogleanalytics, siGooglesearchconsole, siSemrush, siHubspot, siYoutube, siCloudflare] },
];

// Very dark brand colours would vanish on the chip edge; keep them legible.
const ink = (hex: string) => (['000000', '233A51'].includes(hex) ? '#141210' : `#${hex}`);


export function TechOrbit({ className }: { className?: string }) {
  return (
    <div className={cn('orbit relative mx-auto aspect-square w-full max-w-[36rem]', className)}>
      {/* Accessible description of what the picture shows */}
      <ul className="sr-only">
        {rings.map((r) => (
          <li key={r.label}>
            {r.label}: {r.icons.map((i) => i.title).join(', ')}
          </li>
        ))}
      </ul>

      <div aria-hidden className="absolute inset-0">
        {/* glow */}
        <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(255,128,13,0.22),transparent_68%)]" />
        {rings.map((r) => (
          <div
            key={r.label}
            className="orbit-ring absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/[0.12]"
            style={
              {
                width: `${r.radius * 2}%`,
                height: `${r.radius * 2}%`,
                translate: '-50% -50%',
                animationDuration: `${r.duration}s`,
                animationDirection: r.reverse ? 'reverse' : 'normal',
              } as CSSProperties
            }
          >
            {r.icons.map((icon, i) => {
              const a = (i / r.icons.length) * Math.PI * 2 + r.radius / 10;
              return (
                <span
                  key={icon.slug}
                  title={icon.title}
                  className="orbit-chip absolute grid size-[clamp(2.3rem,8.5%,3.4rem)] place-items-center rounded-full bg-paper shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] ring-1 ring-black/5"
                  style={
                    {
                      left: `${50 + 50 * Math.cos(a)}%`,
                      top: `${50 + 50 * Math.sin(a)}%`,
                      translate: '-50% -50%',
                      animationDuration: `${r.duration}s`,
                      animationDirection: r.reverse ? 'normal' : 'reverse',
                    } as CSSProperties
                  }
                >
                  <svg viewBox="0 0 24 24" className="size-[52%]" fill={ink(icon.hex)}>
                    <path d={icon.path} />
                  </svg>
                </span>
              );
            })}
          </div>
        ))}
        {/* the spark at the centre */}
        <div className="absolute left-1/2 top-1/2 grid size-[21%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-spark/30 bg-void shadow-[0_0_60px_-10px_rgba(255,128,13,0.7)]">
          <SparkMark className="h-[52%] w-auto" />
        </div>
      </div>
    </div>
  );
}
