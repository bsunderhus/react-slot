import * as React from "react";
import { _socketStatusSymbol, _socketTypeSymbol } from "./constants";
import type { UnknownPlugProps } from "./types/unknown.types";
import { SocketComponent, SocketStatus } from "./socket";
import { Slot } from "./types/plug.types";
import { isPortal } from "react-is";

/**
 * @public
 *
 * Type guard for checking if a value is an socket component.
 * @param value - value to check
 */
export const isSocket = <Props extends UnknownPlugProps>(
  value: unknown
): value is SocketComponent<Props> =>
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
export const isSocketStatus = (value: unknown): value is SocketStatus =>
  value === SocketStatus.PluggedIn || value === SocketStatus.UnPlugged;

/**
 * @public
 *
 * Type guard for checking if an socket is plugged in.
 * @param socket - socket to check
 */
export const isPluggedIn = <O extends SocketComponent<UnknownPlugProps>>(
  socket: O
): boolean => socket[_socketStatusSymbol] === SocketStatus.PluggedIn;

/**
 * @public
 *
 * Type guard for checking if an socket is unplugged.
 * @param socket - socket to check
 */
export const isUnplugged = <O extends SocketComponent<UnknownPlugProps>>(
  socket: O
): boolean => socket[_socketStatusSymbol] === SocketStatus.UnPlugged;

/**
 * @internal
 * Type guard for checking if a value is an iterable.
 */
export const isIterable = <T>(value: unknown): value is Iterable<T> =>
  typeof value === "object" && value !== null && Symbol.iterator in value;

/**
 * @public
 * Type guard for checking if a value is a slot.
 * @param node - value to check
 */
export const isSlot = <Props extends UnknownPlugProps>(
  node: unknown
): node is Slot<Props> =>
  node === null ||
  node === undefined ||
  typeof node === "string" ||
  typeof node === "number" ||
  typeof node === "boolean" ||
  isIterable(node) ||
  isPortal(node) ||
  React.isValidElement(node);
