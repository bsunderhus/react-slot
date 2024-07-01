/// <reference types="vitest" />

import { defineConfig } from "vite";
import swc from "@rollup/plugin-swc";
import * as pkgJSON from "./package.json";

export default defineConfig({
  plugins: [
    swc({
      swc: {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: false,
          },
          preserveAllComments: true,
          experimental: {
            plugins: [["swc-plugin-de-indent-template-literal", {}]],
          },
          minify: {
            compress: false,
          },
        },
      },
    }),
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: "react-volt",
      formats: ["es"],
    },
    rollupOptions: {
      external: Object.keys(pkgJSON.peerDependencies),
    },
    minify: false,
  },
  resolve: {
    alias: {
      "react-volt": "./src/index.ts",
    },
  },
  test: {
    typecheck: {
      enabled: true,
      tsconfig: "./tsconfig.test.json",
    },
  },
});
