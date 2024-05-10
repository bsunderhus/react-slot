import * as React from "react";
import {
  _socketStatusSymbol,
  _socketTypeSymbol,
  SocketStatus,
} from "./constants";
import type {
  PlugDataType,
  PlugPropsDataType,
  SlotDataType,
  SocketTypeDataType,
} from "./types/datatype.types";
import { isPortal } from "react-is";
import type { Socket } from "./types/socket.types";

/**
 * @public
 *
 * Type guard for checking if a value is an socket component.
 * @param value - value to check
 */
export const isSocket = <
  BaseSocketType extends SocketTypeDataType,
  AlternativeSocketType extends SocketTypeDataType = never
>(
  value: unknown
): value is Socket<BaseSocketType, AlternativeSocketType> =>
  typeof value === "object" &&
  value !== null &&
  _socketTypeSymbol in value &&
  _socketStatusSymbol in value;

/**
 * @public
 *
 * Type guard for checking if a value is an socket status.
 * @param value - value to check
 */
export const isSocketStatus = <S extends SocketStatus>(
  value: unknown
): value is S =>
  value === SocketStatus.PluggedIn || value === SocketStatus.UnPlugged;

/**
 * @public
 *
 * Type guard for checking if an socket is plugged in.
 * @param socket - socket to check
 */
export const isPluggedIn = <S extends Socket<any, any>>(socket: S): boolean =>
  socket[_socketStatusSymbol] === SocketStatus.PluggedIn;

/**
 * @public
 *
 * Type guard for checking if an socket is unplugged.
 * @param socket - socket to check
 */
export const isUnplugged = <S extends Socket<any, any>>(socket: S): boolean =>
  socket[_socketStatusSymbol] === SocketStatus.UnPlugged;

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
  React.isValidElement(plug);

/**
 * @public
 * Type guard for checking if a plug is a valid socket props object.
 */
export const isPlugProps = <P extends PlugDataType>(
  plug: P
): plug is Extract<P, PlugPropsDataType> =>
  typeof plug === "object" && plug !== null && !isSlot(plug);
