import type * as ReactTypes from "./react.types";
import type { _$outletElementType } from "../constants";
import type { OutletExoticComponentPlugProps, PlugProps } from "./plug.types";

interface OutletExoticComponentProps {
  children?: ReactTypes.ReactNode;
}

/**
 * @public
 * A definition of an outlet as a component,
 * very similar to how a React component is declared,
 * but with some additional metadata that is used to determine how to render the plug.
 *
 * > **Note:** _In the context of electrical systems an outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export interface OutletExoticComponent<
  Props extends Required<PlugProps> = OutletExoticComponentPlugProps
> extends ReactTypes.ExoticComponent<OutletExoticComponentProps> {
  /**
   * @internal
   */
  readonly props: Props;
}
