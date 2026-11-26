import assert from "node:assert/strict";
import test from "node:test";

import { loadFamilies } from "../../scripts/check/check-pr-derived-paths.mjs";
import { loadConfig } from "../../scripts/merge-queue/config.mjs";
import {
  decideAutoland,
  isDigitsOnlyPatch,
} from "../../scripts/release/derived-refresh-autoland.mjs";

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
  digitsOnlyFiles: [],
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

test("allows a verified digits-only README alongside derived files", () => {
  assert.deepEqual(
    decideAutoland({
      ...ready,
      files: [...ready.files, "README.md"],
      digitsOnlyFiles: ["README.md"],
    }),
    { apply: true, reasons: [] }
  );
});

test("rejects an unverified README with the README-specific reason", () => {
  assert.deepEqual(decideAutoland({ ...ready, files: [...ready.files, "README.md"] }), {
    apply: false,
    reasons: ["readme-not-digits-only"],
  });
});

const denied: Array<[string, Partial<typeof ready>, string]> = [
  ["closed PR", { state: "CLOSED" }, "pr-not-open"],
  ["draft PR", { isDraft: true }, "draft"],
  ["another head branch", { headBranch: "chore/i18n-mirror-refresh" }, "wrong-head-branch"],
  [
    "the protected refresh branch",
    { headBranch: "chore/derived-refresh-protected" },
    "wrong-head-branch",
  ],
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
  [
    "a non-derived file reported as digits-only",
    { files: ["src/app/page.tsx"], digitsOnlyFiles: ["src/app/page.tsx"] },
    "non-derived-file",
  ],
  ["a category exclusion", { files: ["src/i18n/messages/en.json"] }, "non-derived-file"],
  ["a protected companion", { files: ["skills/omniroute/SKILL.md"] }, "protected-file"],
  [
    "a digits-only README covered by the protection config",
    {
      files: ["README.md"],
      digitsOnlyFiles: ["README.md"],
      config: { ...ready.config, protectedPaths: [...ready.config.protectedPaths, "README.md"] },
    },
    "protected-file",
  ],
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

const migrationPatch = [
  "@@ -12 +12 @@",
  "-<td>178 modules in <code>src/lib/db/</code>, 252 migrations</td></tr>",
  "+<td>178 modules in <code>src/lib/db/</code>, 255 migrations</td></tr>",
].join("\n");

const patches: Array<[string, unknown, boolean]> = [
  ["the README migration count", migrationPatch, true],
  ["digits around an unchanged decimal point", "@@ -1 +1 @@\n-1.62B\n+11.3B", true],
  ["a changed separator and suffix", "@@ -1 +1 @@\n-90M\n+1.2B", false],
  ["changed text", migrationPatch.replace("255 migrations", "255 schemas"), false],
  ["an extra line", "@@ -1 +1,2 @@\n-Count: 252\n+Count: 255\n+Count: 256", false],
  ["only additions", "@@ -0,0 +1 @@\n+Count: 255", false],
  ["only removals", "@@ -1 +0,0 @@\n-Count: 255", false],
  ["a digit replaced by a letter", "@@ -1 +1 @@\n-252 migrations\n+A migrations", false],
  ["an empty patch", "", false],
  ["a missing patch", undefined, false],
  ["a context-only hunk", "@@ -1 +1 @@\n Count: 255", false],
  ["a truncated hunk", "@@ -1,2 +1,2 @@\n-Count: 252\n+Count: 255", false],
  [
    "equal changes across separate blocks in one hunk",
    "@@ -1,3 +1,3 @@\n-First: 1\n+First: 2\n context\n-Last: 5\n+Last: 6",
    true,
  ],
  ["unequal blocks split by context", "@@ -1,2 +1,2 @@\n-Count: 252\n context\n+Count: 255", false],
  ["multiple hunks", `${migrationPatch}\n@@ -24 +24 @@\n-Tools: 109\n+Tools: 110`, true],
  [
    "a text change in a later hunk",
    `${migrationPatch}\n@@ -24 +24 @@\n-Tools: 109\n+Scopes: 110`,
    false,
  ],
  [
    "missing newline markers",
    "@@ -1 +1 @@\n-Count: 252\n\\ No newline at end of file\n+Count: 255\n\\ No newline at end of file",
    true,
  ],
];

for (const [name, patch, expected] of patches) {
  test(`checks digits-only patches for ${name}`, () => {
    assert.equal(isDigitsOnlyPatch(patch), expected);
  });
}
