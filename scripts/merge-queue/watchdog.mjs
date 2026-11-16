#!/usr/bin/env node
// scripts/merge-queue/watchdog.mjs — the queue's dead-man switch, run by
// .github/workflows/omni-queue-watchdog.yml every 30 minutes with the workflow's default token
// (contents: read, issues: write, pull-requests: read), outside the queue's own workflow,
// environment and App: it still runs when a tick dies before its first step (the App token cannot
// be minted, the App was uninstalled, the environment refuses the run, the workflow file is
// broken).
//
// The queue tells its approvers itself, once per stalled episode, with a comment on the base's
// dashboard issue. The watchdog is the backup channel, for what that comment cannot cover. It
// reads the per-base state files on contracts.STATE_BRANCH and reports three signals:
//   - no state saved: a base with work (contracts.hasQueueWork: in flight, paused, or an open PR
//     carrying the queue label whose base is that base, drafts included) whose state is older
//     than WATCHDOG_LIMIT_MINUTES. Ticks visit such a base and save its state at least once per
//     hour (tick.STATE_HEARTBEAT_MINUTES). An idle base is never visited, so its age means
//     nothing: a finished release keeps its old state file for ever, and is never reported. This
//     signal reads nothing the tick writes but `updatedAt`;
//   - undelivered stalled episode: a state carrying `stalled` without `notified: true`, opened
//     more than WATCHDOG_STALLED_GRACE_MINUTES ago, on a base that is not an orphan (an orphan has
//     no work and a state older than WATCHDOG_LIMIT_MINUTES: nobody is waiting on it). A
//     delivered episode is not reported again: its approvers were told on the dashboard;
//   - unreadable state: a state file that is not JSON, that does not pass contracts.validateState,
//     or whose valid document is not where its base belongs: a base the queue does not manage (its
//     own file, or a name the store refuses), or a base stored in another file (its `base` through
//     stateFilePath does not give the file's path). Those last two lines say what to do: a managed base stored
//     in that file has ticks that fail until it is fixed or deleted; otherwise it is stray.
// Then it keeps ONE issue (title WATCHDOG_TITLE, label contracts.DASHBOARD_LABEL, found again by
// that title and the hidden WATCHDOG_MARKER). Its body is rendered from the signals with absolute
// times only, so the same signals render the same body. Created when a signal fires and none is
// open (the approvers are mentioned then); while it is open, its body is updated in place when the
// signals change (no comment; the mention line stays as it was); closed with a comment once no
// signal fires; reopened with a comment (no mention) and the current body when one fires again
// within WATCHDOG_REOPEN_HOURS of its closing. It never writes the state and never writes to a pull
// request. Whether the body changed is decided by a hidden hash line of the body, never by
// comparing text. A read that fails (the listing of the labeled PRs, or a state file that cannot
// be fetched) is not a signal: it makes the run partial. So does a run that stops fetching state
// files once WATCHDOG_READ_BUDGET_SECONDS have passed, and one that reaches its write sequence
// after WATCHDOG_WRITE_CUTOFF_SECONDS and starts none. A partial run may open or reopen the issue
// for the signals it did establish, never closes it, never comments its closing and never
// rewrites the body of an open issue; it then exits 1, one error line per failed read (the red
// scheduled run is the channel for a read that keeps failing). A failure that stops the run (the
// listing of the state files, the issue search, a write) exits 1 with one error line.
// Time: the budget only limits when fetching STARTS. One request is bounded by the watchdog's own
// client limits (WATCHDOG_MAX_RETRIES, WATCHDOG_REQUEST_TIMEOUT_SECONDS, WATCHDOG_MAX_WAIT_SECONDS:
// at most 3 attempts of 15 s and 2 waits of 15 s, 75 s); the run as a whole is bounded only by
// main()'s timer, WATCHDOG_DEADLINE_SECONDS, inside the job's timeout-minutes. Every line printed
// is one line: names and reasons are flattened and clipped (oneLine), so none can start a
// workflow command.

