import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  buildChecks,
  planDerivedRewrites,
  PR_MODE_FACTS,
  runCountsGate,
} from "../../scripts/check/check-docs-counts-sync.mjs";
import { categoryOf, loadFamilies } from "../../scripts/check/check-pr-derived-paths.mjs";
import {
  frozenReadmeLines,
  isDigitsOnlyPatch,
} from "../../scripts/release/derived-refresh-autoland.mjs";

const root = new URL("../../", import.meta.url);
const readme = readFileSync(new URL("README.md", root), "utf8");
const snapshotPath = "docs/reference/reach-facts.json";
const snapshot = readFileSync(new URL(snapshotPath, root), "utf8");

function reachChecks(facts: typeof PR_MODE_FACTS | { reach: unknown }) {
  return buildChecks({ facts: { ...PR_MODE_FACTS, ...facts } }).filter((check) =>
    check.label.startsWith("README reach ")
  );
}

test("the real README matches every claim in the reach snapshot with no planned edits", async () => {
  const { readReachFacts } = await import("../../scripts/check/lib/reachClaims.mjs");
  const reach = readReachFacts(fileURLToPath(root));
  assert.ok(reach);
  const checks = reachChecks({ reach });
  assert.equal(checks.length, 19);
  for (const check of checks) {
    const verdict = check.validate(readme);
    assert.ok(verdict.ok, verdict.detail);
    assert.deepEqual(check.plan(readme), { edits: [], manual: [] }, check.label);
  }
});

test("the reach snapshot is in the generated file family", () => {
  const family = loadFamilies(fileURLToPath(root)).find(({ family }) => family === "generated");
  assert.ok(family);
  assert.equal(categoryOf(snapshotPath, family)?.id, "reach-facts");
});

test("PR facts include all 19 README reach checks and the PR gate rejects malformed dates", () => {
  const checks = reachChecks(PR_MODE_FACTS);
  assert.equal(checks.length, 19);
  for (const check of checks) {
    assert.deepEqual(check.files, ["README.md"]);
    assert.ok(check.validate(readme).ok, check.label);
  }

  const badDate = readme.replace(
    /^Collected on [0-9]{4}-[0-9]{2}-[0-9]{2}\.$/m,
    "Collected on 2026-02-30."
  );
  assert.notEqual(badDate, readme);
  const result = runCountsGate({
    mode: "pr",
    branch: "chore/derived-reach-test",
    base: null,
    readHead: (file: string) => (file === "README.md" ? badDate : null),
  });
  assert.equal(result.exitCode, 1);
  assert.equal(result.strict, 1);
  assert.match(result.lines.join("\n"), /✗ README\.md .*Collected on/);
});

test("numbers reads tomorrow's snapshot through its file reader and generates an autoland-safe README patch", () => {
  // The three platform increments also add three to each aggregate.
  const reach = JSON.parse(snapshot) as {
    schema: number;
    collectedOn: string;
    metrics: Record<string, { value: number; collectedAt: string }>;
  };
  const tomorrow = new Date(`${reach.collectedOn}T00:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  reach.collectedOn = tomorrow.toISOString().slice(0, 10);
  for (const [key, metric] of Object.entries(reach.metrics)) {
    metric.value += key === "videos" || key === "videoViews" ? 3 : 1;
    metric.collectedAt = `${reach.collectedOn}T08:46:35Z`;
  }

  // refresh-derived's general facts have no reach field. The reader supplies the
  // in-memory snapshot the same way its numbers step supplies files from its overlay.
  const { reach: _reach, ...facts } = PR_MODE_FACTS;
  const result = planDerivedRewrites({
    facts,
    readFile: (file: string) => {
      if (file === "README.md") return readme;
      return file === snapshotPath ? JSON.stringify(reach) : null;
    },
  });
  const planned = result.files.find((file) => file.path === "README.md");
  assert.ok(planned);
  const checks = reachChecks({ reach });
  const stale = checks.filter((check) => !check.validate(readme).ok);
  const manual = result.manual.filter(({ label }) => label.startsWith("README reach "));
  const stillStale = checks.filter((check) => !check.validate(planned.after).ok);
  // On a future day a counter can cross a digit boundary and legitimately become manual.
  assert.deepEqual(
    new Set(manual.map(({ label }) => label)),
    new Set(stillStale.map(({ label }) => label))
  );
  for (const item of manual) assert.match(item.detail, /the figure gained a digit; edit by hand/);
  assert.equal(planned.changes.length + manual.length, stale.length);
  assert.ok(planned.changes.every(({ label }) => label.startsWith("README reach ")));

  const before = planned.before.split("\n");
  const after = planned.after.split("\n");
  assert.equal(after.length, before.length);
  const hunks = before.flatMap((line, index) =>
    line === after[index] ? [] : [`@@ -${index + 1} +${index + 1} @@\n-${line}\n+${after[index]}`]
  );
  assert.ok(hunks.length >= 2, "both collection dates should move");
  assert.ok(
    isDigitsOnlyPatch(
      hunks.join("\n"),
      { status: "modified", additions: hunks.length, deletions: hunks.length },
      frozenReadmeLines(readme)
    )
  );
});
