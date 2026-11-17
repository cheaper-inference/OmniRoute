/**
 * sensenovaQuotaFetcher.ts - SenseNova (日日新) Token Plan quota fetcher.
 *
 * The Token Plan quota is only exposed by the console gateway. The inference API
 * key is rejected there with `Authentication type 'apikey' is not enabled`, so
 * this fetcher authenticates with the console session instead.
 *
 * Session model: the console login (OAuth2 authorization code + PKCE) issues an
 * access token with a three hour TTL plus a rotating refresh token. This module
 * stores the refresh token on the connection, exchanges it for a fresh access
 * token when the cached one is gone or stale, writes the rotated refresh token
 * back, and keeps the short-lived access token plus its expiry alongside it.

 *
 * Quota endpoint:
 *   GET https://platform.sensenova.cn/lite/console/v1/tokenplan/pool-usage
 *   {
 *     "plan": { "id": "free", "name": "Free Plan" },
 *     "pools": [{
 *       "name": "通用积分池",
 *       "model_ids": ["..."],
 *       "pool_type": "default" | "dedicated",
 *       "window_5h": { "limit": "120000", "used": "0", "remaining": "120000", "reset_at": "1794851140" },
 *       "window_7d": { "limit": "1200000", "used": "0", "remaining": "1200000", "reset_at": "1794883540" }
 *     }]
 *   }
 * Numbers arrive as decimal strings and reset_at as unix seconds. Accounts can
 * expose several pools (one default, plus per-model dedicated pools); the default
 * pool carries the account-level allowance, so that is what the snapshot reports.
 *
 * Registration: registerSensenovaQuotaFetcher() at startup, plus
 * registerSensenovaFetchersForNodes() for OpenAI-compatible custom nodes whose
 * base URL points at token.sensenova.cn (the accounts usually live there, under a
 * node id rather than the built-in provider id).
 */

import {
  registerQuotaCacheInvalidator,
  registerQuotaFetcher,
  registerQuotaWindows,
  type QuotaInfo,
  type QuotaWindowInfo,
} from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";
import { fetchWithConnectionProxy } from "./connectionProxyFetch.ts";
import { toNumber } from "../utils/numeric.ts";
import { parseSensenovaOrigin } from "./usage/sensenovaTokenPlan.ts";

export const SENSENOVA_POOL_USAGE_URL =
  "https://platform.sensenova.cn/lite/console/v1/tokenplan/pool-usage";
export const SENSENOVA_TOKEN_URL = "https://signin.sensecore.cn/oauth2/token";
export const SENSENOVA_CLIENT_ID = "nova";

export const SENSENOVA_PSD_REFRESH_TOKEN = "sensenovaRefreshToken";
export const SENSENOVA_PSD_ACCESS_TOKEN = "sensenovaAccessToken";
export const SENSENOVA_PSD_ACCESS_EXPIRES_AT = "sensenovaAccessTokenExpiresAt";

const CACHE_TTL_MS = 60_000;
// A rejected credential is usually fixed by an operator within seconds, so the
// next attempt should not wait long. A console or network failure is different:
// retrying it every few seconds would pile load onto a dependency that is already
// struggling, so it backs off further.
const AUTH_NEGATIVE_TTL_MS = 5_000;
const TRANSIENT_NEGATIVE_TTL_MS = 30_000;
const MAX_CACHE_ENTRIES = 512;
const EXPIRY_MARGIN_MS = 120_000;
const REQUEST_TIMEOUT_MS = 10_000;
const DEFAULT_ACCESS_TTL_SECONDS = 10_800;

export interface SensenovaWindowPayload {
  limit?: string | number;
  used?: string | number;
  remaining?: string | number;
  reset_at?: string | number;
}

export interface SensenovaPoolPayload {
  id?: string;
  name?: string;
  model_ids?: string[];
  pool_type?: string;
  window_5h?: SensenovaWindowPayload;
  window_7d?: SensenovaWindowPayload;
}

export interface SensenovaPoolUsagePayload {
  plan?: { id?: string; name?: string; type?: string };
  pools?: SensenovaPoolPayload[] | Record<string, SensenovaPoolPayload>;
}

interface CacheEntry {
  quota: QuotaInfo | null;
  fetchedAt: number;
  /** Why the entry is empty: a rejected credential clears sooner than an outage. */
  reason?: "auth" | "transient";
}

