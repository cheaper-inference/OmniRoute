#!/usr/bin/env node
// scripts/merge-queue/watchdog.mjs — the queue's dead-man switch, run by
// .github/workflows/omni-queue-watchdog.yml every 30 minutes with the workflow's default token
// (contents: read, issues: write), outside the queue's own workflow, environment and App: it
// still runs when a tick dies before its first step (the App token cannot be minted, the App was
// uninstalled, the environment refuses the run, the workflow file is broken).
//
// It reads the per-base state files on contracts.STATE_BRANCH and their `updatedAt`. A tick that
// visits a base saves its state at least once per hour (tick.STATE_HEARTBEAT_MINUTES), and ticks
// visit a base that has a candidate in flight, a pause, or labeled PRs. So:
//   - a base with work in its state (in flight or paused) whose state is older than
//     WATCHDOG_LIMIT_MINUTES has had no completed tick for that long;
//   - while open PRs carry the queue label, at least one base is visited on every tick, so when
//     even the freshest managed state is older than the limit, no tick has completed anywhere
//     (the label's PR is read through the Issues API, the only PR read the token has: its base
//     is not known, hence the freshest state);
//   - an idle base is never visited, so its age means nothing: a finished release keeps its old
//     state file for ever, and is never reported.
// Then it opens ONE issue (title `omni-queue: no tick completed for <N> minutes`, label
// contracts.DASHBOARD_LABEL, found again by the hidden WATCHDOG_MARKER, never by its title, whose
// number grows), reuses it while the condition lasts (no write), and closes it with a comment
// once no base is stale. It never writes the state and never touches a pull request.

import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { DEFAULT_CONFIG_PATH, isManagedBase, loadConfig } from "./config.mjs";
import { DASHBOARD_LABEL, STATE_BRANCH, stateFilePath } from "./contracts.mjs";
import { createGitHubClient } from "./github.mjs";

/** No completed tick for more than this many whole minutes (exclusive): reported. */
export const WATCHDOG_LIMIT_MINUTES = 90;
/** Hidden marker of the watchdog's issue: how a later run finds it again. */
export const WATCHDOG_MARKER = "<!-- omni-queue:watchdog -->";
export const WATCHDOG_TITLE_PREFIX = "omni-queue: no tick completed for ";

export function watchdogTitle(minutes) {
  return `${WATCHDOG_TITLE_PREFIX}${minutes} minutes`;
}

/** Directory of the per-base state files on STATE_BRANCH ("state"). */
const STATE_DIR = stateFilePath("probe").replace(/\/[^/]+$/, "");
const LOGIN_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;

const fmtTime = (iso) =>
  `${new Date(Date.parse(iso)).toISOString().slice(0, 16).replace("T", " ")}Z`;

/**
 * Which of `states` have had no completed tick for more than `limitMinutes` whole minutes. Pure.
 * Only the bases handed in are judged (a base with no state file has no entry); an entry whose
 * updatedAt cannot be read is not judged.
 * @param {{states: {base: string, updatedAt: string}[], now: string, limitMinutes?: number}} input
 * @returns {{stale: {base: string, minutes: number}[]}} sorted by base
 */
export function assessStaleness({ states, now, limitMinutes = WATCHDOG_LIMIT_MINUTES }) {
  const nowMs = Date.parse(now);
  const stale = [];
  for (const { base, updatedAt } of states ?? []) {
    const t = Date.parse(updatedAt ?? "");
    if (Number.isNaN(t) || Number.isNaN(nowMs)) continue;
    const minutes = Math.floor((nowMs - t) / 60_000);
    if (minutes > limitMinutes) stale.push({ base, minutes });
  }
  stale.sort((a, b) => (a.base < b.base ? -1 : a.base > b.base ? 1 : 0));
  return { stale };
}

/** Managed bases' state files: {base, updatedAt, work}. Unreadable files are logged, skipped. */
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
    states.push({ base, updatedAt: doc.updatedAt, work: Boolean(doc.inFlight || doc.paused) });
  }
  return states;
}

