export type {
  PlugDataType,
  OmniPlugDataType,
  ProngDataType,
  SlotDataType,
  PlugTypeDataType,
  PlugPropsDataType,
  ContactDataType,
  ComponentProngPropsDataType,
  IntrinsicProngPropsDataType,
  IntrinsicSlotPropsDataType,
  ComponentSlotPropsDataType,
} from "./types/datatype.types";

export type {
  DragEventHandler,
  AnimationEventHandler,
  ChangeEventHandler,
  ClipboardEventHandler,
  CompositionEventHandler,
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  ReactEventHandler,
  TouchEventHandler,
  TransitionEventHandler,
  UIEventHandler,
  WheelEventHandler,
  IntrinsicProngs,
  IntrinsicSlots,
  IntrinsicSlotAttributes,
  IntrinsicProngAttributes,
  FunctionComponentSlot,
  ComponentSlotAttributes,
  FunctionComponentProng,
  ComponentProngAttributes,
} from "./types/helper.types";

export { isPlug, isOmniPlug, isOutlet, isPlugProps } from "./guards";

export { outlet } from "./outlet";
export type { Outlet } from "./types/outlet.types";

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
  Swap,
  Plug,
  PlugRef,
  Adapter,
  OmniPlug,
  MainPlug,
  Optional,
  LockedIn,
  Required,
  PlugProps,
  UnpluggedPlug,
  PlugRefElement,
} from "./types/plug.types";

export { _$outletElementType, _$isSlot, _$unplugged } from "./constants";
