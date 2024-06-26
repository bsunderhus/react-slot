import { forwardRef } from "react";
import type * as ReactTypes from "./types/react.types";
import { _$dangerouslyRender } from "./constants";
import {
  isShorthand,
  isPlugProps,
  isUnplugged,
  _isDangerouslyRenderFunction,
} from "./guards";
import type {
  PickDefault,
  Plug,
  PlugProps,
  PlugPropsAdapter,
  PlugPropsWithMetadata,
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
export function adapt<A extends Plug>(input: A): A;
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
export function adapt<A extends Plug, B extends PlugProps>(
  input: A,
  adapterAB: PlugPropsAdapter<Extract<A, PlugProps>, B>
): B | Exclude<A, PlugProps>;
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
export function adapt<A extends Plug, B extends PlugProps, C extends PlugProps>(
  input: A,
  adapterAB: PlugPropsAdapter<Extract<A, PlugProps>, B>,
  adapterBC: PlugPropsAdapter<B, C>
): C | Exclude<A, PlugProps>;
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
export function adapt<
  A extends Plug,
  B extends PlugProps,
  C extends PlugProps,
  D extends PlugProps
>(
  input: A,
  adapterAB: PlugPropsAdapter<Extract<A, PlugProps>, B>,
  adapterBC: PlugPropsAdapter<B, C>,
  adapterCD: PlugPropsAdapter<C, D>
): D | Exclude<A, PlugProps>;
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
export function adapt<
  A extends Plug,
  B extends PlugProps,
  C extends PlugProps,
  D extends PlugProps,
  E extends PlugProps
>(
  input: A,
  adapterAB: PlugPropsAdapter<Extract<A, PlugProps>, B>,
  adapterBC: PlugPropsAdapter<B, C>,
  adapterCD: PlugPropsAdapter<C, D>,
  adapterDE: PlugPropsAdapter<D, E>
): E | Exclude<A, PlugProps>;
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
export function adapt<
  A extends Plug,
  B extends PlugProps,
  C extends PlugProps,
  D extends PlugProps,
  E extends PlugProps,
  F extends PlugProps
>(
  input: A,
  adapterAB: PlugPropsAdapter<Extract<A, PlugProps>, B>,
  adapterBC: PlugPropsAdapter<B, C>,
  adapterCD: PlugPropsAdapter<C, D>,
  adapterDE: PlugPropsAdapter<D, E>,
  adapterEF: PlugPropsAdapter<E, F>
): F | Exclude<A, PlugProps>;
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
export function adapt(
  inputPlug: Plug,
  ...adapters: PlugPropsAdapter<PlugProps, PlugProps>[]
): PlugProps | Exclude<Plug, PlugProps> {
  return isPlugProps<Extract<Plug, PlugProps>>(inputPlug)
    ? adapters.reduce<PlugProps>(
        (acc, adapter) => adapter(_assignDangerouslyRenderFunction(acc)),
        inputPlug
      )
    : inputPlug;
}
/**
 * @public
 *
 * Resolves a shorthand plug to plug properties or an unplugged plug.
 *
 * @param plug - The plug that will have its shorthand resolved.
 */
export function resolveShorthand<Props extends PlugProps>(
  plug: Props | Plug.Shorthand
): Props;
/** @public */
export function resolveShorthand<Props extends PlugProps>(
  plug: Props | Plug.Shorthand | Plug.Unplugged
): Props | Plug.Unplugged;
/** @public */
export function resolveShorthand(plug: Plug): Exclude<Plug, Plug.Shorthand> {
  if (isUnplugged(plug)) return plug;
  if (isPlugProps(plug)) return _assignDangerouslyRenderFunction({ ...plug });
  if (isShorthand(plug)) return { children: plug };
  throw new TypeError(/** #__DE-INDENT__ */ `
    [react-volt - plug.resolveShorthand(plugValue)]:
    A plug got an invalid value "${String(plug)}" (${typeof plug}).
    A valid value for a plug is a React node, plug properties or 'plug.unplugged()'.
  `);
}

/**
 * @public
 *
 * Merges multiple plugs into a single plug.
 * If a plug is unplugged, it will short-circuit and return the unplugged plug.
 *
 * Useful to define default props or overrides for a plug.
 */
export function merge<P extends Plug>(...plugs: P[]): P {
  const resolvedPlug = {} as Extract<P, PlugProps>;
  for (const plug of plugs) {
    // short-circuit if the plug is unplugged
    if (isUnplugged(plug)) return plug;
    Object.assign(resolvedPlug, resolveShorthand(plug));
  }
  return resolvedPlug;
}

/**
 * @internal
 *
 * Assigns the `dangerouslyRender` property to the plug props if the children is a function.
 * This method ensures compatibility between children render function and the `dangerouslyRender` method.
 */
// TODO: remove this once/if `children` stops supporting render functions.
export function _assignDangerouslyRenderFunction<
  Props extends PlugPropsWithMetadata
>(plugProps: Props): Props {
  if (_isDangerouslyRenderFunction(plugProps.children)) {
    plugProps.dangerouslyRender = plugProps.children;
    delete plugProps.children;
  }
  return plugProps;
}

/**
 * @public
 *
 * When an outlet receives a plug with the value of {@link Plug.Unplugged},
 * it will not render the plug.
 *
 * > **Note:** _In the context of electrical systems a plug that is not connected to an outlet is considered unplugged._
 */
export function unplugged(): Plug.Unplugged {
  return null;
}

/**
 * @public
 *
 * `pluggedIn` is a utility that can be used to create a plug with default props,
 * it would be equivalent to to passing plug props, this is a helper method that does nothing
 * but return the props that are passed to it, its only usage is to ensure type safety.
 *
 * > **Note:** _In the context of electrical systems a plug that is connected to an outlet is considered plugged in._
 */
export function pluggedIn<P extends Plug | undefined>(
  defaultProps: PickDefault<Extract<NonNullable<P>, PlugProps>>
): NonNullable<P> {
  return defaultProps;
}

/**
 * @public
 *
 * A method used to declare a function component that has plug properties.
 * It works similar to the `ReactTypes.forwardRef` method, but without breaking `ref` type into a separate argument, as doing so would cause reconciliation issues for unions.
 *
 * > **Note:** _In React v19 New function components will no longer need `forwardRef`. In future versions they will deprecate and remove forwardRef. {@link https://react.dev/blog/2024/04/25/react-19#ref-as-a-prop | ref as a prop}_.
 *
 * > This method is not necessary for React v19 and above. If you are using React v19 or above, you can just declare a function directly
 */
export function fc<Props extends PlugProps>(
  fn: (props: Props) => ReactTypes.ReactNode
): ReactTypes.NamedExoticComponent<Props> {
  return forwardRef<unknown, Props & ReactTypes.RefAttributes<unknown>>(
    (props, ref) =>
      fn(
        process.env.NODE_ENV === "development"
          ? Object.freeze<Props>({ ...props, ref })
          : ((props.ref = ref), props)
      )
  ) as ReactTypes.NamedExoticComponent<Props>;
}
