import type * as React from "react";

/**
 * HTML element types that are not allowed to have children.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Glossary/Void_element
 */
export type VoidIntrinsicElement =
  | "area"
  | "base"
  | "br"
  | "col"
  | "embed"
  | "hr"
  | "img"
  | "input"
  | "link"
  | "meta"
  | "param"
  | "source"
  | "track"
  | "wbr";

/**
 * Helper type for {@link PlugProps}. Modifies `React.JSX.IntrinsicElements[Type]`:
 * Removes legacy string ref.
 * Disallows children for empty tags like 'img'.
 */
export type IntrinsicElementProps<
  Type extends keyof React.JSX.IntrinsicElements
> = Type extends VoidIntrinsicElement
  ? PropsWithoutChildren<React.PropsWithRef<React.JSX.IntrinsicElements[Type]>>
  : React.PropsWithRef<React.JSX.IntrinsicElements[Type]>;

/**
 * Removes the 'children' prop from the given Props type.
 */
export type PropsWithoutChildren<P> = "children" extends keyof P
  ? DistributiveOmit<P, "children">
  : P;

/**
 * Helper type that works similar to Omit,
 * but when modifying an union type it will distribute the omission to all the union members.
 *
 * See [distributive conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types) for more information
 */
// Traditional Omit is basically equivalent to => Pick<T, Exclude<keyof T, K>>
//
// let's say we have Omit<{ a: string } | { b: string }, 'a'>
// equivalent to: Pick<{ a: string } | { b: string }, Exclude<keyof ({ a: string } | { b: string }), 'a'>>
// The expected result would be {} | { b: string }, the omission of 'a' from all the union members,
// but keyof ({ a: string } | { b: string }) is never as they don't share common keys
// so  Exclude<never, 'a'> is never,
// and Pick<{ a: string } | { b: string }, never> is {}.
//
// With DistributiveOmit on the other hand it becomes like this:
// DistributiveOmit<{ a: string } | { b: string }, 'a'>
// equivalent to: Omit<{ a: string }, 'a'> | Omit<{ b: string }, 'a'>
// Since every single Omit clause in this case is being applied to a single union member there's no conflicts on keyof evaluation and in the second clause Omit<{ b: string }, 'a'> becomes { b: string },
// so the result is {} | { b: string }, as expected.
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : T;

/**
 * Helper type that converts an union to an intersection.
 * It takes advantage of the contravariant behavior of function parameters to distribute the union over the intersection.
 * > The contravariant equivalent of an union is an intersection.
 */
export type UnionToIntersection<U> = (
  U extends any ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never;

/**
 * Helper type that checks if a type is an union.
 */
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;
