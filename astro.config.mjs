import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: "https://osu.bio",
  output: "server",
  adapter: cloudflare(),
  integrations: [react(), partytown()]
});
