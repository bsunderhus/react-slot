import { _$unplugged } from "./constants";
import { isOmniPlug, isPlugProps } from "./guards";
import type {
  OmniPlugDataType,
  PlugDataType,
  PlugPropsDataType,
} from "./types/datatype.types";
import type { Adapter, LockedIn } from "./types/plug.types";
import { id } from "./utils/id";

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
export const adapt: {
  <A extends PlugDataType>(input: A): A;
  <A extends PlugDataType, B extends PlugPropsDataType>(
    input: A,
    adapterAB: Adapter<Extract<A, PlugPropsDataType>, B>
  ): B | Exclude<A, PlugPropsDataType>;
  <
    A extends PlugDataType,
    B extends PlugPropsDataType,
    C extends PlugPropsDataType
  >(
    input: A,
    adapterAB: Adapter<Extract<A, PlugPropsDataType>, B>,
    adapterBC: Adapter<B, C>
  ): C | Exclude<A, PlugPropsDataType>;
  <
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
  <
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
  <
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
} = <Input extends PlugDataType, OutputProps extends PlugPropsDataType>(
  inputPlug: Input,
  ...adapters: Adapter<PlugPropsDataType, PlugPropsDataType>[]
): NoInfer<OutputProps | Exclude<Input, PlugPropsDataType>> =>
  isPlugProps<Extract<Input, PlugPropsDataType>>(inputPlug)
    ? (adapters.reduce<PlugPropsDataType>(
        (acc, adapter) => adapter(acc),
        inputPlug
      ) as OutputProps)
    : (inputPlug as Exclude<Input, PlugPropsDataType>);

/**
 * @public
 *
 * Resolves a plug to its props.
 *
 * * If the plug is {@link PlugPropsDataType | PlugProps}, it will be returned as is.
 * * If the plug is a {@link OmniPlugDataType | Slot}, it will be resolved to `{children: plug}`.
 * * If the plug is {@link PlugStatus}, it will be resolved to `undefined`.
 *
 * This is useful when you want to access a plug's properties before providing it to a outlet.
 *
 * @typeParam Props - The type of the plug props that will be resolved.
 * @param plug - The plug that will be resolved.
 */
export const resolve: {
  <Plug extends PlugDataType>(plug: LockedIn<Plug>): Extract<
    Plug,
    PlugPropsDataType
  >;
  <Plug extends PlugDataType>(plug: Plug):
    | Extract<Plug, PlugPropsDataType>
    | undefined;
} = (plug) => {
  if (plug === _$unplugged) {
    return undefined;
  }
  if (isOmniPlug(plug)) {
    /**
     * casting here as in this case we have conflict between
     * void elements (elements without children) and non-void elements
     * if the user is properly using typescript this condition can't be reached on void elements
     *
     * if the user is not using typescript and is using a void element as a plug,
     * then React will console.error so we don't need to worry about this case
     */
    return { children: plug };
  }
  if (isPlugProps(plug)) {
    return plug;
  }
  throw new TypeError(/** #__DE-INDENT__ */ `
    [react-volt - plug.resolve(plugValue)]:
    A plug got an invalid value "${String(plug)}" (${typeof plug}).
    A valid value for a plug is a React node, plug properties or 'plug.unplugged()'.
  `);
};

/**
 * @public
 *
 * `unplugged` returns a symbol that can be used to
 * indicate that a plug is not connected to an outlet.
 *
 * When an outlet receives a plug with the value of `unplugged`,
 * it will not render the plug.
 *
 * > **Note:** _In the context of electrical systems a plug that is not connected to an outlet is considered unplugged._
 */
export const unplugged = (): typeof _$unplugged => _$unplugged;

/**
 * @public
 *
 * `pluggedIn` is a utility that can be used to create a plug with default props,
 * it would be equivalent to to passing plug props, this is a helper method that does nothing
 * but return the props that are passed to it, its only usage is to ensure type safety.
 *
 * > **Note:** _In the context of electrical systems a plug that is connected to an outlet is considered plugged in._
 */
export const pluggedIn = id as {
  <Plug extends PlugDataType | undefined>(
    defaultProps: NoInfer<Extract<Plug, PlugPropsDataType>>
  ): Extract<Plug, PlugPropsDataType>;
};
