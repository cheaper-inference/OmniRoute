// omni-queue WP2: candidate composition (scripts/merge-queue/compose.mjs) against real git
// repositories in os.tmpdir() — a bare origin, PRs under refs/pull/<n>/head, a bare scratch repo.
import assert from "node:assert/strict";
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import {
  baseCheckRef,
  candidateRef,
  parseQueueTrailers,
  TRAILERS,
} from "../../../../scripts/merge-queue/contracts.mjs";
import {
  composeCandidate,
  deleteCandidate,
  fetchInputs,
  prepareRepo,
  pushCandidate,
  scratchGit,
} from "../../../../scripts/merge-queue/compose.mjs";
import { createGit } from "../../../../scripts/merge-queue/gitexec.mjs";
import { BOT, createSandbox, prRef } from "./helpers/git-sandbox.mjs";

const BASE = "release/v1.0.0";

/** Sandbox + prepared scratch repository; everything removed after the test. */
function setup(t) {
  const sb = createSandbox({ base: BASE });
  t.after(() => sb.cleanup());
  const scratch = sb.newDir("scratch");
  const git = sb.scratchGit(scratch);
  prepareRepo({ git, remoteUrl: sb.remoteUrl, filter: null });
  return { sb, git, scratch };
}

/** Raw git in the scratch repository (inspection only). */
function sgit(sb, scratch, args) {
  return sb.scratchGit(scratch).out(args, { env: { GIT_DIR: scratch } });
}

function compose(git, prs, batchId = "b1") {
  const { baseSha, heads } = fetchInputs({ git, base: BASE, prs });
  return composeCandidate({ git, base: BASE, baseSha, prs, batchId, heads });
}

function walkFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full));
    else out.push(entry.name);
  }
  return out;
}

test("clean batch of 3: one bot merge commit per PR, trailers, heads reachable, expected tree", (t) => {
  const { sb, git, scratch } = setup(t);
  const baseSha = sb.baseSha();
  const prs = [
    prRef(11, sb.publishPr(11, { "a.txt": "A\n" })),
    prRef(12, sb.publishPr(12, { "b.txt": "B\n" })),
    prRef(13, sb.publishPr(13, { "c/d.txt": "D\n" })),
  ];

  const fetched = fetchInputs({ git, base: BASE, prs });
  assert.equal(fetched.baseSha, baseSha);
  assert.deepEqual(fetched.heads, { 11: prs[0].head, 12: prs[1].head, 13: prs[2].head });

  const res = composeCandidate({
    git,
    base: BASE,
    baseSha: fetched.baseSha,
    prs,
    batchId: "b7",
    heads: fetched.heads,
  });
  assert.deepEqual(
    res.included.map((p) => p.n),
    [11, 12, 13]
  );
  assert.deepEqual(res.excludedBatchConflict, []);
  assert.deepEqual(res.excludedBaseConflict, []);
  assert.deepEqual(res.excludedHeadMoved, []);
  assert.deepEqual(res.alreadyContained, []);
  assert.equal(res.baseSha, baseSha);
  assert.match(res.candidateSha, /^[0-9a-f]{40}$/);
  assert.equal(res.treeSha, sgit(sb, scratch, ["rev-parse", `${res.candidateSha}^{tree}`]));

  // First-parent chain: 3 merge commits on top of the base, second parents = exact PR heads.
  const chain = sgit(sb, scratch, [
    "log",
    "--first-parent",
    "--reverse",
    "--format=%H %P|%an|%ae|%cn|%ce",
    `${baseSha}..${res.candidateSha}`,
  ]).split("\n");
  assert.equal(chain.length, 3);
  let expectedFirstParent = baseSha;
  chain.forEach((line, i) => {
    const [ids, an, ae, cn, ce] = line.split("|");
    const [sha, p1, p2, extra] = ids.split(" ");
    assert.equal(p1, expectedFirstParent);
    assert.equal(p2, prs[i].head);
    assert.equal(extra, undefined);
    assert.deepEqual([an, ae, cn, ce], [BOT.name, BOT.email, BOT.name, BOT.email]);
    const message = sgit(sb, scratch, ["log", "-1", "--format=%B", sha]);
    assert.equal(message.split("\n")[0], `Merge PR #${prs[i].n}: PR ${prs[i].n} (@dev${prs[i].n})`);
    assert.deepEqual(parseQueueTrailers(message), {
      pr: prs[i].n,
      head: prs[i].head,
      author: `dev${prs[i].n}`,
      base: baseSha,
      target: BASE,
      batch: "b7",
    });
    expectedFirstParent = sha;
  });
  for (const pr of prs) {
    const r = sb
      .scratchGit(scratch)
      .run(["merge-base", "--is-ancestor", pr.head, res.candidateSha], {
        allowFail: true,
        env: { GIT_DIR: scratch },
      });
    assert.equal(r.code, 0, `head of #${pr.n} must be an ancestor of the candidate`);
  }
  const files = sgit(sb, scratch, ["ls-tree", "-r", "--name-only", res.candidateSha]).split("\n");
  assert.deepEqual(files.sort(), ["README.md", "a.txt", "b.txt", "c/d.txt", "shared.txt"]);
  assert.equal(sgit(sb, scratch, ["show", `${res.candidateSha}:a.txt`]), "A");
});

