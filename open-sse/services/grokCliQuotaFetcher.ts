/**
 * grokCliQuotaFetcher.ts — Grok Build (`grok-cli`) Live Quota Fetcher (#6844)
 *
 * Replaces the static 864 req/day plan (`src/lib/quota/planRegistry.ts:87-98`)
 * with a live read of xAI's shared weekly credit pool. xAI's Build billing is a
 * single percent-based pool shared across Chat/Imagine/Voice/Build/API, so the
 * local request/token counter cannot see it — this fetcher polls xAI's billing
 * API with the grok-cli OAuth bearer.
 *
 * Primary source (captured from the Grok CLI 1.0.89 wire):
 *
 *   GET https://cli-chat-proxy.grok.com/v1/billing?format=credits
 *     Authorization: Bearer {accessToken}
 *     x-xai-token-auth: xai-grok-cli
 *     x-grok-client-mode: headless          (grok-shell models face)
 *   -> JSON `{ "config": { "creditUsagePercent": 0..100, "currentPeriod": … } }`
 *
 * The CLI reports a present `config` object as a successful read; a missing
 * `creditUsagePercent` (proto3 omit-zero / SuperGrokPro) means 0% used, never
 * a fabricated default. The `x-userid` header (when the connection has a
 * providerSpecificData.userId) scopes the read to the right account — same
 * shape `open-sse/services/usage/grokCli.ts::getGrokCliUsage` already uses.
 *
 * Fallback (legacy, kept for accounts where the JSON read is unavailable):
 * POST https://grok.com/grok_api_v2.GrokBuildBilling/GetGrokCreditsConfig
 * with the same bearer, gRPC-web framed body decoded by grokCliQuotaFrame.ts.
 * Reaching the fallback on a 5xx / network error / unparseable body keeps the
 * reading alive; a definitive 401/403 on the JSON read fails open instead
 * (matching the fail-open convention every sibling fetcher uses: unknown or
 * rejected never disables the connection).
 *
 * Cache: in-memory TTL (60s), same pattern as sibling fetchers.
 *
 * Registration: call registerGrokCliQuotaFetcher() once at server startup.
 */

import { z } from "zod";

import { getGrokBuildModelsHeaders, GROK_BUILD_PROXY_BASE_URL } from "../config/grokBuild.ts";
import {
  registerQuotaCacheInvalidator,
  registerQuotaFetcher,
  type QuotaInfo,
} from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";
import { fetchWithConnectionProxy } from "./connectionProxyFetch.ts";
import { decodeGrokCreditsFrame, type GrokCreditsQuota } from "./grokCliQuotaFrame.ts";

const GROK_CREDITS_CONFIG_URL =
  "https://grok.com/grok_api_v2.GrokBuildBilling/GetGrokCreditsConfig";
const GROK_BUILD_FETCH_TIMEOUT_MS = 8_000;
const GROK_BUILD_MAX_RESPONSE_BYTES = 256 * 1024;

/**
 * Empty gRPC-web request frame: 1-byte compression flag (0x00, uncompressed)
 * + 4-byte big-endian length (0, no message body) — `GetGrokCreditsConfig`
 * takes no arguments, but gRPC-web still requires a request frame. Without
 * one the upstream responds `grpc-status: 13 "Missing request message."`
 * with a 0-byte body (confirmed live against grok.com on 2026-07-20).
 */
const GRPC_WEB_EMPTY_REQUEST_FRAME = Buffer.from([0, 0, 0, 0, 0]);

const CACHE_TTL_MS = 60_000; // 60 seconds

const optionalPercent = z.number().finite().min(0).max(100).optional().nullable().catch(undefined);
const currentPeriodSchema = z
  .object({
    end: z.string().trim().min(1).optional().nullable().catch(undefined),
  })
  .passthrough()
  .optional()
  .nullable()
  .catch(undefined);
const billingConfigSchema = z
  .object({
    creditUsagePercent: optionalPercent,
    currentPeriod: currentPeriodSchema,
  })
  .passthrough();
