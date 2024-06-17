import type { PlugProps } from "./plug.types";

type DistributiveOmit<T, K extends keyof any> = T extends unknown
  ? Omit<T, K>
  : T;

type DistributivePick<T, K> = T extends unknown ? Pick<T, K & keyof T> : never;

/**
 * @public
 *
 * Helper types that are used to manipulate types,
 * but respecting the distributive nature of conditional types.
 *
 * See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types} for more information
 */
export namespace Distributive {
  /**
   * @public
   *
   * Helper type that works similar to Omit,
   * but when modifying an union type it will distribute the omission to all the union members.
   *
   * See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types} for more information
   */
  export type Omit<T, K extends keyof any> = DistributiveOmit<T, K>;

  /**
   * @public
   *
   * Helper type that works similar to Pick,
   * but when modifying an union type it will distribute the picking to all the union members.
   *
   * See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types} for more information
   */
  export type Pick<T, K> = DistributivePick<T, K>;
}

/**
 * Helper type that is equivalent to `never`
 * but it's more descriptive.
 */
export type Never<Msg extends string> = Msg & never;

/**
 * Internal Helper type that picks from an union of plug properties the ones that are {@link Default}.
 *
 * {@link Default} properties are the ones that have `as` property as optional.
 *
 * @example
 * ```ts
 *  type PickingTheDefaults =
 *  PickDefault<
 *    | Default<PlugProps<'button'>>
 *    | PlugProps<'a'>
 *    | PlugProps<'div'>
 *  > // Default<PlugProps<'button'>>
 * ```
 */
export type PickDefault<Props extends PlugProps> =
  /**
   * Props extends unknown is a distributive conditional on unions (See {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | distributive conditional types} for more information)
   */
  Props extends unknown
    ? undefined extends Props["as"]
      ? Props
      : Never<"Props is not default.">
    : never;
