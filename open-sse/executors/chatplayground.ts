/**
 * ChatPlaygroundExecutor — ChatPlayground Web Provider
 *
 * Routes chat requests through app.chatplayground.ai's API using auto-minted
 * short-lived Clerk session JWTs or direct Clerk Bearer tokens.
 *
 * Endpoints:
 *   - azure: GPT, Claude, Gemini, DeepSeek, Mistral
 *   - lmsys: Kimi, Llama, Qwen, Grok, MiniMax, GLM
 *   - perplexity: Sonar / Perplexity search models
 */

import { randomUUID } from "node:crypto";
import { BaseExecutor, type ExecuteInput, type ExecutorExecuteResult } from "./base.ts";
import {
  makeExecutorErrorResult as makeErrorResult,
  sanitizeErrorMessage,
} from "../utils/error.ts";
import { resolveChatPlaygroundAuth } from "../services/chatplaygroundAuth.ts";
import {
  CHATPLAYGROUND_API_BASE,
  fetchChatPlaygroundModels,
  resolveChatPlaygroundModel,
  type ChatPlaygroundModel,
} from "../services/chatplaygroundModels.ts";

export const CHATPLAYGROUND_MAX_MESSAGE_CHARS = 15_000;

/**
 * Strip CHAT_ID sentinel tokens from response text.
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
 * Enqueue the final SSE chunk and [DONE] termination marker.
 */
