// omni-queue WP5: base SHA of a candidate push (scripts/merge-queue/candidate-base.mjs).
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { main, resolveCandidateBase } from "../../../scripts/merge-queue/candidate-base.mjs";
import {
  baseCheckRef,
  buildMergeMessage,
  candidateRef,
} from "../../../scripts/merge-queue/contracts.mjs";
import { inheritedGitEnvCleared } from "./integration/helpers/git-sandbox.mjs";

const BASE = "release/v3.8.54";
const SHA_A = "a".repeat(40);
const SHA_B = "b".repeat(40);
const HEAD = "0123456789ab".padEnd(40, "c");

function mergeMessage(baseSha, n = 7) {
  return buildMergeMessage({
    pr: { n, head: SHA_A, title: "fix: something", author: "someone", labeledAt: "" },
    base: BASE,
    baseSha,
    batchId: "b1",
  });
}

test("a batch candidate resolves to its Omni-Queue-Base trailer", () => {
  const ref = `refs/heads/${candidateRef(BASE, "b1", HEAD)}`;
  assert.deepEqual(resolveCandidateBase({ message: mergeMessage(SHA_B), headSha: HEAD, ref }), {
    baseSha: SHA_B,
    target: BASE,
    source: "trailer",
  });
  // The ref is optional and accepted without the refs/heads/ prefix.
  assert.equal(
    resolveCandidateBase({ message: mergeMessage(SHA_B), headSha: HEAD }).baseSha,
    SHA_B
  );
  assert.equal(
    resolveCandidateBase({
      message: mergeMessage(SHA_B),
      headSha: HEAD,
      ref: candidateRef(BASE, "b1-r1", HEAD),
    }).source,
    "trailer"
  );
});

test("without a ref and without a trailer the commit is its own base", () => {
  assert.deepEqual(resolveCandidateBase({ message: "chore: plain commit\n", headSha: HEAD }), {
    baseSha: HEAD,
    target: null,
    source: "self",
  });
});

test("a base-check ref is its own base even when the base tip is a queue merge commit", () => {
  // After a merge-ff landing the base tip carries the trailer of the batch that landed.
  const ref = `refs/heads/${baseCheckRef(BASE, HEAD)}`;
  assert.deepEqual(resolveCandidateBase({ message: mergeMessage(SHA_B), headSha: HEAD, ref }), {
    baseSha: HEAD,
    target: null,
    source: "self",
  });
});

test("a base-check ref must name the commit it carries", () => {
  const ref = baseCheckRef(BASE, SHA_A);
  assert.throws(
    () => resolveCandidateBase({ message: "x", headSha: HEAD, ref }),
    /does not name head/
  );
});

test("an infra retry of a base check (basecheck-<sha12>-r<n>) resolves to itself too", () => {
  const ref = baseCheckRef(BASE, HEAD, 1);
  assert.deepEqual(resolveCandidateBase({ message: mergeMessage(SHA_B), headSha: HEAD, ref }), {
    baseSha: HEAD,
    target: null,
    source: "self",
  });
  assert.throws(
    () => resolveCandidateBase({ message: "x", headSha: HEAD, ref: baseCheckRef(BASE, SHA_A, 2) }),
    /does not name head/
  );
  // the SHA is named once: a retry id with the SHA appended again is a stray push
  const doubled = `omni-queue/release-v3.8.54/basecheck-${HEAD.slice(0, 12)}-r1-${HEAD.slice(0, 12)}`;
  assert.throws(
    () => resolveCandidateBase({ message: "x", headSha: HEAD, ref: doubled }),
    /does not name head/
  );
});

test("a batch ref without the trailer fails closed", () => {
  const ref = candidateRef(BASE, "b3", HEAD);
  assert.throws(
    () =>
      resolveCandidateBase({
        message: "Merge PR #1: x\n\nSigned-off-by: a <a@b>\n",
        headSha: HEAD,
        ref,
      }),
    /no Omni-Queue-Base trailer/
  );
});

