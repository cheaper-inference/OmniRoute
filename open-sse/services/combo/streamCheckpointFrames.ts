/**
 * SSE framing and Chat Completions classification for the combo stream resumption
 * (`streamCheckpointRecovery.ts`).
 *
 * The resumption forwards the original bytes of every event it lets through, so it splits the
 * stream on bytes (a line break never occurs inside a multi-byte UTF-8 sequence) and decodes an
 * event only to look at it. A frame it cannot place ends the resumption's claim on the stream:
 * the verdict is `unsupported` and the stream goes on untouched.
 *
 * Leaf module: it imports only the recoverable-error predicate of the holdback.
 */
import { isRecoverableStreamErrorFrame } from "./reasoningHoldback.ts";

export type JsonRecord = Record<string, unknown>;

/** Largest event the resumption buffers while waiting for its blank line. */
export const MAX_EVENT_BYTES = 256 * 1024;

const LF = 0x0a;
const CR = 0x0d;
const decoder = new TextDecoder();
const encoder = new TextEncoder();

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isPopulated(value: unknown): boolean {
  if (value === null || value === undefined || value === false) return false;
  if (typeof value === "string") return value.length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/** Index just past the first complete event in `bytes` (its blank line), or -1. */
export function findEventEnd(bytes: Uint8Array): number {
  let lineStart = 0;
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    if (byte !== LF && byte !== CR) continue;
    let next = i + 1;
    if (byte === CR) {
      // A CR at the very end may be the first half of a CRLF: wait for the next byte.
      if (next >= bytes.length) return -1;
      if (bytes[next] === LF) next++;
    }
    if (i === lineStart) return next;
    lineStart = next;
    i = next - 1;
  }
  return -1;
}

function concat(a: Uint8Array, b: Uint8Array): Uint8Array {
  if (a.byteLength === 0) return b;
  const joined = new Uint8Array(a.byteLength + b.byteLength);
  joined.set(a, 0);
  joined.set(b, a.byteLength);
  return joined;
}

/** Cuts a byte stream into complete SSE events, keeping the unfinished tail. */
export class SseEventBuffer {
  private pending: Uint8Array = new Uint8Array(0);

  /** Complete events (each ends with its blank line), original bytes, in order. */
  push(chunk: Uint8Array): Uint8Array[] {
    this.pending = concat(this.pending, chunk);
    const events: Uint8Array[] = [];
    for (;;) {
      const end = findEventEnd(this.pending);
      if (end < 0) break;
      events.push(this.pending.slice(0, end));
      this.pending = this.pending.subarray(end);
    }
    return events;
  }

  /** The unfinished tail (empty when the stream ended on an event boundary). */
  drain(): Uint8Array {
    const rest = this.pending;
    this.pending = new Uint8Array(0);
    return rest;
  }

  get pendingBytes(): number {
    return this.pending.byteLength;
  }
}

/** The `data:` payload of one event, or null when it has none (comments, field-only events). */
export function eventPayload(event: Uint8Array): string | null {
  const data: string[] = [];
  for (const line of decoder.decode(event).split(/\r\n|\r|\n/)) {
    if (line.startsWith("data:")) data.push(line.slice(line[5] === " " ? 6 : 5));
  }
  return data.length > 0 ? data.join("\n") : null;
}

export type StreamIdentity = Readonly<{
  id?: string;
  object?: string;
  created?: number;
  model?: string;
  system_fingerprint?: string;
}>;

export type ChatFrame =
  /** Nothing the resumption cares about: a comment, a ping, a role-only or empty delta. */
  | { kind: "ignore" }
  /** A delta of the single choice. `finishReason` is set on the terminal chunk. */
  | {
      kind: "delta";
      delta: JsonRecord;
      content: string;
      finishReason: string | null;
      identity: StreamIdentity | null;
      usage: JsonRecord | null;
    }
  /** A usage-only chunk (`choices: []`). */
  | { kind: "usage"; usage: JsonRecord; identity: StreamIdentity | null }
  | { kind: "done" }
  /** The gateway's own marker for a stream cut in transit. */
  | { kind: "cut" }
  /** Anything the resumption does not follow: tools, refusals, several choices, other shapes. */
  | { kind: "unsupported" };

const ALLOWED_DELTA_KEYS = new Set([
  "role",
  "content",
  "reasoning_content",
  "reasoning",
  "reasoning_details",
]);

function identityOf(parsed: JsonRecord): StreamIdentity | null {
  if (typeof parsed.id !== "string") return null;
  return {
    id: parsed.id,
    ...(typeof parsed.object === "string" ? { object: parsed.object } : {}),
    ...(typeof parsed.created === "number" ? { created: parsed.created } : {}),
    ...(typeof parsed.model === "string" ? { model: parsed.model } : {}),
    ...(typeof parsed.system_fingerprint === "string"
      ? { system_fingerprint: parsed.system_fingerprint }
      : {}),
  };
}

