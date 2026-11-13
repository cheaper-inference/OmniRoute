// omni-queue history map against a real temporary git repository: a squash commit `(#12)`,
// a merge-ff landing of PR #34 (two contributor commits + the queue merge commit), a plain
// non-queue merge and a merge whose trailers lie about the head. Proves the map, the release
// tooling reading it (reconcile-changelog readCommits/readFragments/reconcile and
// list-uncovered-commits computeUncovered), and that a squash-only history reads as before.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildMergeMessage } from "../../../../scripts/merge-queue/contracts.mjs";
import { queuePrByCommit } from "../../../../scripts/merge-queue/history-map.mjs";
import {
  readCommits,
  readFragments,
  reconcile,
} from "../../../../scripts/release/reconcile-changelog.mjs";
import { computeUncovered } from "../../../../scripts/release/list-uncovered-commits.mjs";

const ENV = {
  ...process.env,
  GIT_AUTHOR_NAME: "maint",
  GIT_AUTHOR_EMAIL: "maint@example.com",
  GIT_COMMITTER_NAME: "maint",
  GIT_COMMITTER_EMAIL: "maint@example.com",
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_NOSYSTEM: "1",
};

function git(cwd, args, extraEnv = {}) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    env: { ...ENV, ...extraEnv },
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function commitFile(cwd, rel, text, subject, extraEnv) {
  fs.mkdirSync(path.dirname(path.join(cwd, rel)), { recursive: true });
  fs.writeFileSync(path.join(cwd, rel), text);
  git(cwd, ["add", "-A"]);
  git(cwd, ["commit", "-q", "-m", subject], extraEnv);
  return git(cwd, ["rev-parse", "HEAD"]);
}

/** `git merge --no-ff <head>` with an exact message (what the queue composes, then fast-forwards). */
function mergeWithMessage(cwd, head, message) {
  const file = path.join(cwd, ".git", "QUEUE_MSG");
  fs.writeFileSync(file, message);
  git(cwd, ["merge", "-q", "--no-ff", "--cleanup=verbatim", "-F", file, head]);
  return git(cwd, ["rev-parse", "HEAD"]);
}

const ALICE = { GIT_AUTHOR_NAME: "Alice C", GIT_AUTHOR_EMAIL: "alice@example.com" };

/** Build the mixed history; returns the shas the assertions need. */
function makeMixedRepo(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-queue-history-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  git(dir, ["init", "-q", "-b", "release/v9.9.9"]);
  const root = commitFile(dir, "README.md", "root\n", "chore(release): open v9.9.9 cycle");
  const squash = commitFile(dir, "a.txt", "a\n", "feat(a): squashed feature (#12)");

  // PR #34: branch off the base, two contributor commits (one adds a fragment, one cites an issue)
  git(dir, ["checkout", "-q", "-b", "pr-34"]);
  const c1 = commitFile(
    dir,
    "changelog.d/features/frag-b.md",
    "- **feat(b):** queue feature fragment\n",
    "wip: start feature b",
    ALICE
  );
  const c2 = commitFile(dir, "b.txt", "b\n", "fix typo in feature b (#777)", ALICE);
  git(dir, ["checkout", "-q", "release/v9.9.9"]);
  const baseSha = git(dir, ["rev-parse", "HEAD"]);
  const merge34 = mergeWithMessage(
    dir,
    c2,
    buildMergeMessage({
      pr: {
        n: 34,
        head: c2,
        title: "feat(b): queue feature",
        author: "alice",
        labeledAt: "2026-11-13T00:00:00Z",
      },
      base: "release/v9.9.9",
      baseSha,
      batchId: "b1",
    })
  );

  // a plain non-queue merge
  git(dir, ["checkout", "-q", "-b", "side"]);
  const side = commitFile(dir, "s.txt", "s\n", "chore: side work");
  git(dir, ["checkout", "-q", "release/v9.9.9"]);
  mergeWithMessage(dir, side, "Merge branch 'side'\n");

  // a merge that copies queue trailers but merges ANOTHER head (forged): must not map
  git(dir, ["checkout", "-q", "-b", "forged"]);
  const forgedCommit = commitFile(dir, "f.txt", "f\n", "feat: sneaky");
  git(dir, ["checkout", "-q", "release/v9.9.9"]);
  const tip = git(dir, ["rev-parse", "HEAD"]);
  mergeWithMessage(
    dir,
    forgedCommit,
    buildMergeMessage({
      pr: { n: 99, head: c2, title: "x", author: "mallory", labeledAt: "" },
      base: "release/v9.9.9",
      baseSha: tip,
      batchId: "b2",
    })
  );
  return { dir, root, squash, c1, c2, merge34, side, forgedCommit };
}

