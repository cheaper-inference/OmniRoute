#!/usr/bin/env node
// scripts/merge-queue/watchdog.mjs — the queue's dead-man switch, run by
// .github/workflows/omni-queue-watchdog.yml every 30 minutes with the workflow's default token
// (contents: read, issues: write, pull-requests: read), outside the queue's own workflow,
// environment and App: it still runs when a tick dies before its first step (the App token cannot
// be minted, the App was uninstalled, the environment refuses the run, the workflow file is
// broken).
//
// It reads the per-base state files on contracts.STATE_BRANCH and reports two signals:
//   - no state saved: a base with work whose state is older than WATCHDOG_LIMIT_MINUTES. A tick
//     that visits a base saves its state at least once per hour (tick.STATE_HEARTBEAT_MINUTES),
//     and ticks visit a base that has a candidate in flight, a pause, or open PRs carrying the
//     queue label (listed with their base: a labeled PR is work only for the base it targets, and
//     only when that base has a state file). An idle base is never visited, so its age means
//     nothing: a finished release keeps its old state file for ever, and is never reported;
//   - stalled: a base whose state has carried `stalled` (the queue's own verdict,
//     dashboard.assessHealth) for more than WATCHDOG_STALLED_GRACE_MINUTES, whether its comment
//     was delivered or not. A queue whose every tick fails still saves (main()'s failure path),
//     so its state is fresh; this signal is the one that sees it.
// Then it keeps ONE issue (title WATCHDOG_TITLE, label contracts.DASHBOARD_LABEL, found again by
// that title and the hidden WATCHDOG_MARKER): created when a signal fires and none is open (the
// approvers are mentioned then), reused while the condition lasts (no write), closed with a
// comment once no signal fires, and reopened with a comment (no mention) when one fires again
// within WATCHDOG_REOPEN_HOURS of its closing. It never writes the state and never touches a pull
// request.

import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { DEFAULT_CONFIG_PATH, isManagedBase, loadConfig } from "./config.mjs";
import { DASHBOARD_LABEL, STATE_BRANCH, stateFilePath } from "./contracts.mjs";
import { createGitHubClient } from "./github.mjs";

/** No state saved for more than this many whole minutes (exclusive), on a base with work. */
export const WATCHDOG_LIMIT_MINUTES = 90;
/** A state carrying `stalled` for more than this many whole minutes (exclusive): reported. */
export const WATCHDOG_STALLED_GRACE_MINUTES = 30;
/** A closed watchdog issue is reopened, not recreated, when a signal fires within this. */
export const WATCHDOG_REOPEN_HOURS = 24;
/** Hidden marker of the watchdog's issue: how a later run finds it again. */
export const WATCHDOG_MARKER = "<!-- omni-queue:watchdog -->";
/** The one stable title: what fired, the minutes and the reasons are in the body and comments. */
export const WATCHDOG_TITLE = "omni-queue: the queue is not making progress";

/** Directory of the per-base state files on STATE_BRANCH ("state"). */
const STATE_DIR = stateFilePath("probe").replace(/\/[^/]+$/, "");
const LOGIN_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;

const fmtTime = (iso) =>
  `${new Date(Date.parse(iso)).toISOString().slice(0, 16).replace("T", " ")}Z`;
const byBase = (a, b) => (a.base < b.base ? -1 : a.base > b.base ? 1 : 0);
/** Whole minutes from `iso` to `nowMs` (floored, as printed), or null when unreadable. */
const wholeMinutes = (iso, nowMs) => {
  const t = Date.parse(iso ?? "");
  return Number.isNaN(t) || Number.isNaN(nowMs) ? null : Math.floor((nowMs - t) / 60_000);
};