import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { DEFAULT_CONFIG_PATH, isManagedBase, loadConfig } from "./config.mjs";
import {
  DASHBOARD_LABEL,
  STATE_BRANCH,
  hasQueueWork,
  stateFilePath,
  validateState,
} from "./contracts.mjs";
import { createGitHubClient } from "./github.mjs";

/** No state saved for more than this many whole minutes (exclusive), on a base with work. */
export const WATCHDOG_LIMIT_MINUTES = 90;
/** An undelivered stalled episode older than this many whole minutes (exclusive): reported. */
export const WATCHDOG_STALLED_GRACE_MINUTES = 30;
/** A closed watchdog issue is reopened, not recreated, when a signal fires within this. */
export const WATCHDOG_REOPEN_HOURS = 24;
/**
 * Seconds from the start of the run after which no state-file fetch STARTS (checked before each
 * fetch). It does not bound how long a fetch takes: the client limits below bound one request,
 * and only WATCHDOG_DEADLINE_SECONDS bounds the run.
 */
export const WATCHDOG_READ_BUDGET_SECONDS = 150;
/** Seconds from the start of the run after which no write sequence (create, reopen, update,
 *  close) starts: the run is partial instead. */
export const WATCHDOG_WRITE_CUTOFF_SECONDS = 210;
/** main() stops waiting for the run after this many seconds and exits 1 (the job's limit is 5 min). */
export const WATCHDOG_DEADLINE_SECONDS = 240;
/** The watchdog's client: at most this many retries of one request (the tick's client: 4). */
export const WATCHDOG_MAX_RETRIES = 2;
/** The watchdog's client: one attempt is aborted after this many seconds (the tick's: 30). */
export const WATCHDOG_REQUEST_TIMEOUT_SECONDS = 15;
/**
 * The watchdog's client: the largest wait between attempts, a Retry-After or rate-limit reset
 * included (the tick's: 120). A longer one is not waited for: the client throws at once, which
 * makes the read a failed read and the run partial.
 */
export const WATCHDOG_MAX_WAIT_SECONDS = 15;
/** Hidden marker of the watchdog's issue: how a later run finds it again. */
export const WATCHDOG_MARKER = "<!-- omni-queue:watchdog -->";
/** The one stable title: what fired is in the body. */
export const WATCHDOG_TITLE = "omni-queue: the queue is not making progress";
/** An unreadable file's reason is clipped to this many characters (one line). */
const REASON_MAX = 200;

/** Directory of the per-base state files on STATE_BRANCH ("state"). */
const STATE_DIR = stateFilePath("probe").replace(/\/[^/]+$/, "");
const LOGIN_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const SAFE_FILE_RE = /^state\/[A-Za-z0-9._-]+\.json$/;
/** Hidden line of the body: a short hash of the rest of it (what "the body differs" compares). */
const BODY_HASH_PREFIX = "<!-- omni-queue-watchdog:body:";

const fmtTime = (iso) =>
  `${new Date(Date.parse(iso)).toISOString().slice(0, 16).replace("T", " ")}Z`;
const byKey = (key) => (a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0);
/** Whole minutes from `iso` to `nowMs` (floored, as the CLI prints them), or null. */
const wholeMinutes = (iso, nowMs) => {
  const t = Date.parse(iso ?? "");
  return Number.isNaN(t) || Number.isNaN(nowMs) ? null : Math.floor((nowMs - t) / 60_000);
};
/**
 * One line (every run of whitespace, line breaks included, becomes one space), trimmed, clipped
 * to REASON_MAX characters. Every name or reason that reaches the log goes through it: a line
 * break inside a file name could otherwise start a workflow command (`::…`) in the log.
 */
const oneLine = (text) =>
  String(text ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, REASON_MAX);
/** One line, clipped, inside a code span (no markdown, no mention, no link). */
const inert = (text) => `\`${oneLine(String(text ?? "").replace(/`/g, "'"))}\``;
/** What to do about a valid document that is not where its base belongs (see readStates). */
const MISPLACED_ADVICE =
  "If a managed base is stored in this file, its ticks fail until the file is fixed or deleted; " +
  "otherwise the file is stray and can be deleted.";

