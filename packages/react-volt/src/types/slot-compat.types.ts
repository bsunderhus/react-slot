import type {
  DangerouslyRender,
  PlugProps as BasePlugProps,
  PlugPropsType,
} from "./plug.types";
import type * as ReactTypes from "./react.types";

/**
 * @public
 */
export type SlotRenderFunction<Props> = (
  Component: React.ElementType<Props>,
  props: Omit<Props, "as">
) => ReactTypes.ReactNode;

/**
 * @public
 */
export type WithoutSlotRenderFunction<Props> =
  /**
   * Props extends unknown is a distributive conditional on unions (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
   */
  Props extends unknown
    ? "children" extends keyof Props
      ? Omit<Props, "children"> & {
          children?: Exclude<Props["children"], Function>;
        }
      : Props
    : never;

/**
 * @public
 */
export type WithSlotRenderFunction<Props> = "children" extends keyof Props
  ? Omit<Props, "children"> & {
      children?: SlotRenderFunction<Props> | Props["children"];
    }
  : Props & {
      children?: SlotRenderFunction<Props>;
    };

/**
 * @public
 */
export type Primary<Props extends BasePlugProps> =
  WithoutSlotRenderFunction<Props>;

/** @public */
export namespace SlotProps {
  /**
   * @public
   *
   * Definitions of the plug props for an intrinsic element.
   * */
  export interface Intrinsics {
    // HTML
    a: Intrinsics.A;
    abbr: Intrinsics.Abbr;
    address: Intrinsics.Address;
    area: Intrinsics.Area;
    article: Intrinsics.Article;
    aside: Intrinsics.Aside;
    audio: Intrinsics.Audio;
    b: Intrinsics.B;
    base: Intrinsics.Base;
    bdi: Intrinsics.Bdi;
    bdo: Intrinsics.Bdo;
    big: Intrinsics.Big;
    blockquote: Intrinsics.Blockquote;
    body: Intrinsics.Body;
    br: Intrinsics.Br;
    button: Intrinsics.Button;
    canvas: Intrinsics.Canvas;
    caption: Intrinsics.Caption;
    center: Intrinsics.Center;
    cite: Intrinsics.Cite;
    code: Intrinsics.Code;
    col: Intrinsics.Col;
    colgroup: Intrinsics.Colgroup;
    data: Intrinsics.Data;
    datalist: Intrinsics.Datalist;
    dd: Intrinsics.Dd;
    del: Intrinsics.Del;
    details: Intrinsics.Details;
    dfn: Intrinsics.Dfn;
    dialog: Intrinsics.Dialog;
    div: Intrinsics.Div;
    dl: Intrinsics.Dl;
    dt: Intrinsics.Dt;
    em: Intrinsics.Em;
    embed: Intrinsics.Embed;
    fieldset: Intrinsics.Fieldset;
    figcaption: Intrinsics.Figcaption;
    figure: Intrinsics.Figure;
    footer: Intrinsics.Footer;
    form: Intrinsics.Form;
    h1: Intrinsics.H1;
    h2: Intrinsics.H2;
    h3: Intrinsics.H3;
    h4: Intrinsics.H4;
    h5: Intrinsics.H5;
    h6: Intrinsics.H6;
    head: Intrinsics.Head;
    header: Intrinsics.Header;
    hgroup: Intrinsics.Hgroup;
    hr: Intrinsics.Hr;
    html: Intrinsics.Html;
    i: Intrinsics.I;
    iframe: Intrinsics.Iframe;
    img: Intrinsics.Img;
    input: Intrinsics.Input;
    ins: Intrinsics.Ins;
    kbd: Intrinsics.Kbd;
    keygen: Intrinsics.Keygen;
    label: Intrinsics.Label;
    legend: Intrinsics.Legend;
    li: Intrinsics.Li;
    link: Intrinsics.Link;
    main: Intrinsics.Main;
    map: Intrinsics.Map;
    mark: Intrinsics.Mark;
    menu: Intrinsics.Menu;
    menuitem: Intrinsics.Menuitem;
    meta: Intrinsics.Meta;
    meter: Intrinsics.Meter;
    nav: Intrinsics.Nav;
    noindex: Intrinsics.Noindex;
    noscript: Intrinsics.Noscript;
    object: Intrinsics.Object;
    ol: Intrinsics.Ol;
    optgroup: Intrinsics.Optgroup;
    option: Intrinsics.Option;
    output: Intrinsics.Output;
    p: Intrinsics.P;
    param: Intrinsics.Param;
    picture: Intrinsics.Picture;
    pre: Intrinsics.Pre;
    progress: Intrinsics.Progress;
    q: Intrinsics.Quote;
    rp: Intrinsics.Rp;
    rt: Intrinsics.Rt;
    ruby: Intrinsics.Ruby;
    s: Intrinsics.S;
    samp: Intrinsics.Samp;
    search: Intrinsics.Search;
    slot: Intrinsics.Slot;
    script: Intrinsics.Script;
    section: Intrinsics.Section;
    select: Intrinsics.Select;
    small: Intrinsics.Small;
    source: Intrinsics.Source;
    span: Intrinsics.Span;
    strong: Intrinsics.Strong;
    style: Intrinsics.Style;
    sub: Intrinsics.Sub;
    summary: Intrinsics.Summary;
    sup: Intrinsics.Sup;
    table: Intrinsics.Table;
    template: Intrinsics.Template;
    tbody: Intrinsics.Tbody;
    td: Intrinsics.Td;
    textarea: Intrinsics.Textarea;
    tfoot: Intrinsics.Tfoot;
    th: Intrinsics.Th;
    thead: Intrinsics.Thead;
    time: Intrinsics.Time;
    title: Intrinsics.Title;
    tr: Intrinsics.Tr;
    track: Intrinsics.Track;
    u: Intrinsics.U;
    ul: Intrinsics.Ul;
    var: Intrinsics.Var;
    video: Intrinsics.Video;
    wbr: Intrinsics.Wbr;
    webview: Intrinsics.WebView;

