// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://salehh.dev',
  // Preserve the previous inline-element whitespace behavior on Astro 7.
  compressHTML: true,
  integrations: [mdx()],
  vite: {
    server: {
      allowedHosts: ['dev.salehhassen.xyz']
    },
    plugins: [tailwindcss()]
  }
});
