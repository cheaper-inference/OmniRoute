// scripts/merge-queue/eligibility.mjs — WP1 (pure). Plan §3.3: which PRs may enter a batch.
//
// Pure module: no I/O, no network, no clock except ctx.now. Side effects (comments, label
// removals) are returned as `actions` and executed by the tick through gh.commentOnce /
// gh.removeLabel. Approval is bound to the exact head SHA through the commit statuses written
// by approve.mjs (APPROVAL_CONTEXTS) — commit dates are forgeable and never trusted here.

import {
  APPROVAL_CONTEXTS,
  APPROVAL_STATUS_SKEW_SECONDS,
  isProtectedPath,
  sanitizeBase,
} from "./contracts.mjs";
import { isManagedBase } from "./config.mjs";

/**
 * @typedef {import("./contracts.mjs").Action} Action
 * @typedef {import("./contracts.mjs").PrRef} PrRef
 * @typedef {import("./contracts.mjs").QueueState} QueueState
 * @typedef {import("./config.mjs").QueueConfig} QueueConfig
 */

/**
 * @typedef {object} TimelineEvent   normalized by github.listIssueTimeline (oldest first)
 * @property {string} event          "labeled" | "unlabeled" | "head_ref_force_pushed" | ...
 * @property {string|null} actor     login (server-side actor, trusted)
 * @property {string} createdAt      ISO, server time
 * @property {string} [label]        label name for labeled/unlabeled
 * @property {string} [sha]          commit id when the event carries one
 */

/**
 * @typedef {object} CommitStatus    normalized by github.listCommitStatuses (newest first)
 * @property {string} context
 * @property {"success"|"failure"|"error"|"pending"} state
 * @property {string|null} creator   login of the status creator
 * @property {string} description
 * @property {string} createdAt      ISO
 * @property {string|null} targetUrl
 */

/**
 * @typedef {object} PrSnapshot      assembled by the tick for every open PR carrying the label
 * @property {number} number
 * @property {"open"|"closed"} state
 * @property {boolean} draft
 * @property {boolean} merged
 * @property {string} baseRef
 * @property {string} headSha
 * @property {string} title
 * @property {string} author
 * @property {string[]} labels
 * @property {boolean|null} mergeable   GitHub `mergeable` (null = not computed yet)
 * @property {string} mergeableState    GitHub `mergeable_state`
 * @property {string[]} files           changed paths, including previous names of renames
 * @property {boolean} [filesComplete]  false = GitHub listed fewer files than the PR changes
 *                                      (3,000-file cap): treated as a protected surface
 * @property {TimelineEvent[]} timeline
 * @property {CommitStatus[]} headStatuses   statuses on headSha (approval contexts live here)
 * @property {"success"|"failure"|"pending"|null} prGreenCheck  latest config.prGreenCheck on head
 * @property {Object<string, PrCheckState|null>} [prChecks]  prCheckState of every name in
 *                                      config.prChecksRequired on headSha; absent when the
 *                                      snapshot did not read them (revalidate): never blocks then
 */

/** @typedef {"success"|"failure"|"pending"} PrCheckState */

/**
 * @typedef {object} EligibilityContext
 * @property {QueueConfig} config
 * @property {{number: number, title: string, body: string}[]} freezeIssues  open release-freeze issues
 * @property {QueueState|null} state   state of the PR's base (in-flight / shadow bookkeeping)
 * @property {string} now              ISO
 * @property {string} [lane]           reserved: on lane "base-repair" the PR-gate rule
 *                                     (pr-checks-not-green) does not apply; any other value,
 *                                     or none, is ignored
 * @property {number} [batchSize]      selectBatch only: the batch size to fill and to wait for
 *                                     (currentBatchWindow); config.batch.maxSize when absent
 */

/**
 * @typedef {object} Approval
 * @property {boolean} valid
 * @property {string|null} actor       approver who applied the label
 * @property {string|null} labeledAt   ISO of that label event (FIFO key)
 * @property {string|null} reason      INELIGIBLE_REASONS code when invalid
 * @property {string} [detail]         extra context for `reason` (e.g. the label is present but
 *                                     its "labeled" event is missing from the timeline)
 */

