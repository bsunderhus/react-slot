import type * as React from "react";
import { expectTypeOf, it, describe } from "vitest";
import type * as Distributive from "./distributive-types";

type ClickElementType = HTMLButtonElement | HTMLAnchorElement | HTMLDivElement;

const onClick: Required<
  Distributive.Pick<
    React.JSX.IntrinsicElements["button" | "a" | "div"],
    "onClick"
  >
>["onClick"] = () => {};

const distributiveOnClick: Distributive.MouseEventHandler<ClickElementType> =
  onClick;

const clickEvent = undefined as unknown as Parameters<typeof onClick>[0];

const distributiveClickEvent = undefined as unknown as Parameters<
  typeof distributiveOnClick
>[0];

describe("Distributive", () => {
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
  describe("MouseEventHandler", () => {
    it("should be equal to a handler with an union of mouse events", () => {
      expectTypeOf(distributiveOnClick).toEqualTypeOf<
        React.EventHandler<
          | React.MouseEvent<HTMLButtonElement>
          | React.MouseEvent<HTMLAnchorElement>
          | React.MouseEvent<HTMLDivElement>
        >
      >();
    });

    it('should match "React.MouseEventHandler"', () => {
      expectTypeOf(distributiveOnClick).toMatchTypeOf(onClick);
      expectTypeOf(onClick).toMatchTypeOf(distributiveOnClick);
    });

    it('should not be equal to "React.MouseEventHandler"', () => {
      expectTypeOf(distributiveOnClick).not.toEqualTypeOf(onClick);
    });
    it("distributive should be callable", () => {
      expectTypeOf(distributiveOnClick).toBeCallableWith(clickEvent);
      expectTypeOf(distributiveOnClick).toBeCallableWith(
        distributiveClickEvent
      );
      // @ts-expect-error 💣
      expectTypeOf(onClick).toBeCallableWith(clickEvent);
      // @ts-expect-error 💣
      expectTypeOf(onClick).toBeCallableWith(distributiveClickEvent);
    });
  });
  describe("MouseEvent", () => {
    it('should be equal to union of "React.MouseEvent"', () => {
      () => {
        expectTypeOf(distributiveClickEvent).toEqualTypeOf<
          | React.MouseEvent<HTMLButtonElement>
          | React.MouseEvent<HTMLAnchorElement>
          | React.MouseEvent<HTMLDivElement>
        >();
      };
    });
    it('should be equal to "React.MouseEvent"', () => {
      expectTypeOf(distributiveClickEvent).toEqualTypeOf(clickEvent);
    });
    it('should match to "React.MouseEvent"', () => {
      expectTypeOf(distributiveClickEvent).toMatchTypeOf(clickEvent);
      expectTypeOf(clickEvent).toMatchTypeOf(distributiveClickEvent);
    });
  });
});

/**
 * This is what breaks when using classic react event handlers!
 *
 * 1. event handler is not callable with an union of events.
 * 2. event handler is only callable with an intersection of the events
 *    * an intersection of events is dangerous. By using it, type leakage will happen (you might use an anchor property while the event came from a button element)
 * 3. event handlers will infer argument type as any 💣💣
 *    * a quick fix for this problem is to declare the intersection 💣💣
 * 4. if the argument is properly declared as an union then we're back at the not callable problem 🥲🥲
 */
describe("React.MouseEventHandler", () => {
  const clickEventIntersection = undefined as unknown as React.MouseEvent<
    HTMLButtonElement & HTMLAnchorElement & HTMLDivElement
  >;
  it("is not be callable with union", () => {
    // @ts-expect-error 💣
    expectTypeOf(onClick).toBeCallableWith(clickEvent);
    // @ts-expect-error 💣
    expectTypeOf(onClick).toBeCallableWith(distributiveClickEvent);
  });
  it("is callable with intersection", () => {
    // 💣💣
    expectTypeOf(onClick).toBeCallableWith(clickEventIntersection);
  });
  it("fails to infer the argument type", () => {
    const handleClick: Required<
      Distributive.Pick<
        React.JSX.IntrinsicElements["button" | "a" | "div"],
        "onClick"
      >
    >["onClick"] =
      //@ts-expect-error - Parameter 'event' implicitly has an 'any' type.ts(7006)
      (event) => {};
  });
  it("leak types if intersection is used as quick fix for the argument type", () => {
    const handleClick: Required<
      Distributive.Pick<
        React.JSX.IntrinsicElements["button" | "a" | "div"],
        "onClick"
      >
    >["onClick"] = (
      event: React.MouseEvent<
        HTMLButtonElement & HTMLAnchorElement & HTMLDivElement
      >
    ) => {
      // 💣💣💣
      // this should fail, as we haven't verified the element type
      event.currentTarget.href;
      if (event.currentTarget instanceof HTMLAnchorElement) {
        event.currentTarget.href;
      }
      onClick(event);
    };
  });
  it("if argument is properly declared as union, then we're back into the not callable with unions problem", () => {
    const handleClick: Required<
      Distributive.Pick<
        React.JSX.IntrinsicElements["button" | "a" | "div"],
        "onClick"
      >
    >["onClick"] = (
      event: React.MouseEvent<
        HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
      >
    ) => {
      // @ts-expect-error this should fail, as we haven't verified the element type
      event.currentTarget.href;
      if (event.currentTarget instanceof HTMLAnchorElement) {
        event.currentTarget.href;
      }
      // @ts-expect-error onClick is not callable, only if it was an intersection 🥲🥲
      onClick(event);
    };
  });
});
