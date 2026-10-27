import { setImmediate as yieldToEventLoop } from "node:timers/promises";
import {
  listSystemOneProviders,
  systemOneAllowsGenericTokenPricing,
} from "@omniroute/open-sse/config/systemOneRegistry.ts";
import { getDbInstance } from "@/lib/db/core";
import { calculateCostDetailed } from "./costCalculator";

const MAX_NATIVE_PRICE_PAIRS = 1024;
const MAX_NATIVE_PRICE_SQL_BYTES = 128 * 1024;

type NativePricePair = { provider: string; model: string };

function isNativePricePair(value: unknown): value is NativePricePair {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const row = value as Record<string, unknown>;
  if (typeof row.provider !== "string" || typeof row.model !== "string") return false;
  return (
    row.provider.length > 0 &&
    row.provider.length <= 256 &&
    row.model.length > 0 &&
    row.model.length <= 4096 &&
    !row.provider.includes("\0") &&
    !row.model.includes("\0")
  );
}

function quotedSql(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

export interface NativeUsagePricingScope {
  unpricedUsageSql: (prefix?: string) => string;
  retainedGroupSql: (prefix?: string, dateExpression?: string) => string;
  markUnpriced: (provider: string, model: string) => void;
}

/** SQL fragments accept only internal, static column expressions, never request input. */
export function nativeUsageSql(prefix = ""): string {
  return `LOWER(COALESCE(${prefix}endpoint, '')) IN ('/v1/systemone', '/v1/decisions')`;
}

export function restrictedNativeUsageSql(prefix = ""): string {
  const providers = listSystemOneProviders()
    .filter((provider) => !systemOneAllowsGenericTokenPricing(provider))
    .map((provider) => `'${provider.replaceAll("'", "''")}'`)
    .join(", ");
  return `(${nativeUsageSql(prefix)}
    AND LOWER(${prefix}provider) IN (${providers || "NULL"}))`;
}

export function unpricedNativeUsageSql(prefix = "", knownPricePairs: string[] = []): string {
  const known = knownPricePairs.length
    ? `(LOWER(COALESCE(${prefix}provider, '')), LOWER(COALESCE(${prefix}model, ''))) IN (${knownPricePairs.join(", ")})`
    : "0";
  return `(${prefix}provider_cost_usd IS NULL AND ${nativeUsageSql(prefix)}
    AND (${restrictedNativeUsageSql(prefix)} OR ${prefix}tokens_input IS NULL OR ${prefix}tokens_output IS NULL OR NOT (${known})))`;
}

/**
 * The old daily summary cannot encode unknown costs. Retain the entire mixed
 * provider/model/day until its native amounts are known. A retained, raw-complete
 * day can later replace its summary idempotently. Arbitrary backdated imports
 * into already deleted history have no row identities for overlap reconciliation.
 */
export function retainedNativeUsageGroupSql(
  prefix = "",
  dateExpression = `DATE(${prefix}timestamp)`,
  unpricedSql = unpricedNativeUsageSql()
): string {
  return `(LOWER(COALESCE(${prefix}provider, '')), LOWER(COALESCE(${prefix}model, '')), ${dateExpression}) IN (
    SELECT LOWER(COALESCE(provider, '')), LOWER(COALESCE(model, '')), DATE(timestamp)
    FROM usage_history
    WHERE ${unpricedSql}
    GROUP BY LOWER(provider), LOWER(model), DATE(timestamp)
  )`;
}

/** Raw native days stay authoritative until cleanup actually archives them. */
export function rawNativeUsageGroupSql(
  prefix = "",
  dateExpression = `DATE(${prefix}timestamp)`
): string {
  return retainedNativeUsageGroupSql(prefix, dateExpression, nativeUsageSql());
}

/**
 * Local-only, request-scoped tariff coverage. Counts alone do not prove a price.
 * Work and generated SQL are bounded; unscanned/invalid pairs remain unknown.
 */
export async function createNativeUsagePricingScope(): Promise<NativeUsagePricingScope> {
  const pairs = getDbInstance()
    .prepare(
      `SELECT LOWER(provider) AS provider, LOWER(model) AS model
      FROM usage_history
      WHERE ${nativeUsageSql()} AND provider_cost_usd IS NULL
        AND tokens_input IS NOT NULL AND tokens_output IS NOT NULL
        AND NOT ${restrictedNativeUsageSql()}
        AND LENGTH(provider) BETWEEN 1 AND 256 AND LENGTH(model) BETWEEN 1 AND 4096
        AND INSTR(provider, CHAR(0)) = 0 AND INSTR(model, CHAR(0)) = 0
      GROUP BY LOWER(provider), LOWER(model)
      ORDER BY LOWER(provider), LOWER(model)
      LIMIT ${MAX_NATIVE_PRICE_PAIRS}`
    )
    .all()
    .filter(isNativePricePair);
  const knownPricePairs: string[] = [];
  let sqlBytes = 0;
  for (let index = 0; index < pairs.length; index++) {
    const pair = pairs[index];
    const result = await calculateCostDetailed(pair.provider, pair.model, { input: 0, output: 0 });
    if (result.priced && !result.failed) {
      const literal = `(${quotedSql(pair.provider)}, ${quotedSql(pair.model)})`;
      const bytes = Buffer.byteLength(literal, "utf8");
      if (sqlBytes + bytes <= MAX_NATIVE_PRICE_SQL_BYTES) {
        knownPricePairs.push(literal);
        sqlBytes += bytes;
      }
    }
    if ((index + 1) % 64 === 0) await yieldToEventLoop();
  }
  const unpricedUsageSql = (prefix = "") => unpricedNativeUsageSql(prefix, knownPricePairs);
  return {
    unpricedUsageSql,
    retainedGroupSql: (prefix = "", dateExpression = `DATE(${prefix}timestamp)`) =>
      retainedNativeUsageGroupSql(prefix, dateExpression, unpricedUsageSql()),
    markUnpriced: (provider, model) => {
      const literal = `(${quotedSql(provider.toLowerCase())}, ${quotedSql(model.toLowerCase())})`;
      const index = knownPricePairs.indexOf(literal);
      if (index >= 0) knownPricePairs.splice(index, 1);
    },
  };
}

export interface NativeCostCoverage {
  unpricedNativeCount?: number;
  costStatus?: "partial";
}

/** Preserve the ordinary-only wire shape while explicitly labeling a known subtotal. */
export function addUnpricedNativeCoverage(target: NativeCostCoverage, count: number): void {
  if (count <= 0) return;
  target.unpricedNativeCount = (target.unpricedNativeCount || 0) + count;
  target.costStatus = "partial";
}
