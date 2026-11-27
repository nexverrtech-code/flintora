import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/*
 * Hero composition: the official spark F, extruded and lit warmly, surrounded by dark
 * fractured flint fragments that float at different depths. Pointer movement tilts the
 * whole arrangement; each layer drifts at its own pace for gentle parallax.
 */

const TOP = [[96, 227], [486, 0], [413, 181], [16, 416]];
const BOTTOM = [[169, 327], [338, 403], [0, 735]];

function shape(pts: number[][]) {
  const s = new THREE.Shape();
  pts.forEach(([x, y], i) => {
    const px = (x - 243) / 100;
    const py = -(y - 367.5) / 100;
    if (i) s.lineTo(px, py);
    else s.moveTo(px, py);
  });
  s.closePath();
  return s;
}

function SparkF() {
  const group = useRef<THREE.Group>(null);
  const { top, bottom, mat, hi } = useMemo(() => {
    const opts = { depth: 0.5, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.045, bevelSegments: 3, curveSegments: 1 };
    const top = new THREE.ExtrudeGeometry(shape(TOP), opts);
    const bottom = new THREE.ExtrudeGeometry(shape(BOTTOM), opts);
    top.translate(0, 0, -0.25);
    bottom.translate(0, 0, -0.25);
    const mat = new THREE.MeshStandardMaterial({ color: '#ff800d', emissive: '#ff5a00', emissiveIntensity: 0.22, metalness: 0.2, roughness: 0.35 });
    const hi = new THREE.MeshStandardMaterial({ color: '#ffa912', emissive: '#ff8a00', emissiveIntensity: 0.25, metalness: 0.2, roughness: 0.3 });
    return { top, bottom, mat, hi };
  }, []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!group.current) return;
    group.current.position.y = Math.sin(t * 0.8) * 0.12;
    group.current.rotation.y = Math.sin(t * 0.35) * 0.18;
  });
  return (
    <group ref={group} rotation={[0, 0, -0.04]} scale={0.62}>
      <mesh geometry={top} material={[mat, hi]} />
      <mesh geometry={bottom} material={[mat, hi]} />
    </group>
  );
}

/** Low-poly flint fragment: a displaced icosahedron with flat shading. */
function useFragmentGeometry(seed: number) {
  return useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1, 0).toNonIndexed();
    const p = g.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    const rnd = (n: number) => {
      const x = Math.sin(n * 127.1 + seed * 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    const cache = new Map<string, number>();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const key = `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
      if (!cache.has(key)) cache.set(key, 0.65 + rnd(cache.size) * 0.6);
      v.multiplyScalar(cache.get(key)!);
      v.y *= 0.62;
      p.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, [seed]);
}

const FRAGMENTS = [
  { p: [-3.2, 1.6, -2.5], s: 0.55, seed: 1 },
  { p: [2.9, -1.7, -1.2], s: 0.42, seed: 2 },
  { p: [3.6, 1.9, -3.5], s: 0.7, seed: 3 },
  { p: [-2.4, -2.2, -1.6], s: 0.35, seed: 4 },
  { p: [1.4, 2.6, -2], s: 0.28, seed: 5 },
  { p: [-4.3, -0.4, -4], s: 0.8, seed: 6 },
  { p: [0.9, -2.9, -3], s: 0.5, seed: 7 },
  { p: [4.6, 0.2, -5], s: 0.9, seed: 8 },
  { p: [-1.2, 3.1, -4.5], s: 0.45, seed: 9 },
] as const;

function Fragment({ p, s, seed, count }: { p: readonly number[]; s: number; seed: number; count: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useFragmentGeometry(seed);
  const speed = 0.15 + (seed % 4) * 0.07;
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = clock.elapsedTime;
    m.rotation.x = t * speed + seed;
    m.rotation.y = t * speed * 0.7 + seed * 2;
    m.position.y = p[1] + Math.sin(t * 0.5 + seed) * 0.18;
  });
  if (seed > count) return null;
  return (
    <mesh ref={ref} geometry={geo} position={[p[0], p[1], p[2]]} scale={s}>
      <meshStandardMaterial color="#1a1817" roughness={0.85} metalness={0.15} flatShading />
    </mesh>
  );
}

function Embers({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { geo, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = -Math.random() * 6;
      speeds[i] = 0.15 + Math.random() * 0.45;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { geo, speeds };
  }, [count]);
  useFrame((_, dt) => {
    const a = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = a.getY(i) + speeds[i] * dt;
      if (y > 4.8) y = -4.8;
      a.setY(i, y);
      a.setX(i, a.getX(i) + Math.sin(y * 2 + i) * 0.002);
    }
    a.needsUpdate = true;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#ffa21a" size={0.035} sizeAttenuation transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/** Desktop: the mark sits in the right third of the viewport, measured each frame from the real
 *  visible width, so it never overlaps the headline on the left. Phones: centred above the copy. */
function Rig({ children, compact }: { children: React.ReactNode; compact: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();
  const smooth = useRef(new THREE.Vector2());
  useFrame(() => {
    smooth.current.lerp(pointer, 0.04);
    if (!ref.current) return;
    ref.current.rotation.y = smooth.current.x * 0.22;
    ref.current.rotation.x = -smooth.current.y * 0.14;
    const offsetX = compact ? 0 : viewport.width * 0.3;
    ref.current.position.x = offsetX + smooth.current.x * 0.25;
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene({ compact = false }: { compact?: boolean }) {
  return (
    <Canvas
      dpr={[1, compact ? 1.5 : 1.8]}
      camera={{ position: [0, 0, compact ? 14 : 11.5], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop="always"
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.95;
      }}
    >
      <ambientLight intensity={0.12} />
      <hemisphereLight args={['#ffb070', '#050505', 0.35]} />
      <directionalLight position={[4, 5, 6]} intensity={1.1} color="#ffe2c4" />
      <directionalLight position={[-5, -2, -3]} intensity={2.4} color="#ff800d" />
      <pointLight position={[0, 0, 2.2]} intensity={9} distance={9} color="#ff800d" />
      <Rig compact={compact}>
        <group position={compact ? [0, 2.15, 0] : [0, 0, 0]} scale={compact ? 0.5 : 0.82}>
          <SparkF />
          {FRAGMENTS.map((f) => (
            <Fragment key={f.seed} p={f.p} s={f.s} seed={f.seed} count={compact ? 5 : 9} />
          ))}
        </group>
        <Embers count={compact ? 120 : 320} />
      </Rig>
    </Canvas>
  );
}