test("conflict inside the batch: the later PR is excludedBatchConflict, the others go in", (t) => {
  const { sb, git } = setup(t);
  const p1 = prRef(1, sb.publishPr(1, { "shared.txt": "line 1\nPR ONE\nline 3\n" }));
  const p2 = prRef(2, sb.publishPr(2, { "shared.txt": "line 1\nPR TWO\nline 3\n" }));
  const p3 = prRef(3, sb.publishPr(3, { "three.txt": "3\n" }));
  const res = compose(git, [p1, p2, p3]);
  assert.deepEqual(
    res.included.map((p) => p.n),
    [1, 3]
  );
  assert.deepEqual(
    res.excludedBatchConflict.map((p) => p.n),
    [2]
  );
  assert.deepEqual(res.excludedBaseConflict, []);
  const shared = git.out(["show", `${res.candidateSha}:shared.txt`], {
    env: { GIT_DIR: git.cwd },
  });
  assert.equal(shared, "line 1\nPR ONE\nline 3");
});

test("conflict with the bare base: excludedBaseConflict (leaves the queue)", (t) => {
  const { sb, git } = setup(t);
  const forkPoint = sb.baseSha();
  const stale = prRef(5, sb.publishPr(5, { "shared.txt": "line 1\nfrom PR\nline 3\n" }));
  sb.advanceBase({ "shared.txt": "line 1\nfrom base\nline 3\n" });
  const ok = prRef(6, sb.publishPr(6, { "six.txt": "6\n" }));
  const res = compose(git, [stale, ok]);
  assert.notEqual(res.baseSha, forkPoint);
  assert.deepEqual(
    res.excludedBaseConflict.map((p) => p.n),
    [5]
  );
  assert.deepEqual(res.excludedBatchConflict, []);
  assert.deepEqual(
    res.included.map((p) => p.n),
    [6]
  );
});

test("a base conflict found after earlier merges is still classified against the bare base", (t) => {
  const { sb, git } = setup(t);
  const first = prRef(1, sb.publishPr(1, { "one.txt": "1\n" }));
  const stale = prRef(2, sb.publishPr(2, { "shared.txt": "line 1\nfrom PR\nline 3\n" }));
  sb.advanceBase({ "shared.txt": "line 1\nfrom base\nline 3\n" });
  const res = compose(git, [first, stale]);
  assert.deepEqual(
    res.included.map((p) => p.n),
    [1]
  );
  assert.deepEqual(
    res.excludedBaseConflict.map((p) => p.n),
    [2]
  );
  assert.deepEqual(res.excludedBatchConflict, []);
});

