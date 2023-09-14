import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ClosePlugin from './vite-plugin-close.js';

export default defineConfig({
  plugins: [react(), ClosePlugin()],
  root: "src",
  build: {
    minify: true,
    rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    }
}
});
