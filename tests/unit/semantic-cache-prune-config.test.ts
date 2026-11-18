import test from "node:test";
import assert from "node:assert/strict";
import { clearInterval, setInterval } from "node:timers";
import { getSemanticCachePruneConfig } from "../../src/lib/jobs/semanticCachePruneConfig.ts";

const defaults = { intervalMs: 1800000, batchSize: 2000, maxBatches: 50, maxRows: 0 };
const variables = {
  intervalMs: "OMNIROUTE_SEMANTIC_CACHE_PRUNE_INTERVAL_MS",
  batchSize: "OMNIROUTE_SEMANTIC_CACHE_PRUNE_BATCH_SIZE",
  maxBatches: "OMNIROUTE_SEMANTIC_CACHE_PRUNE_MAX_BATCHES",
  maxRows: "OMNIROUTE_SEMANTIC_CACHE_MAX_ROWS",
};

test("unset configuration uses defaults", () => {
  assert.deepEqual(getSemanticCachePruneConfig({}), defaults);
});

for (const [field, variable] of Object.entries(variables)) {
  for (const raw of ["", " ", "invalid", "12oops", "NaN", "Infinity", "-1", "-0.5"]) {
    test(`${field}: ${JSON.stringify(raw)} falls back`, () => {
      assert.deepEqual(getSemanticCachePruneConfig({ [variable]: raw }), defaults);
    });
  }
}

const intervalCases: Array<[string, number]> = [
  ["2147483647", 2147483647],
  ["2147483648", 2147483647],
  ["2592000000", 2147483647],
  ["1e300", 2147483647],
];
for (const [raw, expected] of intervalCases) {
  test(`intervalMs: ${raw} resolves to Node's safe maximum ${expected}`, () => {
    assert.deepEqual(getSemanticCachePruneConfig({ [variables.intervalMs]: raw }), {
      ...defaults,
      intervalMs: expected,
    });
  });

  test(`intervalMs: ${raw} creates a real timer with safe effective delay`, () => {
    const { intervalMs } = getSemanticCachePruneConfig({ [variables.intervalMs]: raw });
    const timer = setInterval(() => {}, intervalMs);
    try {
      // Node stores the actual delay here; an overflowing input silently becomes 1ms.
      const effectiveDelay = (timer as NodeJS.Timeout & { _idleTimeout: number })._idleTimeout;
      assert.equal(effectiveDelay, expected);
    } finally {
      clearInterval(timer);
    }
  });
}

const cases: Array<[keyof typeof defaults, string, number]> = [
  ["intervalMs", "0", 0],
  ["intervalMs", "1", 1800000],
  ["intervalMs", "59999", 1800000],
  ["intervalMs", "60000", 60000],
  ["intervalMs", "120000", 120000],
  ["batchSize", "0", 100],
  ["batchSize", "99", 100],
  ["batchSize", "100", 100],
  ["batchSize", "2500", 2500],
  ["batchSize", "50000", 50000],
  ["batchSize", "50001", 50000],
  ["batchSize", "100.9", 100],
  ["maxBatches", "0", 1],
  ["maxBatches", "1", 1],
  ["maxBatches", "10000", 10000],
  ["maxBatches", "10001", 10000],
  ["maxBatches", "2.9", 2],
  ["maxRows", "0", 0],
  ["maxRows", "1234", 1234],
  ["maxRows", "12.9", 12],
];
for (const [field, raw, expected] of cases) {
  test(`${field}: ${raw} resolves to ${expected}`, () => {
    assert.deepEqual(getSemanticCachePruneConfig({ [variables[field]]: raw }), {
      ...defaults,
      [field]: expected,
    });
  });
}
