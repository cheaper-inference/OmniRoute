import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import * as profile from "../../../scripts/quality/release-green-static-profile.mjs";
import { createReleaseGreenProfileFixture } from "../../_helpers/releaseGreenProfileFixture.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const comparisonFor = (fixture) => ({
  baseSha: fixture.baseSha,
  baseTipSha: fixture.baseSha,
  candidateSha: fixture.headSha,
  source: "fixture",
  scope: "candidate",
});
function git(fixture, ...args) {
  return execFileSync("git", args, {
    cwd: fixture.root,
    encoding: "utf8",
    timeout: 30000,
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      HOME: fixture.root,
      XDG_CONFIG_HOME: fixture.root,
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_AUTHOR_NAME: "Baseline Fixture",
      GIT_AUTHOR_EMAIL: "baseline@example.invalid",
      GIT_COMMITTER_NAME: "Baseline Fixture",
      GIT_COMMITTER_EMAIL: "baseline@example.invalid",
      GIT_AUTHOR_DATE: "2000-01-01T00:00:00+00:00",
      GIT_COMMITTER_DATE: "2000-01-01T00:00:00+00:00",
    },
  }).trim();
}
function maskingGate(fixture, baseSha) {
  return profile
    .loadFullCiProfile(fixture.root, {
      comparison: comparisonFor(fixture),
      testMaskingBaseSha: baseSha,
    })
    .find((gate) => gate.id === "check:test-masking");
}

test("the retained base survives a moving origin/main between curated and static evaluation", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const pinned = fixture.baseSha;
  git(fixture, "update-ref", "refs/remotes/origin/main", fixture.headSha);
  assert.equal(maskingGate(fixture, pinned).env.GITHUB_BASE_SHA, pinned);
});

test("the default comparison resolves the local remote ref to one immutable commit", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  assert.equal(profile.resolveTestMaskingBase(fixture.root), fixture.baseSha);
});

test("an explicit immutable base does not need origin/main to remain present", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root, { withBase: false });
  const pinned = profile.resolveTestMaskingBase(fixture.root, [
    "--test-masking-base-sha",
    fixture.baseSha,
  ]);
  assert.equal(pinned, fixture.baseSha);
  assert.equal(maskingGate(fixture, pinned).env.GITHUB_BASE_SHA, pinned);
});

test("deleting a moving ref cannot change the already resolved base", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const pinned = profile.resolveTestMaskingBase(fixture.root);
  git(fixture, "update-ref", "-d", "refs/remotes/origin/main");
  assert.deepEqual(
    maskingGate(fixture, pinned).env,
    profile.testMaskingGateEnv(fixture.root, pinned)
  );
  assert.equal(pinned, fixture.baseSha);
});

test("the curated and static environments use the same SHA and disable remote fallback", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const pinned = profile.resolveTestMaskingBase(fixture.root);
  const curated = profile.testMaskingGateEnv(fixture.root, pinned);
  const declared = maskingGate(fixture, pinned).env;
  assert.deepEqual(curated, declared);
  assert.deepEqual(curated, {
    GITHUB_BASE_SHA: fixture.baseSha,
    GITHUB_BASE_REF: "",
    GIT_ALLOW_PROTOCOL: "",
    GIT_NO_LAZY_FETCH: "1",
  });
});

test("test masking keeps its main comparison independent of the i18n baseline", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const maskingBase = profile.resolveTestMaskingBase(fixture.root, [
    "--test-masking-base-sha",
    fixture.headSha,
  ]);
  const gates = profile.loadFullCiProfile(fixture.root, {
    comparison: comparisonFor(fixture),
    testMaskingBaseSha: maskingBase,
  });
  assert.equal(
    gates.find((gate) => gate.id === "check:test-masking").env.GITHUB_BASE_SHA,
    fixture.headSha
  );
  assert.equal(
    gates.find((gate) => gate.id === "i18n:check-value-drift").env.I18N_BASE_SHA,
    fixture.baseSha
  );
});

