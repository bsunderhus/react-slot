import type * as ReactTypes from "../../lib/types/react.types";
import { jsx } from "react/jsx-runtime";
import type { OutletExoticComponent } from "../../lib/types/outlet.types";
import type { OutletExoticComponentPlugProps } from "../../lib/types/plug.types";
import { Fragment, createElement } from "react";

export const jsxOutlet = (
  type: OutletExoticComponent,
  overrideProps: OutletExoticComponentPlugProps,
  key?: ReactTypes.Key
): ReactTypes.JSX.Element => {
  const { as, dangerouslyRender, ...outletProps } = type.props;

  const props = { ...outletProps, ...overrideProps };

  if (dangerouslyRender) {
    return jsx(
      Fragment,
      { children: dangerouslyRender(createElement(as, props)) },
      key
    );
  }
  return jsx(as, props, key);
};
