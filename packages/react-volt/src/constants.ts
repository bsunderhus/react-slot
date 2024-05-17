/**
 * Internal symbol used to maintain proper ref types even if the plug ref is lost.
 * A forward ref component normally has its ref value split from props into
 * a separate exclusive argument
 *
 * This symbol represents the common reference from a plug to an outlet.
 *
 * @public it has to be public otherwise it'll be stripped away from types, and the ref type will be lost
 */
export const _plugRefSymbol = Symbol("plugRefSymbol");

/**
 * @internal internal reference for the render function
 */
export const _outletRendererSymbol = Symbol("outletRenderer");

/**
 * @internal internal reference for the outlet type
 */
export const _outletTypeSymbol = Symbol("outletType");

/**
 * @internal internal reference for the outlet status
 */
export const _outletStatusSymbol = Symbol("outletStatus");

/**
 * Internal symbol used to declare that the plug is plugged in the outlet
 * and the outlet is ready to be rendered.
 *
 * @public it has to be public otherwise it'll be stripped away from types.
 */
export const _pluggedInSymbol = Symbol("pluggedIn");

/**
 * Internal symbol used to declare that the plug is unplugged from the outlet
 * and the outlet will not be rendered.
 *
 * @public it has to be public otherwise it'll be stripped away from types
 */
export const _unPluggedSymbol = Symbol("unPlugged");

/**
 * @public
 * An outlet status refers to the presence of a plug.
 *
 * If a plug is plugged in the outlet it means that it'll be rendered
 * while an unplugged plug will not be rendered.
 *
 * > **Note:** in the context of electrical systems plugged in and unplugged are terms used to describe the connection between a plug and an outlet
 */
export type OutletStatus = OutletStatus.PluggedIn | OutletStatus.UnPlugged;

/** @public */
export const OutletStatus = {
  PluggedIn: _pluggedInSymbol,
  UnPlugged: _unPluggedSymbol,
} as const;

/** @public */
export namespace OutletStatus {
  export type PluggedIn = typeof OutletStatus.PluggedIn;
  export type UnPlugged = typeof OutletStatus.UnPlugged;
}
