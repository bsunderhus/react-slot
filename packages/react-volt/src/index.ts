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

import * as plug from "./plug";
import * as union from "./union";

export {
  /**
   * @public
   *
   * A collection of utilities that can be used to manipulate/assert plugs.
   *
   * > **Note:** _In the context of electrical systems a plug is what allows a device to connect to an outlet. It is the sending end of the connection, while the outlet is the receiving end._
   */
  plug,
  /**
   * @public
   *
   * A collection of utilities that can be used to manipulate/assert unions.
   * This might be useful when dealing with a plug that can be multiple types
   */
  union,
};

export type {
  Adapter,
  Plug,
  PlugProps,
  PlugRef,
  PlugRefElement,
} from "./types/plug.types";

export { OutletStatus } from "./constants";
