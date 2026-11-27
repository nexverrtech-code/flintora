// Development tool: renders the procedural stones to transparent PNGs and saves them into
// public/images/stones via the lab server (npm run stones). Not part of the website build.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { makeStoneGeometry, stoneMaterial } from '../src/components/3d/stone';

const SIZE = 1200;
const specs = [
  { name: 'stone-flint-1', seed: 3, palette: 'flint', cuts: 6, rot: [0.4, 0.6, 0.1] },
  { name: 'stone-flint-2', seed: 11, palette: 'flint', cuts: 7, rot: [-0.3, 1.2, 0.4] },
  { name: 'stone-flint-3', seed: 27, palette: 'flint', cuts: 5, rot: [0.9, -0.4, -0.2] },
  { name: 'stone-flint-4', seed: 41, palette: 'flint', cuts: 8, rot: [0.2, 2.1, 0.6] },
  { name: 'stone-granite-1', seed: 7, palette: 'granite', cuts: 5, rot: [0.5, 0.3, -0.3] },
  { name: 'stone-granite-2', seed: 19, palette: 'granite', cuts: 6, rot: [-0.6, 1.6, 0.2] },
  { name: 'stone-jade-1', seed: 5, palette: 'jade', cuts: 5, rot: [0.3, 0.9, 0.1] },
  { name: 'stone-jade-2', seed: 23, palette: 'jade', cuts: 6, rot: [-0.2, -0.8, 0.3] },
] as const;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setSize(SIZE, SIZE);
renderer.setPixelRatio(1);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.9;

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.18;
const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
camera.position.set(0, 0, 5.2);
const key = new THREE.DirectionalLight(0xfff1e0, 1.7);
key.position.set(-3, 4, 4);
const rim = new THREE.DirectionalLight(0xff9a3a, 1.4);
rim.position.set(4, -1, -3);
const fill = new THREE.DirectionalLight(0xbfd0ff, 0.35);
fill.position.set(3, 1, 3);
scene.add(key, rim, fill, new THREE.AmbientLight(0xffffff, 0.08));

const grid = document.getElementById('grid')!;
const status = document.getElementById('status')!;
for (const s of specs) {
  const geo = makeStoneGeometry({ seed: s.seed, detail: 90, cuts: s.cuts, palette: s.palette });
  geo.computeBoundingSphere();
  const mesh = new THREE.Mesh(geo, stoneMaterial());
  mesh.scale.setScalar(1.15 / geo.boundingSphere!.radius);
  mesh.rotation.set(...s.rot);
  scene.add(mesh);
  renderer.render(scene, camera);
  const data = renderer.domElement.toDataURL('image/png');
  const img = new Image();
  img.src = data;
  grid.appendChild(img).style.width = '100%';
  await fetch(`/__save-stone?name=${s.name}`, { method: 'POST', body: data });
  scene.remove(mesh);
  geo.dispose();
}
status.textContent = `Saved ${specs.length} stones.`;
(window as unknown as { __done: boolean }).__done = true;