    // SVG
    svg: SVGSlotProps<SVGSVGElement, "svg">;

    animate: SVGSlotProps<SVGElement, "animate">; // TODO: It is, 'TODO' SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
    animateMotion: SVGSlotProps<SVGElement, "animateMotion">;
    animateTransform: SVGSlotProps<SVGElement, "animateTransform">; // TODO: It is, 'TODO' SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
    circle: SVGSlotProps<SVGCircleElement, "circle">;
    clipPath: SVGSlotProps<SVGClipPathElement, "clipPath">;
    defs: SVGSlotProps<SVGDefsElement, "defs">;
    desc: SVGSlotProps<SVGDescElement, "desc">;
    ellipse: SVGSlotProps<SVGEllipseElement, "ellipse">;
    feBlend: SVGSlotProps<SVGFEBlendElement, "feBlend">;
    feColorMatrix: SVGSlotProps<SVGFEColorMatrixElement, "feColorMatrix">;
    feComponentTransfer: SVGSlotProps<
      SVGFEComponentTransferElement,
      "feComponentTransfer"
    >;
    feComposite: SVGSlotProps<SVGFECompositeElement, "feComposite">;
    feConvolveMatrix: SVGSlotProps<
      SVGFEConvolveMatrixElement,
      "feConvolveMatrix"
    >;
    feDiffuseLighting: SVGSlotProps<
      SVGFEDiffuseLightingElement,
      "feDiffuseLighting"
    >;
    feDisplacementMap: SVGSlotProps<
      SVGFEDisplacementMapElement,
      "feDisplacementMap"
    >;
    feDistantLight: SVGSlotProps<SVGFEDistantLightElement, "feDistantLight">;
    feDropShadow: SVGSlotProps<SVGFEDropShadowElement, "feDropShadow">;
    feFlood: SVGSlotProps<SVGFEFloodElement, "feFlood">;
    feFuncA: SVGSlotProps<SVGFEFuncAElement, "feFuncA">;
    feFuncB: SVGSlotProps<SVGFEFuncBElement, "feFuncB">;
    feFuncG: SVGSlotProps<SVGFEFuncGElement, "feFuncG">;
    feFuncR: SVGSlotProps<SVGFEFuncRElement, "feFuncR">;
    feGaussianBlur: SVGSlotProps<SVGFEGaussianBlurElement, "feGaussianBlur">;
    feImage: SVGSlotProps<SVGFEImageElement, "feImage">;
    feMerge: SVGSlotProps<SVGFEMergeElement, "feMerge">;
    feMergeNode: SVGSlotProps<SVGFEMergeNodeElement, "feMergeNode">;
    feMorphology: SVGSlotProps<SVGFEMorphologyElement, "feMorphology">;
    feOffset: SVGSlotProps<SVGFEOffsetElement, "feOffset">;
    fePointLight: SVGSlotProps<SVGFEPointLightElement, "fePointLight">;
    feSpecularLighting: SVGSlotProps<
      SVGFESpecularLightingElement,
      "feSpecularLighting"
    >;
    feSpotLight: SVGSlotProps<SVGFESpotLightElement, "feSpotLight">;
    feTile: SVGSlotProps<SVGFETileElement, "feTile">;
    feTurbulence: SVGSlotProps<SVGFETurbulenceElement, "feTurbulence">;
    filter: SVGSlotProps<SVGFilterElement, "filter">;
    foreignObject: SVGSlotProps<SVGForeignObjectElement, "foreignObject">;
    g: SVGSlotProps<SVGGElement, "g">;
    image: SVGSlotProps<SVGImageElement, "image">;
    line: SVGSlotProps<SVGLineElement, "line">;
    linearGradient: SVGSlotProps<SVGLinearGradientElement, "linearGradient">;
    marker: SVGSlotProps<SVGMarkerElement, "marker">;
    mask: SVGSlotProps<SVGMaskElement, "mask">;
    metadata: SVGSlotProps<SVGMetadataElement, "metadata">;
    mpath: SVGSlotProps<SVGElement, "mpath">;
    path: SVGSlotProps<SVGPathElement, "path">;
    pattern: SVGSlotProps<SVGPatternElement, "pattern">;
    polygon: SVGSlotProps<SVGPolygonElement, "polygon">;
    polyline: SVGSlotProps<SVGPolylineElement, "polyline">;
    radialGradient: SVGSlotProps<SVGRadialGradientElement, "radialGradient">;
    rect: SVGSlotProps<SVGRectElement, "rect">;
    stop: SVGSlotProps<SVGStopElement, "stop">;
    switch: SVGSlotProps<SVGSwitchElement, "switch">;
    symbol: SVGSlotProps<SVGSymbolElement, "symbol">;
    text: SVGSlotProps<SVGTextElement, "text">;
    textPath: SVGSlotProps<SVGTextPathElement, "textPath">;
    tspan: SVGSlotProps<SVGTSpanElement, "tspan">;
    use: SVGSlotProps<SVGUseElement, "use">;
    view: SVGSlotProps<SVGViewElement, "view">;
  }

