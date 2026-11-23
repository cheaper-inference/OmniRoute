import { getReadableReasoningValue } from "./reasoningFields.ts";

type PendingToolCall = {
  id?: string;
  function: {
    name: string;
    arguments: string;
  };
};

type OllamaMessage = {
  role: "assistant";
  content: string;
  thinking?: string;
  tool_calls?: Array<{ function: { name: string; arguments: unknown } }>;
};

// Tool arguments arrive as streamed JSON text. A malformed or truncated payload must not
// throw: that would abort the whole finish line and drop every tool call with it.
function parseToolArguments(raw: string): unknown {
  try {
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

// Transform OpenAI SSE stream to Ollama JSON lines format
export function transformToOllama(response, model) {
  // Only successful SSE responses belong to the NDJSON transformer. Preserve errors,
  // bodyless responses, and successful JSON responses without losing status/body/headers.
  const contentType = String(response.headers?.get?.("content-type") || "").toLowerCase();
  if (!response.ok || !response.body || !contentType.includes("text/event-stream")) return response;

  let buffer = "";
  let pendingToolCalls: Record<number, PendingToolCall> = {};
  const completedToolCalls: PendingToolCall[] = [];
  let doneSent = false;
  // Persistent decoder with { stream: true } carries pending bytes between chunks, so a
  // multi-byte UTF-8 sequence split across network chunks is not corrupted into U+FFFD.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const emit = (controller, message: OllamaMessage, done: boolean) => {
    controller.enqueue(encoder.encode(JSON.stringify({ model, message, done }) + "\n"));
  };

  // Ollama ends a stream with exactly one done:true message, and that message carries the
  // tool calls when there are any. Emitting more than one (finish_reason, [DONE], flush)
  // leaves a client that keeps the last terminal message holding an empty one.
  const emitDone = (controller, message: OllamaMessage) => {
    if (doneSent) return;
    doneSent = true;
    emit(controller, message, true);
  };

  const handleLine = (line: string, controller) => {
    // Nothing follows the terminal message in an Ollama stream (this also keeps the old
    // "stop at [DONE]" behavior for lines that share a chunk with it).
    if (doneSent || !line.startsWith("data:")) return;
    const data = line.slice(5).trim();

    if (data === "[DONE]") {
      emitDone(controller, { role: "assistant", content: "" });
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch {
      return; // Ignore non-JSON SSE payloads (keep-alives, comments).
    }

    const delta = parsed.choices?.[0]?.delta || {};
    const content = delta.content || "";
    const thinking = getReadableReasoningValue(delta);
    const toolCalls = delta.tool_calls;

    if (toolCalls) {
      for (const tc of toolCalls) {
        const idx = tc.index;

        const toolCallId = tc.id != null ? String(tc.id) : tc.id;

        // T37: Prevent merging tool_calls on same index if ID changes
        if (pendingToolCalls[idx] && toolCallId && pendingToolCalls[idx].id !== toolCallId) {
          completedToolCalls.push(pendingToolCalls[idx]);
          delete pendingToolCalls[idx];
        }

        if (!pendingToolCalls[idx]) {
          pendingToolCalls[idx] = {
            id: toolCallId,
            function: { name: "", arguments: "" },
          };
        }
        if (tc.function?.name) pendingToolCalls[idx].function.name += tc.function.name;
        if (tc.function?.arguments)
          pendingToolCalls[idx].function.arguments += tc.function.arguments;
      }
    }

    if (thinking) {
      emit(controller, { role: "assistant", content: "", thinking }, false);
    }

    if (content) {
      emit(controller, { role: "assistant", content }, false);
    }

    const finishReason = parsed.choices?.[0]?.finish_reason;
    if (finishReason === "tool_calls" || finishReason === "stop") {
      const toolCallsArr = [...completedToolCalls, ...Object.values(pendingToolCalls)];
      if (toolCallsArr.length > 0) {
        const formattedCalls = toolCallsArr.map((tc) => ({
          function: {
            name: tc.function.name,
            arguments: parseToolArguments(tc.function.arguments),
          },
        }));
        emitDone(controller, { role: "assistant", content: "", tool_calls: formattedCalls });
        pendingToolCalls = {};
        completedToolCalls.length = 0;
      } else if (finishReason === "stop") {
        emitDone(controller, { role: "assistant", content: "" });
      }
    }
  };

  const transform = new TransformStream(
    {
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) handleLine(line, controller);
      },
      flush(controller) {
        // A last line that arrived without its trailing newline is still a line.
        buffer += decoder.decode();
        const tail = buffer.trim();
        buffer = "";
        if (tail) handleLine(tail, controller);
        emitDone(controller, { role: "assistant", content: "" });
      },
    },
    { highWaterMark: 16384 },
    { highWaterMark: 16384 }
  );

  return new Response(response.body.pipeThrough(transform), {
    headers: {
      "Content-Type": "application/x-ndjson",
    },
  });
}
