import * as React from "react";
import { outlet, plug, union } from "../index";
import type { Outlet, Plug, PlugProps, MainPlug } from "../index";
import {
  useAriaButtonAdapter,
  type AriaButtonPlugProps,
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

export type ButtonProps = MainPlug<AriaButtonPlugProps<"a">> & {
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
  main: Outlet<"button" | "a?">;
  icon?: Outlet<"span">;
  /**
   * A button can contain only an icon.
   *
   * @default false
   */
  iconOnly: boolean;
  children: React.ReactNode;
};

export const Button = union.forwardRef<ButtonProps>((props, ref) => {
  const {
    children,
    size = "medium",
    disabled = false,
    shape = "rounded",
    icon = plug.unplugged(),
    appearance = "secondary",
    disabledFocusable = false,
    ...rest
  } = props;
  const iconProps = plug.resolve(icon);
  const state: ButtonState = {
    children: children,
    appearance,
    disabled,
    disabledFocusable,
    iconPosition: iconProps?.position ?? "before",
    shape,
    size, // State calculated from a set of props
    iconOnly: Boolean(iconProps?.children && !children), // Slots definition
    icon: outlet(
      "span",
      plug.adapt(icon, ({ position, ...iconProps }) => iconProps)
    ),
    main: outlet.lockedIn<"button" | "a?">(
      "button",
      plug.adapt(
        { ...rest, ref: union.ensureRefType(ref) },
        useAriaButtonAdapter<"a">
      )
    ),
  };
  return (
    <state.main>
      {state.iconPosition !== "after" && state.icon && <state.icon />}
      {!state.iconOnly && state.children}
      {state.iconPosition === "after" && state.icon && <state.icon />}
    </state.main>
  );
});
