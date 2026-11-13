// scripts/merge-queue/contracts.mjs — shared contracts of omni-queue, the OmniRoute merge queue.
//
// Every module under scripts/merge-queue/ agrees on the names, shapes and formats defined here.
// ZERO runtime dependencies (node built-ins only): the orchestrator runs inside
// .github/workflows/omni-queue.yml next to a GitHub App token with `contents: write`, and that
// job must never run `npm ci` (no third-party install scripts beside the token). Zod validation
// of the same shapes lives in the tests (tests/unit/merge-queue/), not at runtime.
//
// Changing anything exported here is a cross-WP contract change: only the lead edits this file.

/** Version of the persisted state document and of the config file. */
export const SCHEMA_VERSION = 1;

/**
 * Branch holding the queue state (`state/<sanitized-base>.json`, one file per base).
 * Deliberately OUTSIDE the `omni-queue/**` glob that triggers ci.yml/quality.yml: a state write
 * must never start the full CI matrix. No workflow in the repository triggers on this name.
 */
export const STATE_BRANCH = "omni-queue-state";

/** Prefix of every candidate branch; ci.yml/quality.yml run their full profile on `omni-queue/**`. */
export const CANDIDATE_PREFIX = "omni-queue/";

export const DASHBOARD_LABEL = "omni-queue-dashboard";
export const DASHBOARD_TITLE_PREFIX = "🚦 omni-queue: ";
export const BASE_RED_LABEL = "base-red";
export const BASE_RED_TITLE_PREFIX = "🔴 Release branch not green: ";
export const FREEZE_LABEL = "release-freeze";

/** Number of history events kept in the state document (oldest dropped first). */
export const HISTORY_LIMIT = 200;
/** Base-check results kept in the state document (most recent first). */
export const BASE_CHECK_LIMIT = 10;

/**
 * Commit-status contexts that bind an approval to the EXACT head SHA. `approve.mjs` writes them
 * (App token) when an approver applies the label; a new push creates a new SHA without the
 * status, so "label applied after the last push" holds without trusting forgeable commit dates.
 * A label removal writes `failure` on the same context (approval withdrawn).
 */
export const APPROVAL_CONTEXTS = Object.freeze({
  queue: "omni-queue/approval",
  protected: "omni-queue/protected-approval",
});

/** Max seconds between the label event and the approval status written in response to it. */
export const APPROVAL_STATUS_SKEW_SECONDS = 600;

/** Kinds of work a candidate ref can carry. */
export const CANDIDATE_KINDS = Object.freeze(["batch", "base-check"]);

/** Stages of the in-flight candidate. `landing` = verdict green, landing not yet confirmed. */
export const STAGES = Object.freeze(["testing", "landing"]);

/** Why the queue of a base is paused. */
export const PAUSE_REASONS = Object.freeze([
  "manual",
  "base-red",
  "infra",
  "tree-divergence",
  "error",
]);

/** History event types (`state.history[].type`). */
export const EVENT_TYPES = Object.freeze([
  "batch-started", // candidate composed and pushed (detail: included/excluded PRs)
  "pr-skipped-conflict", // conflicts inside the batch only; stays queued
  "pr-dequeued", // removed from the queue (label removed + comment); detail = reason code
  "checks-green",
  "checks-red",
  "checks-timeout",
  "landed", // merge-ff push or squash-api sequence succeeded
  "would-land", // shadow mode: green candidate that was NOT landed
  "land-rejected", // base moved (fast-forward push refused) → recompose
  "bisect-split",
  "culprit-found",
  "base-check-started",
  "base-red-paused",
  "infra-retry",
  "infra-paused",
  "paused",
  "resumed",
  "tree-divergence",
  "error",
]);

/** Reason codes returned by eligibility (`eligibility.mjs`). */
export const INELIGIBLE_REASONS = Object.freeze([
  "not-open",
  "draft",
  "base-mismatch", // base does not match config.bases
  "no-label",
  "blocked-label",
  "base-frozen", // open release-freeze issue citing the base (Hard Rule #21)
  "label-not-by-approver",
  "approval-missing", // label by an approver but no valid approval status on the current head
  "head-changed-after-label", // approval status exists for an older head only
  "protected-approval-missing",
  "conflicting",
  "shadow-processed", // shadow mode already validated this exact head
  "in-flight",
]);

/** Action types that pure modules ask the tick to execute. */
export const ACTION_TYPES = Object.freeze(["comment", "removeLabel"]);

/** Classifications of a red candidate (`classify.mjs`). */
export const RED_KINDS = Object.freeze(["infra", "base-red", "pr-red", "needs-base-check"]);

