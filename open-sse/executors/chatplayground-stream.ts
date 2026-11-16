/**
 * ChatPlayground unified-chat wire helpers (verified live 2026-11-16).
 *
 * The unified `POST /api/chat` accepts one message per request:
 *   {modelSlug, submissionId, message:{text, attachments?}, noSave?, ...}
 * so OpenAI `messages[]` history is rendered into a single text body, and the
 * reply is an AI-SDK JSON stream (start / text-start / text-delta* / text-end /
 * finish{usage}) wrapped in SSE framing, terminated by `data: [DONE]`.
 */

import { randomUUID } from "node:crypto";
import type { UsageQuota } from "../services/usage/quota.ts";

export const CHATPLAYGROUND_MAX_MESSAGE_CHARS = 15_000;

/** Count characters in a Chat Completions message `content` (string or multipart). */
export function countChatPlaygroundMessageChars(content: unknown): number {
  if (typeof content === "string") return content.length;
  if (!Array.isArray(content)) return 0;
  let charCount = 0;
  for (const part of content) {
    if (typeof part === "string") {
      charCount += part.length;
    } else if (
      part &&
      typeof part === "object" &&
      typeof (part as { text?: unknown }).text === "string"
    ) {
      charCount += (part as { text: string }).text.length;
    }
  }
  return charCount;
}

export function findOversizedChatPlaygroundMessage(
  messages: Array<Record<string, unknown>>,
  maxChars = CHATPLAYGROUND_MAX_MESSAGE_CHARS
): { index: number; charCount: number } | null {
  for (let i = 0; i < messages.length; i++) {
    const charCount = countChatPlaygroundMessageChars(messages[i]?.content);
    if (charCount > maxChars) return { index: i, charCount };
  }
  return null;
}

/** Extract the plain-text body of one Chat Completions message. */
export function chatMessageText(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) =>
      typeof part === "string" ? part : ((part as { text?: unknown })?.text ?? "")
    )
    .filter(Boolean)
    .join("\n");
}

/**
 * Render an OpenAI `messages[]` array into the single `message.text` the
 * unified API accepts: prior turns become a plain transcript and the final
 * turn is the message proper. Non-chat roles (tool/system-only) still count
 * toward the transcript so context is never silently dropped.
 */
export function renderChatPlaygroundMessageText(
  messages: Array<Record<string, unknown>>
): string {
  if (messages.length === 0) return "";
  if (messages.length === 1) return chatMessageText(messages[0]?.content);
  const history = messages.slice(0, -1);
  const finalTurn = chatMessageText(messages[messages.length - 1]?.content);
  const transcript = history
    .map((m) => `${String(m.role ?? "user")}: ${chatMessageText(m.content)}`)
    .join("\n");
  return `Conversation history:\n${transcript}\n\nReply to the last message.\n${finalTurn}`;
}

/** The unsupported type of one content part, or null when it is text or an uploaded file. */
function unsupportedContentPart(part: unknown): string | null {
  if (!part || typeof part !== "object") return null;
  const rec = part as Record<string, unknown>;
  if (typeof rec.text === "string") return null;
  if (typeof rec.fileId === "string" || typeof rec.file_id === "string") return null;
  if (rec.image_url !== undefined || rec.type === "image_url") return "image_url";
  return typeof rec.type === "string" && rec.type ? rec.type : null;
}

/**
 * The unified API accepts images only as uploaded file IDs in
 * `message.attachments`; an OpenAI `image_url` part carries no `text` field,
 * so `chatMessageText` would silently drop it from the rendered message.
 * Returns the part type of the first non-text part found (e.g. "image_url")
 * so callers can reject it instead of losing the image without a signal.
 */
export function findChatPlaygroundUnsupportedInput(
  messages: Array<Record<string, unknown>>
): string | null {
  for (const message of messages) {
    if (!Array.isArray(message?.content)) continue;
    for (const part of message.content as unknown[]) {
      const unsupported = unsupportedContentPart(part);
      if (unsupported) return unsupported;
    }
  }
  return null;
}

