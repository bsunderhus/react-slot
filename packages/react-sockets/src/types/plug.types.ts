import type * as React from "react";
import type { _plugRefTypeSymbol } from "../constants";
import type { UnknownPlugProps, UnknownPlugType } from "./unknown.types";
import type { IntrinsicElementProps, IsUnion } from "./helper.types";
import type { WithSocketRenderer } from "./socket.types";
import type { SocketStatus } from "../socket";

/**
 * Ensures that the `as` property is optional.
 * This type is used by {@link Plug} and {@link MainPlug}
 * to ensure that the `as` property is optional for the base type.
 */
type PlugPropsWithOptionalAs<PlugType extends UnknownPlugType> =
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
  PlugType extends any
    ? Omit<PlugPropsWithRequiredAs<PlugType>, "as"> & { as?: PlugType }
    : never;

/**
 * Type to define a discriminated union of plug property, by using the concept of
 * [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions)
 * to create a type that represents a plug property that is discriminated by the `as` property
 *
 * @typeParam PlugType - The type of the plug property.
 *
 * @example
 * ```ts
 * type ButtonProps = PlugProps<"button"> | PlugProps<"a"> | PlugProps<"div">
 * // equivalent to the following:
 * type ButtonProps =
 *   | {as: "button"} & IntrinsicElementProps<"button">
 *   | {as: "a"} & IntrinsicElementProps<"a">
 *   | {as: "div"} & IntrinsicElementProps<"div">
 * ```
 *
 */
export type PlugPropsWithRequiredAs<PlugType extends UnknownPlugType> =
  PlugType extends keyof React.JSX.IntrinsicElements
    ? PlugPropsFromIntrinsicElementWithRequiredAs<PlugType>
    : PlugType extends React.ComponentType
    ? PlugPropsFromComponentTypeWithRequiredAs<PlugType>
    : never;

type PlugPropsFromIntrinsicElementWithRequiredAs<
  PlugType extends keyof React.JSX.IntrinsicElements
> =
  /**
   * PlugType extends any takes advantage of the distributive property of conditional types,
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
  PlugType extends any
    ? IntrinsicElementProps<PlugType> & {
        as: PlugType;
        [_plugRefTypeSymbol]?: IntrinsicElementProps<PlugType>["ref"] extends
          | React.Ref<infer T>
          | undefined
          ? T
          : unknown;
      }
    : never;

type PlugPropsFromComponentTypeWithRequiredAs<
  PlugType extends React.ComponentType
> =
  /**
   * PlugType extends any takes advantage of the distributive property of conditional types,
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
  PlugType extends any
    ? PlugType extends React.ComponentType<infer P>
      ? P & {
          as: PlugType;
          [_plugRefTypeSymbol]?: "ref" extends keyof P
            ? P["ref"] extends React.Ref<infer T> | undefined
              ? T
              : unknown
            : unknown;
        }
      : never
    : never;

/**
 * @public
 * A plug property is a set of properties that can be used to define a plug.
 *
 * PlugProps receives PlugType (see {@link UnknownPlugType}) as generics,
 * it can be either native HTML element string (like `"div"` or `"button"`)
 * or a component type (like `typeof Button` or `React.ComponentType<ButtonProps>`).
 *
 * @typeParam BasePlugType - The base type of the plug. The base plug type represents the main default type a plug will be. This value can't be an union, to ensure unions discrimination strategy based on `as` property (see [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) for more details)
 *
 * @typeParam AlternativePlugType - The alternative type of the plug. The alternative plug types are all other types a plug can have given the proper presence of the discrimination property `as`.
 *
 * @example
 * Here's an example where the base type is `"button"` and alternative types are `"a" | "div"`
 * ```ts
 * type ButtonPlugProps = PlugProps<"button", "a" | "div">
 * // slightly equivalent to the following:
 * type ButtonPlugProps =
 *   | {as?: "button"} & IntrinsicElementProps<"button">
 *   | {as: "a"} & IntrinsicElementProps<"a">
 *   | {as: "div"} & IntrinsicElementProps<"div">
 * ```
 *
 * > **Note:** in the context of electrical systems, a plug is equivalent to the part of the system that is introduced by the external world, while the socket is the part of the system that receives that external information.
 */
export type PlugProps<
  BasePlugType extends UnknownPlugType,
  AlternativePlugType extends UnknownPlugType = never
