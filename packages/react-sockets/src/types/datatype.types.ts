import type {
  ReactNode,
  ReactElement,
  ReactPortal,
  JSX,
  JSXElementConstructor,
} from "react";
import type { SocketStatus, _socketRefTypeSymbol } from "../constants";
import { SocketRenderer } from "./socket.types";

/**
 * @public
 *
 * The base type of socket type.
 *
 * This should **ONLY** be used in type templates as in `extends PlugDataType`
 * it shouldn't be used as the type itself.
 *
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export type SocketTypeDataType =
  | keyof JSX.IntrinsicElements
  | JSXElementConstructor<any>;

/**
 * @public
 *
 * The base type of plug properties.
 *
 * This should **ONLY** be used in type templates as in `extends PlugDataType`
 * it shouldn't be used as the type itself.
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export type PlugPropsDataType = {
  /**
   * The element type that the socket is connected to.
   */
  as?: SocketTypeDataType;
  /**
   * A render function that can be used to completely override the markup of the socket.
   * This is a dangerous feature and should be used with caution.
   */
  dangerouslyRenderSocket?: SocketRenderer<any>;
  /**
   * This cannot be internal because its used to infer the plug reference,
   * if removed from public API it'll break the type inference
   */
  [_socketRefTypeSymbol]?: unknown;
};

/**
 * @public
 *
 * The base type of a slot.
 *
 * This should **ONLY** be used in type templates as in `extends PlugDataType`
 * it shouldn't be used as the type itself.
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export type SlotDataType =
  | ReactElement
  | string
  | number
  | Iterable<SlotDataType>
  | ReactPortal
  | boolean;

/**
 * @public
 *
 * The base type of a plug.
 *
 * This should **ONLY** be used in type templates as in `extends PlugDataType`
 * it shouldn't be used as the type itself.
 *
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export type PlugDataType = PlugPropsDataType | SlotDataType | SocketStatus;
