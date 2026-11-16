// 3D hero: the Flintora spark mark extruded in three.js, with rising embers.
// - Intro: the two shards strike together and throw a burst of sparks.
// - Pointer: the mark tilts toward the cursor.
// - Scroll: the shards drift apart and turn as the hero scrolls away.
// Loaded lazily; the static SVG mark stays visible if WebGL is unavailable.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  PointLight,
  Points,
  Scene,
  Shape,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer,
  ACESFilmicToneMapping,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Mark geometry in SVG units (viewBox 0 0 486 735), y down.
const TOP = [[96, 227], [486, 0], [413, 181], [16, 416]];
const BOTTOM = [[169, 327], [338, 403], [0, 735]];
const S = 1 / 100;
const toShape = (pts: number[][]) => {
  const s = new Shape();
  pts.forEach(([x, y], i) => {
    const px = (x - 243) * S;
    const py = -(y - 367.5) * S;
    i ? s.lineTo(px, py) : s.moveTo(px, py);
  });
  s.closePath();
  return s;
};

const EMBERS = 420;

export function initHero3D(canvas: HTMLCanvasElement, host: HTMLElement): () => void {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.35;
  pmrem.dispose();

  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  // Lights
  scene.add(new HemisphereLight(0xffb070, 0x050505, 0.35));
  const key = new DirectionalLight(0xffe2c4, 0.9);
  key.position.set(4, 6, 8);
  scene.add(key);
  const rim = new DirectionalLight(0xff800d, 3.5);
  rim.position.set(-6, -2, -4);
  scene.add(rim);
  const core = new PointLight(0xff800d, 30, 12, 2);
  core.position.set(0, 0, 2.5);
  scene.add(core);

  // Spark mark
  const extrude = { depth: 0.55, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.05, bevelSegments: 4, curveSegments: 1 };
  const mat = new MeshPhysicalMaterial({
    color: new Color('#ff800d'),
    emissive: new Color('#ff5200'),
    emissiveIntensity: 0.12,
    metalness: 0.15,
    roughness: 0.38,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
  });
  const matHi = mat.clone();
  matHi.color = new Color('#ffa912');
  matHi.emissive = new Color('#ff8a00');

  const topGeo = new ExtrudeGeometry(toShape(TOP), extrude);
  const botGeo = new ExtrudeGeometry(toShape(BOTTOM), extrude);
  topGeo.translate(0, 0, -0.275);
  botGeo.translate(0, 0, -0.275);
  const top = new Mesh(topGeo, [mat, matHi]);
  const bottom = new Mesh(botGeo, [mat, matHi]);

  const mark = new Group();
  mark.add(top, bottom);
  mark.rotation.z = -0.05;
  const rig = new Group();
  rig.add(mark);
  scene.add(rig);

  // Embers
  const pos = new Float32Array(EMBERS * 3);
  const vel = new Float32Array(EMBERS * 3);
  const life = new Float32Array(EMBERS);
  const size = new Float32Array(EMBERS);
  const seed = new Float32Array(EMBERS);
  const isBurst = new Uint8Array(EMBERS);
  const resetEmber = (i: number, burst = false) => {
    isBurst[i] = burst ? 1 : 0;
    if (burst) {
      // Burst from the strike point between the shards
      pos.set([0.3 + (Math.random() - 0.5) * 0.4, 0.4 + (Math.random() - 0.5) * 0.4, 0.3], i * 3);
      const a = Math.random() * Math.PI * 2;
      const sp = 2 + Math.random() * 6;
      vel.set([Math.cos(a) * sp, Math.sin(a) * sp + 1.5, (Math.random() - 0.3) * 3], i * 3);
      life[i] = 0.6 + Math.random() * 0.9;
    } else {
      pos.set([(Math.random() - 0.5) * 26, -8 - Math.random() * 4, (Math.random() - 0.5) * 8 - 1], i * 3);
      vel.set([(Math.random() - 0.5) * 0.3, 0.4 + Math.random() * 1.1, 0], i * 3);
      life[i] = 6 + Math.random() * 10;
    }
    size[i] = burst ? 10 + Math.random() * 18 : 4 + Math.random() * 12;
    seed[i] = Math.random() * 100;
  };
  for (let i = 0; i < EMBERS; i++) {
    resetEmber(i);
    pos[i * 3 + 1] = (Math.random() - 0.5) * 18; // pre-warm across the screen
  }
  const eg = new BufferGeometry();
  eg.setAttribute('position', new BufferAttribute(pos, 3));
  eg.setAttribute('size', new BufferAttribute(size, 1));
  eg.setAttribute('seed', new BufferAttribute(seed, 1));
  const emberMat = new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPx: { value: renderer.getPixelRatio() } },
    vertexShader: /* glsl */ `
      attribute float size; attribute float seed;
      uniform float uTime; uniform float uPx;
      varying float vFlicker;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vFlicker = 0.55 + 0.45 * sin(uTime * 6.0 + seed);
        gl_PointSize = size * uPx * (16.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      varying float vFlicker;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        vec3 col = mix(vec3(1.0, 0.45, 0.05), vec3(1.0, 0.85, 0.45), a * a);
        gl_FragColor = vec4(col, a * a * vFlicker);
      }`,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const embers = new Points(eg, emberMat);
  scene.add(embers);

  // State
  const pointer = new Vector2();
  const pointerSmooth = new Vector2();
  let scrollP = 0;
  let width = 0;
  let height = 0;
  let running = true;
  let visible = true;
  // Minimal clock (three's Clock is deprecated)
  const clock = {
    last: performance.now(),
    elapsedTime: 0,
    getDelta() {
      const now = performance.now();
      const d = (now - this.last) / 1000;
      this.last = now;
      this.elapsedTime += d;
      return d;
    },
  };
  let introT = 0;
  let burstDone = false;

  const resize = () => {
    width = host.clientWidth;
    height = host.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Fit the mark (7.35 units tall) to a share of the viewport height.
    // Wide screens: large mark on the right. Narrow: smaller mark above the copy.
    const narrow = width < 900;
    const share = narrow ? 0.24 : 0.52;
    const visH = (k: number) => 2 * k * Math.tan((camera.fov * Math.PI) / 360);
    camera.position.z = 7.35 / (share * visH(1));
    const vh = visH(camera.position.z);
    const vw = vh * camera.aspect;
    camera.updateProjectionMatrix();
    rig.position.x = narrow ? 0 : vw * 0.29;
    rig.position.y = narrow ? vh * 0.3 : 0;
  };
  resize();

  const onPointer = (e: PointerEvent) => {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  };
  const onScroll = () => {
    const r = host.getBoundingClientRect();
    scrollP = Math.min(1, Math.max(0, -r.top / (r.height || 1)));
  };
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) clock.last = performance.now(); });
  io.observe(host);
  const onVis = () => { running = !document.hidden; if (running) clock.last = performance.now(); };
  document.addEventListener('visibilitychange', onVis);

  const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 4);

  let raf = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!running || !visible) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    introT += dt;

    // Intro strike: shards start apart and slam together at ~0.9s
    const k = easeOut(introT / 0.9);
    const gap = (1 - k) * 2.2 + scrollP * 2.4;
    top.position.set(gap * 0.6, gap * 0.9, 0);
    bottom.position.set(-gap * 0.6, -gap * 0.9, 0);
    top.rotation.z = (1 - k) * 0.4 + scrollP * 0.25;
    bottom.rotation.z = -(1 - k) * 0.4 - scrollP * 0.25;
    if (!burstDone && introT > 0.85) {
      burstDone = true;
      for (let i = 0; i < 120; i++) resetEmber(i, true);
      core.intensity = 140;
    }
    core.intensity += (30 + Math.sin(t * 3) * 6 - core.intensity) * 0.06;

    pointerSmooth.lerp(pointer, 0.05);
    rig.rotation.y = pointerSmooth.x * 0.45 + Math.sin(t * 0.5) * 0.12 + scrollP * 1.2;
    rig.rotation.x = -pointerSmooth.y * 0.3 + Math.sin(t * 0.7) * 0.05;
    mark.position.y = Math.sin(t * 1.1) * 0.12 - scrollP * 1.5;
    const sc = 1 - (1 - k) * 0.3;
    mark.scale.setScalar(sc);

    // Embers
    for (let i = 0; i < EMBERS; i++) {
      const j = i * 3;
      const burst = isBurst[i] === 1;
      vel[j + 1] -= burst ? 6 * dt : 0;
      vel[j] *= burst ? 0.97 : 1;
      pos[j] += (vel[j] + Math.sin(t + seed[i]) * 0.15) * dt;
      pos[j + 1] += vel[j + 1] * dt;
      pos[j + 2] += vel[j + 2] * dt;
      life[i] -= dt;
      if (life[i] <= 0 || pos[j + 1] > 10) resetEmber(i);
    }
    eg.attributes.position.needsUpdate = true;
    eg.attributes.size.needsUpdate = true;
    emberMat.uniforms.uTime.value = t;

    renderer.render(scene, camera);
  };
  tick();
  canvas.classList.add('is-ready');

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('visibilitychange', onVis);
    ro.disconnect();
    io.disconnect();
    topGeo.dispose();
    botGeo.dispose();
    eg.dispose();
    mat.dispose();
    matHi.dispose();
    emberMat.dispose();
    renderer.dispose();
  };
}
