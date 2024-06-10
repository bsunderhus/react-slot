import type React from "react";
import type { LockedIn, MainPlug, Optional, Plug, PlugProps } from "../index";
import type { FunctionComponent } from "../types/helper.types";

type IconProps = PlugProps<"span?"> & {
  position?: "before" | "after";
};

type CustomInputProps = {
  value?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?(ev: React.ChangeEvent): void;
  role?: string;
  "data-attr"?: "";
};

export type InputProps = MainPlug<"input?" | "div"> & {
  root?: LockedIn<Plug<"div?">>;
  icon?: Plug<IconProps>;
};

declare const Input: React.FC<InputProps>;

const jsx = <Input as="input" Component={CustomInput} onClick={(ev) => null} />;

declare const CustomInput: React.FC<
  React.PropsWithRef<JSX.IntrinsicElements["input"]>
>;