/** Trailer keys written into every queue merge commit (see buildMergeMessage). */
export const TRAILERS = Object.freeze({
  pr: "Omni-Queue-PR",
  head: "Omni-Queue-Head",
  author: "Omni-Queue-Author",
  base: "Omni-Queue-Base",
  target: "Omni-Queue-Target",
  batch: "Omni-Queue-Batch",
});

const SHA_RE = /^[0-9a-f]{40}$/;
const SAFE_SEGMENT_RE = /^[A-Za-z0-9._-]+$/;

/**
 * @typedef {object} PrRef  A PR as recorded in the state (the exact head that was approved).
 * @property {number} n           PR number
 * @property {string} head        40-hex head SHA that was approved and composed
 * @property {string} title       PR title (sanitized with sanitizeTitle before any git use)
 * @property {string} author      PR author login
 * @property {string} labeledAt   ISO time of the approving label event (FIFO key)
 */

/**
 * @typedef {object} BisectState
 * @property {string} rootBatchId   batch that first went red
 * @property {PrRef[][]} segments   pending segments in order; segments[0] is the one under test
 * @property {PrRef[]} culprits     PRs isolated as culprits (already dequeued)
 * @property {number[]} landed      PR numbers landed (or would-land in shadow) during this bisection
 * @property {number} steps         candidate runs spent on this bisection
 */

/**
 * @typedef {object} InFlight
 * @property {string} batchId        e.g. "b42" (state.counters.batchSeq) or "basecheck-<sha12>"
 * @property {"batch"|"base-check"} kind
 * @property {string} candidateRef   full branch name (candidateRef()/baseCheckRef()), e.g.
 *                                   omni-queue/release-v3.8.54/b42-0123456789ab
 * @property {string} candidateSha
 * @property {string} baseSha        base tip the candidate was composed on
 * @property {string|null} treeSha   tree of the candidate commit (squash-api divergence guard)
 * @property {PrRef[]} prs           PRs composed into this candidate, in merge order ([] for base-check)
 * @property {"testing"|"landing"} stage
 * @property {string} startedAt      ISO
 * @property {number} attempts       infra retries already spent on this candidate
 * @property {BisectState|null} bisect
 * @property {PendingRed|null} [pendingRed]  kind "base-check" only: the red batch waiting for the
 *                                   verdict of the bare-base run (absent/null otherwise)
 */

/**
 * @typedef {object} PendingRed  A red batch parked while its base is checked (classify →
 *   "needs-base-check"). After the base-check: green → the batch is PR-red (bisect / culprit);
 *   red with matching signatures → base-red pause; red otherwise → PR-red.
 * @property {string} batchId
 * @property {string} candidateSha
 * @property {PrRef[]} prs
 * @property {FailureSignature[]} signatures
 * @property {BisectState|null} bisect   bisection the red candidate belonged to, if any
 */

/**
 * @typedef {object} PauseInfo
 * @property {"manual"|"base-red"|"infra"|"tree-divergence"|"error"} reason
 * @property {string} since     ISO
 * @property {string|null} baseSha  base tip when paused (base-red auto-resumes when it moves)
 * @property {string} detail
 * @property {number|null} issue    related issue number (base-red / divergence), if any
 */

/**
 * @typedef {object} FailureSignature  One failing check, normalized for base-red comparison.
 * @property {string} check   check-run name (e.g. "Unit Tests (3/8)")
 * @property {string} key     normalized failing test/gate identifier, "" when unknown
 * @property {boolean} infra  positive evidence of an infrastructure failure
 */

/**
 * @typedef {object} BaseCheck  Result of a CI run on the bare base SHA (same profile).
 * @property {string} baseSha
 * @property {string} ref
 * @property {"pending"|"green"|"red"|"timeout"} status
 * @property {string} startedAt
 * @property {FailureSignature[]} signatures
 */

/**
 * @typedef {object} HistoryEvent
 * @property {string} at        ISO
 * @property {string} type      one of EVENT_TYPES
 * @property {string} [batchId]
 * @property {number[]} [prs]
 * @property {string} [sha]
 * @property {string} [detail]
 * @property {string} [url]     run / issue / PR link
 */

/**
 * @typedef {object} QueueState  Persisted as state/<sanitized-base>.json on STATE_BRANCH.
 * @property {number} version            SCHEMA_VERSION
 * @property {string} base               e.g. "release/v3.8.54"
 * @property {PauseInfo|null} paused
 * @property {InFlight|null} inFlight
 * @property {BaseCheck[]} baseChecks    most recent first, at most BASE_CHECK_LIMIT
 * @property {{processed: Object<string, string>}} shadow  PR number (string) → head SHA already
 *                                       validated in shadow mode (skip until the head changes)
 * @property {{batchSeq: number, ciRuns: number, landedPrs: number, landedBatches: number,
 *             redBatches: number, bisections: number, culprits: number}} counters
 * @property {HistoryEvent[]} history    oldest first, at most HISTORY_LIMIT
 * @property {string} updatedAt          ISO
 */

