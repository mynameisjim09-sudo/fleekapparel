import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tanstackBuildConfig } from "@tanstack/react-start/vite";
import path from "path";

export default defineConfig({
  plugins: [
    tanstackBuildConfig(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  }
});
