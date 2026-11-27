import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { load } from "js-yaml";

globalThis.fetch = () => {
  throw new Error("network access in tests");
};

const { findScheduledJobsWithoutGuard } = await import("../../scripts/check/check-workflows.mjs");

type Step = {
  if?: string;
  run?: string;
  uses?: string;
  with?: Record<string, string>;
};

type Job = {
  permissions: Record<string, string>;
  "timeout-minutes": number;
  steps: Step[];
};

type Workflow = {
  on: { schedule: { cron: string }[]; workflow_dispatch: object };
  permissions: Record<string, string>;
  jobs: Record<string, Job> & { drift: Job };
};

const workflowPath = fileURLToPath(
  new URL("../../.github/workflows/catalog-drift.yml", import.meta.url)
);
const source = readFileSync(workflowPath, "utf8");
const workflow = load(source) as Workflow;
const steps = Object.values(workflow.jobs).flatMap((job) => job.steps);

test("runs on a schedule and on demand, never on pull requests", () => {
  assert.deepEqual(Object.keys(workflow.on).sort(), ["schedule", "workflow_dispatch"]);
  assert.equal(workflow.on.schedule[0].cron, "41 6 * * *");
});

test("keeps permissions minimal", () => {
  assert.deepEqual(workflow.permissions, { contents: "read" });
  assert.deepEqual(workflow.jobs.drift.permissions, { contents: "read", issues: "write" });
});

test("uses no secrets", () => {
  assert.doesNotMatch(source, /secrets\./);
});

test("pins every action to a full commit sha", () => {
  const actions = steps.flatMap(({ uses }) => (uses ? [uses] : []));
  assert.ok(actions.length > 0);
  for (const action of actions) assert.match(action, /@[0-9a-f]{40}\b/);
});

test("every job carries the upstream-only scheduled guard", () => {
  assert.deepEqual(findScheduledJobsWithoutGuard([workflowPath]), []);
});

test("never interpolates expressions inside run scripts", () => {
  for (const { run } of steps) {
    if (run) assert.ok(!run.includes("${{"));
  }
});

test("loads the catalog only through tsx and runs issues.mjs with plain node", () => {
  const runs = steps.flatMap(({ run }) => (run ? [run] : []));
  assert.ok(runs.some((run) => run.includes("/run.mjs")));
  assert.ok(runs.some((run) => run.includes("/issues.mjs")));
  for (const run of runs) {
    if (/\/(run|evidence-age)\.mjs/.test(run)) assert.match(run, /node --import tsx\/esm/);
    if (run.includes("/issues.mjs"))
      assert.match(run, /node scripts\/quality\/catalog-drift\/issues\.mjs/);
  }
});

test("writes issues only behind the CATALOG_DRIFT_ISSUES variable", () => {
  const issueSteps = workflow.jobs.drift.steps.filter(({ run }) => run?.includes("/issues.mjs"));
  const writing = issueSteps.filter(({ run }) => run?.includes("--apply"));
  assert.equal(writing.length, 1);
  assert.equal(writing[0].if, "${{ vars.CATALOG_DRIFT_ISSUES == 'true' }}");
  assert.equal(
    issueSteps.find(({ run }) => run?.includes("--dry-run"))?.if,
    "${{ vars.CATALOG_DRIFT_ISSUES != 'true' }}"
  );
});

test("checks out the resolved release commit by sha, never a branch name", () => {
  const checkouts = steps.filter(({ uses }) => uses?.startsWith("actions/checkout@"));
  assert.ok(checkouts.length > 0);
  for (const step of checkouts) assert.equal(step.with?.ref, "${{ needs.resolve.outputs.sha }}");
});

test("never restores the npm cache after checking out a release branch", () => {
  for (const [name, job] of Object.entries(workflow.jobs)) {
    for (const step of job.steps) {
      if (step.uses?.startsWith("actions/setup-node@")) {
        assert.equal(step.with?.cache, undefined, `${name}: setup-node must not use a cache`);
        assert.equal(
          step.with?.["package-manager-cache"],
          false,
          `${name}: package-manager-cache must be false`
        );
      }
    }
  }
});

test("state cache key is unique per attempt", () => {
  const { drift } = workflow.jobs;
  const restore = drift.steps.find(({ uses }) => uses?.startsWith("actions/cache/restore@"));
  const save = drift.steps.find(({ uses }) => uses?.startsWith("actions/cache/save@"));
  assert.match(restore?.with?.key ?? "", /github\.run_attempt/);
  assert.equal(save?.with?.key, restore?.with?.key);
  assert.equal(drift["timeout-minutes"], 30);
});

test("never writes to the repository", () => {
  assert.doesNotMatch(source, /git push|gh pr create|contents:\s+write/);
});

test("the weekly job only reads and never opens issues", () => {
  const weekly = workflow.jobs["evidence-age"];
  assert.deepEqual(weekly?.permissions, { contents: "read" });
  assert.ok(weekly.steps.every(({ run }) => !run?.includes("/issues.mjs")));
  assert.deepEqual(workflow.on.schedule.map(({ cron }) => cron).sort(), [
    "11 8 1 * *",
    "23 7 * * 1",
    "41 6 * * *",
  ]);
});

test("the monthly reminder writes only behind the variable", () => {
  const monthly = workflow.jobs["scoreboard-due"];
  assert.deepEqual(monthly?.permissions, { contents: "read", issues: "write" });
  const apply = monthly.steps.find(
    ({ run }) => run?.includes("/issues.mjs") && run.includes("--apply")
  );
  assert.equal(apply?.if, "${{ vars.CATALOG_DRIFT_ISSUES == 'true' }}");
  assert.deepEqual(findScheduledJobsWithoutGuard([workflowPath]), []);
});
