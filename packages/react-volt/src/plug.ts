import type * as ReactTypes from "./types/react.types";
import { forwardRef } from "react";
import { _$unplugged } from "./constants";
import { isShorthand, isPlugProps } from "./guards";
import type {
  LockedIn,
  Plug,
  PlugProps,
  PlugPropsWithChildren,
} from "./types/plug.types";

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
  <A extends Plug>(input: A): A;
  <A extends Plug, B extends PlugProps>(
    input: A,
    adapterAB: PlugProps.Adapter<Extract<A, PlugProps>, B>
  ): B | Exclude<A, PlugProps>;
  <A extends Plug, B extends PlugProps, C extends PlugProps>(
    input: A,
    adapterAB: PlugProps.Adapter<Extract<A, PlugProps>, B>,
    adapterBC: PlugProps.Adapter<B, C>
  ): C | Exclude<A, PlugProps>;
  <
    A extends Plug,
    B extends PlugProps,
    C extends PlugProps,
    D extends PlugProps
  >(
    input: A,
    adapterAB: PlugProps.Adapter<Extract<A, PlugProps>, B>,
    adapterBC: PlugProps.Adapter<B, C>,
    adapterCD: PlugProps.Adapter<C, D>
  ): D | Exclude<A, PlugProps>;
  <
    A extends Plug,
    B extends PlugProps,
    C extends PlugProps,
    D extends PlugProps,
    E extends PlugProps
  >(
    input: A,
    adapterAB: PlugProps.Adapter<Extract<A, PlugProps>, B>,
    adapterBC: PlugProps.Adapter<B, C>,
    adapterCD: PlugProps.Adapter<C, D>,
    adapterDE: PlugProps.Adapter<D, E>
  ): E | Exclude<A, PlugProps>;
  <
    A extends Plug,
    B extends PlugProps,
    C extends PlugProps,
    D extends PlugProps,
    E extends PlugProps,
    F extends PlugProps
  >(
    input: A,
    adapterAB: PlugProps.Adapter<Extract<A, PlugProps>, B>,
    adapterBC: PlugProps.Adapter<B, C>,
    adapterCD: PlugProps.Adapter<C, D>,
    adapterDE: PlugProps.Adapter<D, E>,
    adapterEF: PlugProps.Adapter<E, F>
  ): F | Exclude<A, PlugProps>;
} = <Input extends Plug, OutputProps extends PlugProps>(
  inputPlug: Input,
  ...adapters: PlugProps.Adapter<PlugProps, PlugProps>[]
): NoInfer<OutputProps | Exclude<Input, PlugProps>> =>
  isPlugProps<Extract<Input, PlugProps>>(inputPlug)
    ? (adapters.reduce<PlugProps>(
        (acc, adapter) => adapter(acc),
        inputPlug
      ) as OutputProps)
    : (inputPlug as Exclude<Input, PlugProps>);

/**
 * @public
 *
 * Resolves a plug to its props.
 *
 * * If the plug is {@link PlugProps | PlugProps}, it will be returned as is.
 * * If the plug is a {@link Plug.Shorthand}, it will be resolved to `{children: plug}`.
 * * If the plug is {@link Plug.Unplugged}, it will be resolved to `undefined`.
 *
 * This is useful when you want to access a plug's properties before providing it to a outlet.
 *
 * @typeParam Props - The type of the plug props that will be resolved.
 * @param plug - The plug that will be resolved.
 */
export const resolve: {
  <Props extends PlugPropsWithChildren>(plug: LockedIn<Plug<Props>>): Props;
  <Props extends PlugPropsWithChildren>(plug: Plug<Props>): Props | undefined;
} = (plug: Plug): PlugPropsWithChildren | undefined => {
  if (plug === _$unplugged) {
    return undefined;
  }
  if (isShorthand(plug)) {
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
export const unplugged = (): Plug.Unplugged => _$unplugged;

/**
 * @public
 *
 * `pluggedIn` is a utility that can be used to create a plug with default props,
 * it would be equivalent to to passing plug props, this is a helper method that does nothing
 * but return the props that are passed to it, its only usage is to ensure type safety.
 *
 * > **Note:** _In the context of electrical systems a plug that is connected to an outlet is considered plugged in._
 */
export const pluggedIn: <P extends Plug | undefined>(
  defaultProps: NoInfer<Extract<P, PlugProps>>
) => Extract<P, PlugProps> = (v) => v;

/**
 * @public
 *
 * A method used to declare a function component that has plug properties.
 * It works similar to the `ReactTypes.forwardRef` method, but without breaking `ref` type into a separate argument, as doing so would cause reconciliation issues for unions.
 *
 * > **Note:** _In React v19 New function components will no longer need `forwardRef`. In future versions they will deprecate and remove forwardRef. {@link https://react.dev/blog/2024/04/25/react-19#ref-as-a-prop | ref as a prop}_.
 *
 * > This method is not necessary for React v19 and above. If you are using React v19 or above, you can just declare a function directly
 *
 */
export const fc = <Props extends PlugProps>(
  fn: (props: Props) => ReactTypes.ReactNode
): ReactTypes.NamedExoticComponent<Props> =>
  forwardRef<unknown, Props & ReactTypes.RefAttributes<unknown>>((props, ref) =>
    fn(
      process.env.NODE_ENV === "development"
        ? Object.freeze<Props>({ ...props, ref })
        : ((props.ref = ref), props)
    )
  ) as ReactTypes.NamedExoticComponent<Props>;
