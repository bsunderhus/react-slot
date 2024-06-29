export type {
  Outlet,
  OutletMetadata,
  DangerouslyRenderFunction,
} from "./types/outlet.types";
export type {
  Plug,
  PrimaryPlug,
  Default,
  LockedIn,
  PlugProps,
  PlugPropsType,
  PlugPropsAdapter,
} from "./types/plug.types";
export type * as Distributive from "./types/distributive.types";

export * as plug from "./plug";
export { default as outlet } from "./outlet";
export { _$outletElementType, _$unplugged } from "./constants";
export {
  isPlug,
  isShorthand,
  isOutlet,
  isPlugProps,
  _isDangerouslyRenderFunction,
} from "./guards";
