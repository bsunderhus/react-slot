import { isValidElement } from "react";
import { _outletElementType, _outletTypeSymbol, unplugged } from "./constants";
import type {
  PlugDataType,
  PlugPropsDataType,
  SlotDataType,
  OutletTypeDataType,
} from "./types/datatype.types";
import type { Outlet } from "./types/outlet.types";

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
  // isIterable
  (typeof value === "object" && value !== null && Symbol.iterator in value) ||
  isValidElement(value);

/**
 * @public
 * Type guard for checking if a value is a valid plug props object.
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
): value is Plug => isPlugProps(value) || isSlot(value) || value === unplugged;
