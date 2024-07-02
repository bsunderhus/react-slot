import { _$dangerouslyRender, _$outletElementType } from "./constants";
import { isShorthand, isUnplugged } from "./guards";
import { resolveShorthand } from "./plug";
import type {
  PickDefault,
  Plug,
  PlugProps,
  PlugPropsType,
} from "./types/plug.types";
import type { Outlet, Unlocked } from "./types/outlet.types";

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
export function outlet<Props extends PlugProps>(
  defaultType: PlugPropsTypeFromPlugProps<PickDefault<Props>>,
  plug: Props | Plug.Shorthand
): Outlet<PlugPropsTypeFromPlugProps<Props>>;
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
export function outlet<Props extends PlugProps>(
  defaultType: PlugPropsTypeFromPlugProps<PickDefault<Props>>,
  plug: Props | Plug.Shorthand | Plug.Unplugged
): Unlocked<Outlet<PlugPropsTypeFromPlugProps<Props>>>;
export function outlet(
  defaultType: PlugPropsType,
  plug: Plug
): Unlocked<Outlet> {
  const props = resolveShorthand(plug);

  if (isUnplugged(props)) return null;

  const { as = defaultType, dangerouslyRender, ...rest } = props;

  // Casting is required here as we're using the signature
  // of a function to define the outlet component.
  // This is similar to how React exotic components are defined
  // (e.g. Suspense, Fragment, ForwardRef, Memo, etc,.)
  const component = {
    ...rest,
    $$typeof: _$outletElementType,
    [_$outletElementType]: as,
    [_$dangerouslyRender]: dangerouslyRender,
  } as Outlet;

  if (isShorthand(plug)) return component;

  if (process.env.NODE_ENV !== "production" && typeof plug !== "object") {
    console.error(/** #__DE-INDENT__ */ `
      [react-volt - outlet()]:
      A plug got an invalid value "${String(plug)}" (${typeof plug}).
      A valid value for a plug is a React node, plug properties or 'plug.unplugged()'.
    `);
  }
  return component;
}

type PlugPropsTypeFromPlugProps<Props extends PlugProps> = NonNullable<
  Props["as"]
> extends PlugPropsType<any>
  ? NonNullable<Props["as"]>
  : never;
