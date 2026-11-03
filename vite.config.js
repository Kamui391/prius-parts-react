import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // "./" нь GitHub Pages-ийн дэд хаяг (/prius-parts-react/) дээр ч зөв ажиллуулна
  base: "./",
  // GitHub Pages нь /docs хавтаснаас сайтыг үйлчилнэ
  build: { outDir: "docs", emptyOutDir: true },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
        quietDeps: true,
        // Bulma-ийн @import ашигласантай холбоотой Sass-ын анхааруулгыг нууна
        silenceDeprecations: ["import", "global-builtin", "color-functions", "if-function"],
      },
    },
  },
});
