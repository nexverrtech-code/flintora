import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

/** Lightweight 2D ember particles. Pauses off screen; static for reduced motion. */
export function EmberField({ className, density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, raf = 0, visible = false;
    type P = { x: number; y: number; v: number; s: number; o: number; d: number };
    let ps: P[] = [];
    const resize = () => {
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(((w * h) / 9000) * density);
      ps = Array.from({ length: Math.min(n, 220) }, () => ({ x: Math.random() * w, y: Math.random() * h, v: 0.2 + Math.random() * 0.7, s: 0.5 + Math.random() * 1.8, o: Math.random(), d: Math.random() * 6 }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of ps) {
        if (!reduce) {
          p.y -= p.v;
          p.x += Math.sin((p.y + p.d * 40) / 60) * 0.25;
          if (p.y < -5) {
            p.y = h + 5;
            p.x = Math.random() * w;
          }
        }
        const a = 0.25 + 0.55 * Math.abs(Math.sin(p.o + p.y / 90));
        ctx.fillStyle = `rgba(255,${140 + Math.round(p.s * 30)},40,${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const loop = () => {
      draw();
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };
    resize();
    draw();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(cv);
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [density]);
  return <canvas ref={ref} aria-hidden className={cn('pointer-events-none absolute inset-0 h-full w-full', className)} />;
}
