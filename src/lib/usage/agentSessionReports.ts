/**
 * Team reports for the management dashboard: usage, tokens and cost of coding-agent sessions,
 * rolled up by member (API key), project, provider, model, account and day.
 *
 * Cost is priced from each request slice at read time. Pricing is linear in tokens, so pricing
 * a summed slice equals summing per-request prices (the same approach as usage analytics).
 */

import { getDbInstance } from "@/lib/db/core";
import type { SqliteAdapter } from "@/lib/db/adapters/types";
import {
  getAgentSessionMetadataByIds,
  listAgentSessionUsageSlices,
  type AgentSessionReportFilter,
  type AgentSessionReportMetadata,
  type AgentSessionUsageSlice,
} from "@/lib/db/agentSessionReports";
import {
  getAgentSessionLatencyPercentile,
  listAgentSessionRequestsPage,
  listAgentSessionTimeline,
  listAgentSessionTimes,
  type AgentSessionReportRequest,
  type AgentSessionTimeline,
  type AgentSessionTimes,
  type SessionRequestsPage,
} from "@/lib/db/agentSessionReportStats";
import { calculateCostDetailed } from "./costCalculator";

export type { AgentSessionReportFilter, SessionRequestsPage };

export interface ReportTotals {
  requests: number;
  errors: number;
  unpricedRequests: number;
  costUsd: number;
  /** Same fields and meaning as an agent session's tokens (see AgentSessionRecord). */
  tokens: {
    /** Input including cache reads and writes. */
    input: number;
    output: number;
    cacheRead: number;
    cacheCreation: number;
    reasoning: number;
    /** Input that was neither read from nor written to the prompt cache, clamped at 0. */
    uncachedInput: number;
    /** input + output: cache reads and writes are already part of input. */
    total: number;
  };
  sessions: number;
  members: number;
  projects: number;
  lastSeenAt: string | null;
}

export interface ReportBreakdownRow extends ReportTotals {
  key: string;
  /** Display name when one is known (API key name, account label); null means "use the key". */
  label: string | null;
  /** Secondary text: project repo, or the account's provider. */
  detail: string | null;
}

export const REPORT_DIMENSIONS = [
  "members",
  "projects",
  "clients",
  "providers",
  "models",
  "accounts",
  "daily",
] as const;
export type ReportDimension = (typeof REPORT_DIMENSIONS)[number];

/**
 * Time and latency KPIs over the same requests as the totals. Latency and TTFT averages use only
 * requests with a recorded value (> 0).
 */
export interface ReportTimeKpis {
  /** tokens.cacheRead / tokens.input; null when input is 0. */
  cacheHitRate: number | null;
  /** Mean latency_ms, rounded to whole ms; null without samples. */
  avgLatencyMs: number | null;
  /** Nearest-rank 95th percentile of latency_ms; null without samples. */
  p95LatencyMs: number | null;
  /** Mean ttft_ms, rounded to whole ms (requests without a TTFT store their latency). */
  avgTtftMs: number | null;
  /** costUsd / sessions; null without sessions. */
  costPerSession: number | null;
  /** Sum over sessions of their gaps between requests (each capped) plus last latency. */
  activeMs: number;
  /** Sum of latency_ms. */
  modelMs: number;
}

export type ReportSummaryTotals = ReportTotals & ReportTimeKpis;

export interface AgentSessionReport {
  totals: ReportSummaryTotals;
  breakdowns: Record<ReportDimension, ReportBreakdownRow[]>;
}

/** One session's request totals; same meaning as the matching ReportTotals fields. */
export type SessionReportTotals = Pick<
  ReportTotals,
  "requests" | "errors" | "unpricedRequests" | "costUsd" | "tokens"
>;

/** Session detail totals: costPerSession equals costUsd once the session has a request. */
export type SessionReportDetailTotals = SessionReportTotals &
  ReportTimeKpis & {
    /** Last request time minus first request time. */
    wallMs: number;
  };

/** A sessions-list row: all-time session metadata plus totals of its requests in the window. */
export interface AgentSessionReportRow extends AgentSessionReportMetadata, SessionReportTotals {
  /** First and last request of the session inside the window. */
  windowFirstSeenAt: string;
  windowLastSeenAt: string;
  /** Same meaning as ReportTimeKpis, over this session's requests in the window. */
  activeMs: number;
  modelMs: number;
  /** Model with the most requests in the window; ties go to the higher cost, then the name. */
  mainModel: string | null;
}

