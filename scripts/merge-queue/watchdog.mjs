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
//   - unreadable state: a state file that is not JSON, or that does not pass
//     contracts.validateState. Every tick of such a base fails before it can record anything.
// Then it keeps ONE issue (title WATCHDOG_TITLE, label contracts.DASHBOARD_LABEL, found again by
// that title and the hidden WATCHDOG_MARKER). Its body is rendered from the signals with absolute
// times only, so the same signals render the same body. Created when a signal fires and none is
// open (the approvers are mentioned then); while it is open, its body is updated in place when the
// signals change (no comment; the mention line stays as it was); closed with a comment once no
// signal fires; reopened with a comment (no mention) and the current body when one fires again
// within WATCHDOG_REOPEN_HOURS of its closing. It never writes the state and never writes to a pull
// request. A failed listing of the labeled PRs is not silent: the run judges what it can, handles
// its issue, then exits 1.

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
/** Hidden marker of the watchdog's issue: how a later run finds it again. */
export const WATCHDOG_MARKER = "<!-- omni-queue:watchdog -->";
/** The one stable title: what fired is in the body. */
export const WATCHDOG_TITLE = "omni-queue: the queue is not making progress";
/** An unreadable file's reason is clipped to this many characters (one line). */
const REASON_MAX = 200;

/** Directory of the per-base state files on STATE_BRANCH ("state"). */
const STATE_DIR = stateFilePath("probe").replace(/\/[^/]+$/, "");
const LOGIN_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;

const fmtTime = (iso) =>
  `${new Date(Date.parse(iso)).toISOString().slice(0, 16).replace("T", " ")}Z`;
const byKey = (key) => (a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0);
/** Whole minutes from `iso` to `nowMs` (floored, as the CLI prints them), or null. */
const wholeMinutes = (iso, nowMs) => {
  const t = Date.parse(iso ?? "");
  return Number.isNaN(t) || Number.isNaN(nowMs) ? null : Math.floor((nowMs - t) / 60_000);
};
/** One line, clipped, inside a code span (no markdown, no mention, no link). */
const inert = (text) =>
  `\`${String(text ?? "")
    .replace(/\s+/g, " ")
    .replace(/`/g, "'")
    .trim()
    .slice(0, REASON_MAX)}\``;

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

/**
 * The managed bases' state files ({base, updatedAt, state}) and the unreadable ones ({file,
 * reason}): not JSON, or a document that fails validateState when it is a managed base's own file
 * or names no base at all. A file of another base (unmanaged, or not at its base's path) is not
 * the queue's and is skipped. A file that cannot be fetched is logged and skipped.
 */
async function readStates(gh, config, log) {
  const states = [];
  const unreadable = [];
  for (const entry of await gh.listDirectory(STATE_DIR, STATE_BRANCH)) {
    if (entry.type !== "file" || !entry.name.endsWith(".json")) continue;
    let file;
    try {
      file = await gh.getFileContent(entry.path, STATE_BRANCH);
    } catch (error) {
      log(
        `warning: ${entry.path} on ${STATE_BRANCH} could not be read (${error.message}); skipped`
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
    const base = doc?.base;
    const named = typeof base === "string";
    // The file must be the one this base maps to: a stray file cannot impersonate another base.
    if (named && (!isManagedBase(config, base) || stateFilePath(base) !== entry.path)) continue;
    const errors = validateState(doc);
    if (errors.length) {
      unreadable.push({ file: entry.path, reason: `does not validate: ${errors.join(", ")}` });
      continue;
    }
    states.push({ base, updatedAt: doc.updatedAt, state: doc });
  }
  unreadable.sort(byKey("file"));
  return { states, unreadable };
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
      "**Unreadable state files**: every tick of such a base fails before it can record " +
        "anything:",
      "",
      ...unreadable.map((u) => `- \`${u.file}\`: ${inert(u.reason)}`),
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
  return [
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
}

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
 * One watchdog run: judge the bases, then open, update, reopen or close the one issue.
 * @param {{gh: object, config: import("./config.mjs").QueueConfig, now: string,
 *          log?: (message: string) => void, limitMinutes?: number, graceMinutes?: number}} input
 * @returns {Promise<{stale: {base: string, minutes: number}[],
 *                    stalled: {base: string, since: string, openedAt: string,
 *                              reasons: string[]}[],
 *                    unreadable: {file: string, reason: string}[],
 *                    listingError: string|null,
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
  } = input;
  const { states, unreadable } = await readStates(gh, config, log);
  const labeled = states.length
    ? await labeledBases(gh, config)
    : { bases: new Set(), error: null };
  const listingError = labeled.error
    ? `could not list the open PRs labeled ${config.label} (${labeled.error}): a base whose only ` +
      "work is labeled PRs was not judged"
    : null;
  if (listingError) log(`error: ${listingError}`);
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
    ...unreadable.map((u) => `${u.file}: unreadable`),
  ].join(", ");
  const result = (action, number) => ({
    stale,
    stalled,
    unreadable,
    listingError,
    issue: { action, number },
  });

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
      if (normalized(open.body) === body) {
        log(`${fired}; issue #${open.number} unchanged`);
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

/** CLI entry: env GITHUB_TOKEN, GITHUB_REPOSITORY (and GITHUB_API_URL, OMNI_QUEUE_CONFIG). */
export async function main(env = process.env) {
  const token = env.GITHUB_TOKEN;
  const redact = (text) => (token ? String(text).split(token).join("***") : String(text));
  const fail = (message) => {
    console.error(`omni-queue watchdog: ${redact(message)}`);
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
    const log = (message) => console.log(`omni-queue watchdog: ${redact(message)}`);
    const gh = createGitHubClient({
      token,
      repository: env.GITHUB_REPOSITORY,
      apiUrl: env.GITHUB_API_URL || undefined,
      log,
    });
    const result = await runWatchdog({ gh, config, now: new Date().toISOString(), log });
    // Judged what it could and handled its issue: a failed listing still fails the run.
    if (result.listingError) return fail(result.listingError);
    return 0;
  } catch (error) {
    return fail(error.stack || error.message);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().then((code) => {
    process.exitCode = code;
  });
}
