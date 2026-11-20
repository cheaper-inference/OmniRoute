import type { FieldCategory } from "./sseTextTransform";

// A semantic category is not a wire identity: these two fields may coexist.
export type BufferedField = FieldCategory | "reasoning_content";
export type TextBuffers = Record<BufferedField, string>;
export function bufferField(field: FieldCategory, fieldName?: string): BufferedField {
  return field === "reasoning" && fieldName === "reasoning_content" ? "reasoning_content" : field;
}

export interface TextBufferStore {
  get: (index: string | number) => TextBuffers;
  takeAll: () => Array<[string, TextBuffers]>;
}

type Choice = { index?: number; delta: Record<string, unknown> };

function drainChoice(store: TextBufferStore, choice: Choice): void {
  const choiceIndex = choice.index ?? 0;
  const buffers = store.get(`${choiceIndex}_0`);
  for (const field of ["content", "reasoning", "reasoning_content", "partialJson"] as const) {
    if (!buffers[field]) continue;
    choice.delta[field === "partialJson" ? "partial_json" : field] = buffers[field];
    buffers[field] = "";
  }
  const calls: Array<{ index: number; function: { arguments: string } }> = [];
  for (const [key, buf] of store.takeAll()) {
    if (!key.startsWith(`${choiceIndex}_`) || !buf.toolArgs) continue;
    calls.push({ index: Number(key.split("_")[1]), function: { arguments: buf.toolArgs } });
    buf.toolArgs = "";
  }
  if (calls.length) choice.delta.tool_calls = calls;
}

/** Emit only held-back tails, never a previously emitted delta or finish/usage frame. */
export function flushOpenAiTextBuffers(
  store: TextBufferStore,
  lastJson: Record<string, unknown>
): Record<string, unknown> {
  const finalJson = JSON.parse(JSON.stringify(lastJson)) as {
    choices: Array<{ index?: number }>;
    usage?: unknown;
  };
  delete finalJson.usage;
  const choices: Choice[] = finalJson.choices.map((c) =>
    typeof c.index === "number" ? { index: c.index, delta: {} } : { delta: {} }
  );
  const present = new Set(choices.map((c) => c.index ?? 0));
  for (const [key, buffers] of store.takeAll()) {
    const index = Number(key.split("_")[0]);
    if (present.has(index) || !Object.values(buffers).some(Boolean)) continue;
    choices.push({ index, delta: {} });
    present.add(index);
  }
  for (const choice of choices) drainChoice(store, choice);
  return { ...finalJson, choices };
}

/** Item id for a replayed Responses text tail: the event's own, its item's, else positional. */
function responsesTailItemId(lastJson: Record<string, unknown>, idx: number): string {
  if (typeof lastJson.item_id === "string") return lastJson.item_id;
  const item = lastJson.item as { id?: unknown } | undefined;
  return typeof item?.id === "string" ? item.id : `msg_${idx}`;
}

/**
 * A fresh `output_text.delta` carrying held-back text after a non-delta frame. Strict
 * Responses clients reject a delta without `item_id`/`content_index` (#20257).
 */
export function responsesTextTailDelta(
  lastJson: Record<string, unknown>,
  idx: number,
  delta: string
): Record<string, unknown> {
  return {
    type: "response.output_text.delta",
    item_id: responsesTailItemId(lastJson, idx),
    output_index: idx,
    content_index: typeof lastJson.content_index === "number" ? lastJson.content_index : 0,
    delta,
  };
}

/** Fill the ids a strict Responses client requires on an `output_text.delta` (#20257). */
export function ensureResponsesTextDeltaIds(json: Record<string, unknown>, idx: number): void {
  if (json.type !== "response.output_text.delta") return;
  if (json.item_id === undefined) json.item_id = `msg_${idx}`;
  if (json.content_index === undefined) json.content_index = 0;
}
