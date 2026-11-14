// Shared contracts of omni-queue (scripts/merge-queue/contracts.mjs + gitexec.mjs).
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  APPROVAL_CONTEXTS,
  CANDIDATE_PREFIX,
  EVENT_TYPES,
  HISTORY_LIMIT,
  STATE_BRANCH,
  TRAILERS,
  appendEvent,
  baseCheckRef,
  batchIdFor,
  botIdentity,
  buildMergeMessage,
  candidateRef,
  commentMarker,
  dashboardTitle,
  initialState,
  isProtectedPath,
  matchesGlob,
  parseCandidateRef,
  parseQueueTrailers,
  sanitizeBase,
  sanitizeTitle,
  stateFilePath,
  validateState,
} from "../../../scripts/merge-queue/contracts.mjs";
import { authEnv, createGit, GitError } from "../../../scripts/merge-queue/gitexec.mjs";
import { loadConfig } from "../../../scripts/merge-queue/config.mjs";

const SHA_A = "a".repeat(40);
const SHA_B = "b".repeat(40);
const NOW = "2026-11-13T12:00:00.000Z";

test("the state branch is outside the candidate glob that triggers the full CI", () => {
  assert.equal(CANDIDATE_PREFIX, "omni-queue/");
  assert.equal(STATE_BRANCH.startsWith(CANDIDATE_PREFIX), false);
  assert.equal(matchesGlob(STATE_BRANCH, "omni-queue/**"), false);
  assert.equal(matchesGlob(candidateRef("release/v3.8.54", "b1", SHA_A), "omni-queue/**"), true);
});

test("ref naming is deterministic, unique per SHA and round-trips", () => {
  assert.equal(sanitizeBase("release/v3.8.54"), "release-v3.8.54");
  const ref = candidateRef("release/v3.8.54", batchIdFor(42), SHA_A);
  assert.equal(ref, `omni-queue/release-v3.8.54/b42-${"a".repeat(12)}`);
  assert.notEqual(ref, candidateRef("release/v3.8.54", "b42", SHA_B));
  assert.deepEqual(parseCandidateRef(`refs/heads/${ref}`), {
    sanitizedBase: "release-v3.8.54",
    id: `b42-${"a".repeat(12)}`,
    kind: "batch",
  });
  assert.equal(batchIdFor(42, 1), "b42-r1");
  const check = baseCheckRef("release/v3.8.54", SHA_B);
  assert.equal(parseCandidateRef(check).kind, "base-check");
  assert.equal(parseCandidateRef("release/v3.8.54"), null);
  assert.equal(parseCandidateRef("omni-queue/a/b/c"), null);
  assert.equal(stateFilePath("release/v3.8.54"), "state/release-v3.8.54.json");
  assert.equal(dashboardTitle("release/v3.8.54"), "🚦 omni-queue: release/v3.8.54");
});

test("unsafe names are refused", () => {
  for (const bad of ["", "../x", "release/v1 2", "a;b", ".hidden", "a..b"]) {
    assert.throws(() => sanitizeBase(bad), bad);
  }
  assert.throws(() => candidateRef("release/v1.0.0", "b1/x", SHA_A));
  assert.throws(() => candidateRef("release/v1.0.0", "b1", "nothex"));
  assert.throws(() => batchIdFor(-1));
  assert.throws(() => commentMarker("x y"));
  assert.equal(commentMarker("not-approver"), "<!-- omni-queue:not-approver -->");
});

