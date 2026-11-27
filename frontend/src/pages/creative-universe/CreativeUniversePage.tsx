import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SparkMark } from '@/components/common/SparkMark';
import { Lines } from '@/components/common/Display';
import { EmberField } from '@/components/interactive/EmberField';
import { services } from '@/data/services';
import { useReducedMotionPref } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

/*
 * THE CREATIVE UNIVERSE
 * A small solar system. The spark is the sun; the nine disciplines are stone planets on three
 * tilted elliptical orbits, three per orbit. Inner orbits move faster (as in a real system).
 * Planets passing behind the sun shrink, dim and slip under it. Each label sits on the outer
 * side of its planet so labels never cross. Hover slows the system instead of stopping it;
 * keyboard focus and reduced motion hold it still. Every planet is a real button.
 */

const STONES = ['stone-flint-1', 'stone-granite-1', 'stone-jade-1', 'stone-flint-2', 'stone-jade-2', 'stone-flint-3', 'stone-granite-2', 'stone-flint-4', 'stone-flint-1'];

const ORBITS = [
  { rx: 0.18, ry: 0.14, speed: 0.2, tilt: -0.08 },
  { rx: 0.3, ry: 0.24, speed: 0.13, tilt: -0.08 },
  { rx: 0.42, ry: 0.34, speed: 0.085, tilt: -0.08 },
];

// three planets per orbit, evenly spaced and offset ring to ring
const PLANETS = services.map((s, i) => ({ s, orbit: Math.floor(i / 3), phase: (i % 3) * ((Math.PI * 2) / 3) + Math.floor(i / 3) * 0.7, stone: STONES[i] }));