/** A base (or its file) inside a reason: one line, clipped to 60 characters ("…" when clipped). */
const shortName = (text) => {
  const line = oneLine(text);
  return line.length > 60 ? `${line.slice(0, 60)}…` : line;
};

/** A plain state file name in a code span; anything else through inert(). */
const fileName = (file) => (SAFE_FILE_RE.test(file) ? `\`${file}\`` : inert(file));

/**
 * Which of `states` have had no completed tick for more than `limitMinutes` whole minutes. Pure.
 * Only the bases handed in are judged (a base with no state file has no entry); an entry whose
 * updatedAt cannot be read is not judged. Whole minutes, floored; dashboard.assessHealth compares
 * fractional minutes instead.
 * @param {{states: {base: string, updatedAt: string}[], now: string, limitMinutes?: number}} input
 * @returns {{stale: {base: string, minutes: number}[]}} sorted by base
 */
export function assessStaleness({ states, now, limitMinutes = WATCHDOG_LIMIT_MINUTES }) {
  const nowMs = Date.parse(now);
  const stale = [];
  for (const { base, updatedAt } of states ?? []) {
    const minutes = wholeMinutes(updatedAt, nowMs);
    if (minutes !== null && minutes > limitMinutes) stale.push({ base, minutes });
  }
  stale.sort(byKey("base"));
  return { stale };
}

/**
 * Which of `states` carry a stalled episode the watchdog must report (pure): not delivered
 * (`notified` is not true), opened more than `graceMinutes` whole minutes ago (openedAt, or `since`
 * in an episode written before openedAt existed), on a base that is not an orphan (`work` false
 * and `updatedAt` more than `limitMinutes` old).
 * @param {{states: {base: string, updatedAt?: string, work?: boolean, stalled?: {since: string,
 *          reasons: string[], openedAt?: string, notified?: true}|null}[], now: string,
 *          graceMinutes?: number, limitMinutes?: number}} input
 * @returns {{stalled: {base: string, since: string, openedAt: string, reasons: string[]}[]}}
 */
export function assessStalled({
  states,
  now,
  graceMinutes = WATCHDOG_STALLED_GRACE_MINUTES,
  limitMinutes = WATCHDOG_LIMIT_MINUTES,
}) {
  const nowMs = Date.parse(now);
  const stalled = [];
  for (const { base, updatedAt, work, stalled: episode } of states ?? []) {
    if (!episode || typeof episode !== "object" || episode.notified === true) continue;
    const openedAt = episode.openedAt ?? episode.since;
    const minutes = wholeMinutes(openedAt, nowMs);
    if (minutes === null || minutes <= graceMinutes) continue;
    const age = wholeMinutes(updatedAt, nowMs);
    if (work === false && age !== null && age > limitMinutes) continue; // an orphan
    const reasons = Array.isArray(episode.reasons)
      ? episode.reasons.filter((r) => typeof r === "string")
      : [];
    stalled.push({ base, since: episode.since, openedAt, reasons });
  }
  stalled.sort(byKey("base"));
  return { stalled };
}

/** stateFilePath(base), or null for a name the store refuses (sanitizeBase). */
function pathOf(base) {
  try {
    return stateFilePath(base);
  } catch {
    return null;
  }
}

/**
 * The managed bases' state files ({base, updatedAt, state}); the unreadable ones ({file, reason},
 * plus `misplaced: true` for a valid document that is not where its base belongs): not JSON, a
 * document that fails validateState, a document for a base the queue does not manage (its own
 * file, or a name the store refuses), or one whose base is stored in another file (the base and
 * its file clipped to 60 characters inside the reason, so the reason itself stays readable); the files that could not be fetched
 * ({file, error}: a read failure, which makes the run partial); and, when the read budget ran out
 * before every file was fetched, how far it got ({fetched, total}: partial too).
 */
