// Driver test for tests/unit/quality/launch-coverage.test.ts (run by it through the launch
// coverage runner, not by the unit suite). The parent process loads the fixture through the
// runner's loaders and calls classify() on every branch; a native child process (as launch
// tests spawn) also loads it without calling anything, so its V8 data for the same file has
// different offsets than a tsx-transformed load would.
import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";
import test from "node:test";

import { classify } from "./lazy-import.mjs";

test("classify takes every branch", () => {
  assert.equal(classify(10), "big");
  assert.equal(classify(-1), "negative");
  assert.equal(classify(1), "small");
});

test("a native child loads the fixture", () => {
  const url = new URL("./lazy-import.mjs", import.meta.url).href;
  const child = spawnSync(
    process.execPath,
    ["--input-type=module", "-e", `await import(${JSON.stringify(url)});`],
    { encoding: "utf8", env: { ...process.env, NODE_OPTIONS: "" } }
  );
  assert.equal(child.status, 0, child.stderr);
});
