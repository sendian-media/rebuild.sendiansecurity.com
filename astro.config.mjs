import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL || 'https://sendiansecurity.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
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
