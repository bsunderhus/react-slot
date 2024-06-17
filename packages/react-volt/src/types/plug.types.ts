import type * as ReactTypes from "./react.types";
import type { Never, PickDefault } from "./helper.types";
import type { _$unplugged } from "../constants";

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
export type Plug<Props extends PlugProps = PlugProps> =
  | Props
  | Plug.Shorthand<Props>
  | Plug.Unplugged;

/**
 * @public
 *
 * Namespace for the Plug. It contains the alternative types of plugs that can be used:
 *
 * 1. {@link Plug.Shorthand} - A Shorthand plug is a simplified version of a plug props, it is equivalent to `{children: someValue}`.
 * 2. {@link Plug.Unplugged} - An unplugged plug is a plug that is not connected to an outlet. It is equivalent to an abort signal in a promise.
 * 3. {@link Plug.LockedIn} - A locked in plug is a plug that is connected to an outlet and cannot be removed. This removes the possibility of opting-out of an outlet - It's equivalent to excluding {@link Plug.Unplugged} from a plug type.
 *
 */
export namespace Plug {
  /**
   * @public
   *
   * A Shorthand plug is a simplified version of a plug props,
   * it is equivalent to `{children: someValue}`.
   *
   */
  export type Shorthand<Props extends PlugProps = PlugProps> = Extract<
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

  /**
   * @public
   *
   * A locked in plug is a plug that is connected to an outlet and cannot be removed.
   * This removes the possibility of opting-out of an outlet.
   *
   * > **Note:** _In the context of electrical systems a Lock-in plug is a plug with a lock mechanism to avoid it from being accidentally unplugged._
   */
  export type LockedIn<Props extends PlugProps = PlugProps> =
    | Props
    | Plug.Shorthand<Props>;
}

/**
 * @public
 */
export interface PlugProps {
  as?: PlugProps.Type;
  children?: unknown;
}

/** @public */
export namespace PlugProps {
  /**
   * @public
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

  /** @public */
  export namespace IntrinsicElements {
    /** @public */
    export interface HTML<E, T extends keyof ReactTypes.JSX.IntrinsicElements>
      extends ReactTypes.HTMLAttributes<E>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<E> {
      as: T;
    }

    /** @public */
    export interface SVG<E, T extends keyof ReactTypes.JSX.IntrinsicElements>
      extends ReactTypes.SVGAttributes<E>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<E> {
      as: T;
    }

