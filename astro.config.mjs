import db from "@astrojs/db"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import webVitals from "@astrojs/web-vitals"
import { defineConfig } from "astro/config"

import netlify from "@astrojs/netlify"

// https://astro.build/config
export default defineConfig({
	integrations: [db(), tailwind(), react(), webVitals(), sitemap()],
	site: "https://12step.vercel.app/",
	output: "server",
	adapter: netlify(),
})
