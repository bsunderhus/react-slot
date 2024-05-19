import type {
  Ref,
  RefAttributes,
  JSXElementConstructor,
  ReactNode,
  ReactElement,
  ElementRef,
} from "react";
import type { OutletStatus } from "../constants";
import type {
  PlugPropsDataType,
  OutletTypeDataType,
  ObjectDataType,
  PlugDataType,
  SlotDataType,
  PlugTypeDataType,
} from "./datatype.types";
import type {
  IntrinsicPlugs,
  UnionToIntersection,
  Error,
  IntrinsicOptionalPlugs,
} from "./helper.types";
import type { Slot } from "./outlet.types";
import { outlet } from "../outlet";

/**
 * @public
 *
 * Helper type that ensures that the `as` property is present in the plug properties.
 * This is the case for outlet types where the `as` property is required.
 */
export type Required<Plug extends PlugDataType> =
  /**
   * Props extends any takes advantage of the distributive property of conditional types,
   * to ensure that the conditional type is distributed over the union of types, creating a union of the conditional types.
   *
   * see {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types} for more information
   *
   * @example
   * ```ts
   * type ToArray<T> = T[]
   * // ToArray<1|2|3> is 1|2|3[]
   *
   * type DistributiveToArray<T> = T extends any ? T[] : never
   * // DistributiveToArray<1|2|3> is 1[]|2[]|3[]
   * ```
   */
  Plug extends PlugPropsDataType
    ? Plug & { as: NonNullable<Plug["as"]> }
    : never;

/**
 * @public
 *
 * Helper type that ensures that the `as` property is optional in the plug properties.
 */
export type Optional<Plug extends PlugDataType> =
  /**
   * Props extends any takes advantage of the distributive property of conditional types,
   * to ensure that the conditional type is distributed over the union of types, creating a union of the conditional types.
   *
   * see {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types} for more information
   *
   * @example
   * ```ts
   * type ToArray<T> = T[]
   * // ToArray<1|2|3> is 1|2|3[]
   *
   * type DistributiveToArray<T> = T extends any ? T[] : never
   * // DistributiveToArray<1|2|3> is 1[]|2[]|3[]
   * ```
   */
  Plug extends PlugPropsDataType
    ? Omit<Plug, "as"> & { as?: Plug["as"] }
    : Plug;

/**
 * @public
 *
 * Substitutes React's ClassAttributes, it removes LegacyRef
 * and adds plug related props with `as` optional.
 */
export interface IntrinsicOptionalPlugAttributes<
  E extends Element,
  Key extends keyof IntrinsicPlugs
> extends RefAttributes<E> {
  as?: Key;
  /**
   * A render function that can be used to completely override the markup of the outlet.
   *
   * This is a dangerous feature and should be used with caution.
   *
   * > **Note:** _In the context of electrical systems a outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
   */
  dangerouslyRenderOutlet?: (
    element: ReactElement<JSX.IntrinsicElements[Key], Key>
  ) => ReactNode;
}

/**
 * @public
 *
 * Substitutes React's ClassAttributes, it removes LegacyRef
 * and adds plug related props.
 */
export interface IntrinsicPlugAttributes<
  E extends Element,
  Key extends keyof IntrinsicPlugs
> extends RefAttributes<E> {
  as: Key;
  /**
   * A render function that can be used to completely override the markup of the outlet.
   *
   * This is a dangerous feature and should be used with caution.
   *
   * > **Note:** _In the context of electrical systems a outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
   */
  dangerouslyRenderOutlet?: (
    element: ReactElement<JSX.IntrinsicElements[Key], Key>
  ) => ReactNode;
}

type PluggableProps<
  OutletType extends JSXElementConstructor<Props>,
  Props extends ObjectDataType
> = Props & {
  as?: OutletType;
  /**
   * A render function that can be used to completely override the markup of the outlet.
   *
   * This is a dangerous feature and should be used with caution.
   *
   * > **Note:** _In the context of electrical systems a outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
   */
  dangerouslyRenderOutlet?: (
    element: ReactElement<Props, OutletType>
  ) => ReactNode;
};

