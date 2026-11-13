// omni-queue WP2: landing (scripts/merge-queue/land.mjs). merge-ff runs against real git
// repositories in os.tmpdir(); squash-api runs against an in-memory fake GitHub client.
import assert from "node:assert/strict";
import test from "node:test";

import { candidateRef } from "../../../../scripts/merge-queue/contracts.mjs";
import {
  composeCandidate,
  fetchInputs,
  prepareRepo,
  pushCandidate,
} from "../../../../scripts/merge-queue/compose.mjs";
import { landMergeFf, landSquashApi } from "../../../../scripts/merge-queue/land.mjs";
import { createSandbox, prRef } from "./helpers/git-sandbox.mjs";

const BASE = "release/v1.0.0";

function setup(t, gitOptions = {}) {
  const sb = createSandbox({ base: BASE });
  t.after(() => sb.cleanup());
  const scratch = sb.newDir("scratch");
  const git = sb.scratchGit(scratch, gitOptions);
  prepareRepo({ git, remoteUrl: sb.remoteUrl, filter: null });
  return { sb, git, scratch };
}

/** Compose a green batch of `count` independent PRs and push its candidate ref. */
function composeBatch(sb, git, numbers) {
  const prs = numbers.map((n) => prRef(n, sb.publishPr(n, { [`pr-${n}.txt`]: `${n}\n` })));
  const { baseSha, heads } = fetchInputs({ git, base: BASE, prs });
  const res = composeCandidate({ git, base: BASE, baseSha, prs, batchId: "b1", heads });
  assert.equal(res.included.length, numbers.length);
  const ref = candidateRef(BASE, "b1", res.candidateSha);
  pushCandidate({ git, sha: res.candidateSha, ref });
  return { prs, res, ref };
}

const originOut = (sb, args) => sb.origin(args).stdout;
const isAncestorInOrigin = (sb, a, b) =>
  sb.origin(["merge-base", "--is-ancestor", a, b], { allowFail: true }).code === 0;

test("merge-ff lands the exact candidate: base == candidate, heads reachable, same tree", (t) => {
  const { sb, git } = setup(t);
  const { prs, res } = composeBatch(sb, git, [1, 2, 3]);

  const out = landMergeFf({
    git,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: res.baseSha,
  });
  assert.deepEqual(out, { ok: true, newBaseSha: res.candidateSha, merged: [1, 2, 3] });
  assert.equal(sb.baseSha(), res.candidateSha);
  for (const pr of prs) {
    assert.equal(isAncestorInOrigin(sb, pr.head, sb.baseSha()), true, `#${pr.n} reachable`);
  }
  assert.equal(
    originOut(sb, ["rev-parse", `refs/heads/${BASE}^{tree}`]),
    originOut(sb, ["rev-parse", `${res.candidateSha}^{tree}`])
  );
  assert.equal(originOut(sb, ["rev-parse", `${res.candidateSha}^{tree}`]), res.treeSha);
});

test("merge-ff from a fresh scratch repository fetches the candidate by SHA", (t) => {
  const { sb, git } = setup(t);
  const { res } = composeBatch(sb, git, [4, 5]);
  const freshDir = sb.newDir("fresh-runner");
  const fresh = sb.scratchGit(freshDir);
  prepareRepo({ git: fresh, remoteUrl: sb.remoteUrl, filter: null });

  const out = landMergeFf({
    git: fresh,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: res.baseSha,
  });
  assert.equal(out.ok, true);
  assert.deepEqual(out.merged, [4, 5]);
  assert.equal(sb.baseSha(), res.candidateSha);
});

/**
 * Git runner that runs `beforePush()` right before the first `git push` (simulates the base moving
 * between the pre-push read of the base and the push itself) and records every push.
 */
function racingGit(git, beforePush) {
  let fired = false;
  const pushes = [];
  const hook = (args) => {
    if (args[0] !== "push") return;
    pushes.push(args);
    if (!fired) {
      fired = true;
      beforePush();
    }
  };
  return {
    cwd: git.cwd,
    pushes,
    run: (args, opts) => (hook(args), git.run(args, opts)),
    out: (args, opts) => (hook(args), git.out(args, opts)),
  };
}

