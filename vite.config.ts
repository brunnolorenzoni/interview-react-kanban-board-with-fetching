import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/vitest-setup.ts"],
  },
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components/",
      "@repositories": "/src/repositories/",
      "@models": "/src/models/",
      "@infra": "/src/infra/",
      "@constants": "/src/constants/",
      "@enums": "/src/enums/",
    },
  },
});