const quotaCache = new Map<string, CacheEntry>();
const inflightRefresh = new Map<
  string,
  { refreshToken: string; promise: Promise<SensenovaSession | null> }
>();
/** Newest refresh token per connection, kept in memory because a rotation is not
 * always writable to the row (locked database, read-only replica). Bounded like
 * the quota cache so a long-lived process does not retain every credential. */
const latestRefreshTokens = new Map<string, string>();
/** Bumped whenever a connection's credential is invalidated. A fetch or exchange
 * that started before the bump must not publish its result: the credential it
 * used has been replaced in the meantime. */
const invalidationSeq = new Map<string, number>();
/** Access tokens this process obtained but could not write to the row (locked or
 * read-only database). Kept apart from the connection object on purpose: the CAS
 * fence compares that object, so writing these into it would make every later
 * attempt look stale. */
const memoryAccessTokens = new Map<string, { token: string; expiresAt: number }>();

/** Bounded, least-recently-written eviction shared by the process-local maps. */
function rememberIn<V>(map: Map<string, V>, key: string, value: V): void {
  if (map.has(key)) {
    map.delete(key);
  } else if (map.size >= MAX_CACHE_ENTRIES) {
    const oldest = map.keys().next().value;
    if (oldest !== undefined) map.delete(oldest);
  }
  map.set(key, value);
}

function rememberAccessToken(connectionId: string, token: string, expiresAt: number): void {
  // One entry per connection, never evicted: dropping a rotation that only exists
  // in memory would strand the connection until someone re-enters the credential.
  memoryAccessTokens.set(connectionId, { token, expiresAt });
}

