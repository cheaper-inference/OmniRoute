/**
 * usage/claude.ts — Claude (Anthropic OAuth + legacy org) usage fetcher + plan-label helper.
 *
 * Extracted from services/usage.ts (god-file decomposition): the Claude family — the API
 * config, the plan-label picker, the OAuth usage fetcher (getClaudeUsage) with its legacy
 * settings/org fallback (getClaudeUsageLegacy). Depends only on the sibling scalar/quota
 * leaves + Claude identity/cooldown helpers + the shared boundedMap — no host coupling — so
 * it lives as a co-located provider leaf. usage.ts imports getClaudeUsage (dispatcher) +
 * getClaudePlanLabel (__testing).
 */

import {
  getClaudeCodeVersion,
  fetchClaudeBootstrap,
  type ClaudeBootstrap,
} from "../../executors/claudeIdentity.ts";
import {
  computeClaudeUsageRetryMs,
  hashClaudeCredential,
  isClaudeOauthUsageCoolingDown,
  markClaudeOauthUsage429,
} from "../claudeUsageCooldown.ts";
import { boundedMap } from "../../../src/lib/quota/boundedMap.ts";
import { sanitizeErrorMessage } from "../../utils/errorSanitization.ts";
import { fetchWithConnectionProxy } from "../connectionProxyFetch.ts";
import { toRecord } from "./scalars.ts";
import {
  claudeUsageWindowsComplete,
  normalizeClaudeUsageQuotas,
  type NormalizedClaudeUsageQuotas,
} from "./claudeQuota.ts";

/** Run one usage request through the proxy when an id is present, else directly. */
async function proxiedOrDirect(
  connectionId: string | undefined,
  url: string,
  init: RequestInit
): Promise<Response | null> {
  if (connectionId) return fetchWithConnectionProxy(connectionId, url, init);
  return globalThis.fetch(url, init);
}

// Claude API config
const CLAUDE_CONFIG = {
  oauthUsageUrl: "https://api.anthropic.com/api/oauth/usage",
  usageUrl: "https://api.anthropic.com/v1/organizations/{org_id}/usage",
  settingsUrl: "https://api.anthropic.com/v1/settings",
  apiVersion: "2023-06-01",
};

/**
 * A successful OAuth usage read is reused for this long before polling again.
 * Background pollers (quota cache, provider-limits sync, saturation signals) all
 * go through here, so this is the effective polling interval per credential;
 * a manual refresh (`forceRefresh`) skips it. Anthropic rate-limits this
 * endpoint to a few calls per credential per hour.
 */
export const CLAUDE_USAGE_SUCCESS_TTL_MS = 15 * 60_000;
/**
 * Floor for a manual refresh: the dashboard sends one per open limits card (at most
 * every 30 s, plus optional auto-refresh), so `forceRefresh` reuses a success younger
 * than this instead of polling Anthropic again.
 */
export const CLAUDE_USAGE_FORCED_MIN_INTERVAL_MS = 5 * 60_000;
/** Cap on remembered credentials and on concurrent distinct polls. */
const CLAUDE_USAGE_CACHE_MAX = 128;

const RATE_LIMITED_MESSAGE = "Claude usage is rate limited (429). Retry later.";
const RATE_LIMITED_STALE_REASON =
  "Claude usage endpoint is rate limited (429); showing the last known quota.";

export interface ClaudeUsageResult {
  plan?: unknown;
  organization?: unknown;
  quotas?: NormalizedClaudeUsageQuotas["quotas"] | Record<string, unknown>;
  modelQuotas?: NormalizedClaudeUsageQuotas["modelQuotas"];
  extraUsage?: unknown;
  message?: string;
  bootstrap: ClaudeBootstrap | null;
  /** The payload listed every window the account has (see isCompleteUsageReading). */
  quotasComplete?: boolean;
  /** Set when the quota is the last known value served during a 429 cooldown. */
  _stale?: boolean;
  _staleSince?: string;
  _staleReason?: string;
  /** Set when the plan windows come from a live response's rate-limit headers. */
  _source?: "response-headers";
  _observedAt?: string;
}

