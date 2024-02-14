import React from "react";
import type {
  SlotComponentMetadata,
  SlotShorthandValue,
  UnknownSlotProps,
  UnknownSlotRenderFunction,
  WithRef,
} from "./types";
import { SlotSignal } from "./signal";
import {
  slotRenderFunctionSymbol,
  slotSignalSymbol,
  slotTypeSymbol,
} from "./constants";
import { isIterable } from "./utils/isIterable";

/**
 * Helper function that converts a slot shorthand or properties to a slot properties object
 * The main difference between this function and `slot` is that this function does not return the metadata required for a slot to be considered a properly renderable slot, it only converts the value to a slot properties object
 * @param value - the value of the slot, it can be a slot shorthand or a slot properties object
 */
export function resolveShorthand<Props extends UnknownSlotProps>(
  value: Props | UnknownSlotRenderFunction | SlotSignal | SlotShorthandValue,
  defaultProps?: Partial<WithRef<Props>>
): Props {
  if (SlotSignal.is(value)) {
    return {
      ...defaultProps,
      [slotSignalSymbol]: value,
      [slotRenderFunctionSymbol]: undefined,
    } as Props;
  }
  if (typeof value === "function") {
    return {
      ...defaultProps,
      [slotRenderFunctionSymbol]: value,
      [slotSignalSymbol]: SlotSignal.Create,
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
      [slotSignalSymbol]: SlotSignal.Create,
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
    [slotSignalSymbol]: SlotSignal.Create,
    [slotRenderFunctionSymbol]: undefined,
  };
}
