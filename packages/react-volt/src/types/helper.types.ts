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
import type { HTMLPlugAttributes } from "./plug.types";

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

type DetailedHTMLProps<
  Attributes extends HTMLAttributes<Element>,
  Element extends HTMLElement,
  Key extends keyof IntrinsicElements
> = HTMLPlugAttributes<Element, Key> & Attributes;

export interface IntrinsicElements {
  a: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement,
    "a"
  >;
  abbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "abbr">;
  address: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "address"
  >;
  area: PropsWithoutChildren<
    DetailedHTMLProps<
      AreaHTMLAttributes<HTMLAreaElement>,
      HTMLAreaElement,
      "area"
    >
  >;
  article: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "article"
  >;
  aside: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "aside">;
  audio: DetailedHTMLProps<
    AudioHTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement,
    "audio"
  >;
  b: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "b">;
  base: PropsWithoutChildren<
    DetailedHTMLProps<
      BaseHTMLAttributes<HTMLBaseElement>,
      HTMLBaseElement,
      "base"
    >
  >;
  bdi: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "bdi">;
  bdo: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "bdo">;
  big: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "big">;
  blockquote: DetailedHTMLProps<
    BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "blockquote"
  >;
  body: DetailedHTMLProps<
    HTMLAttributes<HTMLBodyElement>,
    HTMLBodyElement,
    "body"
  >;
  br: PropsWithoutChildren<
    DetailedHTMLProps<HTMLAttributes<HTMLBRElement>, HTMLBRElement, "br">
  >;
  button: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement,
    "button"
  >;
  canvas: DetailedHTMLProps<
    CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement,
    "canvas"
  >;
  caption: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "caption"
  >;
  center: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "center">;
  cite: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "cite">;
  code: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "code">;
  col: PropsWithoutChildren<
    DetailedHTMLProps<
      ColHTMLAttributes<HTMLTableColElement>,
      HTMLTableColElement,
      "col"
    >
  >;
  colgroup: DetailedHTMLProps<
    ColgroupHTMLAttributes<HTMLTableColElement>,
    HTMLTableColElement,
    "colgroup"
  >;
  data: DetailedHTMLProps<
    DataHTMLAttributes<HTMLDataElement>,
    HTMLDataElement,
    "data"
  >;
  datalist: DetailedHTMLProps<
    HTMLAttributes<HTMLDataListElement>,
    HTMLDataListElement,
    "datalist"
  >;
  dd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "dd">;
  del: DetailedHTMLProps<
    DelHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "del"
  >;
  details: DetailedHTMLProps<
    DetailsHTMLAttributes<HTMLDetailsElement>,
    HTMLDetailsElement,
    "details"
  >;
  dfn: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "dfn">;
  dialog: DetailedHTMLProps<
    DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement,
    "dialog"
  >;
  div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement, "div">;
  dl: DetailedHTMLProps<
    HTMLAttributes<HTMLDListElement>,
    HTMLDListElement,
    "dl"
  >;
  dt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "dt">;
  em: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "em">;
  embed: PropsWithoutChildren<
    DetailedHTMLProps<
      EmbedHTMLAttributes<HTMLEmbedElement>,
      HTMLEmbedElement,
      "embed"
    >
  >;
  fieldset: DetailedHTMLProps<
    FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement,
    "fieldset"
  >;
  figcaption: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "figcaption"
  >;
  figure: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "figure">;
  footer: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "footer">;
  form: DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement,
    "form"
  >;
  h1: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h1"
  >;
  h2: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h2"
  >;
  h3: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h3"
  >;
  h4: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h4"
  >;
  h5: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h5"
  >;
  h6: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement,
    "h6"
  >;
  head: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadElement>,
    HTMLHeadElement,
    "head"
  >;
  header: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "header">;
  hgroup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "hgroup">;
  hr: PropsWithoutChildren<
    DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement, "hr">
  >;
  html: DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLHtmlElement>,
    HTMLHtmlElement,
    "html"
  >;
  i: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "i">;
  iframe: DetailedHTMLProps<
    IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement,
    "iframe"
  >;
  img: PropsWithoutChildren<
    DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement,
      "img"
    >
  >;
  input: PropsWithoutChildren<
    DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement,
      "input"
    >
  >;
  ins: DetailedHTMLProps<
    InsHTMLAttributes<HTMLModElement>,
    HTMLModElement,
    "ins"
  >;
  kbd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "kbd">;
  keygen: DetailedHTMLProps<
    KeygenHTMLAttributes<HTMLElement>,
    HTMLElement,
    "keygen"
  >;
  label: DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement,
    "label"
  >;
  legend: DetailedHTMLProps<
    HTMLAttributes<HTMLLegendElement>,
    HTMLLegendElement,
    "legend"
  >;
  li: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement, "li">;
  link: PropsWithoutChildren<
    DetailedHTMLProps<
      LinkHTMLAttributes<HTMLLinkElement>,
      HTMLLinkElement,
      "link"
    >
  >;
  main: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "main">;
  map: DetailedHTMLProps<
    MapHTMLAttributes<HTMLMapElement>,
    HTMLMapElement,
    "map"
  >;
  mark: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "mark">;
  menu: DetailedHTMLProps<MenuHTMLAttributes<HTMLElement>, HTMLElement, "menu">;
  menuitem: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "menuitem"
  >;
  meta: PropsWithoutChildren<
    DetailedHTMLProps<
      MetaHTMLAttributes<HTMLMetaElement>,
      HTMLMetaElement,
      "meta"
    >
  >;
  meter: DetailedHTMLProps<
    MeterHTMLAttributes<HTMLMeterElement>,
    HTMLMeterElement,
    "meter"
  >;
  nav: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "nav">;
  noindex: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "noindex"
  >;
  noscript: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "noscript"
  >;
  object: DetailedHTMLProps<
    ObjectHTMLAttributes<HTMLObjectElement>,
    HTMLObjectElement,
    "object"
  >;
  ol: DetailedHTMLProps<
    OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement,
    "ol"
  >;
  optgroup: DetailedHTMLProps<
    OptgroupHTMLAttributes<HTMLOptGroupElement>,
    HTMLOptGroupElement,
    "optgroup"
  >;
  option: DetailedHTMLProps<
    OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement,
    "option"
  >;
  output: DetailedHTMLProps<
    OutputHTMLAttributes<HTMLOutputElement>,
    HTMLOutputElement,
    "output"
  >;
  p: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement,
    "p"
  >;
  param: PropsWithoutChildren<
    DetailedHTMLProps<
      ParamHTMLAttributes<HTMLParamElement>,
      HTMLParamElement,
      "param"
    >
  >;
  picture: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "picture"
  >;
  pre: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement, "pre">;
  progress: DetailedHTMLProps<
    ProgressHTMLAttributes<HTMLProgressElement>,
    HTMLProgressElement,
    "progress"
  >;
  q: DetailedHTMLProps<
    QuoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement,
    "q"
  >;
  rp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "rp">;
  rt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "rt">;
  ruby: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "ruby">;
  s: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "s">;
  samp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "samp">;
  search: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "search">;
  slot: DetailedHTMLProps<
    SlotHTMLAttributes<HTMLSlotElement>,
    HTMLSlotElement,
    "slot"
  >;
  script: DetailedHTMLProps<
    ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement,
    "script"
  >;
  section: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "section"
  >;
  select: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement,
    "select"
  >;
  small: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "small">;
  source: PropsWithoutChildren<
    DetailedHTMLProps<
      SourceHTMLAttributes<HTMLSourceElement>,
      HTMLSourceElement,
      "source"
    >
  >;
  span: DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement,
    "span"
  >;
  strong: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "strong">;
  style: DetailedHTMLProps<
    StyleHTMLAttributes<HTMLStyleElement>,
    HTMLStyleElement,
    "style"
  >;
  sub: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "sub">;
  summary: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement,
    "summary"
  >;
  sup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "sup">;
  table: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement,
    "table"
  >;
  template: DetailedHTMLProps<
    HTMLAttributes<HTMLTemplateElement>,
    HTMLTemplateElement,
    "template"
  >;
  tbody: DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tbody"
  >;
  td: DetailedHTMLProps<
    TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement,
    "td"
  >;
  textarea: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement,
    "textarea"
  >;
  tfoot: DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "tfoot"
  >;
  th: DetailedHTMLProps<
    ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement,
    "th"
  >;
  thead: DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement,
    "thead"
  >;
  time: DetailedHTMLProps<
    TimeHTMLAttributes<HTMLTimeElement>,
    HTMLTimeElement,
    "time"
  >;
  title: DetailedHTMLProps<
    HTMLAttributes<HTMLTitleElement>,
    HTMLTitleElement,
    "title"
  >;
  tr: DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement,
    "tr"
  >;
  track: PropsWithoutChildren<
    DetailedHTMLProps<
      TrackHTMLAttributes<HTMLTrackElement>,
      HTMLTrackElement,
      "track"
    >
  >;
  u: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "u">;
  ul: DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement,
    "ul"
  >;
  var: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "var">;
  video: DetailedHTMLProps<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement,
    "video"
  >;
  wbr: PropsWithoutChildren<
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement, "wbr">
  >;
  webview: DetailedHTMLProps<
    WebViewHTMLAttributes<HTMLWebViewElement>,
    HTMLWebViewElement,
    "webview"
  >;
}

