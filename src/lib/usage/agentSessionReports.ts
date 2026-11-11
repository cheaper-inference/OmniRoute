/**
 * Team reports for the management dashboard: usage, tokens and cost of coding-agent sessions,
 * rolled up by member (API key), project, client, provider, model, account, day, git branch,
 * error code, service tier and billing team.
 *
 * Cost is computed at read time from request slices. Requests that stored a provider-reported
 * cost (usage_history.provider_cost_usd) are billed that cost, as usage analytics bills them:
 * their tokens are shown but never priced again, and they are never unpriced. The other requests
 * are priced from the catalog on each slice's summed tokens. That equals the sum of per-request
 * prices for per-token rates; a rate chosen by one request's size (a long-context tier) is
 * chosen by the slice's summed input instead.
 *
 * The summary and the per-session rows are built from the filter's cached scan
 * (agentSessionReportScan) and kept on it, so paging and sorting the sessions list, and the matrix
 * and trends views of the same filter, do not read or price the window again.
 */

import { getDbInstance } from "@/lib/db/core";
import type { SqliteAdapter } from "@/lib/db/adapters/types";
import {
  getAgentSessionMetadataByIds,
  type AgentSessionReportFilter,
  type AgentSessionReportMetadata,
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
import {
  getReportScan,
  listPricedSlices,
  REPORT_BREAKDOWN_DIMENSIONS,
  SLICE_IDENTITY,
  type PricedSlice,
  type ReportBreakdownDimension,
  type ReportScan,
  type SliceIdentity,
} from "./agentSessionReportScan";
import { calculateCostDetailed } from "./costCalculator";

export type { AgentSessionReportFilter, SessionRequestsPage };
export {
  REPORT_BREAKDOWN_DIMENSIONS,
  REPORT_DIMENSIONS,
  type ReportBreakdownDimension,
  type ReportDimension,
} from "./agentSessionReportScan";

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
  /**
   * Display name when one is known (API key name, account label, team name); null means "use the
   * key".
   */
  label: string | null;
  /** Secondary text: project repo, or the account's provider. */
  detail: string | null;
}

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
  /** Sum over sessions of first-start to last-end, idle gaps capped (agentSessionReportStats). */
  activeMs: number;
  /** Sum of latency_ms. */
  modelMs: number;
}

export type ReportSummaryTotals = ReportTotals & ReportTimeKpis;

