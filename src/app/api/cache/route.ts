import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import {
  getCacheStats,
  clearCache,
  invalidateByModel,
  invalidateBySignature,
  invalidateStale,
} from "@/lib/semanticCache";
import { getIdempotencyStats } from "@/lib/idempotencyLayer";
import { getCacheMetrics, getCacheTrend } from "@/lib/db/settings";
import { getCachedSettings } from "@/lib/db/readCache";
import {
  getCacheMetricsMinComputeMs,
  invalidateAnalyticsCachePrefix,
  serveAnalyticsCached,
} from "@/lib/usage/analyticsResponseCache";
import { isTrustedLoopbackInternalServiceRequest } from "@/lib/api/internalServiceAuth";
import { isAuthenticated, isCacheScopedKey } from "@/shared/utils/apiAuth";
import { CACHE_READ_SCOPE, CACHE_WRITE_SCOPE } from "@/shared/constants/managementScopes";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/** Key prefix of the opt-in history entries in the shared analytics response cache. */
const CACHE_METRICS_KEY_PREFIX = "cache-metrics?";

function errorMessage(error: unknown): string {
  return sanitizeErrorMessage(error);
}

export async function GET(req: NextRequest) {
  if (
    !isTrustedLoopbackInternalServiceRequest(req) &&
    !(await isAuthenticated(req)) &&
    !(await isCacheScopedKey(req, CACHE_READ_SCOPE))
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const rawHours = parseInt(searchParams.get("trendHours") || "24", 10);
    const trendHours = Math.min(720, Math.max(1, Number.isNaN(rawHours) ? 24 : rawHours));
    // Opt-in (OMNIROUTE_CACHE_METRICS_MIN_COMPUTE_MS): serve the usage-history
    // part from the shared response cache. Unset = every read is live, as before.
    const historyMinComputeMs = getCacheMetricsMinComputeMs();
    const history =
      historyMinComputeMs === null
        ? null
        : await readCachedHistory(trendHours, historyMinComputeMs);

    const cacheStats = getCacheStats();
    // Promise.all allows concurrent execution; if one rejects, others still resolve,
    // which is safe for this read-only stats endpoint.
    const [idempotencyStats, promptCacheMetrics, trend, settings] = await Promise.all([
      getIdempotencyStats(),
      history ? history.body.promptCache : getCacheMetrics(),
      history ? history.body.trend : getCacheTrend(trendHours),
      getCachedSettings().catch(() => ({})),
    ]);

    const response = NextResponse.json({
      semanticCache: cacheStats,
      promptCache: promptCacheMetrics,
      trend,
      idempotency: idempotencyStats,
      config: {
        semanticCacheEnabled: settings.semanticCacheEnabled !== false,
      },
    });
    // hit/miss describes the cached history part only; fresh counters are always live.
    if (history?.cacheState) response.headers.set("x-analytics-cache", history.cacheState);
    return response;
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (
    !isTrustedLoopbackInternalServiceRequest(req) &&
    !(await isAuthenticated(req)) &&
    !(await isCacheScopedKey(req, CACHE_WRITE_SCOPE))
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const model = searchParams.get("model");
    const signature = searchParams.get("signature");
    const staleMsParam = searchParams.get("staleMs");

    // Enforce mutual exclusivity — only one invalidation mode per request
    const paramCount = [model, signature, staleMsParam].filter(Boolean).length;
    if (paramCount > 1) {
      return NextResponse.json(
        {
          error:
            "Only one invalidation parameter (model, signature, or staleMs) may be provided per request.",
        },
        { status: 400 }
      );
    }

    if (model) {
      const removed = invalidateByModel(model);
      invalidateAnalyticsCachePrefix(CACHE_METRICS_KEY_PREFIX);
      return NextResponse.json({ ok: true, invalidated: removed, scope: "model", model });
    }

    if (signature) {
      const removed = invalidateBySignature(signature);
      invalidateAnalyticsCachePrefix(CACHE_METRICS_KEY_PREFIX);
      return NextResponse.json({ ok: true, invalidated: removed ? 1 : 0, scope: "signature" });
    }

    if (staleMsParam) {
      const maxAgeMs = parseInt(staleMsParam, 10);
      if (Number.isNaN(maxAgeMs) || maxAgeMs <= 0) {
        return NextResponse.json(
          { error: "staleMs must be a positive integer (milliseconds)." },
          { status: 400 }
        );
      }
      const removed = invalidateStale(maxAgeMs);
      invalidateAnalyticsCachePrefix(CACHE_METRICS_KEY_PREFIX);
      return NextResponse.json({ ok: true, invalidated: removed, scope: "stale", maxAgeMs });
    }

    // Full clear
    const cleared = clearCache();
    invalidateAnalyticsCachePrefix(CACHE_METRICS_KEY_PREFIX);
    return NextResponse.json({ ok: true, cleared, scope: "all" });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

/** History part of GET (prompt-cache totals + trend), served through the shared cache. */
async function readCachedHistory(
  trendHours: number,
  minComputeMs: number
): Promise<{ body: { promptCache: unknown; trend: unknown }; cacheState: string | null }> {
  const historyResponse = await serveAnalyticsCached(
    `${CACHE_METRICS_KEY_PREFIX}trendHours=${trendHours}`,
    async () => {
      const [promptCache, trend] = await Promise.all([
        getCacheMetrics(),
        getCacheTrend(trendHours),
      ]);
      return NextResponse.json({ promptCache, trend });
    },
    { minComputeMs }
  );
  return {
    body: (await historyResponse.json()) as { promptCache: unknown; trend: unknown },
    cacheState: historyResponse.headers.get("x-analytics-cache"),
  };
}
