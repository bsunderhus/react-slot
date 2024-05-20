import * as React from "react";
import { PlugRefElement, PlugStatus, outlet, plug, union } from "../index";
import type { OutletComponent, Plug, PlugProps, Primary } from "../index";
import {
  useAriaButtonAdapter,
  type ARIAButtonPlugProps,
} from "./useARIAButtonAdapter";

/**
 * A button supports different sizes.
 */
export type ButtonSize = "small" | "medium" | "large";

export type ButtonIconPlugProps = PlugProps<"span?"> & {
  /**
   * A button can format its icon to appear before or after its content.
   *
   * @default 'before'
   */
  position?: "before" | "after";
};

export type ButtonProps = Primary<ARIAButtonPlugProps<"a">> & {
  /**
   * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
   */
  icon?: Plug<ButtonIconPlugProps>;
  /**
   * A button can have its content and borders styled for greater emphasis or to be subtle.
   * - 'secondary' (default): Gives emphasis to the button in such a way that it indicates a secondary action.
   * - 'primary': Emphasizes the button as a primary action.
   * - 'outline': Removes background styling.
   * - 'subtle': Minimizes emphasis to blend into the background until hovered or focused.
   * - 'transparent': Removes background and border styling.
   *
   * @default 'secondary'
   */
  appearance?: "secondary" | "primary" | "outline" | "subtle" | "transparent";

  /**
   * When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it
   * is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this
   * pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.
   *
   * @default false
   */
  disabledFocusable?: boolean;

  /**
   * A button can show that it cannot be interacted with.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * A button can be rounded, circular, or square.
   *
   * @default 'rounded'
   */
  shape?: "rounded" | "circular" | "square";

  /**
   * A button supports different sizes.
   *
   * @default 'medium'
   */
  size?: ButtonSize;
};

export type ButtonState = Required<
  Pick<
    ButtonProps,
    "appearance" | "disabledFocusable" | "disabled" | "shape" | "size"
  >
> & {
  iconPosition: NonNullable<ButtonIconPlugProps["position"]>;
  root: OutletComponent<"button" | "a">;
  icon?: OutletComponent<"span">;
  /**
   * A button can contain only an icon.
   *
   * @default false
   */
  iconOnly: boolean;
  children: React.ReactNode;
};

export const Button = React.forwardRef<
  PlugRefElement<ButtonProps>,
  React.PropsWithoutRef<ButtonProps>
>((props, ref) => {
  const buttonState = useButton({ ...props, ref: union.ensureRefType(ref) });
  return renderButton(buttonState);
});

/**
 * Renders a Button component by passing the state defined props to the appropriate slots.
 */
export const renderButton = (state: ButtonState) => (
  <state.root>
    {state.iconPosition !== "after" && state.icon && <state.icon />}
    {!state.iconOnly && state.children}
    {state.iconPosition === "after" && state.icon && <state.icon />}
  </state.root>
);

/**
 * Given user props, defines default props for the Button, calls useButtonState, and returns processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useButton = (props: ButtonProps): ButtonState => {
  const {
    appearance = "secondary",
    disabled = false,
    disabledFocusable = false,
    icon = PlugStatus.UnPlugged,
    shape = "rounded",
    size = "medium",
  } = props;
  const iconProps = plug.resolve(icon);
  return {
    children: props.children,
    appearance,
    disabled,
    disabledFocusable,
    iconPosition: iconProps?.position ?? "before",
    shape,
    size, // State calculated from a set of props
    iconOnly: Boolean(iconProps?.children && !props.children), // Slots definition
    icon: outlet(
      "span",
      plug.adapt(icon, ({ position, ...rest }) => rest)
    ),
    root: outlet.lockedIn<"button" | "a">(
      "button",
      plug.adapt(props, useAriaButtonAdapter<"a">)
    ),
  };
};
