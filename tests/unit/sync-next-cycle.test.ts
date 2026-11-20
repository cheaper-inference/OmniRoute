import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  insertNextSection,
  extractSection,
  versionAfter,
} from "../../scripts/release/sync-next-cycle.mjs";

const SCRIPT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/release/sync-next-cycle.mjs"
);

// Pure-function guards for the parallel-cycle sync-back (generate-release
// Phase 5 step 20): main's CHANGELOG must win VERBATIM and the next cycle's
// section must be re-inserted on top without eating any of main's bullets
// (anti-CHANGELOG-eat protocol, design doc
// _tasks/release-flow/2026-07-04_proposta-ciclo-paralelo-v2.md).

const MAIN = `# Changelog

## [Unreleased]

---

## [3.8.44] — 2026-07-04

### ✨ New Features

- **feat(a):** shipped feature one. (#1)
- **feat(b):** shipped feature two. (#2)

### 🙌 Contributors

| Contributor | PRs / Issues |
| --- | --- |
| [@x](https://github.com/x) | #1 |

---

## [3.8.43] — 2026-07-02

- **old:** bullet. (#0)
`;

const CYCLE_SECTION = `## [3.8.45] — TBD

### ✨ New Features

- **feat(new):** cycle bullet accumulated before the sync. (#9)`;

test("insertNextSection puts the cycle section before main's latest version, keeping main intact", () => {
  const out = insertNextSection(MAIN, CYCLE_SECTION, "3.8.45");
  const i45 = out.indexOf("## [3.8.45]");
  const i44 = out.indexOf("## [3.8.44]");
  const i43 = out.indexOf("## [3.8.43]");
  assert.ok(i45 !== -1 && i44 !== -1 && i43 !== -1, "all three sections present");
  assert.ok(i45 < i44 && i44 < i43, "ordering: 3.8.45 → 3.8.44 → 3.8.43");
  // main's content survives verbatim (no bullet eaten)
  assert.ok(out.includes("shipped feature one"), "main bullet 1 intact");
  assert.ok(out.includes("shipped feature two"), "main bullet 2 intact");
  assert.ok(out.includes("| [@x](https://github.com/x) | #1 |"), "contributors row intact");
  // the cycle's accumulated bullet survives
  assert.ok(out.includes("cycle bullet accumulated before the sync"), "cycle bullet intact");
});

test("insertNextSection synthesizes a TBD placeholder when the cycle has no section yet", () => {
  const out = insertNextSection(MAIN, null, "3.8.45");
  assert.ok(out.includes("## [3.8.45] — TBD"));
  assert.ok(out.indexOf("## [3.8.45]") < out.indexOf("## [3.8.44]"));
});

test("insertNextSection replaces a pre-existing copy of the next section instead of duplicating", () => {
  const withNext = insertNextSection(MAIN, CYCLE_SECTION, "3.8.45");
  const again = insertNextSection(withNext, CYCLE_SECTION, "3.8.45");
  const count = (again.match(/## \[3\.8\.45\]/g) || []).length;
  assert.equal(count, 1, "exactly one [3.8.45] heading after re-run (idempotent)");
});

test("extractSection returns header through the line before the next heading, trimming the separator", () => {
  const withNext = insertNextSection(MAIN, CYCLE_SECTION, "3.8.45");
  const section = extractSection(withNext, "3.8.45");
  assert.ok(section, "section found");
  assert.ok(section.startsWith("## [3.8.45]"));
  assert.ok(section.includes("cycle bullet accumulated"));
  assert.ok(!section.includes("## [3.8.44]"), "does not bleed into the next section");
  assert.ok(!section.trimEnd().endsWith("---"), "trailing separator trimmed");
});

test("extractSection returns null when the version has no section", () => {
  assert.equal(extractSection(MAIN, "9.9.9"), null);
});

test("versionAfter finds the heading right below a version's section", () => {
  assert.equal(versionAfter(MAIN, "3.8.44"), "3.8.43");
  assert.equal(versionAfter(MAIN, "3.8.43"), null, "last section has nothing below");
  assert.equal(versionAfter(MAIN, "9.9.9"), null, "missing version → null");
});

// Live-failure guards for the v3.8.45 run (2026-07-06) — source-shape assertions,
// same style as tests/unit/validate-release-green.test.ts.
test("git() passes a widened maxBuffer (ENOBUFS on `git show origin/main:CHANGELOG.md` — the CHANGELOG alone is >1 MiB)", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  const gitFn = src.slice(src.indexOf("function git("), src.indexOf("function main("));
  assert.ok(gitFn.includes("maxBuffer"), "git() helper must set maxBuffer above the 1 MiB default");
});

test("i18n resync also propagates the FINALIZED [prevVersion] section into the mirrors, not just [NEXT]", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  assert.ok(
    src.includes('"release:sync-changelog-i18n", "--", NEXT, prevVersion'),
    "syncs the new cycle section"
  );
  assert.ok(
    src.includes("versionAfter(mainChangelog, prevVersion)"),
    "computes the boundary below the shipped section"
  );
  assert.ok(
    src.includes('"release:sync-changelog-i18n", "--", prevVersion, belowPrev'),
    "syncs the shipped (finalized) section — without this all 42 mirrors keep it as TBD"
  );
});

