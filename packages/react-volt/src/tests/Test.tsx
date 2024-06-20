import * as React from "react";
import { Default, Outlet, Plug, PlugProps, outlet, plug } from "../index";

type CustomIconProps = { className?: string };

type CustomComponentProps = Default<PlugProps.IntrinsicElements.Button> & {
  icon?: Plug<
    Default<PlugProps.IntrinsicElements.Span> | PlugProps.FC<CustomIconProps>
  >;
};

function CustomComponent(props: CustomComponentProps) {
  const Root = outlet.lockedIn("button", props);
  const Icon = outlet("span", props.icon ?? plug.unplugged());
  return <Root>{Icon && <Icon />}</Root>;
}

const CustomIcon = (props: CustomIconProps) => null;

function App() {
  return (
    <CustomComponent
      icon={{
        as: CustomIcon,
        className: "",
      }}
    />
  );
}