/**
 * @typedef {object} Action  Side effect requested by a pure module, executed by the tick.
 * @property {"comment"|"removeLabel"} type
 * @property {number} pr
 * @property {string} [key]    comment dedupe key (see commentMarker); comment once per key
 * @property {string} [body]   comment markdown (the marker is appended by the executor)
 * @property {string} [label]  label to remove
 */

/** @returns {QueueState} */
export function initialState(base, now = new Date().toISOString()) {
  return {
    version: SCHEMA_VERSION,
    base,
    paused: null,
    inFlight: null,
    baseChecks: [],
    shadow: { processed: {} },
    counters: {
      batchSeq: 0,
      ciRuns: 0,
      landedPrs: 0,
      landedBatches: 0,
      redBatches: 0,
      bisections: 0,
      culprits: 0,
    },
    history: [],
    updatedAt: now,
  };
}

/**
 * Append one event, keeping the newest `limit`. Returns a NEW state object (input untouched).
 * @param {QueueState} state
 * @param {HistoryEvent} event
 */
export function appendEvent(state, event, limit = HISTORY_LIMIT) {
  if (!EVENT_TYPES.includes(event?.type)) throw new Error(`unknown event type: ${event?.type}`);
  const history = [...state.history, event];
  return { ...state, history: history.slice(Math.max(0, history.length - limit)) };
}

const isRecord = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const isIso = (v) => typeof v === "string" && !Number.isNaN(Date.parse(v));
const isCount = (v) => Number.isSafeInteger(v) && v >= 0;

function prRefErrors(pr, where) {
  const errors = [];
  if (!isRecord(pr)) return [`${where}: not an object`];
  if (!Number.isSafeInteger(pr.n) || pr.n <= 0) errors.push(`${where}.n`);
  if (!SHA_RE.test(pr.head ?? "")) errors.push(`${where}.head`);
  if (typeof pr.title !== "string") errors.push(`${where}.title`);
  if (typeof pr.author !== "string" || !pr.author) errors.push(`${where}.author`);
  if (!isIso(pr.labeledAt)) errors.push(`${where}.labeledAt`);
  return errors;
}

/**
 * Structural validation of a state document read from STATE_BRANCH.
 * @returns {string[]} errors (empty = valid)
 */
export function validateState(state) {
  const errors = [];
  if (!isRecord(state)) return ["state: not an object"];
  if (state.version !== SCHEMA_VERSION) errors.push("version");
  if (typeof state.base !== "string" || !state.base) errors.push("base");
  if (state.paused !== null) {
    const p = state.paused;
    if (!isRecord(p) || !PAUSE_REASONS.includes(p.reason) || !isIso(p.since)) {
      errors.push("paused");
    } else if (typeof p.detail !== "string") errors.push("paused.detail");
  }
  if (state.inFlight !== null) {
    const f = state.inFlight;
    if (!isRecord(f)) errors.push("inFlight");
    else {
      if (typeof f.batchId !== "string" || !SAFE_SEGMENT_RE.test(f.batchId))
        errors.push("inFlight.batchId");
      if (!CANDIDATE_KINDS.includes(f.kind)) errors.push("inFlight.kind");
      if (typeof f.candidateRef !== "string" || !f.candidateRef.startsWith(CANDIDATE_PREFIX))
        errors.push("inFlight.candidateRef");
      if (!SHA_RE.test(f.candidateSha ?? "")) errors.push("inFlight.candidateSha");
      if (!SHA_RE.test(f.baseSha ?? "")) errors.push("inFlight.baseSha");
      if (f.treeSha !== null && !SHA_RE.test(f.treeSha ?? "")) errors.push("inFlight.treeSha");
      if (!Array.isArray(f.prs)) errors.push("inFlight.prs");
      else f.prs.forEach((pr, i) => errors.push(...prRefErrors(pr, `inFlight.prs[${i}]`)));
      if (!STAGES.includes(f.stage)) errors.push("inFlight.stage");
      if (!isIso(f.startedAt)) errors.push("inFlight.startedAt");
      if (!isCount(f.attempts)) errors.push("inFlight.attempts");
      if (f.bisect !== null) {
        const b = f.bisect;
        if (!isRecord(b) || !Array.isArray(b.segments) || !Array.isArray(b.culprits)) {
          errors.push("inFlight.bisect");
        } else {
          b.segments.forEach((seg, i) =>
            Array.isArray(seg)
              ? seg.forEach((pr, j) =>
                  errors.push(...prRefErrors(pr, `inFlight.bisect.segments[${i}][${j}]`))
                )
              : errors.push(`inFlight.bisect.segments[${i}]`)
          );
          if (!Array.isArray(b.landed)) errors.push("inFlight.bisect.landed");
          if (!isCount(b.steps)) errors.push("inFlight.bisect.steps");
        }
      }
    }
  }
  if (!Array.isArray(state.baseChecks)) errors.push("baseChecks");
  if (!isRecord(state.shadow) || !isRecord(state.shadow.processed)) errors.push("shadow");
  const c = state.counters;
  const counterKeys = [
    "batchSeq",
    "ciRuns",
    "landedPrs",
    "landedBatches",
    "redBatches",
    "bisections",
    "culprits",
  ];
  if (!isRecord(c) || counterKeys.some((k) => !isCount(c[k]))) errors.push("counters");
  if (!Array.isArray(state.history)) errors.push("history");
  else if (state.history.some((e) => !isRecord(e) || !EVENT_TYPES.includes(e.type) || !isIso(e.at)))
    errors.push("history[]");
  if (!isIso(state.updatedAt)) errors.push("updatedAt");
  return errors;
}

