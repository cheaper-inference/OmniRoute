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

test("the Coverage job has capacity for the measured merge/report envelope", () => {
  const coverage = workflow.jobs["test-coverage"];
  assert.equal(coverage["timeout-minutes"], 45);
  assert.equal(coverage.needs, "test-unit");
  assert.match(String(coverage.if), /needs\.test-unit\.result == 'success'/);
});

test("Codecov uploads only the merged LCOV report and remains bounded/advisory", () => {
  type Step = {
    name?: string;
    uses?: string;
    if?: string;
    "timeout-minutes"?: number;
    "continue-on-error"?: boolean;
    with?: Record<string, unknown>;
  };
  const coverage = workflow.jobs["test-coverage"];
  const upload = coverage.steps.find(
    (step: Step) => step.name === "Upload coverage to Codecov (informational)"
  ) as Step | undefined;

  assert.ok(upload, "Coverage must keep the informational Codecov step");
  assert.equal(upload.uses, "codecov/codecov-action@303a32d7a59b442fa8d48b6a1cc6825c09c847a5");
  assert.equal(upload.if, "always()");
  assert.equal(upload["timeout-minutes"], 5);
  assert.equal(upload["continue-on-error"], true);
  assert.equal(upload.with?.files, "coverage/lcov.info");
  assert.equal(upload.with?.disable_search, true);
  assert.equal(upload.with?.fail_ci_if_error, false);
});
