// scripts/merge-queue/dashboard.mjs — WP4. Plan §3.6: the per-base dashboard issue.
//
// One issue per base: title contracts.dashboardTitle(base), label contracts.DASHBOARD_LABEL.
// Body regenerated each tick: ordered queue, in-flight candidate (run link), pause banner,
// last 20 history events, metrics.
//
// Every attacker-influenced string (PR titles, event details, eligibility details) goes through
// escapeMarkdown: no markdown links, no HTML, no table breaks, no @mentions, no autolinks.
// Authors are printed without "@" so a dashboard refresh never notifies anyone.

import { DASHBOARD_LABEL, dashboardTitle, isSha } from "./contracts.mjs";

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
 * fill the gaps. In shadow mode (no "landed" event in the window) "would-land" events are used.
 * @param {QueueState} state
 * @param {string} now ISO
 * @returns {{landedPrs: number, ciRunsPerMergedPr: number|null, redBatches: number,
 *            bisections: number, medianLabelToMergeMinutes: number|null,
 *            p90LabelToMergeMinutes: number|null}}
 */
export function computeMetrics(state, now) {
  void now; // the window is the persisted history; no clock-dependent metric
  const counters = state?.counters ?? {};
  const landedPrs = counters.landedPrs ?? 0;
  const history = Array.isArray(state?.history) ? state.history : [];
  const landType = history.some((e) => e.type === "landed") ? "landed" : "would-land";
  const fallback = knownApprovals(state);
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
  };
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

function renderPause(paused) {
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
  } else {
    parts.push("> Resume with `npm run queue -- resume <base>` once the cause is fixed.");
  }
  return parts.join("\n");
}

function renderInFlight(f, link, now) {
  if (!f) return ["_Nothing in flight._"];
  const age = formatDuration(minutesBetween(f.startedAt, now));
  const lines = [
    `- **${f.kind === "base-check" ? "Base check" : "Batch"}** ${code(f.batchId)} — stage ` +
      `${code(f.stage)}, started ${formatTime(f.startedAt)} (${age} ago), ` +
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

function renderQueue(queue, link) {
  const ordered = orderQueue(queue);
  if (!ordered.length) return ["_No PR carries the queue label._"];
  const lines = ["| # | PR | Author | Approved | Status |", "| --- | --- | --- | --- | --- |"];
  ordered.forEach((e, i) => {
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

function renderEvents(history, link) {
  const recent = (history ?? []).slice(-RECENT_EVENTS).reverse();
  if (!recent.length) return ["_No events yet._"];
  const lines = [
    "| Time (UTC) | Event | Batch | PRs | Detail |",
    "| --- | --- | --- | --- | --- |",
  ];
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

function renderMetrics(m) {
  const value = (v) => (v === null || v === undefined ? "—" : String(v));
  return [
    "| Metric | Value |",
    "| --- | --- |",
    `| PRs landed | ${m.landedPrs} |`,
    `| CI runs per merged PR | ${value(m.ciRunsPerMergedPr)} |`,
    `| Red batches | ${m.redBatches} |`,
    `| Bisections | ${m.bisections} |`,
    `| Approval → merge, median | ${formatDuration(m.medianLabelToMergeMinutes)} |`,
    `| Approval → merge, p90 | ${formatDuration(m.p90LabelToMergeMinutes)} |`,
  ];
}

/**
 * Markdown body. Deterministic for a given input (no clock reads besides `now`). Escapes PR
 * titles (attacker-controlled) so they cannot inject markdown links, mentions or HTML.
 * @param {{base: string, state: QueueState, queue: QueueEntry[], config: QueueConfig,
 *          now: string, runUrl: string|null, repository?: string}} input
 *   repository = "owner/repo", used to build PR / commit-checks links (plain text when absent)
 * @returns {string}
 */
export function renderDashboard(input) {
  const { base, state, queue, config, now, repository } = input;
  const runUrl = safeUrl(input.runUrl);
  const link = links(repository);
  const shadow = config?.mode !== "live";
  const out = [
    `## 🚦 omni-queue — ${code(base)}`,
    "",
    shadow
      ? "**Mode: shadow** — candidates are composed and tested, nothing lands (would-land only)."
      : "**Mode: live** — green candidates land on the base.",
    "",
    `Landing ${code(config?.landing?.mode ?? "?")} · batch ≤ ${config?.batch?.maxSize ?? "?"} · ` +
      `label ${code(config?.label ?? "?")} · updated ${formatTime(now)}` +
      (runUrl ? ` · [last run](${runUrl})` : ""),
    "",
  ];
  if (state?.paused) out.push(renderPause(state.paused), "");
  out.push("### In flight", "", ...renderInFlight(state?.inFlight, link, now), "");
  const entries = queue ?? [];
  const eligible = entries.filter((e) => e.eligible).length;
  out.push(
    `### Queue (${entries.length} labeled, ${eligible} eligible)`,
    "",
    ...renderQueue(entries, link),
    ""
  );
  out.push(
    `### Recent events (last ${RECENT_EVENTS})`,
    "",
    ...renderEvents(state?.history, link),
    ""
  );
  out.push("### Metrics", "", ...renderMetrics(computeMetrics(state, now)), "");
  out.push("<sub>Generated by omni-queue on every tick. Manual edits are overwritten.</sub>", "");
  return out.join("\n");
}

/**
 * Find the open dashboard issue (exact title + label) or create it; update the body only when
 * it changed. Returns the issue number. With several matches the oldest (lowest number) wins.
 * @param {{gh: object, base: string, body: string}} input
 * @returns {Promise<number>}
 */
export async function upsertDashboard(input) {
  const { gh, base, body } = input;
  const title = dashboardTitle(base);
  const issues = await gh.listIssues({ labels: [DASHBOARD_LABEL], state: "open" });
  const match = issues
    .filter((i) => i.title === title && i.labels.includes(DASHBOARD_LABEL))
    .sort((a, b) => a.number - b.number)[0];
  if (!match) {
    const created = await gh.createIssue({ title, body, labels: [DASHBOARD_LABEL] });
    return created.number;
  }
  const normalize = (s) => String(s ?? "").replace(/\r\n/g, "\n");
  if (normalize(match.body) !== normalize(body)) {
    await gh.updateIssue(match.number, { body });
  }
  return match.number;
}
