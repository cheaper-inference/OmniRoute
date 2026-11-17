// tests/unit/merge-queue/integration/openapi-baseline.test.mjs
// The OpenAPI breaking-change gate pins its comparison base to the event. A push that CREATES a
// branch has no `before` (all zeros), and every omni-queue candidate is such a push: the gate
// must then take the base the candidate itself names (Omni-Queue-Base), like the `changes` job.
// Found by the real-repository dry run of the candidate profile (2026-11-14): the gate ended
// INCOMPLETE "Missing immutable event base" and the candidate went red.

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { resolveOpenapiBaseline } from "../../../../scripts/check/openapiBaseline.mjs";
import {
  baseCheckRef,
  buildMergeMessage,
  candidateRef,
} from "../../../../scripts/merge-queue/contracts.mjs";
import { inheritedGitEnvCleared } from "./helpers/git-sandbox.mjs";

const ZERO = "0".repeat(40);
const BASE = "release/v9.9.9";

function gitEnv() {
  return {
    ...process.env,
    ...inheritedGitEnvCleared(),
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_AUTHOR_NAME: "Test",
    GIT_AUTHOR_EMAIL: "test@example.invalid",
    GIT_COMMITTER_NAME: "Test",
    GIT_COMMITTER_EMAIL: "test@example.invalid",
    LC_ALL: "C",
  };
}

/** base ← pr ; candidate = merge(base, pr) with the queue's own message. HEAD = candidate. */
function makeCandidateRepo(t) {
  const dir = mkdtempSync(join(tmpdir(), "omni-queue-openapi-base-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const git = (...args) => {
    const res = spawnSync("git", args, { cwd: dir, env: gitEnv(), encoding: "utf8" });
    assert.equal(res.status, 0, `git ${args.join(" ")}: ${res.stderr}`);
    return res.stdout.trim();
  };
  git("init", "-q", "-b", "base");
  writeFileSync(join(dir, "a.txt"), "base\n");
  git("add", "a.txt");
  git("commit", "-q", "-m", "chore: base");
  const base = git("rev-parse", "HEAD");
  git("checkout", "-q", "-b", "pr");
  writeFileSync(join(dir, "b.txt"), "pr\n");
  git("add", "b.txt");
  git("commit", "-q", "-m", "feat: pr change");
  const head = git("rev-parse", "HEAD");
  const pr = { n: 7, head, title: "pr change", author: "dev" };
  const message = buildMergeMessage({ pr, base: BASE, baseSha: base, batchId: "b1" });
  const tree = git("merge-tree", "--write-tree", base, head).split("\n")[0];
  const msgFile = join(dir, ".msg");
  writeFileSync(msgFile, `${message}\n`);
  const candidate = git("commit-tree", tree, "-p", base, "-p", head, "-F", msgFile);
  rmSync(msgFile);
  git("checkout", "-q", "--detach", candidate);
  return { dir, git, base, head, candidate };
}

/** The env a GitHub push job would have for `sha` on `ref`, with `before` as given. */
function pushEnv(dir, { sha, ref, before }) {
  const eventPath = join(dir, ".event.json");
  writeFileSync(eventPath, JSON.stringify({ before, after: sha, ref }));
  return {
    ...gitEnv(),
    GITHUB_EVENT_NAME: "push",
    GITHUB_EVENT_PATH: eventPath,
    GITHUB_SHA: sha,
    GITHUB_REF: ref,
  };
}

test("an omni-queue batch candidate (new ref, no `before`) compares against its Omni-Queue-Base", (t) => {
  const { dir, base, candidate } = makeCandidateRepo(t);
  const ref = `refs/heads/${candidateRef(BASE, "b1", candidate)}`;
  const result = resolveOpenapiBaseline({
    cwd: dir,
    env: pushEnv(dir, { sha: candidate, ref, before: ZERO }),
  });
  assert.equal(result.baseSha, base, "the base the batch was composed on");
  assert.equal(result.candidateSha, candidate);
  assert.equal(result.source, "push");
});

test("a base-check candidate is its own base", (t) => {
  const { dir, git, base } = makeCandidateRepo(t);
  git("checkout", "-q", "--detach", base);
  const ref = `refs/heads/${baseCheckRef(BASE, base)}`;
  const result = resolveOpenapiBaseline({
    cwd: dir,
    env: pushEnv(dir, { sha: base, ref, before: ZERO }),
  });
  assert.equal(result.baseSha, base);
});

test("a candidate ref that does not name its commit, or lost its trailer, still fails closed", (t) => {
  const { dir, git, base, head, candidate } = makeCandidateRepo(t);
  const wrongRef = `refs/heads/${candidateRef(BASE, "b1", head)}`;
  assert.throws(
    () =>
      resolveOpenapiBaseline({
        cwd: dir,
        env: pushEnv(dir, { sha: candidate, ref: wrongRef, before: ZERO }),
      }),
    /does not name/
  );
  // A plain commit pushed under a batch ref name: no Omni-Queue-Base to pin to.
  git("checkout", "-q", "--detach", head);
  const batchRefOnPlainCommit = `refs/heads/${candidateRef(BASE, "b1", head)}`;
  assert.throws(
    () =>
      resolveOpenapiBaseline({
        cwd: dir,
        env: pushEnv(dir, { sha: head, ref: batchRefOnPlainCommit, before: ZERO }),
      }),
    /no Omni-Queue-Base trailer/
  );
  assert.ok(base);
});

test("every other push keeps the event's `before`, and a new non-queue ref still has no base", (t) => {
  const { dir, git, base, head } = makeCandidateRepo(t);
  git("checkout", "-q", "--detach", head);
  const moved = resolveOpenapiBaseline({
    cwd: dir,
    env: pushEnv(dir, { sha: head, ref: "refs/heads/main", before: base }),
  });
  assert.equal(moved.baseSha, base);
  assert.throws(
    () =>
      resolveOpenapiBaseline({
        cwd: dir,
        env: pushEnv(dir, { sha: head, ref: "refs/heads/feature/x", before: ZERO }),
      }),
    /Missing immutable event base/
  );
  // A queue-looking ref outside refs/heads/ (a tag) is not a candidate.
  assert.throws(
    () =>
      resolveOpenapiBaseline({
        cwd: dir,
        env: pushEnv(dir, { sha: head, ref: "refs/tags/omni-queue/x", before: ZERO }),
      }),
    /Missing immutable event base/
  );
});
