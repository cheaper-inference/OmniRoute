import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { load } from "js-yaml";
import { findLostBullets } from "../../scripts/check/check-changelog-integrity.mjs";
import { resolveChangelogComparisonBase } from "../../scripts/quality/changelog-comparison-base.mjs";

const BASE_SHA = "1".repeat(40);
const ADVANCED_BASE_SHA = "2".repeat(40);
const CANDIDATE_SHA = "3".repeat(40);
const BASE_TEXT = "# Changelog\n- retained original bullet\n- retained second bullet\n";
const ADVANCED_BASE_TEXT = `${BASE_TEXT}- sibling merged after the event\n`;

test("an unchanged old merge result stays green after the base branch advances", () => {
  const filesByCommit = new Map([
    [BASE_SHA, BASE_TEXT],
    [ADVANCED_BASE_SHA, ADVANCED_BASE_TEXT],
  ]);
  // The old branch-name comparison produces a false RED for this event.
  assert.equal(findLostBullets(filesByCommit.get(ADVANCED_BASE_SHA), BASE_TEXT).length, 1);

  const comparisonBase = resolveChangelogComparisonBase({
    eventName: "pull_request",
    candidateSha: CANDIDATE_SHA,
    pullRequestBaseSha: BASE_SHA,
  });
  assert.deepEqual(findLostBullets(filesByCommit.get(comparisonBase), BASE_TEXT), []);
});

test("a new event still detects a lost sibling that exists in its captured base", () => {
  const comparisonBase = resolveChangelogComparisonBase({
    eventName: "pull_request",
    candidateSha: CANDIDATE_SHA,
    pullRequestBaseSha: ADVANCED_BASE_SHA,
  });
  assert.equal(comparisonBase, ADVANCED_BASE_SHA);
  assert.equal(findLostBullets(ADVANCED_BASE_TEXT, BASE_TEXT).length, 1);
});

test("an original bullet removal and a lost duplicate occurrence remain RED", () => {
  assert.equal(findLostBullets(BASE_TEXT, "# Changelog\n- retained original bullet\n").length, 1);
  const repeated = "- repeated bullet\n";
  assert.equal(findLostBullets(BASE_TEXT + repeated + repeated, BASE_TEXT + repeated).length, 1);
});

test("additive changes remain green", () => {
  assert.deepEqual(findLostBullets(BASE_TEXT, ADVANCED_BASE_TEXT), []);
});

test("each event chooses its own immutable comparison input", () => {
  const inputs = {
    candidateSha: CANDIDATE_SHA,
    pullRequestBaseSha: BASE_SHA,
    mergeGroupBaseSha: ADVANCED_BASE_SHA,
    pushBeforeSha: "4".repeat(40),
  };
  assert.equal(resolveChangelogComparisonBase({ ...inputs, eventName: "pull_request" }), BASE_SHA);
  assert.equal(
    resolveChangelogComparisonBase({ ...inputs, eventName: "merge_group" }),
    ADVANCED_BASE_SHA
  );
  assert.equal(resolveChangelogComparisonBase({ ...inputs, eventName: "push" }), "4".repeat(40));
  assert.equal(
    resolveChangelogComparisonBase({ ...inputs, eventName: "workflow_dispatch" }),
    `${CANDIDATE_SHA}^1`
  );
});

test("missing event bases never fall back to another event or a branch name", () => {
  for (const eventName of ["pull_request", "merge_group", "push"]) {
    assert.throws(
      () => resolveChangelogComparisonBase({ eventName, candidateSha: CANDIDATE_SHA }),
      /Missing or invalid immutable/
    );
  }
  assert.throws(
    () =>
      resolveChangelogComparisonBase({
        eventName: "pull_request",
        candidateSha: CANDIDATE_SHA,
        pushBeforeSha: BASE_SHA,
      }),
    /pull-request base SHA/
  );
});

test("zero, abbreviated, branch-name and revision-expression inputs fail closed", () => {
  for (const value of ["0".repeat(40), "1234567", "origin/release/v3.8.53", `${BASE_SHA}^1`, ""]) {
    assert.throws(
      () =>
        resolveChangelogComparisonBase({
          eventName: "pull_request",
          candidateSha: CANDIDATE_SHA,
          pullRequestBaseSha: value,
        }),
      /Missing or invalid immutable/
    );
  }
  assert.throws(
    () => resolveChangelogComparisonBase({ eventName: "workflow_dispatch", candidateSha: "" }),
    /candidate SHA/
  );
  assert.throws(
    () => resolveChangelogComparisonBase({ eventName: "schedule", candidateSha: CANDIDATE_SHA }),
    /Unsupported/
  );
});

test("the merge-integrity job binds event fields before running the unchanged gate", () => {
  type Step = { run?: string; env?: Record<string, string> };
  type Workflow = { jobs: Record<string, { steps: Step[] }> };
  const workflow = load(
    readFileSync(new URL("../../.github/workflows/quality.yml", import.meta.url), "utf8")
  ) as Workflow;
  const step = workflow.jobs["merge-integrity"].steps.find((item) =>
    item.run?.includes("npm run check:changelog-integrity")
  );
  assert.ok(step);
  assert.deepEqual(step.env, {
    CHANGELOG_EVENT_NAME: "${{ github.event_name }}",
    CHANGELOG_CANDIDATE_SHA: "${{ github.sha }}",
    CHANGELOG_PR_BASE_SHA: "${{ github.event.pull_request.base.sha }}",
    CHANGELOG_MERGE_GROUP_BASE_SHA: "${{ github.event.merge_group.base_sha }}",
    CHANGELOG_PUSH_BEFORE_SHA: "${{ github.event.before }}",
  });
  assert.match(step.run, /^set -euo pipefail\n/);
  assert.match(
    step.run,
    /CHANGELOG_BASE_REF="\$\(node scripts\/quality\/changelog-comparison-base\.mjs\)"\nexport CHANGELOG_BASE_REF\nnpm run check:changelog-integrity/
  );
  assert.doesNotMatch(step.run, /\|\|\s*(?:true|:)|origin\/|GITHUB_BASE_REF/);
});
