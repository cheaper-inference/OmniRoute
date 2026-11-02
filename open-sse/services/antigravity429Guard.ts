/**
 * Stop OmniRoute from hammering the Antigravity backend with a request it already refused.
 *
 * Cloud Code answers some requests with `429 Resource has been exhausted (e.g. check
 * quota)` — no retry hint, no reason — whatever the account's quota: the refusal follows
 * the request content (observed for every request whose system prompt carried a
 * third-party agent identity line; the same request without that line answered 200 and
 * the account had 99.9% quota left). `classify429` calls that message "unknown" (soft
 * retry), and three retry layers multiplied the one refusal:
 *   1. the executor: 4 tries per host × every host;
 *   2. the chat handler's cooldown-aware retry: the whole request restarted up to 3 more
 *      times, and every restart re-ran the quota preflight against Cloud Code;
 *   3. the client re-sending the same body (most SDKs retry a 429).
 * One prompt became ~45 refused upstream generation calls in 20 minutes — exactly the
 * pattern that gets an account flagged.
 *
 * This module bounds layers 1 and 3 (layer 2 is skipped in `src/sse/handlers/chat.ts`):
 * - a per-request budget of upstream 429s across ALL hosts (default 2: the call plus one
 *   retry), after which the 429 goes back to the caller;
 * - a short-lived, in-memory record of request bodies that spent that budget: an identical
 *   re-send is answered locally (429, zero upstream calls) until the block expires. The
 *   block follows the upstream retry hint when there is one; without a hint it starts at
 *   2 min and doubles on each repeat, up to 30 min.
 *
 * The local answer is a verdict on that request, not on the account, so the chat handler
 * must not cool the connection down for it (`isAntigravityRefusalReplay`).
 */

import { createHash } from "node:crypto";

export const ANTIGRAVITY_429_ATTEMPTS_DEFAULT = 2;
const ANTIGRAVITY_429_ATTEMPTS_MAX = 12;
export const REFUSAL_BLOCK_BASE_MS = 2 * 60 * 1000;
export const REFUSAL_BLOCK_MAX_MS = 30 * 60 * 1000;
// A repeat within this window after the previous block ended escalates the next block.
const REFUSAL_STRIKE_WINDOW_MS = 60 * 60 * 1000;
const REFUSAL_MEMORY_MAX_ENTRIES = 500;

/** Marker the chat handler matches to tell a local replay refusal from an upstream 429. */
export const ANTIGRAVITY_REFUSAL_REPLAY_MARKER = "OmniRoute is not resending it to Antigravity";

/** Providers served by AntigravityExecutor, which applies its own bounded 429 retry. */
const ANTIGRAVITY_EXECUTOR_PROVIDERS: ReadonlySet<string> = new Set(["antigravity", "agy"]);

export function usesAntigravity429Budget(provider: string | null | undefined): boolean {
  return typeof provider === "string" && ANTIGRAVITY_EXECUTOR_PROVIDERS.has(provider);
}

/** `ANTIGRAVITY_MAX_429_ATTEMPTS`: upstream 429s tolerated per request (1..12, default 2). */
export function getAntigravity429AttemptBudget(
  env: Record<string, string | undefined> = process.env
): number {
  const raw = Number.parseInt(String(env.ANTIGRAVITY_MAX_429_ATTEMPTS ?? ""), 10);
  if (!Number.isFinite(raw) || raw < 1) return ANTIGRAVITY_429_ATTEMPTS_DEFAULT;
  return Math.min(raw, ANTIGRAVITY_429_ATTEMPTS_MAX);
}

type RefusalEntry = { blockedUntil: number; strikes: number };

const refusals = new Map<string, RefusalEntry>();

/**
 * Stable key for "the same request to the same account": connection + target model +
 * the request content. Per-call ids (requestId, sessionId, project) are left out so a
 * client retry of the same body maps to the same key.
 */
export function fingerprintAntigravityRequest(
  connectionId: string,
  envelope: Record<string, unknown>
): string {
  const request =
    envelope.request && typeof envelope.request === "object"
      ? (envelope.request as Record<string, unknown>)
      : {};
  const material = JSON.stringify([
    connectionId,
    envelope.model ?? null,
    request.systemInstruction ?? null,
    request.contents ?? null,
    request.tools ?? null,
    request.toolConfig ?? null,
    request.generationConfig ?? null,
  ]);
  return createHash("sha256").update(material).digest("hex");
}

function pruneRefusals(now: number): void {
  for (const [key, entry] of refusals) {
    if (entry.blockedUntil + REFUSAL_STRIKE_WINDOW_MS < now) refusals.delete(key);
  }
  while (refusals.size > REFUSAL_MEMORY_MAX_ENTRIES) {
    const oldest = refusals.keys().next().value;
    if (oldest === undefined) break;
    refusals.delete(oldest);
  }
}

/**
 * Record that `key` spent its 429 budget. `upstreamHintMs` is the retry delay Google
 * stated (Retry-After header or "reset after" text), if any.
 */
export function rememberAntigravity429Refusal(
  key: string,
  upstreamHintMs: number | null,
  now = Date.now()
): { blockMs: number; strikes: number } {
  const previous = refusals.get(key);
  const strikes =
    previous && previous.blockedUntil + REFUSAL_STRIKE_WINDOW_MS >= now ? previous.strikes + 1 : 1;
  const blockMs =
    typeof upstreamHintMs === "number" && Number.isFinite(upstreamHintMs) && upstreamHintMs > 0
      ? Math.min(upstreamHintMs, REFUSAL_BLOCK_MAX_MS)
      : Math.min(REFUSAL_BLOCK_BASE_MS * 2 ** (strikes - 1), REFUSAL_BLOCK_MAX_MS);
  refusals.delete(key); // re-insert so Map order tracks recency for the size cap
  refusals.set(key, { blockedUntil: now + blockMs, strikes });
  pruneRefusals(now);
  return { blockMs, strikes };
}

/** The active block for `key`, or null when the request may go upstream. */
export function getActiveAntigravityRefusal(
  key: string,
  now = Date.now()
): { remainingMs: number; strikes: number } | null {
  const entry = refusals.get(key);
  if (!entry || entry.blockedUntil <= now) return null;
  return { remainingMs: entry.blockedUntil - now, strikes: entry.strikes };
}

/** Local 429 for a blocked re-send, in the Google error shape the pipeline already parses. */
export function buildAntigravityRefusalReplayResponse(refusal: {
  remainingMs: number;
  strikes: number;
}): Response {
  const seconds = Math.max(1, Math.ceil(refusal.remainingMs / 1000));
  const message =
    `Antigravity refused this exact request with 429 RESOURCE_EXHAUSTED and ${ANTIGRAVITY_REFUSAL_REPLAY_MARKER} ` +
    `for another ${seconds}s (repeat ${refusal.strikes}), to avoid hammering the upstream. If the ` +
    `account still has quota, the upstream is refusing the request content itself (for example a ` +
    `third-party agent identity in the system prompt); change the request or use another provider.`;
  return new Response(
    JSON.stringify({ error: { code: 429, message, status: "RESOURCE_EXHAUSTED" } }),
    {
      status: 429,
      headers: { "Content-Type": "application/json", "Retry-After": String(seconds) },
    }
  );
}

export function isAntigravityRefusalReplay(status: number, errorMessage: string): boolean {
  return status === 429 && errorMessage.includes(ANTIGRAVITY_REFUSAL_REPLAY_MARKER);
}

/** @internal test helper */
export function resetAntigravity429GuardForTests(): void {
  refusals.clear();
}