test("head moved after approval or missing PR ref: excludedHeadMoved", (t) => {
  const { sb, git } = setup(t);
  const approved = sb.publishPr(8, { "eight.txt": "8\n" });
  sb.publishPr(8, { "eight.txt": "8 changed\n" }, { from: approved });
  const moved = prRef(8, approved);
  const missing = prRef(9, "f".repeat(40));
  const fine = prRef(10, sb.publishPr(10, { "ten.txt": "10\n" }));

  // filter: null → explicit --no-filter (tests never use partial clone).
  const { baseSha, heads } = fetchInputs({
    git,
    base: BASE,
    prs: [moved, missing, fine],
    filter: null,
  });
  assert.notEqual(heads[8], approved);
  assert.equal(heads[9], null);
  const res = composeCandidate({
    git,
    base: BASE,
    baseSha,
    prs: [moved, missing, fine],
    batchId: "b2",
    heads,
  });
  assert.deepEqual(
    res.excludedHeadMoved.map((p) => p.n),
    [8, 9]
  );
  assert.deepEqual(
    res.included.map((p) => p.n),
    [10]
  );
});

test("a malicious title with newlines and fake trailers cannot change the trailers", (t) => {
  const { sb, git } = setup(t);
  const head = sb.publishPr(4, { "four.txt": "4\n" });
  const fake = "e".repeat(40);
  const evil = prRef(4, head, {
    title: `Fix\n\n${TRAILERS.pr}: 999\n${TRAILERS.head}: ${fake}\r\n${TRAILERS.batch}: evil`,
    author: "mallory\nOmni-Queue-PR: 777",
  });
  const res = compose(git, [evil], "b3");
  const message = git.out(["log", "-1", "--format=%B", res.candidateSha], {
    env: { GIT_DIR: git.cwd },
  });
  const subject = message.split("\n")[0];
  assert.ok(subject.startsWith("Merge PR #4: Fix Omni-Queue-PR: 999"), subject);
  assert.deepEqual(parseQueueTrailers(message), {
    pr: 4,
    head,
    author: "malloryOmni-Queue-PR777",
    base: res.baseSha,
    target: BASE,
    batch: "b3",
  });
  assert.equal(message.includes(fake), true, "fake value is confined to the subject line");
  assert.equal(message.split("\n").filter((l) => l.startsWith(`${TRAILERS.pr}:`)).length, 1);
});

test("scratch repository stays bare and never materializes PR files on disk", (t) => {
  const { sb, git, scratch } = setup(t);
  const prs = [
    prRef(1, sb.publishPr(1, { "pr-only-file.txt": "x\n" })),
    prRef(2, sb.publishPr(2, { "nested/another-pr-file.md": "y\n" })),
  ];
  const res = compose(git, prs);
  assert.equal(res.included.length, 2);
  assert.equal(
    git.out(["rev-parse", "--is-bare-repository"], { env: { GIT_DIR: scratch } }),
    "true"
  );
  assert.equal(existsSync(join(scratch, "index")), false, "no index: nothing was checked out");
  const names = walkFiles(scratch);
  assert.equal(names.includes("pr-only-file.txt"), false);
  assert.equal(names.includes("another-pr-file.md"), false);
  assert.equal(names.includes("README.md"), false);
});

test("stacked PR whose head is already in the candidate is included without its own commit", (t) => {
  const { sb, git } = setup(t);
  const lower = sb.publishPr(20, { "lower.txt": "L\n" });
  const upper = sb.publishPr(21, { "upper.txt": "U\n" }, { from: lower });
  // #21 (stacked on #20) goes first; #20's head is then already contained.
  const prs = [prRef(21, upper), prRef(20, lower)];
  const res = compose(git, prs);
  assert.deepEqual(
    res.included.map((p) => p.n),
    [21, 20]
  );
  assert.deepEqual(
    res.alreadyContained.map((p) => p.n),
    [20]
  );
  const merges = git
    .out(["log", "--first-parent", "--format=%H", `${res.baseSha}..${res.candidateSha}`], {
      env: { GIT_DIR: git.cwd },
    })
    .split("\n");
  assert.equal(merges.length, 1, "only #21 produced a merge commit");
  const message = git.out(["log", "-1", "--format=%B", res.candidateSha], {
    env: { GIT_DIR: git.cwd },
  });
  assert.equal(parseQueueTrailers(message).pr, 21);
});

