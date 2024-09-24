import db from "@astrojs/db"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

import netlify from "@astrojs/netlify"

// https://astro.build/config
export default defineConfig({
	site: "https://group12s.netlify.app",
	integrations: [
		db(),
		tailwind(),
		react(),
		sitemap({
			filter: page =>
				page !== "https://group12s.netlify.app/signin" &&
				page !== "https://group12s.netlify.app/signup" &&
				page !== "https://group12s.netlify.app/404" &&
				page !== "https://group12s.netlify.app/admin",
		}),
	],
	output: "server",
	adapter: netlify(),
})