/**
 * @public
 *
 * Plug properties is a set of properties that can be used to define a plug, relative to its outlet.
 *
 * @typeParam PlugType - the type of the plug, it can be either:
 * 1. native HTML element string (like `"div"` or `"button"`)
 * 2. optional native HTML element string (like `"div?"` or `"button?"`)
 * 3. a custom element type (like `typeof Button` or `JSXElementConstructor<ButtonProps>`)
 *
 * @example
 * Here's an example where the base type is `"button"` and alternative types are `"a" | "div"`
 * ```ts
 * type PlugProps = PlugProps<"button?" | "a" | "div">
 * // slightly equivalent to the following:
 * type PlugProps =
 *   | {as?: "button"} & IntrinsicElementProps<"button">
 *   | {as: "a"} & IntrinsicElementProps<"a">
 *   | {as: "div"} & IntrinsicElementProps<"div">
 * ```
 *
 * > **Note:** _in the context of electrical systems, a plug is equivalent to the part of the system that is introduced, while the outlet is the part of the system that receives._
 */
export type PlugProps<PlugType extends PlugTypeDataType> =
  PlugType extends keyof IntrinsicPlugs
    ? // Case for 'button' | 'div' | 'input'
      IntrinsicPlugs[PlugType]
    : PlugType extends keyof IntrinsicOptionalPlugs
    ? // Case for 'button?' | 'div?' | 'input?'
      IntrinsicOptionalPlugs[PlugType]
    : // Case for typeof Button | React.FC<ButtonProps> | ...
    PlugType extends JSXElementConstructor<infer Props extends ObjectDataType>
    ? PluggableProps<PlugType, Props>
    : Error<"BasePlugProps expects to be a native element ('button', 'a', 'div', etc,.) or a custom element (typeof Button, React.FC<ButtonProps>)">;

/**
 * @public
 *
 * There are 4 ways of declaring a plug:
 * 1. {@link PropsPlug} is a plug built from custom properties.
 * 2. {@link PlugTypePlug} is a plug built from the type of the outlet it connects to.
 * 3. {@link PrimaryPlug} is a plug built from the properties of a component that declares outlets internally, this is a special type of plug that is defined exclusively by the props.
 * 4. {@link OutletTypePlug} is a plug built from the type of the outlet it connects to.
 *
 * In exception to the {@link PrimaryPlug} plug, a plug will consist of a union of 3 types:
 *
 * 1. {@link PlugPropsDataType | PlugProps}
 * 2. {@link SlotDataType | Slot}
 * 3. {@link OutletStatus}
 *
 * > **Note:** _in the context of electrical systems, a plug is equivalent to the part of the system that is introduced, while the outlet is the part of the system that receives._
 */
export type Plug<
  PlugTypeOrPlugProps extends PlugTypeDataType | PlugPropsDataType
> = PlugTypeOrPlugProps extends PlugTypeDataType
  ? PlugTypePlug<PlugTypeOrPlugProps>
  : PlugTypeOrPlugProps extends PlugPropsDataType
  ? PropsPlug<PlugTypeOrPlugProps>
  : Error<"PlugTypeOrPlugProps expects to be a native element ('button', 'a', 'div', etc,.) or a custom element (typeof Button, React.FC<ButtonProps>)">;

/**
 * @public
 *
 * The PlugTypePlug type declares a plug based on the type of the plug.
 *
 * @typeParam PlugType - The type of the plug (see {@link PlugTypeDataType} for how to properly define plug types)
 *
 * @example
 * Here's an example where the base type is `"button"` and alternative types are `"a" | "div"`
 * ```ts
 * type ButtonPlug = PlugTypePlug<"button?" | "a" | "div">
 * // slightly equivalent to the following:
 * type ButtonPlug =
 *   | {as?: "button"} & IntrinsicElementProps<"button">
 *   | {as: "a"} & IntrinsicElementProps<"a">
 *   | {as: "div"} & IntrinsicElementProps<"div">
 *   | Slot // Slot -> ReactNode in this case
 *   | OutletStatus
 * ```
 *
 * > **Note:** _in the context of electrical systems, a plug is equivalent to the part of the system that is introduced, while the outlet is the part of the system that receives._
 */
export type PlugTypePlug<PlugType extends PlugTypeDataType> = PropsPlug<
  PlugProps<PlugType>
>;