test("unrelated history is a base conflict; an all-excluded batch yields no candidate", (t) => {
  const { sb, git } = setup(t);
  const orphan = prRef(30, sb.publishUnrelatedPr(30, { "alien.txt": "?\n" }));
  const res = compose(git, [orphan]);
  assert.deepEqual(
    res.excludedBaseConflict.map((p) => p.n),
    [30]
  );
  assert.deepEqual(res.included, []);
  assert.equal(res.candidateSha, null);
  assert.equal(res.treeSha, null);
});

test("prepareRepo is idempotent, updates the URL, sets the promisor filter only on request", (t) => {
  const sb = createSandbox({ base: BASE });
  t.after(() => sb.cleanup());
  const dir = sb.newDir("scratch-prep");
  const git = sb.scratchGit(dir);
  const cfg = (key) =>
    git.run(["config", "--get", key], { allowFail: true, env: { GIT_DIR: dir } }).stdout.trim();

  assert.deepEqual(prepareRepo({ git, remoteUrl: "/nowhere/first.git", filter: null }), {
    created: true,
  });
  assert.equal(cfg("remote.origin.url"), "/nowhere/first.git");
  assert.equal(cfg("remote.origin.promisor"), "");
  assert.equal(cfg("gc.auto"), "0");
  assert.deepEqual(prepareRepo({ git, remoteUrl: "/nowhere/second.git", filter: null }), {
    created: false,
  });
  assert.equal(cfg("remote.origin.url"), "/nowhere/second.git");

  // Production default registers origin as a promisor with blob:none (config only, no fetch).
  const prodDir = sb.newDir("scratch-prod");
  const prod = sb.scratchGit(prodDir);
  prepareRepo({ git: prod, remoteUrl: "https://github.com/example/repo.git" });
  const prodCfg = (key) =>
    prod
      .run(["config", "--get", key], { allowFail: true, env: { GIT_DIR: prodDir } })
      .stdout.trim();
  assert.equal(prodCfg("remote.origin.promisor"), "true");
  assert.equal(prodCfg("remote.origin.partialclonefilter"), "blob:none");

  // A non-empty directory that is not a bare repository is never initialized over.
  const dirty = sb.newDir("not-a-repo");
  writeFileSync(join(dirty, "keep.txt"), "user data\n");
  for (const dir of [dirty, sb.workDir]) {
    assert.throws(
      () => prepareRepo({ git: sb.scratchGit(dir), remoteUrl: sb.remoteUrl, filter: null }),
      /not empty and is not a bare git repository/,
      dir
    );
  }
  assert.deepEqual(readdirSync(dirty), ["keep.txt"]);
  assert.throws(() => prepareRepo({ git, remoteUrl: "--upload-pack=evil", filter: null }));
});

test("fetchInputs refuses unsafe base names and bad PR numbers", (t) => {
  const { git } = setup(t);
  for (const base of ["release/v1:refs/heads/x", "-oops", "a..b", "refs/heads/x", "x y", ""]) {
    assert.throws(() => fetchInputs({ git, base, prs: [] }), /unsafe base/, base);
  }
  assert.throws(() => fetchInputs({ git, base: BASE, prs: [{ n: "1; rm" }] }), /positive integer/);
  assert.throws(() => fetchInputs({ git, base: "release/v9.9.9", prs: [] }));
});

