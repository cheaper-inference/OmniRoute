/**
 * ChatPlaygroundExecutor — ChatPlayground Web Provider
 *
 * Routes chat requests through the unified ChatPlayground web API
 * (`POST https://web.chatplayground.ai/api/chat`, verified live 2026-11-16)
 * using auto-minted short-lived Clerk session JWTs or direct Clerk Bearer
 * tokens. The previous per-endpoint surface
 * (`app.chatplayground.ai/api/chat/{azure,lmsys,perplexity}`) is gone:
 * `app.chatplayground.ai` answers Cloudflare 522 and the per-endpoint paths 404
 * on the new origin; one route now serves every chat model via `modelSlug`.
 *
 * Wire contract (live-verified 2026-11-16):
 *   - Request:  {modelSlug, submissionId:<uuid>, message:{text, attachments?},
 *                noSave?, conversationId?, parentId?, turnId?, metadata?, seed?}
 *     Any other top-level key fails Zod validation ("Unrecognized key").
 *     Chat Completions `messages[]` history is serialized into `message.text`
 *     (prior turns rendered as a transcript); the API enforces a 15 000-char
 *     cap per message (`MESSAGE_TOO_LONG`).
 *   - Response: AI-SDK JSON stream over SSE framing (`data: {...}` lines,
 *     terminated by `data: [DONE]`) regardless of the Accept header:
 *     start → start-step → text-start → text-delta* → text-end → finish-step →
 *     finish{finishReason, messageMetadata.usage} (reasoning-start/delta/end for
 *     reasoning models). This parser translates it to OpenAI
 *     `chat.completion.chunk` frames, carrying usage + reasoning_content.
 */

import { randomUUID } from "node:crypto";
import { BaseExecutor, type ExecuteInput, type ExecutorExecuteResult } from "./base.ts";
import {
  makeExecutorErrorResult as makeErrorResult,
  sanitizeErrorMessage,
} from "../utils/error.ts";
import { resolveChatPlaygroundAuth } from "../services/chatplaygroundAuth.ts";
import {
  CHATPLAYGROUND_CHAT_URL,
  fetchChatPlaygroundModels,
  resolveChatPlaygroundModel,
  type ChatPlaygroundModel,
} from "../services/chatplaygroundModels.ts";
import {
  CHATPLAYGROUND_MAX_MESSAGE_CHARS,
  countChatPlaygroundMessageChars,
  findOversizedChatPlaygroundMessage,
  renderChatPlaygroundMessageText,
  buildUnifiedChatPayload,
  chatPlaygroundStreamToResponse,
  chatPlaygroundJsonToResponse,
  ChatPlaygroundAiSdkParser,
  type ChatPlaygroundUsage,
  toOpenAiUsage,
} from "./chatplayground-stream.ts";

export {
  CHATPLAYGROUND_MAX_MESSAGE_CHARS,
  countChatPlaygroundMessageChars,
  findOversizedChatPlaygroundMessage,
  renderChatPlaygroundMessageText,
};

/**
 * Strip CHAT_ID sentinel tokens from response text (pre-unified streams
 * prefixed `CHAT_ID:<id>`; kept so legacy fixtures keep normalizing cleanly).
 * By default, leaves token-level leading/trailing whitespace intact to avoid
 * corrupting streaming chunk formatting unless trim is explicitly requested.
 */
export function stripChatId(text: string, trim = false): string {
  if (!text) return "";
  const cleaned = text
    .replace(/^CHAT_ID:[a-zA-Z0-9_-]+\s*/g, "")
    .replace(/\s*CHAT_ID:[a-zA-Z0-9_-]+\s*$/g, "")
    .replace(/CHAT_ID:[a-zA-Z0-9_-]+/g, "");
  return trim ? cleaned.trim() : cleaned;
}

/**
 * Strip the `CITATIONS:[...]` metadata the legacy perplexity endpoint appended
 * to its answer stream. The unified API delivers citations via the
 * `source`/`finish` events instead, but inline markers still occur on
 * search-backed models and are removed the same way (whole lines and inline
 * `CITATIONS:` runs to end of line).
 */
export function stripCitationsLine(text: string): string {
  if (!text) return "";
  return text
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("CITATIONS:"))
    .join("\n")
    .replace(/CITATIONS:[^\n]*/g, "");
}

/**
 * Vendor-prefixed upstream model id (legacy azure wire form
 * `google/gemini-3.8-flash`). The unified API wants the bare `slug`, so this
 * now resolves to the catalog row's slug; kept for legacy imports.
 *
 * @deprecated use `model.slug` — the unified API takes the bare slug.
 */
export function resolveChatPlaygroundUpstreamModel(modelData: ChatPlaygroundModel): string {
  return modelData.slug;
}

/**
 * Build the JSON request payload for the unified ChatPlayground API from an
 * OpenAI chat completion body and a resolved catalog row.
 */
export function buildChatPlaygroundPayload(
  body: unknown,
  modelData: ChatPlaygroundModel
): Record<string, unknown> {
  return buildUnifiedChatPayload(body, modelData.slug);
}

/**
 * @deprecated The unified route has one request body for every model; the
 * per-endpoint variants collapsed into buildChatPlaygroundPayload.
 */
export function buildChatPlaygroundEndpointPayload(
  body: unknown,
  modelData: ChatPlaygroundModel
): Record<string, unknown> {
  return buildChatPlaygroundPayload(body, modelData);
}

/**
 * Build standard OpenAI chat.completion JSON response envelope (legacy
 * zero-usage shape; the unified path uses chatPlaygroundJsonToResponse so
 * real usage from `finish` is included).
 */
