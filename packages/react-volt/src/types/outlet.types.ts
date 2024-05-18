import type {
  ExoticComponent,
  JSXElementConstructor,
  PropsWithRef,
  ReactElement,
  ReactNode,
} from "react";
import type {
  _plugRefSymbol,
  _outletRendererSymbol,
  _outletStatusSymbol,
  _outletTypeSymbol,
  OutletStatus,
} from "../constants";
import type { SlotDataType, OutletTypeDataType } from "./datatype.types";
import type { IntrinsicElements } from "./helper.types";

/**
 * @public
 *
 * A type that represents a render function that can be used to completely override the markup of the outlet.
 *
 * This is a dangerous feature and should be used with caution.
 *
 * @typeParam OutletType - The type of the plug
 * @param element - The element that would be rendered in the outlet.
 *
 * > **Note:** _In the context of electrical systems an outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export type OutletRenderer<in out OutletType extends OutletTypeDataType> = (
  element: ReactElement<PropsFromOutletType<OutletType>, OutletType>
) => ReactNode;

/**
 * @public
 * A definition of an outlet as a component,
 * very similar to how a React component is declared,
 * but with some additional metadata that is used to determine how to render the plug.
 *
 * > **Note:** _In the context of electrical systems an outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export interface Outlet<
  BaseOutletType extends OutletTypeDataType,
  AlternativeOutletType extends OutletTypeDataType = never
> extends ExoticComponent<
    PropsFromOutletType<BaseOutletType | AlternativeOutletType>
  > {
  readonly props: PropsFromOutletType<BaseOutletType | AlternativeOutletType>;
  /**
   * @internal
   * Internal property to store the base type of the outlet.
   */
  [_outletTypeSymbol]: BaseOutletType | AlternativeOutletType;
  /**
   * @internal
   * Internal property to store the status of the outlet,
   * this will be used to determine if the plug should be rendered or not.
   */
  [_outletStatusSymbol]: OutletStatus;
  /**
   * @internal
   * Internal property to store the render function that
   * can be used to completely override the markup of the outlet.
   */
  [_outletRendererSymbol]:
    | ((
        element: ReactElement<
          PropsFromOutletType<BaseOutletType | AlternativeOutletType>,
          BaseOutletType | AlternativeOutletType
        >
      ) => ReactNode)
    | undefined;
}

/**
 * Infer props based on the outlet type.
 */
type PropsFromOutletType<OutletType extends OutletTypeDataType> =
  OutletType extends keyof IntrinsicElements
    ? PropsWithRef<JSX.IntrinsicElements[OutletType]>
    : OutletType extends JSXElementConstructor<infer P>
    ? P
    : never;

/**
 * @public
 *
 * Helper type that removes Unplugged as a valid value.
 * This removes the possibility of opting-out of an outlet.
 *
 * > **Note:** _In the context of electrical systems a Lock-in outlet is an outlet with a lock mechanism to avoid it from being accidentally unplugged._
 */
export type LockedIn<T> = Exclude<T, OutletStatus.UnPlugged>;

/**
 * @public
 *
 * A slot is a simplified version of a plug props,
 * it is equivalent to `{children: someValue}`.
 *
 * @typeParam Props - The plug properties that would be used to define the slot.
 *
 * > **Note:** _in the context of electrical systems, a slot is the little hole in the outlet where the plug prongs are inserted. It is a common interface on every single outlet, making it a good analogy for a common part of an outlet definition_
 */
export type Slot<Props> = "children" extends keyof Props
  ? Extract<SlotDataType, Props["children"]>
  : never;
