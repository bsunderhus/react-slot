import type * as React from "react";
import type { _socketRefTypeSymbol, SocketStatus } from "../constants";
import type { PlugPropsDataType, SocketTypeDataType } from "./datatype.types";
import type {
  DistributiveOmit,
  IntrinsicElementProps,
  IsUnion,
} from "./helper.types";
import type { Slot, SocketRenderer } from "./socket.types";

/**
 * Ensures that the `as` property is optional.
 * This type is used by {@link PlugProps} to ensure
 * that the `as` property is optional for the base type.
 */
type PlugPropsWithOptionalAs<SocketType extends SocketTypeDataType> =
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
  SocketType extends any
    ? Omit<PlugPropsWithRequiredAs<SocketType>, "as"> & { as?: SocketType }
    : never;

/**
 * Type to define a discriminated union of socket properties, by using the concept of
 * [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions)
 * to create a type that represents socket properties that is discriminated by the `as` property
 *
 * @typeParam SocketType - The type of the plug.
 *
 */
export type PlugPropsWithRequiredAs<SocketType extends SocketTypeDataType> =
  SocketType extends keyof React.JSX.IntrinsicElements
    ? PlugPropsFromIntrinsicElementWithRequiredAs<SocketType>
    : SocketType extends React.JSXElementConstructor<any>
    ? PlugPropsFromJSXElementConstructorWithRequiredAs<SocketType>
    : never;

type PlugPropsFromIntrinsicElementWithRequiredAs<
  SocketType extends keyof React.JSX.IntrinsicElements
> =
  /**
   * SocketType extends any takes advantage of the distributive property of conditional types,
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
  SocketType extends any
    ? IntrinsicElementProps<SocketType> & {
        as: SocketType;
        /**
         * A render function that can be used to completely override the markup of the socket.
         * This is a dangerous feature and should be used with caution.
         */
        dangerouslyRenderSocket?: SocketRenderer<SocketType>;
        [_socketRefTypeSymbol]?: IntrinsicElementProps<SocketType>["ref"] extends
          | React.Ref<infer T>
          | undefined
          ? T
          : unknown;
      }
    : never;

type PlugPropsFromJSXElementConstructorWithRequiredAs<
  SocketType extends React.JSXElementConstructor<any>
> =
  /**
   * SocketType extends any takes advantage of the distributive property of conditional types,
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
  SocketType extends any
    ? SocketType extends React.JSXElementConstructor<infer P>
      ? P & {
          as: SocketType;
          /**
           * A render function that can be used to completely override the markup of the socket.
           * This is a dangerous feature and should be used with caution.
           */
          dangerouslyRenderSocket?: SocketRenderer<SocketType>;
          [_socketRefTypeSymbol]?: "ref" extends keyof P
            ? P["ref"] extends React.Ref<infer T> | undefined
              ? T
              : unknown
            : unknown;
        }
      : never
    : never;

/**
 * @public
 * Plug properties is a set of properties that can be used to define a plug, relative to its socket.
 *
 * PlugProps receives SocketType (see {@link SocketTypeDataType}) as generics,
 * it can be either native HTML element string (like `"div"` or `"button"`)
 * or a component type (like `typeof Button` or `React.JSXElementConstructor<ButtonProps>`).
 *
 * @typeParam BaseSocketType - The base type of the socket this plug connects to. The base socket type represents the main default type the socket will be. This value can't be an union, to ensure unions discrimination strategy based on `as` property (see [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) for more details)
 *
 * @typeParam AlternativeSocketType - The alternative type of the socket. The alternative socket types are all other types a socket can have given the proper presence of the discrimination property `as`.
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
 * > **Note:** _in the context of electrical systems, a plug is equivalent to the part of the system that is introduced, while the socket is the part of the system that receives._
 */
export type PlugProps<
  BaseSocketType extends SocketTypeDataType,
  AlternativeSocketType extends SocketTypeDataType = never
> =
  // The `IsUnion` type is used to ensure that the `BaseSocketType` is not a union,
  // as the base type will have the discrimination property (`as`) optional it can't be a union,
  // as it would break the discrimination strategy
  IsUnion<BaseSocketType> extends false
    ?
        | PlugPropsWithOptionalAs<BaseSocketType>
        | PlugPropsWithRequiredAs<AlternativeSocketType>
    : never;

