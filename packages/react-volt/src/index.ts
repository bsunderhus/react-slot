export type { Outlet } from "./types/outlet.types";
export type { Plug, PlugProps, LockedIn, Default } from "./types/plug.types";
export type * as Distributive from "./types/distributive.types";

export * as plug from "./plug";
export { default as outlet } from "./outlet";
export { _$outletElementType, _$unplugged } from "./constants";
export { isPlug, isShorthand, isOutlet, isPlugProps } from "./guards";
