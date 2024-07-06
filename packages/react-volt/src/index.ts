export type {
  Plug,
  Default,
  PlugProps,
  PlugPropsType,
  PlugRenderFunction,
  PlugPropsAdapter,
} from "./types/plug.types";

export type { OutletExoticComponent } from "./types/outlet.types";

export type { LockedIn, Unlocked } from "./types/helper.types";

export * as plug from "./plug";

export { outlet } from "./outlet";

export { _$outletElementType, _$unplugged } from "./constants";

export { isShorthand, isPlugProps, isUnplugged } from "./guards";
