// omni-queue history map (scripts/merge-queue/history-map.mjs) with a fake git runner.
import assert from "node:assert/strict";
import test from "node:test";
import { buildMergeMessage } from "../../../scripts/merge-queue/contracts.mjs";
import {
  parseMergeLog,
  queueMergeInfo,
  queuePrByCommit,
  titleFromMergeSubject,
} from "../../../scripts/merge-queue/history-map.mjs";

const sha = (c) => c.repeat(40);
const BASE0 = sha("0");
const M1 = sha("1");
const M2 = sha("2");
const HEAD_A = sha("a");
const HEAD_B = sha("b");

const msg = (n, head, title = `feat(x): pr ${n}`, author = "alice") =>
  buildMergeMessage({
    pr: { n, head, title, author, labeledAt: "2026-11-13T00:00:00Z" },
    base: "release/v3.8.55",
    baseSha: BASE0,
    batchId: "b7",
  });

/** Build a fake runGit from a `git log` output and a rev-list table; records every call. */
function fakeGit(logRecords, revLists) {
  const calls = [];
  const runGit = (args) => {
    calls.push(args);
    if (args[0] === "log") {
      return logRecords
        .map((r) => `${r.sha}\x1f${r.parents.join(" ")}\x1f${r.body}\x1e`)
        .join("\n")
        .trim();
    }
    if (args[0] === "rev-list") {
      if (!(args[1] in revLists)) throw new Error(`unexpected rev-list ${args[1]}`);
      return revLists[args[1]].join("\n");
    }
    throw new Error(`unexpected git ${args.join(" ")}`);
  };
  return { runGit, calls };
}

test("titleFromMergeSubject reads the PR title back and rejects other shapes", () => {
  assert.equal(
    titleFromMergeSubject("Merge PR #34: feat(b): queue feature (@alice)", 34),
    "feat(b): queue feature"
  );
  assert.equal(titleFromMergeSubject("Merge PR #34: x (#9) (@dependabot[bot])", 34), "x (#9)");
  assert.equal(titleFromMergeSubject("Merge PR #34: feat (@alice)", 35), null, "other PR");
  assert.equal(titleFromMergeSubject("Merge branch 'main' into feat", 34), null);
  assert.equal(titleFromMergeSubject("Merge PR #34: feat", 34), null, "no author suffix");
  assert.equal(titleFromMergeSubject(undefined, 34), null);
});

test("parseMergeLog splits records, parents and multi-paragraph bodies", () => {
  const raw = [
    `${M1}\x1f${BASE0} ${HEAD_A}\x1fMerge PR #1: t (@a)\n\nOmni-Queue-PR: 1\n\x1e`,
    `\n${M2}\x1f${M1} ${HEAD_B}\x1fbody two\x1e`,
  ].join("");
  const recs = parseMergeLog(raw);
  assert.equal(recs.length, 2);
  assert.deepEqual(recs[0].parents, [BASE0, HEAD_A]);
  assert.equal(recs[0].sha, M1);
  assert.match(recs[0].body, /Omni-Queue-PR: 1/);
  assert.equal(recs[1].sha, M2);
  assert.equal(recs[1].body, "body two");
  assert.deepEqual(parseMergeLog(""), []);
});

