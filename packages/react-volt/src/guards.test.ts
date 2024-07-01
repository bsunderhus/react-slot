import { describe, expect, it } from "vitest";
import { outlet } from "./outlet";
import { isOutlet } from "./guards";

describe("isOutlet", () => {
  it("should return true when an outlet is provided", () => {
    expect(isOutlet(outlet("div", {}))).toBe(true);
  });
});
