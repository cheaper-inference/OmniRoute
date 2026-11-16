// scripts/merge-queue/dashboard.mjs — WP4. Plan §3.6: the per-base dashboard issue.
//
// One issue per base: title contracts.dashboardTitle(base), label contracts.DASHBOARD_LABEL.
// Body regenerated each tick: ordered queue, in-flight candidate (run link), pause banner,
// last 20 history events, metrics.
//
// Every attacker-influenced string (PR titles, event details, eligibility details) goes through
// escapeMarkdown: no markdown links, no HTML, no table breaks, no @mentions, no autolinks.
// Authors are printed without "@" so a dashboard refresh never notifies anyone.
//
// Clock-dependent text lives on ONE footer line (VOLATILE_LINE_RE) that upsertDashboard ignores
// when comparing, so an unchanged queue costs no PATCH (and no edit-history entry) per tick. The
// one exception is the Health section's heartbeat line (heartbeatLine): it names the hour of the
// tick, so a queue whose ticks complete edits its dashboard once per hour, and a dashboard whose
// heartbeat stopped moving says that no tick has completed since. The body is capped at
// MAX_BODY_CHARS (GitHub rejects issue bodies over 65 536 characters).
//
// Health (assessHealth): a pure verdict on whether the queue is making progress — ok, idle,
// waiting or stalled — with stable reason lines (absolute times, never a relative age). The tick
// raises one queue-stalled event and one comment (stalledComment) per stalled episode.

import {
  DASHBOARD_LABEL,
  QUEUE_LANES,
  dashboardTitle,
  isSha,
  resumeBlockers,
} from "./contracts.mjs";
import { currentBatchWindow } from "./eligibility.mjs";

/**
 * @typedef {import("./contracts.mjs").QueueState} QueueState
 * @typedef {import("./contracts.mjs").HistoryEvent} HistoryEvent
 * @typedef {import("./config.mjs").QueueConfig} QueueConfig
 */

/**
 * @typedef {object} QueueEntry
 * @property {number} number
 * @property {string} title
 * @property {string} author
 * @property {boolean} eligible
 * @property {{code: string, detail: string}[]} reasons
 * @property {string|null} labeledAt
 */

