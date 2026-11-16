// Site-wide motion: scroll reveals, split headlines, parallax layers,
// scroll progress, 3D card tilt and magnetic buttons.
// Everything degrades to static content when JS is off or the user prefers reduced motion.

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Reveal on scroll ---------- */
function reveals() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-split]');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  targets.forEach((t) => io.observe(t));
}

/* ---------- Parallax layers ---------- */
// data-parallax="0.2"  -> moves at 20% of scroll speed relative to its section centre
// data-parallax-x / data-parallax-rotate / data-parallax-scale add extra axes
interface Layer {
  el: HTMLElement;
  speed: number;
  x: number;
  rot: number;
  scale: number;
  visible: boolean;
}
function parallax() {
  if (reduce) return;
  const layers: Layer[] = [...document.querySelectorAll<HTMLElement>('[data-parallax]')].map((el) => ({
    el,
    speed: parseFloat(el.dataset.parallax || '0.15'),
    x: parseFloat(el.dataset.parallaxX || '0'),
    rot: parseFloat(el.dataset.parallaxRotate || '0'),
    scale: parseFloat(el.dataset.parallaxScale || '0'),
    visible: true,
  }));
  if (!layers.length) return;

  // Visibility is tracked on each layer's parent (the reference box), so a layer's own
  // transform never changes whether it counts as on screen.
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      for (const l of layers) if ((l.el.parentElement ?? l.el) === e.target) l.visible = e.isIntersecting;
    }
    onScroll(); // refresh layers that just came into view (e.g. after a jump or anchor link)
  }, { rootMargin: '25% 0px' });
  layers.forEach((l) => io.observe(l.el.parentElement ?? l.el));

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const l of layers) {
      if (!l.visible) continue;
      const parent = l.el.parentElement ?? l.el;
      const r = parent.getBoundingClientRect();
      // -1 when the parent centre is at the bottom of the viewport, +1 at the top
      const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)));
      const y = p * l.speed * vh * 0.6;
      const x = p * l.x * vh * 0.6;
      const rot = p * l.rot;
      const s = 1 + p * l.scale;
      l.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(3)})`;
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

/* ---------- Scroll progress driven sections ---------- */
// data-scroll-progress on a tall section sets --progress (0..1) while it scrolls through
function scrollProgress() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-scroll-progress]')];
  const bar = document.querySelector<HTMLElement>('[data-page-progress]');
  if (!els.length && !bar) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      const total = r.height - vh;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      el.style.setProperty('--progress', p.toFixed(4));
      el.dispatchEvent(new CustomEvent('progress', { detail: p }));
    }
    if (bar) {
      const max = document.documentElement.scrollHeight - vh;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    }
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* ---------- 3D tilt cards ---------- */
function tilt() {
  if (reduce || !finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = parseFloat(el.dataset.tilt || '8');
    let raf = 0;
    el.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${((0.5 - py) * max).toFixed(2)}deg) rotateY(${((px - 0.5) * max).toFixed(2)}deg) translateZ(0)`;
        el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
        el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
      });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    });
  });
}

/* ---------- Magnetic buttons ---------- */
function magnetic() {
  if (reduce || !finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.35;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });
}

/* ---------- Count-up numbers ---------- */
function countUp() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      io.unobserve(el);
      const end = parseFloat(el.dataset.count || '0');
      if (reduce) { el.textContent = String(end); continue; }
      const start = performance.now();
      const dur = 1400;
      const step = (t: number) => {
        const k = Math.min(1, (t - start) / dur);
        el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
}

document.documentElement.classList.remove('no-js');
reveals();
parallax();
scrollProgress();
tilt();
magnetic();
countUp();
