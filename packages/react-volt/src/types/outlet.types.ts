import type * as ReactTS from "react";
import type {
  _outletElementType,
  _outletRendererSymbol,
  _outletTypeSymbol,
} from "../constants";
import type {
  SlotDataType,
  OutletTypeDataType,
  PlugTypeDataType,
} from "./datatype.types";
import type { IntrinsicPlugs } from "./helper.types";

export type OutletType<PlugType extends PlugTypeDataType> =
  PlugType extends `${infer K extends keyof IntrinsicPlugs}?` ? K : PlugType;

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
  element: ReactTS.ReactElement<PropsFromOutletType<OutletType>, OutletType>
) => ReactTS.ReactNode;

/**
 * @public
 * A definition of an outlet as a component,
 * very similar to how a React component is declared,
 * but with some additional metadata that is used to determine how to render the plug.
 *
 * > **Note:** _In the context of electrical systems an outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export interface Outlet<in out OutletType extends OutletTypeDataType> {
  (props: PropsFromOutletType<OutletType>): ReactTS.ReactNode;
  readonly props: PropsFromOutletType<OutletType>;
  /**
   * @internal internal reference for outlet element type
   * This is used internally by our custom pragma to determine that this is an outlet component.
   * This is the same strategy used by React to determine if a component is a Fragment, Memo, Portal, etc,.
   */
  readonly $$typeof: typeof _outletElementType;
  /**
   * @internal
   * Internal property to store the base type of the outlet.
   */
  [_outletTypeSymbol]: OutletType;
  /**
   * @internal
   * Internal property to store the render function that
   * can be used to completely override the markup of the outlet.
   */
  [_outletRendererSymbol]: OutletRenderer<OutletType> | undefined;
}

/**
 * Infer props based on the outlet type.
 */
type PropsFromOutletType<OutletType extends OutletTypeDataType> =
  OutletType extends keyof IntrinsicPlugs
    ? ReactTS.PropsWithRef<JSX.IntrinsicElements[OutletType]>
    : OutletType extends ReactTS.JSXElementConstructor<infer P>
    ? P
    : never;

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
