/**
 * Antigravity quota-summary fetcher and parser.
 *
 * `retrieveUserQuotaSummary` reports quota per model family rather than per model.
 * Google currently returns Gemini, Gemini 4 Argon, and Claude/GPT families, with
 * independent 5-hour and weekly windows. Per-model `retrieveUserQuota` remains the
 * fallback when this optional, undocumented RPC is unavailable.
 */
import { ANTIGRAVITY_RUNTIME_BASE_URLS } from "../../config/antigravityUpstream.ts";
import { toRecord, toNumber } from "./scalars.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";
import { getAntigravityContentHeaders } from "../antigravityHeaders.ts";
import type { AntigravityClientProfile } from "../antigravityClientProfile.ts";

type JsonRecord = Record<string, unknown>;

interface AntigravityQuotaSummaryOptions {
  forceRefresh?: boolean;
}

export type AntigravityQuotaWindowName = "session" | "weekly";
export type AntigravityQuotaGroupId = "gemini" | "claude_gpt" | "gemini_4_argon" | string;

export type AntigravityQuotaWindow = UsageQuota & {
  window: AntigravityQuotaWindowName;
  quotaGroupId: AntigravityQuotaGroupId;
  quotaAggregate: true;
  quotaSource: "retrieveUserQuotaSummary";
};

export type AntigravityQuotaGroup = {
  id: AntigravityQuotaGroupId;
  displayName: string;
  windows: Partial<Record<AntigravityQuotaWindowName, AntigravityQuotaWindow>>;
  models: string[];
};

export type AntigravityQuotaSummary = {
  groups: AntigravityQuotaGroup[];
  quotas: Record<string, AntigravityQuotaWindow>;
  hasArgon?: boolean;
};

const QUOTA_CACHE_TTL_MS = 60 * 1000;
const quotaCache = new Map<string, { data: unknown; fetchedAt: number }>();
const quotaInflight = new Map<string, Promise<unknown>>();

const cleanupTimer = setInterval(() => {
  const cutoff = Date.now() - QUOTA_CACHE_TTL_MS * 2;
  for (const [key, value] of quotaCache) {
    if (value.fetchedAt < cutoff) quotaCache.delete(key);
  }
}, QUOTA_CACHE_TTL_MS);
cleanupTimer.unref?.();

function buildCacheKey(
  accessToken: string,
  projectId: string | null | undefined,
  clientProfile: AntigravityClientProfile
): string {
  return `${accessToken.substring(0, 16)}:${projectId || "default"}:${clientProfile}`;
}

export async function fetchAntigravityUserQuotaSummaryCached(
  accessToken: string,
  projectId?: string | null,
  clientProfile: AntigravityClientProfile = "cli",
  options: AntigravityQuotaSummaryOptions = {}
): Promise<unknown> {
  const cacheKey = buildCacheKey(accessToken, projectId, clientProfile);
  if (!options.forceRefresh) {
    const cached = quotaCache.get(cacheKey);
    if (cached && Date.now() - cached.fetchedAt < QUOTA_CACHE_TTL_MS) return cached.data;
    const pending = quotaInflight.get(cacheKey);
    if (pending) return pending;
  } else {
    quotaCache.delete(cacheKey);
  }

  const promise = (async () => {
    for (const baseUrl of ANTIGRAVITY_RUNTIME_BASE_URLS) {
      try {
        const response = await fetch(`${baseUrl}/v1internal:retrieveUserQuotaSummary`, {
          method: "POST",
          headers: getAntigravityContentHeaders(clientProfile, accessToken),
          body: JSON.stringify(projectId ? { project: projectId } : {}),
        });
        if (!response.ok) continue;
        const data = await response.json();
        quotaCache.set(cacheKey, { data, fetchedAt: Date.now() });
        return data;
      } catch {
        // Try the next Antigravity runtime endpoint.
      }
    }
    return null;
  })().finally(() => quotaInflight.delete(cacheKey));

  quotaInflight.set(cacheKey, promise);
  return promise;
}

function extractSummaryGroups(summaryData: unknown): unknown[] {
  const root = toRecord(summaryData);
  if (Array.isArray(root.groups)) return root.groups;
  const nested = toRecord(root.quotaSummary);
  return Array.isArray(nested.groups) ? nested.groups : [];
}

