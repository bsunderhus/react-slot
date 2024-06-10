import * as React from "react";
import type {
  PlugProps,
  KeyboardEventHandler,
  MouseEventHandler,
} from "../index";

export type AriaButtonPlugProps<Prong extends "a" | "div"> = PlugProps<
  "button?" | Prong
> & {
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

export const useAriaButtonAdapter = <Prong extends "a" | "div">(
  props: AriaButtonPlugProps<Prong>
): PlugProps<"button?" | Prong> => {
  const {
    disabled,
    disabledFocusable = false,
    ["aria-disabled"]: ariaDisabled,
  } = props;
  const onClick:
    | MouseEventHandler<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>
    | undefined = props.onClick;
  const onKeyDown:
    | KeyboardEventHandler<
        HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
      >
    | undefined = props.onKeyDown;
  const onKeyUp:
    | KeyboardEventHandler<
        HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
      >
    | undefined = props.onKeyUp;

  const normalizedAriaDisabled =
    typeof ariaDisabled === "string" ? ariaDisabled === "true" : ariaDisabled;

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

  const handleKeyDown: KeyboardEventHandler<
    HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
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

  const handleKeyUp: KeyboardEventHandler<
    HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
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

  // If a <button> tag is to be rendered we just need to set disabled and aria-disabled correctly
  if (props.as === "button" || props.as === undefined) {
    return {
      ...props,
      disabled: disabled && !disabledFocusable,
      "aria-disabled": disabledFocusable ? true : normalizedAriaDisabled,
      // onclick should still use internal handler to ensure prevention if disabled
      // if disabledFocusable then there's no requirement for handlers as those events should not be propagated
      onClick: disabledFocusable ? undefined : handleClick,
      onKeyUp: disabledFocusable ? undefined : onKeyUp,
      onKeyDown: disabledFocusable ? undefined : onKeyDown,
    };
  }
  // If an <a> or <div> tag is to be rendered we have to remove disabled and type,
  // and set aria-disabled, role and tabIndex.
  const resultProps = {
    role: "button",
    tabIndex: disabled && !disabledFocusable ? undefined : 0,
    ...props,
    // If it's not a <button> than listeners are required even with disabledFocusable
    // Since you cannot assure the default behavior of the element
    // E.g: <a> will redirect on click
    onClick: handleClick,
    onKeyUp: handleKeyUp,
    onKeyDown: handleKeyDown,
    "aria-disabled": isDisabled,
  };

  if (resultProps.as === "a" && isDisabled) {
    delete resultProps.href;
  }

  return resultProps;
};
