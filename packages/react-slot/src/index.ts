export type {
  Plug,
  PlugProps,
  PlugShorthandValue,
  UnknownPlugProps,
  UnknownPlugType,
  WithPlugShorthandValue,
  Outlet,
} from "./types";

export { forwardRef, type ForwardRefComponent } from "./forwardRef";

export {
  isOutletStatus,
  type LockedIn,
  type OutletStatus,
} from "./OutletStatus";

export { outlet, isOutlet, isPluggedIn, isUnplugged } from "./outlet";
