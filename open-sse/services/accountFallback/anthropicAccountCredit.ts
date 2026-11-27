// Anthropic's out-of-credit answer is an HTTP 400 with no structured credit code:
//   {"type":"error","error":{"type":"invalid_request_error",
//     "message":"Your credit balance is too low to access the Anthropic API. ..."}}
// The balance belongs to the whole API key, so it is account-level even on an
// anthropic-compatible-* node (#20968). The match is deliberately narrow (fixed
// phrase + Anthropic envelope) because a 400 can echo caller input.

const ANTHROPIC_CREDIT_PHRASE = "your credit balance is too low";
const ANTHROPIC_CREDIT_ERROR_TYPES = new Set(["invalid_request_error", "billing_error"]);
const ANTHROPIC_CREDIT_PROVIDER_PREFIX = "anthropic-compatible-";

export function isAnthropicCreditProvider(provider: string | null | undefined): boolean {
  return (
    typeof provider === "string" &&
    (provider === "anthropic" || provider.startsWith(ANTHROPIC_CREDIT_PROVIDER_PREFIX))
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

/** True for Anthropic's "credit balance is too low" body (JSON envelope, or the bare message). */
export function isAnthropicAccountCreditExhausted(text: string): boolean {
  const trimmed = String(text || "").trim();
  if (!trimmed.startsWith("{")) {
    return trimmed.toLowerCase().startsWith(ANTHROPIC_CREDIT_PHRASE);
  }
  const root = parseEnvelope(trimmed);
  const inner = root?.error;
  if (!root || root.type !== "error" || !inner || typeof inner !== "object") return false;
  const { type, message } = inner as Record<string, unknown>;
  return (
    typeof type === "string" &&
    ANTHROPIC_CREDIT_ERROR_TYPES.has(type) &&
    typeof message === "string" &&
    message.toLowerCase().startsWith(ANTHROPIC_CREDIT_PHRASE)
  );
}
