import * as React from "react";
import {
  Distributive,
  MouseEventHandler,
  Outlet,
  Plug,
  PlugProps,
  outlet,
  plug,
} from "../index";
import {
  AriaButtonPlugProps,
  useAriaButtonAdapter,
} from "./useARIAButtonAdapter";
export type AccordionHeaderSize = "small" | "medium" | "large" | "extra-large";
export type AccordionHeaderExpandIconPosition = "start" | "end";

type AccordionHeaderButtonElement = HTMLButtonElement | HTMLAnchorElement;

export type AccordionHeaderProps = (
  | Partial<PlugProps.IntrinsicElements.Div>
  | PlugProps.IntrinsicElements.H1
  | PlugProps.IntrinsicElements.H2
  | PlugProps.IntrinsicElements.H3
  | PlugProps.IntrinsicElements.H4
  | PlugProps.IntrinsicElements.H5
  | PlugProps.IntrinsicElements.H6
) & {
  /**
   * The component to be used as button in heading
   */
  button?: Plug.LockedIn<
    Extract<
      AriaButtonPlugProps,
      Partial<
        PlugProps.IntrinsicElements.Button | PlugProps.IntrinsicElements.A
      >
    >
  >;
  /**
   * Expand icon plug rendered before (or after) children content in heading.
   */
  expandIcon?: Plug<Partial<PlugProps.IntrinsicElements.Span>>;
  /**
   * Expand icon plug rendered before (or after) children content in heading.
   */
  icon?: Plug<Partial<PlugProps.IntrinsicElements.Span>>;
  /**
   * The position of the expand  icon plug in heading.
   */
  expandIconPosition?: AccordionHeaderExpandIconPosition;

  /**
   * Indicates if the AccordionHeader should be rendered inline.
   */
  inline?: boolean;

  /**
   * Size of spacing in the heading.
   */
  size?: AccordionHeaderSize;
};

export type AccordionHeaderState = Required<
  Distributive.Pick<AccordionHeaderProps, "inline">
> & {
  root: Outlet<"div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
  button: Outlet<"button" | "a">;
  expandIcon?: Outlet<"span">;
  icon?: Outlet<"span">;
};

/**
 * Returns the props and state required to render the component
 * @param props - AccordionHeader properties
 * @param ref - reference to root HTMLElement of AccordionHeader
 */
export const useAccordionHeader = (
  props: AccordionHeaderProps
): AccordionHeaderState => {
  const {
    icon = plug.unplugged(),
    button = plug.pluggedIn({}),
    expandIcon = plug.pluggedIn({}),
    inline = false,
    size = "medium",
    expandIconPosition = "start",
  } = props;

  const ariaButtonAdapter = useAriaButtonAdapter();

  /**
   * force disabled state on button if accordion isn't collapsible
   * and this is the only item opened
   */
  const disabledFocusable = false;
  const open = false;
  const dir = "rtl";
  const disabled = false;

  // Calculate how to rotate the expand icon [>] (ChevronRightRegular)
  let expandIconRotation: 0 | 90 | -90 | 180;
  if (expandIconPosition === "end") {
    // If expand icon is at the end, the chevron points up [^] when open, and down [v] when closed
    expandIconRotation = open ? -90 : 90;
  } else {
    // Otherwise, the chevron points down [v] when open, and right [>] (or left [<] in RTL) when closed
    expandIconRotation = open ? 90 : dir !== "rtl" ? 0 : 180;
  }

  const onButtonClick:
    | MouseEventHandler<AccordionHeaderButtonElement>
    | undefined = plug.resolve(button).onClick;

  const handleClick: MouseEventHandler<AccordionHeaderButtonElement> =
    React.useCallback((event) => {
      onButtonClick?.(event);
      if (!event.defaultPrevented) {
        // requestToggle({ value, event });
      }
    }, []);

  const state: AccordionHeaderState = {
    inline,
    root: outlet.lockedIn("div", props),
    icon: outlet("span", icon),
    expandIcon: outlet("span", expandIcon),
    button: outlet.lockedIn(
      "button",
      plug.adapt(
        button,
        (buttonProps) => ({
          ...buttonProps,
          onClick: handleClick,
        }),
        ariaButtonAdapter
      )
    ),
  };
  return state;
};