/**
 * Which of `states` have had no completed tick for more than `limitMinutes` whole minutes. Pure.
 * Only the bases handed in are judged (a base with no state file has no entry); an entry whose
 * updatedAt cannot be read is not judged. Whole minutes, floored (the minutes the issue prints);
 * dashboard.assessHealth compares fractional minutes instead.
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
  stale.sort(byBase);
  return { stale };
}

/**
 * Which of `states` have carried a stalled episode for more than `graceMinutes` whole minutes
 * (from the episode's openedAt, or its `since` in an episode written before openedAt existed).
 * Pure. `notified` is not read: a delivered alert nobody acted on is still a stalled queue.
 * @param {{states: {base: string, stalled?: {since: string, reasons: string[],
 *          openedAt?: string}}[], now: string, graceMinutes?: number}} input
 * @returns {{stalled: {base: string, since: string, reasons: string[], minutes: number}[]}}
 */
export function assessStalled({ states, now, graceMinutes = WATCHDOG_STALLED_GRACE_MINUTES }) {
  const nowMs = Date.parse(now);
  const stalled = [];
  for (const { base, stalled: episode } of states ?? []) {
    if (!episode || typeof episode !== "object") continue;
    const minutes = wholeMinutes(episode.openedAt ?? episode.since, nowMs);
    if (minutes === null || minutes <= graceMinutes) continue;
    const reasons = Array.isArray(episode.reasons)
      ? episode.reasons.filter((r) => typeof r === "string")
      : [];
    stalled.push({ base, since: episode.since, reasons, minutes });
  }
  stalled.sort(byBase);
  return { stalled };
}

/** Managed bases' state files: {base, updatedAt, work, stalled}. Unreadable files: skipped. */
async function readStates(gh, config, log) {
  const states = [];
  for (const entry of await gh.listDirectory(STATE_DIR, STATE_BRANCH)) {
    if (entry.type !== "file" || !entry.name.endsWith(".json")) continue;
    let doc;
    try {
      const file = await gh.getFileContent(entry.path, STATE_BRANCH);
      if (!file) continue;
      doc = JSON.parse(file.content);
    } catch (error) {
      log(`warning: ${entry.path} on ${STATE_BRANCH} is unreadable (${error.message}); skipped`);
      continue;
    }
    const base = doc?.base;
    // The file must be the one this base maps to: a stray file cannot impersonate another base.
    if (typeof base !== "string" || !isManagedBase(config, base)) continue;
    if (stateFilePath(base) !== entry.path) continue;
    if (Number.isNaN(Date.parse(doc.updatedAt ?? ""))) {
      log(`warning: ${entry.path} has no readable updatedAt; skipped`);
      continue;
    }
    states.push({
      base,
      updatedAt: doc.updatedAt,
      work: Boolean(doc.inFlight || doc.paused),
      stalled: doc.stalled ?? null,
    });
  }
  return states;
}

/**
 * The bases targeted by open PRs that carry the queue label (as tick.discoverBases reads them);
 * an empty set when they cannot be listed (logged).
 */
async function labeledBases(gh, config, log) {
  try {
    const bases = new Set();
    for (const pull of await gh.listOpenPulls()) {
      if ((pull.labels ?? []).includes(config.label)) bases.add(pull.baseRef);
    }
    return bases;
  } catch (error) {
    log(`warning: could not list the open PRs labeled ${config.label} (${error.message})`);
    return new Set();
  }
}

/** The watchdog's issues (open and closed), raw, newest first: title + marker + label. */
async function watchdogIssues(gh) {
  const items = await gh.paginate(`/repos/${gh.owner}/${gh.repo}/issues`, {
    state: "all",
    labels: DASHBOARD_LABEL,
  });
  return items
    .filter(
      (i) =>
        !i?.pull_request &&
        i.title === WATCHDOG_TITLE &&
        String(i.body ?? "").includes(WATCHDOG_MARKER)
    )
    .sort((a, b) => b.number - a.number);
}

