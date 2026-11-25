import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SPARK_BOTTOM, SPARK_BOTTOM_HI, SPARK_TOP, SPARK_TOP_HI, SPARK_TOP_SHADE } from '@/components/common/SparkMark';
import halves from './flintHalves.json';

/*
 * THE SPARK AWAKENING  (about 6 seconds, plays on every load of the home page)
 *
 *  0.0s  Darkness. Drifting embers.
 *  0.5s  The two halves of the real flint stone fly in from opposite sides, with motion blur.
 *  1.6s  Strike. Camera shake, white-hot flash along the crack, shockwave, a burst of sparks
 *        that cool from white to red under gravity, tumbling stone chips and lit smoke.
 *  2.2s  The halves recoil and settle while the crack glows. Embers begin to circle.
 *  2.9s  The stone dissolves into light and the official spark F assembles from its facets.
 *  3.7s  FLINTORA, then Where Ideas Spark.
 *  5.9s  Hand-off to the homepage.
 *
 * One clock drives everything: the canvas loop seeks the (paused) GSAP timeline each frame,
 * so canvas and DOM can never drift apart. Skippable (button or Escape), never traps the
 * navigation and is skipped entirely for reduced motion. Phones get fewer particles.
 */

const T_IMPACT = 1.6;
const T_DISSOLVE = 2.9;
const TOTAL = 5.9;

type Spark = { x: number; y: number; vx: number; vy: number; age: number; life: number; w: number };
type Orbit = { x: number; y: number; a: number; r: number; age: number; life: number; w: number };
type Chip = { x: number; y: number; vx: number; vy: number; r: number; vr: number; s: number; age: number; life: number; pts: number[] };
type Puff = { x: number; y: number; vx: number; vy: number; s: number; age: number; life: number; rot: number; spr: number };
type Ember = { x: number; y: number; v: number; s: number; ph: number };
type Part = { x: number; y: number; w: number; h: number };

/** Colour of a cooling spark: white-hot -> yellow -> orange -> dull red. k = 0 (new) .. 1 (dead) */
function sparkColor(k: number, a: number) {
  const stops = [
    [255, 250, 235],
    [255, 205, 90],
    [255, 128, 20],
    [170, 40, 8],
  ];
  const f = Math.min(0.999, Math.max(0, k)) * (stops.length - 1);
  const i = Math.floor(f);
  const t = f - i;
  const c = stops[i].map((v, j) => Math.round(v + (stops[i + 1][j] - v) * t));
  return `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, a)})`;
}

function makeGlowSprite(size: number, rgb: string) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gr.addColorStop(0, `rgba(${rgb},1)`);
  gr.addColorStop(0.25, `rgba(${rgb},0.55)`);
  gr.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = gr;
  g.fillRect(0, 0, size, size);
  return c;
}

/** Soft, irregular smoke puff made of overlapping blobs (a cheap stand-in for volumetric smoke). */
function makeSmokeSprite(seed: number) {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  let s = seed * 7919;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 26; i++) {
    const r = 30 + rnd() * 70;
    const x = size / 2 + (rnd() - 0.5) * 110;
    const y = size / 2 + (rnd() - 0.5) * 110;
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, `rgba(120,114,108,${0.05 + rnd() * 0.06})`);
    gr.addColorStop(1, 'rgba(120,114,108,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, size, size);
  }
  return c;
}

