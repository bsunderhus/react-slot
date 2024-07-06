import { forwardRef } from "react";
import type * as ReactTypes from "./types/react.types";
import { _$unplugged } from "./constants";
import { isShorthand, isPlugProps, isUnplugged } from "./guards";
import type {
  InferencePlugProps,
  PickDefault,
  Plug,
  PlugProps,
  PlugPropsAdapter,
} from "./types/plug.types";
import type { ObjectDataType, Unlocked } from "./types/helper.types";
import type { ExtendedPlug } from "./types/plug-extend.types";

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
export function adapt<A extends Plug>(
  input: A
): Extract<A, PlugProps | Plug.Unplugged>;
/** @public */
export function adapt<A extends Plug, B extends PlugProps>(
  input: A,
  adapterAB: PlugPropsAdapter<Extract<A, PlugProps>, B>
): B | Extract<A, Plug.Unplugged>;
/** @public */
export function adapt<A extends Plug, B extends PlugProps, C extends PlugProps>(
  input: A,
  adapterAB: PlugPropsAdapter<Extract<A, PlugProps>, B>,
  adapterBC: PlugPropsAdapter<B, C>
): C | Extract<A, Plug.Unplugged>;
/** @public */
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
): D | Extract<A, Plug.Unplugged>;
/** @public */
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
): E | Extract<A, Plug.Unplugged>;
export function adapt(
  inputPlug: Plug,
  ...adapters: PlugPropsAdapter<PlugProps, PlugProps>[]
): Unlocked<PlugProps> {
  if (isUnplugged(inputPlug)) return inputPlug;
  const inputProps = resolveShorthand(inputPlug);
  return adapters.reduce<PlugProps>((acc, adapter) => adapter(acc), inputProps);
}

/**
 * @public
 *
 * Resolves a shorthand plug to plug properties or an unplugged plug.
 *
 * @param plug - The plug that will have its shorthand resolved.
 */
export function resolveShorthand<Props extends PlugProps | Plug.Unplugged>(
  plug: Props | Plug.Shorthand
): Props {
  if (isUnplugged(plug)) return plug;
  if (isPlugProps(plug)) return plug;
  if (isShorthand(plug)) {
    const props: InferencePlugProps = { children: plug };
    /**
     * TSError:
     * Type 'PlugPropsDangerouslyRenderChildren' is not assignable to type 'Props'.
     * 'PlugPropsDangerouslyRenderChildren' is assignable to the constraint of type 'Props',
     * but 'Props' could be instantiated with a different subtype of constraint
     * 'PlugProps<ElementType> | null'.ts(2322)
     *
     * Why casting here:
     * Props may have additional required properties that are not present in `{children: plug}`
     * (hence: 'Props' could be instantiated with a different subtype of constraint)
     * but, by definition of {@link Plug.Shorthand}: if the value is a shorthand,
     * then 'children' is the only required property
     * (this is enforced by {@link Plug.Shorthand} signature, if any other property is required the type will return never)
     *
     * The only way this code is reached, if types were respected, is if
     * `{children: plug}` is a valid value for Props
     */
    return props as Exclude<Props, Plug.Unplugged>;
  }
  throw new TypeError(/** #__DE-INDENT__ */ `
    [plug.resolveShorthand(plugValue)]:
    A plug got an invalid value "${String(plug)}" (${typeof plug}).
    A valid value for a plug is a React node, plug properties or 'plug.unplugged()'.
  `);
}

/**
 * @public
 *
 * A method used to combine multiple plugs into a single plug.
 * As it uses {@link resolveShorthand} internally,
 * this method will also resolve shorthand plugs.
 *
 * This method is useful to provide to a plug default properties and override values.
 * It is similar to how the {@link Object.assign} method works, but for plugs.
 *
 * > **Note:** _In the context of electrical systems a plug extender is a device that allows multiple plugs to converge into a single one._
 */
export function extend<const Plugs extends (Plug | ObjectDataType)[]>(
  ...plugs: [...Plugs]
): ExtendedPlug<Plugs>;
export function extend(...plugs: PlugProps[]): Plug {
  // short-circuit if there are no plugs
  if (plugs.length === 0) return _$unplugged;
  // short-circuit if there is only one plug (in this case we avoid creating one more object)
  if (plugs.length === 1) return resolveShorthand(plugs[0]);
  const resolvedPlug: PlugProps = {};
  for (const plug of plugs) {
    // short-circuit if the plug is unplugged
    if (isUnplugged(plug)) return plug;
    Object.assign(resolvedPlug, resolveShorthand(plug));
  }
  return resolvedPlug;
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
  return _$unplugged;
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
  defaultProps: PickDefault<Extract<NonNullable<P>, InferencePlugProps>>
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
