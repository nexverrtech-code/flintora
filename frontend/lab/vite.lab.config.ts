import { defineConfig } from 'vite';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

// Dev server for the stone lab: serves lab/stone-lab.html and saves posted PNGs.
const out = fileURLToPath(new URL('./renders/', import.meta.url));
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  server: { port: 5199, strictPort: true, fs: { allow: ['..'] } },
  plugins: [
    {
      name: 'save-stone',
      configureServer(server) {
        server.middlewares.use('/__save-stone', (req, res) => {
          const name = new URL(req.url ?? '', 'http://x').searchParams.get('name')?.replace(/[^\w-]/g, '');
          let body = '';
          req.on('data', (c) => (body += c));
          req.on('end', () => {
            mkdirSync(out, { recursive: true });
            writeFileSync(`${out}${name}.png`, Buffer.from(body.split(',')[1], 'base64'));
            res.end('ok');
          });
        });
      },
    },
  ],
});