async function readStates(gh, config, log, { clock, startedMs, budgetSeconds, progress }) {
  const states = [];
  const unreadable = [];
  const fetchErrors = [];
  let budget = null;
  progress.at = "listing the state files";
  const entries = (await gh.listDirectory(STATE_DIR, STATE_BRANCH)).filter(
    (entry) => entry.type === "file" && entry.name.endsWith(".json")
  );
  for (const [index, entry] of entries.entries()) {
    // Past the budget no fetch starts (one already started is bounded by the client's limits,
    // the run by main()'s deadline).
    if (clock() - startedMs > budgetSeconds * 1000) {
      budget = { fetched: index, total: entries.length };
      break;
    }
    progress.at = `fetching state file ${index + 1} of ${entries.length}`;
    let file;
    try {
      file = await gh.getFileContent(entry.path, STATE_BRANCH);
    } catch (error) {
      // A read failure, not a signal: the run is partial (it never closes or rewrites the issue)
      // and fails.
      fetchErrors.push({ file: entry.path, error: error.message });
      log(
        `error: ${oneLine(entry.path)} on ${STATE_BRANCH} could not be fetched ` +
          `(${oneLine(error.message)})`
      );
      continue;
    }
    if (!file) continue;
    let doc;
    try {
      doc = JSON.parse(file.content);
    } catch (error) {
      unreadable.push({ file: entry.path, reason: `not JSON: ${error.message}` });
      continue;
    }
    const errors = validateState(doc);
    if (errors.length) {
      unreadable.push({ file: entry.path, reason: `does not validate: ${errors.join(", ")}` });
      continue;
    }
    // A valid document belongs in the file its base maps to, by the function the store names
    // files with (never by inverting the file name), and only for a base the queue manages.
    // A base whose name the store refuses has no file and is never managed (tick.assertManagedBase
    // refuses it too).
    const { base } = doc;
    const path = pathOf(base);
    if (path === null || (path === entry.path && !isManagedBase(config, base))) {
      unreadable.push({
        file: entry.path,
        reason: `the document is for base ${shortName(base)}, which the queue does not manage`,
        misplaced: true,
      });
      continue;
    }
    if (path !== entry.path) {
      unreadable.push({
        file: entry.path,
        reason: `the document is for base ${shortName(base)}, which is stored in ${shortName(path)}`,
        misplaced: true,
      });
      continue;
    }
    states.push({ base, updatedAt: doc.updatedAt, state: doc });
  }
  unreadable.sort(byKey("file"));
  return { states, unreadable, fetchErrors, budget };
}

/**
 * The bases targeted by open PRs that carry the queue label (as tick.discoverBases reads them,
 * drafts included), or the error that kept them from being listed.
 * @returns {Promise<{bases: Set<string>, error: string|null}>}
 */
async function labeledBases(gh, config) {
  try {
    const bases = new Set();
    for (const pull of await gh.listOpenPulls()) {
      if ((pull.labels ?? []).includes(config.label)) bases.add(pull.baseRef);
    }
    return { bases, error: null };
  } catch (error) {
    return { bases: new Set(), error: error.message };
  }
}

/**
 * The watchdog's issues, raw: the open ones with the label, plus the closed ones updated in the
 * last WATCHDOG_REOPEN_HOURS (`since`), never the whole history of the label. Title + marker.
 */
async function watchdogIssues(gh, now) {
  const path = `/repos/${gh.owner}/${gh.repo}/issues`;
  const since = new Date(Date.parse(now) - WATCHDOG_REOPEN_HOURS * 3_600_000).toISOString();
  const ours = (i) =>
    !i?.pull_request &&
    i.title === WATCHDOG_TITLE &&
    String(i.body ?? "").includes(WATCHDOG_MARKER);
  const open = (await gh.paginate(path, { state: "open", labels: DASHBOARD_LABEL })).filter(ours);
  const closed = (
    await gh.paginate(path, { state: "closed", labels: DASHBOARD_LABEL, since })
  ).filter(ours);
  return { open: open.sort((a, b) => a.number - b.number), closed };
}

