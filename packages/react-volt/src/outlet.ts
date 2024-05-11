import {
  _outletRendererSymbol,
  _outletStatusSymbol,
  _outletTypeSymbol,
  OutletStatus,
} from "./constants";
import { isSlot, isOutletStatus } from "./guards";
import { resolve as resolvePlug } from "./plug";
import type {
  PlugProps,
  PropsWithRef,
  OutletTypePlug,
} from "./types/plug.types";
import type { Outlet, OutletRenderer, LockedIn } from "./types/outlet.types";
import type {
  PlugPropsDataType,
  SlotDataType,
  OutletTypeDataType,
} from "./types/datatype.types";

/**
 * @public
 *
 * Connects a outlet to a plug.
 *
 * @param outletType - the base element type of the outlet
 * @param plug - the plug that is connected to the outlet, a plug can be:
 * {@link PlugPropsDataType | PlugProps}, {@link SlotDataType | Slot} or {@link OutletStatus}.
 * @param defaultProps - similar to a React component declaration, you can provide an outlet default properties to be merged with the plug provided.
 *
 * > **Note:** _In the context of electrical systems a outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export const outlet = <
  const BaseOutletType extends OutletTypeDataType,
  const AlternativeOutletType extends OutletTypeDataType = never
>(
  outletType: BaseOutletType,
  plug?: NoInfer<OutletTypePlug<BaseOutletType, AlternativeOutletType>>,
  defaultProps?: NoInfer<
    Partial<PropsWithRef<PlugProps<BaseOutletType, AlternativeOutletType>>>
  >
): NoInfer<Outlet<BaseOutletType, AlternativeOutletType>> => {
  const component = {
    [_outletTypeSymbol]: outletType,
    [_outletStatusSymbol]: OutletStatus.PluggedIn,
    [_outletRendererSymbol]: undefined,
    props: { ...defaultProps, ...resolvePlug(plug) },
  } as Outlet<BaseOutletType, AlternativeOutletType>;

  if (plug === undefined) {
    return component;
  }
  if (isOutletStatus(plug)) {
    component[_outletStatusSymbol] = plug;
    return component;
  }
  if (isSlot(plug)) {
    return component;
  }
  if (process.env.NODE_ENV !== "production" && typeof plug !== "object") {
    console.error(/** #__DE-INDENT__ */ `
      [react-volt - outlet()]:
      A plug got an invalid value "${String(plug)}" (${typeof plug}).
      A valid value for a plug is a slot, outlet properties or OutletStatus.
    `);
  }

  if ("dangerouslyRenderOutlet" in component.props) {
    component[_outletRendererSymbol] = component.props
      .dangerouslyRenderOutlet as OutletRenderer<
      BaseOutletType | AlternativeOutletType
    >;
    delete component.props.dangerouslyRenderOutlet;
  }
  return component;
};

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
  plug?: NoInfer<
    LockedIn<OutletTypePlug<BaseOutletType, AlternativeOutletType>>
  >,
  defaultProps?: NoInfer<
    Partial<PropsWithRef<PlugProps<BaseOutletType, AlternativeOutletType>>>
  >
) => Outlet<BaseOutletType, AlternativeOutletType>;
