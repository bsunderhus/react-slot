import type { ReactEventHandler, Ref, RefCallback, RefObject } from "react";
import type { UnionToIntersection } from "./types/helper.types";

type EnsureEventHandlerType = {
  <H extends ReactEventHandler | undefined>(handler: H):
    | ReactEventHandler<H extends ReactEventHandler<infer T> ? T : never>
    | Extract<H, undefined>;
};

type EnsureRefType = {
  <R extends RefObject<any>>(ref: R): RefObject<
    UnionToIntersection<R extends RefObject<infer T> ? T : never>
  >;
  <R extends RefCallback<unknown>>(ref: R): RefCallback<
    R extends RefCallback<infer T> ? T : never
  >;
  <R extends Ref<any>, T>(ref: R): Ref<
    UnionToIntersection<R extends RefCallback<infer T> ? T : never>
  >;
};

const noop: (...args: any[]) => any = () => {};

/**
 * @public
 *
 * Ensures that the event handler type is correctly inferred when constructing/destructuring
 * a plug. On the process of constructing/destructuring a plug, an event handler type can be
 * inferred as the union of all possible handlers (or `undefined`). This function ensures that
 * the event handler type is inferred as a single handler that receives the union of all possible
 * event types (this is a {@link https://web.archive.org/web/20220823104433/https://www.stephanboyer.com/post/132/what-are-covariance-and-contravariance | _contravariant_} type that is compatible with all unions).
 */
export const ensureEventHandlerType: EnsureEventHandlerType = noop;

/**
 * @public
 *
 * Ensures that the ref type is correctly inferred when constructing/destructuring
 * a plug. On the process of constructing/destructuring a plug, the ref type can be
 * erroneously inferred as `Ref<HTMLButtonElement> | Ref<HTMLDivElement> | Ref<...>`.
 * This function ensures that the ref type is inferred as:
 * `Ref<HTMLButtonElement & HTMLDivElement & ...>` as on construction/destructuring there is no way to tell the exact type.
 * This is not the correct type (there's no such thing as an intersection of HTML elements, but it is a {@link https://web.archive.org/web/20220823104433/https://www.stephanboyer.com/post/132/what-are-covariance-and-contravariance | _covariant_} type that is compatible with all unions).
 * but it is the only type that will suffice for the ref type to be correctly inferred.
 *
 * @param ref - The ref to ensure the type of
 *
 * @example
 * ```tsx
 * type ButtonProps = PlugProps<'button?' | 'a' | 'div'>
 *
 * const Button = (props: ButtonProps) => {
 *    const internalRef = useRef<HTMLButtonElement | HTMLAnchor | HTMLDivElement>(null);
 *    const Root = outlet.lockedIn<'button' | 'a' | 'div'>('button', {
 *      ...props,
 *      // Error: 💣
 *      // Type 'Ref<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>'
 *      // is not assignable to type
 *      // 'Ref<HTMLButtonElement> | Ref<HTMLAnchorElement> | Ref<HTMLDivElement>'
 *      ref: internalRef,
 *      // ✅
 *      // ensureRefType ensures that the ref type is inferred as:
 *      // 'Ref<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>'
 *      ref: ensureRefType(ref),
 *   });
 * }
 * ```
 *
 *
 */
export const ensureRefType: EnsureRefType = noop;