/** What fired (lines, absolute times only): the same signals give the same lines. */
function describe({ stale, stalled, unreadable, saved, limitMinutes, graceMinutes }) {
  const out = [];
  if (stale.length) {
    out.push(
      `**No state saved for more than ${limitMinutes} minutes** on these bases, while ticks ` +
        "should be visiting them:",
      "",
      "| Base | Last state save |",
      "| --- | --- |",
      ...stale.map((s) => `| \`${s.base}\` | ${fmtTime(saved.get(s.base))} |`),
      ""
    );
  }
  for (const s of stalled) {
    out.push(
      `**The queue of \`${s.base}\` has reported itself stalled since ${fmtTime(s.since)}**; ` +
        `the episode opened at ${fmtTime(s.openedAt)} and its comment on the dashboard issue ` +
        `has not been posted for more than ${graceMinutes} minutes:`,
      "",
      ...(s.reasons.length ? s.reasons.map((r) => `- ${r}`) : ["- (no reason recorded)"]),
      ""
    );
  }
  if (unreadable.length) {
    out.push(
      "**Unreadable state files**:",
      "",
      ...unreadable.map(
        (u) =>
          `- ${fileName(u.file)}: ${inert(u.reason)}${u.misplaced ? `. ${MISPLACED_ADVICE}` : ""}`
      ),
      ""
    );
  }
  return out;
}

const HOW_TO_CHECK =
  "Check, in order: the latest `omni-queue` runs in the Actions tab, the `OMNI_QUEUE_ENABLED` " +
  "variable, the `omni-queue` environment (its secrets and its deployment branch), a tick that " +
  "fails on every run, and the dashboard issue of each base named above " +
  '(docs/ops/OMNI_QUEUE.md, Incidents, "Dashboard stopped updating").';

function mentionLine(config) {
  const mentions = (config.approvers ?? [])
    .filter((a) => LOGIN_RE.test(String(a)))
    .map((a) => `@${a}`)
    .join(" ");
  return `${mentions ? `${mentions}: ` : ""}the omni-queue is not making progress.`;
}

function issueBody(input, mention = mentionLine(input.config)) {
  const body = [
    WATCHDOG_MARKER,
    mention,
    "",
    ...describe(input),
    HOW_TO_CHECK,
    "",
    "Opened by `.github/workflows/omni-queue-watchdog.yml`, which checks every 30 minutes, keeps " +
      "this one issue up to date while the condition lasts, closes it once the queue makes " +
      `progress again, and reopens it if the queue stops again within ${WATCHDOG_REOPEN_HOURS} ` +
      "hours.",
  ].join("\n");
  return `${body}\n${hashLine(body)}`;
}

/** The hash line of a body rendered without it: 12 hex of its sha256. */
function hashLine(body) {
  return `${BODY_HASH_PREFIX}${createHash("sha256").update(body).digest("hex").slice(0, 12)} -->`;
}

/**
 * Does the stored body already say what `rendered` says? Compared by the hash line, never as
 * text: GitHub may hand a body back with other line endings or trailing whitespace.
 */
const sameBody = (stored, rendered) => {
  const line = rendered.split("\n").at(-1);
  return normalized(stored)
    .split("\n")
    .some((l) => l.trim() === line);
};

const normalized = (body) => String(body ?? "").replace(/\r\n/g, "\n");

/**
 * The mention line of a stored watchdog body (the line after the marker), so an update never
 * changes who is mentioned; null when the stored body does not have that shape.
 */
function storedMention(body) {
  const lines = normalized(body).split("\n");
  return lines[0] === WATCHDOG_MARKER && lines.length > 1 ? lines[1] : null;
}