test("queueMergeInfo accepts a genuine queue merge and rejects forgeries", () => {
  const good = { sha: M1, parents: [BASE0, HEAD_A], body: msg(12, HEAD_A) };
  assert.deepEqual(queueMergeInfo(good), {
    pr: 12,
    author: "alice",
    head: HEAD_A,
    batch: "b7",
    mergeSha: M1,
    title: "feat(x): pr 12",
  });
  // trailer head must be the merged (second) parent
  assert.equal(queueMergeInfo({ ...good, parents: [BASE0, HEAD_B] }), null);
  // octopus / single-parent commits are never queue merges
  assert.equal(queueMergeInfo({ ...good, parents: [BASE0, HEAD_A, HEAD_B] }), null);
  assert.equal(queueMergeInfo({ ...good, parents: [HEAD_A] }), null);
  // no trailers at all (a plain `git merge`)
  assert.equal(
    queueMergeInfo({ sha: M1, parents: [BASE0, HEAD_A], body: "Merge branch 'x'\n" }),
    null
  );
  // trailers that are not in the LAST paragraph are prose, not trailers
  const prose = `Merge PR #12: t (@alice)\n\nOmni-Queue-PR: 12\nOmni-Queue-Head: ${HEAD_A}\n\nmore text`;
  assert.equal(queueMergeInfo({ sha: M1, parents: [BASE0, HEAD_A], body: prose }), null);
  // a subject that does not follow buildMergeMessage still maps, with a null title
  const odd = msg(12, HEAD_A).replace(/^Merge PR #12: [^\n]*/, "Merge custom");
  assert.equal(queueMergeInfo({ ...good, body: odd }).title, null);
  assert.equal(queueMergeInfo({ ...good, sha: "nope" }), null);
});

test("queuePrByCommit maps each M^1..M^2 commit to its PR and skips non-queue merges", () => {
  const c1 = sha("c");
  const c2 = sha("d");
  const c3 = sha("e");
  const { runGit, calls } = fakeGit(
    [
      // newest first, as git log prints them
      { sha: M2, parents: [M1, HEAD_B], body: msg(56, HEAD_B, "fix(y): second", "bob") },
      { sha: sha("9"), parents: [M1, sha("8")], body: "Merge branch 'side'\n" },
      { sha: M1, parents: [BASE0, HEAD_A], body: msg(34, HEAD_A) },
    ],
    {
      [`${M1}..${HEAD_B}`]: [c3],
      [`${BASE0}..${HEAD_A}`]: [c1, c2, ""],
    }
  );
  const map = queuePrByCommit({ runGit, range: `${BASE0}..${M2}` });
  assert.deepEqual([...map.keys()].sort(), [c1, c2, c3].sort());
  assert.equal(map.get(c1).pr, 34);
  assert.equal(map.get(c2).mergeSha, M1);
  assert.equal(map.get(c3).pr, 56);
  assert.equal(map.get(c3).author, "bob");
  assert.equal(map.get(c3).title, "fix(y): second");
  assert.equal(map.has(M1), false, "the merge commit itself is not a contributor commit");
  // one log walk (first-parent merges only) + one rev-list per genuine queue merge
  assert.deepEqual(calls[0], [
    "log",
    "--first-parent",
    "--merges",
    "--format=%H%x1f%P%x1f%B%x1e",
    `${BASE0}..${M2}`,
  ]);
  assert.equal(calls.filter((c) => c[0] === "rev-list").length, 2);
});

test("queuePrByCommit: a squash-only history yields an empty map", () => {
  const { runGit, calls } = fakeGit([], {});
  const map = queuePrByCommit({ runGit, range: "v1..HEAD" });
  assert.equal(map.size, 0);
  assert.equal(calls.length, 1, "no rev-list when there is no queue merge");
});

test("queuePrByCommit: first claim wins when two merges list the same commit", () => {
  const shared = sha("f");
  const { runGit } = fakeGit(
    [
      { sha: M2, parents: [M1, HEAD_B], body: msg(2, HEAD_B) },
      { sha: M1, parents: [BASE0, HEAD_A], body: msg(1, HEAD_A) },
    ],
    { [`${M1}..${HEAD_B}`]: [shared], [`${BASE0}..${HEAD_A}`]: [shared] }
  );
  assert.equal(queuePrByCommit({ runGit, range: "x..y" }).get(shared).pr, 2);
});

test("queuePrByCommit rejects option-like or multi-word ranges before running git", () => {
  const runGit = () => {
    throw new Error("git must not run");
  };
  for (const range of ["--all", "-p", "a..b c", "", "  "]) {
    assert.throws(() => queuePrByCommit({ runGit, range }), /invalid range/, range);
  }
});
