import type * as ReactTypes from "react";
import type { _$outletElementType } from "../constants";
import type { ContactDataType } from "./datatype.types";
import type { FunctionComponentProng, IntrinsicProngs } from "./helper.types";

/**
 * @public
 * A definition of an outlet as a component,
 * very similar to how a React component is declared,
 * but with some additional metadata that is used to determine how to render the plug.
 *
 * > **Note:** _In the context of electrical systems an outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export interface Outlet<Contact extends ContactDataType>
  extends ReactTypes.ExoticComponent<ContactProps<Contact>> {
  readonly props: ContactProps<Contact>;
  /**
   * @internal internal reference for outlet element type
   * This is used internally by our custom pragma to determine that this is an outlet component.
   * This is the same strategy used by React to determine if a component is a Fragment, Memo, Portal, etc,.
   */
  readonly $$typeof: typeof _$outletElementType;
  /**
   * @internal
   * Internal property to store the element type of the outlet.
   */
  [_$outletElementType]: ReactTypes.JSX.ElementType;
}

/**
 * Infer props based on the outlet type.
 */
type ContactProps<Contact extends ContactDataType> =
  Contact extends keyof IntrinsicProngs
    ? ReactTypes.PropsWithRef<JSX.IntrinsicElements[Contact]>
    : Contact extends `${infer TagName extends keyof IntrinsicProngs}?`
    ? ReactTypes.PropsWithRef<JSX.IntrinsicElements[TagName]>
    : Contact extends FunctionComponentProng<infer P>
    ? P
    : never;