/** Attachment items on the unified API are objects with a `fileId` string. */
export function extractChatPlaygroundAttachments(
  lastMessage: Record<string, unknown> | undefined
): Array<{ fileId: string }> {
  const raw = lastMessage?.attachments ?? (lastMessage as { files?: unknown } | undefined)?.files;
  if (!Array.isArray(raw)) return [];
  const out: Array<{ fileId: string }> = [];
  for (const item of raw) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const rec = item as Record<string, unknown>;
    const fileId = rec.fileId ?? rec.file_id;
    if (typeof fileId === "string" && fileId.trim()) out.push({ fileId: fileId.trim() });
  }
  return out;
}

/**
 * Build the unified request body from an OpenAI chat completion body.
 * `submissionId` is a fresh UUID per call (live-validated as a UUID).
 * `conversationId` is only forwarded when the caller supplies a UUID
 * (`chatId` or `conversationId`); the rest of the unified optional keys
 * (`parentId`, `turnId`, `metadata`, `seed`) are not sent by OmniRoute.
 */
export function buildUnifiedChatPayload(
  body: unknown,
  slug: string
): Record<string, unknown> {
  const req = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const messages = Array.isArray(req.messages)
    ? (req.messages as Array<Record<string, unknown>>)
    : [];
  const payload: Record<string, unknown> = {
    modelSlug: slug,
    submissionId: randomUUID(),
    message: { text: renderChatPlaygroundMessageText(messages) },
  };
  const attachments = extractChatPlaygroundAttachments(messages[messages.length - 1]);
  if (attachments.length > 0) {
    (payload.message as Record<string, unknown>).attachments = attachments;
  }
  const conversationId =
    typeof req.conversationId === "string"
      ? req.conversationId
      : typeof req.chatId === "string"
        ? req.chatId
        : "";
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(conversationId)) {
    payload.conversationId = conversationId;
  }
  if (process.env.CHATPLAYGROUND_NO_SAVE === "true") {
    payload.noSave = true;
  }
  return payload;
}

// ── Response stream (AI-SDK JSON events) ─────────────────────────────────────

export interface ChatPlaygroundUsage {
  inputTokens: number;
  outputTokens: number;
  reasoningTokens: number;
}

/** Map the unified `finish.messageMetadata.usage` to OpenAI usage fields. */
export function toOpenAiUsage(usage: ChatPlaygroundUsage): {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  completion_tokens_details?: { reasoning_tokens: number };
} {
  return {
    prompt_tokens: usage.inputTokens,
    completion_tokens: usage.outputTokens,
    total_tokens: usage.inputTokens + usage.outputTokens,
    completion_tokens_details: { reasoning_tokens: usage.reasoningTokens },
  };
}

export interface AiSdkEvent {
  kind: "content" | "reasoning" | "finish" | "error" | null;
  delta?: string;
  finishReason?: string;
  usage?: ChatPlaygroundUsage | null;
  error?: { message: string };
}

function readUsage(raw: unknown): ChatPlaygroundUsage | null {
  if (!raw || typeof raw !== "object") return null;
  const rec = raw as Record<string, unknown>;
  const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);
  if (
    typeof rec.inputTokens !== "number" &&
    typeof rec.outputTokens !== "number" &&
    typeof rec.reasoningTokens !== "number"
  ) {
    return null;
  }
  return {
    inputTokens: n(rec.inputTokens),
    outputTokens: n(rec.outputTokens),
    reasoningTokens: n(rec.reasoningTokens),
  };
}

/**
 * Incremental parser for the unified ChatPlayground reply: accepts either the
 * raw SSE-framed body (`data: {...}` lines + `data: [DONE]`) or a bare
 * concatenated stream, emitting OpenAI chunk payloads.
 */
