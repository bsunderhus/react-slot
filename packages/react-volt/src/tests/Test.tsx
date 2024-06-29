import * as React from "react";
import { Default, Plug, PlugProps, outlet, plug } from "../index";

type CustomIconProps = { className: string };

type CustomComponentProps = Default<PlugProps.Intrinsics.Button> & {
  icon?: Plug<
    PlugProps.Intrinsics.Span | Default<PlugProps.FC<CustomIconProps>>
  >;
};

function CustomComponent({
  icon = plug.pluggedIn<Default<PlugProps.FC<CustomIconProps>>>({
    className: "",
  }),
  ...rest
}: CustomComponentProps) {
  const Root = outlet("button", rest);
  const Icon = outlet(CustomIcon, icon);
  return <Root>{Icon && <Icon />}</Root>;
}

const CustomIcon = (props: CustomIconProps) => null;

function App() {
  return <CustomComponent icon={{ className: "" }} />;
}