export default function CreativeUniversePage() {
  const crumbs = [{ name: 'Creative Universe', path: '/creative-universe' }];
  const reduce = useReducedMotionPref();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const labels = useRef<(HTMLSpanElement | null)[]>([]);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const ellipses = useRef<(SVGEllipseElement | null)[]>([]);
  const time = useRef(0);
  const activeRef = useRef(0);
  activeRef.current = active;
  const rate = useRef(1); // eased playback speed: 1 normal, 0.25 hovering, 0 focused
  const target = useRef(1);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const place = () => {
      const el = stage.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const small = w < 640;
      ORBITS.forEach((o, k) => {
        const e = ellipses.current[k];
        if (!e) return;
        e.setAttribute('cx', String(cx));
        e.setAttribute('cy', String(cy));
        e.setAttribute('rx', String(o.rx * w));
        e.setAttribute('ry', String(o.ry * h * (small ? 1.15 : 1)));
      });
      PLANETS.forEach((p, i) => {
        const o = ORBITS[p.orbit];
        const a = p.phase + time.current * o.speed;
        const x = Math.cos(a) * o.rx * w;
        const y = Math.sin(a) * o.ry * h * (small ? 1.15 : 1);
        const depth = (Math.sin(a) + 1) / 2; // 0 = far side (behind the sun), 1 = near side
        const node = nodes.current[i];
        if (node) {
          const scale = 0.62 + depth * 0.5;
          node.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
          node.style.zIndex = String(depth < 0.42 ? 10 : 60 + Math.round(depth * 30));
          node.style.filter = `brightness(${0.45 + depth * 0.6}) saturate(${0.7 + depth * 0.3})`;
        }
        const label = labels.current[i];
        if (label && node) {
          const r = (node.offsetWidth / 2) * (0.62 + depth * 0.5);
          label.style.transform = `translate(-50%, 0) translate3d(${x}px, ${y + r + 6}px, 0)`;
          label.dataset.far = depth < 0.45 && i !== activeRef.current ? 'true' : 'false';
        }
        const line = lines.current[i];
        if (line) {
          line.setAttribute('x1', String(cx));
          line.setAttribute('y1', String(cy));
          line.setAttribute('x2', String(cx + x));
          line.setAttribute('y2', String(cy + y));
        }
      });
    };
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      rate.current += (target.current - rate.current) * 0.06;
      if (!reduce) time.current += dt * rate.current;
      place();
      raf = requestAnimationFrame(tick);
    };
    place();
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', place);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', place);
    };
  }, [reduce]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + PLANETS.length) % PLANETS.length;
    setActive(n);
    nodes.current[n]?.focus();
  };

  const s = services[active];

  return (
    <>
      <Seo
        path="/creative-universe"
        title="Creative Universe"
        description="Explore FLINTORA's creative disciplines around a single spark: brand, web, UI/UX, marketing, SEO, content, photography, automation and digital transformation."
        breadcrumbs={crumbs}
      />
      <section className="relative overflow-hidden bg-void pt-[calc(var(--header-h)+2.5rem)]">
        <EmberField density={0.7} />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 grid items-end gap-6 lg:grid-cols-12">
            <h1 className="display hero-rise t-lg lg:col-span-7">
              <Lines lines={['One spark.', 'Many disciplines.']} accent={[0]} />
            </h1>
            <p className="hero-fade text-soft lg:col-span-5" style={{ ['--d' as string]: '0.4s' }}>
              Every discipline we practise orbits the same idea. Hover, tap or use your arrow keys to explore a planet. Select it again to open its page.
            </p>
          </div>
        </div>

        <div className="shell relative grid gap-8 pb-20 pt-6 lg:grid-cols-12 lg:pb-28">
          {/* Solar system */}
          <div
            ref={stage}
            className="relative h-[min(92vw,34rem)] lg:col-span-8 lg:h-[min(72vh,46rem)]"
            onMouseEnter={() => (target.current = 0.25)}
            onMouseLeave={() => (target.current = 1)}
            onFocusCapture={() => (target.current = 0)}
            onBlurCapture={() => (target.current = 1)}
          >
            <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <radialGradient id="cu-sun" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#FFA912" stopOpacity="0.55" />
                  <stop offset="0.35" stopColor="#FF800D" stopOpacity="0.18" />
                  <stop offset="1" stopColor="#FF800D" stopOpacity="0" />
                </radialGradient>
              </defs>
              {ORBITS.map((_, k) => (
                <ellipse
                  key={k}
                  ref={(el) => {
                    ellipses.current[k] = el;
                  }}
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity={0.1 - k * 0.015}
                  strokeDasharray={k === 1 ? '3 7' : undefined}
                />
              ))}
              {PLANETS.map((p, i) => (
                <line
                  key={p.s.slug}
                  ref={(el) => {
                    lines.current[i] = el;
                  }}
                  stroke="#FF9810"
                  strokeOpacity={i === active ? 0.8 : 0}
                  strokeWidth={1.2}
                  strokeDasharray="4 5"
                />
              ))}
            </svg>

            {/* The sun: the spark with a breathing corona */}
            <div aria-hidden className="absolute left-1/2 top-1/2 z-[40] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute left-1/2 top-1/2 size-[18rem] animate-[corona_5s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(255,169,18,0.5),rgba(255,128,13,0.14)_40%,transparent_68%)] max-md:size-[11rem]" />
              <SparkMark className="relative h-[clamp(4rem,9vw,7.5rem)] w-auto drop-shadow-[0_0_36px_rgba(255,128,13,0.85)]" />
            </div>

            {/* Labels: one layer above every planet, so a planet passing in front never hides a name */}
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-[200] hidden md:block">
              {PLANETS.map((p, i) => (
                <span
                  key={p.s.slug}
                  ref={(el) => {
                    labels.current[i] = el;
                  }}
                  data-far="false"
                  className={cn(
                    'planet-label absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.74rem] font-semibold backdrop-blur transition-colors duration-300',
                    i === active ? 'border-spark bg-spark text-void' : 'border-white/15 bg-void/75 text-white',
                  )}
                >
                  <span className={cn('font-display text-[0.62rem]', i === active ? 'text-void' : 'text-spark')}>{p.s.n}</span>
                  <span className="planet-name">{p.s.name}</span>
                </span>
              ))}
            </div>

            {/* Planets */}
            <div role="group" aria-label="Creative disciplines" className="absolute left-1/2 top-1/2">
              {PLANETS.map((p, i) => (
                <button
                  key={p.s.slug}
                  ref={(el) => {
                    nodes.current[i] = el;
                  }}
                  type="button"
                  aria-pressed={i === active}
                  aria-describedby="universe-detail"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => (i === active ? navigate(`/capabilities/${p.s.slug}`) : setActive(i))}
                  onKeyDown={(e) => onKey(e, i)}
                  className="group absolute left-0 top-0 size-[clamp(3.2rem,6.5vw,5.5rem)] rounded-full outline-offset-4"
                >
                  <span aria-hidden className={cn('absolute inset-[-18%] rounded-full transition-opacity duration-500', i === active ? 'bg-[radial-gradient(circle,rgba(255,128,13,0.45),transparent_65%)] opacity-100' : 'opacity-0')} />
                  <img
                    src={`/images/stones/${p.stone}-400.webp`}
                    alt=""
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="relative h-full w-full object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-110"
                    style={{ rotate: `${i * 37}deg` }}
                  />
                  <span className="sr-only">{p.s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <aside id="universe-detail" aria-live="polite" className="relative self-center rounded-[1.25rem] border border-white/10 bg-charcoal/80 p-8 backdrop-blur lg:col-span-4">
            <p className="font-display text-spark">{s.n} / 0{services.length}</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight">{s.name}</h2>
            <p className="mt-4 text-soft">{s.short}</p>
            <ul className="mt-6 space-y-2 border-t border-white/10 pt-6 text-[0.92rem]">
              {s.approach.slice(0, 3).map((a) => (
                <li key={a.title} className="flex gap-3"><span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-spark" />{a.title}</li>
              ))}
            </ul>
            <Link to={`/capabilities/${s.slug}`} className="group mt-8 inline-flex items-center gap-2 font-semibold text-spark">
              <span className="link-line">Explore {s.name}</span>
              <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </aside>
        </div>
      </section>

      {/* Plain list for quick scanning */}
      <section aria-labelledby="all-title" className="border-t border-white/10 bg-charcoal py-16">
        <div className="shell">
          <h2 id="all-title" className="eyebrow text-muted">All disciplines</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {services.map((sv) => (
              <li key={sv.slug}>
                <Link to={`/capabilities/${sv.slug}`} className="inline-block rounded-full border border-white/15 px-4 py-2 text-[0.9rem] text-soft transition-colors hover:border-spark hover:text-white">
                  {sv.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
