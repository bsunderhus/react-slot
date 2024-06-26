export type {
  Outlet,
  Unlocked,
  OutletMetadata,
  DangerouslyRenderFunction,
} from "./types/outlet.types";

export type * as SlotCompat from "./types/slot-compat.types";

export type {
  Plug,
  Default,
  LockedIn,
  PlugProps,
  PlugPropsType,
  PlugPropsAdapter,
} from "./types/plug.types";

export type * as Distributive from "./types/distributive.types";

export * as plug from "./plug";

export { outlet } from "./outlet";

export { _$outletElementType, _$dangerouslyRender } from "./constants";

export {
  isPlug,
  isOutlet,
  isShorthand,
  isPlugProps,
  isUnplugged,
  _isDangerouslyRenderFunction,
} from "./guards";
