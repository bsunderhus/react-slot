import * as React from "react";
import type { PlugProps, Default } from "react-volt";

export interface AriaButtonProps<E extends HTMLElement = AriaButtonElement> {
  as?: "button" | "a" | "div";
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
  onClick?: React.MouseEventHandler<E>;
  onKeyDown?: React.KeyboardEventHandler<E>;
  onKeyUp?: React.KeyboardEventHandler<E>;
  "aria-disabled"?: boolean | "true" | "false";
  role?: React.AriaRole;
  tabIndex?: number;
}

export interface AriaButtonButtonProps
  extends AriaButtonProps<HTMLButtonElement>,
    Default<PlugProps.Intrinsics.Button> {
  as?: "button";
}

export interface AriaButtonAProps
  extends AriaButtonProps<HTMLAnchorElement>,
    PlugProps.Intrinsics.A {
  as: "a";
}

export interface AriaButtonDivProps
  extends AriaButtonProps<HTMLDivElement>,
    PlugProps.Intrinsics.Div {
  as: "div";
}

type AriaNoButtonElement = HTMLAnchorElement | HTMLDivElement;
type AriaButtonElement = HTMLButtonElement | AriaNoButtonElement;

type AriaButtonPropsResult<Props extends AriaButtonProps> =
  Props extends AriaButtonButtonProps
    ? Omit<Props, "disabledFocusable">
    : Omit<Props, "disabledFocusable" | "disabled">;

export const useAriaButtonProps = <Props extends AriaButtonProps>(
  props: Props
): AriaButtonPropsResult<Props> => {
  const { disabledFocusable = false, disabled, ...rest } = props;

  const normalizedAriaDisabled =
    typeof props["aria-disabled"] === "string"
      ? props["aria-disabled"] === "true"
      : props["aria-disabled"];

  const isDisabled = disabled || disabledFocusable || normalizedAriaDisabled;

  const handleClick = React.useCallback(
    (event: React.MouseEvent<AriaButtonElement>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      props.onClick?.(event);
    },
    [props.onClick, isDisabled]
  );

  const handleNotAButtonKeyDown = React.useCallback(
    (event: React.KeyboardEvent<AriaNoButtonElement>) => {
      props.onKeyDown?.(event);

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
    [props.onKeyDown, isDisabled]
  );

  const handleNotAButtonKeyUp = React.useCallback(
    (event: React.KeyboardEvent<AriaNoButtonElement>) => {
      props.onKeyUp?.(event);
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
    [props.onKeyUp, isDisabled]
  );

  // If a <button> tag is to be rendered we need to set disabled, aria-disabled and provide the correct handlers
  if (isButtonProps<AriaButtonPropsResult<Props>>(rest)) {
    const buttonProps: AriaButtonPropsResult<Props> = {
      ...rest,
      disabled: disabled && !disabledFocusable,
      onClick: disabledFocusable ? undefined : handleClick,
      // if disabledFocusable then there's no requirement for handlers as those events should not be propagated
      onKeyDown: disabledFocusable ? undefined : props.onKeyDown,
      // if disabledFocusable then there's no requirement for handlers as those events should not be propagated
      onKeyUp: disabledFocusable ? undefined : props.onKeyUp,
      // and aria-disabled should be set to true
      "aria-disabled": disabledFocusable ? true : normalizedAriaDisabled,
    };
    return buttonProps;
  } else if (isNotButtonProps<AriaButtonPropsResult<Props>>(rest)) {
    const nonButtonProps: AriaButtonPropsResult<Props> = {
      role: "button",
      tabIndex: disabled && !disabledFocusable ? undefined : 0,
      ...rest,
      "aria-disabled": isDisabled,
      onClick: handleClick,
      onKeyUp: handleNotAButtonKeyUp,
      onKeyDown: handleNotAButtonKeyDown,
    };
    if (nonButtonProps.as === "a" && isDisabled) {
      delete (nonButtonProps as AriaButtonAProps).href;
    }
    return nonButtonProps;
  }
  // this should never be reached
  // as the type system should prevent this
  // a button should always be either a 'button', 'a' or 'div'
  return props as never;
};

function isButtonProps<P extends AriaButtonProps>(
  props: AriaButtonProps
): props is P extends AriaButtonButtonProps ? P : never {
  return props.as === "button" || props.as === undefined;
}
function isNotButtonProps<P extends AriaButtonProps>(
  props: AriaButtonProps
): props is P extends AriaButtonAProps | AriaButtonDivProps ? P : never {
  return props.as === "a" || props.as === "div";
}
