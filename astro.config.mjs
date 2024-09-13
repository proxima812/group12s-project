import db from "@astrojs/db"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"
// import vercel from "@astrojs/vercel/serverless";

import webVitals from "@astrojs/web-vitals"

import sitemap from "@astrojs/sitemap"

import cloudflare from "@astrojs/cloudflare"

// https://astro.build/config
export default defineConfig({
	integrations: [db(), tailwind(), react(), webVitals(), sitemap()],
	site: "https://12step.vercel.app/",
	output: "server",
	adapter: cloudflare(),
})
