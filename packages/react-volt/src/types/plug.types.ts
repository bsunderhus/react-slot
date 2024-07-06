import type * as ReactTypes from "./react.types";
import type { Never } from "./helper.types";
import type { _$unplugged } from "../constants";
import type { outlet } from "../outlet";

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
export type Plug<Props extends PlugProps = InferencePlugProps> =
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
   * It is a shorter way to define a plug that only has children,
   * as the children are the most common property used in a plug.
   */
  export type Shorthand<Props extends PlugProps = InferencePlugProps> =
    /**
     * Props extends any is used to distribute the conditional type over the union of props.
     * See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types} for more information
     */
    Props extends any
      ? { children: any } extends Props
        ? Extract<
            | ReactTypes.JSX.Element
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
 * Helper type that converts a plug props to a default plug props.
 * Default plug props are plug props that have the `as` property as optional.
 */
export type Default<Props extends PlugProps> = NonNullable<
  Props["as"]
> extends string
  ? Partial<Props>
  : PlugProps<NonNullable<Props["as"]>> & Omit<Props, "as">;

/**
 * Internal Helper type that picks from an union of plug properties the ones that are {@link Default}.
 *
 * {@link Default} plug properties are the ones that have `as` property as optional.
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
 * @public
 *
 * The type of the plug props (`as` property).
 */
