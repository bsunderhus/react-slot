import * as ReactTypes from "../../lib/types/react.types";
import { jsxs, jsx } from "react/jsx-runtime";
import type { OutletExoticComponent } from "../../lib/types/outlet.types";
import type { OutletExoticComponentPlugProps } from "../../lib/types/plug.types";
import { Fragment, createElement } from "react";

export const jsxsOutlet = (
  type: OutletExoticComponent,
  overrideProps: OutletExoticComponentPlugProps,
  key?: ReactTypes.Key
): ReactTypes.JSX.Element => {
  const { as, dangerouslyRender, ...outletProps } = type.props;

  const props = { ...outletProps, ...overrideProps };

  if (dangerouslyRender) {
    /**
     * In static runtime then children is an array and this array won't be keyed.
     * We should wrap children by a static fragment
     * as there's no way to know if renderFunction will render statically or dynamically
     */
    return jsx(
      Fragment,
      {
        children: dangerouslyRender(
          createElement(as, {
            ...props,
            children: jsxs(Fragment, { children: props.children }, undefined),
          })
        ),
      },
      key
    );
  }
  return jsxs(as, props, key);
};