export const SESSION_REPORT_SORTS = [
  "lastSeen",
  "firstSeen",
  "requests",
  "tokens",
  "cost",
  "activeTime",
] as const;
export type SessionReportSort = (typeof SESSION_REPORT_SORTS)[number];

export interface SessionReportOrder {
  /** Default lastSeen; lastSeen and firstSeen sort by the window bounds. */
  sort?: SessionReportSort;
  /** Default desc. */
  order?: "asc" | "desc";
}

export interface SessionReportPage extends SessionReportOrder {
  /** Default 20. */
  limit?: number;
  offset?: number;
}

type PricedSlice = AgentSessionUsageSlice & { costUsd: number; priced: boolean };
type RowIdentity = Pick<ReportBreakdownRow, "key" | "label" | "detail">;

const DIMENSION_IDENTITY: Record<ReportDimension, (slice: PricedSlice) => RowIdentity> = {
  members: (s) => ({ key: s.apiKeyId ?? "", label: s.apiKeyName, detail: null }),
  projects: (s) => ({ key: s.projectName ?? "", label: null, detail: s.projectRepo }),
  clients: (s) => ({ key: s.client ?? "", label: null, detail: null }),
  providers: (s) => ({ key: s.provider ?? "", label: null, detail: null }),
  models: (s) => ({ key: s.model ?? "", label: null, detail: null }),
  accounts: (s) => ({ key: s.connectionId ?? "", label: s.accountLabel, detail: s.provider }),
  daily: (s) => ({ key: s.day, label: null, detail: null }),
};

class TotalsAccumulator {
  private requests = 0;
  private errors = 0;
  private unpricedRequests = 0;
  private costUsd = 0;
  private tokens = { input: 0, output: 0, cacheRead: 0, cacheCreation: 0, reasoning: 0 };
  private sessions = new Set<string>();
  private members = new Set<string>();
  private projects = new Set<string>();
  private lastSeenAt: string | null = null;

  add(slice: PricedSlice): void {
    this.requests += slice.requests;
    this.errors += slice.errors;
    if (!slice.priced) this.unpricedRequests += slice.requestsWithTokens;
    this.costUsd += slice.costUsd;
    for (const field of Object.keys(this.tokens) as Array<keyof typeof this.tokens>) {
      this.tokens[field] += slice.tokens[field];
    }
    this.sessions.add(slice.sessionId);
    this.members.add(slice.apiKeyId ?? "");
    this.projects.add(slice.projectName ?? "");
    if (!this.lastSeenAt || slice.lastSeenAt > this.lastSeenAt) this.lastSeenAt = slice.lastSeenAt;
  }

  toTotals(): ReportTotals {
    // Stored input already includes cache reads and writes, so the uncached part is a plain
    // difference and adding the cache counters again double counts. Requests recorded before the
    // usage extractor fix (#14878) by some non-streaming Claude-format providers stored input
    // without its cached part; they may under-report input and are not guessed at.
    const { input, output, cacheRead, cacheCreation } = this.tokens;
    return {
      requests: this.requests,
      errors: this.errors,
      unpricedRequests: this.unpricedRequests,
      costUsd: Number(this.costUsd.toFixed(6)),
      tokens: {
        ...this.tokens,
        uncachedInput: Math.max(0, input - cacheRead - cacheCreation),
        total: input + output,
      },
      sessions: this.sessions.size,
      members: this.members.size,
      projects: this.projects.size,
      lastSeenAt: this.lastSeenAt,
    };
  }
}

async function priceSlice(slice: AgentSessionUsageSlice): Promise<PricedSlice> {
  const { costUsd, priced } = await calculateCostDetailed(
    slice.provider || "",
    slice.model || "",
    slice.tokens,
    { provider: slice.provider, model: slice.model, serviceTier: slice.serviceTier }
  );
  return { ...slice, costUsd, priced };
}

function breakdownBy(dimension: ReportDimension, slices: PricedSlice[]): ReportBreakdownRow[] {
  const groups = new Map<string, { identity: RowIdentity; totals: TotalsAccumulator }>();
  for (const slice of slices) {
    const identity = DIMENSION_IDENTITY[dimension](slice);
    let group = groups.get(identity.key);
    if (!group) {
      group = { identity, totals: new TotalsAccumulator() };
      groups.set(identity.key, group);
    }
    group.totals.add(slice);
  }
  const rows = [...groups.values()].map(({ identity, totals }) => ({
    ...identity,
    ...totals.toTotals(),
  }));
  if (dimension === "daily") return rows.sort((a, b) => a.key.localeCompare(b.key));
  return rows.sort((a, b) => b.costUsd - a.costUsd || b.tokens.total - a.tokens.total);
}