function isLifecycleFrame(parsed: JsonRecord): boolean {
  if (parsed.type === "ping") return true;
  const keys = Object.keys(parsed);
  return keys.length > 0 && keys.every((key) => key === "tokens_generated" || key === "elapsed_ms");
}

function deltaFrame(parsed: JsonRecord, choice: JsonRecord): ChatFrame {
  const delta = choice.delta === undefined ? {} : choice.delta;
  if (!isRecord(delta)) return { kind: "unsupported" };
  for (const [key, value] of Object.entries(delta)) {
    if (!ALLOWED_DELTA_KEYS.has(key) && isPopulated(value)) return { kind: "unsupported" };
  }
  const content = delta.content;
  if (content !== undefined && content !== null && typeof content !== "string") {
    return { kind: "unsupported" };
  }
  const finish = choice.finish_reason;
  if (finish === "tool_calls" || finish === "function_call") return { kind: "unsupported" };
  return {
    kind: "delta",
    delta,
    content: typeof content === "string" ? content : "",
    finishReason: typeof finish === "string" && finish.length > 0 ? finish : null,
    identity: identityOf(parsed),
    usage: isRecord(parsed.usage) ? parsed.usage : null,
  };
}

function parseRecord(payload: string): JsonRecord | null {
  try {
    const parsed: unknown = JSON.parse(payload);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function choicesFrame(parsed: JsonRecord): ChatFrame {
  const choices = parsed.choices;
  if (!Array.isArray(choices)) return { kind: "unsupported" };
  if (choices.length === 0) {
    return isRecord(parsed.usage)
      ? { kind: "usage", usage: parsed.usage, identity: identityOf(parsed) }
      : { kind: "ignore" };
  }
  const choice = choices[0];
  if (choices.length > 1 || !isRecord(choice)) return { kind: "unsupported" };
  if (choice.index !== undefined && choice.index !== 0) return { kind: "unsupported" };
  return deltaFrame(parsed, choice);
}

/** What one assembled event payload means to a single-choice Chat Completions stream. */
export function classifyChatFrame(payload: string | null): ChatFrame {
  if (payload === null || payload.length === 0) return { kind: "ignore" };
  if (payload.trim() === "[DONE]") return { kind: "done" };
  const parsed = parseRecord(payload);
  if (!parsed) return { kind: "unsupported" };
  if (isPopulated(parsed.error)) {
    return isRecoverableStreamErrorFrame(parsed.error) ? { kind: "cut" } : { kind: "unsupported" };
  }
  return isLifecycleFrame(parsed) ? { kind: "ignore" } : choicesFrame(parsed);
}

// ─── Building the frames of a stitched suffix ──────────────────────────────────

const SUFFIX_FRAME_CHARS = 2048;

function dataFrame(value: unknown): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(value)}\n\n`);
}

/** Split `text` into pieces of about `size` characters without cutting a surrogate pair. */
function pieces(text: string, size: number): string[] {
  const out: string[] = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + size, text.length);
    const last = text.charCodeAt(end - 1);
    if (end < text.length && last >= 0xd800 && last <= 0xdbff) end--;
    out.push(text.slice(start, end));
    start = end;
  }
  return out;
}

export type SuffixFramesInput = Readonly<{
  suffix: string;
  finishReason: string;
  identity: StreamIdentity | null;
  usage: JsonRecord | null;
}>;

/**
 * The frames that finish a stream with `suffix`: content, the terminal chunk, the usage
 * trailer when the replacement reported one, and the single `[DONE]`. They carry the identity
 * of the stream the client has been reading.
 */
export function buildSuffixFrames(input: SuffixFramesInput): Uint8Array[] {
  const { identity } = input;
  const head: JsonRecord = {
    id: identity?.id ?? "chatcmpl-resumed",
    object: identity?.object ?? "chat.completion.chunk",
    ...(identity?.created === undefined ? {} : { created: identity.created }),
    ...(identity?.model === undefined ? {} : { model: identity.model }),
    ...(identity?.system_fingerprint === undefined
      ? {}
      : { system_fingerprint: identity.system_fingerprint }),
  };
  const frames = pieces(input.suffix, SUFFIX_FRAME_CHARS).map((piece) =>
    dataFrame({
      ...head,
      choices: [{ index: 0, delta: { content: piece }, finish_reason: null }],
    })
  );
  frames.push(
    dataFrame({
      ...head,
      choices: [{ index: 0, delta: {}, finish_reason: input.finishReason }],
    })
  );
  if (input.usage) frames.push(dataFrame({ ...head, choices: [], usage: input.usage }));
  frames.push(encoder.encode("data: [DONE]\n\n"));
  return frames;
}
