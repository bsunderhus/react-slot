import type * as ReactTypes from "react";
import type {
  IntrinsicSlots,
  IntrinsicProngs,
  FunctionComponentSlot,
  FunctionComponentProng,
} from "./helper.types";
import type { UnpluggedPlug } from "./plug.types";

/**
 * @public
 *
 * The base type of connector types.
 *
 * This should **ONLY** be used in type templates as in `extends ConnectorDataType`
 * it shouldn't be used as the type itself.
 *
 * > **Note:** _In the context of electrical systems the term contact is used to denote the point at which two or more conductors (plugs and outlets) meet in an electrical connection._
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > **Note [2]:** _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export type ContactDataType = ProngDataType | SlotDataType;

/**
 * @public
 *
 * The base type of connector types.
 *
 * This should **ONLY** be used in type templates as in `extends ProngDataType`
 * it shouldn't be used as the type itself.
 *
 * > **Note:** _In the context of electrical systems prongs are the contact points (the metal protuberance in a conductor) that are used to connect electrical devices to a power source._
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > **Note [2]:** _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export type ProngDataType =
  | keyof IntrinsicProngs
  // Due to contravariance on FC signature this has to be any
  | FunctionComponentProng<any>;

/**
 * @public
 *
 * The base type of connector types.
 *
 * This should **ONLY** be used in type templates as in `extends ContactDataType`
 * it shouldn't be used as the type itself.
 *
 * > **Note:** _In the context of electrical systems slots are the contact points (the holes in a conductor) that are used to connect electrical devices to a power source._
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > **Note [2]:** _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export type SlotDataType =
  | keyof IntrinsicSlots
  // Due to contravariance on FC signature this has to be any
  | FunctionComponentSlot<any>;

/**
 * @public
 *
 * The base type of a plug type.
 *
 * This should **ONLY** be used in type templates as in `extends PlugTypeDataType`
 * it shouldn't be used as the type itself.
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export type PlugTypeDataType = ContactDataType | PlugPropsDataType;

/**
 * @public
 *
 * The base type of plug properties.
 *
 * This should **ONLY** be used in type templates as in `extends PlugPropsDataType`
 * it shouldn't be used as the type itself.
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export type PlugPropsDataType =
  | IntrinsicProngPropsDataType
  | ComponentProngPropsDataType
  | IntrinsicSlotPropsDataType
  | ComponentSlotPropsDataType;

/**
 * @public
 *
 * The base type of component plug properties.
 *
 * This should **ONLY** be used in type templates as in `extends ComponentPlugPropsDataType`
 * it shouldn't be used as the type itself.
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export interface ComponentProngPropsDataType {
  Component: Extract<ProngDataType, Function>;
}

/**
 * @public
 *
 * The base type of component plug properties.
 *
 * This should **ONLY** be used in type templates as in `extends ComponentPlugPropsDataType`
 * it shouldn't be used as the type itself.
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export interface ComponentSlotPropsDataType {
  Component?: Extract<ProngDataType, Function>;
}

/**
 * @public
 *
 * The base type of plug properties.
 *
 * This should **ONLY** be used in type templates as in `extends IntrinsicPlugPropsDataType`
 * it shouldn't be used as the type itself.
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export interface IntrinsicSlotPropsDataType {
  /**
   * The intrinsic element type that the outlet is connected to.
   * This can be any valid HTML element (e.g. "div", "span", "h1", "button", etc.)
   * This property will be used to properly discriminate the type of the plug.
   */
  as?: Extract<ProngDataType, string>;
}

/**
 * @public
 *
 * The base type of plug properties.
 *
 * This should **ONLY** be used in type templates as in `extends IntrinsicPlugPropsDataType`
 * it shouldn't be used as the type itself.
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export interface IntrinsicProngPropsDataType {
  /**
   * The intrinsic element type that the outlet is connected to.
   * This can be any valid HTML element (e.g. "div", "span", "h1", "button", etc.)
   * This property will be used to properly discriminate the type of the plug.
   */
  as: Extract<ProngDataType, string>;
}

/**
 * @public
 *
 * The base type of a omni plug. Similar to ReactNode but without 'null | undefined'
 *
 * This should **ONLY** be used in type templates as in `extends SlotDataType`
 * it shouldn't be used as the type itself.
 *
 * > **Note:** _In the context of Javascript, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#data_types | data types} is the term used to refer to the primitive types of the language._
 *
 * > _The Suffix "DataType" will denote the building block types that will serve as "primitive" to all other types._
 */
export type OmniPlugDataType =
  | ReactTypes.ReactElement
  | string
  | number
  | Iterable<OmniPlugDataType>
  | ReactTypes.ReactPortal
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
export type PlugDataType = PlugPropsDataType | OmniPlugDataType | UnpluggedPlug;