test("base moved during CI: refused before pushing → base-moved, base untouched", (t) => {
  const { sb, git } = setup(t);
  const { res } = composeBatch(sb, git, [6, 7]);
  const manual = sb.advanceBase({ "manual.txt": "merged by hand\n" });

  const spy = racingGit(git, () => {});
  const out = landMergeFf({
    git: spy,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: res.baseSha,
  });
  assert.equal(out.ok, false);
  assert.equal(out.reason, "base-moved");
  assert.deepEqual(out.merged, []);
  assert.equal(out.newBaseSha, manual);
  assert.deepEqual(spy.pushes, [], "nothing pushed");
  assert.equal(sb.baseSha(), manual, "the manual merge survives");

  // Same verdict once the scratch store knows the moved tip.
  fetchInputs({ git, base: BASE, prs: [] });
  const again = landMergeFf({
    git: spy,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: res.baseSha,
  });
  assert.equal(again.reason, "base-moved");
  assert.equal(again.newBaseSha, manual);
  assert.deepEqual(spy.pushes, []);
  assert.equal(sb.baseSha(), manual);
});

test("base moves between the read and the push: the server refusal is the CAS", (t) => {
  for (const [label, knownLocally, summary] of [
    ["unknown tip", false, /fetch first/],
    ["known tip", true, /non-fast-forward/],
  ]) {
    const { sb, git } = setup(t);
    const { res } = composeBatch(sb, git, [6, 7]);
    let manual = null;
    const racing = racingGit(git, () => {
      manual = sb.advanceBase({ "manual.txt": `race ${label}\n` });
      if (knownLocally) fetchInputs({ git, base: BASE, prs: [] });
    });
    const out = landMergeFf({
      git: racing,
      base: BASE,
      candidateSha: res.candidateSha,
      expectedBaseSha: res.baseSha,
    });
    assert.equal(racing.pushes.length, 1, label);
    assert.equal(out.ok, false, label);
    assert.equal(out.reason, "base-moved", label);
    assert.match(out.detail, summary, label);
    assert.equal(out.newBaseSha, manual, label);
    assert.equal(sb.baseSha(), manual, `${label}: the racing commit survives`);
  }
});

test("base rewound by an admin (force-push to an older commit) → base-moved, nothing restored", (t) => {
  const { sb, git } = setup(t);
  const older = sb.baseSha();
  const bad = sb.advanceBase({ "bad.txt": "removed later\n" });
  const { res } = composeBatch(sb, git, [11, 12]);
  assert.equal(res.baseSha, bad);
  sb.work(["push", "--quiet", "--force", "origin", `${older}:refs/heads/${BASE}`]);

  const out = landMergeFf({
    git,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: res.baseSha,
  });
  assert.equal(out.ok, false);
  assert.equal(out.reason, "base-moved");
  assert.deepEqual(out.merged, []);
  assert.equal(out.newBaseSha, older);
  assert.equal(sb.baseSha(), older, "the rewound base is kept");
  const files = originOut(sb, ["ls-tree", "--name-only", `refs/heads/${BASE}`]).split("\n");
  assert.equal(files.includes("bad.txt"), false, "the removed commit is not brought back");
});

test("re-landing an already landed candidate is idempotent (crash before the state save)", (t) => {
  const { sb, git } = setup(t);
  const { res } = composeBatch(sb, git, [13, 14]);
  const input = { git, base: BASE, candidateSha: res.candidateSha, expectedBaseSha: res.baseSha };
  const first = landMergeFf(input);
  assert.deepEqual(first, { ok: true, newBaseSha: res.candidateSha, merged: [13, 14] });

  const spy = racingGit(git, () => {});
  const second = landMergeFf({ ...input, git: spy });
  assert.equal(second.ok, true);
  assert.equal(second.newBaseSha, res.candidateSha);
  assert.deepEqual(second.merged, [13, 14]);
  assert.deepEqual(spy.pushes, [], "no second push");
  assert.equal(sb.baseSha(), res.candidateSha, "base unchanged");
});

test("base fast-forwarded to a commit inside the candidate still lands the tested tree", (t) => {
  const { sb, git } = setup(t);
  const { prs, res } = composeBatch(sb, git, [15, 16]);
  // Someone fast-forwards the base to #15's head (a descendant of the expected base and an
  // ancestor of the candidate).
  sb.work(["push", "--quiet", "origin", `${prs[0].head}:refs/heads/${BASE}`]);
  const out = landMergeFf({
    git,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: res.baseSha,
  });
  assert.deepEqual(out, { ok: true, newBaseSha: res.candidateSha, merged: [15, 16] });
  assert.equal(sb.baseSha(), res.candidateSha);
});

