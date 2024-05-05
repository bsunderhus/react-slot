import * as React from "react";
import type {
  PlugPropsWithRef,
  UnknownPlugProps,
  RefFromPlugProps,
} from "./types";

/**
 * Equivalent to `React.ForwardRefExoticComponent`
 * but with the `ref` type properly inferred based on discrimination of the `as` property.
 *
 * As `React.forwardRef` breaks props and refs into two separate arguments
 * it's inviable to do proper discrimination of unions based on `as` property.
 *
 * This type fixes this issue.
 */
export type ForwardRefComponent<Props extends UnknownPlugProps> =
  React.NamedExoticComponent<
    Props extends any ? PlugPropsWithRef<Props> : never
  >;

/**
 * Wrapper around `React.forwardRef` that properly infers the `ref` type based on the `as` property.
 * @param render - render function
 * @returns forward ref component
 */
// casting is required as React.forwardRef breaks props and refs into two separate arguments
// making it inviable to do proper discrimination of unions based on `as` property
export const forwardRef = React.forwardRef as <Props extends UnknownPlugProps>(
  render: React.ForwardRefRenderFunction<RefFromPlugProps<Props>, Props>
) => ForwardRefComponent<Props>;