interface CachedClaudeUsage {
  value: ClaudeUsageResult;
  fetchedAt: number;
  /** Set when the quota changed upstream (a reset claim): never reused, still the stale fallback. */
  expired?: boolean;
}

// Keyed by sha256(accessToken) — raw tokens never sit as map keys.
const lastSuccessfulUsage = boundedMap<CachedClaudeUsage>(
  "claude-oauth-usage",
  CLAUDE_USAGE_CACHE_MAX,
  "lru"
);
const inFlightUsage = new Map<string, Promise<ClaudeUsageResult>>();

interface ObservedClaudeUsage {
  /** A `/api/oauth/usage`-shaped body (`five_hour` / `seven_day`) built from the headers. */
  body: Record<string, unknown>;
  observedAt: number;
}

const observedUsage = boundedMap<ObservedClaudeUsage>(
  "claude-oauth-usage-headers",
  CLAUDE_USAGE_CACHE_MAX,
  "lru"
);

const UNIFIED_WINDOWS = [
  ["5h", "five_hour"],
  ["7d", "seven_day"],
] as const;

/**
 * Remember the plan-window utilization Anthropic reports on every OAuth response
 * (`anthropic-ratelimit-unified-{5h,7d}-utilization` 0..1 and `-reset` epoch seconds).
 * `/api/oauth/usage` allows only a few calls per credential per hour and a refused call
 * restarts its hour, so these headers are the reliable, free source of the same numbers.
 */
export function observeClaudeUsageHeaders(
  accessToken: string | undefined,
  headers: Headers | null | undefined,
  now: number = Date.now()
): void {
  if (!accessToken || !headers || typeof headers.get !== "function") return;
  const body: Record<string, unknown> = {};
  for (const [suffix, field] of UNIFIED_WINDOWS) {
    const raw = headers.get(`anthropic-ratelimit-unified-${suffix}-utilization`);
    const utilization = raw === null || raw.trim() === "" ? Number.NaN : Number(raw);
    if (!Number.isFinite(utilization) || utilization < 0) continue;
    const reset = Number(headers.get(`anthropic-ratelimit-unified-${suffix}-reset`));
    body[field] = {
      utilization: Math.min(100, Math.round(utilization * 10_000) / 100),
      resets_at: Number.isFinite(reset) && reset > 0 ? new Date(reset * 1000).toISOString() : null,
    };
  }
  if (Object.keys(body).length === 0) return;
  observedUsage.set(hashClaudeCredential(accessToken), { body, observedAt: now });
}

/** When the endpoint read behind `usage` was taken (NaN when unknown, 0 when there is none). */
function endpointReadAt(usage: ClaudeUsageResult, cached: CachedClaudeUsage | undefined): number {
  if (usage._stale) return Date.parse(String(usage._staleSince));
  return usage.quotas ? (cached?.fetchedAt ?? 0) : 0;
}

/** Per-model weekly windows only come from the endpoint: keep them while that read is recent. */
function recentEndpointRead(
  cached: CachedClaudeUsage | undefined,
  observedAt: number
): ClaudeUsageResult | null {
  if (!cached) return null;
  return observedAt - cached.fetchedAt < CLAUDE_USAGE_SUCCESS_TTL_MS ? cached.value : null;
}

/**
 * Serve the plan windows from the latest response headers when they are newer than what
 * the usage endpoint gave (a cached read, a stale read during a 429 cooldown, or only the
 * rate-limit message). Other failures (expired auth, transport) stay visible.
 */
