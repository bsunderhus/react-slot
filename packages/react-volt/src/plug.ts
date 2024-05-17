import { OutletStatus, _pluggedInSymbol } from "./constants";
import { isSlot, isOutletStatus, isPlugProps } from "./guards";
import type {
  PlugDataType,
  PlugPropsDataType,
  SlotDataType,
} from "./types/datatype.types";
import type { Slot } from "./types/outlet.types";
import type { Adapter } from "./types/plug.types";

/**
 * @public
 *
 * Adapts a plug to the required props of a outlet.
 * This is useful when you want to change the props of a plug before it is rendered in a outlet.
 *
 * @typeParam Input - The type of the plug that will be adapted.
 * @typeParam Output - The type of the plug that will be returned.
 *
 * @param inputPlug - The plug that will be adapted.
 * @param adapter - A function that will be used to adapt the plug.
 *
 * > **Note:** _In the context of electrical systems a plug adapter is a device that allows a plug to connect to a outlet that has a different shape or configuration._
 */
export function adapt<
  Input extends PlugDataType,
  OutputProps extends PlugPropsDataType
>(
  inputPlug: Input,
  adapter: Adapter<Extract<Input, PlugPropsDataType>, OutputProps>
): OutputProps | Exclude<Input, PlugPropsDataType> {
  if (isPlugProps<Extract<Input, PlugPropsDataType>>(inputPlug)) {
    return adapter(inputPlug);
  }
  return inputPlug as Exclude<Input, PlugPropsDataType>;
}

/**
 * @public
 *
 * Resolves a plug to its props.
 *
 * * If the plug is {@link PlugPropsDataType | PlugProps}, it will be returned as is.
 * * If the plug is a {@link SlotDataType | Slot}, it will be resolved to `{children: plug}`.
 * * If the plug is {@link OutletStatus}, it will be resolved to `undefined`.
 *
 * This is useful when you want to access a plug's properties before providing it to a outlet.
 *
 * @typeParam Props - The type of the plug props that will be resolved.
 * @param plug - The plug that will be resolved.
 */
export function resolve<Props extends PlugPropsDataType>(
  plug: Props | SlotDataType | OutletStatus
): Props | undefined {
  if (isOutletStatus(plug)) {
    return undefined;
  }
  if (isSlot(plug)) {
    /**
     * casting here as in this case we have conflict between
     * void elements (elements without children) and non-void elements
     * if the user is properly using typescript this condition can't be reached on void elements
     *
     * if the user is not using typescript and is using a void element as a slot,
     * then React will console.error so we don't need to worry about this case
     */
    return { children: plug } as Props & { children?: Slot<Props> };
  }
  return plug;
}
