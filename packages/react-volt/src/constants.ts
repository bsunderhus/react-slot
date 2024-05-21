/**
 * @internal internal reference for the render function
 */
export const _outletRendererSymbol = Symbol();

/**
 * @internal internal reference for the type of an outlet
 */
export const _outletTypeSymbol = Symbol();

/**
 * @internal internal reference for the element type of an outlet
 */
export const _outletElementType = Symbol();

/**
 * @public
 *
 * Symbol used to declare that the plug is unplugged from the outlet
 * and the outlet will not be rendered.
 */
export const unplugged = Symbol();
