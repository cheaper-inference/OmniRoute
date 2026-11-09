/**
 * usage/zedHosted.ts: Zed Hosted Models USD credit balance (optional).
 *
 * The balance comes from the Orb customer-portal link the operator copies out of
 * Zed's billing page and stores in `providerSpecificData.billingPortalUrl` (or,
 * equivalently, a bare portal token). The Orb portal API is not public. The token
 * never enters an Authorization/X-Orb header: as the portal WAF requires, it
 * appears in the `token=` query parameter and in the same-origin `Referer`, which
 * is rebuilt from the portal origin. Requests reject redirects, so the token is
 * never sent to another origin, and the pasted URL itself is never fetched: every
 * URL is rebuilt from constants plus a validated token/id, so a malicious link
 * cannot redirect the request (SSRF) or exfiltrate the token. Request shape is
 * display-only: the quota is reported with `fractionReported: false`, so the quota
 * cache treats it as telemetry and never parks/cools down the connection, even at
 * a zero balance.
 *
 * shortcut: the Orb portal API is non-public and its WAF header set will change; re-capture the request from the portal when it does.
 */

import { opaqueTokenFingerprint } from "../../utils/opaqueTokenFingerprint.ts";

import { toRecord, toNumber, roundCurrency, clampPercentage } from "./scalars.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";

const PORTAL_ORIGIN = "https://portal.withorb.com";
const CUSTOMER_FROM_LINK_URL = `${PORTAL_ORIGIN}/api/v1/customer_from_link`;
const FETCH_TIMEOUT_MS = 10_000;
const MAX_INPUT_LENGTH = 4096;
// Orb tokens are opaque and their real charset is unverified; they only reach
// fixed-host query params and the Referer through encodeURIComponent. The charset
// is not a security boundary, whitespace/control chars and length are.
const TOKEN_PATTERN = /^[\x21-\x7e]{8,512}$/;
const UPSTREAM_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
const MAX_CREDITS_USD = 1e9;
const CACHE_TTL_MS = 60_000;

const NO_LINK_MESSAGE =
  "Zed billing balance is not configured. Add the optional billing portal link in the connection settings to show the remaining USD credit.";
const INVALID_MESSAGE =
  "Zed billing portal link is invalid. Paste the portal link (or its token) from Zed's billing page.";
const TIMEOUT_MESSAGE = "Zed billing API request timed out. Try again later.";
const UNEXPECTED_MESSAGE = "Zed billing API returned an unexpected response.";
const FAILED_MESSAGE = "Zed billing API request failed. Try again later.";

/** Browser-shaped headers the portal WAF requires; the token rides only in the same-origin Referer. */
const PORTAL_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Origin: PORTAL_ORIGIN,
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Dest": "empty",
  "X-Requested-With": "XMLHttpRequest",
} as const;

type CacheEntry = { value: unknown; expiresAt: number };
const successCache = new Map<string, CacheEntry>();

/**
 * Extract the portal token from a pasted Orb link or a bare token.
 *
 * Only the token survives: the referer is rebuilt from the constant portal
 * origin plus this validated token, so a host that merely looks like the portal
 * (suffix, userinfo, IP) cannot get a request.
 */
export function extractOrbPortalToken(raw: string): string | null {
  if (typeof raw !== "string" || raw.length > MAX_INPUT_LENGTH) return null;
  const value = raw.trim();
  if (!value) return null;
  // `new URL` strips ASCII tab/newline before parsing, so an interior control
  // character would be silently joined into the token instead of rejected.
  if (/[\u0000-\u001f\u007f]/.test(value)) return null;

  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)) {
    let url: URL;
    try {
      url = new URL(value);
    } catch {
      return null;
    }
    // Exact host comparison: a suffix or substring check would accept portal.withorb.com.evil.com.
    if (url.protocol !== "https:") return null;
    if (url.hostname !== "portal.withorb.com") return null;
    if (url.username !== "" || url.password !== "") return null;
    const token = url.searchParams.get("token");
    if (!token || !TOKEN_PATTERN.test(token)) return null;
    return token;
  }

  return TOKEN_PATTERN.test(value) ? value : null;
}

function readUpstreamId(value: unknown): string | null {
  return typeof value === "string" && UPSTREAM_ID_PATTERN.test(value) ? value : null;
}

function readFiniteNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const parsed = toNumber(value, Number.NaN);
  return Number.isFinite(parsed) ? parsed : null;
}

async function readJsonObject(res: Response): Promise<Record<string, unknown> | null> {
  try {
    const body = await res.json();
    return body && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : {};
  } catch {
    return null;
  }
}

function portalReferer(token: string): string {
  return `${PORTAL_ORIGIN}/view?token=${encodeURIComponent(token)}`;
}