function listPricedSlices(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter
): Promise<PricedSlice[]> {
  return Promise.all(listAgentSessionUsageSlices(db, filter).map(priceSlice));
}

function sessionTotals(totals: ReportTotals): SessionReportTotals {
  const { requests, errors, unpricedRequests, costUsd, tokens } = totals;
  return { requests, errors, unpricedRequests, costUsd, tokens };
}

const LATENCY_PERCENTILE = 95;

function round6(value: number): number {
  return Number(value.toFixed(6));
}

/** KPIs over the filtered requests; `times` are their per-session figures. */
function timeKpis(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter,
  totals: ReportTotals,
  times: AgentSessionTimes[]
): ReportTimeKpis {
  let activeMs = 0;
  let modelMs = 0;
  let latencySamples = 0;
  let ttftSamples = 0;
  let ttftMsSum = 0;
  for (const session of times) {
    activeMs += session.activeMs;
    modelMs += session.modelMs;
    latencySamples += session.latencySamples;
    ttftSamples += session.ttftSamples;
    ttftMsSum += session.ttftMsSum;
  }
  const { input, cacheRead } = totals.tokens;
  return {
    cacheHitRate: input > 0 ? round6(cacheRead / input) : null,
    // Latencies are clamped at 0, so modelMs is also the sum of the positive samples.
    avgLatencyMs: latencySamples > 0 ? Math.round(modelMs / latencySamples) : null,
    p95LatencyMs:
      latencySamples > 0 ? getAgentSessionLatencyPercentile(db, filter, LATENCY_PERCENTILE) : null,
    avgTtftMs: ttftSamples > 0 ? Math.round(ttftMsSum / ttftSamples) : null,
    costPerSession: totals.sessions > 0 ? round6(totals.costUsd / totals.sessions) : null,
    activeMs,
    modelMs,
  };
}

export async function buildAgentSessionReport(
  filter: AgentSessionReportFilter = {},
  db: SqliteAdapter = getDbInstance()
): Promise<AgentSessionReport> {
  const slices = await listPricedSlices(db, filter);
  const accumulator = new TotalsAccumulator();
  for (const slice of slices) accumulator.add(slice);
  const totals = accumulator.toTotals();

  const breakdowns = Object.fromEntries(
    REPORT_DIMENSIONS.map((dimension) => [dimension, breakdownBy(dimension, slices)])
  ) as Record<ReportDimension, ReportBreakdownRow[]>;

  const kpis = timeKpis(db, filter, totals, listAgentSessionTimes(db, filter));
  return { totals: { ...totals, ...kpis }, breakdowns };
}

interface SessionWindow {
  sessionId: string;
  totals: SessionReportTotals;
  windowFirstSeenAt: string;
  windowLastSeenAt: string;
  activeMs: number;
  modelMs: number;
  mainModel: string | null;
}

interface ModelUse {
  requests: number;
  costUsd: number;
}

/** Most requests first; ties go to the higher cost, then the name in code-point order. */
function compareModelUse([nameA, a]: [string, ModelUse], [nameB, b]: [string, ModelUse]): number {
  return b.requests - a.requests || b.costUsd - a.costUsd || compareValues(nameA, nameB);
}

/** The session's main model; null when that is the requests without a model. */
function mainModelOf(models: Map<string, ModelUse>): string | null {
  let best: [string, ModelUse] | null = null;
  for (const entry of models) {
    if (!best || compareModelUse(entry, best) < 0) best = entry;
  }
  return best?.[0] || null;
}

