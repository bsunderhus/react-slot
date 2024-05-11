import { forwardRef as reactForwardRef } from "react";
import type { ForwardRefRenderFunction, NamedExoticComponent } from "react";
import type { PlugPropsDataType } from "./types/datatype.types";
import type { PropsWithRef } from "./types/plug.types";
import { _outletRefTypeSymbol } from "./constants";

/**
 * @public
 *
 * Equivalent to `React.ForwardRefExoticComponent`
 * but with the `ref` type properly inferred based
 * on discrimination of the `as` property.
 *
 * As `React.forwardRef` breaks props and refs into two separate arguments
 * it's inviable to do proper discrimination of unions based on `as` property.
 *
 * This type fixes this issue.
 */
export type ForwardRefComponent<Props extends PlugPropsDataType> =
  NamedExoticComponent<Props extends any ? PropsWithRef<Props> : never>;

/**
 * @public
 *
 * Wrapper around `React.forwardRef` that properly infers the `ref` type based on the `as` property.
 * @param render - render function
 * @returns forward ref component
 */
// casting is required as React.forwardRef breaks props and refs into two separate arguments
// making it inviable to do proper discrimination of unions based on `as` property
export const forwardRef = reactForwardRef as <Props extends PlugPropsDataType>(
  render: ForwardRefRenderFunction<
    NonNullable<Props[typeof _outletRefTypeSymbol]>,
    Props
  >
) => ForwardRefComponent<Props>;
