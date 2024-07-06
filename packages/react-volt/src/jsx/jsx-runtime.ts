import * as Runtime from "react/jsx-runtime";
import { createJSX } from "./utils/createJSX";
import { jsxOutlet } from "./utils/jsxOutlet";
import { jsxsOutlet } from "./utils/jsxsOutlet";

/**
 * @public
 */
export const jsx = createJSX(Runtime.jsx, jsxOutlet);

/**
 * @public
 */
export const jsxs = createJSX(Runtime.jsxs, jsxsOutlet);