  /** @public */
  export namespace Intrinsics {
    /** @public */
    export interface A
      extends DetailedIntrinsicSlotProps<
        HTMLAnchorElement,
        ReactTypes.AnchorHTMLAttributes<HTMLAnchorElement>,
        "a"
      > {}
    /** @public */
    export interface Area
      extends DetailedIntrinsicSlotProps<
        HTMLAreaElement,
        Omit<ReactTypes.AreaHTMLAttributes<HTMLAreaElement>, "children">,
        "area"
      > {}
    /** @public */
    export interface Audio
      extends DetailedIntrinsicSlotProps<
        HTMLAudioElement,
        ReactTypes.AudioHTMLAttributes<HTMLAudioElement>,
        "audio"
      > {}
    /** @public */
    export interface Base
      extends DetailedIntrinsicSlotProps<
        HTMLBaseElement,
        ReactTypes.BaseHTMLAttributes<HTMLBaseElement>,
        "base"
      > {}
    /** @public */
    export interface Blockquote
      extends DetailedIntrinsicSlotProps<
        HTMLQuoteElement,
        ReactTypes.BlockquoteHTMLAttributes<HTMLQuoteElement>,
        "blockquote"
      > {}
    /** @public */
    export interface Button
      extends DetailedIntrinsicSlotProps<
        HTMLButtonElement,
        ReactTypes.ButtonHTMLAttributes<HTMLButtonElement>,
        "button"
      > {}
    /** @public */
    export interface Canvas
      extends DetailedIntrinsicSlotProps<
        HTMLCanvasElement,
        ReactTypes.CanvasHTMLAttributes<HTMLCanvasElement>,
        "canvas"
      > {}
    /** @public */
    export interface Col
      extends DetailedIntrinsicSlotProps<
        HTMLTableColElement,
        Omit<ReactTypes.ColHTMLAttributes<HTMLTableColElement>, "children">,
        "col"
      > {}
    /** @public */
    export interface Colgroup
      extends DetailedIntrinsicSlotProps<
        HTMLTableColElement,
        ReactTypes.ColgroupHTMLAttributes<HTMLTableColElement>,
        "colgroup"
      > {}
    /** @public */
    export interface Data
      extends DetailedIntrinsicSlotProps<
        HTMLDataElement,
        ReactTypes.DataHTMLAttributes<HTMLDataElement>,
        "data"
      > {}
    /** @public */
    export interface Del
      extends DetailedIntrinsicSlotProps<
        HTMLModElement,
        ReactTypes.DelHTMLAttributes<HTMLModElement>,
        "del"
      > {}
    /** @public */
    export interface Details
      extends DetailedIntrinsicSlotProps<
        HTMLDetailsElement,
        ReactTypes.DetailsHTMLAttributes<HTMLDetailsElement>,
        "details"
      > {}
    /** @public */
    export interface Dialog
      extends DetailedIntrinsicSlotProps<
        HTMLDialogElement,
        ReactTypes.DialogHTMLAttributes<HTMLDialogElement>,
        "dialog"
      > {}
    /** @public */
    export interface Embed
      extends DetailedIntrinsicSlotProps<
        HTMLEmbedElement,
        Omit<ReactTypes.EmbedHTMLAttributes<HTMLEmbedElement>, "children">,
        "embed"
      > {}
    /** @public */
    export interface Fieldset
      extends DetailedIntrinsicSlotProps<
        HTMLFieldSetElement,
        ReactTypes.FieldsetHTMLAttributes<HTMLFieldSetElement>,
        "fieldset"
      > {}
    /** @public */
    export interface Form
      extends DetailedIntrinsicSlotProps<
        HTMLFormElement,
        ReactTypes.FormHTMLAttributes<HTMLFormElement>,
        "form"
      > {}
    /** @public */
    export interface Html
      extends DetailedIntrinsicSlotProps<
        HTMLHtmlElement,
        ReactTypes.HtmlHTMLAttributes<HTMLHtmlElement>,
        "html"
      > {}
    /** @public */
    export interface Iframe
      extends DetailedIntrinsicSlotProps<
        HTMLIFrameElement,
        ReactTypes.IframeHTMLAttributes<HTMLIFrameElement>,
        "iframe"
      > {}
    /** @public */
    export interface Img
      extends DetailedIntrinsicSlotProps<
        HTMLImageElement,
        Omit<ReactTypes.ImgHTMLAttributes<HTMLImageElement>, "children">,
        "img"
      > {}
    /** @public */
    export interface Input
      extends DetailedIntrinsicSlotProps<
        HTMLInputElement,
        Omit<ReactTypes.InputHTMLAttributes<HTMLInputElement>, "children">,
        "input"
      > {}
    /** @public */
    export interface Ins
      extends DetailedIntrinsicSlotProps<
        HTMLModElement,
        ReactTypes.InsHTMLAttributes<HTMLModElement>,
        "ins"
      > {}
    /** @public */
    export interface Keygen
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.KeygenHTMLAttributes<HTMLElement>,
        "keygen"
      > {}
    /** @public */
    export interface Label
      extends DetailedIntrinsicSlotProps<
        HTMLLabelElement,
        ReactTypes.LabelHTMLAttributes<HTMLLabelElement>,
        "label"
      > {}
    /** @public */
    export interface Li
      extends DetailedIntrinsicSlotProps<
        HTMLLIElement,
        ReactTypes.LiHTMLAttributes<HTMLLIElement>,
        "li"
      > {}
    /** @public */
    export interface Link
      extends DetailedIntrinsicSlotProps<
        HTMLLinkElement,
        Omit<ReactTypes.LinkHTMLAttributes<HTMLLinkElement>, "children" | "as">,
        "link"
      > {}
    /** @public */
    export interface Map
      extends DetailedIntrinsicSlotProps<
        HTMLMapElement,
        ReactTypes.MapHTMLAttributes<HTMLMapElement>,
        "map"
      > {}
    /** @public */
    export interface Menu
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.MenuHTMLAttributes<HTMLElement>,
        "menu"
      > {}
    /** @public */
    export interface Meta
      extends DetailedIntrinsicSlotProps<
        HTMLMetaElement,
        ReactTypes.MetaHTMLAttributes<HTMLMetaElement>,
        "meta"
      > {}
    /** @public */
    export interface Meter
      extends DetailedIntrinsicSlotProps<
        HTMLMeterElement,
        ReactTypes.MeterHTMLAttributes<HTMLMeterElement>,
        "meter"
      > {}
    /** @public */
    export interface Object
      extends DetailedIntrinsicSlotProps<
        HTMLObjectElement,
        ReactTypes.ObjectHTMLAttributes<HTMLObjectElement>,
        "object"
      > {}
    /** @public */
    export interface Ol
      extends DetailedIntrinsicSlotProps<
        HTMLOListElement,
        ReactTypes.OlHTMLAttributes<HTMLOListElement>,
        "ol"
      > {}
    /** @public */
    export interface Optgroup
      extends DetailedIntrinsicSlotProps<
        HTMLOptGroupElement,
        ReactTypes.OptgroupHTMLAttributes<HTMLOptGroupElement>,
        "optgroup"
      > {}
    /** @public */
    export interface Option
      extends DetailedIntrinsicSlotProps<
        HTMLOptionElement,
        ReactTypes.OptionHTMLAttributes<HTMLOptionElement>,
        "option"
      > {}
    /** @public */
    export interface Output
      extends DetailedIntrinsicSlotProps<
        HTMLOutputElement,
        ReactTypes.OutputHTMLAttributes<HTMLOutputElement>,
        "output"
      > {}
    /** @public */
    export interface Param
      extends DetailedIntrinsicSlotProps<
        HTMLParamElement,
        Omit<ReactTypes.ParamHTMLAttributes<HTMLParamElement>, "children">,
        "param"
      > {}
    /** @public */
    export interface Progress
      extends DetailedIntrinsicSlotProps<
        HTMLProgressElement,
        ReactTypes.ProgressHTMLAttributes<HTMLProgressElement>,
        "progress"
      > {}
    /** @public */
    export interface Quote
      extends DetailedIntrinsicSlotProps<
        HTMLQuoteElement,
        ReactTypes.QuoteHTMLAttributes<HTMLQuoteElement>,
        "q"
      > {}
    /** @public */
    export interface Slot
      extends DetailedIntrinsicSlotProps<
        HTMLSlotElement,
        ReactTypes.SlotHTMLAttributes<HTMLSlotElement>,
        "slot"
      > {}
    /** @public */
    export interface Script
      extends DetailedIntrinsicSlotProps<
        HTMLScriptElement,
        ReactTypes.ScriptHTMLAttributes<HTMLScriptElement>,
        "script"
      > {}
    /** @public */
    export interface Select
      extends DetailedIntrinsicSlotProps<
        HTMLSelectElement,
        ReactTypes.SelectHTMLAttributes<HTMLSelectElement>,
        "select"
      > {}
    /** @public */
    export interface Source
      extends DetailedIntrinsicSlotProps<
        HTMLSourceElement,
        Omit<ReactTypes.SourceHTMLAttributes<HTMLSourceElement>, "children">,
        "source"
      > {}
    /** @public */
    export interface Style
      extends DetailedIntrinsicSlotProps<
        HTMLStyleElement,
        ReactTypes.StyleHTMLAttributes<HTMLStyleElement>,
        "style"
      > {}
    /** @public */
    export interface Table
      extends DetailedIntrinsicSlotProps<
        HTMLTableElement,
        ReactTypes.TableHTMLAttributes<HTMLTableElement>,
        "table"
      > {}
    /** @public */
    export interface Td
      extends DetailedIntrinsicSlotProps<
        HTMLTableDataCellElement,
        ReactTypes.TdHTMLAttributes<HTMLTableDataCellElement>,
        "td"
      > {}
    /** @public */
    export interface Textarea
      extends DetailedIntrinsicSlotProps<
        HTMLTextAreaElement,
        ReactTypes.TextareaHTMLAttributes<HTMLTextAreaElement>,
        "textarea"
      > {}
    /** @public */
    export interface Th
      extends DetailedIntrinsicSlotProps<
        HTMLTableHeaderCellElement,
        ReactTypes.ThHTMLAttributes<HTMLTableHeaderCellElement>,
        "th"
      > {}
    /** @public */
    export interface Time
      extends DetailedIntrinsicSlotProps<
        HTMLTimeElement,
        ReactTypes.TimeHTMLAttributes<HTMLTimeElement>,
        "time"
      > {}
    /** @public */
    export interface Track
      extends DetailedIntrinsicSlotProps<
        HTMLTrackElement,
        Omit<ReactTypes.TrackHTMLAttributes<HTMLTrackElement>, "children">,
        "track"
      > {}
    /** @public */
    export interface Video
      extends DetailedIntrinsicSlotProps<
        HTMLVideoElement,
        ReactTypes.VideoHTMLAttributes<HTMLVideoElement>,
        "video"
      > {}
    /** @public */
    export interface WebView
      extends DetailedIntrinsicSlotProps<
        HTMLWebViewElement,
        ReactTypes.WebViewHTMLAttributes<HTMLWebViewElement>,
        "webview"
      > {}

