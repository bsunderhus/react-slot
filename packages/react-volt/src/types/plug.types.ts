import type {
  Ref,
  RefAttributes,
  PropsWithoutRef,
  JSXElementConstructor,
  ReactNode,
  ReactElement,
} from "react";
import type { _plugRefSymbol, OutletStatus } from "../constants";
import type {
  PlugPropsDataType,
  OutletTypeDataType,
  ObjectDataType,
  PlugDataType,
  SlotDataType,
} from "./datatype.types";
import type {
  DistributiveOmit,
  IntrinsicElements,
  UnionToIntersection,
  Error,
} from "./helper.types";
import type { Slot } from "./outlet.types";

/**
 * @public
 *
 * Helper type that ensures that the `as` property is present in the plug properties.
 * This is the case for alternative outlet types, where the `as` property is required.
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
    ? Plug & { as: NonNullable<Plug["as"]> }
    : never;

/**
 * Type to define a discriminated union of outlet properties, by using the concept of
 * [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions)
 * to create a type that represents outlet properties that is discriminated by the `as` property
 *
 * @typeParam OutletType - The type of the plug.
 *
 */
export type BasePlugProps<BaseOutletType extends OutletTypeDataType> =
  // Case for 'button' | 'div' | 'a' | ...
  BaseOutletType extends keyof IntrinsicElements
    ? IntrinsicElements[BaseOutletType]
    : // Case for typeof Button | React.FC<ButtonProps> | ...
    BaseOutletType extends JSXElementConstructor<
        infer Props extends ObjectDataType
      >
    ? PluggableProps<BaseOutletType, Props>
    : Error<"BasePlugProps expects to be a native element ('button', 'a', 'div', etc,.) or a custom element (typeof Button, React.FC<ButtonProps>)">;

/**
 * Override on React's ClassAttributes, it removes LegacyRef
 * and adds plug related props.
 */
export interface HTMLPlugAttributes<
  E extends HTMLElement,
  Key extends keyof IntrinsicElements
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
  [_plugRefSymbol]?: E;
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
  [_plugRefSymbol]?: Props extends { ref?: Ref<infer T> } ? T : never;
};

/**
 * @public
 * Plug properties is a set of properties that can be used to define a plug, relative to its outlet.
 *
 * PlugProps receives OutletType (see {@link OutletTypeDataType}) as generics,
 * it can be either native HTML element string (like `"div"` or `"button"`)
 * or a component type (like `typeof Button` or `JSXElementConstructor<ButtonProps>`).
 *
 * @typeParam BaseOutletType - The base type of the outlet this plug connects to. The base outlet type represents the main default type the outlet will be. This value can't be an union, to ensure unions discrimination strategy based on `as` property (see [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) for more details)
 *
 * @typeParam OptionalOutletType - The alternative type of the outlet. The alternative outlet types are all other types a outlet can have given the proper presence of the discrimination property `as`.
 *
 * @example
 * Here's an example where the base type is `"button"` and alternative types are `"a" | "div"`
 * ```ts
 * type PlugProps = PlugProps<"button", "a" | "div">
 * // slightly equivalent to the following:
 * type PlugProps =
 *   | {as?: "button"} & IntrinsicElementProps<"button">
 *   | {as: "a"} & IntrinsicElementProps<"a">
 *   | {as: "div"} & IntrinsicElementProps<"div">
 * ```
 *
 * > **Note:** _in the context of electrical systems, a plug is equivalent to the part of the system that is introduced, while the outlet is the part of the system that receives._
 */
export type PlugProps<
  BaseOutletType extends OutletTypeDataType,
  OptionalOutletType extends OutletTypeDataType = never
> = BasePlugProps<BaseOutletType> | Optional<BasePlugProps<OptionalOutletType>>;

/**
 * @public
 *
 * There are 3 ways of declaring a plug:
 * 1. {@link PropsPlug} is a plug built from custom properties.
 * 2. {@link OutletTypePlug} is a plug built from the type of the outlet it connects to.
 * 3. {@link PrimaryPlug} is a plug built from the properties of a component that declares outlets internally, this is a special type of plug that is defined exclusively by the props.
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
  BaseOutletTypeOrPlugProps extends OutletTypeDataType | PlugPropsDataType,
  OptionalOutletType extends OutletTypeDataType = never
> = BaseOutletTypeOrPlugProps extends OutletTypeDataType
  ? OutletTypePlug<BaseOutletTypeOrPlugProps, OptionalOutletType>
  : BaseOutletTypeOrPlugProps extends PlugPropsDataType
  ? PropsPlug<BaseOutletTypeOrPlugProps>
  : Error<"BaseOutletTypeOrPlugProps expects to be a native element ('button', 'a', 'div', etc,.) or a custom element (typeof Button, React.FC<ButtonProps>)">;

/**
 * @typeParam BaseOutletType - The base type of the outlet the plug connects to. The base outlet type represents the main default type a plug will connect to. This value can't be an union, to ensure unions discrimination strategy based on `as` property (see {@link https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions | Discriminated Unions} for more details).
 *
 * @typeParam OptionalOutletType - The alternative type of the outlet. The alternative outlet types are all other types a plug can connect given the proper presence of the discrimination property `as`.
 *
 * @example
 * Here's an example where the base type is `"button"` and alternative types are `"a" | "div"`
 * ```ts
 * type ButtonPlug = OutletTypePlug<"button", "a" | "div">
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
export type OutletTypePlug<
  BaseOutletType extends OutletTypeDataType,
  OptionalOutletType extends OutletTypeDataType = never
> = PropsPlug<PlugProps<BaseOutletType, OptionalOutletType>>;

/**
 * @typeParam Props - The plug properties that defines the plug (see {@link PlugProps} for how to properly define plug properties)
 *
 * @example
 * Here's an example where the base type is `"button"` and alternative types are `"a" | "div"`
 * ```ts
 * type ButtonPlugProps = PlugPropsPlug<PlugProps<"button", "a" | "div">>
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
 * Unlike other plugs, the primary plug is defined exclusively by its props ({@link PlugProps}, omitting `ref` and `dangerouslyRenderOutlet`).
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
 * > **Note:** _In the context of electrical systems, an adapter is a device that allows a plug to connect to an outlet, even if the plug and outlet are not compatible._
 */
export type Adapter<
  in out InputProps extends PlugPropsDataType,
  in out OutputProps extends PlugPropsDataType
> = (inputProps: InputProps) => OutputProps;

/**
 * @public
 *
 * A type that represents the reference of a plug.
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
export type PlugRefElement<Plug extends PlugDataType> = Plug extends {
  [_plugRefSymbol]?: infer R;
}
  ? R
  : never;

export type PlugRef<Plug extends PlugDataType> = Ref<
  UnionToIntersection<PlugRefElement<Plug>>
>;