/**
 * @public
 *
 * There are 3 ways of declaring a plug:
 * 1. {@link PlugPropsPlug} is a plug built from custom properties.
 * 2. {@link SocketTypePlug} is a plug built from the type of the socket it connects to.
 * 3. {@link PrimaryPlug} is a plug built from the properties of a component that declares sockets internally, this is a special type of plug that is defined exclusively by the props.
 *
 * In exception to the {@link PrimaryPlug} plug, a plug will consist of a union of 3 types:
 *
 * 1. {@link PlugPropsDataType | PlugProps}
 * 2. {@link SlotDataType | Slot}
 * 3. {@link SocketStatus}
 *
 * > **Note:** _in the context of electrical systems, a plug is equivalent to the part of the system that is introduced, while the socket is the part of the system that receives._
 */
export type Plug<
  BaseSocketTypeOrPlugProps extends SocketTypeDataType | PlugPropsDataType,
  AlternativeSocketType extends SocketTypeDataType = never
> = BaseSocketTypeOrPlugProps extends SocketTypeDataType
  ? SocketTypePlug<BaseSocketTypeOrPlugProps, AlternativeSocketType>
  : BaseSocketTypeOrPlugProps extends PlugPropsDataType
  ? PlugPropsPlug<BaseSocketTypeOrPlugProps>
  : never;

/**
 * @public
 *
 * @typeParam BaseSocketType - The base type of the socket the plug connects to. The base socket type represents the main default type a plug will connect to. This value can't be an union, to ensure unions discrimination strategy based on `as` property (see [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) for more details).
 *
 * @typeParam AlternativeSocketType - The alternative type of the socket. The alternative socket types are all other types a plug can connect given the proper presence of the discrimination property `as`.
 *
 * @example
 * Here's an example where the base type is `"button"` and alternative types are `"a" | "div"`
 * ```ts
 * type ButtonPlug = SocketTypePlug<"button", "a" | "div">
 * // slightly equivalent to the following:
 * type ButtonPlug =
 *   | {as?: "button"} & IntrinsicElementProps<"button">
 *   | {as: "a"} & IntrinsicElementProps<"a">
 *   | {as: "div"} & IntrinsicElementProps<"div">
 *   | Slot // Slot -> ReactNode in this case
 *   | SocketStatus
 * ```
 *
 * > **Note:** _in the context of electrical systems, a plug is equivalent to the part of the system that is introduced, while the socket is the part of the system that receives._
 */
export type SocketTypePlug<
  BaseSocketType extends SocketTypeDataType,
  AlternativeSocketType extends SocketTypeDataType = never
> =
  // as the base type will have the discrimination property (`as`) optional, it can't be a union,
  // as it would break the discrimination strategy
  IsUnion<BaseSocketType> extends false
    ? PlugPropsPlug<PlugProps<BaseSocketType, AlternativeSocketType>>
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
 *   | SocketStatus
 * ```
 * > **Note:** _in the context of electrical systems, a plug is equivalent to the part of the system that is introduced, while the socket is the part of the system that receives._
 */
export type PlugPropsPlug<Props extends PlugPropsDataType> =
  | Props
  | Slot<Props>
  | SocketStatus;

/**
 * @public
 *
 * The PrimaryPlug is a special type of Lock-in plug that is used to define the properties
 * of a component that will be using sockets internally.
 *
 * Unlike other plugs, the primary plug is defined exclusively by its props ({@link PlugProps}, omitting `ref` and `dangerouslyRenderSocket`).
 *
 * > **Note:** _There is no such thing as a primary plug in the context of electrical systems. This is a borrowed analogy from ignition systems and database systems. In ignition systems the "Primary Circuit" is the main circuit that powers the ignition system. In relational database systems a "Primary Key" is the main unique identifier for records._
 */
export type PrimaryPlug<
  BaseSocketType extends SocketTypeDataType,
  AlternativeSocketType extends SocketTypeDataType = never
> = React.PropsWithoutRef<
  DistributiveOmit<
    PlugProps<BaseSocketType, AlternativeSocketType>,
    "dangerouslyRenderSocket"
  >
>;

export type PropsWithRef<Props extends PlugPropsDataType> =
  React.PropsWithoutRef<Props> &
    React.RefAttributes<NonNullable<Props[typeof _socketRefTypeSymbol]>>;

export type PropsWithoutRenderer<Props extends PlugPropsDataType> =
  Props extends any ? Omit<Props, "dangerouslyRenderSocket"> : never;
