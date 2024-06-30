import type * as React from "react";
import { expectTypeOf, it, describe } from "vitest";
import type * as Distributive from "./distributive.types";

describe("Distributive types", () => {
  describe("Omit", () => {
    it("should work like native Omit on non-union types", () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result: Distributive.Omit<typeof obj, "a"> = { b: 2, c: 3 };
      expectTypeOf(result).toEqualTypeOf<Omit<typeof obj, "a">>();
    });
    it("should preserve union structures when omitting a property", () => {
      type O = { a: number; b: string } | { a: number; c: string };
      const obj: Omit<O, "a"> = {};
      const distributiveObj: Distributive.Omit<O, "a"> = obj as any;
      expectTypeOf(obj).toEqualTypeOf<{}>();
      expectTypeOf(distributiveObj).toEqualTypeOf<
        { b: string } | { c: string }
      >();
    });
  });
  describe("Pick", () => {
    it("should work like native Pick on non-union types", () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result: Distributive.Pick<typeof obj, "a"> = { a: 1 };
      expectTypeOf(result).toEqualTypeOf<Pick<typeof obj, "a">>();
    });
    it("should preserve union structures when picking a property", () => {
      type O = { a: number; b: string } | { a: string; c: string };
      const obj: Pick<O, "a"> = { a: 1 };
      const distributiveObj: Distributive.Pick<O, "a"> = obj as any;
      expectTypeOf(obj).toEqualTypeOf<{ a: number | string }>();
      expectTypeOf(distributiveObj).toEqualTypeOf<
        { a: number } | { a: string }
      >();
    });
  });
  describe("MouseEventHandler<button | a | div>", () => {
    type ElementType = HTMLButtonElement | HTMLAnchorElement | HTMLDivElement;
    const onClick: React.MouseEventHandler<ElementType> = (e) => {};
    const distributiveOnClick: Distributive.MouseEventHandler<ElementType> = (
      e
    ) => {};
    const event = undefined as unknown as Parameters<typeof onClick>[0];
    const distributiveEvent = undefined as unknown as Parameters<
      typeof distributiveOnClick
    >[0];

    it("should be equal to a handler with an union of mouse events", () => {
      expectTypeOf(distributiveOnClick).toEqualTypeOf<
        React.EventHandler<
          | React.MouseEvent<HTMLButtonElement>
          | React.MouseEvent<HTMLAnchorElement>
          | React.MouseEvent<HTMLDivElement>
        >
      >();
    });

    it('should match "React.MouseEventHandler<button | a | div>"', () => {
      expectTypeOf(distributiveOnClick).toMatchTypeOf(onClick);
    });

    it('should not be equal to "React.MouseEventHandler<button | a | div>"', () => {
      expectTypeOf(distributiveOnClick).not.toEqualTypeOf(onClick);
    });
    describe("event", () => {
      it('should be "React.MouseEvent<button> | React.MouseEvent<a> | React.MouseEvent<div>"', () => {
        () => {
          expectTypeOf(distributiveOnClick)
            .parameter(0)
            .toEqualTypeOf<
              | React.MouseEvent<HTMLButtonElement>
              | React.MouseEvent<HTMLAnchorElement>
              | React.MouseEvent<HTMLDivElement>
            >();
        };
      });
      it('should not be equal to "React.MouseEvent<button | a | div>"', () => {
        expectTypeOf(distributiveOnClick)
          .parameter(0)
          .not.toEqualTypeOf<Event>();
      });
      it('should match "React.MouseEvent<button | a | div>"', () => {
        expectTypeOf(distributiveOnClick).parameter(0).toMatchTypeOf(event);
        // THIS is the problematic test!
        // We're asserting here that react does not support distributive types in this case 💣
        expectTypeOf(event).not.toMatchTypeOf(distributiveEvent);
      });
    });
  });
});