export type PlugPropsType = ReactTypes.JSX.ElementType;

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
  // Due to contravariance on function components signature this has to be any
  // otherwise it will not be compatible with any function component signature.
  Type extends PlugPropsType = PlugPropsType
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
  export type FC<Props> = Props &
    DangerouslyRender<ReactTypes.ReactElement<Props, ReactTypes.FC<Props>>> &
    Required<PlugProps<ReactTypes.FC<Props>>>;

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
    svg: Intrinsics.SVG<SVGSVGElement> & Required<PlugProps<"svg">>;

    animate: Intrinsics.SVG<SVGElement> & Required<PlugProps<"animate">>; // TODOSVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
    animateMotion: Intrinsics.SVG<SVGElement> &
      Required<PlugProps<"animateMotion">>;
    animateTransform: Intrinsics.SVG<SVGElement> &
      Required<PlugProps<"animateTransform">>; // TODO: It is, 'TODO' SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
    circle: Intrinsics.SVG<SVGCircleElement> & Required<PlugProps<"circle">>;
    clipPath: Intrinsics.SVG<SVGClipPathElement> &
      Required<PlugProps<"clipPath">>;
    defs: Intrinsics.SVG<SVGDefsElement> & Required<PlugProps<"defs">>;
    desc: Intrinsics.SVG<SVGDescElement> & Required<PlugProps<"desc">>;
    ellipse: Intrinsics.SVG<SVGEllipseElement> & Required<PlugProps<"ellipse">>;
    feBlend: Intrinsics.SVG<SVGFEBlendElement> & Required<PlugProps<"feBlend">>;
    feColorMatrix: Intrinsics.SVG<SVGFEColorMatrixElement> &
      Required<PlugProps<"feColorMatrix">>;
    feComponentTransfer: Intrinsics.SVG<SVGFEComponentTransferElement> &
      Required<PlugProps<"feComponentTransfer">>;
    feComposite: Intrinsics.SVG<SVGFECompositeElement> &
      Required<PlugProps<"feComposite">>;
    feConvolveMatrix: Intrinsics.SVG<SVGFEConvolveMatrixElement> &
      Required<PlugProps<"feConvolveMatrix">>;
    feDiffuseLighting: Intrinsics.SVG<SVGFEDiffuseLightingElement> &
      Required<PlugProps<"feDiffuseLighting">>;
    feDisplacementMap: Intrinsics.SVG<SVGFEDisplacementMapElement> &
      Required<PlugProps<"feDisplacementMap">>;
    feDistantLight: Intrinsics.SVG<SVGFEDistantLightElement> &
      Required<PlugProps<"feDistantLight">>;
    feDropShadow: Intrinsics.SVG<SVGFEDropShadowElement> &
      Required<PlugProps<"feDropShadow">>;
    feFlood: Intrinsics.SVG<SVGFEFloodElement> & Required<PlugProps<"feFlood">>;
    feFuncA: Intrinsics.SVG<SVGFEFuncAElement> & Required<PlugProps<"feFuncA">>;
    feFuncB: Intrinsics.SVG<SVGFEFuncBElement> & Required<PlugProps<"feFuncB">>;
    feFuncG: Intrinsics.SVG<SVGFEFuncGElement> & Required<PlugProps<"feFuncG">>;
    feFuncR: Intrinsics.SVG<SVGFEFuncRElement> & Required<PlugProps<"feFuncR">>;
    feGaussianBlur: Intrinsics.SVG<SVGFEGaussianBlurElement> &
      Required<PlugProps<"feGaussianBlur">>;
    feImage: Intrinsics.SVG<SVGFEImageElement> & Required<PlugProps<"feImage">>;
    feMerge: Intrinsics.SVG<SVGFEMergeElement> & Required<PlugProps<"feMerge">>;
    feMergeNode: Intrinsics.SVG<SVGFEMergeNodeElement> &
      Required<PlugProps<"feMergeNode">>;
    feMorphology: Intrinsics.SVG<SVGFEMorphologyElement> &
      Required<PlugProps<"feMorphology">>;
    feOffset: Intrinsics.SVG<SVGFEOffsetElement> &
      Required<PlugProps<"feOffset">>;
    fePointLight: Intrinsics.SVG<SVGFEPointLightElement> &
      Required<PlugProps<"fePointLight">>;
    feSpecularLighting: Intrinsics.SVG<SVGFESpecularLightingElement> &
      Required<PlugProps<"feSpecularLighting">>;
    feSpotLight: Intrinsics.SVG<SVGFESpotLightElement> &
      Required<PlugProps<"feSpotLight">>;
    feTile: Intrinsics.SVG<SVGFETileElement> & Required<PlugProps<"feTile">>;
    feTurbulence: Intrinsics.SVG<SVGFETurbulenceElement> &
      Required<PlugProps<"feTurbulence">>;
    filter: Intrinsics.SVG<SVGFilterElement> & Required<PlugProps<"filter">>;
    foreignObject: Intrinsics.SVG<SVGForeignObjectElement> &
      Required<PlugProps<"foreignObject">>;
    g: Intrinsics.SVG<SVGGElement> & Required<PlugProps<"g">>;
    image: Intrinsics.SVG<SVGImageElement> & Required<PlugProps<"image">>;
    line: Intrinsics.SVG<SVGLineElement> & Required<PlugProps<"line">>;
    linearGradient: Intrinsics.SVG<SVGLinearGradientElement> &
      Required<PlugProps<"linearGradient">>;
    marker: Intrinsics.SVG<SVGMarkerElement> & Required<PlugProps<"marker">>;
    mask: Intrinsics.SVG<SVGMaskElement> & Required<PlugProps<"mask">>;
    metadata: Intrinsics.SVG<SVGMetadataElement> &
      Required<PlugProps<"metadata">>;
    mpath: Intrinsics.SVG<SVGElement> & Required<PlugProps<"mpath">>;
    path: Intrinsics.SVG<SVGPathElement> & Required<PlugProps<"path">>;
    pattern: Intrinsics.SVG<SVGPatternElement> & Required<PlugProps<"pattern">>;
    polygon: Intrinsics.SVG<SVGPolygonElement> & Required<PlugProps<"polygon">>;
    polyline: Intrinsics.SVG<SVGPolylineElement> &
      Required<PlugProps<"polyline">>;
    radialGradient: Intrinsics.SVG<SVGRadialGradientElement> &
      Required<PlugProps<"radialGradient">>;
    rect: Intrinsics.SVG<SVGRectElement> & Required<PlugProps<"rect">>;
    stop: Intrinsics.SVG<SVGStopElement> & Required<PlugProps<"stop">>;
    switch: Intrinsics.SVG<SVGSwitchElement> & Required<PlugProps<"switch">>;
    symbol: Intrinsics.SVG<SVGSymbolElement> & Required<PlugProps<"symbol">>;
    text: Intrinsics.SVG<SVGTextElement> & Required<PlugProps<"text">>;
    textPath: Intrinsics.SVG<SVGTextPathElement> &
      Required<PlugProps<"textPath">>;
    tspan: Intrinsics.SVG<SVGTSpanElement> & Required<PlugProps<"tspan">>;
    use: Intrinsics.SVG<SVGUseElement> & Required<PlugProps<"use">>;
    view: Intrinsics.SVG<SVGViewElement> & Required<PlugProps<"view">>;
  }

  /** @public */
  export namespace Intrinsics {
    export interface AllHTML<E extends HTMLElement = HTMLElement>
      extends BaseIntrinsicPlugProps<E, string>,
        ReactTypes.AllHTMLAttributes<E> {
      // 'as' has to be re-declared here as there's
      // a conflict between PlugProps and ReactTypes.AllHTMLAttributes
      // More specifically it conflicts with LinkHTMLAttributes
      as: string;
    }

    export interface HTML<E extends HTMLElement = HTMLElement>
      extends BaseIntrinsicPlugProps<E, string>,
        ReactTypes.HTMLAttributes<E> {}

    export interface SVG<E extends SVGElement = SVGElement>
      extends BaseIntrinsicPlugProps<E, string>,
        ReactTypes.SVGAttributes<E> {}

    export interface A
      extends BaseIntrinsicPlugProps<HTMLAnchorElement, "a">,
        ReactTypes.AnchorHTMLAttributes<HTMLAnchorElement> {}

    export interface Area
      extends BaseIntrinsicPlugProps<HTMLAreaElement, "area">,
        ReactTypes.AreaHTMLAttributes<HTMLAreaElement> {}

    export interface Audio
      extends BaseIntrinsicPlugProps<HTMLAudioElement, "audio">,
        ReactTypes.AudioHTMLAttributes<HTMLAudioElement> {}

    export interface Base
      extends BaseIntrinsicPlugProps<HTMLBaseElement, "base">,
        ReactTypes.BaseHTMLAttributes<HTMLBaseElement> {}

    export interface Blockquote
      extends BaseIntrinsicPlugProps<HTMLQuoteElement, "blockquote">,
        ReactTypes.BlockquoteHTMLAttributes<HTMLQuoteElement> {}

    export interface Button
      extends BaseIntrinsicPlugProps<HTMLButtonElement, "button">,
        ReactTypes.ButtonHTMLAttributes<HTMLButtonElement> {}

    export interface Canvas
      extends BaseIntrinsicPlugProps<HTMLCanvasElement, "canvas">,
        ReactTypes.CanvasHTMLAttributes<HTMLCanvasElement> {}

    export interface Col
      extends BaseIntrinsicPlugProps<HTMLTableColElement, "col">,
        ReactTypes.ColHTMLAttributes<HTMLTableColElement> {}

    export interface Colgroup
      extends BaseIntrinsicPlugProps<HTMLTableColElement, "colgroup">,
        ReactTypes.ColgroupHTMLAttributes<HTMLTableColElement> {}

    export interface Data
      extends BaseIntrinsicPlugProps<HTMLDataElement, "data">,
        ReactTypes.DataHTMLAttributes<HTMLDataElement> {}

    export interface Del
      extends BaseIntrinsicPlugProps<HTMLModElement, "del">,
        ReactTypes.DelHTMLAttributes<HTMLModElement> {}

    export interface Details
      extends BaseIntrinsicPlugProps<HTMLDetailsElement, "details">,
        ReactTypes.DetailsHTMLAttributes<HTMLDetailsElement> {}

    export interface Dialog
      extends BaseIntrinsicPlugProps<HTMLDialogElement, "dialog">,
        ReactTypes.DialogHTMLAttributes<HTMLDialogElement> {}

    export interface Embed
      extends BaseIntrinsicPlugProps<HTMLEmbedElement, "embed">,
        ReactTypes.EmbedHTMLAttributes<HTMLEmbedElement> {}

    export interface Fieldset
      extends BaseIntrinsicPlugProps<HTMLFieldSetElement, "fieldset">,
        ReactTypes.FieldsetHTMLAttributes<HTMLFieldSetElement> {}

    export interface Form
      extends BaseIntrinsicPlugProps<HTMLFormElement, "form">,
        ReactTypes.FormHTMLAttributes<HTMLFormElement> {}

    export interface Html
      extends BaseIntrinsicPlugProps<HTMLHtmlElement, "html">,
        ReactTypes.HtmlHTMLAttributes<HTMLHtmlElement> {}

    export interface Iframe
      extends BaseIntrinsicPlugProps<HTMLIFrameElement, "iframe">,
        ReactTypes.IframeHTMLAttributes<HTMLIFrameElement> {}

    export interface Img
      extends BaseIntrinsicPlugProps<HTMLImageElement, "img">,
        ReactTypes.ImgHTMLAttributes<HTMLImageElement> {}

    export interface Input
      extends BaseIntrinsicPlugProps<HTMLInputElement, "input">,
        ReactTypes.InputHTMLAttributes<HTMLInputElement> {}

    export interface Ins
      extends BaseIntrinsicPlugProps<HTMLModElement, "ins">,
        ReactTypes.InsHTMLAttributes<HTMLModElement> {}

    export interface Keygen
      extends BaseIntrinsicPlugProps<HTMLElement, "keygen">,
        ReactTypes.KeygenHTMLAttributes<HTMLElement> {}

    export interface Label
      extends BaseIntrinsicPlugProps<HTMLLabelElement, "label">,
        ReactTypes.LabelHTMLAttributes<HTMLLabelElement> {}

    export interface Li
      extends BaseIntrinsicPlugProps<HTMLLIElement, "li">,
        ReactTypes.LiHTMLAttributes<HTMLLIElement> {}

    export interface Link
      extends BaseIntrinsicPlugProps<HTMLLinkElement, "link">,
        ReactTypes.LinkHTMLAttributes<HTMLLinkElement> {
      // 'as' has to be re-declared here as there's
      // a conflict between PlugProps and ReactTypes.LinkHTMLAttributes
      as: "link";
    }

    export interface Map
      extends BaseIntrinsicPlugProps<HTMLMapElement, "map">,
        ReactTypes.MapHTMLAttributes<HTMLMapElement> {}

    export interface Menu
      extends BaseIntrinsicPlugProps<HTMLElement, "menu">,
        ReactTypes.MenuHTMLAttributes<HTMLElement> {}

    export interface Meta
      extends BaseIntrinsicPlugProps<HTMLMetaElement, "meta">,
        ReactTypes.MetaHTMLAttributes<HTMLMetaElement> {}

    export interface Meter
      extends BaseIntrinsicPlugProps<HTMLMeterElement, "meter">,
        ReactTypes.MeterHTMLAttributes<HTMLMeterElement> {}

    export interface Object
      extends BaseIntrinsicPlugProps<HTMLObjectElement, "object">,
        ReactTypes.ObjectHTMLAttributes<HTMLObjectElement> {}

    export interface Ol
      extends BaseIntrinsicPlugProps<HTMLOListElement, "ol">,
        ReactTypes.OlHTMLAttributes<HTMLOListElement> {}

    export interface Optgroup
      extends BaseIntrinsicPlugProps<HTMLOptGroupElement, "optgroup">,
        ReactTypes.OptgroupHTMLAttributes<HTMLOptGroupElement> {}

    export interface Option
      extends BaseIntrinsicPlugProps<HTMLOptionElement, "option">,
        ReactTypes.OptionHTMLAttributes<HTMLOptionElement> {}

    export interface Output
      extends BaseIntrinsicPlugProps<HTMLOutputElement, "output">,
        ReactTypes.OutputHTMLAttributes<HTMLOutputElement> {}

    export interface Param
      extends BaseIntrinsicPlugProps<HTMLParamElement, "param">,
        ReactTypes.ParamHTMLAttributes<HTMLParamElement> {}

    export interface Progress
      extends BaseIntrinsicPlugProps<HTMLProgressElement, "progress">,
        ReactTypes.ProgressHTMLAttributes<HTMLProgressElement> {}

    export interface Quote
      extends BaseIntrinsicPlugProps<HTMLQuoteElement, "q">,
        ReactTypes.QuoteHTMLAttributes<HTMLQuoteElement> {}

    export interface Slot
      extends BaseIntrinsicPlugProps<HTMLSlotElement, "slot">,
        ReactTypes.SlotHTMLAttributes<HTMLSlotElement> {}

    export interface Script
      extends BaseIntrinsicPlugProps<HTMLScriptElement, "script">,
        ReactTypes.ScriptHTMLAttributes<HTMLScriptElement> {}

    export interface Select
      extends BaseIntrinsicPlugProps<HTMLSelectElement, "select">,
        ReactTypes.SelectHTMLAttributes<HTMLSelectElement> {}

    export interface Source
      extends BaseIntrinsicPlugProps<HTMLSourceElement, "source">,
        ReactTypes.SourceHTMLAttributes<HTMLSourceElement> {}

    export interface Style
      extends BaseIntrinsicPlugProps<HTMLStyleElement, "style">,
        ReactTypes.StyleHTMLAttributes<HTMLStyleElement> {}

    export interface Table
      extends BaseIntrinsicPlugProps<HTMLTableElement, "table">,
        ReactTypes.TableHTMLAttributes<HTMLTableElement> {}

    export interface Td
      extends BaseIntrinsicPlugProps<HTMLTableDataCellElement, "td">,
        ReactTypes.TdHTMLAttributes<HTMLTableDataCellElement> {}

    export interface Textarea
      extends BaseIntrinsicPlugProps<HTMLTextAreaElement, "textarea">,
        ReactTypes.TextareaHTMLAttributes<HTMLTextAreaElement> {}

    export interface Th
      extends BaseIntrinsicPlugProps<HTMLTableHeaderCellElement, "th">,
        ReactTypes.ThHTMLAttributes<HTMLTableHeaderCellElement> {}
    /** @public */
    export interface Time
      extends BaseIntrinsicPlugProps<HTMLTimeElement, "time">,
        ReactTypes.TimeHTMLAttributes<HTMLTimeElement> {}
    /** @public */
    export interface Track
      extends BaseIntrinsicPlugProps<HTMLTrackElement, "track">,
        ReactTypes.TrackHTMLAttributes<HTMLTrackElement> {}
    /** @public */
    export interface Video
      extends BaseIntrinsicPlugProps<HTMLVideoElement, "video">,
        ReactTypes.VideoHTMLAttributes<HTMLVideoElement> {}
    /** @public */
    export interface WebView
      extends BaseIntrinsicPlugProps<HTMLWebViewElement, "webview">,
        ReactTypes.WebViewHTMLAttributes<HTMLWebViewElement> {}

    export interface Abbr extends HTML {
      as: "abbr";
    }
    export interface Address extends HTML {
      as: "address";
    }
    export interface Article extends HTML {
      as: "article";
    }
    export interface Aside extends HTML {
      as: "aside";
    }
    export interface B extends HTML {
      as: "b";
    }
    export interface Bdi extends HTML {
      as: "bdi";
    }
    export interface Bdo extends HTML {
      as: "bdo";
    }
    export interface Big extends HTML {
      as: "big";
    }
    export interface Body extends HTML<HTMLBodyElement> {
      as: "body";
    }
    export interface Br extends HTML<HTMLBRElement> {
      as: "br";
    }
    export interface Caption extends HTML {
      as: "caption";
    }
    export interface Center extends HTML {
      as: "center";
    }
    export interface Cite extends HTML {
      as: "cite";
    }
    export interface Code extends HTML {
      as: "code";
    }
    export interface Datalist extends HTML<HTMLDataListElement> {
      as: "datalist";
    }
    export interface Dd extends HTML {
      as: "dd";
    }
    export interface Dfn extends HTML {
      as: "dfn";
    }
    export interface Div extends HTML<HTMLDivElement> {
      as: "div";
    }
    export interface Dl extends HTML<HTMLDListElement> {
      as: "dl";
    }
    export interface Dt extends HTML {
      as: "dt";
    }
    export interface Em extends HTML {
      as: "em";
    }
    export interface Figcaption extends HTML {
      as: "figcaption";
    }
    export interface Figure extends HTML {
      as: "figure";
    }
    export interface Footer extends HTML {
      as: "footer";
    }
    export interface H1 extends HTML<HTMLHeadingElement> {
      as: "h1";
    }
    export interface H2 extends HTML<HTMLHeadingElement> {
      as: "h2";
    }
    export interface H3 extends HTML<HTMLHeadingElement> {
      as: "h3";
    }
    export interface H4 extends HTML<HTMLHeadingElement> {
      as: "h4";
    }
    export interface H5 extends HTML<HTMLHeadingElement> {
      as: "h5";
    }
    export interface H6 extends HTML<HTMLHeadingElement> {
      as: "h6";
    }
    export interface Head extends HTML<HTMLHeadElement> {
      as: "head";
    }
    export interface Header extends HTML {
      as: "header";
    }
    export interface Hgroup extends HTML {
      as: "hgroup";
    }
    export interface Hr extends HTML<HTMLHRElement> {
      as: "hr";
    }
    export interface I extends HTML {
      as: "i";
    }
    export interface Kbd extends HTML {
      as: "kbd";
    }
    export interface Legend extends HTML<HTMLLegendElement> {
      as: "legend";
    }
    export interface Main extends HTML {
      as: "main";
    }
    export interface Mark extends HTML {
      as: "mark";
    }
    export interface Menuitem extends HTML {
      as: "menuitem";
    }
    export interface Nav extends HTML {
      as: "nav";
    }
    export interface Noindex extends HTML {
      as: "noindex";
    }
    export interface Noscript extends HTML {
      as: "noscript";
    }
    export interface P extends HTML<HTMLParagraphElement> {
      as: "p";
    }
    export interface Picture extends HTML {
      as: "picture";
    }
    export interface Pre extends HTML<HTMLPreElement> {
      as: "pre";
    }
    export interface Rp extends HTML {
      as: "rp";
    }
    export interface Rt extends HTML {
      as: "rt";
    }
    export interface Ruby extends HTML {
      as: "ruby";
    }
    export interface S extends HTML {
      as: "s";
    }
    export interface Samp extends HTML {
      as: "samp";
    }
    export interface Search extends HTML {
      as: "search";
    }
    export interface Section extends HTML {
      as: "section";
    }
    export interface Small extends HTML {
      as: "small";
    }
    export interface Span extends HTML<HTMLSpanElement> {
      as: "span";
    }
    export interface Strong extends HTML {
      as: "strong";
    }
    export interface Sub extends HTML {
      as: "sub";
    }
    export interface Summary extends HTML {
      as: "summary";
    }
    export interface Sup extends HTML {
      as: "sup";
    }
    export interface Template extends HTML<HTMLTemplateElement> {
      as: "template";
    }
    export interface Tbody extends HTML<HTMLTableSectionElement> {
      as: "tbody";
    }
    export interface Tfoot extends HTML<HTMLTableSectionElement> {
      as: "tfoot";
    }
    export interface Thead extends HTML<HTMLTableSectionElement> {
      as: "thead";
    }
    export interface Title extends HTML<HTMLTitleElement> {
      as: "title";
    }
    export interface Tr extends HTML<HTMLTableRowElement> {
      as: "tr";
    }
    export interface U extends HTML {
      as: "u";
    }
    export interface Ul extends HTML<HTMLUListElement> {
      as: "ul";
    }
    export interface Var extends HTML {
      as: "var";
    }
    export interface Wbr extends HTML {
      as: "wbr";
    }
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

/**
 * @public
 *
 * A function that is used to render the outlet.
 * This function overrides the default rendering behavior of the outlet.
 *
 * > Similar to {@link React.RefCallback} and {@link React.EventHandler} dangerously render function
 * uses a bivariance hack to allow for more flexible types.
 *
 * > Here's more {@link https://dev.to/codeoz/how-i-understand-covariance-contravariance-in-typescript-2766 | information on type variance}
 */
export type PlugRenderFunction<
  E extends ReactTypes.JSX.Element = ReactTypes.JSX.Element
> = {
  bivarianceHack(element: E): ReactTypes.ReactNode;
}["bivarianceHack"];

interface DangerouslyRender<
  E extends ReactTypes.JSX.Element = ReactTypes.JSX.Element
> {
  dangerouslyRender?: PlugRenderFunction<E>;
}

interface IntrinsicDangerouslyRender<
  Type extends string,
  E,
  Attributes extends ReactTypes.HTMLAttributes<E>
> extends DangerouslyRender<
    ReactTypes.ReactElement<Attributes & ReactTypes.RefAttributes<E>, Type>
  > {}

/**
 * Base interface that all intrinsic plug props extend.
 */
export interface BaseIntrinsicPlugProps<E, Type extends string>
  extends ReactTypes.RefAttributes<E>,
    ReactTypes.DataAttributes,
    Required<PlugProps<Type>>,
    IntrinsicDangerouslyRender<Type, E, ReactTypes.HTMLAttributes<E>> {}

/**
 * Used internally to infer the type of plug props with extra
 * that are used internally properties.
 */
// TODO: find a better name
export interface InferencePlugProps extends PlugProps {
  children?: unknown;
  dangerouslyRender?: unknown;
}
/**
 * Used internally to infer the type of plug props that will be provided to the {@link outlet} method.
 * It has to have a required `as` property and it may have a `dangerouslyRender` method
 */
export interface OutletExoticComponentPlugProps extends Required<PlugProps> {
  dangerouslyRender?: unknown;
}