/**
 * One watchdog run: judge the bases, then open, update, reopen or close the one issue. A partial
 * run (the labeled-PR listing failed, a state file could not be fetched, or the read budget ran
 * out before every state file was fetched) may open or reopen the issue for what it established,
 * but never closes it and never rewrites an open issue's body; main() then exits 1.
 * `clock` (milliseconds) measures the read budget and the write cut-off from the start of the
 * run. Past the cut-off, or once `progress.stopped` is set (main()'s deadline fired), no write
 * sequence starts: the run is partial (`cutoffError`). `progress.at` says where the run is.
 * @param {{gh: object, config: import("./config.mjs").QueueConfig, now: string,
 *          log?: (message: string) => void, limitMinutes?: number, graceMinutes?: number,
 *          clock?: () => number, readBudgetSeconds?: number, writeCutoffSeconds?: number,
 *          progress?: {at?: string, stopped?: boolean}}} input
 * @returns {Promise<{stale: {base: string, minutes: number}[],
 *                    stalled: {base: string, since: string, openedAt: string,
 *                              reasons: string[]}[],
 *                    unreadable: {file: string, reason: string, misplaced?: true}[],
 *                    listingError: string|null,
 *                    fetchErrors: {file: string, error: string}[],
 *                    budgetError: string|null,
 *                    cutoffError: string|null,
 *                    partial: boolean,
 *                    issue: {action: "opened"|"reused"|"updated"|"reopened"|"closed"|"none",
 *                            number: number|null}}>}
 */
