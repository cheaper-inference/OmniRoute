// Contract for .mergify.yml after the owner retired the Mergify merge queue (2026-11-19).
// The Mergify GitHub App is still installed and reads this file from the default branch; Mergify
// silently ignores or rejects a bad config, so what is left of it is pinned here: no queue, no
// auto-merge, no merging rule, and every command that would merge or rewrite a pull request
// refused by a condition list no pull request can match. Until 2026-11-19 this file pinned the
// `release` and `relay-integration` queue rules; their admission contract (the required checks
// and the checks timeout) now belongs to omni-queue, the replacement queue, and its timeout
// rationale is carried over at the end of this file.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import * as yaml from "js-yaml";

type CommandRestriction = { conditions?: unknown };
type MergifyConfig = Record<string, unknown> & {
  commands_restrictions?: Record<string, CommandRestriction>;
};

const config = yaml.load(
  readFileSync(new URL("../../.mergify.yml", import.meta.url), "utf8")
) as MergifyConfig;

const omniQueue = JSON.parse(
  readFileSync(new URL("../../config/merge-queue/config.json", import.meta.url), "utf8")
) as { label: string; checksTimeoutMinutes: number; requiredChecks: string[] };

// Mergify commands that land, enqueue, rewrite or copy a pull request. `refresh` (re-evaluate)
// and `dequeue` (leave a queue) do neither and keep Mergify's defaults.
const MUTATING_COMMANDS = ["queue", "requeue", "rebase", "update", "squash", "backport", "copy"];

test("the file is kept (not deleted) and holds only command restrictions", () => {
  // Deleting it would not turn Mergify off: with no configuration, `@mergifyio queue` merges a PR
  // once its required checks pass (docs.mergify.com/merge-queue/setup).
  assert.deepEqual(Object.keys(config), ["commands_restrictions"]);
});

test("no Mergify queue: no queue_rules, no auto-merge conditions", () => {
  assert.equal("queue_rules" in config, false, "a second queue would act on release PRs");
  assert.equal(
    "merge_protections_settings" in config,
    false,
    "auto_merge_conditions would merge labelled PRs outside the release process"
  );
  assert.equal("pull_request_rules" in config, false, "no rule may merge, label or rewrite a PR");
  assert.equal("defaults" in config, false);
});

test("every command that merges or rewrites a pull request is refused", () => {
  const restrictions = config.commands_restrictions ?? {};
  assert.deepEqual(Object.keys(restrictions).sort(), [...MUTATING_COMMANDS].sort());
  for (const command of MUTATING_COMMANDS) {
    // Conditions in one list are ANDed: `closed` and `-closed` can never both hold.
    assert.deepEqual(
      restrictions[command]?.conditions,
      ["closed", "-closed"],
      `${command}: must keep an unsatisfiable condition list`
    );
  }
});

test("the retired `queue` label is not omni-queue's label", () => {
  assert.notEqual(omniQueue.label, "queue", "a leftover `queue` label must not enter omni-queue");
});

// p95 wall-clock (createdAt -> updatedAt) of the last 100 successful quality.yml runs, measured
// 2026-10-09 over 2026-09-28..2026-10-08: 119.75 min. It sized Mergify's checks_timeout (240 min);
// the replacement queue must keep at least 2x this so a slow-but-healthy run is not dequeued.
const MEASURED_QUALITY_P95_MINUTES = 119.75;

test("omni-queue keeps the retired queue's timeout floor and both aggregate verdicts", () => {
  assert.ok(
    omniQueue.checksTimeoutMinutes >= 2 * MEASURED_QUALITY_P95_MINUTES,
    `checksTimeoutMinutes ${omniQueue.checksTimeoutMinutes} < 2 x p95 (${2 * MEASURED_QUALITY_P95_MINUTES})`
  );
  assert.ok(omniQueue.checksTimeoutMinutes <= 8 * 60, "above 8 h the timeout no longer protects");
  for (const check of [
    "Gate / CI",
    "Gate / Quality",
    "Merge integrity (changelog + generated skills)",
  ]) {
    assert.ok(omniQueue.requiredChecks.includes(check), `omni-queue must require ${check}`);
  }
});
