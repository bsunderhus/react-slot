import type * as ReactTypes from "./react.types";
import type { Never, PickDefault } from "./helper.types";
import type { _$unplugged } from "../constants";
import type * as plug from "../plug";

/**
 * @public
 *
 * A plug will consist of a union of 3 types:
 *
 * 1. {@link PlugProps} - the properties that define a plug.
 * 2. {@link Plug.Shorthand} - the shorthand plug value that can be used to define a plug with only children.
 * 3. {@link Plug.Unplugged} - a special value that can be used to opt-out of an outlet.
 *
 * > **Note:** _in the context of electrical systems, a plug is equivalent to the part of the system that is introduced, while the outlet is the part of the system that receives._
 */
export type Plug<Props extends PlugProps = PlugPropsWithChildren> =
  | Props
  | Plug.Shorthand<Props>
  | Plug.Unplugged;

/** @public */
export namespace Plug {
  /**
   * @public
   *
   * A Shorthand plug is a simplified version of a plug props,
   * it is equivalent to `{children: someValue}`.
   *
   */
  export type Shorthand<Props extends PlugProps = PlugPropsWithChildren> =
    Extract<
      | ReactTypes.ReactElement
      | string
      | number
      | Iterable<ReactTypes.ReactNode>
      | boolean,
      "children" extends keyof Props
        ? PickDefault<Props>["children"]
        : Never<"If Props has no 'children', there should be no plug shorthand, as the plug shorthand is a simplified version of a plug props containing only 'children'.">
    >;

  /**
   * @public
   *
   * An unplugged plug is a plug that is not connected to an outlet.
   * It is equivalent to an abort signal in a promise.
   * If an outlet receives an unplugged plug, it will not render.
   *
   * > **Note:** _in the context of electrical systems unplugged is a term used to describe the connection between a plug and an outlet_
   */
  export type Unplugged = typeof _$unplugged;
}

/**
 * @public
 *
 * A locked in plug is a plug that is connected to an outlet and cannot be removed.
 * This removes the possibility of opting-out of an outlet.
 *
 * > **Note:** _In the context of electrical systems a Lock-in plug is a plug with a lock mechanism to avoid it from being accidentally unplugged._
 */
export type LockedIn<P extends Plug> = Exclude<P, Plug.Unplugged>;

/**
 * @public
 */
export type Default<Props extends PlugProps> = Partial<Props>;

/**
 * @public
 *
 * A plug props is a set of properties that define a plug.
 *
 * > This type itself is the base type from which every other plug props type is derived.
 * > It is used to ensure that the `as` property is present in every plug props type,
 * > this property will  ensure proper discrimination between multiple plug props types.
 * > see {@link https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions | Discriminated Unions} for more information
 *
 * To define a plug props, you can use either:
 * 1. {@link PlugProps.Intrinsics} - a set of properties that define an intrinsic element plug props.
 * 2. {@link PlugProps.FC} - a type that defines a plug props for a function component.
 */
export interface PlugProps<Type extends PlugProps.Type = PlugProps.Type> {
  as?: Type;
}

/**
 * Internal plug props type that includes the children property.
 * This is used to ensure that the children property is present for the purpose of type checking.
 * It is used in two places:
 * 1. In the {@link plug.resolve} function to ensure that the children property is present when a shorthand plug is used.
 * 2. As the default generic type for all the {@link Plug} types to ensure that the children property is present while evaluating the default cases.
 */
export interface PlugPropsWithChildren extends PlugProps {
  children?: unknown;
}

/** @public */
export namespace PlugProps {
  /**
   * @public
   *
   * The type of the plug props (`as` property).
   * It can be a function component or an intrinsic element.
   */
  export type Type =
    | keyof ReactTypes.JSX.IntrinsicElements
    // Due to contravariance on FC signature this has to be any
    | ReactTypes.FunctionComponent<any>;

  /**
   * @public
   *
   * Definition of the plug props for a function component.
   */
  export type FC<Props> = Props & { as: ReactTypes.FC<Props> };

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
    svg: Intrinsics.SVG<SVGSVGElement, "svg">;

