import { unplugged } from "./constants";
import { isSlot, isPlugProps } from "./guards";
import type {
  PlugDataType,
  PlugPropsDataType,
  SlotDataType,
} from "./types/datatype.types";
import type { Slot } from "./types/outlet.types";
import type { Adapter, Unplugged } from "./types/plug.types";

/**
 * @public
 *
 * Adapts a plug to the required props of an outlet.
 * This is useful when you want to change the props of a plug before it is connected into an outlet.
 *
 * @typeParam Input - The type of the plug that will be adapted.
 * @typeParam Output - The type of the plug that will be returned.
 *
 * @param inputPlug - The plug that will be adapted.
 * @param adapters - functions that will be used to adapt the plug.
 *
 * > **Note:** _In the context of electrical systems a plug adapter is a device that allows a plug to connect to a outlet that has a different shape or configuration._
 */
export function adapt<A extends PlugDataType>(input: A): A;
/** @public */
export function adapt<A extends PlugDataType, B extends PlugPropsDataType>(
  input: A,
  adapterAB: Adapter<Extract<A, PlugPropsDataType>, B>
): B | Exclude<A, PlugPropsDataType>;
/** @public */
export function adapt<
  A extends PlugDataType,
  B extends PlugPropsDataType,
  C extends PlugPropsDataType
>(
  input: A,
  adapterAB: Adapter<Extract<A, PlugPropsDataType>, B>,
  adapterBC: Adapter<B, C>
): C | Exclude<A, PlugPropsDataType>;
/** @public */
export function adapt<
  A extends PlugDataType,
  B extends PlugPropsDataType,
  C extends PlugPropsDataType,
  D extends PlugPropsDataType
>(
  input: A,
  adapterAB: Adapter<Extract<A, PlugPropsDataType>, B>,
  adapterBC: Adapter<B, C>,
  adapterCD: Adapter<C, D>
): D | Exclude<A, PlugPropsDataType>;
/** @public */
export function adapt<
  A extends PlugDataType,
  B extends PlugPropsDataType,
  C extends PlugPropsDataType,
  D extends PlugPropsDataType,
  E extends PlugPropsDataType
>(
  input: A,
  adapterAB: Adapter<Extract<A, PlugPropsDataType>, B>,
  adapterBC: Adapter<B, C>,
  adapterCD: Adapter<C, D>,
  adapterDE: Adapter<D, E>
): E | Exclude<A, PlugPropsDataType>;
/** @public */
export function adapt<
  A extends PlugDataType,
  B extends PlugPropsDataType,
  C extends PlugPropsDataType,
  D extends PlugPropsDataType,
  E extends PlugPropsDataType,
  F extends PlugPropsDataType
>(
  input: A,
  adapterAB: Adapter<Extract<A, PlugPropsDataType>, B>,
  adapterBC: Adapter<B, C>,
  adapterCD: Adapter<C, D>,
  adapterDE: Adapter<D, E>,
  adapterEF: Adapter<E, F>
): F | Exclude<A, PlugPropsDataType>;
/** @public */
export function adapt<
  Input extends PlugDataType,
  OutputProps extends PlugPropsDataType
>(
  inputPlug: Input,
  ...adapters: Adapter<PlugPropsDataType, PlugPropsDataType>[]
): NoInfer<OutputProps | Exclude<Input, PlugPropsDataType>> {
  if (isPlugProps<Extract<Input, PlugPropsDataType>>(inputPlug)) {
    return adapters.reduce<PlugPropsDataType>(
      (acc, adapter) => adapter(acc),
      inputPlug
    ) as OutputProps;
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
 * * If the plug is {@link PlugStatus}, it will be resolved to `undefined`.
 *
 * This is useful when you want to access a plug's properties before providing it to a outlet.
 *
 * @typeParam Props - The type of the plug props that will be resolved.
 * @param plug - The plug that will be resolved.
 */
export function resolve<Plug extends PlugDataType>(
  plug: Plug
):
  | Extract<Plug, PlugPropsDataType>
  | (Plug extends Unplugged ? undefined : never) {
  if (plug === unplugged) {
    return undefined as Plug extends Unplugged ? undefined : never;
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
    return { children: plug } as Extract<Plug, PlugPropsDataType> & {
      children?: Slot<Extract<Plug, PlugPropsDataType>>;
    };
  }
  if (isPlugProps<Extract<Plug, PlugPropsDataType>>(plug)) {
    return plug;
  }
  throw new TypeError(/** #__DE-INDENT__ */ `
    [react-volt - plug.resolve(plugValue)]:
    A plug got an invalid value "${String(plug)}" (${typeof plug}).
    A valid value for a plug is a slot, outlet properties or Unplugged.
  `);
}

export { unplugged } from "./constants";
