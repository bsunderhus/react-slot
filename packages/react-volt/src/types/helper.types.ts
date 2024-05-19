import type {
  AnchorHTMLAttributes,
  AreaHTMLAttributes,
  AudioHTMLAttributes,
  BaseHTMLAttributes,
  BlockquoteHTMLAttributes,
  ButtonHTMLAttributes,
  CanvasHTMLAttributes,
  ColHTMLAttributes,
  ColgroupHTMLAttributes,
  DataHTMLAttributes,
  DelHTMLAttributes,
  DetailsHTMLAttributes,
  DialogHTMLAttributes,
  HTMLAttributes,
  EmbedHTMLAttributes,
  FieldsetHTMLAttributes,
  FormHTMLAttributes,
  HtmlHTMLAttributes,
  IframeHTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  InsHTMLAttributes,
  KeygenHTMLAttributes,
  LabelHTMLAttributes,
  LiHTMLAttributes,
  LinkHTMLAttributes,
  MapHTMLAttributes,
  MenuHTMLAttributes,
  MetaHTMLAttributes,
  MeterHTMLAttributes,
  ObjectHTMLAttributes,
  OlHTMLAttributes,
  OptgroupHTMLAttributes,
  OptionHTMLAttributes,
  OutputHTMLAttributes,
  ParamHTMLAttributes,
  ProgressHTMLAttributes,
  QuoteHTMLAttributes,
  ScriptHTMLAttributes,
  SelectHTMLAttributes,
  SourceHTMLAttributes,
  StyleHTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  TextareaHTMLAttributes,
  ThHTMLAttributes,
  TimeHTMLAttributes,
  TrackHTMLAttributes,
  VideoHTMLAttributes,
  WebViewHTMLAttributes,
  SlotHTMLAttributes,
  SyntheticEvent,
  Ref,
  EventHandler,
  RefObject,
  Attributes,
} from "react";
import type {
  IntrinsicPlugAttributes,
  IntrinsicOptionalPlugAttributes,
  Optional,
  Required,
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
export type Error<Msg extends string> = never;

type DetailedPlugProps<
  Attributes extends HTMLAttributes<Element>,
  Element extends HTMLElement,
  Key extends keyof IntrinsicPlugs
> = IntrinsicPlugAttributes<Element, Key> & Attributes;

type DetailedOptionalPlugProps<
  Attributes extends HTMLAttributes<Element>,
  Element extends HTMLElement,
  Key extends keyof IntrinsicPlugs
> = IntrinsicOptionalPlugAttributes<Element, Key> & Attributes;

export interface IntrinsicPlugs {
  a: DetailedPlugProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement,
    "a"
  >;
  abbr: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "abbr">;
  address: DetailedPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "address"
  >;
  area: PropsWithoutChildren<
    DetailedPlugProps<
      AreaHTMLAttributes<HTMLAreaElement>,
      HTMLAreaElement,
      "area"
    >
  >;
  article: DetailedPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "article"
  >;
  aside: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "aside">;
  audio: DetailedPlugProps<
    AudioHTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement,
    "audio"
  >;
  b: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "b">;
  base: PropsWithoutChildren<
    DetailedPlugProps<
      BaseHTMLAttributes<HTMLBaseElement>,
      HTMLBaseElement,
      "base"
    >
  >;
  bdi: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "bdi">;
  bdo: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "bdo">;
  big: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "big">;
  blockquote: DetailedPlugProps<
    BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "blockquote"
  >;
  body: DetailedPlugProps<
    HTMLAttributes<HTMLBodyElement>,
    HTMLBodyElement,
    "body"
  >;
  br: PropsWithoutChildren<
    DetailedPlugProps<HTMLAttributes<HTMLBRElement>, HTMLBRElement, "br">
  >;
  button: DetailedPlugProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement,
    "button"
  >;
  canvas: DetailedPlugProps<
    CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement,
    "canvas"
  >;
  caption: DetailedPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "caption"
  >;
  center: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "center">;
  cite: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "cite">;
  code: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "code">;
  col: PropsWithoutChildren<
    DetailedPlugProps<
      ColHTMLAttributes<HTMLTableColElement>,
      HTMLTableColElement,
      "col"
    >
  >;
  colgroup: DetailedPlugProps<
    ColgroupHTMLAttributes<HTMLTableColElement>,
    HTMLTableColElement,
    "colgroup"
  >;
  data: DetailedPlugProps<
    DataHTMLAttributes<HTMLDataElement>,
    HTMLDataElement,
    "data"
  >;
  datalist: DetailedPlugProps<
    HTMLAttributes<HTMLDataListElement>,
    HTMLDataListElement,
    "datalist"
  >;
  dd: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "dd">;
  del: DetailedPlugProps<
    DelHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "del"
  >;
  details: DetailedPlugProps<
    DetailsHTMLAttributes<HTMLDetailsElement>,
    HTMLDetailsElement,
    "details"
  >;
  dfn: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "dfn">;
  dialog: DetailedPlugProps<
    DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement,
    "dialog"
  >;
  div: DetailedPlugProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement, "div">;
  dl: DetailedPlugProps<
    HTMLAttributes<HTMLDListElement>,
    HTMLDListElement,
    "dl"
  >;
  dt: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "dt">;
  em: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "em">;
  embed: PropsWithoutChildren<
    DetailedPlugProps<
      EmbedHTMLAttributes<HTMLEmbedElement>,
      HTMLEmbedElement,
      "embed"
    >
  >;
  fieldset: DetailedPlugProps<
    FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement,
    "fieldset"
  >;
  figcaption: DetailedPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "figcaption"
  >;
  figure: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "figure">;
  footer: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "footer">;
  form: DetailedPlugProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement,
    "form"
  >;
  h1: DetailedPlugProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h1"
  >;
  h2: DetailedPlugProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h2"
  >;
  h3: DetailedPlugProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h3"
  >;
  h4: DetailedPlugProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h4"
  >;
  h5: DetailedPlugProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h5"
  >;
  h6: DetailedPlugProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h6"
  >;
  head: DetailedPlugProps<
    HTMLAttributes<HTMLHeadElement>,
    HTMLHeadElement,
    "head"
  >;
  header: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "header">;
  hgroup: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "hgroup">;
  hr: PropsWithoutChildren<
    DetailedPlugProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement, "hr">
  >;
  html: DetailedPlugProps<
    HtmlHTMLAttributes<HTMLHtmlElement>,
    HTMLHtmlElement,
    "html"
  >;
  i: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "i">;
  iframe: DetailedPlugProps<
    IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement,
    "iframe"
  >;
  img: PropsWithoutChildren<
    DetailedPlugProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement,
      "img"
    >
  >;
  input: PropsWithoutChildren<
    DetailedPlugProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement,
      "input"
    >
  >;
  ins: DetailedPlugProps<
    InsHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "ins"
  >;
  kbd: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "kbd">;
  keygen: DetailedPlugProps<
    KeygenHTMLAttributes<HTMLElement>,
    HTMLElement,
    "keygen"
  >;
  label: DetailedPlugProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement,
    "label"
  >;
  legend: DetailedPlugProps<
    HTMLAttributes<HTMLLegendElement>,
    HTMLLegendElement,
    "legend"
  >;
  li: DetailedPlugProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement, "li">;
  link: PropsWithoutChildren<
    DetailedPlugProps<
      LinkHTMLAttributes<HTMLLinkElement>,
      HTMLLinkElement,
      "link"
    >
  >;
  main: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "main">;
  map: DetailedPlugProps<
    MapHTMLAttributes<HTMLMapElement>,
    HTMLMapElement,
    "map"
  >;
  mark: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "mark">;
  menu: DetailedPlugProps<MenuHTMLAttributes<HTMLElement>, HTMLElement, "menu">;
  menuitem: DetailedPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "menuitem"
  >;
  meta: PropsWithoutChildren<
    DetailedPlugProps<
      MetaHTMLAttributes<HTMLMetaElement>,
      HTMLMetaElement,
      "meta"
    >
  >;
  meter: DetailedPlugProps<
    MeterHTMLAttributes<HTMLMeterElement>,
    HTMLMeterElement,
    "meter"
  >;
  nav: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "nav">;
  noindex: DetailedPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "noindex"
  >;
  noscript: DetailedPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "noscript"
  >;
  object: DetailedPlugProps<
    ObjectHTMLAttributes<HTMLObjectElement>,
    HTMLObjectElement,
    "object"
  >;
  ol: DetailedPlugProps<
    OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement,
    "ol"
  >;
  optgroup: DetailedPlugProps<
    OptgroupHTMLAttributes<HTMLOptGroupElement>,
    HTMLOptGroupElement,
    "optgroup"
  >;
  option: DetailedPlugProps<
    OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement,
    "option"
  >;
  output: DetailedPlugProps<
    OutputHTMLAttributes<HTMLOutputElement>,
    HTMLOutputElement,
    "output"
  >;
  p: DetailedPlugProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement,
    "p"
  >;
  param: PropsWithoutChildren<
    DetailedPlugProps<
      ParamHTMLAttributes<HTMLParamElement>,
      HTMLParamElement,
      "param"
    >
  >;
  picture: DetailedPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "picture"
  >;
  pre: DetailedPlugProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement, "pre">;
  progress: DetailedPlugProps<
    ProgressHTMLAttributes<HTMLProgressElement>,
    HTMLProgressElement,
    "progress"
  >;
  q: DetailedPlugProps<
    QuoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "q"
  >;
  rp: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "rp">;
  rt: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "rt">;
  ruby: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "ruby">;
  s: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "s">;
  samp: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "samp">;
  search: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "search">;
  slot: DetailedPlugProps<
    SlotHTMLAttributes<HTMLSlotElement>,
    HTMLSlotElement,
    "slot"
  >;
  script: DetailedPlugProps<
    ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement,
    "script"
  >;
  section: DetailedPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "section"
  >;
  select: DetailedPlugProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement,
    "select"
  >;
  small: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "small">;
  source: PropsWithoutChildren<
    DetailedPlugProps<
      SourceHTMLAttributes<HTMLSourceElement>,
      HTMLSourceElement,
      "source"
    >
  >;
  span: DetailedPlugProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement,
    "span"
  >;
  strong: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "strong">;
  style: DetailedPlugProps<
    StyleHTMLAttributes<HTMLStyleElement>,
    HTMLStyleElement,
    "style"
  >;
  sub: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "sub">;
  summary: DetailedPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "summary"
  >;
  sup: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "sup">;
  table: DetailedPlugProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement,
    "table"
  >;
  template: DetailedPlugProps<
    HTMLAttributes<HTMLTemplateElement>,
    HTMLTemplateElement,
    "template"
  >;
  tbody: DetailedPlugProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tbody"
  >;
  td: DetailedPlugProps<
    TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement,
    "td"
  >;
  textarea: DetailedPlugProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement,
    "textarea"
  >;
  tfoot: DetailedPlugProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tfoot"
  >;
  th: DetailedPlugProps<
    ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement,
    "th"
  >;
  thead: DetailedPlugProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "thead"
  >;
  time: DetailedPlugProps<
    TimeHTMLAttributes<HTMLTimeElement>,
    HTMLTimeElement,
    "time"
  >;
  title: DetailedPlugProps<
    HTMLAttributes<HTMLTitleElement>,
    HTMLTitleElement,
    "title"
  >;
  tr: DetailedPlugProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement,
    "tr"
  >;
  track: PropsWithoutChildren<
    DetailedPlugProps<
      TrackHTMLAttributes<HTMLTrackElement>,
      HTMLTrackElement,
      "track"
    >
  >;
  u: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "u">;
  ul: DetailedPlugProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement,
    "ul"
  >;
  var: DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "var">;
  video: DetailedPlugProps<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement,
    "video"
  >;
  wbr: PropsWithoutChildren<
    DetailedPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "wbr">
  >;
  webview: DetailedPlugProps<
    WebViewHTMLAttributes<HTMLWebViewElement>,
    HTMLWebViewElement,
    "webview"
  >;
}

export interface IntrinsicOptionalPlugs {
  "a?": DetailedOptionalPlugProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement,
    "a"
  >;
  "abbr?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "abbr"
  >;
  "address?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "address"
  >;
  "area?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      AreaHTMLAttributes<HTMLAreaElement>,
      HTMLAreaElement,
      "area"
    >
  >;
  "article?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "article"
  >;
  "aside?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "aside"
  >;
  "audio?": DetailedOptionalPlugProps<
    AudioHTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement,
    "audio"
  >;
  "b?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "b"
  >;
  "base?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      BaseHTMLAttributes<HTMLBaseElement>,
      HTMLBaseElement,
      "base"
    >
  >;
  "bdi?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "bdi"
  >;
  "bdo?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "bdo"
  >;
  "big?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "big"
  >;
  "blockquote?": DetailedOptionalPlugProps<
    BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "blockquote"
  >;
  "body?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLBodyElement>,
    HTMLBodyElement,
    "body"
  >;
  "br?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      HTMLAttributes<HTMLBRElement>,
      HTMLBRElement,
      "br"
    >
  >;
  "button?": DetailedOptionalPlugProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement,
    "button"
  >;
  "canvas?": DetailedOptionalPlugProps<
    CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement,
    "canvas"
  >;
  "caption?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "caption"
  >;
  "center?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "center"
  >;
  "cite?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "cite"
  >;
  "code?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "code"
  >;
  "col?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ColHTMLAttributes<HTMLTableColElement>,
      HTMLTableColElement,
      "col"
    >
  >;
  "colgroup?": DetailedOptionalPlugProps<
    ColgroupHTMLAttributes<HTMLTableColElement>,
    HTMLTableColElement,
    "colgroup"
  >;
  "data?": DetailedOptionalPlugProps<
    DataHTMLAttributes<HTMLDataElement>,
    HTMLDataElement,
    "data"
  >;
  "datalist?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLDataListElement>,
    HTMLDataListElement,
    "datalist"
  >;
  "dd?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dd"
  >;
  "del?": DetailedOptionalPlugProps<
    DelHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "del"
  >;
  "details?": DetailedOptionalPlugProps<
    DetailsHTMLAttributes<HTMLDetailsElement>,
    HTMLDetailsElement,
    "details"
  >;
  "dfn?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dfn"
  >;
  "dialog?": DetailedOptionalPlugProps<
    DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement,
    "dialog"
  >;
  "div?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement,
    "div"
  >;
  "dl?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLDListElement>,
    HTMLDListElement,
    "dl"
  >;
  "dt?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "dt"
  >;
  "em?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "em"
  >;
  "embed?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      EmbedHTMLAttributes<HTMLEmbedElement>,
      HTMLEmbedElement,
      "embed"
    >
  >;
  "fieldset?": DetailedOptionalPlugProps<
    FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement,
    "fieldset"
  >;
  "figcaption?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "figcaption"
  >;
  "figure?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "figure"
  >;
  "footer?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "footer"
  >;
  "form?": DetailedOptionalPlugProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement,
    "form"
  >;
  "h1?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h1"
  >;
  "h2?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h2"
  >;
  "h3?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h3"
  >;
  "h4?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h4"
  >;
  "h5?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h5"
  >;
  "h6?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h6"
  >;
  "head?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLHeadElement>,
    HTMLHeadElement,
    "head"
  >;
  "header?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "header"
  >;
  "hgroup?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "hgroup"
  >;
  "hr?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      HTMLAttributes<HTMLHRElement>,
      HTMLHRElement,
      "hr"
    >
  >;
  "html?": DetailedOptionalPlugProps<
    HtmlHTMLAttributes<HTMLHtmlElement>,
    HTMLHtmlElement,
    "html"
  >;
  "i?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "i"
  >;
  "iframe?": DetailedOptionalPlugProps<
    IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement,
    "iframe"
  >;
  "img?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement,
      "img"
    >
  >;
  "input?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement,
      "input"
    >
  >;
  "ins?": DetailedOptionalPlugProps<
    InsHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "ins"
  >;
  "kbd?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "kbd"
  >;
  "keygen?": DetailedOptionalPlugProps<
    KeygenHTMLAttributes<HTMLElement>,
    HTMLElement,
    "keygen"
  >;
  "label?": DetailedOptionalPlugProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement,
    "label"
  >;
  "legend?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLLegendElement>,
    HTMLLegendElement,
    "legend"
  >;
  "li?": DetailedOptionalPlugProps<
    LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement,
    "li"
  >;
  "link?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      LinkHTMLAttributes<HTMLLinkElement>,
      HTMLLinkElement,
      "link"
    >
  >;
  "main?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "main"
  >;
  "map?": DetailedOptionalPlugProps<
    MapHTMLAttributes<HTMLMapElement>,
    HTMLMapElement,
    "map"
  >;
  "mark?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "mark"
  >;
  "menu?": DetailedOptionalPlugProps<
    MenuHTMLAttributes<HTMLElement>,
    HTMLElement,
    "menu"
  >;
  "menuitem?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "menuitem"
  >;
  "meta?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      MetaHTMLAttributes<HTMLMetaElement>,
      HTMLMetaElement,
      "meta"
    >
  >;
  "meter?": DetailedOptionalPlugProps<
    MeterHTMLAttributes<HTMLMeterElement>,
    HTMLMeterElement,
    "meter"
  >;
  "nav?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "nav"
  >;
  "noindex?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "noindex"
  >;
  "noscript?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "noscript"
  >;
  "object?": DetailedOptionalPlugProps<
    ObjectHTMLAttributes<HTMLObjectElement>,
    HTMLObjectElement,
    "object"
  >;
  "ol?": DetailedOptionalPlugProps<
    OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement,
    "ol"
  >;
  "optgroup?": DetailedOptionalPlugProps<
    OptgroupHTMLAttributes<HTMLOptGroupElement>,
    HTMLOptGroupElement,
    "optgroup"
  >;
  "option?": DetailedOptionalPlugProps<
    OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement,
    "option"
  >;
  "output?": DetailedOptionalPlugProps<
    OutputHTMLAttributes<HTMLOutputElement>,
    HTMLOutputElement,
    "output"
  >;
  "p?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement,
    "p"
  >;
  "param?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      ParamHTMLAttributes<HTMLParamElement>,
      HTMLParamElement,
      "param"
    >
  >;
  "picture?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "picture"
  >;
  "pre?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLPreElement>,
    HTMLPreElement,
    "pre"
  >;
  "progress?": DetailedOptionalPlugProps<
    ProgressHTMLAttributes<HTMLProgressElement>,
    HTMLProgressElement,
    "progress"
  >;
  "q?": DetailedOptionalPlugProps<
    QuoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "q"
  >;
  "rp?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "rp"
  >;
  "rt?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "rt"
  >;
  "ruby?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "ruby"
  >;
  "s?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "s"
  >;
  "samp?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "samp"
  >;
  "search?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "search"
  >;
  "slot?": DetailedOptionalPlugProps<
    SlotHTMLAttributes<HTMLSlotElement>,
    HTMLSlotElement,
    "slot"
  >;
  "script?": DetailedOptionalPlugProps<
    ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement,
    "script"
  >;
  "section?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "section"
  >;
  "select?": DetailedOptionalPlugProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement,
    "select"
  >;
  "small?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "small"
  >;
  "source?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      SourceHTMLAttributes<HTMLSourceElement>,
      HTMLSourceElement,
      "source"
    >
  >;
  "span?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement,
    "span"
  >;
  "strong?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "strong"
  >;
  "style?": DetailedOptionalPlugProps<
    StyleHTMLAttributes<HTMLStyleElement>,
    HTMLStyleElement,
    "style"
  >;
  "sub?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "sub"
  >;
  "summary?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "summary"
  >;
  "sup?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "sup"
  >;
  "table?": DetailedOptionalPlugProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement,
    "table"
  >;
  "template?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLTemplateElement>,
    HTMLTemplateElement,
    "template"
  >;
  "tbody?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tbody"
  >;
  "td?": DetailedOptionalPlugProps<
    TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement,
    "td"
  >;
  "textarea?": DetailedOptionalPlugProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement,
    "textarea"
  >;
  "tfoot?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tfoot"
  >;
  "th?": DetailedOptionalPlugProps<
    ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement,
    "th"
  >;
  "thead?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "thead"
  >;
  "time?": DetailedOptionalPlugProps<
    TimeHTMLAttributes<HTMLTimeElement>,
    HTMLTimeElement,
    "time"
  >;
  "title?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLTitleElement>,
    HTMLTitleElement,
    "title"
  >;
  "tr?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement,
    "tr"
  >;
  "track?": PropsWithoutChildren<
    DetailedOptionalPlugProps<
      TrackHTMLAttributes<HTMLTrackElement>,
      HTMLTrackElement,
      "track"
    >
  >;
  "u?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "u"
  >;
  "ul?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement,
    "ul"
  >;
  "var?": DetailedOptionalPlugProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "var"
  >;
  "video?": DetailedOptionalPlugProps<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement,
    "video"
  >;
  "wbr?": PropsWithoutChildren<
    DetailedOptionalPlugProps<HTMLAttributes<HTMLElement>, HTMLElement, "wbr">
  >;
  "webview?": DetailedOptionalPlugProps<
    WebViewHTMLAttributes<HTMLWebViewElement>,
    HTMLWebViewElement,
    "webview"
  >;
}
