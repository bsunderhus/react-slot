import type * as ReactTypes from "react";
import type { _$isSlot } from "../constants";

export type ShallowExact<T, U extends T> = {
  [Key in keyof U]: Key extends keyof T ? U[Key] : never;
};

export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

/**
 * Removes the 'children' prop from the given Props type.
 */
export type PropsWithoutChildren<P extends object> = P extends {
  children?: any;
}
  ? Omit<P, "children">
  : P;

/**
 * Helper type that converts a union to an intersection.
 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * Helper type that is equivalent to `never`
 * but it's more descriptive.
 */
export type Never<Msg extends string> = Msg & never;

/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type ReactEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.SyntheticEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type ClipboardEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.ClipboardEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type CompositionEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.CompositionEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type DragEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.DragEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type FocusEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.FocusEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type FormEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.FormEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type ChangeEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.ChangeEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type KeyboardEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.KeyboardEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type MouseEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.MouseEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type TouchEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.TouchEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type PointerEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.PointerEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type UIEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.UIEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type WheelEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.WheelEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type AnimationEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.AnimationEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type TransitionEventHandler<T = Element> = ReactTypes.EventHandler<
  T extends any ? ReactTypes.TransitionEvent<T> : never
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

/**
 * @public
 *
 * A function component that is a female contact
 */
export interface FunctionComponentSlot<P> extends FunctionComponent<P> {
  [_$isSlot]?: true;
}

export interface FunctionComponentProng<P> extends FunctionComponent<P> {}

export type ComponentProngAttributes<
  Props,
  Component extends FunctionComponentProng<Props>
> = Props & {
  Component: Component;
};

export type ComponentSlotAttributes<
  Props,
  Component extends FunctionComponentProng<Props>
> = Props & {
  Component?: Component;
};

/**
 * @public
 *
 * Substitutes React's ClassAttributes, it removes LegacyRef
 * and adds plug related props with `as` optional.
 */
export interface IntrinsicSlotAttributes<
  E extends Element,
  Key extends keyof IntrinsicProngs
> extends ReactTypes.RefAttributes<E> {
  as?: Key;
}

/**
 * @public
 *
 * Substitutes React's ClassAttributes, it removes LegacyRef
 * and adds plug related props.
 */
export interface IntrinsicProngAttributes<
  E extends Element,
  Key extends keyof IntrinsicProngs
> extends ReactTypes.RefAttributes<E> {
  as: Key;
}

type DetailedIntrinsicProngProps<
  Attributes extends ReactTypes.HTMLAttributes<Element>,
  Element extends HTMLElement,
  Key extends keyof IntrinsicProngs
> = IntrinsicProngAttributes<Element, Key> & Attributes;

type DetailedIntrinsicSlotProps<
  Attributes extends ReactTypes.HTMLAttributes<Element>,
  Element extends HTMLElement,
  Key extends keyof IntrinsicProngs
> = IntrinsicSlotAttributes<Element, Key> & Attributes;

