import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";

const workflow = parse(
  readFileSync(new URL("../../../.github/workflows/ci.yml", import.meta.url), "utf8")
);

test("shards collect V8 data without generating a redundant Istanbul report", () => {
  const shard = workflow.jobs["test-unit"];
  const step = shard.steps.find((step: { run?: string }) =>
    step.run?.includes("npm run test:unit:ci:shard")
  );
  assert.ok(step);
  assert.ok(step.env.NODE_V8_COVERAGE, "child processes must still collect V8 coverage");
  assert.doesNotMatch(step.run, /\bc8\b/, "the final Coverage job owns report generation");
  assert.equal(shard["timeout-minutes"], 25);
  assert.deepEqual(
    shard.strategy.matrix.shard,
    Array.from({ length: 12 }, (_, i) => i + 1)
  );
});

test("the final coverage report merges incrementally without dropping the gate", () => {
  const runs: string[] = Object.values(workflow.jobs).flatMap(
    (job: { steps?: { run?: string }[] }) =>
      (job.steps || [])
        .map((step) => step.run || "")
        .filter((run) => /compact-v8-coverage\.mjs report\s/.test(run))
  );
  assert.equal(runs.length, 1);
  for (const run of runs) assert.match(run, /--merge-async\b/);
  const aggregate = runs[0];
  assert.match(aggregate, /report coverage-shards 12 "\$GITHUB_SHA"/);
  assert.match(aggregate, /--check-coverage\b/);
  assert.match(aggregate, /--statements 60 --lines 60 --functions 60 --branches 60/);
});
