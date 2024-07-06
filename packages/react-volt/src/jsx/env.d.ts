declare module "react/jsx-dev-runtime" {
  import type * as React from "react";
  export const jsxDEV: (
    type: React.JSX.ElementType,
    props: unknown,
    key?: React.Key,
    source?: unknown,
    self?: unknown
  ) => JSX.Element;
}

declare module "react/jsx-runtime" {
  import type * as React from "react";
  export const jsx: (
    type: React.JSX.ElementType,
    props: unknown,
    key?: React.Key,
    source?: unknown,
    self?: unknown
  ) => JSX.Element;
  export const jsxs: (
    type: React.JSX.ElementType,
    props: unknown,
    key?: React.Key,
    source?: unknown,
    self?: unknown
  ) => JSX.Element;
}
