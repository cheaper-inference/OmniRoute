import test from "node:test";
import assert from "node:assert/strict";

import { packPages, samePaging } from "../../src/app/(dashboard)/home/quotaPaging.ts";

test("packPages: everything fits in one page, nothing to space out", () => {
  const result = packPages([100, 100, 100], 400);
  assert.deepEqual(result.pageStarts, [true, false, false]);
  assert.deepEqual(result.spacers, [0, 0, 100]);
});

test("packPages: pairs of two when two fit, leaving the rest of the page as spacer", () => {
  const result = packPages([150, 150, 150, 150, 150], 340);
  assert.deepEqual(result.pageStarts, [true, false, true, false, true]);
  assert.deepEqual(result.spacers, [0, 40, 0, 40, 190]);
});

test("packPages: boundary — a section that exactly fills the limit stays, one pixel more moves on", () => {
  const fits = packPages([199, 199], 400);
  assert.deepEqual(fits.pageStarts, [true, false]);
  const overflows = packPages([199, 200], 400);
  assert.deepEqual(overflows.pageStarts, [true, true]);
  assert.deepEqual(overflows.spacers, [201, 200]);
});

test("packPages: pages follow the real heights, not a fixed count", () => {
  const result = packPages([100, 250, 100, 100, 100], 360);
  assert.deepEqual(result.pageStarts, [true, false, true, false, false]);
  assert.deepEqual(result.spacers, [0, 10, 0, 0, 60]);
});

test("packPages: a section taller than the viewport gets its own page and no spacer", () => {
  const result = packPages([100, 900, 100], 400);
  assert.deepEqual(result.pageStarts, [true, true, true]);
  assert.deepEqual(result.spacers, [300, 0, 300]);
});

test("packPages: empty input, an unknown viewport and a zero viewport do not throw", () => {
  assert.deepEqual(packPages([], 400), { pageStarts: [], spacers: [] });
  assert.deepEqual(packPages([100, 100], 0), { pageStarts: [true, false], spacers: [0, 0] });
  assert.deepEqual(
    packPages([300, 300], 400).spacers,
    [100, 0].map((v, i) => (i === 1 ? 100 : v))
  );
  assert.deepEqual(packPages([100, 100], Number.NaN), {
    pageStarts: [true, false],
    spacers: [0, 0],
  });
});

test("samePaging: equal results match, a different page start or spacer does not", () => {
  const a = packPages([150, 150, 150], 340);
  assert.equal(samePaging(a, packPages([150, 150, 150], 340)), true);
  assert.equal(samePaging(a, packPages([150, 150, 150], 460)), false);
  assert.equal(samePaging(a, packPages([150, 150], 340)), false);
});
