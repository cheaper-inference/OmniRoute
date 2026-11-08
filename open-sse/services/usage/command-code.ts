/**
 * usage/command-code.ts — Command Code (commandcode.ai) usage fetcher.
 *
 * Bearer `/alpha` endpoints (same surface the CLI `/usage` view uses):
 *   GET /alpha/whoami
 *   GET /alpha/billing/credits        → remaining pools + windowLimits
 *   GET /alpha/billing/subscriptions  → planId + billing period (soft)
 *   GET /alpha/usage/summary          → period spend (soft)
 *
 * Surfaces five_hour / weekly rolling USD windows plus a credits pool quota
 * for Provider Limits and genericQuotaFetcher preflight.
 */

import { sanitizeErrorMessage } from "../../utils/error.ts";
import { fetchWithConnectionProxy } from "../connectionProxyFetch.ts";
import { toNumber, toRecord } from "./scalars.ts";
import { createQuotaFromUsage, parseResetTime, type UsageQuota } from "./quota.ts";

const COMMAND_CODE_API_BASE =
  process.env.COMMANDCODE_API_URL?.trim() || "https://api.commandcode.ai";
const FETCH_TIMEOUT_MS = 10_000;

type JsonRecord = Record<string, unknown>;

const PLAN_LABELS: Record<string, string> = {
  "individual-goat": "Command Code · GOAT",
  "individual-go": "Command Code · Go",
  "individual-pro": "Command Code · Pro",
  "individual-max-10x": "Command Code · Max 10×",
  "individual-max-20x": "Command Code · Max 20×",
  "team-pro": "Command Code · Team Pro",
};

function withCurrency(quota: UsageQuota, displayName: string): UsageQuota {
  return {
    ...quota,
    currency: "USD",
    displayName,
  };
}

function humanizePlanId(planId: string | undefined): string {
  if (!planId) return "Command Code";
  const mapped = PLAN_LABELS[planId];
  if (mapped) return mapped;
  const title = planId
    .replace(/^individual-/, "")
    .replace(/^team-/, "Team ")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return `Command Code · ${title || planId}`;
}

function orgQuery(orgId: string | null | undefined): string {
  if (!orgId) return "";
  return `?orgId=${encodeURIComponent(orgId)}`;
}

async function fetchJson(
  path: string,
  apiKey: string,
  connectionId?: string
): Promise<{ ok: boolean; status: number; body: JsonRecord | null }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const commandInit: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    };
    const response = connectionId
      ? await fetchWithConnectionProxy(connectionId, `${COMMAND_CODE_API_BASE}${path}`, commandInit)
      : await globalThis.fetch(`${COMMAND_CODE_API_BASE}${path}`, commandInit);
    if (!response) return { ok: false, status: 0, body: null };
    const text = await response.text();
    let body: JsonRecord | null = null;
    if (text) {
      try {
        body = toRecord(JSON.parse(text));
      } catch {
        body = null;
      }
    }
    return { ok: response.ok, status: response.status, body };
  } finally {
    clearTimeout(timer);
  }
}

function creditRemaining(credits: JsonRecord): number {
  return (
    Math.max(0, toNumber(credits.monthlyCredits, 0)) +
    Math.max(0, toNumber(credits.purchasedCredits, 0)) +
    Math.max(0, toNumber(credits.freeCredits, 0))
  );
}

function windowQuota(window: unknown, displayName: string): UsageQuota | null {
  const w = toRecord(window);
  const cap = toNumber(w.cap, 0);
  if (!(cap > 0)) return null;
  const used = toNumber(w.used, 0);
  return withCurrency(createQuotaFromUsage(used, cap, w.resetAt), displayName);
}

/**
 * Command Code Usage — monthly credit pool + 5h/weekly rolling windows.
 */