test("a batch ref must name the pushed commit and the commit's batch", () => {
  const message = mergeMessage(SHA_B); // Omni-Queue-Batch: b1
  // The right commit in another batch's ref (b2 is a different sequence, not a retry of b1).
  assert.throws(
    () => resolveCandidateBase({ message, headSha: HEAD, ref: candidateRef(BASE, "b2", HEAD) }),
    /names b2, the commit b1/
  );
  assert.throws(
    () => resolveCandidateBase({ message, headSha: HEAD, ref: candidateRef(BASE, "b12", HEAD) }),
    /names b12, the commit b1/
  );
  // A ref whose sha12 suffix names another commit.
  assert.throws(
    () => resolveCandidateBase({ message, headSha: HEAD, ref: candidateRef(BASE, "b1", SHA_A) }),
    /does not name head/
  );
  // No <batchId>-<sha12> shape at all.
  for (const id of ["b1", "b1-0123456789", "b1-0123456789AB", "-0123456789ab"]) {
    assert.throws(
      () =>
        resolveCandidateBase({ message, headSha: HEAD, ref: `omni-queue/release-v3.8.54/${id}` }),
      /malformed batch candidate ref|does not name head/,
      id
    );
  }
  // An infra retry pushes the same commit (trailer b1) under b1-r<n>: accepted.
  for (const id of ["b1-r1", "b1-r12"]) {
    assert.equal(
      resolveCandidateBase({ message, headSha: HEAD, ref: candidateRef(BASE, id, HEAD) }).baseSha,
      SHA_B,
      id
    );
  }
  // A commit without the batch trailer is judged by the suffix (and the base trailer) alone.
  const noBatch = message.replace(/^Omni-Queue-Batch: .*\n?/m, "");
  assert.doesNotMatch(noBatch, /Omni-Queue-Batch/);
  assert.equal(
    resolveCandidateBase({ message: noBatch, headSha: HEAD, ref: candidateRef(BASE, "b7", HEAD) })
      .baseSha,
    SHA_B
  );
});

test("a trailer outside the last paragraph is not a trailer", () => {
  const message = `Merge PR #1: x\n\nOmni-Queue-Base: ${SHA_B}\n\nbody text after it\n`;
  assert.equal(resolveCandidateBase({ message, headSha: HEAD }).source, "self");
  assert.throws(
    () => resolveCandidateBase({ message, headSha: HEAD, ref: candidateRef(BASE, "b1", HEAD) }),
    /no Omni-Queue-Base trailer/
  );
});

test("inconsistent or malformed inputs are rejected", () => {
  // Target trailer of another base than the ref's.
  assert.throws(
    () =>
      resolveCandidateBase({
        message: mergeMessage(SHA_B),
        headSha: HEAD,
        ref: candidateRef("release/v3.8.55", "b1", HEAD),
      }),
    /does not belong to base release\/v3\.8\.54/
  );
  // A trailer naming the candidate itself.
  assert.throws(
    () => resolveCandidateBase({ message: mergeMessage(HEAD), headSha: HEAD }),
    /names the candidate itself/
  );
  assert.throws(
    () => resolveCandidateBase({ message: mergeMessage(SHA_B), headSha: "HEAD" }),
    /invalid head sha/
  );
  for (const ref of [
    "refs/heads/release/v3.8.54",
    "omni-queue/only-one-segment",
    "omni-queue/a/b/c",
  ]) {
    assert.throws(
      () => resolveCandidateBase({ message: mergeMessage(SHA_B), headSha: HEAD, ref }),
      /not an omni-queue candidate ref/,
      ref
    );
  }
});

// ─────────────────────────── CLI against a real repository ───────────────────────────

/**
 * Fixture git environment, read at call time: every inherited GIT_* key is cleared (git honours
 * GIT_DIR / GIT_INDEX_FILE over cwd, so a suite run from a hook could write to the caller's repo).
 */
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

function makeRepo(t) {
  const dir = mkdtempSync(join(tmpdir(), "omni-queue-candidate-base-"));
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
  git("checkout", "-q", "base");
  const message = buildMergeMessage({
    pr: { n: 12, head, title: "feat: pr change", author: "someone", labeledAt: "" },
    base: BASE,
    baseSha: base,
    batchId: "b1",
  });
  const msgFile = join(dir, ".git", "MERGE_MSG_TEST");
  writeFileSync(msgFile, message);
  git("merge", "-q", "--no-ff", "--no-edit", "-F", msgFile, "pr");
  const candidate = git("rev-parse", "HEAD");
  return { dir, git, base, head, candidate };
}

function runMain(argv, { cwd, env = {} }) {
  let out = "";
  let err = "";
  // main() runs git through createGit, which inherits process.env: drop the inherited GIT_* keys
  // for the call (io.env only feeds GITHUB_REF).
  const saved = Object.keys(inheritedGitEnvCleared()).map((key) => [key, process.env[key]]);
  for (const [key] of saved) delete process.env[key];
  let code;
  try {
    code = main(argv, {
      cwd,
      env,
      stdout: (s) => (out += s),
      stderr: (s) => (err += s),
    });
  } finally {
    for (const [key, value] of saved) process.env[key] = value;
  }
  return { code, out, err };
}

