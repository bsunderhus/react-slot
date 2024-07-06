import { Fragment, createElement } from "react";
import type * as ReactTypes from "../../lib/types/react.types";
import type { OutletExoticComponent } from "../../lib/types/outlet.types";
import type { OutletExoticComponentPlugProps } from "../../lib/types/plug.types";
import { jsxDEV } from "react/jsx-dev-runtime";

export const jsxDEVOutlet = (
  type: OutletExoticComponent,
  overrideProps: OutletExoticComponentPlugProps,
  key?: ReactTypes.Key,
  source?: unknown,
  self?: unknown
) => {
  const { as, dangerouslyRender, ...outletProps } = type.props;

  const props = { ...outletProps, ...overrideProps };

  if (dangerouslyRender) {
    // if runtime is static
    if (source === true) {
      return jsxDEV(
        Fragment,
        {
          children: dangerouslyRender(
            createElement(as, {
              ...props,
              /**
               * If the runtime is static then children is an array and this array won't be keyed.
               * Then we should wrap children by a static fragment
               * as there's no way to know if renderFunction will render statically or dynamically
               */
              children: jsxDEV(
                Fragment,
                { children: props.children },
                undefined,
                true,
                self
              ),
            })
          ),
        },
        key,
        false, // by marking source as false we're declaring that this render is dynamic
        self
      );
    }
    // if runtime is dynamic (source = false) things are simpler
    return jsxDEV(
      Fragment,
      { children: dangerouslyRender(createElement(as, props)) },
      key,
      source,
      self
    );
  }
  return jsxDEV(as, props, key, source, self);
};
