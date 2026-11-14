import { transformStreamWithCancel } from "../../open-sse/utils/cancelableTransformStream.ts";
import { resolveStreamIndices } from "./streamIndices";
import { createResponsesSseText } from "./responsesSseText";
export type FieldCategory = "content" | "reasoning" | "toolArgs" | "partialJson";

// Keys that always map to a fixed category, regardless of where they appear in the chunk.
const FIXED_CATEGORY_MAP: Record<string, FieldCategory> = {
  reasoning: "reasoning",
  thinking: "reasoning",
  reasoning_content: "reasoning",
  arguments: "toolArgs",
  partial_json: "partialJson",
};

// System/protocol metadata keys that must never be routed through the PII processor or
// buffer, no matter which JSON shape they appear in. Shared by the real-time sanitizeObject
// pass (below) and streamingPiiTransform.ts's onFlush generic-fallback branch — the two
// copies of this list had drifted (see issue #13488): neither one listed `provider`,
// `native_finish_reason`, or the `reasoning_details[].format` field, so those OpenRouter
// metadata strings fell through to the default "content" category and got spliced into the
// same sliding-window buffer as the actual answer text.
export const METADATA_KEYS = new Set([
  "id",
  "model",
  "object",
  "created",
  "finish_reason",
  "finishReason",
  "native_finish_reason",
  "role",
  "type",
  "index",
  "stop_reason",
  "stop_sequence",
  "system_fingerprint",
  "service_tier",
  "usage",
  "prompt_tokens",
  "completion_tokens",
  "total_tokens",
  "input_tokens",
  "output_tokens",
  "logprobs",
  "refusal",
  "name",
  "event",
  "provider",
  "format",
  // OpenAI Responses API protocol identifiers / opaque blobs (#15507): never user text.
  "call_id",
  "item_id",
  "obfuscation",
  "encrypted_content",
  "response_id",
  "previous_response_id",
  "status",
  // Anthropic usage / thinking-signature metadata and non-standard OpenAI-compatible
  // request ids (#18006): opaque strings, never answer text. Treating them as content
  // spliced them into the next real text delta.
  "inference_geo",
  "speed",
  "signature",
  "request_id",
  // Mistral anti token-length side-channel padding (#19293): random alphabet/digit runs
  // attached to every streamed chunk since 2025-08-27 (Mistral changelog). Not answer
  // text; routing it to content spliced padding into the next real text delta.
  "p",
]);

// Anthropic Messages SSE frames. Their streamed text lives at fixed paths (block text,
// thinking summary, tool-input JSON) and only those paths enter the rolling buffers. The
// generic walker buffered every unknown string as content and spliced it into the next
// text delta; the other strings of these frames are redacted where they sit instead.
const CLAUDE_EVENT_TYPES = new Set([
  "message_start",
  "content_block_start",
  "content_block_delta",
  "content_block_stop",
  "message_delta",
  "message_stop",
  "ping",
]);

export function isClaudeStreamEvent(json: any): boolean {
  return !!json && typeof json.type === "string" && CLAUDE_EVENT_TYPES.has(json.type);
}

type ClaudeStreamedPath = { holder: any; field: string; category: FieldCategory };

// The fields of a Claude frame that stream through the rolling buffers.
function claudeStreamedPaths(json: any): ClaudeStreamedPath[] {
  if (json.type === "content_block_start") {
    const holder = json.content_block;
    return [
      { holder, field: "text", category: "content" },
      { holder, field: "thinking", category: "reasoning" },
    ];
  }
  if (json.type !== "content_block_delta") return [];
  const holder = json.delta;
  if (holder?.type === "text_delta") return [{ holder, field: "text", category: "content" }];
  if (holder?.type === "thinking_delta") {
    return [{ holder, field: "thinking", category: "reasoning" }];
  }
  if (holder?.type === "input_json_delta") {
    return [{ holder, field: "partial_json", category: "partialJson" }];
  }
  return [];
}

// Protocol tokens of Claude frames that METADATA_KEYS does not cover: a redaction hit on
// one would corrupt it (`tool_use_id` links a result to its call, `encrypted_index` and a
// `redacted_thinking` block are opaque blobs the client sends back verbatim).
const CLAUDE_OPAQUE_KEYS = new Set(["tool_use_id", "encrypted_index"]);

