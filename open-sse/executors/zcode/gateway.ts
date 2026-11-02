import { randomUUID } from "node:crypto";
import type { ExecuteInput, ExecutorExecuteResult } from "../base.ts";
import { translateSseResponse } from "../glm.ts";
import { translateNonStreamingResponse } from "../../handlers/responseTranslator.ts";
import { FORMATS } from "../../translator/formats.ts";
import { errorResponse } from "../../utils/error.ts";
import { ensureStreamReadiness } from "../../utils/streamReadiness.ts";
import { STREAM_READINESS_TIMEOUT_MS } from "../../config/constants.ts";
import { isInstanceDraining as isDraining } from "../../utils/drainStatus.ts";
import { resolveSuppressThinkClose, THINKING_MARKER_HEADER } from "../../utils/thinkCloseMarker.ts";
import { fetchNativeZcode } from "./nativeProtocol.ts";

type RecordValue = Record<string, unknown>;
const ZCODE_STREAM_BUFFER_BYTES = 1024;
export type ZcodeRequestAuth = { apiKey: string; headers?: Record<string, string> };
function record(value: unknown): RecordValue {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RecordValue) : {};
}
function linkConsumerCancellation(response: Response, controller: AbortController): Response {
  if (!response.body) return response;
  const reader = response.body.getReader();
  const body = new ReadableStream<Uint8Array>({
    async pull(streamController) {
      try {
        const next = await reader.read();
        if (next.done) {
          reader.releaseLock();
          streamController.close();
        } else if (next.value) streamController.enqueue(next.value);
      } catch (error) {
        reader.releaseLock();
        streamController.error(error);
      }
    },
    cancel(reason) {
      controller.abort(reason);
      return reader.cancel(reason).catch(() => undefined);
    },
  });
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

const NATIVE_MODEL_IDS = new Map([
  ["glm-5.3-flash", "GLM-5.3-Flash"],
  ["glm-5.3", "GLM-5.3"],
]);
const NATIVE_EFFORTS = new Set(["low", "high", "max"]);
const CANCELLED_MESSAGE = "ZCode request cancelled";

function nativeModelId(model: string): string {
  const native = NATIVE_MODEL_IDS.get(model.toLowerCase());
  if (!native) throw new Error("Native gateway supports the ZCode individual plan GLM-5.3 models");
  return native;
}

function nativeEffort(body: unknown): unknown {
  const raw = record(body);
  const requested = record(raw.output_config).effort ?? raw.reasoning_effort ?? "low";
  const effort = requested === "none" ? "low" : requested;
  if (!NATIVE_EFFORTS.has(String(effort))) throw new Error("Invalid ZCode reasoning level");
  return effort;
}

function nativeImagePart(part: RecordValue): RecordValue {
  const url = String(part.dataUrl);
  const comma = url.indexOf(",");
  if (!url.startsWith("data:") || comma < 0) throw new Error("ZCode image was not prepared");
  return {
    type: "image",
    source: { type: "base64", media_type: part.mediaType, data: url.slice(comma + 1) },
  };
}

function nativeContent(message: RecordValue): RecordValue[] {
  if (!Array.isArray(message.content))
    return message.content ? [{ type: "text", text: String(message.content) }] : [];
  return message.content.map((value) => {
    const part = record(value);
    return part.type === "image" ? nativeImagePart(part) : { type: "text", text: part.text };
  });
}

function nativeToolResult(message: RecordValue): RecordValue {
  return {
    role: "user",
    content: [
      {
        type: "tool_result",
        tool_use_id: message.toolCallId,
        content: String(message.content ?? ""),
      },
    ],
  };
}

function nativeToolUses(message: RecordValue): RecordValue[] {
  return (Array.isArray(message.toolCalls) ? message.toolCalls : []).map((value) => {
    const tool = record(value);
    return { type: "tool_use", id: tool.id, name: tool.name, input: tool.input };
  });
}

/** A leading system message becomes `system`; tool results travel as user turns. */
function nativeConversation(request: RecordValue): {
  messages: RecordValue[];
  system: RecordValue[];
} {
  const messages: RecordValue[] = [];
  const system: RecordValue[] = [];
  for (const value of request.messages as unknown[]) {
    const message = record(value);
    const content = nativeContent(message);
    if (message.role === "system" && messages.length === 0) system.push(...content);
    else if (message.role === "tool") messages.push(nativeToolResult(message));
    else messages.push({ role: message.role, content: [...content, ...nativeToolUses(message)] });
  }
  return { messages, system };
}

function nativeTools(request: RecordValue): RecordValue[] {
  return (request.tools as unknown[]).map((value) => {
    const tool = record(value);
    return {
      name: tool.name,
      ...(typeof tool.description === "string" ? { description: tool.description } : {}),
      input_schema: tool.inputSchema,
    };
  });
}

// Input has already passed the same validation/image preparation as native RPC.
export function nativeZcodeBody(input: ExecuteInput, request: RecordValue): RecordValue {
  const model = nativeModelId(input.model);
  const effort = nativeEffort(input.body);
  const { messages, system } = nativeConversation(request);
  const tools = nativeTools(request);
  return {
    model,
    max_tokens: Math.min(Number(request.maxOutputTokens) || 128000, 128000),
    metadata: {},
    ...(system.length ? { system } : {}),
    messages,
    thinking: { type: "enabled" },
    output_config: { effort },
    ...(tools.length ? { tools, tool_choice: { type: "auto" } } : {}),
    ...(input.stream ? { stream: true } : {}),
  };
}

function isCancelled(input: ExecuteInput): boolean {
  return Boolean(input.signal?.aborted) || isDraining();
}

/** An upstream refusal keeps its status; the API key never reaches the message. */
async function upstreamErrorResponse(
  upstream: Response,
  apiKey: string,
  input: ExecuteInput
): Promise<Response> {
  if (isCancelled(input)) {
    await upstream.body?.cancel();
    return errorResponse(499, CANCELLED_MESSAGE);
  }
  const parsed = record(await upstream.json().catch(() => null));
  const error = record(parsed.error);
  const message = String(error.message ?? parsed.message ?? "Native ZCode request refused");
  const response = errorResponse(upstream.status, message.replaceAll(apiKey, "[redacted]"));
  const retry = upstream.headers.get("retry-after");
  if (retry) response.headers.set("retry-after", retry);
  return response;
}

function clientSuppressesThinkClose(input: ExecuteInput): boolean {
  const clientHeaders = input.clientHeaders ?? {};
  return resolveSuppressThinkClose({
    userAgent: clientHeaders["user-agent"] ?? clientHeaders["User-Agent"] ?? null,
    thinkingMarkerHeader:
      clientHeaders[THINKING_MARKER_HEADER] ?? clientHeaders["x-omniroute-thinking-marker"] ?? null,
    clientResponseFormat: input.clientResponseFormat ?? null,
  });
}

async function streamingResponse(upstream: Response, input: ExecuteInput): Promise<Response> {
  const ready = await ensureStreamReadiness(upstream, {
    timeoutMs: STREAM_READINESS_TIMEOUT_MS,
    provider: "zcode",
    model: input.model,
    log: input.log,
  });
  const response = ready.response.ok
    ? translateSseResponse(
        ready.response,
        "zcode",
        input.model,
        clientSuppressesThinkClose(input),
        ZCODE_STREAM_BUFFER_BYTES
      )
    : ready.response;
  response.headers.set("cache-control", "no-cache");
  response.headers.set("x-accel-buffering", "no");
  return response;
}

async function clientResponse(upstream: Response, input: ExecuteInput): Promise<Response> {
  if (input.stream) return streamingResponse(upstream, input);
  return Response.json(
    translateNonStreamingResponse(await upstream.json(), FORMATS.CLAUDE, FORMATS.OPENAI)
  );
}

function transportFailure(input: ExecuteInput, error: unknown): Response {
  input.log?.warn?.(
    "ZCODE_GATEWAY",
    error instanceof Error ? error.name : "Native transport failure"
  );
  return isCancelled(input)
    ? errorResponse(499, CANCELLED_MESSAGE)
    : errorResponse(502, "Native ZCode handshake or transport failed");
}

export async function executeZcodeGateway(
  input: ExecuteInput,
  request: RecordValue,
  requestAuth?: ZcodeRequestAuth
): Promise<ExecutorExecuteResult> {
  if (isCancelled(input)) return errorResponse(499, CANCELLED_MESSAGE);
  let body: RecordValue;
  try {
    body = nativeZcodeBody(input, request);
  } catch {
    return errorResponse(400, "Unsupported native ZCode request or reasoning level");
  }
  const apiKey = requestAuth?.apiKey.trim();
  if (!apiKey)
    return errorResponse(401, "Native ZCode gateway requires request-scoped account authorization");
  const consumerCancellation = new AbortController();
  const signal = input.signal
    ? AbortSignal.any([input.signal, consumerCancellation.signal])
    : consumerCancellation.signal;
  try {
    const session = randomUUID();
    const requestId = input.correlationId || randomUUID();
    const result = await fetchNativeZcode(apiKey, body, session, requestId, signal);
    if (!result.response.ok) return await upstreamErrorResponse(result.response, apiKey, input);
    const response = await clientResponse(result.response, input);
    response.headers.delete("set-cookie");
    return {
      response: linkConsumerCancellation(response, consumerCancellation),
      url: result.url,
      headers: {},
      transformedBody: {
        model: body.model,
        buffered: false,
        tools: (request.tools as unknown[]).length,
      },
      transport: "zcode-native-gateway",
      model: body.model,
    };
  } catch (error) {
    return transportFailure(input, error);
  }
}