/**
 * @typedef {object} Eligibility
 * @property {boolean} eligible
 * @property {{code: string, detail: string}[]} reasons  INELIGIBLE_REASONS codes; [] when eligible
 * @property {Action[]} actions          comment-once / remove-label requests for the tick
 * @property {Approval} approval         queue-label approval (valid when eligible)
 * @property {boolean} protectedSurface  diff touches config.protectedPaths
 */

/** Tolerated clock difference: an approval status may predate its label event by this much. */
const STATUS_BEFORE_LABEL_TOLERANCE_MS = 60 * 1000;

const lower = (v) => String(v ?? "").toLowerCase();
const toMs = (iso) => {
  const ms = Date.parse(String(iso ?? ""));
  return Number.isNaN(ms) ? null : ms;
};
const head12 = (sha) => String(sha ?? "").slice(0, 12);
const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Git ref names may contain "<", ">", "@" and backticks: keep comment-safe characters only. */
const safeRef = (ref) =>
  String(ref ?? "")
    .replace(/[^A-Za-z0-9._/-]/g, "?")
    .slice(0, 120);

/**
 * Protected-path match that also holds for paths with control characters: Git allows "\n" in
 * file names, and the contracts glob does not match across it ("x\ny/AGENTS.md" would escape
 * "**\/AGENTS.md"). Control characters are replaced before matching (fail closed).
 */
function isProtectedFile(path, globs) {
  const clean = String(path ?? "").replace(/[\u0000-\u001f\u007f]/g, "_");
  return isProtectedPath(clean, globs);
}

function hasLabel(labels, name) {
  const want = lower(name);
  return (labels ?? []).some((l) => lower(l) === want);
}

function isApprover(config, login) {
  const who = lower(login);
  return Boolean(who) && config.approvers.some((a) => lower(a) === who);
}

/** True when the description names one of the approvers as a whole word. */
function citesApprover(config, description) {
  const text = String(description ?? "");
  return config.approvers.some((a) =>
    new RegExp(`(?<![A-Za-z0-9-])@?${escapeRegExp(a)}(?![A-Za-z0-9-])`, "i").test(text)
  );
}

/** Newest status of `context` (max createdAt; ties keep the earlier entry of a newest-first list). */
function newestStatus(statuses, context) {
  let best = null;
  let bestMs = -Infinity;
  for (const s of statuses ?? []) {
    if (s?.context !== context) continue;
    const ms = toMs(s.createdAt);
    if (ms === null) continue;
    if (ms > bestMs) {
      best = s;
      bestMs = ms;
    }
  }
  return best;
}

/** Latest `labeled` event for `label` in an oldest-first timeline (by createdAt, then order). */
function lastLabeledEvent(timeline, label) {
  const want = lower(label);
  let best = null;
  let bestMs = -Infinity;
  for (const ev of timeline ?? []) {
    if (ev?.event !== "labeled" || lower(ev.label) !== want) continue;
    const ms = toMs(ev.createdAt);
    if (ms === null) continue;
    if (ms >= bestMs) {
      best = ev;
      bestMs = ms;
    }
  }
  return best;
}

/**
 * Approval of one label kind, bound to the CURRENT head:
 *  - the latest `labeled` timeline event for that label is by an approver, and
 *  - the newest status of APPROVAL_CONTEXTS[kind] on headSha is `success`, created by
 *    `${config.appSlug}[bot]`, cites an approver in its description, and was created no earlier
 *    than 60 s before that label event (clock tolerance).
 * Without such a status: label event older than APPROVAL_STATUS_SKEW_SECONDS →
 * "head-changed-after-label" (the head moved after the label, or the approval was never
 * recorded); younger → "approval-missing" (approve.mjs may still be running).
 * For kind "protected" the codes are the same; evaluateEligibility folds them into
 * "protected-approval-missing".
 * @param {PrSnapshot} pr
 * @param {EligibilityContext} ctx
 * @param {"queue"|"protected"} kind
 * @returns {Approval}
 */
