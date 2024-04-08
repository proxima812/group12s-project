import db from "@astrojs/db"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import netlify from "@astrojs/netlify"

// https://astro.build/config
export default defineConfig({
	integrations: [db(), tailwind(), react()],
	output: "server",
	adapter: netlify(),
})
