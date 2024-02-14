import fs from "fs/promises";
import JSXPlugin from "@babel/plugin-syntax-jsx";
import { test, expect } from "vitest";
import * as babel from "@babel/core";

import ReactSlotPlugin from "./index";

test.each(await fs.readdir("./src/__snapshots__"))("snapshot %s", (test) => {
  const result = babel.transformFileSync(
    `./src/__snapshots__/${test}/input.tsx.snap`,
    {
      plugins: [JSXPlugin, ReactSlotPlugin],
    }
  );
  expect(result?.code).toMatchFileSnapshot(
    `./__snapshots__/${test}/output.tsx.snap`
  );
});