const ARGON_GROUP_PATTERN = /\bargon\b|\bgemini[\s_-]*4\b/i;
const ARGON_BUCKET_PATTERN = /\bargon\b|gemini-argon-wtu-weekly/i;

function isArgonBucket(rawBucket: unknown): boolean {
  if (!rawBucket || typeof rawBucket !== "object") return false;
  const bucket = toRecord(rawBucket);
  return ARGON_BUCKET_PATTERN.test(
    `${String(bucket.bucketId || "")} ${String(bucket.displayName || "")}`
  );
}

function isArgonGroup(text: string, buckets?: unknown[]): boolean {
  if (ARGON_GROUP_PATTERN.test(text)) return true;
  return Array.isArray(buckets) && buckets.some(isArgonBucket);
}

function normalizeGroup(
  displayName: unknown,
  id: unknown,
  buckets?: unknown[]
): {
  id: AntigravityQuotaGroupId;
  displayName: string;
} | null {
  const rawDisplay = String(displayName || id || "").trim();
  const text = `${String(id || "")} ${String(displayName || "")}`.toLowerCase();
  if (isArgonGroup(text, buckets)) {
    return {
      id: "gemini_4_argon",
      displayName: rawDisplay || "Gemini 4 Argon",
    };
  }
  if (text.includes("gemini")) return { id: "gemini", displayName: "Gemini Models" };
  if (text.includes("claude") || text.includes("gpt")) {
    return { id: "claude_gpt", displayName: "Claude & GPT Models" };
  }

  const fallback = String(displayName || id || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return fallback ? { id: fallback, displayName: String(displayName || id).trim() } : null;
}

/**
 * Determine whether the upstream `retrieveUserQuotaSummary` payload indicates Argon
 * ("Gemini 4 Argon" / `gemini-argon-wtu-weekly`) entitlement.
 *
 * Returns `undefined` when `summaryData` is null/invalid or `groups[]` is empty so
 * transient network failures never mark an account ineligible.
 */
export function detectAntigravityArgonEligibility(
  summaryData: unknown,
  plan?: string | null
): boolean | undefined {
  if (plan === "Ultra") return true;
  if (!summaryData || typeof summaryData !== "object") return undefined;
  const groups = extractSummaryGroups(summaryData);
  if (groups.length === 0) return undefined;

  for (const rawGroup of groups) {
    const group = toRecord(rawGroup);
    const buckets = Array.isArray(group.buckets) ? group.buckets : [];
    const normalized = normalizeGroup(group.displayName, group.groupId ?? group.id, buckets);
    if (normalized?.id !== "gemini_4_argon") continue;

    const hasEnabledBucket =
      buckets.length === 0 ||
      buckets.some((rawBucket) => {
        if (!rawBucket || typeof rawBucket !== "object") return false;
        return toRecord(rawBucket).disabled !== true;
      });
    if (hasEnabledBucket) return true;
  }

  return false;
}

/** Map a summary bucket into a supported quota window. */
export function normalizeAntigravityQuotaWindow(
  bucket: JsonRecord
): AntigravityQuotaWindowName | null {
  const explicit = String(bucket.window || "")
    .trim()
    .toLowerCase();
  if (explicit === "5h" || explicit === "session") return "session";
  if (explicit === "weekly" || explicit === "7d") return "weekly";

  const text = `${String(bucket.bucketId || "")} ${String(bucket.displayName || "")}`.toLowerCase();
  if (/\b5h\b|five[-\s]?hour|\bsession\b/.test(text)) return "session";
  if (/\bweekly\b|\b7d\b|seven[-\s]?day/.test(text)) return "weekly";
  return null;
}

function toQuotaWindow(
  groupId: AntigravityQuotaGroupId,
  window: AntigravityQuotaWindowName,
  bucket: JsonRecord
): AntigravityQuotaWindow | null {
  if (bucket.disabled === true) return null;

  // retrieveUserQuotaSummary currently reports consumption under `remaining`, unlike
  // retrieveUserQuota's flat bucket shape. Accept both so an upstream envelope change
  // cannot silently erase every family window from Provider Quota.
  const remainingData = toRecord(bucket.remaining);
  const rawFraction = toNumber(remainingData.remainingFraction ?? bucket.remainingFraction, -1);
  if (rawFraction < 0) return null;

  const remainingFraction = Math.max(0, Math.min(1, rawFraction));
  const resetAt = parseResetTime(remainingData.resetTime ?? bucket.resetTime);
  const unlimited = !resetAt && remainingFraction >= 1;
  const total = 1000;
  const remaining = Math.round(total * remainingFraction);

  return {
    window,
    quotaGroupId: groupId,
    quotaAggregate: true,
    used: unlimited ? 0 : Math.max(0, total - remaining),
    total: unlimited ? 0 : total,
    resetAt,
    remainingPercentage: unlimited ? 100 : remainingFraction * 100,
    unlimited,
    fractionReported: true,
    quotaSource: "retrieveUserQuotaSummary",
  };
}

/** Parse one group's buckets into its windows, also projecting them into the flat `quotas` map. */
function collectGroupWindows(
  groupId: AntigravityQuotaGroupId,
  buckets: unknown[],
  quotas: Record<string, AntigravityQuotaWindow>
): AntigravityQuotaGroup["windows"] {
  const windows: AntigravityQuotaGroup["windows"] = {};
  for (const rawBucket of buckets) {
    const bucket = toRecord(rawBucket);
    const window = normalizeAntigravityQuotaWindow(bucket);
    if (!window || windows[window]) continue;
    const parsed = toQuotaWindow(groupId, window, bucket);
    if (!parsed) continue;
    windows[window] = parsed;
    quotas[`${groupId}_${window}`] = parsed;
    if (groupId === "gemini_4_argon" && window === "weekly") {
      quotas.argon_weekly = { ...parsed };
    }
  }
  return windows;
}

/** Parse all supported family/window buckets, preserving the group structure and flat projection. */
export function parseAntigravityQuotaSummary(
  summaryData: unknown,
  plan?: string | null
): AntigravityQuotaSummary {
  const groups: AntigravityQuotaGroup[] = [];
  const quotas: Record<string, AntigravityQuotaWindow> = {};
  const hasArgon = detectAntigravityArgonEligibility(summaryData, plan);

  for (const rawGroup of extractSummaryGroups(summaryData)) {
    const group = toRecord(rawGroup);
    const buckets = Array.isArray(group.buckets) ? group.buckets : [];
    const normalized = normalizeGroup(group.displayName, group.groupId ?? group.id, buckets);
    if (!normalized) continue;

    const windows = collectGroupWindows(normalized.id, buckets, quotas);

    if (Object.keys(windows).length > 0) {
      groups.push({ ...normalized, windows, models: [] });
    }
  }

  return {
    groups,
    quotas,
    ...(typeof hasArgon === "boolean" ? { hasArgon } : {}),
  };
}

/** Compatibility wrapper for existing callers that only need weekly aggregate entries. */
export function parseAntigravityWeeklyQuotas(
  summaryData: unknown,
  plan?: string | null
): Record<string, UsageQuota> {
  const summary = parseAntigravityQuotaSummary(summaryData, plan);
  return Object.fromEntries(
    Object.entries(summary.quotas).filter(([, quota]) => quota.window === "weekly")
  );
}

export async function fetchAndParseAntigravityQuotaSummary(
  accessToken: string,
  projectId: string | undefined | null,
  clientProfile: AntigravityClientProfile = "cli",
  options: AntigravityQuotaSummaryOptions & { plan?: string | null } = {}
): Promise<AntigravityQuotaSummary> {
  const data = await fetchAntigravityUserQuotaSummaryCached(
    accessToken,
    projectId,
    clientProfile,
    options
  );
  return parseAntigravityQuotaSummary(data, options.plan);
}

/** Compatibility wrapper retained for leaf-module consumers. */
export async function fetchAndParseAntigravityWeeklyQuotas(
  accessToken: string,
  projectId: string | undefined | null,
  clientProfile: AntigravityClientProfile = "cli",
  options: AntigravityQuotaSummaryOptions & { plan?: string | null } = {}
): Promise<Record<string, UsageQuota>> {
  const summary = await fetchAndParseAntigravityQuotaSummary(
    accessToken,
    projectId,
    clientProfile,
    options
  );
  return Object.fromEntries(
    Object.entries(summary.quotas).filter(([, quota]) => quota.window === "weekly")
  );
}
