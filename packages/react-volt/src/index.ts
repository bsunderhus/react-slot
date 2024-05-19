export type {
  PlugDataType,
  SlotDataType,
  PlugTypeDataType,
  PlugPropsDataType,
  OutletTypeDataType,
  OutletRendererDataType,
} from "./types/datatype.types";

export {
  isPlug,
  isSlot,
  isOutlet,
  isPluggedIn,
  isUnplugged,
  isPlugProps,
  isOutletStatus,
  isOutletType,
} from "./guards";

export { outlet } from "./outlet";
export type {
  Slot,
  LockedIn,
  OutletRenderer,
  OutletComponent,
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
  Plug,
  PlugRef,
  Adapter,
  Primary,
  Optional,
  Required,
  PropsPlug,
  PlugProps,
  PlugTypePlug,
  OutletTypePlug,
  PlugRefElement,
  IntrinsicPlugAttributes,
  IntrinsicOptionalPlugAttributes,
} from "./types/plug.types";

export {
  OutletStatus,
  _unPluggedSymbol,
  _pluggedInSymbol,
  _outletTypeSymbol,
  _outletElementType,
  _outletStatusSymbol,
  _outletRendererSymbol,
} from "./constants";
