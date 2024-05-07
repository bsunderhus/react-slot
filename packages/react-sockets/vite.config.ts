/// <reference types="vitest" />

import { defineConfig } from "vite";
import * as pkgJSON from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: "react-sockets",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: Object.keys(pkgJSON.dependencies),
    },
    minify: false,
  },
  esbuild: {
    /**
     * Note that while the comment says "pure",
     * it confusingly does not indicate that the function being called is pure.
     * For example, it does not indicate that it is ok to cache repeated calls to that function.
     * The name is essentially just an abstract shorthand for "ok to be removed if unused".
     */
    pure: ["console.log", "console.info", "console.error", "console.warn"],
  },
});
