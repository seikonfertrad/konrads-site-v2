import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://konrads.link',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/swiss/'),
    }),
  ],
});
