/**
 * @public
 *
 * A function component, equivalent to React.FunctionComponent, but without
 * the extra optional properties, like: `propTypes`, `defaultProps`, etc,.
 */
export interface FunctionComponent<P> {
  (props: P): any;
}

export interface ExoticComponent<P> extends FunctionComponent<P> {
  readonly $$typeof: symbol;
}

export interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
  displayName?: string | undefined;
}

/** @public */
export type FC<P> = FunctionComponent<P>;

/** @public */
export interface DataAttributes {
  // TODO: investigate better alternatives
  // this will produce expressions with unions too complex to be represented
  // [DataAttribute: `data-${string}`]: any;
}

export type {
  JSX,
  ReactNode,
  PropsWithRef,
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
  InvalidEvent,
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