> =
  // The `IsUnion` type is used to ensure that the `BasePlugType` is not a union,
  // as the base type will have the discrimination property (`as`) optional it can't be a union,
  // as it would break the discrimination strategy
  IsUnion<BasePlugType> extends false
    ?
        | PlugPropsWithOptionalAs<BasePlugType>
        | PlugPropsWithRequiredAs<AlternativePlugType>
    : never;

/**
 * @public
 * A plug can be either:
 * 1. {@link PlugProps} providing a plug with properties, e.g: `icon={{className: 'custom-class'}}`
 * 2. {@link PlugShorthandValue} simplification of `{{children: someValue}}`
 * 3. {@link SocketRenderer} a render function to completely override the markup
 * 4. {@link SocketStatus} indicating what the socket that would receive the plug should do:
 *
 * Plug receives PlugType (see {@link UnknownPlugType}) as generics,
 * it can be either native HTML element string (like `"div"` or `"button"`)
 * or a component type (like `typeof Button` or `React.ComponentType<ButtonProps>`).
 *
 * @typeParam BasePlugType - The base type of the plug. The base plug type represents the main default type a plug will be. This value can't be an union, to ensure unions discrimination strategy based on `as` property (see [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) for more details)
 *
 * @typeParam AlternativePlugType - The alternative type of the plug. The alternative plug types are all other types a plug can have given the proper presence of the discrimination property `as`.
 *
 * @example
 * Here's an example where the base type is `"button"` and alternative types are `"a" | "div"`
 * ```ts
 * type ButtonPlug = Plug<"button", "a" | "div">
 * // slightly equivalent to the following:
 * type ButtonPlug =
 *   | {as?: "button"} & IntrinsicElementProps<"button">
 *   | {as: "a"} & IntrinsicElementProps<"a">
 *   | {as: "div"} & IntrinsicElementProps<"div">
 *   | PlugShorthandValue
 *   | PlugRenderFunction<'button'>
 *   | SocketStatus
 * ```
 *
 * > **Note:** in the context of electrical systems, a plug is equivalent to the part of the system that is introduced by the external world, while the socket is the part of the system that receives that external information.
 */
export type Plug<
  BasePlugType extends UnknownPlugType,
  AlternativePlugType extends UnknownPlugType = never
> =
  // The `IsUnion` type is used to ensure that the `BasePlugType` is not a union,
  // as the base type will have the discrimination property (`as`) optional it can't be a union,
  // as it would break the discrimination strategy
  IsUnion<BasePlugType> extends false
    ?
        | WithPlugShorthandValue<
            WithSocketRenderer<PlugProps<BasePlugType, AlternativePlugType>>
          >
        | SocketStatus
    : never;

/**
 * @public
 * The shorthand value of a plug allows specifying its children in a more concise way.
 * It can be a string, a number, a React element, or an array of React nodes.
 * This is quite useful as in many cases when you're using a plug you're only
 * interested in setting its children.
 *
 * @example
 * A Button component with an icon plug can be used like this:
 * ```tsx
 * <Button icon={<SomeIcon/>}/>
 * // instead of
 * <Button icon={{children: <SomeIcon/>}}/>
 * ```
 */
export type PlugShorthandValue =
  | string
  | number
  | React.ReactElement
  | Iterable<React.ReactNode>
  | React.ReactPortal;

/**
 * Helper type for {@link Plug}. Adds shorthand types that are assignable to the plug's `children`.
 */
export type WithPlugShorthandValue<Props> =
  | Props
  | ("children" extends keyof Props
      ? Extract<PlugShorthandValue, Props["children"]>
      : never);

export type RefFromPlugProps<Props extends UnknownPlugProps> = NonNullable<
  Props[typeof _plugRefTypeSymbol]
>;

export type PlugPropsWithRef<Props extends UnknownPlugProps> =
  React.PropsWithoutRef<Props> & React.RefAttributes<RefFromPlugProps<Props>>;

export type PlugPropsWithoutRenderer<Props extends UnknownPlugProps> =
  Props extends any ? Omit<Props, "dangerouslyRenderSocket"> : never;

export type TypeFromPlugProps<Props extends UnknownPlugProps> = NonNullable<
  Props["as"]
>;

/**
 * -------------------------------------------------------------------------------
 * PLUG TYPES - END
 * -------------------------------------------------------------------------------
 */
