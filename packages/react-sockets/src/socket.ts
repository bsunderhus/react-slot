import {
  _socketRendererSymbol,
  _socketStatusSymbol,
  _socketTypeSymbol,
  _pluggedInSymbol,
  _unPluggedSymbol,
} from "./constants";
import { isSocketStatus, isValidNode } from "./guards";
import type { PlugPropsWithRef, PlugShorthandValue } from "./types/plug.types";
import type { SocketComponent, SocketRenderer } from "./types/socket.types";
import type { UnknownPlugProps } from "./types/unknown.types";

/**
 * @public
 * An socket status refers to the presence of a plug.
 *
 * If a plug is plugged in the socket it means that it'll be rendered
 * while an unplugged plug will not be rendered.
 *
 * > Note: in the context of electrical systems plugged in and unplugged are terms used to describe the connection between a plug and an socket
 */
export type SocketStatus = SocketStatus.PluggedIn | SocketStatus.UnPlugged;

/**
 * @public
 */
export const SocketStatus = {
  PluggedIn: _pluggedInSymbol,
  UnPlugged: _unPluggedSymbol,
} as const;

/**
 * @public
 */
export namespace SocketStatus {
  export type PluggedIn = typeof SocketStatus.PluggedIn;
  export type UnPlugged = typeof SocketStatus.UnPlugged;
}

/**
 * @public
 *
 * Connects a socket to a plug.
 *
 * @param elementType - the base element type of the socket
 * @param plug - the value of the plg, it can be properties, shorthands or socket status
 * @param defaultProps - similar to a React component declaration, you can provide an socket default properties to be merged with the plug provided.
 *
 */
export const socket = <Props extends UnknownPlugProps>(
  elementType: NonNullable<Props["as"]>,
  plug: Props | PlugShorthandValue | SocketStatus,
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
  if (isValidNode(plug)) {
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
      A valid value for a plug is a plug shorthand or plug properties object.
      Plug shorthands can be strings, numbers, arrays or JSX elements
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
 * @param plug - the value of the plg, it can be properties, shorthands or socket status
 * @param defaultProps - similar to a React component declaration, you can provide an socket default properties to be merged with the plug provided.
 */
const socketLockedIn: <Props extends UnknownPlugProps>(
  elementType: NonNullable<Props["as"]>,
  plug:
    | Props
    | PlugShorthandValue
    // FIXME: this should be SocketStatus.PluggedIn, but it seems to fail on API extractor
    | typeof _pluggedInSymbol,
  defaultProps?: Partial<PlugPropsWithRef<Props>>
) => SocketComponent<Props> = socket;

socket.lockedIn = socketLockedIn;
