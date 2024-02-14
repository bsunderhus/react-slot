import {
  SlotComponentType,
  SlotShorthandValue,
  UnknownSlotProps,
  ExtractSlotPropsAs,
  UnknownSlotRenderFunction,
  WithRef,
} from "./types";
import { resolveShorthand } from "./resolveShorthand";
import { SlotSignal } from "./signal";
import {
  slotRenderFunctionSymbol,
  slotSignalSymbol,
  slotTypeSymbol,
} from "./constants";

export function slot<Props extends UnknownSlotProps>(
  type: ExtractSlotPropsAs<Props>,
  value:
    | Props
    | UnknownSlotRenderFunction
    | SlotShorthandValue
    | SlotSignal = SlotSignal.Create,
  defaultProps?: Partial<WithRef<Props>>
): SlotComponentType<Props> {
  /**
   * Casting is required as SlotComponentType is a function, not an object.
   * Although SlotComponentType has a function signature, it is still just an object.
   * This is required to make a slot callable (JSX compatible), this is the exact same approach
   * that is used on `@types/react` exotic components (memo, forwardRef)
   */
  return {
    [slotRenderFunctionSymbol]: undefined,
    [slotSignalSymbol]: SlotSignal.Create,
    [slotTypeSymbol]: type,
    ...resolveShorthand(value, defaultProps),
  } as SlotComponentType<Props>;
}
