/**
 * Copy a Codex request for transformation without deep-cloning its full history.
 *
 * transformRequest calls normalizeCodexResponsesInput() before touching input
 * entries; that normalizer builds new input arrays, new item records and new
 * message content records. Keeping the original input reference until that
 * normalization avoids a second tree of large Responses API histories.
 *
 * Codex tool normalization, in contrast, mutates nested tool definitions in
 * place, so tools must remain deeply isolated from the caller. Reasoning and
 * tool_choice can be rewritten too, and are usually tiny.
 */
export function copyCodexRequestForMutation(input: unknown): Record<string, unknown> {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  const body = { ...(input as Record<string, unknown>) };

  for (const field of ["tools", "reasoning", "tool_choice"] as const) {
    const value = body[field];
    if (value && typeof value === "object") {
      body[field] = structuredClone(value);
    }
  }

  return body;
}