test("merged reports stacked PRs (alreadyContained) only when given the batch's PRs", (t) => {
  const { sb, git } = setup(t);
  const lower = sb.publishPr(20, { "lower.txt": "L\n" });
  const upper = sb.publishPr(21, { "upper.txt": "U\n" }, { from: lower });
  const other = sb.publishPr(22, { "other.txt": "O\n" });
  // In-base PR (its head is the base tip): never reported as landed by this candidate.
  const inBase = prRef(23, sb.baseSha());
  const prs = [prRef(21, upper), prRef(20, lower), prRef(22, other)];
  const { baseSha, heads } = fetchInputs({ git, base: BASE, prs });
  const res = composeCandidate({ git, base: BASE, baseSha, prs, batchId: "b1", heads });
  assert.deepEqual(
    res.alreadyContained.map((p) => p.n),
    [20]
  );
  pushCandidate({ git, sha: res.candidateSha, ref: candidateRef(BASE, "b1", res.candidateSha) });

  // Unknown head (never fetched) is skipped without error.
  const unknown = prRef(24, "f".repeat(40));
  const out = landMergeFf({
    git,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: res.baseSha,
    prs: [...prs, inBase, unknown],
  });
  assert.equal(out.ok, true);
  assert.deepEqual(out.merged, [21, 22, 20]);

  // Without `prs`, only the PRs with a queue merge commit are reported.
  const replay = landMergeFf({
    git,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: res.baseSha,
  });
  assert.deepEqual(replay.merged, [21, 22]);
});

test("not-descendant: expected base is not an ancestor of the candidate → nothing pushed", (t) => {
  const { sb, git } = setup(t);
  const { res } = composeBatch(sb, git, [8]);
  // Another commit on the base that the candidate does not contain, used as the expected base.
  const other = sb.advanceBase({ "other.txt": "o\n" });
  const out = landMergeFf({
    git,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: other,
  });
  assert.equal(out.ok, false);
  assert.equal(out.reason, "not-descendant");
  assert.equal(sb.baseSha(), other);
});

test("a protected-branch refusal is 'rejected' with a redacted detail", (t) => {
  const token = "ghs_fakeSecretToken123";
  const { sb, git } = setup(t, { token });
  const { res } = composeBatch(sb, git, [9]);
  sb.installOriginHook(
    "pre-receive",
    `#!/bin/sh\necho "protected branch hook declined (token ${token})" >&2\nexit 1\n`
  );
  const before = sb.baseSha();
  const out = landMergeFf({
    git,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: res.baseSha,
  });
  assert.equal(out.ok, false);
  assert.equal(out.reason, "rejected");
  assert.match(out.detail, /declined/);
  assert.equal(out.detail.includes(token), false, "token must be redacted");
  assert.equal(sb.baseSha(), before);
});

test("a missing base branch is rejected instead of being created", (t) => {
  const { sb, git } = setup(t);
  const { res } = composeBatch(sb, git, [10]);
  sb.origin(["update-ref", "-d", `refs/heads/${BASE}`]);
  const out = landMergeFf({
    git,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: res.baseSha,
  });
  assert.equal(out.ok, false);
  assert.equal(out.reason, "rejected");
  assert.equal(sb.baseSha(), null);
});

test("landMergeFf refuses candidate/state refs and invalid SHAs as the base", (t) => {
  const { git } = setup(t);
  const sha = "a".repeat(40);
  for (const base of ["omni-queue/release-v1.0.0/b1-aaaaaaaaaaaa", "omni-queue-state", "x:y"]) {
    assert.throws(
      () => landMergeFf({ git, base, candidateSha: sha, expectedBaseSha: sha }),
      /unsafe base/
    );
  }
  assert.throws(
    () => landMergeFf({ git, base: BASE, candidateSha: "nope", expectedBaseSha: sha }),
    /invalid candidateSha/
  );
});

// ───────────────────────── squash-api with a fake GitHub ─────────────────────────

const sha = (c) => c.repeat(40);
const TREE_OK = sha("7");