    /** @public */
    export interface A
      extends ReactTypes.AnchorHTMLAttributes<HTMLAnchorElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLAnchorElement> {
      as: "a";
    }
    /** @public */
    export interface Area
      extends Omit<ReactTypes.AreaHTMLAttributes<HTMLAreaElement>, "children">,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLAreaElement> {
      as: "area";
    }
    /** @public */
    export interface Audio
      extends ReactTypes.AudioHTMLAttributes<HTMLAudioElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLAudioElement> {
      as: "audio";
    }
    /** @public */
    export interface Base
      extends ReactTypes.BaseHTMLAttributes<HTMLBaseElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLBaseElement> {
      as: "base";
    }
    /** @public */
    export interface Blockquote
      extends ReactTypes.BlockquoteHTMLAttributes<HTMLQuoteElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLQuoteElement> {
      as: "blockquote";
    }
    /** @public */
    export interface Button
      extends ReactTypes.ButtonHTMLAttributes<HTMLButtonElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLButtonElement> {
      as: "button";
    }
    /** @public */
    export interface Canvas
      extends ReactTypes.CanvasHTMLAttributes<HTMLCanvasElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLCanvasElement> {
      as: "canvas";
    }
    /** @public */
    export interface Col
      extends Omit<
          ReactTypes.ColHTMLAttributes<HTMLTableColElement>,
          "children"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTableColElement> {
      as: "col";
    }
    /** @public */
    export interface Colgroup
      extends ReactTypes.ColgroupHTMLAttributes<HTMLTableColElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTableColElement> {
      as: "colgroup";
    }
    /** @public */
    export interface Data
      extends ReactTypes.DataHTMLAttributes<HTMLDataElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLDataElement> {
      as: "data";
    }
    /** @public */
    export interface Del
      extends ReactTypes.DelHTMLAttributes<HTMLModElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLModElement> {
      as: "del";
    }
    /** @public */
    export interface Details
      extends ReactTypes.DetailsHTMLAttributes<HTMLDetailsElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLDetailsElement> {
      as: "details";
    }
    /** @public */
    export interface Dialog
      extends ReactTypes.DialogHTMLAttributes<HTMLDialogElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLDialogElement> {
      as: "dialog";
    }
    /** @public */
    export interface Embed
      extends Omit<
          ReactTypes.EmbedHTMLAttributes<HTMLEmbedElement>,
          "children"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLEmbedElement> {
      as: "embed";
    }
    /** @public */
    export interface Fieldset
      extends ReactTypes.FieldsetHTMLAttributes<HTMLFieldSetElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLFieldSetElement> {
      as: "fieldset";
    }
    /** @public */
    export interface Form
      extends ReactTypes.FormHTMLAttributes<HTMLFormElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLFormElement> {
      as: "form";
    }
    /** @public */
    export interface Html
      extends ReactTypes.HtmlHTMLAttributes<HTMLHtmlElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLHtmlElement> {
      as: "html";
    }
    /** @public */
    export interface Iframe
      extends ReactTypes.IframeHTMLAttributes<HTMLIFrameElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLIFrameElement> {
      as: "iframe";
    }
    /** @public */
    export interface Img
      extends Omit<ReactTypes.ImgHTMLAttributes<HTMLImageElement>, "children">,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLImageElement> {
      as: "img";
    }
    /** @public */
    export interface Input
      extends Omit<
          ReactTypes.InputHTMLAttributes<HTMLInputElement>,
          "children"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLInputElement> {
      as: "input";
    }
    /** @public */
    export interface Ins
      extends ReactTypes.InsHTMLAttributes<HTMLModElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLModElement> {
      as: "ins";
    }
    /** @public */
    export interface Keygen
      extends ReactTypes.KeygenHTMLAttributes<HTMLElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLElement> {
      as: "keygen";
    }
    /** @public */
    export interface Label
      extends ReactTypes.LabelHTMLAttributes<HTMLLabelElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLLabelElement> {
      as: "label";
    }
    /** @public */
    export interface Li
      extends ReactTypes.LiHTMLAttributes<HTMLLIElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLLIElement> {
      as: "li";
    }
    /** @public */
    export interface Link
      extends Omit<
          ReactTypes.LinkHTMLAttributes<HTMLLinkElement>,
          "children" | "as"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLLinkElement> {
      as: "link";
    }
    /** @public */
    export interface Map
      extends ReactTypes.MapHTMLAttributes<HTMLMapElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLMapElement> {
      as: "map";
    }
    /** @public */
    export interface Menu
      extends ReactTypes.MenuHTMLAttributes<HTMLElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLElement> {
      as: "menu";
    }
    /** @public */
    export interface Meta
      extends ReactTypes.MetaHTMLAttributes<HTMLMetaElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLMetaElement> {
      as: "meta";
    }
    /** @public */
    export interface Meter
      extends ReactTypes.MeterHTMLAttributes<HTMLMeterElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLMeterElement> {
      as: "meter";
    }
    /** @public */
    export interface Object
      extends ReactTypes.ObjectHTMLAttributes<HTMLObjectElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLObjectElement> {
      as: "object";
    }
    /** @public */
    export interface Ol
      extends ReactTypes.OlHTMLAttributes<HTMLOListElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLOListElement> {
      as: "ol";
    }
    /** @public */
    export interface Optgroup
      extends ReactTypes.OptgroupHTMLAttributes<HTMLOptGroupElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLOptGroupElement> {
      as: "optgroup";
    }
    /** @public */
    export interface Option
      extends ReactTypes.OptionHTMLAttributes<HTMLOptionElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLOptionElement> {
      as: "option";
    }
    /** @public */
    export interface Output
      extends ReactTypes.OutputHTMLAttributes<HTMLOutputElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLOutputElement> {
      as: "output";
    }
    /** @public */
    export interface Param
      extends Omit<
          ReactTypes.ParamHTMLAttributes<HTMLParamElement>,
          "children"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLParamElement> {
      as: "param";
    }
    /** @public */
    export interface Progress
      extends ReactTypes.ProgressHTMLAttributes<HTMLProgressElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLProgressElement> {
      as: "progress";
    }
    /** @public */
    export interface Quote
      extends ReactTypes.QuoteHTMLAttributes<HTMLQuoteElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLQuoteElement> {
      as: "q";
    }
    /** @public */
    export interface Slot
      extends ReactTypes.SlotHTMLAttributes<HTMLSlotElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLSlotElement> {
      as: "slot";
    }
    /** @public */
    export interface Script
      extends ReactTypes.ScriptHTMLAttributes<HTMLScriptElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLScriptElement> {
      as: "script";
    }
    /** @public */
    export interface Select
      extends ReactTypes.SelectHTMLAttributes<HTMLSelectElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLSelectElement> {
      as: "select";
    }
    /** @public */
    export interface Source
      extends Omit<
          ReactTypes.SourceHTMLAttributes<HTMLSourceElement>,
          "children"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLSourceElement> {
      as: "source";
    }
    /** @public */
    export interface Style
      extends ReactTypes.StyleHTMLAttributes<HTMLStyleElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLStyleElement> {
      as: "style";
    }
    /** @public */
    export interface Table
      extends ReactTypes.TableHTMLAttributes<HTMLTableElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTableElement> {
      as: "table";
    }
    /** @public */
    export interface Td
      extends ReactTypes.TdHTMLAttributes<HTMLTableDataCellElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTableDataCellElement> {
      as: "td";
    }
    /** @public */
    export interface Textarea
      extends ReactTypes.TextareaHTMLAttributes<HTMLTextAreaElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTextAreaElement> {
      as: "textarea";
    }
    /** @public */
    export interface Th
      extends ReactTypes.ThHTMLAttributes<HTMLTableHeaderCellElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTableHeaderCellElement> {
      as: "th";
    }
    /** @public */
    export interface Time
      extends ReactTypes.TimeHTMLAttributes<HTMLTimeElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTimeElement> {
      as: "time";
    }
    /** @public */
    export interface Track
      extends Omit<
          ReactTypes.TrackHTMLAttributes<HTMLTrackElement>,
          "children"
        >,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLTrackElement> {
      as: "track";
    }
    /** @public */
    export interface Video
      extends ReactTypes.VideoHTMLAttributes<HTMLVideoElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLVideoElement> {
      as: "video";
    }
    /** @public */
    export interface WebView
      extends ReactTypes.WebViewHTMLAttributes<HTMLWebViewElement>,
        ReactTypes.HTMLDataAttributes,
        ReactTypes.RefAttributes<HTMLWebViewElement> {
      as: "webview";
    }

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