const billingResponseSchema = z
  .object({
    config: billingConfigSchema.optional().nullable().catch(undefined),
  })
  .passthrough();

export interface GrokCliQuota extends QuotaInfo {
  limitReached: boolean;
}

interface CacheEntry {
  quota: GrokCliQuota;
  fetchedAt: number;
}

const quotaCache = new Map<string, CacheEntry>();

const _cacheCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of quotaCache) {
    if (now - entry.fetchedAt > CACHE_TTL_MS * 5) {
      quotaCache.delete(key);
    }
  }
}, 5 * 60_000);

if (typeof _cacheCleanup === "object" && "unref" in _cacheCleanup) {
  (_cacheCleanup as { unref?: () => void }).unref?.();
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

/**
 * Read the connection's bearer token. Per the #6844 plan this is
 * `connection.credentials.accessToken` — the same field grok-cli.ts:271-272
 * already reads to send `Authorization: Bearer …` for chat requests — NOT a
 * `providerSpecificData` field.
 */
function extractAccessToken(connection?: Record<string, unknown>): string | null {
  const credentials = toRecord(connection?.credentials);
  return typeof credentials.accessToken === "string" && credentials.accessToken.trim().length > 0
    ? credentials.accessToken
    : null;
}

/**
 * The account `userId` that scopes the `/v1/billing` read via the `x-userid`
 * header (mirrors `usage/grokCli.ts::getGrokCliUsage`). Tolerates both the
 * top-level `providerSpecificData` shape the quota preflight passes and the
 * nested `credentials.providerSpecificData` shape the executors use.
 */
function extractUserId(connection?: Record<string, unknown>): string | null {
  const candidates = [
    connection?.providerSpecificData,
    toRecord(connection?.credentials).providerSpecificData,
  ];
  for (const candidate of candidates) {
    const psd = toRecord(candidate);
    if (typeof psd.userId === "string" && psd.userId.trim().length > 0) {
      return psd.userId;
    }
  }
  return null;
}

/**
 * `percentUsed` is the 0-100 scale shared by both sources (the JSON
 * `config.creditUsagePercent` and the gRPC decoder's 0-100 scale, see
 * grokCliQuotaFrame.ts::decodeGrokCreditsFrame). `QuotaInfo.percentUsed`
 * (the field returned to the rest of the quota pipeline) is a 0-1 FRACTION —
 * `quotaPreflight.ts::remainingPercentFrom` computes `(1 - percentUsed) * 100`,
 * so this function rescales back down before returning.
 */
function buildQuota(percentUsed: number, resetAt: string | null): GrokCliQuota {
  const clampedPercent = Math.min(100, Math.max(0, percentUsed));
  const fraction = clampedPercent / 100;
  return {
    used: Math.round(clampedPercent),
    total: 100,
    percentUsed: fraction,
    resetAt,
    limitReached: clampedPercent >= 100,
  };
}

/** Bounded JSON read: fails open (null) on oversize / unparseable bodies. */
async function readBoundedJson<T>(response: Response, schema: z.ZodType<T>): Promise<T | null> {
  const declaredLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > GROK_BUILD_MAX_RESPONSE_BYTES) {
    return null;
  }

  const reader = response.body?.getReader();
  if (!reader) return null;

  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > GROK_BUILD_MAX_RESPONSE_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  try {
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return schema.parse(JSON.parse(new TextDecoder().decode(bytes)));
  } catch {
    return null;
  }
}

type BillingRead =
  | { status: "ok"; percentUsed: number; resetAt: string | null }
  | { status: "auth" }
  | { status: "unavailable" };

/**
 * Primary read: the Grok CLI 1.0.89 JSON billing endpoint
 * (`cli-chat-proxy.grok.com/v1/billing?format=credits`, headless models face).
 */
