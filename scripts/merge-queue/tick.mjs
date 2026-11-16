#!/usr/bin/env node
// scripts/merge-queue/tick.mjs — WP3. Plan §3.1: ONE idempotent tick of the queue.
//
// Entry point of .github/workflows/omni-queue.yml (the only writer of queue state):
//   node scripts/merge-queue/tick.mjs [--base <branch>] [--action tick|pause|resume|dry-run]
//                                     [--reason <text>]
//   node scripts/merge-queue/tick.mjs --base <branch> --action bless --sha <40 hex> --reason <text>
// Environment (set by the workflow; never logged):
//   OMNI_QUEUE_TOKEN       GitHub App installation token (contents/pull_requests/issues/statuses:
//                          write)
//   GITHUB_REPOSITORY      owner/repo
//   OMNI_QUEUE_LAND_TOKEN  the repository owner's token, used ONLY by the landing itself (the
//                          merge-ff push or the squash-api merges) when landing.actor is "owner";
//                          everything else, the land status included, uses OMNI_QUEUE_TOKEN.
//                          Optional: without it shadow mode runs and a live landing pauses.
//   OMNI_QUEUE_GIT_NAME, OMNI_QUEUE_GIT_EMAIL   TESTS/SANDBOX ONLY: identity for queue merge
//                          commits, over everything else. Without it: landing.identity when
//                          landing.actor is "owner", else OMNI_QUEUE_BOT_NAME +
//                          OMNI_QUEUE_BOT_EMAIL (the App's bot user, resolved by the workflow),
//                          else contracts.botIdentity(config.appSlug)
//   GITHUB_ACTOR, GITHUB_TRIGGERING_ACTOR   who dispatched the run, and who triggered this run of
//                          it (the re-runner of a re-run, whose inputs stay the dispatcher's): a
//                          bless is honoured only when BOTH are logins of config.approvers
//   OMNI_QUEUE_CONFIG      optional path to an alternative config file (sandbox)
//   RUNNER_TEMP            scratch directory for the bare compose repository
//   GITHUB_SERVER_URL, GITHUB_RUN_ID   for run links in history/dashboard
//   GITHUB_API_URL         REST API root (default https://api.github.com; GHES / tests)
//   OMNI_QUEUE_REMOTE_URL  TESTS/SANDBOX ONLY: git remote of the repository instead of
//                          <GITHUB_SERVER_URL>/<repo>.git (e.g. the path of a local bare
//                          repository; a non-http remote is fetched without a partial-clone
//                          filter). The workflow never sets it.
//
// Tick algorithm (per base): load state (CAS) → handle action (pause/resume) → if paused:
// auto-resume a base-red pause when the base tip moved → retry the stored land-status
// withdrawals (every mode, paused or not; never in a dry-run) → in shadow, a batch stored at the
// landing stage goes back to "testing" and its land status is withdrawn → if paused: stop →
// if inFlight: read checks of
// candidateSha (checks.evaluateChecks) → pending: nothing; green: land (or would-land in shadow)
// / advance bisection; red: classify (classify.classifyRed) → infra retry / base-check / bisect /
// culprit; timeout: infra path → if nothing in flight: snapshot labeled PRs, run eligibility,
// execute its actions, select a batch, compose, push the candidate → render dashboard → save
// (only when the state changed, or as an hourly heartbeat: STATE_HEARTBEAT_MINUTES).
// Every network side effect happens BEFORE the state save that records it, and every step is
// safe to repeat when the save loses the CAS race (the next tick re-observes GitHub):
//   - candidate refs are unique per SHA (never force-pushed) and orphans are deleted by cleanup;
//     the refs of the STORED in-flight work are deleted only after the save that supersedes them;
//   - a push whose ref already holds the SHA is skipped; a candidate whose object is gone from
//     origin (every ref deleted, SHA not served) is recomposed instead of wedging the queue;
//   - comments go through gh.commentOnce, label removal of an absent label is a no-op;
//   - a merge-ff landing that already happened is recognized (base tip == candidate SHA), and an
//     open tree-divergence issue re-pauses squash-api landings whose pause was lost;
//   - the land status is the one write recorded BEFORE it happens: the in-flight stage "landing"
//     is saved first (markLanding), so a tick that dies after the blessing leaves a record, and
//     any later tick that drops, recomposes or pauses that batch turns the App's `success` land
//     status on its commits into `failure` (withdrawAbandoned; only statuses created by the App
//     count, as for the release ruleset). That save also counts the attempt
//     (inFlight.landAttempts): after LANDING_ATTEMPTS_LIMIT attempts in a row without a verdict
//     the batch is not blessed again and the queue pauses with reason "error". A batch HELD at
//     the landing stage (release-freeze, checks back to pending, manual pause) goes back to stage
//     "testing" (leaveLandingStage), so the same tick withdraws its status and later held ticks
//     read nothing; it is blessed again only right before it lands. A `failure` GitHub refuses
//     to write is kept in state.landWithdrawals and retried by the next ticks (retryWithdrawals).
// Before landing (or composing a bisection segment) every PR is re-read and re-run through the
// eligibility rules: block labels, approval status on the head, protected approval and an open
// release-freeze (which holds the green batch in flight instead of landing it). Then the candidate
// must be exactly the composition of the stored PRs (land.verifyComposition, each merge commit's
// tree recomposed from its parents included), or nothing is blessed or landed (nor recorded as
// would-land) and the queue pauses with reason "error". Last, GitHub must enforce the queue-refs
// ruleset on the state branch and on the candidate ref (refs-guard.readQueueRefsProtection, read
// once per tick): in live mode nothing is blessed without it and the queue pauses ("error"); in
// shadow mode the would-land event says live mode would pause. A check of these two that cannot
// run (a git error while recomposing, a failed rules read) fails a live tick, which blesses
// nothing; in shadow mode it does not fail the tick: the would-land event says which check could
// not run and why (a composition mismatch still pauses in shadow). In live mode the base tip read by
// the tick must also be the stored baseSha, or nothing is blessed: a moved base recomposes the PRs
// on the tip (land-rejected "base moved"), a missing base pauses the queue ("error").
//
// The PR snapshot + eligibility run on EVERY tick (dashboard queue, eligibility comments and
// label removals); only the batch selection/composition waits for an idle, unpaused queue.
//
// BLESS (--action bless, the explicit emergency exit for a hotfix, sync-back or base repair): the
// App writes landing.statusContext (success) on ONE commit named by the dispatcher, records a
// `manual-bless` event with who asked and why, saves the state and stops (no in-flight work, no
// batch, no dashboard). The maintainer then pushes or merges that commit himself. Refused, with
// nothing written (no status, no event, no error record), unless the dispatcher and the triggering
// actor are both approvers, the SHA is a full 40-hex SHA GitHub resolves and a reason is given.
//
// SHADOW MODE is inert for pull requests: no label is removed and no comment is posted on a PR,
// on any path (removeLabel / commentPr are the only two ways the tick writes to one). What live
// mode would have done is recorded instead: `culprit-found` (with a shadow note) and
// `would-dequeue` events, and the head is remembered in state.shadow.processed so it is not
// batched again. Issues the queue owns (dashboard, base-red notice) are still written.

import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import * as bisectModule from "./bisect.mjs";
import * as checksModule from "./checks.mjs";
import * as classifyModule from "./classify.mjs";
import * as composeModule from "./compose.mjs";
import { DEFAULT_CONFIG_PATH, isManagedBase, loadConfig } from "./config.mjs";
import {
  BASE_CHECK_LIMIT,
  BASE_RED_LABEL,
  CANDIDATE_PREFIX,
  DASHBOARD_LABEL,
  DASHBOARD_TITLE_PREFIX,
  FREEZE_LABEL,
  LAND_WITHDRAWALS_LIMIT,
  RESUME_EXPECT_PREFIX,
  appendEvent,
  baseCheckRef,
  baseRedTitle,
  batchIdFor,
  botIdentity,
  candidateRef,
  isSha,
  sanitizeBase,
} from "./contracts.mjs";
import * as dashboardModule from "./dashboard.mjs";
import * as eligibilityModule from "./eligibility.mjs";
import { createGit } from "./gitexec.mjs";
import { createGitHubClient } from "./github.mjs";
import * as landModule from "./land.mjs";
import { readQueueRefsProtection } from "./refs-guard.mjs";
import { StateConflictError, createStateStore, updateStateWithRetry } from "./state.mjs";

export { StateConflictError };

/** A bless the tick refused (actor, SHA, reason or commit): nothing was written. */
export class BlessRefusedError extends Error {}

/**
 * @typedef {import("./contracts.mjs").QueueState} QueueState
 * @typedef {import("./contracts.mjs").InFlight} InFlight
 * @typedef {import("./contracts.mjs").PrRef} PrRef
 * @typedef {import("./contracts.mjs").BisectState} BisectState
 * @typedef {import("./config.mjs").QueueConfig} QueueConfig
 */

/**
 * @typedef {object} TickDeps
 * @property {QueueConfig} config
 * @property {object} gh                      github.mjs client
 * @property {import("./state.mjs").StateStore} store
 * @property {(cwd: string) => import("./gitexec.mjs").Git} gitFor  git runner factory
 * @property {((cwd: string) => import("./gitexec.mjs").Git)|null} landGitFor  git runner factory
 *   of the landing push: gitFor itself when landing.actor is "app"; with "owner", one carrying
 *   OMNI_QUEUE_LAND_TOKEN, or null when that token is not set
 * @property {object|null} landGh             client of the squash-api landing: gh itself when
 *   landing.actor is "app"; with "owner", one with OMNI_QUEUE_LAND_TOKEN, or null without it
 * @property {string} repoDir                 scratch dir for the bare compose repository
 * @property {string} remoteUrl               https://github.com/<owner>/<repo>.git
 * @property {string|null} [fetchFilter]      partial-clone filter for the scratch repository
 *   (undefined = compose.prepareRepo default "blob:none"; null = full fetch, local remotes)
 * @property {{name: string, email: string}} identity
 * @property {() => string} now               ISO clock (injected for tests)
 * @property {(msg: string) => void} log
 * @property {string|null} runUrl
 * @property {string} repository              owner/repo (dashboard and comment links)
 * @property {object} [modules]               optional overrides of the imported modules
 *   ({eligibility, checks, classify, compose, land, bisect, dashboard}) — tests inject fakes;
 *   main() uses the real ones
 */

export const TICK_ACTIONS = Object.freeze(["tick", "pause", "resume", "dry-run", "bless"]);

/** GitHub's limit for a commit status description. */
const STATUS_DESCRIPTION_MAX = 140;

/**
 * How often a tick that changed nothing still saves the state. Most ticks change nothing (idle
 * queue, candidate checks pending), and a save stamps `updatedAt`, so saving on every tick was
 * one commit on the state branch per tick: 288 a day per base from the cron alone. An unchanged
 * state is written only as a heartbeat, at most once per this interval, so the age of
 * `updatedAt` still tells an idle queue (under the interval plus one tick) from a dead one.
 */
export const STATE_HEARTBEAT_MINUTES = 60;

/**
 * How many ticks in a row may bless and land the same batch and end without a verdict (the
 * landing threw, or the tick died after the blessing) before the queue pauses. Without a bound,
 * such an error repeats on every tick, forever: a success/failure land status pair per commit and
 * one `error` event each time, and nobody is told the queue is stuck. Counted in
 * `inFlight.landAttempts` (markLanding), saved before each blessing.
 */
export const LANDING_ATTEMPTS_LIMIT = 3;

/**
 * How long a red candidate whose failed jobs were re-run (inFlight.rerun) waits for the re-run
 * to show up as a second attempt of its push run. Until then its old failure is not read as the
 * re-run's verdict (Tick.waitForRerun); after this long the re-run is taken as never started and
 * the old failure is classified. An attempt that shows and is not completed is waited for up to
 * config.checksTimeoutMinutes from the candidate's start instead.
 */
export const RERUN_START_MINUTES = 30;

/** GitHub client methods that write; refused (and reported) during a dry-run. */
export const GH_WRITE_METHODS = Object.freeze([
  "addLabels",
  "removeLabel",
  "createIssueComment",
  "commentOnce",
  "createIssue",
  "updateIssue",
  "createCommitStatus",
  "mergePull",
  "putFileContent",
  "createOrphanBranch",
  "deleteBranch",
  "dispatchWorkflow",
  "rerunFailedJobs",
  "createRuleset",
  "updateRuleset",
]);

/** Local ref (inside the bare scratch repository) used to bring an existing candidate in. */
const INFLIGHT_LOCAL_REF = "refs/omni-queue/inflight";
const FAILED_CONCLUSIONS = new Set([
  "failure",
  "cancelled",
  "timed_out",
  "action_required",
  "startup_failure",
  "stale",
]);

/**
 * A landing credential refused by GitHub: git over https (expired, revoked or underprivileged
 * token; the push gives no porcelain verdict, so land.mjs throws) or the REST API (GitHubError
 * 401/403). Retrying that every tick would bless the same commits again and again: it pauses.
 */
const AUTH_FAILURE_RE =
  /Authentication failed|could not read (?:Username|Password)|Invalid username or (?:password|token)|Permission to \S+ denied|Write access to repository not granted|returned error: 40[13]\b|→ 40[13]\b|Bad credentials/i;

/**
 * GitHub also answers 403 when a rate limit is hit ("API rate limit exceeded", "You have
 * exceeded a secondary rate limit"): the credential is fine, so it is not an auth failure. The
 * landing is retried like any error without a verdict, within LANDING_ATTEMPTS_LIMIT.
 */
const RATE_LIMIT_RE = /rate limit/i;

function isAuthFailure(error) {
  if (error?.status === 401) return true;
  const message = String(error?.message ?? "");
  if (RATE_LIMIT_RE.test(message)) return false;
  return error?.status === 403 || AUTH_FAILURE_RE.test(message);
}

/** The same rule for a failure known only by its text (a landing verdict's detail). */
function isAuthFailureText(text) {
  return !RATE_LIMIT_RE.test(text) && AUTH_FAILURE_RE.test(text);
}

const DEFAULT_MODULES = Object.freeze({
  eligibility: eligibilityModule,
  checks: checksModule,
  classify: classifyModule,
  compose: composeModule,
  land: landModule,
  bisect: bisectModule,
  dashboard: dashboardModule,
});

/**
 * Read-only view of the GitHub client for dry-runs: every write method (and any non-GET raw
 * request) is refused and recorded in `violations`, so a write attempt fails the tick even when
 * the calling code catches the error.
 */
export function readOnlyGitHub(gh, violations) {
  return new Proxy(gh, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (typeof prop === "string" && GH_WRITE_METHODS.includes(prop)) {
        return () => {
          violations.push(prop);
          throw new Error(`dry-run: refused GitHub write ${prop}()`);
        };
      }
      if (prop === "request" && typeof value === "function") {
        return (method, ...rest) => {
          if (String(method).toUpperCase() !== "GET") {
            violations.push(`request ${method}`);
            throw new Error(`dry-run: refused GitHub write request ${method}`);
          }
          return value.call(target, method, ...rest);
        };
      }
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
}

/**
 * Suffix of a shadow would-land event for a pre-blessing check that threw instead of answering:
 * which check, and why on one line, clipped (Tick.landOrWouldLand).
 */
function couldNotRun(check, error) {
  const why = String(error?.message ?? error)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
  return `; ${check} could not run (${why}): live mode would fail the tick`;
}

/** Eligibility reasons caused by the batch itself: never a reason to drop one of its PRs. */
const SELF_REASONS = new Set(["in-flight", "shadow-processed"]);

const head12 = (sha) => String(sha ?? "").slice(0, 12);
const prNumbers = (prs) => (prs ?? []).map((pr) => pr.n);
const formatPrs = (prs) =>
  prNumbers(prs)
    .map((n) => `#${n}`)
    .join(", ") || "none";

/**
 * Inline code span for untrusted text (check-run names come from workflows of the PR under
 * test): GitHub renders no @mention, autolink or markdown inside a code span.
 */
const codeSpan = (text) =>
  `\`${
    String(text ?? "")
      .replace(/[`\r\n]+/g, "'")
      .trim()
      .slice(0, 200) || "?"
  }\``;

/** classifyRed detail of a base-red verdict, naming the hanging job(s) it matched on the base. */
function redDetail(verdict) {
  const hung = [...new Set((verdict.matched ?? []).filter((s) => s.hang).map((s) => s.check))];
  if (!hung.length) return verdict.detail;
  return `${verdict.detail}; suspected hang in ${hung.join(", ")}: the bare base fails the same job`;
}

/** What the culprit comment says about the base, by its recorded verdict; nothing without one. */
const BASE_CLAUSES = Object.freeze({
  green: "the base passes the same job",
  red: "the bare base fails other checks, not this job in the same way",
  timeout: "the base check gave no result to compare with",
});

