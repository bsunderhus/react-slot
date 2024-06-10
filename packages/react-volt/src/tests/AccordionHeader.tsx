import * as React from "react";
import {
  LockedIn,
  MainPlug,
  MouseEventHandler,
  Optional,
  Outlet,
  Plug,
  PlugProps,
  PlugRefElement,
  outlet,
  plug,
} from "../index";
import {
  AriaButtonPlugProps,
  useAriaButtonAdapter,
} from "./useARIAButtonAdapter";
import { Button } from "./Button";
export type AccordionHeaderSize = "small" | "medium" | "large" | "extra-large";
export type AccordionHeaderExpandIconPosition = "start" | "end";

type ButtonPlugProps = PlugProps<AriaButtonPlugProps<"a">>;

export type AccordionHeaderProps = MainPlug<
  "div?" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
> & {
  /**
   * The component to be used as button in heading
   */
  button?: LockedIn<Plug<ButtonPlugProps | React.FC<ButtonPlugProps>>>;
  /**
   * Expand icon plug rendered before (or after) children content in heading.
   */
  expandIcon?: Plug<"span?">;
  /**
   * Expand icon plug rendered before (or after) children content in heading.
   */
  icon?: Plug<"div?">;
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
  Pick<AccordionHeaderProps, "inline">
> & {
  root: Outlet<"div" | "h1?" | "h2?" | "h3?" | "h4?" | "h5?" | "h6?">;
  button: Outlet<"button" | "a?" | Optional<React.FC<ButtonPlugProps>>>;
  expandIcon?: Outlet<"span">;
  icon?: Outlet<"div">;
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

  const onButtonClick:
    | MouseEventHandler<PlugRefElement<AriaButtonPlugProps<"a">>>
    | undefined = plug.resolve(button).onClick;

  const handleClick: MouseEventHandler<
    PlugRefElement<AriaButtonPlugProps<"a">>
  > = React.useCallback((event) => {
    onButtonClick?.(event);
    if (!event.defaultPrevented) {
      // requestToggle({ value, event });
    }
  }, []);

  const state: AccordionHeaderState = {
    inline,
    root: outlet.lockedIn<
      "div" | "h1?" | "h2?" | "h3?" | "h4?" | "h5?" | "h6?"
    >("div", props),
    icon: outlet("div", icon),
    expandIcon: outlet("span", expandIcon),
    button: outlet.lockedIn<
      "button" | "a?" | Optional<React.FC<ButtonPlugProps>>
    >(
      "button",
      plug.adapt(
        button,
        (buttonProps) => ({ ...buttonProps, onClick: handleClick }),
        useAriaButtonAdapter<"a">
      )
    ),
  };
  return state;
};
