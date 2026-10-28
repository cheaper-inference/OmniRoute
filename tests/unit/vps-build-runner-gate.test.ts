/**
 * USE_VPS_BUILD_RUNNER — the opt-in for the .113 `omni-build` slot.
 *
 * Since 2026-10-06 every `Build` that landed on omniroute-113-5 died: `next-build` (Turbopack,
 * Next 16.3.x) grew to 16–41 GB on the 32-core box and the guest OOM-killer took it
 * (`CONSTRAINT_NONE`, the whole 47 GB VM — not the runner's MemoryMax). ~200 runs in a row,
 * each one swap-thrashing for 17–90 min; the same build passes in 8–12 min on the 16 GB / 4-vCPU
 * hosted runner (fork PRs). The slot is single (#12048), so every same-repo PR queued behind it
 * for up to 12 h only to fail.
 *
 * `omni-build` therefore became opt-in: a job reaches it only when BOTH `USE_VPS_RUNNER` and
 * `USE_VPS_BUILD_RUNNER` are 'true'. Unset (the default) = hosted fallback, so a parked or broken
 * build box can never again stall publishes. The docker-publish preflight and the nightly
 * "runner offline" alert follow the same switch — a deliberately parked pool is not an outage.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const workflowDir = path.join(repoRoot, ".github/workflows");
const GATE = /vars\.USE_VPS_BUILD_RUNNER == 'true'/;

type Job = { "runs-on"?: unknown; if?: string };
type Workflow = { jobs?: Record<string, Job> };

function omniBuildJobs(): Array<{ id: string; runsOn: string }> {
  const out: Array<{ id: string; runsOn: string }> = [];
  for (const name of fs.readdirSync(workflowDir)) {
    if (!/\.ya?ml$/.test(name)) continue;
    const wf = load(fs.readFileSync(path.join(workflowDir, name), "utf8")) as Workflow;
    for (const [job, def] of Object.entries(wf?.jobs ?? {})) {
      const runsOn = typeof def?.["runs-on"] === "string" ? (def["runs-on"] as string) : "";
      if (runsOn.includes("omni-build")) out.push({ id: `${name}:${job}`, runsOn });
    }
  }
  return out;
}

test("every omni-build job is opt-in through USE_VPS_BUILD_RUNNER", () => {
  const jobs = omniBuildJobs();
  // Guard against a vacuous pass: these are the heavy jobs known on 2026-10-16.
  for (const id of [
    "ci.yml:build",
    "docker-publish.yml:build",
    "npm-publish.yml:publish",
    "nightly-v4-build.yml:build",
  ]) {
    assert.ok(
      jobs.some((j) => j.id === id),
      `${id} should still target omni-build`
    );
  }
  const ungated = jobs.filter((j) => !GATE.test(j.runsOn)).map((j) => j.id);
  assert.deepEqual(ungated, [], "these jobs would reach the .113 build slot without the opt-in");
});

test("every omni-build job keeps a hosted fallback", () => {
  const noFallback = omniBuildJobs()
    .filter((j) => !/\|\|\s*'ubuntu-[\w.-]+'/.test(j.runsOn))
    .map((j) => j.id);
  assert.deepEqual(noFallback, []);
});

test("docker-publish preflight and offline alert follow the same switch", () => {
  const wf = load(
    fs.readFileSync(path.join(workflowDir, "docker-publish.yml"), "utf8")
  ) as Workflow;
  assert.match(
    String(wf.jobs?.["runner-preflight"]?.if),
    GATE,
    "preflight only when the slot is in use"
  );
  assert.match(String(wf.jobs?.["runner-alert"]?.if), GATE, "no outage issue for a parked pool");
});