/**
 * Culprit comment wording for a hang: the job(s) by their run names (shard included; the check
 * names when the runs could not be re-read), how many runs of this PR alone timed out
 * (`timedOutRuns`; no number when unknown), and only what the base verdict (`baseStatus`) shows.
 * @param {{failures: object[], hang: import("./contracts.mjs").FailureSignature[],
 *          timedOutRuns?: number,
 *          baseStatus?: string}} input
 */
export function hangSentence({ failures, hang, timedOutRuns, baseStatus }) {
  const checks = new Set(hang.map((s) => s.check));
  const names = [
    ...new Set(
      (failures ?? [])
        .filter((run) => checks.has(classifyModule.normalizeCheckName(run.name)))
        .map((run) => run.name)
    ),
  ];
  const jobs = names.length ? names : [...checks];
  const subject = `the job${jobs.length > 1 ? "s" : ""} ${jobs.map(codeSpan).join(", ")}`;
  const runs = timedOutRuns ?? 0;
  const often = runs === 1 ? " once" : runs === 2 ? " twice" : runs > 2 ? ` ${runs} times` : "";
  const base = Object.hasOwn(BASE_CLAUSES, baseStatus) ? `; ${BASE_CLAUSES[baseStatus]}` : "";
  return `${subject} timed out${often} on this PR alone${base}`;
}

/**
 * Most job names a `flaky-rerun` or `checks-green` detail lists: a red candidate can fail dozens
 * of jobs, and the history keeps 200 events.
 */
const RERUN_JOBS_SHOWN = 5;

/** "a, b, c, d, e, +3 more": the first RERUN_JOBS_SHOWN job names, then how many are left out. */
function jobList(jobs) {
  const shown = jobs.slice(0, RERUN_JOBS_SHOWN).join(", ") || "unknown";
  const more = jobs.length - RERUN_JOBS_SHOWN;
  return more > 0 ? `${shown}, +${more} more` : shown;
}

/** Most characters of the reason a `checks-red` detail gives for a refused re-run. */
const RERUN_REFUSAL_CHARS = 100;

/**
 * "403" or "403, 404" (one per refused run: GitHub's status, else the error's message), on one
 * line and at most RERUN_REFUSAL_CHARS characters, for the `checks-red` detail.
 */
function refusalReason(reasons) {
  const line = reasons.join(", ").replace(/\s+/g, " ").trim();
  return line.length > RERUN_REFUSAL_CHARS ? `${line.slice(0, RERUN_REFUSAL_CHARS - 1)}…` : line;
}

/** Title of the issue opened when a squash-api landing leaves a tree CI did not validate. */
const divergenceTitle = (base) => `🛑 omni-queue tree divergence: ${base}`;

function stripUndefined(object) {
  return Object.fromEntries(Object.entries(object).filter(([, v]) => v !== undefined));
}

const toMs = (raw) => {
  const ms = raw ? Date.parse(raw) : Number.NaN;
  return Number.isNaN(ms) ? null : ms;
};

/** Timestamp of a check run, for "is this result from the current attempt?" */
function resultTime(run) {
  return toMs(run.startedAt ?? run.completedAt ?? null);
}

/** Newest GitHub-side timestamp among check runs (ms), null when none. */
function newestResultTime(runs) {
  let newest = null;
  for (const run of runs) {
    for (const raw of [run.startedAt, run.completedAt]) {
      const ms = toMs(raw);
      if (ms !== null && (newest === null || ms > newest)) newest = ms;
    }
  }
  return newest;
}

function prGreenCheckState(runs, name) {
  const matching = (runs ?? []).filter((run) => run.name === name);
  if (!matching.length) return null;
  const latest = matching.reduce((a, b) => (b.id > a.id ? b : a));
  if (latest.status !== "completed") return "pending";
  if (latest.conclusion === "success") return "success";
  if (FAILED_CONCLUSIONS.has(latest.conclusion)) return "failure";
  return "pending";
}

class Tick {
  /**
   * @param {TickDeps} deps
   * @param {{sha?: string|null, actor?: string|null, triggeringActor?: string|null}} [bless]
   *   the commit, the dispatcher (GITHUB_ACTOR) and the triggering actor (GITHUB_TRIGGERING_ACTOR)
   *   of a bless (action "bless" only)
   */
  constructor(deps, base, action, reason, bless = {}) {
    this.deps = deps;
    this.base = base;
    this.action = action;
    this.reason = reason;
    this.bless = bless;
    this.dryRun = action === "dry-run";
    this.config = deps.config;
    /** Anything but live observes only: nothing lands, nothing is written on a pull request. */
    this.shadow = this.config.mode !== "live";
    this.violations = [];
    this.gh = this.dryRun ? readOnlyGitHub(deps.gh, this.violations) : deps.gh;
    /** landing.actor "owner": the landing itself runs with the owner's token, the rest with the App's. */
    this.ownerLands = this.config.landing?.actor === "owner";
    const landGh = this.ownerLands ? (deps.landGh ?? null) : null;
    /** Client of the squash-api landing (the App's own client unless the owner lands). */
    this.landGh = !this.ownerLands
      ? this.gh
      : landGh && this.dryRun
        ? readOnlyGitHub(landGh, this.violations)
        : landGh;
    this.landGit = null;
    this.m = { ...DEFAULT_MODULES, ...(deps.modules ?? {}) };
    this.decisions = [];
    /** PRs whose queue label this tick removed (GitHub may still list them for a while). */
    this.touched = new Set();
    this.git = null;
    /** Newest GitHub timestamp among the results of the in-flight attempt read this tick. */
    this.inFlightObservedMs = null;
    this.freezeCache = null;
    this.repoWeb = String(deps.remoteUrl ?? "").startsWith("http")
      ? String(deps.remoteUrl).replace(/\.git$/, "")
      : `https://github.com/${deps.repository}`;
    /** @type {QueueState} */
    this.s = null;
    /** @type {{state: QueueState, version: string|null}|null} the stored document (run) */
    this.loaded = null;
    /** In-flight batch at the landing stage whose land status may stand (withdrawAbandoned). */
    this.landing = null;
    /** batchId of the batch this tick landed (its land status stays). */
    this.landedBatch = null;
    /** {ref, result} of this tick's queue-refs protection read (queueRefsProtection). */
    this.queueRefs = null;
  }

  now() {
    return this.deps.now();
  }

  note(message) {
    const line = this.dryRun ? `[dry-run] ${message}` : message;
    this.decisions.push(line);
    this.deps.log?.(`[omni-queue ${this.base}] ${line}`);
  }

  event(type, fields = {}) {
    const url = fields.url ?? this.deps.runUrl ?? undefined;
    this.s = appendEvent(this.s, stripUndefined({ at: this.now(), type, ...fields, url }));
  }

  checksUrl(sha) {
    return `${this.repoWeb}/commit/${sha}/checks`;
  }

  // ─────────────────────────── side effects (all skipped in dry-run) ───────────────────────────

  gitRepo() {
    if (!this.git) {
      this.git = this.deps.gitFor(this.deps.repoDir);
      this.m.compose.prepareRepo({
        git: this.git,
        remoteUrl: this.deps.remoteUrl,
        ...(this.deps.fetchFilter !== undefined ? { filter: this.deps.fetchFilter } : {}),
      });
    }
    return this.git;
  }

  /**
   * Git of the landing push: the same scratch repository (prepared and fetched into with the
   * App's token), run with the owner's token when landing.actor is "owner".
   */
  landGitRepo() {
    const git = this.gitRepo();
    if (!this.ownerLands) return git;
    if (!this.landGit) this.landGit = this.deps.landGitFor(this.deps.repoDir);
    return this.landGit;
  }

  /**
   * Make sure commit `sha` is in the scratch repository (a fresh one every tick). Tries each
   * remote branch of `refs` (one holding `sha` or a descendant of it), then the SHA itself, so a
   * candidate ref deleted by a lost state save or by hand never wedges the queue.
   * @returns {boolean} false when the object could not be fetched from anywhere
   */
  fetchObject(sha, refs = []) {
    const git = this.gitRepo();
    const present = () =>
      git.run(["cat-file", "-e", `${sha}^{commit}`], { allowFail: true }).code === 0;
    if (present()) return true;
    const sources = [...new Set((refs ?? []).filter(Boolean))].map((ref) => `refs/heads/${ref}`);
    sources.push(sha);
    for (const source of sources) {
      const fetched = git.run(
        [
          "fetch",
          "--no-tags",
          "--no-write-fetch-head",
          "origin",
          `+${source}:${INFLIGHT_LOCAL_REF}`,
        ],
        { allowFail: true }
      );
      if (fetched.code === 0 && present()) return true;
      this.note(`fetch of ${source} did not bring ${head12(sha)}`);
    }
    return false;
  }

  /** Open issue left by a tree divergence on this base, if any (survives a lost state save). */
  async openDivergenceIssue() {
    const title = divergenceTitle(this.base);
    const issues = await this.gh.listIssues({ labels: [DASHBOARD_LABEL], state: "open" });
    return issues.find((issue) => issue.title === title) ?? null;
  }

  async freezeIssues() {
    if (!this.freezeCache) {
      const issues = await this.gh.listIssues({ labels: [FREEZE_LABEL], state: "open" });
      this.freezeCache = issues.map((i) => ({
        number: i.number,
        title: i.title,
        body: i.body ?? "",
      }));
    }
    return this.freezeCache;
  }

  /** Candidate refs a state document keeps alive (in-flight candidate + parked red batch). */
  refsOf(f) {
    const refs = new Set();
    if (!f) return refs;
    refs.add(f.candidateRef);
    const parked = f.pendingRed ? this.parkedRef(f.pendingRed) : null;
    if (parked) refs.add(parked);
    return refs;
  }

  parkedRef(parked) {
    try {
      return candidateRef(this.base, parked.batchId, parked.candidateSha);
    } catch {
      return null; // malformed parked batch: no ref to keep or read
    }
  }

  /** History already holds an event matching `predicate` (dedupe of repeated observations). */
  hasEvent(predicate) {
    return this.s.history.some(predicate);
  }

  /** Comment on an issue the queue owns (base-red notice, divergence): written in every mode. */
  async comment(n, key, body) {
    if (this.dryRun) return this.note(`would comment on #${n} (${key})`);
    await this.gh.commentOnce(n, key, body);
  }

  /** Comment on a PULL REQUEST: never in shadow mode. */
  async commentPr(n, key, body) {
    if (this.shadow) return this.note(`shadow: comment ${key} on #${n} not posted`);
    await this.comment(n, key, body);
  }

  /** Remove a label from a PULL REQUEST: never in shadow mode. */
  async removeLabel(n, label) {
    if (this.shadow) return this.note(`shadow: label "${label}" kept on #${n}`);
    this.touched.add(n);
    if (this.dryRun) return this.note(`would remove label "${label}" from #${n}`);
    await this.gh.removeLabel(n, label);
  }

  /**
   * Shadow mode: live mode would have removed `pr` from the queue (label + comment). Record it
   * and remember the head like a validated one, so it is not batched again until it changes.
   * @param {PrRef} pr
   */
  wouldDequeue(pr, detail, batchId) {
    this.s.shadow.processed[String(pr.n)] = pr.head;
    this.event("would-dequeue", { batchId, prs: [pr.n], sha: pr.head, detail });
    this.note(`shadow: #${pr.n} would be dequeued (${detail}); label kept, no comment`);
  }

  /**
   * Push `sha` to the NEW candidate ref `ref` (never forced). `sources` = remote branches that may
   * hold the object when this tick did not compose it (infra retry, base-check).
   * @returns {Promise<"pushed"|"existed"|"lost">} existed = a previous tick (whose state save was
   *   lost) already pushed it; lost = the object is gone from origin
   */
  async pushRef(sha, ref, sources = null) {
    if (this.dryRun) {
      this.note(`would push ${head12(sha)} to ${ref}`);
      return "pushed";
    }
    const existing = await this.gh.getBranchSha(ref);
    if (existing === sha) {
      this.note(`${ref} already points at ${head12(sha)}: not pushed again`);
      return "existed";
    }
    if (existing) {
      throw new Error(`${ref} exists at ${head12(existing)}, not ${head12(sha)}: never forced`);
    }
    const git = this.gitRepo();
    if (sources && !this.fetchObject(sha, sources)) return "lost";
    this.m.compose.pushCandidate({ git, sha, ref });
    return "pushed";
  }

  async deleteRef(ref) {
    if (this.dryRun) return this.note(`would delete ${ref}`);
    await this.gh.deleteBranch(ref);
  }

  // ─────────────────────────── main sequence ───────────────────────────

  async run() {
    if (this.action === "bless") return this.runBless();
    const { store } = this.deps;
    const { state, version } = await store.load(this.base);
    this.s = structuredClone(state);
    /** The stored document and its CAS version (markLanding saves once mid-tick). */
    this.loaded = { state, version };
    // A batch stored at the landing stage may carry the land status: the tick that blessed it
    // may have died before its final save (see markLanding / withdrawAbandoned).
    this.landing = state.inFlight?.stage === "landing" ? structuredClone(state.inFlight) : null;
    // Refs of the stored in-flight work stay on origin until the save that supersedes them
    // succeeds: if this save loses the CAS race, the redo still finds them.
    const loadedRefs = this.refsOf(state.inFlight);

    this.handleAction();
    await this.maybeAutoResume();
    // Before the in-flight work: a commit this tick blesses for landing is never un-blessed by a
    // stale withdrawal (markLanding drops the entries of the commits it is about to bless).
    await this.retryWithdrawals();
    await this.leaveLandingInShadow();

    if (this.s.inFlight && !this.s.paused) await this.processInFlight();
    else if (this.s.inFlight) this.note(`paused: in-flight ${this.s.inFlight.batchId} left as is`);

    const queue = await this.snapshotQueue();
    if (!this.s.paused && !this.s.inFlight) await this.startBatch(queue);
    else if (this.s.paused) this.note(`paused (${this.s.paused.reason}): nothing composed`);

    await this.withdrawAbandoned();
    await this.cleanupRefs(loadedRefs);
    await this.updateDashboard(queue.entries);

    if (this.violations.length) {
      throw new Error(`dry-run attempted GitHub writes: ${this.violations.join(", ")}`);
    }
    if (!this.dryRun) await this.saveState(this.loaded.state, this.loaded.version);
    await this.deleteSuperseded(loadedRefs);
    return { base: this.base, decisions: this.decisions, state: this.s };
  }

  /** Save the tick's state with compare-and-swap, unless there is nothing to write. */
  async saveState(loaded, version) {
    if (!this.saveNeeded(loaded, version)) {
      this.note(`state unchanged: not saved (heartbeat every ${STATE_HEARTBEAT_MINUTES} min)`);
      return;
    }
    const message = `omni-queue: tick ${this.base}`;
    const result = await this.deps.store.save(this.base, this.s, version, message);
    if (!result.ok) {
      throw new StateConflictError(`state of ${this.base} changed during the tick`);
    }
    if (result.state) this.s = result.state;
  }

  /**
   * False when the tick left the stored document exactly as it loaded it (`updatedAt` aside)
   * and the last save is younger than STATE_HEARTBEAT_MINUTES: nothing to write.
   *
   * Skipping the save is safe for the compare-and-swap and for the refs:
   *  - the CAS protects a write from overwriting a concurrent one. A tick with nothing to write
   *    cannot lose an update, and the version it loaded is discarded with it: the next tick
   *    loads its own;
   *  - what an unchanged tick does on GitHub (dashboard, eligibility comments, stray-ref
   *    cleanup) happens BEFORE the save in every tick and is not recorded in the state, so a
   *    save never guarded it; a concurrent change is seen by the next tick instead of by a redo;
   *  - deleteSuperseded removes the loaded in-flight refs the new state no longer names. With
   *    an identical document those two sets are equal, so it deletes nothing: no ref ever goes
   *    away on the strength of a save that did not happen.
   * A missing document (version null) is always written, and so is anything whose age cannot
   * be read (invalid or future `updatedAt`).
   * @param {QueueState} loaded   the document store.load returned
   * @param {string|null} version its CAS version (null = no document yet)
   */
  saveNeeded(loaded, version) {
    if (version === null || version === undefined) return true;
    if (withoutStamp(loaded) !== withoutStamp(this.s)) return true;
    const age = Date.parse(this.now()) - Date.parse(loaded.updatedAt);
    return !(age >= 0 && age < STATE_HEARTBEAT_MINUTES * 60_000);
  }

