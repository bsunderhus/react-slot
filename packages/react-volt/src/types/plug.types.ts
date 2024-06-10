import type * as ReactTypes from "react";
import type {
  PlugDataType,
  OmniPlugDataType,
  PlugTypeDataType,
  PlugPropsDataType,
  IntrinsicSlotPropsDataType,
  ComponentSlotPropsDataType,
  ContactDataType,
  IntrinsicProngPropsDataType,
  ComponentProngPropsDataType,
} from "./datatype.types";
import type {
  Never,
  IntrinsicProngs,
  UnionToIntersection,
  IntrinsicSlots,
  FunctionComponentProng,
  ComponentSlotAttributes,
  ComponentProngAttributes,
  FunctionComponentSlot,
  FunctionComponent,
} from "./helper.types";
import type { _$isSlot, _$unplugged } from "../constants";

/**
 * @public
 *
 * Plug properties is a set of properties that can be used to define a plug, relative to its outlet.
 *
 * @typeParam PlugType - the type of the plug, it can be either:
 *
 * 1. plug properties itself (like `{as: "button"}`, {@link PlugPropsDataType}). It will be used as is.
 * 2. native HTML element string (like `"div"` or `"button"`, {@link IntrinsicProngs}).Its props will be used, adding `as` property equivalent to the element tagname.
 * 3. native HTML element string with a question mark suffix (like `"div?"` or `"button?"`, {@link IntrinsicSlots}). Its native element props will be used, adding an optional `as` property equivalent to the element tagname.
 * 4. a custom element type (like `typeof Button` or `React.FC<ButtonProps>`). Its props will be used.
 *
 * @example
 * Here's an example where we have a plug property defined by a native button by default,
 * but that it could also be an anchor or a div tag.
 *
 * ```ts
 * type PlugProps = PlugProps<"button?" | "a" | "div">
 * // slightly equivalent to the following:
 * type PlugProps =
 *   | ({as?: "button"} & React.PropsWithRef<JSX.IntrinsicElements["button"]>)
 *   | ({as: "a"} & React.PropsWithRef<JSX.IntrinsicElements["a"]>)
 *   | ({as: "div"} & React.PropsWithRef<JSX.IntrinsicElements["div"]>)
 * ```
 *
 * > **Note:** _in the context of electrical systems, a plug is equivalent to the part of the system that is introduced, while the outlet is the part of the system that receives._
 */
export type PlugProps<PlugType extends PlugTypeDataType> =
  PlugType extends PlugPropsDataType
    ? PlugType
    : PlugType extends keyof IntrinsicProngs
    ? IntrinsicProngs[PlugType]
    : PlugType extends keyof IntrinsicSlots
    ? IntrinsicSlots[PlugType]
    : PlugType extends FunctionComponent<infer P>
    ? P extends any
      ? typeof _$isSlot extends keyof PlugType
        ? ComponentSlotAttributes<P, PlugType>
        : ComponentProngAttributes<P, PlugType>
      : never
    : Never<`
    PlugType expects to be:
    1. native element (e.g: 'button', 'a', 'div', etc,.)
    2. optional native element (e.g: 'button?', 'a?', 'div?', etc,.)
    3. props definition of a plug (e.g: PlugProps<'button'>)
    4. a custom element type (e.g: typeof Button | React.FC<ButtonProps>)
  `>;

/**
 * @public
 *
 * In exception to the {@link Primary} plug, a plug will consist of a union of 3 types:
 *
 * 1. {@link PlugPropsDataType | PlugProps} - the properties that defined a plug.
 * 2. {@link OmniPlugDataType | Slot} - the shorthand value that can be used to define a plug with only children.
 * 3. {@link UnpluggedPlug} - a special value that can be used to opt-out of an outlet.
 *
 * @typeParam PlugType - the type of the plug, it can be either:
 *
 * 1. plug properties itself (like `{as: "button"}`, {@link PlugPropsDataType}). It will be used as is.
 * 2. native HTML element string (like `"div"` or `"button"`, {@link IntrinsicProngs}).Its props will be used, adding `as` property equivalent to the element tagname.
 * 3. native HTML element string with a question mark suffix (like `"div?"` or `"button?"`, {@link IntrinsicSlots}). Its native element props will be used, adding an optional `as` property equivalent to the element tagname.
 * 4. a custom element type (like `typeof Button` or `React.FC<ButtonProps>`). Its props will be used.
 *
 * > **Note:** _in the context of electrical systems, a plug is equivalent to the part of the system that is introduced, while the outlet is the part of the system that receives._
 */
export type Plug<PlugType extends PlugTypeDataType> =
  | PlugProps<PlugType>
  | OmniPlug<PlugType>
  | UnpluggedPlug;

