import { _isOutletExoticComponent } from "../../lib/guards";
import type { OutletExoticComponentPlugProps } from "../../lib/types/plug.types";
import type { JSXOutletRuntime, JSXSRuntime, JSXRuntime } from "./types";

export function createJSX(
  runtime: JSXRuntime,
  outletRuntime: JSXOutletRuntime
): JSXRuntime {
  return function jsx(type, props, key, source, self) {
    if (_isOutletExoticComponent(type)) {
      return outletRuntime(
        type,
        props as OutletExoticComponentPlugProps,
        key,
        source,
        self
      );
    }
    return runtime(type, props, key, source, self);
  };
}
