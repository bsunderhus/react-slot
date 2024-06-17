import type React from "react";
import type * as ReactTypes from "react";

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

/**
 * @public
 *
 * A function component, equivalent to React.FunctionComponent, but without
 * the extra optional properties, like: `propTypes`, `defaultProps`, etc,.
 */
export interface FunctionComponent<P> {
  (props: P): ReactTypes.ReactNode;
}

/** @public */
export type FC<P> = FunctionComponent<P>;

/** @public */
export interface HTMLDataAttributes {
  [DataAttribute: `data-${string}`]: any;
}

export type {
  PropsWithRef,
  JSX,
  ReactNode,
  NamedExoticComponent,
  ExoticComponent,
  ElementRef,
  ReactElement,
  ReactPortal,
  RefObject,
  RefCallback,
  Ref,
  SyntheticEvent,
  ClipboardEvent,
  CompositionEvent,
  DragEvent,
  FocusEvent,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  TouchEvent,
  PointerEvent,
  UIEvent,
  WheelEvent,
  AnimationEvent,
  TransitionEvent,
  EventHandler,
  HTMLAttributes,
  AnchorHTMLAttributes,
  AudioHTMLAttributes,
  BaseHTMLAttributes,
  BlockquoteHTMLAttributes,
  ButtonHTMLAttributes,
  CanvasHTMLAttributes,
  ColgroupHTMLAttributes,
  DataHTMLAttributes,
  DelHTMLAttributes,
  DetailsHTMLAttributes,
  DialogHTMLAttributes,
  FieldsetHTMLAttributes,
  FormHTMLAttributes,
  HtmlHTMLAttributes,
  IframeHTMLAttributes,
  InsHTMLAttributes,
  KeygenHTMLAttributes,
  LabelHTMLAttributes,
  LiHTMLAttributes,
  MapHTMLAttributes,
  MenuHTMLAttributes,
  MetaHTMLAttributes,
  MeterHTMLAttributes,
  ObjectHTMLAttributes,
  OlHTMLAttributes,
  OptgroupHTMLAttributes,
  OptionHTMLAttributes,
  OutputHTMLAttributes,
  ProgressHTMLAttributes,
  QuoteHTMLAttributes,
  SlotHTMLAttributes,
  ScriptHTMLAttributes,
  SelectHTMLAttributes,
  StyleHTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  TextareaHTMLAttributes,
  ThHTMLAttributes,
  TimeHTMLAttributes,
  VideoHTMLAttributes,
  WebViewHTMLAttributes,
  AreaHTMLAttributes,
  ColHTMLAttributes,
  EmbedHTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  ParamHTMLAttributes,
  SourceHTMLAttributes,
  TrackHTMLAttributes,
  LinkHTMLAttributes,
  RefAttributes,
  SVGAttributes,
} from "react";