  /**
   * A bless tick: validate the request, write landing.statusContext on the commit, record
   * `manual-bless`, save. Every refusal throws BlessRefusedError before any write.
   */
  async runBless() {
    const { sha, actor, triggeringActor } = this.bless;
    const reason = String(this.reason ?? "")
      .replace(/\s+/g, " ")
      .trim();
    const refuse = (why) => {
      throw new BlessRefusedError(`bless refused: ${why}`);
    };
    // A re-run keeps the original dispatcher's inputs (sha, reason) and changes only the
    // triggering actor: both must be approvers, and neither stands in for a missing other.
    const login = String(actor ?? "").trim();
    const trigger = String(triggeringActor ?? "").trim();
    if (!login) refuse("no actor (GITHUB_ACTOR) to check");
    if (!trigger) refuse("no triggering actor (GITHUB_TRIGGERING_ACTOR) to check");
    const approvers = new Set(this.config.approvers.map((a) => a.toLowerCase()));
    for (const who of [login, trigger]) {
      if (!approvers.has(who.toLowerCase()))
        refuse(`@${who} is not an approver (config.approvers)`);
    }
    const by =
      login.toLowerCase() === trigger.toLowerCase()
        ? `@${login}`
        : `@${login} (re-run by @${trigger})`;
    if (!isSha(sha)) refuse(`${JSON.stringify(String(sha ?? ""))} is not a full 40-hex commit SHA`);
    if (!reason) refuse("a reason is required");
    let commit;
    try {
      commit = await this.gh.getCommit(sha);
    } catch (error) {
      refuse(`commit ${head12(sha)} could not be read from the repository (${error.message})`);
    }
    if (commit?.sha !== sha) refuse(`commit ${head12(sha)} is not in the repository`);

    const { state, version } = await this.deps.store.load(this.base);
    this.s = structuredClone(state);
    const { statusContext } = this.config.landing;
    await this.gh.createCommitStatus(sha, {
      state: "success",
      context: statusContext,
      description: `manual bless by ${by}: ${reason}`.slice(0, STATUS_DESCRIPTION_MAX),
      ...(this.deps.runUrl ? { targetUrl: this.deps.runUrl } : {}),
    });
    this.event("manual-bless", { sha, detail: `by ${by}: ${reason}`.slice(0, 500) });
    this.note(`blessed ${head12(sha)} (${statusContext}) for ${by}: ${reason}`);
    // An approver blesses this commit on purpose: a stored withdrawal of it (retryWithdrawals)
    // would otherwise turn this blessing into failure on the next tick.
    this.setLandWithdrawals((this.s.landWithdrawals ?? []).filter((w) => w.sha !== sha));
    await this.saveState(state, version);
    return { base: this.base, decisions: this.decisions, state: this.s };
  }

  handleAction() {
    if (this.action === "pause") {
      const detail = this.reason || "paused manually";
      this.s.paused = {
        reason: "manual",
        since: this.now(),
        baseSha: null,
        detail,
        issue: null,
      };
      this.event("paused", { detail });
      this.note(`paused manually: ${detail}`);
      // Withdrawn by withdrawAbandoned; blessed again only when it lands after the resume. The
      // landing count goes with the stage: the resume is the operator's fresh start.
      if (this.s.inFlight) this.leaveLandingStage(this.s.inFlight);
    } else if (this.action === "resume") {
      if (!this.s.paused) return this.note("resume: the queue was not paused");
      const reason = String(this.reason ?? "");
      if (reason.startsWith(RESUME_EXPECT_PREFIX)) {
        // A resume from the CLI names the pause it saw (contracts.RESUME_EXPECT_PREFIX).
        const expected = reason.slice(RESUME_EXPECT_PREFIX.length);
        if (this.s.paused.since !== expected) {
          return this.note(
            `resume ignored: it targeted the pause of ${expected}, ` +
              `the queue is paused (${this.s.paused.reason}) since ${this.s.paused.since}`
          );
        }
      }
      const previous = this.s.paused.reason;
      this.s.paused = null;
      this.event("resumed", { detail: `manual resume (was ${previous})` });
      this.note(`resumed (was ${previous})`);
    }
  }

  async maybeAutoResume() {
    const paused = this.s.paused;
    if (!paused || paused.reason !== "base-red") return;
    const tip = await this.gh.getBranchSha(this.base);
    if (tip && tip !== paused.baseSha) {
      this.s.paused = null;
      this.event("resumed", {
        sha: tip,
        detail: `base moved ${head12(paused.baseSha)} → ${head12(tip)} after a base-red pause`,
      });
      this.note(`base-red pause lifted: base moved to ${head12(tip)}`);
    } else {
      this.note(`base-red pause kept: base still at ${head12(tip)}`);
    }
  }

  // ─────────────────────────── in-flight candidate ───────────────────────────

  /**
   * Check runs on `sha` that the push of candidate ref `ref` produced: the runs of the check
   * suites of the push-event workflow runs GitHub lists for that branch and SHA. Every other
   * run on the SHA is not ours and never enters the verdict:
   *  - the base's own push of a base-check SHA, and the other ref of an infra retry;
   *  - a pull request opened on the candidate commit. The SHA is public, so anybody can publish
   *    it in a fork (the suite then has no head_branch) or, with a branch in this repository,
   *    under any name, the candidate ref included; that PR's CI reports on the same SHA, and by
   *    re-pushing or cancelling its author could turn the candidate red, pending or "infra", or
   *    supersede the candidate's own result with a later run of the same name. A check suite
   *    only says which branch, never which event, so the workflow run is what decides.
   * Fail closed: without a ref, or while no push run is listed, no check run counts (the verdict
   * stays pending and checks.NO_RUN_TIMEOUT_MINUTES applies).
   */
  async pushCheckRuns(sha, ref) {
    if (!ref) return [];
    const runs = await this.gh.listCheckRuns(sha);
    if (!runs.length) return [];
    const pushes = await this.gh.listWorkflowRuns({ branch: ref, headSha: sha, event: "push" });
    const suites = new Set();
    for (const run of pushes) {
      // The filters are re-checked here: a listing that ignored one must not widen the verdict.
      const ours = run.event === "push" && run.headBranch === ref && run.headSha === sha;
      if (ours && run.checkSuiteId !== null && run.checkSuiteId !== undefined) {
        suites.add(run.checkSuiteId);
      }
    }
    return runs.filter((run) => suites.has(run.checkSuiteId));
  }

  /**
   * Check runs of `sha` for ONE candidate ref (see pushCheckRuns for which runs are the
   * candidate's). `since` additionally drops runs older than the attempt. Commit statuses are not
   * read: whoever wrote them, they never decide a candidate's verdict (checks.evaluateChecks).
   */
  async readChecks(sha, { since = null, ref = null } = {}) {
    let runs = await this.pushCheckRuns(sha, ref);
    if (since) {
      // Same SHA tested before (infra retry, or a base-check on the base's own SHA): ignore
      // results that predate this attempt so an old verdict is never re-read as the new one.
      const cutoff = Date.parse(since);
      runs = runs.filter((run) => {
        const at = resultTime(run);
        return at === null || at >= cutoff;
      });
    }
    return runs;
  }

  async evaluate(sha, startedAt, options) {
    const runs = await this.readChecks(sha, options);
    const verdict = this.m.checks.evaluateChecks({
      checkRuns: runs,
      config: this.config,
      startedAt,
      now: this.now(),
    });
    return { verdict, observedMs: newestResultTime(runs) };
  }

  async processInFlight() {
    const f = this.s.inFlight;
    const reusedSha = f.attempts > 0 || f.kind === "base-check";
    const { verdict, observedMs } = await this.evaluate(f.candidateSha, f.startedAt, {
      ref: f.candidateRef,
      since: reusedSha ? f.startedAt : null,
    });
    this.inFlightObservedMs = observedMs;
    switch (verdict.verdict) {
      case "pending":
        this.note(`${f.batchId} (${head12(f.candidateSha)}): checks pending`);
        // A batch stored at the landing stage whose checks run again (a re-run): not landable
        // now, so it keeps no blessing while it waits (blessed again when it is green and lands).
        this.leaveLandingStage(f);
        return;
      case "green":
        return this.onGreen(f);
      case "red":
        return this.onRed(f, verdict.failures ?? []);
      case "timeout": {
        // "no-ci-run": GitHub never started CI for the candidate (skip marker, nothing triggered).
        const noRun = verdict.reason === "no-ci-run";
        const detail = noRun
          ? `no CI run for candidate after ${checksModule.NO_RUN_TIMEOUT_MINUTES} min`
          : `no verdict after ${this.config.checksTimeoutMinutes} min`;
        this.event("checks-timeout", {
          batchId: f.batchId,
          prs: prNumbers(f.prs),
          sha: f.candidateSha,
          detail,
        });
        if (f.kind === "base-check" && f.attempts >= this.config.infraRetries) {
          // The base only moves through the queue: pausing here would repeat after every resume
          // (a skip marker on the tip never gets a run). Its parked batch is settled instead.
          this.note(`base-check ${head12(f.baseSha)}: no verdict after its retries (${detail})`);
          return this.settleBaseCheck(f, [], "timeout");
        }
        return this.infraPath(
          f,
          noRun ? detail : `checks timed out after ${this.config.checksTimeoutMinutes} min`
        );
      }
      default:
        throw new Error(`unknown checks verdict: ${verdict.verdict}`);
    }
  }

  recordBaseCheck(baseCheck) {
    this.s.baseChecks = [
      baseCheck,
      ...this.s.baseChecks.filter((b) => b.baseSha !== baseCheck.baseSha),
    ].slice(0, BASE_CHECK_LIMIT);
  }

  async onGreen(f) {
    const seen = this.hasEvent(
      (e) => e.type === "checks-green" && e.batchId === f.batchId && e.sha === f.candidateSha
    );
    if (!seen) {
      // Green only after its failed jobs were re-run: the jobs that failed first were flaky.
      const flaky = f.rerun && f.rerun.ref === f.candidateRef;
      this.event("checks-green", {
        batchId: f.batchId,
        prs: prNumbers(f.prs),
        sha: f.candidateSha,
        detail: flaky ? `green after re-running ${jobList(f.rerun.jobs)} (flaky)` : undefined,
      });
    }
    if (f.kind === "base-check") {
      this.recordBaseCheck({
        baseSha: f.baseSha,
        ref: f.candidateRef,
        status: "green",
        startedAt: f.startedAt,
        signatures: [],
      });
      this.s.inFlight = null;
      this.note(`base-check ${head12(f.baseSha)} green: the parked batch is PR-red`);
      const parked = f.pendingRed;
      if (!parked) return;
      const ref = this.parkedRef(parked);
      const failures = await this.failuresOf(parked.candidateSha, f.startedAt, ref);
      return this.onPrRed({ ...parked, failures, baseSha: f.baseSha, candidateRef: ref });
    }
    return this.landOrWouldLand(f);
  }

  async failuresOf(sha, startedAt, ref) {
    try {
      const { verdict } = await this.evaluate(sha, startedAt, { ref });
      return verdict.failures ?? [];
    } catch (error) {
      this.note(`could not re-read the failures of ${head12(sha)}: ${error.message}`);
      return [];
    }
  }

  /**
   * Re-read every PR right before landing it (or composing it into a bisection segment) and run
   * the full eligibility rules on fresh data: approval status on the head, block labels,
   * protected approval, release-freeze. Reasons caused by the batch itself are tolerated.
   * Read errors propagate (the tick fails and the next one retries; nothing is dropped blindly).
   * @param {PrRef[]} prs
   * @returns {Promise<{valid: PrRef[], frozen: string|null,
   *   dropped: {pr: PrRef, why: string, mergedAtHead: boolean}[]}>}
   *   frozen = the base is under an open release-freeze; mergedAtHead = another path merged the
   *   PR at exactly the head this batch tested
   */
  async revalidate(prs) {
    const valid = [];
    const dropped = [];
    let frozen = null;
    if (!prs.length) return { valid, dropped, frozen };
    const ctx = {
      config: this.config,
      freezeIssues: await this.freezeIssues(),
      state: this.s,
      now: this.now(),
    };
    for (const pr of prs) {
      const snap = await this.snapshotPull(pr.n, { greenCheck: false });
      let why = null;
      if (snap.merged) why = "already merged";
      else if (snap.state !== "open") why = "closed";
      else if (snap.headSha !== pr.head) why = `head moved to ${head12(snap.headSha)}`;
      // Retargeted mid-CI: eligibility (managed base, freeze) would judge the NEW base.
      else if (snap.baseRef !== this.base) why = `base changed to ${snap.baseRef}`;
      else if (!snap.labels.includes(this.config.label)) why = "queue label removed";
      else {
        const verdict = this.m.eligibility.evaluateEligibility(snap, ctx);
        const reasons = (verdict.reasons ?? []).filter((r) => !SELF_REASONS.has(r.code));
        const freeze = reasons.find((r) => r.code === "base-frozen");
        if (freeze) frozen = frozen ?? (freeze.detail || "release-freeze open");
        const blocking = reasons.filter((r) => r.code !== "base-frozen");
        if (blocking.length) why = blocking.map((r) => r.code).join(", ");
      }
      if (why) dropped.push({ pr, why, mergedAtHead: snap.merged && snap.headSha === pr.head });
      else valid.push(pr);
    }
    return { valid, dropped, frozen };
  }

  /** Shadow bisection: would-land segments are not on the base; keep composing on top of them. */
  shadowStack(bisect, sha, refs) {
    if (this.config.mode !== "shadow" || !bisect?.landed?.length || !sha) return null;
    return { sha, refs: refs ?? [] };
  }

  /** Green batch on a frozen base (Hard Rule #21): keep it in flight, land after the freeze. */
  holdFrozen(f, detail) {
    const message = `base-frozen: ${detail}; ${f.batchId} waits for the freeze to lift`;
    const seen = this.hasEvent(
      (e) =>
        e.type === "land-rejected" &&
        e.batchId === f.batchId &&
        String(e.detail ?? "").startsWith("base-frozen")
    );
    if (!seen) {
      this.event("land-rejected", {
        batchId: f.batchId,
        prs: prNumbers(f.prs),
        sha: f.candidateSha,
        detail: message,
      });
    }
    this.note(message);
    // A freeze can last days: a batch stored at the landing stage (a tick blessed it and died, or
    // its withdrawal failed) must not stay mergeable by hand into the frozen branch meanwhile.
    this.leaveLandingStage(f);
  }

  /**
   * Store the in-flight batch `f`, held instead of landed, at stage "testing" when it was at the
   * landing stage. Nothing is written here: this tick's withdrawAbandoned sees the batch is no
   * longer kept at the landing stage and turns a `success` land status on its commits into
   * `failure` (one read per commit, once: later ticks find it stored at "testing"). The landing
   * count goes with the stage (inFlight.landAttempts exists only at "landing"). A no-op at any
   * other stage.
   */
  leaveLandingStage(f) {
    if (f.stage !== "landing") return;
    const rest = { ...f };
    delete rest.landAttempts;
    this.s.inFlight = { ...rest, stage: "testing" };
    // A dry-run withdraws nothing (withdrawAbandoned returns early): say what would happen.
    const goes = this.dryRun ? "would go" : "goes";
    this.note(`${f.batchId}: held at the landing stage, back to testing (its land status ${goes})`);
  }

  /**
   * A queue switched from live to shadow: shadow never lands, so a batch stored at the landing
   * stage (a live tick blessed it and died, or its withdrawal failed) goes back to "testing" and
   * its land status is withdrawn now, before this tick records it as would-land, drops,
   * recomposes or leaves it on a paused base. A no-op in live mode and for any other stage, so a
   * queue that was never live reads no status here.
   */
  async leaveLandingInShadow() {
    const f = this.s.inFlight;
    if (!this.shadow || f?.stage !== "landing") return;
    this.leaveLandingStage(f);
    await this.withdrawAbandoned();
    this.landing = null; // withdrawn: the end-of-tick pass has nothing left to read
  }

