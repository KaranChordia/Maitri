import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const rawBasePath = process.env.MAITRI_BASE_PATH || "/Maitri/";
const basePath = rawBasePath.endsWith("/") ? rawBasePath : `${rawBasePath}/`;

export default defineConfig({
  base: basePath,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        characters: resolve(__dirname, "characters.html"),
        manu: resolve(__dirname, "manu.html"),
        nandini: resolve(__dirname, "nandini.html"),
        savitribai: resolve(__dirname, "savitribai.html"),
        kalpana: resolve(__dirname, "kalpana.html"),
        library: resolve(__dirname, "library.html"),
        storyUniverse: resolve(__dirname, "story-universe.html"),
      },
      output: {
        manualChunks: {
          three: ["three"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