test("CLI prints the batch base read from the candidate's top merge commit", (t) => {
  const repo = makeRepo(t);
  const ref = `refs/heads/${candidateRef(BASE, "b1", repo.candidate)}`;
  const res = runMain([], { cwd: repo.dir, env: { GITHUB_REF: ref } });
  assert.equal(res.err, "");
  assert.equal(res.code, 0);
  assert.equal(res.out, `BASE_SHA=${repo.base}\nTARGET=${BASE}\nSOURCE=trailer\n`);
  // --sha / --ref flags override HEAD / GITHUB_REF.
  const flagged = runMain(["--sha", repo.candidate, "--ref", ref], { cwd: repo.dir });
  assert.equal(flagged.out, res.out);
});

test("CLI and fixture ignore an inherited GIT_DIR / GIT_INDEX_FILE (suite run from a git hook)", (t) => {
  const decoy = mkdtempSync(join(tmpdir(), "omni-queue-candidate-base-decoy-"));
  t.after(() => rmSync(decoy, { recursive: true, force: true }));
  const inDecoy = (...args) => {
    const res = spawnSync("git", args, { cwd: decoy, env: gitEnv(), encoding: "utf8" });
    assert.equal(res.status, 0, `git ${args.join(" ")}: ${res.stderr}`);
    return res.stdout.trim();
  };
  inDecoy("init", "-q", "-b", "decoy");
  writeFileSync(join(decoy, "d.txt"), "decoy\n");
  inDecoy("add", "d.txt");
  inDecoy("commit", "-q", "-m", "chore: decoy");
  const decoyHead = inDecoy("rev-parse", "HEAD");
  const decoyIndex = join(decoy, "inherited-index");

  const saved = { GIT_DIR: process.env.GIT_DIR, GIT_INDEX_FILE: process.env.GIT_INDEX_FILE };
  t.after(() => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
  process.env.GIT_DIR = join(decoy, ".git");
  process.env.GIT_INDEX_FILE = decoyIndex;

  const repo = makeRepo(t);
  const ref = `refs/heads/${candidateRef(BASE, "b1", repo.candidate)}`;
  const res = runMain([], { cwd: repo.dir, env: { GITHUB_REF: ref } });
  assert.equal(res.err, "");
  assert.equal(res.out, `BASE_SHA=${repo.base}\nTARGET=${BASE}\nSOURCE=trailer\n`);

  delete process.env.GIT_DIR;
  delete process.env.GIT_INDEX_FILE;
  assert.equal(inDecoy("rev-parse", "HEAD"), decoyHead, "no commit landed in the decoy");
  assert.equal(inDecoy("rev-list", "--count", "HEAD"), "1");
  assert.equal(existsSync(decoyIndex), false, "the inherited index was never written");
});

test("CLI resolves a base-check candidate to itself", (t) => {
  const repo = makeRepo(t);
  const ref = baseCheckRef(BASE, repo.candidate);
  const res = runMain(["--ref", ref], { cwd: repo.dir });
  assert.equal(res.code, 0, res.err);
  assert.equal(res.out, `BASE_SHA=${repo.candidate}\nTARGET=\nSOURCE=self\n`);
});

test("CLI refuses a trailer whose base is not an ancestor of the candidate", (t) => {
  const repo = makeRepo(t);
  // A forged merge on an unrelated history: the trailer names a commit outside its ancestry.
  repo.git("checkout", "-q", "--orphan", "stray");
  writeFileSync(join(repo.dir, "c.txt"), "stray\n");
  repo.git("add", "c.txt");
  const forged = join(repo.dir, ".git", "FORGED_MSG");
  writeFileSync(forged, mergeMessage(repo.base).replace(SHA_A, repo.head));
  repo.git("commit", "-q", "-F", forged);
  const stray = repo.git("rev-parse", "HEAD");
  // Same batch id as the forged trailer (b1): only the ancestry check can refuse it.
  const res = runMain(["--ref", candidateRef(BASE, "b1", stray)], { cwd: repo.dir });
  assert.equal(res.code, 1);
  assert.equal(res.out, "");
  assert.match(res.err, /is not an ancestor of/);
});

test("CLI fails on a batch candidate without the trailer and on bad arguments", (t) => {
  const repo = makeRepo(t);
  const res = runMain(["--sha", repo.head, "--ref", candidateRef(BASE, "b2", repo.head)], {
    cwd: repo.dir,
  });
  assert.equal(res.code, 1);
  assert.match(res.err, /no Omni-Queue-Base trailer/);
  assert.equal(res.out, "");
  for (const argv of [["--sha"], ["--bogus", "x"], ["--ref", "--sha"]]) {
    const bad = runMain(argv, { cwd: repo.dir });
    assert.equal(bad.code, 1, argv.join(" "));
    assert.match(bad.err, /usage: candidate-base\.mjs/);
  }
  const missing = runMain(["--sha", "f".repeat(40)], { cwd: repo.dir });
  assert.equal(missing.code, 1);
  assert.match(missing.err, /git rev-parse/);
});
