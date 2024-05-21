import type * as ReactTS from "react";
import type {
  IntrinsicPlugAttributes,
  IntrinsicOptionalPlugAttributes,
} from "./plug.types";

/**
 * Removes the 'children' prop from the given Props type.
 */
export type PropsWithoutChildren<P extends object> = P extends {
  children?: any;
}
  ? DistributiveOmit<P, "children">
  : P;

/**
 * Helper type that works similar to Omit,
 * but when modifying an union type it will distribute the omission to all the union members.
 *
 * See [distributive conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types) for more information
 */
// Traditional Omit is basically equivalent to => Pick<T, Exclude<keyof T, K>>
//
// let's say we have Omit<{ a: string } | { b: string }, 'a'>
// equivalent to: Pick<{ a: string } | { b: string }, Exclude<keyof ({ a: string } | { b: string }), 'a'>>
// The expected result would be {} | { b: string }, the omission of 'a' from all the union members,
// but keyof ({ a: string } | { b: string }) is never as they don't share common keys
// so  Exclude<never, 'a'> is never,
// and Pick<{ a: string } | { b: string }, never> is {}.
//
// With DistributiveOmit on the other hand it becomes like this:
// DistributiveOmit<{ a: string } | { b: string }, 'a'>
// equivalent to: Omit<{ a: string }, 'a'> | Omit<{ b: string }, 'a'>
// Since every single Omit clause in this case is being applied to a single union member there's no conflicts on keyof evaluation and in the second clause Omit<{ b: string }, 'a'> becomes { b: string },
// so the result is {} | { b: string }, as expected.
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : T;

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

type DetailedPlugProps<
  Attributes extends ReactTS.HTMLAttributes<Element>,
  Element extends HTMLElement,
  Key extends keyof IntrinsicPlugs
> = IntrinsicPlugAttributes<Element, Key> & Attributes;

type DetailedOptionalPlugProps<
  Attributes extends ReactTS.HTMLAttributes<Element>,
  Element extends HTMLElement,
  Key extends keyof IntrinsicPlugs
> = IntrinsicOptionalPlugAttributes<Element, Key> & Attributes;

/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type ReactEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.SyntheticEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type ClipboardEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.ClipboardEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type CompositionEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.CompositionEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type DragEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.DragEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type FocusEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.FocusEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type FormEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.FormEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type ChangeEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.ChangeEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type KeyboardEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.KeyboardEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type MouseEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.MouseEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type TouchEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.TouchEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type PointerEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.PointerEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type UIEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.UIEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type WheelEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.WheelEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type AnimationEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.AnimationEvent<T> : never
>;
/**
 * @public
 *
 * > Redefining react's internal event handler method as they do not support distributive conditionals on union types (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
 */
export type TransitionEventHandler<T = Element> = ReactTS.EventHandler<
  T extends any ? ReactTS.TransitionEvent<T> : never
>;

