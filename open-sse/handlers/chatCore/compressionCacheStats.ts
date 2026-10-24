/**
 * chatCore compression cache-stats hook (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's request-setup compression path: when a prompt was compressed,
 * record the caching-context cache-stats receipt (estimated cache hit + tokens saved). Best-effort,
 * fire-and-forget — the inner work is an un-awaited IIFE that swallows its own errors and never
 * affects the request. Behaviour is byte-identical to the previous inline block.
 */

import type { ConnectionCacheOverride } from "../../utils/cacheControlPolicy.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

export const COMPRESSION_CACHE_AUTOMATIC_PREFIX_ESTIMATE_FLAG =
  "COMPRESSION_CACHE_AUTOMATIC_PREFIX_ESTIMATE";

/** Default-off flag read at the decision point; any resolution error keeps the old behavior. */
async function automaticPrefixEstimateEnabled(): Promise<boolean> {
  try {
    const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
    return isFeatureFlagEnabled(COMPRESSION_CACHE_AUTOMATIC_PREFIX_ESTIMATE_FLAG);
  } catch {
    return false;
  }
}

export function recordCompressionCacheStats(args: {
  compressionInputBody: unknown;
  provider: string | null | undefined;
  targetFormat: string | null | undefined;
  effectiveModel: string | null | undefined;
  mode: string;
  stats: { originalTokens: number; compressedTokens: number };
  connectionCacheOverride?: ConnectionCacheOverride | null;
  log?: LoggerLike;
}): void {
  void (async () => {
    try {
      const { detectCachingContext } = await import("../../services/compression/cachingAware.ts");
      const { recordCacheStats } = await import("@/lib/db/compressionCacheStats");
      const cacheContext = detectCachingContext(args.compressionInputBody, {
        provider: args.provider,
        targetFormat: args.targetFormat,
        model: args.effectiveModel,
        connectionCacheOverride: args.connectionCacheOverride ?? null,
      });
      const tokensSavedCompression = Math.max(
        0,
        args.stats.originalTokens - args.stats.compressedTokens
      );
      recordCacheStats({
        provider: cacheContext.provider ?? args.provider ?? "unknown",
        model: args.effectiveModel ?? "",
        compressionMode: args.mode,
        cacheControlPresent: cacheContext.hasCacheControl,
        // Default: a hit is estimated only for an explicit cache_control marker sent to a
        // caching provider. With COMPRESSION_CACHE_AUTOMATIC_PREFIX_ESTIMATE on, automatic-prefix
        // providers (OpenAI, Codex, Azure) also count on every request: that is a cache-ELIGIBILITY
        // estimate, not an observed hit, so their reported hit rate trends toward 100%.
        estimatedCacheHit:
          (cacheContext.hasCacheControl && cacheContext.isCachingProvider) ||
          (cacheContext.usesAutomaticPrefixCaching && (await automaticPrefixEstimateEnabled())),
        tokensSavedCompression,
        tokensSavedCaching: 0,
        netSavings: tokensSavedCompression,
      });
    } catch (err) {
      args.log?.debug?.(
        "COMPRESSION",
        "Compression cache stats write skipped: " +
          (err instanceof Error ? err.message : String(err))
      );
    }
  })();
}
