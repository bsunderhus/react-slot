import type * as plug from "../plug";
import type * as ReactTypes from "./react.types";
import type { Never } from "./helper.types";
import type { DangerouslyRenderFunction } from "./outlet.types";

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
export type Plug<Props extends PlugProps = PlugPropsWithMetadata> =
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
   */
  export type Shorthand<Props extends PlugProps = PlugPropsWithMetadata> =
    Props extends unknown
      ? { children: any } extends Props
        ? Extract<
            | ReactTypes.ReactElement<any, any>
            | string
            | number
            | Iterable<ReactTypes.ReactNode>
            | boolean,
            "children" extends keyof Props
              ? Props["children"]
              : Never<`
                If Props has no "children", there should be no plug shorthand,
                As the plug shorthand is a simplified version of a plug props containing only "children".
              `>
          >
        : Never<`
          If Props has other required properties than just "children", there should be no plug shorthand.
          As the plug shorthand is a simplified version of a plug props containing only "children". 
        `>
      : never;

  /**
   * @public
   *
   * An unplugged plug is a plug that is not connected to an outlet.
   * It is equivalent to an abort signal in a promise.
   * If an outlet receives an unplugged plug, it will not render.
   *
   * > **Note:** _in the context of electrical systems unplugged is a term used to describe the connection between a plug and an outlet_
   */
  export type Unplugged = null;
}

/**
 * @public
 *
 * A locked in plug is a plug that is connected to an outlet and cannot be removed.
 * This removes the possibility of opting-out of an outlet.
 *
 * > **Note:** _In the context of electrical systems a Lock-in plug is a plug with a lock mechanism to avoid it from being accidentally unplugged._
 */
export type LockedIn<P> = Exclude<P, Plug.Unplugged>;

/**
 * @public
 */
export type Default<Props extends PlugProps> = PlugProps<
  NonNullable<Props["as"]>
> &
  Omit<Props, "as">;

/**
 * Internal Helper type that picks from an union of plug properties the ones that are {@link Default}.
 *
 * {@link Default} properties are the ones that have `as` property as optional.
 *
 * @example
 * ```ts
 *  type PickingTheDefaults =
 *  PickDefault<
 *    | Default<PlugProps<'button'>>
 *    | PlugProps<'a'>
 *    | PlugProps<'div'>
 *  > // Default<PlugProps<'button'>>
 * ```
 */
export type PickDefault<P extends Plug> = P extends PlugProps
  ? undefined extends P["as"]
    ? P
    : Never<"Props is not default.">
  : never;

/**
 * Internal plug type that excludes the {@link Plug.Shorthand} type.
 */
export type PlugWithoutShorthand = Exclude<Plug, Plug.Shorthand>;

/**
 * Internal plug props type that includes the children property.
 * This is used to ensure that the children property is present for the purpose of type checking.
 * It is used in two places:
 * 1. In the {@link plug.resolveShorthand} function to ensure that the children property is present when a shorthand plug is used.
 * 2. As the default generic type for all the {@link Plug} types to ensure that the children property is present while evaluating the default cases.
 */
export interface PlugPropsWithMetadata extends PlugProps {
  children?: unknown;
  dangerouslyRender?: unknown;
}

export interface DangerouslyRender<
  Type extends ReactTypes.JSX.ElementType = ReactTypes.JSX.ElementType,
  Props = {}
> {
  dangerouslyRender?: DangerouslyRenderFunction<
    ReactTypes.ReactElement<Props, Type>
  >;
}

/**
 * @public
 *
 * The type of the plug props (`as` property).
 * It can be a function component or an intrinsic element.
 */
export type PlugPropsType<P = unknown> =
  | keyof ReactTypes.JSX.IntrinsicElements
  // Due to contravariance on FC signature this has to be any
  | ReactTypes.FunctionComponent<P>;

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
export interface PlugProps<
  Type extends PlugPropsType<any> = PlugPropsType<any>
> {
  as?: Type;
}

