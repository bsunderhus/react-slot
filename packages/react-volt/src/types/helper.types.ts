import type { PlugProps } from "./plug.types";

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