  async landOrWouldLand(f) {
    const live = this.config.mode === "live";
    const mergeFf = this.config.landing.mode === "merge-ff";

    // Live: the base tip, read once. merge-ff's "already landed" shortcut and the stored-base
    // check before the blessing both use it.
    const tip = live ? await this.gh.getBranchSha(this.base) : null;
    if (live && mergeFf && tip === f.candidateSha) {
      // A previous tick landed it and then lost the state save: record it, do not re-land.
      this.note(`${f.batchId} is already the tip of ${this.base}`);
      return this.afterLanded(f, f.candidateSha);
    }
    if (live && !mergeFf) {
      // A divergence whose pause was lost with a state save must not be landed over.
      const issue = await this.openDivergenceIssue();
      if (issue) return this.pauseForDivergence(f, issue);
    }

    const { valid, dropped, frozen } = await this.revalidate(f.prs);
    if (frozen) return this.holdFrozen(f, frozen);
    // Shadow lands nothing, and during shadow another path (Mergify) keeps merging the same PRs:
    // one merged at the tested head while the candidate CI ran does not make the green verdict
    // worthless, so it is named on the would-land event instead of discarding the batch.
    const mergedMeanwhile = live ? [] : dropped.filter((d) => d.mergedAtHead).map((d) => d.pr);
    if (dropped.length > mergedMeanwhile.length) {
      const detail = dropped.map((d) => `#${d.pr.n} ${d.why}`).join("; ");
      this.event("land-rejected", {
        batchId: f.batchId,
        prs: dropped.map((d) => d.pr.n),
        sha: f.candidateSha,
        detail: `batch changed before landing: ${detail}`,
      });
      this.note(`not landing ${f.batchId}: ${detail}`);
      return this.recompose(valid, f.bisect, {
        checked: true,
        onto: this.shadowStack(f.bisect, f.baseSha, [f.candidateRef]),
      });
    }

    // Defence in depth: bless (or record as would-land) only a candidate that IS the composition
    // of the stored PRs. The record comes from the state branch; a planted or corrupted one
    // (no PR, a PR the candidate does not merge, an extra commit) would otherwise get the land
    // status on a commit nobody composed, whose own CI it controls.
    if (!f.prs.length) return this.compositionMismatch(f, "the batch names no pull request");
    if (!this.fetchObject(f.candidateSha, [f.candidateRef])) return this.candidateLost(f);
    // A check that cannot run (a git error while recomposing, a failed rules read) is not a
    // verdict. Live fails the tick closed: the error propagates and nothing is blessed. Shadow,
    // which production runs and which blesses nothing, says on the would-land event which check
    // could not run and why instead of failing every tick after the expensive steps.
    const unrun = [];
    const orUnrun = async (check, run) => {
      try {
        return await run();
      } catch (error) {
        if (live) throw error;
        unrun.push(couldNotRun(check, error));
        return null;
      }
    };
    const composition = await orUnrun("composition check", () =>
      this.m.land.verifyComposition({
        git: this.gitRepo(),
        expectedBaseSha: f.baseSha,
        candidateSha: f.candidateSha,
        prs: f.prs,
        // squash-api lands the PR heads and then compares the base tree with the stored one
        ...(mergeFf ? {} : { treeSha: f.treeSha }),
        // each merge commit must carry the tree its two parents merge to: right parents and
        // trailers on any other tree would otherwise pass (shadow too, to measure it before live)
        trees: true,
      })
    );
    // A mismatch is a verdict: it pauses in shadow too.
    if (composition && !composition.ok) return this.compositionMismatch(f, composition.detail);
    // Second lock: the record and the candidate are only as trustworthy as the refs holding them.
    // Live blesses nothing while GitHub does not enforce the queue-refs ruleset on both; shadow
    // only says what live would do. Before the attempts limit: an unprotected ref stops the
    // landing whatever the count. A failed read throws in live (the next tick reads again).
    const refs = (await orUnrun("queue refs check", () => this.queueRefsProtection(f))) ?? {
      ok: true,
    };
    if (live && !refs.ok) {
      return this.pauseLanding(
        f,
        `queue refs are not protected (${refs.detail}): not blessed, not landed; ` +
          "apply apply-ruleset.mjs --kind queue-refs, then resume"
      );
    }
    // Third: bless only on the base the candidate was composed on. The stored baseSha comes from
    // the state branch too, and verifyComposition walks back to it, so a commit E that is not the
    // base tip (planted, or rewound away) passes the tree check with an honest candidate on top;
    // blessed, that candidate could be pushed by hand as a fast-forward that carries E. Live only
    // (shadow never lands and its base moves all the time), before the attempts limit and
    // markLanding: a batch already at the landing stage is not blessed again either.
    if (live && tip !== f.baseSha) {
      if (!tip) {
        return this.pauseLanding(f, `base ${this.base} not found: not blessed, not landed`);
      }
      return this.baseMoved(f, `base ${this.base} is at ${tip}, expected ${f.baseSha}`);
    }

    // Stored at the landing stage: earlier ticks blessed this batch and none of them reached a
    // verdict. After LANDING_ATTEMPTS_LIMIT of them it is not blessed again: pause and say so.
    const landAttempts = f.stage === "landing" ? (f.landAttempts ?? 1) : 0;
    if (landAttempts >= LANDING_ATTEMPTS_LIMIT) {
      const lastError = this.s.history.findLast((e) => e.type === "error")?.detail || "unknown";
      return this.pauseLanding(
        f,
        `landing of ${f.batchId} ended without a verdict ${landAttempts} times in a row ` +
          `(last error: ${lastError}); not blessed again`
      );
    }

    if (!live) {
      for (const pr of f.prs) this.s.shadow.processed[String(pr.n)] = pr.head;
      this.event("would-land", {
        batchId: f.batchId,
        prs: prNumbers(f.prs),
        sha: f.candidateSha,
        detail:
          `shadow mode: would ${this.config.landing.mode} onto ${head12(f.baseSha)}` +
          (mergedMeanwhile.length
            ? `; merged meanwhile by another path: ${formatPrs(mergedMeanwhile)}`
            : "") +
          (refs.ok ? "" : `; live mode would pause: queue refs unprotected (${refs.detail})`) +
          unrun.join(""),
      });
      this.note(`shadow: ${f.batchId} would land ${formatPrs(f.prs)}`);
      if (f.bisect) {
        // The next segment is stacked on this commit (shadowStack), as live stacks on the landed
        // tip: green on the profile that just ran, so a red segment on it needs no base check.
        this.recordBaseCheck({
          baseSha: f.candidateSha,
          ref: f.candidateRef,
          status: "green",
          startedAt: f.startedAt,
          signatures: [],
        });
      }
      return this.afterSegmentGreen(f);
    }

    if (this.dryRun) {
      this.note(`would land ${f.batchId} (${head12(f.candidateSha)}) on ${this.base}`);
      return;
    }

    if (this.ownerLands && !(this.deps.landGitFor && this.landGh)) {
      // Nothing is blessed that cannot be landed.
      return this.pauseLanding(f, 'landing needs OMNI_QUEUE_LAND_TOKEN (landing.actor is "owner")');
    }
    await this.markLanding(f);
    try {
      await this.blessForLanding(f);
    } catch (error) {
      // Partway (one squash-api head blessed, the next refused): withdraw what was written, then
      // fail the tick like any unknown failure. It is the App's credential, never the land token.
      await this.revokeOrNote(f, error);
      throw error;
    }
    let result;
    try {
      result = mergeFf
        ? await this.m.land.landMergeFf({
            git: this.landGitRepo(),
            base: this.base,
            candidateSha: f.candidateSha,
            expectedBaseSha: f.baseSha,
            prs: f.prs, // stacked PRs (alreadyContained) count as merged too
          })
        : await this.m.land.landSquashApi({
            gh: this.landGh,
            base: this.base,
            prs: f.prs,
            expectedBaseSha: f.baseSha,
            candidateTreeSha: f.treeSha,
          });
    } catch (error) {
      if (!isAuthFailure(error)) {
        // Outcome unknown (no verdict): withdraw the blessing and fail the tick; the next tick
        // re-observes the base (a landing that did happen is recognized) and blesses again.
        await this.revokeOrNote(f, error);
        throw error;
      }
      result = {
        ok: false,
        reason: "auth-failed",
        merged: [],
        detail: String(error.message).slice(0, 1000),
      };
    }

    if (result.ok) return this.afterLanded(f, result.newBaseSha ?? f.candidateSha);
    // A blessed commit of a batch that did not land could otherwise be merged by hand.
    await this.revokeLanding(f, result.reason);
    if (result.reason === "base-moved") return this.baseMoved(f, result.detail);
    if (result.reason === "tree-divergence") return this.onTreeDivergence(f, result);

    let detail = `landing ${f.batchId} failed (${result.reason}): ${result.detail ?? ""}`.trim();
    if (this.ownerLands && (result.reason === "auth-failed" || isAuthFailureText(detail))) {
      detail += ' (check OMNI_QUEUE_LAND_TOKEN: landing.actor is "owner")';
    }
    return this.pauseLanding(f, detail, result.merged ?? []);
  }

  /**
   * The base is not where `f` was composed: record it and recompose the same PRs on the current
   * tip (they were revalidated by landOrWouldLand just before). Whatever an earlier attempt
   * blessed is withdrawn by the caller (revokeLanding) or, for a batch stored at the landing
   * stage, by withdrawAbandoned at the end of the tick.
   */
  baseMoved(f, detail) {
    this.event("land-rejected", {
      batchId: f.batchId,
      prs: prNumbers(f.prs),
      sha: f.candidateSha,
      detail: `base moved${detail ? `: ${detail}` : ""}; recomposing`,
    });
    this.note(`${f.batchId}: base moved, recomposing ${formatPrs(f.prs)}`);
    return this.recompose(f.prs, f.bisect, { checked: true });
  }

  /**
   * Whether GitHub enforces the queue-refs ruleset on the state branch and on `f`'s candidate ref
   * (refs-guard). Read at most once per tick (two GETs) and never stored in the state: the
   * ruleset can be disabled between two ticks. A read error propagates: it fails a live tick, and
   * a shadow tick names it on the would-land event (landOrWouldLand); it is never taken for
   * "protected".
   * @returns {Promise<{ok: boolean, missing: string[], detail: string}>}
   */
  async queueRefsProtection(f) {
    if (this.queueRefs?.ref !== f.candidateRef) {
      const result = await readQueueRefsProtection({ gh: this.gh, candidateRef: f.candidateRef });
      this.queueRefs = { ref: f.candidateRef, result };
    }
    return this.queueRefs.result;
  }

  /**
   * The stored in-flight batch is not the composition of its candidate: nothing is blessed or
   * landed, and the queue pauses (state tampering or corruption is not something to retry).
   */
  compositionMismatch(f, detail) {
    return this.pauseLanding(
      f,
      `the stored in-flight batch ${f.batchId} does not match its candidate ` +
        `${head12(f.candidateSha)}: ${detail} (state tampering or corruption: not landed, ` +
        "not retried)"
    );
  }

  /** The landing cannot go on: pause with reason "error" (a resume recomposes the batch). */
  pauseLanding(f, detail, merged = []) {
    this.s.paused = {
      reason: "error",
      since: this.now(),
      baseSha: f.baseSha,
      detail,
      issue: null,
    };
    this.s.inFlight = null;
    this.event("error", { batchId: f.batchId, prs: merged, detail });
    this.note(`paused: ${detail}`);
  }

  /** Commits that need the land status: the candidate (merge-ff) or each PR head (squash-api). */
  landShas(f) {
    if (this.config.landing.mode === "merge-ff") return [f.candidateSha];
    return [...new Set(f.prs.map((pr) => pr.head))];
  }

  /**
   * Store the landing stage of `f` BEFORE its land status is written: a tick that dies between
   * the blessing and its final save leaves a record the next tick reads (withdrawAbandoned). A
   * lost compare-and-swap throws before anything is blessed (the tick is redone).
   *
   * Each attempt is counted in `landAttempts` and saved before its blessing, so a tick that dies
   * mid-landing still counts (LANDING_ATTEMPTS_LIMIT). A batch already at the landing stage was
   * blessed by an earlier tick that reached no verdict: this is its next attempt. A document of
   * the code before the count has no `landAttempts` there: that stored attempt counts as 1.
   */
  async markLanding(f) {
    const landAttempts = f.stage === "landing" ? (f.landAttempts ?? 1) + 1 : 1;
    this.s.inFlight = { ...f, stage: "landing", landAttempts };
    // Its commits are blessed on purpose now: a stored withdrawal of one of them is void. Dropped
    // in this save, so a tick that dies after the blessing leaves the landing stage (which
    // withdrawAbandoned reads) and no stale entry that would un-bless a commit the batch lands.
    const blessing = new Set(this.landShas(f));
    this.setLandWithdrawals((this.s.landWithdrawals ?? []).filter((w) => !blessing.has(w.sha)));
    const message =
      `omni-queue: landing ${f.batchId} on ${this.base}` +
      (landAttempts > 1 ? ` (attempt ${landAttempts})` : "");
    const result = await this.deps.store.save(this.base, this.s, this.loaded.version, message);
    if (!result.ok) {
      throw new StateConflictError(`state of ${this.base} changed during the tick`);
    }
    this.loaded = { state: result.state, version: result.version };
    this.s = structuredClone(result.state);
    this.landing = structuredClone(this.s.inFlight);
  }

  async writeLandStatus(f, state, description) {
    for (const sha of this.landShas(f)) {
      await this.gh.createCommitStatus(sha, {
        state,
        context: this.config.landing.statusContext,
        description,
        targetUrl: this.checksUrl(f.candidateSha),
      });
    }
  }

  /**
   * Right before landing, the App (this.gh, never the landing client) writes the land status the
   * base's ruleset requires: the landing push or merge is accepted only with it.
   */
  async blessForLanding(f) {
    const shas = this.landShas(f);
    const { statusContext } = this.config.landing;
    await this.writeLandStatus(f, "success", `omni-queue ${f.batchId}: checks green`);
    this.event("land-blessed", {
      batchId: f.batchId,
      prs: prNumbers(f.prs),
      sha: f.candidateSha,
      detail: `${statusContext} success on ${shas.length} commit(s)`,
    });
    this.note(`${f.batchId}: ${statusContext} success on ${shas.map(head12).join(", ")}`);
  }

  /**
   * The landing did not complete: turn the land status of the same commits into failure. Best
   * effort per commit: every SHA is attempted and nothing is thrown, so the caller's pause or
   * rethrow always happens. @returns {Promise<string|null>} the failed withdrawals, or null
   */
  async revokeLanding(f, why) {
    return this.withdrawLandStatus(f, this.landShas(f), why);
  }

  /** revokeLanding before a rethrow: a failed withdrawal is named in the error it rethrows. */
  async revokeOrNote(f, error) {
    const failed = await this.revokeLanding(f, "error");
    if (failed && error instanceof Error) error.message = `${error.message}; ${failed}`;
  }

  /**
   * Write `failure` in landing.statusContext on each of `shas`, attempting every one. A refused
   * write is recorded (an `error` event and a note), stored in state.landWithdrawals for the next
   * ticks to retry (storeWithdrawal), and returned; nothing is thrown. A tick that then throws
   * saves none of it, but its batch is still stored at the landing stage (markLanding), which the
   * next tick either lands or withdraws (withdrawAbandoned).
   * @returns {Promise<string|null>}
   */
  async withdrawLandStatus(f, shas, why) {
    const { statusContext } = this.config.landing;
    const failed = [];
    for (const sha of shas) {
      try {
        await this.gh.createCommitStatus(sha, {
          state: "failure",
          context: statusContext,
          description: `omni-queue ${f.batchId}: landing withdrawn (${why})`,
          targetUrl: this.checksUrl(f.candidateSha),
        });
      } catch (error) {
        failed.push(`${head12(sha)} (${String(error?.message ?? error).slice(0, 200)})`);
        this.storeWithdrawal(f, sha, why);
      }
    }
    if (!failed.length) {
      this.note(`${f.batchId}: ${statusContext} withdrawn (${why})`);
      return null;
    }
    const detail = `${f.batchId}: could not withdraw ${statusContext} (${why}) on ${failed.join(", ")}`;
    this.event("error", {
      batchId: f.batchId,
      prs: prNumbers(f.prs),
      sha: f.candidateSha,
      detail: detail.slice(0, 500),
    });
    this.note(detail);
    return detail;
  }

  /**
   * A batch stored (or marked this tick) at the landing stage that this tick neither landed nor
   * kept at that stage: dropped, recomposed, retried, isolated as culprit, lost, paused. Its land
   * status may still be `success` (a tick that died after the blessing, a withdrawal that
   * failed): read the land status that decides a withdrawal on each of its commits
   * (newestAppLandStatus) and write `failure` where it is `success`. Only a batch at the landing
   * stage pays these reads.
   * Every mode (a batch stored at the landing stage in shadow was blessed by live mode before a
   * switch; only live stores one), never in a dry-run.
   */
  async withdrawAbandoned() {
    const f = this.landing;
    if (!f || this.dryRun || this.landedBatch === f.batchId) return;
    const now = this.s.inFlight;
    const kept =
      now?.stage === "landing" && now.batchId === f.batchId && now.candidateSha === f.candidateSha;
    if (kept) return;
    const blessed = [];
    for (const sha of this.landShas(f)) {
      try {
        const newest = await this.newestAppLandStatus(sha);
        if (newest?.state === "success") blessed.push(sha);
      } catch (error) {
        this.note(`could not read the land status of ${head12(sha)}: ${error.message}`);
        blessed.push(sha); // unknown: withdraw it anyway
      }
    }
    if (blessed.length) await this.withdrawLandStatus(f, blessed, "batch abandoned");
  }