export function enqueueSseCompletion(
  controller:
    TransformStreamDefaultController<Uint8Array> | ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
  streamId: string,
  created: number,
  model: string
): void {
  const finalChunk = {
    id: `chatcmpl-${streamId}`,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
  };
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(finalChunk)}\n\n`));
  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
}

/**
 * Vendor-prefixed upstream model id expected by the azure endpoint.
 * The web client sends `${provider.toLowerCase()}/${modelName}` (e.g.
 * "google/gemini-3.8-flash", "openai/gpt-6-luna") resolved from /api/models.
 */
export function resolveChatPlaygroundUpstreamModel(modelData: ChatPlaygroundModel): string {
  const provider = (modelData.provider || "").trim().toLowerCase();
  if (modelData.endpoint === "azure" && provider) {
    return `${provider}/${modelData.modelName}`;
  }
  return modelData.modelName;
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

/**
 * Build the JSON request payload for ChatPlayground API.
 * Field sets mirror what web.chatplayground.ai sends per endpoint:
 *   - azure:      messages, model, chatId, isRegenerate, promptTemplate, fileUrl, botId, submissionId, noSave
 *   - lmsys:      messages, model, botId (botId is required — the API 500s without it)
 *   - perplexity: messages, modelName, botId (botId is required — the API 500s without it)
 */
export function buildChatPlaygroundPayload(
  body: unknown,
  modelData: ChatPlaygroundModel
): Record<string, unknown> {
  const req = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const messages = Array.isArray(req.messages) ? req.messages : [];

  if (modelData.endpoint === "perplexity") {
    return { messages, modelName: modelData.modelName, botId: modelData.id };
  }

  if (modelData.endpoint === "lmsys") {
    return { messages, model: modelData.modelName, botId: modelData.id };
  }

  return {
    messages,
    model: resolveChatPlaygroundUpstreamModel(modelData),
    chatId: typeof req.chatId === "string" ? req.chatId : "",
    isRegenerate: false,
    promptTemplate: null,
    fileUrl: null,
    botId: modelData.id,
    submissionId: randomUUID(),
    noSave: true,
  };
}

/**
 * Build standard OpenAI chat.completion JSON response envelope.
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
 * Strip the `CITATIONS:[...]` metadata the perplexity endpoint appends to its
 * answer stream (the web client parses it for citation links instead of
 * rendering it). The marker can arrive on its own line OR inline right after
 * the answer text (e.g. `…Canberra**.[1]CITATIONS:[…]`), so both forms are
 * removed: whole `CITATIONS:` lines, and `CITATIONS:` runs to end of line.
 */
export function stripCitationsLine(text: string): string {
  if (!text) return "";
  return text
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("CITATIONS:"))
    .join("\n")
    .replace(/CITATIONS:[^\n]*/g, "");
}

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

export function splitChatPlaygroundStreamBuffer(combined: string): {
  toProcess: string;
  pendingBuffer: string;
} {
  const partialMatch = combined.match(/(?:CHAT_ID:[a-zA-Z0-9_-]*|CHAT_?I?D?:?|CHA?T?_?)$/);
  if (partialMatch && partialMatch[0].length < 64) {
    return {
      toProcess: combined.slice(0, combined.length - partialMatch[0].length),
      pendingBuffer: partialMatch[0],
    };
  }
  return { toProcess: combined, pendingBuffer: "" };
}

function encodeSseContentChunk(
  encoder: TextEncoder,
  streamId: string,
  created: number,
  model: string,
  content: string
): Uint8Array {
  const chunkObj = {
    id: `chatcmpl-${streamId}`,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: { content }, finish_reason: null }],
  };
  return encoder.encode(`data: ${JSON.stringify(chunkObj)}\n\n`);
}

function enqueueCleanedSseDelta(
  controller:
    TransformStreamDefaultController<Uint8Array> | ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
  streamId: string,
  created: number,
  model: string,
  raw: string,
  trim = false
): void {
  const cleaned = stripChatId(raw, trim);
  if (cleaned.length > 0) {
    controller.enqueue(encodeSseContentChunk(encoder, streamId, created, model, cleaned));
  }
}

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
      enqueueCleanedSseDelta(controller, encoder, streamId, created, model, content, true);
      enqueueSseCompletion(controller, encoder, streamId, created, model);
      controller.close();
    },
  });
  return new Response(singleChunkStream, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

export function createChatPlaygroundSseStream(
  upstream: ReadableStream<Uint8Array>,
  model: string
): ReadableStream<Uint8Array> {
  const streamId = randomUUID().slice(0, 12);
  const created = Math.floor(Date.now() / 1000);
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let pendingBuffer = "";

  const transformStream = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      const parsed = splitChatPlaygroundStreamBuffer(
        pendingBuffer + decoder.decode(chunk, { stream: true })
      );
      pendingBuffer = parsed.pendingBuffer;
      enqueueCleanedSseDelta(controller, encoder, streamId, created, model, parsed.toProcess);
    },
    flush(controller) {
      if (pendingBuffer.length > 0) {
        enqueueCleanedSseDelta(controller, encoder, streamId, created, model, pendingBuffer);
      }
      enqueueSseCompletion(controller, encoder, streamId, created, model);
    },
  });

  return upstream.pipeThrough(transformStream);
}

export class ChatPlaygroundExecutor extends BaseExecutor {
  constructor(providerName = "chatplayground") {
    super(providerName, {
      baseUrl: `${CHATPLAYGROUND_API_BASE}/chat`,
      timeoutMs: 300_000,
    });
  }

  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const { model, body, stream, credentials, signal } = input;
    const chatUrl = `${CHATPLAYGROUND_API_BASE}/chat`;

    const modelData = await resolveChatPlaygroundModelForRequest(model);
    if (!modelData) {
      return makeErrorResult(
        400,
        `ChatPlayground model not found or invalid: "${model || ""}"`,
        body,
        chatUrl
      );
    }

    let authHeaders: Record<string, string>;
    try {
      authHeaders = (await resolveChatPlaygroundAuth(credentials)).headers;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return makeErrorResult(401, sanitizeErrorMessage(msg), body, chatUrl);
    }

    const endpointUrl = `${chatUrl}/${modelData.endpoint}`;
    const payload = buildChatPlaygroundPayload(body, modelData);
    const messages = Array.isArray(payload.messages)
      ? (payload.messages as Array<Record<string, unknown>>)
      : [];
    const oversized = findOversizedChatPlaygroundMessage(messages);
    if (oversized) {
      return makeErrorResult(
        400,
        `Message at index ${oversized.index} exceeds ChatPlayground's ${CHATPLAYGROUND_MAX_MESSAGE_CHARS}-character limit (got ${oversized.charCount} characters). Enable prompt compression or reduce message length.`,
        payload,
        endpointUrl
      );
    }

    let response: Response;
    try {
      response = await fetch(endpointUrl, {
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
        endpointUrl
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      return makeErrorResult(
        response.status,
        `ChatPlayground API error (${response.status}): ${sanitizeErrorMessage(errorText)}`,
        payload,
        endpointUrl
      );
    }

    const isStreaming = stream !== false;
    if (modelData.endpoint === "perplexity") {
      return createPerplexityOpenAiResponse(model, await response.text(), isStreaming);
    }
    if (isStreaming && response.body) {
      return new Response(createChatPlaygroundSseStream(response.body, model), {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      });
    }

    return toOpenAiCompletionEnvelope(model, stripChatId(await response.text(), true));
  }
}

export const chatplaygroundExecutor = new ChatPlaygroundExecutor();