export function approvalFor(pr, ctx, kind) {
  const { config } = ctx;
  const context = APPROVAL_CONTEXTS[kind];
  if (!context) throw new Error(`approvalFor: unknown approval kind ${JSON.stringify(kind)}`);
  const label = kind === "queue" ? config.label : config.protectedApprovalLabel;

  const event = lastLabeledEvent(pr.timeline, label);
  if (!event) {
    // The label is (normally) present but no "labeled" event was found: a truncated timeline or
    // an event the normalizer dropped. Never approve; say why so the tick/dashboard can show it.
    return {
      valid: false,
      actor: null,
      labeledAt: null,
      reason: "approval-missing",
      detail: `label ${label} event not found in timeline`,
    };
  }
  const actor = event.actor ?? null;
  const labeledAt = event.createdAt;
  if (!isApprover(config, actor)) {
    return { valid: false, actor, labeledAt, reason: "label-not-by-approver" };
  }

  const labeledMs = toMs(labeledAt);
  const status = newestStatus(pr.headStatuses, context);
  const bot = lower(`${config.appSlug}[bot]`);
  const statusValid =
    status !== null &&
    status.state === "success" &&
    lower(status.creator) === bot &&
    citesApprover(config, status.description) &&
    toMs(status.createdAt) >= labeledMs - STATUS_BEFORE_LABEL_TOLERANCE_MS;
  if (statusValid) return { valid: true, actor, labeledAt, reason: null };

  const nowMs = toMs(ctx.now);
  const ageSeconds = nowMs === null ? Infinity : (nowMs - labeledMs) / 1000;
  const reason =
    ageSeconds > APPROVAL_STATUS_SKEW_SECONDS ? "head-changed-after-label" : "approval-missing";
  return { valid: false, actor, labeledAt, reason };
}

