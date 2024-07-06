import { createJSX } from "./utils/createJSX";
import { jsxDEVOutlet } from "./utils/jsxDEVOutlet";
import * as DevRuntime from "react/jsx-dev-runtime";

/**
 * @public
 */
export const jsxDEV = createJSX(DevRuntime.jsxDEV, jsxDEVOutlet);
