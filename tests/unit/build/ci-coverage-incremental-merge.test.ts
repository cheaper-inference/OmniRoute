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
  assert.equal(upload.if, "${{ always() && github.event_name != 'pull_request' }}");
  assert.equal(upload["timeout-minutes"], 5);
  assert.equal(upload["continue-on-error"], true);
  assert.equal(upload.with?.files, "coverage/lcov.info");
  assert.equal(upload.with?.disable_search, true);
  assert.equal(upload.with?.fail_ci_if_error, false);
});

type CoverageStep = {
  uses?: string;
  with?: Record<string, unknown>;
  env?: Record<string, unknown>;
};

type CoverageWorkflow = {
  env: Record<string, unknown>;
  jobs: Record<string, { env?: Record<string, unknown>; steps: CoverageStep[] }>;
};

function assertPinnedCoverageRuntime(candidate: CoverageWorkflow) {
  const version = candidate.env.CI_NODE_VERSION;
  assert.ok(typeof version === "string", "the common CI runtime must be a string");
  assert.match(
    version,
    /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/,
    "V8 coverage requires a complete Node version, not a major or range selector"
  );
  for (const jobName of ["test-unit", "test-coverage"]) {
    const job = candidate.jobs[jobName];
    assert.ok(job, `${jobName} must exist`);
    assert.equal(job.env?.CI_NODE_VERSION, undefined, `${jobName} must not shadow the common pin`);
    const setups = job.steps.filter((step) => step.uses?.startsWith("actions/setup-node@"));
    assert.equal(setups.length, 1, `${jobName} must select exactly one runtime`);
    assert.equal(
      setups[0].with?.["node-version"],
      "${{ env.CI_NODE_VERSION }}",
      `${jobName} must resolve the common exact runtime`
    );
    assert.equal(setups[0].with?.["node-version-file"], undefined);
    assert.equal(setups[0].env?.CI_NODE_VERSION, undefined);
  }
}

test("V8 producers and consumer resolve one common complete Node version", () => {
  assertPinnedCoverageRuntime(workflow);
});

for (const selector of ["24", "^24.22.2"]) {
  test(`coverage runtime contract rejects floating selector ${selector}`, () => {
    const candidate = structuredClone(workflow) as CoverageWorkflow;
    candidate.env.CI_NODE_VERSION = "24.22.2";
    assertPinnedCoverageRuntime(candidate);
    candidate.env.CI_NODE_VERSION = selector;
    assert.throws(() => assertPinnedCoverageRuntime(candidate), /complete Node version/);
  });
}

for (const jobName of ["test-unit", "test-coverage"]) {
  test(`coverage runtime contract rejects a divergent ${jobName} runtime`, () => {
    const candidate = structuredClone(workflow) as CoverageWorkflow;
    candidate.env.CI_NODE_VERSION = "24.22.2";
    assertPinnedCoverageRuntime(candidate);
    const setup = candidate.jobs[jobName].steps.find((step) =>
      step.uses?.startsWith("actions/setup-node@")
    );
    assert.ok(setup?.with);
    setup.with["node-version"] = "24.22.1";
    assert.throws(() => assertPinnedCoverageRuntime(candidate), /common exact runtime/);
  });
}
