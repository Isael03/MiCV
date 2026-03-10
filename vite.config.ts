import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import { spawn } from "child_process";
import { builtinModules } from "module";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    electron([
      {
        entry: "src/electron/config/main.ts",
        onstart(options) {
          options.startup();
        },
        vite: {
          build: {
            outDir: "dist-electron",
            emptyOutDir: true,
            minify: false,
            rollupOptions: {
              external: [
                "electron",
                "typeorm",
                "sql.js",
                "reflect-metadata",
                ...builtinModules,
                ...builtinModules.map((m) => `node:${m}`),
              ],
              output: {
                format: "es",
                entryFileNames: "main.mjs",
              },
            },
          },
        },
      },
      {
        entry: "src/electron/preload.ts",
        onstart(options) {
          options.reload();
        },
        vite: {
          build: {
            outDir: "dist-electron",
            emptyOutDir: false,
            rollupOptions: {
              external: ["electron"],
              output: {
                format: "es",
                entryFileNames: "preload.mjs",
              },
            },
            minify: false,
          },
        },
      },
    ]),
    renderer(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/frontend"),
    },
  },
});
