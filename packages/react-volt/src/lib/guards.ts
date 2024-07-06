import { isValidElement } from "react";
import { _$outletElementType, _$unplugged } from "./constants";
import type { OutletExoticComponent } from "./types/outlet.types";
import type { PlugProps, Plug } from "./types/plug.types";
import type * as ReactTypes from "./types/react.types";

/**
 * @internal
 */
export function _isOutletExoticComponent(
  value: ReactTypes.JSX.ElementType
): value is OutletExoticComponent {
  return (
    typeof value !== "string" &&
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
  value: PlugProps | Shorthand | Plug.Unplugged
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
  value: Props | Plug.Shorthand | Plug.Unplugged
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
 * Type guard for checking if a value is an unplugged plug.
 */
export function isUnplugged<U extends Plug.Unplugged>(
  value: unknown
): value is U {
  return value === _$unplugged;
}
