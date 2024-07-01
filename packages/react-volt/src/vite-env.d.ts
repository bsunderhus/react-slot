/// <reference types="vite" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly NODE_ENV: "production" | "development";
}

declare namespace NodeJS {
  interface ProcessEnv extends ImportMetaEnv {}
}