export const RECENT_EVENTS = 20;
export const MAX_BODY_CHARS = 60_000;
/** The only line of the body that changes with the clock / run; ignored by upsertDashboard. */
export const VOLATILE_LINE_RE = /^<sub>Last change: [^\n]*<\/sub>$/gm;
const SERVER_URL = "https://github.com";
const REPOSITORY_RE = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const SAFE_URL_RE = /^https:\/\/[^\s()<>[\]"'`|\\]+$/;

// ───────────────────────────── escaping ─────────────────────────────

/**
 * Make an untrusted string inert inside GitHub-flavored markdown (inline text or table cell):
 * one line, HTML-escaped, markdown punctuation backslash-escaped, `|` escaped for tables,
 * mentions and autolinks broken with a zero-width space entity.
 */
export function escapeMarkdown(text, max = 200) {
  let flat = String(text ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (flat.length > max) flat = `${flat.slice(0, max - 3)}...`;
  return flat
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/[\\`*_{}[\]()#+!|~-]/g, (ch) => `\\${ch}`)
    .replace(/@/g, "@&#8203;")
    .replace(/:\/\//g, ":&#8203;//")
    .replace(/www\./gi, (m) => `${m.slice(0, 3)}&#8203;.`);
}

/** A GitHub login rendered as plain text (no mention). */
function login(name) {
  const clean = String(name ?? "").replace(/[^A-Za-z0-9_[\]-]/g, "");
  return clean ? escapeMarkdown(clean, 60) : "?";
}

const short = (sha) => (isSha(sha) ? sha.slice(0, 12) : "?");
const code = (text) => `\`${String(text ?? "").replace(/`/g, "'")}\``;

/** "2026-11-13T10:05:09.123Z" → "2026-11-13 10:05Z"; anything else → "—". */
export function formatTime(iso) {
  const t = Date.parse(iso ?? "");
  if (Number.isNaN(t)) return "—";
  return `${new Date(t).toISOString().slice(0, 16).replace("T", " ")}Z`;
}

/** Whole minutes between two ISO instants, or null. */
function minutesBetween(fromIso, toIso) {
  const a = Date.parse(fromIso ?? "");
  const b = Date.parse(toIso ?? "");
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return (b - a) / 60_000;
}

export function formatDuration(minutes) {
  if (minutes === null || minutes === undefined || !Number.isFinite(minutes)) return "—";
  const m = Math.max(0, Math.round(minutes));
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  return m % 60 ? `${h} h ${m % 60} min` : `${h} h`;
}

// ───────────────────────────── metrics ─────────────────────────────

const round1 = (x) => Math.round(x * 10) / 10;

/** Nearest-rank percentile of a non-empty numeric list. */
function percentile(sorted, p) {
  const rank = Math.ceil((p / 100) * sorted.length);
  return sorted[Math.min(sorted.length, Math.max(1, rank)) - 1];
}

function median(sorted) {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** PR number → labeledAt known from the in-flight candidate (and its bisection / parked red). */
function knownApprovals(state) {
  const map = new Map();
  const add = (prs) => {
    for (const pr of prs ?? []) if (pr?.labeledAt) map.set(pr.n, pr.labeledAt);
  };
  const f = state?.inFlight;
  if (f) {
    add(f.prs);
    for (const seg of f.bisect?.segments ?? []) add(seg);
    add(f.pendingRed?.prs);
    for (const seg of f.pendingRed?.bisect?.segments ?? []) add(seg);
  }
  return map;
}

/**
 * Metrics from the history window: PRs landed, CI runs per merged PR (state.counters.ciRuns /
 * landedPrs), red batches, bisections, median and p90 minutes from approval (labeledAt) to
 * landed (from "landed" events joined with the PRs' labeledAt recorded in batch events).
 *
 * Join rule: a history event may carry `labeledAt: {"<pr>": ISO}` (written on "batch-started");
 * the latest value seen BEFORE a "landed" event wins. PRs of the current in-flight candidate
 * fill the gaps, then the labeled queue entries (in shadow mode nothing lands, so the PRs keep
 * their label and their approval time is known there). In shadow mode (no "landed" event in
 * the window) "would-land" events are used and `labelToMergeBasis` says so.
 * @param {QueueState} state
 * @param {string} now ISO
 * @param {{queue?: {number: number, labeledAt: string|null}[]}} [extra]
 * @returns {{landedPrs: number, ciRunsPerMergedPr: number|null, redBatches: number,
 *            bisections: number, medianLabelToMergeMinutes: number|null,
 *            p90LabelToMergeMinutes: number|null, labelToMergeBasis: "landed"|"would-land"}}
 */
export function computeMetrics(state, now, extra = {}) {
  void now; // the window is the persisted history; no clock-dependent metric
  const counters = state?.counters ?? {};
  const landedPrs = counters.landedPrs ?? 0;
  const history = Array.isArray(state?.history) ? state.history : [];
  const shadowOnly =
    !history.some((e) => e.type === "landed") && history.some((e) => e.type === "would-land");
  const landType = shadowOnly ? "would-land" : "landed";
  const fallback = knownApprovals(state);
  for (const entry of extra.queue ?? []) {
    if (entry?.labeledAt && !fallback.has(entry.number))
      fallback.set(entry.number, entry.labeledAt);
  }
  const seen = new Map();
  const durations = [];
  for (const event of history) {
    if (event.labeledAt && typeof event.labeledAt === "object") {
      for (const [pr, at] of Object.entries(event.labeledAt)) {
        if (typeof at === "string") seen.set(Number(pr), at);
      }
    }
    if (event.type !== landType) continue;
    for (const pr of event.prs ?? []) {
      const minutes = minutesBetween(seen.get(pr) ?? fallback.get(pr), event.at);
      if (minutes !== null && minutes >= 0) durations.push(minutes);
    }
  }
  durations.sort((a, b) => a - b);
  return {
    landedPrs,
    ciRunsPerMergedPr: landedPrs > 0 ? round1((counters.ciRuns ?? 0) / landedPrs) : null,
    redBatches: counters.redBatches ?? 0,
    bisections: counters.bisections ?? 0,
    medianLabelToMergeMinutes: durations.length ? round1(median(durations)) : null,
    p90LabelToMergeMinutes: durations.length ? round1(percentile(durations, 90)) : null,
    labelToMergeBasis: landType,
  };
}

// ───────────────────────────── health ─────────────────────────────

/** A base paused for longer than this is stalled (a manual pause too: it may be forgotten). */
export const STALL_PAUSED_MINUTES = 120;
/** A candidate in flight for longer than config.checksTimeoutMinutes + this is stalled. */
export const STALL_INFLIGHT_GRACE_MINUTES = 60;
/** Eligible PRs with nothing started for longer than batch.maxWaitMinutes + this: stalled. */
export const STALL_WAITING_GRACE_MINUTES = 30;
/** This many failed ticks in a row (state.failedTicks) mean ticks are failing: stalled. */
export const STALL_ERROR_STREAK = 3;

/** Events that are not the queue doing something (the eligible-wait rule skips them). */
const NOT_ACTIVITY = new Set(["error", "queue-stalled"]);

const isoAt = (ms) => new Date(ms).toISOString();

/** "2026-11-13T10:42:31Z" → "2026-11-13 10:00Z" (the hour of an instant); anything else → "—". */
function formatHour(iso) {
  const t = Date.parse(iso ?? "");
  if (Number.isNaN(t)) return "—";
  return `${new Date(t).toISOString().slice(0, 13).replace("T", " ")}:00Z`;
}

/**
 * The Health section's heartbeat line: the hour of `now`. Stable within the hour, so an idle
 * queue edits its dashboard at most once per hour, and a stale hour means no tick completed.
 */
export function heartbeatLine(now) {
  return `Heartbeat: ticks completing as of ${formatHour(now)}`;
}

/**
 * Is the queue of a base making progress? Pure: reads only its input. A rule's limit is
 * exclusive (120 minutes paused is not stalled, 121 is). Stalled when any of:
 *  1. paused for more than STALL_PAUSED_MINUTES (since: the pause's `since`);
 *  2. a candidate in flight for more than config.checksTimeoutMinutes +
 *     STALL_INFLIGHT_GRACE_MINUTES (since: its `startedAt`, or the end of its release-freeze hold
 *     when later: inFlight.freezeHold.endedAt). A batch the tick holds for a release freeze (an
 *     open inFlight.freezeHold) is waiting, not stalled, while the hold lasts;
 *  3. eligible PRs, nothing in flight and no pause for more than batch.maxWaitMinutes +
 *     STALL_WAITING_GRACE_MINUTES (since: the oldest eligible approval, or the queue's last
 *     activity when later: the newest event that is not an error or a queue-stalled event).
 *     Needs `queue`; with a null queue (main()'s failure path) it is not read;
 *  4. STALL_ERROR_STREAK ticks in a row or more threw (state.failedTicks, counted by main()'s
 *     failure path and deleted by a tick that completes; since: state.failedSince). The history
 *     is not read: completed ticks append `error` events too (a landing pause, a candidate gone
 *     from origin), and an idle tick that completes appends nothing.
 * `since` = the earliest `since` of the rules that hold (normalized ISO): stable from one tick to
 * the next while the same conditions hold, so it keys one alert per episode.
 * Not stalled: "waiting" when paused, when a batch is held for a release freeze, or when eligible
 * PRs wait with nothing in flight; "ok" with a candidate in flight; "idle" otherwise. A base-red
 * pause with a base-repair candidate in flight is waiting until rule 1 says otherwise.
 * Elapsed times are fractional minutes here (a limit holds from its first millisecond over); the
 * watchdog and the CLI's STALE floor to whole minutes, as they print them.
 * @param {{state: QueueState, queue: QueueEntry[]|null, config: QueueConfig, now: string}} input
 * @returns {{status: "ok"|"idle"|"waiting"|"stalled", reasons: string[], since: string|null}}
 */
export function assessHealth({ state, queue, config, now }) {
  const nowMs = Date.parse(now ?? "");
  const stalls = [];
  const elapsed = (iso) => {
    const t = Date.parse(iso ?? "");
    return Number.isNaN(t) || Number.isNaN(nowMs) ? null : { t, minutes: (nowMs - t) / 60_000 };
  };
  const over = (iso, limit) => {
    const e = elapsed(iso);
    return e !== null && e.minutes > limit ? e.t : null;
  };

  const p = state?.paused ?? null;
  const pausedText = p
    ? p.reason === "manual"
      ? `paused manually since ${formatTime(p.since)}`
      : `paused (reason ${code(p.reason)}) since ${formatTime(p.since)}`
    : "";
  if (p) {
    const t = over(p.since, STALL_PAUSED_MINUTES);
    if (t !== null) {
      const tail =
        p.reason === "manual" ? ": a manual pause lasts until someone resumes the queue" : "";
      stalls.push({
        t,
        reason: `${pausedText}, for more than ${STALL_PAUSED_MINUTES} min${tail}`,
      });
    }
  }

  const f = state?.inFlight ?? null;
  const hold = f?.freezeHold ?? null;
  const held = Boolean(hold) && hold.endedAt === undefined;
  const heldText = held
    ? `batch ${code(f.batchId)} held by a release freeze since ${formatTime(hold.since)}: it ` +
      "waits for the freeze to lift"
    : "";
  if (f && !held) {
    const limit = (Number(config?.checksTimeoutMinutes) || 0) + STALL_INFLIGHT_GRACE_MINUTES;
    // After a release-freeze hold the clock starts again when the hold ended.
    const started = Date.parse(f.startedAt ?? "");
    const ended = Date.parse(hold?.endedAt ?? "");
    const afterHold = !Number.isNaN(ended) && (Number.isNaN(started) || ended > started);
    const t = over(afterHold ? hold.endedAt : f.startedAt, limit);
    if (t !== null) {
      const what = f.kind === "base-check" ? "base check" : "batch";
      const heldUntil = afterHold
        ? `, held by a release freeze until ${formatTime(hold.endedAt)}, then`
        : ",";
      stalls.push({
        t,
        reason:
          `${what} ${code(f.batchId)} in flight since ${formatTime(f.startedAt)}${heldUntil} ` +
          `for more than ${limit} min (checksTimeoutMinutes + ${STALL_INFLIGHT_GRACE_MINUTES})`,
      });
    }
  }

  const eligible = Array.isArray(queue) ? queue.filter((e) => e?.eligible) : [];
  let waitingSince = null;
  if (!p && !f && eligible.length) {
    const times = eligible
      .map((e) => Date.parse(e.labeledAt ?? ""))
      .filter((t) => !Number.isNaN(t));
    const activity = (state?.history ?? [])
      .filter((e) => !NOT_ACTIVITY.has(e?.type))
      .map((e) => Date.parse(e.at ?? ""))
      .filter((t) => !Number.isNaN(t));
    const oldest = times.length ? Math.min(...times) : null;
    const last = activity.length ? Math.max(...activity) : null;
    const start = oldest === null ? last : last === null ? oldest : Math.max(oldest, last);
    if (start !== null) {
      waitingSince = isoAt(start);
      const limit = (Number(config?.batch?.maxWaitMinutes) || 0) + STALL_WAITING_GRACE_MINUTES;
      if (over(waitingSince, limit) !== null) {
        stalls.push({
          t: start,
          reason:
            `eligible PRs waiting with nothing in flight since ${formatTime(waitingSince)}, for ` +
            `more than ${limit} min (batch.maxWaitMinutes + ${STALL_WAITING_GRACE_MINUTES})`,
        });
      }
    }
  }

  const failed = state?.failedTicks;
  if (Number.isSafeInteger(failed) && failed >= STALL_ERROR_STREAK && !Number.isNaN(nowMs)) {
    const first = Date.parse(state.failedSince ?? "");
    const t = Number.isNaN(first) ? nowMs : first;
    stalls.push({
      t,
      reason:
        `${failed} ticks in a row failed, the first at ${formatTime(isoAt(t))}: ` +
        "ticks are failing",
    });
  }

  if (stalls.length) {
    return {
      status: "stalled",
      reasons: stalls.map((s) => s.reason),
      since: isoAt(Math.min(...stalls.map((s) => s.t))),
    };
  }
  if (p) {
    const repair =
      p.reason === "base-red" && f?.lane === "base-repair"
        ? `; base-repair candidate ${code(f.batchId)} in flight`
        : "";
    const reasons = [`${pausedText}${repair}`, ...(held ? [heldText] : [])];
    return { status: "waiting", reasons, since: null };
  }
  if (held) return { status: "waiting", reasons: [heldText], since: null };
  if (f) return { status: "ok", reasons: [], since: null };
  if (eligible.length) {
    const since = waitingSince ? ` since ${formatTime(waitingSince)}` : "";
    return {
      status: "waiting",
      reasons: [`eligible PRs waiting with nothing in flight${since}`],
      since: null,
    };
  }
  return { status: "idle", reasons: [], since: null };
}

/** Heartbeat line of a dashboard written by main()'s failure path (no tick completed it). */
export const NO_HEARTBEAT_LINE = "Heartbeat: none: a tick that failed wrote this dashboard";

/**
 * The Health section (lines, ending with a blank one). `completed` = rendered by a tick that
 * reached its end (the heartbeat line); false for main()'s failure path (NO_HEARTBEAT_LINE).
 */
function renderHealth(health, now, completed) {
  const since = health.since ? ` since ${formatTime(health.since)}` : "";
  return [
    "### Health",
    "",
    `Status: **${health.status}**${since}`,
    ...health.reasons.map((r) => `- ${r}`),
    "",
    completed ? heartbeatLine(now) : NO_HEARTBEAT_LINE,
    "",
  ];
}

const LOGIN_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;

/**
 * The one comment a stalled episode posts on the dashboard issue (key `stalled:<since>`): it
 * mentions the approvers (config.approvers, valid logins only), so they are notified once per
 * episode, and lists the episode's reasons.
 * @param {{base: string, stalled: {since: string, reasons: string[]}, config: QueueConfig}} input
 * @returns {string}
 */
export function stalledComment({ base, stalled, config }) {
  const mentions = (config?.approvers ?? [])
    .filter((a) => LOGIN_RE.test(String(a)))
    .map((a) => `@${a}`)
    .join(" ");
  return [
    `🚨 **The omni-queue of ${code(base)} has stalled** since ${formatTime(stalled.since)}.`,
    "",
    `${mentions ? `${mentions}: ` : ""}the queue has stopped making progress:`,
    "",
    ...(stalled.reasons ?? []).map((r) => `- ${r}`),
    "",
    "The dashboard above shows the queue, the pause banner and the recent events; " +
      `\`npm run queue -- status --base ${base}\` prints the same locally. This alert is posted ` +
      "once per episode: the next one comes only after the queue recovers and stalls again.",
  ].join("\n");
}

// ───────────────────────────── rendering ─────────────────────────────

function links(repository) {
  const ok = REPOSITORY_RE.test(String(repository ?? ""));
  const root = ok ? `${SERVER_URL}/${repository}` : null;
  return {
    pr: (n) => `#${Number(n)}`,
    commit: (sha) =>
      root && isSha(sha) ? `[${code(short(sha))}](${root}/commit/${sha})` : code(short(sha)),
    checks: (sha) => (root && isSha(sha) ? ` · [checks](${root}/commit/${sha}/checks)` : ""),
  };
}

const safeUrl = (url) => (typeof url === "string" && SAFE_URL_RE.test(url) ? url : null);

function prList(prs, link) {
  return (prs ?? [])
    .map((pr) => `${link.pr(pr.n)} ${escapeMarkdown(pr.title, 80)} (${login(pr.author)})`)
    .join("; ");
}

/**
 * The number of stored land-status withdrawals of each list (tick retryWithdrawals), or null when
 * both are empty. Counts only, nothing relative: the body stays stable between ticks.
 */
function withdrawalCounts(state) {
  const main = Array.isArray(state?.landWithdrawals) ? state.landWithdrawals.length : 0;
  const overflow = Array.isArray(state?.landWithdrawalsOverflow)
    ? state.landWithdrawalsOverflow.length
    : 0;
  if (!main && !overflow) return null;
  return (
    `Stored land-status withdrawals (retried on every tick): ${main} in \`landWithdrawals\`, ` +
    `${overflow} in \`landWithdrawalsOverflow\`.`
  );
}

/**
 * The pause banner. `blockers` = the overflow entries that make a resume refused
 * (contracts.resumeBlockers, the rule the tick enforces): the resume line then says to wait.
 */
function renderPause(paused, blockers = 0) {
  const parts = [
    `> ⏸️ **Queue paused** — reason ${code(paused.reason)} since ${formatTime(paused.since)}.`,
  ];
  if (paused.detail) parts.push(`> ${escapeMarkdown(paused.detail, 300)}`);
  const extra = [];
  if (isSha(paused.baseSha)) extra.push(`base tip when paused ${code(short(paused.baseSha))}`);
  if (Number.isSafeInteger(paused.issue)) extra.push(`issue #${paused.issue}`);
  if (extra.length) parts.push(`> ${extra.join(" · ")}`);
  if (paused.reason === "base-red") {
    parts.push("> Resumes automatically when the base tip moves and turns green.");
  } else if (blockers) {
    parts.push(
      "> A resume is refused while `landWithdrawalsOverflow` holds entries " +
        `(${blockers} now): wait until the ticks write them, then \`npm run queue -- resume <base>\`.`
    );
  } else {
    parts.push("> Resume with `npm run queue -- resume <base>` once the cause is fixed.");
  }
  return parts.join("\n");
}

function renderInFlight(f, link) {
  if (!f) return ["_Nothing in flight._"];
  // Absolute start time only: a relative age would change the body on every tick.
  // The lane of a lane batch (contracts.QUEUE_LANES); any other value is not printed.
  const lane = QUEUE_LANES.includes(f.lane) ? `lane ${code(f.lane)}, ` : "";
  const lines = [
    `- **${f.kind === "base-check" ? "Base check" : "Batch"}** ${code(f.batchId)} — ${lane}stage ` +
      `${code(f.stage)}, started ${formatTime(f.startedAt)}, ` +
      `infra retries ${Number(f.attempts) || 0}`,
    `- Candidate ${link.commit(f.candidateSha)}${link.checks(f.candidateSha)} on ref ` +
      `${code(f.candidateRef)}`,
    `- Base ${link.commit(f.baseSha)}`,
  ];
  if (f.prs?.length) {
    lines.push(`- PRs in merge order (${f.prs.length}): ${prList(f.prs, link)}`);
  }
  if (f.pendingRed) {
    const pr = f.pendingRed;
    lines.push(
      `- Red batch ${code(pr.batchId)} (${link.commit(pr.candidateSha)}) parked while the bare ` +
        `base is tested: ${prList(pr.prs, link)}`
    );
  }
  const b = f.bisect;
  if (b) {
    lines.push(
      "",
      `**Bisection** of ${code(b.rootBatchId)} — ${Number(b.steps) || 0} step(s) so far`
    );
    (b.segments ?? []).forEach((seg, i) => {
      const prs = seg.map((pr) => link.pr(pr.n)).join(", ") || "—";
      lines.push(`${i + 1}. ${prs}${i === 0 ? " ← under test" : ""}`);
    });
    if (b.culprits?.length) {
      lines.push(`- Culprits: ${b.culprits.map((pr) => link.pr(pr.n)).join(", ")}`);
    }
    if (b.landed?.length)
      lines.push(`- Landed so far: ${b.landed.map((n) => link.pr(n)).join(", ")}`);
  }
  return lines;
}

/** Eligible first (FIFO by approval), then ineligible by PR number. */
export function orderQueue(queue) {
  const t = (e) => {
    const ms = Date.parse(e.labeledAt ?? "");
    return Number.isNaN(ms) ? Number.POSITIVE_INFINITY : ms;
  };
  return [...(queue ?? [])].sort((a, b) => {
    if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
    if (a.eligible) return t(a) - t(b) || a.number - b.number;
    return a.number - b.number;
  });
}

const QUEUE_HEADER = ["| # | PR | Author | Approved | Status |", "| --- | --- | --- | --- | --- |"];
const EVENTS_HEADER = [
  "| Time (UTC) | Event | Batch | PRs | Detail |",
  "| --- | --- | --- | --- | --- |",
];

/** Table rows of the ordered queue (no header). */
function renderQueueRows(queue, link) {
  const lines = [];
  orderQueue(queue).forEach((e, i) => {
    const status = e.eligible
      ? "✅ eligible"
      : `⛔ ${(e.reasons ?? [])
          .map((r) => `${code(r.code)}${r.detail ? ` ${escapeMarkdown(r.detail, 120)}` : ""}`)
          .join("; ")}`;
    lines.push(
      `| ${i + 1} | ${link.pr(e.number)} ${escapeMarkdown(e.title, 100)} | ${login(e.author)} | ` +
        `${formatTime(e.labeledAt)} | ${status} |`
    );
  });
  return lines;
}

/** Table rows of the last RECENT_EVENTS events, newest first (no header). */
function renderEventRows(history, link) {
  const recent = (history ?? []).slice(-RECENT_EVENTS).reverse();
  const lines = [];
  for (const e of recent) {
    const url = safeUrl(e.url);
    const sha = isSha(e.sha) ? ` ${code(short(e.sha))}` : "";
    const detail = `${escapeMarkdown(e.detail ?? "", 160)}${sha}${url ? ` [link](${url})` : ""}`;
    lines.push(
      `| ${formatTime(e.at)} | ${code(e.type)} | ${e.batchId ? code(e.batchId) : "—"} | ` +
        `${(e.prs ?? []).map((n) => link.pr(n)).join(", ") || "—"} | ${detail.trim() || "—"} |`
    );
  }
  return lines;
}

function renderMetrics(m, shadow) {
  const value = (v) => (v === null || v === undefined ? "—" : String(v));
  // Nothing merges in shadow mode, so "per merged PR" has no denominator yet.
  const ciRuns =
    m.ciRunsPerMergedPr === null && shadow ? "n/a (shadow)" : value(m.ciRunsPerMergedPr);
  const target = m.labelToMergeBasis === "would-land" ? "would-land" : "merge";
  return [
    "| Metric | Value |",
    "| --- | --- |",
    `| PRs landed | ${m.landedPrs} |`,
    `| CI runs per merged PR | ${ciRuns} |`,
    `| Red batches | ${m.redBatches} |`,
    `| Bisections | ${m.bisections} |`,
    `| Approval → ${target}, median | ${formatDuration(m.medianLabelToMergeMinutes)} |`,
    `| Approval → ${target}, p90 | ${formatDuration(m.p90LabelToMergeMinutes)} |`,
  ];
}

/** Drop rows from the end until `excess` characters are saved; returns the kept count. */
function keepRows(rows, keep, excess) {
  let saved = 0;
  let n = keep;
  while (n > 0 && saved < excess) {
    n -= 1;
    saved += rows[n].length + 1;
  }
  return n;
}

/**
 * The batch size: "batch window W (max M)" with config.batch.adaptive (W = the size of the next
 * root batch, eligibility.currentBatchWindow), else "batch ≤ M".
 */
function batchLine(config, state) {
  const max = config?.batch?.maxSize;
  if (!Number.isSafeInteger(max)) return "batch ≤ ?";
  if (!config.batch.adaptive) return `batch ≤ ${max}`;
  return `batch window ${currentBatchWindow(config, state)} (max ${max})`;
}

/**
 * Markdown body. Deterministic for a given input (no clock reads besides `now`). Escapes PR
 * titles (attacker-controlled) so they cannot inject markdown links, mentions or HTML.
 * @param {{base: string, state: QueueState, queue: QueueEntry[]|null, config: QueueConfig,
 *          now: string, runUrl: string|null, repository?: string}} input
 *   repository = "owner/repo", used to build PR / commit-checks links (plain text when absent);
 *   queue = null: the labeled PRs were not read (main()'s failure path creates a missing
 *   dashboard so the stalled alert has an issue to go to): the Queue section says so
 * @returns {string}
 */
export function renderDashboard(input) {
  const { base, state, queue, config, now, repository } = input;
  const runUrl = safeUrl(input.runUrl);
  const link = links(repository);
  const shadow = config?.mode !== "live";
  const queueRead = queue !== null;
  const entries = queue ?? [];
  const eligible = entries.filter((e) => e.eligible).length;
  const queueRows = renderQueueRows(entries, link);
  const eventRows = renderEventRows(state?.history, link);
  const metrics = renderMetrics(computeMetrics(state, now, { queue: entries }), shadow);
  // Rendered with the queue = by a tick that reached its end (the heartbeat line); without it,
  // by main()'s failure path.
  const health = renderHealth(assessHealth({ state, queue, config, now }), now, queueRead);

  const table = (header, rows, shown, empty, noun) => {
    if (!rows.length) return [empty];
    const out = [...header, ...rows.slice(0, shown)];
    if (shown < rows.length) out.push("", `_… ${rows.length - shown} more ${noun} not shown._`);
    return out;
  };
  const build = (nQueue, nEvents) => {
    const out = [
      `## 🚦 omni-queue — ${code(base)}`,
      "",
      shadow
        ? "**Mode: shadow** — candidates are composed and tested, nothing lands (would-land only)."
        : "**Mode: live** — green candidates land on the base.",
      "",
      `Landing ${code(config?.landing?.mode ?? "?")} · ${batchLine(config, state)} · ` +
        `label ${code(config?.label ?? "?")}`,
      "",
      ...health,
    ];
    if (state?.paused) out.push(renderPause(state.paused, resumeBlockers(state)), "");
    const withdrawals = withdrawalCounts(state);
    if (withdrawals) out.push(withdrawals, "");
    out.push("### In flight", "", ...renderInFlight(state?.inFlight, link), "");
    out.push(
      ...(queueRead
        ? [
            `### Queue (${entries.length} labeled, ${eligible} eligible)`,
            "",
            ...table(QUEUE_HEADER, queueRows, nQueue, "_No PR carries the queue label._", "PR(s)"),
          ]
        : [
            "### Queue",
            "",
            "_The labeled PRs were not read: a tick that failed wrote this dashboard. The next " +
              "tick that completes lists them._",
          ]),
      ""
    );
    out.push(
      `### Recent events (last ${RECENT_EVENTS})`,
      "",
      ...table(EVENTS_HEADER, eventRows, nEvents, "_No events yet._", "event(s)"),
      ""
    );
    out.push("### Metrics", "", ...metrics, "");
    out.push(
      "<sub>Generated by omni-queue. The body is rewritten only when its content changes; " +
        "manual edits are overwritten.</sub>",
      `<sub>Last change: ${formatTime(now)}${runUrl ? ` · [run](${runUrl})` : ""}</sub>`,
      ""
    );
    return out.join("\n");
  };

  // Fit under MAX_BODY_CHARS: trim the queue tail first (lowest priority), then the events.
  const NOTE_RESERVE = 200;
  let nQueue = queueRows.length;
  let nEvents = eventRows.length;
  let body = build(nQueue, nEvents);
  if (body.length > MAX_BODY_CHARS) {
    nQueue = keepRows(queueRows, nQueue, body.length - MAX_BODY_CHARS + NOTE_RESERVE);
    body = build(nQueue, nEvents);
  }
  if (body.length > MAX_BODY_CHARS) {
    nEvents = keepRows(eventRows, nEvents, body.length - MAX_BODY_CHARS + NOTE_RESERVE);
    body = build(nQueue, nEvents);
  }
  if (body.length > MAX_BODY_CHARS) {
    body = `${body.slice(0, MAX_BODY_CHARS - 40)}\n\n_… dashboard truncated._\n`;
  }
  return body;
}

/** The body without its volatile footer line (what upsertDashboard compares). */
export function stableBody(body) {
  return String(body ?? "")
    .replace(/\r\n/g, "\n")
    .replace(VOLATILE_LINE_RE, "");
}

/** The open dashboard issue of `base` (exact title + label; the oldest wins), or null. */
async function openDashboard(gh, base) {
  const title = dashboardTitle(base);
  const issues = await gh.listIssues({ labels: [DASHBOARD_LABEL], state: "open" });
  return (
    issues
      .filter((i) => i.title === title && i.labels.includes(DASHBOARD_LABEL))
      .sort((a, b) => a.number - b.number)[0] ?? null
  );
}

/**
 * The number of the open dashboard issue of `base`, or null when there is none. Never creates
 * one (main()'s failure path reads it first, and creates it with createDashboard only when it is
 * missing, so it never rewrites the body of a dashboard a completed tick wrote).
 * @param {{gh: object, base: string}} input
 * @returns {Promise<number|null>}
 */
export async function findDashboard({ gh, base }) {
  return (await openDashboard(gh, base))?.number ?? null;
}

/**
 * Create the dashboard issue of `base` (exact title + label) with `body`; returns its number.
 * @param {{gh: object, base: string, body: string}} input
 * @returns {Promise<number>}
 */
export async function createDashboard({ gh, base, body }) {
  const created = await gh.createIssue({
    title: dashboardTitle(base),
    body,
    labels: [DASHBOARD_LABEL],
  });
  return created.number;
}

/**
 * Find the open dashboard issue (exact title + label) or create it; update the body only when
 * it changed, ignoring the volatile "Last change" footer line (stableBody). Returns the issue
 * number. With several matches the oldest (lowest number) wins.
 * @param {{gh: object, base: string, body: string}} input
 * @returns {Promise<number>}
 */
export async function upsertDashboard(input) {
  const { gh, base, body } = input;
  const match = await openDashboard(gh, base);
  if (!match) return createDashboard({ gh, base, body });
  if (stableBody(match.body) !== stableBody(body)) {
    await gh.updateIssue(match.number, { body });
  }
  return match.number;
}
