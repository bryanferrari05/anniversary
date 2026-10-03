import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  // Percorsi relativi: il sito funziona anche dentro /anniversary/ su GitHub Pages.
  base: "./",
  plugins: [react()],
});