// WS0.3 (v3.8.49 quality plan): the captain's sync-back push is the one write path
// with NO CI gate — the merged tree must pass release-green --quick BEFORE the push,
// or the whole PR queue inherits a red tip (G1). --skip-green-gate is the documented
// emergency escape hatch (pre-existing tip reds verified by hand).

test("greenGateArgs returns the quick release-green command by default", async () => {
  const { greenGateArgs } = await import("../../scripts/release/sync-next-cycle.mjs");
  assert.deepEqual(greenGateArgs(["node", "script", "3.8.49"]), [
    "scripts/quality/validate-release-green.mjs",
    "--quick",
  ]);
});

test("greenGateArgs returns null only with the explicit --skip-green-gate flag", async () => {
  const { greenGateArgs } = await import("../../scripts/release/sync-next-cycle.mjs");
  assert.equal(greenGateArgs(["node", "script", "3.8.49", "--skip-green-gate"]), null);
  assert.notEqual(greenGateArgs(["node", "script", "3.8.49", "--other"]), null);
});

// The push now goes through syncPushArgs() (side branch by default, the release branch
// only with --direct-push): the gate must still run before it. This assertion used to pin
// the literal direct push `git(["push", "origin", BRANCH]` — the default path no longer
// pushes to the release branch (ruleset 21899981 refuses it), see the tests below.
test("sync-next-cycle gates the push on release-green (source guard)", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  const mainIdx = src.indexOf("function main()");
  const gateCallIdx = src.indexOf("greenGateArgs(process.argv)", mainIdx);
  const pushIdx = src.indexOf("git(syncPushArgs(", mainIdx);
  assert.ok(gateCallIdx > mainIdx, "main() must call greenGateArgs(process.argv)");
  assert.ok(pushIdx > mainIdx, "main() must push through syncPushArgs()");
  assert.ok(pushIdx > gateCallIdx, "the release-green gate must run BEFORE the push");
});

// ── Sync-back lands through a pull request ─────────────────────────────────────────
// release/vX+1 is the default branch and ruleset 21899981 ("Require PR on default
// branch", no bypass actors) refuses a direct push. The default path pushes the merge
// commit to chore/sync-back-main-<sha12> and opens a PR into the release branch; the old
// direct push survives only behind --direct-push. The script never merges the PR.

const MAIN_SHA = "0123456789abcdef0123456789abcdef01234567";

test("syncBackBranchName uses the first 12 hex of the synced origin/main commit", async () => {
  const { syncBackBranchName } = await import("../../scripts/release/sync-next-cycle.mjs");
  assert.equal(syncBackBranchName(MAIN_SHA), "chore/sync-back-main-0123456789ab");
  assert.equal(
    syncBackBranchName(MAIN_SHA.toUpperCase()),
    "chore/sync-back-main-0123456789ab",
    "normalized to lower case"
  );
  assert.throws(() => syncBackBranchName("abc123"), /12/, "rejects a short SHA");
  assert.throws(() => syncBackBranchName("zzzzzzzzzzzzzzzz"), /hex/i, "rejects non-hex input");
});

