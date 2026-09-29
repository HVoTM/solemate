import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Adding path alias for shadcn and other components
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
});
