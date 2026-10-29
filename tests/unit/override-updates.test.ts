// A per-connection rate-limit override maps onto Bottleneck options: a positive maxConcurrent or
// minTime is copied, a positive rpm becomes a reservoir that refills every minute, and zero, negative
// or non-numeric values fall through to the global defaults (an rpm of 0 would deplete the reservoir).
// loadOverrideMap fills a map from the connections that carry a plain-object override.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildOverrideUpdates,
  loadOverrideMap,
} from "../../open-sse/services/rateLimitManager/overrideUpdates.ts";

test("positive maxConcurrent and minTime are copied as they are", () => {
  assert.deepEqual(buildOverrideUpdates({ maxConcurrent: 3, minTime: 250 }), {
    maxConcurrent: 3,
    minTime: 250,
  });
});

test("a positive rpm becomes a reservoir that refills every minute", () => {
  assert.deepEqual(buildOverrideUpdates({ rpm: 60 }), {
    reservoir: 60,
    reservoirRefreshAmount: 60,
    reservoirRefreshInterval: 60 * 1000,
  });
});

test("zero, negative and non-numeric values produce no update", () => {
  assert.deepEqual(buildOverrideUpdates({ rpm: 0, minTime: 0, maxConcurrent: 0 }), {});
  assert.deepEqual(buildOverrideUpdates({ rpm: -5, minTime: -1, maxConcurrent: -2 }), {});
  assert.deepEqual(
    buildOverrideUpdates({ rpm: "60", minTime: null, maxConcurrent: NaN } as never),
    {}
  );
  assert.deepEqual(buildOverrideUpdates({}), {});
});

test("loadOverrideMap keeps only connections with a plain-object override, keyed by id", () => {
  const target = new Map();
  loadOverrideMap(target, [
    { id: 1, rateLimitOverrides: { rpm: 10 } },
    { id: "b", rateLimitOverrides: { minTime: 5 } },
    { id: "c", rateLimitOverrides: [1, 2] },
    { id: "d", rateLimitOverrides: null },
    { id: "e" },
  ]);
  assert.deepEqual([...target.keys()], ["1", "b"]);
  assert.deepEqual(target.get("1"), { rpm: 10 });
});

test("loadOverrideMap clears the map before filling it", () => {
  const target = new Map([["stale", { rpm: 1 }]]);
  loadOverrideMap(target, [{ id: "x", rateLimitOverrides: { rpm: 2 } }]);
  assert.deepEqual([...target.keys()], ["x"]);
});
