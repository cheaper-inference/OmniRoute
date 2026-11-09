import test from "node:test";
import assert from "node:assert/strict";
import {
  integrationPlanFromCiJob,
  executeIntegrationPlan,
  integrationPartitions,
} from "../../../scripts/quality/integration-shards.mjs";

const base =
  'cross-env DISABLE_SQLITE_AUTO_BACKUP=true node --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit --test-concurrency=1 --test-reporter=spec --test-reporter=./scripts/ci/integration-progress-reporter.mjs --test-reporter-destination=stdout --test-reporter-destination=stderr tests/integration/*.test.ts "tests/integration/combo-matrix/*.test.ts"';
const scripts = {
  "test:integration": base,
  "test:integration:ci":
    "cross-env DISABLE_SQLITE_AUTO_BACKUP=true node scripts/ci/run-integration-shard.mjs",
};
const job = () => ({
  "timeout-minutes": 15,
  strategy: { "fail-fast": false, matrix: { shard: [1, 2, 3, 4] } },
  steps: [{ run: "npm run test:integration:ci", env: { TEST_SHARD: "${{ matrix.shard }}/4" } }],
});
const plan = () => integrationPlanFromCiJob(job(), scripts);

const passed = () => ({
  code: 0,
  receipt: { outcome: "PASS" },
  out: "SYNTHETIC_RAW_OUTPUT_MUST_NOT_ACCUMULATE",
});

test("uses each CI matrix leg once, with its exact alias, shard and job deadline", () => {
  const value = plan();
  assert.equal(value.total, 4);
  assert.equal(value.maxConcurrent, 1);
  assert.equal(value.timeoutMs, 900000);
  assert.deepEqual(
    value.commands.map((c) => c.env),
    [1, 2, 3, 4].map((i) => ({ TEST_SHARD: `${i}/4` }))
  );
  assert.ok(
    value.commands.every((c) => JSON.stringify(c.args) === '["run","test:integration:ci"]')
  );
});

for (const [kind, mutate] of [
  [
    "missing leg",
    (value) => {
      value.strategy.matrix.shard = [1, 2, 4];
    },
  ],
  [
    "duplicate leg",
    (value) => {
      value.strategy.matrix.shard = [1, 2, 3, 3];
    },
  ],
  [
    "denominator drift",
    (value) => {
      value.steps[0].env.TEST_SHARD = "${{ matrix.shard }}/5";
    },
  ],
  [
    "unknown command",
    (value) => {
      value.steps[0].run = "npm run test:integration";
    },
  ],
  [
    "duplicate command",
    (value) => {
      value.steps.push(value.steps[0]);
    },
  ],
  [
    "missing deadline",
    (value) => {
      delete value["timeout-minutes"];
    },
  ],
  [
    "non-finite deadline",
    (value) => {
      value["timeout-minutes"] = Infinity;
    },
  ],
  [
    "changed fail-fast policy",
    (value) => {
      value.strategy["fail-fast"] = true;
    },
  ],
]) {
  test(`rejects ${kind} before planning an incomplete or different suite`, () => {
    const value = job();
    mutate(value);
    assert.throws(() => integrationPlanFromCiJob(value, scripts), /INTEGRATION_CI_PLAN_INVALID/);
  });
}

test("rejects changed filters, selection, preloads or isolation between the two aliases", () => {
  for (const [alias, changed] of [
    ["test:integration", base.replace("--test-force-exit ", "")],
    ["test:integration", base.replace("--test-concurrency=1", "--test-concurrency=4")],
    ["test:integration", base.replace("--import tsx/esm ", "")],
    ["test:integration:ci", scripts["test:integration:ci"] + " --test-name-pattern=smoke"],
    ["test:integration", base.replace("combo-matrix", "combo-live")],
  ])
    assert.throws(() => integrationPlanFromCiJob(job(), { ...scripts, [alias]: changed }));
});

test("147 unique file fixtures partition into 1/49/49/48 with no duplication or omission", () => {
  const files = [
    "tests/integration/batch-e2e-rate-limit.test.ts",
    ...Array.from({ length: 146 }, (_, i) => `tests/integration/file-${i}.test.ts`),
  ];
  const shards = integrationPartitions(files);
  assert.deepEqual(
    shards.map((part) => part.length),
    [1, 49, 49, 48]
  );
  assert.equal(new Set(shards.flat()).size, 147);
  assert.deepEqual([...shards.flat()].sort(), [...files].sort());
});

test("rejects a three-leg matrix instead of confusing internal partitions with CI identity", () => {
  const value = job();
  value.strategy.matrix.shard = [1, 2, 3];
  value.steps[0].env.TEST_SHARD = "${{ matrix.shard }}/3";
  assert.throws(() => integrationPlanFromCiJob(value, scripts), /INTEGRATION_CI_PLAN_INVALID/);
});

test("runs one shard at a time and preserves CI fail-fast=false after an actual failure", async () => {
  let active = 0,
    peak = 0;
  const calls = [];
  const result = await executeIntegrationPlan(plan(), async (args, options) => {
    active++;
    peak = Math.max(peak, active);
    calls.push({ args, ...options });
    await Promise.resolve();
    active--;
    return options.env.TEST_SHARD === "2/4" ? { code: 1, receipt: { outcome: "FAIL" } } : passed();
  });
  assert.equal(peak, 1);
  assert.equal(calls.length, 4);
  assert.ok(calls.every((call) => call.timeout === 900000));
  assert.notEqual(result.code, 0);
  assert.match(result.detail, /integration shard 2\/4 FAIL/);
  assert.doesNotMatch(result.out, /SYNTHETIC_RAW_OUTPUT/);
});

test("all four completed PASS receipts are required for green", async () => {
  assert.equal((await executeIntegrationPlan(plan(), async () => passed())).code, 0);
  for (const failed of [
    { code: 124, receipt: { outcome: "TIMEOUT" } },
    { code: 1, receipt: { outcome: "CANCELLED" } },
    { code: 0 },
    { code: 0, receipt: { outcome: "FAIL" } },
    undefined,
  ]) {
    let calls = 0;
    const result = await executeIntegrationPlan(plan(), async () =>
      ++calls === 3 ? failed : passed()
    );
    assert.equal(calls, 4);
    assert.notEqual(result.code, 0);
  }
});

test("missing or duplicate planned legs cannot report green or start partial work", async () => {
  for (const changed of [
    (value) => {
      value.commands.pop();
    },
    (value) => {
      value.commands[3] = value.commands[2];
    },
    (value) => {
      value.commands[0].args.push("--smoke");
    },
    (value) => {
      value.maxConcurrent = 4;
    },
  ]) {
    const value = plan();
    changed(value);
    let calls = 0;
    const result = await executeIntegrationPlan(value, async () => {
      calls++;
      return passed();
    });
    assert.notEqual(result.code, 0);
    assert.equal(calls, 0);
  }
});
