import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import vercel from '@astrojs/vercel/serverless';
import react from "@astrojs/react";
import partytown from '@astrojs/partytown';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://osu.bio",
  output: "server",
  adapter: process.env.CF_PAGES === '1' ? cloudflare() : vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [react(), partytown(), sitemap()],
  webAnalytics: {
    enabled: true,
  },
 });