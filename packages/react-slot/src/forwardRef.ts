import * as React from "react";
import { slotRefTypeSymbol } from "./constants";
import type { WithRef, RefFromSlotProps, UnknownSlotProps } from "./types";

/**
 * Equivalent to `React.ForwardRefExoticComponent`
 * but with the `ref` type properly inferred based on discrimination of the `as` property.
 *
 * As `React.forwardRef` breaks props and refs into two separate arguments
 * it's inviable to do proper discrimination of unions based on `as` property.
 *
 * This type fixes this issue.
 */
export type ForwardRefComponent<Props extends UnknownSlotProps> =
  React.NamedExoticComponent<Props extends any ? WithRef<Props> : never>;

/**
 * Wrapper around `React.forwardRef` that properly infers the `ref` type based on the `as` property.
 * @param render - render function
 * @returns forward ref component
 */
// casting is required as React.forwardRef breaks props and refs into two separate arguments
// making it inviable to do proper discrimination of unions based on `as` property
export const forwardRef = React.forwardRef as <Props extends UnknownSlotProps>(
  render: React.ForwardRefRenderFunction<RefFromSlotProps<Props>, Props>
) => ForwardRefComponent<Props>;
