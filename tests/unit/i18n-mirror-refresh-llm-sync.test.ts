/**
 * The scheduled i18n mirror refresh also rewrites the docs/i18n/<locale>/llm.txt mirrors. Since
 * the 2026-11-13 plan ("derived numbers and texts resolved only at release") feature PRs edit only
 * the root llm.txt; those exact-copy mirrors are neither translated by run-translation nor listed
 * by the drift check, yet `npm run check:docs-all` (release mode on schedule) fails while they are
 * stale — and a failing check opens no refresh PR at all. So the workflow must detect stale
 * llm.txt mirrors, sync them before the check, and refresh even when no doc drifted.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
type Step = { name?: string; id?: string; uses?: string; run?: string; if?: string };
const workflow = load(
  fs.readFileSync(path.join(repoRoot, ".github/workflows/i18n-mirror-refresh.yml"), "utf8")
) as { jobs: { refresh: { steps: Step[] } } };
const steps = workflow.jobs.refresh.steps;
const indexOf = (predicate: (step: Step) => boolean, label: string) => {
  const index = steps.findIndex(predicate);
  assert.notEqual(index, -1, `missing step: ${label}`);
  return index;
};

test("the refresh syncs the llm.txt mirrors before checking the refreshed tree", () => {
  const sync = indexOf(
    (s) => /^node scripts\/i18n\/sync-llm-mirrors\.mjs\s*$/.test(s.run ?? ""),
    "sync"
  );
  const check = indexOf((s) => /npm run check:docs-all/.test(s.run ?? ""), "check:docs-all");
  const commit = indexOf((s) => /git add -A docs\/i18n/.test(s.run ?? ""), "commit");
  assert.ok(sync < check && check < commit, "sync → check:docs-all → commit");
  assert.equal(steps[sync].if, "steps.drift.outputs.llm == 'true'");
});

test("stale llm.txt mirrors alone are enough to run the refresh", () => {
  const drift = steps[indexOf((s) => s.id === "drift", "drift")];
  assert.match(drift.run ?? "", /syncLlmMirrors\(\{ dryRun: true \}\)/);
  assert.match(drift.run ?? "", /echo "refresh=true" >> "\$GITHUB_OUTPUT"/);
  for (const name of ["Check the refreshed mirrors", "Commit and open or update the refresh PR"]) {
    assert.equal(
      steps[indexOf((s) => s.name === name, name)].if,
      "steps.drift.outputs.refresh == 'true'"
    );
  }
  // Translation still runs only for drifted docs: an empty --files would translate every doc.
  const translate = steps[indexOf((s) => s.id === "translate", "translate")];
  assert.equal(translate.if, "steps.drift.outputs.files != ''");
});

test("the drift step's llm.txt probe runs as written and prints a count", () => {
  const drift = steps[indexOf((s) => s.id === "drift", "drift")];
  const probe = (drift.run ?? "").match(/node --input-type=module -e '([\s\S]+?)'\)/)?.[1];
  assert.ok(probe, "llm.txt probe snippet");
  const out = execFileSync(process.execPath, ["--input-type=module", "-e", probe], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  assert.match(out, /^\d+$/);
});
