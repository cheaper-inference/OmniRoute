#!/usr/bin/env node
// scripts/merge-queue/tick.mjs — WP3. Plan §3.1: ONE idempotent tick of the queue.
//
// Entry point of .github/workflows/omni-queue.yml (the only writer of queue state):
//   node scripts/merge-queue/tick.mjs [--base <branch>] [--action tick|pause|resume|dry-run]
//                                     [--reason <text>]
// Environment (set by the workflow; never logged):
//   OMNI_QUEUE_TOKEN       GitHub App installation token (contents/pull_requests/issues: write)
//   GITHUB_REPOSITORY      owner/repo
//   OMNI_QUEUE_GIT_NAME, OMNI_QUEUE_GIT_EMAIL   bot identity for queue merge commits
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
// auto-resume a base-red pause when the base tip moved, else stop → if inFlight: read checks of
// candidateSha (checks.evaluateChecks) → pending: nothing; green: land (or would-land in shadow)
// / advance bisection; red: classify (classify.classifyRed) → infra retry / base-check / bisect /
// culprit; timeout: infra path → if nothing in flight: snapshot labeled PRs, run eligibility,
// execute its actions, select a batch, compose, push the candidate → render dashboard → save.
// Every network side effect happens BEFORE the state save that records it, and every step is
// safe to repeat when the save loses the CAS race (the next tick re-observes GitHub):
//   - candidate refs are unique per SHA (never force-pushed) and orphans are deleted by cleanup;
//     the refs of the STORED in-flight work are deleted only after the save that supersedes them;
//   - a push whose ref already holds the SHA is skipped; a candidate whose object is gone from
//     origin (every ref deleted, SHA not served) is recomposed instead of wedging the queue;
//   - comments go through gh.commentOnce, label removal of an absent label is a no-op;
//   - a merge-ff landing that already happened is recognized (base tip == candidate SHA), and an
//     open tree-divergence issue re-pauses squash-api landings whose pause was lost.
// Before landing (or composing a bisection segment) every PR is re-read and re-run through the
// eligibility rules: block labels, approval status on the head, protected approval and an open
// release-freeze (which holds the green batch in flight instead of landing it).
//
// The PR snapshot + eligibility run on EVERY tick (dashboard queue, eligibility comments and
// label removals); only the batch selection/composition waits for an idle, unpaused queue.

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
  appendEvent,
  baseCheckRef,
  baseRedTitle,
  batchIdFor,
  botIdentity,
  candidateRef,
  sanitizeBase,
} from "./contracts.mjs";
import * as dashboardModule from "./dashboard.mjs";
import * as eligibilityModule from "./eligibility.mjs";
import { createGit } from "./gitexec.mjs";
import { createGitHubClient } from "./github.mjs";
import * as landModule from "./land.mjs";
import { StateConflictError, createStateStore, updateStateWithRetry } from "./state.mjs";

export { StateConflictError };

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

export const TICK_ACTIONS = Object.freeze(["tick", "pause", "resume", "dry-run"]);

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

/** Title of the issue opened when a squash-api landing leaves a tree CI did not validate. */
const divergenceTitle = (base) => `🛑 omni-queue tree divergence: ${base}`;

function stripUndefined(object) {
  return Object.fromEntries(Object.entries(object).filter(([, v]) => v !== undefined));
}

const toMs = (raw) => {
  const ms = raw ? Date.parse(raw) : Number.NaN;
  return Number.isNaN(ms) ? null : ms;
};

/** Timestamp of a check run or status, for "is this result from the current attempt?" */
function resultTime(item) {
  return toMs(item.startedAt ?? item.completedAt ?? item.createdAt ?? null);
}

