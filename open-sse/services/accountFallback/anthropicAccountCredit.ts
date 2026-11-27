// Anthropic's out-of-credit / API-usage-limit answers are HTTP 400 with no
// structured credit code:
//   {"type":"error","error":{"type":"invalid_request_error",
//     "message":"Your credit balance is too low to access the Anthropic API. ..."}}
//   {"type":"error","error":{"type":"invalid_request_error",
//     "message":"You have reached your specified API usage limits. You will regain access on ..."}}
// The balance/limit belongs to the whole API key, so it is account-level even on an
// anthropic-compatible-* node (#20968, #21250). The match is deliberately narrow (anchored
// phrase + Anthropic envelope, tolerating OmniRoute's `[400]: ` log/error prefix) because
// a 400 can echo caller input mid-message.

const ANTHROPIC_CREDIT_PHRASES = [
  "your credit balance is too low",
  "you have reached your specified api usage limits",
] as const;
const ANTHROPIC_CREDIT_ERROR_TYPES = new Set(["invalid_request_error", "billing_error"]);
const ANTHROPIC_CREDIT_PROVIDER_PREFIX = "anthropic-compatible-";
const STATUS_PREFIX_RE = /^\[\d{3}\]:\s*/;

export function isAnthropicCreditProvider(provider: string | null | undefined): boolean {
  if (typeof provider !== "string") return false;
  const normalized = provider.toLowerCase();
  return (
    normalized === "anthropic" ||
    normalized === "claude" ||
    normalized.startsWith(ANTHROPIC_CREDIT_PROVIDER_PREFIX)
  );
}

function parseEnvelope(text: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function matchesAnthropicCreditPhrase(message: string): boolean {
  const lower = message.trim().toLowerCase();
  return ANTHROPIC_CREDIT_PHRASES.some((phrase) => lower.startsWith(phrase));
}

/** True for Anthropic's credit-balance or specified API usage-limit 400 body (JSON envelope or bare/status-prefixed message). */
export function isAnthropicAccountCreditExhausted(text: string): boolean {
  const trimmed = String(text || "")
    .trim()
    .replace(STATUS_PREFIX_RE, "")
    .trim();
  if (!trimmed.startsWith("{")) {
    return matchesAnthropicCreditPhrase(trimmed);
  }
  const root = parseEnvelope(trimmed);
  const inner = root?.error;
  if (!root || root.type !== "error" || !inner || typeof inner !== "object") return false;
  const { type, message } = inner as Record<string, unknown>;
  return (
    typeof type === "string" &&
    ANTHROPIC_CREDIT_ERROR_TYPES.has(type) &&
    typeof message === "string" &&
    matchesAnthropicCreditPhrase(message)
  );
}
