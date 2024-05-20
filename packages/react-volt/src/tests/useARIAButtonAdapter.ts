import * as React from "react";
import type { PlugProps, PlugRefElement } from "../types/plug.types";

type ARIAButtonOptionalType = "a" | "div";

export type ARIAButtonPlugProps<PlugType extends ARIAButtonOptionalType> =
  PlugProps<"button?" | PlugType> & {
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

export const useAriaButtonAdapter = <PlugType extends ARIAButtonOptionalType>(
  props: ARIAButtonPlugProps<PlugType>
): PlugProps<"button?" | PlugType> => {
  const {
    disabled,
    disabledFocusable = false,
    ["aria-disabled"]: ariaDisabled,
    ...rest
  } = props;
  const onClick = rest.onClick as
    | React.MouseEventHandler<PlugRefElement<ARIAButtonPlugProps<PlugType>>>
    | undefined;
  const onKeyDown = rest.onKeyDown as
    | React.KeyboardEventHandler<PlugRefElement<ARIAButtonPlugProps<PlugType>>>
    | undefined;
  const onKeyUp = rest.onKeyUp as
    | React.KeyboardEventHandler<PlugRefElement<ARIAButtonPlugProps<PlugType>>>
    | undefined;

  const normalizedARIADisabled =
    typeof ariaDisabled === "string" ? ariaDisabled === "true" : ariaDisabled;

  const isDisabled = disabled || disabledFocusable || normalizedARIADisabled;

  const handleClick = React.useCallback(
    (
      event: React.MouseEvent<PlugRefElement<ARIAButtonPlugProps<PlugType>>>
    ) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    },
    [onClick, isDisabled]
  );

  const handleKeyDown = React.useCallback(
    (
      event: React.KeyboardEvent<PlugRefElement<ARIAButtonPlugProps<PlugType>>>
    ) => {
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

  const handleKeyUp = React.useCallback(
    (
      event: React.KeyboardEvent<PlugRefElement<ARIAButtonPlugProps<PlugType>>>
    ) => {
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
      "aria-disabled": disabledFocusable ? true : normalizedARIADisabled,
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
