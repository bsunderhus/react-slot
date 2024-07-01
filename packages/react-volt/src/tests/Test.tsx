import * as React from "react";
import {
  type Default,
  type Plug,
  type PlugProps,
  outlet,
  plug,
  type Outlet,
  type Unlocked,
} from "../index";

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
  const Icon: Unlocked<Outlet<typeof CustomIcon | "span">> = outlet(
    CustomIcon,
    icon
  );
  return <Root>{Icon && <Icon />}</Root>;
}

const CustomIcon = (props: CustomIconProps) => null;

function App() {
  return <CustomComponent icon={{ className: "" }} />;
}
