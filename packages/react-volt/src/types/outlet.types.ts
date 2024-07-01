import type * as ReactTypes from "./react.types";
import type { _$outletElementType, _$dangerouslyRender } from "../constants";
import type { Plug, PlugPropsType } from "./plug.types";

/**
 * @public
 * A definition of an outlet as a component,
 * very similar to how a React component is declared,
 * but with some additional metadata that is used to determine how to render the plug.
 *
 * > **Note:** _In the context of electrical systems an outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export type Outlet<OutletType extends PlugPropsType<any> = PlugPropsType> =
  ReactTypes.ExoticComponent<OutletProps<OutletType>> &
    OutletProps<OutletType> &
    OutletMetadata;

/**
 * @public
 *
 * Metadata that is used to determine how to render the outlet.
 */
export interface OutletMetadata {
  /**
   * @internal
   * Internal property to store the element type of the outlet.
   */
  [_$outletElementType]: ReactTypes.JSX.ElementType;
  /**
   * @internal
   * Internal property to store the render outlet function.
   */
  [_$dangerouslyRender]?: DangerouslyRenderFunction;
}

/**
 * Infer props based on the plug type.
 */
type OutletProps<Type extends PlugPropsType> =
  Type extends keyof ReactTypes.JSX.IntrinsicElements
    ? ReactTypes.PropsWithRef<ReactTypes.JSX.IntrinsicElements[Type]>
    : Type extends ReactTypes.FC<infer Props>
    ? Props
    : never;

/**
 * @public
 *
 * A function that is used to render the outlet.
 * This function overrides the default rendering behavior of the outlet.
 *
 * > Similar to {@link React.RefCallback} and {@link React.EventHandler} dangerously render function
 * uses a bivariance hack to allow for more flexible types.
 *
 * > Here's more {@link https://dev.to/codeoz/how-i-understand-covariance-contravariance-in-typescript-2766 | information on type variance}
 */
export type DangerouslyRenderFunction<
  E extends ReactTypes.JSX.Element = ReactTypes.JSX.Element
> = {
  bivarianceHack(element: E): ReactTypes.ReactNode;
}["bivarianceHack"];

/**
 * @public
 *
 * An unlocked outlet is an outlet that can be disconnected from a plug.
 *
 * > **Note:** _in the context of electrical systems unlocked is a term used to describe the lack of a connection between a plug and an outlet_
 */
export type Unlocked<O> = O | Plug.Unplugged;