function rememberRefreshToken(connectionId: string, refreshToken: string): void {
  // Same reason as the access token above: this may be the only surviving copy of
  // a rotated refresh token, so it is kept for the life of the process.
  latestRefreshTokens.set(connectionId, refreshToken);
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function readPsd(connection?: Record<string, unknown>): Record<string, unknown> {
  return asRecord(connection?.providerSpecificData);
}

function toIsoFromUnixSeconds(value: string | number | undefined): string | null {
  const seconds = toNumber(value);
  // toNumber falls back to 0 for junk; an out-of-range but finite value still
  // makes Date invalid, and toISOString would throw inside the parser.
  if (seconds <= 0) return null;
  const date = new Date(seconds * 1000);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function windowFromPayload(payload?: SensenovaWindowPayload): QuotaWindowInfo | undefined {
  if (!payload) return undefined;
  const limit = toNumber(payload.limit);
  const used = toNumber(payload.used);
  const percentUsed = limit > 0 ? Math.min(1, Math.max(0, used / limit)) : 0;
  return {
    percentUsed,
    resetAt: toIsoFromUnixSeconds(payload.reset_at),
    used: Math.max(0, used),
    total: Math.max(0, limit),
  };
}

function pickAccountPool(pools: SensenovaPoolPayload[]): SensenovaPoolPayload | null {
  const accountPool = pools.find((pool) => pool.pool_type === "default");
  if (accountPool) return accountPool;
  // Dedicated pools cover one model each, so reporting one of them as the account
  // quota would understate the real limit. A single untyped pool is the legacy
  // payload shape and still means the account pool.
  const untyped = pools.filter((pool) => !pool.pool_type);
  return untyped.length === 1 ? untyped[0] : null;
}

/**
 * Build the preflight snapshot from the console payload. Percentages are per
 * window; `percentUsed` takes the worst window so the single-signal path (used by
 * routing strategies that predate multi-window quotas) stays conservative.
 */
function readPools(payload: SensenovaPoolUsagePayload): SensenovaPoolPayload[] {
  const rawPools = payload.pools ?? [];
  const list = Array.isArray(rawPools) ? rawPools : Object.values(rawPools);
  return list.filter(
    (pool): pool is SensenovaPoolPayload => Boolean(pool) && typeof pool === "object"
  );
}

interface BindingWindow {
  info: QuotaWindowInfo;
  used?: string | number;
  limit?: string | number;
}

function pickBindingWindow(
  window5h: QuotaWindowInfo | null | undefined,
  window7d: QuotaWindowInfo | null | undefined,
  pool: SensenovaPoolPayload
): BindingWindow | null {
  const candidates: BindingWindow[] = [];
  if (window5h)
    candidates.push({ info: window5h, used: pool.window_5h?.used, limit: pool.window_5h?.limit });
  if (window7d)
    candidates.push({ info: window7d, used: pool.window_7d?.used, limit: pool.window_7d?.limit });
  if (candidates.length === 0) return null;
  // The window that binds is the one with the highest share consumed.
  return candidates.reduce((a, b) => (a.info.percentUsed >= b.info.percentUsed ? a : b));
}

export function buildSensenovaQuota(payload: SensenovaPoolUsagePayload | null): QuotaInfo | null {
  if (!payload) return null;
  const pool = pickAccountPool(readPools(payload));
  if (!pool) return null;

  const window5h = windowFromPayload(pool.window_5h);
  const window7d = windowFromPayload(pool.window_7d);
  const binding = pickBindingWindow(window5h, window7d, pool);
  if (!binding) return null;

  const windows: Record<string, QuotaWindowInfo> = {};
  if (window5h) windows["5h"] = window5h;
  if (window7d) windows["7d"] = window7d;

  return {
    plan: payload.plan?.name || payload.plan?.id,
    // Report the numbers of the window that actually binds, so `used`/`total` and
    // `percentUsed` describe the same window instead of contradicting each other.
    used: Math.max(0, toNumber(binding.used)),
    total: Math.max(0, toNumber(binding.limit)),
    percentUsed: binding.info.percentUsed,
    resetAt: binding.info.resetAt ?? null,
    windows,
    window5h,
    window7d,
    limitReached: binding.info.percentUsed >= 1 - 1e-9,
  };
}

export interface SensenovaSession {
  accessToken: string;
  /** Present when this session came from an exchange, which rotates the token. */
  refreshToken?: string;
}

function readRefreshToken(psd: Record<string, unknown>): string {
  const value = psd[SENSENOVA_PSD_REFRESH_TOKEN];
  return typeof value === "string" && value.length > 0 ? value : "";
}

function newestRefreshToken(connectionId: string, psd: Record<string, unknown>): string {
  return latestRefreshTokens.get(connectionId) || readRefreshToken(psd);
}

function memoryAccessToken(connectionId: string, allowExpiring = false): string | null {
  const entry = memoryAccessTokens.get(connectionId);
  if (!entry) return null;
  const deadline = allowExpiring ? entry.expiresAt : entry.expiresAt - EXPIRY_MARGIN_MS;
  return deadline > Date.now() ? entry.token : null;
}

function currentSeq(connectionId: string): number {
  return invalidationSeq.get(connectionId) ?? 0;
}

function cachedAccessToken(psd: Record<string, unknown>, allowExpiring = false): string | null {
  const token =
    typeof psd[SENSENOVA_PSD_ACCESS_TOKEN] === "string"
      ? (psd[SENSENOVA_PSD_ACCESS_TOKEN] as string)
      : "";
  if (!token) return null;
  const expiresAt = toNumber(psd[SENSENOVA_PSD_ACCESS_EXPIRES_AT] as string | number | undefined);
  // A missing or junk expiry means the lifetime is unknown, so the token is only
  // used when nothing better exists.
  if (!expiresAt) return allowExpiring ? token : null;
  const deadline = allowExpiring ? expiresAt : expiresAt - EXPIRY_MARGIN_MS;
  return deadline > Date.now() ? token : null;
}

async function persistTokens(
  connectionId: string,
  psd: Record<string, unknown>,
  accessToken: string,
  expiresInSeconds: number,
  refreshToken: string | undefined,
  expected: Record<string, unknown>
): Promise<"written" | "stale" | "failed"> {
  const tokenFields: Record<string, unknown> = {
    [SENSENOVA_PSD_ACCESS_TOKEN]: accessToken,
    [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + expiresInSeconds * 1000,
  };
  if (refreshToken) tokenFields[SENSENOVA_PSD_REFRESH_TOKEN] = refreshToken;

  try {
    const { getProviderConnectionById, updateProviderConnection } =
      await import("../../src/lib/db/providers.ts");
    const current = await getProviderConnectionById(connectionId);
    // No row means there is nothing to compare against: keep the session in
    // memory and let the caller keep working.
    if (!current) return "failed";
    const applied = await updateProviderConnection(
      connectionId,
      { providerSpecificData: { ...expected, ...tokenFields } },
      // Compare against the snapshot taken before the exchange started: if the
      // operator replaced the credential meanwhile, this write must not land.
      { expectedProviderSpecificData: expected }
    );
    if (!applied) return "stale";
    Object.assign(psd, tokenFields);
    return "written";
  } catch {
    // A locked or read-only database must not be mistaken for a replaced
    // credential: the session stays usable for this process through the memory
    // caches, and the next exchange retries the write.
    return "failed";
  }
}

async function exchangeRefreshToken(
  connectionId: string,
  psd: Record<string, unknown>,
  refreshToken: string,
  expected: Record<string, unknown>,
  seqAtStart: number
): Promise<SensenovaSession | null> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: SENSENOVA_CLIENT_ID,
  });

  const response = await fetchWithConnectionProxy(connectionId, SENSENOVA_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: body.toString(),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response || !response.ok) return null;

  const payload = (await response.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  };
  if (!payload.access_token) return null;

  // An invalidation that lands while this exchange is in flight means the
  // credential was replaced under it: the tokens it just obtained describe the
  // old account, so they must not reach the row.
  if (seqAtStart !== currentSeq(connectionId)) return null;

  const outcome = await persistTokens(
    connectionId,
    psd,
    payload.access_token,
    Number(payload.expires_in) > 0 ? Number(payload.expires_in) : DEFAULT_ACCESS_TTL_SECONDS,
    payload.refresh_token,
    expected
  );
  // An invalidation can land during the awaited write; in that case the memory
  // updates below would resurrect the superseded tokens.
  if (currentSeq(connectionId) !== seqAtStart) return null;

  if (outcome === "stale") {
    // Someone else owns the credential now: hand back nothing so the caller
    // re-reads the connection instead of acting on a superseded session.
    return null;
  }
  if (outcome === "failed") {
    // The token is valid, only the write failed. Keep both halves in memory so
    // this process can keep using them, and let a later exchange retry the write.
    const expiresIn =
      Number(payload.expires_in) > 0 ? Number(payload.expires_in) : DEFAULT_ACCESS_TTL_SECONDS;
    rememberAccessToken(connectionId, payload.access_token, Date.now() + expiresIn * 1000);
    if (payload.refresh_token) rememberRefreshToken(connectionId, payload.refresh_token);
    return { accessToken: payload.access_token, refreshToken: payload.refresh_token };
  }
  if (payload.refresh_token) rememberRefreshToken(connectionId, payload.refresh_token);
  // The row now carries these tokens; the memory-only copy would only shadow them.
  memoryAccessTokens.delete(connectionId);
  return { accessToken: payload.access_token, refreshToken: payload.refresh_token };
}

