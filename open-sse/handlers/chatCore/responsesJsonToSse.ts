/**
 * #13033: when chatCore forces stream:false so a server-side web_search
 * fallback can run, the client that asked for Responses SSE still needs
 * `event: response.completed`. Reuse synthesizeOpenAiSseFromJson +
 * createResponsesApiTransformStream. A body that is already a Responses object
 * (Responses clients get one from the translator) is replayed directly.
 */
import { createResponsesApiTransformStream } from "../../transformer/responsesTransformer.ts";
import { synthesizeOpenAiSseFromJson } from "../../utils/jsonToSse.ts";
import { buildNonStreamingJsonResponse } from "./nonStreamingJsonResponse.ts";
import { isResponsesObject, synthesizeResponsesSseFromObject } from "./responsesObjectToSse.ts";

function copyForwardHeaders(headers: Record<string, string> | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!headers) return out;
  for (const [key, value] of Object.entries(headers)) {
    const lower = key.toLowerCase();
    if (lower === "content-type" || lower === "content-length") continue;
    out[key] = value;
  }
  return out;
}

// Cursor's server-owned search loop also serves Anthropic Messages clients.
// Replay the completed message in their protocol, retaining thinking signatures,
// citations and any client-owned tool call returned after the search.
function wrapClaudeMessageAsSse(
  body: Record<string, unknown>,
  headers?: Record<string, string>
): Response {
  const events: string[] = [];
  const emit = (type: string, payload: Record<string, unknown> = {}) => {
    events.push(`event: ${type}\ndata: ${JSON.stringify({ type, ...payload })}\n\n`);
  };
  const usage = (body.usage ?? {}) as Record<string, unknown>;
  emit("message_start", {
    message: {
      ...body,
      content: [],
      stop_reason: null,
      stop_sequence: null,
      usage: { ...usage, output_tokens: 0 },
    },
  });
  (body.content as Record<string, unknown>[]).forEach((block, index) => {
    const start = { ...block };
    if (block.type === "text") start.text = "";
    if (block.type === "thinking") {
      start.thinking = "";
      start.signature = "";
    }
    const toolUse = block.type === "tool_use" || block.type === "server_tool_use";
    if (toolUse) start.input = {};
    emit("content_block_start", { index, content_block: start });
    if (block.type === "text" && block.text) {
      emit("content_block_delta", { index, delta: { type: "text_delta", text: block.text } });
    }
    if (block.type === "thinking") {
      if (block.thinking) {
        emit("content_block_delta", {
          index,
          delta: { type: "thinking_delta", thinking: block.thinking },
        });
      }
      if (block.signature) {
        emit("content_block_delta", {
          index,
          delta: { type: "signature_delta", signature: block.signature },
        });
      }
    }
    if (toolUse) {
      emit("content_block_delta", {
        index,
        delta: { type: "input_json_delta", partial_json: JSON.stringify(block.input ?? {}) },
      });
    }
    emit("content_block_stop", { index });
  });
  emit("message_delta", {
    delta: {
      stop_reason: body.stop_reason ?? "end_turn",
      stop_sequence: body.stop_sequence ?? null,
    },
    usage,
  });
  emit("message_stop");
  return new Response(events.join(""), {
    status: 200,
    headers: {
      ...copyForwardHeaders(headers),
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export function wrapChatCompletionJsonAsResponsesSse(
  completion: Record<string, unknown>,
  headers?: Record<string, string>
): Response {
  if (isResponsesObject(completion)) {
    return new Response(synthesizeResponsesSseFromObject(completion), {
      status: 200,
      headers: {
        ...copyForwardHeaders(headers),
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }
  const rawSse = synthesizeOpenAiSseFromJson(JSON.stringify(completion));
  if (!rawSse) {
    return new Response(JSON.stringify(completion), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...copyForwardHeaders(headers),
      },
    });
  }
  const encoder = new TextEncoder();
  const inputStream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(rawSse));
      controller.close();
    },
  });
  const outputStream = inputStream.pipeThrough(createResponsesApiTransformStream());
  return new Response(outputStream, {
    status: 200,
    headers: {
      ...copyForwardHeaders(headers),
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export function maybeWrapForcedNonStreamingResponsesJson(args: {
  clientRequestedResponsesStream: boolean;
  body: unknown;
  headers: Record<string, string>;
}): Response {
  const { clientRequestedResponsesStream, body, headers } = args;
  if (!clientRequestedResponsesStream || !body || typeof body !== "object" || Array.isArray(body)) {
    return buildNonStreamingJsonResponse(body, headers);
  }
  const message = body as Record<string, unknown>;
  if (message.type === "message" && Array.isArray(message.content)) {
    return wrapClaudeMessageAsSse(message, headers);
  }
  return wrapChatCompletionJsonAsResponsesSse(message, headers);
}
