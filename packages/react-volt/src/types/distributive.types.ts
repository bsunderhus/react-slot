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

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveSyntheticEvent<
  Target = Element,
  E = Event
> = Target extends unknown ? ReactTypes.SyntheticEvent<Target, E> : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveClipboardEvent<Target = Element> = Target extends unknown
  ? ReactTypes.ClipboardEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveCompositionEvent<Target = Element> = Target extends unknown
  ? ReactTypes.CompositionEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveDragEvent<Target = Element> = ReactTypes.DragEvent<Target>;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributivePointerEvent<Target = Element> = Target extends unknown
  ? ReactTypes.PointerEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveFocusEvent<
  Target = Element,
  RelatedTarget = Element
> = Target extends unknown
  ? ReactTypes.FocusEvent<Target, RelatedTarget>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveFormEvent<Target = Element> = Target extends unknown
  ? ReactTypes.FormEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveInvalidEvent<Target = Element> = Target extends unknown
  ? ReactTypes.InvalidEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveChangeEvent<Target = Element> = Target extends unknown
  ? ReactTypes.ChangeEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveKeyboardEvent<Target = Element> = Target extends unknown
  ? ReactTypes.KeyboardEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveMouseEvent<
  Target = Element,
  E = MouseEvent
> = Target extends unknown ? ReactTypes.MouseEvent<Target, E> : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveTouchEvent<Target = Element> = Target extends unknown
  ? ReactTypes.TouchEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveUIEvent<Target = Element, E = UIEvent> = Target extends unknown
  ? ReactTypes.UIEvent<Target, E>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveWheelEvent<Target = Element> = Target extends unknown
  ? ReactTypes.WheelEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveAnimationEvent<Target = Element> = Target extends unknown
  ? ReactTypes.AnimationEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveTransitionEvent<Target = Element> = Target extends unknown
  ? ReactTypes.TransitionEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveReactEventHandler<Target = Element> = ReactTypes.EventHandler<
  DistributiveSyntheticEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveClipboardEventHandler<Target = Element> =
  ReactTypes.EventHandler<DistributiveClipboardEvent<Target>>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveCompositionEventHandler<Target = Element> =
  ReactTypes.EventHandler<DistributiveCompositionEvent<Target>>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveDragEventHandler<Target = Element> = ReactTypes.EventHandler<
  DistributiveDragEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveFocusEventHandler<Target = Element> = ReactTypes.EventHandler<
  DistributiveFocusEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveFormEventHandler<Target = Element> = ReactTypes.EventHandler<
  DistributiveFormEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveChangeEventHandler<Target = Element> = ReactTypes.EventHandler<
  DistributiveChangeEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveKeyboardEventHandler<Target = Element> =
  ReactTypes.EventHandler<DistributiveKeyboardEvent<Target>>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveMouseEventHandler<Target = Element> = ReactTypes.EventHandler<
  DistributiveMouseEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveTouchEventHandler<Target = Element> = ReactTypes.EventHandler<
  DistributiveTouchEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributivePointerEventHandler<Target = Element> =
  ReactTypes.EventHandler<DistributivePointerEvent<Target>>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveUIEventHandler<Target = Element> = ReactTypes.EventHandler<
  DistributiveUIEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveWheelEventHandler<Target = Element> = ReactTypes.EventHandler<
  DistributiveWheelEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveAnimationEventHandler<Target = Element> =
  ReactTypes.EventHandler<DistributiveAnimationEvent<Target>>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveTransitionEventHandler<Target = Element> =
  ReactTypes.EventHandler<DistributiveTransitionEvent<Target>>;

export type {
  DistributiveOmit as Omit,
  DistributivePick as Pick,
  DistributiveSyntheticEvent as SyntheticEvent,
  DistributiveClipboardEvent as ClipboardEvent,
  DistributiveCompositionEvent as CompositionEvent,
  DistributiveDragEvent as DragEvent,
  DistributivePointerEvent as PointerEvent,
  DistributiveFocusEvent as FocusEvent,
  DistributiveFormEvent as FormEvent,
  DistributiveInvalidEvent as InvalidEvent,
  DistributiveChangeEvent as ChangeEvent,
  DistributiveKeyboardEvent as KeyboardEvent,
  DistributiveMouseEvent as MouseEvent,
  DistributiveTouchEvent as TouchEvent,
  DistributiveUIEvent as UIEvent,
  DistributiveWheelEvent as WheelEvent,
  DistributiveAnimationEvent as AnimationEvent,
  DistributiveTransitionEvent as TransitionEvent,
  DistributiveReactEventHandler as ReactEventHandler,
  DistributiveClipboardEventHandler as ClipboardEventHandler,
  DistributiveCompositionEventHandler as CompositionEventHandler,
  DistributiveDragEventHandler as DragEventHandler,
  DistributiveFocusEventHandler as FocusEventHandler,
  DistributiveFormEventHandler as FormEventHandler,
  DistributiveChangeEventHandler as ChangeEventHandler,
  DistributiveKeyboardEventHandler as KeyboardEventHandler,
  DistributiveMouseEventHandler as MouseEventHandler,
  DistributiveTouchEventHandler as TouchEventHandler,
  DistributivePointerEventHandler as PointerEventHandler,
  DistributiveUIEventHandler as UIEventHandler,
  DistributiveWheelEventHandler as WheelEventHandler,
  DistributiveAnimationEventHandler as AnimationEventHandler,
  DistributiveTransitionEventHandler as TransitionEventHandler,
};
