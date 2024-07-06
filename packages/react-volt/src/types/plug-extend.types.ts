import type { ObjectDataType } from "./helper.types";
import type { Plug } from "./plug.types";

type PlugOrObject = Plug | ObjectDataType;

type NormalizePlug<P extends PlugOrObject> =
  // if P is only unplugged then we return unplugged
  // if there was a way to short-circuit the type check we could have used it now
  // because an intersection of anything with null will either be null or never
  [P] extends [Plug.Unplugged]
    ? Plug.Unplugged
    : // if P is only a shorthand or unplugged then we ignore it
    // to ignore a type on an intersection you can use `unknown`
    [P] extends [Plug.Shorthand | Plug.Unplugged]
    ? unknown
    : // otherwise we omit the shorthand from the type
      // and return P which is a possible union of props and unplugged
      Exclude<P, Plug.Shorthand>;

type PlugPropsIntersection<Plugs extends PlugOrObject[]> = Plugs extends [
  infer Head extends PlugOrObject,
  ...infer Tail extends PlugOrObject[]
]
  ? NormalizePlug<Head> & PlugPropsIntersection<Tail>
  : unknown;

type ExtendedPlugProps<
  Plugs extends PlugOrObject[],
  Cache extends PlugOrObject[] = []
> = Plugs extends [infer Last extends PlugOrObject]
  ? PlugPropsIntersection<[...Cache, Last]>
  : Plugs extends [
      infer Head extends PlugOrObject,
      ...infer Tail extends PlugOrObject[]
    ]
  ? ExtendedPlugProps<Tail, [...Cache, Head]>
  : never;

export type ExtendedPlug<Plugs extends PlugOrObject[]> =
  | ExtendedPlugProps<Plugs>
  | Extract<Plugs[number], Plug.Unplugged>;
