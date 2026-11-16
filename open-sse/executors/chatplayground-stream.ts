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

  /** Flush a trailing unterminated line (stream ended without final \n). */
  flush(): AiSdkEvent[] {
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
    if (payload === this.lastEvent) return null; // dedupe doubled SSE lines
    this.lastEvent = payload;
    let event: Record<string, unknown>;
    try {
      event = JSON.parse(payload) as Record<string, unknown>;
    } catch {
      return null;
    }
    return this.consumeEvent(event);
  }

  private consumeEvent(event: Record<string, unknown>): AiSdkEvent | null {
    const type = typeof event.type === "string" ? event.type : "";
    switch (type) {
      case "start": {
        this.started = true;
        const meta = (event.messageMetadata ?? {}) as Record<string, unknown>;
        const direct = readUsage(event.usage) ?? readUsage(meta.usage);
        if (direct) this.usage = direct;
        return null;
      }
      case "text-delta": {
        const delta = typeof event.delta === "string" ? event.delta : "";
        if (!delta) {
          const meta = (event.providerMetadata ?? {}) as Record<string, unknown>;
          if (Object.keys(meta).length === 0) return null;
          return null; // providerMetadata-only deltas carry no visible text
        }
        this.text += delta;
        return { kind: "content", delta };
      }
      case "reasoning-delta": {
        const delta = typeof event.delta === "string" ? event.delta : "";
        if (!delta) return null;
        this.reasoningText += delta;
        return { kind: "reasoning", delta };
      }
      case "error": {
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
      case "finish": {
        this.done = true;
        const meta = (event.messageMetadata ?? {}) as Record<string, unknown>;
        // Live shape nests usage under messageMetadata.usage.
        const direct =
          readUsage(event.usage) ??
          readUsage(meta.usage) ??
          readUsage(meta);
        if (direct) this.usage = direct;
        const reason =
          typeof event.finishReason === "string"
            ? event.finishReason
            : typeof event.finish_reason === "string"
              ? event.finish_reason
              : "stop";
        this.finishReason = reason;
        return { kind: "finish", finishReason: reason, usage: this.usage };
      }
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
  let usageSent = false;
  let sawDelta = false;
  let sawError = false;

  const emit = (controller: TransformStreamDefaultController<Uint8Array>) => {
    if (!roleSent && parser.hasStarted) {
      controller.enqueue(encoder.encode(sseChunk(streamId, created, model, { role: "assistant" }, null)));
      roleSent = true;
    }
    for (const event of parser.flushBuffer()) {
      if (event.kind === "content" && event.delta) {
        sawDelta = true;
        controller.enqueue(encoder.encode(sseChunk(streamId, created, model, { content: event.delta }, null)));
      } else if (event.kind === "reasoning" && event.delta) {
        sawDelta = true;
        controller.enqueue(
          encoder.encode(sseChunk(streamId, created, model, { reasoning_content: event.delta }, null))
        );
      } else if (event.kind === "error") {
        sawError = true;
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              id: streamId,
              object: "chat.completion.chunk",
              created,
              model,
              error: { message: event.error?.message ?? "upstream error", type: "upstream_error" },
            })}\n\n`
          )
        );
      }
    }
  };

  const finishUpstream = (controller: TransformStreamDefaultController<Uint8Array>) => {
    if (!roleSent && parser.hasStarted) {
      controller.enqueue(encoder.encode(sseChunk(streamId, created, model, { role: "assistant" }, null)));
      roleSent = true;
    }
    if (!finishSent) {
      const frame: Record<string, unknown> = {
        id: streamId,
        object: "chat.completion.chunk",
        created,
        model,
        choices: [{ index: 0, delta: {}, finish_reason: parser.finishReason ?? "stop" }],
      };
      if (parser.usage) frame.usage = toOpenAiUsage(parser.usage);
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(frame)}\n\n`));
      usageSent = Boolean(parser.usage);
      finishSent = true;
    }
    if (!usageSent && parser.usage) {
      const frame: Record<string, unknown> = {
        id: streamId,
        object: "chat.completion.chunk",
        created,
        model,
        usage: toOpenAiUsage(parser.usage),
        choices: [],
      };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(frame)}\n\n`));
    }
    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
  };

  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      if (parser.done) return;
      parser.pushText(decoder.decode(chunk, { stream: true }));
      emit(controller);
      if (parser.done) finishUpstream(controller);
    },
    flush(controller) {
      if (!parser.done) {
        parser.finishTruncated();
        emit(controller);
      }
      finishUpstream(controller);
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
