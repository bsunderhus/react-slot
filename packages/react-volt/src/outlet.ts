import { _$outletElementType } from "./constants";
import { isUnplugged } from "./guards";
import { resolveShorthand } from "./plug";
import type { Plug, PlugProps } from "./types/plug.types";
import type { OutletExoticComponent } from "./types/outlet.types";
import type { LockedIn, Unlocked } from "./types/helper.types";

/**
 * @public
 *
 * Method to create a lock-in outlet.
 *
 * @param defaultType - The default type of the outlet. This is used when the plug does not specify a type.
 * @param plug - The plug that connects to the outlet. This can be a React node or plug properties.
 *
 * > **Note:** _In the context of electrical systems an outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 *
 * > **Note:** _In the context of electrical systems a  lock-in outlet, also known as a twist-lock outlet or power lock outlet, is a type of electrical outlet that has a locking mechanism to prevent the plug from being accidentally pulled out._
 */
export function outlet<Props extends Required<PlugProps>>(
  plug: LockedIn<Plug<Props>>
): OutletExoticComponent<Props>;
/**
 * @public
 *
 * Method to create a outlet.
 *
 * @param defaultType - The default type of the outlet. This is used when the plug does not specify a type.
 * @param plug - The plug that connects to the outlet. This can be a React node or plug properties.
 *
 * > **Note:** _In the context of electrical systems an outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export function outlet<Props extends Required<PlugProps>>(
  plug: Plug<Props>
): Unlocked<OutletExoticComponent<Props>>;
export function outlet(
  plug: Plug<Required<PlugProps>>
): Unlocked<OutletExoticComponent> {
  if (isUnplugged(plug)) return plug;
  // Casting is required here as we're using the signature
  // of a function to define the outlet component.
  // This is similar to how React exotic components are defined
  // (e.g. Suspense, Fragment, ForwardRef, Memo, etc,.)
  return {
    props: resolveShorthand(plug),
    $$typeof: _$outletElementType,
  } as OutletExoticComponent;
}
