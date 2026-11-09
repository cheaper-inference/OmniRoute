/**
 * usage/cloudflareAi.ts — Cloudflare Workers AI daily neuron usage.
 *
 * Workers AI bills by "neurons" and gives free accounts 10,000 neurons/day,
 * reset at 00:00 UTC. There is no quota API, so today's consumption is read
 * from the GraphQL Analytics dataset `aiInferenceAdaptiveGroups`
 * (`sum.totalNeurons`, `count` = inferences) filtered by `date_geq` today (UTC)
 * and shown against that free ceiling. Paid accounts have no such cap: the
 * ceiling is a best-effort free-tier reference, overridable per connection via
 * `providerSpecificData.dailyNeuronLimit`.
 *
 * The API token needs `Account Analytics: Read` on top of Workers AI access;
 * without it the card degrades to an explanatory message.
 */

import { toRecord, toNumber, clampPercentage } from "./scalars.ts";
import { type UsageQuota } from "./quota.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

const CLOUDFLARE_GRAPHQL_URL = "https://api.cloudflare.com/client/v4/graphql";
const FREE_TIER_DAILY_NEURONS = 10_000;
const FETCH_TIMEOUT_MS = 10_000;
const ANALYTICS_PERMISSION_MESSAGE =
  "Cloudflare API token lacks the Account Analytics: Read permission needed for neuron usage.";

const WORKERS_AI_USAGE_QUERY = `query WorkersAiDailyUsage($accountTag: string!, $since: Date!) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      aiInferenceAdaptiveGroups(filter: { date_geq: $since }, limit: 100) {
        count
        sum {
          totalNeurons
        }
      }
    }
  }
}`;

function startOfTodayUtcDate(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

function nextUtcMidnight(now = new Date()): string {
  const next = new Date(now);
  next.setUTCHours(24, 0, 0, 0);
  return next.toISOString();
}

function isAuthErrorMessage(message: string): boolean {
  return /not authori[sz]ed|unauthori[sz]ed|permission|forbidden|authentication/i.test(message);
}

export async function getCloudflareAiUsage(apiKey: string, providerSpecificData?: unknown) {
  const psd = toRecord(providerSpecificData);
  const accountId = typeof psd.accountId === "string" ? psd.accountId.trim() : "";
  if (!accountId) {
    return { message: "Cloudflare Account ID missing. Add it to the connection to view usage." };
  }
  if (!apiKey) {
    return { message: "Cloudflare API token not available. Add a token to view usage." };
  }

  const overrideLimit = toNumber(psd.dailyNeuronLimit, 0);
  const total = overrideLimit > 0 ? overrideLimit : FREE_TIER_DAILY_NEURONS;

  try {
    const response = await fetch(CLOUDFLARE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: WORKERS_AI_USAGE_QUERY,
        variables: { accountTag: accountId, since: startOfTodayUtcDate() },
      }),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (response.status === 401 || response.status === 403) {
      return { message: ANALYTICS_PERMISSION_MESSAGE };
    }
    if (!response.ok) {
      return { message: `Cloudflare analytics API error (${response.status})` };
    }

    const payload = toRecord(await response.json());
    const errors = Array.isArray(payload.errors) ? payload.errors : [];
    if (errors.length > 0) {
      const first = sanitizeErrorMessage(String(toRecord(errors[0]).message ?? ""));
      if (isAuthErrorMessage(first)) return { message: ANALYTICS_PERMISSION_MESSAGE };
      return { message: `Cloudflare analytics query error: ${first || "unknown error"}` };
    }

    const accounts = toRecord(toRecord(payload.data).viewer).accounts;
    const account = Array.isArray(accounts) ? toRecord(accounts[0]) : {};
    const groups = Array.isArray(account.aiInferenceAdaptiveGroups)
      ? account.aiInferenceAdaptiveGroups
      : [];

    let neurons = 0;
    let requests = 0;
    for (const group of groups) {
      const row = toRecord(group);
      neurons += Math.max(0, toNumber(toRecord(row.sum).totalNeurons, 0));
      requests += Math.max(0, toNumber(row.count, 0));
    }

    const resetAt = nextUtcMidnight();
    const used = Math.round(neurons);
    const remaining = Math.max(total - used, 0);
    const quotas: Record<string, UsageQuota> = {
      neurons: {
        used,
        total,
        remaining,
        remainingPercentage: clampPercentage((remaining / total) * 100),
        resetAt,
        unlimited: false,
        displayName: "Neurons (daily)",
      },
      requests: {
        used: requests,
        total: 0,
        resetAt,
        unlimited: true,
        displayName: "Requests (today)",
      },
    };

    return {
      plan:
        overrideLimit > 0
          ? `Workers AI (${total.toLocaleString("en-US")} neurons/day)`
          : "Workers AI · best-effort (free tier 10k neurons/day)",
      resetDate: resetAt,
      quotas,
    };
  } catch (error) {
    return {
      message: `Cloudflare usage error: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`,
    };
  }
}
