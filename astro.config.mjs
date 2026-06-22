import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://username.github.io/Homepage', // Replace 'username' with your GitHub username
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
