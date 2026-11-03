// scripts/ci/blacksmith-budget.mjs keeps docker-publish inside Blacksmith's free 3,000 2-vCPU
// minutes: past them the runners keep running and are invoiced. These cases pin how a job's
// minutes are counted, which runs are fetched, and the verdict at the cap.
import test from "node:test";
import assert from "node:assert/strict";
import {
  decide,
  jobMinutes,
  monthStart,
  runsToCount,
} from "../../scripts/ci/blacksmith-budget.mjs";

const at = (minute: number) => new Date(Date.UTC(2026, 10, 3, 19, minute)).toISOString();

test("a 4 vCPU Blacksmith minute counts as two, rounded up per job", () => {
  // Run 41711010696: the amd64 build ran 20:17-21:02 on blacksmith-4vcpu-ubuntu-2404.
  const job = {
    runner_name: "blacksmith-4vcpu-ubuntu-2404-nna2w6kfxgqmbxbk",
    labels: ["blacksmith-4vcpu-ubuntu-2404"],
    started_at: at(17),
    completed_at: new Date(Date.parse(at(17)) + 44.5 * 60000).toISOString(),
  };
  assert.equal(jobMinutes(job), 45 * 2);
});

test("2 vCPU counts once, ARM at 0.625, and hosted or unstarted jobs cost nothing", () => {
  const span = { started_at: at(0), completed_at: at(4) };
  assert.equal(jobMinutes({ ...span, labels: ["blacksmith-2vcpu-ubuntu-2404"] }), 4);
  assert.equal(
    jobMinutes({ ...span, labels: ["blacksmith-4vcpu-ubuntu-2404-arm"] }),
    4 * 2 * 0.625
  );
  assert.equal(
    jobMinutes({ ...span, runner_name: "GitHub Actions 1000063635", labels: ["ubuntu-24.04-arm"] }),
    0
  );
  assert.equal(jobMinutes({ labels: ["blacksmith-4vcpu-ubuntu-2404"], started_at: null }), 0);
});

test("a job still running counts up to now", () => {
  const job = { labels: ["blacksmith-2vcpu-ubuntu-2404"], started_at: at(0), completed_at: null };
  assert.equal(jobMinutes(job, Date.parse(at(10))), 10);
});

test("only finished-with-a-result or live runs are fetched, never this run", () => {
  const runs = [
    { id: 1, status: "completed", conclusion: "success" },
    { id: 2, status: "completed", conclusion: "failure" },
    { id: 3, status: "completed", conclusion: "cancelled" },
    { id: 4, status: "in_progress", conclusion: null },
    { id: 5, status: "completed", conclusion: "success" },
  ];
  assert.deepEqual(
    runsToCount(runs, { selfRunId: 5 }).map((r) => r.id),
    [1, 2, 4]
  );
});

test("Blacksmith only while asked for and under the cap", () => {
  assert.equal(decide({ want: "blacksmith", used: 2499, cap: 2500 }), true);
  assert.equal(decide({ want: "blacksmith", used: 2500, cap: 2500 }), false);
  assert.equal(decide({ want: "hosted", used: 0, cap: 2500 }), false);
  assert.equal(decide({ want: "", used: 0, cap: 2500 }), false);
});

test("the month starts on the 1st, UTC", () => {
  assert.equal(monthStart(new Date(Date.UTC(2026, 10, 3, 23, 59))), "2026-11-01");
  assert.equal(monthStart(new Date(Date.UTC(2026, 11, 31, 23, 59))), "2026-12-01");
});
