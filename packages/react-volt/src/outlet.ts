import { _$dangerouslyRender, _$outletElementType } from "./constants";
import { isShorthand, isUnplugged } from "./guards";
import { resolveShorthand } from "./plug";
import type {
  Plug,
  PlugProps,
  PickDefault,
  PlugWithoutShorthand,
} from "./types/plug.types";
import type { Outlet } from "./types/outlet.types";

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
export const outlet = <P extends PlugWithoutShorthand>(
  defaultOutletType: ExtractPlugPropsType<PickDefault<P>>,
  plug: P | Plug.Shorthand
): Outlet<ExtractPlugPropsType<P>> | (P & Plug.Unplugged) => {
  const props = resolveShorthand(plug);

  if (isUnplugged(props)) return props;

  const { as, dangerouslyRender, ...rest } = props;

  // Casting is required here as we're using the signature
  // of a function to define the outlet component.
  // This is similar to how React exotic components are defined
  // (e.g. Suspense, Fragment, ForwardRef, Memo, etc,.)
  const component = {
    ...rest,
    [_$outletElementType]: as ?? defaultOutletType,
    [_$dangerouslyRender]: dangerouslyRender,
  } as Outlet<ExtractPlugPropsType<P>>;

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

type ExtractPlugPropsType<P extends Plug> = P extends PlugProps
  ? NonNullable<P["as"]>
  : never;
