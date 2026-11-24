/**
 * usage/mistral.ts — Mistral budget + plan fetcher.
 *
 *   GET https://api.mistral.ai/v1/billing/budget   (Bearer API key)
 *     → { vibe_budget?, api_budget?, usage_percentage, initial_budget, currency, reset_at }
 *   GET https://console.mistral.ai/api/vibe/whoami (Bearer API key)
 *     → { plan_type: "CHAT"|"API", plan_name: "FREE"|"INDIVIDUAL"|"EDU"|"TEAM", ... }
 *
 * plan_type CHAT enforces `vibe_budget`; API enforces `api_budget`.
 */

import { toRecord, toNumber, roundCurrency } from "./scalars.ts";
import { parseResetTime, type UsageQuota } from "./quota.ts";

const MISTRAL_BUDGET_URL = "https://api.mistral.ai/v1/billing/budget";
const MISTRAL_WHOAMI_URL = "https://console.mistral.ai/api/vibe/whoami";
const FETCH_TIMEOUT_MS = 8_000;

const PLAN_LABELS: Record<string, string> = {
  FREE: "Free",
  INDIVIDUAL: "Pro",
  EDU: "Student",
  TEAM: "Team",
  API: "Studio",
};

export async function fetchJson(
  url: string,
  apiKey: string
): Promise<Record<string, unknown> | null> {
  try {
    if (new URL(url).protocol !== "https:") return null;
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return toRecord(await res.json());
  } catch {
    return null;
  }
}

function buildQuota(label: string, raw: unknown): UsageQuota | null {
  const budget = toRecord(raw);
  if (!Object.keys(budget).length) return null;
  const pct = Math.min(100, Math.max(0, toNumber(budget.usage_percentage, 0)));
  const total = Math.max(0, toNumber(budget.initial_budget, 0));
  const used = roundCurrency((total * pct) / 100);
  const remaining = roundCurrency(total - used);
  const currency = typeof budget.currency === "string" ? budget.currency : "USD";
  return {
    used,
    total,
    remaining,
    remainingPercentage: 100 - pct,
    resetAt: parseResetTime(budget.reset_at),
    unlimited: false,
    currency,
    displayName: `${label}: ${total} ${currency}`,
  };
}

function parsePlan(whoami: Record<string, unknown> | null) {
  const planType =
    typeof whoami?.plan_type === "string" ? whoami.plan_type.trim().toLowerCase() : "";
  const planName = typeof whoami?.plan_name === "string" ? whoami.plan_name.toUpperCase() : "";
  const plan = planType === "api" ? PLAN_LABELS.API : (PLAN_LABELS[planName] ?? (planName || null));
  return { planType, plan };
}

export async function getMistralUsage(apiKey: string) {
  if (!apiKey) {
    return { message: "Mistral API key not available. Add a key to view usage." };
  }

  const [budget, whoami] = await Promise.all([
    fetchJson(MISTRAL_BUDGET_URL, apiKey),
    fetchJson(MISTRAL_WHOAMI_URL, apiKey),
  ]);

  if (!budget) {
    return { message: "Mistral connected. Unable to fetch budget from /v1/billing/budget." };
  }

  const { planType, plan } = parsePlan(whoami);

  const showVibe = planType.length > 0 && planType !== "api";
  const showApi = planType.length > 0 && planType !== "chat";

  const quotas: Record<string, UsageQuota> = {};
  if (showVibe) {
    const q = buildQuota("Vibe Budget", budget.vibe_budget);
    if (q) quotas["Vibe Budget"] = q;
  }
  if (showApi) {
    const q = buildQuota("API Budget", budget.api_budget);
    if (q) quotas["API Budget"] = q;
  }

  return { plan, quotas };
}