  /**
   * The land status (landing.statusContext) on `sha` that decides a withdrawal, or null. The
   * release ruleset counts only the App's statuses (`<appSlug>[bot]`, the `creator`
   * github.normalizeStatus carries), as eligibility counts only the App's approval status, so a
   * status by a readable other creator is ignored: it neither hides the App's `success` nor
   * stands for one. A status whose creator cannot be read (missing, null or empty) may be the
   * App's, and may only ADD a reason to withdraw, never remove one (a withdrawal only ever writes
   * `failure`):
   *  - the newest status created by the App, when it is `success`;
   *  - else the newest among the App's and the unknown-creator ones, when it is `success`;
   *  - else (nothing to withdraw) the App's newest status, or the newest unknown-creator one, or
   *    null when there is neither, for the log lines of the callers.
   */
  async newestAppLandStatus(sha) {
    const { statusContext } = this.config.landing;
    const app = `${this.config.appSlug}[bot]`.toLowerCase();
    const statuses = (await this.gh.listCommitStatuses(sha)).filter(
      (status) => status.context === statusContext
    );
    const creatorOf = (status) =>
      typeof status.creator === "string" ? status.creator.trim().toLowerCase() : "";
    const byApp = statuses.find((status) => creatorOf(status) === app) ?? null;
    const appOrUnknown = statuses.find((status) => [app, ""].includes(creatorOf(status))) ?? null;
    if (byApp?.state === "success") return byApp;
    if (appOrUnknown?.state === "success") return appOrUnknown;
    return byApp ?? appOrUnknown;
  }

  /**
   * Keep a `failure` GitHub refused to write on `sha` for the next ticks (retryWithdrawals): one
   * entry per SHA (a new refusal updates `why` and counts an attempt, `since` stays), at most
   * LAND_WITHDRAWALS_LIMIT. A full list drops its oldest entry, and an `error` event says which.
   */
  storeWithdrawal(f, sha, why) {
    const list = [...(this.s.landWithdrawals ?? [])];
    const i = list.findIndex((w) => w.sha === sha);
    if (i >= 0) {
      list[i] = { ...list[i], why, attempts: list[i].attempts + 1 };
      return this.setLandWithdrawals(list);
    }
    if (list.length >= LAND_WITHDRAWALS_LIMIT) {
      const dropped = list.shift();
      const detail =
        `${dropped.batchId}: stored withdrawal of ${this.config.landing.statusContext} on ` +
        `${head12(dropped.sha)} dropped (${LAND_WITHDRAWALS_LIMIT} stored already); its newest ` +
        "status may still be success";
      this.event("error", { batchId: dropped.batchId, sha: dropped.sha, detail });
      this.note(detail);
    }
    list.push({
      sha,
      batchId: f.batchId,
      candidateSha: f.candidateSha,
      why,
      since: this.now(),
      attempts: 1,
    });
    this.setLandWithdrawals(list);
  }

  /** state.landWithdrawals = `list`; an empty list leaves no field (documents stay as before). */
  setLandWithdrawals(list) {
    if (list.length) this.s.landWithdrawals = list;
    else delete this.s.landWithdrawals;
  }

  /**
   * Retry each stored withdrawal (storeWithdrawal): read the land status that decides a
   * withdrawal on its commit (newestAppLandStatus); `success` → write `failure` again. The entry
   * goes once that write succeeds, or when that status is not `success` (withdrawn since, or none:
   * nothing of the queue's to withdraw; a status by a readable other creator changes nothing, and
   * one without a readable creator can only add a reason to withdraw); a refused write keeps it
   * and counts an attempt, and so does a failed read. The count never drops an entry:
   * the queue never gives up on withdrawing a blessing. No event: the error was recorded when the
   * entry was stored, and the entry with its `attempts` is the record of every retry since. Runs
   * on a paused queue too (a pause must not keep a stray `success` alive) and in every mode
   * (entries stored by live mode survive a switch to shadow; a queue that was never live has none,
   * so it reads nothing); never in a dry-run (which writes nothing).
   */
  async retryWithdrawals() {
    const stored = this.s.landWithdrawals ?? [];
    if (!stored.length || this.dryRun) return;
    const { statusContext } = this.config.landing;
    const kept = [];
    for (const w of stored) {
      let newest;
      try {
        newest = await this.newestAppLandStatus(w.sha);
      } catch (error) {
        kept.push({ ...w, attempts: w.attempts + 1 });
        this.note(
          `could not read the land status of ${head12(w.sha)} (stored withdrawal of ` +
            `${w.batchId}, ${w.attempts + 1} failed attempts): ${error.message}`
        );
        continue;
      }
      if (newest?.state !== "success") {
        this.note(
          `${w.batchId}: stored withdrawal of ${head12(w.sha)} dropped ` +
            `(the App's ${statusContext} is ${newest?.state ?? "absent"})`
        );
        continue;
      }
      try {
        await this.gh.createCommitStatus(w.sha, {
          state: "failure",
          context: statusContext,
          description: `omni-queue ${w.batchId}: landing withdrawn (${w.why})`,
          targetUrl: this.checksUrl(w.candidateSha),
        });
        this.note(
          `${w.batchId}: ${statusContext} withdrawn on ${head12(w.sha)} (${w.why}; ` +
            `${w.attempts} failed attempt(s) since ${w.since})`
        );
      } catch (error) {
        kept.push({ ...w, attempts: w.attempts + 1 });
        this.note(
          `${w.batchId}: withdrawal of ${statusContext} on ${head12(w.sha)} refused again ` +
            `(${w.attempts + 1} failed attempts): ${String(error?.message ?? error).slice(0, 200)}`
        );
      }
    }
    this.setLandWithdrawals(kept);
  }

  async afterLanded(f, sha) {
    const { label, protectedApprovalLabel } = this.config;
    this.landedBatch = f.batchId; // its land status stays: the commits are on the base
    // The new tip is the candidate (merge-ff) or a squash of the same tree (squash-api, checked by
    // tree-divergence), green on the profile that just ran: a red batch on it blames its PRs
    // without a base check. Recorded like any verdict, it replaces an older one for this SHA.
    this.recordBaseCheck({
      baseSha: sha,
      ref: f.candidateRef,
      status: "green",
      startedAt: f.startedAt,
      signatures: [],
    });
    this.s.counters.landedPrs += f.prs.length;
    this.s.counters.landedBatches += 1;
    this.event("landed", { batchId: f.batchId, prs: prNumbers(f.prs), sha });
    this.note(`landed ${f.batchId} (${formatPrs(f.prs)}) at ${head12(sha)}`);
    for (const pr of f.prs) {
      await this.removeLabel(pr.n, label);
      await this.removeLabel(pr.n, protectedApprovalLabel);
      await this.commentPr(
        pr.n,
        `landed:${head12(pr.head)}`,
        [
          `✅ **omni-queue** landed this PR in \`${this.base}\`.`,
          "",
          `- Head: \`${pr.head}\``,
          `- Batch: \`${f.batchId}\` (${f.prs.length} PR(s)), base tip now \`${sha}\``,
          `- Tested candidate: ${this.checksUrl(f.candidateSha)}`,
        ].join("\n")
      );
    }
    return this.afterSegmentGreen(f);
  }

  /** A green (landed or would-land) candidate: continue a bisection, else become idle. */
  async afterSegmentGreen(f) {
    this.s.inFlight = null;
    if (!f.bisect) return;
    const advanced = this.m.bisect.advanceBisection(f.bisect, "green");
    if (advanced.bisect) {
      return this.composeSegments(advanced.bisect, {
        onto: this.shadowStack(advanced.bisect, f.candidateSha, [f.candidateRef]),
      });
    }
    this.note(`bisection of ${f.bisect.rootBatchId} finished`);
  }

  /** The candidate's commit is gone from origin (ref deleted, object unreachable): start over. */
  async candidateLost(f) {
    const parked = f.kind === "base-check" ? f.pendingRed : null;
    const prs = parked ? parked.prs : f.prs;
    const bisect = parked ? (parked.bisect ?? null) : f.bisect;
    const detail = `candidate ${f.candidateRef} (${head12(f.candidateSha)}) is gone from origin`;
    this.event("error", {
      batchId: f.batchId,
      prs: prNumbers(prs),
      sha: f.candidateSha,
      detail: `${detail}; recomposing ${formatPrs(prs)}`,
    });
    this.note(`${detail}: recomposing ${formatPrs(prs)}`);
    return this.recompose(prs, bisect, { onto: this.shadowStack(bisect, f.baseSha, []) });
  }

  /** An open divergence issue exists although the state has no pause: restore the pause. */
  pauseForDivergence(f, issue) {
    this.s.paused = {
      reason: "tree-divergence",
      since: this.now(),
      baseSha: f.baseSha,
      detail: `divergence issue #${issue.number} is open: close it, then resume the queue`,
      issue: issue.number,
    };
    this.s.inFlight = null;
    this.event("tree-divergence", {
      batchId: f.batchId,
      prs: prNumbers(f.prs),
      sha: f.candidateSha,
      detail: `issue #${issue.number} still open: ${f.batchId} not landed`,
    });
    this.note(`paused: tree divergence issue #${issue.number} is open`);
  }

  async onTreeDivergence(f, result) {
    const title = divergenceTitle(this.base);
    const body = [
      `omni-queue paused \`${this.base}\`: after the squash-api landing of batch \`${f.batchId}\` the`,
      "tree of the base differs from the tree that CI validated.",
      "",
      `- Candidate: \`${f.candidateSha}\` (tree \`${f.treeSha}\`)`,
      `- Base tree after landing: \`${result.actualTree ?? "unknown"}\``,
      `- PRs merged: ${(result.merged ?? []).map((n) => `#${n}`).join(", ") || "none"}`,
      `- Batch: ${formatPrs(f.prs)}`,
      this.deps.runUrl ? `- Run: ${this.deps.runUrl}` : null,
      "",
      "Investigate and fix the base if needed, close this issue, then resume the queue",
      "(`workflow_dispatch` action `resume`). While this issue is open, squash-api landings stay",
      "paused.",
    ]
      .filter((line) => line !== null)
      .join("\n");
    // The issue is labeled so the next tick can find it even if this tick's state save is lost.
    const existing = await this.openDivergenceIssue();
    let issue = existing?.number ?? null;
    if (existing) await this.comment(existing.number, `divergence:${f.batchId}`, body);
    else if (this.dryRun) this.note(`would open issue "${title}"`);
    else issue = (await this.gh.createIssue({ title, body, labels: [DASHBOARD_LABEL] })).number;
    this.s.paused = {
      reason: "tree-divergence",
      since: this.now(),
      baseSha: f.baseSha,
      detail: `squash-api landing of ${f.batchId} produced tree ${result.actualTree ?? "?"}`,
      issue,
    };
    this.s.inFlight = null;
    this.event("tree-divergence", {
      batchId: f.batchId,
      prs: result.merged ?? [],
      sha: f.candidateSha,
      detail: `expected tree ${f.treeSha}, got ${result.actualTree ?? "unknown"}`,
    });
    this.note(`paused: tree divergence after landing ${f.batchId}`);
  }

  async annotationsFor(failures) {
    const byRun = {};
    for (const run of failures) {
      try {
        byRun[run.id] = await this.gh.listCheckRunAnnotations(run.id);
      } catch (error) {
        this.note(`annotations of check run ${run.id} unavailable: ${error.message}`);
        byRun[run.id] = [];
      }
    }
    return byRun;
  }

  async findBaseRedIssue() {
    const title = baseRedTitle(this.base);
    const issues = await this.gh.listIssues({ labels: [BASE_RED_LABEL], state: "open" });
    return issues.find((issue) => issue.title === title) ?? null;
  }

  async onRed(f, failures) {
    if (await this.waitForRerun(f, failures)) return;
    const names = failures.map((run) => run.name).join(", ") || "unknown";
    const annotations = await this.annotationsFor(failures);
    const signatures = this.m.classify.extractSignatures(failures, annotations);

    if (f.kind === "base-check") {
      const own = this.m.classify.classifyRed({
        signatures,
        baseSha: f.baseSha,
        baseCheck: null,
        aggregateChecks: this.config.aggregateChecks,
      });
      if (own.kind === "infra") {
        return this.infraPath(f, `base-check infra failure: ${own.detail}`, failures);
      }
      this.event("checks-red", {
        batchId: f.batchId,
        sha: f.candidateSha,
        detail: `base-check red: ${names}`,
      });
      // A job that hits its time limit on the bare base is a failure of that job on the base,
      // even next to other failures: recorded as a hang, a batch that hangs on the same job
      // matches it by check name instead of being blamed for what the base cannot pass.
      const hangOnBase = this.m.classify.hangSignatures(failures, annotations);
      return this.settleBaseCheck(f, [...signatures, ...hangOnBase], "red");
    }

    const verdict = this.m.classify.classifyRed({
      signatures,
      baseSha: f.baseSha,
      baseCheck: this.baseVerdict(f.baseSha),
      aggregateChecks: this.config.aggregateChecks,
    });
    const rerun = this.rerunApplies(f, verdict)
      ? await this.rerunFailed(f, failures, verdict)
      : { wait: false };
    if (rerun.wait) return; // nothing classified yet: the candidate's runs have not concluded
    // A batch red again after its failed jobs were re-run is the same red batch: counted once.
    if (!f.rerun) this.s.counters.redBatches += 1;
    this.event("checks-red", {
      batchId: f.batchId,
      prs: prNumbers(f.prs),
      sha: f.candidateSha,
      detail: rerun.refused ? `${names}; re-run refused (${rerun.refused})` : names,
    });
    this.note(`${f.batchId} red (${names}): ${verdict.kind}`);
    if (rerun.flaky) {
      this.event("flaky-rerun", rerun.flaky); // the verdict waits for the re-run (waitForRerun)
      return;
    }
    return this.followRedVerdict(f, failures, signatures, verdict, names);
  }

  /**
   * Whether red candidate `f`, classified `verdict`, has its failed jobs re-run once before
   * anyone is blamed: only a batch or an ordinary bisection segment (never a base check, an infra
   * retry or a segment of a hang bisection), only when the verdict would blame a PR or test the
   * base (`pr-red`, `needs-base-check`), once per candidate (no `rerun` record for its ref), and
   * only with config.flakyReruns. An `infra` verdict keeps the infra path (a job that hit its
   * time limit included); `base-red` blames nobody.
   */
  rerunApplies(f, verdict) {
    return (
      this.config.flakyReruns > 0 &&
      f.kind === "batch" &&
      f.attempts === 0 &&
      !f.bisect?.hang &&
      f.rerun?.ref !== f.candidateRef &&
      (verdict.kind === "pr-red" || verdict.kind === "needs-base-check")
    );
  }

  /**
   * The push workflow runs of candidate `f`'s own ref and commit (the filters re-checked, as in
   * pushCheckRuns: a listing that ignored one must not widen what the re-run reads).
   */
  async candidatePushRuns(f) {
    const runs = await this.gh.listWorkflowRuns({
      branch: f.candidateRef,
      headSha: f.candidateSha,
      event: "push",
    });
    return runs.filter(
      (run) =>
        run.event === "push" && run.headBranch === f.candidateRef && run.headSha === f.candidateSha
    );
  }

  /** True once config.checksTimeoutMinutes have passed since candidate `f` started (tick clock). */
  pastChecksTimeout(f) {
    const elapsed = Date.parse(this.now()) - Date.parse(f.startedAt);
    return elapsed >= this.config.checksTimeoutMinutes * 60_000;
  }

