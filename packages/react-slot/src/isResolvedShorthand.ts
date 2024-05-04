import { isValidElement } from "react";
import type {
  SlotStatus,
  SlotShorthandValue,
  UnknownSlotProps,
  UnknownSlotRenderFunction,
} from "./types";
import { isIterable } from "./utils/isIterable";

/**
 * Guard method that validates if a shorthand is a slot
 * can be used to extends properties provided by a slot
 *
 * @example
 * ```
 * const backdropSlot = createSlot(backdrop, {
 *  type: 'div',
 *  defaultProps: {
 *    onClick: useEventCallback(event => {
 *     if (isResolvedShorthand(backdrop)) {
 *        backdrop.onClick?.(event)
 *      }
 *      // do something after passing click down the line
 *    }),
 *  },
 * })
 * ```
 */
export const isResolvedShorthand = <Props extends UnknownSlotProps>(
  value: Props | UnknownSlotRenderFunction | SlotShorthandValue | SlotStatus
): value is Props =>
  typeof value === "object" && !isIterable(value) && !isValidElement(value);
