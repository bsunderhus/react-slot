import * as React from "react";
import {
  LockedIn,
  MainPlug,
  Outlet,
  Plug,
  PlugProps,
  PlugRef,
  outlet,
  plug,
} from "../index";

export type InputProps = Omit<
  MainPlug<"input?">,
  // `children` is unsupported. The rest of these native props have customized definitions.
  "children" | "defaultValue" | "onChange" | "size" | "type" | "value" | "ref"
> & {
  /**
   * Wrapper element which visually appears to be the input and is used for borders, focus styling, etc.
   * (A wrapper is needed to properly position `contentBefore` and `contentAfter` relative to `input`.)
   *
   * The root slot receives the `className` and `style` specified directly on the `<Input>`.
   * All other top-level native props will be applied to the primary slot, `input`.
   */
  root?: LockedIn<Plug<"span?">>;

  /** Element before the input text, within the input border */
  contentBefore?: Plug<"span?" | "div">;

  /** Element after the input text, within the input border */
  contentAfter?: Plug<"span?" | "div">;

  /**
   * Size of the input (changes the font size and spacing).
   * @default 'medium'
   */
  // This name overlaps with the native `size` prop, but that prop isn't very useful in practice
  // (we could add `htmlSize` for the native functionality if someone needs it)
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/size
  size?: "small" | "medium" | "large";

  /**
   * Controls the colors and borders of the input.
   * @default 'outline'
   *
   * Note: 'filled-darker-shadow' and 'filled-lighter-shadow' are deprecated and will be removed in the future.
   */
  appearance?:
    | "outline"
    | "underline"
    | "filled-darker"
    | "filled-lighter"
    | "filled-darker-shadow"
    | "filled-lighter-shadow";

  /**
   * Default value of the input. Provide this if the input should be an uncontrolled component
   * which tracks its current state internally; otherwise, use `value`.
   *
   * (This prop is mutually exclusive with `value`.)
   */
  defaultValue?: string;

  /**
   * Current value of the input. Provide this if the input is a controlled component where you
   * are maintaining its current state; otherwise, use `defaultValue`.
   *
   * (This prop is mutually exclusive with `defaultValue`.)
   */
  value?: string;

  /**
   * Called when the user changes the input's value.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onChange?: (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void;

  /**
   * An input can have different text-based [types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#input_types)
   * based on the type of value the user will enter.
   *
   * Note that no custom styling is currently applied for alternative types, and some types may
   * activate browser-default styling which does not match the Fluent design language.
   *
   * (For non-text-based types such as `button` or `checkbox`, use the appropriate component or an
   * `<input>` element instead.)
   * @default 'text'
   */
  type?:
    | "text"
    | "email"
    | "password"
    | "search"
    | "tel"
    | "url"
    | "date"
    | "datetime-local"
    | "month"
    | "number"
    | "time"
    | "week";
};

/**
 * State used in rendering Input.
 */
export type InputState = Required<Pick<InputProps, "appearance" | "size">> & {
  root: Outlet<"span">;
  input: Outlet<"input">;
  contentBefore?: Outlet<"span" | "div?">;
  contentAfter?: Outlet<"span" | "div?">;
};

/**
 * Data passed to the `onChange` callback when a user changes the input's value.
 */
export type InputOnChangeData = {
  /** Updated input value from the user */
  value: string;
};

/**
 * Create the state required to render Input.
 *
 * The returned state can be modified with hooks such as useInputStyles_unstable,
 * before being passed to renderInput_unstable.
 *
 * @param props - props from this instance of Input
 * @param ref - reference to `<input>` element of Input
 */
export const useInput_unstable = (
  props: InputProps,
  ref: PlugRef<InputProps>
): InputState => {
  const {
    size = "medium",
    appearance = "outline",
    onChange,
    style: rootStyle,
    className: rootClassName,
    value,
    defaultValue,
    root = plug.pluggedIn({}),
    contentAfter = plug.unplugged(),
    contentBefore = plug.unplugged(),
    ...rest
  } = props;

  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const controlledValue = value ?? internalValue;
  const setControlledValue = value ? () => {} : setInternalValue;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;
    onChange?.(event, { value: newValue });
    setControlledValue(newValue);
  };
  const state: InputState = {
    size,
    appearance,
    input: outlet.lockedIn(
      "input",
      plug.adapt(rest, (inputProps) => ({
        type: "text",
        ...rest,
        ...inputProps,
        value: controlledValue,
        onChange: handleChange,
        ref,
      }))
    ),
    contentAfter: outlet<"span" | "div?">("span", contentAfter),
    contentBefore: outlet<"span" | "div?">("span", contentBefore),
    root: outlet.lockedIn(
      "span",
      plug.adapt(root, (rootProps) => ({
        className: rootClassName,
        style: rootStyle,
        ...rootProps,
      }))
    ),
  };
  return state;
};
