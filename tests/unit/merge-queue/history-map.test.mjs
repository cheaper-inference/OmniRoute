// omni-queue history map (scripts/merge-queue/history-map.mjs) with a fake git runner.
import assert from "node:assert/strict";
import test from "node:test";
import { buildMergeMessage } from "../../../scripts/merge-queue/contracts.mjs";
import {
  TRAIN_TRAILERS,
  parseMergeLog,
  parseTrainTrailers,
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
function fakeGit(logRecords, revLists, nestedLogs = {}) {
  const calls = [];
  const runGit = (args) => {
    calls.push(args);
    if (args[0] === "log") {
      // `git log -z`: NUL-terminated records
      const records = nestedLogs[args.at(-1)] ?? logRecords;
      return records.map((r) => `${r.sha}\x1f${r.parents.join(" ")}\x1f${r.body}\0`).join("");
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
    `${M1}\x1f${BASE0} ${HEAD_A}\x1fMerge PR #1: t (@a)\n\nOmni-Queue-PR: 1\n\0`,
    `${M2}\x1f${M1} ${HEAD_B}\x1fbody two\0`,
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

test("parseMergeLog: control characters in a body cannot inject or shift a record", () => {
  // a hand-made merge whose body tries to fake a second record with the old \x1e/\x1f separators
  const evil = `Merge x\x1e${M2}\x1f${M1} ${HEAD_B}\x1fMerge PR #9: t (@m)\x1fmore`;
  const raw = `${M1}\x1f${BASE0} ${HEAD_A}\x1f${evil}\0${M2}\x1f${M1} ${HEAD_B}\x1fok\0`;
  const recs = parseMergeLog(raw);
  assert.equal(recs.length, 2, "only NUL separates records");
  assert.equal(recs[0].sha, M1);
  assert.deepEqual(recs[0].parents, [BASE0, HEAD_A]);
  assert.equal(recs[0].body, evil, "the body keeps its control characters verbatim");
  assert.equal(recs[1].sha, M2);
  assert.equal(recs[1].body, "ok");
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
    "-z",
    "--first-parent",
    "--merges",
    "--format=%H%x1f%P%x1f%B",
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

const trainMessage = (head) =>
  `Merge #34 into the train\n\nMerge-Train-PR: 34\nMerge-Train-Head: ${head}\n`;

test("parseTrainTrailers scans the message, including trailers before conflict comments", () => {
  assert.deepEqual(TRAIN_TRAILERS, {
    pr: "Merge-Train-PR",
    head: "Merge-Train-Head",
    author: "Merge-Train-Author",
    carried: "Merge-Train-Carried",
  });
  assert.ok(Object.isFrozen(TRAIN_TRAILERS));
  const message = [
    trainMessage(HEAD_A),
    "Merge-Train-Author: dependabot[bot]",
    `Merge-Train-Carried: 12 ${HEAD_B} bob_12`,
    `Merge-Train-Carried: 13 ${sha("c")}`,
    "",
    "# Conflicts:",
    "# Merge-Train-PR: 99",
    "# Merge-Train-Head: not-a-head",
  ].join("\r\n");
  assert.deepEqual(parseTrainTrailers(message), {
    pr: 34,
    head: HEAD_A,
    author: "dependabot[bot]",
    carried: [
      { pr: 12, head: HEAD_B, author: "bob_12" },
      { pr: 13, head: sha("c"), author: null },
    ],
  });
});

test("parseTrainTrailers rejects missing, invalid or duplicate required trailers", () => {
  for (const message of [
    "",
    "Merge-Train-PR: 34",
    `Merge-Train-Head: ${HEAD_A}`,
    trainMessage("a".repeat(39)),
    trainMessage(HEAD_A.toUpperCase()),
    ...["0", "-1", "1.2", "9007199254740992"].map((pr) =>
      trainMessage(HEAD_A).replace("PR: 34", `PR: ${pr}`)
    ),
    `${trainMessage(HEAD_A)}Merge-Train-PR: 34`,
    `${trainMessage(HEAD_A)}Merge-Train-Head: ${HEAD_A}`,
    `${trainMessage(HEAD_A)}Merge-Train-PR:`,
    `${trainMessage(HEAD_A)}Merge-Train-Head: invalid`,
  ]) {
    assert.equal(parseTrainTrailers(message), null, message);
  }
});

test("parseTrainTrailers drops invalid authors and invalid or repeated carried entries", () => {
  for (const authorLines of [
    "",
    "Merge-Train-Author: @alice",
    "Merge-Train-Author: alice\nMerge-Train-Author: alice",
    "Merge-Train-Author: alice\nMerge-Train-Author:",
  ]) {
    const message = [
      trainMessage(HEAD_A),
      authorLines,
      `Merge-Train-Carried: 34 ${HEAD_B} self`,
      `Merge-Train-Carried: 0 ${HEAD_B}`,
      `Merge-Train-Carried: 12 ${HEAD_B} @bob`,
      "Merge-Train-Carried: 12 short",
      `Merge-Train-Carried: 12 ${HEAD_B} bob`,
      `Merge-Train-Carried: 12 ${sha("c")} duplicate`,
      `Merge-Train-Carried: 13 ${sha("c")} wrong extra`,
    ].join("\n");
    assert.deepEqual(parseTrainTrailers(message), {
      pr: 34,
      head: HEAD_A,
      author: null,
      carried: [{ pr: 12, head: HEAD_B, author: "bob" }],
    });
  }
});

const TRAIN_RANGE = "base..train-landing";
const TRAIN_RANGE_IN_QUEUE = `${BASE0}..${HEAD_A}`;
const TRAIN_MEMBER = {
  sha: M2,
  parents: [BASE0, HEAD_B],
  body: `${trainMessage(HEAD_B)}Merge-Train-Author: bob\n`,
};
const TRAIN_REPAIR = sha("f");

function fakeTrain({
  outerBody = msg(90, HEAD_A, "chore: merge train", "Maint"),
  memberMerges = [TRAIN_MEMBER],
  trainCommits = [TRAIN_REPAIR, M2, HEAD_B],
  memberRanges = {},
} = {}) {
  return fakeGit(
    [{ sha: M1, parents: [BASE0, HEAD_A], body: outerBody }],
    { [TRAIN_RANGE_IN_QUEUE]: trainCommits, ...memberRanges },
    { [TRAIN_RANGE_IN_QUEUE]: memberMerges }
  );
}

test("queuePrByCommit credits the smallest carried stack first and leaves repairs to the train", () => {
  const inner = sha("c");
  const middle = sha("d");
  const outside = sha("e");
  const alreadyOnBase = sha("9");
  const { runGit, calls } = fakeTrain({
    memberMerges: [
      {
        ...TRAIN_MEMBER,
        body: [
          TRAIN_MEMBER.body,
          `Merge-Train-Carried: 56 ${middle} carol`,
          `Merge-Train-Carried: 78 ${inner} dan`,
          `Merge-Train-Carried: 79 ${outside} mallory`,
        ].join("\n"),
      },
    ],
    trainCommits: [TRAIN_REPAIR, M2, HEAD_B, inner, middle, outside],
    memberRanges: {
      [`${BASE0}..${HEAD_B}`]: [HEAD_B, middle, inner, alreadyOnBase],
      [`${BASE0}..${middle}`]: [middle, inner],
      [`${BASE0}..${inner}`]: [inner],
      [`${BASE0}..${outside}`]: [outside, HEAD_B],
    },
  });
  const map = queuePrByCommit({ runGit, range: TRAIN_RANGE, trainAuthors: new Set(["maint"]) });
  for (const [head, pr, author] of [
    [inner, 78, "dan"],
    [middle, 56, "carol"],
    [HEAD_B, 34, "bob"],
  ]) {
    assert.deepEqual(map.get(head), {
      pr,
      author,
      head,
      batch: "b7",
      mergeSha: M1,
      title: null,
      train: 90,
    });
  }
  for (const sha of [TRAIN_REPAIR, M2, outside]) {
    assert.equal(map.get(sha).pr, 90);
    assert.equal("train" in map.get(sha), false);
  }
  assert.equal(map.has(alreadyOnBase), false);
  assert.deepEqual(
    calls.find((c) => c[0] === "log" && c.at(-1) === TRAIN_RANGE_IN_QUEUE),
    ["log", "-z", "--first-parent", "--merges", "--format=%H%x1f%P%x1f%B", TRAIN_RANGE_IN_QUEUE]
  );
});

test("queuePrByCommit: a carried entry that names the member's own head claims nothing", () => {
  const { runGit } = fakeTrain({
    memberMerges: [
      {
        ...TRAIN_MEMBER,
        body: [TRAIN_MEMBER.body, `Merge-Train-Carried: 56 ${HEAD_B} carol`].join("\n"),
      },
    ],
    trainCommits: [TRAIN_REPAIR, M2, HEAD_B],
    memberRanges: { [`${BASE0}..${HEAD_B}`]: [HEAD_B] },
  });
  const map = queuePrByCommit({ runGit, range: TRAIN_RANGE, trainAuthors: ["maint"] });
  assert.equal(map.get(HEAD_B).pr, 34, "the member keeps its own head");
  assert.equal(map.get(HEAD_B).author, "bob");
  assert.equal(map.get(HEAD_B).train, 90);
});

test("queuePrByCommit ignores train trailers outside a genuine queue merge", () => {
  for (const outerBody of [
    trainMessage(HEAD_A),
    `${trainMessage(HEAD_A)}\n${msg(90, HEAD_B, "chore: merge train", "Maint")}`,
  ]) {
    const { runGit, calls } = fakeTrain({ outerBody });
    assert.equal(queuePrByCommit({ runGit, range: TRAIN_RANGE, trainAuthors: ["maint"] }).size, 0);
    assert.equal(calls.length, 1);
  }
});

test("queuePrByCommit keeps the legacy map without a trusted train author", () => {
  for (const trainAuthors of [undefined, [], ["another-maintainer"]]) {
    const { runGit, calls } = fakeTrain();
    const map = queuePrByCommit({ runGit, range: TRAIN_RANGE, trainAuthors });
    assert.deepEqual([...map.keys()], [TRAIN_REPAIR, M2, HEAD_B]);
    for (const info of map.values()) {
      assert.deepEqual(info, {
        pr: 90,
        author: "Maint",
        head: HEAD_A,
        batch: "b7",
        mergeSha: M1,
        title: "chore: merge train",
      });
    }
    assert.equal(calls.length, 2, "untrusted landings never walk the member merges");
  }
});

test("queuePrByCommit ignores off-chain member merges and rejects mismatched or duplicate trailers", () => {
  const invalid = [
    ["off first-parent", []],
    ["wrong second parent", [{ ...TRAIN_MEMBER, body: trainMessage(HEAD_A) }]],
    ["three parents", [{ ...TRAIN_MEMBER, parents: [...TRAIN_MEMBER.parents, HEAD_A] }]],
    ["duplicate PR", [{ ...TRAIN_MEMBER, body: `${TRAIN_MEMBER.body}Merge-Train-PR: 34` }]],
    [
      "duplicate head",
      [{ ...TRAIN_MEMBER, body: `${TRAIN_MEMBER.body}Merge-Train-Head: ${HEAD_B}` }],
    ],
  ];
  for (const [label, memberMerges] of invalid) {
    const { runGit } = fakeTrain({ memberMerges });
    const map = queuePrByCommit({ runGit, range: TRAIN_RANGE, trainAuthors: ["maint"] });
    assert.equal(map.get(HEAD_B).pr, 90, label);
  }
});
