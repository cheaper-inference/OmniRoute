/**
 * The basePath build proof (tests/unit/build-basepath-brand.test.ts) needs a second full
 * `next build`, so it runs from a nightly workflow and stays out of the PR pipeline (#19620).
 *
 * The test skips itself without RUN_BUILD_TESTS=1 and passes as a skip, so a workflow that lost
 * the flag would stay green while proving nothing. These checks pin that wiring.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..", "..");
const workflowPath = path.join(repoRoot, ".github/workflows/nightly-basepath-build.yml");

type Step = { name?: string; run?: string; env?: Record<string, unknown> };
type Job = {
  if?: string;
  "runs-on"?: unknown;
  "timeout-minutes"?: number;
  needs?: string | string[];
  steps?: Step[];
};
type Workflow = {
  on?: Record<string, unknown>;
  concurrency?: { group?: string };
  jobs?: Record<string, Job>;
};

function readWorkflow(): Workflow {
  return load(fs.readFileSync(workflowPath, "utf8")) as Workflow;
}

function proofStep(workflow: Workflow): { job: Job; step: Step } {
  for (const job of Object.values(workflow.jobs ?? {})) {
    const step = job.steps?.find((s) => s.run?.includes("tests/unit/build-basepath-brand.test.ts"));
    if (step) return { job, step };
  }
  throw new Error("no step runs tests/unit/build-basepath-brand.test.ts");
}

test("the proof runs on a schedule and on demand, never in the PR pipeline", () => {
  const triggers = readWorkflow().on ?? {};
  assert.deepEqual(Object.keys(triggers).sort(), ["schedule", "workflow_dispatch"]);
  assert.ok(Array.isArray(triggers.schedule) && triggers.schedule.length === 1);
});

test("the proof step really runs the build test instead of skipping it", () => {
  const { step } = proofStep(readWorkflow());
  assert.equal(String(step.env?.RUN_BUILD_TESTS), "1");
  assert.equal(step.env?.RUN_BUILD_TESTS_REUSE, undefined, "must build, not reuse an old output");
});

test("the proof builds with webpack on the hosted runner, which cannot hold Turbopack", () => {
  const { job, step } = proofStep(readWorkflow());
  assert.equal(job["runs-on"], "ubuntu-latest");
  assert.equal(String(step.env?.OMNIROUTE_USE_TURBOPACK), "0");
});

test("the job timeout leaves room for the test's own 40-minute build limit", () => {
  const { job } = proofStep(readWorkflow());
  assert.ok((job["timeout-minutes"] ?? 0) > 40, "job must outlive the build's 40 min limit");
  assert.ok((job["timeout-minutes"] ?? 0) <= 90, "a hung build must not hold a runner for hours");
});

test("a failed night is reported, and a single run owns the concurrency group", () => {
  const workflow = readWorkflow();
  assert.equal(workflow.concurrency?.group, "nightly-basepath-build");
  const report = Object.values(workflow.jobs ?? {}).find((job) =>
    job.steps?.some((s) => s.run?.includes("gh issue create"))
  );
  assert.ok(report, "a job opens or updates a tracking issue");
  assert.match(String(report.if), /\.result == 'failure'/);
});
