import type {
  Ref,
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
} from "react";

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
 * Override on React's ClassAttributes to stop using LegacyRef and use Ref instead.
 */
interface ClassAttributes<Element> {
  ref?: Ref<Element> | undefined;
}

type DetailedHTMLProps<
  E extends HTMLAttributes<HTMLElements[K]>,
  K extends keyof HTMLElements
> = ClassAttributes<HTMLElements[K]> & E;

export interface HTMLElementsProps {
  a: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, "a">;
  abbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "abbr">;
  address: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "address">;
  area: PropsWithoutChildren<
    DetailedHTMLProps<AreaHTMLAttributes<HTMLAreaElement>, "area">
  >;
  article: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "article">;
  aside: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "aside">;
  audio: DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, "audio">;
  b: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "b">;
  base: PropsWithoutChildren<
    DetailedHTMLProps<BaseHTMLAttributes<HTMLBaseElement>, "base">
  >;
  bdi: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "bdi">;
  bdo: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "bdo">;
  big: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "big">;
  blockquote: DetailedHTMLProps<
    BlockquoteHTMLAttributes<HTMLQuoteElement>,
    "blockquote"
  >;
  body: DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, "body">;
  br: PropsWithoutChildren<
    DetailedHTMLProps<HTMLAttributes<HTMLBRElement>, "br">
  >;
  button: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, "button">;
  canvas: DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, "canvas">;
  caption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "caption">;
  center: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "center">;
  cite: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "cite">;
  code: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "code">;
  col: PropsWithoutChildren<
    DetailedHTMLProps<ColHTMLAttributes<HTMLTableColElement>, "col">
  >;
  colgroup: DetailedHTMLProps<
    ColgroupHTMLAttributes<HTMLTableColElement>,
    "colgroup"
  >;
  data: DetailedHTMLProps<DataHTMLAttributes<HTMLDataElement>, "data">;
  datalist: DetailedHTMLProps<HTMLAttributes<HTMLDataListElement>, "datalist">;
  dd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "dd">;
  del: DetailedHTMLProps<DelHTMLAttributes<HTMLModElement>, "del">;
  details: DetailedHTMLProps<
    DetailsHTMLAttributes<HTMLDetailsElement>,
    "details"
  >;
  dfn: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "dfn">;
  dialog: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, "dialog">;
  div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, "div">;
  dl: DetailedHTMLProps<HTMLAttributes<HTMLDListElement>, "dl">;
  dt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "dt">;
  em: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "em">;
  embed: PropsWithoutChildren<
    DetailedHTMLProps<EmbedHTMLAttributes<HTMLEmbedElement>, "embed">
  >;
  fieldset: DetailedHTMLProps<
    FieldsetHTMLAttributes<HTMLFieldSetElement>,
    "fieldset"
  >;
  figcaption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "figcaption">;
  figure: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "figure">;
  footer: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "footer">;
  form: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, "form">;
  h1: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, "h1">;
  h2: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, "h2">;
  h3: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, "h3">;
  h4: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, "h4">;
  h5: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, "h5">;
  h6: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, "h6">;
  head: DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, "head">;
  header: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "header">;
  hgroup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "hgroup">;
  hr: PropsWithoutChildren<
    DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, "hr">
  >;
  html: DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, "html">;
  i: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "i">;
  iframe: DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, "iframe">;
  img: PropsWithoutChildren<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, "img">
  >;
  input: PropsWithoutChildren<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, "input">
  >;
  ins: DetailedHTMLProps<InsHTMLAttributes<HTMLModElement>, "ins">;
  kbd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "kbd">;
  keygen: DetailedHTMLProps<KeygenHTMLAttributes<HTMLElement>, "keygen">;
  label: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, "label">;
  legend: DetailedHTMLProps<HTMLAttributes<HTMLLegendElement>, "legend">;
  li: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, "li">;
  link: PropsWithoutChildren<
    DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, "link">
  >;
  main: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "main">;
  map: DetailedHTMLProps<MapHTMLAttributes<HTMLMapElement>, "map">;
  mark: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "mark">;
  menu: DetailedHTMLProps<MenuHTMLAttributes<HTMLElement>, "menu">;
  menuitem: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "menuitem">;
  meta: PropsWithoutChildren<
    DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, "meta">
  >;
  meter: DetailedHTMLProps<MeterHTMLAttributes<HTMLMeterElement>, "meter">;
  nav: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "nav">;
  noindex: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "noindex">;
  noscript: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "noscript">;
  object: DetailedHTMLProps<ObjectHTMLAttributes<HTMLObjectElement>, "object">;
  ol: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, "ol">;
  optgroup: DetailedHTMLProps<
    OptgroupHTMLAttributes<HTMLOptGroupElement>,
    "optgroup"
  >;
  option: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, "option">;
  output: DetailedHTMLProps<OutputHTMLAttributes<HTMLOutputElement>, "output">;
  p: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, "p">;
  param: PropsWithoutChildren<
    DetailedHTMLProps<ParamHTMLAttributes<HTMLParamElement>, "param">
  >;
  picture: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "picture">;
  pre: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, "pre">;
  progress: DetailedHTMLProps<
    ProgressHTMLAttributes<HTMLProgressElement>,
    "progress"
  >;
  q: DetailedHTMLProps<QuoteHTMLAttributes<HTMLQuoteElement>, "q">;
  rp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "rp">;
  rt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "rt">;
  ruby: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "ruby">;
  s: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "s">;
  samp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "samp">;
  search: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "search">;
  slot: DetailedHTMLProps<SlotHTMLAttributes<HTMLSlotElement>, "slot">;
  script: DetailedHTMLProps<ScriptHTMLAttributes<HTMLScriptElement>, "script">;
  section: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "section">;
  select: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, "select">;
  small: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "small">;
  source: PropsWithoutChildren<
    DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, "source">
  >;
  span: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, "span">;
  strong: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "strong">;
  style: DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, "style">;
  sub: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "sub">;
  summary: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "summary">;
  sup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "sup">;
  table: DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, "table">;
  template: DetailedHTMLProps<HTMLAttributes<HTMLTemplateElement>, "template">;
  tbody: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, "tbody">;
  td: DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, "td">;
  textarea: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "textarea"
  >;
  tfoot: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, "tfoot">;
  th: DetailedHTMLProps<ThHTMLAttributes<HTMLTableHeaderCellElement>, "th">;
  thead: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, "thead">;
  time: DetailedHTMLProps<TimeHTMLAttributes<HTMLTimeElement>, "time">;
  title: DetailedHTMLProps<HTMLAttributes<HTMLTitleElement>, "title">;
  tr: DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, "tr">;
  track: PropsWithoutChildren<
    DetailedHTMLProps<TrackHTMLAttributes<HTMLTrackElement>, "track">
  >;
  u: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "u">;
  ul: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, "ul">;
  var: DetailedHTMLProps<HTMLAttributes<HTMLElement>, "var">;
  video: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, "video">;
  wbr: PropsWithoutChildren<
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, "wbr">
  >;
  webview: DetailedHTMLProps<
    WebViewHTMLAttributes<HTMLWebViewElement>,
    "webview"
  >;
}

