// Generates web images in /public from the official brand files in /brand-assets.
// Requires poppler's `pdftoppm` for the brand PDF. Run: npm run assets
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdir, readdir, rm, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const brand = join(root, '..', 'brand-assets');
const pub = join(root, 'public');
const out = (p) => join(pub, p);

async function responsive(input, base, widths, opts = {}) {
  for (const w of widths) {
    const img = sharp(input).resize({ width: w, withoutEnlargement: false, ...opts });
    await img.clone().avif({ quality: 52, effort: 6 }).toFile(`${base}-${w}.avif`);
    await img.clone().webp({ quality: 80 }).toFile(`${base}-${w}.webp`);
  }
}

await mkdir(out('images/work'), { recursive: true });
await mkdir(out('images/og'), { recursive: true });
await mkdir(out('logo'), { recursive: true });
await mkdir(out('images/intro'), { recursive: true });

// 1. Brand identity slides -> case study imagery (genuine FLINTORA work)
const tmp = await mkdtemp(join(tmpdir(), 'flintora-'));
execFileSync('pdftoppm', ['-png', '-r', '160', join(brand, 'FLINTORA Brand Identity.pdf'), join(tmp, 'slide')]);
const slides = (await readdir(tmp)).filter((f) => f.endsWith('.png')).sort();
for (const [i, f] of slides.entries()) {
  await responsive(join(tmp, f), out(`images/work/flintora-identity-${i + 1}`), [800, 1600], { height: undefined });
}
await rm(tmp, { recursive: true, force: true });

// 2. Official logo (dark) in standard sizes
const logo = join(brand, 'images', 'flintora-logo-dark.webp');
await sharp(logo).resize(1200).png({ compressionLevel: 9 }).toFile(out('logo/flintora-logo-1200.png'));
await responsive(logo, out('logo/flintora-logo'), [600, 1200]);

// 3. Flint stone artwork (white backdrop removed) as AVIF + WebP
{
  const { data, info } = await sharp(join(brand, 'images', 'flint-stone-spark.jpg')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const m = Math.min(data[i], data[i + 1], data[i + 2]);
    const warmth = data[i] - data[i + 2];
    data[i + 3] = Math.max(0, Math.min(255, Math.max((250 - m) * 4, (warmth - 8) * 6)));
  }
  const png = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
  await responsive(png, out('images/flint-stone'), [600, 1200]);
}

// 3b. The stone split along its glowing crack into two fragments for the Spark Awakening intro.
//     Crack line (artwork pixels): x = 700 - 0.55 * (y - 500). Left of the line = upper fragment.
{
  const { data, info } = await sharp(join(brand, 'images', 'flint-stone-spark.jpg')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const halves = { a: Buffer.from(data), b: Buffer.from(data) };
  for (let y = 0; y < info.height; y++) {
    const cx = 700 - 0.55 * (y - 500);
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const m = Math.min(data[i], data[i + 1], data[i + 2]);
      const warmth = data[i] - data[i + 2];
      const alpha = Math.max(0, Math.min(255, Math.max((250 - m) * 4, (warmth - 8) * 6)));
      // soft 6px feather across the crack so the glowing edge stays on both halves
      const d = x - cx;
      const ka = Math.max(0, Math.min(1, (6 - d) / 12));
      const kb = Math.max(0, Math.min(1, (d + 6) / 12));
      halves.a[i + 3] = Math.round(alpha * ka);
      halves.b[i + 3] = Math.round(alpha * kb);
    }
  }
  const meta = {};
  for (const [k, buf] of Object.entries(halves)) {
    const png = await sharp(buf, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
    const { data: trimmed, info: t } = await sharp(png).trim({ threshold: 1 }).png().toBuffer({ resolveWithObject: true });
    await sharp(trimmed).resize({ width: Math.round(t.width * 0.6) }).webp({ quality: 82, alphaQuality: 90 }).toFile(out(`images/intro/flint-${k}.webp`));
    meta[k] = { x: -t.trimOffsetLeft, y: -t.trimOffsetTop, w: t.width, h: t.height };
  }
  meta.size = info.width;
  const { writeFile } = await import('node:fs/promises');
  await writeFile(join(root, 'src', 'components', '3d', 'flintHalves.json'), JSON.stringify(meta, null, 2));
}

// 4. Social share image: official logo centred on Void Black
const mark = await sharp(logo).resize(630, 630).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#040404' } })
  .composite([{ input: mark, gravity: 'centre' }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(out('images/og/flintora-og.jpg'));

console.log(`Assets generated: ${slides.length} identity slides, logo, stone artwork, OG image.`);
