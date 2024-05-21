import {
  _outletElementType,
  _outletRendererSymbol,
  _outletTypeSymbol,
  pluggedIn,
  unplugged,
} from "./constants";
import { isSlot } from "./guards";
import { resolve as resolvePlug } from "./plug";
import type { OutletTypePlug, LockedIn } from "./types/plug.types";
import type { Outlet } from "./types/outlet.types";
import type {
  PlugPropsDataType,
  SlotDataType,
  OutletTypeDataType,
} from "./types/datatype.types";

/**
 * @public
 *
 * Connects an outlet to a plug.
 *
 * @param outletType - the base element type of the outlet
 * @param plug - the plug that is connected to the outlet, a plug can be:
 * {@link PlugPropsDataType | PlugProps}, {@link SlotDataType | Slot} or {@link PlugStatus}.
 * @param defaultProps - similar to a React component declaration, you can provide an outlet default properties to be merged with the plug provided.
 *
 * > **Note:** _In the context of electrical systems a outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export function outlet<const OutletType extends OutletTypeDataType>(
  outletTypes: OutletType,
  plug: NoInfer<OutletTypePlug<OutletType>>
): Outlet<OutletType> | undefined {
  if (plug === unplugged) {
    return undefined;
  }
  const outletType = Array.isArray(outletTypes) ? outletTypes[0] : outletTypes;
  const props = resolvePlug(plug) ?? ({} as PlugPropsDataType);
  const component = {
    props,
    $$typeof: _outletElementType,
    [_outletTypeSymbol]: outletType,
    [_outletRendererSymbol]: undefined,
  } as Outlet<OutletType>;

  if (plug === pluggedIn || isSlot(plug)) {
    return component;
  }
  if (process.env.NODE_ENV !== "production" && typeof plug !== "object") {
    console.error(/** #__DE-INDENT__ */ `
      [react-volt - outlet()]:
      A plug got an invalid value "${String(plug)}" (${typeof plug}).
      A valid value for a plug is a slot, outlet properties or PlugStatus.
    `);
  }
  if (typeof outletType === "string") {
    if (props.as) {
      // FIXME: figure out what is wrong with props.as
      component[_outletTypeSymbol] = props.as as OutletType;
      delete props.as;
    }
    if (typeof props?.dangerouslyRenderOutlet === "function") {
      component[_outletRendererSymbol] = props.dangerouslyRenderOutlet;
      delete props.dangerouslyRenderOutlet;
    }
  }
  return component;
}

/**
 * @public
 *
 * Connects a Lock-in outlet to a plug. This method is equivalent to `outlet`,
 * but with the {@link PlugStatus.UnPlugged} removed from the possible values of the plug.
 *
 * @param elementType - the base element type of the outlet
 * @param plug - the plug that is connected to the outlet, a plug can be:
 * {@link PlugPropsDataType | PlugProps}, {@link SlotDataType | Slot} or {@link PlugStatus.PluggedIn}.
 * @param defaultProps - similar to a React component declaration, you can provide an outlet default properties to be merged with the plug provided.
 *
 * > **Note:** _In the context of electrical systems a Lock-in outlet is an outlet with a lock mechanism to avoid it from being accidentally unplugged._
 */
outlet.lockedIn = outlet as <const OutletType extends OutletTypeDataType>(
  outletTypes: OutletType,
  plug: NoInfer<LockedIn<OutletTypePlug<OutletType>>>
) => Outlet<OutletType>;
