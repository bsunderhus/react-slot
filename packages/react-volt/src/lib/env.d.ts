/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: "production" | "development";
}

declare const process: { env: ImportMetaEnv };