// Redact every other string of a Claude frame in place (search results, citations, tool
// input), without touching the buffers. The coverage matches the generic walker: a metadata
// key skips a string value only, and any object or array under it is still walked, because
// tool input can use those names for its own data.
function redactClaudeFrameStrings(
  obj: any,
  streamed: ClaudeStreamedPath[],
  redact: (text: string) => string
): void {
  if (!obj || typeof obj !== "object" || obj.type === "redacted_thinking") return;
  for (const key of Object.keys(obj)) {
    if (CLAUDE_OPAQUE_KEYS.has(key)) continue;
    if (streamed.some((path) => path.holder === obj && path.field === key)) continue;
    if (typeof obj[key] !== "string") redactClaudeFrameStrings(obj[key], streamed, redact);
    else if (classifyField(key) !== null) obj[key] = redact(obj[key]);
  }
}

// Responses API events whose `delta` carries tool-call arguments (JSON), not answer text.
export function isResponsesToolArgsDelta(json: any): boolean {
  const t = json?.type;
  return (
    typeof t === "string" &&
    t.startsWith("response.") &&
    (t.includes("_arguments.") || t.startsWith("response.custom_tool_call_input."))
  );
}

/**
 * Classify a string field as a PII-processed category, or `null` when it is metadata that
 * must pass through untouched. `parentKey` is the key of the object that directly contains
 * `key` (empty string at the JSON root) — it disambiguates `text`, which means the answer
 * everywhere except inside a `reasoning_details[]` item, where it is reasoning text (and
 * `format` alongside it is metadata, not content, even though it is not disambiguated by
 * parent elsewhere). Any string field not explicitly recognized as metadata defaults to
 * "content" — this keeps non-standard/unrecognized stream shapes (arbitrary JSON keys that
 * match none of the known provider formats) from silently losing their text.
 */
export function classifyField(key: string, parentKey = ""): FieldCategory | null {
  if (FIXED_CATEGORY_MAP[key]) {
    return FIXED_CATEGORY_MAP[key];
  }
  if (key === "text" && parentKey === "reasoning_details") {
    return "reasoning";
  }
  if (key === "data" && parentKey === "reasoning_details") {
    return null; // Opaque encrypted reasoning payload — pass through untouched.
  }
  if (METADATA_KEYS.has(key)) {
    return null;
  }
  return "content";
}

/** The complete encrypted reasoning record is protocol state, including unknown extensions. */
export function isOpaqueReasoningDetail(value: unknown, parentKey: string): boolean {
  return (
    parentKey === "reasoning_details" &&
    value !== null &&
    typeof value === "object" &&
    (value as Record<string, unknown>).type === "reasoning.encrypted"
  );
}

/**
 * A synthetic text-tail flush must not replay opaque records already forwarded in the
 * original frames. Call only on the cloned flush template, never on an incoming frame.
 */
export function omitEmittedOpaqueReasoningFromFlush(value: unknown): void {
  if (!value || typeof value !== "object") return;
  const record = value as Record<string, unknown>;
  for (const [key, child] of Object.entries(record)) {
    if (key === "reasoning_details" && Array.isArray(child)) {
      const remaining = child.filter((detail) => !isOpaqueReasoningDetail(detail, key));
      if (remaining.length) record[key] = remaining;
      else delete record[key];
    } else {
      omitEmittedOpaqueReasoningFromFlush(child);
    }
  }
}

// Back-compat helper kept for any external caller expecting a category rather than `null`
// for metadata; internal call sites use `classifyField` so they can skip metadata entirely.
export function getFieldCategory(key: string): FieldCategory {
  return classifyField(key) ?? "content";
}

const STOP_EVENT_TYPES = new Set([
  "response.done",
  "response.completed",
  "response.cancelled",
  "response.failed",
]);

export function checkIfStopSignal(json: any): boolean {
  if (!json || typeof json !== "object") return false;
  if (json.choices && Array.isArray(json.choices) && json.choices.some((c: any) => c.finish_reason))
    return true;
  if (
    json.candidates &&
    Array.isArray(json.candidates) &&
    json.candidates.some((c: any) => c.finishReason)
  )
    return true;
  if (json.type === "content_block_stop") return true;
  if (json.type === "message_stop") return true;
  if (json.type === "message_delta" && json.delta?.stop_reason) return true;
  if (STOP_EVENT_TYPES.has(json.type)) return true;
  return false;
}

export function checkIfSnapshot(json: any): boolean {
  if (!json || typeof json !== "object") return false;
  if (typeof json.type === "string") {
    const t = json.type;
    if (t.endsWith(".done") || t.endsWith(".completed") || STOP_EVENT_TYPES.has(t)) return true;
  }
  return false;
}

