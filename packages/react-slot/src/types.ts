import * as React from "react";
import type {
  slotRefTypeSymbol,
  slotTypeSymbol,
  slotRenderFunctionSymbol,
  slotSignalSymbol,
} from "./constants";
import type { SlotSignal } from "./signal";

/**
 * Minimal type for a value that can be used as the `as` prop.
 *
 * This should **ONLY** be used in type templates as in `extends UnknownSlotType`;
 * it shouldn't be used as the type of a slot.
 */
export type UnknownSlotType =
  | keyof React.JSX.IntrinsicElements
  | React.ComponentType;

export type UnknownSlotRenderFunction = SlotRenderFunction<any>;

/**
 * Minimal type for a slot property definition.
 *
 * This should **ONLY** be used in type templates as in `extends UnknownSlotProps`;
 * it shouldn't be used as the type of a slot.
 */
export type UnknownSlotProps = {
  as?: UnknownSlotType;
  [slotRefTypeSymbol]?: unknown;
  /**
   * @internal
   * Internal reference for the signal, it can be stripped away from types
   */
  [slotSignalSymbol]?: SlotSignal;
  /**
   * @internal
   * Internal reference for the render function, it can be stripped away from types
   */
  [slotRenderFunctionSymbol]?: UnknownSlotRenderFunction;
};

/**
 * Type to define a slot property, by using the concept of
 * [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions)
 * to create a type that represents a slot property that is discriminated by the `as` property
 *
 * @template SlotType The type of the slot property.
 *
 * @example
 * ```ts
 * type ButtonProps = SlotProps<"button"> | SlotProps<"a"> | SlotProps<"div">
 * // equivalent to the following:
 * type ButtonProps =
 *   | {as: "button"} & IntrinsicElementProps<"button">
 *   | {as: "a"} & IntrinsicElementProps<"a">
 *   | {as: "div"} & IntrinsicElementProps<"div">
 * ```
 *
 */
export type SlotProps<SlotType extends UnknownSlotType> =
  SlotType extends keyof React.JSX.IntrinsicElements
    ? SlotPropsFromIntrinsicElement<SlotType>
    : SlotType extends React.ComponentType
    ? SlotPropsFromComponentType<SlotType>
    : never;

type SlotPropsFromIntrinsicElement<
  SlotType extends keyof React.JSX.IntrinsicElements
> =
  /**
   * SlotType extends any takes advantage of the distributive property of conditional types,
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
  SlotType extends any
    ? IntrinsicElementProps<SlotType> & {
        as: SlotType;
        [slotRefTypeSymbol]?: IntrinsicElementProps<SlotType>["ref"] extends
          | React.Ref<infer T>
          | undefined
          ? T
          : unknown;
      }
    : never;

type SlotPropsFromComponentType<SlotType extends React.ComponentType> =
  /**
   * SlotType extends any takes advantage of the distributive property of conditional types,
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
  SlotType extends any
    ? SlotType extends React.ComponentType<infer P>
      ? P & {
          as: SlotType;
          [slotRefTypeSymbol]?: "ref" extends keyof P
            ? P["ref"] extends React.Ref<infer T> | undefined
              ? T
              : unknown
            : unknown;
        }
      : never
    : never;

/**
 * The shorthand value of a slot allows specifying its children in a more concise way.
 * It can be a string, a number, a React element, or an array of React nodes.
 * This is quite useful as in many cases when you're using a slot you're only interested in setting its children.
 *
 * @example
 * A Button component with an icon slot can be used like this:
 * ```tsx
 * <Button icon={<SomeIcon/>}/>
 * // instead of
 * <Button icon={{children: <SomeIcon/>}}/>
 * ```
 */
export type SlotShorthandValue =
  | string
  | number
  | React.ReactElement
  | Iterable<React.ReactNode>
  | React.ReactPortal;

/**
 * Helper type for {@link Slot}. Adds shorthand types that are assignable to the slot's `children`.
 */
export type WithSlotShorthandValue<Props> =
  | Props
  | ("children" extends keyof Props
      ? Extract<SlotShorthandValue, Props["children"]>
      : never);