export async function getCommandCodeUsage(apiKey: string, connectionId?: string) {
  if (!apiKey) {
    return { message: "Command Code API key not available. Add a key to view usage." };
  }

  try {
    let orgId: string | null = null;
    try {
      const whoami = await fetchJson("/alpha/whoami", apiKey, connectionId);
      if (whoami.status === 401 || whoami.status === 403) {
        return {
          message:
            "Command Code connected. The API key was rejected — reconnect or rotate the key.",
        };
      }
      if (whoami.ok && whoami.body) {
        const org = toRecord(whoami.body.org);
        const id = typeof org.id === "string" && org.id.trim() ? org.id.trim() : null;
        orgId = id;
      }
    } catch {
      // whoami is optional — continue without orgId
    }

    const q = orgQuery(orgId);
    const creditsRes = await fetchJson(`/alpha/billing/credits${q}`, apiKey, connectionId);

    if (creditsRes.status === 401 || creditsRes.status === 403) {
      return {
        message: "Command Code connected. The API key was rejected — reconnect or rotate the key.",
      };
    }
    if (!creditsRes.ok || !creditsRes.body) {
      return {
        message: `Command Code connected. /alpha/billing/credits returned HTTP ${creditsRes.status}.`,
      };
    }

    const creditsObj = toRecord(creditsRes.body.credits);
    const windowLimits = toRecord(creditsRes.body.windowLimits);
    const remaining = creditRemaining(creditsObj);

    let planId: string | undefined;
    let periodStart: string | undefined;
    let periodEnd: string | null = null;

    try {
      const subRes = await fetchJson(`/alpha/billing/subscriptions${q}`, apiKey, connectionId);
      if (subRes.ok && subRes.body) {
        const data = toRecord(subRes.body.data);
        if (typeof data.planId === "string" && data.planId.trim()) {
          planId = data.planId.trim();
        }
        if (typeof data.currentPeriodStart === "string") {
          periodStart = data.currentPeriodStart;
        }
        periodEnd = parseResetTime(data.currentPeriodEnd);
      }
    } catch {
      // subscription enrichment is soft-fail
    }

    let periodUsed = 0;
    try {
      const sinceQ =
        periodStart != null ? `${q ? `${q}&` : "?"}since=${encodeURIComponent(periodStart)}` : q;
      const summaryRes = await fetchJson(`/alpha/usage/summary${sinceQ}`, apiKey, connectionId);
      if (summaryRes.ok && summaryRes.body) {
        const cost = toNumber(summaryRes.body.totalCost, Number.NaN);
        if (Number.isFinite(cost) && cost >= 0) {
          periodUsed = cost;
        } else {
          const monthly = toNumber(summaryRes.body.totalMonthlyCredits, Number.NaN);
          if (Number.isFinite(monthly) && monthly >= 0) periodUsed = monthly;
        }
      }
    } catch {
      // summary enrichment is soft-fail
    }

    const quotas: Record<string, UsageQuota> = {};

    const fiveHour = windowQuota(windowLimits.fiveHour, "5-hour window");
    if (fiveHour) quotas.five_hour = fiveHour;

    const weekly = windowQuota(windowLimits.weekly, "Weekly window");
    if (weekly) quotas.weekly = weekly;

    const creditsTotal = periodUsed + remaining;
    const creditsRemainingPct =
      creditsTotal > 0
        ? Math.round((remaining / creditsTotal) * 1000) / 10
        : remaining > 0
          ? 100
          : 0;
    quotas.credits = {
      used: Math.max(0, periodUsed),
      total: Math.max(0, creditsTotal),
      remaining,
      remainingPercentage: creditsRemainingPct,
      resetAt: periodEnd,
      unlimited: false,
      currency: "USD",
      displayName: "Credits",
      grantedBalance: Math.max(0, toNumber(creditsObj.monthlyCredits, 0)),
      toppedUpBalance:
        Math.max(0, toNumber(creditsObj.purchasedCredits, 0)) +
        Math.max(0, toNumber(creditsObj.freeCredits, 0)),
    };

    return {
      plan: humanizePlanId(planId),
      quotas,
      windowExceeded: typeof windowLimits.exceeded === "string" ? windowLimits.exceeded : null,
      limited: windowLimits.limited === true,
    };
  } catch (error) {
    return {
      message: `Command Code usage error: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`,
    };
  }
}
