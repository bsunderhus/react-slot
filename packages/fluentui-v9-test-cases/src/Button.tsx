import * as React from "react";
import { outlet, plug } from "react-volt";
import type { Default, Plug, PlugProps, Unlocked } from "react-volt";
import { expectTypeOf } from "react-volt/test";
import {
  AriaButtonAProps,
  AriaButtonButtonProps,
  AriaButtonProps,
  useAriaButtonProps,
} from "./useARIAButtonAdapter";
import { RefObjectFunction, useMergedRefs } from "./useMergedRefs";
/**
 * A button supports different sizes.
 */
export type ButtonSize = "small" | "medium" | "large";

export type IconPosition = "before" | "after";

interface IconPlugProps extends Default<PlugProps.Intrinsics.Span> {
  /**
   * A button can format its icon to appear before or after its content.
   *
   * @default 'before'
   */
  position?: IconPosition;
}

export interface ButtonConfig
  extends AriaButtonProps<HTMLButtonElement | HTMLAnchorElement>,
    Default<PlugProps.Intrinsics.HTML<HTMLButtonElement | HTMLAnchorElement>> {
  as?: "button" | "a";
  /**
   * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
   */
  icon?: Plug<IconPlugProps>;
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
}
interface ButtonButtonProps
  extends AriaButtonButtonProps,
    Pick<ButtonConfig, "icon" | "appearance" | "shape" | "size"> {}

interface ButtonAProps
  extends AriaButtonAProps,
    Pick<ButtonConfig, "icon" | "appearance" | "shape" | "size"> {}

export type ButtonProps = ButtonButtonProps | ButtonAProps;

interface ButtonStateRoot
  extends PlugProps.Intrinsics.HTML<HTMLButtonElement | HTMLAnchorElement> {
  as: "button" | "a";
  ref?: RefObjectFunction<HTMLButtonElement | HTMLAnchorElement>;
}

export interface ButtonState
  extends Required<
    Pick<
      ButtonConfig,
      "appearance" | "disabledFocusable" | "disabled" | "shape" | "size"
    >
  > {
  iconPosition: IconPosition;
  root: ButtonStateRoot;
  icon: Unlocked<PlugProps.Intrinsics.Span>;
  /**
   * A button can contain only an icon.
   *
   * @default false
   */
  iconOnly: boolean;
}

export const useButton = (config: ButtonConfig): ButtonState => {
  const {
    size = "medium",
    shape = "rounded",
    icon = plug.pluggedIn({}),
    appearance = "secondary",
    ...rest
  } = config;

  const innerRootRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(
    null
  );

  const iconPosition = plug.resolveShorthand(icon)?.position ?? "before";

  const rootProps = plug.extend(
    { as: "button" as "a" | "button" },
    useAriaButtonProps(rest),
    { ref: useMergedRefs(innerRootRef, rest.ref) }
  );

  const iconProps = plug.adapt(icon, ({ position, ...restIconProps }) => ({
    as: "span" as const,
    ...restIconProps,
  }));

  const state: ButtonState = {
    appearance,
    disabled: config.disabled ?? false,
    disabledFocusable: config.disabledFocusable ?? false,
    iconPosition: iconPosition,
    shape,
    size, // State calculated from a set of props
    iconOnly: Boolean(iconProps?.children && !config.children), // Slots definition
    icon: iconProps,
    root: rootProps,
  };

  /* @__PURE__ */ expectTypeOf(rootProps).toEquivalentTypeOf(state.root);

  /* @__PURE__ */ expectTypeOf(iconProps).toEquivalentTypeOf(state.icon);

  return state;
};

export const renderButton = (state: ButtonState): JSX.Element => {
  const Root = outlet(state.root);
  const Icon = outlet(state.icon);
  return (
    <Root>
      {state.iconPosition !== "after" && Icon && <Icon />}
      {!state.iconOnly && state.root.children}
      {state.iconPosition === "after" && Icon && <Icon />}
    </Root>
  );
};

export const Button = plug.fc<ButtonProps>((props: ButtonConfig) => {
  const state = useButton(props);
  return renderButton(state);
});
