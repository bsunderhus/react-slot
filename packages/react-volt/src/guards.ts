import { isValidElement } from "react";
import { _$outletElementType, _$unplugged } from "./constants";
import type { Outlet, DangerouslyRenderFunction } from "./types/outlet.types";
import type { Plug, PlugProps, PlugPropsType } from "./types/plug.types";

/**
 * @public
 *
 * Type guard for checking if a value is an outlet component.
 * @param value - value to check
 */
export function isOutlet<Type extends PlugPropsType = never>(
  value: unknown
): value is Outlet<Type> {
  return (
    typeof value === "object" &&
    value !== null &&
    "$$typeof" in value &&
    value.$$typeof === _$outletElementType
  );
}

/**
 * @public
 * Type guard for checking if a value is an omni-plug.
 * @param value - plug to check
 */
export function isShorthand<Shorthand extends Plug.Shorthand>(
  value: unknown
): value is Shorthand {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    (typeof value === "object" && value !== null && Symbol.iterator in value) ||
    isValidElement(value)
  );
}

/**
 * @public
 * Type guard for checking if a value is a valid plug props object.
 */
export function isPlugProps<Props extends PlugProps>(
  value: unknown
): value is Props {
  return (
    typeof value === "object" &&
    value !== null &&
    !isValidElement(value) &&
    !(Symbol.iterator in value)
  );
}

/**
 * @public
 * Type guard for checking if a value is a valid plug.
 */
export function isPlug<P extends Plug>(value: unknown): value is P {
  return isPlugProps(value) || isShorthand(value) || isUnplugged(value);
}

/**
 * @internal
 * Type guard for checking if a value is a dangerously render function.
 */
export function _isDangerouslyRenderFunction(
  value: unknown
): value is DangerouslyRenderFunction {
  return typeof value === "function";
}

/**
 * @public
 * Type guard for checking if a value is an unplugged plug.
 */
export function isUnplugged<U extends Plug.Unplugged>(
  value: unknown
): value is U {
  return value === _$unplugged;
}
