import * as ReactTypes from "./types/react.types";
import { _$dangerouslyRender, _$outletElementType } from "./constants";
import { isShorthand } from "./guards";
import { resolve } from "./plug";
import type {
  Plug,
  PlugProps,
  PlugPropsWithMetadata,
} from "./types/plug.types";
import type { Outlet } from "./types/outlet.types";
import type { PickDefault } from "./types/helper.types";

/**
 * @public
 *
 * Connects an outlet to a plug.
 *
 * @param defaultOutletType - the base element type of the outlet
 * @param plug - the plug that is connected to the outlet, a plug can be:
 * {@link PlugProps}, {@link Plug.Shorthand} or {@link Plug.Unplugged}.
 * @param defaultProps - similar to a React component declaration, you can provide an outlet default properties to be merged with the plug provided.
 *
 * > **Note:** _In the context of electrical systems a outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
const outlet = <Props extends PlugProps>(
  defaultOutletType: ExtractPlugPropsType<PickDefault<Props>>,
  plug: Props | Plug.Shorthand | Plug.Unplugged
): Outlet<ExtractPlugPropsType<Props>> | undefined => {
  const props = resolve<PlugPropsWithMetadata>(plug);

  if (!props) return props;

  const { as, dangerouslyRender, ...rest } = props;

  // Casting is required here as we're using the signature
  // of a function to define the outlet component.
  // This is similar to how React exotic components are defined
  // (e.g. Suspense, Fragment, ForwardRef, Memo, etc,.)
  const component = {
    ...rest,
    [_$outletElementType]: as ?? defaultOutletType,
    [_$dangerouslyRender]: dangerouslyRender,
  } as Outlet<ExtractPlugPropsType<Props>>;

  if (isShorthand(plug)) return component;

  if (process.env.NODE_ENV !== "production" && typeof plug !== "object") {
    console.error(/** #__DE-INDENT__ */ `
      [react-volt - outlet()]:
      A plug got an invalid value "${String(plug)}" (${typeof plug}).
      A valid value for a plug is a React node, plug properties or 'plug.unplugged()'.
    `);
  }

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
 * {@link PlugProps}, {@link Plug.Shorthand} or {@link PlugStatus.PluggedIn}.
 * @param defaultProps - similar to a React component declaration, you can provide an outlet default properties to be merged with the plug provided.
 *
 * > **Note:** _In the context of electrical systems a Lock-in outlet is an outlet with a lock mechanism to avoid it from being accidentally unplugged._
 */
outlet.lockedIn = outlet as <Props extends PlugProps>(
  defaultOutletType: ExtractPlugPropsType<PickDefault<Props>>,
  lockedInPlug: Props | Plug.Shorthand
) => Outlet<ExtractPlugPropsType<Props>>;

type ExtractPlugPropsType<Props extends PlugProps> = NonNullable<Props["as"]>;

export default outlet;
