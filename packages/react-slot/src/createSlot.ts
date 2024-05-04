import {
  SlotComponentType,
  SlotShorthandValue,
  UnknownSlotProps,
  ExtractSlotPropsAs,
  UnknownSlotRenderFunction,
  SlotStatus,
  WithRef,
} from "./types";
import { resolveShorthand } from "./resolveShorthand";
import {
  slotRenderFunctionSymbol,
  slotStatusSymbol,
  slotTypeSymbol,
} from "./constants";
import { PluggedIn } from "./constants";

export const createSlot = <Props extends UnknownSlotProps>(
  type: ExtractSlotPropsAs<Props>,
  value:
    | Props
    | UnknownSlotRenderFunction
    | SlotShorthandValue
    | SlotStatus = PluggedIn,
  defaultProps?: Partial<WithRef<Props>>
): SlotComponentType<Props> => {
  /**
   * Casting is required as SlotComponentType is a function, not an object.
   * Although SlotComponentType has a function signature, it is still just an object.
   * This is required to make a slot callable (JSX compatible), this is the exact same approach
   * that is used on `@types/react` exotic components (memo, forwardRef)
   */
  return {
    [slotRenderFunctionSymbol]: undefined,
    [slotStatusSymbol]: PluggedIn,
    [slotTypeSymbol]: type,
    ...resolveShorthand(value, defaultProps),
  } as SlotComponentType<Props>;
};