export function toOpenAiCompletionEnvelope(model: string, content: string): Response {
  return new Response(
    JSON.stringify({
      id: `chatcmpl-${randomUUID().slice(0, 12)}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    }),
    { headers: { "content-type": "application/json" } }
  );
}

/**
 * Legacy perplexity helper: the pre-unified endpoint returned the answer plus a
 * `CITATIONS:` trailer in a single body. The unified route streams AI-SDK
 * events instead, so this path is kept only for pre-drift fixtures: it strips
 * both the CHAT_ID prefix and CITATIONS trailer before answering.
 *
 * @deprecated superseded by the unified stream parser.
 */
export function createPerplexityOpenAiResponse(
  model: string,
  rawText: string,
  isStreaming: boolean
): Response {
  const content = stripChatId(stripCitationsLine(rawText), true);
  if (!isStreaming) return toOpenAiCompletionEnvelope(model, content);
  const streamId = randomUUID().slice(0, 12);
  const created = Math.floor(Date.now() / 1000);
  const encoder = new TextEncoder();
  const singleChunkStream = new ReadableStream({
    start(controller) {
      if (content.length > 0) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              id: `chatcmpl-${streamId}`,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [{ index: 0, delta: { content }, finish_reason: null }],
            })}\n\n`
          )
        );
      }
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            id: `chatcmpl-${streamId}`,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
          })}\n\n`
        )
      );
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(singleChunkStream, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

/**
 * Wrap an upstream ChatPlayground AI-SDK stream (SSE framing) into an OpenAI
 * chat.completion.chunk stream. Exposed for tests and the legacy call shape.
 */
export function createChatPlaygroundSseStream(
  upstream: ReadableStream<Uint8Array>,
  model: string
): ReadableStream<Uint8Array> {
  return chatPlaygroundStreamToResponse(upstream, model).body as ReadableStream<Uint8Array>;
}

/**
 * Resolve a request's model against the current live /api/models catalog
 * (10-minute cached, offline fallback), falling back to the bundled catalog so
 * a model the live roster no longer lists still routes rather than 400ing.
 */
async function resolveChatPlaygroundModelForRequest(
  model: string
): Promise<ChatPlaygroundModel | null> {
  const live = await fetchChatPlaygroundModels();
  const fromLive = resolveChatPlaygroundModel(model, live);
  if (fromLive) return fromLive;
  return resolveChatPlaygroundModel(model);
}

export class ChatPlaygroundExecutor extends BaseExecutor {
  constructor(providerName = "chatplayground") {
    super(providerName, {
      baseUrl: CHATPLAYGROUND_CHAT_URL,
      timeoutMs: 300_000,
    });
  }

  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const { model, body, stream, credentials, signal } = input;

    const modelData = await resolveChatPlaygroundModelForRequest(model);
    if (!modelData) {
      return makeErrorResult(
        400,
        `ChatPlayground model not found or invalid: "${model || ""}"`,
        body,
        CHATPLAYGROUND_CHAT_URL
      );
    }

    let authHeaders: Record<string, string>;
    try {
      authHeaders = (await resolveChatPlaygroundAuth(credentials)).headers;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return makeErrorResult(401, sanitizeErrorMessage(msg), body, CHATPLAYGROUND_CHAT_URL);
    }

    const payload = buildUnifiedChatPayload(body, modelData.slug);
    const reqMessages = (body as { messages?: unknown } | null)?.messages;
    const messages = Array.isArray(reqMessages)
      ? (reqMessages as Array<Record<string, unknown>>)
      : [];
    const oversized = findOversizedChatPlaygroundMessage(messages);
    if (oversized) {
      return makeErrorResult(
        400,
        `Message at index ${oversized.index} exceeds ChatPlayground's ${CHATPLAYGROUND_MAX_MESSAGE_CHARS}-character limit (got ${oversized.charCount} characters). Enable prompt compression or reduce message length.`,
        payload,
        CHATPLAYGROUND_CHAT_URL
      );
    }
    const textLength =
      typeof (payload.message as { text?: unknown })?.text === "string"
        ? (payload.message as { text: string }).text.length
        : 0;
    if (textLength > CHATPLAYGROUND_MAX_MESSAGE_CHARS) {
      return makeErrorResult(
        400,
        `Serialized conversation (${textLength} characters) exceeds ChatPlayground's ${CHATPLAYGROUND_MAX_MESSAGE_CHARS}-character per-message limit. Enable prompt compression or reduce history length.`,
        payload,
        CHATPLAYGROUND_CHAT_URL
      );
    }

    let response: Response;
    try {
      response = await fetch(CHATPLAYGROUND_CHAT_URL, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(payload),
        signal,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return makeErrorResult(
        502,
        `ChatPlayground connection failed: ${sanitizeErrorMessage(msg)}`,
        payload,
        CHATPLAYGROUND_CHAT_URL
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      return makeErrorResult(
        response.status,
        `ChatPlayground API error (${response.status}): ${sanitizeErrorMessage(errorText)}`,
        payload,
        CHATPLAYGROUND_CHAT_URL
      );
    }

    const isStreaming = stream !== false;
    if (isStreaming && response.body) {
      return chatPlaygroundStreamToResponse(response.body, model);
    }
    if (!response.body) {
      return toOpenAiCompletionEnvelope(model, "");
    }
    const raw = await response.text();
    const parsed = new ChatPlaygroundAiSdkParser();
    const usage: ChatPlaygroundUsage | null = parsed.pushWholeBody(raw);
    return chatPlaygroundJsonToResponse(model, parsed, usage);
  }
}

export const chatplaygroundExecutor = new ChatPlaygroundExecutor();

/** @deprecated internal re-export kept for prior test access. */
export const __toOpenAiUsage = toOpenAiUsage;
