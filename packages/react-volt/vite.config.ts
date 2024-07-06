/// <reference types="vitest" />

import { defineConfig } from "vite";
import swc from "@rollup/plugin-swc";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: "./src/lib/index.ts",
        test: "./src/test/index.ts",
        "jsx-runtime": "./src/jsx/jsx-runtime.ts",
        "jsx-dev-runtime": "./src/jsx/jsx-dev-runtime.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        chunkFileNames: "chunks/[name]-[hash].js",
      },
      external: [
        "react",
        "react-dom",
        "react-is",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
    minify: false,
  },
  resolve: {
    alias: {
      "react-volt": "./src/lib/index.ts",
    },
  },
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
  test: {
    typecheck: {
      enabled: true,
      tsconfig: "./tsconfig.vitest.json",
    },
  },
});
