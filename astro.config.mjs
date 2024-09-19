import db from "@astrojs/db"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

import netlify from "@astrojs/netlify"

// https://astro.build/config
export default defineConfig({
	integrations: [db(), tailwind(), react(), sitemap()],
	site: "https://group12s.netlify.app",
	output: "server",
	adapter: netlify({
		cacheOnDemandPages: true,
	}),
})
