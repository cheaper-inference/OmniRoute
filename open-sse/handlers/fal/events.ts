import { normalizeFalOutput } from "./output.ts";

export type FalEvent = { event: string; data: unknown; id?: string };
function parseNativeData(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}
/** SSE framing, without the chat parser's JSON/envelope repair heuristics. */
export function createFalEventParser(emit: (event: FalEvent) => void) {
  let pending = "";
  let event = "message";
  let id: string | undefined;
  let data: string[] = [];
  function line(value: string) {
    if (!value) {
      if (data.length) {
        const raw = data.join("\n");
        const payload = parseNativeData(raw);
        emit({ event, data: payload, ...(id === undefined ? {} : { id }) });
      }
      data = [];
      event = "message";
      return;
    }
    if (value.startsWith(":")) return;
    const colon = value.indexOf(":");
    const field = colon < 0 ? value : value.slice(0, colon);
    const content = colon < 0 ? "" : value.slice(colon + 1).replace(/^ /, "");
    if (field === "data") data.push(content);
    if (field === "event") event = content;
    if (field === "id" && !content.includes("\0")) id = content;
  }
  return {
    push(text: string) {
      pending += text;
      let offset = 0;
      for (let i = 0; i < pending.length; i++) {
        if (pending[i] !== "\n" && pending[i] !== "\r") continue;
        if (pending[i] === "\r" && i + 1 === pending.length) break;
        line(pending.slice(offset, i));
        if (pending[i] === "\r" && pending[i + 1] === "\n") i++;
        offset = i + 1;
      }
      pending = pending.slice(offset);
      if (pending.length + data.join("\n").length > 8 * 1024 * 1024)
        throw new Error("Fal event exceeds the stream buffer limit");
    },
    finish() {
      // SSE discards an unterminated event. Report truncation rather than success.
      if (pending === "\r") {
        line("");
        pending = "";
      }
      if (pending || data.length) throw new Error("Fal stream ended with an incomplete event");
    },
  };
}

export type FalStreamState = {
  artifacts: Record<string, unknown>[];
  events: FalEvent[];
  partial?: unknown;
  final?: unknown;
  reasoning?: unknown;
  error?: unknown;
};
function eventRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}
function mergeArtifacts(
  previous: Record<string, unknown>[],
  payload: Record<string, unknown>,
  data: unknown
) {
  const normalized = Array.isArray(payload.artifacts)
    ? (payload.artifacts as Record<string, unknown>[])
    : normalizeFalOutput(data).artifacts;
  const artifacts = [...previous];
  for (const file of normalized) {
    const key = (f: Record<string, unknown>) => JSON.stringify([f.url, f.path, f.file_name]);
    const index = artifacts.findIndex((f) => key(f) === key(file));
    if (index < 0) artifacts.push(file);
    else artifacts[index] = { ...artifacts[index], ...file };
  }
  return artifacts;
}
function nativeValue(
  record: Record<string, unknown>,
  payload: Record<string, unknown>,
  data: unknown
) {
  if (Object.hasOwn(record, "output")) return record.output;
  return Object.hasOwn(payload, "output") ? payload.output : data;
}
export function mergeFalEvent(state: FalStreamState, event: FalEvent): FalStreamState {
  const payload = eventRecord(event.data) ?? {};
  const nativeRecord = eventRecord(payload.output) ?? payload;
  const artifacts = mergeArtifacts(state.artifacts, payload, event.data);
  // Retain native event names/payloads in a bounded history. Cumulative snapshots replace.
  const next = { ...state, artifacts, events: [...state.events, event].slice(-40) };
  // A transport sentinel is not a model snapshot, including when no final arrived.
  if (event.data === "[DONE]") return next;
  if (event.event === "error" || payload.error) next.error = payload.error ?? event.data;
  if (nativeRecord.reasoning !== undefined) next.reasoning = nativeRecord.reasoning;
  const native = nativeValue(nativeRecord, payload, event.data);
  const partial = nativeRecord.partial ?? payload.partial;
  if (partial === true) next.partial = native;
  else if (partial === false || event.event === "final") next.final = native;
  return next;
}

export async function readFalEvents(
  body: ReadableStream<Uint8Array>,
  emit: (event: FalEvent) => void,
  signal?: AbortSignal
) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const parser = createFalEventParser(emit);
  const cancel = () => {
    void reader.cancel().catch(() => {});
  };
  signal?.addEventListener("abort", cancel, { once: true });
  try {
    if (signal?.aborted)
      throw new DOMException("Stream stopped; upstream completion is unknown", "AbortError");
    while (true) {
      const chunk = await reader.read();
      if (signal?.aborted)
        throw new DOMException("Stream stopped; upstream completion is unknown", "AbortError");
      if (chunk.done) break;
      parser.push(decoder.decode(chunk.value, { stream: true }));
    }
    parser.push(decoder.decode());
    parser.finish();
  } finally {
    signal?.removeEventListener("abort", cancel);
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}
