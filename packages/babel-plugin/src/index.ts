import type { NodePath, PluginObj } from "@babel/core";
import type { JSXElement } from "@babel/types";
import { getJSXNameAttributeValue, isJSXSlotElement } from "./utils/assert";
import { jsxSlotElement } from "./utils/jsxSlotElement";

/**
 * @public
 */
export default function plugin(): PluginObj {
  return {
    visitor: {
      JSXElement(path) {
        path.node.children = path.node.children.filter((child, index) => {
          if (!isJSXSlotElement(child)) {
            return true;
          }
          try {
            const name = getJSXNameAttributeValue(child.openingElement);
            path.node.openingElement.attributes.push(
              jsxSlotElement(name, child.children)
            );
          } catch (error: unknown) {
            if (error instanceof Error) {
              const childNode = path.get(
                "children." + index
              ) as NodePath<JSXElement>;
              throw childNode
                .get("openingElement")
                .buildCodeFrameError(error.message, Error);
            }
          }
          return false;
        });
      },
    },
  };
}
