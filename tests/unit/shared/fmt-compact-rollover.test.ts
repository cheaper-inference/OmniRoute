import { test } from "node:test";
import assert from "node:assert/strict";

import { fmtCompact } from "../../../src/shared/utils/formatting.ts";

test("fmtCompact promotes values that round up to the next unit", () => {
  assert.equal(fmtCompact(999_950), "1.0M");
  assert.equal(fmtCompact(999_999), "1.0M");
  assert.equal(fmtCompact(999_950_000), "1.0B");
  assert.equal(fmtCompact(999_999_999), "1.0B");
});

test("fmtCompact keeps values just below the rounding edge in the lower unit", () => {
  assert.equal(fmtCompact(999), "999");
  assert.equal(fmtCompact(1_000), "1.0K");
  assert.equal(fmtCompact(999_949), "999.9K");
  assert.equal(fmtCompact(1_000_000), "1.0M");
  assert.equal(fmtCompact(999_949_999), "999.9M");
  assert.equal(fmtCompact(1_500_000_000), "1.5B");
  assert.equal(fmtCompact(0), "0");
  assert.equal(fmtCompact(null), "0");
});
