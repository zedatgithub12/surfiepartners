import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    minify: false,
    target: "es2018",
    publicDir: "https://partners.surfieethiopia.com/",
    sourcemap: true,
  },
});
