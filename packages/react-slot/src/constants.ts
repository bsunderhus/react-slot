/**
 * @public - it has to be public otherwise it'll be stripped away from types
 * Internal symbol used to maintain proper ref types even if the slot ref is lost
 * a forward ref component normally has its ref value split from props into a separate exclusive argument
 */
export const slotRefTypeSymbol = Symbol();

/**
 * @internal
 * Internal reference for the render function
 */
export const slotRenderFunctionSymbol = Symbol();

/**
 * @internal
 * Internal reference for the slot type
 */
export const slotTypeSymbol = Symbol();

/**
 * @internal
 * Internal reference for the slot status
 */
export const slotStatusSymbol = Symbol();

export const PluggedIn = Symbol();

export const UnPlugged = Symbol();
