import type { ReactEventHandler, Ref, RefCallback, RefObject } from "react";
import type { UnionToIntersection } from "./types/helper.types";

export function ensureEventHandlerType<H extends ReactEventHandler | undefined>(
  handler: H
):
  | ReactEventHandler<H extends ReactEventHandler<infer T> ? T : never>
  | Extract<H, undefined>;
export function ensureEventHandlerType<V>(value: V): V {
  return value;
}

export function ensureRefType<R extends RefCallback<unknown>>(
  ref: R
): RefCallback<R extends RefCallback<infer T> ? T : never>;
export function ensureRefType<R extends RefObject<any>>(
  ref: R
): RefObject<UnionToIntersection<R extends RefObject<infer T> ? T : never>>;
export function ensureRefType<R extends Ref<any>, T>(
  ref: R
): Ref<UnionToIntersection<R extends RefCallback<infer T> ? T : never>>;
export function ensureRefType<V>(value: V): V {
  return value;
}
