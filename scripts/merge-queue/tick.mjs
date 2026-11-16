#!/usr/bin/env node
// scripts/merge-queue/tick.mjs — WP3. Plan §3.1: ONE idempotent tick of the queue.
//
// Entry point of .github/workflows/omni-queue.yml (the only writer of queue state):
//   node scripts/merge-queue/tick.mjs [--base <branch>] [--action tick|pause|resume|dry-run]
//                                     [--reason <text>]
//   node scripts/merge-queue/tick.mjs --base <branch> --action bless --sha <40 hex> --reason <text>
// Environment (set by the workflow; never logged):
//   OMNI_QUEUE_TOKEN       GitHub App installation token, minted by the tick job of
//                          .github/workflows/omni-queue.yml with contents, workflows,
//                          pull-requests, issues, statuses and actions: write, and checks: read.
//                          workflows: the pushes carry workflow-file changes of batched PRs;
//                          actions: rerun-failed-jobs, and the workflow-run and job listings;
//                          pull-requests: write is used by a squash-api landing (mergePull) only:
//                          labels and comments on a PR go through the issues endpoints
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
// Tick algorithm (per base): load state (CAS) → a batch stored at the landing stage whose
// candidate is already the base tip is recorded as landed (merge-ff, every mode:
// recordEarlierLanding; the next segment of its bisection is composed after the action, never
// under a pause: composeDeferredSegments) → handle action (pause/resume) → a base-red pause loaded with overflow
// entries becomes the full-list pause (replaceBaseRedForOverflow) → if paused:
// auto-resume a base-red pause when the base tip moved (not while the overflow holds entries:
// the resume rule) → retry the stored land-status
// withdrawals (every mode, paused or not; never in a dry-run) → in shadow, a batch stored at the
// landing stage goes back to "testing" and its land status is withdrawn → if paused: stop →
// if inFlight: read checks of
// candidateSha (checks.evaluateChecks) → pending: nothing; green: land (or would-land in shadow)
// / advance bisection; red: classify (classify.classifyRed) → infra retry / base-check / bisect /
// culprit; timeout: infra path → if nothing in flight: snapshot labeled PRs, run eligibility,
// execute its actions, select a batch, compose, push the candidate → health (dashboard
// assessHealth: on the first stalled verdict of an episode state.stalled, a queue-stalled event
// and, after the dashboard, one comment on the dashboard issue, retried by every tick until it is
// posted (state.stalled.notified); cleared when no longer stalled)
// → render dashboard → save (only when the state changed, or as an hourly heartbeat:
// STATE_HEARTBEAT_MINUTES; the `attempts` count of a stored withdrawal alone is no change).
// Stored withdrawals are queue work (contracts.hasQueueWork): discoverBases keeps visiting their
// base, the watchdog judges it, and one older than dashboard.STALL_WITHDRAWAL_MINUTES is a stall. A tick that throws is recorded by main() (recordTickFailure): an
// `error` event and one more failed tick in a row (state.failedTicks, deleted by the next tick
// that completes), then the same health verdict on the stored state, which raises the same alert
// (three failed ticks in a row, a pause too old) and retries an undelivered one, creating the
// dashboard issue when there is none, without changing the failed tick's outcome. The same save
// records what the failed tick did before it threw (Tick.settleFailure → failedTickRecord →
// amendFailedTick): a batch it loaded at the landing stage and did not land had its land status
// withdrawn by the tick and goes back to "testing", and the withdrawals GitHub refused are stored.
// With config.batch.adaptive the batch size is state.batchWindow (eligibility.currentBatchWindow):
// halved when a root batch is red on its own PRs (onPrRed), one more when a root batch that
// filled it lands or would land (growBatchWindow).
// LANES (config.lanes; eligibility.laneOf / selectLane): at a batch start an eligible PR whose
// lane label an approver applied is composed ALONE ahead of the FIFO (inFlight.lane), a hotfix
// first, then a base repair; a lane batch never waits and never moves the window, and a hotfix
// never replaces what is in flight. Under a base-red pause only the base-repair lane runs (the
// "if paused: stop" above has that one exception, run): its candidate lands through the normal
// path and, live, lifts the pause (`resumed`, "base repaired by #n"); one that fails like the
// base is recorded in state.repairTried and never recomposed at that head (repairNotFixing).
// Every other pause reason processes nothing, lanes included.
// Every network side effect happens BEFORE the state save that records it, and every step is
// safe to repeat when the save loses the CAS race (the next tick re-observes GitHub):
//   - candidate refs are unique per SHA (never force-pushed) and orphans are deleted by cleanup;
//     the refs of the STORED in-flight work are deleted only after the save that supersedes them,
//     and the ref of a commit a stored withdrawal names stays while the entry does;
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
//     (inFlight.landAttempts, the candidate's: kept at either stage, started again only by a new
//     candidate and by an operator's pause or resume): after LANDING_ATTEMPTS_LIMIT attempts
//     without a verdict a live tick does not bless the batch again and the queue pauses with
//     reason "error" (shadow never checks it). A batch HELD at
//     the landing stage (release-freeze, checks back to pending, manual pause) goes back to stage
//     "testing" (leaveLandingStage), so the same tick withdraws its status and later held ticks
//     read nothing; it is blessed again only right before it lands. A paused base that does not
//     process its batch sends it back to "testing" too (a paused base holds no blessed batch). A
//     tick that throws withdraws the status of a batch it loaded at the landing stage before
//     rethrowing (settleFailure), unless it landed it or made its own landing attempt (that
//     attempt withdrew its own blessing and keeps its count). A `failure` GitHub refuses to write
//     is kept in state.landWithdrawals and retried by the next ticks (retryWithdrawals); when that
//     list is full (LAND_WITHDRAWALS_LIMIT) nothing is dropped: the refusal goes to
//     state.landWithdrawalsOverflow, retried alike, and a base that is not paused (or paused as
//     base-red, which blesses its repair lane and lifts by itself) pauses with reason "error"
//     (recordFullWithdrawals); only a refusal that fits in neither list is named, in full, in
//     paused.detail whatever the pause, and in an `error` event.
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
// label removals); the batch selection/composition waits for an idle queue (nothing in flight)
// that is not paused, with one exception: under a base-red pause (config.lanes set) a
// base-repair batch of one is still composed (LANES above).
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
  hasQueueWork,
  isSha,
  resumeBlockers,
  resumeRefusal,
  sanitizeBase,
  storedWithdrawalCount,
} from "./contracts.mjs";
import * as dashboardModule from "./dashboard.mjs";
import {
  assessHealth,
  createDashboard,
  findDashboard,
  renderDashboard,
  stalledComment,
} from "./dashboard.mjs";
import * as eligibilityModule from "./eligibility.mjs";
import { createGit } from "./gitexec.mjs";
import { createGitHubClient } from "./github.mjs";
import * as landModule from "./land.mjs";
import { readQueueRefsProtection } from "./refs-guard.mjs";
import { StateConflictError, createStateStore, updateStateWithRetry } from "./state.mjs";
import { WATCHDOG_LIMIT_MINUTES } from "./watchdog.mjs";

export { StateConflictError };

/** A bless the tick refused (actor, SHA, reason or commit): nothing was written. */
export class BlessRefusedError extends Error {}

/**
 * A `--base` the queue does not manage (config.bases) or whose name is unsafe (sanitizeBase):
 * refused by main() before anything is loaded or written (no state file, no error record, no
 * dashboard, no alert).
 */
export class UnmanagedBaseError extends Error {}

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

/**
 * A GitHub error the client classified as a rate limit (`rateLimited`, set by github.mjs from
 * github.isRateLimited: a 429, a Retry-After or `x-ratelimit-remaining: 0` on a 403, or the words
 * "rate limit"); an error without the mark (a test double) still counts by its status 429 or those
 * words. Retried no further this tick.
 */
function isRateLimitError(error) {
  return (
    error?.rateLimited === true ||
    error?.status === 429 ||
    RATE_LIMIT_RE.test(String(error?.message ?? ""))
  );
}