const fallbackDecoder = new TextDecoder();

/**
 * Parse fragmented SSE and process provider payload fields without changing event framing.
 * Snapshots are processed independently; buffered tails drain before stop events or EOF.
 * Responses lanes use schema-aware routing and may release processor state after draining.
 */
export function createSseTextTransform(
  processor: (
    text: string,
    field: FieldCategory,
    isStopSignal?: boolean,
    index?: string | number,
    isSnapshot?: boolean,
    fieldName?: string
  ) => string,
  onFlush?: (lastJson: any, isJsonStream?: boolean, lastContentJson?: any) => any,
  onCancel?: () => void,
  opts?: { processToolArgs?: boolean; releaseResponsesLane?: (index: string) => void }
): TransformStream {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder("utf-8");
  let lineBuffer = "";
  let lastPrefix = "data: ";
  let lastJson: any = null;
  let lastContentJson: any = null;
  let isJsonStream = false;
  let flushed = false;
  let errored = false;
  let currentEventLine = "";
  let lastEventLine = "";
  let pendingEventLine = "";
  const responses = createResponsesSseText(processor, {
    processToolArgs: opts?.processToolArgs,
    release: opts?.releaseResponsesLane,
    classify: classifyField,
  });
  let responsesStream = false;
  const emitResponses = (
    events: Record<string, unknown>[],
    controller: TransformStreamDefaultController
  ) => {
    for (const event of events) {
      controller.enqueue(
        encoder.encode(`event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`)
      );
    }
  };
  let sawEventLine = false;

  // Claude flushes are synthetic content_block_delta frames: clients that dispatch on the
  // SSE event name (the Anthropic SDKs) must see the matching event line, not the last one.
  const claudeFlushEventLine = () => (sawEventLine ? "event: content_block_delta" : "");

  // Only Claude flushes return batches (one frame per content block / delta type).
  // Other formats can return a JSON array as a single payload; preserve that envelope.
  const emitFlushed = (
    flushedValue: unknown,
    controller: TransformStreamDefaultController,
    eventLine: string,
    isClaudeFlush: boolean
  ) => {
    const values = isClaudeFlush && Array.isArray(flushedValue) ? flushedValue : [flushedValue];
    for (const value of values) {
      if (!value) continue;
      const prefix = lastPrefix || "data: ";
      const payload = typeof value === "string" ? value : JSON.stringify(value);
      if (eventLine) {
        controller.enqueue(encoder.encode(eventLine + "\n"));
      }
      controller.enqueue(encoder.encode(prefix + payload + "\n\n"));
    }
  };

  const handleLine = (line: string, controller: TransformStreamDefaultController) => {
    const trimmed = line.trim();
    if (trimmed === "" || line.startsWith(":")) {
      // Pass comments and empty lines through unchanged
      if (trimmed === "") {
        currentEventLine = "";
      }
      if (pendingEventLine) {
        controller.enqueue(encoder.encode(pendingEventLine + "\n"));
        pendingEventLine = "";
      }
      controller.enqueue(encoder.encode(line + "\n"));
      return;
    }

    if (line.startsWith("data:")) {
      const prefix = line.startsWith("data: ") ? "data: " : "data:";
      lastPrefix = prefix;
      const segment = line.startsWith("data: ") ? line.slice(6) : line.slice(5);
      if (segment === "[DONE]") {
        if (responsesStream) emitResponses(responses.drain(), controller);
        if (!responsesStream && onFlush && !flushed) {
          emitFlushed(
            onFlush(lastJson, isJsonStream, lastContentJson),
            controller,
            isClaudeStreamEvent(lastJson) ? claudeFlushEventLine() : lastEventLine,
            isClaudeStreamEvent(lastJson)
          );
          flushed = true;
        }
        if (pendingEventLine) {
          controller.enqueue(encoder.encode(pendingEventLine + "\n"));
          pendingEventLine = "";
        }
        controller.enqueue(encoder.encode(line + "\n"));
        return;
      }

      const trimmedSegment = segment.trim();
      if (trimmedSegment.startsWith("{") || trimmedSegment.startsWith("[")) {
        try {
          const json = JSON.parse(trimmedSegment);
          isJsonStream = true;

          let matched = false;

          const isStopSignal = checkIfStopSignal(json);
          const isSnapshot = checkIfSnapshot(json);

          // Recursively sanitize string properties, skipping recognized system metadata
          // (`classifyField` returns null for METADATA_KEYS — `provider`,
          // `native_finish_reason`, `reasoning_details[].format`, etc.). `parentKey` is the
          // key of the enclosing object (unchanged across array-index recursion) so
          // `classifyField` can tell `reasoning_details[].text` apart from ordinary content
          // text. See issue #13488.
          const sanitizeObject = (
            obj: any,
            currentChoiceIdx = 0,
            currentToolIdx = 0,
            parentKey = ""
          ) => {
            if (!obj || typeof obj !== "object") return;
            if (isOpaqueReasoningDetail(obj, parentKey)) return;

            const { choiceIdx, toolIdx } = resolveStreamIndices(
              obj,
              currentChoiceIdx,
              currentToolIdx,
              parentKey
            );

            const compositeKey = `${choiceIdx}_${toolIdx}`;
            const isArray = Array.isArray(obj);

            for (const key of Object.keys(obj)) {
              if (typeof obj[key] === "string") {
                const val = obj[key];
                // Keep wire aliases distinct in Chat and generic text envelopes. Native
                // Responses/Gemini retain their format-specific buffer/flush routing.
                const fieldName =
                  Array.isArray(json.choices) ||
                  (key === "reasoning_content" &&
                    !Array.isArray(json.candidates) &&
                    !String(json.type ?? "").startsWith("response."))
                    ? key
                    : undefined;
                const field =
                  key === "delta" && obj === json && isResponsesToolArgsDelta(json)
                    ? "toolArgs"
                    : classifyField(key, parentKey);
                if (field === null) {
                  continue;
                }
                if (field === "toolArgs" || field === "partialJson") {
                  if (opts?.processToolArgs === true) {
                    obj[key] = processor(
                      val,
                      field,
                      isStopSignal,
                      compositeKey,
                      isSnapshot,
                      fieldName
                    );
                  } else {
                    obj[key] = val;
                  }
                  matched = true;
                  continue;
                }
                obj[key] = processor(val, field, isStopSignal, compositeKey, isSnapshot, fieldName);
                matched = true;
              } else if (typeof obj[key] === "object") {
                sanitizeObject(obj[key], choiceIdx, toolIdx, isArray ? parentKey : key);
              }
            }
          };

          // Anthropic Messages frames: only the block text, thinking summary and tool-input
          // JSON stream through the buffers. Each block buffers under its own index, so a
          // thinking block can never strand the text block that follows it. Every other
          // string is redacted in place as a standalone value (the snapshot path), which
          // emits no tail and so does not count as content for the flush below.
          const sanitizeClaudeEvent = (): boolean => {
            const index = typeof json.index === "number" ? json.index : 0;
            const compositeKey = `${index}_0`;
            const streamed = claudeStreamedPaths(json);
            let touched = false;
            for (const { holder, field, category } of streamed) {
              if (!holder || typeof holder[field] !== "string") continue;
              touched = true;
              if (category === "partialJson" && opts?.processToolArgs !== true) continue;
              holder[field] = processor(
                holder[field],
                category,
                isStopSignal,
                compositeKey,
                isSnapshot
              );
            }
            redactClaudeFrameStrings(json, streamed, (text) =>
              processor(text, "content", false, compositeKey, true)
            );
            return touched;
          };

          const claudeEvent = isClaudeStreamEvent(json);
          const isResponses = typeof json.type === "string" && json.type.startsWith("response.");
          if (isResponses) {
            responsesStream = true;
            emitResponses(responses.transform(json), controller);
            matched = true;
          } else if (claudeEvent) {
            matched = sanitizeClaudeEvent();
          } else {
            sanitizeObject(json, 0, 0);
          }

          if (!matched) {
            // Normal state for control-only chunks (closing frame, usage-only frame): not a
            // sanitizer fault, so keep it out of the warn level (#18047).
            console.debug(
              "[SSE-TRANSFORM] No string fields sanitized in SSE JSON chunk. Keys:",
              Object.keys(json).slice(0, 5).join(", ")
            );
          } else {
            lastContentJson = json;
            // New content after an earlier stop-signal flush (e.g. a thinking block closed
            // before the text block starts): re-arm so the next stop signal drains it.
            flushed = false;
          }

          if (!isResponses && isStopSignal && onFlush && !flushed) {
            // A Claude stop signal passes its own frame: the flush helper drains every block
            // that still holds a tail, and the last frame may be a `ping`, which would send
            // the flush down the generic path. Other stop signals keep the last frame as the
            // envelope template, as before.
            const flushBase = claudeEvent ? json : lastJson || json;
            emitFlushed(
              onFlush(flushBase, isJsonStream, lastContentJson || lastJson || json),
              controller,
              claudeEvent ? claudeFlushEventLine() : lastEventLine,
              claudeEvent
            );
            // A per-block drain must not latch: a block that never sent its own
            // content_block_stop still gets drained by message_delta / message_stop.
            flushed = json.type !== "content_block_stop";
          }

          if (!isStopSignal && !isSnapshot) {
            lastEventLine = currentEventLine;
          }

          lastJson = json;
          if (pendingEventLine) {
            controller.enqueue(encoder.encode(pendingEventLine + "\n"));
            pendingEventLine = "";
          }
          controller.enqueue(encoder.encode(prefix + JSON.stringify(json) + "\n"));
        } catch (err: any) {
          if (err?.message?.startsWith("[PII]")) {
            throw err;
          }
          if (err instanceof SyntaxError) {
            // JSON parsing failed. Check if it looks like JSON that failed to parse.
            if (trimmedSegment.startsWith("{") || trimmedSegment.startsWith("[")) {
              console.warn(
                "[SSE-TRANSFORM] Dropping malformed JSON chunk to prevent syntax injection:",
                trimmedSegment.slice(0, 100)
              );
              pendingEventLine = "";
            } else {
              if (pendingEventLine) {
                controller.enqueue(encoder.encode(pendingEventLine + "\n"));
                pendingEventLine = "";
              }
              // Treat segment as raw text delta (fail-open)
              const processed = processor(segment, "content");
              controller.enqueue(encoder.encode(prefix + processed + "\n"));
            }
          } else {
            throw err;
          }
        }
      } else {
        // Starts with data: but not JSON, process as raw text
        lastEventLine = currentEventLine;
        const processed = processor(segment, "content");
        if (pendingEventLine) {
          controller.enqueue(encoder.encode(pendingEventLine + "\n"));
          pendingEventLine = "";
        }
        controller.enqueue(encoder.encode(prefix + processed + "\n"));
      }
    } else {
      // Non-data line, pass through (e.g. event: content_block_delta)
      if (line.startsWith("event:")) {
        if (pendingEventLine) {
          controller.enqueue(encoder.encode(pendingEventLine + "\n"));
        }
        sawEventLine = true;
        currentEventLine = line;
        pendingEventLine = line;
      } else {
        if (pendingEventLine) {
          controller.enqueue(encoder.encode(pendingEventLine + "\n"));
          pendingEventLine = "";
        }
        controller.enqueue(encoder.encode(line + "\n"));
      }
    }
  };

  return transformStreamWithCancel<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      try {
        const chunkStr = decoder.decode(chunk, { stream: true });
        lineBuffer += chunkStr;
        const lines = lineBuffer.split(/\r?\n/);
        lineBuffer = lines.pop() || "";

        for (const line of lines) {
          handleLine(line, controller);
        }
      } catch (err: any) {
        // chunk is typed Uint8Array, so the [unavailable] fallback only fires if a
        // caller violates that contract at runtime. Keep the guard so a bad caller
        // logs a label instead of throwing inside the error path.
        const errorIsPii = !!err?.message?.startsWith("[PII]");
        let context = errorIsPii ? "[REDACTED_DUE_TO_PII]" : "[unavailable]";
        if (!errorIsPii && chunk instanceof Uint8Array) {
          context = fallbackDecoder.decode(chunk.slice(0, 200));
        }
        console.error("[SSE-TRANSFORM] Error in transform:", err, "chunk:", context);
        lineBuffer = "";
        errored = true;
        controller.error(err);
      }
    },
    flush(controller) {
      if (errored) return;
      try {
        const remaining = decoder.decode() + lineBuffer;
        if (remaining) {
          handleLine(remaining, controller);
        }
        if (pendingEventLine) {
          controller.enqueue(encoder.encode(pendingEventLine + "\n"));
          pendingEventLine = "";
        }
        if (responsesStream) emitResponses(responses.drain(), controller);
        if (!responsesStream && onFlush && !flushed) {
          emitFlushed(
            onFlush(lastJson, isJsonStream, lastContentJson),
            controller,
            isClaudeStreamEvent(lastJson) ? claudeFlushEventLine() : lastEventLine,
            isClaudeStreamEvent(lastJson)
          );
        }
      } catch (err) {
        console.error("[SSE-TRANSFORM] Error in flush:", err);
        controller.error(err);
      }
    },
    cancel(reason: any) {
      if (onCancel) {
        onCancel();
      }
    },
  });
}