/** What fired, for the issue body and the reopen comment (lines). */
function describe({ stale, stalled, states, limitMinutes, graceMinutes }) {
  const saved = new Map(states.map((s) => [s.base, s.updatedAt]));
  const out = [];
  if (stale.length) {
    out.push(
      `**No state saved for more than ${limitMinutes} minutes** on these bases, while ticks ` +
        "should be visiting them:",
      "",
      "| Base | Last state save | Minutes |",
      "| --- | --- | --- |",
      ...stale.map((s) => `| \`${s.base}\` | ${fmtTime(saved.get(s.base))} | ${s.minutes} |`),
      ""
    );
  }
  for (const s of stalled) {
    out.push(
      `**The queue of \`${s.base}\` has reported itself stalled since ${fmtTime(s.since)}** ` +
        `(for more than ${graceMinutes} minutes):`,
      "",
      ...(s.reasons.length ? s.reasons.map((r) => `- ${r}`) : ["- (no reason recorded)"]),
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

function issueBody(input) {
  const mentions = (input.config.approvers ?? [])
    .filter((a) => LOGIN_RE.test(String(a)))
    .map((a) => `@${a}`)
    .join(" ");
  return [
    WATCHDOG_MARKER,
    `${mentions ? `${mentions}: ` : ""}the omni-queue is not making progress.`,
    "",
    ...describe(input),
    HOW_TO_CHECK,
    "",
    "Opened by `.github/workflows/omni-queue-watchdog.yml`, which checks every 30 minutes, keeps " +
      "this one issue while the condition lasts, closes it once the queue makes progress again, " +
      `and reopens it if the queue stops again within ${WATCHDOG_REOPEN_HOURS} hours.`,
  ].join("\n");
}

/**
 * One watchdog run: judge the bases, then open, reuse, reopen or close the one issue.
 * @param {{gh: object, config: import("./config.mjs").QueueConfig, now: string,
 *          log?: (message: string) => void, limitMinutes?: number, graceMinutes?: number}} input
 * @returns {Promise<{stale: {base: string, minutes: number}[],
 *                    stalled: {base: string, since: string, reasons: string[], minutes: number}[],
 *                    issue: {action: "opened"|"reused"|"reopened"|"closed"|"none",
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
  const states = await readStates(gh, config, log);
  const labeled = states.length ? await labeledBases(gh, config, log) : new Set();
  const judged = states.filter((s) => s.work || labeled.has(s.base));
  const { stale } = assessStaleness({
    states: judged.map(({ base, updatedAt }) => ({ base, updatedAt })),
    now,
    limitMinutes,
  });
  const { stalled } = assessStalled({ states, now, graceMinutes });
  const fired = [
    ...stale.map((s) => `${s.base}: no state saved for ${s.minutes} min`),
    ...stalled.map((s) => `${s.base}: stalled since ${fmtTime(s.since)}`),
  ].join(", ");

  const issues = await watchdogIssues(gh);
  const open = issues.filter((i) => i.state === "open").sort((a, b) => a.number - b.number)[0];
  const result = (action, number) => ({ stale, stalled, issue: { action, number } });

  if (stale.length || stalled.length) {
    if (open) {
      log(`${fired}; issue #${open.number} reused`);
      return result("reused", open.number);
    }
    const nowMs = Date.parse(now);
    const recent = issues.find((i) => {
      const closed = Date.parse(i.closed_at ?? "");
      return (
        i.state === "closed" &&
        !Number.isNaN(closed) &&
        nowMs - closed <= WATCHDOG_REOPEN_HOURS * 3_600_000
      );
    });
    const what = { stale, stalled, states, limitMinutes, graceMinutes };
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
      await gh.updateIssue(recent.number, { state: "open" });
      log(`${fired}; issue #${recent.number} reopened`);
      return result("reopened", recent.number);
    }
    const { number } = await gh.createIssue({
      title: WATCHDOG_TITLE,
      body: issueBody({ ...what, config }),
      labels: [DASHBOARD_LABEL],
    });
    log(`${fired}; issue #${number} opened`);
    return result("opened", number);
  }
  if (open) {
    await gh.createIssueComment(
      open.number,
      `No base with queue work has gone more than ${limitMinutes} minutes without a saved state, ` +
        `and no base reports itself stalled (checked ${fmtTime(now)}). Closing.`
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
    await runWatchdog({ gh, config, now: new Date().toISOString(), log });
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
