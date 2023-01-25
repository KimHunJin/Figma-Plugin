import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  plugins: [react(), reactRefresh(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/assets/": path.resolve(__dirname, "./src/assets"),
      "@/components/": path.resolve(__dirname, "./src/components"),
    },
  },
  build: {
    target: "esnext",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    outDir: "../dist",
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
