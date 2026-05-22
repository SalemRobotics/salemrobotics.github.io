// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";
import { cpus } from "node:os";

export default defineConfig({
    prefetch: true,
    site: "https://frc6324.com",
    devToolbar: {
        enabled: false,
    },
    server: {
        host: true,
        port: 6324
    },
    build: {
        concurrency: cpus().length,
        format: "file"
    },
    vite: {
        build: {
            minify: "terser",
            cssMinify: "lightningcss"
        },
        resolve: {
            alias: {
                "@": "/src",
                "@assets": "/src/assets"
            }
        }
    },
    integrations: [sitemap()]
});