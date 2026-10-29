// Hosted-runner lane hygiene (2026-10-17): the account's concurrent-job limit was the
// real bottleneck behind the "100 queued runs" days. Two push-triggered workflows that
// fire on every push to the active release branch (~10/hour) had no `concurrency`
// group, so every push queued its own hosted run: `Lock released branch` (a 5-second
// tag lookup whose verdict is identical for every push on the branch) and `OpenSSF
// Scorecard` (scores repository posture, not the commit) sat at 20 queued runs each.
// Pin the ref-scoped `cancel-in-progress` group on both so a ref never holds more than
// one run at a time, and keep the hosted lane workflows that already had one.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

interface Workflow {
  name?: string;
  concurrency?: { group?: string; "cancel-in-progress"?: boolean };
  on?: Record<string, unknown>;
}

const WORKFLOWS_DIR = path.join(process.cwd(), ".github", "workflows");

function load(file: string): Workflow {
  return yaml.load(fs.readFileSync(path.join(WORKFLOWS_DIR, file), "utf8")) as Workflow;
}

// Every push-triggered hosted workflow that can fire on release/* pushes must collapse to
// one run per ref. Add a file here when a new one is introduced.
const REF_SCOPED: Array<{ file: string; groupPrefix: string }> = [
  { file: "lock-released-branch.yml", groupPrefix: "lock-released-" },
  { file: "scorecard.yml", groupPrefix: "scorecard-" },
  { file: "api-route-typecheck.yml", groupPrefix: "${{ github.workflow }}-" },
  { file: "semgrep.yml", groupPrefix: "${{ github.workflow }}-" },
];

for (const { file, groupPrefix } of REF_SCOPED) {
  test(`${file}: one hosted run per ref (concurrency group scoped to github.ref, cancel-in-progress)`, () => {
    const wf = load(file);
    assert.ok(wf.concurrency, `${file} must declare a concurrency group`);
    const group = String(wf.concurrency!.group ?? "");
    assert.ok(
      group.startsWith(groupPrefix),
      `${file}: group must start with ${groupPrefix}, got ${group}`
    );
    assert.ok(group.includes("${{ github.ref }}"), `${file}: group must be scoped to github.ref`);
    assert.equal(wf.concurrency!["cancel-in-progress"], true, `${file}: newer runs must supersede`);
  });
}

test("lock-released-branch.yml keeps both triggers that the Hard Rule #18 guard depends on", () => {
  const on = load("lock-released-branch.yml").on as Record<string, unknown>;
  assert.ok(on.release, "release:published still applies the lock");
  assert.ok(on.push, "push to release/v* still runs the post-release push guard");
});
