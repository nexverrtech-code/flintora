// Regenerates derived brand images in /public from the originals in /brand-assets.
// Run with: npm run assets
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';

const src = new URL('../brand-assets/images/', import.meta.url);
const out = new URL('../public/', import.meta.url);
await mkdir(new URL('images/', out), { recursive: true });

// Flint stone artwork: knock out the white studio backdrop so the stone sits on Void Black.
// Alpha comes from the darkest channel and warmth: neutral white -> transparent, stone and glow -> opaque.
{
  const { data, info } = await sharp(new URL('flint-stone-spark.jpg', src).pathname)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const m = Math.min(data[i], data[i + 1], data[i + 2]);
    const warmth = data[i] - data[i + 2]; // keeps the white-hot, yellow-tinted crack opaque
    const a = Math.max(0, Math.min(255, Math.max((250 - m) * 4, (warmth - 8) * 6)));
    data[i + 3] = a;
  }
  const cut = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
  const buf = await cut.png().toBuffer();
  for (const w of [480, 800, 1200]) {
    await sharp(buf).resize(w).webp({ quality: 82, alphaQuality: 90 })
      .toFile(new URL(`images/flint-stone-${w}.webp`, out).pathname);
  }
}

// Social share image: official dark logo centred on black, 1200x630
const logo = await sharp(new URL('flintora-logo-dark.webp', src).pathname)
  .resize(630, 630)
  .toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#000000' } })
  .composite([{ input: logo, gravity: 'centre' }])
  .png({ compressionLevel: 9, palette: true })
  .toFile(new URL('og-default.png', out).pathname);

// App icons from the SVG favicon
const svg = await readFile(new URL('favicon.svg', out));
for (const [name, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(svg, { density: 300 }).resize(size, size).png().toFile(new URL(name, out).pathname);
}
console.log('Brand assets generated.');
