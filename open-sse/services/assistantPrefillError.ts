/**
 * Upstream rejection of an assistant-prefill request (conversation ends on `assistant`):
 *   400 "This model does not support assistant message prefill. The conversation must end
 *        with a user message."
 * It is a request-shape error, not model availability. Kept narrow on purpose: the text
 * also contains "model does not support", which the broad model-access patterns would
 * otherwise read as "this model is unavailable" and lock a healthy model for an hour.
 *
 * Leaf module (no imports) so the fallback classifiers can depend on it without cycles.
 */
export const ASSISTANT_PREFILL_UNSUPPORTED_PATTERN =
  /\bdoes\s+not\s+support\s+assistant\s+message\s+prefill\b|\bconversation\s+must\s+end\s+with\s+a\s+user\s+message\b/i;

export function isAssistantPrefillUnsupportedError(errorText: string | null | undefined): boolean {
  return ASSISTANT_PREFILL_UNSUPPORTED_PATTERN.test(String(errorText || ""));
}

/** HTTP-status-aware variant: the prefill rejection is a request-shape 400. */
export function isAssistantPrefillUnsupported400(status: number, errorText: string): boolean {
  return status === 400 && isAssistantPrefillUnsupportedError(errorText);
}
