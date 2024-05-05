import * as React from "react";
import { isIterable } from "./isIterable";

export const isValidNode = (node: unknown): node is React.ReactNode =>
  typeof node === "string" ||
  typeof node === "number" ||
  isIterable(node) ||
  React.isValidElement(node);
