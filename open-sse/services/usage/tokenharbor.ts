/**
 * usage/tokenharbor.ts — TokenHarbor usage fetcher.
 *
 * Two GETs with the Bearer key (both free and not rate limited — the TokenHarbor
 * CLI polls them). Shapes live-verified 2026-11-14:
 *
 *   GET https://tokenharbor.ai/api/cli/free-tier   (documented)
 *   { "plan_name": "Agent Pass", "on_plan": true, "activated": true,
 *     "used_pct": 100, "exhausted": true, "reset_at": "2026-11-20T08:10:35.43+00:00",
 *     "plan_used_pct": 43, "plan_exhausted": false,
 *     "period_started_at": "...", "period_ends_at": "2026-11-20T08:10:35.43+00:00", ... }
 *
 *   GET https://tokenharbor.ai/api/cli/balance     (undocumented)
 *   { "balance_usd": 0, "paid_usd": 0, "trial_usd": 0, "bonus_usd": 0, ... }
 *
 * `used_pct` is the weekly allowance of the `:free` models; `plan_used_pct` is the
 * paid Pass window. The balance call is best-effort: when it fails the free/Pass
 * quotas are still returned. The response's `account_email` is never surfaced.
 */

import { toRecord, toNumber, clampPercentage } from "./scalars.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

const TOKENHARBOR_CONFIG = {
  freeTierUrl: "https://tokenharbor.ai/api/cli/free-tier",
  balanceUrl: "https://tokenharbor.ai/api/cli/balance",
};

/** Bound the usage probe so a hung upstream cannot hold the limits panel. */
const FETCH_TIMEOUT_MS = 10_000;

function percentQuota(usedPct: unknown, resetAt: unknown, displayName: string): UsageQuota {
  const used = clampPercentage(toNumber(usedPct, 0));
  return {
    used,
    total: 100,
    remaining: 100 - used,
    remainingPercentage: 100 - used,
    resetAt: parseResetTime(resetAt),
    unlimited: false,
    fractionReported: true,
    isPercentageOnly: true,
    displayName,
  };
}

async function fetchBalanceUsd(apiKey: string): Promise<number | null> {
  try {
    const res = await fetch(TOKENHARBOR_CONFIG.balanceUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const data = toRecord(await res.json());
    return typeof data.balance_usd === "number" ? data.balance_usd : null;
  } catch {
    return null;
  }
}

/**
 * TokenHarbor Usage
 * Weekly `:free` allowance, the paid Pass window (when on a plan) and the USD balance.
 */
export async function getTokenHarborUsage(apiKey: string) {
  if (!apiKey) {
    return { message: "TokenHarbor API key not available. Add a key to view usage." };
  }

  try {
    // Read the free-tier body inside its own branch: left unread while a slow balance call
    // runs, it would be cancelled by its timeout signal and the Free/Pass rows lost.
    const freeTier = fetch(TOKENHARBOR_CONFIG.freeTierUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    }).then(async (res) => ({ res, body: res.ok ? await res.json() : null }));
    const [{ res, body }, balanceUsd] = await Promise.all([freeTier, fetchBalanceUsd(apiKey)]);

    if (!res.ok) {
      if (res.status === 401) return { message: "Invalid TokenHarbor API key." };
      return { message: `TokenHarbor quota API error (${res.status})` };
    }

    const data = toRecord(body);
    const onPlan = data.on_plan === true;
    const planName = typeof data.plan_name === "string" && data.plan_name ? data.plan_name : null;
    const plan = onPlan && planName ? planName : "Free";
    const quotas: Record<string, UsageQuota> = {};

    // An account that never called a :free model reports activated: false, used_pct 0 and
    // reset_at null — the weekly window has not started, but the allowance is fully available.
    if (data.used_pct !== undefined) {
      quotas["free"] = percentQuota(data.used_pct, data.reset_at, "Free models (weekly)");
    }
    if (onPlan && data.plan_used_pct !== undefined) {
      quotas["pass"] = percentQuota(data.plan_used_pct, data.period_ends_at, planName || "Pass");
    }
    if (balanceUsd !== null) {
      // Same `quotas.balance` USD credits-row shape as usage/agentrouter.ts, so the
      // dashboard renders "$x.xx" (see parseProviderQuotas in quotaParsing.ts).
      quotas["balance"] = {
        used: 0,
        total: 0,
        remaining: balanceUsd,
        remainingPercentage: balanceUsd > 0 ? 100 : 0,
        resetAt: null,
        unlimited: true,
        currency: "USD",
        displayName: "Balance (USD)",
      };
    }

    if (Object.keys(quotas).length === 0) {
      return {
        plan,
        message: "TokenHarbor connected, but no usage data was returned for this key.",
      };
    }

    return { plan, quotas };
  } catch (error) {
    return {
      message: `TokenHarbor connected. Unable to fetch usage: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`,
    };
  }
}
