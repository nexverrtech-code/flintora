// Prerenders every route to static HTML, then writes sitemap.xml, robots.txt and llms.txt.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle in dist-ssr).
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const template = await readFile(join(dist, 'index.html'), 'utf8');
const { render, staticPaths, llmsTxt, siteUrl } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const page = (html, head) =>
  template
    .replace('<!--app-head-->', head ? `<title>${esc(head.title)}</title>\n    ${head.tags}` : '')
    .replace('<!--app-html-->', html);

let count = 0;
for (const url of [...staticPaths, '/404']) {
  const { html, head } = await render(url);
  if (!head) throw new Error(`No <Seo> metadata rendered for ${url}`);
  // Flat files (/about -> about.html) are served for the clean URL by Netlify, Vercel
  // (cleanUrls), Cloudflare Pages and vite preview, without trailing-slash redirects.
  const file = url === '/' ? join(dist, 'index.html') : join(dist, `${url.slice(1)}.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(html, head));
  count++;
}

const today = new Date().toISOString().slice(0, 10);
const loc = (p) => `${siteUrl}${p === '/' ? '/' : p}`;
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticPaths
    .map((p) => `  <url><loc>${loc(p)}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
await writeFile(join(dist, 'llms.txt'), llmsTxt());
await rm(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered ${count} pages, sitemap.xml (${staticPaths.length} URLs), robots.txt and llms.txt.`);
