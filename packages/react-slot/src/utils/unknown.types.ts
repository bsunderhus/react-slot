import type * as React from "react";
import type { plugRefTypeSymbol } from "../constants";
import type { PlugRenderer } from "../types";

/**
 * Minimal type for a value that can be used as the `as` prop.
 *
 * This should **ONLY** be used in type templates as in `extends UnknownPlugType`
 * it shouldn't be used as the type of a plug.
 *
 */
export type UnknownPlugType =
  | keyof React.JSX.IntrinsicElements
  | React.ComponentType;

/**
 * Minimal type for a plug render function.
 *
 * This should **ONLY** be used in type templates as in `extends UnknownPlugRenderFunction`
 * it shouldn't be used as the type of a plug render function.
 */
export type UnknownPlugRenderer = PlugRenderer<any>;

/**
 * Minimal type for a plug property definition.
 *
 * This should **ONLY** be used in type templates as in `extends UnknownPlugProps`;
 * it shouldn't be used as the type of a plug props.
 */
export type UnknownPlugProps = {
  as?: UnknownPlugType;
  /**
   * This cannot be internal because its used to infer the plug reference,
   * if removed from public API it'll break the type inference
   */
  [plugRefTypeSymbol]?: unknown;
};
