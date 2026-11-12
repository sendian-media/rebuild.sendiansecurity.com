import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL || 'https://sendiansecurity.com',
  output: 'server',
  adapter: process.env.HOSTINGER_BUILD === 'true' ? node({ mode: 'standalone' }) : vercel(),
  trailingSlash: 'never',
  server: {
    host: '127.0.0.1',
    port: 3888,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});
