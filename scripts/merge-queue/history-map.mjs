// scripts/merge-queue/history-map.mjs — WP6b. Plan §3.2: release tooling vs merge-ff landings.
//
// The squash era gave every PR exactly one commit whose subject ends in `(#N)`, and the release
// scripts (reconcile-changelog, list-uncovered-commits) read the PR number from that suffix.
// A merge-ff landing of omni-queue keeps the contributor's ORIGINAL commits (subjects without
// `(#N)`) and adds one merge commit per PR whose body carries the Omni-Queue-* trailers
// (contracts.buildMergeMessage). This module maps each of those original commits back to its PR,
// so the release tooling keeps working on a mixed squash + merge-ff history. For trains landed
// by a configured approver, Merge-Train-* trailers on first-parent merges identify the member PRs,
// including stacked PRs carried by a member merge.
//
// The git runner is injectable (default: execFileSync git, argv only, never a shell).
// Zero runtime dependencies, like every module under scripts/merge-queue/.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { isSha, parseQueueTrailers } from "./contracts.mjs";

/**
 * @typedef {object} QueuePrInfo
 * @property {number} pr             queue or member PR number
 * @property {string|null} author    PR author login from the trailers, null when absent
 * @property {string} head           exact head of the PR
 * @property {string|null} batch     batch id (Omni-Queue-Batch), null when absent
 * @property {string} mergeSha       the queue merge commit M
 * @property {string|null} title     title from the queue merge subject, null for members
 * @property {number} [train]       queue PR number for a train member
 */

export const TRAIN_TRAILERS = Object.freeze({
  pr: "Merge-Train-PR",
  head: "Merge-Train-Head",
  author: "Merge-Train-Author",
  carried: "Merge-Train-Carried",
});

const LOGIN_RE = /^[A-Za-z0-9_[\]-]+$/;
const FIELD = "\x1f";
// `git log -z` ends each record with NUL, which (unlike \x1e/\x1f) can never occur in a commit
// message: a body carrying control characters cannot shift fields or inject a record.
const RECORD = "\0";

/** Read the configured queue approver logins. Missing or invalid config yields an empty list. */
export function readTrainAuthors(cwd = process.cwd()) {
  try {
    const config = JSON.parse(readFileSync(`${cwd}/config/merge-queue/config.json`, "utf8"));
    const approvers = config?.approvers;
    return Array.isArray(approvers) &&
      approvers.every((a) => typeof a === "string" && LOGIN_RE.test(a))
      ? approvers
      : [];
  } catch {
    return [];
  }
}

function parsePrNumber(value) {
  const pr = Number(value);
  return /^[1-9][0-9]*$/.test(value) && Number.isSafeInteger(pr) ? pr : null;
}

/**
 * Read member trailers anywhere in the message, including before a conflict comment block.
 * @param {string} message
 * @returns {{pr: number, head: string, author: string|null,
 *            carried: {pr: number, head: string, author: string|null}[]}|null}
 */
export function parseTrainTrailers(message) {
  const values = new Map(Object.values(TRAIN_TRAILERS).map((key) => [key, []]));
  for (const line of String(message ?? "").split(/\r?\n/)) {
    // The key must start at the beginning of the line, so Git comments are ignored.
    const match = /^([A-Za-z-]+):/.exec(line);
    if (match) values.get(match[1])?.push(line.slice(match[0].length).trim());
  }
  const prs = values.get(TRAIN_TRAILERS.pr);
  const heads = values.get(TRAIN_TRAILERS.head);
  const pr = parsePrNumber(prs[0]);
  const [head] = heads;
  if (prs.length !== 1 || heads.length !== 1 || !pr || !isSha(head)) return null;

  const authors = values.get(TRAIN_TRAILERS.author);
  const author = authors.length === 1 && LOGIN_RE.test(authors[0]) ? authors[0] : null;
  const carried = [];
  const seen = new Set([pr]);
  for (const line of values.get(TRAIN_TRAILERS.carried)) {
    const [number, carriedHead, carriedAuthor = null, ...extra] = line.split(/\s+/);
    const carriedPr = parsePrNumber(number);
    if (!carriedPr || seen.has(carriedPr) || !isSha(carriedHead) || extra.length) continue;
    if (carriedAuthor !== null && !LOGIN_RE.test(carriedAuthor)) continue;
    seen.add(carriedPr);
    carried.push({ pr: carriedPr, head: carriedHead, author: carriedAuthor });
  }
  return { pr, head, author, carried };
}

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
 * Parse `git log -z --format=%H%x1f%P%x1f%B` output (NUL-terminated records) into merge records.
 * SHA and parents come first, so a \x1f inside the body stays in the body.
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