  /**
   * The re-run step of red candidate `f`, which rerunApplies, before it is classified. GitHub
   * re-runs the failed jobs of a completed workflow run only, and a candidate turns red at its
   * first failed job while its runs still go on, so:
   *  - a push run of the ref at attempt 2 or later that is not completed is a re-run in flight,
   *    whoever asked for it (a tick that died after its call and before its save, a person):
   *    adopted as `inFlight.rerun` without a call or a `flaky-rerun` event, and waited for;
   *  - another push run of the ref not completed: waited for, nothing stored;
   *  - both waits end at config.checksTimeoutMinutes from the candidate's start: then the
   *    candidate is classified without a re-run;
   *  - every run completed: the failed ones at their first attempt are re-run (the App's client,
   *    this.gh), `inFlight.rerun` is stored and the `flaky-rerun` event is returned for onRed to
   *    record after `checks-red`. A run at a later attempt is never re-run again.
   * A wait takes a batch stored at the landing stage back to testing (no blessing while it is
   * red). A failed listing or a refused call is returned as `refused` for the `checks-red`
   * detail. A dry-run plans the re-run without calling GitHub (like a push).
   * @returns {Promise<{wait: boolean, refused?: string, flaky?: object}>}
   */
  async rerunFailed(f, failures, verdict) {
    let runs;
    try {
      runs = await this.candidatePushRuns(f);
    } catch (error) {
      this.note(`${f.batchId}: workflow runs unreadable, failed jobs not re-run: ${error.message}`);
      return { wait: false, refused: "workflow runs unreadable" };
    }
    const open = runs.filter((run) => run.status !== "completed");
    const inFlight = open.filter((run) => run.runAttempt > 1);
    if (open.length && this.pastChecksTimeout(f)) {
      this.note(
        inFlight.length
          ? `${f.batchId}: the re-run of its failed jobs has not concluded after ` +
              `${this.config.checksTimeoutMinutes} min: classifying the failure`
          : `${f.batchId}: ${open.length} run(s) of ${f.candidateRef} not concluded after ` +
              `${this.config.checksTimeoutMinutes} min: failed jobs not re-run`
      );
      return { wait: false };
    }
    if (inFlight.length) {
      const rerun = this.rerunRecord(f, failures, inFlight);
      this.s.inFlight = { ...f, rerun };
      this.leaveLandingStage(this.s.inFlight);
      // The red batch is counted here: when it is classified, onRed finds the record and does
      // not count it again (the tick that asked for this re-run, if any, died before its save).
      this.s.counters.redBatches += 1;
      this.note(
        `${f.batchId}: a re-run of its failed jobs is in flight (workflow run ` +
          `${rerun.runIds.join(", ")}): waiting for it, not re-run again`
      );
      return { wait: true };
    }
    if (open.length) {
      this.note(
        `${f.batchId}: waiting for ${open.length} run(s) of ${f.candidateRef} to conclude ` +
          "before re-running the failed jobs"
      );
      this.leaveLandingStage(f);
      return { wait: true };
    }
    const failed = runs.filter((run) => FAILED_CONCLUSIONS.has(run.conclusion));
    const fresh = failed.filter((run) => !(run.runAttempt > 1));
    if (!fresh.length) {
      this.note(
        failed.length
          ? `${f.batchId}: its failed push run(s) were re-run already: not re-run again`
          : `${f.batchId}: no failed push run to re-run`
      );
      return { wait: false };
    }
    const accepted = [];
    const refusals = [];
    for (const run of fresh) {
      if (this.dryRun) {
        this.note(`would re-run the failed jobs of workflow run ${run.id}`);
        accepted.push(run);
        continue;
      }
      try {
        await this.gh.rerunFailedJobs(run.id);
        accepted.push(run);
      } catch (error) {
        const status = error?.status ? ` (${error.status})` : "";
        this.note(
          `${f.batchId}: re-run of workflow run ${run.id} refused${status}: ${error.message}`
        );
        refusals.push(error?.status ? String(error.status) : String(error?.message ?? error));
      }
    }
    const refused = refusals.length ? refusalReason(refusals) : undefined;
    if (!accepted.length) return { wait: false, refused };
    const rerun = this.rerunRecord(f, failures, accepted);
    const next = { ...f, rerun };
    this.s.inFlight = next;
    // A batch stored at the landing stage keeps no blessing while its jobs run again.
    this.leaveLandingStage(next);
    const segment = f.bisect?.segments?.[0] ?? f.prs;
    const then =
      verdict.kind === "needs-base-check"
        ? "a base check"
        : segment.length === 1
          ? `dequeuing #${segment[0].n}`
          : "bisecting";
    const jobs = jobList(rerun.jobs);
    this.note(`${f.batchId}: failed jobs re-run once (${jobs}) before ${then}`);
    return {
      wait: false,
      refused,
      flaky: {
        batchId: f.batchId,
        prs: prNumbers(f.prs),
        sha: f.candidateSha,
        detail: `re-running the failed jobs of ${f.batchId} once (${jobs}) before ${then}`,
      },
    };
  }

  /**
   * `inFlight.rerun` for candidate `f` whose push runs `runs` re-run their failed jobs: the jobs
   * are the failures whose check suite belongs to one of those runs (all of them when none can be
   * matched, so waitForRerun still has the old failures to wait on); `afterMs` the newest GitHub
   * timestamp this tick read (a result after it belongs to the re-run).
   */
  rerunRecord(f, failures, runs) {
    const suites = new Set(runs.map((run) => run.checkSuiteId));
    const names = (list) => [...new Set(list.map((run) => run.name))];
    const matched = names(failures.filter((run) => suites.has(run.checkSuiteId)));
    return {
      ref: f.candidateRef,
      requestedAt: this.now(),
      afterMs: this.inFlightObservedMs ?? Date.parse(this.now()),
      runIds: runs.map((run) => run.id),
      jobs: matched.length ? matched : names(failures),
    };
  }

  /**
   * True while red candidate `f`, whose failed jobs were re-run (inFlight.rerun on this ref),
   * waits for the re-run's verdict:
   *  - a push run of the ref at attempt 2 or later is not completed: waited for up to
   *    config.checksTimeoutMinutes from the candidate's start (never cut short by
   *    RERUN_START_MINUTES);
   *  - such an attempt is completed: no wait, its verdict is the one read;
   *  - no run of the ref shows a later attempt yet (or the runs cannot be read): waited for while
   *    every failure of a re-run job started at or before `rerun.afterMs` (the old failure, not
   *    the re-run's verdict), at most RERUN_START_MINUTES after the request; then the re-run is
   *    taken as never started, and the old failure is classified.
   * A wait takes a batch stored at the landing stage back to testing.
   */
  async waitForRerun(f, failures) {
    const rerun = f.rerun;
    if (!rerun || rerun.ref !== f.candidateRef) return false;
    let runs = null;
    try {
      runs = await this.candidatePushRuns(f);
    } catch (error) {
      this.note(
        `${f.batchId}: workflow runs unreadable while its re-run is awaited: ${error.message}`
      );
    }
    if (runs) {
      const inFlight = runs.filter((run) => run.runAttempt > 1 && run.status !== "completed");
      if (inFlight.length) {
        if (this.pastChecksTimeout(f)) {
          this.note(
            `${f.batchId}: the re-run of its failed jobs has not concluded after ` +
              `${this.config.checksTimeoutMinutes} min: classifying the failure`
          );
          return false;
        }
        this.note(
          `${f.batchId}: waiting for the re-run of its failed jobs (${jobList(rerun.jobs)}): ` +
            `${inFlight.length} run(s) of ${f.candidateRef} not concluded`
        );
        this.leaveLandingStage(f);
        return true;
      }
      if (runs.some((run) => run.runAttempt > 1)) return false; // concluded: read its verdict
    }
    const watched = failures.filter((run) => rerun.jobs.includes(run.name));
    const old = (run) => {
      const at = resultTime(run);
      return at === null || at <= rerun.afterMs;
    };
    if (!watched.length || !watched.every(old)) return false;
    const waited = Date.parse(this.now()) - Date.parse(rerun.requestedAt);
    if (waited >= RERUN_START_MINUTES * 60_000) {
      this.note(
        `${f.batchId}: the re-run of its failed jobs has not started after ` +
          `${RERUN_START_MINUTES} min: classifying the old failure`
      );
      return false;
    }
    this.note(`${f.batchId}: waiting for the re-run of its failed jobs (${jobList(rerun.jobs)})`);
    this.leaveLandingStage(f);
    return true;
  }

  /**
   * The finished verdict on `baseSha` that decides a red batch on it: green, red, or timeout (a
   * base check that never produced a result; it cannot be redone for the same SHA, so a red batch
   * on that base is PR-red rather than the start of another base check).
   */
  baseVerdict(baseSha) {
    return (
      this.s.baseChecks.find(
        (b) => b.baseSha === baseSha && ["green", "red", "timeout"].includes(b.status)
      ) ?? null
    );
  }

  /** Act on the classification of red batch `f` (from onRed, or onRepeatedHang for a hang). */
  async followRedVerdict(f, failures, signatures, verdict, names) {
    switch (verdict.kind) {
      case "infra":
        return this.infraPath(f, verdict.detail || names, failures);
      case "needs-base-check":
        return this.startBaseCheck(f, signatures);
      case "base-red":
        return this.pauseBaseRed(f, await this.findBaseRedIssue(), redDetail(verdict));
      case "pr-red":
        return this.onPrRed({ ...f, failures, signatures });
      default:
        throw new Error(`unknown red classification: ${verdict.kind}`);
    }
  }

  /**
   * Record the verdict of base check `f` (`status` "red" with the base's `signatures`, or
   * "timeout": no result after its retries), clear it, and settle the batch parked behind it:
   * base-red pause when its failures match the base's, otherwise PR-red (bisection / culprit). A
   * timed-out base check gives no base-red evidence (classifyRed → pr-red).
   */
  async settleBaseCheck(f, signatures, status) {
    const baseCheck = {
      baseSha: f.baseSha,
      ref: f.candidateRef,
      status,
      startedAt: f.startedAt,
      signatures,
    };
    this.recordBaseCheck(baseCheck);
    this.s.inFlight = null;
    const parked = f.pendingRed;
    if (!parked) return;
    const verdict = this.m.classify.classifyRed({
      signatures: parked.signatures,
      baseSha: f.baseSha,
      baseCheck,
      aggregateChecks: this.config.aggregateChecks,
    });
    this.note(`base-check ${head12(f.baseSha)} ${status}: the parked batch is ${verdict.kind}`);
    if (verdict.kind === "base-red") {
      const issue = await this.findBaseRedIssue(); // commented on when one is open
      return this.pauseBaseRed({ ...parked, baseSha: f.baseSha }, issue, redDetail(verdict));
    }
    const ref = this.parkedRef(parked);
    const parkedFailures = await this.failuresOf(parked.candidateSha, f.startedAt, ref);
    return this.onPrRed({
      ...parked,
      failures: parkedFailures,
      baseSha: f.baseSha,
      candidateRef: ref,
    });
  }

  /**
   * Signatures of the hanging jobs when every failure of `failures` is hang-shaped
   * (classify.isHangShaped), else null. An aggregate gate with no test-level key next to other
   * failures only repeats them (as in classifyRed) and is left out.
   */
  async repeatedHang(failures) {
    if (!failures.length) return null;
    const annotations = await this.annotationsFor(failures);
    const signatures = this.m.classify.extractSignatures(failures, annotations);
    const aggregate = new Set(this.config.aggregateChecks ?? []);
    const own = failures.filter((_, i) => signatures[i].key || !aggregate.has(signatures[i].check));
    if (!own.length) return null;
    const hang = this.m.classify.hangSignatures(own, annotations);
    return hang.length === own.length ? hang : null;
  }

  /**
   * The same job timed out on every attempt of `f` (or once inside a hang bisection): a
   * suspected hanging test, not the machine. A base check settles its parked batch with the hang
   * as the base's failure; a batch is classified like any red batch with the hang signatures
   * (base check first when the base has no verdict, then bisection with `hang: true`).
   */
  async onRepeatedHang(f, failures, hang) {
    const checks = new Set(hang.map((s) => s.check));
    const jobs =
      failures
        .filter((run) => checks.has(classifyModule.normalizeCheckName(run.name)))
        .map((run) => run.name)
        .join(", ") || [...checks].join(", ");
    const runs = f.attempts + 1;
    this.event("hang-suspected", {
      batchId: f.batchId,
      prs: prNumbers(f.prs),
      sha: f.candidateSha,
      detail:
        `${jobs} timed out on ${runs} run(s) of this candidate` +
        `${f.bisect?.hang ? " (hang bisection: not retried)" : ""}: suspected hanging test`,
    });
    if (f.kind === "base-check") {
      this.note(`base-check ${head12(f.baseSha)}: ${jobs} timed out on the bare base too`);
      return this.settleBaseCheck(f, hang, "red");
    }
    const verdict = this.m.classify.classifyRed({
      signatures: hang,
      baseSha: f.baseSha,
      baseCheck: this.baseVerdict(f.baseSha),
      aggregateChecks: this.config.aggregateChecks,
    });
    this.note(`${f.batchId}: ${jobs} timed out on every run, suspected hang: ${verdict.kind}`);
    // the count travels with the red batch (and its parked copy) to the culprit comment
    return this.followRedVerdict({ ...f, timedOutRuns: runs }, failures, hang, verdict, jobs);
  }

  /**
   * Start of a retry whose ref a lost tick already pushed: results newer than the failed attempt
   * (GitHub clock, not the runner's) belong to the retry. Falls back to now when none was read.
   */
  retryCutoff() {
    if (this.inFlightObservedMs === null) return this.now();
    return new Date(Math.min(this.inFlightObservedMs + 1, Date.parse(this.now()))).toISOString();
  }

  /**
   * Infrastructure failure of `f` (`failures`: its failing runs, [] for a queue-level timeout):
   * retry the same SHA under a new ref while retries are left, then pause. Exception: when the
   * retries are used up (or `f` is a segment of a hang bisection) and every failure of every run
   * of `f` was a job that hit its time limit, the job hangs on this code: onRepeatedHang, not a
   * pause. A retry carries `timedOutRuns` only while that still holds.
   */
  async infraPath(f, detail, failures = []) {
    const retryLeft = f.attempts < this.config.infraRetries;
    // A hang needs EVERY run of this candidate to have been only job timeouts: this one, and each
    // earlier one counted in timedOutRuns (absent in an older document: not known, no hang).
    const hang = await this.repeatedHang(failures);
    const everyRunTimedOut = Boolean(hang) && (f.timedOutRuns ?? 0) === f.attempts;
    if (everyRunTimedOut && (!retryLeft || f.bisect?.hang)) {
      return this.onRepeatedHang(f, failures, hang);
    }
    if (retryLeft) {
      const attempts = f.attempts + 1;
      // A base-check ref names its SHA once (basecheck-<sha12>-r<n>); a batch ref appends it.
      const baseCheck = f.kind === "base-check";
      const batchId = baseCheck
        ? `basecheck-${head12(f.baseSha)}-r${attempts}`
        : retryBatchId(f.batchId, attempts);
      const ref = baseCheck
        ? baseCheckRef(this.base, f.baseSha, attempts)
        : candidateRef(this.base, batchId, f.candidateSha);
      const pushedAt = this.now();
      const sources = baseCheck ? [f.candidateRef, this.base] : [f.candidateRef];
      const pushed = await this.pushRef(f.candidateSha, ref, sources);
      if (pushed === "lost") return this.candidateLost(f);
      const startedAt = pushed === "existed" ? this.retryCutoff() : pushedAt;
      const rest = { ...f };
      delete rest.timedOutRuns; // carried only while every run so far timed out
      delete rest.landAttempts; // counted only at the landing stage, which a retry leaves
      delete rest.rerun; // a new ref: its runs are not the re-run's (the retry is never re-run)
      this.s.inFlight = {
        ...rest,
        batchId,
        candidateRef: ref,
        attempts,
        startedAt,
        stage: "testing",
        ...(everyRunTimedOut ? { timedOutRuns: attempts } : {}),
      };
      this.s.counters.ciRuns += 1;
      this.event("infra-retry", {
        batchId,
        prs: prNumbers(f.prs),
        sha: f.candidateSha,
        detail: `retry ${attempts}/${this.config.infraRetries}: ${detail}`,
      });
      this.note(`infra failure on ${f.batchId}: retrying the same SHA as ${batchId}`);
      return;
    }
    this.s.paused = {
      reason: "infra",
      since: this.now(),
      baseSha: f.baseSha,
      detail: `${f.batchId}: ${detail}`,
      issue: null,
    };
    this.s.inFlight = null;
    this.event("infra-paused", {
      batchId: f.batchId,
      prs: prNumbers(f.prs),
      sha: f.candidateSha,
      detail,
    });
    this.note(`paused (infra): ${f.batchId} failed again after ${f.attempts} retry(ies)`);
  }

  async startBaseCheck(f, signatures) {
    const ref = baseCheckRef(this.base, f.baseSha);
    const batchId = `basecheck-${head12(f.baseSha)}`;
    const pushedAt = this.now();
    const pushed = await this.pushRef(f.baseSha, ref, [f.candidateRef, this.base]);
    if (pushed === "lost") return this.candidateLost(f);
    // Already pushed by a tick whose save was lost: its runs started after the red batch did.
    const startedAt = pushed === "existed" ? f.startedAt : pushedAt;
    this.s.inFlight = {
      batchId,
      kind: "base-check",
      candidateRef: ref,
      candidateSha: f.baseSha,
      baseSha: f.baseSha,
      treeSha: null,
      prs: [],
      stage: "testing",
      startedAt,
      attempts: 0,
      bisect: null,
      pendingRed: {
        batchId: f.batchId,
        candidateSha: f.candidateSha,
        prs: f.prs,
        signatures,
        bisect: f.bisect ?? null,
        ...(signatures.some((s) => s.hang) && f.timedOutRuns
          ? { timedOutRuns: f.timedOutRuns }
          : {}),
      },
    };
    this.s.counters.ciRuns += 1;
    this.event("base-check-started", {
      batchId,
      prs: prNumbers(f.prs),
      sha: f.baseSha,
      detail: `${f.batchId} red on a base with no verdict: testing the bare base`,
    });
    this.note(`${f.batchId}: base-check of ${head12(f.baseSha)} pushed to ${ref}`);
  }