/**
 * Resolve a usable console session, refreshing through the stored refresh token
 * when the cached access token is missing or about to expire. Concurrent callers
 * for the same connection share one exchange: the platform rotates the refresh
 * token, so two parallel exchanges would invalidate each other.
 */
async function startRefresh(
  connectionId: string,
  psd: Record<string, unknown>,
  refreshToken: string
): Promise<SensenovaSession | null> {
  const pending = inflightRefresh.get(connectionId);
  // Only share an exchange that is working on the same credential: a caller that
  // already holds a newer token must not be handed the older in-flight result.
  if (pending && pending.refreshToken === refreshToken) return pending.promise;

  // Snapshot before the network call: this is the value the CAS fence compares.
  const expected = JSON.parse(JSON.stringify(psd)) as Record<string, unknown>;
  const promise = exchangeRefreshToken(
    connectionId,
    psd,
    refreshToken,
    expected,
    currentSeq(connectionId)
  )
    .catch(() => null)
    .finally(() => {
      const current = inflightRefresh.get(connectionId);
      if (current && current.promise === promise) inflightRefresh.delete(connectionId);
    });
  inflightRefresh.set(connectionId, { refreshToken, promise });
  return promise;
}

async function resolveSession(
  connectionId: string,
  psd: Record<string, unknown>
): Promise<SensenovaSession | null> {
  const cached = memoryAccessToken(connectionId) ?? cachedAccessToken(psd);
  if (cached) return { accessToken: cached };

  const refreshToken = newestRefreshToken(connectionId, psd);
  if (!refreshToken) {
    // Nothing can refresh it, so a token inside the refresh margin is still
    // better than reporting no session: it works until it actually expires.
    const expiring = memoryAccessToken(connectionId, true) ?? cachedAccessToken(psd, true);
    return expiring ? { accessToken: expiring } : null;
  }

  const seq = currentSeq(connectionId);
  const refreshed = await startRefresh(connectionId, psd, refreshToken);
  if (refreshed) return refreshed;
  // The exchange failed for a transient reason (the console is down, the token
  // endpoint hiccuped). A replaced credential bumps the sequence, so an unchanged
  // one means the stored token is the best remaining option even inside the margin.
  if (currentSeq(connectionId) !== seq) return null;
  const fallback = memoryAccessToken(connectionId, true) ?? cachedAccessToken(psd, true);
  return fallback ? { accessToken: fallback } : null;
}