function requestJson(url: string, token: string): Promise<Response> {
  return fetch(url, {
    // No redirects: the token rides in the query and would be replayed to the
    // redirect target by fetch's default follow mode.
    redirect: "error",
    headers: { ...PORTAL_HEADERS, Referer: portalReferer(token) },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
}

function httpFailure(status: number) {
  const hint = status === 401 || status === 403 ? " Re-copy the link from Zed's billing page." : "";
  return { message: `Zed billing API returned HTTP ${status}.${hint}` };
}

function isTimeoutError(error: unknown): boolean {
  const name = (error as { name?: unknown } | null)?.name;
  return name === "TimeoutError" || name === "AbortError";
}

function cacheKeyFor(connectionId: string, token: string): string | null {
  if (!connectionId) return null;
  // Fingerprint the token: a raw credential must never sit in a module-level key.
  const digest = opaqueTokenFingerprint(token, { length: 12 });
  return `${connectionId}:${digest}`;
}

function readCached(key: string | null): unknown {
  if (!key) return undefined;
  const entry = successCache.get(key);
  if (!entry) return undefined;
  if (entry.expiresAt <= Date.now()) {
    successCache.delete(key);
    return undefined;
  }
  return entry.value;
}

/** Future periods carry a null balance; the current period is the first block whose balance is a real number. */
function findCurrentCreditBlock(ledger: Record<string, unknown>): Record<string, unknown> | null {
  const blocks = Array.isArray(ledger.credit_blocks) ? ledger.credit_blocks : [];
  for (const raw of blocks) {
    const block = toRecord(raw);
    if (readFiniteNumber(block.balance) !== null) return block;
  }
  return null;
}

function buildMonthlyQuota(ledger: Record<string, unknown>): UsageQuota | null {
  const current = findCurrentCreditBlock(ledger);
  if (!current) return null;

  const rawTotal = readFiniteNumber(current.maximum_initial_balance);
  const total =
    rawTotal !== null && rawTotal > 0 && rawTotal <= MAX_CREDITS_USD ? roundCurrency(rawTotal) : 0;
  // credits_balance is an account-level figure; the block balance is period-scoped.
  // Fall back to the block only when the account figure is absent, and clamp so a
  // negative or outsized value can never render as a negative/"$Infinity" balance.
  const remainingRaw =
    readFiniteNumber(ledger.credits_balance) ?? readFiniteNumber(current.balance) ?? 0;
  const remaining = roundCurrency(Math.min(Math.max(0, remainingRaw), MAX_CREDITS_USD));
  const used = total > 0 ? roundCurrency(Math.max(0, total - remaining)) : 0;
  // The two figures are different scopes, so remaining can legitimately exceed the
  // block total; show the bare figure instead of a ">$total" fraction.
  const fractionIsMeaningful = total > 0 && remaining <= total;
  const remainingPercentage =
    total > 0
      ? Math.round(clampPercentage((remaining / total) * 100) * 10) / 10
      : remaining > 0
        ? 100
        : 0;

  return {
    used,
    total,
    remaining,
    remainingPercentage,
    resetAt: parseResetTime(current.expiry_date),
    unlimited: false,
    // Telemetry only: never park or cool down the connection on this balance.
    fractionReported: false,
    currency: "USD",
    displayName: fractionIsMeaningful
      ? `$${remaining.toFixed(2)} / $${total.toFixed(2)} per month`
      : `$${remaining.toFixed(2)} credit`,
  };
}

/**
 * Zed Hosted Usage: remaining USD credit from the operator's Orb portal link.
 * Never throws; failures come back as a fixed, token-free `message`.
 */
export async function getZedHostedUsage(connectionId: string, providerSpecificData?: unknown) {
  try {
    const raw = toRecord(providerSpecificData).billingPortalUrl;
    if (typeof raw !== "string" || !raw.trim()) return { message: NO_LINK_MESSAGE };

    const token = extractOrbPortalToken(raw);
    if (!token) return { message: INVALID_MESSAGE };

    const cacheKey = cacheKeyFor(connectionId, token);
    const cached = readCached(cacheKey);
    if (cached !== undefined) return cached;

    const customerUrl = `${CUSTOMER_FROM_LINK_URL}?token=${encodeURIComponent(token)}`;
    const customerRes = await requestJson(customerUrl, token);
    if (!customerRes.ok) return httpFailure(customerRes.status);

    const customerBody = await readJsonObject(customerRes);
    if (!customerBody) return { message: UNEXPECTED_MESSAGE };
    const customer = toRecord(customerBody.customer);
    const customerId = readUpstreamId(customer.id);
    const pricingUnitId = readUpstreamId(toRecord(customer.pricing_unit).id);
    if (!customerId || !pricingUnitId) return { message: UNEXPECTED_MESSAGE };

    const ledgerUrl =
      `${PORTAL_ORIGIN}/api/v1/customers/${encodeURIComponent(customerId)}` +
      `/ledger_summary?pricing_unit_id=${encodeURIComponent(pricingUnitId)}` +
      `&token=${encodeURIComponent(token)}`;
    const ledgerRes = await requestJson(ledgerUrl, token);
    if (!ledgerRes.ok) return httpFailure(ledgerRes.status);

    const ledgerBody = await readJsonObject(ledgerRes);
    if (!ledgerBody) return { message: UNEXPECTED_MESSAGE };
    const monthly = buildMonthlyQuota(ledgerBody);
    if (!monthly) return { message: UNEXPECTED_MESSAGE };

    const result = { plan: "Zed Hosted", quotas: { monthly } };
    if (cacheKey)
      successCache.set(cacheKey, { value: result, expiresAt: Date.now() + CACHE_TTL_MS });
    return result;
  } catch (error) {
    // Fixed strings only: raw error text can carry request details.
    return { message: isTimeoutError(error) ? TIMEOUT_MESSAGE : FAILED_MESSAGE };
  }
}
