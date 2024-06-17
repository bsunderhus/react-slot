import * as React from "react";
import type {
  PlugProps,
  MouseEventHandler,
  KeyboardEventHandler,
  Distributive,
} from "../index";

export type AriaButtonPlugProps = (
  | Partial<PlugProps.IntrinsicElements.Button>
  | PlugProps.IntrinsicElements.A
  | PlugProps.IntrinsicElements.Div
) & {
  disabled?: boolean;
  /**
   * When set, allows the button to be focusable even when it has been disabled.
   * This is used in scenarios where it is important to keep a consistent tab order
   * for screen reader and keyboard users. The primary example of this
   * pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.
   *
   * @default false
   */
  disabledFocusable?: boolean;
};

type IntrinsicAriaButtonPlugProps<Props extends AriaButtonPlugProps> =
  | Distributive.Omit<Extract<Props, { as?: "button" }>, "disabledFocusable">
  | Distributive.Omit<
      Extract<Props, { as: "a" | "div" }>,
      "disabled" | "disabledFocusable"
    >;

type AriaButtonRefElement =
  | HTMLButtonElement
  | HTMLAnchorElement
  | HTMLDivElement;

// TODO: find a way to stop breaking rule of hooks
export const useAriaButtonAdapter =
  () =>
  <Props extends AriaButtonPlugProps>(
    props: Props
  ): IntrinsicAriaButtonPlugProps<Props> => {
    const { disabled, disabledFocusable = false, ..._ } = props;

    const intrinsicProps = _ as IntrinsicAriaButtonPlugProps<Props>;

    const onClick: MouseEventHandler<AriaButtonRefElement> | undefined =
      props.onClick;
    const onKeyDown: KeyboardEventHandler<AriaButtonRefElement> | undefined =
      props.onKeyDown;
    const onKeyUp: KeyboardEventHandler<AriaButtonRefElement> | undefined =
      props.onKeyUp;

    const normalizedAriaDisabled =
      typeof props["aria-disabled"] === "string"
        ? props["aria-disabled"] === "true"
        : props["aria-disabled"];

    const isDisabled = disabled || disabledFocusable || normalizedAriaDisabled;

    const handleClick: MouseEventHandler<
      HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
    > = React.useCallback(
      (event) => {
        if (isDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      },
      [onClick, isDisabled]
    );

    const handleNotAButtonKeyDown: KeyboardEventHandler<
      HTMLAnchorElement | HTMLDivElement
    > = React.useCallback(
      (event) => {
        onKeyDown?.(event);

        if (event.isDefaultPrevented()) {
          return;
        }

        if (isDisabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        if (event.key === " ") {
          event.preventDefault();
          return;
        }
        // If enter is pressed, activate the button
        if (event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.click();
        }
      },
      [onKeyDown, isDisabled]
    );

    const handleNotAButtonKeyUp: KeyboardEventHandler<
      HTMLAnchorElement | HTMLDivElement
    > = React.useCallback(
      (event) => {
        onKeyUp?.(event);
        if (event.isDefaultPrevented()) {
          return;
        }
        if (isDisabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        if (event.key === " ") {
          event.preventDefault();
          event.currentTarget.click();
        }
      },
      [onKeyUp, isDisabled]
    );

    // If a <button> tag is to be rendered we need to set disabled, aria-disabled and provide the correct handlers
    if (intrinsicProps.as === "button" || intrinsicProps.as === undefined) {
      intrinsicProps.disabled = disabled && !disabledFocusable;
      intrinsicProps["aria-disabled"] = normalizedAriaDisabled;
      // onClick should still use internal handler to ensure prevention if disabled
      // if disabledFocusable then there's no requirement for handlers as those events should not be propagated
      intrinsicProps.onClick = handleClick;
      // if disabledFocusable then there's no requirement for handlers as those events should not be propagated
      // and aria-disabled should be set to true
      if (disabledFocusable) {
        intrinsicProps["aria-disabled"] = true;
        delete intrinsicProps.onClick;
        delete intrinsicProps.onKeyUp;
        delete intrinsicProps.onKeyDown;
      }
      return intrinsicProps;
    }

    // If an <a> or <div> we have to set aria-disabled, role, tabIndex and provide the correct handlers
    intrinsicProps.role ??= "button";
    intrinsicProps.tabIndex ??= disabled && !disabledFocusable ? undefined : 0;
    intrinsicProps["aria-disabled"] = isDisabled;
    intrinsicProps.onClick = handleClick;
    intrinsicProps.onKeyUp = handleNotAButtonKeyUp;
    intrinsicProps.onKeyDown = handleNotAButtonKeyDown;

    if (intrinsicProps.as === "a" && isDisabled) {
      delete intrinsicProps.href;
    }

    return intrinsicProps;
  };
