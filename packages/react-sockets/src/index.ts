export { isSocketStatus, isSocket, isPluggedIn, isUnplugged } from "./guards";

export { forwardRef, type ForwardRefComponent } from "./forwardRef";

export { socket, SocketStatus } from "./socket";

export type { Plug, PlugProps, PlugShorthandValue } from "./types/plug.types";

export type { UnknownPlugProps, UnknownPlugType } from "./types/unknown.types";

export type {
  LockedIn,
  SocketComponent,
  SocketRenderer,
} from "./types/socket.types";
