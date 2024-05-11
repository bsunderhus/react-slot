import type {
  Ref,
  RefAttributes,
  PropsWithoutRef,
  JSXElementConstructor,
} from "react";
import type { _outletRefTypeSymbol, OutletStatus } from "../constants";
import type { PlugPropsDataType, OutletTypeDataType } from "./datatype.types";
import type {
  DistributiveOmit,
  IntrinsicElementProps,
  IsUnion,
} from "./helper.types";
import type { Slot, OutletRenderer } from "./outlet.types";

/**
 * Ensures that the `as` property is optional.
 * This type is used by {@link PlugProps} to ensure
 * that the `as` property is optional for the base type.
 */
type PlugPropsWithOptionalAs<OutletType extends OutletTypeDataType> =
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
  OutletType extends any
    ? Omit<PlugPropsWithRequiredAs<OutletType>, "as"> & { as?: OutletType }
    : never;

/**
 * Type to define a discriminated union of outlet properties, by using the concept of
 * [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions)
 * to create a type that represents outlet properties that is discriminated by the `as` property
 *
 * @typeParam OutletType - The type of the plug.
 *
 */
export type PlugPropsWithRequiredAs<OutletType extends OutletTypeDataType> =
  OutletType extends keyof JSX.IntrinsicElements
    ? PlugPropsFromIntrinsicElementWithRequiredAs<OutletType>
    : OutletType extends JSXElementConstructor<any>
    ? PlugPropsFromJSXElementConstructorWithRequiredAs<OutletType>
    : never;

type PlugPropsFromIntrinsicElementWithRequiredAs<
  OutletType extends keyof JSX.IntrinsicElements
> =
  /**
   * OutletType extends any takes advantage of the distributive property of conditional types,
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
  OutletType extends any
    ? IntrinsicElementProps<OutletType> & {
        as: OutletType;
        /**
         * A render function that can be used to completely override the markup of the outlet.
         * This is a dangerous feature and should be used with caution.
         */
        dangerouslyRenderOutlet?: OutletRenderer<OutletType>;
        [_outletRefTypeSymbol]?: IntrinsicElementProps<OutletType>["ref"] extends
          | Ref<infer T>
          | undefined
          ? T
          : unknown;
      }
    : never;

type PlugPropsFromJSXElementConstructorWithRequiredAs<
  OutletType extends JSXElementConstructor<any>
> =
  /**
   * OutletType extends any takes advantage of the distributive property of conditional types,
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
  OutletType extends any
    ? OutletType extends JSXElementConstructor<infer P>
      ? P & {
          as: OutletType;
          /**
           * A render function that can be used to completely override the markup of the outlet.
           * This is a dangerous feature and should be used with caution.
           */
          dangerouslyRenderOutlet?: OutletRenderer<OutletType>;
          [_outletRefTypeSymbol]?: "ref" extends keyof P
            ? P["ref"] extends Ref<infer T> | undefined
              ? T
              : unknown
            : unknown;
        }
      : never
    : never;

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
 * @typeParam AlternativeOutletType - The alternative type of the outlet. The alternative outlet types are all other types a outlet can have given the proper presence of the discrimination property `as`.
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
  AlternativeOutletType extends OutletTypeDataType = never
> =
  // The `IsUnion` type is used to ensure that the `BaseOutletType` is not a union,
  // as the base type will have the discrimination property (`as`) optional it can't be a union,
  // as it would break the discrimination strategy
  IsUnion<BaseOutletType> extends false
    ?
        | PlugPropsWithOptionalAs<BaseOutletType>
        | PlugPropsWithRequiredAs<AlternativeOutletType>
    : never;

/**
 * @public
 *
 * There are 3 ways of declaring a plug:
 * 1. {@link PlugPropsPlug} is a plug built from custom properties.
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
  AlternativeOutletType extends OutletTypeDataType = never
> = BaseOutletTypeOrPlugProps extends OutletTypeDataType
  ? OutletTypePlug<BaseOutletTypeOrPlugProps, AlternativeOutletType>
  : BaseOutletTypeOrPlugProps extends PlugPropsDataType
  ? PlugPropsPlug<BaseOutletTypeOrPlugProps>
  : never;

/**
 * @public
 *
 * @typeParam BaseOutletType - The base type of the outlet the plug connects to. The base outlet type represents the main default type a plug will connect to. This value can't be an union, to ensure unions discrimination strategy based on `as` property (see [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) for more details).
 *
 * @typeParam AlternativeOutletType - The alternative type of the outlet. The alternative outlet types are all other types a plug can connect given the proper presence of the discrimination property `as`.
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
  AlternativeOutletType extends OutletTypeDataType = never
> =
  // as the base type will have the discrimination property (`as`) optional, it can't be a union,
  // as it would break the discrimination strategy
  IsUnion<BaseOutletType> extends false
    ? PlugPropsPlug<PlugProps<BaseOutletType, AlternativeOutletType>>
    : never;
/**
 * @public
 *
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
export type PlugPropsPlug<Props extends PlugPropsDataType> =
  | Props
  | Slot<Props>
  | OutletStatus;

/**
 * @public
 *
 * The PrimaryPlug is a special type of Lock-in plug that is used to define the properties
 * of a component that will be using outlets internally.
 *
 * Unlike other plugs, the primary plug is defined exclusively by its props ({@link PlugProps}, omitting `ref` and `dangerouslyRenderOutlet`).
 *
 * > **Note:** _There is no such thing as a primary plug in the context of electrical systems. This is a borrowed analogy from ignition systems and database systems. In ignition systems the "Primary Circuit" is the main circuit that powers the ignition system. In relational database systems a "Primary Key" is the main unique identifier for records._
 */
export type PrimaryPlug<
  BaseOutletType extends OutletTypeDataType,
  AlternativeOutletType extends OutletTypeDataType = never
> = PropsWithoutRef<
  DistributiveOmit<
    PlugProps<BaseOutletType, AlternativeOutletType>,
    "dangerouslyRenderOutlet"
  >
>;

export type PropsWithRef<Props extends PlugPropsDataType> =
  PropsWithoutRef<Props> &
    RefAttributes<NonNullable<Props[typeof _outletRefTypeSymbol]>>;

export type PropsWithoutRenderer<Props extends PlugPropsDataType> =
  Props extends any ? Omit<Props, "dangerouslyRenderOutlet"> : never;
