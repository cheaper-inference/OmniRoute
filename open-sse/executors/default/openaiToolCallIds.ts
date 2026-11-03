import { createHash } from "node:crypto";

/**
 * OpenAI Chat Completions rejects tool-call IDs longer than 64 characters
 * (`Invalid 'messages[N].tool_calls[0].id': string too long`). Clients such as
 * Cursor replay IDs minted elsewhere that exceed that cap.
 *
 * Every distinct overlong ID is rewritten once per request to
 * `<sanitized 20-char prefix>_<sha256 base64url>` (≤ 64 chars, `[A-Za-z0-9_-]`),
 * so `assistant.tool_calls[].id` and `tool.tool_call_id` stay linked regardless of
 * encounter order. The digest covers the full ID, so IDs that only differ past the
 * retained prefix never collide, and the mapping is deterministic across turns.
 * IDs of 64 characters or fewer are left untouched.
 */
export const OPENAI_TOOL_CALL_ID_MAX_LENGTH = 64;
const OPENAI_TOOL_CALL_ID_PREFIX_LENGTH = 20;

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function normalizeOpenAIToolCallId(id: string): string {
  if (id.length <= OPENAI_TOOL_CALL_ID_MAX_LENGTH) return id;
  const prefix =
    id.replace(/[^A-Za-z0-9_-]/g, "").slice(0, OPENAI_TOOL_CALL_ID_PREFIX_LENGTH) || "call";
  const digest = createHash("sha256").update(id).digest("base64url");
  return `${prefix}_${digest}`;
}

function isOverlongId(id: unknown): id is string {
  return typeof id === "string" && id.length > OPENAI_TOOL_CALL_ID_MAX_LENGTH;
}

/**
 * Copy-on-write: returns the original body when nothing needs rewriting; otherwise a
 * shallow copy whose touched messages / tool calls are fresh objects, so the caller's
 * body (shared with logging, replay and combo fallback paths) is never mutated.
 */
export function normalizeOpenAIToolCallIds<T>(body: T): T {
  if (!isRecord(body) || !Array.isArray(body.messages)) return body;

  const cache = new Map<string, string>();
  const normalize = (id: string): string => {
    let normalized = cache.get(id);
    if (normalized === undefined) {
      normalized = normalizeOpenAIToolCallId(id);
      cache.set(id, normalized);
    }
    return normalized;
  };

  let changed = false;
  const messages = body.messages.map((message: unknown) => {
    if (!isRecord(message)) return message;
    let next: JsonRecord | null = null;

    if (message.role === "assistant" && Array.isArray(message.tool_calls)) {
      let callsChanged = false;
      const toolCalls = message.tool_calls.map((toolCall: unknown) => {
        if (!isRecord(toolCall) || !isOverlongId(toolCall.id)) return toolCall;
        callsChanged = true;
        return { ...toolCall, id: normalize(toolCall.id) };
      });
      if (callsChanged) next = { ...message, tool_calls: toolCalls };
    }

    if (message.role === "tool" && isOverlongId(message.tool_call_id)) {
      next = { ...(next ?? message), tool_call_id: normalize(message.tool_call_id) };
    }

    if (!next) return message;
    changed = true;
    return next;
  });

  return changed ? ({ ...body, messages } as T) : body;
}
