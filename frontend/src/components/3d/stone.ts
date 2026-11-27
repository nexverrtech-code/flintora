import * as THREE from 'three';

/*
 * Procedural natural stone.
 *  1. A dense sphere is pushed in and out with layered (fractal) noise for the lumpy body.
 *  2. Random fracture planes slice it, leaving the flat conchoidal facets typical of knapped flint.
 *  3. Fine high-frequency noise adds surface grain.
 *  4. Vertex colours give mineral variation: a base tone, darker veins and pale quartz flecks.
 * Everything is seeded, so a given seed always produces the same stone.
 */

export interface StoneOptions {
  seed: number;
  detail?: number; // segments per icosahedron edge (about 24 for real-time, 80 for stills)
  cuts?: number; // number of fracture planes
  stretch?: [number, number, number];
  palette?: 'flint' | 'granite' | 'jade';
}

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}

/** Smooth 3D value noise with a seeded hash, plus fractal sum. */
function makeNoise(seed: number) {
  const hash = (x: number, y: number, z: number) => {
    let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(z, 1440662683) + Math.imul(seed, 144665)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  };
  const fade = (t: number) => t * t * (3 - 2 * t);
  const noise = (x: number, y: number, z: number) => {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = fade(x - xi), yf = fade(y - yi), zf = fade(z - zi);
    let v = 0;
    for (let dx = 0; dx < 2; dx++)
      for (let dy = 0; dy < 2; dy++)
        for (let dz = 0; dz < 2; dz++) {
          const w = (dx ? xf : 1 - xf) * (dy ? yf : 1 - yf) * (dz ? zf : 1 - zf);
          v += w * hash(xi + dx, yi + dy, zi + dz);
        }
    return v * 2 - 1;
  };
  const fbm = (x: number, y: number, z: number, oct = 5) => {
    let a = 0.5, f = 1, sum = 0;
    for (let i = 0; i < oct; i++) {
      sum += a * noise(x * f, y * f, z * f);
      f *= 2.03;
      a *= 0.5;
    }
    return sum;
  };
  return { noise, fbm };
}

const PALETTES = {
  // dark charcoal flint with grey flecks
  flint: { base: [0.13, 0.125, 0.12], dark: [0.06, 0.058, 0.056], light: [0.42, 0.41, 0.4], warm: [0.3, 0.17, 0.08] },
  // grey granite with white quartz and dark mica
  granite: { base: [0.36, 0.35, 0.34], dark: [0.12, 0.12, 0.13], light: [0.82, 0.8, 0.78], warm: [0.5, 0.38, 0.34] },
  // green quartzite / jade-like stone
  jade: { base: [0.27, 0.4, 0.36], dark: [0.15, 0.25, 0.22], light: [0.72, 0.8, 0.76], warm: [0.55, 0.42, 0.3] },
} as const;

export function makeStoneGeometry({ seed, detail = 24, cuts = 5, stretch, palette = 'flint' }: StoneOptions) {
  const rand = rng(seed * 9973 + 7);
  const { fbm, noise } = makeNoise(seed);
  const geo = new THREE.IcosahedronGeometry(1, detail);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  const sx = stretch?.[0] ?? 0.85 + rand() * 0.5;
  const sy = stretch?.[1] ?? 0.6 + rand() * 0.35;
  const sz = stretch?.[2] ?? 0.7 + rand() * 0.4;

  // fracture planes (normal + offset)
  const planes = Array.from({ length: cuts }, () => {
    const n = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).normalize();
    return { n, d: 0.5 + rand() * 0.28 };
  });

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    // lumpy body
    let r = 1 + 0.22 * fbm(v.x * 1.3 + seed, v.y * 1.3, v.z * 1.3, 4);
    v.multiplyScalar(r);
    // fracture facets: anything beyond a plane is pressed back onto it (with a faint ripple)
    for (const p of planes) {
      const dist = v.dot(p.n);
      if (dist > p.d) {
        const ripple = 0.012 * noise(v.x * 9, v.y * 9, v.z * 9);
        v.addScaledVector(p.n, -(dist - p.d) + ripple);
      }
    }
    // surface grain: medium pitting plus fine micro-texture
    r = 1 + 0.016 * fbm(v.x * 12, v.y * 12, v.z * 12, 3) + 0.006 * noise(v.x * 55, v.y * 55, v.z * 55);
    v.multiplyScalar(r);
    v.set(v.x * sx, v.y * sy, v.z * sz);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();

  // mineral colouring
  const pal = PALETTES[palette];
  const colors = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const broad = fbm(v.x * 2.2 + 11, v.y * 2.2, v.z * 2.2, 4) * 0.5 + 0.5;
    // thin, rare quartz veins (warped so they wander naturally); none on flint
    const wx = v.x * 2.5 + fbm(v.x * 2 + 3, v.y * 2, v.z * 2, 3) * 1.4;
    const vein = palette !== 'flint' && Math.abs(noise(wx, v.y * 0.6 + 9, v.z * 2.5)) < 0.025 ? 1 : 0;
    const fleckN = noise(v.x * 70 + 0.37 * v.y * 70, v.y * 70 - 0.21 * v.z * 70, v.z * 70);
    const fleck = fleckN > 0.86 ? 1 : 0;
    const speck = noise(v.x * 28 + 3, v.y * 28 + 0.5 * v.x * 28, v.z * 28) * 0.1; // soft grain, kept above mesh resolution
    const warm = Math.max(0, fbm(v.x * 1.4 - 7, v.y * 1.4, v.z * 1.4, 3)) * 0.35;
    const c = [0, 1, 2].map((k) => {
      let x = pal.base[k] * (0.75 + broad * 0.5 + speck);
      x = x * (1 - warm) + pal.warm[k] * warm;
      if (vein) x = x * 0.3 + pal.light[k] * 0.7;
      if (fleck) x = x * 0.35 + pal.light[k] * 0.65;
      return x;
    });
    colors.set(c, i * 3);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

export const stoneMaterial = () =>
  new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92, metalness: 0.02 });
