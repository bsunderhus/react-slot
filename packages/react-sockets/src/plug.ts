import { SocketStatus } from "./constants";
import { isSlot, isSocketStatus, isPlugProps } from "./guards";
import {
  PlugDataType,
  PlugPropsDataType,
  SlotDataType,
} from "./types/datatype.types";

/**
 * @public
 * Adapts a plug to the required props of a socket.
 * This is useful when you want to change the props of a plug before it is rendered in a socket.
 *
 * @typeParam Input - The type of the plug that will be adapted.
 * @typeParam Output - The type of the plug that will be returned.
 *
 * @param input - The plug that will be adapted.
 * @param plugPropsMapper - A function that will be used to adapt the plug.
 *
 * > **Note:** _In the context of electrical systems a plug adapter is a device that allows a plug to connect to a socket that has a different shape or configuration._
 */
export const adapter = <
  Input extends PlugDataType,
  Output extends PlugPropsDataType
>(
  input: Input | SocketStatus.PluggedIn | undefined,
  plugPropsMapper: (input: NoInfer<Extract<Input, PlugPropsDataType>>) => Output
): NoInfer<
  | Output
  | SocketStatus.PluggedIn
  | Extract<Input, SocketStatus>
  | Extract<Input, SlotDataType>
> => {
  input ??= SocketStatus.PluggedIn;
  if (isPlugProps(input)) {
    return plugPropsMapper(input);
  }
  if (isSlot(input) || isSocketStatus<Extract<Input, SocketStatus>>(input)) {
    return input;
  }
  throw new Error(/** #__DE-INDENT__ */ `
    [react-sockets - adapter()]:
    Invalid input plug "${String(input)}" (${typeof input}).
    A valid value for a plug is a slot, plug properties or SocketStatus.
  `);
};

/**
 * @public
 *
 * Resolves a plug to its props.
 *
 * * If the plug is {@link PlugPropsDataType | PlugProps}, it will be returned as is.
 * * If the plug is {@link SlotDataType | Slot}, it will be resolved to `{children: plug}`.
 * * If the plug is {@link SocketStatus}, it will be resolved to `undefined`.
 *
 * This is useful when you want to access a plug's properties before providing it to a socket.
 *
 * @typeParam Props - The type of the plug props that will be resolved.
 * @param plug - The plug that will be resolved.
 */
export const resolve = <Props extends PlugPropsDataType>(
  plug: Props | SlotDataType | SocketStatus | undefined
): NoInfer<Props> | undefined => {
  if (plug === undefined || isSocketStatus(plug)) {
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
    return { children: plug } as Props & { children?: SlotDataType };
  }
  return plug;
};