export interface AgentSessionReport {
  totals: ReportSummaryTotals;
  /**
   * Rows per dimension. errorCodes has a "" row for the requests without an error code (all
   * successful ones and failures that stored none); filter with outcome=error for failures only.
   */
  breakdowns: Record<ReportBreakdownDimension, ReportBreakdownRow[]>;
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

function breakdownBy(
  dimension: ReportBreakdownDimension,
  slices: readonly PricedSlice[]
): ReportBreakdownRow[] {
  const groups = new Map<string, { identity: SliceIdentity; totals: TotalsAccumulator }>();
  for (const slice of slices) {
    const identity = SLICE_IDENTITY[dimension](slice);
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
  times: readonly AgentSessionTimes[]
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
  const scan = await getReportScan(db, filter);
  // A copy, so the caller cannot change the cached report.
  return structuredClone(await scan.derive("summary", () => computeReport(scan)));
}

/** One dimension's rows, kept on the scan and shared with the summary. */
function scanBreakdown(
  scan: ReportScan,
  dimension: ReportBreakdownDimension
): Promise<ReportBreakdownRow[]> {
  return scan.derive(`breakdown:${dimension}`, () => breakdownBy(dimension, scan.slices));
}

/**
 * The rows of one summary breakdown, from the same cached scan, without the summary's time and
 * latency figures (they need their own reads of the window).
 */
export async function buildReportBreakdown(
  filter: AgentSessionReportFilter,
  dimension: ReportBreakdownDimension,
  db: SqliteAdapter = getDbInstance()
): Promise<ReportBreakdownRow[]> {
  const scan = await getReportScan(db, filter);
  // A copy, so the caller cannot change the cached rows.
  return structuredClone(await scanBreakdown(scan, dimension));
}

async function computeReport(scan: ReportScan): Promise<AgentSessionReport> {
  const accumulator = new TotalsAccumulator();
  for (const slice of scan.slices) accumulator.add(slice);
  const totals = accumulator.toTotals();

  const breakdowns = Object.fromEntries(
    await Promise.all(
      REPORT_BREAKDOWN_DIMENSIONS.map(async (dimension) => [
        dimension,
        await scanBreakdown(scan, dimension),
      ])
    )
  ) as Record<ReportBreakdownDimension, ReportBreakdownRow[]>;

  const kpis = timeKpis(scan.db, scan.filter, totals, scan.sessionTimes());
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
  slices: readonly PricedSlice[],
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

function computeSessionWindows(scan: ReportScan): SessionWindow[] {
  const times = new Map(scan.sessionTimes().map((time) => [time.sessionId, time]));
  return sessionWindows(scan.slices, times);
}

/**
 * Sessions with at least one request matching the filter, with totals over those requests only.
 * Built from the same priced slices as buildAgentSessionReport, so the rows add up to its totals.
 * Session metadata is read for the returned page only.
 */
export async function listAgentSessionReportRows(
  filter: AgentSessionReportFilter = {},
  page: SessionReportPage = {},
  db: SqliteAdapter = getDbInstance()
): Promise<{ sessions: AgentSessionReportRow[]; total: number }> {
  const scan = await getReportScan(db, filter);
  // Per-session totals of the filter, unsorted; every page and sort order of the list reuses them.
  const cached = await scan.derive("sessions", () => computeSessionWindows(scan));
  // The comparator orders every pair (ties go to the unique id), so sorting a copy of the
  // cached rows gives the same order as sorting freshly built ones.
  const windows = [...cached].sort(sessionComparator(page));
  const offset = Math.max(0, page.offset ?? 0);
  const pageWindows = windows.slice(offset, offset + (page.limit ?? SESSION_PAGE_DEFAULT_LIMIT));
  const metadata = getAgentSessionMetadataByIds(
    db,
    pageWindows.map((session) => session.sessionId)
  );
  const sessions = pageWindows.flatMap(({ sessionId, totals, ...window }) => {
    const session = metadata.get(sessionId);
    // tokens is copied so the caller cannot change the cached row.
    return session ? [{ ...session, ...totals, tokens: { ...totals.tokens }, ...window }] : [];
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

/**
 * A session detail request with its cost: the provider-reported cost when it stored one,
 * otherwise priced at read time, like the totals.
 */
export interface PricedSessionRequest extends Omit<AgentSessionReportRequest, "providerCostUsd"> {
  costUsd: number;
  /**
   * false when the request has tokens, no provider-reported cost and its model has no pricing
   * row (not in costUsd).
   */
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

async function priceRequest({
  providerCostUsd,
  ...request
}: AgentSessionReportRequest): Promise<PricedSessionRequest> {
  if (providerCostUsd !== null)
    return { ...request, costUsd: round6(providerCostUsd), priced: true };
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

/** Bounds one sessions or session-requests export; narrower filters export the rest. */
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

/**
 * Up to maxRows of all of a session's requests, newest first, priced like the session detail's
 * requests. total counts all of them.
 */
export async function listAgentSessionRequestsForExport(
  sessionId: string,
  maxRows: number = SESSION_EXPORT_MAX_ROWS,
  db: SqliteAdapter = getDbInstance()
): Promise<{ requests: PricedSessionRequest[]; total: number; truncated: boolean }> {
  const { requests, total } = listAgentSessionRequestsPage(
    db,
    sessionId,
    { limit: maxRows, offset: 0 },
    maxRows
  );
  return {
    requests: await Promise.all(requests.map(priceRequest)),
    total,
    truncated: total > maxRows,
  };
}