test("queuePrByCommit on a real repo: contributor commits map to the queue PR only", (t) => {
  const r = makeMixedRepo(t);
  const map = queuePrByCommit({ cwd: r.dir, range: `${r.root}..HEAD` });
  assert.deepEqual([...map.keys()].sort(), [r.c1, r.c2].sort());
  for (const c of [r.c1, r.c2]) {
    assert.deepEqual(map.get(c), {
      pr: 34,
      author: "alice",
      head: r.c2,
      batch: "b1",
      mergeSha: r.merge34,
      title: "feat(b): queue feature",
    });
  }
  assert.equal(map.has(r.squash), false, "squash commits keep their (#N) path");
  assert.equal(map.has(r.side), false, "plain merges are not queue merges");
  assert.equal(map.has(r.forgedCommit), false, "trailer head != merged head → ignored");
  // a range that stops before the queue merge maps nothing
  assert.equal(queuePrByCommit({ cwd: r.dir, range: `${r.root}..${r.squash}` }).size, 0);
});

test("readCommits fills pr/queue for merge-ff commits; squash rows unchanged", (t) => {
  const r = makeMixedRepo(t);
  const rows = readCommits(r.root, "HEAD", r.dir);
  const by = new Map(rows.map((x) => [x.hash, x]));
  assert.equal(by.has(r.merge34), false, "--no-merges: the queue merge commit is not a row");
  assert.equal(by.get(r.squash).pr, 12);
  assert.equal("queue" in by.get(r.squash), false);
  assert.equal(by.get(r.c1).pr, 34, "no (#N) in the subject → PR from the queue merge");
  assert.equal(by.get(r.c2).pr, 34, "the queue merge wins over an issue-like (#777) suffix");
  assert.deepEqual(by.get(r.c1).queue, {
    pr: 34,
    author: "alice",
    title: "feat(b): queue feature",
    mergeSha: r.merge34,
  });
  assert.equal(by.get(r.c1).authorName, "Alice C");
  assert.equal(by.get(r.forgedCommit).pr, null);
  assert.equal("queue" in by.get(r.forgedCommit), false);
  // same rows as passing the map explicitly
  const map = queuePrByCommit({ cwd: r.dir, range: `${r.root}..HEAD` });
  assert.deepEqual(readCommits(r.root, "HEAD", r.dir, map), rows);
});

test("readFragments: the adding commit of a merge-ff landing resolves to the queue PR", (t) => {
  const r = makeMixedRepo(t);
  const map = queuePrByCommit({ cwd: r.dir, range: `${r.root}..HEAD` });
  const [withMap] = readFragments(r.dir, map);
  assert.equal(withMap.path, "changelog.d/features/frag-b.md");
  assert.equal(withMap.originPr, 34);
  assert.equal(withMap.originHash, r.c1.slice(0, 9));
  const [legacy] = readFragments(r.dir);
  assert.equal(legacy.originPr, null, "without the map the subject has no (#N)");
});

