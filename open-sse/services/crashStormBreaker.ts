/**
 * Crash-storm breaker: a pre-dispatch gate for self-inflicted failure storms.
 *
 * The provider/connection circuit breakers deliberately ignore local
 * execution errors and client aborts (see `isLocalExecutionError` /
 * `isLocalStreamLifecycleError` in circuitBreaker.ts) so a bug in the gateway
 * or a local runtime never blacklists an innocent upstream — the right call
 * for reputation. The flip side: when the request path itself starts
 * crash-looping (a recurring exception, a broken executor, a local provider
 * adapter fault), nothing anywhere applies backpressure, and every incoming
 * request pays the full failure cost again.
 *
 * This breaker fills exactly that gap without touching the reputation
 * semantics above: count failures per provider × normalized error signature
 * in a sliding window; once one signature reaches the threshold, pre-dispatch
 * gates skip that provider's targets with reason `crash_storm` (healthy
 * providers unaffected; window decay = self-healing). It never writes a
 * provider cooldown or lock — when the storm source is fixed, eligibility
 * returns by itself.
 *
 * Env knobs (lazy-read, hot):
 *   OMNIROUTE_CRASH_STORM_THRESHOLD  same-signature failures in-window to trip
 *                                    (default 10; 0 disables the breaker)
 *   OMNIROUTE_CRASH_STORM_WINDOW_MS  sliding window ms (default 300000 = 5 min)
 */

const MAX_TRACKED_SIGNATURES = 256;
const MAX_SAMPLES_PER_KEY = 64;
const SIGNATURE_MAX_LEN = 120;

/**
 * Normalize an error message into a crash signature: fold volatile segments —
 * hex runs containing digits (UUID/request/object ids) and digit runs — into
 * `#` so "same fault, different ids" lands in one key, then truncate.
 */
export function normalizeCrashSignature(message: string | undefined | null): string {
  if (typeof message !== "string") return "";
  return message
    .trim()
    .replace(/[0-9a-f]{4,}/gi, (m) => (/\d/.test(m) ? "#" : m))
    .replace(/\d+/g, "#")
    .slice(0, SIGNATURE_MAX_LEN);
}

function resolveThreshold(): number {
  const raw = Number(process.env.OMNIROUTE_CRASH_STORM_THRESHOLD);
  return Number.isFinite(raw) ? raw : 10;
}

function resolveWindowMs(): number {
  const raw = Number(process.env.OMNIROUTE_CRASH_STORM_WINDOW_MS);
  return Number.isFinite(raw) && raw > 0 ? raw : 300_000;
}

/** provider|signature → ascending in-window timestamps. */
const stormSamples = new Map<string, number[]>();

function prune(key: string, now: number, windowMs: number): number[] {
  const samples = stormSamples.get(key);
  if (!samples) return [];
  const cutoff = now - windowMs;
  while (samples.length > 0 && samples[0] < cutoff) samples.shift();
  return samples;
}

/**
 * Record one failed attempt. Only 5xx count — 429/4xx have their own quota
 * and credential machinery and are not storms. Empty messages cannot be
 * signed and are skipped. Called per attempt, so one multi-target combo
 * request contributes at most one sample per provider.
 */
export function recordCrashFailure(
  provider: string | undefined | null,
  message: string | undefined | null,
  status: number
): void {
  const threshold = resolveThreshold();
  if (threshold <= 0) return;
  if (typeof status !== "number" || status < 500) return;
  const signature = normalizeCrashSignature(message);
  if (!signature) return;

  const key = `${String(provider || "unknown")}|${signature}`;
  const now = Date.now();
  const samples = prune(key, now, resolveWindowMs());
  samples.push(now);
  if (samples.length > MAX_SAMPLES_PER_KEY) samples.shift();
  stormSamples.set(key, samples);

  // Boundedness: cap the signature-family map (long-run memory growth) and
  // evict the least-recently-seen key when over budget.
  if (stormSamples.size > MAX_TRACKED_SIGNATURES) {
    let oldestKey: string | null = null;
    let oldestTs = Infinity;
    for (const [k, v] of stormSamples) {
      const last = v[v.length - 1] ?? 0;
      if (last < oldestTs) {
        oldestTs = last;
        oldestKey = k;
      }
    }
    if (oldestKey) stormSamples.delete(oldestKey);
  }
}

/** Whether this provider is currently storming (any signature at threshold in-window). */
export function isCrashStorming(provider: string | undefined | null): boolean {
  const threshold = resolveThreshold();
  if (threshold <= 0 || !provider) return false;
  const prefix = `${String(provider)}|`;
  const now = Date.now();
  const windowMs = resolveWindowMs();
  for (const [key] of stormSamples) {
    if (!key.startsWith(prefix)) continue;
    const kept = prune(key, now, windowMs);
    if (kept.length >= threshold) return true;
  }
  return false;
}

/** Diagnostics: still-active signature entries (in-window count ≥ 2). */
export function crashStormStatus(): Array<{ provider: string; signature: string; count: number }> {
  const now = Date.now();
  const windowMs = resolveWindowMs();
  const out: Array<{ provider: string; signature: string; count: number }> = [];
  for (const [key] of stormSamples) {
    const kept = prune(key, now, windowMs);
    if (kept.length < 2) continue;
    const [provider, ...rest] = key.split("|");
    out.push({ provider, signature: rest.join("|"), count: kept.length });
  }
  return out.sort((a, b) => b.count - a.count);
}

/** Test and ops reset. */
export function resetCrashStormBreaker(): void {
  stormSamples.clear();
}
