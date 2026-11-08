/** usage/museCode.ts — Muse Code (Meta) usage fetcher.

Meta reports subscription usage to the Muse Code client on every Responses stream: a
`response.subscription_usage` frame after `response.completed` carries the session window (5 h)
and the weekly allowance, each as a used percentage plus its reset time. The provider request path
keeps the latest frame on the connection (`providerSpecificData.subscriptionUsage`, see
services/museSubscriptionUsage.ts); this fetcher turns it into `session` / `weekly` quota windows.

Until the connection has served a request there is no reading yet: the fetcher then reports only
the subscription tier captured when the key was minted (`subsTierName`, `subsTierId`,
`isSubsActive`, `hasPaymentMethod`) and leaves every quota field unreported, so missing usage is
never mistaken for an exhausted (or an unused) allowance. No network call is made either way.
*/

import { toRecord } from "./scalars.ts";
import { museUsageQuotas, readStoredMuseSubscriptionUsage } from "../museSubscriptionUsage.ts";

type JsonRecord = Record<string, unknown>;

function stringOrUndefined(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function booleanOrUndefined(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

/** The subscription tier captured at key mint, and the sentence that names it. */
function describeSubscription(psd: JsonRecord): { metadata: JsonRecord; summary: string } {
  const tierName = stringOrUndefined(psd.subsTierName);
  const isActive = booleanOrUndefined(psd.isSubsActive);
  const activity = isActive === undefined ? "activity unknown" : isActive ? "active" : "inactive";
  return {
    metadata: {
      provider: "muse-code",
      plan: tierName ?? "unknown",
      subsTierId: stringOrUndefined(psd.subsTierId),
      isSubsActive: isActive,
      hasPaymentMethod: booleanOrUndefined(psd.hasPaymentMethod),
      unlimited: false,
      details: [],
    },
    summary: tierName
      ? `Muse Code subscription: ${tierName} (${activity}).`
      : "Muse Code subscription detected.",
  };
}

/** Muse Code usage: the last reported session/weekly usage, plus the subscription tier. */
export async function getMuseUsage(
  _accessToken?: string,
  providerSpecificData: Record<string, unknown> = {},
  _connectionId?: string
): Promise<JsonRecord> {
  const psd = toRecord(providerSpecificData);
  const { metadata, summary } = describeSubscription(psd);
  const usage = readStoredMuseSubscriptionUsage(psd.subscriptionUsage);
  if (!usage) {
    // Omitting quota values distinguishes "not reported yet" from exhaustion.
    return {
      ...metadata,
      resetAt: null,
      message: `${summary} Usage appears after this connection serves its first request.`,
    };
  }
  const quotas = museUsageQuotas(usage);
  return {
    ...metadata,
    quotas,
    resetAt: quotas.session?.resetAt ?? quotas.weekly?.resetAt ?? null,
    observedAt: usage.observedAt,
    message: `${summary} Usage as of ${usage.observedAt}, reported by Meta with the last response.`,
  };
}
