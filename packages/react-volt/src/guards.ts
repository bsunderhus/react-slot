import { isValidElement } from "react";
import { isPortal, isValidElementType } from "react-is";
import {
  _outletElementType,
  _outletTypeSymbol,
  pluggedIn,
  unplugged,
} from "./constants";
import type {
  PlugDataType,
  PlugPropsDataType,
  SlotDataType,
  OutletTypeDataType,
} from "./types/datatype.types";
import type { Outlet } from "./types/outlet.types";
import type { PlugStatus } from "./types/plug.types";

/**
 * @public
 *
 * Type guard for checking if a value is an outlet type.
 * @param value - value to check
 */
export const isOutletType = isValidElementType as <
  O extends OutletTypeDataType
>(
  value: unknown
) => value is O;

/**
 * @public
 *
 * Type guard for checking if a value is an outlet component.
 * @param value - value to check
 */
export const isOutlet = <OutletType extends OutletTypeDataType>(
  value: unknown
): value is Outlet<OutletType> =>
  typeof value === "object" &&
  value !== null &&
  "$$typeof" in value &&
  value.$$typeof === _outletElementType;

/**
 * @internal
 * Type guard for checking if a value is an iterable.
 */
export const isIterable = <T>(value: unknown): value is Iterable<T> =>
  typeof value === "object" && value !== null && Symbol.iterator in value;

/**
 * @public
 * Type guard for checking if a value is a slot.
 * @param value - plug to check
 */
export const isSlot = <Slot extends SlotDataType>(
  value: unknown
): value is Slot =>
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "boolean" ||
  isIterable(value) ||
  isPortal(value) ||
  isValidElement(value);

/**
 * @public
 * Type guard for checking if a value is a valid outlet props object.
 */
export const isPlugProps = <P extends PlugPropsDataType>(
  value: unknown
): value is P => typeof value === "object" && value !== null && !isSlot(value);

/**
 * @public
 * Type guard for checking if a value is a valid plug.
 */
export const isPlug = <Plug extends PlugDataType>(
  value: unknown
): value is Plug => isPlugProps(value) || isSlot(value) || isPlugStatus(value);

/**
 * @public
 *
 * Type guard for checking if a value is a plug status.
 * @param value - value to check
 */
export const isPlugStatus = <Status extends PlugStatus>(
  value: unknown
): value is Status => value === pluggedIn || value === unplugged;