export class ChatPlaygroundAiSdkParser {
  text = "";
  reasoningText = "";
  finishReason: string | null = null;
  usage: ChatPlaygroundUsage | null = null;
  done = false;
  errored: string | null = null;
  private buffer = "";
  private lastEvent = "";
  private started = false;
  private pending: AiSdkEvent[] = [];

  /**
   * Feed one raw network chunk. Returns all complete events parsed from the
   * buffered lines (partial lines stay buffered until the next chunk).
   */
  push(chunk: string): AiSdkEvent[] {
    if (this.done) return [];
    this.pushText(chunk);
    return this.flushBuffer();
  }

  /** Buffer raw text; complete lines are moved into the event queue. */
  pushText(chunk: string): void {
    if (this.done) return;
    const combined = this.buffer + chunk;
    const lastNewline = combined.lastIndexOf("\n");
    if (lastNewline === -1) {
      this.buffer = combined;
      return;
    }
    this.buffer = combined.slice(lastNewline + 1);
    // The dedupe window is exactly one framing chunk: the live stream format
    // only ever doubles a line verbatim inside one chunk (transport replay),
    // while identical deltas arriving in *separate* chunks ("ha" + "ha") are
    // genuine content and must be preserved.
    this.lastEvent = "";
    for (const line of combined.slice(0, lastNewline).split("\n")) {
      const event = this.consumeLine(line);
      if (event) this.pending.push(event);
      if (this.done) break;
    }
  }

  /** Drain queued events (all complete lines parsed so far). */
  flushBuffer(): AiSdkEvent[] {
    return this.pending.splice(0);
  }

  /** Mark the stream finished without a `finish` event (upstream closed early). */
  finishTruncated(): void {
    this.done = true;
    if (!this.finishReason) this.finishReason = this.errored ? "error" : "stop";
  }

  /**
   * Flush a trailing unterminated line (stream ended without final \n).
   * Idempotent: after the first call the buffer is empty, so later calls just
   * drain the event queue. Complete-but-unterminated records (the live stream
   * ends `data: [DONE]` without a trailing newline) are parsed here; an
   * incomplete JSON fragment fails JSON.parse and is dropped, matching
   * pushWholeBody().
   */
  flush(partial = ""): AiSdkEvent[] {
    if (partial) this.pushText(partial);
    if (!this.buffer) return this.flushBuffer();
    const line = this.buffer;
    this.buffer = "";
    const event = this.consumeLine(line);
    const events = event ? [event] : [];
    return events.concat(this.flushBuffer());
  }

  /** Parse a whole captured body in one shot (non-streaming responses). */
  pushWholeBody(raw: string): ChatPlaygroundUsage | null {
    const events = this.push(raw);
    events.push(...this.flush());
    return events.length > 0 ? this.usage : null;
  }

  private consumeLine(rawLine: string): AiSdkEvent | null {
    const line = rawLine.trim();
    if (!line) return null;
    const payload = line.startsWith("data:") ? line.slice(5).trim() : line;
    if (!payload) return null;
    if (payload === "[DONE]") {
      this.done = true;
      return null;
    }
    if (!payload.startsWith("{")) return null;
    // Dedupe scope is managed by pushText (per chunk) / flush (end of stream);
    // identical payloads across chunks are real repeats, not replays.
    if (payload === this.lastEvent) return null;
    this.lastEvent = payload;
    let event: Record<string, unknown>;
    try {
      event = JSON.parse(payload) as Record<string, unknown>;
    } catch {
      return null;
    }
    return this.consumeEvent(event);
  }

  private consumeStart(event: Record<string, unknown>): void {
    this.started = true;
    const meta = (event.messageMetadata ?? {}) as Record<string, unknown>;
    const direct = readUsage(event.usage) ?? readUsage(meta.usage);
    if (direct) this.usage = direct;
  }

  private consumeTextDelta(event: Record<string, unknown>): AiSdkEvent | null {
    const delta = typeof event.delta === "string" ? event.delta : "";
    if (!delta) return null; // empty deltas (providerMetadata-only) carry no text
    this.text += delta;
    return { kind: "content", delta };
  }