  async pauseBaseRed(batch, issue, detail) {
    // A shadow-stacked segment is composed on a would-land candidate, never the base tip: the
    // pause must wait for the real tip to move, not resume on the next tick.
    const stacked = this.shadowStack(batch.bisect, batch.baseSha, []);
    const pauseSha = stacked ? await this.gh.getBranchSha(this.base) : batch.baseSha;
    this.s.paused = {
      reason: "base-red",
      since: this.now(),
      baseSha: pauseSha,
      detail: detail || `${batch.batchId} failed like the bare base`,
      issue: issue?.number ?? null,
    };
    this.s.inFlight = null;
    this.event("base-red-paused", {
      batchId: batch.batchId,
      prs: prNumbers(batch.prs),
      sha: batch.baseSha,
      detail: detail || "same failures as the base",
    });
    if (issue) {
      await this.comment(
        issue.number,
        `base-red:${batch.batchId}`,
        [
          `🔴 **omni-queue** paused \`${this.base}\`: batch \`${batch.batchId}\``,
          `(${formatPrs(batch.prs)}) failed with the same signatures as the bare base`,
          `\`${batch.baseSha}\`. The PRs stay queued; the queue resumes by itself when the base moves.`,
          "",
          `- Candidate: ${this.checksUrl(batch.candidateSha)}`,
          detail ? `- Verdict: ${codeSpan(detail)}` : null,
          this.deps.runUrl ? `- Run: ${this.deps.runUrl}` : null,
        ]
          .filter((line) => line !== null)
          .join("\n")
      );
    }
    this.note(`paused (base-red) at ${head12(batch.baseSha)}; batch returned to the queue`);
  }

  /**
   * PR-red verdict for `red` (a batch, a bisection segment or a parked batch). `red.signatures`
   * with `hang` entries (a suspected hanging test) start a hang bisection and word the culprit
   * comment around the job that timed out.
   */
  async onPrRed(red) {
    const { prs, bisect, batchId, candidateSha, failures } = red;
    const hang = (red.signatures ?? []).filter((s) => s.hang);
    const culpritContext = { hang, timedOutRuns: red.timedOutRuns, baseSha: red.baseSha };
    this.s.inFlight = null;
    if (bisect) {
      const advanced = this.m.bisect.advanceBisection(bisect, "red");
      if (advanced.culprit) {
        await this.dequeueCulprit(
          advanced.culprit,
          failures,
          candidateSha,
          batchId,
          culpritContext
        );
      } else {
        this.event("bisect-split", {
          batchId,
          prs: prNumbers(prs),
          sha: candidateSha,
          detail: `segment of ${prs.length} red: testing ${formatPrs(advanced.next)} next`,
        });
      }
      if (advanced.bisect) {
        return this.composeSegments(advanced.bisect, {
          onto: this.shadowStack(advanced.bisect, red.baseSha, [red.candidateRef]),
        });
      }
      this.note(`bisection of ${bisect.rootBatchId} finished`);
      return;
    }
    if (prs.length === 1) {
      return this.dequeueCulprit(prs[0], failures, candidateSha, batchId, culpritContext);
    }
    const started = this.m.bisect.startBisection(prs, batchId, { hang: hang.length > 0 });
    this.s.counters.bisections += 1;
    this.event("bisect-split", {
      batchId,
      prs: prNumbers(prs),
      sha: candidateSha,
      detail: `batch of ${prs.length} red: testing ${formatPrs(started.segments[0])} first`,
    });
    return this.composeSegments(started);
  }

  async dequeueCulprit(
    pr,
    failures,
    candidateSha,
    batchId,
    { hang = [], timedOutRuns, baseSha } = {}
  ) {
    const failed = failures.map((run) => run.name).join(", ") || "red candidate";
    const current = await this.gh.getPull(pr.n);
    if (current.state === "open" && current.headSha !== pr.head) {
      // A newer head was pushed (and maybe re-approved) after this candidate: the label now
      // belongs to that head, so it stays and the normal eligibility rules decide about it.
      this.s.counters.culprits += 1;
      this.event("culprit-found", {
        batchId,
        prs: [pr.n],
        sha: candidateSha,
        detail: `${failed}; head moved to ${head12(current.headSha)}, label kept`,
      });
      this.note(`culprit #${pr.n} (${head12(pr.head)}): head moved, label kept`);
      return;
    }
    if (this.shadow) {
      // Observed only: the label stays and nothing is posted; the head is settled for shadow.
      this.s.shadow.processed[String(pr.n)] = pr.head;
      this.s.counters.culprits += 1;
      this.event("culprit-found", {
        batchId,
        prs: [pr.n],
        sha: candidateSha,
        detail: `${failed}; shadow mode: label kept, no comment`,
      });
      this.note(`shadow: culprit #${pr.n} would be dequeued; label kept, no comment`);
      return;
    }
    const lines = failures.length
      ? failures.map(
          (run) =>
            `  - ${run.htmlUrl ? `[${codeSpan(run.name)}](${run.htmlUrl})` : codeSpan(run.name)}` +
            ` — ${codeSpan(run.conclusion ?? "failed")}`
        )
      : ["  - (no failing check could be read; see the candidate checks)"];
    const hangLine = hang.length
      ? `- Suspected hanging test: ${hangSentence({
          failures,
          hang,
          timedOutRuns,
          baseStatus: this.baseVerdict(baseSha)?.status,
        })}.`
      : null;
    await this.removeLabel(pr.n, this.config.label);
    await this.commentPr(
      pr.n,
      `culprit:${head12(pr.head)}`,
      [
        `❌ **omni-queue** isolated this PR as the cause of a red candidate and removed it from the`,
        `queue of \`${this.base}\`.`,
        "",
        `- Head: \`${pr.head}\``,
        `- Candidate: \`${candidateSha}\` (batch \`${batchId}\`) — ${this.checksUrl(candidateSha)}`,
        hangLine,
        "- Failed checks:",
        ...lines,
        "",
        `Fix the failure, push, and apply the \`${this.config.label}\` label again to re-queue it.`,
      ]
        .filter((line) => line !== null)
        .join("\n")
    );
    this.s.counters.culprits += 1;
    this.event("culprit-found", {
      batchId,
      prs: [pr.n],
      sha: candidateSha,
      detail: failed,
    });
    this.note(`culprit #${pr.n} dequeued`);
  }

  // ─────────────────────────── composition ───────────────────────────

  /**
   * Compose `prs` (or the head segment of `bisect`) on the current base and push it. `onto` (shadow
   * bisection only) = the would-land commit to compose on instead of the base tip, so the shadow
   * run tests the same combination the live queue would.
   */
  async composeAndPush(prs, bisect, { onto = null } = {}) {
    this.s.counters.batchSeq += 1;
    const batchId = batchIdFor(this.s.counters.batchSeq);
    const git = this.gitRepo();
    const { baseSha: tip, heads } = this.m.compose.fetchInputs({ git, base: this.base, prs });
    let baseSha = tip;
    if (onto && onto.sha !== tip) {
      if (this.fetchObject(onto.sha, onto.refs)) baseSha = onto.sha;
      else this.note(`shadow stack ${head12(onto.sha)} unavailable: composing on the base tip`);
    }
    const stackNote = baseSha === tip ? "" : ` (shadow stack over ${head12(tip)})`;
    const result = this.m.compose.composeCandidate({
      git,
      base: this.base,
      baseSha,
      prs,
      batchId,
      heads,
    });
    for (const pr of result.excludedBaseConflict ?? []) {
      if (this.shadow) {
        this.wouldDequeue(pr, "base-conflict", batchId);
        continue;
      }
      await this.removeLabel(pr.n, this.config.label);
      await this.commentPr(
        pr.n,
        `base-conflict:${head12(pr.head)}`,
        [
          `⚠️ **omni-queue**: this PR no longer merges cleanly into \`${this.base}\``,
          `(base \`${head12(result.baseSha ?? baseSha)}\`), so it was removed from the queue.`,
          "",
          `Update the branch, then apply the \`${this.config.label}\` label again.`,
        ].join("\n")
      );
      this.event("pr-dequeued", { batchId, prs: [pr.n], detail: "base-conflict" });
    }
    for (const pr of result.alreadyInBase ?? []) {
      if (baseSha !== tip) {
        // Contained in a would-land shadow stack, not in the real base: it would land with that
        // stack, so it is done for this head in shadow mode (labels stay; nothing landed).
        this.s.shadow.processed[String(pr.n)] = pr.head;
        this.note(`#${pr.n} already in the shadow stack ${head12(baseSha)}`);
        continue;
      }
      await this.dropAlreadyInBase(pr, batchId, result.baseSha ?? baseSha);
    }
    for (const pr of result.excludedBatchConflict ?? []) {
      this.event("pr-skipped-conflict", {
        batchId,
        prs: [pr.n],
        detail: "conflicts with an earlier PR of the batch; stays queued",
      });
    }
    const included = result.included ?? [];
    if (!result.candidateSha || !included.length) {
      this.note(`${batchId}: nothing composable out of ${formatPrs(prs)}`);
      return false;
    }
    const ref = candidateRef(this.base, batchId, result.candidateSha);
    const startedAt = this.now();
    await this.pushRef(result.candidateSha, ref);
    this.s.inFlight = {
      batchId,
      kind: "batch",
      candidateRef: ref,
      candidateSha: result.candidateSha,
      baseSha: result.baseSha ?? baseSha,
      treeSha: result.treeSha ?? null,
      prs: included,
      stage: "testing",
      startedAt,
      attempts: 0,
      bisect: bisect ? { ...bisect, segments: [included, ...bisect.segments.slice(1)] } : null,
    };
    this.s.counters.ciRuns += 1;
    const excluded = [
      ...(result.excludedBatchConflict ?? []).map((pr) => `#${pr.n} batch-conflict`),
      ...(result.excludedBaseConflict ?? []).map((pr) => `#${pr.n} base-conflict`),
      ...(result.excludedHeadMoved ?? []).map((pr) => `#${pr.n} head-moved`),
      ...(result.alreadyInBase ?? []).map((pr) => `#${pr.n} already-in-base`),
    ];
    // Stacked PRs ride along without a merge commit of their own: they land with the batch.
    const stacked = (result.alreadyContained ?? []).filter((pr) =>
      included.some((inc) => inc.n === pr.n)
    );
    this.event("batch-started", {
      batchId,
      prs: prNumbers(included),
      sha: result.candidateSha,
      detail:
        `${bisect ? `bisect of ${bisect.rootBatchId}: ` : ""}` +
        `${included.length} PR(s) on ${head12(result.baseSha ?? baseSha)}${stackNote}` +
        (stacked.length ? `; stacked ${formatPrs(stacked)} (no merge commit of their own)` : "") +
        (excluded.length ? `; excluded ${excluded.join(", ")}` : ""),
      labeledAt: approvalTimes(included),
    });
    this.note(`${batchId}: pushed ${formatPrs(included)} as ${ref}`);
    return true;
  }

  /**
   * The PR's head is already reachable from the bare base (its commits entered the base some
   * other way): nothing to test or land. It leaves the queue for good (both labels removed, so
   * no later tick recomposes it) with one comment per head.
   */
  async dropAlreadyInBase(pr, batchId, baseSha) {
    if (this.shadow) return this.wouldDequeue(pr, "already-in-base", batchId);
    await this.removeLabel(pr.n, this.config.label);
    await this.removeLabel(pr.n, this.config.protectedApprovalLabel);
    await this.commentPr(
      pr.n,
      `already-landed:${head12(pr.head)}`,
      [
        `ℹ️ **omni-queue**: the head of this PR (\`${head12(pr.head)}\`) is already part of`,
        `\`${this.base}\` (base \`${head12(baseSha)}\`), so there is nothing left to test or land.`,
        "It was removed from the queue.",
      ].join("\n")
    );
    this.event("pr-dequeued", { batchId, prs: [pr.n], detail: "already-in-base" });
    this.note(`#${pr.n} already in ${this.base}: dequeued`);
  }

  /**
   * Drop the PRs that no longer qualify (label withdrawn, head moved, approval gone, ...) before
   * spending a CI run on them; a frozen base does not drop anything (landing holds instead).
   */
  async withdrawStale(prs, batchId) {
    const { valid, dropped } = await this.revalidate(prs);
    for (const { pr, why } of dropped) {
      this.event("pr-dequeued", {
        batchId: batchId ?? undefined,
        prs: [pr.n],
        detail: `withdrawn: ${why}`,
      });
      this.note(`#${pr.n} left the batch before composition: ${why}`);
    }
    return valid;
  }

  /**
   * Compose the next bisection segment; PRs withdrawn since the split are left out and segments
   * with nothing composable are skipped. `checked` = segments[0] was just revalidated.
   */
  async composeSegments(bisect, { onto = null, checked = false } = {}) {
    let current = bisect;
    let fresh = checked;
    while (current && current.segments.length) {
      const segment = fresh
        ? current.segments[0]
        : await this.withdrawStale(current.segments[0], current.rootBatchId);
      fresh = false;
      if (segment.length) {
        const next = { ...current, segments: [segment, ...current.segments.slice(1)] };
        if (await this.composeAndPush(segment, next, { onto })) return;
      }
      current =
        current.segments.length > 1 ? { ...current, segments: current.segments.slice(1) } : null;
    }
    this.note(`bisection of ${bisect.rootBatchId} finished`);
  }

  /**
   * Re-run the same PRs on the current base (base moved, batch changed before landing, candidate
   * lost). `checked` = `prs` were just revalidated; otherwise withdrawn PRs are left out first.
   */
  async recompose(prs, bisect, { onto = null, checked = false } = {}) {
    this.s.inFlight = null;
    if (bisect) {
      const rest = bisect.segments.slice(1);
      const segments = prs.length ? [prs, ...rest] : rest;
      if (!segments.length) return this.note(`bisection of ${bisect.rootBatchId} finished`);
      return this.composeSegments(
        { ...bisect, segments },
        { onto, checked: checked && prs.length > 0 }
      );
    }
    const fresh = checked ? prs : await this.withdrawStale(prs, null);
    if (fresh.length) await this.composeAndPush(fresh, null);
  }

  // ─────────────────────────── queue snapshot / selection ───────────────────────────

  /** PrSnapshot (eligibility.mjs) of PR `number`, read fresh from GitHub. */
  async snapshotPull(number, { greenCheck = true } = {}) {
    const pull = await this.gh.getPull(number);
    const [manifest, timeline, headStatuses] = [
      await this.gh.listPullFileManifest(pull.number),
      await this.gh.listIssueTimeline(pull.number),
      await this.gh.listCommitStatuses(pull.headSha),
    ];
    const prGreenCheck =
      greenCheck && this.config.preferGreenPrChecks
        ? prGreenCheckState(await this.gh.listCheckRuns(pull.headSha), this.config.prGreenCheck)
        : null;
    return {
      number: pull.number,
      state: pull.state,
      draft: Boolean(pull.draft),
      merged: Boolean(pull.merged),
      baseRef: pull.baseRef,
      headSha: pull.headSha,
      title: pull.title,
      author: pull.author,
      labels: pull.labels ?? [],
      mergeable: pull.mergeable ?? null,
      mergeableState: pull.mergeableState ?? "unknown",
      files: manifest.files,
      // GitHub lists at most 3,000 files: a shorter list than changed_files (or no count at all)
      // may hide a protected path, so eligibility then requires protected-approved.
      filesComplete:
        Number.isSafeInteger(pull.changedFiles) && manifest.listed >= pull.changedFiles,
      timeline,
      headStatuses,
      prGreenCheck,
    };
  }

