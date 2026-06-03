import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://gemeinschaftspraxis-soika.de',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
