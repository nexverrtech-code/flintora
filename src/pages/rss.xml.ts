import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site: base }) => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const home = new URL('/', base).href;
  const items = posts
    .map((p) => {
      const url = new URL(`/blog/${p.id}/`, base).href;
      return `<item><title>${esc(p.data.title)}</title><link>${url}</link><guid>${url}</guid><description>${esc(p.data.description)}</description><pubDate>${p.data.date.toUTCString()}</pubDate><category>${esc(p.data.category)}</category></item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${site.name} Insights</title><link>${home}</link><description>${esc(site.description)}</description><language>en</language><atom:link href="${new URL('/rss.xml', base).href}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
