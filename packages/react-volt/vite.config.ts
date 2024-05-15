/// <reference types="vitest" />

import { defineConfig } from "vite";
import swc from "@rollup/plugin-swc";
import * as pkgJSON from "./package.json";

export default defineConfig({
  plugins: [
    swc({
      swc: {
        jsc: {
          experimental: {
            plugins: [["swc-plugin-de-indent-template-literal", {}]],
          },
        },
      },
    }),
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: "react-volt",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: Object.keys(pkgJSON.dependencies),
    },
    minify: false,
  },
  test: {
    typecheck: {
      enabled: true,
      tsconfig: "./tsconfig.test.json",
    },
  },
});