export type SlotRenderFunction<SlotType extends UnknownSlotType> =
  // The `IsUnion` type is used to ensure that the `SlotType` is not a union,
  // as the slot render function should be for a single type, not a union of types.
  IsUnion<SlotType> extends false
    ? (
        baseType: SlotType,
        props: Omit<SlotProps<SlotType>, "as">
      ) => React.ReactNode
    : never;

/**
 * A slot can be either:
 * 1. {@link SlotProps} providing a slot with properties, e.g: `icon={{className: 'custom-class'}}`
 * 2. {@link SlotShorthandValue} simplification of `{{children: someValue}}`
 * 3. `undefined` indicating that the slot should be used as it is defined internally by it's component
 * 4. `null` indicating the slot should be removed entirely.
 *
 * Slot receives SlotType (see {@link UnknownSlotType}) as generics,
 * it can be either native HTML element string (like `"div"` or `"button"`)
 * or a component type (like `typeof Button` or `React.ComponentType<ButtonProps>`).
 *
 * @template BaseSlotType The base type of the slot. The base slot type represents the main default type a slot will be. This value can't be an union, to ensure unions discrimination strategy based on `as` property (see [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) for more details)
 *
 * @template AlternativeSlotType The alternative type of the slot. The alternative slot types are all other types a slot can have given the proper presence of the discrimination property `as`.
 *
 * @example
 * Here's an example where the base type is `"button"` and alternative types are `"a" | "div"`
 * ```ts
 * type ButtonSlot = Slot<"button", "a" | "div">
 * // slightly equivalent to the following:
 * type ButtonSlot =
 *   | {as?: "button"} & IntrinsicElementProps<"button">
 *   | {as: "a"} & IntrinsicElementProps<"a">
 *   | {as: "div"} & IntrinsicElementProps<"div">
 *   | SlotShorthandValue
 *   | null
 * ```
 */
export type Slot<
  BaseSlotType extends UnknownSlotType,
  AlternativeSlotType extends UnknownSlotType = never
> =
  // The `IsUnion` type is used to ensure that the `BaseSlotType` is not a union,
  // as the base type will have the discrimination property (`as`) optional it can't be a union,
  // as it would break the discrimination strategy
  IsUnion<BaseSlotType> extends false
    ?
        | WithSlotShorthandValue<WithOptionalAs<SlotProps<BaseSlotType>>>
        | SlotRenderFunction<BaseSlotType>
        | SlotProps<AlternativeSlotType>
        | SlotSignal
    : never;

/**
 * Removes SlotShorthandValue, render function and signals from the slot type,
 * extracting just the slot's Props object.
 */
export type ExtractSlotProps<SlotValue> = Exclude<
  SlotValue,
  SlotShorthandValue | SlotSignal | SlotRenderFunction<any> | undefined
>;

/**
 * Type to declare the props of a component that uses slot discrimination based on the `as` property.
 * This type is quite similar to the {@link Slot} type, the main difference being that since we're on the component's
 * property declaration we can't use the {@link SlotShorthandValue} type, as it's not a valid type for a property.
 *
 * > __Another differences:__
 * > 1. a components props can't be `null` or `undefined` as it's not a valid type for a component's property
 * > 2. `ref` is removed from the props as it's not common to have `ref` as a property of a component (it's usually a side argument of a forwardRef component)
 */
export type ComponentProps<
  BaseSlotType extends UnknownSlotType,
  AlternativeSlotType extends UnknownSlotType = never
> =
  // The `IsUnion` type is used to ensure that the `BaseSlotType` is not a union,
  // as the base type will have the discrimination property (`as`) optional it can't be a union,
  // as it would break the discrimination strategy
  IsUnion<BaseSlotType> extends false
    ? React.PropsWithoutRef<
        WithOptionalAs<SlotProps<BaseSlotType>> | SlotProps<AlternativeSlotType>
      >
    : never;

/**
 * Ensures that the `as` property is optional.
 * This type is used by {@link Slot} and {@link ComponentProps}
 * to ensure that the `as` property is optional for the base type.
 */
