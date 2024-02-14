import {
  JSXAttribute,
  JSXElement,
  JSXIdentifier,
  JSXOpeningElement,
  JSXSpreadAttribute,
  Node,
  isJSXAttribute,
  isJSXElement,
  isJSXIdentifier,
  isStringLiteral,
} from "@babel/types";

export const isJSXSlotElement = (
  node: Node
): node is JSXElement & {
  openingElement: { name: JSXIdentifier };
} => {
  return (
    isJSXElement(node) &&
    isJSXIdentifier(node.openingElement.name) &&
    node.openingElement.name.name === "slot"
  );
};

export const isJSXNameAttribute = (
  attr: JSXAttribute | JSXSpreadAttribute
): attr is JSXAttribute => isJSXAttribute(attr) && attr.name.name === "name";

export function getJSXNameAttributeValue(node: JSXOpeningElement) {
  const nameAttributeIndex = node.attributes.findIndex(isJSXNameAttribute);
  if (nameAttributeIndex === -1) {
    throw new Error("slot name is required");
  }
  const nameAttribute = node.attributes[nameAttributeIndex] as JSXAttribute;

  if (!isStringLiteral(nameAttribute.value)) {
    throw new Error("slot name must be a string literal");
  }

  return nameAttribute.value.value;
}