/**
 * In-memory GitHub: base tip + commits. Each successful squash creates a new tip whose tree
 * comes from `treeAfter[n]`; `fail` maps PR number → {status, message} or "throw".
 */
function fakeGh({ tip = sha("1"), treeAfter = {}, fail = {} } = {}) {
  const state = { tip, commits: new Map([[tip, { treeSha: sha("0") }]]), calls: [] };
  let seq = 0;
  return {
    state,
    async getBranchSha(branch) {
      assert.equal(branch, BASE);
      return state.tip;
    },
    async getCommit(id) {
      const c = state.commits.get(id);
      if (!c) throw new Error(`unknown commit ${id}`);
      return { sha: id, treeSha: c.treeSha, parents: [], message: "" };
    },
    async mergePull(n, opts) {
      state.calls.push({ n, ...opts });
      if (fail[n] === "throw") throw new Error("network down");
      if (fail[n]) return { merged: false, sha: null, ...fail[n] };
      seq += 1;
      const id = String(seq).padStart(40, "c");
      state.commits.set(id, { treeSha: treeAfter[n] ?? sha("9") });
      state.tip = id;
      return { merged: true, sha: id, status: 200, message: "Pull Request successfully merged" };
    },
  };
}

const PRS = [prRef(1, sha("a")), prRef(2, sha("b")), prRef(3, sha("d"))];

test("squash-api: every PR squashed at its approved head, final tree == candidate tree", async () => {
  const gh = fakeGh({ treeAfter: { 3: TREE_OK } });
  const out = await landSquashApi({
    gh,
    base: BASE,
    prs: PRS,
    expectedBaseSha: sha("1"),
    candidateTreeSha: TREE_OK,
  });
  assert.deepEqual(out, { ok: true, merged: [1, 2, 3], newBaseSha: gh.state.tip });
  assert.deepEqual(
    gh.state.calls,
    PRS.map((p) => ({ n: p.n, method: "squash", sha: p.head }))
  );
});

test("squash-api: a failure mid-sequence stops and reports the partial merge", async () => {
  const gh = fakeGh({ fail: { 2: { status: 409, message: "Head branch was modified" } } });
  const out = await landSquashApi({
    gh,
    base: BASE,
    prs: PRS,
    expectedBaseSha: sha("1"),
    candidateTreeSha: TREE_OK,
  });
  assert.equal(out.ok, false);
  assert.equal(out.reason, "merge-failed");
  assert.deepEqual(out.merged, [1]);
  assert.match(out.detail, /#2: 409 Head branch was modified/);
  assert.deepEqual(
    gh.state.calls.map((c) => c.n),
    [1, 2],
    "#3 is never attempted"
  );

  const thrown = fakeGh({ fail: { 1: "throw" } });
  const out2 = await landSquashApi({
    gh: thrown,
    base: BASE,
    prs: PRS,
    expectedBaseSha: sha("1"),
    candidateTreeSha: TREE_OK,
  });
  assert.equal(out2.reason, "merge-failed");
  assert.deepEqual(out2.merged, []);
  assert.match(out2.detail, /network down/);
});

test("squash-api: final tree different from the tested candidate → tree-divergence", async () => {
  const gh = fakeGh({ treeAfter: { 3: sha("8") } });
  const out = await landSquashApi({
    gh,
    base: BASE,
    prs: PRS,
    expectedBaseSha: sha("1"),
    candidateTreeSha: TREE_OK,
  });
  assert.equal(out.ok, false);
  assert.equal(out.reason, "tree-divergence");
  assert.deepEqual(out.merged, [1, 2, 3]);
  assert.equal(out.actualTree, sha("8"));
  assert.equal(out.newBaseSha, gh.state.tip);
});

test("squash-api: base moved before starting → base-moved, nothing merged", async () => {
  const gh = fakeGh({ tip: sha("2") });
  const out = await landSquashApi({
    gh,
    base: BASE,
    prs: PRS,
    expectedBaseSha: sha("1"),
    candidateTreeSha: TREE_OK,
  });
  assert.equal(out.ok, false);
  assert.equal(out.reason, "base-moved");
  assert.deepEqual(out.merged, []);
  assert.equal(out.newBaseSha, sha("2"));
  assert.deepEqual(gh.state.calls, [], "mergePull is never called");
});