  /** @public */
  export interface IntrinsicElements {
    // HTML
    a: IntrinsicElements.A;
    abbr: IntrinsicElements.Abbr;
    address: IntrinsicElements.Address;
    area: IntrinsicElements.Area;
    article: IntrinsicElements.Article;
    aside: IntrinsicElements.Aside;
    audio: IntrinsicElements.Audio;
    b: IntrinsicElements.B;
    base: IntrinsicElements.Base;
    bdi: IntrinsicElements.Bdi;
    bdo: IntrinsicElements.Bdo;
    big: IntrinsicElements.Big;
    blockquote: IntrinsicElements.Blockquote;
    body: IntrinsicElements.Body;
    br: IntrinsicElements.Br;
    button: IntrinsicElements.Button;
    canvas: IntrinsicElements.Canvas;
    caption: IntrinsicElements.Caption;
    center: IntrinsicElements.Center;
    cite: IntrinsicElements.Cite;
    code: IntrinsicElements.Code;
    col: IntrinsicElements.Col;
    colgroup: IntrinsicElements.Colgroup;
    data: IntrinsicElements.Data;
    datalist: IntrinsicElements.Datalist;
    dd: IntrinsicElements.Dd;
    del: IntrinsicElements.Del;
    details: IntrinsicElements.Details;
    dfn: IntrinsicElements.Dfn;
    dialog: IntrinsicElements.Dialog;
    div: IntrinsicElements.Div;
    dl: IntrinsicElements.Dl;
    dt: IntrinsicElements.Dt;
    em: IntrinsicElements.Em;
    embed: IntrinsicElements.Embed;
    fieldset: IntrinsicElements.Fieldset;
    figcaption: IntrinsicElements.Figcaption;
    figure: IntrinsicElements.Figure;
    footer: IntrinsicElements.Footer;
    form: IntrinsicElements.Form;
    h1: IntrinsicElements.H1;
    h2: IntrinsicElements.H2;
    h3: IntrinsicElements.H3;
    h4: IntrinsicElements.H4;
    h5: IntrinsicElements.H5;
    h6: IntrinsicElements.H6;
    head: IntrinsicElements.Head;
    header: IntrinsicElements.Header;
    hgroup: IntrinsicElements.Hgroup;
    hr: IntrinsicElements.Hr;
    html: IntrinsicElements.Html;
    i: IntrinsicElements.I;
    iframe: IntrinsicElements.Iframe;
    img: IntrinsicElements.Img;
    input: IntrinsicElements.Input;
    ins: IntrinsicElements.Ins;
    kbd: IntrinsicElements.Kbd;
    keygen: IntrinsicElements.Keygen;
    label: IntrinsicElements.Label;
    legend: IntrinsicElements.Legend;
    li: IntrinsicElements.Li;
    link: IntrinsicElements.Link;
    main: IntrinsicElements.Main;
    map: IntrinsicElements.Map;
    mark: IntrinsicElements.Mark;
    menu: IntrinsicElements.Menu;
    menuitem: IntrinsicElements.Menuitem;
    meta: IntrinsicElements.Meta;
    meter: IntrinsicElements.Meter;
    nav: IntrinsicElements.Nav;
    noindex: IntrinsicElements.Noindex;
    noscript: IntrinsicElements.Noscript;
    object: IntrinsicElements.Object;
    ol: IntrinsicElements.Ol;
    optgroup: IntrinsicElements.Optgroup;
    option: IntrinsicElements.Option;
    output: IntrinsicElements.Output;
    p: IntrinsicElements.P;
    param: IntrinsicElements.Param;
    picture: IntrinsicElements.Picture;
    pre: IntrinsicElements.Pre;
    progress: IntrinsicElements.Progress;
    q: IntrinsicElements.Quote;
    rp: IntrinsicElements.Rp;
    rt: IntrinsicElements.Rt;
    ruby: IntrinsicElements.Ruby;
    s: IntrinsicElements.S;
    samp: IntrinsicElements.Samp;
    search: IntrinsicElements.Search;
    slot: IntrinsicElements.Slot;
    script: IntrinsicElements.Script;
    section: IntrinsicElements.Section;
    select: IntrinsicElements.Select;
    small: IntrinsicElements.Small;
    source: IntrinsicElements.Source;
    span: IntrinsicElements.Span;
    strong: IntrinsicElements.Strong;
    style: IntrinsicElements.Style;
    sub: IntrinsicElements.Sub;
    summary: IntrinsicElements.Summary;
    sup: IntrinsicElements.Sup;
    table: IntrinsicElements.Table;
    template: IntrinsicElements.Template;
    tbody: IntrinsicElements.Tbody;
    td: IntrinsicElements.Td;
    textarea: IntrinsicElements.Textarea;
    tfoot: IntrinsicElements.Tfoot;
    th: IntrinsicElements.Th;
    thead: IntrinsicElements.Thead;
    time: IntrinsicElements.Time;
    title: IntrinsicElements.Title;
    tr: IntrinsicElements.Tr;
    track: IntrinsicElements.Track;
    u: IntrinsicElements.U;
    ul: IntrinsicElements.Ul;
    var: IntrinsicElements.Var;
    video: IntrinsicElements.Video;
    wbr: IntrinsicElements.Wbr;
    webview: IntrinsicElements.WebView;

