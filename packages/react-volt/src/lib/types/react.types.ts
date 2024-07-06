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

/** @public */
export type FC<P> = FunctionComponent<P>;

export interface ClassComponent<P> {
  new (props: P): any;
}

/** @public */
export interface DataAttributes {
  // TODO: investigate better alternatives
  // this will produce expressions with unions too complex to be represented
  // [DataAttribute: `data-${string}`]: any;
}

export namespace JSX {
  export type ElementType =
    | string
    | FunctionComponent<any>
    | ClassComponent<any>;
  export type Element = React.JSX.Element;
  export type IntrinsicElements = React.JSX.IntrinsicElements;
}

export interface AreaHTMLAttributes<E>
  extends Omit<React.AreaHTMLAttributes<E>, "children"> {}

export interface ColHTMLAttributes<E>
  extends Omit<React.ColHTMLAttributes<E>, "children"> {}

export interface EmbedHTMLAttributes<E>
  extends Omit<React.EmbedHTMLAttributes<E>, "children"> {}

export interface ImgHTMLAttributes<E>
  extends Omit<React.ImgHTMLAttributes<E>, "children"> {}

export interface InputHTMLAttributes<E>
  extends Omit<React.InputHTMLAttributes<E>, "children"> {}

export interface LinkHTMLAttributes<E>
  extends Omit<React.LinkHTMLAttributes<E>, "children"> {}

export interface ParamHTMLAttributes<E>
  extends Omit<React.ParamHTMLAttributes<E>, "children"> {}

export interface SourceHTMLAttributes<E>
  extends Omit<React.SourceHTMLAttributes<E>, "children"> {}

export interface TrackHTMLAttributes<E>
  extends Omit<React.TrackHTMLAttributes<E>, "children"> {}

export type {
  NamedExoticComponent,
  ReactNode,
  PropsWithRef,
  ElementRef,
  ReactElement,
  ReactPortal,
  RefObject,
  RefCallback,
  Ref,
  EventHandler,
  AllHTMLAttributes,
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
  RefAttributes,
  SVGAttributes,
  ChangeEventHandler,
  Key,
} from "react";
