import { _$dangerouslyRender, _$outletElementType } from "./constants";
import { isShorthand, isUnplugged } from "./guards";
import { resolveShorthand } from "./plug";
import type {
  Plug,
  PlugProps,
  PlugPropsType,
  Default,
} from "./types/plug.types";
import type { Outlet, Unlocked } from "./types/outlet.types";
import type * as ReactTypes from "./types/react.types";

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
export function outlet<
  DefaultType extends PlugPropsType<any>,
  AlternativeType extends PlugPropsType<any> = never
>(
  defaultType: DefaultType,
  // TODO: use NoInfer here, TS 5.4 feature
  plug:
    | Default<PlugPropsFromType<DefaultType>>
    | PlugPropsFromType<Exclude<AlternativeType, DefaultType>>
    | Plug.Shorthand
): Outlet<DefaultType | AlternativeType>;
/**
 * @public
 *
 * Method to create an outlet.
 *
 * @param defaultType - The default type of the outlet. This is used when the plug does not specify a type.
 * @param plug - The plug that connects to the outlet. This can be a React node, plug properties or 'plug.unplugged()'.
 *
 * > **Note:** _In the context of electrical systems an outlet is what allows a plug to connect to the system. It is the receiving end of the connection, while the plug is the sending end._
 */
export function outlet<
  DefaultType extends PlugPropsType<any>,
  AlternativeType extends PlugPropsType<any> = never
>(
  defaultType: DefaultType,
  // TODO: use NoInfer here, TS 5.4 feature
  plug:
    | Default<PlugPropsFromType<DefaultType>>
    | PlugPropsFromType<Exclude<AlternativeType, DefaultType>>
    | Plug.Shorthand
    | Plug.Unplugged
): Unlocked<Outlet<DefaultType | AlternativeType>>;
export function outlet(
  defaultType: PlugPropsType,
  plug: Plug
): Unlocked<Outlet> {
  const props = resolveShorthand(plug);

  if (isUnplugged(props)) return props;

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

type PlugPropsFromType<Type extends PlugPropsType<any>> =
  Type extends keyof PlugProps.Intrinsics
    ? PlugProps.Intrinsics[Type]
    : Type extends ReactTypes.FC<infer Props>
    ? PlugProps.FC<Props>
    : never;