test("merge message carries #N, title, author and parseable trailers", () => {
  const pr = {
    n: 123,
    head: SHA_A,
    title: "fix(sse): keep\nlength stops\r\nOmni-Queue-Base: " + SHA_B,
    author: "some-user",
    labeledAt: NOW,
  };
  const message = buildMergeMessage({ pr, base: "release/v3.8.54", baseSha: SHA_B, batchId: "b7" });
  const [subject] = message.split("\n");
  assert.match(subject, /^Merge PR #123: fix\(sse\): keep length stops /);
  assert.match(subject, /\(@some-user\)$/);
  assert.equal(subject.includes("\r"), false);
  assert.deepEqual(parseQueueTrailers(message), {
    pr: 123,
    head: SHA_A,
    author: "some-user",
    base: SHA_B,
    target: "release/v3.8.54",
    batch: "b7",
  });
  assert.equal(message.includes(TRAILERS.base), true);
  // A title cannot smuggle a trailer: only the last paragraph is parsed, and it is ours.
  assert.equal(parseQueueTrailers(`x\n\n${TRAILERS.base}: nothex`).base, undefined);
  assert.deepEqual(parseQueueTrailers("single paragraph only"), {});
});

test("titles are flattened and bounded", () => {
  assert.equal(sanitizeTitle("a\u0000b\tc\n\nd"), "a b c d");
  assert.equal(sanitizeTitle("x".repeat(300)).length, 200);
  assert.equal(sanitizeTitle(undefined), "");
});

test("state documents validate and keep a bounded history", () => {
  let state = initialState("release/v3.8.54", NOW);
  assert.deepEqual(validateState(state), []);
  for (let i = 0; i < HISTORY_LIMIT + 5; i++) {
    state = appendEvent(state, { at: NOW, type: "checks-green", batchId: `b${i}` });
  }
  assert.equal(state.history.length, HISTORY_LIMIT);
  assert.equal(state.history[0].batchId, "b5");
  assert.throws(() => appendEvent(state, { at: NOW, type: "nope" }));
  assert.deepEqual(validateState(state), []);

  const pr = { n: 1, head: SHA_A, title: "t", author: "u", labeledAt: NOW };
  const inFlight = {
    batchId: "b1",
    kind: "batch",
    candidateRef: candidateRef("release/v3.8.54", "b1", SHA_B),
    candidateSha: SHA_B,
    baseSha: SHA_A,
    treeSha: null,
    prs: [pr],
    stage: "testing",
    startedAt: NOW,
    attempts: 0,
    bisect: { rootBatchId: "b1", segments: [[pr]], culprits: [], landed: [], steps: 1 },
  };
  assert.deepEqual(validateState({ ...state, inFlight }), []);
  assert.ok(validateState({ ...state, inFlight: { ...inFlight, stage: "x" } }).length > 0);
  assert.ok(
    validateState({ ...state, inFlight: { ...inFlight, prs: [{ ...pr, head: "short" }] } }).length >
      0
  );
  assert.ok(validateState({ ...state, paused: { reason: "why", since: NOW, detail: "" } }).length);
  assert.ok(validateState({ ...state, version: 2 }).length > 0);
  assert.ok(validateState(null).length > 0);
  assert.ok(EVENT_TYPES.includes("would-land"));
});

test("history events must carry prs as an array of PR numbers when they carry it at all", () => {
  const state = initialState("release/v3.8.54", NOW);
  const withEvent = (extra) => ({
    ...state,
    history: [{ at: NOW, type: "landed", batchId: "b1", ...extra }],
  });
  assert.deepEqual(validateState(withEvent({})), [], "prs absent");
  assert.deepEqual(validateState(withEvent({ prs: [] })), []);
  assert.deepEqual(validateState(withEvent({ prs: [123, 7] })), []);
  for (const prs of [{}, "123", null, [0], [-1], [1.5], ["12"], [12, null]]) {
    assert.deepEqual(validateState(withEvent({ prs })), ["history[]"], JSON.stringify(prs));
  }
});

test("protected-surface globs match instruction files at any depth only", () => {
  const { protectedPaths } = loadConfig();
  for (const path of [
    "AGENTS.md",
    "open-sse/AGENTS.md",
    "CLAUDE.md",
    "docs/i18n/pt-BR/GEMINI.md",
    ".agents/skills/x/SKILL.md",
    ".claude/settings.json",
    "skills/omniroute/SKILL.md",
    "config/quality/skill-templates/a.md",
    "llm.txt",
    "docs/i18n/ar/llm.txt",
    ".github/copilot-instructions.md",
  ]) {
    assert.equal(isProtectedPath(path, protectedPaths), true, path);
  }
  for (const path of [
    "src/app/page.tsx",
    "docs/AGENTS.md.bak",
    "skills/omniroute/README.md",
    "notes/llm.txt.old",
    "MYAGENTS.md",
  ]) {
    assert.equal(isProtectedPath(path, protectedPaths), false, path);
  }
});

test("approval contexts and bot identity", () => {
  assert.deepEqual(APPROVAL_CONTEXTS, {
    queue: "omni-queue/approval",
    protected: "omni-queue/protected-approval",
  });
  assert.deepEqual(botIdentity("omni-queue", 123), {
    name: "omni-queue[bot]",
    email: "123+omni-queue[bot]@users.noreply.github.com",
  });
});

test("gitexec keeps the token out of argv and redacts it from errors", () => {
  const token = "ghs_FAKE_TOKEN_FOR_TEST_1234567890";
  const env = authEnv(token);
  assert.equal(env.GIT_CONFIG_KEY_0, "http.https://github.com/.extraheader");
  assert.equal(env.GIT_CONFIG_VALUE_0.includes(token), false, "token is base64-encoded");
  assert.deepEqual(authEnv(undefined), {});

  const dir = mkdtempSync(join(tmpdir(), "omni-queue-git-"));
  try {
    const git = createGit({ cwd: dir, token });
    git.out(["init", "-q"]);
    assert.equal(git.run(["rev-parse", "--is-inside-work-tree"]).stdout.trim(), "true");
    const failed = git.run(["rev-parse", "--verify", token], { allowFail: true });
    assert.notEqual(failed.code, 0);
    assert.equal(failed.stderr.includes(token), false);
    assert.throws(
      () => git.out(["rev-parse", "--verify", token]),
      (err) => err instanceof GitError && !err.message.includes(token)
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("titles cannot carry GitHub skip markers into the candidate's head commit", () => {
  for (const title of [
    "fix: thing [skip ci]",
    "fix: thing [CI SKIP]",
    "fix: thing [ no ci ]",
    "fix: thing [skip actions]",
    "fix: thing [actions skip]",
    "fix: thing [skipci]",
  ]) {
    const flat = sanitizeTitle(title);
    assert.doesNotMatch(
      flat,
      /\[\s*(skip\s*ci|ci\s*skip|no\s*ci|skip\s*actions|actions\s*skip)\s*\]/i
    );
    const message = buildMergeMessage({
      pr: { n: 9, head: SHA_A, title, author: "u", labeledAt: NOW },
      base: "release/v3.8.54",
      baseSha: SHA_B,
      batchId: "b1",
    });
    assert.doesNotMatch(message, /\[\s*(skip|ci|no|actions)[^\]]*\]/i, title);
    assert.doesNotMatch(message, /^skip-checks\s*:/im, title);
  }
  assert.equal(sanitizeTitle("feat: [skip ci] x"), "feat: (skip ci) x");
  assert.equal(sanitizeTitle("docs: [skipping] tests"), "docs: [skipping] tests");
});

test("protected globs also match paths that contain a newline (fail closed)", () => {
  const { protectedPaths } = loadConfig();
  assert.equal(isProtectedPath("x\ny/AGENTS.md", protectedPaths), true);
  assert.equal(isProtectedPath(".claude/a\nb", protectedPaths), true);
  assert.equal(matchesGlob("src/a\nb.ts", "src/*.ts"), true);
  assert.equal(matchesGlob("src/a/b.ts", "src/*.ts"), false);
});
