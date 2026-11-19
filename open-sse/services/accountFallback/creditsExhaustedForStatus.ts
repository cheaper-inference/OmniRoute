import { CREDITS_EXHAUSTED_SIGNALS } from "./creditExhaustionSignals.ts";
import { isCreditsExhaustedWithSharedWallet } from "./sharedWalletCredits.ts";

// A 400 is the status upstreams use to reject the CALLER's input, and many of
// them quote that input back in error.message ("Unknown parameter: '<x>'",
// "Invalid value '<x>' for model"). A substring match on that text must not
// park a shared connection as credits_exhausted, so on 400 a credit signal
// counts only when it cannot have come from the caller's text:
//  - the upstream's structured error code (never the message) is a credit code, or
//  - the provider documents a message-only 400 credit form (allow-list below).
// Every other status keeps the plain text match.

// Providers whose out-of-credit answer is a 400 with no structured credit code:
//  - command-code: "You have insufficient credits to make this request. ..."
//  - bai and other new-api family gateways: "credit insufficient balance: ..."
//  - openai-compatible-*: operator-added nodes, where new-api gateways usually run.
const MESSAGE_ONLY_CREDIT_400_PROVIDERS = new Set(["command-code", "bai"]);
const MESSAGE_ONLY_CREDIT_400_PREFIX = "openai-compatible-";

const CREDIT_ERROR_CODES = new Set([
  "insufficient_user_quota",
  "insufficient_quota",
  "insufficient_balance",
  "billing_hard_limit_reached",
  "credit_balance_too_low",
  "credit_balance_exhausted",
]);

function allowsMessageOnlyCredit400(provider: string | null | undefined): boolean {
  if (typeof provider !== "string") return false;
  return (
    MESSAGE_ONLY_CREDIT_400_PROVIDERS.has(provider) ||
    provider.startsWith(MESSAGE_ONLY_CREDIT_400_PREFIX)
  );
}

function codesFromBody(body: unknown): string[] {
  if (!body || typeof body !== "object") return [];
  const root = body as Record<string, unknown>;
  const inner =
    root.error && typeof root.error === "object" ? (root.error as Record<string, unknown>) : {};
  return [inner.code, root.code].filter((v): v is string => typeof v === "string");
}

/** Structured codes carried by a value: a parsed body's `error.code` / `code`, the
 *  same fields of a JSON text, or a text that is a bare code token. Never a message. */
function structuredCodes(value: unknown): string[] {
  if (typeof value !== "string") return codesFromBody(value);
  const trimmed = value.trim();
  if (!trimmed.startsWith("{")) return [trimmed];
  try {
    return codesFromBody(JSON.parse(trimmed));
  } catch {
    return [];
  }
}

function hasCreditErrorCode(text: string, structured: unknown): boolean {
  const codes = [...structuredCodes(text), ...structuredCodes(structured)];
  return codes.some((code) => CREDIT_ERROR_CODES.has(code.trim().toLowerCase()));
}

/**
 * Status-aware credit exhaustion check shared by the classifier, the fallback
 * engine and terminal-status resolution. `structured` is what the caller holds
 * apart from the text: the upstream's error code, or its parsed error body.
 */
export function isCreditsExhaustedForStatus(
  status: number,
  provider: string | null | undefined,
  errorText: string,
  structured?: unknown
): boolean {
  const text = String(errorText || "");
  if (!isCreditsExhaustedWithSharedWallet(text, CREDITS_EXHAUSTED_SIGNALS)) return false;
  if (status !== 400) return true;
  return allowsMessageOnlyCredit400(provider) || hasCreditErrorCode(text, structured);
}
