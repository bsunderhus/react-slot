/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string;
}

declare const process: { env: ImportMetaEnv };
