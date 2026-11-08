import { sanitizeToolId } from "../../helpers/schemaCoercion.ts";

// #7705: sanitize a "tool" role message's tool_use_id symmetrically with the
// assistant's sanitized tool_use.id (see getContentBlocksFromMessage). Returns null for
// a falsy raw id so callers can keep the existing "skip orphan tool_result" guard —
// sanitizeToolId() mints a fresh random id for falsy input, which would otherwise defeat
// that guard and silently fabricate a tool_result that can never match a tool_use.
export function sanitizeToolResultId(rawId: unknown): string | null {
  if (!rawId) return null;
  // sanitizeToolId() takes a string; a non-string id would previously reach `.replace()`
  // and throw. Coerce instead so a numeric id (some clients send one) sanitizes normally.
  return sanitizeToolId(typeof rawId === "string" ? rawId : String(rawId));
}

// Resolve the tool_use_id for a tool result against the preceding assistant turn's
// still-unanswered tool_use ids (already sanitized, in emission order; mutated in place).
// A present id is sanitized as above and marked answered. A missing id is paired with the
// oldest unanswered call (FIFO) so the real tool output is kept instead of dropped; null
// only when nothing is pending, which keeps the "skip orphan tool_result" guard.
export function resolveToolResultId(rawId: unknown, pendingToolUseIds: string[]): string | null {
  const sanitized = sanitizeToolResultId(rawId);
  if (sanitized) {
    const index = pendingToolUseIds.indexOf(sanitized);
    if (index !== -1) pendingToolUseIds.splice(index, 1);
    return sanitized;
  }
  return pendingToolUseIds.shift() ?? null;
}
