/**
 * In-memory request/token counters for Gemini models — tracks both RPD (daily),
 * RPM (sliding 60s window), and TPM (sliding 60s token window) so that 429
 * responses can be classified as either quota_exhausted (RPD hit),
 * rate_limit_exceeded (RPM hit), or token_rate_exceeded (TPM hit).
 *
 * Gemini returns identical error bodies for all three, so we rely on
 * published per-model limits from geminiRateLimits.json to distinguish them.
 *
 * Counters are incremented on every Gemini request so that once usage
 * reaches the published limit, subsequent 429s are correctly classified.
 */

import geminiLimits from "../config/geminiRateLimits.json";

// ── RPD (daily) state ────────────────────────────────────────────────────────

interface DailyCount {
  date: string; // "YYYY-MM-DD"
  count: number;
}

const dailyCounts = new Map<string, DailyCount>();

// ── RPM (sliding 60s window) state ───────────────────────────────────────────

// A window is an append-only array plus a `head` index: expiring an entry moves `head`
// instead of copying the array, so each request costs O(1) amortised, not O(window).
interface SlidingWindow {
  entries: number[];
  head: number;
}

const minuteWindows = new Map<string, SlidingWindow>();

// ── TPM (sliding 60s token window) state ─────────────────────────────────────

const tokenWindows = new Map<string, SlidingWindow>();

// ── Helpers ──────────────────────────────────────────────────────────────────

function toDateKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function stripModelPrefix(modelId: string): string {
  // Only strip the "gemini/" provider prefix, never "gemini-" which is part
  // of the actual model name (e.g. "gemini-2.5-flash", "gemini-3.5-live-translate").
  return modelId.replace(/^gemini\//, "").trim();
}

function lookupValue(modelId: string, field: "rpm" | "rpd" | "tpm"): number {
  if (!modelId) return 0;
  const key = stripModelPrefix(modelId);
  const entry = (geminiLimits as Record<string, Record<string, number>>)[key];
  if (!entry) {
    for (const [knownKey, knownEntry] of Object.entries(geminiLimits)) {
      if (key.endsWith(knownKey) || knownKey.endsWith(key)) {
        const val = knownEntry[field];
        return typeof val === "number" && val > 0 ? val : 0;
      }
    }
    return 0;
  }
  const val = entry[field];
  return typeof val === "number" && val > 0 ? val : 0;
}

// ── RPD exports ──────────────────────────────────────────────────────────────

export function getModelRpd(modelId: string): number {
  return lookupValue(modelId, "rpd");
}

export function incrementDailyRequestCount(modelId: string): void {
  if (!modelId) return;
  const key = stripModelPrefix(modelId);
  const today = toDateKey();
  const existing = dailyCounts.get(key);
  if (existing && existing.date === today) {
    existing.count++;
  } else {
    dailyCounts.set(key, { date: today, count: 1 });
  }
}

export function getDailyRequestCount(modelId: string): number {
  if (!modelId) return 0;
  const key = stripModelPrefix(modelId);
  const today = toDateKey();
  const entry = dailyCounts.get(key);
  if (entry && entry.date === today) return entry.count;
  return 0;
}

export function isRpdExhausted(modelId: string): boolean {
  const rpd = getModelRpd(modelId);
  if (rpd <= 0) return false;
  return getDailyRequestCount(modelId) >= rpd;
}

// ── RPM exports ──────────────────────────────────────────────────────────────

export function getModelRpm(modelId: string): number {
  return lookupValue(modelId, "rpm");
}

/** Drop entries older than 60s from a window; `stride` is the slots per entry. Deletes the key when empty. */
function pruneWindow(map: Map<string, SlidingWindow>, key: string, stride: number): void {
  const win = map.get(key);
  if (!win) return;
  const cutoff = Date.now() - 60_000;
  const { entries } = win;
  while (win.head < entries.length && entries[win.head] < cutoff) win.head += stride;
  if (win.head >= entries.length) {
    map.delete(key);
  } else if (win.head >= 1024 && win.head * 2 >= entries.length) {
    win.entries = entries.slice(win.head); // compact rarely: cost is amortised over `head` expiries
    win.head = 0;
  }
}

function pushEntry(map: Map<string, SlidingWindow>, key: string, ...values: number[]): void {
  const win = map.get(key);
  if (win) win.entries.push(...values);
  else map.set(key, { entries: values, head: 0 });
}

export function incrementMinuteRequestCount(modelId: string): void {
  if (!modelId) return;
  const key = stripModelPrefix(modelId);
  pruneWindow(minuteWindows, key, 1);
  pushEntry(minuteWindows, key, Date.now());
}

export function getMinuteRequestCount(modelId: string): number {
  if (!modelId) return 0;
  const key = stripModelPrefix(modelId);
  pruneWindow(minuteWindows, key, 1);
  const win = minuteWindows.get(key);
  return win ? win.entries.length - win.head : 0;
}

export function isRpmExhausted(modelId: string): boolean {
  const rpm = getModelRpm(modelId);
  if (rpm <= 0) return false;
  return getMinuteRequestCount(modelId) >= rpm;
}

// ── TPM exports ──────────────────────────────────────────────────────────────

export function getModelTpm(modelId: string): number {
  return lookupValue(modelId, "tpm");
}

/**
 * Record prompt token consumption for a Gemini model.
 * Allows the per-minute token pre-check to avoid 429s.
 */
export function incrementTokenUsage(modelId: string, promptTokens: number): void {
  if (!modelId || !Number.isFinite(promptTokens) || promptTokens <= 0) return;
  const key = stripModelPrefix(modelId);
  pruneWindow(tokenWindows, key, 2);
  pushEntry(tokenWindows, key, Date.now(), promptTokens);
}

export function getMinuteTokenCount(modelId: string): number {
  if (!modelId) return 0;
  const key = stripModelPrefix(modelId);
  pruneWindow(tokenWindows, key, 2);
  const win = tokenWindows.get(key);
  if (!win) return 0;
  let total = 0;
  for (let i = win.head + 1; i < win.entries.length; i += 2) {
    total += win.entries[i];
  }
  return total;
}

export function isTpmExhausted(modelId: string): boolean {
  const tpm = getModelTpm(modelId);
  if (tpm <= 0) return false;
  return getMinuteTokenCount(modelId) >= tpm;
}

// ── Text-based metric classification ─────────────────────────────────────────

/**
 * Extract which quota class ("rpd" | "rpm" | "tpm") a Gemini 429 error text
 * names, directly from Google's own metric identifier — e.g.:
 *   "Quota exceeded for metric: generativelanguage.googleapis.com/
 *    generate_content_free_tier_input_token_count, limit: 16000"
 *
 * This is authoritative (Google's own signal) and must be checked BEFORE the
 * local usage counters (isRpdExhausted/isRpmExhausted/isTpmExhausted): those
 * counters only increment via `incrementTokenUsage`/`incrementRequestCount`,
 * which fire AFTER a request completes successfully. A request that gets
 * REJECTED — especially the first of several concurrent requests that all
 * trip the same per-minute limit before any of them completes — never
 * contributes to the local counter, so `isTpmExhausted` reads 0 at the exact
 * moment it needs to return true, and the generic "quota exceeded" text
 * classifier (which matches ALL Gemini 429 bodies, per the file header)
 * mis-classifies a genuine TPM/RPM burst as QUOTA_EXHAUSTED (midnight lockout)
 * instead of RATE_LIMIT_EXCEEDED (short cooldown).
 */
export function classifyGeminiQuotaMetricFromText(
  errorText: string | null | undefined
): "rpd" | "rpm" | "tpm" | null {
  if (!errorText) return null;
  const lower = errorText.toLowerCase();
  if (!lower.includes("generativelanguage.googleapis.com")) return null;
  if (lower.includes("_per_day") || lower.includes("per day")) return "rpd";
  if (lower.includes("input_token_count") || lower.includes("token_count")) return "tpm";
  if (lower.includes("_requests")) return "rpm";
  return null;
}

// ── Increment both (convenience) ─────────────────────────────────────────────

/** Increment both daily and minute counters for a Gemini request. */
export function incrementRequestCount(modelId: string): void {
  incrementDailyRequestCount(modelId);
  incrementMinuteRequestCount(modelId);
}

// ── Composite check ──────────────────────────────────────────────────────────

/** Returns true if either RPM or TPM is exhausted for this model. */
export function isMinuteRateExhausted(modelId: string): boolean {
  return isRpmExhausted(modelId) || isTpmExhausted(modelId);
}

// ── Reset (testing) ──────────────────────────────────────────────────────────

export function resetCounters(): void {
  dailyCounts.clear();
  minuteWindows.clear();
  tokenWindows.clear();
}
