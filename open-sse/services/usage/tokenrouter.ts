/**
 * usage/tokenrouter.ts — TokenRouter quota tracker (Management API, read-only).
 *
 * TokenRouter's inference key is rejected by its Management API (401), so the
 * tracker needs a separate, optional account-level Management Key. It is stored
 * in `providerSpecificData.consoleApiKey` — the same secondary-credential field
 * the AgentRouter / Bailian trackers use — which is stripped from dashboard
 * responses and provider audits. The key is never logged or echoed back.
 *
 *   GET {base}/self/wallet                     → account wallet (best effort)
 *   GET {base}/api-keys?page=1&page_size=100   → per-key used/remaining quota
 *
 * Rows for keys other than this connection's own inference key are informational
 * (`fractionReported: false`): the quota cache must never park this connection
 * because a different key on the same account ran out. The own key is matched by
 * exact value against `connection.apiKey`; the key value itself never leaves this
 * module (rows are named after the key's label).
 *
 * Only the first page (100 keys) is read. The response shape comes from the
 * TokenRouter Management API, so parsing stays defensive. A missing or rejected
 * key returns a `message` instead of throwing, so the Provider Limits page can
 * prompt the operator to add one.
 */

import { toRecord, toNumber, clampPercentage } from "./scalars.ts";
import { type UsageQuota } from "./quota.ts";

const MANAGEMENT_BASE_URL = "https://api.tokenrouter.com/api/management";
const KEYS_PAGE_SIZE = 100;

/** Bound each probe so a hung upstream cannot hold the limits panel. */
const FETCH_TIMEOUT_MS = 10_000;

const PLAN_LABEL = "TokenRouter";

function readManagementKey(providerSpecificData: unknown): string {
  const value = toRecord(providerSpecificData).consoleApiKey;
  return typeof value === "string" ? value.trim() : "";
}

function getJson(url: string, managementKey: string): Promise<Response> {
  return fetch(url, {
    headers: { Authorization: `Bearer ${managementKey}`, Accept: "application/json" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
}

/** Wallet is optional (404/empty on some accounts) — never fail the whole fetch on it. */
async function fetchWalletBalance(managementKey: string): Promise<number> {
  try {
    const res = await getJson(`${MANAGEMENT_BASE_URL}/self/wallet`, managementKey);
    if (!res.ok) return 0;
    const wallet = toRecord(toRecord(await res.json()).data);
    return toNumber(wallet.topUpBalance, 0) + toNumber(wallet.voucherEfficientAmount, 0);
  } catch {
    return 0;
  }
}

/** `expired_time` is a Unix timestamp in seconds; -1 (or missing) means never. */
function isExpired(expiredTime: unknown): boolean {
  const seconds = toNumber(expiredTime, -1);
  return seconds > 0 && seconds * 1000 <= Date.now();
}

function buildKeyQuota(item: Record<string, unknown>, name: string, isOwnKey: boolean): UsageQuota {
  const unlimited = item.unlimited_quota === true;
  const used = Math.max(0, toNumber(item.used_quota, 0));
  const flags = [
    isOwnKey ? "this connection" : null,
    unlimited ? "unlimited" : null,
    toNumber(item.status, 1) !== 1 ? "disabled" : null,
    isExpired(item.expired_time) ? "expired" : null,
  ].filter(Boolean);
  const displayName = `Key: ${name}${flags.length > 0 ? ` (${flags.join(", ")})` : ""}`;

  if (unlimited) {
    // No absolute remaining: the dashboard would read a null/0 remaining as 0%.
    return { used, total: 0, remainingPercentage: 100, resetAt: null, unlimited, displayName };
  }
  const remaining = Math.max(0, toNumber(item.remain_quota, 0));
  const total = used + remaining;
  return {
    used,
    total,
    remaining,
    remainingPercentage: total > 0 ? clampPercentage((remaining / total) * 100) : 0,
    resetAt: null,
    unlimited,
    displayName,
    ...(isOwnKey ? {} : { fractionReported: false }),
  };
}

/**
 * TokenRouter Usage — account wallet balance plus one quota row per API key.
 */
export async function getTokenRouterUsage(apiKey: string, providerSpecificData: unknown) {
  const managementKey = readManagementKey(providerSpecificData);
  if (!managementKey) {
    return {
      message:
        "Add a TokenRouter Management Key to the connection to track quotas (TokenRouter dashboard → Settings → Management Key).",
      quotas: {},
    };
  }

  try {
    const walletBalance = await fetchWalletBalance(managementKey);
    const keysRes = await getJson(
      `${MANAGEMENT_BASE_URL}/api-keys?page=1&page_size=${KEYS_PAGE_SIZE}`,
      managementKey
    );

    if (keysRes.status === 401 || keysRes.status === 403) {
      return {
        message:
          "TokenRouter Management Key invalid or expired. Re-check the key on the connection.",
        quotas: {},
      };
    }
    if (!keysRes.ok) {
      return { message: `TokenRouter Management API error (${keysRes.status}).` };
    }

    const items = toRecord(toRecord(await keysRes.json()).data).items;
    const quotas: Record<string, UsageQuota> = {};

    if (walletBalance > 0) {
      quotas.balance = {
        used: 0,
        total: 0,
        remaining: walletBalance,
        remainingPercentage: 100,
        resetAt: null,
        unlimited: true,
        currency: "USD",
        displayName: "Account Balance (USD)",
      };
    }

    for (const raw of Array.isArray(items) ? items : []) {
      const item = toRecord(raw);
      const name = typeof item.name === "string" && item.name.trim() ? item.name.trim() : "unnamed";
      let quotaKey = `key:${name}`;
      for (let n = 2; quotas[quotaKey]; n += 1) quotaKey = `key:${name}#${n}`;
      const isOwnKey = Boolean(apiKey) && item.key === apiKey;
      quotas[quotaKey] = buildKeyQuota(item, name, isOwnKey);
    }

    if (Object.keys(quotas).length === 0) {
      return {
        plan: PLAN_LABEL,
        message: "No API keys or wallet balance found for this TokenRouter Management Key.",
        quotas,
      };
    }
    return { plan: PLAN_LABEL, quotas };
  } catch {
    // Fixed string: never surface raw error text (it can carry request details).
    return { message: "TokenRouter Management API unreachable. Try again later." };
  }
}
