import * as React from "react";
import type * as Distributive from "react-distributive-types";
import { Default, LockedIn, Plug, PlugProps, Unlocked, plug } from "react-volt";
import { expectTypeOf } from "react-volt/test";
import {
  AriaButtonAProps,
  AriaButtonButtonProps,
  useAriaButtonProps,
} from "./useARIAButtonAdapter";
export type AccordionHeaderSize = "small" | "medium" | "large" | "extra-large";
export type AccordionHeaderExpandIconPosition = "start" | "end";

type AccordionHeaderButtonElement = HTMLButtonElement | HTMLAnchorElement;

export type AccordionHeaderProps = (
  | Default<PlugProps.Intrinsics["div"]>
  | PlugProps.Intrinsics["h1" | "h2" | "h3" | "h4" | "h5" | "h6"]
) & {
  /**
   * The component to be used as button in heading
   */
  button?: LockedIn<Plug<AriaButtonButtonProps | AriaButtonAProps>>;
  /**
   * Expand icon plug rendered before (or after) children content in heading.
   */
  expandIcon?: Plug<Default<PlugProps.Intrinsics.Span>>;
  /**
   * Expand icon plug rendered before (or after) children content in heading.
   */
  icon?: Plug<Default<PlugProps.Intrinsics.Span>>;
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
  root: PlugProps.Intrinsics["div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"];
  button: PlugProps.Intrinsics.Button | PlugProps.Intrinsics.A;
  expandIcon: Unlocked<PlugProps.Intrinsics.Span>;
  icon: Unlocked<PlugProps.Intrinsics.Span>;
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
    ...rest
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
    | React.MouseEventHandler<AccordionHeaderButtonElement>
    | undefined = buttonProps.onClick;

  const state = {
    inline,
    root: { as: "div" as const, ...rest },
    icon: plug.extend({ as: "span" }, icon),
    expandIcon: plug.extend(
      { as: "span" },
      <i>some default icon</i>,
      expandIcon
    ),
    button: {
      as: "button" as const,
      ...useAriaButtonProps(buttonProps),
      onClick: React.useCallback(
        (event: React.MouseEvent<AccordionHeaderButtonElement>) => {
          onButtonClick?.(event);
          if (!event.defaultPrevented) {
            // requestToggle({ value, event });
          }
        },
        []
      ),
    },
  };

  /* @__PURE__ */ expectTypeOf(state.root).toEquivalentTypeOf<
    AccordionHeaderState["root"]
  >();

  /* @__PURE__ */ expectTypeOf(state.icon).toEquivalentTypeOf<
    AccordionHeaderState["icon"]
  >();

  /* @__PURE__ */ expectTypeOf(state.expandIcon).toEquivalentTypeOf<
    AccordionHeaderState["expandIcon"]
  >();

  /* @__PURE__ */ expectTypeOf(state.button).toEquivalentTypeOf<
    AccordionHeaderState["button"]
  >();

  return state;
};
