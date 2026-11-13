import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // GitHub Pages serves this project from /Boiling-Sports/.
  // Keep the root path for local development.
  base: process.env.GITHUB_ACTIONS ? "/Boiling-Sports/" : "/",
  plugins: [react(), tailwindcss()],
});