export interface IntrinsicProngs {
  a: DetailedIntrinsicProngProps<
    ReactTypes.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement,
    "a"
  >;
  abbr: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "abbr"
  >;
  address: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "address"
  >;
  area: PropsWithoutChildren<
    DetailedIntrinsicProngProps<
      ReactTypes.AreaHTMLAttributes<HTMLAreaElement>,
      HTMLAreaElement,
      "area"
    >
  >;
  article: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "article"
  >;
  aside: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "aside"
  >;
  audio: DetailedIntrinsicProngProps<
    ReactTypes.AudioHTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement,
    "audio"
  >;
  b: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "b"
  >;
  bdi: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "bdi"
  >;
  bdo: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "bdo"
  >;
  big: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "big"
  >;
  blockquote: DetailedIntrinsicProngProps<
    ReactTypes.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "blockquote"
  >;
  br: PropsWithoutChildren<
    DetailedIntrinsicProngProps<
      ReactTypes.HTMLAttributes<HTMLBRElement>,
      HTMLBRElement,
      "br"
    >
  >;
  button: DetailedIntrinsicProngProps<
    ReactTypes.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement,
    "button"
  >;
  canvas: DetailedIntrinsicProngProps<
    ReactTypes.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement,
    "canvas"
  >;
  caption: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "caption"
  >;
  center: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "center"
  >;
  cite: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "cite"
  >;
  code: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "code"
  >;
  col: PropsWithoutChildren<
    DetailedIntrinsicProngProps<
      ReactTypes.ColHTMLAttributes<HTMLTableColElement>,
      HTMLTableColElement,
      "col"
    >
  >;
  colgroup: DetailedIntrinsicProngProps<
    ReactTypes.ColgroupHTMLAttributes<HTMLTableColElement>,
    HTMLTableColElement,
    "colgroup"
  >;
  data: DetailedIntrinsicProngProps<
    ReactTypes.DataHTMLAttributes<HTMLDataElement>,
    HTMLDataElement,
    "data"
  >;
  datalist: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLDataListElement>,
    HTMLDataListElement,
    "datalist"
  >;
  dd: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dd"
  >;
  del: DetailedIntrinsicProngProps<
    ReactTypes.DelHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "del"
  >;
  details: DetailedIntrinsicProngProps<
    ReactTypes.DetailsHTMLAttributes<HTMLDetailsElement>,
    HTMLDetailsElement,
    "details"
  >;
  dfn: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dfn"
  >;
  dialog: DetailedIntrinsicProngProps<
    ReactTypes.DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement,
    "dialog"
  >;
  div: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement,
    "div"
  >;
  dl: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLDListElement>,
    HTMLDListElement,
    "dl"
  >;
  dt: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dt"
  >;
  em: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "em"
  >;
  embed: PropsWithoutChildren<
    DetailedIntrinsicProngProps<
      ReactTypes.EmbedHTMLAttributes<HTMLEmbedElement>,
      HTMLEmbedElement,
      "embed"
    >
  >;
  fieldset: DetailedIntrinsicProngProps<
    ReactTypes.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement,
    "fieldset"
  >;
  figcaption: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "figcaption"
  >;
  figure: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "figure"
  >;
  footer: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "footer"
  >;
  form: DetailedIntrinsicProngProps<
    ReactTypes.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement,
    "form"
  >;
  h1: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h1"
  >;
  h2: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h2"
  >;
  h3: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h3"
  >;
  h4: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h4"
  >;
  h5: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h5"
  >;
  h6: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h6"
  >;
  header: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "header"
  >;
  hgroup: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "hgroup"
  >;
  hr: PropsWithoutChildren<
    DetailedIntrinsicProngProps<
      ReactTypes.HTMLAttributes<HTMLHRElement>,
      HTMLHRElement,
      "hr"
    >
  >;
  i: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "i"
  >;
  iframe: DetailedIntrinsicProngProps<
    ReactTypes.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement,
    "iframe"
  >;
  img: PropsWithoutChildren<
    DetailedIntrinsicProngProps<
      ReactTypes.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement,
      "img"
    >
  >;
  input: PropsWithoutChildren<
    DetailedIntrinsicProngProps<
      ReactTypes.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement,
      "input"
    >
  >;
  ins: DetailedIntrinsicProngProps<
    ReactTypes.InsHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "ins"
  >;
  kbd: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "kbd"
  >;
  keygen: DetailedIntrinsicProngProps<
    ReactTypes.KeygenHTMLAttributes<HTMLElement>,
    HTMLElement,
    "keygen"
  >;
  label: DetailedIntrinsicProngProps<
    ReactTypes.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement,
    "label"
  >;
  legend: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLLegendElement>,
    HTMLLegendElement,
    "legend"
  >;
  li: DetailedIntrinsicProngProps<
    ReactTypes.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement,
    "li"
  >;
  main: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "main"
  >;
  map: DetailedIntrinsicProngProps<
    ReactTypes.MapHTMLAttributes<HTMLMapElement>,
    HTMLMapElement,
    "map"
  >;
  mark: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "mark"
  >;
  menu: DetailedIntrinsicProngProps<
    ReactTypes.MenuHTMLAttributes<HTMLElement>,
    HTMLElement,
    "menu"
  >;
  menuitem: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "menuitem"
  >;
  meter: DetailedIntrinsicProngProps<
    ReactTypes.MeterHTMLAttributes<HTMLMeterElement>,
    HTMLMeterElement,
    "meter"
  >;
  nav: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "nav"
  >;
  noindex: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "noindex"
  >;
  object: DetailedIntrinsicProngProps<
    ReactTypes.ObjectHTMLAttributes<HTMLObjectElement>,
    HTMLObjectElement,
    "object"
  >;
  ol: DetailedIntrinsicProngProps<
    ReactTypes.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement,
    "ol"
  >;
  optgroup: DetailedIntrinsicProngProps<
    ReactTypes.OptgroupHTMLAttributes<HTMLOptGroupElement>,
    HTMLOptGroupElement,
    "optgroup"
  >;
  option: DetailedIntrinsicProngProps<
    ReactTypes.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement,
    "option"
  >;
  output: DetailedIntrinsicProngProps<
    ReactTypes.OutputHTMLAttributes<HTMLOutputElement>,
    HTMLOutputElement,
    "output"
  >;
  p: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement,
    "p"
  >;
  param: PropsWithoutChildren<
    DetailedIntrinsicProngProps<
      ReactTypes.ParamHTMLAttributes<HTMLParamElement>,
      HTMLParamElement,
      "param"
    >
  >;
  picture: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "picture"
  >;
  pre: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement,
    "pre"
  >;
  progress: DetailedIntrinsicProngProps<
    ReactTypes.ProgressHTMLAttributes<HTMLProgressElement>,
    HTMLProgressElement,
    "progress"
  >;
  q: DetailedIntrinsicProngProps<
    ReactTypes.QuoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "q"
  >;
  rp: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "rp"
  >;
  rt: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "rt"
  >;
  ruby: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "ruby"
  >;
  s: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "s"
  >;
  samp: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "samp"
  >;
  search: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "search"
  >;
  slot: DetailedIntrinsicProngProps<
    ReactTypes.SlotHTMLAttributes<HTMLSlotElement>,
    HTMLSlotElement,
    "slot"
  >;
  section: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "section"
  >;
  select: DetailedIntrinsicProngProps<
    ReactTypes.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement,
    "select"
  >;
  small: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "small"
  >;
  source: PropsWithoutChildren<
    DetailedIntrinsicProngProps<
      ReactTypes.SourceHTMLAttributes<HTMLSourceElement>,
      HTMLSourceElement,
      "source"
    >
  >;
  span: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement,
    "span"
  >;
  strong: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "strong"
  >;
  sub: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "sub"
  >;
  summary: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "summary"
  >;
  sup: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "sup"
  >;
  table: DetailedIntrinsicProngProps<
    ReactTypes.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement,
    "table"
  >;
  tbody: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tbody"
  >;
  td: DetailedIntrinsicProngProps<
    ReactTypes.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement,
    "td"
  >;
  textarea: DetailedIntrinsicProngProps<
    ReactTypes.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement,
    "textarea"
  >;
  tfoot: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tfoot"
  >;
  th: DetailedIntrinsicProngProps<
    ReactTypes.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement,
    "th"
  >;
  thead: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "thead"
  >;
  time: DetailedIntrinsicProngProps<
    ReactTypes.TimeHTMLAttributes<HTMLTimeElement>,
    HTMLTimeElement,
    "time"
  >;
  tr: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement,
    "tr"
  >;
  track: PropsWithoutChildren<
    DetailedIntrinsicProngProps<
      ReactTypes.TrackHTMLAttributes<HTMLTrackElement>,
      HTMLTrackElement,
      "track"
    >
  >;
  u: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "u"
  >;
  ul: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement,
    "ul"
  >;
  var: DetailedIntrinsicProngProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "var"
  >;
  video: DetailedIntrinsicProngProps<
    ReactTypes.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement,
    "video"
  >;
  wbr: PropsWithoutChildren<
    DetailedIntrinsicProngProps<
      ReactTypes.HTMLAttributes<HTMLElement>,
      HTMLElement,
      "wbr"
    >
  >;
  webview: DetailedIntrinsicProngProps<
    ReactTypes.WebViewHTMLAttributes<HTMLWebViewElement>,
    HTMLWebViewElement,
    "webview"
  >;
}

