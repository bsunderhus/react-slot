import { isValidElement } from "react";
import { isPortal } from "react-is";
import {
  _outletStatusSymbol,
  _outletTypeSymbol,
  OutletStatus,
} from "./constants";
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
export const isOutlet = <
  BaseOutletType extends OutletTypeDataType,
  AlternativeOutletType extends OutletTypeDataType = never
>(
  value: unknown
): value is Outlet<BaseOutletType, AlternativeOutletType> =>
  typeof value === "object" &&
  value !== null &&
  _outletTypeSymbol in value &&
  _outletStatusSymbol in value;

/**
 * @public
 *
 * Type guard for checking if a value is an outlet status.
 * @param value - value to check
 */
export const isOutletStatus = <S extends OutletStatus>(
  value: unknown
): value is S =>
  value === OutletStatus.PluggedIn || value === OutletStatus.UnPlugged;

/**
 * @public
 *
 * Type guard for checking if an outlet is plugged in.
 * @param outlet - outlet to check
 */
export const isPluggedIn = <S extends Outlet<any, any>>(outlet: S): boolean =>
  outlet[_outletStatusSymbol] === OutletStatus.PluggedIn;

/**
 * @public
 *
 * Type guard for checking if an outlet is unplugged.
 * @param outlet - outlet to check
 */
export const isUnplugged = <S extends Outlet<any, any>>(outlet: S): boolean =>
  outlet[_outletStatusSymbol] === OutletStatus.UnPlugged;

/**
 * @internal
 * Type guard for checking if a value is an iterable.
 */
export const isIterable = <T>(value: unknown): value is Iterable<T> =>
  typeof value === "object" && value !== null && Symbol.iterator in value;

/**
 * @public
 * Type guard for checking if a plug is a slot.
 * @param plug - plug to check
 */
export const isSlot = <P extends PlugDataType>(
  plug: P
): plug is Extract<P, SlotDataType> =>
  typeof plug === "string" ||
  typeof plug === "number" ||
  typeof plug === "boolean" ||
  isIterable(plug) ||
  isPortal(plug) ||
  isValidElement(plug);

/**
 * @public
 * Type guard for checking if a plug is a valid outlet props object.
 */
export const isPlugProps = <P extends PlugDataType>(
  plug: P
): plug is Extract<P, PlugPropsDataType> =>
  typeof plug === "object" && plug !== null && !isSlot(plug);
