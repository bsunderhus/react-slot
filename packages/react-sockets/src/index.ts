import * as plug from "./plug";
export type {
  PlugDataType,
  PlugPropsDataType,
  SlotDataType,
  SocketTypeDataType,
} from "./types/datatype.types";

export {
  isSlot,
  isSocket,
  isPluggedIn,
  isUnplugged,
  isPlugProps,
  isSocketStatus,
} from "./guards";

export { forwardRef } from "./forwardRef";
export type { ForwardRefComponent } from "./forwardRef";

export { socket } from "./socket";
export type {
  LockedIn,
  SocketRenderer,
  Socket,
  Slot,
} from "./types/socket.types";

export { plug };
export type { Plug, PlugProps, PrimaryPlug } from "./types/plug.types";

export { SocketStatus } from "./constants";
