import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";
import { d1 } from "emdash/db";
import { r2 } from "emdash/storage";

export default defineConfig({
	output: "server",
	adapter: cloudflare({
		platformProxy: {
			d1Bindings: ["DATABASE"],
			r2Bindings: ["STORAGE"],
		},
	}),
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DATABASE" }),
			storage: r2({
				binding: "STORAGE",
				baseUrl: "/_emdash/api/media/file",
			}),
		}),
	],
	devToolbar: { enabled: false },
});
