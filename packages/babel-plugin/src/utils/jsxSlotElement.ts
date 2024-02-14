import {
  JSXElement,
  jsxAttribute,
  jsxClosingFragment,
  jsxExpressionContainer,
  jsxFragment,
  jsxIdentifier,
  jsxOpeningFragment,
} from "@babel/types";

export const jsxSlotElement = (
  name: string,
  children: JSXElement["children"]
) =>
  jsxAttribute(
    jsxIdentifier(name),
    jsxExpressionContainer(
      jsxFragment(jsxOpeningFragment(), jsxClosingFragment(), children)
    )
  );
