/**
 * @internal
 */
const pluggedInStatusSymbol = Symbol();

/**
 * @internal
 */
const unPluggedStatusSymbol = Symbol();

/**
 * An outlet status refers to the presence of a plug.
 *
 * If a plug is plugged in the outlet it means that it'll be rendered
 * while an unplugged plug will not be rendered.
 *
 * > Note: in the context of electrical systems plugged in and unplugged are terms used to describe the connection between a plug and an outlet
 */
export type OutletStatus = OutletStatus.PluggedIn | OutletStatus.Unplugged;

export const OutletStatus = {
  PluggedIn: pluggedInStatusSymbol,
  UnPlugged: unPluggedStatusSymbol,
} as const;

export namespace OutletStatus {
  export type PluggedIn = typeof pluggedInStatusSymbol;
  export type Unplugged = typeof unPluggedStatusSymbol;
}

/**
 * Helper type that removes Unplugged as a valid value.
 * This removes the possibility of opting-out of an outlet.
 *
 * > Note: In the context of electrical systems a Lock-in outlet is an outlet with a lock mechanism to avoid it from being accidentally unplugged.
 */
export type LockedIn<T> = Exclude<T, OutletStatus.Unplugged>;

export const isOutletStatus = (value: unknown): value is OutletStatus =>
  value === OutletStatus.PluggedIn || value === OutletStatus.UnPlugged;
