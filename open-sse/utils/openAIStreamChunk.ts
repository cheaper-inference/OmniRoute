import { restoreOpenAIToolNames } from "../translator/helpers/toolCallHelper.ts";

type JsonRecord = Record<string, unknown>;

function normalizeDeltaToolCallIds(choice: JsonRecord | null | undefined): boolean {
  const delta = choice?.delta as JsonRecord | undefined;
  if (!Array.isArray(delta?.tool_calls)) return false;
  let changed = false;
  for (const toolCall of delta.tool_calls as JsonRecord[]) {
    if (toolCall?.id != null && typeof toolCall.id !== "string") {
      toolCall.id = String(toolCall.id);
      changed = true;
    }
  }
  return changed;
}

/** First non-empty finish_reason across every choice, regardless of index. */
export function findFinishReason(choices: unknown): string | undefined {
  if (!Array.isArray(choices)) return undefined;
  for (const choice of choices as JsonRecord[]) {
    const reason = choice?.finish_reason;
    if (typeof reason === "string" && reason) return reason;
  }
  return undefined;
}

/** Indices of the choices that carry their own non-empty finish_reason in this chunk. */
export function finishedChoiceIndices(choices: unknown): number[] {
  if (!Array.isArray(choices)) return [];
  const indices: number[] = [];
  (choices as JsonRecord[]).forEach((choice, index) => {
    const reason = choice?.finish_reason;
    if (typeof reason === "string" && reason) indices.push(index);
  });
  return indices;
}

export function normalizeFinalOpenAIStreamChunk(
  parsed: JsonRecord,
  toolNameMap: unknown
): { changed: boolean; hasFinishReason: boolean } {
  let changed = false;
  if (parsed.id != null && typeof parsed.id !== "string") {
    parsed.id = String(parsed.id);
    changed = true;
  }

  if (Array.isArray(parsed.choices)) {
    for (const choice of parsed.choices as JsonRecord[]) {
      changed = normalizeDeltaToolCallIds(choice) || changed;
    }
  }

  changed = restoreOpenAIToolNames(parsed, toolNameMap) || changed;
  return { changed, hasFinishReason: Boolean(findFinishReason(parsed.choices)) };
}
