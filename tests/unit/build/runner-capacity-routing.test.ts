// Runner capacity on the .113 box (docs/ops/RUNNER_BOX.md, 2026-10-18).
//
// The single `omni-build` slot (omniroute-113-5, 60 GB) was oversubscribed: Release-Green
// ran there on every push (~10/hour, 97 of 100 push runs cancelled mid-work in a day) and
// three ~2 h full sweeps a day (the 05:29 sweep waited 6 h for the slot), on top of every
// own-origin PR Build. Contract pinned here:
//   - Release-Green (release-green + main-green) runs on its own `omni-release` slot
//     (omniroute-113-6, capped at 24 GB), so its build uses webpack (~14-16 GB);
//   - no job routed to `omni-release` anywhere may run a Turbopack build;
//   - a started Release-Green run is never cancelled (the storm still collapses through
//     the single pending slot per concurrency group);
//   - the deploy job cannot hang for GitHub's 6-hour default.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import * as yaml from "js-yaml";

interface Job {
  "runs-on"?: string;
  "timeout-minutes"?: number;
  env?: Record<string, unknown>;
  steps?: Array<{ env?: Record<string, unknown> }>;
}
interface Workflow {
  concurrency?: { group?: string; "cancel-in-progress"?: unknown };
  jobs?: Record<string, Job>;
}

const workflowDir = new URL("../../../.github/workflows/", import.meta.url);
const read = (name: string) =>
  yaml.load(fs.readFileSync(new URL(name, workflowDir), "utf8")) as Workflow;

const releaseGreen = read("nightly-release-green.yml");

test("Release-Green validates on the omni-release slot with webpack", () => {
  for (const name of ["release-green", "main-green"]) {
    const job = releaseGreen.jobs?.[name];
    assert.ok(job, `nightly-release-green.yml defines ${name}`);
    assert.match(job["runs-on"] ?? "", /"omni-release"/, `${name} uses its own slot`);
    assert.doesNotMatch(job["runs-on"] ?? "", /omni-build/, `${name} stays off the build slot`);
    assert.equal(String(job.env?.OMNIROUTE_USE_TURBOPACK), "0", `${name} builds with webpack`);
  }
});

test("a started Release-Green run is never cancelled", () => {
  assert.match(releaseGreen.concurrency?.group ?? "", /release-green-/);
  assert.equal(releaseGreen.concurrency?.["cancel-in-progress"], false);
});

test("no job routed to omni-release runs a Turbopack build", () => {
  const offenders: string[] = [];
  for (const file of fs.readdirSync(workflowDir).filter((f) => /\.ya?ml$/.test(f))) {
    for (const [name, job] of Object.entries(read(file).jobs ?? {})) {
      if (!/omni-release/.test(String(job["runs-on"] ?? ""))) continue;
      const jobSwitch = job.env?.OMNIROUTE_USE_TURBOPACK;
      const stepSwitches = (job.steps ?? []).map((s) => s.env?.OMNIROUTE_USE_TURBOPACK);
      const turbopack = [jobSwitch, ...stepSwitches].some(
        (v) => v !== undefined && String(v) !== "0"
      );
      if (String(jobSwitch) !== "0" || turbopack) offenders.push(`${path.basename(file)}:${name}`);
    }
  }
  assert.deepEqual(
    offenders,
    [],
    "the omni-release slot is capped at 24 GB; Turbopack needs 36-49 GB"
  );
});

test("the VPS deploy job cannot hang for the 6-hour default", () => {
  const deploy = read("deploy-vps.yml").jobs?.deploy;
  assert.ok(deploy, "deploy-vps.yml defines the deploy job");
  const minutes = deploy["timeout-minutes"] ?? 0;
  assert.ok(minutes > 0 && minutes <= 120, `timeout-minutes is ${minutes}`);
});
