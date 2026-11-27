import assert from "node:assert/strict";
import test from "node:test";

import { loadFamilies } from "../../scripts/check/check-pr-derived-paths.mjs";
import { loadConfig } from "../../scripts/merge-queue/config.mjs";
import { decideAutoland } from "../../scripts/release/derived-refresh-autoland.mjs";

const headSha = "a".repeat(40);
const checks: Record<string, string> = { "Gate / CI": "success", "Gate / Quality": "success" };
const ready = {
  state: "OPEN",
  isDraft: false,
  headBranch: "chore/derived-refresh",
  headRepository: "cheaper-inference/OmniRoute",
  repository: "cheaper-inference/OmniRoute",
  baseBranch: "release/v3.8.55",
  latestRelease: "release/v3.8.55",
  author: "diegosouzapw",
  labels: [],
  files: [
    "docs/reference/derived-facts.json",
    "src/i18n/messages/pt-BR.json",
    "changelog.d/maintenance/refresh.md",
  ],
  headSha,
  checksHeadSha: headSha,
  checks,
  releaseFreezeOpen: false,
  baseRedOpen: false,
  config: loadConfig(),
  families: loadFamilies(),
};

test("allows an open robot PR with derived categories and companions across families", () => {
  assert.deepEqual(decideAutoland(ready), { apply: true, reasons: [] });
});

const denied: Array<[string, Partial<typeof ready>, string]> = [
  ["closed PR", { state: "CLOSED" }, "pr-not-open"],
  ["draft PR", { isDraft: true }, "draft"],
  ["another head branch", { headBranch: "chore/i18n-mirror-refresh" }, "wrong-head-branch"],
  [
    "fork with the robot branch name",
    { headRepository: "fork/OmniRoute" },
    "wrong-head-repository",
  ],
  ["PR from an unapproved author", { author: "contributor" }, "wrong-author"],
  ["main as the base", { baseBranch: "main", latestRelease: "main" }, "wrong-base"],
  ["an older release base", { baseBranch: "release/v3.8.54" }, "wrong-base"],
  ["empty diff", { files: [] }, "empty-diff"],
  [
    "a non-derived file in a derived diff",
    { files: [...ready.files, "src/app/page.tsx"] },
    "non-derived-file",
  ],
  ["a category exclusion", { files: ["src/i18n/messages/en.json"] }, "non-derived-file"],
  ["a protected companion", { files: ["skills/omniroute/SKILL.md"] }, "protected-file"],
  ["an open release freeze", { releaseFreezeOpen: true }, "release-freeze"],
  ["an open base-red issue", { baseRedOpen: true }, "base-red"],
  ["checks from a different head", { checksHeadSha: "b".repeat(40) }, "checks-head-mismatch"],
  ["missing CI", { checks: { "Gate / Quality": "success" } }, "Gate / CI"],
  ["pending CI", { checks: { ...ready.checks, "Gate / CI": "pending" } }, "Gate / CI"],
  [
    "failed Quality",
    { checks: { ...ready.checks, "Gate / Quality": "failure" } },
    "Gate / Quality",
  ],
  ["existing queue label", { labels: ["omni-queue"] }, "already-labeled"],
  ["blocking label", { labels: ["HOLD"] }, "blocking-label"],
];

for (const [name, changes, reason] of denied) {
  test(`denies ${name}`, () => {
    const decision = decideAutoland({ ...ready, ...changes });
    assert.equal(decision.apply, false);
    assert.ok(
      decision.reasons.some((entry: string) => entry.includes(reason)),
      decision.reasons.join(", ")
    );
  });
}