test("pushCandidate creates candidate refs only, never forces; deleteCandidate is idempotent", (t) => {
  const { sb, git } = setup(t);
  const res = compose(git, [prRef(1, sb.publishPr(1, { "one.txt": "1\n" }))]);
  const ref = candidateRef(BASE, "b1", res.candidateSha);

  for (const bad of [
    BASE,
    "main",
    "feature/x",
    `refs/heads/${ref}`,
    "omni-queue-state",
    "omni-queue/release-v1.0.0/b1/extra",
    "omni-queue/../release/v1.0.0",
    "omni-queue/release-v1.0.0",
  ]) {
    assert.throws(
      () => pushCandidate({ git, sha: res.candidateSha, ref: bad }),
      /non-candidate ref/,
      bad
    );
    assert.throws(() => deleteCandidate({ git, ref: bad }), /non-candidate ref/, bad);
  }
  assert.equal(sb.baseSha(), res.baseSha, "refused pushes never touched the base");

  assert.deepEqual(pushCandidate({ git, sha: res.candidateSha, ref }), { created: true });
  assert.equal(sb.branchSha(ref), res.candidateSha);
  assert.deepEqual(pushCandidate({ git, sha: res.candidateSha, ref }), { created: false });
  // Same name, other SHA: refused before any push (the name encodes the SHA), ref unchanged.
  assert.throws(() => pushCandidate({ git, sha: res.baseSha, ref }), /does not name sha/);
  assert.equal(sb.branchSha(ref), res.candidateSha);

  assert.deepEqual(deleteCandidate({ git, ref }), { deleted: true });
  assert.equal(sb.branchSha(ref), null);
  assert.deepEqual(deleteCandidate({ git, ref }), { deleted: false });
  assert.equal(sb.baseSha(), res.baseSha);
});

test("pushCandidate refuses a ref whose name encodes another SHA (batch and base-check)", (t) => {
  const { sb, git } = setup(t);
  const res = compose(git, [prRef(1, sb.publishPr(1, { "one.txt": "1\n" }))]);
  const other = res.baseSha;

  const wrongBatch = candidateRef(BASE, "b1", other);
  assert.throws(
    () => pushCandidate({ git, sha: res.candidateSha, ref: wrongBatch }),
    /does not name sha/
  );
  assert.equal(sb.branchSha(wrongBatch), null, "nothing was pushed");

  const wrongCheck = baseCheckRef(BASE, res.candidateSha);
  assert.throws(() => pushCandidate({ git, sha: other, ref: wrongCheck }), /does not name sha/);
  assert.equal(sb.branchSha(wrongCheck), null);

  // A batch id must precede the SHA suffix: "omni-queue/<base>/<sha12>" alone is not enough.
  const bare12 = `omni-queue/release-v1.0.0/${res.candidateSha.slice(0, 12)}`;
  assert.throws(
    () => pushCandidate({ git, sha: res.candidateSha, ref: bare12 }),
    /does not name sha/
  );

  // The matching names are accepted.
  const check = baseCheckRef(BASE, other);
  assert.deepEqual(pushCandidate({ git, sha: other, ref: check }), { created: true });
  assert.equal(sb.branchSha(check), other);
  const retry = baseCheckRef(BASE, other, 1); // infra retry of the base check
  assert.deepEqual(pushCandidate({ git, sha: other, ref: retry }), { created: true });
  assert.equal(sb.branchSha(retry), other);
  assert.throws(
    () => pushCandidate({ git, sha: res.candidateSha, ref: baseCheckRef(BASE, other, 2) }),
    /does not name sha/
  );
  const ok = candidateRef(BASE, "b1-r1", res.candidateSha);
  assert.deepEqual(pushCandidate({ git, sha: res.candidateSha, ref: ok }), { created: true });
  assert.equal(sb.branchSha(ok), res.candidateSha);
});