export interface IntrinsicSlots {
  "a?": DetailedIntrinsicSlotProps<
    ReactTypes.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement,
    "a"
  >;
  "abbr?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "abbr"
  >;
  "address?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "address"
  >;
  "area?": PropsWithoutChildren<
    DetailedIntrinsicSlotProps<
      ReactTypes.AreaHTMLAttributes<HTMLAreaElement>,
      HTMLAreaElement,
      "area"
    >
  >;
  "article?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "article"
  >;
  "aside?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "aside"
  >;
  "audio?": DetailedIntrinsicSlotProps<
    ReactTypes.AudioHTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement,
    "audio"
  >;
  "b?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "b"
  >;
  "bdi?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "bdi"
  >;
  "bdo?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "bdo"
  >;
  "big?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "big"
  >;
  "blockquote?": DetailedIntrinsicSlotProps<
    ReactTypes.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "blockquote"
  >;
  "br?": PropsWithoutChildren<
    DetailedIntrinsicSlotProps<
      ReactTypes.HTMLAttributes<HTMLBRElement>,
      HTMLBRElement,
      "br"
    >
  >;
  "button?": DetailedIntrinsicSlotProps<
    ReactTypes.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement,
    "button"
  >;
  "canvas?": DetailedIntrinsicSlotProps<
    ReactTypes.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement,
    "canvas"
  >;
  "caption?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "caption"
  >;
  "center?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "center"
  >;
  "cite?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "cite"
  >;
  "code?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "code"
  >;
  "col?": PropsWithoutChildren<
    DetailedIntrinsicSlotProps<
      ReactTypes.ColHTMLAttributes<HTMLTableColElement>,
      HTMLTableColElement,
      "col"
    >
  >;
  "colgroup?": DetailedIntrinsicSlotProps<
    ReactTypes.ColgroupHTMLAttributes<HTMLTableColElement>,
    HTMLTableColElement,
    "colgroup"
  >;
  "data?": DetailedIntrinsicSlotProps<
    ReactTypes.DataHTMLAttributes<HTMLDataElement>,
    HTMLDataElement,
    "data"
  >;
  "datalist?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLDataListElement>,
    HTMLDataListElement,
    "datalist"
  >;
  "dd?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dd"
  >;
  "del?": DetailedIntrinsicSlotProps<
    ReactTypes.DelHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "del"
  >;
  "details?": DetailedIntrinsicSlotProps<
    ReactTypes.DetailsHTMLAttributes<HTMLDetailsElement>,
    HTMLDetailsElement,
    "details"
  >;
  "dfn?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dfn"
  >;
  "dialog?": DetailedIntrinsicSlotProps<
    ReactTypes.DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement,
    "dialog"
  >;
  "div?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement,
    "div"
  >;
  "dl?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLDListElement>,
    HTMLDListElement,
    "dl"
  >;
  "dt?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dt"
  >;
  "em?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "em"
  >;
  "embed?": PropsWithoutChildren<
    DetailedIntrinsicSlotProps<
      ReactTypes.EmbedHTMLAttributes<HTMLEmbedElement>,
      HTMLEmbedElement,
      "embed"
    >
  >;
  "fieldset?": DetailedIntrinsicSlotProps<
    ReactTypes.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement,
    "fieldset"
  >;
  "figcaption?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "figcaption"
  >;
  "figure?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "figure"
  >;
  "footer?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "footer"
  >;
  "form?": DetailedIntrinsicSlotProps<
    ReactTypes.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement,
    "form"
  >;
  "h1?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h1"
  >;
  "h2?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h2"
  >;
  "h3?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h3"
  >;
  "h4?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h4"
  >;
  "h5?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h5"
  >;
  "h6?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h6"
  >;
  "header?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "header"
  >;
  "hgroup?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "hgroup"
  >;
  "hr?": PropsWithoutChildren<
    DetailedIntrinsicSlotProps<
      ReactTypes.HTMLAttributes<HTMLHRElement>,
      HTMLHRElement,
      "hr"
    >
  >;
  "i?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "i"
  >;
  "iframe?": DetailedIntrinsicSlotProps<
    ReactTypes.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement,
    "iframe"
  >;
  "img?": PropsWithoutChildren<
    DetailedIntrinsicSlotProps<
      ReactTypes.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement,
      "img"
    >
  >;
  "input?": PropsWithoutChildren<
    DetailedIntrinsicSlotProps<
      ReactTypes.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement,
      "input"
    >
  >;
  "ins?": DetailedIntrinsicSlotProps<
    ReactTypes.InsHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "ins"
  >;
  "kbd?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "kbd"
  >;
  "keygen?": DetailedIntrinsicSlotProps<
    ReactTypes.KeygenHTMLAttributes<HTMLElement>,
    HTMLElement,
    "keygen"
  >;
  "label?": DetailedIntrinsicSlotProps<
    ReactTypes.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement,
    "label"
  >;
  "legend?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLLegendElement>,
    HTMLLegendElement,
    "legend"
  >;
  "li?": DetailedIntrinsicSlotProps<
    ReactTypes.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement,
    "li"
  >;
  "main?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "main"
  >;
  "map?": DetailedIntrinsicSlotProps<
    ReactTypes.MapHTMLAttributes<HTMLMapElement>,
    HTMLMapElement,
    "map"
  >;
  "mark?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "mark"
  >;
  "menu?": DetailedIntrinsicSlotProps<
    ReactTypes.MenuHTMLAttributes<HTMLElement>,
    HTMLElement,
    "menu"
  >;
  "menuitem?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "menuitem"
  >;
  "meter?": DetailedIntrinsicSlotProps<
    ReactTypes.MeterHTMLAttributes<HTMLMeterElement>,
    HTMLMeterElement,
    "meter"
  >;
  "nav?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "nav"
  >;
  "noindex?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "noindex"
  >;
  "object?": DetailedIntrinsicSlotProps<
    ReactTypes.ObjectHTMLAttributes<HTMLObjectElement>,
    HTMLObjectElement,
    "object"
  >;
  "ol?": DetailedIntrinsicSlotProps<
    ReactTypes.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement,
    "ol"
  >;
  "optgroup?": DetailedIntrinsicSlotProps<
    ReactTypes.OptgroupHTMLAttributes<HTMLOptGroupElement>,
    HTMLOptGroupElement,
    "optgroup"
  >;
  "option?": DetailedIntrinsicSlotProps<
    ReactTypes.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement,
    "option"
  >;
  "output?": DetailedIntrinsicSlotProps<
    ReactTypes.OutputHTMLAttributes<HTMLOutputElement>,
    HTMLOutputElement,
    "output"
  >;
  "p?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement,
    "p"
  >;
  "param?": PropsWithoutChildren<
    DetailedIntrinsicSlotProps<
      ReactTypes.ParamHTMLAttributes<HTMLParamElement>,
      HTMLParamElement,
      "param"
    >
  >;
  "picture?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "picture"
  >;
  "pre?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement,
    "pre"
  >;
  "progress?": DetailedIntrinsicSlotProps<
    ReactTypes.ProgressHTMLAttributes<HTMLProgressElement>,
    HTMLProgressElement,
    "progress"
  >;
  "q?": DetailedIntrinsicSlotProps<
    ReactTypes.QuoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "q"
  >;
  "rp?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "rp"
  >;
  "rt?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "rt"
  >;
  "ruby?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "ruby"
  >;
  "s?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "s"
  >;
  "samp?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "samp"
  >;
  "search?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "search"
  >;
  "slot?": DetailedIntrinsicSlotProps<
    ReactTypes.SlotHTMLAttributes<HTMLSlotElement>,
    HTMLSlotElement,
    "slot"
  >;
  "section?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "section"
  >;
  "select?": DetailedIntrinsicSlotProps<
    ReactTypes.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement,
    "select"
  >;
  "small?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "small"
  >;
  "source?": PropsWithoutChildren<
    DetailedIntrinsicSlotProps<
      ReactTypes.SourceHTMLAttributes<HTMLSourceElement>,
      HTMLSourceElement,
      "source"
    >
  >;
  "span?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement,
    "span"
  >;
  "strong?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "strong"
  >;
  "sub?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "sub"
  >;
  "summary?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "summary"
  >;
  "sup?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "sup"
  >;
  "table?": DetailedIntrinsicSlotProps<
    ReactTypes.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement,
    "table"
  >;
  "tbody?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tbody"
  >;
  "td?": DetailedIntrinsicSlotProps<
    ReactTypes.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement,
    "td"
  >;
  "textarea?": DetailedIntrinsicSlotProps<
    ReactTypes.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement,
    "textarea"
  >;
  "tfoot?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tfoot"
  >;
  "th?": DetailedIntrinsicSlotProps<
    ReactTypes.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement,
    "th"
  >;
  "thead?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "thead"
  >;
  "time?": DetailedIntrinsicSlotProps<
    ReactTypes.TimeHTMLAttributes<HTMLTimeElement>,
    HTMLTimeElement,
    "time"
  >;
  "tr?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement,
    "tr"
  >;
  "track?": PropsWithoutChildren<
    DetailedIntrinsicSlotProps<
      ReactTypes.TrackHTMLAttributes<HTMLTrackElement>,
      HTMLTrackElement,
      "track"
    >
  >;
  "u?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "u"
  >;
  "ul?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement,
    "ul"
  >;
  "var?": DetailedIntrinsicSlotProps<
    ReactTypes.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "var"
  >;
  "video?": DetailedIntrinsicSlotProps<
    ReactTypes.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement,
    "video"
  >;
  "wbr?": PropsWithoutChildren<
    DetailedIntrinsicSlotProps<
      ReactTypes.HTMLAttributes<HTMLElement>,
      HTMLElement,
      "wbr"
    >
  >;
  "webview?": DetailedIntrinsicSlotProps<
    ReactTypes.WebViewHTMLAttributes<HTMLWebViewElement>,
    HTMLWebViewElement,
    "webview"
  >;
}
