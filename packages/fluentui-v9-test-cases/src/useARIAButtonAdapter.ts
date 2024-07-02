import * as React from "react";
import type { PlugProps, Default } from "react-volt";
import type * as Distributive from "react-distributive-types";

interface DefaultPlugPropsButton extends Default<PlugProps.Intrinsics.Button> {}

type AriaButtonIntrinsicElementsPlugProps =
  | DefaultPlugPropsButton
  | PlugProps.Intrinsics.A
  | PlugProps.Intrinsics.Div;

interface AriaButtonDisabledProps {
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
}

interface AriaButtonButtonProps
  extends DefaultPlugPropsButton,
    AriaButtonDisabledProps {}

interface AriaButtonAProps
  extends PlugProps.Intrinsics.A,
    AriaButtonDisabledProps {}

interface AriaButtonDivProps
  extends PlugProps.Intrinsics.Div,
    AriaButtonDisabledProps {}

export interface AriaButtonProps {
  button: AriaButtonButtonProps;
  a: AriaButtonAProps;
  div: AriaButtonDivProps;
}

type AriaNoButtonElement = HTMLAnchorElement | HTMLDivElement;
type AriaButtonElement = HTMLButtonElement | AriaNoButtonElement;

// TODO: find a way to stop breaking rule of hooks
export const useAriaButtonAdapter = () => useAriaButtonProps;

export const useAriaButtonProps = <
  Props extends Distributive.Pick<
    AriaButtonProps["button" | "a" | "div"],
    | "disabled"
    | "disabledFocusable"
    | "onClick"
    | "onKeyDown"
    | "onKeyUp"
    | "aria-disabled"
    | "role"
    | "tabIndex"
    | "href"
    | "as"
  >
>(
  props: Props
): AriaButtonIntrinsicElementsPlugProps &
  Distributive.Omit<Props, "disabled" | "disabledFocusable"> => {
  const { disabled, disabledFocusable = false, ..._ } = props;

  // destructuring props will lose the distributivity properties of the type
  // we need to cast from Omit<Props, 'disabled' | 'disabledFocusable'>
  // back into the distributive version of it
  const rest = _ as Distributive.Omit<Props, "disabled" | "disabledFocusable">;

  // we need to redeclare onClick type as the distributive version of it
  const onClick: Distributive.MouseEventHandler<AriaButtonElement> | undefined =
    props.onClick;

  // we need to redeclare onKeyDown type as the distributive version of it
  const onKeyDown:
    | Distributive.KeyboardEventHandler<AriaButtonElement>
    | undefined = props.onKeyDown;

  // we need to redeclare onKeyUp type as the distributive version of it
  const onKeyUp:
    | Distributive.KeyboardEventHandler<AriaButtonElement>
    | undefined = props.onKeyUp;

  const normalizedAriaDisabled =
    typeof props["aria-disabled"] === "string"
      ? props["aria-disabled"] === "true"
      : props["aria-disabled"];

  const isDisabled = disabled || disabledFocusable || normalizedAriaDisabled;

  const handleClick: Distributive.MouseEventHandler<AriaButtonElement> =
    React.useCallback(
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

  const handleNotAButtonKeyDown: Distributive.KeyboardEventHandler<AriaNoButtonElement> =
    React.useCallback(
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

  const handleNotAButtonKeyUp: Distributive.KeyboardEventHandler<AriaNoButtonElement> =
    React.useCallback(
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
  if (rest.as === "button" || rest.as === undefined) {
    const buttonProps: Default<PlugProps.Intrinsics["button"]> = {
      ...rest,
      disabled: disabled && !disabledFocusable,
      // onClick should still use internal handler to ensure prevention if disabled
      onClick: disabledFocusable ? undefined : handleClick,
      // if disabledFocusable then there's no requirement for handlers as those events should not be propagated
      onKeyDown: disabledFocusable ? undefined : onKeyDown,
      // if disabledFocusable then there's no requirement for handlers as those events should not be propagated
      onKeyUp: disabledFocusable ? undefined : onKeyUp,
      // and aria-disabled should be set to true
      "aria-disabled": disabledFocusable ? true : normalizedAriaDisabled,
    };
    return buttonProps;
  } else if (rest.as === "a" || rest.as === "div") {
    const nonButtonProps: PlugProps.Intrinsics["a" | "div"] = {
      role: "button",
      tabIndex: disabled && !disabledFocusable ? undefined : 0,
      ...rest,
      "aria-disabled": isDisabled,
      onClick: handleClick,
      onKeyUp: handleNotAButtonKeyUp,
      onKeyDown: handleNotAButtonKeyDown,
    };
    if (nonButtonProps.as === "a" && isDisabled) {
      delete nonButtonProps.href;
    }
    return nonButtonProps;
  }
  return props;
};
