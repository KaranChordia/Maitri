import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: "/Maitri/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        characters: resolve(__dirname, "characters.html"),
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
