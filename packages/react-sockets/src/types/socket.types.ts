import type * as React from "react";
import type {
  _socketRefTypeSymbol,
  _socketRendererSymbol,
  _socketStatusSymbol,
  _socketTypeSymbol,
  SocketStatus,
} from "../constants";
import type { SlotDataType, SocketTypeDataType } from "./datatype.types";
import {
  PlugProps,
  PlugPropsWithRequiredAs,
  PropsWithoutRenderer,
  PropsWithRef,
} from "./plug.types";

/**
 * @public
 *
 * A type that represents a render function that can be used to completely override the markup of the socket.
 *
 * This is a dangerous feature and should be used with caution.
 *
 * @typeParam SocketType - The type of the plug
 * @param element - The element that would be rendered in the socket.
 *
 * > **Note:** _In the context of electrical systems a socket is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export type SocketRenderer<in out SocketType extends SocketTypeDataType> = (
  element: React.ReactElement<
    Omit<PlugPropsWithRequiredAs<SocketType>, "as">,
    SocketType
  >
) => React.ReactNode;

/**
 * @public
 * A definition of an socket as a component,
 * very similar to how a React component is declared,
 * but with some additional metadata that is used to determine how to render the plug.
 *
 * > **Note:** _In the context of electrical systems a socket is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export type Socket<
  BaseSocketType extends SocketTypeDataType,
  AlternativeSocketType extends SocketTypeDataType = never
> = React.ExoticComponent<
  React.PropsWithChildren<
    PropsWithoutRenderer<
      PropsWithRef<PlugProps<BaseSocketType, AlternativeSocketType>>
    >
  >
> & {
  readonly props: PropsWithoutRenderer<
    PropsWithRef<PlugProps<BaseSocketType, AlternativeSocketType>>
  >;
  /**
   * @internal
   * Internal property to store the base type of the socket.
   */
  [_socketTypeSymbol]: BaseSocketType | AlternativeSocketType;
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
    | SocketRenderer<BaseSocketType | AlternativeSocketType>
    | undefined;
};

/**
 * @public
 *
 * Helper type that removes Unplugged as a valid value.
 * This removes the possibility of opting-out of an socket.
 *
 * > **Note:** _In the context of electrical systems a Lock-in socket is an socket with a lock mechanism to avoid it from being accidentally unplugged._
 */
export type LockedIn<T> = Exclude<T, SocketStatus.UnPlugged>;

/**
 * @public
 *
 * A slot is a simplified version of a plug props,
 * it is equivalent to `{{children: someValue}}`.
 *
 * @typeParam Props - The plug properties that would be used to define the slot.
 *
 * > **Note:** _in the context of electrical systems, a slot is the little hole in the socket where the plug prongs are inserted. It is a common interface on every single socket, making it a good analogy for a common part of a socket definition_
 */
export type Slot<Props> = "children" extends keyof Props
  ? Extract<SlotDataType, Props["children"]>
  : never;
