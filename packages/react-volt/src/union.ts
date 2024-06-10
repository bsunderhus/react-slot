import type * as ReactTypes from "react";
import { forwardRef as _forwardRef } from "react";
import type { UnionToIntersection } from "./types/helper.types";
import type { PlugPropsDataType } from "./types/datatype.types";
import type { PlugRefElement } from "./types/plug.types";
import { id } from "./utils/id";

/**
 * @public
 *
 * Ensures that the event handler type is correctly inferred when constructing/destructuring
 * a plug. On the process of constructing/destructuring a plug, an event handler type can be
 * inferred as the union of all possible handlers (or `undefined`). This function ensures that
 * the event handler type is inferred as a single handler that receives the union of all possible
 * event types (this is a {@link https://web.archive.org/web/20220823104433/https://www.stephanboyer.com/post/132/what-are-covariance-and-contravariance | _contravariant_} type that is compatible with all unions).
 */
export const ensureEventHandlerType = id as <
  H extends ReactTypes.EventHandler<any> | undefined
>(
  handler: H
) => UnionToIntersection<H> | Extract<H, undefined>;

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
 */
export const ensureRefType: {
  <R extends ReactTypes.RefObject<any>>(ref: R): ReactTypes.RefObject<
    UnionToIntersection<R extends ReactTypes.RefObject<infer T> ? T : never>
  >;
  <R extends ReactTypes.RefCallback<unknown>>(ref: R): ReactTypes.RefCallback<
    R extends ReactTypes.RefCallback<infer T> ? T : never
  >;
  <R extends ReactTypes.Ref<any>>(ref: R): ReactTypes.Ref<
    UnionToIntersection<R extends ReactTypes.RefCallback<infer T> ? T : never>
  >;
} = id;

/**
 * @public
 *
 * Asserts that the event type of a synthetic event is inferred
 * as the intersection of all possible event types.
 *
 * > **Note:** This function is a no-op at runtime and is only used to help the TypeScript compiler, ideally it should be used with a `@__PURE__` annotation to ensure that it is removed by the minifier.
 *
 */
export const assertEventType: {
  <E extends ReactTypes.SyntheticEvent>(
    event: E
  ): asserts event is UnionToIntersection<E> & E;
} = id;

/**
 * @public
 *
 * Ensures that the event type of a synthetic event is inferred
 * as the intersection of all possible event types.
 *
 * This is equivalent to {@link assertEventType} but as an identity function.
 */
export const ensureEventType = id as <E extends ReactTypes.SyntheticEvent>(
  event: E
) => UnionToIntersection<E>;

/**
 * @public
 *
 * Equivalent to React's `forwardRef` but with a more accurate type inference for plug components.
 * This is useful when you want to forward a ref to a plug component that is described by an union of types.
 *
 * The problem with React's `forwardRef` is that it doesn't infer the correct type for the ref when the component is a union of types.
 * The specific type of the ref is inferred as the union of all possible types, which is not accurate.
 */
export const forwardRef = _forwardRef as <Props extends PlugPropsDataType>(
  fn: ReactTypes.ForwardRefRenderFunction<PlugRefElement<Props>, Props>
) => ReactTypes.ForwardRefExoticComponent<
  Props extends any
    ? Props & { ref?: ReactTypes.Ref<PlugRefElement<Props>> }
    : never
>;