export async function runWatchdog(input) {
  const {
    gh,
    config,
    now,
    log = () => {},
    limitMinutes = WATCHDOG_LIMIT_MINUTES,
    graceMinutes = WATCHDOG_STALLED_GRACE_MINUTES,
    clock = () => Date.now(),
    readBudgetSeconds = WATCHDOG_READ_BUDGET_SECONDS,
    writeCutoffSeconds = WATCHDOG_WRITE_CUTOFF_SECONDS,
    progress = {},
  } = input;
  const startedMs = clock();
  const { states, unreadable, fetchErrors, budget } = await readStates(gh, config, log, {
    clock,
    startedMs,
    budgetSeconds: readBudgetSeconds,
    progress,
  });
  const budgetError = budget
    ? `read budget exhausted after ${budget.fetched} of ${budget.total} state files ` +
      `(${readBudgetSeconds} s): the files after them were not judged`
    : null;
  if (budgetError) log(`error: ${budgetError}`);
  progress.at = "listing the labeled PRs";
  const labeled = states.length
    ? await labeledBases(gh, config)
    : { bases: new Set(), error: null };
  const listingError = labeled.error
    ? `could not list the open PRs labeled ${config.label} (${oneLine(labeled.error)}): a base ` +
      "whose only work is labeled PRs was not judged"
    : null;
  if (listingError) log(`error: ${listingError}`);
  // A run that could not read everything is partial: it may open or reopen the issue for what it
  // established, never close it, comment its closing or rewrite an open issue's body.
  let partial = Boolean(listingError) || fetchErrors.length > 0 || Boolean(budgetError);
  let cutoffError = null;
  const judged = states.map((s) => ({
    base: s.base,
    updatedAt: s.updatedAt,
    work: hasQueueWork(s.state, labeled.bases.has(s.base)),
    stalled: s.state.stalled ?? null,
  }));
  const { stale } = assessStaleness({
    states: judged.filter((s) => s.work),
    now,
    limitMinutes,
  });
  const { stalled } = assessStalled({ states: judged, now, graceMinutes, limitMinutes });
  const fired = [
    ...stale.map((s) => `${s.base}: no state saved for ${s.minutes} min`),
    ...stalled.map((s) => `${s.base}: stalled since ${fmtTime(s.since)}, not delivered`),
    ...unreadable.map((u) => `${oneLine(u.file)}: unreadable`),
  ].join(", ");
  const result = (action, number) => ({
    stale,
    stalled,
    unreadable,
    listingError,
    fetchErrors,
    budgetError,
    cutoffError,
    partial,
    issue: { action, number },
  });
  /**
   * May the write sequence that would `verb` the issue start? Not past the cut-off, nor once
   * main()'s deadline has stopped the run: the run is then partial and says so.
   */
  const mayWrite = (verb) => {
    if (!progress.stopped && clock() - startedMs <= writeCutoffSeconds * 1000) {
      progress.at = `writing the issue (${verb})`;
      return true;
    }
    partial = true;
    const why = progress.stopped
      ? "the run was stopped by its deadline"
      : `write cut-off of ${writeCutoffSeconds} s passed`;
    cutoffError = `${why}: the issue was not ${verb}; the next run tries again`;
    log(`error: ${cutoffError}`);
    return false;
  };

  progress.at = "searching the watchdog issue";
  const issues = await watchdogIssues(gh, now);
  const [open] = issues.open;
  const what = {
    stale,
    stalled,
    unreadable,
    saved: new Map(states.map((s) => [s.base, s.updatedAt])),
    limitMinutes,
    graceMinutes,
    config,
  };

  if (fired) {
    if (open) {
      const body = issueBody(what, storedMention(open.body) ?? undefined);
      if (partial || sameBody(open.body, body) || !mayWrite("updated")) {
        log(`${fired}; issue #${open.number} ${partial ? "kept (partial run)" : "unchanged"}`);
        return result("reused", open.number);
      }
      await gh.updateIssue(open.number, { body });
      log(`${fired}; issue #${open.number} updated`);
      return result("updated", open.number);
    }
    const nowMs = Date.parse(now);
    const recent = issues.closed
      .filter((i) => {
        const closed = Date.parse(i.closed_at ?? "");
        return !Number.isNaN(closed) && nowMs - closed <= WATCHDOG_REOPEN_HOURS * 3_600_000;
      })
      .sort((a, b) => b.number - a.number)[0];
    if (!mayWrite(recent ? "reopened" : "created")) {
      log(`${fired}; no issue written (partial run)`);
      return result("none", null);
    }
    if (recent) {
      await gh.createIssueComment(
        recent.number,
        [
          `Reopened (checked ${fmtTime(now)}): the omni-queue stopped making progress again.`,
          "",
          ...describe(what),
        ]
          .join("\n")
          .trimEnd()
      );
      await gh.updateIssue(recent.number, {
        state: "open",
        body: issueBody(what, storedMention(recent.body) ?? undefined),
      });
      log(`${fired}; issue #${recent.number} reopened`);
      return result("reopened", recent.number);
    }
    const { number } = await gh.createIssue({
      title: WATCHDOG_TITLE,
      body: issueBody(what),
      labels: [DASHBOARD_LABEL],
    });
    log(`${fired}; issue #${number} opened`);
    return result("opened", number);
  }
  if (open && partial) {
    log(`nothing fires in a partial run; issue #${open.number} kept open`);
    return result("reused", open.number);
  }
  if (open && !mayWrite("closed")) {
    log(`nothing fires; issue #${open.number} kept open (partial run)`);
    return result("reused", open.number);
  }
  if (open) {
    await gh.createIssueComment(
      open.number,
      `No base with queue work has gone more than ${limitMinutes} minutes without a saved state, ` +
        "no undelivered stalled episode is waiting and every state file reads " +
        `(checked ${fmtTime(now)}). Closing.`
    );
    await gh.updateIssue(open.number, { state: "closed", state_reason: "completed" });
    log(`nothing fires; issue #${open.number} closed`);
    return result("closed", open.number);
  }
  log("nothing fires");
  return result("none", null);
}

/** The deadline timer: a real, unref()ed timeout (it never keeps the process alive by itself). */
const DEADLINE_TIMER = {
  set: (fn, ms) => {
    const handle = setTimeout(fn, ms);
    handle.unref?.();
    return handle;
  },
  clear: (handle) => clearTimeout(handle),
};

/**
 * CLI entry: env GITHUB_TOKEN, GITHUB_REPOSITORY (and GITHUB_API_URL, OMNI_QUEUE_CONFIG). Returns
 * the exit code; it never calls process.exit itself. The run races a timer of
 * WATCHDOG_DEADLINE_SECONDS: when the timer wins, one error line and 1 (the run is left pending;
 * the CLI entry below exits). Every line it prints is one line: an error thrown out of the run is
 * printed as its message, one line, clipped (no stack trace). Injected for tests: `clock`
 * (milliseconds, the budget and the cut-off), `timer` ({set, clear}), `createClient`.
 */