// ───────────────────────────── naming ─────────────────────────────

/** "release/v3.8.54" → "release-v3.8.54". Throws on anything unsafe for a ref segment. */
export function sanitizeBase(base) {
  const out = String(base ?? "").replaceAll("/", "-");
  if (!out || !SAFE_SEGMENT_RE.test(out) || out.startsWith(".") || out.includes(".."))
    throw new Error(`unsafe base branch name: ${JSON.stringify(base)}`);
  return out;
}

/**
 * Candidate branch for a batch: omni-queue/<sanitized-base>/<batchId>-<sha12>. The SHA suffix
 * makes every distinct candidate a NEW ref, so the queue never force-pushes anything: a
 * recomposition (new SHA) or an infra retry (new batch id) always creates a fresh branch.
 */
export function candidateRef(base, batchId, candidateSha) {
  if (!SAFE_SEGMENT_RE.test(String(batchId ?? ""))) throw new Error(`unsafe batch id: ${batchId}`);
  if (!SHA_RE.test(candidateSha ?? "")) throw new Error(`invalid candidate sha: ${candidateSha}`);
  return `${CANDIDATE_PREFIX}${sanitizeBase(base)}/${batchId}-${candidateSha.slice(0, 12)}`;
}

/** Batch id for a sequence number: (42) → "b42"; with an infra retry: (42, 1) → "b42-r1". */
export function batchIdFor(seq, retry = 0) {
  if (!isCount(seq)) throw new Error(`invalid batch sequence: ${seq}`);
  return retry > 0 ? `b${seq}-r${retry}` : `b${seq}`;
}

/** Candidate branch for a CI run on the bare base SHA (base-red discrimination). */
export function baseCheckRef(base, baseSha) {
  if (!SHA_RE.test(baseSha ?? "")) throw new Error(`invalid base sha: ${baseSha}`);
  return `${CANDIDATE_PREFIX}${sanitizeBase(base)}/basecheck-${baseSha.slice(0, 12)}`;
}

