export type {
  PlugDataType,
  PlugPropsDataType,
  SlotDataType,
  OutletTypeDataType,
} from "./types/datatype.types";

export {
  isPlug,
  isSlot,
  isOutlet,
  isPluggedIn,
  isUnplugged,
  isPlugProps,
  isOutletStatus,
} from "./guards";

export { outlet } from "./outlet";
export type {
  LockedIn,
  Outlet,
  Slot,
  OutletRenderer,
} from "./types/outlet.types";

// FIXME: _pluggedInSymbol import is a workaround for an error on API extractor
// API extractor will error while resolving OutletStatus.PluggedIn
import { _pluggedInSymbol } from "./constants";
import { adapt, resolve } from "./plug";

/**
 * @public
 *
 * A collection of utilities that can be used to manipulate plugs.
 *
 * > **Note:** _In the context of electrical systems a plug is what allows a device to connect to an outlet. It is the sending end of the connection, while the outlet is the receiving end._
 */
export const plug = { adapt, resolve };

export type {
  Adapter,
  Plug,
  PlugProps,
  PrimaryPlug,
  PlugRef,
  PlugForwardedRef,
} from "./types/plug.types";

export { OutletStatus } from "./constants";