    // SVG
    svg: IntrinsicElements.SVG<SVGSVGElement, "svg">;

    animate: IntrinsicElements.SVG<SVGElement, "animate">; // TODO: It is, 'TODO' SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
    animateMotion: IntrinsicElements.SVG<SVGElement, "animateMotion">;
    animateTransform: IntrinsicElements.SVG<SVGElement, "animateTransform">; // TODO: It is, 'TODO' SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
    circle: IntrinsicElements.SVG<SVGCircleElement, "circle">;
    clipPath: IntrinsicElements.SVG<SVGClipPathElement, "clipPath">;
    defs: IntrinsicElements.SVG<SVGDefsElement, "defs">;
    desc: IntrinsicElements.SVG<SVGDescElement, "desc">;
    ellipse: IntrinsicElements.SVG<SVGEllipseElement, "ellipse">;
    feBlend: IntrinsicElements.SVG<SVGFEBlendElement, "feBlend">;
    feColorMatrix: IntrinsicElements.SVG<
      SVGFEColorMatrixElement,
      "feColorMatrix"
    >;
    feComponentTransfer: IntrinsicElements.SVG<
      SVGFEComponentTransferElement,
      "feComponentTransfer"
    >;
    feComposite: IntrinsicElements.SVG<SVGFECompositeElement, "feComposite">;
    feConvolveMatrix: IntrinsicElements.SVG<
      SVGFEConvolveMatrixElement,
      "feConvolveMatrix"
    >;
    feDiffuseLighting: IntrinsicElements.SVG<
      SVGFEDiffuseLightingElement,
      "feDiffuseLighting"
    >;
    feDisplacementMap: IntrinsicElements.SVG<
      SVGFEDisplacementMapElement,
      "feDisplacementMap"
    >;
    feDistantLight: IntrinsicElements.SVG<
      SVGFEDistantLightElement,
      "feDistantLight"
    >;
    feDropShadow: IntrinsicElements.SVG<SVGFEDropShadowElement, "feDropShadow">;
    feFlood: IntrinsicElements.SVG<SVGFEFloodElement, "feFlood">;
    feFuncA: IntrinsicElements.SVG<SVGFEFuncAElement, "feFuncA">;
    feFuncB: IntrinsicElements.SVG<SVGFEFuncBElement, "feFuncB">;
    feFuncG: IntrinsicElements.SVG<SVGFEFuncGElement, "feFuncG">;
    feFuncR: IntrinsicElements.SVG<SVGFEFuncRElement, "feFuncR">;
    feGaussianBlur: IntrinsicElements.SVG<
      SVGFEGaussianBlurElement,
      "feGaussianBlur"
    >;
    feImage: IntrinsicElements.SVG<SVGFEImageElement, "feImage">;
    feMerge: IntrinsicElements.SVG<SVGFEMergeElement, "feMerge">;
    feMergeNode: IntrinsicElements.SVG<SVGFEMergeNodeElement, "feMergeNode">;
    feMorphology: IntrinsicElements.SVG<SVGFEMorphologyElement, "feMorphology">;
    feOffset: IntrinsicElements.SVG<SVGFEOffsetElement, "feOffset">;
    fePointLight: IntrinsicElements.SVG<SVGFEPointLightElement, "fePointLight">;
    feSpecularLighting: IntrinsicElements.SVG<
      SVGFESpecularLightingElement,
      "feSpecularLighting"
    >;
    feSpotLight: IntrinsicElements.SVG<SVGFESpotLightElement, "feSpotLight">;
    feTile: IntrinsicElements.SVG<SVGFETileElement, "feTile">;
    feTurbulence: IntrinsicElements.SVG<SVGFETurbulenceElement, "feTurbulence">;
    filter: IntrinsicElements.SVG<SVGFilterElement, "filter">;
    foreignObject: IntrinsicElements.SVG<
      SVGForeignObjectElement,
      "foreignObject"
    >;
    g: IntrinsicElements.SVG<SVGGElement, "g">;
    image: IntrinsicElements.SVG<SVGImageElement, "image">;
    line: IntrinsicElements.SVG<SVGLineElement, "line">;
    linearGradient: IntrinsicElements.SVG<
      SVGLinearGradientElement,
      "linearGradient"
    >;
    marker: IntrinsicElements.SVG<SVGMarkerElement, "marker">;
    mask: IntrinsicElements.SVG<SVGMaskElement, "mask">;
    metadata: IntrinsicElements.SVG<SVGMetadataElement, "metadata">;
    mpath: IntrinsicElements.SVG<SVGElement, "mpath">;
    path: IntrinsicElements.SVG<SVGPathElement, "path">;
    pattern: IntrinsicElements.SVG<SVGPatternElement, "pattern">;
    polygon: IntrinsicElements.SVG<SVGPolygonElement, "polygon">;
    polyline: IntrinsicElements.SVG<SVGPolylineElement, "polyline">;
    radialGradient: IntrinsicElements.SVG<
      SVGRadialGradientElement,
      "radialGradient"
    >;
    rect: IntrinsicElements.SVG<SVGRectElement, "rect">;
    stop: IntrinsicElements.SVG<SVGStopElement, "stop">;
    switch: IntrinsicElements.SVG<SVGSwitchElement, "switch">;
    symbol: IntrinsicElements.SVG<SVGSymbolElement, "symbol">;
    text: IntrinsicElements.SVG<SVGTextElement, "text">;
    textPath: IntrinsicElements.SVG<SVGTextPathElement, "textPath">;
    tspan: IntrinsicElements.SVG<SVGTSpanElement, "tspan">;
    use: IntrinsicElements.SVG<SVGUseElement, "use">;
    view: IntrinsicElements.SVG<SVGViewElement, "view">;
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
