import type { Plug } from "./plug.types";

/**
 * @public
 *
 * A locked in plug is a plug that is connected to an outlet and cannot be removed.
 * This removes the possibility of opting-out of an outlet.
 *
 * > **Note:** _In the context of electrical systems a Lock-in plug is a plug with a lock mechanism to avoid it from being accidentally unplugged._
 */
export type LockedIn<P> = Exclude<P, Plug.Unplugged>;

/**
 * @public
 *
 * An unlocked outlet is an outlet that can be disconnected from a plug.
 *
 * > **Note:** _in the context of electrical systems unlocked is a term used to describe the lack of a connection between a plug and an outlet_
 */
export type Unlocked<O> = O | Plug.Unplugged;

/**
 * Helper type that is equivalent to `never`
 * but it's more descriptive.
 */
export type Never<Msg extends string> = Msg & never;

export interface ObjectDataType {
  [P: string]: unknown;
}

export interface FunctionDataType {
  (...args: any[]): any;
}

export type IsNever<T> = [T] extends [never] ? true : false;
