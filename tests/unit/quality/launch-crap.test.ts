import test from "node:test";
import assert from "node:assert/strict";

import { crapScore } from "../../../scripts/quality/launch-quality.mjs";

// CRAP = cc^2 * (1 - coverage)^3 + cc

test("crap: cc 5 with no coverage is 5^2 * 1 + 5 = 30", () => {
  assert.equal(crapScore(5, 0), 30);
});

test("crap: cc 10 at 50% coverage is 100 * 0.125 + 10 = 22.5", () => {
  assert.equal(crapScore(10, 0.5), 22.5);
});

test("crap: full coverage reduces to cc", () => {
  assert.equal(crapScore(7, 1), 7);
});