test("parseSyncArgs: PR flow by default, direct push only with the explicit flag", async () => {
  const { parseSyncArgs } = await import("../../scripts/release/sync-next-cycle.mjs");
  assert.deepEqual(parseSyncArgs(["node", "script", "3.8.56"]), {
    next: "3.8.56",
    skipGreenGate: false,
    directPush: false,
    help: false,
    unknown: [],
  });
  const all = parseSyncArgs(["node", "script", "--skip-green-gate", "3.8.56", "--direct-push"]);
  assert.equal(all.next, "3.8.56", "the version may come after a flag");
  assert.equal(all.skipGreenGate, true);
  assert.equal(all.directPush, true);
  assert.equal(parseSyncArgs(["node", "script", "--help"]).help, true);
  assert.equal(parseSyncArgs(["node", "script", "-h"]).help, true);
  assert.deepEqual(parseSyncArgs(["node", "script", "3.8.56", "--force"]).unknown, ["--force"]);
  assert.equal(parseSyncArgs(["node", "script"]).next, null, "missing version → null");
  assert.equal(parseSyncArgs(["node", "script", "v3.8.56"]).next, null, "malformed version → null");
});

test("syncPushArgs never targets the release branch unless --direct-push was given", async () => {
  const { syncPushArgs } = await import("../../scripts/release/sync-next-cycle.mjs");
  const side = "chore/sync-back-main-0123456789ab";
  const pr = syncPushArgs({ directPush: false, branch: "release/v3.8.56", sideBranch: side });
  assert.deepEqual(pr, ["push", "origin", `HEAD:refs/heads/${side}`]);
  assert.ok(!pr.join(" ").includes("release/v3.8.56"), "PR path never names the release branch");
  assert.ok(!pr.some((a) => a.startsWith("-")), "no --force / --no-verify on the PR path");
  const direct = syncPushArgs({ directPush: true, branch: "release/v3.8.56", sideBranch: side });
  assert.deepEqual(direct, ["push", "origin", "HEAD:refs/heads/release/v3.8.56"]);
});

test("githubRepoFromRemoteUrl reads owner/name from https and ssh remotes", async () => {
  const { githubRepoFromRemoteUrl } = await import("../../scripts/release/sync-next-cycle.mjs");
  const want = "cheaper-inference/OmniRoute";
  assert.equal(githubRepoFromRemoteUrl("https://github.com/cheaper-inference/OmniRoute.git"), want);
  assert.equal(githubRepoFromRemoteUrl("https://github.com/cheaper-inference/OmniRoute"), want);
  assert.equal(githubRepoFromRemoteUrl("git@github.com:cheaper-inference/OmniRoute.git"), want);
  assert.equal(
    githubRepoFromRemoteUrl("ssh://git@github.com/cheaper-inference/OmniRoute.git"),
    want
  );
  assert.equal(githubRepoFromRemoteUrl("https://gitlab.com/a/b.git"), null, "non-GitHub → null");
  assert.equal(githubRepoFromRemoteUrl(""), null);
});

test("ghPrCreateArgs builds an argument array with --body-file and never a merge", async () => {
  const { ghPrCreateArgs, syncBackPrTitle } =
    await import("../../scripts/release/sync-next-cycle.mjs");
  const title = syncBackPrTitle("release/v3.8.56");
  assert.equal(title, "chore(release): sync-back main → release/v3.8.56");
  const args = ghPrCreateArgs({
    repo: "cheaper-inference/OmniRoute",
    base: "release/v3.8.56",
    head: "chore/sync-back-main-0123456789ab",
    title,
    bodyFile: "/x/body.md",
  });
  assert.deepEqual(args, [
    "pr",
    "create",
    "--repo",
    "cheaper-inference/OmniRoute",
    "--base",
    "release/v3.8.56",
    "--head",
    "chore/sync-back-main-0123456789ab",
    "--title",
    "chore(release): sync-back main → release/v3.8.56",
    "--body-file",
    "/x/body.md",
  ]);
  assert.ok(!args.includes("--body"), "body goes through a file, never inline");
});