  private consumeReasoningDelta(event: Record<string, unknown>): AiSdkEvent | null {
    const delta = typeof event.delta === "string" ? event.delta : "";
    if (!delta) return null;
    this.reasoningText += delta;
    return { kind: "reasoning", delta };
  }

  private consumeError(event: Record<string, unknown>): AiSdkEvent {
    const message =
      typeof event.message === "string"
        ? event.message
        : typeof event.error === "string"
          ? event.error
          : "ChatPlayground stream error";
    this.errored = message;
    this.done = true;
    return { kind: "error", error: { message } };
  }

  private consumeFinish(event: Record<string, unknown>): AiSdkEvent {
    this.done = true;
    const meta = (event.messageMetadata ?? {}) as Record<string, unknown>;
    // Live shape nests usage under messageMetadata.usage.
    const direct = readUsage(event.usage) ?? readUsage(meta.usage) ?? readUsage(meta);
    if (direct) this.usage = direct;
    this.finishReason =
      typeof event.finishReason === "string"
        ? event.finishReason
        : typeof event.finish_reason === "string"
          ? event.finish_reason
          : "stop";
    return { kind: "finish", finishReason: this.finishReason, usage: this.usage };
  }

  private consumeEvent(event: Record<string, unknown>): AiSdkEvent | null {
    switch (typeof event.type === "string" ? event.type : "") {
      case "start":
        this.consumeStart(event);
        return null;
      case "text-delta":
        return this.consumeTextDelta(event);
      case "reasoning-delta":
        return this.consumeReasoningDelta(event);
      case "error":
        return this.consumeError(event);
      case "finish":
        return this.consumeFinish(event);
      default:
        return null; // start-step, text-start/end, finish-step, source, heartbeat…
    }
  }

  get hasStarted(): boolean {
    return this.started;
  }
}

/** Build one `chat.completion.chunk` SSE frame. */
function sseChunk(
  id: string,
  created: number,
  model: string,
  delta: Record<string, unknown>,
  finishReason: string | null
): string {
  return `data: ${JSON.stringify({
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  })}\n\n`;
}

/**
 * The terminal OpenAI frames: the finish chunk (carrying usage when known), a
 * usage-only chunk when usage arrived after the finish frame, then `[DONE]`.
 */
function terminalSseFrames(
  id: string,
  created: number,
  model: string,
  parser: ChatPlaygroundAiSdkParser,
  finishAlreadySent: boolean
): string[] {
  const frames: string[] = [];
  if (!finishAlreadySent) {
    const frame: Record<string, unknown> = {
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta: {}, finish_reason: parser.finishReason ?? "stop" }],
    };
    if (parser.usage) frame.usage = toOpenAiUsage(parser.usage);
    frames.push(`data: ${JSON.stringify(frame)}\n\n`);
  } else if (parser.usage) {
    frames.push(
      `data: ${JSON.stringify({
        id,
        object: "chat.completion.chunk",
        created,
        model,
        usage: toOpenAiUsage(parser.usage),
        choices: [],
      })}\n\n`
    );
  }
  frames.push("data: [DONE]\n\n");
  return frames;
}
function eventToSseFrame(event: AiSdkEvent, id: string, created: number, model: string): string | null {
  if (event.kind === "content" && event.delta) {
    return sseChunk(id, created, model, { content: event.delta }, null);
  }
  if (event.kind === "reasoning" && event.delta) {
    return sseChunk(id, created, model, { reasoning_content: event.delta }, null);
  }
  if (event.kind === "error") {
    return `data: ${JSON.stringify({
      id,
      object: "chat.completion.chunk",
      created,
      model,
      error: { message: event.error?.message ?? "upstream error", type: "upstream_error" },
    })}\n\n`;
  }
  return null;
}