/**
 * @public
 *
 * The PropsPlug type declares a plug based on the properties of the plug.
 *
 * @typeParam Props - The plug properties that defines the plug (see {@link PlugProps} for how to properly define plug properties)
 *
 * @example
 * Here's an example where the base type is `"button"` and alternative types are `"a" | "div"`
 * ```ts
 * type ButtonPlugProps = PropsPlug<PlugProps<"button?" | "a" | "div">>
 * // slightly equivalent to the following:
 * type ButtonPlug =
 *   | {as?: "button"} & IntrinsicElementProps<"button">
 *   | {as: "a"} & IntrinsicElementProps<"a">
 *   | {as: "div"} & IntrinsicElementProps<"div">
 *   | Slot // Slot -> ReactNode in this case
 *   | OutletStatus
 * ```
 * > **Note:** _in the context of electrical systems, a plug is equivalent to the part of the system that is introduced, while the outlet is the part of the system that receives._
 */
export type PropsPlug<Props extends PlugPropsDataType> =
  | Props
  | Slot<Props>
  | OutletStatus;

/**
 * @public
 *
 * The Primary plug is a special type of Lock-in plug that is used to define the properties
 * of a component that will be using outlets internally.
 *
 * Unlike other plugs, the primary plug is defined exclusively by its props ({@link PlugPropsDataType | PlugProps}, omitting `ref` and `dangerouslyRenderOutlet`).
 *
 * > **Note:** _There is no such thing as a primary plug in the context of electrical systems. This is a borrowed analogy from ignition systems and database systems. In ignition systems the "Primary Circuit" is the main circuit that powers the ignition system. In relational database systems a "Primary Key" is the main unique identifier for records._
 */
export type Primary<Plug extends PlugDataType> = Plug extends PlugPropsDataType
  ? Omit<Plug, "dangerouslyRenderOutlet" | "ref">
  : never;

/**
 * @public
 *
 * An adapter is a function that takes a set of input properties and returns a set of output properties.
 *
 * @typeParam InputProps - The input properties that the adapter will receive.
 * @typeParam OutputProps - The output properties that the adapter will return.
 *
 * > **Note:** _In the context of electrical systems, an adapter is a device that allows a plug to connect to an outlet, even if the plug and outlet are not compatible._
 */
export type Adapter<
  in out InputProps extends PlugPropsDataType,
  in out OutputProps extends PlugPropsDataType
> = (inputProps: InputProps) => OutputProps;

/**
 * @public
 *
 * A type that represents the reference element of a plug.
 *
 * The UnionToIntersection utility type is used here to convert
 * an union of plug references into an intersection.
 * This is necessary because we want to ensure that the forwarded ref
 * includes all possible properties from the different plug references.
 *
 * @typeParam Plug - The type of the plug.
 *
 * > **Note:** _In the context of electrical systems a plug is what allows a device to connect to an outlet. It is the sending end of the connection, while the outlet is the receiving end._
 */
export type PlugRefElement<Plug extends PlugDataType> =
  Plug extends PlugPropsDataType ? ElementRef<NonNullable<Plug["as"]>> : never;

/**
 * @public
 *
 * A type that represents the `ref` of a plug.
 *
 * @typeParam Plug - The type of the plug.
 *
 * > **Note:** _In the context of electrical systems a plug is what allows a device to connect to an outlet. It is the sending end of the connection, while the outlet is the receiving end._
 */
export type PlugRef<Plug extends PlugDataType> = Ref<
  UnionToIntersection<PlugRefElement<Plug>>
>;

/**
 * @public
 *
 * A helper type that declares a plug based on the type of the outlet it connects to.
 * This is used internally by {@link outlet} method to declare the type of the plug the outlet will receive.
 *
 * @typeParam OutletType - The type of the outlet the plug connects to.
 *
 * > **Note:** _In the context of electrical systems a plug is what allows a device to connect to an outlet. It is the sending end of the connection, while the outlet is the receiving end._
 */
export type OutletTypePlug<OutletType extends OutletTypeDataType> = PropsPlug<
  PlugProps<
    OutletType extends keyof IntrinsicPlugs
      ? OptionalPlugTypes[OutletType]
      : OutletType
  >
>;

type OptionalPlugTypes = {
  [K in keyof IntrinsicPlugs]: `${K}?`;
};