function sessionWindows(
  slices: PricedSlice[],
  times: ReadonlyMap<string, AgentSessionTimes>
): SessionWindow[] {
  const groups = new Map<
    string,
    { totals: TotalsAccumulator; first: string; last: string; models: Map<string, ModelUse> }
  >();
  for (const slice of slices) {
    let group = groups.get(slice.sessionId);
    if (!group) {
      group = {
        totals: new TotalsAccumulator(),
        first: slice.firstSeenAt,
        last: slice.lastSeenAt,
        models: new Map(),
      };
      groups.set(slice.sessionId, group);
    }
    group.totals.add(slice);
    if (slice.firstSeenAt < group.first) group.first = slice.firstSeenAt;
    if (slice.lastSeenAt > group.last) group.last = slice.lastSeenAt;
    const model = slice.model ?? "";
    const use = group.models.get(model) ?? { requests: 0, costUsd: 0 };
    use.requests += slice.requests;
    use.costUsd += slice.costUsd;
    group.models.set(model, use);
  }
  return [...groups].map(([sessionId, { totals, first, last, models }]) => ({
    sessionId,
    totals: sessionTotals(totals.toTotals()),
    windowFirstSeenAt: first,
    windowLastSeenAt: last,
    activeMs: times.get(sessionId)?.activeMs ?? 0,
    modelMs: times.get(sessionId)?.modelMs ?? 0,
    mainModel: mainModelOf(models),
  }));
}

const SORT_VALUES: Record<SessionReportSort, (session: SessionWindow) => string | number> = {
  lastSeen: (s) => s.windowLastSeenAt,
  firstSeen: (s) => s.windowFirstSeenAt,
  requests: (s) => s.totals.requests,
  tokens: (s) => s.totals.tokens.total,
  cost: (s) => s.totals.costUsd,
  activeTime: (s) => s.activeMs,
};

function compareValues(a: string | number, b: string | number): number {
  if (a < b) return -1;
  return a > b ? 1 : 0;
}

function sessionComparator(order: SessionReportOrder) {
  const value = SORT_VALUES[order.sort ?? "lastSeen"];
  const direction = order.order === "asc" ? 1 : -1;
  // Ties fall back to id descending, the order the stored session list used.
  return (a: SessionWindow, b: SessionWindow) =>
    direction * compareValues(value(a), value(b)) || compareValues(b.sessionId, a.sessionId);
}

const SESSION_PAGE_DEFAULT_LIMIT = 20;

/**
 * Sessions with at least one request matching the filter, with totals over those requests only.
 * Built from the same priced slices as buildAgentSessionReport, so the rows add up to its totals.
 */
export async function listAgentSessionReportRows(
  filter: AgentSessionReportFilter = {},
  page: SessionReportPage = {},
  db: SqliteAdapter = getDbInstance()
): Promise<{ sessions: AgentSessionReportRow[]; total: number }> {
  const slices = await listPricedSlices(db, filter);
  const times = new Map(listAgentSessionTimes(db, filter).map((time) => [time.sessionId, time]));
  const windows = sessionWindows(slices, times).sort(sessionComparator(page));
  const offset = Math.max(0, page.offset ?? 0);
  const pageWindows = windows.slice(offset, offset + (page.limit ?? SESSION_PAGE_DEFAULT_LIMIT));
  const metadata = getAgentSessionMetadataByIds(
    db,
    pageWindows.map((session) => session.sessionId)
  );
  const sessions = pageWindows.flatMap(({ sessionId, totals, ...window }) => {
    const session = metadata.get(sessionId);
    return session ? [{ ...session, ...totals, ...window }] : [];
  });
  return { sessions, total: windows.length };
}

/** All-time totals and time of one session, priced at read time like the list rows. */
export async function getAgentSessionReportTotals(
  sessionId: string,
  db: SqliteAdapter = getDbInstance()
): Promise<SessionReportDetailTotals> {
  const filter: AgentSessionReportFilter = { sessionId };
  const accumulator = new TotalsAccumulator();
  for (const slice of await listPricedSlices(db, filter)) accumulator.add(slice);
  const totals = accumulator.toTotals();
  const times = listAgentSessionTimes(db, filter);
  const wallMs = times[0] ? Date.parse(times[0].lastSeenAt) - Date.parse(times[0].firstSeenAt) : 0;
  return {
    ...sessionTotals(totals),
    ...timeKpis(db, filter, totals, times),
    wallMs: Number.isFinite(wallMs) ? wallMs : 0,
  };
}

/** A session detail request with its cost priced at read time, like the totals. */
export interface PricedSessionRequest extends AgentSessionReportRequest {
  costUsd: number;
  /** false when the request has tokens but its model has no pricing row (not in costUsd). */
  priced: boolean;
}

export interface AgentSessionReportDetail {
  /** One page of the session's requests, newest first. */
  recentRequests: PricedSessionRequest[];
  /** All of the session's requests, across pages. */
  requestsTotal: number;
  totals: SessionReportDetailTotals;
  timeline: AgentSessionTimeline;
}

