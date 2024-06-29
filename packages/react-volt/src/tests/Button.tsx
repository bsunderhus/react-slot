import * as React from "react";
import { outlet, plug } from "../index";
import type {
  Default,
  Distributive,
  Outlet,
  Plug,
  PlugProps,
  PrimaryPlug,
  Unlocked,
} from "../index";
import { AriaButtonProps, useAriaButtonProps } from "./useARIAButtonAdapter";
import { useMergedRefs } from "./useMergedRefs";

/**
 * A button supports different sizes.
 */
export type ButtonSize = "small" | "medium" | "large";

type IconPosition = "before" | "after";

export type ButtonProps = PrimaryPlug<AriaButtonProps["button" | "a"]> & {
  /**
   * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
   */
  icon?: Plug<
    Default<PlugProps.Intrinsics["span"]> & {
      /**
       * A button can format its icon to appear before or after its content.
       *
       * @default 'before'
       */
      position?: IconPosition;
    }
  >;
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
  Distributive.Pick<
    ButtonProps,
    "appearance" | "disabledFocusable" | "disabled" | "shape" | "size"
  >
> & {
  iconPosition: IconPosition;
  root: Outlet<"button" | "a">;
  icon: Unlocked<Outlet<"span">>;
  /**
   * A button can contain only an icon.
   *
   * @default false
   */
  iconOnly: boolean;
};

export const Button = plug.fc((props: ButtonProps) => {
  const {
    children,
    size = "medium",
    disabled = false,
    shape = "rounded",
    icon = plug.pluggedIn(),
    appearance = "secondary",
    disabledFocusable = false,
    ...rest
  } = props;

  const innerRootRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(
    null
  );
  const rootRef = useMergedRefs(innerRootRef, rest.ref);

  const iconProps = plug.resolveShorthand(icon);
  const iconPosition = iconProps?.position ?? "before";
  delete iconProps?.position;

  const state: ButtonState = {
    appearance,
    disabled,
    disabledFocusable,
    iconPosition: iconPosition,
    shape,
    size, // State calculated from a set of props
    iconOnly: Boolean(iconProps?.children && !children), // Slots definition
    icon: outlet("span", iconProps),
    root: outlet(
      "button",
      plug.merge({ ref: rootRef }, useAriaButtonProps(rest))
    ),
  };
  return (
    <state.root>
      {state.iconPosition !== "after" && state.icon && <state.icon />}
      {!state.iconOnly && state.root.children}
      {state.iconPosition === "after" && state.icon && <state.icon />}
    </state.root>
  );
});
