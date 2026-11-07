/**
 * Server-side sync for the separately signed, supporter-only Radar offers feed.
 * Every failure preserves the last verified local cache.
 */

import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { RadarOffersFeedSchema, type RadarOffersFeed } from "./offersFeedSchema";
import { compareVersions, type RadarSettingsSnapshot } from "./sync";
import { verifyFeedBytes } from "./verify";
import { readBoundedBytes } from "./readBoundedBytes";

const DEFAULT_FEED_BASE_URL = "https://radar.omniroute.online";
const SYNC_TIMEOUT_MS = 30_000;

export type OffersSyncStatus =
  | { status: "disabled" }
  | { status: "opt_out" }
  | { status: "no_key" }
  | { status: "invalid_signature" }
  | { status: "invalid_schema" }
  | { status: "wrong_tier" }
  | { status: "stale" }
  | { status: "too_large" }
  | { status: "updated"; version: string }
  | { status: "error"; reason: string };

export interface RadarOffersCacheEntry {
  version: string;
  tier: "live";
  payload: string;
  signature: string;
  fetchedAt?: string;
}

export interface OffersSyncDeps {
  fetch?: typeof globalThis.fetch;
  now?: () => Date;
  getFlag?: (key: string) => boolean;
  getSettings?: () => RadarSettingsSnapshot;
  getCache?: () => RadarOffersCacheEntry | null;
  setCache?: (entry: RadarOffersCacheEntry) => void;
}

export async function syncRadarOffers(deps: OffersSyncDeps = {}): Promise<OffersSyncStatus> {
  const {
    fetch: fetchFn = globalThis.fetch,
    now = () => new Date(),
    getFlag = isFeatureFlagEnabled,
    getSettings: getSettingsFn,
    getCache: getCacheFn,
    setCache: setCacheFn,
  } = deps;

  try {
    if (!getFlag("RADAR_ENABLED")) return { status: "disabled" };

    const settings = getSettingsFn
      ? getSettingsFn()
      : (await import("@/lib/db/radar")).getRadarSettings();
    if (!settings.optIn) return { status: "opt_out" };
    if (!settings.supporterKey) return { status: "no_key" };

    const baseUrl = (process.env.RADAR_FEED_URL || DEFAULT_FEED_BASE_URL).replace(/\/+$/, "");
    const response = await fetchFn(`${baseUrl}/v1/offers/latest`, {
      method: "GET",
      headers: { Authorization: `Bearer ${settings.supporterKey}` },
      signal: AbortSignal.timeout(SYNC_TIMEOUT_MS),
    });
    if (!response.ok) {
      return {
        status: "error",
        reason: `Offers feed request failed with status ${response.status}`,
      };
    }

    const rawBytes = await readBoundedBytes(response);
    if (!rawBytes) return { status: "too_large" };

    const signature = response.headers.get("x-omniroute-feed-signature") ?? "";
    if (!verifyFeedBytes(rawBytes, signature)) return { status: "invalid_signature" };

    let feed: RadarOffersFeed;
    try {
      feed = RadarOffersFeedSchema.parse(JSON.parse(rawBytes.toString("utf8")));
    } catch {
      return { status: "invalid_schema" };
    }

    if (response.headers.get("x-omniroute-feed-tier") !== "live" || feed.tier !== "live") {
      return { status: "wrong_tier" };
    }

    const existing = getCacheFn
      ? getCacheFn()
      : (await import("@/lib/db/radar")).getRadarOffersCache();
    if (existing && compareVersions(feed.version, existing.version) <= 0) {
      return { status: "stale" };
    }

    const cacheEntry: RadarOffersCacheEntry = {
      version: feed.version,
      tier: "live",
      payload: rawBytes.toString("utf8"),
      signature,
      fetchedAt: now().toISOString(),
    };
    if (setCacheFn) {
      setCacheFn(cacheEntry);
    } else {
      (await import("@/lib/db/radar")).setRadarOffersCache(cacheEntry);
    }

    return { status: "updated", version: feed.version };
  } catch (error: unknown) {
    const reason = (sanitizeErrorMessage(error) || "Radar offers sync failed").replace(
      /omr_[a-f0-9]{40}/gi,
      "[REDACTED]"
    );
    return { status: "error", reason };
  }
}
