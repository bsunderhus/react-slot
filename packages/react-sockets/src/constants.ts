/**
 * Internal symbol used to maintain proper ref types even if the plug ref is lost
 * a forward ref component normally has its ref value split from props into
 * a separate exclusive argument
 *
 * @public it has to be public otherwise it'll be stripped away from types, and the ref type will be lost
 */
export const _plugRefTypeSymbol = Symbol("plugRefType");

/**
 * @internal internal reference for the render function
 */
export const _socketRendererSymbol = Symbol("socketRenderer");

/**
 * @internal internal reference for the socket type
 */
export const _socketTypeSymbol = Symbol("socketType");

/**
 * @internal internal reference for the socket status
 */
export const _socketStatusSymbol = Symbol("socketStatus");

/**
 * Internal symbol used to declare that the plug is plugged in the socket
 * and the socket is ready to be rendered.
 *
 * @public it has to be public otherwise it'll be stripped away from types.
 */
export const _pluggedInSymbol = Symbol("pluggedIn");

/**
 * Internal symbol used to declare that the plug is unplugged from the socket
 * and the socket will not be rendered.
 *
 * @public it has to be public otherwise it'll be stripped away from types
 */
export const _unPluggedSymbol = Symbol("unPlugged");
