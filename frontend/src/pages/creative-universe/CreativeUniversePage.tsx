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
 * Nine disciplines orbit a single spark. The orbit is a tilted ellipse: nodes nearer the viewer
 * grow and brighten, nodes behind recede. Everything is real HTML: each discipline is a button,
 * so the experience works with a keyboard and screen reader, and with reduced motion it simply
 * stands still.
 */

const N = services.length;

export default function CreativeUniversePage() {
  const crumbs = [{ name: 'Creative Universe', path: '/creative-universe' }];
  const reduce = useReducedMotionPref();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const angle = useRef(0);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const place = () => {
      const el = stage.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const rx = w * (w < 640 ? 0.4 : 0.38);
      const ry = h * (w < 640 ? 0.3 : 0.27);
      for (let i = 0; i < N; i++) {
        const a = angle.current + (i / N) * Math.PI * 2;
        const depth = (Math.sin(a) + 1) / 2; // 0 back, 1 front
        const x = Math.cos(a) * rx;
        const y = Math.sin(a) * ry;
        const node = nodes.current[i];
        if (node) {
          node.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${0.72 + depth * 0.4})`;
          node.style.opacity = String(0.45 + depth * 0.55);
          node.style.zIndex = String(Math.round(depth * 100));
        }
        const line = lines.current[i];
        if (line) {
          line.setAttribute('x2', String(w / 2 + x));
          line.setAttribute('y2', String(h / 2 + y));
          line.setAttribute('x1', String(w / 2));
          line.setAttribute('y1', String(h / 2));
        }
      }
    };
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!hovering && !reduce) angle.current += dt * 0.12;
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
  }, [hovering, reduce]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + N) % N;
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
              Every discipline we practise connects back to the same idea. Hover, tap or use your arrow keys to explore. Select one to open its page.
            </p>
          </div>
        </div>

        <div className="shell relative grid gap-8 pb-20 pt-6 lg:grid-cols-12 lg:pb-28">
          {/* Orbit stage */}
          <div
            ref={stage}
            className="relative h-[min(78vw,36rem)] lg:col-span-8 lg:h-[min(70vh,44rem)]"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onFocusCapture={() => setHovering(true)}
            onBlurCapture={() => setHovering(false)}
          >
            {/* rings */}
            <div aria-hidden className="absolute inset-[6%] rounded-[50%] border border-white/[0.06] [transform:scaleY(0.72)]" />
            <div aria-hidden className="absolute inset-[18%] rounded-[50%] border border-dashed border-white/[0.07] [transform:scaleY(0.72)]" />
            <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
              {services.map((sv, i) => (
                <line
                  key={sv.slug}
                  ref={(el) => {
                    lines.current[i] = el;
                  }}
                  stroke={i === active ? '#FF9810' : '#ffffff'}
                  strokeOpacity={i === active ? 0.9 : 0.1}
                  strokeWidth={i === active ? 1.5 : 1}
                  strokeDasharray={i === active ? undefined : '2 6'}
                />
              ))}
            </svg>
            {/* central spark */}
            <div aria-hidden className="absolute left-1/2 top-1/2 z-[50] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute left-1/2 top-1/2 size-[14rem] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(255,128,13,0.45),transparent_65%)]" />
              <SparkMark className="relative h-[clamp(4.5rem,10vw,8rem)] w-auto drop-shadow-[0_0_40px_rgba(255,128,13,0.7)]" />
            </div>
            {/* discipline nodes */}
            <div role="group" aria-label="Creative disciplines" className="absolute left-1/2 top-1/2">
              {services.map((sv, i) => (
                <button
                  key={sv.slug}
                  ref={(el) => {
                    nodes.current[i] = el;
                  }}
                  type="button"
                  aria-pressed={i === active}
                  aria-describedby="universe-detail"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => (i === active ? navigate(`/capabilities/${sv.slug}`) : setActive(i))}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    'absolute left-0 top-0 flex items-center gap-2.5 whitespace-nowrap rounded-full border px-3 py-2 text-left transition-[background-color,border-color,box-shadow] duration-300 md:px-4 md:py-2.5',
                    i === active
                      ? 'border-spark bg-spark text-void shadow-[0_0_40px_-6px_rgba(255,128,13,0.9)]'
                      : 'border-white/15 bg-surface/80 text-white backdrop-blur hover:border-white/40',
                  )}
                >
                  <span aria-hidden className={cn('grid size-5 place-items-center font-display text-[0.6rem]', i === active ? 'text-void' : 'text-spark')}>{sv.n}</span>
                  <span className="hidden text-[0.85rem] font-semibold md:inline">{sv.name}</span>
                  <span className="sr-only md:hidden">{sv.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <aside id="universe-detail" aria-live="polite" className="relative self-center rounded-[1.25rem] border border-white/10 bg-charcoal/80 p-8 backdrop-blur lg:col-span-4">
            <p className="font-display text-spark">{s.n} / 0{N}</p>
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