    export interface Abbr
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "abbr"
      > {}
    export interface Address
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "address"
      > {}
    export interface Article
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "article"
      > {}
    export interface Aside
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "aside"
      > {}
    export interface B
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "b"
      > {}
    export interface Bdi
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "bdi"
      > {}
    export interface Bdo
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "bdo"
      > {}
    export interface Big
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "big"
      > {}
    export interface Body
      extends DetailedIntrinsicSlotProps<
        HTMLBodyElement,
        ReactTypes.HTMLAttributes<HTMLBodyElement>,
        "body"
      > {}
    export interface Br
      extends DetailedIntrinsicSlotProps<
        HTMLBRElement,
        ReactTypes.HTMLAttributes<HTMLBRElement>,
        "br"
      > {}
    export interface Caption
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "caption"
      > {}
    export interface Center
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "center"
      > {}
    export interface Cite
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "cite"
      > {}
    export interface Code
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "code"
      > {}
    export interface Datalist
      extends DetailedIntrinsicSlotProps<
        HTMLDataListElement,
        ReactTypes.HTMLAttributes<HTMLDataListElement>,
        "datalist"
      > {}
    export interface Dd
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "dd"
      > {}
    export interface Dfn
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "dfn"
      > {}
    export interface Div
      extends DetailedIntrinsicSlotProps<
        HTMLDivElement,
        ReactTypes.HTMLAttributes<HTMLDivElement>,
        "div"
      > {}
    export interface Dl
      extends DetailedIntrinsicSlotProps<
        HTMLDListElement,
        ReactTypes.HTMLAttributes<HTMLDListElement>,
        "dl"
      > {}
    export interface Dt
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "dt"
      > {}
    export interface Em
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "em"
      > {}
    export interface Figcaption
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "figcaption"
      > {}
    export interface Figure
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "figure"
      > {}
    export interface Footer
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "footer"
      > {}
    export interface H1
      extends DetailedIntrinsicSlotProps<
        HTMLHeadingElement,
        ReactTypes.HTMLAttributes<HTMLHeadingElement>,
        "h1"
      > {}
    export interface H2
      extends DetailedIntrinsicSlotProps<
        HTMLHeadingElement,
        ReactTypes.HTMLAttributes<HTMLHeadingElement>,
        "h2"
      > {}
    export interface H3
      extends DetailedIntrinsicSlotProps<
        HTMLHeadingElement,
        ReactTypes.HTMLAttributes<HTMLHeadingElement>,
        "h3"
      > {}
    export interface H4
      extends DetailedIntrinsicSlotProps<
        HTMLHeadingElement,
        ReactTypes.HTMLAttributes<HTMLHeadingElement>,
        "h4"
      > {}
    export interface H5
      extends DetailedIntrinsicSlotProps<
        HTMLHeadingElement,
        ReactTypes.HTMLAttributes<HTMLHeadingElement>,
        "h5"
      > {}
    export interface H6
      extends DetailedIntrinsicSlotProps<
        HTMLHeadingElement,
        ReactTypes.HTMLAttributes<HTMLHeadingElement>,
        "h6"
      > {}
    export interface Head
      extends DetailedIntrinsicSlotProps<
        HTMLHeadElement,
        ReactTypes.HTMLAttributes<HTMLHeadElement>,
        "head"
      > {}
    export interface Header
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "header"
      > {}
    export interface Hgroup
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "hgroup"
      > {}
    export interface Hr
      extends DetailedIntrinsicSlotProps<
        HTMLHRElement,
        ReactTypes.HTMLAttributes<HTMLHRElement>,
        "hr"
      > {}
    export interface I
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "i"
      > {}
    export interface Kbd
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "kbd"
      > {}
    export interface Legend
      extends DetailedIntrinsicSlotProps<
        HTMLLegendElement,
        ReactTypes.HTMLAttributes<HTMLLegendElement>,
        "legend"
      > {}
    export interface Main
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "main"
      > {}
    export interface Mark
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "mark"
      > {}
    export interface Menuitem
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "menuitem"
      > {}
    export interface Nav
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "nav"
      > {}
    export interface Noindex
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "noindex"
      > {}
    export interface Noscript
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "noscript"
      > {}
    export interface P
      extends DetailedIntrinsicSlotProps<
        HTMLParagraphElement,
        ReactTypes.HTMLAttributes<HTMLParagraphElement>,
        "p"
      > {}
    export interface Picture
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "picture"
      > {}
    export interface Pre
      extends DetailedIntrinsicSlotProps<
        HTMLPreElement,
        ReactTypes.HTMLAttributes<HTMLPreElement>,
        "pre"
      > {}
    export interface Rp
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "rp"
      > {}
    export interface Rt
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "rt"
      > {}
    export interface Ruby
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "ruby"
      > {}
    export interface S
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "s"
      > {}
    export interface Samp
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "samp"
      > {}
    export interface Search
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "search"
      > {}
    export interface Section
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "section"
      > {}
    export interface Small
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "small"
      > {}
    export interface Span
      extends DetailedIntrinsicSlotProps<
        HTMLSpanElement,
        ReactTypes.HTMLAttributes<HTMLSpanElement>,
        "span"
      > {}
    export interface Strong
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "strong"
      > {}
    export interface Sub
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "sub"
      > {}
    export interface Summary
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "summary"
      > {}
    export interface Sup
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "sup"
      > {}
    export interface Template
      extends DetailedIntrinsicSlotProps<
        HTMLTemplateElement,
        ReactTypes.HTMLAttributes<HTMLTemplateElement>,
        "template"
      > {}
    export interface Tbody
      extends DetailedIntrinsicSlotProps<
        HTMLTableSectionElement,
        ReactTypes.HTMLAttributes<HTMLTableSectionElement>,
        "tbody"
      > {}
    export interface Tfoot
      extends DetailedIntrinsicSlotProps<
        HTMLTableSectionElement,
        ReactTypes.HTMLAttributes<HTMLTableSectionElement>,
        "tfoot"
      > {}
    export interface Thead
      extends DetailedIntrinsicSlotProps<
        HTMLTableSectionElement,
        ReactTypes.HTMLAttributes<HTMLTableSectionElement>,
        "thead"
      > {}
    export interface Title
      extends DetailedIntrinsicSlotProps<
        HTMLTitleElement,
        ReactTypes.HTMLAttributes<HTMLTitleElement>,
        "title"
      > {}
    export interface Tr
      extends DetailedIntrinsicSlotProps<
        HTMLTableRowElement,
        ReactTypes.HTMLAttributes<HTMLTableRowElement>,
        "tr"
      > {}
    export interface U
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "u"
      > {}
    export interface Ul
      extends DetailedIntrinsicSlotProps<
        HTMLUListElement,
        ReactTypes.HTMLAttributes<HTMLUListElement>,
        "ul"
      > {}
    export interface Var
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "var"
      > {}
    export interface Wbr
      extends DetailedIntrinsicSlotProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "wbr"
      > {}
  }
}

type DetailedIntrinsicSlotProps<
  Element,
  Attributes,
  Type extends PlugPropsType
> = DangerouslyRender<Type, Attributes & ReactTypes.RefAttributes<Element>> &
  WithSlotRenderFunction<Attributes & ReactTypes.RefAttributes<Element>> &
  ReactTypes.DataAttributes &
  Required<BasePlugProps<Type>>;

interface SVGSlotProps<E, T extends keyof ReactTypes.JSX.IntrinsicElements>
  extends DetailedIntrinsicSlotProps<E, ReactTypes.SVGAttributes<E>, T> {}