const BRANCH_TOKEN_RE = /(?<![A-Za-z0-9._-])release\/v[A-Za-z0-9._-]*/g;
const TITLE_VERSION_RE = /(?<![A-Za-z0-9._/-])v(\d+\.\d+\.\d+)(?![A-Za-z0-9_-]|\.[A-Za-z0-9])/g;
const MERGE_INTO_RE = /\bmerge\b[^.\n]*?\binto\s+[`'"]?(release\/v[A-Za-z0-9._-]*)/i;

/** "release/v3.8.54." (sentence punctuation) → "release/v3.8.54". */
const trimToken = (t) => String(t).replace(/\.+$/, "");

/**
 * Branches an open release-freeze issue freezes. The /generate-release template is
 * title "🔒 release-freeze: vX.Y.Z in progress" and body "do NOT merge campaign PRs into
 * release/vX.Y.Z (...). Development continues on release/vX.Y.Z+1 ...", so the body also names
 * the branch that stays OPEN. Order of trust:
 *  1. the title: every "release/v…" branch it names, else every "vX.Y.Z" version in it
 *     (→ "release/vX.Y.Z");
 *  2. only when the title names nothing: the branch of the body's "merge … into <branch>"
 *     sentence, else the FIRST branch the body mentions (never every mention).
 * An empty list means the issue names no branch at all (see isBaseFrozen: fail closed).
 * @param {{title: string, body: string}} issue
 * @returns {string[]}
 */
export function frozenBranches(issue) {
  const title = String(issue?.title ?? "");
  const body = String(issue?.body ?? "");
  const fromTitle = [...title.matchAll(BRANCH_TOKEN_RE)].map((m) => trimToken(m[0]));
  if (fromTitle.length) return [...new Set(fromTitle)];
  const versions = [...title.matchAll(TITLE_VERSION_RE)].map((m) => `release/v${m[1]}`);
  if (versions.length) return [...new Set(versions)];
  const into = MERGE_INTO_RE.exec(body);
  if (into) return [trimToken(into[1])];
  const first = body.match(BRANCH_TOKEN_RE);
  return first ? [trimToken(first[0])] : [];
}

/**
 * True when an OPEN release-freeze issue freezes `base` (exact name; "release/v3.8.5" never
 * matches "release/v3.8.54", nor "release/v3.8.54x"). The frozen branch comes from the title
 * first and only falls back to the body when the title names none (frozenBranches), so a body
 * that says where development CONTINUES never freezes that branch. Fail closed: an open freeze
 * issue that names no branch or version at all freezes every base.
 * @param {string} base
 * @param {{title: string, body: string}[]} freezeIssues
 */
export function isBaseFrozen(base, freezeIssues) {
  const name = String(base ?? "");
  if (!name) return false;
  return (freezeIssues ?? []).some((issue) => {
    const branches = frozenBranches(issue);
    return branches.length === 0 || branches.includes(name);
  });
}

/** Conclusions of a completed check run that make a required PR gate red (see prCheckState). */
const GATE_RED_CONCLUSIONS = new Set([
  "failure",
  "cancelled",
  "timed_out",
  "action_required",
  "startup_failure",
  "stale",
  "skipped",
  "neutral",
]);
const GATE_RANK = { success: 0, pending: 1, failure: 2 };

/** The newest run named `name` of each check suite (a run without a suite id on its own). */
function newestGateRunBySuite(runs, name) {
  const newestBySuite = new Map();
  for (const run of runs ?? []) {
    if (run?.name !== name) continue;
    const suite = run.checkSuiteId ?? `run:${run.id}`;
    const seen = newestBySuite.get(suite);
    if (!seen || run.id > seen.id) newestBySuite.set(suite, run);
  }
  return newestBySuite;
}

/** What one gate run says: "pending", "success", "failure", or null (another app's success). */
function gateRunState(run) {
  if (run.status !== "completed") return "pending";
  if (run.conclusion === "success") return run.appSlug === "github-actions" ? "success" : null;
  return "failure";
}

/**
 * State of the PR-level check `name` (config.prChecksRequired) from the check runs of a PR head
 * (github.listCheckRuns):
 *  - only runs named exactly `name` count, and of each check suite only its newest run (highest
 *    id): a re-run of failed jobs stays in its suite and supersedes the attempt before it. A run
 *    without a suite id counts on its own (fail closed: nothing supersedes it);
 *  - with `suiteIsCurrent` (currentSuitePredicate), only the suites it calls current count: a
 *    suite of an older workflow run of a workflow that ran again on the same head (a run
 *    cancelled by a retarget, whose `if: always()` gate still concluded) no longer counts. A run
 *    without a suite id always counts. Without it every suite is current;
 *  - a run not `completed` yet → "pending";
 *  - a run completed `success` → "success" only when GitHub Actions reported it (appSlug
 *    "github-actions"); a success from any other app is ignored: it makes the gate neither green
 *    nor red;
 *  - any other completed conclusion → "failure": `failure`, `cancelled`, `timed_out`,
 *    `action_required`, `startup_failure`, `stale`, and also `skipped`, `neutral` or none at all.
 *    A skipped or neutral gate vouched for nothing, so it is never a success for a required gate.
 * The result is the worst of the runs that count (failure > pending > success), so a job of the
 * same name in another current suite (another workflow, another app) cannot hide a red gate; null
 * when no run counts (no run of that name, or only another app's successes).
 * @param {import("./checks.mjs").CheckRun[]} runs
 * @param {string} name
 * @param {(suiteId: number) => boolean} [suiteIsCurrent]
 * @returns {PrCheckState|null}
 */
export function prCheckState(runs, name, suiteIsCurrent) {
  let worst = null;
  for (const run of newestGateRunBySuite(runs, name).values()) {
    if (suiteIsCurrent && run.checkSuiteId != null && !suiteIsCurrent(run.checkSuiteId)) continue;
    const state = gateRunState(run);
    if (state === null) continue;
    if (worst === null || GATE_RANK[state] > GATE_RANK[worst]) worst = state;
  }
  return worst;
}

/**
 * True when prCheckState of some gate of `names` could depend on which suites are current: two
 * or more check suites carry a run of that name and their newest runs do not all say the same
 * thing (pending, success, failure, or another app's success). Only then does the tick list the
 * head's workflow runs to build currentSuitePredicate; otherwise every suite is current.
 * @param {import("./checks.mjs").CheckRun[]} runs
 * @param {string[]} names
 */
export function prChecksNeedWorkflowRuns(runs, names) {
  return (names ?? []).some((name) => {
    const newest = [...newestGateRunBySuite(runs, name).values()];
    return newest.length >= 2 && new Set(newest.map(gateRunState)).size > 1;
  });
}

/**
 * suiteIsCurrent for prCheckState, from the workflow runs of one head (github.listWorkflowRuns
 * with headSha). The runs are grouped by (workflowId, event): a run supersedes only a run of the
 * same workflow AND the same event, as cancellation happens inside one concurrency group
 * (`${{ github.workflow }}-${{ github.ref }}`), and a `pull_request` run and a
 * `workflow_dispatch` run of the same workflow on the same head never cancel each other. In each
 * group only the run with the highest id is current, and so is its check suite; the suite of an
 * older run of the group is not. A run whose event is missing or empty is a group of its own: it
 * supersedes nothing and nothing supersedes it. A suite that maps to no listed run with a
 * workflow id (another app's suite, or one the listing did not show) is current: what is unknown
 * never turns a gate green.
 * Known limit, not handled: two PRs that share one head SHA share their `pull_request` runs'
 * group, so the newest `pull_request` run of either supersedes the other's.
 * @param {{id: number, workflowId: number|null, checkSuiteId: number|null,
 *          event?: string|null}[]} workflowRuns
 * @returns {(suiteId: number) => boolean}
 */
export function currentSuitePredicate(workflowRuns) {
  const newestByGroup = new Map();
  const known = new Set();
  const current = new Set();
  for (const run of workflowRuns ?? []) {
    if (run?.workflowId == null || run.checkSuiteId == null) continue;
    known.add(run.checkSuiteId);
    if (typeof run.event !== "string" || !run.event) {
      current.add(run.checkSuiteId); // a group of its own
      continue;
    }
    const group = JSON.stringify([run.workflowId, run.event]);
    const seen = newestByGroup.get(group);
    if (!seen || run.id > seen.id) newestByGroup.set(group, run);
  }
  for (const run of newestByGroup.values()) current.add(run.checkSuiteId);
  return (suiteId) => !known.has(suiteId) || current.has(suiteId);
}

/**
 * The batch size the next root batch fills (ctx.batchSize of selectBatch). Without
 * config.batch.adaptive it is config.batch.maxSize. With it, the window stored in
 * state.batchWindow, or config.batch.startSize (default maxSize) when the state has none (a new
 * state, or one written before the window existed: a loaded state's batchWindow, when present, is
 * a positive integer, as contracts.validateState checks); always clamped to [minSize, maxSize], so
 * a window stored before the config was lowered never exceeds the new maxSize.
 * @param {QueueConfig} config
 * @param {QueueState|null} state
 * @returns {number}
 */
export function currentBatchWindow(config, state) {
  const { maxSize, minSize } = config.batch;
  if (!config.batch.adaptive) return maxSize;
  const stored = state?.batchWindow;
  const start = config.batch.startSize ?? maxSize;
  const window = Number.isSafeInteger(stored) && stored >= 1 ? stored : start;
  return Math.min(maxSize, Math.max(minSize ?? 1, window));
}

/**
 * The pr-checks-not-green reason of `pr`, or null: a gate of config.prChecksRequired whose state
 * in pr.prChecks is not "success" ("failure", "pending", or missing). Only applies when the
 * snapshot read the gates (pr.prChecks present: revalidate does not read them) and never on
 * ctx.lane "base-repair". The detail names each gate and its state (`Gate / CI failure; Gate /
 * Quality missing`); gate names come from the trusted config.
 * @param {PrSnapshot} pr
 * @param {EligibilityContext} ctx
 * @returns {{code: "pr-checks-not-green", detail: string}|null}
 */
export function prGatesReason(pr, ctx) {
  const gates = ctx.config.prChecksRequired ?? [];
  if (pr.prChecks === undefined || !gates.length || ctx.lane === "base-repair") return null;
  const notGreen = gates
    .map((name) => ({ name, state: pr.prChecks?.[name] ?? null }))
    .filter(({ state }) => state !== "success");
  if (!notGreen.length) return null;
  return {
    code: "pr-checks-not-green",
    detail: notGreen.map(({ name, state }) => `${name} ${state ?? "missing"}`).join("; "),
  };
}

function prInFlight(state, n) {
  const f = state?.inFlight;
  if (!f) return false;
  const has = (list) => Array.isArray(list) && list.some((p) => p?.n === n);
  if (has(f.prs)) return true;
  if (Array.isArray(f.bisect?.segments) && f.bisect.segments.some((seg) => has(seg))) return true;
  return has(f.pendingRed?.prs);
}

/**
 * All §3.3 rules. Never performs I/O; returns the side effects as `actions`:
 *  - label by a non-approver → comment once (key "not-approver"), label kept, ineligible;
 *  - head changed after the label → comment + removeLabel;
 *  - conflicting (mergeable === false) → comment + removeLabel;
 *  - approval/protected approval missing on the current head → comment once (key includes head12);
 *  - a gate of config.prChecksRequired not green on the head (pr.prChecks) → pr-checks-not-green,
 *    no action at all (label kept, no comment): the PR waits until its gates turn green. Only
 *    applies when the snapshot read them (pr.prChecks present) and never on ctx.lane
 *    "base-repair".
 * Actions are only emitted for an open PR that carries the queue label and is NOT in flight:
 * a closed PR needs nothing, an unlabeled one is not ours to comment on, and an in-flight PR
 * is owned by the tick (removing its label mid-run would race the candidate).
 * @param {PrSnapshot} pr
 * @param {EligibilityContext} ctx
 * @returns {Eligibility}
 */
export function evaluateEligibility(pr, ctx) {
  const { config } = ctx;
  const n = pr.number;
  const h12 = head12(pr.headSha);
  /** @type {{code: string, detail: string}[]} */
  const reasons = [];
  /** @type {Action[]} */
  const actions = [];
  const reason = (code, detail) => reasons.push({ code, detail });
  const manifestIncomplete = pr.filesComplete === false;
  const protectedSurface =
    manifestIncomplete || (pr.files ?? []).some((f) => isProtectedFile(f, config.protectedPaths));
  /** @type {Approval} */
  let approval = { valid: false, actor: null, labeledAt: null, reason: "no-label" };

  if (pr.state !== "open" || pr.merged) {
    reason("not-open", pr.merged ? "PR is already merged" : "PR is closed");
    return { eligible: false, reasons, actions, approval, protectedSurface };
  }

  const labeled = hasLabel(pr.labels, config.label);
  const inFlight = prInFlight(ctx.state, n);
  const canAct = labeled && !inFlight;
  const act = (a) => {
    if (canAct) actions.push(a);
  };
  const comment = (key, body) => act({ type: "comment", pr: n, key, body });
  const removeQueueLabel = () => act({ type: "removeLabel", pr: n, label: config.label });

  if (pr.draft) reason("draft", "PR is a draft");

  const managed = isManagedBase(config, pr.baseRef);
  if (!managed) {
    reason("base-mismatch", `base ${safeRef(pr.baseRef)} does not match ${config.bases}`);
    comment(
      "base-mismatch",
      `omni-queue only manages bases matching \`${config.bases}\`; this PR targets ` +
        `\`${safeRef(pr.baseRef)}\`. Retarget it to the active release branch to queue it.`
    );
  }

  if (!labeled) reason("no-label", `label ${config.label} is not applied`);

  const blocked = (pr.labels ?? []).filter((l) => hasLabel(config.blockLabels, l));
  if (blocked.length) reason("blocked-label", `blocking label(s): ${blocked.join(", ")}`);

  if (managed && isBaseFrozen(pr.baseRef, ctx.freezeIssues)) {
    const issues = (ctx.freezeIssues ?? [])
      .filter((i) => isBaseFrozen(pr.baseRef, [i]))
      .map((i) => `#${i.number}`);
    reason("base-frozen", `release-freeze open for ${safeRef(pr.baseRef)} (${issues.join(", ")})`);
    let key = null;
    try {
      key = `frozen:${sanitizeBase(pr.baseRef)}`;
    } catch {
      key = null;
    }
    if (key) {
      comment(
        key,
        `\`${safeRef(pr.baseRef)}\` is frozen for release (${issues.join(", ")}). omni-queue will not ` +
          `merge into it; retarget this PR to the next release branch to keep it queued.`
      );
    }
  }

  if (inFlight) reason("in-flight", "PR is part of the candidate under test");

  if (labeled) {
    approval = approvalFor(pr, ctx, "queue");
    if (approval.reason === "label-not-by-approver") {
      reason(
        "label-not-by-approver",
        `label ${config.label} applied by ${approval.actor ?? "unknown"}`
      );
      comment(
        "not-approver",
        `The \`${config.label}\` label only counts when a maintainer applies it ` +
          `(applied by @${approval.actor ?? "unknown"}). This PR is not queued.`
      );
    } else if (approval.reason === "head-changed-after-label") {
      reason("head-changed-after-label", `no approval recorded for head ${h12}`);
      comment(
        `head-changed:${h12}`,
        `The head of this PR (${h12}) has no omni-queue approval: it changed after the ` +
          `\`${config.label}\` label (or the approval was not recorded). The label was removed; ` +
          `a maintainer must apply it again to queue the current head.`
      );
      removeQueueLabel();
    } else if (approval.reason === "approval-missing") {
      reason(
        "approval-missing",
        approval.detail ?? `approval status for head ${h12} not recorded yet`
      );
    }
  }

  if (protectedSurface && labeled) {
    // File paths are chosen by the PR author (markdown/mention/marker injection): report only
    // the count and the matching globs, which come from the trusted config.
    const count = (pr.files ?? []).filter((f) => isProtectedFile(f, config.protectedPaths)).length;
    const globs = config.protectedPaths.filter((g) =>
      (pr.files ?? []).some((f) => isProtectedFile(f, [g]))
    );
    const parts = count
      ? [`${count} file(s) matching ${globs.map((g) => `\`${g}\``).join(", ")}`]
      : [];
    if (manifestIncomplete) parts.push("file list incomplete: GitHub did not list every file");
    const surface = parts.join("; ");
    const hasProtected = hasLabel(pr.labels, config.protectedApprovalLabel);
    const prot = hasProtected ? approvalFor(pr, ctx, "protected") : null;
    if (!prot?.valid) {
      const why = hasProtected ? (prot.detail ?? prot.reason) : "label absent";
      reason(
        "protected-approval-missing",
        `protected surface (${surface}): ${config.protectedApprovalLabel} ${why}`
      );
      // While approve.mjs may still be recording a fresh protected label, stay silent.
      if (prot?.reason !== "approval-missing") {
        const lead = count
          ? `This PR changes protected surfaces (${surface}). `
          : "GitHub did not list every changed file of this PR, so omni-queue cannot rule out " +
            "protected surfaces. ";
        comment(
          `protected:${h12}`,
          lead +
            `A maintainer must also apply \`${config.protectedApprovalLabel}\` to the current ` +
            `head (${h12}) before omni-queue can merge it.`
        );
      }
    }
  }

  if (pr.mergeable === false || pr.mergeableState === "dirty") {
    reason("conflicting", `PR conflicts with ${pr.baseRef}`);
    comment(
      `conflict:${h12}`,
      `This PR conflicts with \`${pr.baseRef}\`, so it was removed from omni-queue. Resolve the ` +
        `conflict and ask a maintainer to apply \`${config.label}\` again.`
    );
    removeQueueLabel();
  }

  const gatesNotGreen = prGatesReason(pr, ctx);
  if (gatesNotGreen) reason(gatesNotGreen.code, gatesNotGreen.detail);

  if (config.mode === "shadow" && ctx.state?.shadow?.processed?.[String(n)] === pr.headSha) {
    reason("shadow-processed", `head ${h12} already processed in shadow mode`);
  }

  return { eligible: reasons.length === 0, reasons, actions, approval, protectedSurface };
}

