import { Default, outlet, plug, Plug, PlugProps, Unlocked } from "react-volt";
import { Button, ButtonConfig, ButtonProps } from "./Button";
import { expectTypeOf } from "react-volt/test";

export interface SplitButtonProps
  extends Default<PlugProps.Intrinsics.Div>,
    Pick<
      ButtonConfig,
      | "appearance"
      | "disabledFocusable"
      | "disabled"
      | "shape"
      | "size"
      | "icon"
    > {
  /**
   * Button that opens menu with secondary actions in SplitButton.
   */
  menuButton?: Plug<ButtonProps>;
  /**
   * Button to perform primary action in SplitButton.
   */
  primaryActionButton?: Plug<ButtonProps>;
}

export interface SplitButtonState
  extends Pick<
    ButtonConfig,
    "appearance" | "disabled" | "disabledFocusable" | "shape" | "size"
  > {
  root: PlugProps.Intrinsics.Div;
  menuButton: Unlocked<ButtonProps>;
  primaryActionButton: Unlocked<ButtonProps>;
}

export const useSplitButton = (props: SplitButtonProps): SplitButtonState => {
  const {
    appearance = "secondary",
    children,
    disabled = false,
    disabledFocusable = false,
    icon,
    menuButton = plug.pluggedIn({}),
    primaryActionButton = plug.pluggedIn({}),
    shape = "rounded",
    size = "medium",
    ...rest
  } = props;

  const menuButtonProps = plug.extend(
    {
      appearance,
      disabled,
      disabledFocusable,
      shape,
      size,
    },
    menuButton
  );

  const primaryActionButtonProps = plug.extend(
    {
      appearance,
      children,
      disabled,
      disabledFocusable,
      icon,
      id: "__primaryActionButton",
      shape,
      size,
    },
    primaryActionButton
  );

  // Resolve menu button's aria-labelledby to be labelled by the primary action button if no label was provided by the
  // user.
  if (
    menuButtonProps &&
    primaryActionButtonProps &&
    !menuButtonProps["aria-label"] &&
    !primaryActionButtonProps["aria-labelledby"]
  ) {
    menuButtonProps["aria-labelledby"] = primaryActionButtonProps.id;
  }

  const rootProps = plug.extend({ as: "div" }, rest);

  const state: SplitButtonState = {
    // Props passed at the top-level
    appearance,
    disabled,
    disabledFocusable,
    shape,
    size, // Slots definition
    root: rootProps,
    menuButton: menuButtonProps,
    primaryActionButton: primaryActionButtonProps,
  };

  /* @__PURE__ */ expectTypeOf(rootProps).toEquivalentTypeOf(state.root);

  /* @__PURE__ */ expectTypeOf(menuButtonProps).toEquivalentTypeOf(
    state.menuButton
  );
  /* @__PURE__ */ expectTypeOf(primaryActionButtonProps).toEquivalentTypeOf(
    state.primaryActionButton
  );

  return state;
};

export const renderSplitButton = (state: SplitButtonState) => {
  const Root = outlet(state.root);
  return (
    <Root>
      {state.primaryActionButton && <Button {...state.primaryActionButton} />}
      {state.menuButton && <Button {...state.menuButton} />}
    </Root>
  );
};

export const SplitButton = plug.fc((props: SplitButtonProps) => {
  const state = useSplitButton(props);
  return renderSplitButton(state);
});