test("ghOpenPrListArgs looks up an OPEN PR for exactly this head and base", async () => {
  const { ghOpenPrListArgs } = await import("../../scripts/release/sync-next-cycle.mjs");
  const args = ghOpenPrListArgs({
    repo: "cheaper-inference/OmniRoute",
    base: "release/v3.8.56",
    head: "chore/sync-back-main-0123456789ab",
  });
  assert.equal(args[0], "pr");
  assert.equal(args[1], "list");
  const flag = (name) => args[args.indexOf(name) + 1];
  assert.equal(flag("--repo"), "cheaper-inference/OmniRoute");
  assert.equal(flag("--head"), "chore/sync-back-main-0123456789ab");
  assert.equal(flag("--base"), "release/v3.8.56");
  assert.equal(flag("--state"), "open");
  assert.equal(flag("--json"), "url");
});

test("syncBackPrBody states merge-commit-only, green gates and the ancestry check, with no AI attribution", async () => {
  const { syncBackPrBody } = await import("../../scripts/release/sync-next-cycle.mjs");
  const body = syncBackPrBody({
    branch: "release/v3.8.56",
    mainSha: MAIN_SHA,
    prevVersion: "3.8.55",
    greenGate: "passed",
  });
  assert.match(body, /MERGE COMMIT/);
  assert.match(body, /never squash or rebase/i);
  assert.match(body, /551 files on v3\.8\.50 → v3\.8\.51/);
  assert.match(body, /required gates must be green on the head/i);
  assert.ok(
    body.includes("git merge-base --is-ancestor origin/main origin/release/v3.8.56"),
    "post-landing ancestry check names the release branch"
  );
  assert.ok(body.includes("0123456789ab"), "names the synced main commit");
  assert.ok(body.includes("v3.8.55"), "names the shipped version");
  assert.doesNotMatch(body, /co-authored-by|generated with|claude|copilot|\bAI\b|🤖/i);
});

test("syncBackNextSteps prints the PR URL and the three landing statements", async () => {
  const { syncBackNextSteps } = await import("../../scripts/release/sync-next-cycle.mjs");
  const out = syncBackNextSteps({
    branch: "release/v3.8.56",
    prUrl: "https://github.com/cheaper-inference/OmniRoute/pull/1",
  });
  assert.equal(
    out.split("\n")[0],
    "[sync-next-cycle] sync-back PR: https://github.com/cheaper-inference/OmniRoute/pull/1"
  );
  assert.match(out, /MERGE COMMIT/);
  assert.match(out, /never squash or rebase/i);
  assert.match(out, /required gates must be green/i);
  assert.ok(out.includes("git merge-base --is-ancestor origin/main origin/release/v3.8.56"));
});

test("SYNC_USAGE documents --direct-push as refused by this repository", async () => {
  const { SYNC_USAGE } = await import("../../scripts/release/sync-next-cycle.mjs");
  assert.ok(SYNC_USAGE.includes("--direct-push"));
  assert.ok(SYNC_USAGE.includes("--skip-green-gate"));
  assert.match(SYNC_USAGE, /refuse/i);
  assert.match(SYNC_USAGE, /21899981/);
});

test("the script never merges the PR it opens (source guard)", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  assert.doesNotMatch(src, /"pr",\s*"merge"/, "no gh pr merge argument array");
  assert.doesNotMatch(src, /--admin/, "no admin bypass");
  assert.doesNotMatch(src, /--no-verify/, "no hook bypass");
  const pushLines = src.split("\n").filter((l) => l.includes('"push"'));
  assert.ok(pushLines.length > 0, "push lines found");
  for (const l of pushLines) {
    assert.doesNotMatch(l, /"--force|"-f"|\+HEAD/, `no force-push: ${l.trim()}`);
  }
  assert.ok(!src.includes('git(["push", "origin", BRANCH]'), "the direct push is gone");
});
