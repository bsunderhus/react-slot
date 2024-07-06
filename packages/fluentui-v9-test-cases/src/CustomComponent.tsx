import * as React from "react";
import {
  Default,
  OutletExoticComponent,
  Plug,
  PlugProps,
  Unlocked,
  outlet,
  plug,
} from "react-volt";
import { expectTypeOf } from "react-volt/test";

interface CustomIconProps {
  className: string;
}

interface CustomComponentProps extends Default<PlugProps.Intrinsics.Button> {
  icon?: Plug<
    PlugProps.Intrinsics.Span | Default<PlugProps.FC<CustomIconProps>>
  >;
}

const CustomComponent = plug.fc<CustomComponentProps>(
  (props: CustomComponentProps) => {
    const {
      icon = plug.pluggedIn<Default<PlugProps.FC<CustomIconProps>>>({
        className: "",
      }),
      ...rest
    } = props;
    const Root = outlet({ as: "button" as const, ...rest });
    const Icon = outlet(plug.extend({ as: CustomIcon }, icon));

    /* @__PURE__ */ expectTypeOf(Root).toEquivalentTypeOf<
      OutletExoticComponent<PlugProps.Intrinsics.Button>
    >();
    /* @__PURE__ */ expectTypeOf(Icon).toEquivalentTypeOf<
      Unlocked<
        OutletExoticComponent<
          PlugProps.Intrinsics.Span | PlugProps.FC<CustomIconProps>
        >
      >
    >();

    return <Root>{Icon && <Icon />}</Root>;
  }
);

const CustomIcon = (props: CustomIconProps) => null;

function App() {
  return <CustomComponent icon={{ className: "" }} />;
}
