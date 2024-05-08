import {
  _socketRendererSymbol,
  _socketStatusSymbol,
  _socketTypeSymbol,
  _pluggedInSymbol,
  _unPluggedSymbol,
} from "./constants";
import { isSlot, isSocketStatus } from "./guards";
import type {
  Slot,
  PlugPropsWithRef,
  TypeFromPlugProps,
  PlugPropsWithRequiredAs,
  PlugPropsWithoutRenderer,
} from "./types/plug.types";
import type { UnknownPlugProps, UnknownPlugType } from "./types/unknown.types";

/**
 * @public
 * A type that represents a render function that can be used to completely override the markup of the socket.
 * This is a dangerous feature and should be used with caution.
 *
 * @typeParam PlugType - The type of the plug
 * @param element - The element that would be rendered in the socket.
 * @returns The rendered element.
 */
export type SocketRenderer<PlugType extends UnknownPlugType> = (
  element: React.ReactElement<
    Omit<PlugPropsWithRequiredAs<PlugType>, "as">,
    PlugType
  >
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
 *
 * > **Note:** In the context of electrical systems a socket is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end.
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
 * An socket status refers to the presence of a plug.
 *
 * If a plug is plugged in the socket it means that it'll be rendered
 * while an unplugged plug will not be rendered.
 *
 * > **Note:** in the context of electrical systems plugged in and unplugged are terms used to describe the connection between a plug and an socket
 */
export type SocketStatus = SocketStatus.PluggedIn | SocketStatus.UnPlugged;

/** @public */
export const SocketStatus = {
  PluggedIn: _pluggedInSymbol,
  UnPlugged: _unPluggedSymbol,
} as const;

/** @public */
export namespace SocketStatus {
  export type PluggedIn = typeof SocketStatus.PluggedIn;
  export type UnPlugged = typeof SocketStatus.UnPlugged;
}

/**
 * @public
 * Helper type that removes Unplugged as a valid value.
 * This removes the possibility of opting-out of an socket.
 *
 * > **Note:** In the context of electrical systems a Lock-in socket is an socket with a lock mechanism to avoid it from being accidentally unplugged.
 */
export type LockedIn<T> = Exclude<T, SocketStatus.UnPlugged>;

/**
 * @public
 *
 * Connects a socket to a plug.
 *
 * @param elementType - the base element type of the socket
 * @param plug - the value of the plg, it can be properties, slot or socket status
 * @param defaultProps - similar to a React component declaration, you can provide an socket default properties to be merged with the plug provided.
 *
 */
export const socket = <Props extends UnknownPlugProps>(
  elementType: NonNullable<Props["as"]>,
  plug: Props | Slot<Props> | SocketStatus,
  defaultProps?: Partial<PlugPropsWithRef<Props>>
): SocketComponent<Props> => {
  const component = {
    [_socketTypeSymbol]: elementType,
    [_socketStatusSymbol]: SocketStatus.PluggedIn,
    [_socketRendererSymbol]: undefined,
    props: { ...defaultProps },
  } as SocketComponent<Props>;

  if (isSocketStatus(plug)) {
    component[_socketStatusSymbol] = plug;
    return component;
  }
  if (isSlot(plug)) {
    /**
     * assigning here as in this case we have conflict between
     * void elements (elements without children) and non-void elements
     * if the user is properly using typescript this condition can't be reached on void elements
     *
     * if the user is not using typescript and is using a void element as a slot,
     * then React will console.error so we don't need to worry about this case
     */
    Object.assign(component.props, { children: plug });
    return component;
  }
  if (typeof plug !== "object" && !import.meta.env.PROD) {
    console.error(/** #__DE-INDENT__ */ `
      resolveShorthand:
      A plug got an invalid value "${plug}" (${typeof plug}).
      A valid value for a plug is a slot or plug properties object.
      Slots can be strings, numbers, arrays, JSX elements, null, undefined or boolean.
    `);
  }

  /**
   * assigning here as we need to merge the props with the plug and props is readonly.
   */
  Object.assign(component.props, plug);

  if ("dangerouslyRenderSocket" in component.props) {
    component[_socketRendererSymbol] = component.props
      .dangerouslyRenderSocket as SocketRenderer<NonNullable<Props["as"]>>;
    delete component.props.dangerouslyRenderSocket;
  }
  return component;
};

/**
 * @public
 *
 * Connects a Lock-in socket to a plug.
 * Lock-in sockets are used to lock the plug in the socket,
 * so the plug can't be unplugged (SocketStatus.UnPlugged is not allowed).
 *
 * @param elementType - the base element type of the socket
 * @param plug - the value of the plg, it can be properties, slot or socket status
 * @param defaultProps - similar to a React component declaration, you can provide an socket default properties to be merged with the plug provided.
 *
 * > **Note:** In the context of electrical systems a Lock-in socket is an socket with a lock mechanism to avoid it from being accidentally unplugged.
 */
socket.lockedIn = socket as <Props extends UnknownPlugProps>(
  elementType: NonNullable<Props["as"]>,
  plug: Props | Slot<Props> | SocketStatus.PluggedIn,
  defaultProps?: Partial<PlugPropsWithRef<Props>>
) => SocketComponent<Props>;