/**
 * Transform an upstream ChatPlayground SSE stream into an OpenAI
 * `chat.completion.chunk` stream (content + reasoning deltas, usage-carrying
 * finish frame, `data: [DONE]` termination).
 */
export function chatPlaygroundStreamToResponse(
  upstream: ReadableStream<Uint8Array>,
  model: string
): Response {
  const streamId = `chatcmpl-${randomUUID().slice(0, 12)}`;
  const created = Math.floor(Date.now() / 1000);
  const parser = new ChatPlaygroundAiSdkParser();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let roleSent = false;
  let finishSent = false;

  const emit = (
    controller: TransformStreamDefaultController<Uint8Array>,
    extra: AiSdkEvent[] = []
  ) => {
    if (!roleSent && parser.hasStarted) {
      controller.enqueue(encoder.encode(sseChunk(streamId, created, model, { role: "assistant" }, null)));
      roleSent = true;
    }
    // `extra` carries events from a manual flush() (already spliced out of the
    // pending queue); otherwise drain the pending queue as usual.
    const events = extra.length > 0 ? extra : parser.flushBuffer();
    for (const event of events) {
      const frame = eventToSseFrame(event, streamId, created, model);
      if (frame) controller.enqueue(encoder.encode(frame));
    }
  };

  const finishUpstream = (controller: TransformStreamDefaultController<Uint8Array>) => {
    if (!roleSent && parser.hasStarted) {
      controller.enqueue(encoder.encode(sseChunk(streamId, created, model, { role: "assistant" }, null)));
      roleSent = true;
    }
    for (const frame of terminalSseFrames(streamId, created, model, parser, finishSent)) {
      controller.enqueue(encoder.encode(frame));
    }
    finishSent = true;
  };

  let finalized = false;
  const finalize = (
    controller: TransformStreamDefaultController<Uint8Array>,
    extra: AiSdkEvent[] = []
  ) => {
    if (finalized) return;
    finalized = true;
    emit(controller, extra);
    finishUpstream(controller);
  };

  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      if (parser.done) {
        // The protocol finished (finish/[DONE]) while the transport stayed
        // open: emit terminal frames and close the output early so readers
        // reach EOF and upstream consumption stops (terminate() closes both
        // sides of the transform, which cancels the piped source).
        finalize(controller);
        controller.terminate();
        return;
      }
      parser.pushText(decoder.decode(chunk, { stream: true }));
      emit(controller);
      if (parser.done) {
        finalize(controller);
        controller.terminate();
      }
    },
    flush(controller) {
      if (!parser.done) {
        // Upstream closed without finish: flush the decoder tail and the
        // parser's buffered trailing record (a complete `data: {...}` line
        // without its newline must not be lost), then mark the stream
        // truncated. The flushed events go through finalize → emit.
        const extra = parser.flush(decoder.decode());
        parser.finishTruncated();
        finalize(controller, extra);
        return;
      }
      finalize(controller);
    },
  });

  return new Response(upstream.pipeThrough(transform), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

/** Build the non-streaming OpenAI `chat.completion` Response from a parsed stream. */
export function chatPlaygroundJsonToResponse(
  model: string,
  parser: ChatPlaygroundAiSdkParser,
  usage: ChatPlaygroundUsage | null
): Response {
  const message: Record<string, unknown> = { role: "assistant", content: parser.text };
  if (parser.reasoningText) message.reasoning_content = parser.reasoningText;
  const body: Record<string, unknown> = {
    id: `chatcmpl-${randomUUID().slice(0, 12)}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message,
        finish_reason: parser.finishReason ?? "stop",
      },
    ],
  };
  const usageObj =
    usage !== null && usage !== undefined
      ? toOpenAiUsage(usage)
      : parser.usage
        ? toOpenAiUsage(parser.usage)
        : undefined;
  if (usageObj) body.usage = usageObj;
  return new Response(JSON.stringify(body), { headers: { "content-type": "application/json" } });
}

export type { UsageQuota };
