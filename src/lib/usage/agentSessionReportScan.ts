/**
 * One read of a team report filter's window: its usage slices priced at read time, and the
 * per-session time on first use. The summary, the sessions list, the matrix and the trends of a
 * filter are all built from the same scan, so a dashboard page reads and prices its window once.
 *
 * Scans are cached per normalized filter (agentSessionReportCache). Results derived from a scan
 * are kept on it and expire with it, so nothing derived outlives the cache's TTL or survives a
 * recorded request.
 */

import type { SqliteAdapter } from "@/lib/db/adapters/types";
import {
  listAgentSessionUsageSlices,
  type AgentSessionReportFilter,
  type AgentSessionUsageSlice,
  type ReportUsageSums,
} from "@/lib/db/agentSessionReports";
import { listAgentSessionTimes, type AgentSessionTimes } from "@/lib/db/agentSessionReportStats";
import { ReportResultCache } from "./agentSessionReportCache";
import { calculateCostDetailed } from "./costCalculator";

export type PricedSlice = AgentSessionUsageSlice & { costUsd: number; priced: boolean };

/**
 * Cost of a group of requests: their stored cost when they have one (provider-reported, else a
 * non-token catalogue estimate; they are never unpriced), otherwise priced from the catalog on
 * the group's summed tokens.
 */
export async function priceUsage(
  usage: Pick<ReportUsageSums, "provider" | "model" | "serviceTier" | "tokens" | "storedCostUsd">
): Promise<{ costUsd: number; priced: boolean }> {
  if (usage.storedCostUsd !== null) return { costUsd: usage.storedCostUsd, priced: true };
  const { costUsd, priced } = await calculateCostDetailed(
    usage.provider || "",
    usage.model || "",
    usage.tokens,
    { provider: usage.provider, model: usage.model, serviceTier: usage.serviceTier }
  );
  return { costUsd, priced };
}

/** The filter's slices, priced; not cached (the session detail reads one session this way). */
export function listPricedSlices(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter
): Promise<PricedSlice[]> {
  return Promise.all(
    listAgentSessionUsageSlices(db, filter).map(async (slice) => ({
      ...slice,
      ...(await priceUsage(slice)),
    }))
  );
}

/** Dimensions of the original summary breakdowns (the dashboard's breakdown tabs). */
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

/** Every summary breakdown: the original dimensions plus branch, error code, tier and team. */
export const REPORT_BREAKDOWN_DIMENSIONS = [
  ...REPORT_DIMENSIONS,
  "branches",
  "errorCodes",
  "serviceTiers",
  "teams",
] as const;
export type ReportBreakdownDimension = (typeof REPORT_BREAKDOWN_DIMENSIONS)[number];

/** How a slice is named in a breakdown, matrix or trend; key "" is an empty field. */
export interface SliceIdentity {
  key: string;
  /** Display name when one is known (API key name, account label, team name). */
  label: string | null;
  /** Secondary text: project repo, or the account's provider. */
  detail: string | null;
}

/**
 * Each dimension's key is the value its filter takes (with "" for REPORT_FILTER_NONE), so a row
 * drills down by filtering on its key. errorCodes groups requests without an error code (all
 * successful requests, and failures that stored none) under "".
 */
export const SLICE_IDENTITY: Record<
  ReportBreakdownDimension,
  (slice: PricedSlice) => SliceIdentity
> = {
  members: (s) => ({ key: s.apiKeyId ?? "", label: s.apiKeyName, detail: null }),
  projects: (s) => ({ key: s.projectName ?? "", label: null, detail: s.projectRepo }),
  clients: (s) => ({ key: s.client ?? "", label: null, detail: null }),
  providers: (s) => ({ key: s.provider ?? "", label: null, detail: null }),
  models: (s) => ({ key: s.model ?? "", label: null, detail: null }),
  accounts: (s) => ({ key: s.connectionId ?? "", label: s.accountLabel, detail: s.provider }),
  daily: (s) => ({ key: s.day, label: null, detail: null }),
  branches: (s) => ({ key: s.gitBranch ?? "", label: null, detail: null }),
  errorCodes: (s) => ({ key: s.errorCode ?? "", label: null, detail: null }),
  serviceTiers: (s) => ({ key: s.serviceTier, label: null, detail: null }),
  teams: (s) => ({ key: s.billingTeamId ?? "", label: s.billingTeamName, detail: null }),
};

/**
 * Dimensions whose value belongs to the session, so all of a session's requests share one key
 * and its active time falls on that key alone.
 */
export const SESSION_LEVEL_DIMENSIONS: ReadonlySet<ReportBreakdownDimension> = new Set([
  "members",
  "projects",
  "clients",
  "branches",
]);

export class ReportScan {
  private readonly derived = new Map<string, Promise<unknown>>();
  private times: readonly AgentSessionTimes[] | null = null;

  constructor(
    readonly db: SqliteAdapter,
    readonly filter: AgentSessionReportFilter,
    /** Shared by every caller: never mutate. */
    readonly slices: readonly PricedSlice[]
  ) {}

  /** Per-session time over the filter's requests, read on first use. */
  sessionTimes(): readonly AgentSessionTimes[] {
    this.times ??= listAgentSessionTimes(this.db, this.filter);
    return this.times;
  }

  /**
   * compute()'s result, computed once per scan and shared by later calls with the same name.
   * Callers must not mutate it. A failed computation is not kept.
   */
  derive<T>(name: string, compute: () => T | Promise<T>): Promise<T> {
    const cached = this.derived.get(name);
    if (cached) return cached as Promise<T>;
    const value = Promise.resolve().then(compute);
    this.derived.set(name, value);
    value.catch(() => {
      if (this.derived.get(name) === value) this.derived.delete(name);
    });
    return value;
  }
}

const scanCache = new ReportResultCache<ReportScan>();

/** The filter's cached scan, or a new one. */
export function getReportScan(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter
): Promise<ReportScan> {
  return scanCache.get(db, filter, async () => {
    // A copy, so a caller changing its filter object cannot change what the scan reads.
    const own = { ...filter };
    return new ReportScan(db, own, await listPricedSlices(db, own));
  });
}
