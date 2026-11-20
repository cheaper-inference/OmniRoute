// Gate-exemption diff-scope regression tests.
// Everything entering the repository is written in generic English: no issue
// numbers, no internal labels, no local paths.

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  CHECK_BASE_RESOLVER,
  diffChangedFiles,
  isShallow,
  resolveCheckBase,
} from "../../scripts/check/lib/check-base.mjs";
import {
  assertDiffScope,
  enforceDiffScope,
  registryFrozenScope,
} from "../../scripts/check/lib/allowlist.mjs";
import { findRawSql } from "../../scripts/check/check-db-rules.mjs";

function scratchGit(t) {
  const cwd = mkdtempSync(join(tmpdir(), "diff-scope-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const git = (args) => {
    const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" });
    assert.equal(r.status, 0, r.stderr);
    return r.stdout.trim();
  };
  git(["init", "-q"]);
  git(["config", "user.email", "test@example.invalid"]);
  git(["config", "user.name", "Test"]);
  return { cwd, git };
}

test("a missing base on a pull_request reports the shared resolver name and exit code 2", (t) => {
  const { cwd, git } = scratchGit(t);
  git(["commit", "-q", "--allow-empty", "-m", "head"]);
  const result = resolveCheckBase({
    cwd,
    env: { GITHUB_EVENT_NAME: "pull_request" },
  });
  assert.equal(result.status, "error");
  assert.equal(result.resolver, CHECK_BASE_RESOLVER);
  assert.match(result.reason, /base/i);
  const enforced = assertDiffScope({
    allowlist: [],
    liveViolations: [],
    changedFiles: [],
    baseStatus: result,
    gateName: "sample",
  });
  assert.equal(enforced.blocked, true);
  assert.equal(enforced.exitCode, 2);
});

test("an ambiguous or shallow base is refused on a merge_group event", (t) => {
  const { cwd, git } = scratchGit(t);
  git(["commit", "-q", "--allow-empty", "-m", "head"]);
  const result = resolveCheckBase({
    cwd,
    env: { GITHUB_EVENT_NAME: "merge_group" },
  });
  // No merge parent, no payload, no base ref -> fail closed with the resolver name.
  assert.equal(result.status, "error");
  assert.equal(result.resolver, CHECK_BASE_RESOLVER);
});

test("outside a pull request the historic global behaviour is kept", () => {
  const result = resolveCheckBase({ cwd: process.cwd(), env: {} });
  assert.equal(result.status, "skipped");
  const enforced = assertDiffScope({
    allowlist: ["KNOWN_A"],
    liveViolations: [{ id: "KNOWN_A", file: "src/new.ts" }],
    changedFiles: ["src/new.ts"],
    baseStatus: result,
    gateName: "sample",
  });
  assert.equal(enforced.blocked, false);
  assert.equal(enforced.exitCode, 0);
  assert.deepEqual(enforced.newViolations, []);
});

test("a known violation reappearing in a changed file is refused by name", () => {
  const enforced = assertDiffScope({
    allowlist: ["KNOWN_A"],
    liveViolations: [
      { id: "KNOWN_A", file: "src/frozen.ts" },
      { id: "KNOWN_A", file: "src/new.ts" },
    ],
    changedFiles: ["src/new.ts"],
    frozenScope: ["src/frozen.ts"],
    baseStatus: { status: "resolved", sha: "a".repeat(40), resolver: CHECK_BASE_RESOLVER },
    gateName: "sample-gate",
  });
  assert.equal(enforced.blocked, true);
  assert.equal(enforced.exitCode, 1);
  assert.deepEqual(
    enforced.newViolations.map((v) => v.file),
    ["src/new.ts"]
  );
  assert.match(enforced.message, /sample-gate/);
  assert.match(enforced.message, /src\/new\.ts/);
});

test("a path violation from a real check is refused when its file is in the PR diff", (t) => {
  const dir = mkdtempSync(join(process.cwd(), ".tmp-diff-scope-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const file = join(dir, "route.ts");
  writeFileSync(file, 'const sql = "SELECT * FROM users WHERE id = ?";\n');

  // Same data shape as check-db-rules: a Set of repository-relative paths for
  // the known entries, and the real findRawSql output for the live violations.
  const relative = file.slice(process.cwd().length + 1);
  const allowlist = new Set([relative]);
  const liveViolations = findRawSql([file], new Set());
  assert.deepEqual(liveViolations, [relative]);

  const result = assertDiffScope({
    allowlist,
    liveViolations,
    changedFiles: [relative],
    frozenScope: registryFrozenScope("check-db-rules"),
    baseStatus: { status: "resolved", sha: "a".repeat(40), resolver: CHECK_BASE_RESOLVER },
    gateName: "check-db-rules",
  });
  assert.deepEqual(
    result.newViolations.map((v) => v.file),
    [relative]
  );
  assert.ok(
    result.message.includes(`[check-db-rules] known violation in new file: ${relative}`),
    result.message
  );
  assert.ok(result.message.includes(`(entry ${relative})`), result.message);
});

test("a dynamic route segment keeps its file in the diff scope", () => {
  const route = "src/app/api/users/[id]/route.ts";
  const enforced = assertDiffScope({
    allowlist: [route],
    liveViolations: [route],
    changedFiles: [route],
    frozenScope: [],
    baseStatus: { status: "resolved", sha: "a".repeat(40), resolver: CHECK_BASE_RESOLVER },
    gateName: "sample",
  });
  assert.deepEqual(
    enforced.newViolations.map((v) => v.file),
    [route]
  );
  assert.match(enforced.message, /\[id\]/);
});

test("stale enforcement still runs before the diff scope is applied", () => {
  const enforced = assertDiffScope({
    allowlist: ["KNOWN_A", "KNOWN_B"],
    liveViolations: [{ id: "KNOWN_A", file: "src/frozen.ts" }],
    frozenScope: ["src/frozen.ts"],
    baseStatus: { status: "resolved", sha: "a".repeat(40), resolver: CHECK_BASE_RESOLVER },
    gateName: "sample",
  });
  assert.deepEqual(enforced.stale, ["KNOWN_B"]);
  assert.equal(enforced.blocked, true);
});

test("a queue candidate without its base trailer is refused with the resolver name", () => {
  const result = resolveCheckBase({
    cwd: process.cwd(),
    env: { GITHUB_EVENT_NAME: "push" },
    ref: "omni-queue/release-v3.8.55/b42-abcdefabcdef",
    message: "chore: candidate without trailer",
    headSha: "abcdefabcdef1234567890abcdefabcdef123456",
  });
  assert.equal(result.status, "error");
  assert.equal(result.resolver, CHECK_BASE_RESOLVER);
  assert.match(result.reason, /Omni-Queue-Base/);
});

test("changed files come from the verified base, not from the working tree", (t) => {
  const { cwd, git } = scratchGit(t);
  git(["commit", "-q", "--allow-empty", "-m", "base"]);
  const base = git(["rev-parse", "HEAD"]);
  git(["commit", "-q", "--allow-empty", "-m", "head"]);
  // Empty commits still exercise the base resolution path; the diff is empty.
  assert.deepEqual(diffChangedFiles(cwd, base), []);
  assert.equal(isShallow(cwd), false);
});

test("enforceDiffScope is inert without a base and never writes to the tree", async () => {
  const result = await enforceDiffScope({
    allowlist: ["KNOWN_A"],
    liveViolations: [{ id: "KNOWN_A", file: "src/frozen.ts" }],
    gateName: "sample",
    cwd: process.cwd(),
    env: {},
  });
  assert.equal(result.status, "skipped");
  assert.equal(result.exitCode, 0);
});
