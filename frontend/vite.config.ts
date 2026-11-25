import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000, // three.js (HeroScene) is ~920 kB raw; it is lazy-loaded after first paint
  },
  ssr: {
    // Bundle these for the prerender step so Node never has to resolve their ESM/CJS edge cases.
    noExternal: ['framer-motion', 'lucide-react', '@radix-ui/react-accordion', '@radix-ui/react-slot', 'class-variance-authority'],
  },
});
