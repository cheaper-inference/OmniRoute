// scripts/merge-queue/history-map.mjs — WP6b. Plan §3.2: release tooling vs merge-ff landings.
//
// The squash era gave every PR exactly one commit whose subject ends in `(#N)`, and the release
// scripts (reconcile-changelog, list-uncovered-commits) read the PR number from that suffix.
// A merge-ff landing of omni-queue keeps the contributor's ORIGINAL commits (subjects without
// `(#N)`) and adds one merge commit per PR whose body carries the Omni-Queue-* trailers
// (contracts.buildMergeMessage). This module maps each of those original commits back to its PR,
// so the release tooling keeps working on a mixed squash + merge-ff history.
//
// Pure apart from the injectable `runGit` (default: execFileSync git, argv only, never a shell).
// Zero runtime dependencies, like every module under scripts/merge-queue/.

import { execFileSync } from "node:child_process";
import { isSha, parseQueueTrailers } from "./contracts.mjs";

/**
 * @typedef {object} QueuePrInfo
 * @property {number} pr             PR number (Omni-Queue-PR)
 * @property {string|null} author    PR author login (Omni-Queue-Author), null when absent
 * @property {string} head           exact PR head that was merged (Omni-Queue-Head == M^2)
 * @property {string|null} batch     batch id (Omni-Queue-Batch), null when absent
 * @property {string} mergeSha       the queue merge commit M
 * @property {string|null} title     PR title read back from `Merge PR #N: <title> (@author)`
 */

const FIELD = "\x1f";
const RECORD = "\x1e";

/** Default git runner: argv only (no shell), trimmed stdout. */
export function defaultRunGit(cwd = process.cwd()) {
  return (args) =>
    execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      maxBuffer: 1 << 28,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
}

/**
 * PR title from the merge subject `Merge PR #<n>: <title> (@<author>)`; null when the subject
 * does not follow buildMergeMessage or names another PR.
 * @param {string} subject
 * @param {number} pr
 * @returns {string|null}
 */
export function titleFromMergeSubject(subject, pr) {
  const m = /^Merge PR #([1-9][0-9]*): (.*) \(@[A-Za-z0-9_[\]-]*\)$/.exec(String(subject ?? ""));
  if (!m || Number(m[1]) !== pr) return null;
  const title = m[2].trim();
  return title || null;
}

/**
 * Parse `git log --format=%H%x1f%P%x1f%B%x1e` output into merge records.
 * @param {string} raw
 * @returns {{sha: string, parents: string[], body: string}[]}
 */
export function parseMergeLog(raw) {
  return String(raw ?? "")
    .split(RECORD)
    .map((rec) => rec.replace(/^\n+/, ""))
    .filter((rec) => rec.trim())
    .map((rec) => {
      const [sha = "", parents = "", ...rest] = rec.split(FIELD);
      return {
        sha: sha.trim(),
        parents: parents.trim().split(/\s+/).filter(Boolean),
        body: rest.join(FIELD),
      };
    });
}

/**
 * The queue identity of a merge record, or null when it is not a genuine omni-queue merge:
 * exactly two parents, a valid Omni-Queue-PR trailer, and an Omni-Queue-Head trailer equal to the
 * second parent (the merged head). The head check keeps a hand-written merge that merely copies
 * the trailer text from claiming commits it did not merge.
 * @param {{sha: string, parents: string[], body: string}} rec
 * @returns {QueuePrInfo|null}
 */
export function queueMergeInfo(rec) {
  if (!isSha(rec?.sha) || rec.parents.length !== 2 || !rec.parents.every(isSha)) return null;
  const t = parseQueueTrailers(rec.body);
  if (!t.pr || !t.head || t.head !== rec.parents[1]) return null;
  const subject = String(rec.body).replace(/\r\n/g, "\n").split("\n")[0];
  return {
    pr: t.pr,
    author: t.author ?? null,
    head: t.head,
    batch: t.batch ?? null,
    mergeSha: rec.sha,
    title: titleFromMergeSubject(subject, t.pr),
  };
}

/**
 * Map every commit a queue merge brought in to the PR it belongs to.
 *
 * Walks the FIRST-PARENT merges of `range` (the base branch's own history: each queue merge M
 * sits on it, with M^1 = previous tip and M^2 = PR head) and maps each commit of `M^1..M^2` to
 * M's PR. First-parent ranges are disjoint, so a commit is never claimed twice. Commits outside
 * every queue merge (squash commits, direct pushes) are simply absent from the map — a history
 * with no queue merge yields an empty map and callers behave exactly as before.
 *
 * @param {{runGit?: (args: string[]) => string, range?: string, cwd?: string}} [options]
 *   range: a single git revision range (`base..head`, or a bare ref for the whole history).
 * @returns {Map<string, QueuePrInfo>}  keyed by full 40-hex commit SHA
 */
export function queuePrByCommit({ runGit, range = "HEAD", cwd } = {}) {
  const r = String(range ?? "").trim();
  if (!r || r.startsWith("-") || /\s/.test(r)) {
    throw new Error(`queuePrByCommit: invalid range ${JSON.stringify(range)}`);
  }
  const git = runGit ?? defaultRunGit(cwd);
  const raw = git(["log", "--first-parent", "--merges", "--format=%H%x1f%P%x1f%B%x1e", r]);
  const map = new Map();
  for (const rec of parseMergeLog(raw)) {
    const info = queueMergeInfo(rec);
    if (!info) continue;
    const listed = git(["rev-list", `${rec.parents[0]}..${rec.parents[1]}`]);
    for (const sha of listed.split("\n").map((s) => s.trim())) {
      if (isSha(sha) && !map.has(sha)) map.set(sha, info);
    }
  }
  return map;
}
