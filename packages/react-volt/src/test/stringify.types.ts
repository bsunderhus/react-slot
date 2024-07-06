import type { FunctionDataType, IsNever } from "../lib/types/helper.types";

/**
 * ⚠️ **DANGEROUS TYPE, AVOID USING IT, DO NOT EXPORT**
 *
 * It relies on contravariant functions
 * to convert an union to an intersection.
 *
 * In an union of contravariant function parameters,
 * the equivalent value would be an intersection of the functions parameters
 */
type DangerousUnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * ⚠️ **DANGEROUS TYPE, AVOID USING IT, DO NOT EXPORT**
 *
 * In an intersection of incompatible functions the last function
 * is the one that will be used.
 * Whereas in a intersection of incompatible values (that are not functions),
 * the result is never
 */
type DangerousLastOfUnion<T> = DangerousUnionToIntersection<
  T extends any ? () => T : never
> extends infer I extends FunctionDataType
  ? ReturnType<I>
  : never;

type StringifyTuple<T extends any[], Separator extends string> = T extends [
  string
]
  ? T[0]
  : T extends [string, ...infer Rest extends string[]]
  ? `${T[0]}${Separator}${StringifyTuple<Rest, Separator>}`
  : never;

type TuplifyUnion<U, L = DangerousLastOfUnion<U>> = IsNever<U> extends true
  ? []
  : [...TuplifyUnion<Exclude<U, L>>, L];

export type Stringify<U, Separator extends string = ", "> = [U] extends [string]
  ? StringifyTuple<TuplifyUnion<U>, Separator>
  : "";
