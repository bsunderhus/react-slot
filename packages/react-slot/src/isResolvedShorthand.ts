import { isValidElement } from "react";
import type {
  SlotShorthandValue,
  UnknownSlotProps,
  UnknownSlotRenderFunction,
} from "./types";
import type { SlotSignal } from "./signal";
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
export function isResolvedShorthand<Props extends UnknownSlotProps>(
  value: Props | UnknownSlotRenderFunction | SlotShorthandValue | SlotSignal
): value is Props {
  return (
    typeof value === "object" && !isIterable(value) && !isValidElement(value)
  );
}
