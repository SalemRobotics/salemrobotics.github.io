import { defineConfig, fontProviders, svgoOptimizer } from "astro/config";

import sitemap from "@astrojs/sitemap";
import { cpus } from "node:os";

export default defineConfig({
  build: {
    concurrency: cpus().length,
    format: "file",
    inlineStylesheets: "always",
  },
  compressHTML: "jsx",
  devToolbar: {
    enabled: true,
  },
  experimental: {
    chromeDevtoolsWorkspace: true,
    svgOptimizer: svgoOptimizer({
      plugins: [
        "preset-default",
        "removeXMLNS",
        {
          name: "removeXlink",
          params: {
            includeLegacy: true,
          },
        },
      ],
    }),
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Devil Bauer",
      cssVariable: "--font-devil-bauer",
      display: "swap",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/devil_bauer.woff2"],
            weight: "normal",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.fontsource(),
      name: "Oswald",
      display: "swap",
      cssVariable: "--font-oswald",
    },
  ],
  integrations: [sitemap()],
  prefetch: true,
  server: {
    host: "0.0.0.0",
    port: 6324,
  },
  site: "https://frc6324.com",
  vite: {
    build: {
      assetsInlineLimit: 8192,
    },
    resolve: {
      alias: {
        "@": "/src",
        "@assets": "/src/assets",
      },
    },
  },
});