// export interface HTMLElements {
//   a: HTMLAnchorElement;
//   abbr: HTMLElement;
//   address: HTMLElement;
//   area: HTMLAreaElement;
//   article: HTMLElement;
//   aside: HTMLElement;
//   audio: HTMLAudioElement;
//   b: HTMLElement;
//   base: HTMLBaseElement;
//   bdi: HTMLElement;
//   bdo: HTMLElement;
//   big: HTMLElement;
//   blockquote: HTMLQuoteElement;
//   body: HTMLBodyElement;
//   br: HTMLBRElement;
//   button: HTMLButtonElement;
//   canvas: HTMLCanvasElement;
//   caption: HTMLElement;
//   center: HTMLElement;
//   cite: HTMLElement;
//   code: HTMLElement;
//   col: HTMLTableColElement;
//   colgroup: HTMLTableColElement;
//   data: HTMLDataElement;
//   datalist: HTMLDataListElement;
//   dd: HTMLElement;
//   del: HTMLModElement;
//   details: HTMLDetailsElement;
//   dfn: HTMLElement;
//   dialog: HTMLDialogElement;
//   div: HTMLDivElement;
//   dl: HTMLDListElement;
//   dt: HTMLElement;
//   em: HTMLElement;
//   embed: HTMLEmbedElement;
//   fieldset: HTMLFieldSetElement;
//   figcaption: HTMLElement;
//   figure: HTMLElement;
//   footer: HTMLElement;
//   form: HTMLFormElement;
//   h1: HTMLHeadingElement;
//   h2: HTMLHeadingElement;
//   h3: HTMLHeadingElement;
//   h4: HTMLHeadingElement;
//   h5: HTMLHeadingElement;
//   h6: HTMLHeadingElement;
//   head: HTMLHeadElement;
//   header: HTMLElement;
//   hgroup: HTMLElement;
//   hr: HTMLHRElement;
//   html: HTMLHtmlElement;
//   i: HTMLElement;
//   iframe: HTMLIFrameElement;
//   img: HTMLImageElement;
//   input: HTMLInputElement;
//   ins: HTMLModElement;
//   kbd: HTMLElement;
//   keygen: HTMLElement;
//   label: HTMLLabelElement;
//   legend: HTMLLegendElement;
//   li: HTMLLIElement;
//   link: HTMLLinkElement;
//   main: HTMLElement;
//   map: HTMLMapElement;
//   mark: HTMLElement;
//   menu: HTMLMenuElement;
//   menuitem: HTMLElement;
//   meta: HTMLMetaElement;
//   meter: HTMLMeterElement;
//   nav: HTMLElement;
//   noindex: HTMLElement;
//   noscript: HTMLElement;
//   object: HTMLObjectElement;
//   ol: HTMLOListElement;
//   optgroup: HTMLOptGroupElement;
//   option: HTMLOptionElement;
//   output: HTMLOutputElement;
//   p: HTMLParagraphElement;
//   param: HTMLParamElement;
//   picture: HTMLPictureElement;
//   pre: HTMLPreElement;
//   progress: HTMLProgressElement;
//   q: HTMLQuoteElement;
//   rp: HTMLElement;
//   rt: HTMLElement;
//   ruby: HTMLElement;
//   s: HTMLElement;
//   samp: HTMLElement;
//   search: HTMLInputElement;
//   slot: HTMLSlotElement;
//   script: HTMLScriptElement;
//   section: HTMLElement;
//   select: HTMLSelectElement;
//   small: HTMLElement;
//   source: HTMLSourceElement;
//   span: HTMLSpanElement;
//   strong: HTMLElement;
//   style: HTMLStyleElement;
//   sub: HTMLElement;
//   summary: HTMLElement;
//   sup: HTMLElement;
//   table: HTMLTableElement;
//   template: HTMLTemplateElement;
//   tbody: HTMLTableSectionElement;
//   td: HTMLTableDataCellElement;
//   textarea: HTMLTextAreaElement;
//   tfoot: HTMLTableSectionElement;
//   th: HTMLTableHeaderCellElement;
//   thead: HTMLTableSectionElement;
//   time: HTMLTimeElement;
//   title: HTMLTitleElement;
//   tr: HTMLTableRowElement;
//   track: HTMLTrackElement;
//   u: HTMLElement;
//   ul: HTMLUListElement;
//   var: HTMLElement;
//   video: HTMLVideoElement;
//   wbr: HTMLElement;
//   webview: HTMLElement;
// }
