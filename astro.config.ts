import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import vercel from '@astrojs/vercel';
import partytown from '@astrojs/partytown';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://darkn.bio",
  output: "server",
  adapter: process.env.CF_PAGES === '1' ? cloudflare() : vercel({
    webAnalytics: {
      enabled: true,
    }
  }),
  integrations: [partytown(), sitemap()]
 });