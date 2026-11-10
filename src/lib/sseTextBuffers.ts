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
