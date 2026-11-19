/**
 * The basePath build proof (tests/unit/build-basepath-brand.test.ts) needs a second full
 * `next build`, so it runs from a nightly workflow and stays out of the PR pipeline (#19620).
 *
 * The test skips itself without RUN_BUILD_TESTS=1 and passes as a skip, so a workflow that lost
 * the flag would stay green while proving nothing. These checks pin that wiring.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
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

/** Runs the resolve-branch script with a stub `git` that lists `refs` as remote branches. */
function resolveTarget(refs: string[], input = ""): { status: number; target: string } {
  const step = readWorkflow().jobs?.["resolve-branch"]?.steps?.find((s) =>
    s.run?.includes("GITHUB_OUTPUT")
  );
  assert.ok(step?.run, "resolve-branch has a script that writes the target");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "nightly-basepath-"));
  try {
    const bin = path.join(dir, "bin");
    fs.mkdirSync(bin);
    fs.writeFileSync(path.join(dir, "refs"), refs.map((r) => `origin/${r}\n`).join(""));
    fs.writeFileSync(path.join(bin, "git"), `#!/bin/sh\ncat "${path.join(dir, "refs")}"\n`, {
      mode: 0o755,
    });
    const output = path.join(dir, "output");
    fs.writeFileSync(output, "");
    const run = spawnSync("bash", ["-c", step.run], {
      env: {
        PATH: `${bin}:${process.env.PATH}`,
        INPUT_BRANCH: input,
        GITHUB_OUTPUT: output,
      },
      encoding: "utf8",
    });
    const target = /^target=(.*)$/m.exec(fs.readFileSync(output, "utf8"))?.[1] ?? "";
    return { status: run.status ?? -1, target };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("the nightly picks the highest exact release/vX.Y.Z, never a suffixed branch", () => {
  const refs = ["release/v3.8.53", "release/v3.9.0-rc1", "release/v3.8.54", "release/v3.10.0x"];
  assert.deepEqual(resolveTarget(refs), { status: 0, target: "release/v3.8.54" });
});

test("a manual branch must be an exact release/vX.Y.Z name", () => {
  assert.deepEqual(resolveTarget([], "release/v3.8.54"), {
    status: 0,
    target: "release/v3.8.54",
  });
  for (const input of ["release/v3.9.0-rc1", "main", "release/v3.8.54;id"]) {
    assert.notEqual(resolveTarget([], input).status, 0, `${input} must be refused`);
  }
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
