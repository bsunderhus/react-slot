import {
  _socketRendererSymbol,
  _socketStatusSymbol,
  _socketTypeSymbol,
  SocketStatus,
} from "./constants";
import { isSlot, isSocketStatus } from "./guards";
import { resolve as resolvePlug } from "./plug";
import type {
  PlugProps,
  PropsWithRef,
  SocketTypePlug,
} from "./types/plug.types";
import type { Socket, SocketRenderer, LockedIn } from "./types/socket.types";
import type {
  PlugPropsDataType,
  SlotDataType,
  SocketTypeDataType,
} from "./types/datatype.types";

/**
 * @public
 *
 * Connects a socket to a plug.
 *
 * @param socketType - the base element type of the socket
 * @param plug - the plug that is connected to the socket, a plug can be:
 * {@link PlugPropsDataType | PlugProps}, {@link SlotDataType | Slot} or {@link SocketStatus}.
 * @param defaultProps - similar to a React component declaration, you can provide an socket default properties to be merged with the plug provided.
 *
 * > **Note:** _In the context of electrical systems a socket is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export const socket = <
  const BaseSocketType extends SocketTypeDataType,
  const AlternativeSocketType extends SocketTypeDataType = never
>(
  socketType: BaseSocketType,
  plug?: NoInfer<SocketTypePlug<BaseSocketType, AlternativeSocketType>>,
  defaultProps?: NoInfer<
    Partial<PropsWithRef<PlugProps<BaseSocketType, AlternativeSocketType>>>
  >
): NoInfer<Socket<BaseSocketType, AlternativeSocketType>> => {
  const component = {
    [_socketTypeSymbol]: socketType,
    [_socketStatusSymbol]: SocketStatus.PluggedIn,
    [_socketRendererSymbol]: undefined,
    props: { ...defaultProps, ...resolvePlug(plug) },
  } as Socket<BaseSocketType, AlternativeSocketType>;

  if (plug === undefined) {
    return component;
  }
  if (isSocketStatus(plug)) {
    component[_socketStatusSymbol] = plug;
    return component;
  }
  if (isSlot(plug)) {
    return component;
  }
  if (typeof plug !== "object" && !import.meta.env.PROD) {
    console.error(/** #__DE-INDENT__ */ `
      [react-sockets - socket()]:
      A plug got an invalid value "${String(plug)}" (${typeof plug}).
      A valid value for a plug is a slot, socket properties or SocketStatus.
    `);
  }

  if ("dangerouslyRenderSocket" in component.props) {
    component[_socketRendererSymbol] = component.props
      .dangerouslyRenderSocket as SocketRenderer<
      BaseSocketType | AlternativeSocketType
    >;
    delete component.props.dangerouslyRenderSocket;
  }
  return component;
};

/**
 * @public
 *
 * Connects a Lock-in socket to a plug. This method is equivalent to `socket`,
 * but with the {@link SocketStatus.UnPlugged} removed from the possible values of the plug.
 *
 * @param elementType - the base element type of the socket
 * @param plug - the plug that is connected to the socket, a plug can be:
 * {@link PlugPropsDataType | PlugProps}, {@link SlotDataType | Slot} or {@link SocketStatus.PluggedIn}.
 * @param defaultProps - similar to a React component declaration, you can provide an socket default properties to be merged with the plug provided.
 *
 * > **Note:** _In the context of electrical systems a Lock-in socket is an socket with a lock mechanism to avoid it from being accidentally unplugged._
 */
socket.lockedIn = socket as <
  const BaseSocketType extends SocketTypeDataType,
  const AlternativeSocketType extends SocketTypeDataType = never
>(
  socketType: BaseSocketType,
  plug?: NoInfer<
    LockedIn<SocketTypePlug<BaseSocketType, AlternativeSocketType>>
  >,
  defaultProps?: NoInfer<
    Partial<PropsWithRef<PlugProps<BaseSocketType, AlternativeSocketType>>>
  >
) => Socket<BaseSocketType, AlternativeSocketType>;
