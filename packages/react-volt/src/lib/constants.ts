import type { Plug } from "./types/plug.types";

/**
 * @internal internal reference for the element type of an outlet
 */
export const _$outletElementType = Symbol.for("rv.outletElementType");

/**
 * @internal
 */
export const _$unplugged: Plug.Unplugged = null;
