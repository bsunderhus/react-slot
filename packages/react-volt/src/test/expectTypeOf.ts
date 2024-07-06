import type { ExpectTypeOf } from "./expectTypeOf.types";

/**
 * @public
 *
 * A type asserter that can be used to assert the type of a plug.
 * This is useful to ensure that extending and adapting a plug will still maintain its type.
 */
export function expectTypeOf<
  Expected,
  const ExpectedLabel extends string = "Expected"
>(
  expected?: Expected,
  expectedLabel?: ExpectedLabel
): ExpectTypeOf<Expected, ExpectedLabel> {
  return _expectTypeOf;
}

const _expectTypeOf: ExpectTypeOf<unknown, string> = {
  toEquivalentTypeOf() {},
};

/* @__PURE__ */ expectTypeOf({}).toEquivalentTypeOf({});
