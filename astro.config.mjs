import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";
import { d1, r2 } from "@emdash-cms/cloudflare";

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
  site: "https://burphamfc.co.uk",
  integrations: [
    react(),
    emdash({
      siteUrl: "https://burphamfc.co.uk",
      database: d1({ binding: "DATABASE" }),
      storage: r2({
        binding: "STORAGE",
        baseUrl: "/_emdash/api/media/file",
      }),
    }),
  ],
  devToolbar: { enabled: false },
});