    animate: Intrinsics.SVG<SVGElement, "animate">; // TODO: It is, 'TODO' SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
    animateMotion: Intrinsics.SVG<SVGElement, "animateMotion">;
    animateTransform: Intrinsics.SVG<SVGElement, "animateTransform">; // TODO: It is, 'TODO' SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
    circle: Intrinsics.SVG<SVGCircleElement, "circle">;
    clipPath: Intrinsics.SVG<SVGClipPathElement, "clipPath">;
    defs: Intrinsics.SVG<SVGDefsElement, "defs">;
    desc: Intrinsics.SVG<SVGDescElement, "desc">;
    ellipse: Intrinsics.SVG<SVGEllipseElement, "ellipse">;
    feBlend: Intrinsics.SVG<SVGFEBlendElement, "feBlend">;
    feColorMatrix: Intrinsics.SVG<SVGFEColorMatrixElement, "feColorMatrix">;
    feComponentTransfer: Intrinsics.SVG<
      SVGFEComponentTransferElement,
      "feComponentTransfer"
    >;
    feComposite: Intrinsics.SVG<SVGFECompositeElement, "feComposite">;
    feConvolveMatrix: Intrinsics.SVG<
      SVGFEConvolveMatrixElement,
      "feConvolveMatrix"
    >;
    feDiffuseLighting: Intrinsics.SVG<
      SVGFEDiffuseLightingElement,
      "feDiffuseLighting"
    >;
    feDisplacementMap: Intrinsics.SVG<
      SVGFEDisplacementMapElement,
      "feDisplacementMap"
    >;
    feDistantLight: Intrinsics.SVG<SVGFEDistantLightElement, "feDistantLight">;
    feDropShadow: Intrinsics.SVG<SVGFEDropShadowElement, "feDropShadow">;
    feFlood: Intrinsics.SVG<SVGFEFloodElement, "feFlood">;
    feFuncA: Intrinsics.SVG<SVGFEFuncAElement, "feFuncA">;
    feFuncB: Intrinsics.SVG<SVGFEFuncBElement, "feFuncB">;
    feFuncG: Intrinsics.SVG<SVGFEFuncGElement, "feFuncG">;
    feFuncR: Intrinsics.SVG<SVGFEFuncRElement, "feFuncR">;
    feGaussianBlur: Intrinsics.SVG<SVGFEGaussianBlurElement, "feGaussianBlur">;
    feImage: Intrinsics.SVG<SVGFEImageElement, "feImage">;
    feMerge: Intrinsics.SVG<SVGFEMergeElement, "feMerge">;
    feMergeNode: Intrinsics.SVG<SVGFEMergeNodeElement, "feMergeNode">;
    feMorphology: Intrinsics.SVG<SVGFEMorphologyElement, "feMorphology">;
    feOffset: Intrinsics.SVG<SVGFEOffsetElement, "feOffset">;
    fePointLight: Intrinsics.SVG<SVGFEPointLightElement, "fePointLight">;
    feSpecularLighting: Intrinsics.SVG<
      SVGFESpecularLightingElement,
      "feSpecularLighting"
    >;
    feSpotLight: Intrinsics.SVG<SVGFESpotLightElement, "feSpotLight">;
    feTile: Intrinsics.SVG<SVGFETileElement, "feTile">;
    feTurbulence: Intrinsics.SVG<SVGFETurbulenceElement, "feTurbulence">;
    filter: Intrinsics.SVG<SVGFilterElement, "filter">;
    foreignObject: Intrinsics.SVG<SVGForeignObjectElement, "foreignObject">;
    g: Intrinsics.SVG<SVGGElement, "g">;
    image: Intrinsics.SVG<SVGImageElement, "image">;
    line: Intrinsics.SVG<SVGLineElement, "line">;
    linearGradient: Intrinsics.SVG<SVGLinearGradientElement, "linearGradient">;
    marker: Intrinsics.SVG<SVGMarkerElement, "marker">;
    mask: Intrinsics.SVG<SVGMaskElement, "mask">;
    metadata: Intrinsics.SVG<SVGMetadataElement, "metadata">;
    mpath: Intrinsics.SVG<SVGElement, "mpath">;
    path: Intrinsics.SVG<SVGPathElement, "path">;
    pattern: Intrinsics.SVG<SVGPatternElement, "pattern">;
    polygon: Intrinsics.SVG<SVGPolygonElement, "polygon">;
    polyline: Intrinsics.SVG<SVGPolylineElement, "polyline">;
    radialGradient: Intrinsics.SVG<SVGRadialGradientElement, "radialGradient">;
    rect: Intrinsics.SVG<SVGRectElement, "rect">;
    stop: Intrinsics.SVG<SVGStopElement, "stop">;
    switch: Intrinsics.SVG<SVGSwitchElement, "switch">;
    symbol: Intrinsics.SVG<SVGSymbolElement, "symbol">;
    text: Intrinsics.SVG<SVGTextElement, "text">;
    textPath: Intrinsics.SVG<SVGTextPathElement, "textPath">;
    tspan: Intrinsics.SVG<SVGTSpanElement, "tspan">;
    use: Intrinsics.SVG<SVGUseElement, "use">;
    view: Intrinsics.SVG<SVGViewElement, "view">;
  }
  /** @public */
  export namespace Intrinsics {
    /** @public */
    export interface HTML<E, T extends keyof ReactTypes.JSX.IntrinsicElements>
      extends ReactTypes.HTMLAttributes<E>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<E>,
        Required<PlugProps<T>> {}

    /** @public */
    export interface SVG<E, T extends keyof ReactTypes.JSX.IntrinsicElements>
      extends ReactTypes.SVGAttributes<E>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<E>,
        Required<PlugProps<T>> {}

    /** @public */
    export interface A
      extends ReactTypes.AnchorHTMLAttributes<HTMLAnchorElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLAnchorElement>,
        Required<PlugProps<"a">> {}
    /** @public */
    export interface Area
      extends Omit<ReactTypes.AreaHTMLAttributes<HTMLAreaElement>, "children">,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLAreaElement>,
        Required<PlugProps<"area">> {}
    /** @public */
    export interface Audio
      extends ReactTypes.AudioHTMLAttributes<HTMLAudioElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLAudioElement>,
        Required<PlugProps<"audio">> {}
    /** @public */
    export interface Base
      extends ReactTypes.BaseHTMLAttributes<HTMLBaseElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLBaseElement>,
        Required<PlugProps<"base">> {}
    /** @public */
    export interface Blockquote
      extends ReactTypes.BlockquoteHTMLAttributes<HTMLQuoteElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLQuoteElement>,
        Required<PlugProps<"blockquote">> {}
    /** @public */
    export interface Button
      extends ReactTypes.ButtonHTMLAttributes<HTMLButtonElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLButtonElement>,
        Required<PlugProps<"button">> {}
    /** @public */
    export interface Canvas
      extends ReactTypes.CanvasHTMLAttributes<HTMLCanvasElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLCanvasElement>,
        Required<PlugProps<"canvas">> {}
    /** @public */
    export interface Col
      extends Omit<
          ReactTypes.ColHTMLAttributes<HTMLTableColElement>,
          "children"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTableColElement>,
        Required<PlugProps<"col">> {}
    /** @public */
    export interface Colgroup
      extends ReactTypes.ColgroupHTMLAttributes<HTMLTableColElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTableColElement>,
        Required<PlugProps<"colgroup">> {}
    /** @public */
    export interface Data
      extends ReactTypes.DataHTMLAttributes<HTMLDataElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLDataElement>,
        Required<PlugProps<"data">> {}
    /** @public */
    export interface Del
      extends ReactTypes.DelHTMLAttributes<HTMLModElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLModElement>,
        Required<PlugProps<"del">> {}
    /** @public */
    export interface Details
      extends ReactTypes.DetailsHTMLAttributes<HTMLDetailsElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLDetailsElement>,
        Required<PlugProps<"details">> {}
    /** @public */
    export interface Dialog
      extends ReactTypes.DialogHTMLAttributes<HTMLDialogElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLDialogElement>,
        Required<PlugProps<"dialog">> {}
    /** @public */
    export interface Embed
      extends Omit<
          ReactTypes.EmbedHTMLAttributes<HTMLEmbedElement>,
          "children"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLEmbedElement>,
        Required<PlugProps<"embed">> {}
    /** @public */
    export interface Fieldset
      extends ReactTypes.FieldsetHTMLAttributes<HTMLFieldSetElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLFieldSetElement>,
        Required<PlugProps<"fieldset">> {}
    /** @public */
    export interface Form
      extends ReactTypes.FormHTMLAttributes<HTMLFormElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLFormElement>,
        Required<PlugProps<"form">> {}
    /** @public */
    export interface Html
      extends ReactTypes.HtmlHTMLAttributes<HTMLHtmlElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLHtmlElement>,
        Required<PlugProps<"html">> {}
    /** @public */
    export interface Iframe
      extends ReactTypes.IframeHTMLAttributes<HTMLIFrameElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLIFrameElement>,
        Required<PlugProps<"iframe">> {}
    /** @public */
    export interface Img
      extends Omit<ReactTypes.ImgHTMLAttributes<HTMLImageElement>, "children">,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLImageElement>,
        Required<PlugProps<"img">> {}
    /** @public */
    export interface Input
      extends Omit<
          ReactTypes.InputHTMLAttributes<HTMLInputElement>,
          "children"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLInputElement>,
        Required<PlugProps<"input">> {}
    /** @public */
    export interface Ins
      extends ReactTypes.InsHTMLAttributes<HTMLModElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLModElement>,
        Required<PlugProps<"ins">> {}
    /** @public */
    export interface Keygen
      extends ReactTypes.KeygenHTMLAttributes<HTMLElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLElement>,
        Required<PlugProps<"keygen">> {}
    /** @public */
    export interface Label
      extends ReactTypes.LabelHTMLAttributes<HTMLLabelElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLLabelElement>,
        Required<PlugProps<"label">> {}
    /** @public */
    export interface Li
      extends ReactTypes.LiHTMLAttributes<HTMLLIElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLLIElement>,
        Required<PlugProps<"li">> {}
    /** @public */
    export interface Link
      extends Omit<
          ReactTypes.LinkHTMLAttributes<HTMLLinkElement>,
          "children" | "as"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLLinkElement>,
        Required<PlugProps<"link">> {}
    /** @public */
    export interface Map
      extends ReactTypes.MapHTMLAttributes<HTMLMapElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLMapElement>,
        Required<PlugProps<"map">> {}
    /** @public */
    export interface Menu
      extends ReactTypes.MenuHTMLAttributes<HTMLElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLElement>,
        Required<PlugProps<"menu">> {}
    /** @public */
    export interface Meta
      extends ReactTypes.MetaHTMLAttributes<HTMLMetaElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLMetaElement>,
        Required<PlugProps<"meta">> {}
    /** @public */
    export interface Meter
      extends ReactTypes.MeterHTMLAttributes<HTMLMeterElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLMeterElement>,
        Required<PlugProps<"meter">> {}
    /** @public */
    export interface Object
      extends ReactTypes.ObjectHTMLAttributes<HTMLObjectElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLObjectElement>,
        Required<PlugProps<"object">> {}
    /** @public */
    export interface Ol
      extends ReactTypes.OlHTMLAttributes<HTMLOListElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLOListElement>,
        Required<PlugProps<"ol">> {}
    /** @public */
    export interface Optgroup
      extends ReactTypes.OptgroupHTMLAttributes<HTMLOptGroupElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLOptGroupElement>,
        Required<PlugProps<"optgroup">> {}
    /** @public */
    export interface Option
      extends ReactTypes.OptionHTMLAttributes<HTMLOptionElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLOptionElement>,
        Required<PlugProps<"option">> {}
    /** @public */
    export interface Output
      extends ReactTypes.OutputHTMLAttributes<HTMLOutputElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLOutputElement>,
        Required<PlugProps<"output">> {}
    /** @public */
    export interface Param
      extends Omit<
          ReactTypes.ParamHTMLAttributes<HTMLParamElement>,
          "children"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLParamElement>,
        Required<PlugProps<"param">> {}
    /** @public */
    export interface Progress
      extends ReactTypes.ProgressHTMLAttributes<HTMLProgressElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLProgressElement>,
        Required<PlugProps<"progress">> {}
    /** @public */
    export interface Quote
      extends ReactTypes.QuoteHTMLAttributes<HTMLQuoteElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLQuoteElement>,
        Required<PlugProps<"q">> {}
    /** @public */
    export interface Slot
      extends ReactTypes.SlotHTMLAttributes<HTMLSlotElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLSlotElement>,
        Required<PlugProps<"slot">> {}
    /** @public */
    export interface Script
      extends ReactTypes.ScriptHTMLAttributes<HTMLScriptElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLScriptElement>,
        Required<PlugProps<"script">> {}
    /** @public */
    export interface Select
      extends ReactTypes.SelectHTMLAttributes<HTMLSelectElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLSelectElement>,
        Required<PlugProps<"select">> {}
    /** @public */
    export interface Source
      extends Omit<
          ReactTypes.SourceHTMLAttributes<HTMLSourceElement>,
          "children"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLSourceElement>,
        Required<PlugProps<"source">> {}
    /** @public */
    export interface Style
      extends ReactTypes.StyleHTMLAttributes<HTMLStyleElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLStyleElement>,
        Required<PlugProps<"style">> {}
    /** @public */
    export interface Table
      extends ReactTypes.TableHTMLAttributes<HTMLTableElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTableElement>,
        Required<PlugProps<"table">> {}
    /** @public */
    export interface Td
      extends ReactTypes.TdHTMLAttributes<HTMLTableDataCellElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTableDataCellElement>,
        Required<PlugProps<"td">> {}
    /** @public */
    export interface Textarea
      extends ReactTypes.TextareaHTMLAttributes<HTMLTextAreaElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTextAreaElement>,
        Required<PlugProps<"textarea">> {}
    /** @public */
    export interface Th
      extends ReactTypes.ThHTMLAttributes<HTMLTableHeaderCellElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTableHeaderCellElement>,
        Required<PlugProps<"th">> {}
    /** @public */
    export interface Time
      extends ReactTypes.TimeHTMLAttributes<HTMLTimeElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTimeElement>,
        Required<PlugProps<"time">> {}
    /** @public */
    export interface Track
      extends Omit<
          ReactTypes.TrackHTMLAttributes<HTMLTrackElement>,
          "children"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTrackElement>,
        Required<PlugProps<"track">> {}
    /** @public */
    export interface Video
      extends ReactTypes.VideoHTMLAttributes<HTMLVideoElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLVideoElement>,
        Required<PlugProps<"video">> {}
    /** @public */
    export interface WebView
      extends ReactTypes.WebViewHTMLAttributes<HTMLWebViewElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLWebViewElement>,
        Required<PlugProps<"webview">> {}

    export interface Abbr extends HTML<HTMLElement, "abbr"> {}
    export interface Address extends HTML<HTMLElement, "address"> {}
    export interface Article extends HTML<HTMLElement, "article"> {}
    export interface Aside extends HTML<HTMLElement, "aside"> {}
    export interface B extends HTML<HTMLElement, "b"> {}
    export interface Bdi extends HTML<HTMLElement, "bdi"> {}
    export interface Bdo extends HTML<HTMLElement, "bdo"> {}
    export interface Big extends HTML<HTMLElement, "big"> {}
    export interface Body extends HTML<HTMLBodyElement, "body"> {}
    export interface Br extends HTML<HTMLBRElement, "br"> {}
    export interface Caption extends HTML<HTMLElement, "caption"> {}
    export interface Center extends HTML<HTMLElement, "center"> {}
    export interface Cite extends HTML<HTMLElement, "cite"> {}
    export interface Code extends HTML<HTMLElement, "code"> {}
    export interface Datalist extends HTML<HTMLDataListElement, "datalist"> {}
    export interface Dd extends HTML<HTMLElement, "dd"> {}
    export interface Dfn extends HTML<HTMLElement, "dfn"> {}
    export interface Div extends HTML<HTMLDivElement, "div"> {}
    export interface Dl extends HTML<HTMLDListElement, "dl"> {}
    export interface Dt extends HTML<HTMLElement, "dt"> {}
    export interface Em extends HTML<HTMLElement, "em"> {}
    export interface Figcaption extends HTML<HTMLElement, "figcaption"> {}
    export interface Figure extends HTML<HTMLElement, "figure"> {}
    export interface Footer extends HTML<HTMLElement, "footer"> {}
    export interface H1 extends HTML<HTMLHeadingElement, "h1"> {}
    export interface H2 extends HTML<HTMLHeadingElement, "h2"> {}
    export interface H3 extends HTML<HTMLHeadingElement, "h3"> {}
    export interface H4 extends HTML<HTMLHeadingElement, "h4"> {}
    export interface H5 extends HTML<HTMLHeadingElement, "h5"> {}
    export interface H6 extends HTML<HTMLHeadingElement, "h6"> {}
    export interface Head extends HTML<HTMLHeadElement, "head"> {}
    export interface Header extends HTML<HTMLElement, "header"> {}
    export interface Hgroup extends HTML<HTMLElement, "hgroup"> {}
    export interface Hr extends HTML<HTMLHRElement, "hr"> {}
    export interface I extends HTML<HTMLElement, "i"> {}
    export interface Kbd extends HTML<HTMLElement, "kbd"> {}
    export interface Legend extends HTML<HTMLLegendElement, "legend"> {}
    export interface Main extends HTML<HTMLElement, "main"> {}
    export interface Mark extends HTML<HTMLElement, "mark"> {}
    export interface Menuitem extends HTML<HTMLElement, "menuitem"> {}
    export interface Nav extends HTML<HTMLElement, "nav"> {}
    export interface Noindex extends HTML<HTMLElement, "noindex"> {}
    export interface Noscript extends HTML<HTMLElement, "noscript"> {}
    export interface P extends HTML<HTMLParagraphElement, "p"> {}
    export interface Picture extends HTML<HTMLElement, "picture"> {}
    export interface Pre extends HTML<HTMLPreElement, "pre"> {}
    export interface Rp extends HTML<HTMLElement, "rp"> {}
    export interface Rt extends HTML<HTMLElement, "rt"> {}
    export interface Ruby extends HTML<HTMLElement, "ruby"> {}
    export interface S extends HTML<HTMLElement, "s"> {}
    export interface Samp extends HTML<HTMLElement, "samp"> {}
    export interface Search extends HTML<HTMLElement, "search"> {}
    export interface Section extends HTML<HTMLElement, "section"> {}
    export interface Small extends HTML<HTMLElement, "small"> {}
    export interface Span extends HTML<HTMLSpanElement, "span"> {}
    export interface Strong extends HTML<HTMLElement, "strong"> {}
    export interface Sub extends HTML<HTMLElement, "sub"> {}
    export interface Summary extends HTML<HTMLElement, "summary"> {}
    export interface Sup extends HTML<HTMLElement, "sup"> {}
    export interface Template extends HTML<HTMLTemplateElement, "template"> {}
    export interface Tbody extends HTML<HTMLTableSectionElement, "tbody"> {}
    export interface Tfoot extends HTML<HTMLTableSectionElement, "tfoot"> {}
    export interface Thead extends HTML<HTMLTableSectionElement, "thead"> {}
    export interface Title extends HTML<HTMLTitleElement, "title"> {}
    export interface Tr extends HTML<HTMLTableRowElement, "tr"> {}
    export interface U extends HTML<HTMLElement, "u"> {}
    export interface Ul extends HTML<HTMLUListElement, "ul"> {}
    export interface Var extends HTML<HTMLElement, "var"> {}
    export interface Wbr extends HTML<HTMLElement, "wbr"> {}
  }

  /**
   * @public
   *
   * An adapter is a function that takes a set of input properties and returns a set of output properties.
   *
   * @typeParam InputProps - The input properties that the adapter will receive.
   * @typeParam OutputProps - The output properties that the adapter will return.
   *
   * > **Note:** _In the context of electrical systems, an adapter is a device that allows a plug to connect to an outlet, even if the plug and outlet are not compatible._
   */
  export interface Adapter<
    in out InputProps extends PlugProps,
    in out OutputProps extends PlugProps
  > {
    (inputProps: InputProps): OutputProps;
  }
}
