import type * as React from "react";

/**
 * @public
 *
 * Helper type that works similar to Omit,
 * but when modifying an union type it will distribute the omission to all the union members.
 *
 * See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types} for more information
 */
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : T;

/**
 * @public
 *
 * Helper type that works similar to Pick,
 * but when modifying an union type it will distribute the picking to all the union members.
 *
 * See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types} for more information
 */
type DistributivePick<T, K> = T extends any ? Pick<T, K & keyof T> : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveSyntheticEvent<
  Target = Element,
  E = Event
> = Target extends any ? React.SyntheticEvent<Target, E> : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveClipboardEvent<Target = Element> = Target extends any
  ? React.ClipboardEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveCompositionEvent<Target = Element> = Target extends any
  ? React.CompositionEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveDragEvent<Target = Element> = React.DragEvent<Target>;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributivePointerEvent<Target = Element> = Target extends any
  ? React.PointerEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveFocusEvent<
  Target = Element,
  RelatedTarget = Element
> = Target extends any ? React.FocusEvent<Target, RelatedTarget> : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveFormEvent<Target = Element> = Target extends any
  ? React.FormEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveInvalidEvent<Target = Element> = Target extends any
  ? React.InvalidEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveChangeEvent<Target = Element> = Target extends any
  ? React.ChangeEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveKeyboardEvent<Target = Element> = Target extends any
  ? React.KeyboardEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveMouseEvent<
  Target = Element,
  E = MouseEvent
> = Target extends any ? React.MouseEvent<Target, E> : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveTouchEvent<Target = Element> = Target extends any
  ? React.TouchEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveUIEvent<Target = Element, E = UIEvent> = Target extends any
  ? React.UIEvent<Target, E>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveWheelEvent<Target = Element> = Target extends any
  ? React.WheelEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveAnimationEvent<Target = Element> = Target extends any
  ? React.AnimationEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveTransitionEvent<Target = Element> = Target extends any
  ? React.TransitionEvent<Target>
  : never;

/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveReactEventHandler<Target = Element> = React.EventHandler<
  DistributiveSyntheticEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveClipboardEventHandler<Target = Element> = React.EventHandler<
  DistributiveClipboardEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveCompositionEventHandler<Target = Element> = React.EventHandler<
  DistributiveCompositionEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveDragEventHandler<Target = Element> = React.EventHandler<
  DistributiveDragEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveFocusEventHandler<Target = Element> = React.EventHandler<
  DistributiveFocusEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveFormEventHandler<Target = Element> = React.EventHandler<
  DistributiveFormEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveChangeEventHandler<Target = Element> = React.EventHandler<
  DistributiveChangeEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveKeyboardEventHandler<Target = Element> = React.EventHandler<
  DistributiveKeyboardEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveMouseEventHandler<Target = Element> = React.EventHandler<
  DistributiveMouseEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveTouchEventHandler<Target = Element> = React.EventHandler<
  DistributiveTouchEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributivePointerEventHandler<Target = Element> = React.EventHandler<
  DistributivePointerEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveUIEventHandler<Target = Element> = React.EventHandler<
  DistributiveUIEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveWheelEventHandler<Target = Element> = React.EventHandler<
  DistributiveWheelEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveAnimationEventHandler<Target = Element> = React.EventHandler<
  DistributiveAnimationEvent<Target>
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
type DistributiveTransitionEventHandler<Target = Element> = React.EventHandler<
  DistributiveTransitionEvent<Target>
>;

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
