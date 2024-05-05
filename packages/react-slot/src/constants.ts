/**
 * @public - it has to be public otherwise it'll be stripped away from types
 * Internal symbol used to maintain proper ref types even if the plug ref is lost
 * a forward ref component normally has its ref value split from props into a separate exclusive argument
 */
export const plugRefTypeSymbol = Symbol();

/**
 * @internal
 * Internal reference for the render function
 */
export const plugRendererSymbol = Symbol();

/**
 * @internal
 * Internal reference for the plug type
 */
export const outletTypeSymbol = Symbol();

/**
 * @internal
 * Internal reference for the plug status
 */
export const outletStatusSymbol = Symbol();