export interface HTMLElements {
  a: HTMLAnchorElement;
  abbr: HTMLElement;
  address: HTMLElement;
  area: HTMLAreaElement;
  article: HTMLElement;
  aside: HTMLElement;
  audio: HTMLAudioElement;
  b: HTMLElement;
  base: HTMLBaseElement;
  bdi: HTMLElement;
  bdo: HTMLElement;
  big: HTMLElement;
  blockquote: HTMLQuoteElement;
  body: HTMLBodyElement;
  br: HTMLBRElement;
  button: HTMLButtonElement;
  canvas: HTMLCanvasElement;
  caption: HTMLElement;
  center: HTMLElement;
  cite: HTMLElement;
  code: HTMLElement;
  col: HTMLTableColElement;
  colgroup: HTMLTableColElement;
  data: HTMLDataElement;
  datalist: HTMLDataListElement;
  dd: HTMLElement;
  del: HTMLModElement;
  details: HTMLDetailsElement;
  dfn: HTMLElement;
  dialog: HTMLDialogElement;
  div: HTMLDivElement;
  dl: HTMLDListElement;
  dt: HTMLElement;
  em: HTMLElement;
  embed: HTMLEmbedElement;
  fieldset: HTMLFieldSetElement;
  figcaption: HTMLElement;
  figure: HTMLElement;
  footer: HTMLElement;
  form: HTMLFormElement;
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;
  head: HTMLHeadElement;
  header: HTMLElement;
  hgroup: HTMLElement;
  hr: HTMLHRElement;
  html: HTMLHtmlElement;
  i: HTMLElement;
  iframe: HTMLIFrameElement;
  img: HTMLImageElement;
  input: HTMLInputElement;
  ins: HTMLModElement;
  kbd: HTMLElement;
  keygen: HTMLElement;
  label: HTMLLabelElement;
  legend: HTMLLegendElement;
  li: HTMLLIElement;
  link: HTMLLinkElement;
  main: HTMLElement;
  map: HTMLMapElement;
  mark: HTMLElement;
  menu: HTMLMenuElement;
  menuitem: HTMLElement;
  meta: HTMLMetaElement;
  meter: HTMLMeterElement;
  nav: HTMLElement;
  noindex: HTMLElement;
  noscript: HTMLElement;
  object: HTMLObjectElement;
  ol: HTMLOListElement;
  optgroup: HTMLOptGroupElement;
  option: HTMLOptionElement;
  output: HTMLOutputElement;
  p: HTMLParagraphElement;
  param: HTMLParamElement;
  picture: HTMLPictureElement;
  pre: HTMLPreElement;
  progress: HTMLProgressElement;
  q: HTMLQuoteElement;
  rp: HTMLElement;
  rt: HTMLElement;
  ruby: HTMLElement;
  s: HTMLElement;
  samp: HTMLElement;
  search: HTMLInputElement;
  slot: HTMLSlotElement;
  script: HTMLScriptElement;
  section: HTMLElement;
  select: HTMLSelectElement;
  small: HTMLElement;
  source: HTMLSourceElement;
  span: HTMLSpanElement;
  strong: HTMLElement;
  style: HTMLStyleElement;
  sub: HTMLElement;
  summary: HTMLElement;
  sup: HTMLElement;
  table: HTMLTableElement;
  template: HTMLTemplateElement;
  tbody: HTMLTableSectionElement;
  td: HTMLTableDataCellElement;
  textarea: HTMLTextAreaElement;
  tfoot: HTMLTableSectionElement;
  th: HTMLTableHeaderCellElement;
  thead: HTMLTableSectionElement;
  time: HTMLTimeElement;
  title: HTMLTitleElement;
  tr: HTMLTableRowElement;
  track: HTMLTrackElement;
  u: HTMLElement;
  ul: HTMLUListElement;
  var: HTMLElement;
  video: HTMLVideoElement;
  wbr: HTMLElement;
  webview: HTMLElement;
}
