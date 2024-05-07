import type * as React from "react";
import {
  _socketRendererSymbol,
  _socketStatusSymbol,
  _socketTypeSymbol,
} from "../constants";
import { UnknownPlugProps, UnknownPlugType } from "./unknown.types";
import {
  PlugPropsWithRef,
  PlugPropsWithRequiredAs,
  PlugPropsWithoutRenderer,
  TypeFromPlugProps,
} from "./plug.types";
import type { SocketStatus } from "../socket";

/**
 * @public
 * A type that represents a render function that can be used to completely override the markup of the socket.
 * This is a dangerous feature and should be used with caution.
 *
 * @param type - The type of the plug.
 * @param props - The props of the plug, based on the plug's type.
 */
export type SocketRenderer<PlugType extends UnknownPlugType> = (
  type: PlugType,
  props: Omit<PlugPropsWithRequiredAs<PlugType>, "as">
) => React.ReactNode;

export type WithSocketRenderer<Props extends UnknownPlugProps> =
  Props extends any
    ? Props & {
        /**
         * A render function that can be used to completely override the markup of the socket.
         * This is a dangerous feature and should be used with caution.
         */
        dangerouslyRenderSocket?: SocketRenderer<TypeFromPlugProps<Props>>;
      }
    : never;

/**
 * @public
 * A definition of an socket as a component,
 * very similar to how a React component is declared,
 * but with some additional metadata that is used to determine how to render the plug.
 */
export type SocketComponent<Props extends UnknownPlugProps> =
  React.ExoticComponent<
    React.PropsWithChildren<PlugPropsWithoutRenderer<PlugPropsWithRef<Props>>>
  > & {
    readonly props: PlugPropsWithoutRenderer<PlugPropsWithRef<Props>>;
    /**
     * @internal
     * Internal property to store the base type of the socket.
     */
    [_socketTypeSymbol]: TypeFromPlugProps<Props>;
    /**
     * @internal
     * Internal property to store the status of the socket,
     * this will be used to determine if the plug should be rendered or not.
     */
    [_socketStatusSymbol]: SocketStatus;
    /**
     * @internal
     * Internal property to store the render function that
     * can be used to completely override the markup of the socket.
     */
    [_socketRendererSymbol]:
      | SocketRenderer<TypeFromPlugProps<Props>>
      | undefined;
  };

/**
 * @public
 * Helper type that removes Unplugged as a valid value.
 * This removes the possibility of opting-out of an socket.
 *
 * > Note: In the context of electrical systems a Lock-in socket is an socket with a lock mechanism to avoid it from being accidentally unplugged.
 */
export type LockedIn<T> = Exclude<T, SocketStatus.UnPlugged>;
