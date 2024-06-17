export type * from "./types/react.types";

export type { Distributive } from "./types/helper.types";

export { isPlug, isShorthand, isOutlet, isPlugProps } from "./guards";

export { default as outlet } from "./outlet";
export type { Outlet } from "./types/outlet.types";

export * as plug from "./plug";

export type { Plug, PlugProps } from "./types/plug.types";

export { _$outletElementType, _$unplugged } from "./constants";