test("a separately advanced main tip remains comparable through the common ancestor", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  writeFileSync(join(fixture.root, "candidate-only.txt"), "candidate change\n");
  git(fixture, "add", "--", "candidate-only.txt");
  const candidateTree = git(fixture, "write-tree");
  fixture.headSha = git(
    fixture,
    "commit-tree",
    candidateTree,
    "-p",
    fixture.headSha,
    "-m",
    "candidate delta"
  );
  git(fixture, "update-ref", "--no-deref", "HEAD", fixture.headSha);

  git(fixture, "read-tree", fixture.baseSha + "^{tree}");
  writeFileSync(join(fixture.root, "main-only.txt"), "independent main change\n");
  git(fixture, "add", "--", "main-only.txt");
  const mainTree = git(fixture, "write-tree");
  const advancedMain = git(
    fixture,
    "commit-tree",
    mainTree,
    "-p",
    fixture.baseSha,
    "-m",
    "independent main delta"
  );
  git(fixture, "update-ref", "refs/remotes/origin/main", advancedMain);

  assert.throws(() => git(fixture, "merge-base", "--is-ancestor", advancedMain, fixture.headSha), {
    status: 1,
  });
  const retained = profile.resolveTestMaskingBase(fixture.root);
  assert.equal(retained, advancedMain);
  assert.equal(maskingGate(fixture, retained).env.GITHUB_BASE_SHA, advancedMain);
  assert.equal(git(fixture, "merge-base", retained, fixture.headSha), fixture.baseSha);
  assert.equal(git(fixture, "diff", "--name-only", retained + "...HEAD"), "candidate-only.txt");
});

test("a missing local default is incomplete instead of falling back to HEAD", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root, { withBase: false });
  assert.throws(() => profile.resolveTestMaskingBase(fixture.root), /local Git objects/);
});

test("a missing explicit object is incomplete instead of using a moving ref", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  assert.throws(
    () => profile.resolveTestMaskingBase(fixture.root, ["--test-masking-base-sha", "f".repeat(40)]),
    /local Git objects/
  );
});

test("a valid but unrelated commit cannot silently produce an empty diff", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const tree = git(fixture, "rev-parse", "HEAD^{tree}");
  const unrelated = git(fixture, "commit-tree", tree, "-m", "unrelated baseline");
  assert.throws(
    () => profile.resolveTestMaskingBase(fixture.root, ["--test-masking-base-sha", unrelated]),
    /local Git objects/
  );
});

test("a tree object is not a valid commit baseline", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  const tree = git(fixture, "rev-parse", "HEAD^{tree}");
  assert.throws(
    () => profile.resolveTestMaskingBase(fixture.root, ["--test-masking-base-sha", tree]),
    /local Git objects/
  );
});

for (const [name, argv] of [
  ["missing value", ["--test-masking-base-sha"]],
  ["branch expression", ["--test-masking-base-sha", "origin/main"]],
  ["short SHA", ["--test-masking-base-sha", "a".repeat(7)]],
  ["zero SHA", ["--test-masking-base-sha", "0".repeat(40)]],
  ["uppercase SHA", ["--test-masking-base-sha", "A".repeat(40)]],
  ["option value", ["--test-masking-base-sha", "--quick"]],
  [
    "repeated flag",
    ["--test-masking-base-sha", "a".repeat(40), "--test-masking-base-sha", "a".repeat(40)],
  ],
  ["unknown option", ["--test-masking-ref", "main"]],
  ["unsupported equals syntax", ["--test-masking-base-sha=" + "a".repeat(40)]],
]) {
  test("reject test-masking input: " + name, (t) => {
    const fixture = createReleaseGreenProfileFixture(t, root);
    assert.throws(() => profile.resolveTestMaskingBase(fixture.root, argv));
  });
}

test("the full static profile cannot select a base if no retained SHA was supplied", (t) => {
  const fixture = createReleaseGreenProfileFixture(t, root);
  assert.throws(
    () => profile.loadFullCiProfile(fixture.root, { comparison: comparisonFor(fixture) }),
    /immutable base SHA/
  );
});
