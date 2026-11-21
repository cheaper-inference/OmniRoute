/**
 * GeminiAppExecutor — native HTTP/2 gRPC/protobuf access to Google's Robin
 * backend (gemini-app2api wire protocol) using OAuth credentials.
 *
 * Distinct from `gemini-web` (Playwright + cookies) and `antigravity`/`agy`
 * (Cloud Code REST). All errors go through buildErrorBody/sanitizeErrorMessage.
 */

import { randomUUID } from "node:crypto";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";
import { GEMINI_APP_BASE_URL } from "../config/providers/registry/gemini-app/index.ts";
import {
  geminiAppErrorResponse,
  GeminiAppError,
  normalizeGeminiAppError,
} from "./gemini-app/errors.ts";
import { normalizeGeminiAppPrompt } from "./gemini-app/prompt.ts";
import { openDirectTurn, type NativeEvent } from "./gemini-app/grpcTransport.ts";
import {
  decodeNativeFrame,
  monotonicDelta,
  type NativeFrameInfo,
} from "./gemini-app/responseDecoder.ts";
import { verifyResolvedModel } from "./gemini-app/modelPolicy.ts";

const SSE_HEADERS = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
  "X-Accel-Buffering": "no",
};

function sse(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function messageId(): string {
  return `chatcmpl-${randomUUID()}`;
}

interface CredentialsLike {
  accessToken?: string;
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
}

export class GeminiAppExecutor extends BaseExecutor {
  constructor() {
    super("gemini-app", { id: "gemini-app", baseUrl: GEMINI_APP_BASE_URL });
  }

  buildUrl(): string {
    return GEMINI_APP_BASE_URL;
  }

  async execute(input: ExecuteInput): Promise<Response> {
    try {
      const credentials = input.credentials as CredentialsLike;
      const token = credentials.accessToken || credentials.apiKey;
      if (!token) {
        throw new GeminiAppError(
          "NATIVE_UNAUTHENTICATED",
          401,
          "Gemini App OAuth token is missing"
        );
      }
      const prompt = normalizeGeminiAppPrompt(input.body, input.model, input.stream);

      const turn = openDirectTurn({
        token,
        userText: prompt.userText,
        images: prompt.images,
        systemText: prompt.systemText,
        tools: prompt.tools,
        toolChoice: prompt.toolChoice,
        modeCategory: prompt.modeCategory,
        thinkingLevel: prompt.thinkingLevel,
        temporaryChat: true,
        timeoutMs: this.getTimeoutMs(),
        signal: input.signal ?? undefined,
      });

      if (!input.stream) return await this.collectJson(turn.events, prompt, input);
      return this.streamSse(turn.events, prompt, input);
    } catch (error) {
      input.log?.error?.("GEMINI_APP", "native turn failed");
      return geminiAppErrorResponse(error);
    }
  }

  private verify(info: NativeFrameInfo, model: CanonicalPromptModel): void {
    if (info.hasToolOperations) {
      throw new GeminiAppError("NATIVE_PROTOCOL_ERROR", 502, "Unsupported native tool operation");
    }
    const check = verifyResolvedModel(model, {
      resolvedModeCategory: info.resolvedModeCategory,
      attribution: info.attribution,
      fallback: info.fallback,
      downgradeReason: info.downgradeReason,
    });
    if (check.downgraded) {
      throw new GeminiAppError(
        "NATIVE_QUOTA_EXHAUSTED",
        429,
        `Gemini App model downgrade detected: ${check.reason}`
      );
    }
  }

  private async collectJson(
    events: AsyncIterable<NativeEvent>,
    prompt: NormalizedPrompt,
    input: ExecuteInput
  ): Promise<Response> {
    let latest = "";
    let lastId = "";
    let usage = { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };
    for await (const event of events) {
      if (event.type !== "frame") continue;
      const info = decodeNativeFrame(event.bytes);
      if (!info) continue;
      this.verify(info, prompt.modelId);
      if (info.text !== null) {
        if (info.responseId && info.responseId !== lastId) {
          lastId = info.responseId;
          latest = "";
        }
        latest = info.text;
      }
    }
    const id = messageId();
    const body = {
      id,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: prompt.modelId,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: latest },
          finish_reason: "stop",
        },
      ],
      usage,
    };
    void input;
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  private streamSse(
    events: AsyncIterable<NativeEvent>,
    prompt: NormalizedPrompt,
    input: ExecuteInput
  ): Response {
    const self = this;
    const id = messageId();
    const created = Math.floor(Date.now() / 1000);
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let emitted = "";
        let lastId = "";
        let sentRole = false;
        try {
          for await (const event of events) {
            if (event.type !== "frame") continue;
            const info = decodeNativeFrame(event.bytes);
            if (!info) continue;
            self.verify(info, prompt.modelId);
            if (info.text === null) continue;
            if (info.responseId && info.responseId !== lastId) {
              lastId = info.responseId;
              emitted = "";
            }
            const delta = monotonicDelta(emitted, info.text);
            emitted = info.text;
            if (!sentRole) {
              controller.enqueue(
                encoder.encode(
                  sse("data", {
                    id,
                    object: "chat.completion.chunk",
                    created,
                    model: prompt.modelId,
                    choices: [
                      { index: 0, delta: { role: "assistant", content: "" }, finish_reason: null },
                    ],
                  })
                )
              );
              sentRole = true;
            }
            if (delta) {
              controller.enqueue(
                encoder.encode(
                  sse("data", {
                    id,
                    object: "chat.completion.chunk",
                    created,
                    model: prompt.modelId,
                    choices: [{ index: 0, delta: { content: delta }, finish_reason: null }],
                  })
                )
              );
            }
          }
          controller.enqueue(
            encoder.encode(
              sse("data", {
                id,
                object: "chat.completion.chunk",
                created,
                model: prompt.modelId,
                choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
              })
            )
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          const normalized = normalizeGeminiAppError(error);
          const body = buildErrorBody(normalized.status, sanitizeErrorMessage(normalized.message));
          // SSE errors are delivered in-band: the stream has already started.
          controller.enqueue(encoder.encode(sse("error", body.error)));
          controller.close();
          void input;
        }
      },
      cancel() {
        // openDirectTurn's AbortSignal handles upstream cleanup.
      },
    });
    return new Response(stream, { status: 200, headers: SSE_HEADERS });
  }
}

type NormalizedPrompt = ReturnType<typeof normalizeGeminiAppPrompt>;
type CanonicalPromptModel = NormalizedPrompt["modelId"];
