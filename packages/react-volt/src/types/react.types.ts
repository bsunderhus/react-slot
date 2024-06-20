/**
 * @public
 *
 * A function component, equivalent to React.FunctionComponent, but without
 * the extra optional properties, like: `propTypes`, `defaultProps`, etc,.
 */
export interface FunctionComponent<P> {
  (props: P): ReactNode;
}

/** @public */
export type FC<P> = FunctionComponent<P>;

/** @public */
export interface HTMLDataAttributes {
  [DataAttribute: `data-${string}`]: any;
}

export type ReactNode = any;

export type {
  PropsWithRef,
  JSX,
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
