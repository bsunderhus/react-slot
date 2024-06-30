import type * as ReactTypes from "./react.types";

/**
 * @public
 *
 * Helper type that works similar to Omit,
 * but when modifying an union type it will distribute the omission to all the union members.
 *
 * See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types} for more information
 */
type DistributiveOmit<T, K extends keyof any> = T extends unknown
  ? Omit<T, K>
  : T;

/**
 * @public
 *
 * Helper type that works similar to Pick,
 * but when modifying an union type it will distribute the picking to all the union members.
 *
 * See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types} for more information
 */
type DistributivePick<T, K> = T extends unknown ? Pick<T, K & keyof T> : never;

export type { DistributiveOmit as Omit, DistributivePick as Pick };

/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type ReactEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.SyntheticEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type ClipboardEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.ClipboardEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type CompositionEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.CompositionEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type DragEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.DragEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type FocusEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.FocusEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type FormEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.FormEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type ChangeEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.ChangeEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type KeyboardEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.KeyboardEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type MouseEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.MouseEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type TouchEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.TouchEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type PointerEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.PointerEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type UIEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.UIEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type WheelEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.WheelEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type AnimationEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.AnimationEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type TransitionEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends unknown ? ReactTypes.TransitionEvent<T> : never
>;
