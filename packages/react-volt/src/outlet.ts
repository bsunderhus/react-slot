import * as ReactTypes from "react";
import { _$outletElementType } from "./constants";
import { isOmniPlug } from "./guards";
import { resolve as resolvePlug } from "./plug";
import type {
  LockedIn,
  UnpluggedPlug,
  Plug,
  Swap,
  Required,
} from "./types/plug.types";
import type { Outlet } from "./types/outlet.types";
import type {
  PlugPropsDataType,
  OmniPlugDataType,
  ContactDataType,
  ProngDataType,
} from "./types/datatype.types";

/**
 * @public
 *
 * Connects an outlet to a plug.
 *
 * @param prong - the base element type of the outlet
 * @param plug - the plug that is connected to the outlet, a plug can be:
 * {@link PlugPropsDataType | PlugProps}, {@link OmniPlugDataType | OmniPlug} or {@link UnpluggedPlug}.
 * @param defaultProps - similar to a React component declaration, you can provide an outlet default properties to be merged with the plug provided.
 *
 * > **Note:** _In the context of electrical systems a outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export const outlet = <const Contact extends ContactDataType>(
  prong: Required<Contact>,
  plug: NoInfer<Plug<Swap<Contact>>>
): NoInfer<Outlet<Contact> | undefined> => {
  const props: PlugPropsDataType | undefined = resolvePlug(plug);
  if (props === undefined) return props;
  /**
   * Casting is required here as we're using the signature
   * of a function to define the outlet component.
   * This is similar to how React exotic components
   * are defined (e.g. Suspense, Fragment, ForwardRef, Memo, etc,.)
   */
  const component = {
    props,
    [_$outletElementType]: prong,
    $$typeof: _$outletElementType,
  } as Outlet<Contact>;

  if (isOmniPlug(plug)) return component;

  if (process.env.NODE_ENV !== "production" && typeof plug !== "object") {
    console.error(/** #__DE-INDENT__ */ `
      [react-volt - outlet()]:
      A plug got an invalid value "${String(plug)}" (${typeof plug}).
      A valid value for a plug is a React node, plug properties or 'plug.unplugged()'.
    `);
  }
  let override: ReactTypes.JSX.ElementType | undefined;
  if ("Component" in props) {
    override = props.Component;
    delete props.Component;
  } else if ("as" in props) {
    override = props.as;
    delete props.as;
  }
  if (override) component[_$outletElementType] = override;

  return component;
};

/**
 * @public
 *
 * Connects a Lock-in outlet to a plug. This method is equivalent to `outlet`,
 * but with the {@link PlugStatus.UnPlugged} removed from the possible values of the plug.
 *
 * @param elementType - the base element type of the outlet
 * @param plug - the plug that is connected to the outlet, a plug can be:
 * {@link PlugPropsDataType | PlugProps}, {@link OmniPlugDataType | Slot} or {@link PlugStatus.PluggedIn}.
 * @param defaultProps - similar to a React component declaration, you can provide an outlet default properties to be merged with the plug provided.
 *
 * > **Note:** _In the context of electrical systems a Lock-in outlet is an outlet with a lock mechanism to avoid it from being accidentally unplugged._
 */
outlet.lockedIn = outlet as <const Contact extends ContactDataType>(
  prong: Required<Contact>,
  plug: NoInfer<LockedIn<Plug<Swap<Contact>>>>
) => NoInfer<Outlet<Contact>>;
