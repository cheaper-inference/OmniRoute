import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { withHardGateMode } from "../../../scripts/quality/validate-release-green.mjs";
import {
  ambiguous,
  divergent,
  expectStatus,
  fixture,
  runProfile,
  sample,
  source,
} from "../../_helpers/testMaskingGitFixture.mjs";

test("the existing static-profile API rejects a local base with unrelated history", (t) => {
  const repo = fixture(t);
  const tip = repo.commit({ [sample]: source(2) }, "unrelated main");
  repo.git("update-ref", "refs/remotes/origin/main", tip);
  repo.git("switch", "--quiet", "--orphan", "candidate");
  repo.commit({ [sample]: source(3) }, "unrelated candidate");
  assert.throws(() => repo.git("merge-base", "--all", tip, "HEAD"));
  expectStatus(
    runProfile(repo),
    1,
    "a resolvable commit without shared ancestry is not comparison evidence"
  );
});

test("the existing static-profile API rejects multiple best merge bases", (t) => {
  const repo = ambiguous(t);
  repo.git("update-ref", "refs/remotes/origin/main", repo.tip);
  expectStatus(runProfile(repo), 1, "a resolvable tip with two best merge bases is ambiguous");
});

test("a legitimate common ancestor and an explicitly retained base remain usable", (t) => {
  const repo = divergent(t);
  repo.git("update-ref", "refs/remotes/origin/main", repo.tip);
  const first = runProfile(repo);
  expectStatus(first, 0);
  const retained = JSON.parse(first.stdout)[0].env.GITHUB_BASE_SHA;
  assert.equal(retained, repo.tip);
  repo.git("update-ref", "refs/remotes/origin/main", repo.head);
  const second = runProfile(repo, retained);
  expectStatus(second, 0);
  assert.equal(JSON.parse(second.stdout)[0].env.GITHUB_BASE_SHA, retained);
});

test("curated and static environments retain the same base after its remote ref moves or disappears", (t) => {
  const repo = divergent(t);
  repo.git("update-ref", "refs/remotes/origin/main", repo.tip);
  const captured = runProfile(repo, "", { action: "resolve" });
  expectStatus(captured, 0);
  const pinned = JSON.parse(captured.stdout).baseSha;
  assert.equal(pinned, repo.tip);
  repo.git("update-ref", "refs/remotes/origin/main", repo.head);
  for (const removeRef of [false, true]) {
    if (removeRef) repo.git("update-ref", "-d", "refs/remotes/origin/main");
    const result = runProfile(repo, pinned, { action: "binding" });
    expectStatus(result, 0);
    const { env, gate } = JSON.parse(result.stdout);
    assert.deepEqual(env, gate.env);
    assert.deepEqual(env, {
      GITHUB_BASE_SHA: pinned,
      GITHUB_BASE_REF: "",
      GIT_ALLOW_PROTOCOL: "",
      GIT_NO_LAZY_FETCH: "1",
    });
    assert.equal(withHardGateMode(env, {}).OMNIROUTE_GATE_MODE, "pr");
  }
});

test("an explicit commit works without origin/main while missing objects and trees fail", (t) => {
  const repo = divergent(t);
  expectStatus(runProfile(repo, "", { action: "resolve" }), 1);
  const explicit = runProfile(repo, "", {
    action: "resolve",
    argv: ["--test-masking-base-sha", repo.tip],
  });
  expectStatus(explicit, 0);
  assert.equal(JSON.parse(explicit.stdout).baseSha, repo.tip);
  for (const unavailable of ["f".repeat(40), repo.git("rev-parse", "HEAD^{tree}")]) {
    const result = runProfile(repo, "", {
      action: "resolve",
      argv: ["--test-masking-base-sha", unavailable],
    });
    expectStatus(result, 1);
    assert.match(result.stderr, /local Git objects/);
  }
});

test("invalid observer comparison flags cannot fall back to a valid origin/main", (t) => {
  const repo = divergent(t);
  repo.git("update-ref", "refs/remotes/origin/main", repo.tip);
  for (const argv of [
    ["--test-masking-base-sha"],
    ["--test-masking-base-sha", "origin/main"],
    ["--test-masking-base-sha", "0".repeat(40)],
    ["--test-masking-base-sha", "A".repeat(40)],
    ["--test-masking-base-sha", "a".repeat(7)],
    ["--test-masking-base-sha", "--quick"],
    ["--test-masking-base-sha", repo.tip, "--test-masking-base-sha", repo.tip],
    ["--test-masking-ref", "main"],
    [`--test-masking-base-sha=${repo.tip}`],
  ]) {
    expectStatus(runProfile(repo, "", { action: "resolve", argv }), 1, argv.join(" "));
  }
});

test("the observer captures once and binds both executions without fetching a new base", () => {
  const observer = readFileSync(
    new URL("../../../scripts/quality/validate-release-green.mjs", import.meta.url),
    "utf8"
  );
  const capture = "resolveTestMaskingBase(ROOT, process.argv.slice(2))";
  assert.equal(observer.split(capture).length, 2, "one capture per observer invocation");
  assert.ok(observer.indexOf(capture) < observer.indexOf("const results = []"));
  const curated = observer.split("// test-masking (hard)")[1].split("// Remaining quality-gate")[0];
  assert.match(curated, /testMaskingGateEnv\(ROOT, testMaskingBaseSha\)/);
  assert.match(curated, /withHardGateMode\(env\)/);
  assert.doesNotMatch(curated, /["']fetch["']|GITHUB_BASE_REF/);
  const full = observer.split("// --full-ci executes")[1].split("const already =")[0];
  assert.match(full, /loadFullCiProfile\(ROOT, \(root, ref\) =>/);
  assert.match(full, /testMaskingGateEnv\(root, testMaskingBaseSha\)/);
  assert.match(full, /return testMaskingBaseSha/);
  for (const block of [curated, full]) {
    assert.match(block, /if \(testMaskingBaseError\) throw testMaskingBaseError/);
    assert.match(block, /evidenceState: "INCOMPLETE"/);
  }
  assert.match(observer, /if \(testMaskingBaseError && QUICK && !FULL_CI\)/);
});