const GREEN_RANK = { success: 0, pending: 1, failure: 2 };

/**
 * Pick the next batch. Order: FIFO by approval.labeledAt (ties by PR number); with
 * config.preferGreenPrChecks, PRs whose prGreenCheck is "success" come first, then
 * null/pending, then "failure" (FIFO inside each group). The batch size is ctx.batchSize (the
 * adaptive window, currentBatchWindow) or config.batch.maxSize when the context has none: it
 * takes at most that many, and waits (waiting=true, batch=[]) while fewer than that many are
 * eligible AND the oldest approval is younger than batch.maxWaitMinutes; never returns fewer than
 * batch.minSize.
 * @param {{pr: PrSnapshot, eligibility: Eligibility}[]} candidates   eligible ones only
 * @param {EligibilityContext} ctx
 * @returns {{batch: PrRef[], waiting: boolean, reason: string}}
 */
export function selectBatch(candidates, ctx) {
  const { config } = ctx;
  const { maxSize, minSize, maxWaitMinutes } = config.batch;
  const size = Number.isSafeInteger(ctx.batchSize) && ctx.batchSize >= 1 ? ctx.batchSize : maxSize;
  const pool = (candidates ?? []).filter(
    (c) => c?.eligibility?.eligible && toMs(c.eligibility.approval?.labeledAt) !== null
  );
  if (pool.length === 0) return { batch: [], waiting: false, reason: "no eligible PR" };

  const fifo = [...pool].sort(
    (a, b) =>
      toMs(a.eligibility.approval.labeledAt) - toMs(b.eligibility.approval.labeledAt) ||
      a.pr.number - b.pr.number
  );
  const ordered = config.preferGreenPrChecks
    ? [...fifo].sort(
        (a, b) => (GREEN_RANK[a.pr.prGreenCheck] ?? 1) - (GREEN_RANK[b.pr.prGreenCheck] ?? 1)
      )
    : fifo;

  if (pool.length < minSize) {
    return {
      batch: [],
      waiting: true,
      reason: `${pool.length} eligible PR(s), below batch.minSize ${minSize}`,
    };
  }
  if (pool.length < size) {
    const oldestMs = toMs(fifo[0].eligibility.approval.labeledAt);
    const nowMs = toMs(ctx.now);
    const waitedMinutes = nowMs === null ? Infinity : (nowMs - oldestMs) / 60000;
    if (waitedMinutes < maxWaitMinutes) {
      return {
        batch: [],
        waiting: true,
        reason:
          `${pool.length}/${size} eligible; oldest approval waited ` +
          `${Math.max(0, Math.floor(waitedMinutes))} of ${maxWaitMinutes} min`,
      };
    }
  }

  const batch = ordered.slice(0, size).map(({ pr, eligibility }) => ({
    n: pr.number,
    head: pr.headSha,
    title: pr.title,
    author: pr.author,
    labeledAt: eligibility.approval.labeledAt,
  }));
  return {
    batch,
    waiting: false,
    reason:
      pool.length > size
        ? `${batch.length} of ${pool.length} eligible (${
            size === maxSize ? `batch.maxSize ${maxSize}` : `batch window ${size}`
          })`
        : `${batch.length} eligible`,
  };
}
