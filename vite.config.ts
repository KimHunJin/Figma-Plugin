import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import glob from "glob";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/assets/": path.resolve(__dirname, "./src/assets"),
      "@/components/": path.resolve(__dirname, "./src/components"),
    },
  },
  build: {
    target: ["es6"],
    rollupOptions: {
      input: {
        plugins: "plugins/controller.ts",
        ui: "src/main.tsx",
        html: "index.html",
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".")[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        entryFileNames: (entry) => {
          console.log("entry", entry);
          return "assets/js/[name].js";
        },
        chunkFileNames: "assets/js/[name].js",
      },
    },
  },
});
