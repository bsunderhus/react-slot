import type * as ReactTypes from "../../lib/types/react.types";
import type { OutletExoticComponent } from "../../lib/types/outlet.types";
import type { OutletExoticComponentPlugProps } from "../../lib/types/plug.types";
import type { jsx, jsxs } from "react/jsx-runtime";
import type { jsxDEV } from "react/jsx-dev-runtime";

export interface JSXOutletRuntime {
  (
    type: OutletExoticComponent,
    overrideProps: OutletExoticComponentPlugProps,
    key?: ReactTypes.Key,
    source?: unknown,
    self?: unknown
  ): ReactTypes.JSX.Element;
}

export type JSXRuntime = typeof jsx;
export type JSXSRuntime = typeof jsxs;
export type JSXDEVRuntime = typeof jsxDEV;
