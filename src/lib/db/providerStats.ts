import { getDbInstance } from "./core";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";
import { SEARCH_PROVIDERS } from "@omniroute/open-sse/config/searchRegistry.ts";

/**
 * Provider/model call statistics aggregated from `call_logs`.
 *
 * Hard Rule #5: routes must not embed raw SQL — these queries live here so the
 * /api/provider-stats route can delegate. Read-only aggregation; no writes.
 *
 * Both aggregates are bounded to the last 7 days (`PROVIDER_STATS_WINDOW_DAYS`):
 * on a busy instance the unbounded `GROUP BY` over the full call history held
 * the event loop for seconds on every dashboard poll. A provider is kept only
 * while it still has a live connection row, so a deleted connection does not
 * resurface from its retained call_logs rows; keyless providers are the
 * exception, since they never own a connection row.
 */

/** Default lookback of the dashboard aggregates, in days. */
export const PROVIDER_STATS_WINDOW_DAYS = 7;

/** Upper bound of the lookback, in days: a route-level cap, independent of the call_logs retention. */
export const PROVIDER_STATS_MAX_WINDOW_DAYS = 365;

/**
 * Providers with no credentials of their own: their requests run on a shared
 * synthetic connection, so they have no `provider_connections` row to join.
 * Keyless providers come from two registries: no-auth AI cards
 * (`NOAUTH_PROVIDERS`) and search providers with `authType: "none"`
 * (`SEARCH_PROVIDERS`), which are served without credentials.
 */
const KEYLESS_PROVIDER_IDS = JSON.stringify([
  ...Object.keys(NOAUTH_PROVIDERS),
  ...Object.values(SEARCH_PROVIDERS)
    .filter((provider) => provider.authType === "none")
    .map((provider) => provider.id),
]);

/** ISO start of the lookback window ending at `now` (defaults to the current time). */
export function buildProviderStatsSince(
  now: Date = new Date(),
  days: number = PROVIDER_STATS_WINDOW_DAYS
): string {
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
}

export interface ProviderCallStat {
  provider: string;
  nodeName: string | null;
  totalRequests: number;
  successfulRequests: number;
  avgLatencyMs: number | null;
  totalTokensIn: number | null;
  totalTokensOut: number | null;
}

export interface ModelCallStat {
  provider: string;
  nodeName: string | null;
  model: string;
  requests: number;
  avgLatencyMs: number | null;
  successfulRequests: number;
}

/**
 * Predicate shared by both aggregates: a provider is visible while it has a
 * live connection row, or is keyless (no connection row by construction).
 */
const LIVE_PROVIDER_SQL = `c.provider IN (SELECT value FROM json_each(@keylessProviderIds))
     OR EXISTS (SELECT 1 FROM provider_connections pc WHERE pc.provider = c.provider)`;

/**
 * Provider aggregate over the call_logs rows of the lookback window.
 * Exported so the query plan under test is the one the route serves.
 */
export const PROVIDER_CALL_STATS_SQL = `SELECT
  c.provider,
  pn.name AS nodeName,
  COUNT(*) AS totalRequests,
  SUM(CASE WHEN c.status >= 200 AND c.status < 400 THEN 1 ELSE 0 END) AS successfulRequests,
  ROUND(AVG(c.duration)) AS avgLatencyMs,
  SUM(c.tokens_in) AS totalTokensIn,
  SUM(c.tokens_out) AS totalTokensOut
FROM call_logs c
LEFT JOIN provider_nodes pn ON pn.id = c.provider
WHERE c.provider IS NOT NULL AND c.provider != '-'
  AND c.timestamp >= @since
  AND (${LIVE_PROVIDER_SQL})
GROUP BY c.provider
ORDER BY totalRequests DESC`;

/**
 * Model aggregate over the call_logs rows of the lookback window.
 * Exported so the query plan under test is the one the route serves.
 */
export const MODEL_CALL_STATS_SQL = `SELECT
  c.provider,
  pn.name AS nodeName,
  c.model,
  COUNT(*) AS requests,
  ROUND(AVG(c.duration)) AS avgLatencyMs,
  SUM(CASE WHEN c.status >= 200 AND c.status < 400 THEN 1 ELSE 0 END) AS successfulRequests
FROM call_logs c
LEFT JOIN provider_nodes pn ON pn.id = c.provider
WHERE c.provider IS NOT NULL AND c.model IS NOT NULL
  AND c.timestamp >= @since
  AND (${LIVE_PROVIDER_SQL})
GROUP BY c.provider, c.model
ORDER BY c.provider, requests DESC`;

export function getProviderCallStats(since: string): ProviderCallStat[] {
  const db = getDbInstance();
  return db
    .prepare(PROVIDER_CALL_STATS_SQL)
    .all({ since, keylessProviderIds: KEYLESS_PROVIDER_IDS }) as ProviderCallStat[];
}

export function getModelCallStats(since: string): ModelCallStat[] {
  const db = getDbInstance();
  return db
    .prepare(MODEL_CALL_STATS_SQL)
    .all({ since, keylessProviderIds: KEYLESS_PROVIDER_IDS }) as ModelCallStat[];
}
