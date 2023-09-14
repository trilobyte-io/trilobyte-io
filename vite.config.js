import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ClosePlugin from './vite-plugin-close.js';

export default defineConfig({
  plugins: [react(), ClosePlugin()],
  root: "src",
  build: {
    watch: false
  }
});
