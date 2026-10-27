/**
 * usage/megabrain.ts — MegaBrain plan usage limits (Provider Limits).
 *
 * One request, authenticated with the connection's device-code token or its mb-v1 API key:
 *   GET {MEGABRAIN_API_URL|https://api.getmegabrain.com}/api/profile/limits
 *   → { plan, limits: [{ id, label, usedPct, resetsAt }], extraUsageEnabled }
 *
 * The same endpoint drives the bars in MegaBrain's IDE extensions, CLI and Mac app: a
 * 5-hour session limit and a weekly limit, each as a percentage used with its reset time.
 * Free has no limits from MegaBrain (its requests are paid from credits).
 */
import { fetchWithConnectionProxy } from "../connectionProxyFetch.ts";
import { clampPercentage, toNumber, toRecord } from "./scalars.ts";
import { parseResetTime, type UsageQuota } from "./quota.ts";

const MEGABRAIN_API_BASE: string =
  process.env.MEGABRAIN_API_URL?.trim() || "https://api.getmegabrain.com";
const LIMITS_PATH = "/api/profile/limits";
const FETCH_TIMEOUT_MS = 8_000;

const PLAN_LABELS: Record<string, string> = {
  free: "MegaBrain · Free",
  plus: "MegaBrain · Plus",
  pro: "MegaBrain · Pro",
  super: "MegaBrain · Super",
  ultra: "MegaBrain · Ultra",
  max: "MegaBrain · Ultra",
};

function planLabel(plan: unknown): string {
  if (typeof plan !== "string" || !plan.trim()) return "MegaBrain";
  const id = plan.trim().toLowerCase();
  return PLAN_LABELS[id] ?? `MegaBrain · ${id.charAt(0).toUpperCase()}${id.slice(1)}`;
}

/** Map the limits payload onto percentage quotas keyed by limit id (session, weekly, core). */
export function buildMegabrainUsageResult(data: unknown): {
  plan: string;
  quotas: Record<string, UsageQuota>;
  extraUsageEnabled: boolean;
} {
  const body = toRecord(data);
  const quotas: Record<string, UsageQuota> = {};
  for (const entry of Array.isArray(body.limits) ? body.limits : []) {
    const limit = toRecord(entry);
    if (typeof limit.id !== "string" || !limit.id) continue;
    const used = clampPercentage(toNumber(limit.usedPct, 0));
    quotas[limit.id] = {
      used,
      total: 100,
      remaining: 100 - used,
      remainingPercentage: 100 - used,
      resetAt: parseResetTime(limit.resetsAt),
      unlimited: false,
      fractionReported: true,
      displayName: typeof limit.label === "string" ? limit.label : limit.id,
    };
  }
  return {
    plan: planLabel(body.plan),
    quotas,
    extraUsageEnabled: body.extraUsageEnabled === true,
  };
}

export async function getMegabrainUsage(token: string | null | undefined, connectionId?: string) {
  if (!token) {
    return { message: "MegaBrain account not connected. Sign in or add an API key to view usage." };
  }

  const url = `${MEGABRAIN_API_BASE}${LIMITS_PATH}`;
  const init: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "X-KILOCODE-EDITORNAME": "OmniRoute",
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  };

  let response: Response | null | undefined;
  try {
    response = connectionId
      ? await fetchWithConnectionProxy(connectionId, url, init)
      : await globalThis.fetch(url, init);
  } catch (error) {
    return { message: `MegaBrain usage request failed: ${(error as Error).message}` };
  }
  if (!response) return { message: "MegaBrain usage request failed." };
  if (response.status === 401 || response.status === 403) {
    return { message: "MegaBrain rejected the token or API key. Please re-authenticate." };
  }
  if (!response.ok) {
    return { message: `MegaBrain connected. ${LIMITS_PATH} returned HTTP ${response.status}.` };
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    return { message: `MegaBrain connected. ${LIMITS_PATH} returned a malformed body.` };
  }
  const result = buildMegabrainUsageResult(data);
  if (Object.keys(result.quotas).length === 0) {
    return {
      ...result,
      message: `${result.plan}: no plan limits; requests are paid from the account's credits.`,
    };
  }
  return result;
}
