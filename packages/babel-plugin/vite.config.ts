/// <reference types="vitest" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: "babel-plugin-react-slot",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["@babel/types"],
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
