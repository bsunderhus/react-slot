import { isValidElement } from "react";
import { _$outletElementType } from "./constants";
import type { Outlet, DangerouslyRenderFunction } from "./types/outlet.types";
import type { Plug, PlugProps, PlugPropsType } from "./types/plug.types";

/**
 * @public
 *
 * Type guard for checking if a value is an outlet component.
 * @param value - value to check
 */
export const isOutlet = <Type extends PlugPropsType>(
  value: unknown
): value is Outlet<Type> =>
  typeof value === "object" &&
  value !== null &&
  "$$typeof" in value &&
  value.$$typeof === _$outletElementType;

/**
 * @public
 * Type guard for checking if a value is an omni-plug.
 * @param value - plug to check
 */
export const isShorthand = <Shorthand extends Plug.Shorthand>(
  value: unknown
): value is Shorthand =>
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "boolean" ||
  (typeof value === "object" && value !== null && Symbol.iterator in value) ||
  isValidElement(value);

/**
 * @public
 * Type guard for checking if a value is a valid plug props object.
 */
export const isPlugProps = <Props extends PlugProps>(
  value: unknown
): value is Props =>
  typeof value === "object" &&
  value !== null &&
  !isValidElement(value) &&
  !(Symbol.iterator in value);

/**
 * @public
 * Type guard for checking if a value is a valid plug.
 */
export const isPlug = <P extends Plug>(value: unknown): value is P =>
  isPlugProps(value) || isShorthand(value) || isUnplugged(value);

/**
 * @internal
 * Type guard for checking if a value is a dangerously render function.
 */
export const _isDangerouslyRenderFunction = (
  value: unknown
): value is DangerouslyRenderFunction => typeof value === "function";

/**
 * @public
 * Type guard for checking if a value is an unplugged plug.
 */
export const isUnplugged = <U extends Plug.Unplugged>(
  value: unknown
): value is U => value === null;