function preferNewerObservedUsage(key: string, usage: ClaudeUsageResult): ClaudeUsageResult {
  const observed = observedUsage.get(key);
  if (!observed) return usage;
  if (!usage.quotas && usage.message !== RATE_LIMITED_MESSAGE) return usage;
  const cached = lastSuccessfulUsage.get(key);
  const readAt = endpointReadAt(usage, cached);
  if (Number.isFinite(readAt) && observed.observedAt <= readAt) return usage;

  const recentRead = recentEndpointRead(cached, observed.observedAt);
  const fresh: ClaudeUsageResult = {
    ...usage,
    quotas: normalizeClaudeUsageQuotas(observed.body).quotas,
    modelQuotas: recentRead?.modelQuotas ?? {},
    extraUsage: recentRead?.extraUsage ?? null,
    bootstrap: usage.bootstrap ?? null,
    _source: "response-headers",
    _observedAt: new Date(observed.observedAt).toISOString(),
  };
  delete fresh._stale;
  delete fresh._staleSince;
  delete fresh._staleReason;
  delete fresh.message;
  return fresh;
}

export function getClaudePlanLabel(...candidates: Array<string | null | undefined>): string | null {
  for (const candidate of candidates) {
    if (typeof candidate !== "string") continue;
    const trimmed = candidate.trim();
    if (
      !trimmed ||
      trimmed.toLowerCase() === "claude code" ||
      trimmed.toLowerCase() === "unknown"
    ) {
      continue;
    }
    return trimmed;
  }
  return null;
}

// Keep the sanitized transport detail: providerLimits reads markers such as "fetch failed" /
// "ECONNREFUSED" from this message to decide on its proxy fail-closed / direct-retry path.
function unableToFetchMessage(error: unknown): string {
  return `Claude connected. Unable to fetch usage: ${sanitizeErrorMessage((error as Error)?.message)}`;
}

function staleFromCache(cached: CachedClaudeUsage): ClaudeUsageResult {
  return {
    ...cached.value,
    _stale: true,
    _staleSince: new Date(cached.fetchedAt).toISOString(),
    _staleReason: RATE_LIMITED_STALE_REASON,
  };
}

/**
 * Claude Usage — OAuth `/api/oauth/usage` (Claude Code consumer tokens).
 *
 * Polling policy per credential:
 *  - concurrent callers share one in-flight request;
 *  - a success is reused for CLAUDE_USAGE_SUCCESS_TTL_MS; `forceRefresh` shortens that
 *    to CLAUDE_USAGE_FORCED_MIN_INTERVAL_MS;
 *  - a 429 starts a Retry-After-aware cooldown during which the last known quota is
 *    served flagged `_stale` (or a rate-limit message when nothing is cached yet);
 *  - 401 reports expired authentication; only 404/405 fall back to the legacy
 *    settings/org endpoints;
 *  - plan windows seen in a newer response's rate-limit headers replace an older read
 *    (see observeClaudeUsageHeaders).
 */
export function getClaudeUsage(
  accessToken?: string,
  connectionIdOrOptions?: string | { forceRefresh?: boolean },
  maybeOptions: { forceRefresh?: boolean } = {}
): Promise<ClaudeUsageResult> {
  const usage = getClaudeUsageFromEndpoint(accessToken, connectionIdOrOptions, maybeOptions);
  if (!accessToken) return usage;
  const key = hashClaudeCredential(accessToken);
  return usage.then((value) => preferNewerObservedUsage(key, value));
}

function getClaudeUsageFromEndpoint(
  accessToken?: string,
  connectionIdOrOptions?: string | { forceRefresh?: boolean },
  maybeOptions: { forceRefresh?: boolean } = {}
): Promise<ClaudeUsageResult> {
  const connectionId =
    typeof connectionIdOrOptions === "string" ? connectionIdOrOptions : undefined;
  const options =
    typeof connectionIdOrOptions === "string" ? maybeOptions : (connectionIdOrOptions ?? {});
  if (!accessToken) {
    return Promise.resolve({
      message: "Claude connected. Access token not available.",
      bootstrap: null,
    });
  }

  const key = hashClaudeCredential(accessToken);
  const cached = lastSuccessfulUsage.get(key);
  const reuseForMs = options.forceRefresh
    ? CLAUDE_USAGE_FORCED_MIN_INTERVAL_MS
    : CLAUDE_USAGE_SUCCESS_TTL_MS;
  if (cached && !cached.expired && Date.now() - cached.fetchedAt < reuseForMs) {
    return Promise.resolve(cached.value);
  }

  const pending = inFlightUsage.get(key);
  if (pending) return pending;
  if (inFlightUsage.size >= CLAUDE_USAGE_CACHE_MAX) {
    return Promise.resolve({
      message: "Claude usage refresh is busy. Retry shortly.",
      bootstrap: null,
    });
  }

  const request: Promise<ClaudeUsageResult> = fetchClaudeUsage(
    accessToken,
    key,
    connectionId
  ).finally(() => {
    if (inFlightUsage.get(key) === request) inFlightUsage.delete(key);
  });
  inFlightUsage.set(key, request);
  return request;
}

