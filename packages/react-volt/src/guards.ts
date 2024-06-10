import { isValidElement } from "react";
import { _$outletElementType, _$unplugged } from "./constants";
import type {
  PlugDataType,
  OmniPlugDataType,
  ContactDataType,
  PlugPropsDataType,
} from "./types/datatype.types";
import type { Outlet } from "./types/outlet.types";

/**
 * @public
 *
 * Type guard for checking if a value is an outlet component.
 * @param value - value to check
 */
export const isOutlet = <Contact extends ContactDataType>(
  value: unknown
): value is Outlet<Contact> =>
  typeof value === "object" &&
  value !== null &&
  "$$typeof" in value &&
  value.$$typeof === _$outletElementType;

/**
 * @public
 * Type guard for checking if a value is an omni-plug.
 * @param value - plug to check
 */
export const isOmniPlug = <Plug extends OmniPlugDataType>(
  value: unknown
): value is Plug =>
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "boolean" ||
  (typeof value === "object" && value !== null && Symbol.iterator in value) ||
  isValidElement(value);

/**
 * @public
 * Type guard for checking if a value is a valid plug props object.
 */
export const isPlugProps = <P extends PlugPropsDataType>(
  value: unknown
): value is P =>
  typeof value === "object" &&
  value !== null &&
  !isValidElement(value) &&
  !(Symbol.iterator in value);

/**
 * @public
 * Type guard for checking if a value is a valid plug.
 */
export const isPlug = <Plug extends PlugDataType>(
  value: unknown
): value is Plug =>
  isPlugProps(value) || isOmniPlug(value) || value === _$unplugged;
