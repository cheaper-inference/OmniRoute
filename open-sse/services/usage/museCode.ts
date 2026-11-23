/** usage/museCode.ts — Muse Code (Meta) usage fetcher.

Meta reports subscription usage to the Muse Code client on every Responses stream: a
`response.subscription_usage` frame after `response.completed` carries the session window (5 h)
and the weekly allowance, each as a used percentage plus its reset time. The provider request path
keeps the latest frame on the connection (`providerSpecificData.subscriptionUsage`, see
services/museSubscriptionUsage.ts); this fetcher turns it into `session` / `weekly` quota windows.

Until the connection has served a request there is no reading yet: the fetcher then reports only
the subscription tier captured when the key was minted (`subsTierName`, `subsTierId`,
`isSubsActive`, `hasPaymentMethod`) and leaves every quota field unreported, so missing usage is
never mistaken for an exhausted (or an unused) allowance. A configured console session can refresh quota independently of inference traffic.
*/

import { getMuseConsoleUsage } from "./museConsole.ts";
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

/** Stored evidence is projected without changing the persisted observation. */
function storedReading(data: JsonRecord): JsonRecord {
  const { metadata, summary } = describeSubscription(data);
  const reading = readStoredMuseSubscriptionUsage(data.subscriptionUsage);
  if (!reading) {
    return {
      ...metadata,
      resetAt: null,
      message: `${summary} Usage appears after this connection serves its first request.`,
    };
  }
  const quotas = museUsageQuotas(reading);
  return {
    ...metadata,
    quotas,
    resetAt: quotas.session?.resetAt ?? quotas.weekly?.resetAt ?? null,
    observedAt: reading.observedAt,
    message: `${summary} Usage as of ${reading.observedAt}, reported by Meta with the last response.`,
  };
}

/** Resolve console, stream and metadata evidence in that order without cross-source timestamps. */
export async function getMuseUsage(
  _accessToken?: string,
  providerSpecificData: Record<string, unknown> = {},
  _connectionId?: string
): Promise<JsonRecord> {
  const data = toRecord(providerSpecificData);
  const stored = storedReading(data);
  if (!data.museConsoleSession && !process.env.MUSE_CONSOLE_SESSION && stored.quotas) return stored;
  const current = await getMuseConsoleUsage(data);
  if ("message" in current) return { ...stored, message: `${stored.message} ${current.message}` };
  const { metadata } = describeSubscription(data);
  return {
    ...metadata,
    ...current,
    resetAt: current.quotas.session?.resetAt ?? current.quotas.weekly?.resetAt ?? null,
    message: "Live Muse Code console quota.",
  };
}
