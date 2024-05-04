import type * as React from "react";
import type {
  slotRefTypeSymbol,
  slotTypeSymbol,
  slotRenderFunctionSymbol,
  slotStatusSymbol,
} from "./constants";
import type { IntrinsicElementProps, IsUnion } from "./utils/helper.types";
import type { PluggedIn, UnPlugged } from "./constants";

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
  [slotStatusSymbol]?: SlotStatus;
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
        | SlotStatus
    : never;

/**
 * Removes SlotShorthandValue, render function and signals from the slot type,
 * extracting just the slot's Props object.
 */
export type ExtractSlotProps<SlotValue> = Exclude<
  SlotValue,
  SlotShorthandValue | SlotStatus | SlotRenderFunction<any> | undefined
>;

export namespace Slot {
  /**
   * Type to declare the props of a component that uses slot discrimination based on the `as` property.
   * This type is quite similar to the {@link Slot} type, the main difference being that since we're on the component's
   * property declaration we can't use the {@link SlotShorthandValue} type, as it's not a valid type for a property.
   *
   * > __Another differences:__
   * > 1. a components props can't be `null` or `undefined` as it's not a valid type for a component's property
   * > 2. `ref` is removed from the props as it's not common to have `ref` as a property of a component (it's usually a side argument of a forwardRef component)
   */
  export type Main<
    BaseSlotType extends UnknownSlotType,
    AlternativeSlotType extends UnknownSlotType = never
  > =
    // The `IsUnion` type is used to ensure that the `BaseSlotType` is not a union,
    // as the base type will have the discrimination property (`as`) optional it can't be a union,
    // as it would break the discrimination strategy
    IsUnion<BaseSlotType> extends false
      ? React.PropsWithoutRef<
          | WithOptionalAs<SlotProps<BaseSlotType>>
          | SlotProps<AlternativeSlotType>
        >
      : never;
}

/**
 * Ensures that the `as` property is optional.
 * This type is used by {@link Slot} and {@link MainSlot}
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
  React.ExoticComponent<React.PropsWithChildren<WithRef<Props>>> &
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
  [slotStatusSymbol]: SlotStatus;
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

/**
 * A slot status refers to the presence of a slot.
 *
 * If a slot is plugged in it means that it'll be render
 * while an unplugged slot will not be rendered.
 *
 * > Note: in the context of electrical systems plugged in and unplugged are terms used to describe the connection between a plug and an outlet
 */
export type SlotStatus = typeof PluggedIn | typeof UnPlugged;

/**
 * Helper type that creates a slot that cannot receive Unplugged as a valid value.
 * This removes the possibility of opting-out of a slot.
 *
 * > Note: In the context of electrical systems a Lock-in plug, is a plug that should never be unplugged from an outlet.
 */
export type LockedIn<Value> = Exclude<Value, typeof UnPlugged>;