test("list-uncovered: a merge-ff commit is covered when its PR is cited, hinted otherwise", (t) => {
  const r = makeMixedRepo(t);
  // the same log + short-hash keying main() uses
  const log = git(r.dir, ["log", "--no-merges", `${r.root}..HEAD`, "--format=%H%x09%h%x09%s"]);
  const map = queuePrByCommit({ cwd: r.dir, range: `${r.root}..HEAD` });
  const prByCommit = new Map();
  const commits = log.split("\n").map((l) => {
    const [full, hash, subject] = l.split("\t");
    if (map.has(full)) prByCommit.set(hash, map.get(full));
    return { hash, subject };
  });
  const short = (s) => commits.find((c) => s.startsWith(c.hash)).hash;

  const cited = computeUncovered(commits, new Set([12, 34]), prByCommit);
  const uncoveredHashes = cited.uncovered.map((c) => c.hash).sort();
  assert.deepEqual(uncoveredHashes, [short(r.side), short(r.forgedCommit)].sort());
  assert.equal(cited.covered, 3, "squash #12 + both PR #34 commits");

  const notCited = computeUncovered(commits, new Set([12]), prByCommit);
  const c1Row = notCited.uncovered.find((c) => c.hash === short(r.c1));
  assert.equal(c1Row.queuePr, 34, "uncovered merge-ff commit carries its PR as a hint");
  assert.equal(c1Row.type, "wip");
  const sideRow = notCited.uncovered.find((c) => c.hash === short(r.side));
  assert.equal("queuePr" in sideRow, false);

  // without the map (legacy call) the merge-ff commits are uncovered: the map is what fixes it
  const legacy = computeUncovered(commits, new Set([12, 34]));
  assert.equal(legacy.covered, 1);
});

test("reconcile: one generated bullet per queue PR, titled and credited from the merge", (t) => {
  const r = makeMixedRepo(t);
  const rows = readCommits(r.root, "HEAD", r.dir);
  const changelog = [
    "# Changelog",
    "",
    "## [Unreleased]",
    "",
    "## [9.9.9] — TBD",
    "",
    "### ✨ New Features",
    "",
    "### 🐛 Bug Fixes",
    "",
    "### 📝 Maintenance",
    "",
    "---",
    "",
    "## [9.9.8] — 2026-11-01",
    "",
    "---",
    "",
  ].join("\n");
  // PR #34 deliberately absent from the gh data: credit must come from the queue trailer
  const prs = [{ number: 12, title: "x", author: { login: "bob" }, closingIssuesReferences: [] }];
  const { changelog: next, report } = reconcile({
    changelog,
    version: "9.9.9",
    repo: "o/r",
    rows,
    prs,
    fragments: [],
    today: "2026-11-13",
    baseTip: "0000000",
    headTip: "1111111",
  });
  const section = next.slice(next.indexOf("## [9.9.9]"), next.indexOf("## [9.9.8]"));
  const line34 =
    "- **feat(b):** queue feature ([#34](https://github.com/o/r/pull/34)) — thanks @alice";
  assert.ok(section.includes(line34), section);
  assert.equal((section.match(/pull\/34\)/g) || []).length, 1, "two commits, ONE bullet");
  assert.doesNotMatch(section, /wip: start feature b|fix typo in feature b/);
  assert.ok(section.includes("([#12](https://github.com/o/r/pull/12)) — thanks @bob"));
  assert.equal(
    rows.find((x) => x.hash === r.c1).prAuthor,
    "alice",
    "prAuthor falls back to the trailer"
  );
  assert.equal(report.commits, rows.length);
});

test("squash-only history: map empty, readCommits identical to the pre-queue reading", (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-queue-squash-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  git(dir, ["init", "-q", "-b", "main"]);
  const root = commitFile(dir, "r.txt", "r\n", "root");
  commitFile(dir, "a.txt", "a\n", "feat(a): one (#12)");
  commitFile(dir, "b.txt", "b\n", "fix(b): two (#13)");
  commitFile(dir, "c.txt", "c\n", "chore: direct push");
  assert.equal(queuePrByCommit({ cwd: dir, range: `${root}..HEAD` }).size, 0);
  const rows = readCommits(root, "HEAD", dir);
  assert.deepEqual(readCommits(root, "HEAD", dir, new Map()), rows);
  assert.deepEqual(
    rows.map((x) => [x.subject, x.pr, x.prAuthor]),
    [
      ["chore: direct push", null, null],
      ["fix(b): two (#13)", 13, null],
      ["feat(a): one (#12)", 12, null],
    ]
  );
  const LEGACY_KEYS = "hash,date,authorName,authorEmail,subject,refs,pr,prAuthor,coauthors";
  for (const row of rows) assert.equal(Object.keys(row).join(","), LEGACY_KEYS, "no extra fields");
});
