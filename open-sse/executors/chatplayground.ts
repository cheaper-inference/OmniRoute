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
  ChatPlaygroundAiSdkParser,
  buildUnifiedChatPayload,
  chatPlaygroundJsonToResponse,
  chatPlaygroundStreamToResponse,
  countChatPlaygroundMessageChars,
  findChatPlaygroundUnsupportedInput,
  findOversizedChatPlaygroundMessage,
  renderChatPlaygroundMessageText,
  toOpenAiUsage,
  type ChatPlaygroundUsage,
} from "./chatplayground-stream.ts";

export {
  CHATPLAYGROUND_MAX_MESSAGE_CHARS,
  ChatPlaygroundAiSdkParser,
  buildUnifiedChatPayload,
  chatPlaygroundJsonToResponse,
  chatPlaygroundStreamToResponse,
  countChatPlaygroundMessageChars,
  findChatPlaygroundUnsupportedInput,
  findOversizedChatPlaygroundMessage,
  renderChatPlaygroundMessageText,
  toOpenAiUsage,
};

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

    // The unified API carries images as uploaded `message.attachments` fileIds.
    // Inline OpenAI `image_url` parts are not uploaded here, so reject them
    // instead of silently dropping the image from the rendered message text.
    const unsupported = findChatPlaygroundUnsupportedInput(messages);
    if (unsupported) {
      return makeErrorResult(
        400,
        `ChatPlayground does not support inline "${unsupported}" content: the unified API accepts images only as uploaded file IDs in message.attachments.`,
        payload,
        CHATPLAYGROUND_CHAT_URL
      );
    }

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
    if (isStreaming) {
      if (!response.body) return chatPlaygroundEmptyResponse(model);
      return chatPlaygroundStreamToResponse(response.body, model);
    }
    if (!response.body) return chatPlaygroundEmptyResponse(model);

    const raw = await response.text();
    const parsed = new ChatPlaygroundAiSdkParser();
    const usage: ChatPlaygroundUsage | null = parsed.pushWholeBody(raw);
    if (parsed.errored) {
      // HTTP 200 with an in-band `{"type":"error"}` frame: report the upstream
      // error instead of a successful empty completion.
      return makeErrorResult(
        502,
        `ChatPlayground API error (200): ${parsed.errored}`,
        payload,
        CHATPLAYGROUND_CHAT_URL
      );
    }
    return chatPlaygroundJsonToResponse(model, parsed, usage);
  }
}

/** An empty but well-formed non-streaming completion (upstream sent no body). */
function chatPlaygroundEmptyResponse(model: string): Response {
  return chatPlaygroundJsonToResponse(model, new ChatPlaygroundAiSdkParser(), null);
}

export const chatplaygroundExecutor = new ChatPlaygroundExecutor();