/** @public */
export namespace PlugProps {
  /**
   * @public
   *
   * Definition of the plug props for a function component.
   */
  export type FC<Props> =
    /**
     * Props extends unknown is a distributive conditional on unions (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
     */
    Props extends unknown
      ? Props &
          Required<PlugProps<ReactTypes.FC<Props>>> &
          DangerouslyRender<ReactTypes.FC<Props>, Props>
      : never;

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
    svg: SVGPlugProps<SVGSVGElement, "svg">;

    animate: SVGPlugProps<SVGElement, "animate">; // TODO: It is, 'TODO' SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
    animateMotion: SVGPlugProps<SVGElement, "animateMotion">;
    animateTransform: SVGPlugProps<SVGElement, "animateTransform">; // TODO: It is, 'TODO' SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
    circle: SVGPlugProps<SVGCircleElement, "circle">;
    clipPath: SVGPlugProps<SVGClipPathElement, "clipPath">;
    defs: SVGPlugProps<SVGDefsElement, "defs">;
    desc: SVGPlugProps<SVGDescElement, "desc">;
    ellipse: SVGPlugProps<SVGEllipseElement, "ellipse">;
    feBlend: SVGPlugProps<SVGFEBlendElement, "feBlend">;
    feColorMatrix: SVGPlugProps<SVGFEColorMatrixElement, "feColorMatrix">;
    feComponentTransfer: SVGPlugProps<
      SVGFEComponentTransferElement,
      "feComponentTransfer"
    >;
    feComposite: SVGPlugProps<SVGFECompositeElement, "feComposite">;
    feConvolveMatrix: SVGPlugProps<
      SVGFEConvolveMatrixElement,
      "feConvolveMatrix"
    >;
    feDiffuseLighting: SVGPlugProps<
      SVGFEDiffuseLightingElement,
      "feDiffuseLighting"
    >;
    feDisplacementMap: SVGPlugProps<
      SVGFEDisplacementMapElement,
      "feDisplacementMap"
    >;
    feDistantLight: SVGPlugProps<SVGFEDistantLightElement, "feDistantLight">;
    feDropShadow: SVGPlugProps<SVGFEDropShadowElement, "feDropShadow">;
    feFlood: SVGPlugProps<SVGFEFloodElement, "feFlood">;
    feFuncA: SVGPlugProps<SVGFEFuncAElement, "feFuncA">;
    feFuncB: SVGPlugProps<SVGFEFuncBElement, "feFuncB">;
    feFuncG: SVGPlugProps<SVGFEFuncGElement, "feFuncG">;
    feFuncR: SVGPlugProps<SVGFEFuncRElement, "feFuncR">;
    feGaussianBlur: SVGPlugProps<SVGFEGaussianBlurElement, "feGaussianBlur">;
    feImage: SVGPlugProps<SVGFEImageElement, "feImage">;
    feMerge: SVGPlugProps<SVGFEMergeElement, "feMerge">;
    feMergeNode: SVGPlugProps<SVGFEMergeNodeElement, "feMergeNode">;
    feMorphology: SVGPlugProps<SVGFEMorphologyElement, "feMorphology">;
    feOffset: SVGPlugProps<SVGFEOffsetElement, "feOffset">;
    fePointLight: SVGPlugProps<SVGFEPointLightElement, "fePointLight">;
    feSpecularLighting: SVGPlugProps<
      SVGFESpecularLightingElement,
      "feSpecularLighting"
    >;
    feSpotLight: SVGPlugProps<SVGFESpotLightElement, "feSpotLight">;
    feTile: SVGPlugProps<SVGFETileElement, "feTile">;
    feTurbulence: SVGPlugProps<SVGFETurbulenceElement, "feTurbulence">;
    filter: SVGPlugProps<SVGFilterElement, "filter">;
    foreignObject: SVGPlugProps<SVGForeignObjectElement, "foreignObject">;
    g: SVGPlugProps<SVGGElement, "g">;
    image: SVGPlugProps<SVGImageElement, "image">;
    line: SVGPlugProps<SVGLineElement, "line">;
    linearGradient: SVGPlugProps<SVGLinearGradientElement, "linearGradient">;
    marker: SVGPlugProps<SVGMarkerElement, "marker">;
    mask: SVGPlugProps<SVGMaskElement, "mask">;
    metadata: SVGPlugProps<SVGMetadataElement, "metadata">;
    mpath: SVGPlugProps<SVGElement, "mpath">;
    path: SVGPlugProps<SVGPathElement, "path">;
    pattern: SVGPlugProps<SVGPatternElement, "pattern">;
    polygon: SVGPlugProps<SVGPolygonElement, "polygon">;
    polyline: SVGPlugProps<SVGPolylineElement, "polyline">;
    radialGradient: SVGPlugProps<SVGRadialGradientElement, "radialGradient">;
    rect: SVGPlugProps<SVGRectElement, "rect">;
    stop: SVGPlugProps<SVGStopElement, "stop">;
    switch: SVGPlugProps<SVGSwitchElement, "switch">;
    symbol: SVGPlugProps<SVGSymbolElement, "symbol">;
    text: SVGPlugProps<SVGTextElement, "text">;
    textPath: SVGPlugProps<SVGTextPathElement, "textPath">;
    tspan: SVGPlugProps<SVGTSpanElement, "tspan">;
    use: SVGPlugProps<SVGUseElement, "use">;
    view: SVGPlugProps<SVGViewElement, "view">;
  }

  /** @public */
  export namespace Intrinsics {
    /** @public */
    export interface A
      extends DetailedIntrinsicPlugProps<
        HTMLAnchorElement,
        ReactTypes.AnchorHTMLAttributes<HTMLAnchorElement>,
        "a"
      > {}
    /** @public */
    export interface Area
      extends DetailedIntrinsicPlugProps<
        HTMLAreaElement,
        Omit<ReactTypes.AreaHTMLAttributes<HTMLAreaElement>, "children">,
        "area"
      > {}
    /** @public */
    export interface Audio
      extends DetailedIntrinsicPlugProps<
        HTMLAudioElement,
        ReactTypes.AudioHTMLAttributes<HTMLAudioElement>,
        "audio"
      > {}
    /** @public */
    export interface Base
      extends DetailedIntrinsicPlugProps<
        HTMLBaseElement,
        ReactTypes.BaseHTMLAttributes<HTMLBaseElement>,
        "base"
      > {}
    /** @public */
    export interface Blockquote
      extends DetailedIntrinsicPlugProps<
        HTMLQuoteElement,
        ReactTypes.BlockquoteHTMLAttributes<HTMLQuoteElement>,
        "blockquote"
      > {}
    /** @public */
    export interface Button
      extends DetailedIntrinsicPlugProps<
        HTMLButtonElement,
        ReactTypes.ButtonHTMLAttributes<HTMLButtonElement>,
        "button"
      > {}
    /** @public */
    export interface Canvas
      extends DetailedIntrinsicPlugProps<
        HTMLCanvasElement,
        ReactTypes.CanvasHTMLAttributes<HTMLCanvasElement>,
        "canvas"
      > {}
    /** @public */
    export interface Col
      extends DetailedIntrinsicPlugProps<
        HTMLTableColElement,
        Omit<ReactTypes.ColHTMLAttributes<HTMLTableColElement>, "children">,
        "col"
      > {}
    /** @public */
    export interface Colgroup
      extends DetailedIntrinsicPlugProps<
        HTMLTableColElement,
        ReactTypes.ColgroupHTMLAttributes<HTMLTableColElement>,
        "colgroup"
      > {}
    /** @public */
    export interface Data
      extends DetailedIntrinsicPlugProps<
        HTMLDataElement,
        ReactTypes.DataHTMLAttributes<HTMLDataElement>,
        "data"
      > {}
    /** @public */
    export interface Del
      extends DetailedIntrinsicPlugProps<
        HTMLModElement,
        ReactTypes.DelHTMLAttributes<HTMLModElement>,
        "del"
      > {}
    /** @public */
    export interface Details
      extends DetailedIntrinsicPlugProps<
        HTMLDetailsElement,
        ReactTypes.DetailsHTMLAttributes<HTMLDetailsElement>,
        "details"
      > {}
    /** @public */
    export interface Dialog
      extends DetailedIntrinsicPlugProps<
        HTMLDialogElement,
        ReactTypes.DialogHTMLAttributes<HTMLDialogElement>,
        "dialog"
      > {}
    /** @public */
    export interface Embed
      extends DetailedIntrinsicPlugProps<
        HTMLEmbedElement,
        Omit<ReactTypes.EmbedHTMLAttributes<HTMLEmbedElement>, "children">,
        "embed"
      > {}
    /** @public */
    export interface Fieldset
      extends DetailedIntrinsicPlugProps<
        HTMLFieldSetElement,
        ReactTypes.FieldsetHTMLAttributes<HTMLFieldSetElement>,
        "fieldset"
      > {}
    /** @public */
    export interface Form
      extends DetailedIntrinsicPlugProps<
        HTMLFormElement,
        ReactTypes.FormHTMLAttributes<HTMLFormElement>,
        "form"
      > {}
    /** @public */
    export interface Html
      extends DetailedIntrinsicPlugProps<
        HTMLHtmlElement,
        ReactTypes.HtmlHTMLAttributes<HTMLHtmlElement>,
        "html"
      > {}
    /** @public */
    export interface Iframe
      extends DetailedIntrinsicPlugProps<
        HTMLIFrameElement,
        ReactTypes.IframeHTMLAttributes<HTMLIFrameElement>,
        "iframe"
      > {}
    /** @public */
    export interface Img
      extends DetailedIntrinsicPlugProps<
        HTMLImageElement,
        Omit<ReactTypes.ImgHTMLAttributes<HTMLImageElement>, "children">,
        "img"
      > {}
    /** @public */
    export interface Input
      extends DetailedIntrinsicPlugProps<
        HTMLInputElement,
        Omit<ReactTypes.InputHTMLAttributes<HTMLInputElement>, "children">,
        "input"
      > {}
    /** @public */
    export interface Ins
      extends DetailedIntrinsicPlugProps<
        HTMLModElement,
        ReactTypes.InsHTMLAttributes<HTMLModElement>,
        "ins"
      > {}
    /** @public */
    export interface Keygen
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.KeygenHTMLAttributes<HTMLElement>,
        "keygen"
      > {}
    /** @public */
    export interface Label
      extends DetailedIntrinsicPlugProps<
        HTMLLabelElement,
        ReactTypes.LabelHTMLAttributes<HTMLLabelElement>,
        "label"
      > {}
    /** @public */
    export interface Li
      extends DetailedIntrinsicPlugProps<
        HTMLLIElement,
        ReactTypes.LiHTMLAttributes<HTMLLIElement>,
        "li"
      > {}
    /** @public */
    export interface Link
      extends DetailedIntrinsicPlugProps<
        HTMLLinkElement,
        Omit<ReactTypes.LinkHTMLAttributes<HTMLLinkElement>, "children" | "as">,
        "link"
      > {}
    /** @public */
    export interface Map
      extends DetailedIntrinsicPlugProps<
        HTMLMapElement,
        ReactTypes.MapHTMLAttributes<HTMLMapElement>,
        "map"
      > {}
    /** @public */
    export interface Menu
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.MenuHTMLAttributes<HTMLElement>,
        "menu"
      > {}
    /** @public */
    export interface Meta
      extends DetailedIntrinsicPlugProps<
        HTMLMetaElement,
        ReactTypes.MetaHTMLAttributes<HTMLMetaElement>,
        "meta"
      > {}
    /** @public */
    export interface Meter
      extends DetailedIntrinsicPlugProps<
        HTMLMeterElement,
        ReactTypes.MeterHTMLAttributes<HTMLMeterElement>,
        "meter"
      > {}
    /** @public */
    export interface Object
      extends DetailedIntrinsicPlugProps<
        HTMLObjectElement,
        ReactTypes.ObjectHTMLAttributes<HTMLObjectElement>,
        "object"
      > {}
    /** @public */
    export interface Ol
      extends DetailedIntrinsicPlugProps<
        HTMLOListElement,
        ReactTypes.OlHTMLAttributes<HTMLOListElement>,
        "ol"
      > {}
    /** @public */
    export interface Optgroup
      extends DetailedIntrinsicPlugProps<
        HTMLOptGroupElement,
        ReactTypes.OptgroupHTMLAttributes<HTMLOptGroupElement>,
        "optgroup"
      > {}
    /** @public */
    export interface Option
      extends DetailedIntrinsicPlugProps<
        HTMLOptionElement,
        ReactTypes.OptionHTMLAttributes<HTMLOptionElement>,
        "option"
      > {}
    /** @public */
    export interface Output
      extends DetailedIntrinsicPlugProps<
        HTMLOutputElement,
        ReactTypes.OutputHTMLAttributes<HTMLOutputElement>,
        "output"
      > {}
    /** @public */
    export interface Param
      extends DetailedIntrinsicPlugProps<
        HTMLParamElement,
        Omit<ReactTypes.ParamHTMLAttributes<HTMLParamElement>, "children">,
        "param"
      > {}
    /** @public */
    export interface Progress
      extends DetailedIntrinsicPlugProps<
        HTMLProgressElement,
        ReactTypes.ProgressHTMLAttributes<HTMLProgressElement>,
        "progress"
      > {}
    /** @public */
    export interface Quote
      extends DetailedIntrinsicPlugProps<
        HTMLQuoteElement,
        ReactTypes.QuoteHTMLAttributes<HTMLQuoteElement>,
        "q"
      > {}
    /** @public */
    export interface Slot
      extends DetailedIntrinsicPlugProps<
        HTMLSlotElement,
        ReactTypes.SlotHTMLAttributes<HTMLSlotElement>,
        "slot"
      > {}
    /** @public */
    export interface Script
      extends DetailedIntrinsicPlugProps<
        HTMLScriptElement,
        ReactTypes.ScriptHTMLAttributes<HTMLScriptElement>,
        "script"
      > {}
    /** @public */
    export interface Select
      extends DetailedIntrinsicPlugProps<
        HTMLSelectElement,
        ReactTypes.SelectHTMLAttributes<HTMLSelectElement>,
        "select"
      > {}
    /** @public */
    export interface Source
      extends DetailedIntrinsicPlugProps<
        HTMLSourceElement,
        Omit<ReactTypes.SourceHTMLAttributes<HTMLSourceElement>, "children">,
        "source"
      > {}
    /** @public */
    export interface Style
      extends DetailedIntrinsicPlugProps<
        HTMLStyleElement,
        ReactTypes.StyleHTMLAttributes<HTMLStyleElement>,
        "style"
      > {}
    /** @public */
    export interface Table
      extends DetailedIntrinsicPlugProps<
        HTMLTableElement,
        ReactTypes.TableHTMLAttributes<HTMLTableElement>,
        "table"
      > {}
    /** @public */
    export interface Td
      extends DetailedIntrinsicPlugProps<
        HTMLTableDataCellElement,
        ReactTypes.TdHTMLAttributes<HTMLTableDataCellElement>,
        "td"
      > {}
    /** @public */
    export interface Textarea
      extends DetailedIntrinsicPlugProps<
        HTMLTextAreaElement,
        ReactTypes.TextareaHTMLAttributes<HTMLTextAreaElement>,
        "textarea"
      > {}
    /** @public */
    export interface Th
      extends DetailedIntrinsicPlugProps<
        HTMLTableHeaderCellElement,
        ReactTypes.ThHTMLAttributes<HTMLTableHeaderCellElement>,
        "th"
      > {}
    /** @public */
    export interface Time
      extends DetailedIntrinsicPlugProps<
        HTMLTimeElement,
        ReactTypes.TimeHTMLAttributes<HTMLTimeElement>,
        "time"
      > {}
    /** @public */
    export interface Track
      extends DetailedIntrinsicPlugProps<
        HTMLTrackElement,
        Omit<ReactTypes.TrackHTMLAttributes<HTMLTrackElement>, "children">,
        "track"
      > {}
    /** @public */
    export interface Video
      extends DetailedIntrinsicPlugProps<
        HTMLVideoElement,
        ReactTypes.VideoHTMLAttributes<HTMLVideoElement>,
        "video"
      > {}
    /** @public */
    export interface WebView
      extends DetailedIntrinsicPlugProps<
        HTMLWebViewElement,
        ReactTypes.WebViewHTMLAttributes<HTMLWebViewElement>,
        "webview"
      > {}

    export interface Abbr
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "abbr"
      > {}
    export interface Address
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "address"
      > {}
    export interface Article
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "article"
      > {}
    export interface Aside
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "aside"
      > {}
    export interface B
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "b"
      > {}
    export interface Bdi
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "bdi"
      > {}
    export interface Bdo
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "bdo"
      > {}
    export interface Big
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "big"
      > {}
    export interface Body
      extends DetailedIntrinsicPlugProps<
        HTMLBodyElement,
        ReactTypes.HTMLAttributes<HTMLBodyElement>,
        "body"
      > {}
    export interface Br
      extends DetailedIntrinsicPlugProps<
        HTMLBRElement,
        ReactTypes.HTMLAttributes<HTMLBRElement>,
        "br"
      > {}
    export interface Caption
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "caption"
      > {}
    export interface Center
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "center"
      > {}
    export interface Cite
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "cite"
      > {}
    export interface Code
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "code"
      > {}
    export interface Datalist
      extends DetailedIntrinsicPlugProps<
        HTMLDataListElement,
        ReactTypes.HTMLAttributes<HTMLDataListElement>,
        "datalist"
      > {}
    export interface Dd
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "dd"
      > {}
    export interface Dfn
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "dfn"
      > {}
    export interface Div
      extends DetailedIntrinsicPlugProps<
        HTMLDivElement,
        ReactTypes.HTMLAttributes<HTMLDivElement>,
        "div"
      > {}
    export interface Dl
      extends DetailedIntrinsicPlugProps<
        HTMLDListElement,
        ReactTypes.HTMLAttributes<HTMLDListElement>,
        "dl"
      > {}
    export interface Dt
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "dt"
      > {}
    export interface Em
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "em"
      > {}
    export interface Figcaption
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "figcaption"
      > {}
    export interface Figure
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "figure"
      > {}
    export interface Footer
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "footer"
      > {}
    export interface H1
      extends DetailedIntrinsicPlugProps<
        HTMLHeadingElement,
        ReactTypes.HTMLAttributes<HTMLHeadingElement>,
        "h1"
      > {}
    export interface H2
      extends DetailedIntrinsicPlugProps<
        HTMLHeadingElement,
        ReactTypes.HTMLAttributes<HTMLHeadingElement>,
        "h2"
      > {}
    export interface H3
      extends DetailedIntrinsicPlugProps<
        HTMLHeadingElement,
        ReactTypes.HTMLAttributes<HTMLHeadingElement>,
        "h3"
      > {}
    export interface H4
      extends DetailedIntrinsicPlugProps<
        HTMLHeadingElement,
        ReactTypes.HTMLAttributes<HTMLHeadingElement>,
        "h4"
      > {}
    export interface H5
      extends DetailedIntrinsicPlugProps<
        HTMLHeadingElement,
        ReactTypes.HTMLAttributes<HTMLHeadingElement>,
        "h5"
      > {}
    export interface H6
      extends DetailedIntrinsicPlugProps<
        HTMLHeadingElement,
        ReactTypes.HTMLAttributes<HTMLHeadingElement>,
        "h6"
      > {}
    export interface Head
      extends DetailedIntrinsicPlugProps<
        HTMLHeadElement,
        ReactTypes.HTMLAttributes<HTMLHeadElement>,
        "head"
      > {}
    export interface Header
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "header"
      > {}
    export interface Hgroup
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "hgroup"
      > {}
    export interface Hr
      extends DetailedIntrinsicPlugProps<
        HTMLHRElement,
        ReactTypes.HTMLAttributes<HTMLHRElement>,
        "hr"
      > {}
    export interface I
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "i"
      > {}
    export interface Kbd
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "kbd"
      > {}
    export interface Legend
      extends DetailedIntrinsicPlugProps<
        HTMLLegendElement,
        ReactTypes.HTMLAttributes<HTMLLegendElement>,
        "legend"
      > {}
    export interface Main
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "main"
      > {}
    export interface Mark
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "mark"
      > {}
    export interface Menuitem
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "menuitem"
      > {}
    export interface Nav
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "nav"
      > {}
    export interface Noindex
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "noindex"
      > {}
    export interface Noscript
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "noscript"
      > {}
    export interface P
      extends DetailedIntrinsicPlugProps<
        HTMLParagraphElement,
        ReactTypes.HTMLAttributes<HTMLParagraphElement>,
        "p"
      > {}
    export interface Picture
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "picture"
      > {}
    export interface Pre
      extends DetailedIntrinsicPlugProps<
        HTMLPreElement,
        ReactTypes.HTMLAttributes<HTMLPreElement>,
        "pre"
      > {}
    export interface Rp
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "rp"
      > {}
    export interface Rt
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "rt"
      > {}
    export interface Ruby
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "ruby"
      > {}
    export interface S
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "s"
      > {}
    export interface Samp
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "samp"
      > {}
    export interface Search
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "search"
      > {}
    export interface Section
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "section"
      > {}
    export interface Small
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "small"
      > {}
    export interface Span
      extends DetailedIntrinsicPlugProps<
        HTMLSpanElement,
        ReactTypes.HTMLAttributes<HTMLSpanElement>,
        "span"
      > {}
    export interface Strong
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "strong"
      > {}
    export interface Sub
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "sub"
      > {}
    export interface Summary
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "summary"
      > {}
    export interface Sup
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "sup"
      > {}
    export interface Template
      extends DetailedIntrinsicPlugProps<
        HTMLTemplateElement,
        ReactTypes.HTMLAttributes<HTMLTemplateElement>,
        "template"
      > {}
    export interface Tbody
      extends DetailedIntrinsicPlugProps<
        HTMLTableSectionElement,
        ReactTypes.HTMLAttributes<HTMLTableSectionElement>,
        "tbody"
      > {}
    export interface Tfoot
      extends DetailedIntrinsicPlugProps<
        HTMLTableSectionElement,
        ReactTypes.HTMLAttributes<HTMLTableSectionElement>,
        "tfoot"
      > {}
    export interface Thead
      extends DetailedIntrinsicPlugProps<
        HTMLTableSectionElement,
        ReactTypes.HTMLAttributes<HTMLTableSectionElement>,
        "thead"
      > {}
    export interface Title
      extends DetailedIntrinsicPlugProps<
        HTMLTitleElement,
        ReactTypes.HTMLAttributes<HTMLTitleElement>,
        "title"
      > {}
    export interface Tr
      extends DetailedIntrinsicPlugProps<
        HTMLTableRowElement,
        ReactTypes.HTMLAttributes<HTMLTableRowElement>,
        "tr"
      > {}
    export interface U
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "u"
      > {}
    export interface Ul
      extends DetailedIntrinsicPlugProps<
        HTMLUListElement,
        ReactTypes.HTMLAttributes<HTMLUListElement>,
        "ul"
      > {}
    export interface Var
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "var"
      > {}
    export interface Wbr
      extends DetailedIntrinsicPlugProps<
        HTMLElement,
        ReactTypes.HTMLAttributes<HTMLElement>,
        "wbr"
      > {}
  }
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
export interface PlugPropsAdapter<
  in out InputProps extends PlugProps,
  in out OutputProps extends PlugProps
> {
  (inputProps: InputProps): OutputProps;
}

export type DetailedIntrinsicPlugProps<
  Element,
  Attributes,
  Type extends PlugPropsType
> = DangerouslyRender<Type, Attributes & ReactTypes.RefAttributes<Element>> &
  Attributes &
  ReactTypes.RefAttributes<Element> &
  ReactTypes.DataAttributes &
  Required<PlugProps<Type>>;

export interface SVGPlugProps<
  E,
  T extends keyof ReactTypes.JSX.IntrinsicElements
> extends DetailedIntrinsicPlugProps<E, ReactTypes.SVGAttributes<E>, T> {}
