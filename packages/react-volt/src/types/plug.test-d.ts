import type * as React from "react";
import { expectTypeOf, it, describe } from "vitest";
import type { Default, PickDefault, Plug, PlugProps } from "./plug.types";

describe("PickDefault", () => {
  it("should return never if no Default Plug provided", () => {
    expectTypeOf<
      PickDefault<Plug<PlugProps.Intrinsics.A>>
    >().toEqualTypeOf<never>();
  });
  it("should return never if no Default Plug provided in an union", () => {
    expectTypeOf<
      PickDefault<Plug<PlugProps.Intrinsics.A | PlugProps.Intrinsics.Button>>
    >().toEqualTypeOf<never>();
  });
  it("should be distributive", () => {
    expectTypeOf<
      PickDefault<Plug<Default<PlugProps.Intrinsics.A>>>
    >().toEqualTypeOf<Default<PlugProps.Intrinsics.A>>();
    expectTypeOf<
      PickDefault<
        Plug<Default<PlugProps.Intrinsics.A> | PlugProps.Intrinsics.Button>
      >
    >().toEqualTypeOf<Default<PlugProps.Intrinsics.A>>();
    expectTypeOf<
      PickDefault<
        Plug<Default<PlugProps.Intrinsics.A | PlugProps.Intrinsics.Button>>
      >
    >().toEqualTypeOf<
      Default<PlugProps.Intrinsics.A | PlugProps.Intrinsics.Button>
    >();
  });
});

describe("Plug.Shorthand", () => {
  it("should be a valid Plug", () => {
    expectTypeOf<Plug.Shorthand>().toMatchTypeOf<Plug>();
  });
  it('should be equal to "JSX.Element | string | number | Iterable<ReactNode> | boolean" if no generic is provided', () => {
    expectTypeOf<Plug.Shorthand>().toEqualTypeOf<
      string | number | boolean | React.JSX.Element | Iterable<React.ReactNode>
    >();
  });
  it('should be never, if "Props" has no "children"', () => {
    expectTypeOf<Plug.Shorthand<PlugProps>>().toEqualTypeOf<never>();
  });
  it('should be never, if "Props" has other required properties than just "children"', () => {
    expectTypeOf<
      Plug.Shorthand<{ children?: any; req: 1 } & PlugProps>
    >().toEqualTypeOf<never>();
  });
  it('should be never, if "children" is not one of "Plug.Shorthand"', () => {
    expectTypeOf<
      Plug.Shorthand<{ children?: () => void } & PlugProps>
    >().toEqualTypeOf<never>();
  });
  it('should be "Plug.Shorthand", if "children" is any or unknown', () => {
    expectTypeOf<
      Plug.Shorthand<{ children?: any } & PlugProps>
    >().toEqualTypeOf<Plug.Shorthand>();
    expectTypeOf<
      Plug.Shorthand<{ children: any } & PlugProps>
    >().toEqualTypeOf<Plug.Shorthand>();
    expectTypeOf<
      Plug.Shorthand<{ children?: unknown } & PlugProps>
    >().toEqualTypeOf<Plug.Shorthand>();
    expectTypeOf<
      Plug.Shorthand<{ children: unknown } & PlugProps>
    >().toEqualTypeOf<Plug.Shorthand>();
  });
  it('should match "Plug.Shorthand", if "children" matches it', () => {
    expectTypeOf<
      Plug.Shorthand<{ children?: string } & PlugProps>
    >().toEqualTypeOf<Extract<Plug.Shorthand, string>>();
    expectTypeOf<
      Plug.Shorthand<{ children?: number } & PlugProps>
    >().toEqualTypeOf<Extract<Plug.Shorthand, number>>();
    expectTypeOf<
      Plug.Shorthand<{ children?: Iterable<React.ReactNode> } & PlugProps>
    >().toEqualTypeOf<Extract<Plug.Shorthand, Iterable<React.ReactNode>>>();
    expectTypeOf<
      Plug.Shorthand<{ children?: boolean } & PlugProps>
    >().toEqualTypeOf<Extract<Plug.Shorthand, boolean>>();
    expectTypeOf<
      Plug.Shorthand<{ children?: JSX.Element } & PlugProps>
    >().toEqualTypeOf<Extract<Plug.Shorthand, JSX.Element>>();
    expectTypeOf<
      Plug.Shorthand<
        {
          children?:
            | string
            | number
            | boolean
            | React.JSX.Element
            | Iterable<React.ReactNode>;
        } & PlugProps
      >
    >().toEqualTypeOf<Plug.Shorthand>();
    expectTypeOf<
      Plug.Shorthand<
        {
          children?:
            | string
            | number
            | boolean
            | React.JSX.Element
            | Iterable<React.ReactNode>
            | (() => void);
        } & PlugProps
      >
    >().toEqualTypeOf<Plug.Shorthand>();
  });
});

describe("PlugProps", () => {
  it("should be a valid Plug", () => {
    expectTypeOf<PlugProps>().toMatchTypeOf<Plug>();
  });
});
