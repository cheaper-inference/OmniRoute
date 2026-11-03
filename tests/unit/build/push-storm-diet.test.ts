// Push-storm diet (2026-10-18). On the active release branch ~10 PRs/hour land during
// merge campaigns. Every push started the full ci.yml matrix (30 jobs) and quality.yml
// again on hosted runners, only for the next push to cancel them: 24 of 24 push runs of
// each were cancelled in one day, 2,500 workflow runs were created in 24 h, and 106 jobs
// sat queued against the account's 40 concurrent hosted slots — PR checks waited hours
// and merges happened without them. Each change already ran the matrix on its PR; the
// merged combination is Release-Green's job (nightly-release-green.yml). Pinned here:
//   - ci.yml and quality.yml run on push only for `main` (the release squash);
//   - PRs into main and release/** and merge groups still get the full matrix;
//   - Release-Green still fires on every push to release/v* and never cancels a started run;
//   - its scheduled full sweep of `main` runs once a day (05:23) — main's SHA only moves on
//     a release, and the midday/evening re-sweeps held the single omni-release slot for
//     ~2 h each while `--quick` push runs waited behind them (2026-10-19).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

interface Workflow {
  on?: {
    push?: { branches?: string[] };
    pull_request?: { branches?: string[] };
    merge_group?: unknown;
  };
  concurrency?: { "cancel-in-progress"?: unknown };
  jobs?: Record<string, { if?: string }>;
}

const WORKFLOWS_DIR = path.join(process.cwd(), ".github", "workflows");
const load = (file: string): Workflow =>
  yaml.load(fs.readFileSync(path.join(WORKFLOWS_DIR, file), "utf8")) as Workflow;

for (const file of ["ci.yml", "quality.yml"]) {
  test(`${file}: push trigger is main-only; PRs and merge groups still cover release/**`, () => {
    const on = load(file).on ?? {};
    assert.deepEqual(
      on.push?.branches,
      ["main"],
      `${file} must not run the matrix per release push`
    );
    assert.deepEqual(on.pull_request?.branches, ["main", "release/**"]);
    assert.ok(on.merge_group, `${file} keeps the merge-queue trigger`);
  });
}

test("Release-Green remains the per-push combination gate on release/v*", () => {
  const wf = load("nightly-release-green.yml");
  assert.ok(wf.on?.push?.branches?.includes("release/v*"));
  assert.equal(wf.concurrency?.["cancel-in-progress"], false);
});

test("Release-Green sweeps main once a day but keeps all three sweeps for the release branch", () => {
  const wf = load("nightly-release-green.yml") as Workflow & {
    on?: { schedule?: { cron: string }[] };
  };
  const crons = (wf.on?.schedule ?? []).map((entry) => entry.cron);
  assert.ok(crons.includes("23 5 * * *"), "the 05:23 cron is the one main-green keys on");
  assert.equal(crons.length, 3, "the release branch keeps its three daily sweeps");
  const mainIf = wf.jobs?.["main-green"]?.if ?? "";
  assert.match(mainIf, /github\.event\.schedule == '23 5 \* \* \*'/);
  assert.match(
    mainIf,
    /github\.event_name != 'schedule' \|\|/,
    "dispatch and push still run main-green"
  );
  const releaseIf = wf.jobs?.["release-green"]?.if ?? "";
  assert.doesNotMatch(releaseIf, /github\.event\.schedule/, "release-green runs on every cron");
});