  async snapshotQueue() {
    const { label } = this.config;
    const pulls = await this.gh.listOpenPulls({ base: this.base });
    const open = new Set(pulls.map((p) => String(p.number)));
    for (const key of Object.keys(this.s.shadow.processed)) {
      if (!open.has(key)) delete this.s.shadow.processed[key];
    }
    const labeled = pulls.filter(
      (p) =>
        p.baseRef === this.base && (p.labels ?? []).includes(label) && !this.touched.has(p.number)
    );
    const freezeIssues = labeled.length ? await this.freezeIssues() : [];
    const ctx = { config: this.config, freezeIssues, state: this.s, now: this.now() };
    const entries = [];
    const candidates = [];
    for (const summary of labeled) {
      let pr;
      try {
        pr = await this.snapshotPull(summary.number);
      } catch (error) {
        this.note(`#${summary.number}: snapshot failed (${error.message}); skipped this tick`);
        continue;
      }
      if (pr.baseRef !== this.base) {
        this.note(`#${pr.number}: retargeted to ${pr.baseRef} since the list; skipped`);
        continue;
      }
      const verdict = this.m.eligibility.evaluateEligibility(pr, ctx);
      let wouldDequeue = false;
      for (const action of verdict.actions ?? []) {
        if (action.type === "comment") await this.commentPr(action.pr, action.key, action.body);
        else if (action.type === "removeLabel") {
          await this.removeLabel(action.pr, action.label ?? label);
          wouldDequeue = this.shadow;
        } else throw new Error(`unknown eligibility action: ${action.type}`);
      }
      if (wouldDequeue) this.recordWouldDequeue(pr, verdict);
      const dequeued = this.touched.has(pr.number) || wouldDequeue;
      const eligible = Boolean(verdict.eligible) && !dequeued;
      entries.push({
        number: pr.number,
        title: pr.title,
        author: pr.author,
        eligible,
        reasons: verdict.reasons ?? [],
        labeledAt: verdict.approval?.labeledAt ?? null,
      });
      if (eligible) candidates.push({ pr, eligibility: verdict });
    }
    entries.sort(
      (a, b) => (a.labeledAt ?? "￿").localeCompare(b.labeledAt ?? "￿") || a.number - b.number
    );
    return { entries, candidates, ctx };
  }

  /**
   * Shadow mode: eligibility asked to remove the queue label of `pr` (head changed after the
   * label, conflicting). The label stays, so the same verdict comes back on every tick: one
   * event per head. The head is NOT marked processed: the PR stays ineligible by itself while
   * the cause lasts, and a new approval of this head must still be able to queue it.
   * @param {import("./eligibility.mjs").PrSnapshot} pr
   */
  recordWouldDequeue(pr, verdict) {
    const seen = this.hasEvent(
      (e) => e.type === "would-dequeue" && e.sha === pr.headSha && e.prs?.[0] === pr.number
    );
    if (seen) return;
    const detail = (verdict.reasons ?? []).map((r) => r.code).join(", ") || "eligibility";
    this.event("would-dequeue", { prs: [pr.number], sha: pr.headSha, detail });
    this.note(`shadow: #${pr.number} would be dequeued (${detail}); label kept, no comment`);
  }

  async startBatch(queue) {
    const candidates = queue.candidates.filter((c) => !this.touched.has(c.pr.number));
    if (!candidates.length) return this.note("queue idle: no eligible PR");
    const selection = this.m.eligibility.selectBatch(candidates, {
      ...queue.ctx,
      state: this.s,
      now: this.now(),
    });
    if (!selection.batch?.length) {
      return this.note(`waiting: ${selection.reason || "batch selection returned nothing"}`);
    }
    await this.composeAndPush(selection.batch, null);
  }

  // ─────────────────────────── housekeeping ───────────────────────────

  /**
   * Delete candidate refs of this base that no state references. `loadedRefs` (the stored
   * in-flight work) are kept here and removed by deleteSuperseded once the new state is saved.
   */
  async cleanupRefs(loadedRefs = new Set()) {
    const prefix = `${CANDIDATE_PREFIX}${sanitizeBase(this.base)}/`;
    const keep = new Set([...this.refsOf(this.s.inFlight), ...loadedRefs]);
    let refs;
    try {
      refs = await this.gh.listMatchingBranches(prefix);
    } catch (error) {
      return this.note(`cleanup skipped: ${error.message}`);
    }
    for (const { ref } of refs) {
      const name = String(ref).replace(/^refs\/heads\//, "");
      if (!name.startsWith(prefix) || keep.has(name)) continue;
      try {
        await this.deleteRef(name);
      } catch (error) {
        this.note(`could not delete ${name}: ${error.message}`);
      }
    }
  }

  /** After a successful save: delete the refs of the previous in-flight work it superseded. */
  async deleteSuperseded(loadedRefs) {
    const keep = this.refsOf(this.s.inFlight);
    for (const ref of loadedRefs) {
      if (keep.has(ref)) continue;
      try {
        await this.deleteRef(ref);
      } catch (error) {
        // harmless: the next tick's cleanup sees it as a stray
        this.note(`could not delete ${ref}: ${error.message}`);
      }
    }
  }

  async updateDashboard(entries) {
    const body = this.m.dashboard.renderDashboard({
      base: this.base,
      state: this.s,
      queue: entries,
      config: this.config,
      now: this.now(),
      runUrl: this.deps.runUrl ?? null,
      repository: this.deps.repository,
    });
    if (this.dryRun) return this.note("would update the dashboard issue");
    try {
      await this.m.dashboard.upsertDashboard({ gh: this.gh, base: this.base, body });
    } catch (error) {
      // Cosmetic: never let the dashboard block the state save of real transitions.
      this.note(`dashboard update failed: ${error.message}`);
    }
  }
}

/** A state document without its save stamp, serialized: equal strings = nothing to save. */
const withoutStamp = (state) => JSON.stringify({ ...state, updatedAt: null });

/** {"<n>": labeledAt} of the PRs of a batch (HistoryEvent.labeledAt, dashboard metrics). */
function approvalTimes(prs) {
  const out = {};
  for (const pr of prs ?? []) {
    if (typeof pr?.labeledAt === "string" && pr.labeledAt) out[String(pr.n)] = pr.labeledAt;
  }
  return out;
}

/** "b42" / "b42-r1" + attempt 2 → "b42-r2". */
function retryBatchId(batchId, attempt) {
  const match = /^b(\d+)(?:-r\d+)?$/.exec(batchId);
  if (match) return batchIdFor(Number(match[1]), attempt);
  return `${String(batchId).replace(/-r\d+$/, "")}-r${attempt}`;
}

/**
 * @param {TickDeps} deps
 * @param {{base: string, action: "tick"|"pause"|"resume"|"dry-run"|"bless", reason?: string,
 *          sha?: string, actor?: string, triggeringActor?: string}} options
 *   dry-run = observe and decide, print the plan, perform NO write of any kind.
 *   bless = write landing.statusContext on `sha` for `reason` when `actor` (the dispatcher)
 *   and `triggeringActor` (who triggered this run) are both approvers.
 * @returns {Promise<{base: string, decisions: string[], state: QueueState}>}
 *   Throws StateConflictError when the final state save loses the CAS race (redo the tick), and
 *   BlessRefusedError when a bless is refused (nothing written).
 */
export async function runTick(deps, options) {
  const {
    base,
    action = "tick",
    reason,
    sha = null,
    actor = null,
    triggeringActor = null,
  } = options ?? {};
  if (!TICK_ACTIONS.includes(action)) throw new Error(`unknown action: ${action}`);
  sanitizeBase(base);
  if (!isManagedBase(deps.config, base)) {
    throw new Error(`base ${base} does not match config.bases (${deps.config.bases})`);
  }
  return new Tick(deps, base, action, reason, { sha, actor, triggeringActor }).run();
}

/**
 * Bases to visit when --base is absent: managed bases (config.bases) that have open PRs with the
 * queue label, an existing state file with something in flight, or a pause to re-evaluate.
 * Bases with state are found through their dashboard issues (every tick upserts one).
 * @param {TickDeps} deps
 * @returns {Promise<string[]>}
 */
export async function discoverBases(deps) {
  const { gh, config, store } = deps;
  const bases = new Set();
  for (const pull of await gh.listOpenPulls()) {
    if ((pull.labels ?? []).includes(config.label) && isManagedBase(config, pull.baseRef)) {
      bases.add(pull.baseRef);
    }
  }
  const dashboards = await gh.listIssues({ labels: [DASHBOARD_LABEL], state: "open" });
  for (const issue of dashboards) {
    if (!String(issue.title ?? "").startsWith(DASHBOARD_TITLE_PREFIX)) continue;
    const base = issue.title.slice(DASHBOARD_TITLE_PREFIX.length).trim();
    if (bases.has(base) || !isManagedBase(config, base)) continue;
    try {
      const { state } = await store.load(base);
      if (state.inFlight || state.paused) bases.add(base);
    } catch {
      bases.add(base); // unreadable state: visit it so the error surfaces in its own tick
    }
  }
  return [...bases].sort();
}

/** @returns {{base: string|null, action: string, reason: string|null, sha?: string}} */
export function parseArgs(argv) {
  const out = { base: null, action: "tick", reason: null };
  const keys = { "--base": "base", "--action": "action", "--reason": "reason", "--sha": "sha" };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const eq = arg.indexOf("=");
    const flag = eq > 0 ? arg.slice(0, eq) : arg;
    const key = keys[flag];
    if (!key) throw new Error(`unknown argument: ${arg}`);
    const value = eq > 0 ? arg.slice(eq + 1) : argv[++i];
    if (value === undefined || value === "") throw new Error(`${flag} needs a value`);
    out[key] = value;
  }
  if (!TICK_ACTIONS.includes(out.action)) throw new Error(`unknown action: ${out.action}`);
  if (["pause", "resume", "bless"].includes(out.action) && !out.base) {
    throw new Error(`--action ${out.action} requires --base`);
  }
  if (out.action === "bless") {
    if (!out.sha) throw new Error("--action bless requires --sha");
    if (!isSha(out.sha)) throw new Error("--sha must be a full 40-hex commit SHA (lower case)");
    if (!String(out.reason ?? "").trim()) throw new Error("--action bless requires --reason");
  } else if (out.sha !== undefined) {
    throw new Error("--sha is only valid with --action bless");
  }
  return out;
}

/**
 * Build the TickDeps exactly as the CLI does, from the environment (see the header). The GitHub
 * client counts only comment markers written by `${config.appSlug}[bot]`, so a third party
 * cannot pre-post a marker to mute a queue comment.
 * @param {object} env   process.env-like
 * @param {{now?: () => string, log?: (msg: string) => void, gitEnv?: object}} [overrides]
 *   tests only: injected clock, logger and extra environment for every git process
 * @returns {TickDeps}   throws on an invalid environment or config
 */
export function createTickDeps(env, overrides = {}) {
  const token = env.OMNI_QUEUE_TOKEN;
  if (!token) throw new Error("OMNI_QUEUE_TOKEN is not set");
  const repository = env.GITHUB_REPOSITORY;
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository ?? "")) {
    throw new Error("GITHUB_REPOSITORY must be owner/repo");
  }
  const log = overrides.log ?? (() => {});
  const config = loadConfig(
    env.OMNI_QUEUE_CONFIG ? resolve(env.OMNI_QUEUE_CONFIG) : DEFAULT_CONFIG_PATH
  );
  const gh = createGitHubClient({
    token,
    repository,
    apiUrl: env.GITHUB_API_URL || undefined,
    botLogin: `${config.appSlug}[bot]`,
    log,
  });
  const owner = config.landing.actor === "owner";
  // Explicit override (tests/sandbox) > the owner's landing identity > the bot user the workflow
  // resolved > the bot identity derived from config.appSlug.
  const identity =
    env.OMNI_QUEUE_GIT_NAME && env.OMNI_QUEUE_GIT_EMAIL
      ? { name: env.OMNI_QUEUE_GIT_NAME, email: env.OMNI_QUEUE_GIT_EMAIL }
      : owner
        ? { name: config.landing.identity.name, email: config.landing.identity.email }
        : env.OMNI_QUEUE_BOT_NAME && env.OMNI_QUEUE_BOT_EMAIL
          ? { name: env.OMNI_QUEUE_BOT_NAME, email: env.OMNI_QUEUE_BOT_EMAIL }
          : botIdentity(config.appSlug);
  const serverUrl = String(env.GITHUB_SERVER_URL || "https://github.com").replace(/\/+$/, "");
  const repoDir = join(env.RUNNER_TEMP || tmpdir(), "omni-queue", "compose.git");
  mkdirSync(repoDir, { recursive: true });
  const remoteUrl = env.OMNI_QUEUE_REMOTE_URL || `${serverUrl}/${repository}.git`;
  const gitEnv = overrides.gitEnv ?? {};
  const gitFor = (cwd) => createGit({ cwd, token, identity, log, env: gitEnv });
  // The owner's token, when landing as the owner: never an error here (shadow runs without it);
  // a live landing without it pauses (Tick.landOrWouldLand).
  const landToken = owner ? env.OMNI_QUEUE_LAND_TOKEN || null : null;
  const landGitFor = !owner
    ? gitFor
    : landToken
      ? (cwd) => createGit({ cwd, token: landToken, identity, log, env: gitEnv })
      : null;
  const landGh = !owner
    ? gh
    : landToken
      ? createGitHubClient({
          token: landToken,
          repository,
          apiUrl: env.GITHUB_API_URL || undefined,
          botLogin: `${config.appSlug}[bot]`,
          log,
        })
      : null;
  return {
    config,
    gh,
    store: createStateStore({ gh, ...(overrides.now ? { now: overrides.now } : {}) }),
    gitFor,
    landGitFor,
    landGh,
    repoDir,
    remoteUrl,
    // A local or file remote cannot serve a partial clone reliably: fetch everything.
    ...(/^https?:\/\//.test(remoteUrl) ? {} : { fetchFilter: null }),
    identity,
    now: overrides.now ?? (() => new Date().toISOString()),
    log,
    runUrl: env.GITHUB_RUN_ID
      ? `${serverUrl}/${repository}/actions/runs/${env.GITHUB_RUN_ID}`
      : null,
    repository,
  };
}

/** CLI entry (argv without node/script). Exit code 0 on success, 1 on error. */
export async function main(argv = process.argv.slice(2), env = process.env) {
  const token = env.OMNI_QUEUE_TOKEN;
  const secrets = [token, env.OMNI_QUEUE_LAND_TOKEN].filter(Boolean);
  const redact = (text) => {
    let out = String(text ?? "");
    for (const secret of secrets) out = out.split(secret).join("***");
    return out.slice(0, 2000);
  };
  const log = (message) => console.log(redact(message));
  const fail = (message) => {
    console.error(`omni-queue: ${redact(message)}`);
    return 1;
  };

  let args;
  try {
    args = parseArgs(argv);
  } catch (error) {
    return fail(error.message);
  }
  if (!token) return fail("OMNI_QUEUE_TOKEN is not set");
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(env.GITHUB_REPOSITORY ?? "")) {
    return fail("GITHUB_REPOSITORY must be owner/repo");
  }

  let deps;
  try {
    deps = createTickDeps(env, { log });
  } catch (error) {
    return fail(`setup failed: ${error.message}`);
  }

  let bases;
  try {
    bases = args.base ? [args.base] : await discoverBases(deps);
  } catch (error) {
    return fail(`base discovery failed: ${error.message}`);
  }
  if (!bases.length) {
    log("omni-queue: no base to visit");
    return 0;
  }

  let exitCode = 0;
  for (const base of bases) {
    try {
      let result = null;
      for (let attempt = 1; attempt <= 3 && !result; attempt++) {
        try {
          result = await runTick(deps, {
            base,
            action: args.action,
            reason: args.reason,
            ...(args.action === "bless"
              ? {
                  sha: args.sha,
                  actor: env.GITHUB_ACTOR || null,
                  triggeringActor: env.GITHUB_TRIGGERING_ACTOR || null,
                }
              : {}),
          });
        } catch (error) {
          if (!(error instanceof StateConflictError) || attempt === 3) throw error;
          log(`omni-queue ${base}: state changed during the tick, redoing it (${attempt}/3)`);
        }
      }
      log(`omni-queue ${base}: ${result.decisions.length} decision(s)`);
      for (const line of result.decisions) log(`  - ${line}`);
    } catch (error) {
      exitCode = 1;
      if (error instanceof BlessRefusedError) {
        // A refused request, not a queue failure: nothing was written and nothing is recorded.
        console.error(`omni-queue ${base}: ${redact(error.message)}`);
        continue;
      }
      console.error(`omni-queue ${base}: ${redact(error.stack || error.message)}`);
      if (args.action === "dry-run") continue;
      try {
        await updateStateWithRetry(deps.store, base, (state) =>
          appendEvent(state, {
            at: deps.now(),
            type: "error",
            detail: redact(error.message).slice(0, 500),
            ...(deps.runUrl ? { url: deps.runUrl } : {}),
          })
        );
      } catch (recordError) {
        console.error(
          `omni-queue ${base}: could not record the error: ${redact(recordError.message)}`
        );
      }
    }
  }
  return exitCode;
}

const invokedDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (invokedDirectly) {
  main().then((code) => {
    process.exitCode = code;
  });
}