/** "omni-queue/release-v3.8.54/b42-0123456789ab" → { sanitizedBase, id, kind } | null. */
export function parseCandidateRef(ref) {
  const name = String(ref ?? "").replace(/^refs\/heads\//, "");
  if (!name.startsWith(CANDIDATE_PREFIX)) return null;
  const parts = name.slice(CANDIDATE_PREFIX.length).split("/");
  if (parts.length !== 2 || !parts.every((p) => SAFE_SEGMENT_RE.test(p))) return null;
  const [sanitizedBase, id] = parts;
  return { sanitizedBase, id, kind: id.startsWith("basecheck-") ? "base-check" : "batch" };
}

/** Path of the state file of a base inside STATE_BRANCH. */
export function stateFilePath(base) {
  return `state/${sanitizeBase(base)}.json`;
}

export function dashboardTitle(base) {
  return `${DASHBOARD_TITLE_PREFIX}${base}`;
}

export function baseRedTitle(base) {
  return `${BASE_RED_TITLE_PREFIX}${base}`;
}

/** Hidden marker appended to every queue comment so each `key` is posted once per PR. */
export function commentMarker(key) {
  if (!/^[a-z0-9:._-]+$/i.test(String(key ?? ""))) throw new Error(`unsafe comment key: ${key}`);
  return `<!-- omni-queue:${key} -->`;
}

/** Git identity of the App bot ("<slug>[bot]"), used for queue merge commits. */
export function botIdentity(appSlug, appUserId) {
  const login = `${appSlug}[bot]`;
  return {
    name: login,
    email: appUserId
      ? `${appUserId}+${login}@users.noreply.github.com`
      : `${login}@users.noreply.github.com`,
  };
}

// ───────────────────────────── merge commit message ─────────────────────────────

/** One-line, trailer-safe PR title: no control chars/newlines, collapsed spaces, ≤ 200 chars. */
export function sanitizeTitle(title) {
  const flat = String(title ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return flat.length > 200 ? `${flat.slice(0, 197)}...` : flat;
}

/**
 * Message of the merge commit that brings one PR into a candidate. The subject carries `#N`,
 * the title and the author (release tooling maps commits to PRs from these merges); the
 * trailers are the machine-readable contract, read back with parseQueueTrailers. Every merge
 * of the batch carries Omni-Queue-Base, so the candidate's top commit always names its base.
 *
 * @param {{pr: PrRef, base: string, baseSha: string, batchId: string}} input
 */
export function buildMergeMessage({ pr, base, baseSha, batchId }) {
  if (!SHA_RE.test(baseSha ?? "")) throw new Error("buildMergeMessage: invalid baseSha");
  if (!SHA_RE.test(pr?.head ?? "")) throw new Error("buildMergeMessage: invalid head");
  const author = String(pr.author ?? "").replace(/[^A-Za-z0-9_[\]-]/g, "");
  return [
    `Merge PR #${pr.n}: ${sanitizeTitle(pr.title)} (@${author})`,
    "",
    `${TRAILERS.pr}: ${pr.n}`,
    `${TRAILERS.head}: ${pr.head}`,
    `${TRAILERS.author}: ${author}`,
    `${TRAILERS.base}: ${baseSha}`,
    `${TRAILERS.target}: ${base}`,
    `${TRAILERS.batch}: ${batchId}`,
    "",
  ].join("\n");
}

/**
 * Read the queue trailers back from a commit message. Only the LAST paragraph is a trailer
 * block (git semantics); values are validated, invalid ones are dropped.
 * @returns {{pr?: number, head?: string, author?: string, base?: string, target?: string,
 *            batch?: string}}
 */
export function parseQueueTrailers(message) {
  const paragraphs = String(message ?? "")
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\n\s*\n/);
  const block = paragraphs.length > 1 ? paragraphs[paragraphs.length - 1] : "";
  const out = {};
  for (const line of block.split("\n")) {
    const m = /^([A-Za-z-]+):\s*(.+?)\s*$/.exec(line);
    if (!m) continue;
    const [, key, value] = m;
    if (key === TRAILERS.pr && /^[1-9][0-9]*$/.test(value)) out.pr = Number(value);
    else if (key === TRAILERS.head && SHA_RE.test(value)) out.head = value;
    else if (key === TRAILERS.author && /^[A-Za-z0-9_[\]-]+$/.test(value)) out.author = value;
    else if (key === TRAILERS.base && SHA_RE.test(value)) out.base = value;
    else if (key === TRAILERS.target && /^[A-Za-z0-9._/-]+$/.test(value)) out.target = value;
    else if (key === TRAILERS.batch && SAFE_SEGMENT_RE.test(value)) out.batch = value;
  }
  return out;
}

// ───────────────────────────── paths ─────────────────────────────

/**
 * Minimal glob → RegExp: `**` (any depth, incl. zero dirs when followed by `/`), `*` (one
 * segment), `?` (one char). Patterns are anchored to the repository root.
 */
export function globToRegExp(glob) {
  let re = "";
  const g = String(glob);
  for (let i = 0; i < g.length; i++) {
    const ch = g[i];
    if (ch === "*" && g[i + 1] === "*") {
      if (g[i + 2] === "/") {
        re += "(?:.*/)?";
        i += 2;
      } else {
        re += ".*";
        i += 1;
      }
    } else if (ch === "*") re += "[^/]*";
    else if (ch === "?") re += "[^/]";
    else re += ch.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${re}$`);
}

export function matchesGlob(path, glob) {
  return globToRegExp(glob).test(String(path ?? "").replace(/^\.?\//, ""));
}

/** True when `path` is an agent-instruction surface (config.protectedPaths). */
export function isProtectedPath(path, globs) {
  return globs.some((g) => matchesGlob(path, g));
}

export const isSha = (v) => SHA_RE.test(String(v ?? ""));