type PoolUsageResult =
  | { status: "ok"; payload: SensenovaPoolUsagePayload }
  | { status: "unauthorized" }
  | { status: "unavailable" };

async function requestPoolUsage(
  connectionId: string,
  accessToken: string
): Promise<PoolUsageResult> {
  const response = await fetchWithConnectionProxy(connectionId, SENSENOVA_POOL_USAGE_URL, {
    method: "GET",
    headers: {
      Authorization: ["Bearer", accessToken].join(" "),
      Accept: "application/json",
      Referer: "https://platform.sensenova.cn/console",
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response) return { status: "unavailable" };
  if (response.ok) {
    return { status: "ok", payload: (await response.json()) as SensenovaPoolUsagePayload };
  }
  // Only an auth rejection means the token is dead. A 429 or a console hiccup must
  // not rotate the refresh token: the exchange invalidates the old one, so a
  // spurious rotation would leave the connection without a usable credential.
  // Only 401 means the token died. A 403 is a permission or plan problem, and
  // rotating the credential for it would invalidate a token that still works.
  return response.status === 401 ? { status: "unauthorized" } : { status: "unavailable" };
}

function rememberQuota(
  connectionId: string,
  quota: QuotaInfo | null,
  reason: "auth" | "transient" = "transient"
): void {
  rememberIn(quotaCache, connectionId, { quota, fetchedAt: Date.now(), reason });
}

interface QuotaCacheEntry {
  quota: QuotaInfo | null;
  fetchedAt: number;
  reason?: "auth" | "transient";
}

function cacheTtlFor(entry: QuotaCacheEntry): number {
  // A failed fetch is remembered only briefly: caching a null for the full window
  // would hide a recovered console from the router for a minute.
  if (entry.quota) return CACHE_TTL_MS;
  return entry.reason === "auth" ? AUTH_NEGATIVE_TTL_MS : TRANSIENT_NEGATIVE_TTL_MS;
}

/**
 * A rotation whose write to the row failed lives only in process memory, so this
 * has to look past the connection object or a usable session gets dropped.
 */
function hasUsableCredential(connectionId: string, psd: Record<string, unknown>): boolean {
  if (newestRefreshToken(connectionId, psd)) return true;
  if (memoryAccessToken(connectionId) || cachedAccessToken(psd)) return true;
  return Boolean(memoryAccessToken(connectionId, true) || cachedAccessToken(psd, true));
}

interface PayloadResult {
  payload: SensenovaPoolUsagePayload | null;
  reason: "auth" | "transient";
}

/**
 * One read of the pool usage, retried once behind a fresh session when the access
 * token turns out to be revoked. A refresh token returned by an exchange above
 * supersedes the stored one: the platform invalidates the old token on rotation.
 */
async function readPoolUsagePayload(
  connectionId: string,
  psd: Record<string, unknown>,
  session: SensenovaSession
): Promise<PayloadResult> {
  const first = await requestPoolUsage(connectionId, session.accessToken);
  if (first.status === "ok") return { payload: first.payload, reason: "transient" };
  if (first.status !== "unauthorized") return { payload: null, reason: "transient" };

  const latestRefresh = session.refreshToken || newestRefreshToken(connectionId, psd);
  if (!latestRefresh) return { payload: null, reason: "auth" };

  const retried = await startRefresh(connectionId, psd, latestRefresh);
  if (!retried) return { payload: null, reason: "transient" };

  const second = await requestPoolUsage(connectionId, retried.accessToken);
  return second.status === "ok"
    ? { payload: second.payload, reason: "transient" }
    : { payload: null, reason: "auth" };
}

export async function fetchSensenovaQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const cached = quotaCache.get(connectionId) as QuotaCacheEntry | undefined;
  if (cached && Date.now() - cached.fetchedAt < cacheTtlFor(cached)) return cached.quota;

  const psd = readPsd(connection);
  if (!hasUsableCredential(connectionId, psd)) return null;

  // Anything published from here on belongs to this credential generation. If an
  // operator replaces the credential while the request is in flight, the result
  // describes the old account and must not reach the cache.
  const seq = currentSeq(connectionId);
  const stillCurrent = () => currentSeq(connectionId) === seq;

  try {
    await throttleQuotaFetch();

    const session = await resolveSession(connectionId, psd);
    if (!session) {
      // The credential just proved unusable; remember it briefly so every routing
      // pass does not retry it, but keep the window short for a quick fix.
      if (stillCurrent()) rememberQuota(connectionId, null, "auth");
      return null;
    }

    const { payload, reason } = await readPoolUsagePayload(connectionId, psd, session);
    if (!payload) {
      if (stillCurrent()) rememberQuota(connectionId, null, reason);
      return null;
    }

    const quota = buildSensenovaQuota(payload);
    if (!stillCurrent()) return null;
    rememberQuota(connectionId, quota);
    return quota;
  } catch {
    if (stillCurrent()) rememberQuota(connectionId, null);
    return null;
  }
}

export function invalidateSensenovaQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
  // An operator can replace the credential on the connection; the process-local
  // rotation memory and any exchange started for the old credential would
  // otherwise keep replaying the superseded token.
  latestRefreshTokens.delete(connectionId);
  memoryAccessTokens.delete(connectionId);
  // Not the bounded LRU: an evicted entry would reset the sequence to 0 and let a
  // fetch that started before this invalidation look current again. One entry per
  // connection is bounded by the connections themselves.
  invalidationSeq.set(connectionId, currentSeq(connectionId) + 1);
}

