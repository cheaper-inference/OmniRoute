/**
 * Learned per-provider+model ceilings for `max_tokens`.
 *
 * Mirror of learnedThinkingCaps.ts (thinking_budget 400 clamp-and-retry) and
 * learnedReasoningEffortCaps.ts (reasoning_effort enum 4xx clamp-and-retry):
 * some upstreams advertise a `max_tokens` ceiling LOWER than what clients
 * legitimately ask for — one plan rejects 178586 with "expected a value <=
 * 131072" while another accepts the same body. Clients (IDEs pulling the
 * maximum, agents computing context-derived budgets) cannot know every plan's
 * ceiling; the gateway absorbs the difference: parse the advertised ceiling
 * from the 400, clamp, retry once, and record it so FUTURE requests
 * pre-clamp with zero extra round-trips.
 */

const learnedCaps = new Map<string, number>();

function capKey(provider: string | null | undefined, model: string | null | undefined): string {
  return `${(provider || "").toLowerCase()}::${(model || "").toLowerCase()}`;
}

export function getLearnedMaxTokensCap(
  provider: string | null | undefined,
  model: string | null | undefined
): number | null {
  return learnedCaps.get(capKey(provider, model)) ?? null;
}

export function recordLearnedMaxTokensCap(
  provider: string | null | undefined,
  model: string | null | undefined,
  cap: number
): number {
  const key = capKey(provider, model);
  const existing = learnedCaps.get(key);
  if (existing !== undefined && existing <= cap) {
    return existing; // already learned an equal-or-lower ceiling; keep it
  }
  learnedCaps.set(key, cap);
  return cap;
}

/**
 * Extract the upstream-advertised max_tokens ceiling from a 400 body.
 * Observed shapes:
 *   "The parameter `max_tokens` ... integer above maximum value, expected a
 *    value <= 131072, but got 178586 instead."            → 131072
 *   "The parameter `max_tokens` ... not valid: integer, expected a value
 *    < 8192"                                              → 8191 (exclusive bound)
 * Only matches max_tokens errors (never thinking_budget / other params).
 * Returns null for anything else.
 *
 * Some providers JSON-serialize the error body, escaping "<" as `\u003c` and
 * "=" as `\u003d` — the literal regexes would never match the escaped form,
 * so normalize those (and `&`) before matching.
 */
export function parseMaxTokensCeiling(errText: unknown): number | null {
  if (typeof errText !== "string" || !errText) return null;
  const normalized = errText
    .replace(/\\u003[cC]/g, "<")
    .replace(/\\u003[dD]/g, "=")
    .replace(/\\u0026/g, "&");
  const inclusive = /max_tokens[^\n]*?expected a value\s*<=\s*(\d+)/i.exec(normalized);
  if (inclusive) {
    const max = Number(inclusive[1]);
    return Number.isFinite(max) && max > 0 ? max : null;
  }
  const exclusive = /max_tokens[^\n]*?expected a value\s*<\s*(\d+)/i.exec(normalized);
  if (exclusive) {
    const max = Number(exclusive[1]);
    if (Number.isFinite(max) && max > 1) return max - 1;
    return null;
  }
  return null;
}

/** Test-only: clear the learned-cap Map between tests. */
export function __test_resetLearnedMaxTokensCaps(): void {
  learnedCaps.clear();
}

/**
 * Clamp a top-level `max_tokens` down to the ceiling. When the body carries
 * Claude-style thinking with a budget_tokens that would now exceed max_tokens
 * (the anthropic contract requires budget_tokens < max_tokens — a gateway-
 * injected adaptive thinking budget is exactly what can inflate max_tokens
 * past an upstream ceiling), the budget is squeezed to max_tokens - 1024 so
 * the clamped pair stays contract-valid and leaves room for the visible
 * answer. Returns true when the body was actually modified.
 */
export function clampTopLevelMaxTokens(body: unknown, cap: number): boolean {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  if (!(Number.isFinite(cap) && cap > 0)) return false;
  const rec = body as {
    max_tokens?: unknown;
    thinking?: { budget_tokens?: unknown } | null;
  };
  const current = Number(rec.max_tokens);
  if (!Number.isFinite(current) || current <= cap) return false;
  rec.max_tokens = cap;
  // Keep this much room under the cap for the visible answer instead of
  // letting reasoning eat it all when the learned cap squeezes the budget.
  const thinkingHeadroomTokens = 1024;
  const budget = Number(rec.thinking?.budget_tokens);
  if (Number.isFinite(budget) && budget > cap - thinkingHeadroomTokens) {
    rec.thinking = {
      ...rec.thinking,
      budget_tokens: Math.max(cap - thinkingHeadroomTokens, 0),
    };
  }
  return true;
}
