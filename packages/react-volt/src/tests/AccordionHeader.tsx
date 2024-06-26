import * as React from "react";
import {
  type Default,
  type Distributive,
  type LockedIn,
  type Outlet,
  type Plug,
  type PlugProps,
  type SlotCompat,
  type Unlocked,
  outlet,
  plug,
} from "../index";
import {
  type AriaButtonProps,
  useAriaButtonProps,
} from "./useARIAButtonAdapter";
export type AccordionHeaderSize = "small" | "medium" | "large" | "extra-large";
export type AccordionHeaderExpandIconPosition = "start" | "end";

type AccordionHeaderButtonElement = HTMLButtonElement | HTMLAnchorElement;

export type AccordionHeaderProps = SlotCompat.WithoutSlotRenderFunction<
  | Default<PlugProps.Intrinsics["div"]>
  | PlugProps.Intrinsics["h1" | "h2" | "h3" | "h4" | "h5" | "h6"]
> & {
  /**
   * The component to be used as button in heading
   */
  button?: LockedIn<Plug<AriaButtonProps["button" | "a"]>>;
  /**
   * Expand icon plug rendered before (or after) children content in heading.
   */
  expandIcon?: Plug<Default<PlugProps.Intrinsics["span"]>>;
  /**
   * Expand icon plug rendered before (or after) children content in heading.
   */
  icon?: Plug<Default<PlugProps.Intrinsics["span"]>>;
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
  expandIcon: Unlocked<Outlet<"span">>;
  icon: Unlocked<Outlet<"span">>;
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

  const buttonProps = plug.resolveShorthand(button);

  const onButtonClick:
    | Distributive.MouseEventHandler<AccordionHeaderButtonElement>
    | undefined = buttonProps.onClick;

  const handleClick: Distributive.MouseEventHandler<AccordionHeaderButtonElement> =
    React.useCallback((event) => {
      onButtonClick?.(event);
      if (!event.defaultPrevented) {
        // requestToggle({ value, event });
      }
    }, []);

  const state: AccordionHeaderState = {
    inline,
    root: outlet("div", props),
    icon: outlet("span", icon),
    expandIcon: outlet(
      "span",
      plug.merge(<i>some default icon</i>, expandIcon)
    ),
    button: outlet(
      "button",
      useAriaButtonProps(
        plug.merge(buttonProps, {
          onClick: handleClick,
        })
      )
    ),
  };
  return state;
};
