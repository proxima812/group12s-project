import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import webVitals from "@astrojs/web-vitals";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [db(), tailwind(), react(), webVitals(), sitemap()],
  site: 'https://wix.ro',
  output: "server",
  adapter: vercel()
});