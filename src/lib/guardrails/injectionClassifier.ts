/**
 * Optional semantic classifier for gray-zone prompts (OMNIROUTE_INJECTION_CLASSIFIER_URL, default off).
 *
 * The regex rules of the injection guard catch known phrasings. A paraphrased attack can slip past
 * them. When the operator points this at an HTTP classifier, a prompt whose LOCAL risk score falls in
 * a configured gray band is sent there. A high answer ADDS a `semantic_classifier` detection, and the
 * service never decides alone:
 * - with a weak local signal (a low or medium regex hit) the added detection is high severity, so the
 *   two signals together can block;
 * - with no local signal (only when the operator widens the band to include 0) it is medium, which
 *   the default block threshold (high) never blocks;
 * - a prompt the local rules already block (high) never leaves the process.
 *
 * Local score: the highest local severity as a fraction of high (none 0, low 0.33, medium 0.67, high 1).
 * Default band 0.2 to 0.9, so by default only prompts with a weak local signal are sent.
 *
 * Contract of the endpoint: POST {"text": "<prompt text>"} -> 200 {"risk": <number 0..1>}.
 * The text is sent with credential patterns masked and capped to the injection scan budget (16 KB).
 * The URL is operator-set and trusted (a local sidecar is fine), so no public-address guard applies.
 *
 * Safety:
 * - Own breaker (3 consecutive failures open it for 30 s, then one half-open probe). The shared
 *   CircuitBreaker persists to SQLite and is keyed by provider; this call sits on the request path
 *   and must not touch the database.
 * - Result cache keyed by a SHA-256 of the normalised text (TTL 300 s, LRU 5000). A timeout, an
 *   error or a malformed answer is never cached and adds zero risk (fail open: the classifier can
 *   only add risk, so losing it leaves the regex guard exactly as it was).
 * - No new package: safeOutboundFetch, node:crypto.
 */

import { createHash } from "node:crypto";
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { redactCredentials } from "./credentialMasker";

const CACHE_TTL_MS = 300_000;
const CACHE_MAX = 5000;
const BREAKER_FAILURES = 3;
const BREAKER_OPEN_MS = 30_000;
const DEFAULT_GRAY_MIN = 0.2;
const DEFAULT_GRAY_MAX = 0.9;
const DEFAULT_TIMEOUT_MS = 1500;
/** Service answers at or above this add risk; the added weight maps to a medium detection. */
const RISK_THRESHOLD = 0.5;
const ADDED_RISK = 0.5;

type FetchLike = (url: string, init: RequestInit) => Promise<Response>;
type Options = { fetchImpl?: FetchLike; now?: () => number };
type Result = { added: number; called: boolean };

const cache = new Map<string, { risk: number; at: number }>();
const breaker = { failures: 0, openedAt: 0, probing: false };
let testFetch: FetchLike | null = null;

// POST, no retry, no redirect (safeOutboundFetch refuses redirects unless allowed).
const defaultFetch: FetchLike = (url, init) => safeOutboundFetch(url, { ...init, retry: false });

function envNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  const n = raw === undefined || raw.trim() === "" ? NaN : Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

export function getInjectionClassifierUrl(): string | null {
  const url = process.env.OMNIROUTE_INJECTION_CLASSIFIER_URL?.trim();
  return url ? url : null;
}

export function isInjectionClassifierConfigured(): boolean {
  return getInjectionClassifierUrl() !== null;
}

function grayBand(): [number, number] {
  const min = envNumber("OMNIROUTE_INJECTION_CLASSIFIER_GRAY_MIN", DEFAULT_GRAY_MIN);
  const max = envNumber("OMNIROUTE_INJECTION_CLASSIFIER_GRAY_MAX", DEFAULT_GRAY_MAX);
  return min >= 0 && max <= 1 && min <= max ? [min, max] : [DEFAULT_GRAY_MIN, DEFAULT_GRAY_MAX];
}

function normalise(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function breakerAllows(now: number): boolean {
  if (breaker.failures < BREAKER_FAILURES) return true;
  if (now - breaker.openedAt < BREAKER_OPEN_MS) return false;
  if (breaker.probing) return false;
  breaker.probing = true; // one half-open probe
  return true;
}

function breakerRecord(ok: boolean, now: number): void {
  breaker.probing = false;
  if (ok) {
    breaker.failures = 0;
    return;
  }
  breaker.failures++;
  if (breaker.failures >= BREAKER_FAILURES) breaker.openedAt = now;
}

function cacheGet(key: string, now: number): number | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (now - hit.at > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  cache.delete(key); // refresh the LRU position
  cache.set(key, hit);
  return hit.risk;
}

function cacheSet(key: string, risk: number, now: number): void {
  cache.set(key, { risk, at: now });
  if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value as string);
}

async function askService(url: string, text: string, doFetch: FetchLike): Promise<number | null> {
  const timeoutMs = envNumber("OMNIROUTE_INJECTION_CLASSIFIER_TIMEOUT_MS", DEFAULT_TIMEOUT_MS);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await doFetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const risk = ((await response.json()) as { risk?: unknown })?.risk;
    return typeof risk === "number" && risk >= 0 && risk <= 1 ? risk : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Ask the classifier about `text` when `localScore` (0..1) is inside the gray band.
 * `called` is true only when the service was actually asked (a cache hit is not a call).
 */
export async function classifyGrayZone(
  text: string,
  localScore: number,
  options: Options = {}
): Promise<Result> {
  const url = getInjectionClassifierUrl();
  if (!url) return { added: 0, called: false };
  const [min, max] = grayBand();
  if (localScore < min || localScore > max) return { added: 0, called: false };

  const now = (options.now ?? Date.now)();
  const key = createHash("sha256").update(normalise(text)).digest("hex");
  const cached = cacheGet(key, now);
  if (cached !== null) return { added: cached >= RISK_THRESHOLD ? ADDED_RISK : 0, called: false };
  if (!breakerAllows(now)) return { added: 0, called: false };

  const doFetch = options.fetchImpl ?? testFetch ?? defaultFetch;
  const risk = await askService(url, redactCredentials(text).text, doFetch);
  breakerRecord(risk !== null, now);
  if (risk === null) return { added: 0, called: true };
  cacheSet(key, risk, now);
  return { added: risk >= RISK_THRESHOLD ? ADDED_RISK : 0, called: true };
}

export function resetInjectionClassifierForTests(): void {
  cache.clear();
  breaker.failures = 0;
  breaker.openedAt = 0;
  breaker.probing = false;
  testFetch = null;
}

export function setInjectionClassifierFetchForTests(fn: FetchLike | null): void {
  testFetch = fn;
}
