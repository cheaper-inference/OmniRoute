/**
 * usage/cloudflareAi.ts — Cloudflare Workers AI daily neuron usage.
 *
 * The Free and Paid plans both include 10,000 neurons/day at no charge.
 * The GraphQL Analytics dataset `aiInferenceAdaptiveGroups` reports observed
 * usage since 00:00 UTC. Analytics can be delayed or sampled. The daily
 * allocation is a usage reference, with an optional per-connection reference
 * configured via `providerSpecificData.dailyNeuronLimit`.
 *
 * The API token needs `Account Analytics: Read` on top of Workers AI access;
 * without it the card degrades to an explanatory message.
 */

import { z } from "zod";

import { sanitizeErrorMessage } from "../../utils/error.ts";
import { type UsageQuota } from "./quota.ts";
import { toRecord, toNumber, clampPercentage } from "./scalars.ts";

const CLOUDFLARE_GRAPHQL_URL = "https://api.cloudflare.com/client/v4/graphql";
const FREE_TIER_DAILY_NEURONS = 10_000;
const FETCH_TIMEOUT_MS = 15_000;
const ANALYTICS_PERMISSION_MESSAGE =
  "Cloudflare API token lacks the Account Analytics: Read permission needed for neuron usage.";

const WORKERS_AI_USAGE_QUERY = `query WorkersAiDailyUsage($accountTag: string!, $since: Time!) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      aiInferenceAdaptiveGroups(filter: { datetime_geq: $since }, limit: 100) {
        count
        sum {
          totalNeurons
        }
      }
    }
  }
}`;

const analyticsAmount = z.preprocess(
  (value) => toNumber(value, Number.NaN),
  z.number().nonnegative()
);
const analyticsAccounts = z.tuple([
  z.object({
    aiInferenceAdaptiveGroups: z.array(
      z.object({ count: analyticsAmount, sum: z.object({ totalNeurons: analyticsAmount }) })
    ),
  }),
]);

function utcDayWindow() {
  const day = new Date();
  day.setUTCHours(0, 0, 0, 0);
  const since = day.toISOString();
  day.setUTCHours(24, 0, 0, 0);
  return { since, resetAt: day.toISOString() };
}

function graphqlErrorMessage(errors: unknown): string | undefined {
  if (!Array.isArray(errors) || errors.length === 0) return;

  const first = sanitizeErrorMessage(String(toRecord(errors[0]).message ?? ""));
  const isAuthError = /not authori[sz]ed|unauthori[sz]ed|permission|forbidden|authentication/i.test(
    first
  );
  return isAuthError
    ? ANALYTICS_PERMISSION_MESSAGE
    : `Cloudflare analytics query error: ${first || "unknown error"}`;
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
  const { since, resetAt } = utcDayWindow();

  try {
    const response = await fetch(CLOUDFLARE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: WORKERS_AI_USAGE_QUERY,
        variables: { accountTag: accountId, since },
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
    const message = graphqlErrorMessage(payload.errors);
    if (message) return { message };

    const accounts = toRecord(toRecord(payload.data).viewer).accounts;
    const analytics = analyticsAccounts.safeParse(accounts);
    if (!analytics.success) return { message: "Cloudflare analytics data unavailable." };

    let neurons = 0;
    let requests = 0;
    for (const group of analytics.data[0].aiInferenceAdaptiveGroups) {
      neurons += group.sum.totalNeurons;
      requests += group.count;
    }

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
        unit: "neurons",
        // This reference is computed locally from usage and cannot establish exhaustion.
        fractionReported: false,
        displayName:
          overrideLimit > 0 ? "Daily usage reference (neurons)" : "Daily free allocation (neurons)",
      },
    };

    return {
      plan:
        overrideLimit > 0
          ? "Workers AI · configured daily usage reference"
          : "Workers AI · daily free allocation",
      requests,
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