export interface IntrinsicPlugs {
  a: DetailedPlugProps<
    ReactTS.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement,
    "a"
  >;
  abbr: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "abbr"
  >;
  address: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "address"
  >;
  area: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.AreaHTMLAttributes<HTMLAreaElement>,
      HTMLAreaElement,
      "area"
    >
  >;
  article: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "article"
  >;
  aside: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "aside"
  >;
  audio: DetailedPlugProps<
    ReactTS.AudioHTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement,
    "audio"
  >;
  b: DetailedPlugProps<ReactTS.HTMLAttributes<HTMLElement>, HTMLElement, "b">;
  base: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.BaseHTMLAttributes<HTMLBaseElement>,
      HTMLBaseElement,
      "base"
    >
  >;
  bdi: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "bdi"
  >;
  bdo: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "bdo"
  >;
  big: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "big"
  >;
  blockquote: DetailedPlugProps<
    ReactTS.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "blockquote"
  >;
  body: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLBodyElement>,
    HTMLBodyElement,
    "body"
  >;
  br: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.HTMLAttributes<HTMLBRElement>,
      HTMLBRElement,
      "br"
    >
  >;
  button: DetailedPlugProps<
    ReactTS.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement,
    "button"
  >;
  canvas: DetailedPlugProps<
    ReactTS.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement,
    "canvas"
  >;
  caption: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "caption"
  >;
  center: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "center"
  >;
  cite: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "cite"
  >;
  code: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "code"
  >;
  col: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.ColHTMLAttributes<HTMLTableColElement>,
      HTMLTableColElement,
      "col"
    >
  >;
  colgroup: DetailedPlugProps<
    ReactTS.ColgroupHTMLAttributes<HTMLTableColElement>,
    HTMLTableColElement,
    "colgroup"
  >;
  data: DetailedPlugProps<
    ReactTS.DataHTMLAttributes<HTMLDataElement>,
    HTMLDataElement,
    "data"
  >;
  datalist: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLDataListElement>,
    HTMLDataListElement,
    "datalist"
  >;
  dd: DetailedPlugProps<ReactTS.HTMLAttributes<HTMLElement>, HTMLElement, "dd">;
  del: DetailedPlugProps<
    ReactTS.DelHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "del"
  >;
  details: DetailedPlugProps<
    ReactTS.DetailsHTMLAttributes<HTMLDetailsElement>,
    HTMLDetailsElement,
    "details"
  >;
  dfn: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dfn"
  >;
  dialog: DetailedPlugProps<
    ReactTS.DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement,
    "dialog"
  >;
  div: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement,
    "div"
  >;
  dl: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLDListElement>,
    HTMLDListElement,
    "dl"
  >;
  dt: DetailedPlugProps<ReactTS.HTMLAttributes<HTMLElement>, HTMLElement, "dt">;
  em: DetailedPlugProps<ReactTS.HTMLAttributes<HTMLElement>, HTMLElement, "em">;
  embed: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.EmbedHTMLAttributes<HTMLEmbedElement>,
      HTMLEmbedElement,
      "embed"
    >
  >;
  fieldset: DetailedPlugProps<
    ReactTS.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement,
    "fieldset"
  >;
  figcaption: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "figcaption"
  >;
  figure: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "figure"
  >;
  footer: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "footer"
  >;
  form: DetailedPlugProps<
    ReactTS.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement,
    "form"
  >;
  h1: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h1"
  >;
  h2: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h2"
  >;
  h3: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h3"
  >;
  h4: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h4"
  >;
  h5: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h5"
  >;
  h6: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h6"
  >;
  head: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadElement>,
    HTMLHeadElement,
    "head"
  >;
  header: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "header"
  >;
  hgroup: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "hgroup"
  >;
  hr: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.HTMLAttributes<HTMLHRElement>,
      HTMLHRElement,
      "hr"
    >
  >;
  html: DetailedPlugProps<
    ReactTS.HtmlHTMLAttributes<HTMLHtmlElement>,
    HTMLHtmlElement,
    "html"
  >;
  i: DetailedPlugProps<ReactTS.HTMLAttributes<HTMLElement>, HTMLElement, "i">;
  iframe: DetailedPlugProps<
    ReactTS.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement,
    "iframe"
  >;
  img: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement,
      "img"
    >
  >;
  input: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement,
      "input"
    >
  >;
  ins: DetailedPlugProps<
    ReactTS.InsHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "ins"
  >;
  kbd: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "kbd"
  >;
  keygen: DetailedPlugProps<
    ReactTS.KeygenHTMLAttributes<HTMLElement>,
    HTMLElement,
    "keygen"
  >;
  label: DetailedPlugProps<
    ReactTS.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement,
    "label"
  >;
  legend: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLLegendElement>,
    HTMLLegendElement,
    "legend"
  >;
  li: DetailedPlugProps<
    ReactTS.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement,
    "li"
  >;
  link: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.LinkHTMLAttributes<HTMLLinkElement>,
      HTMLLinkElement,
      "link"
    >
  >;
  main: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "main"
  >;
  map: DetailedPlugProps<
    ReactTS.MapHTMLAttributes<HTMLMapElement>,
    HTMLMapElement,
    "map"
  >;
  mark: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "mark"
  >;
  menu: DetailedPlugProps<
    ReactTS.MenuHTMLAttributes<HTMLElement>,
    HTMLElement,
    "menu"
  >;
  menuitem: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "menuitem"
  >;
  meta: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.MetaHTMLAttributes<HTMLMetaElement>,
      HTMLMetaElement,
      "meta"
    >
  >;
  meter: DetailedPlugProps<
    ReactTS.MeterHTMLAttributes<HTMLMeterElement>,
    HTMLMeterElement,
    "meter"
  >;
  nav: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "nav"
  >;
  noindex: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "noindex"
  >;
  noscript: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "noscript"
  >;
  object: DetailedPlugProps<
    ReactTS.ObjectHTMLAttributes<HTMLObjectElement>,
    HTMLObjectElement,
    "object"
  >;
  ol: DetailedPlugProps<
    ReactTS.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement,
    "ol"
  >;
  optgroup: DetailedPlugProps<
    ReactTS.OptgroupHTMLAttributes<HTMLOptGroupElement>,
    HTMLOptGroupElement,
    "optgroup"
  >;
  option: DetailedPlugProps<
    ReactTS.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement,
    "option"
  >;
  output: DetailedPlugProps<
    ReactTS.OutputHTMLAttributes<HTMLOutputElement>,
    HTMLOutputElement,
    "output"
  >;
  p: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement,
    "p"
  >;
  param: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.ParamHTMLAttributes<HTMLParamElement>,
      HTMLParamElement,
      "param"
    >
  >;
  picture: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "picture"
  >;
  pre: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement,
    "pre"
  >;
  progress: DetailedPlugProps<
    ReactTS.ProgressHTMLAttributes<HTMLProgressElement>,
    HTMLProgressElement,
    "progress"
  >;
  q: DetailedPlugProps<
    ReactTS.QuoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "q"
  >;
  rp: DetailedPlugProps<ReactTS.HTMLAttributes<HTMLElement>, HTMLElement, "rp">;
  rt: DetailedPlugProps<ReactTS.HTMLAttributes<HTMLElement>, HTMLElement, "rt">;
  ruby: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "ruby"
  >;
  s: DetailedPlugProps<ReactTS.HTMLAttributes<HTMLElement>, HTMLElement, "s">;
  samp: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "samp"
  >;
  search: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "search"
  >;
  slot: DetailedPlugProps<
    ReactTS.SlotHTMLAttributes<HTMLSlotElement>,
    HTMLSlotElement,
    "slot"
  >;
  script: DetailedPlugProps<
    ReactTS.ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement,
    "script"
  >;
  section: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "section"
  >;
  select: DetailedPlugProps<
    ReactTS.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement,
    "select"
  >;
  small: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "small"
  >;
  source: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.SourceHTMLAttributes<HTMLSourceElement>,
      HTMLSourceElement,
      "source"
    >
  >;
  span: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement,
    "span"
  >;
  strong: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "strong"
  >;
  style: DetailedPlugProps<
    ReactTS.StyleHTMLAttributes<HTMLStyleElement>,
    HTMLStyleElement,
    "style"
  >;
  sub: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "sub"
  >;
  summary: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "summary"
  >;
  sup: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "sup"
  >;
  table: DetailedPlugProps<
    ReactTS.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement,
    "table"
  >;
  template: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLTemplateElement>,
    HTMLTemplateElement,
    "template"
  >;
  tbody: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tbody"
  >;
  td: DetailedPlugProps<
    ReactTS.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement,
    "td"
  >;
  textarea: DetailedPlugProps<
    ReactTS.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement,
    "textarea"
  >;
  tfoot: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tfoot"
  >;
  th: DetailedPlugProps<
    ReactTS.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement,
    "th"
  >;
  thead: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "thead"
  >;
  time: DetailedPlugProps<
    ReactTS.TimeHTMLAttributes<HTMLTimeElement>,
    HTMLTimeElement,
    "time"
  >;
  title: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLTitleElement>,
    HTMLTitleElement,
    "title"
  >;
  tr: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement,
    "tr"
  >;
  track: PropsWithoutChildren<
    DetailedPlugProps<
      ReactTS.TrackHTMLAttributes<HTMLTrackElement>,
      HTMLTrackElement,
      "track"
    >
  >;
  u: DetailedPlugProps<ReactTS.HTMLAttributes<HTMLElement>, HTMLElement, "u">;
  ul: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement,
    "ul"
  >;
  var: DetailedPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "var"
  >;
  video: DetailedPlugProps<
    ReactTS.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement,
    "video"
  >;
  wbr: PropsWithoutChildren<
    DetailedPlugProps<ReactTS.HTMLAttributes<HTMLElement>, HTMLElement, "wbr">
  >;
  webview: DetailedPlugProps<
    ReactTS.WebViewHTMLAttributes<HTMLWebViewElement>,
    HTMLWebViewElement,
    "webview"
  >;
}