export type WithOptionalAs<Props extends UnknownSlotProps> =
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
  Props extends any ? Omit<Props, "as"> & { as?: Props["as"] } : never;

export type RefFromSlotProps<Props extends UnknownSlotProps> =
  Props[typeof slotRefTypeSymbol] & {};

export type WithRef<Props extends UnknownSlotProps> = Props &
  React.RefAttributes<RefFromSlotProps<Props>>;

/**
 * A definition of a slot, as a component, very similar to how a React component is declared,
 * but with some additional metadata that is used to determine how to render the slot.
 */
export type SlotComponentType<Props extends UnknownSlotProps> =
  React.ExoticComponent<React.PropsWithChildren<{}>> &
    WithRef<Props> &
    SlotComponentMetadata<Props>;

export type SlotComponentMetadata<Props extends UnknownSlotProps> = {
  /**
   * @internal
   */
  [slotTypeSymbol]: ExtractSlotPropsAs<Props>;
  /**
   * @internal
   */
  [slotSignalSymbol]: SlotSignal;
  /**
   * @internal
   */
  [slotRenderFunctionSymbol]: SlotRenderFunction<ExtractSlotPropsAs<Props>>;
};

export type ExtractSlotPropsAs<Props extends UnknownSlotProps> =
  Props extends any
    ? Props extends { as: any }
      ? never
      : NonNullable<Props["as"]>
    : never;

export type NoSignal<T> = Exclude<T, SlotSignal>;

/**
 * -------------------------------------------------------------------------------
 * HELPER TYPES
 * -------------------------------------------------------------------------------
 */

/**
 * HTML element types that are not allowed to have children.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Glossary/Void_element
 */
export type VoidIntrinsicElement =
  | "area"
  | "base"
  | "br"
  | "col"
  | "embed"
  | "hr"
  | "img"
  | "input"
  | "link"
  | "meta"
  | "param"
  | "source"
  | "track"
  | "wbr";

/**
 * Helper type for {@link SlotProps}. Modifies `React.JSX.IntrinsicElements[Type]`:
 * Removes legacy string ref.
 * Disallows children for empty tags like 'img'.
 */
export type IntrinsicElementProps<
  Type extends keyof React.JSX.IntrinsicElements
> = Type extends VoidIntrinsicElement
  ? PropsWithoutChildren<React.PropsWithRef<React.JSX.IntrinsicElements[Type]>>
  : React.PropsWithRef<React.JSX.IntrinsicElements[Type]>;

/**
 * Removes the 'children' prop from the given Props type.
 */
export type PropsWithoutChildren<P> = "children" extends keyof P
  ? DistributiveOmit<P, "children">
  : P;

/**
 * Helper type that works similar to Omit,
 * but when modifying an union type it will distribute the omission to all the union members.
 *
 * See [distributive conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types) for more information
 */
// Traditional Omit is basically equivalent to => Pick<T, Exclude<keyof T, K>>
//
// let's say we have Omit<{ a: string } | { b: string }, 'a'>
// equivalent to: Pick<{ a: string } | { b: string }, Exclude<keyof ({ a: string } | { b: string }), 'a'>>
// The expected result would be {} | { b: string }, the omission of 'a' from all the union members,
// but keyof ({ a: string } | { b: string }) is never as they don't share common keys
// so  Exclude<never, 'a'> is never,
// and Pick<{ a: string } | { b: string }, never> is {}.
//
// With DistributiveOmit on the other hand it becomes like this:
// DistributiveOmit<{ a: string } | { b: string }, 'a'>
// equivalent to: Omit<{ a: string }, 'a'> | Omit<{ b: string }, 'a'>
// Since every single Omit clause in this case is being applied to a single union member there's no conflicts on keyof evaluation and in the second clause Omit<{ b: string }, 'a'> becomes { b: string },
// so the result is {} | { b: string }, as expected.
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : T;

/**
 * Helper type that converts an union to an intersection.
 * It takes advantage of the contravariant behavior of function parameters to distribute the union over the intersection.
 * > The contravariant equivalent of an union is an intersection.
 */
export type UnionToIntersection<U> = (
  U extends any ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never;

/**
 * Helper type that checks if a type is an union.
 */
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;
