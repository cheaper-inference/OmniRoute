/** Server-side sync for the signed, public Radar Intel feed. */

import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

import { RadarIntelFeedSchema, type RadarIntelFeed } from "./intelFeedSchema";
import { compareVersions, type RadarSettingsSnapshot } from "./sync";
import { verifyFeedBytes } from "./verify";
import { readBoundedBytes } from "./readBoundedBytes";

const DEFAULT_FEED_BASE_URL = "https://radar.omniroute.online";
const SYNC_TIMEOUT_MS = 30_000;

export type IntelSyncStatus =
  | { status: "disabled" }
  | { status: "opt_out" }
  | { status: "unpublished" }
  | { status: "invalid_signature" }
  | { status: "invalid_schema" }
  | { status: "stale" }
  | { status: "too_large" }
  | { status: "updated"; version: string }
  | { status: "error"; reason: string };

export interface RadarIntelCacheEntry {
  version: string;
  tier: "live";
  payload: string;
  signature: string;
  supporterIdentity: string;
  fetchedAt?: string;
}

export interface IntelSyncDeps {
  fetch?: typeof globalThis.fetch;
  now?: () => Date;
  getFlag?: (key: string) => boolean;
  getSettings?: () => RadarSettingsSnapshot;
  getCache?: () => (Omit<RadarIntelCacheEntry, "tier"> & { tier: string }) | null;
  setCache?: (entry: RadarIntelCacheEntry) => void;
  touchCache?: (fetchedAt: string) => void;
  clearCache?: () => void;
}

export async function syncRadarIntel(deps: IntelSyncDeps = {}): Promise<IntelSyncStatus> {
  const {
    fetch: fetchFn = globalThis.fetch,
    now = () => new Date(),
    getFlag = isFeatureFlagEnabled,
    getSettings: getSettingsFn,
    getCache: getCacheFn,
    setCache: setCacheFn,
    touchCache: touchCacheFn,
    clearCache: clearCacheFn,
  } = deps;

  try {
    if (!getFlag("RADAR_ENABLED")) return { status: "disabled" };
    const settings = getSettingsFn
      ? getSettingsFn()
      : (await import("@/lib/db/radar")).getRadarSettings();
    if (!settings.optIn) return { status: "opt_out" };

    const baseUrl = (process.env.RADAR_FEED_URL || DEFAULT_FEED_BASE_URL).replace(/\/+$/, "");
    const response = await fetchFn(`${baseUrl}/v1/intel/latest`, {
      method: "GET",
      signal: AbortSignal.timeout(SYNC_TIMEOUT_MS),
    });
    if (response.status === 404) {
      const clearCache = clearCacheFn ?? (await import("@/lib/db/radar")).clearRadarIntelCache;
      clearCache();
      return { status: "unpublished" };
    }
    if (!response.ok) {
      return {
        status: "error",
        reason: `Intel feed request failed with status ${response.status}`,
      };
    }

    const rawBytes = await readBoundedBytes(response);
    if (!rawBytes) return { status: "too_large" };

    const signature = response.headers.get("x-omniroute-feed-signature") ?? "";
    if (!verifyFeedBytes(rawBytes, signature)) return { status: "invalid_signature" };

    let feed: RadarIntelFeed;
    try {
      feed = RadarIntelFeedSchema.parse(JSON.parse(rawBytes.toString("utf8")));
    } catch {
      return { status: "invalid_schema" };
    }
    const existing = getCacheFn
      ? getCacheFn()
      : (await import("@/lib/db/radar")).getRadarIntelCache();
    const versionComparison = existing ? compareVersions(feed.version, existing.version) : 1;
    if (versionComparison === 0) {
      const touchCache =
        touchCacheFn ?? (await import("@/lib/db/radar")).touchRadarIntelCacheFetchedAt;
      touchCache(now().toISOString());
    }
    if (versionComparison <= 0) {
      return { status: "stale" };
    }

    const cacheEntry: RadarIntelCacheEntry = {
      version: feed.version,
      tier: "live",
      payload: rawBytes.toString("utf8"),
      signature,
      supporterIdentity: "",
      fetchedAt: now().toISOString(),
    };
    if (setCacheFn) setCacheFn(cacheEntry);
    else (await import("@/lib/db/radar")).setRadarIntelCache(cacheEntry);

    return { status: "updated", version: feed.version };
  } catch (error: unknown) {
    const reason = (sanitizeErrorMessage(error) || "Radar Intel sync failed").replace(
      /omr_[a-f0-9]{40}/gi,
      "[REDACTED]"
    );
    return { status: "error", reason };
  }
}

export const RADAR_INTEL_STALE_MS = 24 * 60 * 60 * 1000;

export function shouldSyncRadarIntel(fetchedAt: string | null, nowMs = Date.now()): boolean {
  if (!fetchedAt) return true;
  const fetchedMs = Date.parse(fetchedAt);
  return !Number.isFinite(fetchedMs) || nowMs - fetchedMs >= RADAR_INTEL_STALE_MS;
}