/**
 * @public
 *
 * The main plug is a special type of Lock-in plug that is used to define the properties
 * of a component that will be using outlets internally.
 *
 * Unlike other plugs, the main plug is defined exclusively by its props ({@link PlugPropsDataType | PlugProps}, omitting `ref`).
 *
 * > **Note:** _In the context of electrical systems there's no such thing as a main plug, but a main power switch is the switch that controls the flow of electricity to the entire system. It is a good analogy for a plug that controls the flow of props to the entire system._
 */
export type MainPlug<PlugType extends PlugTypeDataType> =
  ReactTypes.PropsWithoutRef<PlugProps<PlugType>>;

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
export type PlugRefElement<Plug extends PlugDataType> = ReactTypes.ElementRef<
  Plug extends IntrinsicProngPropsDataType | IntrinsicSlotPropsDataType
    ? NonNullable<Plug["as"]>
    : Plug extends ComponentProngPropsDataType | ComponentSlotPropsDataType
    ? NonNullable<Plug["Component"]>
    : never
>;

/**
 * @public
 *
 * A type that represents the `ref` of a plug.
 *
 * @typeParam Plug - The type of the plug.
 *
 * > **Note:** _In the context of electrical systems a plug is what allows a device to connect to an outlet. It is the sending end of the connection, while the outlet is the receiving end._
 */
export type PlugRef<Plug extends PlugDataType> = ReactTypes.Ref<
  UnionToIntersection<PlugRefElement<Plug>>
>;

/**
 * @public
 *
 * Helper type that removes UnpluggedPlug as a valid value for a plug.
 * This removes the possibility of opting-out of an outlet.
 *
 * > **Note:** _In the context of electrical systems a Lock-in plug is a plug with a lock mechanism to avoid it from being accidentally unplugged._
 */
export type LockedIn<T> = Exclude<T, UnpluggedPlug>;

/**
 * @public
 *
 * An unplugged plug is a plug that is not connected to an outlet.
 * It is equivalent to an abort signal in a promise.
 * If an outlet receives an unplugged plug, it will not render.
 *
 * > **Note:** _in the context of electrical systems plugged in and unplugged are terms used to describe the connection between a plug and an outlet_
 */
export type UnpluggedPlug = typeof _$unplugged;

/**
 * @public
 *
 * A OmniPlug is a simplified version of a plug props,
 * it is equivalent to `{children: someValue}`.
 *
 * @typeParam Props - The plug properties that would be used to define the omni plug.
 *
 * > **Note:** _The prefix "Omni" means "all" or "universal", in the context of electrical systems there's no such thing as an universal plug, but an universal adapter is a device that allows a plug to connect to an outlet, even if the plug and outlet are not compatible._
 */
export type OmniPlug<PlugType extends PlugTypeDataType> =
  PlugType extends keyof IntrinsicProngs // 'button' 'div' 'span' etc
    ? IntrinsicProngs[PlugType] extends { children?: infer C }
      ? Extract<OmniPlugDataType, C>
      : never
    : PlugType extends keyof IntrinsicSlots // 'button?' 'div?' 'span?' etc
    ? IntrinsicSlots[PlugType] extends { children?: infer C }
      ? Extract<OmniPlugDataType, C>
      : never
    : PlugType extends PlugPropsDataType // PlugProps<'button?' | 'a' | 'div' | typeof Button>
    ? "children" extends keyof PlugType
      ? Extract<OmniPlugDataType, PlugType["children"]>
      : never
    : PlugType extends FunctionComponentProng<infer P> // typeof Button | React.FC<Primary<PlugProps<'button?' | 'a' | 'div'>>>
    ? "children" extends keyof P
      ? Extract<OmniPlugDataType, P["children"]>
      : never
    : never;

export type Optional<Prong extends ContactDataType> =
  Prong extends keyof IntrinsicProngs
    ? `${Prong}?`
    : Prong extends FunctionComponent<infer P>
    ? FunctionComponentSlot<P>
    : Prong;

export type Required<Slot extends ContactDataType> =
  Slot extends `${infer Key extends keyof IntrinsicProngs}?`
    ? Key
    : Slot extends FunctionComponent<infer P>
    ? FunctionComponentProng<P>
    : Slot;

export type Swap<Contact extends ContactDataType> =
  Contact extends keyof IntrinsicProngs
    ? `${Contact}?`
    : Contact extends `${infer Key extends keyof IntrinsicProngs}?`
    ? Key
    : Contact extends FunctionComponent<infer P>
    ? typeof _$isSlot extends keyof Contact
      ? FunctionComponentProng<P>
      : FunctionComponentSlot<P>
    : never;
