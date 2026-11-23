export type Detail = Record<string, unknown>;
export interface Delta {
  content?: string;
  reasoning?: string;
  reasoning_content?: string;
  reasoning_details?: Detail[];
  encrypted_content?: string;
  signature?: string;
  tool_calls?: Array<{
    index: number;
    id?: string;
    type?: string;
    function?: { name?: string; arguments?: string };
  }>;
  [key: string]: unknown;
}
export interface Event {
  choices?: Array<{ index?: number; delta: Delta; finish_reason?: string | null }>;
  [key: string]: unknown;
}

export const SECRET = "sk-" + "A1b2".repeat(12);
export const opaqueA = "gAAAA" + "A".repeat(1200);
export const opaqueB = "gAAAA" + "B".repeat(900);

export function encrypted(index = 0, data = opaqueA): Detail {
  return {
    index,
    id: `synthetic-reason-${index}`,
    type: "reasoning.encrypted",
    format: "azure-openai-responses-v1",
    data,
    encrypted_content: data + "-envelope",
    signature: "synthetic-signature-" + SECRET,
  };
}

export function delta(value: Delta, index = 0): Event {
  return { id: "synthetic-stream", choices: [{ index, delta: value }] };
}

export function frame(value: Event): string {
  return `data: ${JSON.stringify(value)}\n\n`;
}

export function finish(index = 0): Event {
  return { choices: [{ index, delta: {}, finish_reason: "tool_calls" }] };
}

export function source(text: string, fragmentSize = 37): ReadableStream<Uint8Array> {
  const bytes = new TextEncoder().encode(text);
  let offset = 0;
  return new ReadableStream({
    pull(controller) {
      if (offset === bytes.length) return controller.close();
      controller.enqueue(bytes.slice(offset, offset + fragmentSize));
      offset = Math.min(bytes.length, offset + fragmentSize);
    },
  });
}

export function events(text: string): Event[] {
  return text
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:") && line.slice(5).trim().startsWith("{"))
    .map((line) => JSON.parse(line.slice(5)) as Event);
}

export function deltas(values: Event[], index = 0): Delta[] {
  return values.flatMap((event) =>
    (event.choices ?? [])
      .filter((choice) => (choice.index ?? 0) === index)
      .map((choice) => choice.delta)
  );
}

export function records(values: Event[], index = 0): Detail[] {
  return deltas(values, index).flatMap((value) => value.reasoning_details ?? []);
}

export function text(
  values: Event[],
  field: "content" | "reasoning" | "reasoning_content",
  index = 0
): string {
  return deltas(values, index)
    .map((value) => value[field] ?? "")
    .join("");
}

export function tools(values: Event[], index = 0) {
  const result = new Map<number, { id: string; name: string; arguments: string }>();
  for (const value of deltas(values, index)) {
    for (const call of value.tool_calls ?? []) {
      const current = result.get(call.index) ?? { id: "", name: "", arguments: "" };
      current.id += call.id ?? "";
      current.name += call.function?.name ?? "";
      current.arguments += call.function?.arguments ?? "";
      result.set(call.index, current);
    }
  }
  return result;
}