async function priceRequest(request: AgentSessionReportRequest): Promise<PricedSessionRequest> {
  const { input, output, cacheRead, cacheCreation, reasoning } = request.tokens;
  const { costUsd, priced } = await calculateCostDetailed(
    request.provider || "",
    request.model || "",
    { input, output, cacheRead, cacheCreation, reasoning },
    { provider: request.provider, model: request.model, serviceTier: request.serviceTier }
  );
  // Same rule as unpricedRequests: a request without tokens is never unpriced.
  const hasTokens = input + output + cacheRead + cacheCreation > 0;
  return { ...request, costUsd: round6(costUsd), priced: priced || !hasTokens };
}

/** Session detail: one page of requests, all-time totals and the timeline. */
export async function getAgentSessionReportDetail(
  sessionId: string,
  page: SessionRequestsPage = {},
  db: SqliteAdapter = getDbInstance()
): Promise<AgentSessionReportDetail> {
  const { requests, total } = listAgentSessionRequestsPage(db, sessionId, page);
  const [recentRequests, totals] = await Promise.all([
    Promise.all(requests.map(priceRequest)),
    getAgentSessionReportTotals(sessionId, db),
  ]);
  return {
    recentRequests,
    requestsTotal: total,
    totals,
    timeline: listAgentSessionTimeline(db, sessionId),
  };
}

/** Bounds one CSV download; narrower filters export the rest. */
export const SESSION_EXPORT_MAX_ROWS = 10_000;

export async function listAgentSessionsForExport(
  filter: AgentSessionReportFilter,
  order: SessionReportOrder = {},
  maxRows: number = SESSION_EXPORT_MAX_ROWS,
  db: SqliteAdapter = getDbInstance()
): Promise<{ sessions: AgentSessionReportRow[]; total: number; truncated: boolean }> {
  const { sessions, total } = await listAgentSessionReportRows(
    filter,
    { ...order, limit: maxRows, offset: 0 },
    db
  );
  return { sessions, total, truncated: total > maxRows };
}

// Leading =, +, -, @, tab or CR make spreadsheets evaluate a cell as a formula; project and
// key names come from client headers, so they are untrusted.
const FORMULA_PREFIX = /^[=+\-@\t\r]/;

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let text = String(value);
  if (typeof value === "string" && FORMULA_PREFIX.test(text)) text = `'${text}`;
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(header: string[], rows: unknown[][]): string {
  return [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}

export function breakdownToCsv(rows: ReportBreakdownRow[]): string {
  return toCsv(
    [
      "key",
      "label",
      "detail",
      "sessions",
      "members",
      "projects",
      "requests",
      "errors",
      "tokens_input",
      "tokens_output",
      "tokens_cache_read",
      "tokens_cache_creation",
      "tokens_reasoning",
      "tokens_total",
      "cost_usd",
      "unpriced_requests",
      "last_seen_at",
    ],
    rows.map((r) => [
      r.key,
      r.label,
      r.detail,
      r.sessions,
      r.members,
      r.projects,
      r.requests,
      r.errors,
      r.tokens.input,
      r.tokens.output,
      r.tokens.cacheRead,
      r.tokens.cacheCreation,
      r.tokens.reasoning,
      r.tokens.total,
      r.costUsd,
      r.unpricedRequests,
      r.lastSeenAt,
    ])
  );
}

export function sessionsToCsv(sessions: AgentSessionReportRow[]): string {
  return toCsv(
    [
      "session_id",
      "api_key_id",
      "api_key_name",
      "client",
      "project_name",
      "project_repo",
      "project_path",
      "git_branch",
      "requests",
      "errors",
      "tokens_total",
      "cost_usd",
      "unpriced_requests",
      "window_first_seen_at",
      "window_last_seen_at",
      "first_seen_at",
      "last_seen_at",
    ],
    sessions.map((s) => [
      s.id,
      s.apiKeyId,
      s.apiKeyName,
      s.client,
      s.projectName,
      s.projectRepo,
      s.projectPath,
      s.gitBranch,
      s.requests,
      s.errors,
      s.tokens.total,
      s.costUsd,
      s.unpricedRequests,
      s.windowFirstSeenAt,
      s.windowLastSeenAt,
      s.firstSeenAt,
      s.lastSeenAt,
    ])
  );
}
