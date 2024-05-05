import {
  Outlet,
  PlugShorthandValue,
  UnknownPlugProps,
  UnknownPlugRenderFunction,
  PlugPropsWithRef,
} from "./types";
import {
  plugRendererSymbol,
  outletStatusSymbol,
  outletTypeSymbol,
} from "./constants";
import { isValidNode } from "./utils/isValidNode";
import { OutletStatus, isOutletStatus } from "./OutletStatus";

export const outlet = <Props extends UnknownPlugProps>(
  elementType: NonNullable<Props["as"]>,
  plug: Props | UnknownPlugRenderFunction | PlugShorthandValue | OutletStatus,
  defaultProps?: Partial<PlugPropsWithRef<Props>>
): Outlet<PlugPropsWithRef<Props>> => {
  const component = {
    [outletTypeSymbol]: elementType,
    [outletStatusSymbol]: OutletStatus.PluggedIn,
    [plugRendererSymbol]: undefined,
    props: { ...defaultProps },
  } as Outlet<PlugPropsWithRef<Props>>;

  if (isOutletStatus(plug)) {
    Object.assign(component, { [outletStatusSymbol]: plug });
    return component;
  }
  if (typeof plug === "function") {
    Object.assign(component, { [plugRendererSymbol]: plug });
    return component;
  }
  if (isValidNode(plug)) {
    Object.assign(component.props, { children: plug });
    return component;
  }
  if (typeof plug !== "object" && !import.meta.env.PROD) {
    console.error(/** #__DE-INDENT__ */ `
      resolveShorthand:
      A plug got an invalid value "${plug}" (${typeof plug}).
      A valid value for a plug is a plug shorthand or plug properties object.
      Plug shorthands can be strings, numbers, arrays or JSX elements
    `);
  }

  Object.assign(component.props, plug);
  return component;
};

outlet.lockedIn = <Props extends UnknownPlugProps>(
  elementType: NonNullable<Props["as"]>,
  plug:
    | Props
    | UnknownPlugRenderFunction
    | PlugShorthandValue
    | OutletStatus.PluggedIn,
  defaultProps?: Partial<PlugPropsWithRef<Props>>
): Outlet<PlugPropsWithRef<Props>> => outlet(elementType, plug, defaultProps);

export const isOutlet = <Props extends UnknownPlugProps>(
  value: unknown
): value is Outlet<Props> =>
  typeof value === "object" &&
  value !== null &&
  outletTypeSymbol in value &&
  outletStatusSymbol in value;

export const isPluggedIn = <O extends Outlet<UnknownPlugProps>>(
  outlet: O
): boolean => outlet[outletStatusSymbol] === OutletStatus.PluggedIn;

export const isUnplugged = <O extends Outlet<UnknownPlugProps>>(
  outlet: O
): boolean => outlet[outletStatusSymbol] === OutletStatus.UnPlugged;