export function registerSensenovaQuotaFetcher(): void {
  registerQuotaFetcher("sensenova", fetchSensenovaQuota);
  registerMonitorFetcher("sensenova", fetchSensenovaQuota);
  registerQuotaWindows("sensenova", ["5h", "7d"]);
  registerQuotaCacheInvalidator("sensenova", invalidateSensenovaQuotaCache);
}

export interface SensenovaNodeLike {
  id?: string | null;
  prefix?: string | null;
  baseUrl?: string | null;
}

function isSensenovaNode(node: SensenovaNodeLike): boolean {
  // A missing or empty baseUrl needs no guard here: parseSensenovaOrigin
  // rejects every non-string and blank value.
  return parseSensenovaOrigin(typeof node.baseUrl === "string" ? node.baseUrl : "") !== null;
}

/**
 * Render the console reading in the shape the provider-limits sync consumes, so
 * the dashboard can show both windows instead of only the binding one.
 */
export function toSensenovaUsage(quota: QuotaInfo): Record<string, unknown> {
  const quotas: Record<string, Record<string, unknown>> = {};
  for (const [name, window] of [
    ["5h", quota.window5h],
    ["7d", quota.window7d],
  ] as const) {
    if (!window) continue;
    const total = window.total ?? 0;
    const used = window.used ?? 0;
    quotas[name] = {
      used,
      total,
      remaining: Math.max(0, total - used),
      remainingPercentage:
        total > 0 ? Math.max(0, Math.min(100, ((total - used) / total) * 100)) : 0,
      resetAt: window.resetAt ?? null,
      unlimited: false,
    };
  }
  return {
    plan: quota.plan ?? null,
    quotas,
    ...(quota.limitReached ? { limitReached: true } : {}),
  };
}

/** Usage entry for the provider-limits sync; a missing session is a message, not a throw. */
export async function getSensenovaUsage(connection: {
  id?: string | null;
  provider?: string | null;
  providerSpecificData?: unknown;
}): Promise<Record<string, unknown>> {
  const connectionId = typeof connection.id === "string" ? connection.id : "";
  if (!connectionId) return { message: "Connection id missing." };
  const quota = await fetchSensenovaQuota(connectionId, connection as Record<string, unknown>);
  if (!quota) {
    return { message: "SenseNova console session unavailable; re-enter the account password." };
  }
  return toSensenovaUsage(quota);
}

/** Register the fetcher for OpenAI-compatible custom nodes that front SenseNova. */
export function registerSensenovaFetchersForNodes(nodes: readonly SensenovaNodeLike[]): void {
  for (const node of nodes) {
    if (!node?.id || !isSensenovaNode(node)) continue;
    registerQuotaFetcher(node.id, fetchSensenovaQuota);
    registerMonitorFetcher(node.id, fetchSensenovaQuota);
    registerQuotaWindows(node.id, ["5h", "7d"]);
    registerQuotaCacheInvalidator(node.id, invalidateSensenovaQuotaCache);
  }
}
