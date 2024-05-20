/**
 * @internal internal reference for the render function
 */
export const _outletRendererSymbol = Symbol();

/**
 * @internal internal reference for the outlet type of an outlet
 */
export const _outletTypeSymbol = Symbol();

/**
 * @internal internal reference for the element type of an outlet
 */
export const _outletElementType = Symbol();

/**
 * Internal symbol used to declare that the plug is plugged in the outlet
 * and the outlet is ready to be rendered.
 *
 * @public it has to be public otherwise it'll be stripped away from types.
 */
export const _pluggedInSymbol = Symbol();

/**
 * Internal symbol used to declare that the plug is unplugged from the outlet
 * and the outlet will not be rendered.
 *
 * @public it has to be public otherwise it'll be stripped away from types
 */
export const _unPluggedSymbol = Symbol();

/**
 * @public
 * An outlet status refers to the presence of a plug.
 *
 * If a plug is plugged in the outlet it means that it'll be rendered
 * while an unplugged plug will not be rendered.
 *
 * > **Note:** _in the context of electrical systems plugged in and unplugged are terms used to describe the connection between a plug and an outlet_
 */
export type PlugStatus = PlugStatus.PluggedIn | PlugStatus.UnPlugged;

/** @public */
export const PlugStatus = {
  PluggedIn: _pluggedInSymbol,
  UnPlugged: _unPluggedSymbol,
} as const;

/** @public */
export namespace PlugStatus {
  export type PluggedIn = typeof PlugStatus.PluggedIn;
  export type UnPlugged = typeof PlugStatus.UnPlugged;
}
