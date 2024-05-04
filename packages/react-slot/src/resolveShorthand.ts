import React from "react";
import type {
  SlotShorthandValue,
  UnknownSlotProps,
  UnknownSlotRenderFunction,
  WithRef,
  SlotStatus,
} from "./types";
import { slotRenderFunctionSymbol, slotStatusSymbol } from "./constants";
import { isIterable } from "./utils/isIterable";
import { PluggedIn, UnPlugged } from "./constants";

/**
 * Helper function that converts a slot shorthand or properties to a slot properties object
 * The main difference between this function and `slot` is that this function does not return the metadata required for a slot to be considered a properly renderable slot, it only converts the value to a slot properties object
 * @param value - the value of the slot, it can be a slot shorthand or a slot properties object
 */
export const resolveShorthand = <Props extends UnknownSlotProps>(
  value: Props | UnknownSlotRenderFunction | SlotStatus | SlotShorthandValue,
  defaultProps?: Partial<WithRef<Props>>
): Props => {
  if (value === PluggedIn || value === UnPlugged) {
    return {
      ...defaultProps,
      [slotStatusSymbol]: value,
      [slotRenderFunctionSymbol]: undefined,
    } as Props;
  }
  if (typeof value === "function") {
    return {
      ...defaultProps,
      [slotRenderFunctionSymbol]: value,
      [slotStatusSymbol]: PluggedIn,
    } as Props;
  }
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    isIterable(value) ||
    React.isValidElement<any>(value)
  ) {
    /**
     * casting here as in this case we have conflict between
     * void elements (elements without children) and non-void elements
     * if the user is properly using typescript this condition can't be reached on void elements
     *
     * if the user is not using typescript and is using a void element as a slot,
     * then React will console.error so we don't need to worry about this case
     */
    return {
      ...defaultProps,
      children: value,
      [slotStatusSymbol]: PluggedIn,
      [slotRenderFunctionSymbol]: undefined,
    } as Props & { children: typeof value };
  }
  if (typeof value !== "object" && !import.meta.env.PROD) {
    // TODO: would be nice to have a link to slot documentation in this error message
    console.error(/** #__DE-INDENT__ */ `
      resolveShorthand:
      A slot got an invalid value "${value}" (${typeof value}).
      A valid value for a slot is a slot shorthand or slot properties object.
      Slot shorthands can be strings, numbers, arrays or JSX elements
    `);
  }

  return {
    ...defaultProps,
    ...value,
    [slotStatusSymbol]: PluggedIn,
    [slotRenderFunctionSymbol]: undefined,
  };
};