/** Open pull requests carrying the queue label (Issues API); false when it cannot be read. */
async function labeledPullsExist(gh, config, log) {
  try {
    const items = await gh.paginate(`/repos/${gh.owner}/${gh.repo}/issues`, {
      state: "open",
      labels: config.label,
    });
    return items.some((item) => item?.pull_request);
  } catch (error) {
    log(`warning: could not list the open PRs labeled ${config.label} (${error.message})`);
    return false;
  }
}

function issueBody({ stale, states, config, limitMinutes }) {
  const mentions = (config.approvers ?? [])
    .filter((a) => LOGIN_RE.test(String(a)))
    .map((a) => `@${a}`)
    .join(" ");
  const saved = new Map(states.map((s) => [s.base, s.updatedAt]));
  return [
    WATCHDOG_MARKER,
    `${mentions ? `${mentions}: ` : ""}no omni-queue tick has saved the state of these bases for ` +
      `more than ${limitMinutes} minutes, while ticks should be visiting them:`,
    "",
    "| Base | Last state save | Minutes |",
    "| --- | --- | --- |",
    ...stale.map((s) => `| \`${s.base}\` | ${fmtTime(saved.get(s.base))} | ${s.minutes} |`),
    "",
    "Check, in order: the latest `omni-queue` runs in the Actions tab, the `OMNI_QUEUE_ENABLED` " +
      "variable, the `omni-queue` environment (its secrets and its deployment branch), and a " +
      "tick that fails on every run (docs/ops/OMNI_QUEUE.md, Incidents, " +
      '"Dashboard stopped updating").',
    "",
    "Opened by `.github/workflows/omni-queue-watchdog.yml`, which checks every 30 minutes, keeps " +
      "this one issue while the condition lasts and closes it once ticks complete again.",
  ].join("\n");
}

/**
 * One watchdog run: judge the bases, then open, reuse or close the one issue.
 * @param {{gh: object, config: import("./config.mjs").QueueConfig, now: string,
 *          log?: (message: string) => void, limitMinutes?: number}} input
 * @returns {Promise<{stale: {base: string, minutes: number}[],
 *                    issue: {action: "opened"|"reused"|"closed"|"none", number: number|null}}>}
 */
export async function runWatchdog(input) {
  const { gh, config, now, log = () => {}, limitMinutes = WATCHDOG_LIMIT_MINUTES } = input;
  const states = await readStates(gh, config, log);
  const judged = states.filter((s) => s.work);
  if (states.length && (await labeledPullsExist(gh, config, log))) {
    const freshest = states.reduce((a, b) =>
      Date.parse(b.updatedAt) > Date.parse(a.updatedAt) ? b : a
    );
    if (!judged.includes(freshest)) judged.push(freshest);
  }
  const { stale } = assessStaleness({
    states: judged.map(({ base, updatedAt }) => ({ base, updatedAt })),
    now,
    limitMinutes,
  });
  const open = (await gh.listIssues({ labels: [DASHBOARD_LABEL], state: "open" }))
    .filter((i) => i.title.startsWith(WATCHDOG_TITLE_PREFIX) && i.body.includes(WATCHDOG_MARKER))
    .sort((a, b) => a.number - b.number)[0];

  if (stale.length) {
    if (open) {
      log(
        `stale: ${stale.map((s) => `${s.base} ${s.minutes} min`).join(", ")}; issue #${open.number} reused`
      );
      return { stale, issue: { action: "reused", number: open.number } };
    }
    const minutes = Math.max(...stale.map((s) => s.minutes));
    const { number } = await gh.createIssue({
      title: watchdogTitle(minutes),
      body: issueBody({ stale, states, config, limitMinutes }),
      labels: [DASHBOARD_LABEL],
    });
    log(
      `stale: ${stale.map((s) => `${s.base} ${s.minutes} min`).join(", ")}; issue #${number} opened`
    );
    return { stale, issue: { action: "opened", number } };
  }
  if (open) {
    await gh.createIssueComment(
      open.number,
      `No base with queue work has gone more than ${limitMinutes} minutes without a completed ` +
        `tick (checked ${fmtTime(now)}). Closing.`
    );
    await gh.updateIssue(open.number, { state: "closed", state_reason: "completed" });
    log(`no stale base; issue #${open.number} closed`);
    return { stale, issue: { action: "closed", number: open.number } };
  }
  log("no stale base");
  return { stale, issue: { action: "none", number: null } };
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