test("a PR whose head is already in the base is alreadyInBase, never a no-op candidate", (t) => {
  const { sb, git } = setup(t);
  const seed = sb.baseSha();
  const tip = sb.advanceBase({ "landed.txt": "L\n" });
  // #40 points at the base tip, #41 at an older commit of the base (both already merged).
  sb.work(["push", "--quiet", "origin", `${tip}:refs/pull/40/head`]);
  sb.work(["push", "--quiet", "origin", `${seed}:refs/pull/41/head`]);
  const inTip = prRef(40, tip);
  const inHistory = prRef(41, seed);

  const res = compose(git, [inTip, inHistory]);
  assert.equal(res.baseSha, tip);
  assert.deepEqual(
    res.alreadyInBase.map((p) => p.n),
    [40, 41]
  );
  assert.deepEqual(res.included, []);
  assert.deepEqual(res.alreadyContained, []);
  assert.equal(res.candidateSha, null, "no candidate equal to the bare base");
  assert.equal(res.treeSha, null);

  // Mixed batch: the in-base PR stays out, the real one gets the only merge commit.
  const real = prRef(42, sb.publishPr(42, { "forty-two.txt": "42\n" }));
  const mixed = compose(git, [inTip, real]);
  assert.deepEqual(
    mixed.alreadyInBase.map((p) => p.n),
    [40]
  );
  assert.deepEqual(
    mixed.included.map((p) => p.n),
    [42]
  );
  assert.notEqual(mixed.candidateSha, mixed.baseSha);
  const merges = git
    .out(["log", "--first-parent", "--format=%H", `${mixed.baseSha}..${mixed.candidateSha}`], {
      env: { GIT_DIR: git.cwd },
    })
    .split("\n");
  assert.equal(merges.length, 1);
});

test("inherited GIT_* location variables cannot redirect the scratch repository", (t) => {
  const sb = createSandbox({ base: BASE });
  t.after(() => sb.cleanup());
  const decoyObjects = sb.newDir("decoy-objects");
  const decoyWork = sb.newDir("decoy-work");
  const decoyIndex = join(sb.root, "decoy-index");
  const head = sb.publishPr(1, { "one.txt": "1\n" });

  const saved = {};
  const decoys = {
    GIT_OBJECT_DIRECTORY: decoyObjects,
    GIT_ALTERNATE_OBJECT_DIRECTORIES: decoyObjects,
    GIT_INDEX_FILE: decoyIndex,
    GIT_WORK_TREE: decoyWork,
  };
  for (const [k, v] of Object.entries(decoys)) {
    saved[k] = process.env[k];
    process.env[k] = v;
  }
  try {
    const dir = sb.newDir("scratch-env");
    // A raw createGit (not the sandbox helper) inherits the decoys from process.env.
    const raw = createGit({ cwd: dir, identity: BOT, env: sb.isolationEnv });
    prepareRepo({ git: raw, remoteUrl: sb.remoteUrl, filter: null });
    assert.equal(scratchGit(raw).out(["rev-parse", "--git-path", "objects"]), join(dir, "objects"));
    assert.equal(scratchGit(raw).out(["rev-parse", "--git-path", "index"]), join(dir, "index"));
    // The sandbox helper clears them as well for the tests' own inspection calls.
    assert.equal(
      sb.scratchGit(dir).out(["rev-parse", "--git-path", "objects"], { env: { GIT_DIR: dir } }),
      join(dir, "objects")
    );

    const res = compose(raw, [prRef(1, head)]);
    assert.deepEqual(
      res.included.map((p) => p.n),
      [1]
    );
    pushCandidate({
      git: raw,
      sha: res.candidateSha,
      ref: candidateRef(BASE, "b1", res.candidateSha),
    });
    assert.deepEqual(readdirSync(decoyObjects), [], "no object written to the decoy store");
    assert.deepEqual(readdirSync(decoyWork), [], "no file written to the decoy work tree");
    assert.equal(existsSync(decoyIndex), false, "no decoy index written");
  } finally {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
});
