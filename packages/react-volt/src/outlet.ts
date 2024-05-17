import {
  _outletRendererSymbol,
  _outletStatusSymbol,
  _outletTypeSymbol,
  OutletStatus,
} from "./constants";
import { isSlot, isOutletStatus } from "./guards";
import { resolve as resolvePlug } from "./plug";
import type { OutletTypePlug } from "./types/plug.types";
import type { Outlet, LockedIn } from "./types/outlet.types";
import type {
  PlugPropsDataType,
  SlotDataType,
  OutletTypeDataType,
} from "./types/datatype.types";

const emptyPropsObject: PlugPropsDataType = {};

/**
 * @public
 *
 * Connects an outlet to a plug.
 *
 * @param outletType - the base element type of the outlet
 * @param plug - the plug that is connected to the outlet, a plug can be:
 * {@link PlugPropsDataType | PlugProps}, {@link SlotDataType | Slot} or {@link OutletStatus}.
 * @param defaultProps - similar to a React component declaration, you can provide an outlet default properties to be merged with the plug provided.
 *
 * > **Note:** _In the context of electrical systems a outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export function outlet<
  const BaseOutletType extends OutletTypeDataType,
  const AlternativeOutletType extends OutletTypeDataType = never
>(
  outletType: BaseOutletType,
  plug: NoInfer<OutletTypePlug<BaseOutletType, AlternativeOutletType>>
): Outlet<BaseOutletType, AlternativeOutletType> {
  const props = resolvePlug(plug) ?? emptyPropsObject;
  const instance = {
    [_outletTypeSymbol]: outletType,
    [_outletStatusSymbol]: OutletStatus.PluggedIn,
    [_outletRendererSymbol]: undefined,
    props,
  } as Outlet<BaseOutletType, AlternativeOutletType>;

  if (plug === undefined) {
    return instance;
  }
  if (isOutletStatus(plug)) {
    instance[_outletStatusSymbol] = plug;
    return instance;
  }
  if (isSlot(plug)) {
    return instance;
  }
  if (process.env.NODE_ENV !== "production" && typeof plug !== "object") {
    console.error(/** #__DE-INDENT__ */ `
      [react-volt - outlet()]:
      A plug got an invalid value "${String(plug)}" (${typeof plug}).
      A valid value for a plug is a slot, outlet properties or OutletStatus.
    `);
  }
  if (props.as !== undefined && typeof outletType === "string") {
    // FIXME: figure out what is wrong with props.as
    instance[_outletTypeSymbol] = props.as as
      | BaseOutletType
      | AlternativeOutletType;
    delete props.as;
  }
  if (typeof props?.dangerouslyRenderOutlet === "function") {
    instance[_outletRendererSymbol] = props.dangerouslyRenderOutlet;
    delete props.dangerouslyRenderOutlet;
  }
  return instance;
}

/**
 * @public
 *
 * Connects a Lock-in outlet to a plug. This method is equivalent to `outlet`,
 * but with the {@link OutletStatus.UnPlugged} removed from the possible values of the plug.
 *
 * @param elementType - the base element type of the outlet
 * @param plug - the plug that is connected to the outlet, a plug can be:
 * {@link PlugPropsDataType | PlugProps}, {@link SlotDataType | Slot} or {@link OutletStatus.PluggedIn}.
 * @param defaultProps - similar to a React component declaration, you can provide an outlet default properties to be merged with the plug provided.
 *
 * > **Note:** _In the context of electrical systems a Lock-in outlet is an outlet with a lock mechanism to avoid it from being accidentally unplugged._
 */
outlet.lockedIn = outlet as <
  const BaseOutletType extends OutletTypeDataType,
  const AlternativeOutletType extends OutletTypeDataType = never
>(
  outletType: BaseOutletType,
  plug: NoInfer<LockedIn<OutletTypePlug<BaseOutletType, AlternativeOutletType>>>
) => Outlet<BaseOutletType, AlternativeOutletType>;
