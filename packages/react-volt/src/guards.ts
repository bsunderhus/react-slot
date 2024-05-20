import { isValidElement } from "react";
import { isPortal, isValidElementType } from "react-is";
import { _outletElementType, _outletTypeSymbol, PlugStatus } from "./constants";
import type {
  PlugDataType,
  PlugPropsDataType,
  SlotDataType,
  OutletTypeDataType,
} from "./types/datatype.types";
import type { OutletComponent } from "./types/outlet.types";

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
): value is OutletComponent<OutletType> =>
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
export const isPlugProps = <P extends PlugDataType>(
  value: unknown
): value is Extract<P, PlugPropsDataType> =>
  typeof value === "object" && value !== null && !isSlot(value);

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
 * Type guard for checking if a value is an outlet status.
 * @param value - value to check
 */
export const isPlugStatus = <S extends PlugStatus>(
  value: unknown
): value is S =>
  value === PlugStatus.PluggedIn || value === PlugStatus.UnPlugged;
