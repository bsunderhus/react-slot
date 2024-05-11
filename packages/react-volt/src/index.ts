import * as plug from "./plug";
export type {
  PlugDataType,
  PlugPropsDataType,
  SlotDataType,
  OutletTypeDataType,
} from "./types/datatype.types";

export {
  isSlot,
  isOutlet,
  isPluggedIn,
  isUnplugged,
  isPlugProps,
  isOutletStatus,
} from "./guards";

export { forwardRef } from "./forwardRef";
export type { ForwardRefComponent } from "./forwardRef";

export { outlet } from "./outlet";
export type {
  LockedIn,
  OutletRenderer,
  Outlet,
  Slot,
} from "./types/outlet.types";

export { plug };
export type { Plug, PlugProps, PrimaryPlug } from "./types/plug.types";

export { OutletStatus } from "./constants";
