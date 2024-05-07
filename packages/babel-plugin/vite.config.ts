/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: "babel-plugin-react-sockets",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["@babel/types"],
    },
  },
});
