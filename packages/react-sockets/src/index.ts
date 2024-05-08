export {
  isSlot,
  isSocket,
  isUnplugged,
  isPluggedIn,
  isSocketStatus,
} from "./guards";

export { forwardRef } from "./forwardRef";
export type { ForwardRefComponent } from "./forwardRef";

export { socket, SocketStatus } from "./socket";
export type { LockedIn, SocketRenderer, SocketComponent } from "./socket";

export type {
  UnknownSlot,
  UnknownPlugType,
  UnknownPlugProps,
} from "./types/unknown.types";

export type { Plug, PlugProps, Slot } from "./types/plug.types";
