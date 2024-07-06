import { describe, expect, it } from "vitest";
import { outlet } from "./outlet";
import { _isOutletExoticComponent } from "./guards";

describe("_isOutletExoticComponent", () => {
  it("should return true when an outlet is provided", () => {
    expect(_isOutletExoticComponent(outlet({ as: "div" }))).toBe(true);
  });
});