function firstParentMerges(git, range) {
  return parseMergeLog(
    git(["log", "-z", "--first-parent", "--merges", "--format=%H%x1f%P%x1f%B", range])
  );
}

function revisionList(git, range) {
  return git(["rev-list", range])
    .split("\n")
    .map((sha) => sha.trim())
    .filter(isSha);
}

function mapTrainMembers(git, range, queue, trainCommits, map) {
  for (const merge of firstParentMerges(git, range)) {
    if (merge.parents.length !== 2 || !merge.parents.every(isSha)) continue;
    const member = parseTrainTrailers(merge.body);
    if (!member || member.head !== merge.parents[1]) continue;

    const from = merge.parents[0];
    const memberCommits = new Set(revisionList(git, `${from}..${member.head}`));
    const carried = member.carried
      // A head outside the member range can share ancestors with it but cannot claim any.
      .filter(({ head }) => memberCommits.has(head))
      .map((entry) => ({
        ...entry,
        commits: revisionList(git, `${from}..${entry.head}`).filter((sha) =>
          memberCommits.has(sha)
        ),
      }))
      .sort((a, b) => a.commits.length - b.commits.length);
    for (const { pr, author, head, commits } of [
      ...carried,
      { ...member, commits: memberCommits },
    ]) {
      const info = {
        pr,
        author,
        head,
        batch: queue.batch,
        mergeSha: queue.mergeSha,
        title: null,
        train: queue.pr,
      };
      for (const sha of commits) {
        if (trainCommits.has(sha) && !map.has(sha)) map.set(sha, info);
      }
    }
  }
}

/**
 * Map every commit a queue merge brought in to the PR it belongs to.
 *
 * Walks the FIRST-PARENT merges of `range` (the base branch's own history: each queue merge M
 * sits on it, with M^1 = previous tip and M^2 = PR head) and maps each commit of `M^1..M^2` to
 * M's PR. If M's author is in trainAuthors, first credit commits to the members identified by
 * first-parent merges of the train head, giving carried PRs the first claim. The train PR gets
 * the remaining commits. Commits outside every queue merge are absent from the map.
 *
 * @param {{runGit?: (args: string[]) => string, range?: string, cwd?: string,
 *          trainAuthors?: Iterable<string>}} [options]
 *   range: a single git revision range (`base..head`, or a bare ref for the whole history).
 *   trainAuthors: case-insensitive allowlist of queue PR author logins for train expansion.
 * @returns {Map<string, QueuePrInfo>}  keyed by full 40-hex commit SHA
 */
export function queuePrByCommit({ runGit, range = "HEAD", cwd, trainAuthors } = {}) {
  const r = String(range ?? "").trim();
  if (!r || r.startsWith("-") || /\s/.test(r)) {
    throw new Error(`queuePrByCommit: invalid range ${JSON.stringify(range)}`);
  }
  const git = runGit ?? defaultRunGit(cwd);
  const trusted = new Set(Array.from(trainAuthors ?? [], (login) => login.toLowerCase()));
  const map = new Map();
  for (const rec of firstParentMerges(git, r)) {
    const info = queueMergeInfo(rec);
    if (!info) continue;
    const landedRange = `${rec.parents[0]}..${rec.parents[1]}`;
    const commits = revisionList(git, landedRange);
    if (info.author && trusted.has(info.author.toLowerCase())) {
      mapTrainMembers(git, landedRange, info, new Set(commits), map);
    }
    for (const sha of commits) {
      if (!map.has(sha)) map.set(sha, info);
    }
  }
  return map;
}