async function fetchBillingJson(
  connectionId: string,
  accessToken: string,
  userId: string | null
): Promise<BillingRead> {
  try {
    const response = await fetchWithConnectionProxy(
      connectionId,
      `${GROK_BUILD_PROXY_BASE_URL}/billing?format=credits`,
      {
        method: "GET",
        headers: getGrokBuildModelsHeaders({
          token: accessToken,
          ...(userId ? { userId } : {}),
        }),
        redirect: "error",
        signal: AbortSignal.timeout(GROK_BUILD_FETCH_TIMEOUT_MS),
      }
    );
    if (!response) return { status: "unavailable" };
    if (response.status === 401 || response.status === 403) return { status: "auth" };
    if (!response.ok) return { status: "unavailable" };

    const parsed = await readBoundedJson(response, billingResponseSchema);
    // A present `config` object is a successful billing read; a missing one is
    // not usable (the CLI treats the missing-config response as unavailable).
    if (!parsed?.config) return { status: "unavailable" };

    return {
      status: "ok",
      percentUsed: parsed.config.creditUsagePercent ?? 0,
      resetAt: parsed.config.currentPeriod?.end ?? null,
    };
  } catch {
    return { status: "unavailable" };
  }
}

/**
 * Fallback read: the legacy gRPC-web credits endpoint on grok.com, used when
 * the JSON read is unavailable (5xx / network / unparseable) so a transient
 * JSON outage never blanks the quota signal. 401/403 never reach here — the
 * JSON read fails open on them instead.
 */
async function fetchGrokCreditsConfigGrpc(
  connectionId: string,
  accessToken: string
): Promise<GrokCreditsQuota | null> {
  try {
    const response = await fetchWithConnectionProxy(connectionId, GROK_CREDITS_CONFIG_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/grpc-web+proto",
        "X-Grpc-Web": "1",
      },
      body: GRPC_WEB_EMPTY_REQUEST_FRAME,
      signal: AbortSignal.timeout(GROK_BUILD_FETCH_TIMEOUT_MS),
    });
    if (!response || !response.ok) return null;

    return decodeGrokCreditsFrame(Buffer.from(await response.arrayBuffer()));
  } catch {
    return null;
  }
}

/**
 * Fetch current quota for a grok-cli connection.
 *
 * @param connectionId - Connection ID from the DB (used to key the cache)
 * @param connection - Optional connection object with `credentials.accessToken`
 *   and optional `providerSpecificData.userId`
 * @returns GrokCliQuota or null if fetch/parse fails / no credentials (fail-open)
 */
export async function fetchGrokCliQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  const accessToken = extractAccessToken(connection);
  if (!accessToken) {
    return null;
  }

  try {
    await throttleQuotaFetch();

    // Primary: CLI 1.0.89 JSON billing read.
    const primary = await fetchBillingJson(connectionId, accessToken, extractUserId(connection));
    if (primary.status === "auth") {
      // Fail-open: no proactive refreshCredentials() in this PR (see Non-Goals).
      quotaCache.delete(connectionId);
      return null;
    }
    if (primary.status === "ok") {
      const quota = buildQuota(primary.percentUsed, primary.resetAt);
      quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
      return quota;
    }

    // Fallback: legacy gRPC-web credits read.
    const fallback = await fetchGrokCreditsConfigGrpc(connectionId, accessToken);
    if (!fallback) return null;

    const quota = buildQuota(fallback.percentUsed, fallback.resetAt);
    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    return null;
  }
}

/**
 * Force-invalidate the cache for a connection.
 */
export function invalidateGrokCliQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

/**
 * Register the grok-cli quota fetcher with the preflight and monitor systems.
 * Call this once at server startup (in chat.ts, via quotaTrackersBatch.ts).
 */
export function registerGrokCliQuotaFetcher(): void {
  registerQuotaFetcher("grok-cli", fetchGrokCliQuota);
  registerQuotaCacheInvalidator("grok-cli", invalidateGrokCliQuotaCache);
  registerMonitorFetcher("grok-cli", fetchGrokCliQuota);
}
