// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL de production (à ajuster après le premier déploiement Vercel).
// Elle sert à générer un sitemap.xml et des URLs Open Graph absolues corrects.
const SITE_URL = 'https://pharmaciedecargese.vercel.app';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // Site 100 % statique : aucune fonction serveur, déploiement Vercel sans config.
  output: 'static',
  integrations: [sitemap()],
});