export async function main(
  env = process.env,
  { clock = () => Date.now(), timer = DEADLINE_TIMER, createClient = createGitHubClient } = {}
) {
  const token = env.GITHUB_TOKEN;
  const redact = (text) => (token ? String(text).split(token).join("***") : String(text));
  // The parts that come from outside (file names, reasons, error messages) are already one line
  // and clipped (oneLine); this flattens any line break left, so no line of the log can start a
  // workflow command.
  const flat = (text) => redact(text).replace(/[\r\n]+/g, " ");
  /** A name or an error message: redacted first, then one line and clipped. */
  const clip = (text) => oneLine(redact(text));
  const fail = (message) => {
    console.error(`omni-queue watchdog: ${flat(message)}`);
    return 1;
  };
  if (!token) return fail("GITHUB_TOKEN is not set");
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(env.GITHUB_REPOSITORY ?? "")) {
    return fail("GITHUB_REPOSITORY must be owner/repo");
  }
  try {
    const config = loadConfig(
      env.OMNI_QUEUE_CONFIG ? resolve(env.OMNI_QUEUE_CONFIG) : DEFAULT_CONFIG_PATH
    );
    const log = (message) => console.log(`omni-queue watchdog: ${flat(message)}`);
    // The watchdog's own short limits (the tick's client and the shared defaults are not touched).
    const gh = createClient({
      token,
      repository: env.GITHUB_REPOSITORY,
      apiUrl: env.GITHUB_API_URL || undefined,
      log,
      maxRetries: WATCHDOG_MAX_RETRIES,
      requestTimeoutMs: WATCHDOG_REQUEST_TIMEOUT_SECONDS * 1000,
      maxDelayMs: WATCHDOG_MAX_WAIT_SECONDS * 1000,
    });
    const progress = { at: "starting", stopped: false };
    const run = runWatchdog({ gh, config, now: new Date().toISOString(), log, clock, progress });
    run.catch(() => {}); // a rejection after the deadline won is not unhandled
    // A deadline that fires during a write can leave what the job's own kill could already
    // leave (a comment without its state change); the next run finds the issue by title and marker.
    let handle;
    const deadline = new Promise((resolveDeadline) => {
      handle = timer.set(() => resolveDeadline(DEADLINE_HIT), WATCHDOG_DEADLINE_SECONDS * 1000);
    });
    let result;
    try {
      result = await Promise.race([run, deadline]);
    } finally {
      timer.clear(handle);
    }
    if (result === DEADLINE_HIT) {
      progress.stopped = true;
      return fail(
        `deadline of ${WATCHDOG_DEADLINE_SECONDS} s reached: the run was stopped ` +
          `(while ${progress.at})`
      );
    }
    // Judged what it could and handled its issue: a partial run still fails, one line per read.
    for (const { file, error } of result.fetchErrors) {
      fail(
        `could not fetch ${clip(file)} from ${STATE_BRANCH} (${clip(error)}): ` +
          "the run is partial"
      );
    }
    if (result.listingError) fail(result.listingError);
    if (result.budgetError) fail(result.budgetError);
    if (result.cutoffError) fail(result.cutoffError);
    return result.partial ? 1 : 0;
  } catch (error) {
    // The listing of the state files or the issue search failed (nothing was written), the config
    // did not load, or a write failed: then part of its sequence may have landed (a comment posted
    // without its state change), which the next run finds by title and marker. One line, the
    // message only.
    return fail(clip(error?.message ?? error));
  }
}

/** What the deadline's promise resolves with: never a result of the run. */
const DEADLINE_HIT = Symbol("deadline");

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  // process.exit: a run stopped by the deadline leaves retry sleeps and sockets pending, which
  // would otherwise keep the process alive until the job's own limit kills it.
  main().then((code) => process.exit(code));
}
