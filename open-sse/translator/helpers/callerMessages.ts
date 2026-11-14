type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function copyToolCall(toolCall: unknown): unknown {
  if (!isRecord(toolCall)) return toolCall;
  const copy = { ...toolCall };
  if (isRecord(copy.function)) copy.function = { ...copy.function };
  return copy;
}

function copyMessage(message: unknown): unknown {
  if (!isRecord(message)) return message;
  const copy = { ...message };
  if (Array.isArray(copy.tool_calls)) copy.tool_calls = copy.tool_calls.map(copyToolCall);
  return copy;
}

/**
 * Give the translator its own message list, message objects and tool calls, so the in-place
 * edits it makes (echo-field strip, tool call id and argument repair, displaced tool result
 * reorder) never reach the caller's body. A combo shares message objects between targets (the
 * body copy per target is shallow, #7847), so an edit by one target would change the next.
 * One level only: `content` is shared with the caller because the translator never writes into it.
 */
export function ownMessages<T>(body: T): T {
  if (!isRecord(body) || !Array.isArray(body.messages)) return body;
  return { ...body, messages: body.messages.map(copyMessage) };
}