export interface IntrinsicOptionalPlugs {
  "a?": DetailedOptionalPlugProps<
    ReactTS.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement,
    "a"
  >;
  "abbr?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "abbr"
  >;
  "address?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "address"
  >;
  "area?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.AreaHTMLAttributes<HTMLAreaElement>,
      HTMLAreaElement,
      "area"
    >
  >;
  "article?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "article"
  >;
  "aside?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "aside"
  >;
  "audio?": DetailedOptionalPlugProps<
    ReactTS.AudioHTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement,
    "audio"
  >;
  "b?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "b"
  >;
  "base?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.BaseHTMLAttributes<HTMLBaseElement>,
      HTMLBaseElement,
      "base"
    >
  >;
  "bdi?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "bdi"
  >;
  "bdo?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "bdo"
  >;
  "big?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "big"
  >;
  "blockquote?": DetailedOptionalPlugProps<
    ReactTS.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "blockquote"
  >;
  "body?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLBodyElement>,
    HTMLBodyElement,
    "body"
  >;
  "br?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.HTMLAttributes<HTMLBRElement>,
      HTMLBRElement,
      "br"
    >
  >;
  "button?": DetailedOptionalPlugProps<
    ReactTS.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement,
    "button"
  >;
  "canvas?": DetailedOptionalPlugProps<
    ReactTS.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement,
    "canvas"
  >;
  "caption?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "caption"
  >;
  "center?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "center"
  >;
  "cite?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "cite"
  >;
  "code?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "code"
  >;
  "col?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.ColHTMLAttributes<HTMLTableColElement>,
      HTMLTableColElement,
      "col"
    >
  >;
  "colgroup?": DetailedOptionalPlugProps<
    ReactTS.ColgroupHTMLAttributes<HTMLTableColElement>,
    HTMLTableColElement,
    "colgroup"
  >;
  "data?": DetailedOptionalPlugProps<
    ReactTS.DataHTMLAttributes<HTMLDataElement>,
    HTMLDataElement,
    "data"
  >;
  "datalist?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLDataListElement>,
    HTMLDataListElement,
    "datalist"
  >;
  "dd?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dd"
  >;
  "del?": DetailedOptionalPlugProps<
    ReactTS.DelHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "del"
  >;
  "details?": DetailedOptionalPlugProps<
    ReactTS.DetailsHTMLAttributes<HTMLDetailsElement>,
    HTMLDetailsElement,
    "details"
  >;
  "dfn?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dfn"
  >;
  "dialog?": DetailedOptionalPlugProps<
    ReactTS.DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement,
    "dialog"
  >;
  "div?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement,
    "div"
  >;
  "dl?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLDListElement>,
    HTMLDListElement,
    "dl"
  >;
  "dt?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dt"
  >;
  "em?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "em"
  >;
  "embed?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.EmbedHTMLAttributes<HTMLEmbedElement>,
      HTMLEmbedElement,
      "embed"
    >
  >;
  "fieldset?": DetailedOptionalPlugProps<
    ReactTS.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement,
    "fieldset"
  >;
  "figcaption?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "figcaption"
  >;
  "figure?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "figure"
  >;
  "footer?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "footer"
  >;
  "form?": DetailedOptionalPlugProps<
    ReactTS.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement,
    "form"
  >;
  "h1?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h1"
  >;
  "h2?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h2"
  >;
  "h3?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h3"
  >;
  "h4?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h4"
  >;
  "h5?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h5"
  >;
  "h6?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h6"
  >;
  "head?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLHeadElement>,
    HTMLHeadElement,
    "head"
  >;
  "header?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "header"
  >;
  "hgroup?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "hgroup"
  >;
  "hr?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.HTMLAttributes<HTMLHRElement>,
      HTMLHRElement,
      "hr"
    >
  >;
  "html?": DetailedOptionalPlugProps<
    ReactTS.HtmlHTMLAttributes<HTMLHtmlElement>,
    HTMLHtmlElement,
    "html"
  >;
  "i?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "i"
  >;
  "iframe?": DetailedOptionalPlugProps<
    ReactTS.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement,
    "iframe"
  >;
  "img?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement,
      "img"
    >
  >;
  "input?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement,
      "input"
    >
  >;
  "ins?": DetailedOptionalPlugProps<
    ReactTS.InsHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "ins"
  >;
  "kbd?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "kbd"
  >;
  "keygen?": DetailedOptionalPlugProps<
    ReactTS.KeygenHTMLAttributes<HTMLElement>,
    HTMLElement,
    "keygen"
  >;
  "label?": DetailedOptionalPlugProps<
    ReactTS.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement,
    "label"
  >;
  "legend?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLLegendElement>,
    HTMLLegendElement,
    "legend"
  >;
  "li?": DetailedOptionalPlugProps<
    ReactTS.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement,
    "li"
  >;
  "link?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.LinkHTMLAttributes<HTMLLinkElement>,
      HTMLLinkElement,
      "link"
    >
  >;
  "main?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "main"
  >;
  "map?": DetailedOptionalPlugProps<
    ReactTS.MapHTMLAttributes<HTMLMapElement>,
    HTMLMapElement,
    "map"
  >;
  "mark?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "mark"
  >;
  "menu?": DetailedOptionalPlugProps<
    ReactTS.MenuHTMLAttributes<HTMLElement>,
    HTMLElement,
    "menu"
  >;
  "menuitem?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "menuitem"
  >;
  "meta?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.MetaHTMLAttributes<HTMLMetaElement>,
      HTMLMetaElement,
      "meta"
    >
  >;
  "meter?": DetailedOptionalPlugProps<
    ReactTS.MeterHTMLAttributes<HTMLMeterElement>,
    HTMLMeterElement,
    "meter"
  >;
  "nav?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "nav"
  >;
  "noindex?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "noindex"
  >;
  "noscript?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "noscript"
  >;
  "object?": DetailedOptionalPlugProps<
    ReactTS.ObjectHTMLAttributes<HTMLObjectElement>,
    HTMLObjectElement,
    "object"
  >;
  "ol?": DetailedOptionalPlugProps<
    ReactTS.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement,
    "ol"
  >;
  "optgroup?": DetailedOptionalPlugProps<
    ReactTS.OptgroupHTMLAttributes<HTMLOptGroupElement>,
    HTMLOptGroupElement,
    "optgroup"
  >;
  "option?": DetailedOptionalPlugProps<
    ReactTS.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement,
    "option"
  >;
  "output?": DetailedOptionalPlugProps<
    ReactTS.OutputHTMLAttributes<HTMLOutputElement>,
    HTMLOutputElement,
    "output"
  >;
  "p?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement,
    "p"
  >;
  "param?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.ParamHTMLAttributes<HTMLParamElement>,
      HTMLParamElement,
      "param"
    >
  >;
  "picture?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "picture"
  >;
  "pre?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement,
    "pre"
  >;
  "progress?": DetailedOptionalPlugProps<
    ReactTS.ProgressHTMLAttributes<HTMLProgressElement>,
    HTMLProgressElement,
    "progress"
  >;
  "q?": DetailedOptionalPlugProps<
    ReactTS.QuoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "q"
  >;
  "rp?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "rp"
  >;
  "rt?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "rt"
  >;
  "ruby?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "ruby"
  >;
  "s?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "s"
  >;
  "samp?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "samp"
  >;
  "search?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "search"
  >;
  "slot?": DetailedOptionalPlugProps<
    ReactTS.SlotHTMLAttributes<HTMLSlotElement>,
    HTMLSlotElement,
    "slot"
  >;
  "script?": DetailedOptionalPlugProps<
    ReactTS.ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement,
    "script"
  >;
  "section?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "section"
  >;
  "select?": DetailedOptionalPlugProps<
    ReactTS.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement,
    "select"
  >;
  "small?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "small"
  >;
  "source?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.SourceHTMLAttributes<HTMLSourceElement>,
      HTMLSourceElement,
      "source"
    >
  >;
  "span?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement,
    "span"
  >;
  "strong?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "strong"
  >;
  "style?": DetailedOptionalPlugProps<
    ReactTS.StyleHTMLAttributes<HTMLStyleElement>,
    HTMLStyleElement,
    "style"
  >;
  "sub?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "sub"
  >;
  "summary?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "summary"
  >;
  "sup?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "sup"
  >;
  "table?": DetailedOptionalPlugProps<
    ReactTS.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement,
    "table"
  >;
  "template?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLTemplateElement>,
    HTMLTemplateElement,
    "template"
  >;
  "tbody?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tbody"
  >;
  "td?": DetailedOptionalPlugProps<
    ReactTS.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement,
    "td"
  >;
  "textarea?": DetailedOptionalPlugProps<
    ReactTS.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement,
    "textarea"
  >;
  "tfoot?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tfoot"
  >;
  "th?": DetailedOptionalPlugProps<
    ReactTS.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement,
    "th"
  >;
  "thead?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "thead"
  >;
  "time?": DetailedOptionalPlugProps<
    ReactTS.TimeHTMLAttributes<HTMLTimeElement>,
    HTMLTimeElement,
    "time"
  >;
  "title?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLTitleElement>,
    HTMLTitleElement,
    "title"
  >;
  "tr?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement,
    "tr"
  >;
  "track?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.TrackHTMLAttributes<HTMLTrackElement>,
      HTMLTrackElement,
      "track"
    >
  >;
  "u?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "u"
  >;
  "ul?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement,
    "ul"
  >;
  "var?": DetailedOptionalPlugProps<
    ReactTS.HTMLAttributes<HTMLElement>,
    HTMLElement,
    "var"
  >;
  "video?": DetailedOptionalPlugProps<
    ReactTS.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement,
    "video"
  >;
  "wbr?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ReactTS.HTMLAttributes<HTMLElement>,
      HTMLElement,
      "wbr"
    >
  >;
  "webview?": DetailedOptionalPlugProps<
    ReactTS.WebViewHTMLAttributes<HTMLWebViewElement>,
    HTMLWebViewElement,
    "webview"
  >;
}