/** Newest GitHub-side timestamp among check runs / statuses (ms), null when none. */
function newestResultTime(items) {
  let newest = null;
  for (const item of items) {
    for (const raw of [item.startedAt, item.completedAt, item.createdAt]) {
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
  /** @param {TickDeps} deps */
  constructor(deps, base, action, reason) {
    this.deps = deps;
    this.base = base;
    this.action = action;
    this.reason = reason;
    this.dryRun = action === "dry-run";
    this.config = deps.config;
    this.violations = [];
    this.gh = this.dryRun ? readOnlyGitHub(deps.gh, this.violations) : deps.gh;
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

  async comment(n, key, body) {
    if (this.dryRun) return this.note(`would comment on #${n} (${key})`);
    await this.gh.commentOnce(n, key, body);
  }

  async removeLabel(n, label) {
    this.touched.add(n);
    if (this.dryRun) return this.note(`would remove label "${label}" from #${n}`);
    await this.gh.removeLabel(n, label);
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
    const { store } = this.deps;
    const { state, version } = await store.load(this.base);
    this.s = structuredClone(state);
    // Refs of the stored in-flight work stay on origin until the save that supersedes them
    // succeeds: if this save loses the CAS race, the redo still finds them.
    const loadedRefs = this.refsOf(state.inFlight);

    this.handleAction();
    await this.maybeAutoResume();

    if (this.s.inFlight && !this.s.paused) await this.processInFlight();
    else if (this.s.inFlight) this.note(`paused: in-flight ${this.s.inFlight.batchId} left as is`);

    const queue = await this.snapshotQueue();
    if (!this.s.paused && !this.s.inFlight) await this.startBatch(queue);
    else if (this.s.paused) this.note(`paused (${this.s.paused.reason}): nothing composed`);

    await this.cleanupRefs(loadedRefs);
    await this.updateDashboard(queue.entries);

    if (this.violations.length) {
      throw new Error(`dry-run attempted GitHub writes: ${this.violations.join(", ")}`);
    }
    if (!this.dryRun) {
      const result = await store.save(this.base, this.s, version, `omni-queue: tick ${this.base}`);
      if (!result.ok) {
        throw new StateConflictError(`state of ${this.base} changed during the tick`);
      }
      if (result.state) this.s = result.state;
    }
    await this.deleteSuperseded(loadedRefs);
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
    } else if (this.action === "resume") {
      if (!this.s.paused) return this.note("resume: the queue was not paused");
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
   * Check runs and statuses of `sha` for ONE candidate ref: runs that name another head branch
   * (the base's own push on a base-check SHA, the other ref of an infra retry) are not ours.
   * `since` additionally drops results older than the attempt (statuses carry no branch).
   */
  async readChecks(sha, { since = null, ref = null } = {}) {
    let runs = await this.gh.listCheckRuns(sha);
    let statuses = await this.gh.listCommitStatuses(sha);
    if (ref) {
      runs = runs.filter((run) => typeof run.headBranch !== "string" || run.headBranch === ref);
    }
    if (since) {
      // Same SHA tested before (infra retry, or a base-check on the base's own SHA): ignore
      // results that predate this attempt so an old verdict is never re-read as the new one.
      const cutoff = Date.parse(since);
      const fresh = (item) => {
        const at = resultTime(item);
        return at === null || at >= cutoff;
      };
      runs = runs.filter(fresh);
      statuses = statuses.filter(fresh);
    }
    return { runs, statuses };
  }

  async evaluate(sha, startedAt, options) {
    const { runs, statuses } = await this.readChecks(sha, options);
    const verdict = this.m.checks.evaluateChecks({
      checkRuns: runs,
      statuses,
      config: this.config,
      startedAt,
      now: this.now(),
    });
    return { verdict, observedMs: newestResultTime([...runs, ...statuses]) };
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
      this.event("checks-green", {
        batchId: f.batchId,
        prs: prNumbers(f.prs),
        sha: f.candidateSha,
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
   * @returns {Promise<{valid: PrRef[], dropped: {pr: PrRef, why: string}[],
   *   frozen: string|null}>} frozen = the base is under an open release-freeze
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
      if (why) dropped.push({ pr, why });
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
  }

  async landOrWouldLand(f) {
    const live = this.config.mode === "live";
    const mergeFf = this.config.landing.mode === "merge-ff";

    if (live && mergeFf) {
      const tip = await this.gh.getBranchSha(this.base);
      if (tip === f.candidateSha) {
        // A previous tick landed it and then lost the state save: record it, do not re-land.
        this.note(`${f.batchId} is already the tip of ${this.base}`);
        return this.afterLanded(f, f.candidateSha);
      }
    }
    if (live && !mergeFf) {
      // A divergence whose pause was lost with a state save must not be landed over.
      const issue = await this.openDivergenceIssue();
      if (issue) return this.pauseForDivergence(f, issue);
    }

    const { valid, dropped, frozen } = await this.revalidate(f.prs);
    if (frozen) return this.holdFrozen(f, frozen);
    if (dropped.length) {
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

    if (!live) {
      for (const pr of f.prs) this.s.shadow.processed[String(pr.n)] = pr.head;
      this.event("would-land", {
        batchId: f.batchId,
        prs: prNumbers(f.prs),
        sha: f.candidateSha,
        detail: `shadow mode: would ${this.config.landing.mode} onto ${head12(f.baseSha)}`,
      });
      this.note(`shadow: ${f.batchId} would land ${formatPrs(f.prs)}`);
      return this.afterSegmentGreen(f);
    }

    if (this.dryRun) {
      this.note(`would land ${f.batchId} (${head12(f.candidateSha)}) on ${this.base}`);
      return;
    }

    let result;
    if (mergeFf) {
      if (!this.fetchObject(f.candidateSha, [f.candidateRef])) return this.candidateLost(f);
      result = await this.m.land.landMergeFf({
        git: this.gitRepo(),
        base: this.base,
        candidateSha: f.candidateSha,
        expectedBaseSha: f.baseSha,
        prs: f.prs, // stacked PRs (alreadyContained) count as merged too
      });
    } else {
      result = await this.m.land.landSquashApi({
        gh: this.gh,
        base: this.base,
        prs: f.prs,
        expectedBaseSha: f.baseSha,
        candidateTreeSha: f.treeSha,
      });
    }

    if (result.ok) return this.afterLanded(f, result.newBaseSha ?? f.candidateSha);
    if (result.reason === "base-moved") {
      this.event("land-rejected", {
        batchId: f.batchId,
        prs: prNumbers(f.prs),
        sha: f.candidateSha,
        detail: `base moved${result.detail ? `: ${result.detail}` : ""}; recomposing`,
      });
      this.note(`${f.batchId}: base moved, recomposing ${formatPrs(f.prs)}`);
      return this.recompose(f.prs, f.bisect, { checked: true }); // revalidated just above
    }
    if (result.reason === "tree-divergence") return this.onTreeDivergence(f, result);

    const detail = `landing ${f.batchId} failed (${result.reason}): ${result.detail ?? ""}`.trim();
    this.s.paused = {
      reason: "error",
      since: this.now(),
      baseSha: f.baseSha,
      detail,
      issue: null,
    };
    this.s.inFlight = null;
    this.event("error", { batchId: f.batchId, prs: result.merged ?? [], detail });
    this.note(`paused: ${detail}`);
  }

  async afterLanded(f, sha) {
    const { label, protectedApprovalLabel } = this.config;
    this.s.counters.landedPrs += f.prs.length;
    this.s.counters.landedBatches += 1;
    this.event("landed", { batchId: f.batchId, prs: prNumbers(f.prs), sha });
    this.note(`landed ${f.batchId} (${formatPrs(f.prs)}) at ${head12(sha)}`);
    for (const pr of f.prs) {
      await this.removeLabel(pr.n, label);
      await this.removeLabel(pr.n, protectedApprovalLabel);
      await this.comment(
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
    const names = failures.map((run) => run.name).join(", ") || "unknown";
    const signatures = this.m.classify.extractSignatures(
      failures,
      await this.annotationsFor(failures)
    );

    if (f.kind === "base-check") {
      const own = this.m.classify.classifyRed({
        signatures,
        baseSha: f.baseSha,
        baseCheck: null,
        baseRedIssueOpen: false,
        aggregateChecks: this.config.aggregateChecks,
      });
      if (own.kind === "infra") return this.infraPath(f, `base-check infra failure: ${own.detail}`);
      const baseCheck = {
        baseSha: f.baseSha,
        ref: f.candidateRef,
        status: "red",
        startedAt: f.startedAt,
        signatures,
      };
      this.recordBaseCheck(baseCheck);
      this.event("checks-red", {
        batchId: f.batchId,
        sha: f.candidateSha,
        detail: `base-check red: ${names}`,
      });
      this.s.inFlight = null;
      const parked = f.pendingRed;
      if (!parked) return;
      const issue = await this.findBaseRedIssue();
      const verdict = this.m.classify.classifyRed({
        signatures: parked.signatures,
        baseSha: f.baseSha,
        baseCheck,
        baseRedIssueOpen: Boolean(issue),
        aggregateChecks: this.config.aggregateChecks,
      });
      if (verdict.kind === "base-red") {
        return this.pauseBaseRed({ ...parked, baseSha: f.baseSha }, issue, verdict.detail);
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

    this.s.counters.redBatches += 1;
    this.event("checks-red", {
      batchId: f.batchId,
      prs: prNumbers(f.prs),
      sha: f.candidateSha,
      detail: names,
    });
    const issue = await this.findBaseRedIssue();
    const baseCheck =
      this.s.baseChecks.find(
        (b) => b.baseSha === f.baseSha && (b.status === "green" || b.status === "red")
      ) ?? null;
    const verdict = this.m.classify.classifyRed({
      signatures,
      baseSha: f.baseSha,
      baseCheck,
      baseRedIssueOpen: Boolean(issue),
      aggregateChecks: this.config.aggregateChecks,
    });
    this.note(`${f.batchId} red (${names}): ${verdict.kind}`);
    switch (verdict.kind) {
      case "infra":
        return this.infraPath(f, verdict.detail || names);
      case "needs-base-check":
        return this.startBaseCheck(f, signatures);
      case "base-red":
        return this.pauseBaseRed(f, issue, verdict.detail);
      case "pr-red":
        return this.onPrRed({ ...f, failures });
      default:
        throw new Error(`unknown red classification: ${verdict.kind}`);
    }
  }

  /**
   * Start of a retry whose ref a lost tick already pushed: results newer than the failed attempt
   * (GitHub clock, not the runner's) belong to the retry. Falls back to now when none was read.
   */
  retryCutoff() {
    if (this.inFlightObservedMs === null) return this.now();
    return new Date(Math.min(this.inFlightObservedMs + 1, Date.parse(this.now()))).toISOString();
  }

  async infraPath(f, detail) {
    if (f.attempts < this.config.infraRetries) {
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
      this.s.inFlight = { ...f, batchId, candidateRef: ref, attempts, startedAt, stage: "testing" };
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
      },
    };
    this.s.counters.ciRuns += 1;
    this.event("base-check-started", {
      batchId,
      prs: prNumbers(f.prs),
      sha: f.baseSha,
      detail: `${f.batchId} red while a base-red issue is open: testing the bare base`,
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

  /** PR-red verdict for `red` (a batch, a bisection segment or a parked batch). */
  async onPrRed(red) {
    const { prs, bisect, batchId, candidateSha, failures } = red;
    this.s.inFlight = null;
    if (bisect) {
      const advanced = this.m.bisect.advanceBisection(bisect, "red");
      if (advanced.culprit) {
        await this.dequeueCulprit(advanced.culprit, failures, candidateSha, batchId);
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
    if (prs.length === 1) return this.dequeueCulprit(prs[0], failures, candidateSha, batchId);
    const started = this.m.bisect.startBisection(prs, batchId);
    this.s.counters.bisections += 1;
    this.event("bisect-split", {
      batchId,
      prs: prNumbers(prs),
      sha: candidateSha,
      detail: `batch of ${prs.length} red: testing ${formatPrs(started.segments[0])} first`,
    });
    return this.composeSegments(started);
  }

  async dequeueCulprit(pr, failures, candidateSha, batchId) {
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
    const lines = failures.length
      ? failures.map(
          (run) =>
            `  - ${run.htmlUrl ? `[${codeSpan(run.name)}](${run.htmlUrl})` : codeSpan(run.name)}` +
            ` — ${codeSpan(run.conclusion ?? "failed")}`
        )
      : ["  - (no failing check could be read; see the candidate checks)"];
    await this.removeLabel(pr.n, this.config.label);
    await this.comment(
      pr.n,
      `culprit:${head12(pr.head)}`,
      [
        `❌ **omni-queue** isolated this PR as the cause of a red candidate and removed it from the`,
        `queue of \`${this.base}\`.`,
        "",
        `- Head: \`${pr.head}\``,
        `- Candidate: \`${candidateSha}\` (batch \`${batchId}\`) — ${this.checksUrl(candidateSha)}`,
        "- Failed checks:",
        ...lines,
        "",
        `Fix the failure, push, and apply the \`${this.config.label}\` label again to re-queue it.`,
      ].join("\n")
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
      await this.removeLabel(pr.n, this.config.label);
      await this.comment(
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
    await this.removeLabel(pr.n, this.config.label);
    await this.removeLabel(pr.n, this.config.protectedApprovalLabel);
    await this.comment(
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
      for (const action of verdict.actions ?? []) {
        if (action.type === "comment") await this.comment(action.pr, action.key, action.body);
        else if (action.type === "removeLabel") {
          await this.removeLabel(action.pr, action.label ?? label);
        } else throw new Error(`unknown eligibility action: ${action.type}`);
      }
      const dequeued = this.touched.has(pr.number);
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
 * @param {{base: string, action: "tick"|"pause"|"resume"|"dry-run", reason?: string}} options
 *   dry-run = observe and decide, print the plan, perform NO write of any kind.
 * @returns {Promise<{base: string, decisions: string[], state: QueueState}>}
 *   Throws StateConflictError when the final state save loses the CAS race (redo the tick).
 */
export async function runTick(deps, options) {
  const { base, action = "tick", reason } = options ?? {};
  if (!TICK_ACTIONS.includes(action)) throw new Error(`unknown action: ${action}`);
  sanitizeBase(base);
  if (!isManagedBase(deps.config, base)) {
    throw new Error(`base ${base} does not match config.bases (${deps.config.bases})`);
  }
  return new Tick(deps, base, action, reason).run();
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

/** @returns {{base: string|null, action: string, reason: string|null}} */
export function parseArgs(argv) {
  const out = { base: null, action: "tick", reason: null };
  const keys = { "--base": "base", "--action": "action", "--reason": "reason" };
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
  if ((out.action === "pause" || out.action === "resume") && !out.base) {
    throw new Error(`--action ${out.action} requires --base`);
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
  const identity =
    env.OMNI_QUEUE_GIT_NAME && env.OMNI_QUEUE_GIT_EMAIL
      ? { name: env.OMNI_QUEUE_GIT_NAME, email: env.OMNI_QUEUE_GIT_EMAIL }
      : botIdentity(config.appSlug);
  const serverUrl = String(env.GITHUB_SERVER_URL || "https://github.com").replace(/\/+$/, "");
  const repoDir = join(env.RUNNER_TEMP || tmpdir(), "omni-queue", "compose.git");
  mkdirSync(repoDir, { recursive: true });
  const remoteUrl = env.OMNI_QUEUE_REMOTE_URL || `${serverUrl}/${repository}.git`;
  const gitEnv = overrides.gitEnv ?? {};
  return {
    config,
    gh,
    store: createStateStore({ gh, ...(overrides.now ? { now: overrides.now } : {}) }),
    gitFor: (cwd) => createGit({ cwd, token, identity, log, env: gitEnv }),
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
  const redact = (text) => {
    let out = String(text ?? "");
    if (token) out = out.split(token).join("***");
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
          result = await runTick(deps, { base, action: args.action, reason: args.reason });
        } catch (error) {
          if (!(error instanceof StateConflictError) || attempt === 3) throw error;
          log(`omni-queue ${base}: state changed during the tick, redoing it (${attempt}/3)`);
        }
      }
      log(`omni-queue ${base}: ${result.decisions.length} decision(s)`);
      for (const line of result.decisions) log(`  - ${line}`);
    } catch (error) {
      exitCode = 1;
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