async function fetchClaudeUsage(
  accessToken: string,
  key: string,
  connectionId?: string
): Promise<ClaudeUsageResult> {
  // Skip the OAuth usage call while this token is cooling down from a recent 429
  // (chat with the same token still works — only the quota endpoint is throttled).
  if (isClaudeOauthUsageCoolingDown(accessToken)) {
    const cached = lastSuccessfulUsage.get(key);
    if (cached) return staleFromCache(cached);
    return {
      message: RATE_LIMITED_MESSAGE,
      bootstrap: await fetchClaudeBootstrap(accessToken).catch(() => null),
    };
  }

  // Refresh bootstrap in parallel; best-effort, failure non-fatal.
  const bootstrapPromise = fetchClaudeBootstrap(accessToken).catch(() => null);
  try {
    // Real CLI uses axios here, not Stainless — UA is `claude-code/<version>`
    // (not `claude-cli/...`) and the shape is simpler than /v1/messages.
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10_000);
    const oauthInit: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, compress, deflate, br",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "User-Agent": `claude-code/${getClaudeCodeVersion()}`,
        "anthropic-beta": "oauth-2025-04-20",
      },
      signal: ctrl.signal,
    };
    let oauthResponse: Response | null;
    try {
      oauthResponse = await proxiedOrDirect(connectionId, CLAUDE_CONFIG.oauthUsageUrl, oauthInit);
    } finally {
      clearTimeout(timer);
    }

    if (!oauthResponse) {
      const legacy = await getClaudeUsageLegacy(accessToken, connectionId);
      return { ...legacy, bootstrap: await bootstrapPromise };
    }

    if (oauthResponse.ok) {
      const data = toRecord(await oauthResponse.json());
      const { quotas, modelQuotas } = normalizeClaudeUsageQuotas(data);

      const bootstrap = await bootstrapPromise;
      const plan =
        getClaudePlanLabel(
          typeof data.tier === "string" ? data.tier : null,
          typeof data.plan === "string" ? data.plan : null,
          typeof data.subscription_type === "string" ? data.subscription_type : null,
          // A Team seat's own tier (e.g. max_5x) before the org's base tier (raven).
          bootstrap?.user_rate_limit_tier,
          bootstrap?.organization_rate_limit_tier
        ) ?? undefined;

      const value: ClaudeUsageResult = {
        ...(plan ? { plan } : {}),
        quotas,
        modelQuotas,
        // The adapter alone knows the wire format: see isCompleteUsageReading.
        ...(claudeUsageWindowsComplete(data) ? { quotasComplete: true } : {}),
        extraUsage: data.extra_usage ?? null,
        bootstrap,
      };
      lastSuccessfulUsage.set(key, { value, fetchedAt: Date.now() });
      return value;
    }

    // Cool down OAuth usage polling after a 429 (quota endpoint only — chat is unaffected)
    // and keep serving the last known quota instead of hitting the legacy endpoints,
    // which a consumer OAuth token cannot use anyway.
    if (oauthResponse.status === 429) {
      const now = Date.now();
      markClaudeOauthUsage429(
        accessToken,
        now,
        computeClaudeUsageRetryMs(oauthResponse.headers, now)
      );
      const cached = lastSuccessfulUsage.get(key);
      if (cached) return staleFromCache(cached);
      return { message: RATE_LIMITED_MESSAGE, bootstrap: await bootstrapPromise };
    }

    // The legacy endpoints would reject the same expired token too.
    if (oauthResponse.status === 401) {
      return {
        message: "Claude authentication expired (401). Re-authorize or refresh the connection.",
        bootstrap: await bootstrapPromise,
      };
    }

    // Only a missing/unsupported OAuth usage endpoint means "not a consumer token":
    // try the legacy settings/org endpoints (API key / org admin).
    if (oauthResponse.status === 404 || oauthResponse.status === 405) {
      console.warn(
        `[Claude Usage] OAuth endpoint returned ${oauthResponse.status}, falling back to legacy`
      );
      const legacy = await getClaudeUsageLegacy(accessToken, connectionId);
      return { ...legacy, bootstrap: await bootstrapPromise };
    }

    if (oauthResponse.status === 403) {
      const body = toRecord(await oauthResponse.json().catch(() => null));
      const errorCode = toRecord(toRecord(body.error).details).error_code;
      // The org refuses OAuth for this account on every call, inference included.
      // Measured cause on a Team: the member has no seat assigned.
      if (errorCode === "oauth_not_allowed_for_organization") {
        return {
          message:
            "Claude organization does not allow OAuth for this account (oauth_not_allowed_for_organization); on a Team this usually means the member has no seat assigned.",
          bootstrap: await bootstrapPromise,
        };
      }
    }

    return {
      message: `Claude connected. Usage endpoint returned HTTP ${oauthResponse.status}.`,
      bootstrap: await bootstrapPromise,
    };
  } catch (error) {
    return { message: unableToFetchMessage(error), bootstrap: await bootstrapPromise };
  }
}