/** An error the client marked as a rate limit is never an authentication failure. */
function isAuthFailure(error) {
  if (error?.rateLimited === true) return false;
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

/**
 * Start of the `error` event that names check runs in the candidate's own check suites that are
 * no job of its push runs (Tick.noteForeignChecks): how a later tick finds it, once per batch.
 */
export const FOREIGN_CHECKS_DETAIL =
  "check runs on the candidate that are not jobs of its push runs, ignored for the verdict";

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

/** Most characters of an operator's pause reason kept in paused.detail (as a bless reason). */
export const OPERATOR_REASON_CHARS = 200;

/**
 * An operator's `--reason` for a pause, as paused.detail stores it: one line (every run of
 * whitespace becomes one space), the words of a `Kept nowhere (both lists full)` clause escaped
 * ("Kept-nowhere", any case) so the text can neither plant nor re-label a commit kept nowhere
 * (keptNowhereCommits reads only the code's own clause), then cut at OPERATOR_REASON_CHARS.
 */
export function operatorReason(reason) {
  return String(reason ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/(kept)[\s-]*(nowhere)/gi, "$1-$2")
    .slice(0, OPERATOR_REASON_CHARS);
}

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
    /** batchId of the batch this tick stored at the landing stage itself (markLanding). */
    this.attemptedBatch = null;
    /** The landing record (this.landing) withdrawAbandoned already handled this tick. */
    this.withdrawnLanding = null;
    /** True once this tick read the base tip for the stored landing batch (recordEarlierLanding). */
    this.tipChecked = false;
    /**
     * Withdrawals GitHub refused this tick ({sha, batchId, candidateSha, why, at}, in order), and
     * SHAs whose stored withdrawal retryWithdrawals settled: a tick that throws saves neither, so
     * main()'s failure path records them (failedTickRecord, amendFailedTick).
     */
    this.refused = [];
    this.retired = [];
    /** Refusals that found landWithdrawals full, {…, list} (recordIfFull). */
    this.fullRefusals = [];
    /** {ref, result} of this tick's queue-refs protection read (queueRefsProtection). */
    this.queueRefs = null;
    /** True while recordEarlierLanding records a landing (afterSegmentGreen defers). */
    this.deferSegments = false;
    /** {bisect, onto} of the next bisection segment to compose (composeDeferredSegments). */
    this.deferredBisect = null;
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
    try {
      return await this.runLoaded(loadedRefs);
    } catch (error) {
      await this.settleFailure(error);
      throw error;
    }
  }

  /** run() once the state is loaded: everything a failing tick hands to settleFailure. */
  async runLoaded(loadedRefs) {
    // First: a batch stored at the landing stage whose candidate is already the base tip landed
    // (its tick lost the save). Recorded before anything withdraws or turns it into anything else.
    await this.recordEarlierLanding();
    this.handleAction();
    // A base-red pause never stands together with overflow entries (a hand-edited state): it
    // becomes the full-list pause before anything could lift it or bless its repair lane.
    await this.replaceBaseRedForOverflow();
    await this.maybeAutoResume();
    // Before the in-flight work: a commit this tick blesses for landing is never un-blessed by a
    // stale withdrawal (markLanding drops the entries of the commits it is about to bless).
    await this.retryWithdrawals();
    // After the retry pass: a resume dispatched once GitHub accepts the App's writes again
    // succeeds when this very tick drains the overflow (resumeRefusal).
    this.applyResume();
    await this.leaveLandingInShadow();
    // The next segment of a bisection whose segment recordEarlierLanding found landed: composed
    // only now that the action is applied, and never under a pause.
    await this.composeDeferredSegments();

    // A paused base processes nothing, with one exception: under a base-red pause (config.lanes
    // set) the base-repair lane runs, a repair in flight and a new repair batch of one.
    const f = this.s.inFlight;
    if (f && (!this.s.paused || (this.repairOnlyPause() && f.lane === "base-repair"))) {
      await this.processInFlight();
    } else if (f) {
      // A paused base never keeps a batch at the landing stage (a base-repair batch blessed under
      // a base-red pause whose lane no longer runs, say): back to testing, its status withdrawn
      // by this tick, as a manual pause does.
      this.leaveLandingStage(f);
      this.note(`paused: in-flight ${f.batchId} left as is`);
    }
    // Now, before anything that can hang until the job's timeout (the snapshot, a composition): a
    // batch this tick loaded at the landing stage and no longer keeps there loses its blessing.
    // The end-of-tick pass below is the same call (once per batch), for what the rest changes.
    await this.withdrawAbandoned();

    const queue = await this.snapshotQueue();
    if (!this.s.paused && !this.s.inFlight) await this.startBatch(queue);
    else if (this.repairOnlyPause() && !this.s.inFlight) {
      await this.startBatch(queue, { repairOnly: true });
    } else if (this.s.paused) this.note(`paused (${this.s.paused.reason}): nothing composed`);

    await this.withdrawAbandoned();
    await this.recordIfFull();
    await this.cleanupRefs(loadedRefs);
    this.endFreezeHold();
    const undelivered = this.trackHealth(queue.entries);
    const dashboard = await this.updateDashboard(queue.entries);
    if (undelivered) await this.alertStalled(dashboard, undelivered);

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
    this.dropWithdrawals([sha]);
    await this.saveState(state, version);
    return { base: this.base, decisions: this.decisions, state: this.s };
  }

  handleAction() {
    if (this.action === "pause") {
      const detail = operatorReason(this.reason) || "paused manually";
      this.setPaused({
        reason: "manual",
        since: this.now(),
        baseSha: null,
        detail,
        issue: null,
      });
      this.event("paused", { detail });
      this.note(`paused manually: ${detail}`);
      // Withdrawn by withdrawAbandoned; blessed again only when it lands after the resume. An
      // operator's pause starts the landing count again (as the resume does).
      if (this.s.inFlight) this.leaveLandingStage(this.s.inFlight, { resetCount: true });
    }
  }

  /**
   * The `resume` action, decided after this tick's retry pass (runLoaded): nothing when the queue
   * is not paused or the pause is not the one the CLI saw (RESUME_EXPECT_PREFIX); refused while
   * state.landWithdrawalsOverflow holds entries (contracts.resumeRefusal, the rule the CLI and the
   * dashboard share): the pause stays exactly as it was and one `error` event says why and how to
   * get out. Otherwise the pause is lifted and the landing count of the batch in flight starts
   * again (the operator's fresh start).
   */
  applyResume() {
    if (this.action !== "resume") return;
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
    const refusal = resumeRefusal(this.s);
    if (refusal) {
      this.event("error", { detail: refusal.slice(0, 500) });
      return this.note(refusal);
    }
    const previous = this.s.paused.reason;
    // The commits kept nowhere this pause names leave the state with it: the resumed event names
    // them (resumedDetail), so the earlier `error` event's "named in paused.detail" has a trace.
    const cleared = keptNowhereCommits(this.s.paused.detail);
    this.s.paused = null;
    // The operator's fresh start: the landing count of the batch in flight starts again.
    if (this.s.inFlight) this.leaveLandingStage(this.s.inFlight, { resetCount: true });
    this.event("resumed", {
      detail: resumedDetail(previous, cleared, this.config.landing.statusContext),
    });
    this.note(`resumed (was ${previous})`);
  }

  /**
   * Set the pause to `paused`, carrying every commit a `Kept nowhere (both lists full)` clause of
   * the current pause names (keptNowhereCommits) into its detail, once each: such a commit is
   * recorded nowhere else for good (recordFullWithdrawals). A commit counts as already named only
   * when such a clause of the new detail names it, never because its SHA appears elsewhere in the
   * text (an operator's reason may quote it). A resume (applyResume, whose `resumed` event names
   * them) or the base-red auto-resume clears the pause instead.
   */
  setPaused(paused) {
    const detail = String(paused.detail ?? "");
    const named = new Set(keptNowhereCommits(detail).map((c) => c.sha));
    const carried = keptNowhereCommits(this.s.paused?.detail).filter((c) => !named.has(c.sha));
    this.s.paused = carried.length
      ? { ...paused, detail: `${detail}; ${KEPT_NOWHERE}: ${namedCommits(carried)}` }
      : paused;
  }

  async maybeAutoResume() {
    const paused = this.s.paused;
    if (!paused || paused.reason !== "base-red") return;
    const tip = await this.gh.getBranchSha(this.base);
    if (tip && tip !== paused.baseSha) {
      if (this.overflowKeepsBaseRed(`base moved to ${head12(tip)}`)) return;
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

  /**
   * A base-red pause loaded together with entries in state.landWithdrawalsOverflow (the code never
   * writes both: a full list replaces a base-red pause, recordFullWithdrawals; a hand-edited state
   * can hold them, and the runbook's last resort is a hand edit) becomes the full-list pause, as
   * when the list fills under a base-red pause: reason `error`, one `error` event, one comment on
   * the base-red issue (tellBaseRedReplaced), a batch at the landing stage back to testing (its
   * status withdrawn by this tick). A base-red pause lifts and blesses its repair lane by itself;
   * the full-list pause does neither.
   */
  async replaceBaseRedForOverflow() {
    const was = this.s.paused;
    if (was?.reason !== "base-red" || !resumeBlockers(this.s)) return;
    const refusals = this.s.landWithdrawalsOverflow.map((w) => ({
      sha: w.sha,
      batchId: w.batchId,
      list: "landWithdrawalsOverflow",
    }));
    this.s = recordFullWithdrawals(this.s, refusals, {
      at: this.now(),
      url: this.deps.runUrl ?? undefined,
      statusContext: this.config.landing.statusContext,
    });
    this.note(this.s.history.at(-1).detail);
    await this.tellBaseRedReplaced(was);
  }

  /**
   * The automatic lifts of a base-red pause (maybeAutoResume, a repair landing in afterLanded)
   * honour the resume rule (contracts.resumeBlockers): while state.landWithdrawalsOverflow holds
   * entries the pause stays, and this returns true after one note. A base-red pause loaded with
   * overflow entries is replaced first (replaceBaseRedForOverflow), and a list that fills during
   * the tick replaces it at its end (recordIfFull): the check is defence in depth for the moments
   * in between. No event: the dashboard already shows the pause and the overflow count.
   * @param {string} why what would have lifted the pause
   */
  overflowKeepsBaseRed(why) {
    const blockers = resumeBlockers(this.s);
    if (!blockers) return false;
    this.note(
      `base-red pause kept (${why}): landWithdrawalsOverflow holds ${blockers} ` +
        `${blockers === 1 ? "entry" : "entries"} (the resume rule)`
    );
    return true;
  }

  /**
   * True while the base is paused as `base-red` and config.lanes is set: then the base-repair
   * lane is the only thing the tick processes (run). Every other pause reason, and a base-red
   * pause without lanes, processes nothing.
   */
  repairOnlyPause() {
    return this.s.paused?.reason === "base-red" && Boolean(this.config.lanes);
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
   * Inside those suites only the check runs of the runs' JOBS count (github.listWorkflowRunJobs,
   * every attempt: a re-run's attempt 2 adds jobs to the same suite, and they count). Any token
   * with checks: write (the GITHUB_TOKEN of any workflow run in the repository) can create a check
   * run on the candidate's SHA, which GitHub files in one of its Actions suites; such a run is no
   * job of the push runs: ignored for the verdict (neither green nor red: absent), and noted once
   * per batch (noteForeignChecks). One job listing per push run of the ref; a listing that fails
   * fails the tick, as any other read here.
   * @param {string} sha
   * @param {string|null} ref
   * @param {string|null} [batchId]  the batch whose candidate this is (the note's key)
   */
  async pushCheckRuns(sha, ref, batchId = null) {
    if (!ref) return [];
    const runs = await this.gh.listCheckRuns(sha);
    if (!runs.length) return [];
    const pushes = await this.gh.listWorkflowRuns({ branch: ref, headSha: sha, event: "push" });
    const suites = new Set();
    const jobs = new Set();
    for (const run of pushes) {
      // The filters are re-checked here: a listing that ignored one must not widen the verdict.
      const ours = run.event === "push" && run.headBranch === ref && run.headSha === sha;
      if (!ours || run.checkSuiteId === null || run.checkSuiteId === undefined) continue;
      suites.add(run.checkSuiteId);
      for (const job of await this.gh.listWorkflowRunJobs(run.id)) {
        if (Number.isSafeInteger(job.checkRunId)) jobs.add(job.checkRunId);
      }
    }
    const inSuites = runs.filter((run) => suites.has(run.checkSuiteId));
    const foreign = inSuites.filter((run) => !jobs.has(run.id));
    if (foreign.length) this.noteForeignChecks(foreign, sha, batchId);
    return inSuites.filter((run) => jobs.has(run.id));
  }

  /**
   * Check runs in the candidate's own suites that are no job of its push runs (pushCheckRuns): one
   * `error` event per batch (per SHA when the batch is unknown) naming each such check and its app
   * on one line, so an operator sees the attempt. Never a verdict.
   */
  noteForeignChecks(foreign, sha, batchId) {
    const told = this.hasEvent(
      (e) =>
        e.type === "error" &&
        String(e.detail ?? "").startsWith(FOREIGN_CHECKS_DETAIL) &&
        (batchId ? e.batchId === batchId : e.sha === sha)
    );
    if (told) return;
    const named = [
      ...new Set(
        foreign.map((run) => `${codeSpan(run.name)} (app ${codeSpan(run.appSlug ?? "?")})`)
      ),
    ].join(", ");
    const detail = `${FOREIGN_CHECKS_DETAIL}: ${named}`.replace(/\s+/g, " ").slice(0, 500);
    this.event("error", { batchId: batchId ?? undefined, sha, detail });
    this.note(detail);
  }

  /**
   * Check runs of `sha` for ONE candidate ref (see pushCheckRuns for which runs are the
   * candidate's). `since` additionally drops runs older than the attempt. Commit statuses are not
   * read: whoever wrote them, they never decide a candidate's verdict (checks.evaluateChecks).
   */
  async readChecks(sha, { since = null, ref = null, batchId = null } = {}) {
    let runs = await this.pushCheckRuns(sha, ref, batchId);
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
      batchId: f.batchId,
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
      const failures = await this.failuresOf(parked.candidateSha, f.startedAt, ref, parked.batchId);
      return this.onPrRed({ ...parked, failures, baseSha: f.baseSha, candidateRef: ref });
    }
    return this.landOrWouldLand(f);
  }

  async failuresOf(sha, startedAt, ref, batchId = null) {
    try {
      const { verdict } = await this.evaluate(sha, startedAt, { ref, batchId });
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

  /**
   * Green batch on a frozen base (Hard Rule #21): keep it in flight, land after the freeze. The
   * record carries the hold (inFlight.freezeHold, its `since` from the first held tick): the
   * health check reports it as waiting, not stalled, while the hold lasts (endFreezeHold).
   */
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
    const held = this.s.inFlight;
    const open = held.freezeHold && held.freezeHold.endedAt === undefined;
    if (!open) this.s.inFlight = { ...held, freezeHold: { since: this.now() } };
    this.heldFrozen = true;
  }

  /**
   * End of a tick: a release-freeze hold this tick did not renew (the freeze lifted, the checks
   * run again, a pause leaves the batch as is) is over; its end is recorded, and the in-flight
   * rule of the health check counts from it. The landing stage closes it too (markLanding).
   */
  endFreezeHold() {
    const f = this.s.inFlight;
    if (this.heldFrozen || !f?.freezeHold || f.freezeHold.endedAt !== undefined) return;
    this.s.inFlight = { ...f, freezeHold: { ...f.freezeHold, endedAt: this.now() } };
    this.note(`${f.batchId}: no longer held by a release freeze`);
  }

  /**
   * Store the in-flight batch `f`, held instead of landed, at stage "testing" when it was at the
   * landing stage. Nothing is written here: this tick's withdrawAbandoned sees the batch is no
   * longer kept at the landing stage and turns a `success` land status on its commits into
   * `failure` (one read per commit, once: later ticks find it stored at "testing"). The landing
   * count (inFlight.landAttempts) belongs to the candidate and stays (a hold, checks back to
   * pending, a re-run, a paused base leaving it as is); only a new candidate and an operator's
   * pause (`resetCount`) or resume start it again, the latter at any stage.
   */
  leaveLandingStage(f, { resetCount = false } = {}) {
    if (f.stage !== "landing") {
      if (!resetCount || f.landAttempts === undefined || this.s.inFlight !== f) return;
      const rest = { ...f };
      delete rest.landAttempts;
      this.s.inFlight = rest;
      return this.note(`${f.batchId}: its landing attempts count starts again`);
    }
    const rest = { ...f, stage: "testing", landAttempts: storedLandAttempts(f) };
    if (resetCount) delete rest.landAttempts;
    this.s.inFlight = rest;
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
    // Withdrawn once: the end-of-tick pass skips it (withdrawnLanding), and a tick that throws
    // later still knows the stored batch left the landing stage (settleFailure).
    await this.withdrawAbandoned();
  }

  /**
   * First step of every tick (every mode, merge-ff): a batch stored at the landing stage whose
   * candidate is already the base tip did land; its tick lost the state save. It is recorded as
   * landed (afterLanded: `landed` event, counters, green base verdict, labels and comments in
   * live mode) before a pause, a shadow tick or a withdrawal can treat it as abandoned and write
   * `failure` on the tip. Shadow mode lands nothing, but records a landing an earlier live tick
   * made. One tip read, only for a batch stored at the landing stage.
   */
  async recordEarlierLanding() {
    const f = this.s.inFlight;
    if (f?.stage !== "landing" || this.config.landing.mode !== "merge-ff") return;
    let tip;
    for (let read = 1; ; read++) {
      try {
        tip = await this.gh.getBranchSha(this.base);
        break;
      } catch (error) {
        // Two reads: the fall-back below can write `failure` on a tip that did land.
        if (read < 2) continue;
        // Unknown: the batch is treated as not landed (withdrawn if this tick leaves it), the
        // security-first choice of settleFailure too; the tick goes on (a pause is still applied).
        this.note(`base tip unreadable, ${f.batchId} taken as not landed: ${error.message}`);
        return;
      }
    }
    this.tipChecked = true;
    if (tip !== f.candidateSha) return;
    this.note(`${f.batchId} is already the tip of ${this.base}: it landed, its save was lost`);
    // Before the action: a bisection's next segment waits for composeDeferredSegments.
    this.deferSegments = true;
    try {
      await this.afterLanded(f, f.candidateSha);
    } finally {
      this.deferSegments = false;
    }
  }

  /**
   * Compose the bisection segment recordEarlierLanding left for later (afterSegmentGreen under
   * `deferSegments`), unless the base is paused now (this tick's pause, or one it loaded): then
   * nothing is composed and the bisection ends there; its PRs keep their labels and come back
   * through the FIFO once the queue resumes.
   */
  async composeDeferredSegments() {
    const deferred = this.deferredBisect;
    if (!deferred) return;
    this.deferredBisect = null;
    if (this.s.paused) {
      return this.note(
        `paused (${this.s.paused.reason}): the next segment of the bisection of ` +
          `${deferred.bisect.rootBatchId} is not composed; its PRs stay queued`
      );
    }
    await this.composeSegments(deferred.bisect, { onto: deferred.onto });
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
        lane: f.lane,
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

    // Earlier ticks blessed this batch and none of them reached a verdict (stored at the landing
    // stage, or sent back to testing by main()'s failure path with its count kept). After
    // LANDING_ATTEMPTS_LIMIT of them it is not blessed again: pause and say so.
    // Live only: shadow blesses nothing, so a count carried from live mode never pauses it.
    const landAttempts = storedLandAttempts(f);
    if (live && landAttempts >= LANDING_ATTEMPTS_LIMIT) {
      const lastError = this.s.history.findLast((e) => e.type === "error")?.detail || "unknown";
      return this.pauseLanding(
        f,
        `landing of ${f.batchId} ended without a verdict ${landAttempts} times since its ` +
          "candidate was composed or the queue was last paused or resumed by hand " +
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
      this.growBatchWindow(f);
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
    return this.recompose(f.prs, f.bisect, { checked: true, lane: f.lane });
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
    this.setPaused({
      reason: "error",
      since: this.now(),
      baseSha: f.baseSha,
      detail,
      issue: null,
    });
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
   * blessed by an earlier tick that reached no verdict: this is its next attempt, and so is a
   * batch the failure path sent back to "testing" with its count kept. A document of the code
   * before the count has no `landAttempts` at the landing stage: that stored attempt counts as 1.
   */
  async markLanding(f) {
    const landAttempts = storedLandAttempts(f) + 1;
    this.s.inFlight = { ...f, stage: "landing", landAttempts };
    // Landing now: a release-freeze hold is over (saved here, in case the landing dies).
    if (f.freezeHold && f.freezeHold.endedAt === undefined) {
      this.s.inFlight.freezeHold = { ...f.freezeHold, endedAt: this.now() };
    }
    // Its commits are blessed on purpose now: a stored withdrawal of one of them is void. Dropped
    // in this save, so a tick that dies after the blessing leaves the landing stage (which
    // withdrawAbandoned reads) and no stale entry that would un-bless a commit the batch lands.
    this.dropWithdrawals(this.landShas(f));
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
    // This tick's own attempt, once its record is saved (a save that throws leaves a stale stored
    // landing as it was: settleFailure withdraws it): a failure after this keeps the landing stage
    // and its count (the attempts bound), and its refused withdrawals go to main()'s failure path.
    this.attemptedBatch = f.batchId;
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
   * does not save its state: main()'s failure path stores the refused withdrawals instead
   * (failedTickRecord, amendFailedTick).
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
   * switch; only live stores one), never in a dry-run. Once per landing record and tick.
   * `force` (settleFailure: the tick threw, so it lands nothing more) withdraws a batch still kept
   * at the landing stage in memory too.
   */
  async withdrawAbandoned({ force = false } = {}) {
    const f = this.landing;
    if (!f || this.dryRun || this.landedBatch === f.batchId || this.withdrawnLanding === f) return;
    const now = this.s.inFlight;
    const kept =
      now?.stage === "landing" && now.batchId === f.batchId && now.candidateSha === f.candidateSha;
    if (kept && !force) return;
    this.withdrawnLanding = f;
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
    // True of every batch this reaches: dropped, recomposed, paused, held, or a failed tick's.
    if (blessed.length) await this.withdrawLandStatus(f, blessed, "left the landing stage");
  }

  /**
   * run() threw `error`: everything here is best effort, never throws and never replaces the
   * error (main() records and rethrows it as it is). Skipped for a dry-run (it writes nothing)
   * and for a lost compare-and-swap (main() redoes the tick on the stored state).
   *  - The batch this tick loaded at the landing stage (or stored there itself) and did not land
   *    may carry the land status: a tick that throws lands nothing more, so its blessing is
   *    withdrawn now (withdrawAbandoned, forced), unless its candidate is the base tip (it
   *    landed; the next tick records it). Not when this tick made its own landing attempt
   *    (markLanding): that attempt withdrew its own blessing before rethrowing (revokeOrNote),
   *    and its landing stage with `landAttempts` is the record of the attempts bound.
   *  - What the stored state must learn from this tick is handed to main()'s failure path, which
   *    saves it with the `error` event (failedTickRecord, amendFailedTick): the landing stage of
   *    a batch withdrawn here is left (back to testing), the withdrawals GitHub refused are
   *    stored, and the stored withdrawals this tick settled are dropped.
   */
  async settleFailure(error) {
    // The same error object thrown again (a reused instance) never hands on an older record.
    if (error !== null && (typeof error === "object" || typeof error === "function")) {
      FAILED_TICKS.delete(error);
    }
    if (this.dryRun || error instanceof StateConflictError) return;
    let leaveLanding = null;
    try {
      const f = this.landing;
      const settled = !f || this.landedBatch === f.batchId || this.attemptedBatch === f.batchId;
      if (!settled && !(await this.isBaseTip(f))) {
        const before = this.refused.length;
        await this.withdrawAbandoned({ force: true });
        leaveLanding = { batchId: f.batchId, candidateSha: f.candidateSha };
        const refused = this.refused.slice(before);
        if (refused.length && error instanceof Error) {
          error.message +=
            `; the tick's withdrawal of ${f.batchId} was refused on ` +
            `${refused.map((w) => head12(w.sha)).join(", ")} (stored for retry)`;
        }
      }
    } catch (failure) {
      this.note(`after the failure: ${String(failure?.message ?? failure).slice(0, 200)}`);
    }
    if (!leaveLanding && !this.refused.length && !this.retired.length) return;
    if (error === null || (typeof error !== "object" && typeof error !== "function")) return;
    FAILED_TICKS.set(error, {
      leaveLanding,
      withdrawals: this.refused.map((w) => ({ ...w })),
      retired: [...this.retired],
    });
  }

  /**
   * merge-ff: whether `f`'s candidate is the base tip (it landed). Never throws: an unreadable tip
   * is false (the withdrawal goes ahead). Not read again when recordEarlierLanding read it.
   */
  async isBaseTip(f) {
    if (this.config.landing.mode !== "merge-ff" || this.tipChecked) return false;
    try {
      return (await this.gh.getBranchSha(this.base)) === f.candidateSha;
    } catch {
      return false;
    }
  }

  /**
   * End of a tick: the withdrawals GitHub refused this tick while landWithdrawals was full
   * (storeWithdrawal: kept in the overflow, or nowhere) are recorded by the pure
   * recordFullWithdrawals: a base that is not paused (or paused as base-red) pauses with reason
   * `error`, one paused for another reason keeps its reason (a commit kept nowhere is appended to
   * its detail), and an `error` event says which commits. A new pause leaves a landing stage (a
   * paused base holds no blessed batch), so withdrawAbandoned runs once more; a refusal there is
   * recorded the same way.
   */
  async recordIfFull() {
    for (let pass = 0; pass < 2 && this.fullRefusals.length; pass++) {
      const refusals = this.fullRefusals;
      this.fullRefusals = [];
      const was = this.s.paused;
      this.s = recordFullWithdrawals(this.s, refusals, {
        at: this.now(),
        url: this.deps.runUrl ?? undefined,
        statusContext: this.config.landing.statusContext,
      });
      this.note(this.s.history.at(-1).detail);
      if (was?.reason === "base-red" && this.s.paused?.reason === "error") {
        await this.tellBaseRedReplaced(was);
      }
      await this.withdrawAbandoned();
    }
  }

  /**
   * A base-red pause was replaced by the full-list pause: its issue said the queue resumes by
   * itself when the base moves, which is no longer true. One comment there says so (commentOnce,
   * one per replaced pause); nothing when the pause names no issue. Best effort: a comment GitHub
   * refuses (a deleted issue, a 5xx) is one note and the tick completes; the pause detail names
   * the issue anyway (recordFullWithdrawals).
   */
  async tellBaseRedReplaced(was) {
    if (!Number.isSafeInteger(was.issue)) return;
    try {
      await this.comment(
        was.issue,
        `base-red-replaced:${was.since}`,
        [
          `⏸️ **omni-queue**: \`${this.base}\` is now paused because its list of land-status ` +
            "withdrawals is full (`landWithdrawals is full`), not only because the base is red.",
          "",
          "This pause will not resume by itself when the base moves: an operator resumes it",
          "(`npm run queue -- resume <base>`) once `landWithdrawalsOverflow` is empty. See the",
          "dashboard issue of the base.",
        ].join("\n")
      );
    } catch (error) {
      this.note(`comment on base-red issue #${was.issue} not posted: ${error.message}`);
    }
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
   * Keep a `failure` GitHub refused to write on `sha` for the next ticks (retryWithdrawals), by
   * the pure storeWithdrawalIn: one entry per SHA, in state.landWithdrawals while it has room,
   * else in state.landWithdrawalsOverflow. Nothing is ever dropped. A refusal that did not go to
   * the main list as a new entry (overflow, or nowhere when both are full) is held in
   * this.fullRefusals for the end of the tick (recordIfFull). Every refusal is also kept in
   * this.refused for main()'s failure path.
   */
  storeWithdrawal(f, sha, why) {
    const refusal = { sha, batchId: f.batchId, candidateSha: f.candidateSha, why, at: this.now() };
    this.refused.push(refusal);
    const result = storeWithdrawalIn(this.s, refusal);
    const { state, list } = result;
    for (const field of WITHDRAWAL_LISTS) this.setWithdrawalList(field, state[field] ?? []);
    this.alertAttempts(result.entry, list);
    if (!isFullListRefusal(result)) return;
    this.fullRefusals.push({ ...refusal, list });
    this.note(
      `${f.batchId}: withdrawal of ${head12(sha)} ` +
        (list ? "kept in landWithdrawalsOverflow" : "kept nowhere: both lists are full") +
        "; the full list is recorded at the end of the tick"
    );
  }

  /** this.s[field] = `list`; an empty list leaves no field (documents stay as before). */
  setWithdrawalList(field, list) {
    if (list.length) this.s[field] = list;
    else delete this.s[field];
  }

  /**
   * The stored withdrawals of `shas` go, from both lists: those commits are blessed on purpose
   * (markLanding, a manual bless) or landed (afterLanded), so withdrawing them would be wrong.
   */
  dropWithdrawals(shas) {
    const drop = new Set(shas);
    for (const field of WITHDRAWAL_LISTS) {
      this.setWithdrawalList(
        field,
        (this.s[field] ?? []).filter((w) => !drop.has(w.sha))
      );
    }
  }

  /**
   * Retry each stored withdrawal of both lists (storeWithdrawal; the main list, then the overflow,
   * by the same code): read the land status that decides a
   * withdrawal on its commit (newestAppLandStatus); `success` → write `failure` again. The entry
   * goes once that write succeeds, or when that status is not `success` (withdrawn since, or none:
   * nothing of the queue's to withdraw; a status by a readable other creator changes nothing, and
   * one without a readable creator can only add a reason to withdraw); a refused write keeps it
   * and counts an attempt, and so does a failed read. The count never drops an entry:
   * the queue never gives up on withdrawing a blessing. No event: the error was recorded when the
   * entry was stored, and the entry with its `since` is the record of the retries since (its
   * `attempts` is saved only with a save the tick makes for another reason or the heartbeat,
   * withoutStamp; after a day one `error` event, withRefusalAlert; after an hour the health check
   * reports the queue stalled, dashboard.STALL_WITHDRAWAL_MINUTES). Runs
   * on a paused queue too (a pause must not keep a stray `success` alive) and in every mode
   * (entries stored by live mode survive a switch to shadow; a queue that was never live has none,
   * so it reads nothing); never in a dry-run (which writes nothing).
   */
  async retryWithdrawals() {
    if (this.dryRun) return;
    for (const field of WITHDRAWAL_LISTS) {
      const stored = this.s[field] ?? [];
      if (!stored.length) continue;
      const { kept, stopped } = await this.retryList(stored, field);
      this.setWithdrawalList(field, kept);
      if (stopped) return; // a rate limit: the rest of both lists waits for the next tick
    }
  }

  /**
   * retryWithdrawals for one list: returns the entries kept (each failed one with its attempts
   * counted; an entry refused for WITHDRAWAL_ALERT_MINUTES records one `error` event). A read or
   * a write that fails with a rate limit (isRateLimitError) stops the list there: the entries
   * after it are kept as they are, and `stopped` tells the caller to leave the next list too.
   */
  async retryList(stored, field) {
    const { statusContext } = this.config.landing;
    const kept = [];
    const failed = (w, error) => {
      const next = { ...w, attempts: w.attempts + 1 };
      kept.push(next);
      this.alertAttempts(next, field);
      return isRateLimitError(error);
    };
    for (const [i, w] of stored.entries()) {
      let newest;
      try {
        newest = await this.newestAppLandStatus(w.sha);
      } catch (error) {
        const limited = failed(w, error);
        this.note(
          `could not read the land status of ${head12(w.sha)} (stored withdrawal of ` +
            `${w.batchId}, ${w.attempts + 1} failed attempts): ${error.message}`
        );
        if (limited) return this.rateLimited(kept, stored.slice(i + 1));
        continue;
      }
      if (newest?.state !== "success") {
        this.note(
          `${w.batchId}: stored withdrawal of ${head12(w.sha)} dropped ` +
            `(the App's ${statusContext} is ${newest?.state ?? "absent"})`
        );
        this.retired.push(w.sha);
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
        this.retired.push(w.sha);
      } catch (error) {
        const limited = failed(w, error);
        this.note(
          `${w.batchId}: withdrawal of ${statusContext} on ${head12(w.sha)} refused again ` +
            `(${w.attempts + 1} failed attempts): ${String(error?.message ?? error).slice(0, 200)}`
        );
        if (limited) return this.rateLimited(kept, stored.slice(i + 1));
      }
    }
    return { kept, stopped: false };
  }

  /** retryList stopped by a rate limit: what it kept, then the untouched rest of the list. */
  rateLimited(kept, rest) {
    this.note("stored withdrawals: rate limited, the rest waits for the next tick");
    return { kept: [...kept, ...rest], stopped: true };
  }

  /** One `error` event when a stored withdrawal has been refused for WITHDRAWAL_ALERT_MINUTES. */
  alertAttempts(entry, field) {
    const before = this.s.history.length;
    this.s = withRefusalAlert(this.s, entry, field, {
      at: this.now(),
      url: this.deps.runUrl ?? undefined,
      statusContext: this.config.landing.statusContext,
    });
    if (this.s.history.length !== before) this.note(this.s.history.at(-1).detail);
  }

  async afterLanded(f, sha) {
    const { label, protectedApprovalLabel } = this.config;
    this.landedBatch = f.batchId; // its land status stays: the commits are on the base
    // A stored withdrawal of a landed commit (its landing threw after the push went through and
    // the withdrawal was refused) must not write `failure` on the base.
    this.dropWithdrawals(this.landShas(f));
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
    this.growBatchWindow(f);
    if (
      f.lane === "base-repair" &&
      this.s.paused?.reason === "base-red" &&
      !this.overflowKeepsBaseRed(`base repaired by ${formatPrs(f.prs)}`)
    ) {
      // The repair is on the base (live only: a shadow would-land leaves the base red, and its
      // pause lifts only when the tip moves, maybeAutoResume).
      const by = formatPrs(f.prs);
      this.s.paused = null;
      this.event("resumed", { sha, detail: `base repaired by ${by}` });
      this.note(`base-red pause lifted: base repaired by ${by}`);
    }
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
      const onto = this.shadowStack(advanced.bisect, f.candidateSha, [f.candidateRef]);
      if (this.deferSegments) {
        // recordEarlierLanding runs before the action: composeDeferredSegments decides later.
        this.deferredBisect = { bisect: advanced.bisect, onto };
        return;
      }
      return this.composeSegments(advanced.bisect, { onto });
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
    return this.recompose(prs, bisect, {
      onto: this.shadowStack(bisect, f.baseSha, []),
      lane: parked ? parked.lane : f.lane,
    });
  }

  /** An open divergence issue exists although the state has no pause: restore the pause. */
  pauseForDivergence(f, issue) {
    this.setPaused({
      reason: "tree-divergence",
      since: this.now(),
      baseSha: f.baseSha,
      detail: `divergence issue #${issue.number} is open: close it, then resume the queue`,
      issue: issue.number,
    });
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
    this.setPaused({
      reason: "tree-divergence",
      since: this.now(),
      baseSha: f.baseSha,
      detail: `squash-api landing of ${f.batchId} produced tree ${result.actualTree ?? "?"}`,
      issue,
    });
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
   * waits for the re-run's verdict. Only the runs in `rerun.runIds` (the runs it re-ran or
   * adopted) are looked at:
   *  - one of them at attempt 2 or later is not completed: waited for up to
   *    config.checksTimeoutMinutes from the candidate's start (never cut short by
   *    RERUN_START_MINUTES);
   *  - such an attempt is completed: no wait, its verdict is the one read;
   *  - none of them shows a later attempt yet (or the runs cannot be read): waited for while
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
      // Only the runs this record re-ran (or adopted): another run of the ref that a person
      // re-ran earlier says nothing about whether this re-run has started or concluded.
      runs = runs.filter((run) => rerun.runIds.includes(run.id));
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
        return this.onBaseRed(f, redDetail(verdict));
      case "pr-red":
        // A pr-red resting on a base check that timed out (verdict.baseTimedOut: no base-red
        // evidence) is bisected like any red batch but is not a confirmed red batch: the
        // adaptive window does not halve.
        return this.onPrRed({ ...f, failures, signatures }, { confirmed: !verdict.baseTimedOut });
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
      // commented on the base-red issue when one is open (pauseBaseRed)
      return this.onBaseRed({ ...parked, baseSha: f.baseSha }, redDetail(verdict));
    }
    const ref = this.parkedRef(parked);
    const parkedFailures = await this.failuresOf(
      parked.candidateSha,
      f.startedAt,
      ref,
      parked.batchId
    );
    // A timed-out base check gave no evidence either way: the parked batch goes the PR-red way
    // (bisection / culprit) but is not a confirmed red batch, so the window does not halve.
    return this.onPrRed(
      { ...parked, failures: parkedFailures, baseSha: f.baseSha, candidateRef: ref },
      { confirmed: status !== "timeout" }
    );
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
      // landAttempts stays: the same candidate SHA is tested again (only a new candidate or an
      // operator's pause or resume starts the count again).
      delete rest.rerun; // a new ref: its runs are not the re-run's (the retry is never re-run)
      delete rest.freezeHold; // a new run, a new startedAt: the in-flight clock starts again
      this.s.inFlight = {
        ...rest,
        batchId,
        candidateRef: ref,
        attempts,
        startedAt,
        stage: "testing",
        ...(storedLandAttempts(f) > 0 ? { landAttempts: storedLandAttempts(f) } : {}),
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
    if (f.lane === "base-repair" && this.s.paused?.reason === "base-red") {
      // A base repair whose CI fails for infrastructure says nothing about the base: the batch is
      // dropped (the repair PR keeps its labels: its lane composes it again, a new candidate, in
      // this tick or a later one), and the base-red pause stays, with what its issue says (it
      // resumes when the base moves).
      this.s.inFlight = null;
      const why =
        `${f.batchId}: base repair ${formatPrs(f.prs)} failed for infrastructure after ` +
        `${f.attempts} retry(ies) (${detail}): dropped; the base-red pause stays`;
      this.event("error", {
        batchId: f.batchId,
        prs: prNumbers(f.prs),
        sha: f.candidateSha,
        detail: why.slice(0, 500),
      });
      this.note(why);
      return;
    }
    this.setPaused({
      reason: "infra",
      since: this.now(),
      baseSha: f.baseSha,
      detail: `${f.batchId}: ${detail}`,
      issue: null,
    });
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
        ...(f.lane ? { lane: f.lane } : {}),
      },
      // The base check of a red lane batch belongs to its lane: a base-red pause keeps processing
      // the base check of a base-repair candidate.
      ...(f.lane ? { lane: f.lane } : {}),
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

  /**
   * Red batch `batch` failed like the bare base (classify "base-red"). A base-repair candidate
   * does not fix the base (repairNotFixing); any other batch pauses the base (pauseBaseRed).
   */
  async onBaseRed(batch, detail) {
    if (batch.lane === "base-repair") return this.repairNotFixing(batch, detail);
    return this.pauseBaseRed(batch, await this.findBaseRedIssue(), detail);
  }

  /**
   * A base-repair candidate failed like the base: the repair does not fix it. Its head is
   * recorded in state.repairTried (selectLane never composes that head again; the entry goes when
   * the head changes or the PR leaves the repair lane, pruneRepairTried), the PR is told once per
   * head (comment key `repair-not-fixing:<h12>`, never in shadow mode, not when the PR's head
   * moved after the candidate was composed) and keeps its labels. The base is red: a base that
   * was not paused yet pauses as base-red, like for any batch; a base-red pause stays as it is.
   */
  async repairNotFixing(batch, detail) {
    this.s.inFlight = null;
    const tried = { ...(this.s.repairTried ?? {}) };
    for (const pr of batch.prs) {
      tried[String(pr.n)] = pr.head;
      const current = await this.gh.getPull(pr.n);
      if (current.state === "open" && current.headSha !== pr.head) {
        // A newer head was pushed after this candidate (as for a culprit, dequeueCulprit): the
        // comment would speak of a head that is no longer the PR's. The entry stays; the next
        // prune (pruneRepairTried) drops it and the new head is a new attempt.
        this.note(
          `base repair #${pr.n} (${head12(pr.head)}): head moved to ` +
            `${head12(current.headSha)}, no comment`
        );
        continue;
      }
      await this.commentPr(
        pr.n,
        `repair-not-fixing:${head12(pr.head)}`,
        [
          `🔴 **omni-queue**: this PR is in the base-repair lane of \`${this.base}\`, but its`,
          `candidate failed with the same failures as the base, so it does not repair it. This`,
          "head is not composed again. Two ways out: push a fix (a new head is tried again), or",
          `remove the \`${this.config.lanes.baseRepairLabel}\` label: the PR goes back to the ordinary queue.`,
          "Anyone who can label this PR can remove it; it counts again only when an approver",
          "applies it.",
          "",
          `- Head: \`${pr.head}\``,
          `- Candidate: ${this.checksUrl(batch.candidateSha)} (batch \`${batch.batchId}\`)`,
          detail ? `- Verdict: ${codeSpan(detail)}` : null,
        ]
          .filter((line) => line !== null)
          .join("\n")
      );
    }
    this.s.repairTried = tried;
    this.note(
      `${batch.batchId}: base repair ${formatPrs(batch.prs)} failed like the base; ` +
        "that head is not composed again"
    );
    if (this.s.paused?.reason === "base-red") return;
    return this.pauseBaseRed(batch, await this.findBaseRedIssue(), detail);
  }

  async pauseBaseRed(batch, issue, detail) {
    // A shadow-stacked segment is composed on a would-land candidate, never the base tip: the
    // pause must wait for the real tip to move, not resume on the next tick.
    const stacked = this.shadowStack(batch.bisect, batch.baseSha, []);
    const pauseSha = stacked ? await this.gh.getBranchSha(this.base) : batch.baseSha;
    this.setPaused({
      reason: "base-red",
      since: this.now(),
      baseSha: pauseSha,
      detail: detail || `${batch.batchId} failed like the bare base`,
      issue: issue?.number ?? null,
    });
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
   * comment around the job that timed out. `confirmed: false` (a parked batch settled by a base
   * check that timed out, or a later batch classified pr-red on that base: no base verdict) keeps
   * the adaptive window as it is.
   */
  async onPrRed(red, { confirmed = true } = {}) {
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
    // A root batch confirmed red by its own PRs (a base-red verdict, an infra failure and a
    // flaky job that passed its re-run never reach here; bisection segments returned above): the
    // next root batches are smaller, down to batch.minSize. A suspected hang (a job that timed
    // out, not a failing test) and an unconfirmed verdict (a base check that timed out, for the
    // parked batch it settles and for any later batch on that base) leave the window as it is.
    // A lane batch (always one PR) never moves the window either.
    if (!hang.length && confirmed && !red.lane) {
      this.moveBatchWindow((w) => Math.floor(w / 2), `${batchId} red on its own PRs`);
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
  async composeAndPush(prs, bisect, { onto = null, lane = null } = {}) {
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
      ...(lane ? { lane } : {}),
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
    // A root batch of an adaptive queue names the window it was cut to; a lane batch its lane.
    const windowNote = lane
      ? `; lane ${lane}`
      : !bisect && this.config.batch?.adaptive
        ? `; window ${this.batchWindow()}`
        : "";
    this.event("batch-started", {
      batchId,
      prs: prNumbers(included),
      sha: result.candidateSha,
      detail:
        `${bisect ? `bisect of ${bisect.rootBatchId}: ` : ""}` +
        `${included.length} PR(s) on ${head12(result.baseSha ?? baseSha)}${stackNote}` +
        windowNote +
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
  async recompose(prs, bisect, { onto = null, checked = false, lane = null } = {}) {
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
    if (fresh.length) await this.composeAndPush(fresh, null, { lane });
  }

  // ─────────────────────────── queue snapshot / selection ───────────────────────────

  /**
   * PrSnapshot (eligibility.mjs) of PR `number`, read fresh from GitHub. `greenCheck: false`
   * (revalidate) reads no PR-level check at all: prGreenCheck is null and prChecks absent, so the
   * PR gates never drop a PR from a batch that is about to land. Otherwise the head's check runs
   * are listed ONCE (one github.listCheckRuns: the check runs and the check suites of the head,
   * both paginated) and serve both prGreenCheck and prChecks (eligibility.prCheckState of every
   * name in config.prChecksRequired); nothing is listed when neither needs them. The head's
   * workflow runs are listed too, only when a gate is ambiguous (gateSuites).
   */
  async snapshotPull(number, { greenCheck = true } = {}) {
    const pull = await this.gh.getPull(number);
    const [manifest, timeline, headStatuses] = [
      await this.gh.listPullFileManifest(pull.number),
      await this.gh.listIssueTimeline(pull.number),
      await this.gh.listCommitStatuses(pull.headSha),
    ];
    const gates = greenCheck ? (this.config.prChecksRequired ?? []) : [];
    const wantGreen = greenCheck && this.config.preferGreenPrChecks;
    const runs = wantGreen || gates.length ? await this.gh.listCheckRuns(pull.headSha) : null;
    const prGreenCheck = wantGreen ? prGreenCheckState(runs, this.config.prGreenCheck) : null;
    const suiteIsCurrent = gates.length ? await this.gateSuites(pull, runs, gates) : undefined;
    const prChecks = greenCheck
      ? Object.fromEntries(
          gates.map((name) => [name, eligibilityModule.prCheckState(runs, name, suiteIsCurrent)])
        )
      : undefined;
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
      ...(prChecks ? { prChecks } : {}),
    };
  }

  /**
   * suiteIsCurrent for the PR gates of `pull` (eligibility.prCheckState), or undefined (every
   * suite is current). Only when a gate is ambiguous (eligibility.prChecksNeedWorkflowRuns: two
   * or more suites carry it and their newest runs disagree, as when a retarget cancelled a run
   * whose `if: always()` gate still concluded and the workflow ran again on the same head) are the
   * head's workflow runs listed, once (github.listWorkflowRuns, paginated): of each workflow only
   * its newest run's suite is current (eligibility.currentSuitePredicate). A listing that fails
   * leaves every suite current, the stricter reading, and the tick goes on.
   */
  async gateSuites(pull, runs, gates) {
    if (!eligibilityModule.prChecksNeedWorkflowRuns(runs, gates)) return undefined;
    let workflowRuns;
    try {
      workflowRuns = await this.gh.listWorkflowRuns({ headSha: pull.headSha });
    } catch (error) {
      this.note(
        `#${pull.number}: workflow runs of head ${head12(pull.headSha)} not listed ` +
          `(${error.message}); every check suite of its gates counts`
      );
      return undefined;
    }
    // The filter re-checked: a listing that ignored it must not mark another head's suites.
    const own = (workflowRuns ?? []).filter((run) => run?.headSha === pull.headSha);
    return eligibilityModule.currentSuitePredicate(own);
  }

  async snapshotQueue() {
    const { label } = this.config;
    const pulls = await this.gh.listOpenPulls({ base: this.base });
    const open = new Set(pulls.map((p) => String(p.number)));
    for (const key of Object.keys(this.s.shadow.processed)) {
      if (!open.has(key)) delete this.s.shadow.processed[key];
    }
    this.pruneRepairTried(pulls);
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
      // The PR's lane decides whether the PR-gate rule applies (not on lane base-repair).
      const lane = this.m.eligibility.laneOf(pr, ctx);
      const verdict = this.m.eligibility.evaluateEligibility(pr, lane ? { ...ctx, lane } : ctx);
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
   * Drop the state.repairTried entries whose PR is no longer queued for base repair (not open on
   * this base, or without the queue label or the base-repair label: closed, merged, retargeted, a
   * label removed) or whose head changed (`pulls`: github.listOpenPulls of this base). The field
   * goes when it is empty, so the map is bounded by the open repair PRs.
   */
  pruneRepairTried(pulls) {
    const tried = this.s.repairTried;
    if (!tried) return;
    const repairLabel = String(this.config.lanes?.baseRepairLabel ?? "").toLowerCase();
    const has = (p, name) => (p.labels ?? []).some((l) => String(l).toLowerCase() === name);
    const open = new Map(pulls.map((p) => [String(p.number), p]));
    const kept = {};
    for (const [n, head] of Object.entries(tried)) {
      const p = open.get(n);
      const queued =
        p &&
        p.baseRef === this.base &&
        p.headSha === head &&
        has(p, String(this.config.label).toLowerCase()) &&
        Boolean(repairLabel) &&
        has(p, repairLabel);
      if (queued) kept[n] = head;
      else
        this.note(`#${n}: base-repair attempt of ${head12(head)} forgotten (PR or head changed)`);
    }
    if (Object.keys(kept).length) this.s.repairTried = kept;
    else delete this.s.repairTried;
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

  /** Size of the next root batch: the adaptive window, or batch.maxSize (currentBatchWindow). */
  batchWindow() {
    return eligibilityModule.currentBatchWindow(this.config, this.s);
  }

  /**
   * Move the adaptive window (config.batch.adaptive only; without it nothing is stored) to
   * `next(window)`, clamped to [minSize, maxSize], and store it in state.batchWindow.
   */
  moveBatchWindow(next, why) {
    if (!this.config.batch?.adaptive) return;
    const { minSize, maxSize } = this.config.batch;
    const before = this.batchWindow();
    const after = Math.min(maxSize, Math.max(minSize ?? 1, next(before)));
    this.s.batchWindow = after;
    if (after !== before) this.note(`batch window ${before} → ${after} (${why})`);
  }

  /**
   * A root batch (not a bisection segment) landed or would land: the window grows by one when
   * the batch filled it (demand reached the window), up to batch.maxSize.
   */
  growBatchWindow(f) {
    if (f.bisect || f.kind !== "batch" || f.lane) return; // a lane batch never moves the window
    const window = this.batchWindow();
    if (f.prs.length < window) return;
    this.moveBatchWindow((w) => w + 1, `${f.batchId} of ${f.prs.length} PR(s) went green`);
  }

  /**
   * Start the next batch: a lane batch of one first (eligibility.selectLane: a hotfix, else a
   * base repair), else the FIFO (selectBatch), which never takes a base-repair PR (its PR gates
   * are not checked: it is only ever composed alone). `repairOnly` (a base-red pause): a
   * base-repair batch or nothing.
   */
  async startBatch(queue, { repairOnly = false } = {}) {
    const candidates = queue.candidates.filter((c) => !this.touched.has(c.pr.number));
    const ctx = { ...queue.ctx, state: this.s, now: this.now() };
    const lane = candidates.length
      ? this.m.eligibility.selectLane(candidates, ctx, { repairOnly })
      : null;
    if (lane) return this.composeAndPush(lane.batch, null, { lane: lane.lane });
    if (repairOnly) return this.note(`paused (${this.s.paused.reason}): nothing composed`);
    const fifo = candidates.filter((c) => this.m.eligibility.laneOf(c.pr, ctx) !== "base-repair");
    if (!fifo.length) return this.note("queue idle: no eligible PR");
    const selection = this.m.eligibility.selectBatch(fifo, {
      ...ctx,
      batchSize: this.batchWindow(),
    });
    if (!selection.batch?.length) {
      return this.note(`waiting: ${selection.reason || "batch selection returned nothing"}`);
    }
    await this.composeAndPush(selection.batch, null);
  }

  // ─────────────────────────── housekeeping ───────────────────────────

  /**
   * Candidate refs of the commits the stored withdrawals name (both lists): each entry's batch and
   * candidate give its ref. Kept while the entry is stored, so GitHub still knows the commit when
   * a later tick writes `failure` on it; a retired entry's ref is a stray for the next cleanup.
   */
  withdrawalRefs() {
    const refs = new Set();
    for (const field of WITHDRAWAL_LISTS) {
      for (const w of this.s[field] ?? []) {
        try {
          refs.add(candidateRef(this.base, w.batchId, w.candidateSha));
        } catch {
          // a malformed entry (validateState refuses it) names no ref
        }
      }
    }
    return refs;
  }

  /**
   * Delete candidate refs of this base that no state references. `loadedRefs` (the stored
   * in-flight work) are kept here and removed by deleteSuperseded once the new state is saved;
   * the refs of stored withdrawals are kept (withdrawalRefs).
   */
  async cleanupRefs(loadedRefs = new Set()) {
    const prefix = `${CANDIDATE_PREFIX}${sanitizeBase(this.base)}/`;
    const keep = new Set([
      ...this.refsOf(this.s.inFlight),
      ...loadedRefs,
      ...this.withdrawalRefs(),
    ]);
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

  /**
   * After a successful save: delete the refs of the previous in-flight work it superseded, except
   * those a stored withdrawal still names (withdrawalRefs).
   */
  async deleteSuperseded(loadedRefs) {
    const keep = new Set([...this.refsOf(this.s.inFlight), ...this.withdrawalRefs()]);
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
    if (this.dryRun) {
      this.note("would update the dashboard issue");
      return null;
    }
    try {
      return await this.m.dashboard.upsertDashboard({ gh: this.gh, base: this.base, body });
    } catch (error) {
      // Cosmetic: never let the dashboard block the state save of real transitions.
      this.note(`dashboard update failed: ${error.message}`);
      return null;
    }
  }

  /**
   * The queue's health at the end of a tick that completed: the count of failed ticks in a row
   * (state.failedTicks, failedSince) is deleted first, so the error streak is over, then
   * dashboard.assessHealth judges the rest. The first stalled verdict
   * of an episode records state.stalled and a queue-stalled event; while state.stalled exists the
   * episode goes on and nothing more is raised; a verdict that is not stalled clears it.
   * @returns {import("./contracts.mjs").StalledEpisode|null} the open episode whose comment is
   *   not delivered yet (opened by this tick, or by an earlier one whose comment failed)
   */
  trackHealth(entries) {
    const at = this.now();
    if (this.s.failedTicks !== undefined || this.s.failedSince !== undefined) {
      this.note(`a tick completes again after ${this.s.failedTicks ?? "?"} failed tick(s)`);
      delete this.s.failedTicks;
      delete this.s.failedSince;
    }
    const health = assessHealth({ state: this.s, queue: entries, config: this.config, now: at });
    const tracked = trackStall(this.s, health, { at, url: this.deps.runUrl ?? undefined });
    this.s = tracked.state;
    if (tracked.opened) {
      this.note(
        `queue stalled since ${tracked.opened.since}: ${tracked.opened.reasons.join("; ")}`
      );
    }
    if (tracked.cleared) this.note("queue no longer stalled: the stalled episode is over");
    const episode = this.s.stalled;
    return episode && episode.notified !== true ? episode : null;
  }

  /**
   * The one comment of a stalled episode, on the dashboard issue (`issue`, from upsertDashboard).
   * Posted in every mode but dry-run: the dashboard issue is the queue's own, not a pull request.
   * Once posted, the episode records `notified: true` (saved with this tick) and no later tick
   * tries again; until then every tick does, and the comment key (`stalled:<since>`) keeps the
   * retries to one comment. Never fails the tick: a comment that cannot be posted is a note.
   */
  async alertStalled(issue, stalled) {
    const key = stalledKey(stalled.since);
    if (this.dryRun) return this.note(`would post the stalled alert (${key}) on the dashboard`);
    if (!Number.isSafeInteger(issue)) {
      return this.note(`stalled alert ${key} not posted: no dashboard issue this tick`);
    }
    try {
      await this.comment(
        issue,
        key,
        stalledComment({ base: this.base, stalled, config: this.config })
      );
    } catch (error) {
      return this.note(`stalled alert ${key} not posted: ${error.message}`);
    }
    if (this.s.stalled?.since === stalled.since) {
      this.s.stalled = { ...this.s.stalled, notified: true };
    }
  }
}

/** Comment key of a stalled episode's alert (one comment per `since`). */
export function stalledKey(since) {
  return `stalled:${new Date(Date.parse(since)).toISOString()}`;
}

/**
 * Apply a health verdict to a state (pure). Stalled with no episode recorded: opens one —
 * state.stalled = {since, reasons, openedAt: at} (not `notified`: its comment is not posted yet)
 * and a queue-stalled event. Stalled with an episode recorded:
 * nothing (the episode goes on, even if its reasons changed). Not stalled: clears state.stalled,
 * unless `clear` is false (main()'s failure path, whose verdict cannot read every rule).
 * @param {QueueState} state
 * @param {{status: string, reasons: string[], since: string|null}} health
 * @param {{at: string, url?: string, clear?: boolean}} options
 * @returns {{state: QueueState, opened: import("./contracts.mjs").StalledEpisode|null,
 *            cleared: boolean}}
 */
export function trackStall(state, health, { at, url, clear = true }) {
  if (health.status === "stalled") {
    if (state.stalled) return { state, opened: null, cleared: false };
    const opened = { since: health.since, reasons: [...health.reasons], openedAt: at };
    const next = appendEvent(
      { ...state, stalled: opened },
      stripUndefined({
        at,
        type: "queue-stalled",
        detail: health.reasons.join("; ").slice(0, 500),
        url,
      })
    );
    return { state: next, opened, cleared: false };
  }
  if (!clear || state.stalled === undefined) return { state, opened: null, cleared: false };
  const rest = { ...state };
  delete rest.stalled;
  return { state: rest, opened: null, cleared: true };
}

/**
 * main()'s record of a tick that threw: append an `error` event to the stored state and count the
 * failed tick (countFailedTick: state.failedTicks, failedSince; a tick that completes deletes
 * them, trackHealth), then run the health verdict on that state (no queue: the eligible-wait
 * rule is not read; never cleared from here); a verdict that opens an episode records
 * state.stalled and a queue-stalled event in the same save. Then, when the stored episode's
 * comment is not delivered yet (opened now, or by an earlier tick whose comment failed),
 * deliverStalledAlert tries again. This is what alerts a queue whose every tick throws (its
 * dashboard is never refreshed). Otherwise, when the saved state stores withdrawals (either
 * list), a missing dashboard issue is created (dashboardIssueOf), so that the next scheduled tick
 * finds the base through it (discoverBases) even when no labelled PR targets it.
 * The same save applies `record`, what the failed tick left for the stored state
 * (failedTickRecord: a batch it withdrew leaves the landing stage, refused withdrawals are stored,
 * settled ones dropped; amendFailedTick), so the stored state never claims a landing in progress
 * for a batch whose status the tick withdrew. A record that cannot be applied goes to `warn` and
 * the error is recorded without it.
 * Throws only what the error record's own save throws (as before this alert existed). The
 * health verdict and the delivery never throw: a failure there goes to `warn` and is ignored, so
 * the failed tick stays failed with its own error and exit code.
 * @param {TickDeps} deps
 * @param {string} base
 * @param {string} detail  the tick's (redacted) error message
 * @param {(message: string) => void} [warn]
 * @param {ReturnType<typeof failedTickRecord>} [record]
 */
export async function recordTickFailure(deps, base, detail, warn = () => {}, record = null) {
  const saved = await updateStateWithRetry(deps.store, base, (state) => {
    const at = deps.now();
    const url = deps.runUrl ?? undefined;
    let amended = state;
    try {
      const statusContext = deps.config.landing.statusContext;
      amended = amendFailedTick(state, record, { at, url, statusContext });
    } catch (error) {
      warn(`the failed tick's record was not applied: ${error.message}`);
    }
    const failed = countFailedTick(
      appendEvent(amended, stripUndefined({ at, type: "error", detail, url })),
      at
    );
    try {
      const health = assessHealth({ state: failed, queue: null, config: deps.config, now: at });
      return trackStall(failed, health, { at, url, clear: false }).state;
    } catch (error) {
      warn(`health check after the failure skipped: ${error.message}`);
      return failed;
    }
  });
  if (saved?.stalled && saved.stalled.notified !== true) {
    await deliverStalledAlert(deps, base, saved, warn);
  } else if (saved && storedWithdrawalCount(saved) > 0) {
    // A base whose stored withdrawals are its only work is found by the next scheduled tick
    // through its open dashboard issue (discoverBases): one is created when none is open.
    try {
      await dashboardIssueOf(deps, base, saved);
    } catch (error) {
      warn(`dashboard of a base with stored withdrawals not created: ${error.message}`);
    }
  }
}

/**
 * One more failed tick in a row (pure): failedTicks + 1, failedSince kept, or a new run (1, `at`)
 * when none is counted, the count is unreadable, or the run is not recent: the stored state was
 * last saved more than WATCHDOG_LIMIT_MINUTES before `at` (a failed tick saves, so a run of
 * failures with such a gap was interrupted; the same limit as the watchdog's "no state saved").
 * @param {QueueState} state  the stored state (its `updatedAt` = its last save)
 * @param {string} at
 * @returns {QueueState}
 */
export function countFailedTick(state, at) {
  const lastSave = Date.parse(state.updatedAt ?? "");
  // Milliseconds here, whole minutes in the watchdog (stale from 91): the one-minute window
  // between the two is known and harmless.
  const recent =
    !Number.isNaN(lastSave) && Date.parse(at) - lastSave <= WATCHDOG_LIMIT_MINUTES * 60_000;
  const running = recent && Number.isSafeInteger(state.failedTicks) && state.failedTicks >= 1;
  const since = running && !Number.isNaN(Date.parse(state.failedSince ?? ""));
  return {
    ...state,
    failedTicks: running ? state.failedTicks + 1 : 1,
    failedSince: since ? state.failedSince : at,
  };
}

/**
 * What a tick that threw leaves for main()'s failure path to save (Tick.settleFailure): keyed by
 * the thrown error, so the error itself is passed on untouched. See failedTickRecord.
 */
const FAILED_TICKS = new WeakMap();

/**
 * The record a tick that threw `error` left for the stored state, or null (nothing to add):
 *  - leaveLanding {batchId, candidateSha}: the tick withdrew the land status of that batch,
 *    stored at the landing stage, without landing it: the stored batch goes back to testing;
 *  - withdrawals [{sha, batchId, candidateSha, why, at}]: `failure` writes GitHub refused;
 *  - retired [sha]: stored withdrawals the tick settled (written, or nothing left to withdraw).
 * main() hands it to recordTickFailure, which applies it (amendFailedTick) in the save that
 * records the `error` event.
 * @param {unknown} error
 */
export function failedTickRecord(error) {
  if (error === null || (typeof error !== "object" && typeof error !== "function")) return null;
  return FAILED_TICKS.get(error) ?? null;
}

/** The two lists of refused withdrawals, retried alike: the main one, then its overflow. */
const WITHDRAWAL_LISTS = Object.freeze(["landWithdrawals", "landWithdrawalsOverflow"]);

/** `state` with `field` = `list` (pure); an empty list leaves no field. */
function withWithdrawalList(state, field, list) {
  const next = { ...state };
  if (list.length) next[field] = list;
  else delete next[field];
  return next;
}

/**
 * Store one refused withdrawal (pure), one entry per SHA across both lists: a SHA already stored
 * in either list gets `why` updated and one more attempt (`since` stays); a new one goes to
 * state.landWithdrawals while it has room (LAND_WITHDRAWALS_LIMIT), else to
 * state.landWithdrawalsOverflow (same shape, same limit). Nothing is ever dropped to make room.
 * @param {QueueState} state
 * @param {{sha: string, batchId: string, candidateSha: string, why: string, at: string}} refusal
 * @returns {{state: QueueState, list: string|null, added: boolean, entry: object|null}} the list
 *   that holds it now (null when both are full: the state is then unchanged and the caller names
 *   the commit, recordFullWithdrawals), whether that is a new entry, and the entry
 */
export function storeWithdrawalIn(state, refusal) {
  for (const field of WITHDRAWAL_LISTS) {
    const list = [...(state[field] ?? [])];
    const i = list.findIndex((w) => w.sha === refusal.sha);
    if (i < 0) continue;
    list[i] = { ...list[i], why: refusal.why, attempts: list[i].attempts + 1 };
    return {
      state: withWithdrawalList(state, field, list),
      list: field,
      added: false,
      entry: list[i],
    };
  }
  const { sha, batchId, candidateSha, why, at } = refusal;
  for (const field of WITHDRAWAL_LISTS) {
    const list = state[field] ?? [];
    if (list.length >= LAND_WITHDRAWALS_LIMIT) continue;
    const entry = { sha, batchId, candidateSha, why, since: at, attempts: 1 };
    return {
      state: withWithdrawalList(state, field, [...list, entry]),
      list: field,
      added: true,
      entry,
    };
  }
  return { state, list: null, added: false, entry: null };
}

/**
 * Whether storing a refusal (storeWithdrawalIn's result) is the full-list condition: a NEW entry
 * in the overflow, or none at all (both lists full). A refusal of a SHA the overflow already holds
 * is not: the main list may have room again by then.
 */
function isFullListRefusal({ list, added }) {
  return list === null || (list === "landWithdrawalsOverflow" && added);
}

/**
 * Minutes since its first refusal (`since`) after which a stored withdrawal GitHub refuses again
 * records one `error` event saying it is still not withdrawn: a day of refusals. Measured from
 * `since`, not counted in `attempts` (a tick whose only change is that count does not save it,
 * withoutStamp). The queue keeps retrying: an entry never expires. The health check has said it
 * long before (dashboard.STALL_WITHDRAWAL_MINUTES: a stalled episode and its comment).
 */
export const WITHDRAWAL_ALERT_MINUTES = 24 * 60;

/** Words of the day-old withdrawal alert (withRefusalAlert): how a later tick finds it. */
const WITHDRAWAL_ALERT_TEXT = "has been refused for more than 24 h";

/**
 * `state` plus the `error` event of a stored withdrawal refused again (`entry`, in list `field`)
 * whose first refusal is WITHDRAWAL_ALERT_MINUTES or more before `at` (pure), once per entry: not
 * when the history holds that alert for the same commit, recorded at or after the entry's
 * `since`. `state` unchanged otherwise. An alert pushed out of the history (HISTORY_LIMIT events)
 * is recorded again on the next refusal.
 */
function withRefusalAlert(state, entry, field, { at, url, statusContext }) {
  if (!entry) return state;
  const since = Date.parse(entry.since);
  const now = Date.parse(at);
  if (Number.isNaN(since) || Number.isNaN(now)) return state;
  if (now - since < WITHDRAWAL_ALERT_MINUTES * 60_000) return state;
  const told = state.history.some(
    (e) =>
      e.type === "error" &&
      e.sha === entry.sha &&
      String(e.detail ?? "").includes(WITHDRAWAL_ALERT_TEXT) &&
      Date.parse(e.at) >= since
  );
  if (told) return state;
  const detail =
    `${entry.batchId}: the withdrawal of ${statusContext} on ${entry.sha} (${field}) ` +
    `${WITHDRAWAL_ALERT_TEXT}, since ${entry.since}; the queue keeps retrying it`;
  return appendEvent(
    state,
    stripUndefined({ at, type: "error", batchId: entry.batchId, sha: entry.sha, detail, url })
  );
}

/** Start of the pause detail and of the `error` event of a full landWithdrawals list. */
export const WITHDRAWALS_FULL_DETAIL = "landWithdrawals is full";

/** Words that introduce, in paused.detail, the commits a full pair of lists could not keep. */
export const KEPT_NOWHERE = "Kept nowhere (both lists full)";

/**
 * Pause reasons a full withdrawal list leaves as they are: none of them lifts by itself and
 * nothing is blessed under one. A `base-red` pause does both (the base-repair lane lands under it,
 * maybeAutoResume lifts it when the tip moves), so the full-list pause replaces it.
 */
const KEPT_PAUSE_REASONS = Object.freeze(["manual", "error", "infra", "tree-divergence"]);

/**
 * Landings of `f` that ended without a verdict, as stored: `landAttempts` at any stage (the count
 * belongs to the candidate, not to the stage); a batch at the landing stage of a document written
 * before the count counts as 1.
 * @param {InFlight} f
 */
function storedLandAttempts(f) {
  if (Number.isSafeInteger(f.landAttempts)) return f.landAttempts;
  return f.stage === "landing" ? 1 : 0;
}

/**
 * `state` with its in-flight batch at stage "testing" when it was at "landing" (pure); every
 * other field stays, its landing count included (written out: a document of the code before the
 * count has none at the landing stage, where it counts as 1). Only a new candidate and an
 * operator's pause or resume start the count again.
 */
function leaveLandingIn(state) {
  const f = state.inFlight;
  if (f?.stage !== "landing") return state;
  return { ...state, inFlight: { ...f, stage: "testing", landAttempts: storedLandAttempts(f) } };
}

/**
 * The commits every `Kept nowhere (both lists full): <sha> (<batchId>), …` clause of `detail`
 * names, each once, in order: [{sha, batchId}].
 */
export function keptNowhereCommits(detail) {
  const text = String(detail ?? "");
  const out = new Map();
  for (let at = text.indexOf(KEPT_NOWHERE); at >= 0; at = text.indexOf(KEPT_NOWHERE, at + 1)) {
    const clause = text.slice(at + KEPT_NOWHERE.length).split(";")[0];
    for (const m of clause.matchAll(/([0-9a-f]{40}) \(([A-Za-z0-9._-]+)\)/g)) {
      if (!out.has(m[1])) out.set(m[1], { sha: m[1], batchId: m[2] });
    }
  }
  return [...out.values()];
}

/** "<sha> (<batchId>)", comma-separated. */
const namedCommits = (list) => list.map((r) => `${r.sha} (${r.batchId})`).join(", ");

/**
 * The commits of `list`, named in full, as many as fit in `room` characters, then
 * "and N more, <where>" ("and N more" when `where` is null).
 * @param {string|null} [where]
 */
function namedWithin(list, room, where = "named in paused.detail") {
  const tail = where ? `, ${where}` : "";
  for (let n = list.length; n > 0; n--) {
    const more = n < list.length ? `, and ${list.length - n} more${tail}` : "";
    const text = namedCommits(list.slice(0, n)) + more;
    if (text.length <= room) return text;
  }
  return `${list.length} commit(s)${tail}`;
}

/**
 * Detail of the `resumed` event of an allowed resume (applyResume). When the pause it clears
 * named commits kept nowhere (keptNowhereCommits), they leave the state with it: the event names
 * as many as fit in 500 characters, then how many more.
 * @param {string} previous the reason of the pause cleared
 * @param {{sha: string, batchId: string}[]} cleared
 * @param {string} statusContext
 */
function resumedDetail(previous, cleared, statusContext) {
  const head = `manual resume (was ${previous})`;
  if (!cleared.length) return head;
  const lead =
    `${head}; the pause it cleared named commits kept nowhere (both lists full), check their ` +
    `${statusContext} by hand: `;
  return (lead + namedWithin(cleared, 500 - lead.length, null)).slice(0, 500);
}

/**
 * Record (pure) the refusals of a tick that found state.landWithdrawals full: those it kept as new
 * entries of state.landWithdrawalsOverflow (`list` "landWithdrawalsOverflow") and those it could
 * keep nowhere (`list` null, both lists full). A full list means GitHub refuses the App's status
 * writes, so the queue must not go on blessing:
 *  - a base that is not paused, or paused as `base-red` (which lifts by itself and blesses its
 *    repair lane), is paused with reason `error`: the detail says how many entries each list
 *    holds, names in full each commit kept nowhere and, for a replaced base-red pause, says so in
 *    one clause (with its issue number); the batch in flight leaves the landing stage (its count
 *    kept);
 *  - a base paused for a reason of KEPT_PAUSE_REASONS keeps its reason and `since`; a commit kept
 *    nowhere is appended to its detail (`Kept nowhere (both lists full): <sha> (<batchId>)`)
 *    unless such a clause already names it, so paused.detail names every such commit, whatever
 *    the pause;
 *  - in every case one `error` event says the same, its `sha` the first commit kept nowhere, else
 *    the first kept in the overflow; its detail is cut at 500 characters, so it names the commits
 *    kept nowhere that fit and how many more paused.detail holds.
 * paused.detail has no length bound in validateState: every commit fits there (the dashboard and
 * the CLI show a cut copy).
 * @param {QueueState} state
 * @param {{sha: string, batchId: string, list: string|null}[]} refusals
 * @param {{at: string, url?: string, statusContext: string}} options
 */
export function recordFullWithdrawals(state, refusals, { at, url, statusContext }) {
  const bySha = new Map();
  for (const r of refusals) bySha.set(r.sha, r);
  const all = [...bySha.values()];
  if (!all.length) return state;
  const nowhere = all.filter((r) => r.list === null);
  const counts =
    `${(state.landWithdrawals ?? []).length} of ${LAND_WITHDRAWALS_LIMIT}; ` +
    `landWithdrawalsOverflow holds ${(state.landWithdrawalsOverflow ?? []).length} of ` +
    `${LAND_WITHDRAWALS_LIMIT}`;
  const paused = state.paused;
  const kept = paused && KEPT_PAUSE_REASONS.includes(paused.reason);
  let next = state;
  if (!kept) {
    const lost = nowhere.length
      ? `. ${KEPT_NOWHERE}: ${namedCommits(nowhere)}; check their ${statusContext} by hand ` +
        "(docs/ops/OMNI_QUEUE.md, Incidents)"
      : "";
    // The replaced pause's issue (a base-red issue) is named in the text: no new field.
    const issue = Number.isSafeInteger(paused?.issue) ? ` (issue #${paused.issue})` : "";
    const replaced = paused
      ? `; the base was also paused as ${paused.reason}${issue}: ` +
        String(paused.detail).slice(0, 200)
      : "";
    const detail =
      `${WITHDRAWALS_FULL_DETAIL} (${counts}; counts at the time of the pause): GitHub ` +
      `refused the App's ${statusContext} ` +
      "failure again; every refused withdrawal is kept and retried on every tick. Find out why " +
      "GitHub refuses the App's status writes, wait until both lists are empty, then resume" +
      lost +
      replaced;
    next = leaveLandingIn({
      ...state,
      paused: { reason: "error", since: at, baseSha: null, detail, issue: null },
    });
  } else {
    // Already named only when a `Kept nowhere` clause names it, not because the SHA appears
    // somewhere in the text (an operator's reason may quote it).
    const named = new Set(keptNowhereCommits(paused.detail).map((c) => c.sha));
    const fresh = nowhere.filter((r) => !named.has(r.sha));
    if (fresh.length) {
      const detail = `${paused.detail}; ${KEPT_NOWHERE}: ${namedCommits(fresh)}`;
      next = { ...state, paused: { ...paused, detail } };
    }
  }
  const overflowed = all.filter((r) => r.list !== null).map((r) => head12(r.sha));
  const head =
    `${WITHDRAWALS_FULL_DETAIL} (${counts})` +
    (overflowed.length
      ? `: refused withdrawals kept in the overflow: ${overflowed.join(", ")}`
      : "") +
    (kept ? `; the base stays paused (${paused.reason})` : "") +
    (paused && !kept ? `; the ${paused.reason} pause was replaced` : "");
  const detail = nowhere.length
    ? `${head}; kept nowhere: ${namedWithin(nowhere, 500 - head.length - 16)}`
    : head;
  const first = nowhere[0] ?? all[0];
  return appendEvent(
    next,
    stripUndefined({
      at,
      type: "error",
      batchId: first.batchId,
      sha: first.sha,
      detail: detail.slice(0, 500),
      url,
    })
  );
}

/**
 * Apply to the stored state what a tick that threw left for it (failedTickRecord), pure: drop
 * the stored withdrawals it settled, take the batch it withdrew off the landing stage when the
 * stored batch is still that one at that stage (its landing count kept), store the withdrawals
 * GitHub refused (with the alert of an entry refused for WITHDRAWAL_ALERT_MINUTES, and record a
 * full list, recordFullWithdrawals). A null record returns `state` unchanged.
 * @param {QueueState} state
 * @param {ReturnType<typeof failedTickRecord>} record
 * @param {{at: string, url?: string, statusContext: string}} options
 */
export function amendFailedTick(state, record, options) {
  if (!record) return state;
  let next = state;
  const retired = new Set(record.retired ?? []);
  for (const field of WITHDRAWAL_LISTS) {
    if (retired.size && next[field]) {
      next = withWithdrawalList(
        next,
        field,
        next[field].filter((w) => !retired.has(w.sha))
      );
    }
  }
  const leave = record.leaveLanding;
  const f = next.inFlight;
  if (
    leave &&
    f?.stage === "landing" &&
    f.batchId === leave.batchId &&
    f.candidateSha === leave.candidateSha
  ) {
    next = leaveLandingIn(next);
  }
  const full = [];
  for (const refusal of record.withdrawals ?? []) {
    const result = storeWithdrawalIn(next, refusal);
    next = withRefusalAlert(result.state, result.entry, result.list, options);
    if (isFullListRefusal(result)) full.push({ ...refusal, list: result.list });
  }
  return full.length ? recordFullWithdrawals(next, full, options) : next;
}

/**
 * The number of the open dashboard issue of `base` (main()'s failure path). A base with no open
 * one (no tick of it has completed yet, or a person closed it) gets one, rendered from the stored
 * `state` with the queue marked as not read; an existing dashboard is never rewritten from here.
 * Throws what the lookup or the creation throws.
 * @param {TickDeps} deps
 * @param {string} base
 * @param {QueueState} state
 * @returns {Promise<number>}
 */
async function dashboardIssueOf(deps, base, state) {
  const issue = await findDashboard({ gh: deps.gh, base });
  if (issue !== null) return issue;
  const body = renderDashboard({
    base,
    state,
    queue: null,
    config: deps.config,
    now: deps.now(),
    runUrl: deps.runUrl ?? null,
    repository: deps.repository,
  });
  return createDashboard({ gh: deps.gh, base, body });
}

/**
 * main()'s failure path: post the stored episode's comment on the dashboard issue and record
 * `notified: true`. A base with no dashboard issue (no tick of it has completed yet) gets one,
 * rendered from the stored state with the queue marked as not read, so the alert has somewhere to
 * go; an existing dashboard is never rewritten from here. Never throws: anything that fails (the
 * lookup, the creation, the comment, the save of `notified`) goes to `warn`, the episode stays
 * undelivered and the next tick, completed or failed, tries again. The comment key
 * (`stalled:<since>`) keeps those retries to one comment.
 * @param {TickDeps} deps
 * @param {string} base
 * @param {QueueState} state  the stored state, carrying the undelivered episode
 * @param {(message: string) => void} warn
 */
async function deliverStalledAlert(deps, base, state, warn) {
  const episode = state.stalled;
  const key = stalledKey(episode.since);
  try {
    const issue = await dashboardIssueOf(deps, base, state);
    await deps.gh.commentOnce(
      issue,
      key,
      stalledComment({ base, stalled: episode, config: deps.config })
    );
  } catch (error) {
    return warn(`stalled alert ${key} not posted: ${error.message}`);
  }
  try {
    await markStalledNotified(deps.store, base, episode.since);
  } catch (error) {
    warn(`stalled alert ${key} posted, but not recorded as delivered: ${error.message}`);
  }
}

/**
 * Record `notified: true` on the stored episode that started at `since` (compare-and-swap, three
 * attempts). Nothing is written when the stored state no longer carries that undelivered episode.
 */
async function markStalledNotified(store, base, since) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const { state, version } = await store.load(base);
    const episode = state.stalled;
    if (!episode || episode.notified === true || stalledKey(episode.since) !== stalledKey(since)) {
      return;
    }
    const next = { ...state, stalled: { ...episode, notified: true } };
    if ((await store.save(base, next, version, `omni-queue: stalled alert ${base}`)).ok) return;
  }
  throw new StateConflictError(`state of ${base}: compare-and-swap lost 3 time(s) in a row`);
}

/**
 * A state document without its save stamp and without the `attempts` count of its stored
 * withdrawals, serialized: equal strings = nothing to save. A retry GitHub refuses again changes
 * only that count; it is written with the next save the tick makes for another reason or with
 * the hourly heartbeat (STATE_HEARTBEAT_MINUTES), not on every tick. The alert of an entry that
 * has been refused for a day (WITHDRAWAL_ALERT_MINUTES) reads its `since`, not the count.
 */
const withoutStamp = (state) => {
  const uncounted = (list) =>
    Array.isArray(list) ? list.map((w) => ({ ...w, attempts: 0 })) : list;
  return JSON.stringify({
    ...state,
    updatedAt: null,
    landWithdrawals: uncounted(state.landWithdrawals),
    landWithdrawalsOverflow: uncounted(state.landWithdrawalsOverflow),
  });
};

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
 * queue label, or an existing state file with something in flight, a pause to re-evaluate, a
 * stored land-status withdrawal to retry (contracts.hasQueueWork), an open stalled episode or a
 * counted run of failed ticks (one completed tick ends both).
 * Bases with state are found through their OPEN dashboard issues (every completed tick upserts
 * one, creating it when none is open; the failure path creates a missing one when it raises the
 * stalled alert or when the state stores withdrawals). A base whose dashboard issue a person
 * closed is found again only through a labelled PR, until a tick of it runs (`--base`).
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
      // An open episode or a counted run of failures needs one completed tick to end it, even on
      // a base that lost its work (its labeled PRs gone): that tick clears both, then the base
      // drops out of this list.
      if (hasQueueWork(state, false) || state.stalled || state.failedTicks !== undefined) {
        bases.add(base);
      }
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

/**
 * Throws UnmanagedBaseError unless `base` is a base the queue manages (config.bases) with a safe
 * name (sanitizeBase). main() calls it on `--base` before anything is loaded or written.
 */
export function assertManagedBase(config, base) {
  let safe = true;
  try {
    sanitizeBase(base);
  } catch {
    safe = false;
  }
  if (!safe || !isManagedBase(config, base)) {
    throw new UnmanagedBaseError(
      `${JSON.stringify(String(base))} is not a base the queue manages (config.bases: ` +
        `${config.bases}): nothing loaded or written`
    );
  }
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
  if (args.base) {
    try {
      assertManagedBase(deps.config, args.base);
    } catch (error) {
      if (!(error instanceof UnmanagedBaseError)) throw error;
      return fail(error.message);
    }
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
        await recordTickFailure(
          deps,
          base,
          redact(error.message).slice(0, 500),
          (message) => console.error(`omni-queue ${base}: ${redact(message)}`),
          failedTickRecord(error)
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