export function SparkAwakening({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const mark = useRef<SVGSVGElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLParagraphElement>(null);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext('2d')!;
    const mobile = window.innerWidth < 768;
    const q = mobile ? 0.45 : 1; // particle budget
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const glowWhite = makeGlowSprite(64, '255,236,200');
    const glowOrange = makeGlowSprite(128, '255,120,20');
    const smokeSprites = [1, 2, 3].map(makeSmokeSprite);

    // The real flint stone, split along its crack into two halves (see scripts/build-assets.mjs).
    const imgA = new Image();
    const imgB = new Image();
    imgA.src = '/images/intro/flint-a.webp';
    imgB.src = '/images/intro/flint-b.webp';

    // Geometry in artwork pixels (1254 square). Crack: x = 700 - 0.55 (y - 500)
    const ART = halves.size;
    const crackAt = (y: number) => 700 - 0.55 * (y - 500);
    const cTop = { x: crackAt(330), y: 330 };
    const cBot = { x: crackAt(900), y: 900 };
    const cLen = Math.hypot(cBot.x - cTop.x, cBot.y - cTop.y);
    const tan = { x: (cBot.x - cTop.x) / cLen, y: (cBot.y - cTop.y) / cLen };
    const nrm = { x: -tan.y, y: tan.x }; // perpendicular to the crack
    const onCrack = (u: number) => ({ x: cTop.x + tan.x * cLen * u, y: cTop.y + tan.y * cLen * u });

    const embers: Ember[] = Array.from({ length: Math.round(60 * q + 20) }, () => ({ x: Math.random(), y: Math.random(), v: rand(0.015, 0.06), s: rand(0.6, 1.8), ph: rand(0, 6.28) }));
    const sparks: Spark[] = [];
    const orbit: Orbit[] = [];
    const chips: Chip[] = [];
    const puffs: Puff[] = [];
    let burst = false;
    let vortex = false;

    let tl: gsap.core.Timeline | null = null;
    let t0 = performance.now();
    let started = false;
    let raf = 0;
    let last = performance.now();

    const layout = () => {
      const S = Math.min(w * (mobile ? 0.95 : 0.6), h * (mobile ? 0.62 : 0.74));
      const k = S / ART;
      const cx = w / 2;
      const cy = h / 2 - (mobile ? 30 : 20);
      const toScreen = (p: { x: number; y: number }) => ({ x: cx + (p.x - ART / 2) * k, y: cy + (p.y - ART / 2) * k });
      return { S, k, toScreen };
    };
    type L = ReturnType<typeof layout>;

    const drawHalf = (img: HTMLImageElement, part: Part, dx: number, dy: number, rot: number, alpha: number, L: L) => {
      if (!img.complete || !img.naturalWidth || alpha <= 0) return;
      const c = L.toScreen({ x: part.x + part.w / 2, y: part.y + part.h / 2 });
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = alpha;
      ctx.translate(c.x + dx, c.y + dy);
      ctx.rotate(rot);
      ctx.drawImage(img, (-part.w / 2) * L.k, (-part.h / 2) * L.k, part.w * L.k, part.h * L.k);
      ctx.restore();
    };

    const spawnBurst = (L: L) => {
      const scale = L.S / 700;
      for (let i = 0, n = Math.round(320 * q + 60); i < n; i++) {
        const p = L.toScreen(onCrack(Math.random()));
        const side = Math.random() < 0.5 ? -1 : 1;
        const spread = rand(-0.9, 0.9);
        const dx = nrm.x * side + tan.x * spread;
        const dy = nrm.y * side + tan.y * spread - 0.3;
        const len = Math.hypot(dx, dy);
        const sp = rand(250, 1150) * scale * (Math.random() < 0.15 ? 1.5 : 1);
        sparks.push({ x: p.x, y: p.y, vx: (dx / len) * sp, vy: (dy / len) * sp, age: 0, life: rand(0.45, 1.7), w: rand(0.8, 2.2) });
      }
      for (let i = 0, n = Math.round(26 * q + 8); i < n; i++) {
        const p = L.toScreen(onCrack(Math.random()));
        const a = rand(0, Math.PI * 2);
        const sp = rand(120, 520) * scale;
        const pts: number[] = [];
        for (let j = 0; j < 5; j++) {
          const ang = (j / 5) * Math.PI * 2;
          const rr = rand(0.6, 1.2);
          pts.push(Math.cos(ang) * rr, Math.sin(ang) * rr);
        }
        chips.push({ x: p.x, y: p.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 120 * scale, r: rand(0, 6), vr: rand(-12, 12), s: rand(2, 6) * scale, age: 0, life: rand(1.2, 2.4), pts });
      }
      for (let i = 0, n = Math.round(12 * q + 5); i < n; i++) {
        const p = L.toScreen(onCrack(Math.random()));
        const side = Math.random() < 0.5 ? -1 : 1;
        puffs.push({ x: p.x, y: p.y, vx: nrm.x * side * rand(20, 90) + rand(-20, 20), vy: nrm.y * side * rand(20, 90) - rand(5, 30), s: rand(0.16, 0.32) * L.S, age: 0, life: rand(1.4, 2.3), rot: rand(0, 6.28), spr: Math.floor(rand(0, 3)) });
      }
    };

    const frame = (now: number) => {
      const L = layout();
      if (!started && imgA.complete && imgB.complete) {
        started = true;
        t0 = now - 400; // the first 0.4s of darkness already passed while the stone loaded
      }
      const t = started ? (now - t0) / 1000 : Math.min(0.4, (now - t0) / 1000);
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#040404';
      ctx.fillRect(0, 0, w, h);

      // camera shake after the strike
      const shake = t > T_IMPACT && t < T_IMPACT + 0.5 ? Math.pow(1 - (t - T_IMPACT) / 0.5, 2) * (mobile ? 8 : 15) : 0;
      if (shake) ctx.translate(rand(-shake, shake), rand(-shake, shake));

      // ambient embers
      ctx.globalCompositeOperation = 'lighter';
      const amb = Math.min(1, t / 0.9);
      for (const e of embers) {
        e.y -= e.v * dt;
        e.x += Math.sin(t * 0.8 + e.ph) * 0.0003;
        if (e.y < -0.02) e.y = 1.02;
        ctx.globalAlpha = Math.max(0, amb * (0.3 + 0.3 * Math.sin(t * 3 + e.ph)));
        const sz = e.s * 6;
        ctx.drawImage(glowOrange, e.x * w - sz / 2, e.y * h - sz / 2, sz, sz);
      }
      ctx.globalAlpha = 1;

      // The two halves: accelerate in, strike, recoil, settle, then dissolve into light
      const dissolve = t > T_DISSOLVE ? Math.min(1, (t - T_DISSOLVE) / 0.8) : 0;
      if (t > 0.35 && dissolve < 1) {
        const fly = Math.min(1, Math.max(0, (t - 0.45) / (T_IMPACT - 0.45)));
        const e = Math.pow(fly, 2.4);
        const far = Math.max(w, h) * 0.85;
        const spring = t >= T_IMPACT ? Math.exp(-6 * (t - T_IMPACT)) * Math.abs(Math.cos(9 * (t - T_IMPACT))) : 0;
        const gap = t >= T_IMPACT ? spring * 0.06 * L.S : 0;
        const alpha = Math.min(1, (t - 0.35) * 4) * (1 - dissolve);
        const pose = (ee: number, g: number) => ({
          a: { x: -far * 0.75 * (1 - ee) - nrm.x * g, y: -far * 0.35 * (1 - ee) - nrm.y * g, r: -1.1 * (1 - ee) },
          b: { x: far * 0.75 * (1 - ee) + nrm.x * g, y: far * 0.35 * (1 - ee) + nrm.y * g, r: 0.9 * (1 - ee) },
        });
        if (fly > 0 && fly < 1) {
          for (let gI = 4; gI >= 1; gI--) {
            const pg = pose(Math.pow(Math.max(0, fly - gI * 0.035), 2.4), 0);
            drawHalf(imgA, halves.a, pg.a.x, pg.a.y, pg.a.r, 0.08 * alpha, L);
            drawHalf(imgB, halves.b, pg.b.x, pg.b.y, pg.b.r, 0.08 * alpha, L);
          }
        }
        const p = pose(e, gap);
        drawHalf(imgA, halves.a, p.a.x, p.a.y, p.a.r, alpha, L);
        drawHalf(imgB, halves.b, p.b.x, p.b.y, p.b.r, alpha, L);
      }

      // Crack heat after the strike, flaring as the stone dissolves into light
      if (t >= T_IMPACT - 0.03 && t < T_DISSOLVE + 1.2) {
        const heat = Math.max(0, 1 - (t - T_IMPACT) / 1.2) * 0.8 + 0.3 + dissolve * 0.6 + 0.08 * Math.sin(t * 9);
        const fade = t > T_DISSOLVE + 0.8 ? 1 - (t - T_DISSOLVE - 0.8) / 0.4 : 1;
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i <= 26; i++) {
          const u = i / 26;
          const p = L.toScreen(onCrack(u));
          const sz = L.S * (0.045 + 0.03 * Math.sin(u * Math.PI)) * (0.8 + heat * 0.5);
          ctx.globalAlpha = Math.max(0, Math.min(1, 0.32 * heat) * fade * (1 - dissolve * 0.7));
          ctx.drawImage(glowOrange, p.x - sz / 2, p.y - sz / 2, sz, sz);
        }
        ctx.globalAlpha = 1;
      }

      // Strike: flash, white-hot crack line and shockwave
      if (!burst && t >= T_IMPACT) {
        burst = true;
        spawnBurst(L);
      }
      if (t > T_IMPACT && t < T_IMPACT + 0.55) {
        const k = (t - T_IMPACT) / 0.55;
        const c = L.toScreen(onCrack(0.5));
        ctx.globalCompositeOperation = 'lighter';
        const r = L.S * (0.35 + 0.9 * k);
        const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, r);
        g.addColorStop(0, `rgba(255,240,215,${0.55 * (1 - k) ** 3})`);
        g.addColorStop(0.25, `rgba(255,150,40,${0.28 * (1 - k) ** 2})`);
        g.addColorStop(1, 'rgba(255,128,13,0)');
        ctx.fillStyle = g;
        ctx.fillRect(-50, -50, w + 100, h + 100);
        const a = L.toScreen(cTop);
        const b = L.toScreen(cBot);
        ctx.strokeStyle = `rgba(255,250,235,${(1 - k) ** 1.5})`;
        ctx.lineWidth = 1.5 + 3.5 * (1 - k);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = `rgba(255,200,140,${0.3 * (1 - k)})`;
        ctx.lineWidth = 2 * (1 - k) + 0.5;
        ctx.beginPath();
        ctx.ellipse(c.x, c.y, L.S * 1.4 * k, L.S * 1.05 * k, -0.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Smoke, lit warm near the strike and cooling to grey
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.age += dt;
        if (p.age > p.life) {
          puffs.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.s *= 1 + 0.28 * dt;
        p.rot += 0.12 * dt;
        const k = p.age / p.life;
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = Math.sin(Math.min(1, k * 3) * (Math.PI / 2)) * (1 - k) * (1 - k) * 0.75;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.drawImage(smokeSprites[p.spr], -p.s / 2, -p.s / 2, p.s, p.s);
        if (k < 0.35) {
          ctx.globalCompositeOperation = 'lighter';
          ctx.globalAlpha = (0.35 - k) * 0.3;
          ctx.drawImage(glowOrange, -p.s / 2, -p.s / 2, p.s, p.s);
        }
        ctx.restore();
      }

      // Stone chips tumbling under gravity
      const scale = L.S / 700;
      for (let i = chips.length - 1; i >= 0; i--) {
        const c = chips[i];
        c.age += dt;
        if (c.age > c.life) {
          chips.splice(i, 1);
          continue;
        }
        c.vy += 900 * dt * scale;
        c.vx *= 0.99;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        c.r += c.vr * dt;
        const k = c.age / c.life;
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1 - k * k;
        ctx.translate(c.x, c.y);
        ctx.rotate(c.r);
        ctx.beginPath();
        for (let j = 0; j < c.pts.length; j += 2) {
          if (j) ctx.lineTo(c.pts[j] * c.s, c.pts[j + 1] * c.s);
          else ctx.moveTo(c.pts[j] * c.s, c.pts[j + 1] * c.s);
        }
        ctx.closePath();
        ctx.fillStyle = '#2a2724';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,140,40,0.5)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }

      // Sparks: drag, gravity, cooling colour, a streak with a hot glowing head
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      const grav = 980 * scale;
      const drag = Math.exp(-2.1 * dt);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.age += dt;
        if (s.age > s.life) {
          sparks.splice(i, 1);
          continue;
        }
        s.vx *= drag;
        s.vy = s.vy * drag + grav * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const k = s.age / s.life;
        ctx.strokeStyle = sparkColor(k, 1 - k * 0.6);
        ctx.lineWidth = s.w * (1 - k * 0.5);
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * 0.022, s.y - s.vy * 0.022);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        if (k < 0.35) {
          const sz = 10 * s.w * (1 - k);
          ctx.globalAlpha = 0.6 * (1 - k / 0.35);
          ctx.drawImage(glowWhite, s.x - sz / 2, s.y - sz / 2, sz, sz);
          ctx.globalAlpha = 1;
        }
      }

      // Ember vortex that gathers around the forming mark
      if (!vortex && t > T_IMPACT + 0.6) {
        vortex = true;
        for (let i = 0, n = Math.round(170 * q + 40); i < n; i++) {
          orbit.push({ x: NaN, y: NaN, a: rand(0, Math.PI * 2), r: rand(0.9, 1.9), age: -rand(0, 0.8), life: rand(2.2, 3.2), w: rand(0.7, 1.6) });
        }
      }
      const R = Math.min(w, h) * (mobile ? 0.3 : 0.24);
      const mc = { x: w / 2, y: h / 2 - (mobile ? 70 : 60) };
      for (let i = orbit.length - 1; i >= 0; i--) {
        const o = orbit[i];
        o.age += dt;
        if (o.age < 0) continue;
        if (o.age > o.life) {
          orbit.splice(i, 1);
          continue;
        }
        const k = o.age / o.life;
        o.a += dt * (1.6 + k * 2.2);
        o.r += (1 - o.r) * 0.03;
        const px = mc.x + Math.cos(o.a) * R * o.r;
        const py = mc.y + Math.sin(o.a) * R * o.r * 0.86;
        if (!Number.isNaN(o.x)) {
          ctx.strokeStyle = sparkColor(0.3 + k * 0.6, Math.sin(Math.min(1, k * 2.5) * Math.PI * 0.5) * (1 - k) * 0.85);
          ctx.lineWidth = o.w;
          ctx.beginPath();
          ctx.moveTo(o.x, o.y);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
        o.x = px;
        o.y = py;
      }

      tl?.time(Math.max(0, t));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // DOM: the official mark assembles from its five facets, then the wordmark and tagline.
    const facets = mark.current!.querySelectorAll('path');
    tl = gsap
      .timeline({ paused: true })
      .set(mark.current, { autoAlpha: 1 })
      .fromTo(
        facets,
        { opacity: 0, x: (i) => [-90, 60, 110, -60, 80][i], y: (i) => [-50, 40, -90, 100, 70][i], rotate: (i) => [-30, 25, 45, -35, 20][i], scale: 0.5, transformOrigin: '50% 50%' },
        { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 1.1, ease: 'expo.out', stagger: 0.07 },
        T_DISSOLVE - 0.1,
      )
      .fromTo(mark.current, { filter: 'drop-shadow(0 0 0px rgba(255,128,13,0))' }, { filter: 'drop-shadow(0 0 34px rgba(255,128,13,0.8))', duration: 0.7, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T_DISSOLVE + 0.4)
      .fromTo(word.current!.querySelectorAll('span'), { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.045 }, 3.7)
      .fromTo(line.current, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'expo.inOut' }, 4.1)
      .fromTo(tag.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 4.25);

    // Hand-off when the canvas clock reaches the end; a timer backs it up if the tab is throttled.
    const end = window.setTimeout(() => finish(), (TOTAL + 1.5) * 1000);
    const check = window.setInterval(() => {
      if (started && (performance.now() - t0) / 1000 >= TOTAL) finish();
    }, 100);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && finish();
    window.addEventListener('keydown', onKey);

    function finish() {
      if (doneRef.current) return;
      doneRef.current = true;
      setLeaving(true);
      gsap.to(root.current, { opacity: 0, duration: 0.9, ease: 'power2.inOut', onComplete: () => onDoneRef.current() });
    }
    (root.current as HTMLDivElement & { skip?: () => void }).skip = finish;

    return () => {
      cancelAnimationFrame(raf);
      tl?.kill();
      window.clearTimeout(end);
      window.clearInterval(check);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const skip = () => (root.current as (HTMLDivElement & { skip?: () => void }) | null)?.skip?.();

  return (
    <div ref={root} className="fixed inset-0 z-[95] overflow-hidden bg-void" role="region" aria-label="FLINTORA intro animation" aria-live="off">
      <canvas ref={canvas} className="absolute inset-0" aria-hidden />
      {/* cinematic vignette and film grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.75)_100%)]" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-[8vh]">
        <svg ref={mark} viewBox="0 0 486 735" className="invisible h-[clamp(5.5rem,15vh,9.5rem)] w-auto overflow-visible" aria-hidden>
          <path fill="#FF800D" d={SPARK_TOP} />
          <path fill="#FF9810" d={SPARK_TOP_SHADE} />
          <path fill="#FFA912" d={SPARK_TOP_HI} />
          <path fill="#FF800D" d={SPARK_BOTTOM} />
          <path fill="#FFA912" d={SPARK_BOTTOM_HI} />
        </svg>
        <div ref={word} className="display mt-[4vh] flex overflow-hidden text-[clamp(2.2rem,9vw,6.2rem)] tracking-[0.06em] text-white" aria-hidden>
          {'FLINTORA'.split('').map((c, i) => (
            <span key={i} className="inline-block opacity-0">{c}</span>
          ))}
        </div>
        <div ref={line} className="mt-5 h-[3px] w-16 origin-center scale-x-0 bg-spark" aria-hidden />
        <p ref={tag} className="mt-5 text-[clamp(0.95rem,1.4vw,1.2rem)] tracking-[0.04em] text-soft opacity-0">Where Ideas Spark.</p>
      </div>
      {!leaving && (
        <button
          type="button"
          onClick={skip}
          className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] rounded-full border border-white/20 bg-void/40 px-5 py-2.5 text-[0.8rem] font-semibold tracking-[0.12em] text-white/80 uppercase backdrop-blur transition-colors hover:border-spark hover:text-white"
        >
          Skip intro
        </button>
      )}
    </div>
  );
}