/**
 * Mark the last successful read as outdated, e.g. after a reset claim changed the quota, so
 * the next read polls Anthropic instead of reusing it. It still backs a stale answer on 429.
 */
export function expireClaudeUsageCache(accessToken?: string): void {
  if (!accessToken) return;
  const cached = lastSuccessfulUsage.get(hashClaudeCredential(accessToken));
  if (cached) cached.expired = true;
}

/** Test-only: clear the success cache, observed headers and in-flight polls. */
export function _resetClaudeUsagePollingState(): void {
  lastSuccessfulUsage.clear();
  observedUsage.clear();
  inFlightUsage.clear();
}

/**
 * Legacy Claude usage fetcher for API key / org admin users.
 * Uses /v1/settings + /v1/organizations/{org_id}/usage endpoints.
 */
async function getClaudeUsageLegacy(accessToken?: string, connectionId?: string) {
  try {
    const settingsInit: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "anthropic-version": CLAUDE_CONFIG.apiVersion,
      },
    };
    const settingsResponse = await proxiedOrDirect(
      connectionId,
      CLAUDE_CONFIG.settingsUrl,
      settingsInit
    );
    if (!settingsResponse) {
      return { message: "Claude connected. Usage API requires admin permissions." };
    }

    if (settingsResponse.ok) {
      const settings = toRecord(await settingsResponse.json());

      const organizationId =
        typeof settings.organization_id === "string" ? settings.organization_id : "";
      if (organizationId) {
        const usageInit: RequestInit = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "anthropic-version": CLAUDE_CONFIG.apiVersion,
          },
        };
        const usageResponse = await proxiedOrDirect(
          connectionId,
          CLAUDE_CONFIG.usageUrl.replace("{org_id}", organizationId),
          usageInit
        );
        if (!usageResponse) {
          return { message: "Claude connected. Usage API requires admin permissions." };
        }

        if (usageResponse.ok) {
          const usage = await usageResponse.json();
          return {
            plan: settings.plan || "Unknown",
            organization: settings.organization_name,
            quotas: usage,
          };
        }
      }

      return {
        plan: settings.plan || "Unknown",
        organization: settings.organization_name,
        message: "Claude connected. Usage details require admin access.",
      };
    }

    return { message: "Claude connected. Usage API requires admin permissions." };
  } catch (error) {
    return { message: unableToFetchMessage(error) };
  }
}
