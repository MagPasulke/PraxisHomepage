import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://magpasulke.github.io',
  base: '/PraxisHomepage',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
