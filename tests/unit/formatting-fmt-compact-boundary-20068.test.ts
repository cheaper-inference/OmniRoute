import test from "node:test";
import assert from "node:assert/strict";

const { fmtCompact } = await import("../../src/shared/utils/formatting.ts");

test("fmtCompact rolls over to M and B at rounding boundaries instead of showing 1000.0K or 1000.0M (#20068)", () => {
  // Boundary just below and at 1.0M rollover
  assert.equal(fmtCompact(999_949), "999.9K");
  assert.equal(fmtCompact(999_950), "1.0M");
  assert.equal(fmtCompact(1_000_000), "1.0M");

  // Boundary just below and at 1.0B rollover
  assert.equal(fmtCompact(999_949_999), "999.9M");
  assert.equal(fmtCompact(999_950_000), "1.0B");
  assert.equal(fmtCompact(999_999_999), "1.0B");
  assert.equal(fmtCompact(1_000_000_000), "1.0B");

  // Regular scales
  assert.equal(fmtCompact(1_000), "1.0K");
  assert.equal(fmtCompact(1_500), "1.5K");
  assert.equal(fmtCompact(2_500_000_000), "2.5B");
  assert.equal(fmtCompact(999), "999");

  // Zero and falsy values
  assert.equal(fmtCompact(0), "0");
  assert.equal(fmtCompact(null), "0");
  assert.equal(fmtCompact(undefined), "0");

  // Negative values
  assert.equal(fmtCompact(-999_950), "-1.0M");
  assert.equal(fmtCompact(-1_500), "-1.5K");
});
