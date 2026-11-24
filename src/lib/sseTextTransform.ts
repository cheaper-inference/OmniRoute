import { transformStreamWithCancel } from "../../open-sse/utils/cancelableTransformStream.ts";
import { resolveStreamIndices } from "./streamIndices";
import { createResponsesSseText } from "./responsesSseText";
import { IN_PLACE_METADATA_KEYS } from "./sseMetadataKeys";
import { createMetadataHold, type MetadataHold, type MetadataWindow } from "./sseMetadataHold";
import { escapePathSegment, type FieldCategory } from "./sseTextFields";

export { escapePathSegment };
export type { FieldCategory };

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
  // Usage provenance (#20271) rides next to `usage`. Its string fields ("unknown",
  // "estimated", "observed_characters") are metadata, not answer text: buffering them
  // spliced them into the flushed tail of the reply.
  "usage_evidence",
  "tokens_per_second",
  "cost_in_usd_ticks",
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
// The deferred-bytes ceiling has to fail closed even when the caller supplies a window but no
// number: an unbounded queue is the failure this cap exists to prevent.
const DEFAULT_MAX_DEFERRED_BYTES = 64 * 1024;

const CLAUDE_OPAQUE_KEYS = new Set(["tool_use_id", "encrypted_index"]);

// Redact every other string of a Claude frame in place (search results, citations, tool
// input), without touching the buffers. The coverage matches the generic walker: a metadata
// key skips a string value only, and any object or array under it is still walked, because
// tool input can use those names for its own data.
function redactClaudeFrameStrings(
  obj: any,
  streamed: ClaudeStreamedPath[],
  redact: (holder: any, key: string, path: string, metadata: boolean) => void,
  path = "",
  inMetadata = false
): void {
  if (!obj || typeof obj !== "object" || obj.type === "redacted_thinking") return;
  for (const key of Object.keys(obj)) {
    if (CLAUDE_OPAQUE_KEYS.has(key)) continue;
    if (streamed.some((entry) => entry.holder === obj && entry.field === key)) continue;
    const childPath = path ? `${path}/${escapePathSegment(key)}` : escapePathSegment(key);
    // Only the keys that can carry a credential take the window. Other metadata (id, signature,
    // request_id) passes through verbatim: holding it would delay a protocol field.
    const metadata = inMetadata || IN_PLACE_METADATA_KEYS.has(key);
    if (typeof obj[key] !== "string")
      redactClaudeFrameStrings(obj[key], streamed, redact, childPath, metadata);
    else if (metadata || classifyField(key) !== null) redact(obj, key, childPath, metadata);
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

// Events after which the client reads nothing more from the stream (`[DONE]` is a line, not
// JSON, and is handled where it is parsed).
const TERMINAL_EVENT_TYPES = new Set([
  "message_stop",
  "response.completed",
  "response.done",
  "response.incomplete",
  "response.failed",
  "response.cancelled",
]);

export function isTerminalEvent(json: any): boolean {
  return !!json && typeof json.type === "string" && TERMINAL_EVENT_TYPES.has(json.type);
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

/** Shared inputs for the payload walk; built once per frame so the branches stay small. */
type SanitizeDeps = {
  root: any;
  processor: (
    text: string,
    field: FieldCategory,
    isStopSignal?: boolean,
    index?: string | number,
    isSnapshot?: boolean,
    fieldName?: string
  ) => string;
  isStopSignal: boolean;
  isSnapshot: boolean;
  processToolArgs: boolean;
  redact: (
    holder: any,
    key: string,
    childPath: string,
    parentKey: string,
    compositeKey: string
  ) => void;
};

type SanitizeDescend = (
  obj: any,
  currentChoiceIdx: number,
  currentToolIdx: number,
  parentKey: string,
  inMetadata: boolean,
  path: string
) => void;

/** Metadata subtree: strings take the path-keyed window, objects keep descending. */
function sanitizeMetadataChild(
  deps: SanitizeDeps,
  obj: any,
  key: string,
  childPath: string,
  parentKey: string,
  compositeKey: string,
  choiceIdx: number,
  toolIdx: number,
  descend: SanitizeDescend
): void {
  const value = obj[key];
  if (typeof value === "string") deps.redact(obj, key, childPath, parentKey, compositeKey);
  else if (typeof value === "object") descend(value, choiceIdx, toolIdx, key, true, childPath);
}

/**
 * Wire alias for a streamed string field. Chat and generic text envelopes keep their own
 * names; native Responses/Gemini retain format-specific buffer/flush routing.
 */
function answerFieldAlias(root: any, key: string): string | undefined {
  const chatAlias = Array.isArray(root.choices);
  const reasoningAlias =
    key === "reasoning_content" &&
    !Array.isArray(root.candidates) &&
    !String(root.type ?? "").startsWith("response.");
  return chatAlias || reasoningAlias ? key : undefined;
}

/** One string field of the answer payload; returns whether it went through the processor. */
function sanitizeAnswerString(
  deps: SanitizeDeps,
  obj: any,
  key: string,
  parentKey: string,
  childPath: string,
  compositeKey: string
): boolean {
  const value = obj[key];
  const field =
    key === "delta" && obj === deps.root && isResponsesToolArgsDelta(deps.root)
      ? "toolArgs"
      : classifyField(key, parentKey);
  if (field === null) {
    // A metadata key normally passes through untouched, but the usage provenance and cost
    // keys can carry a credential. They take their own window, keyed by path, so a value
    // split across frames still redacts without joining the reply.
    if (IN_PLACE_METADATA_KEYS.has(key)) deps.redact(obj, key, childPath, parentKey, compositeKey);
    return false;
  }
  const fieldName = answerFieldAlias(deps.root, key);
  if (field === "toolArgs" || field === "partialJson") {
    obj[key] = deps.processToolArgs
      ? deps.processor(value, field, deps.isStopSignal, compositeKey, deps.isSnapshot, fieldName)
      : value;
    return true;
  }
  obj[key] = deps.processor(
    value,
    field,
    deps.isStopSignal,
    compositeKey,
    deps.isSnapshot,
    fieldName
  );
  return true;
}

/**
 * An object field: metadata subtrees (usage, usage_evidence, provider bookkeeping) get their
 * own window instead of borrowing the answer buffers. reasoning_details[].data is an opaque
 * encrypted payload the client echoes back, so it is left alone.
 */
function descendAnswerChild(
  obj: any,
  key: string,
  parentKey: string,
  childPath: string,
  choiceIdx: number,
  toolIdx: number,
  isArray: boolean,
  descend: SanitizeDescend
): void {
  const opaque = key === "data" && parentKey === "reasoning_details";
  if (!opaque && IN_PLACE_METADATA_KEYS.has(key)) {
    descend(obj[key], choiceIdx, toolIdx, key, true, childPath);
    return;
  }
  descend(obj[key], choiceIdx, toolIdx, isArray ? parentKey : key, false, childPath);
}

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
  opts?: {
    processToolArgs?: boolean;
    releaseResponsesLane?: (index: string) => void;
    // Metadata strings carry their own sliding window, keyed by path, so a credential split
    // across frames still redacts without ever entering the answer buffers. A frame whose
    // value is partly held waits, in order, until the tail resolves; terminal events fold the
    // tail back into that frame (sseMetadataHold), so it never leaves its envelope.
    metadataWindow?: MetadataWindow;
    maxDeferredBytes?: number;
  }
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
  const hold: MetadataHold | null = opts?.metadataWindow
    ? createMetadataHold(opts.metadataWindow, opts.maxDeferredBytes ?? DEFAULT_MAX_DEFERRED_BYTES)
    : null;
  // The frame being transformed: the hold records it as the owner of any tail it leaves.
  let frame = { json: null as object | null, stop: false, snapshot: false };
  const responses = createResponsesSseText(processor, {
    processToolArgs: opts?.processToolArgs,
    release: opts?.releaseResponsesLane,
    classify: classifyField,
    metadata: hold
      ? (holder, key, path) => hold.redact(holder, key, path, frame.json!, frame)
      : undefined,
  });
  // Every write goes through the hold, so nothing overtakes a frame that is still waiting.
  const write = (controller: TransformStreamDefaultController, text: string) => {
    if (hold) hold.write(text, (out) => controller.enqueue(encoder.encode(out)));
    else controller.enqueue(encoder.encode(text));
  };
  const writeFrame = (controller: TransformStreamDefaultController, json: object, text: string) => {
    const render = () => text + JSON.stringify(json) + "\n";
    if (hold) hold.writeFrame(json, render, (out) => controller.enqueue(encoder.encode(out)));
    else controller.enqueue(encoder.encode(render()));
  };
  // Before a terminal event goes out, every held tail returns to its own frame.
  const releaseHeld = (controller: TransformStreamDefaultController) => {
    hold?.releaseAll((out) => controller.enqueue(encoder.encode(out)));
  };
  let responsesStream = false;
  const emitResponses = (
    events: Record<string, unknown>[],
    controller: TransformStreamDefaultController
  ) => {
    for (const event of events) {
      write(controller, `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`);
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
      if (eventLine) write(controller, eventLine + "\n");
      write(controller, prefix + payload + "\n\n");
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
        write(controller, pendingEventLine + "\n");
        pendingEventLine = "";
      }
      write(controller, line + "\n");
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
        releaseHeld(controller);
        if (pendingEventLine) {
          write(controller, pendingEventLine + "\n");
          pendingEventLine = "";
        }
        write(controller, line + "\n");
        return;
      }

      const trimmedSegment = segment.trim();
      if (trimmedSegment.startsWith("{") || trimmedSegment.startsWith("[")) {
        try {
          const json = JSON.parse(trimmedSegment);
          isJsonStream = true;

          let matched = false;
          let metadataTouched = false;

          const isStopSignal = checkIfStopSignal(json);
          const isSnapshot = checkIfSnapshot(json);
          frame = { json, stop: isStopSignal, snapshot: isSnapshot };

          // Recursively sanitize string properties, skipping recognized system metadata
          // (`classifyField` returns null for METADATA_KEYS — `provider`,
          // `native_finish_reason`, `reasoning_details[].format`, etc.). `parentKey` is the
          // key of the enclosing object (unchanged across array-index recursion) so
          // `classifyField` can tell `reasoning_details[].text` apart from ordinary content
          // text. See issue #13488.
          // Mask credential-shaped strings inside a metadata subtree through their own window,
          // keyed by path. Sharing the answer buffers is what spliced usage provenance into
          // replies; snapshotting them in place is what let a credential split across frames
          // through. The window keeps the split covered, and the path keeps the tail out of
          // the reply. Without a window (the PII transform), the value is masked in place, and
          // a label `classifyField` excludes (provider, model, id) passes through untouched,
          // as it did before the window existed.
          const redactMetadataString = (
            holder: any,
            key: string,
            childPath: string,
            parentKey: string,
            compositeKey: string
          ): void => {
            metadataTouched = true;
            if (hold) hold.redact(holder, key, childPath, json, frame);
            else if (IN_PLACE_METADATA_KEYS.has(key) || classifyField(key, parentKey) !== null)
              holder[key] = processor(holder[key], "content", false, compositeKey, true);
          };

          const sanitizeObject = (
            obj: any,
            currentChoiceIdx = 0,
            currentToolIdx = 0,
            parentKey = "",
            inMetadata = false,
            path = ""
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
            const deps: SanitizeDeps = {
              root: json,
              processor,
              isStopSignal,
              isSnapshot,
              processToolArgs: opts?.processToolArgs === true,
              redact: redactMetadataString,
            };

            for (const key of Object.keys(obj)) {
              // Every ancestor joins the path, so `usage_evidence.x` and
              // `usage.usage_evidence.x` never share one window.
              const childPath = path ? `${path}/${escapePathSegment(key)}` : escapePathSegment(key);
              if (inMetadata) {
                sanitizeMetadataChild(
                  deps,
                  obj,
                  key,
                  childPath,
                  parentKey,
                  compositeKey,
                  choiceIdx,
                  toolIdx,
                  sanitizeObject
                );
                continue;
              }
              if (typeof obj[key] === "string") {
                if (sanitizeAnswerString(deps, obj, key, parentKey, childPath, compositeKey))
                  matched = true;
              } else if (typeof obj[key] === "object") {
                descendAnswerChild(
                  obj,
                  key,
                  parentKey,
                  childPath,
                  choiceIdx,
                  toolIdx,
                  isArray,
                  sanitizeObject
                );
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
            // The block index scopes a metadata window, so two blocks never share one.
            redactClaudeFrameStrings(
              json,
              streamed,
              (holder, key, childPath, metadata) => {
                if (metadata) redactMetadataString(holder, key, childPath, "", compositeKey);
                else holder[key] = processor(holder[key], "content", false, compositeKey, true);
              },
              typeof json.index === "number" ? `block/${json.index}` : ""
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
            // sanitizer fault, so keep it out of the warn level (#18047). A metadata-only frame
            // is not content either: it must never become the envelope the flush writes into.
            if (!metadataTouched)
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
          // `message_stop` / `response.completed` end the stream for the client: what is still
          // held goes back into its own frame first (this one included), never after them.
          if (isTerminalEvent(json)) releaseHeld(controller);
          if (pendingEventLine) {
            write(controller, pendingEventLine + "\n");
            pendingEventLine = "";
          }
          writeFrame(controller, json, prefix);
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
                write(controller, pendingEventLine + "\n");
                pendingEventLine = "";
              }
              // Treat segment as raw text delta (fail-open)
              const processed = processor(segment, "content");
              write(controller, prefix + processed + "\n");
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
          write(controller, pendingEventLine + "\n");
          pendingEventLine = "";
        }
        write(controller, prefix + processed + "\n");
      }
    } else {
      // Non-data line, pass through (e.g. event: content_block_delta)
      if (line.startsWith("event:")) {
        if (pendingEventLine) write(controller, pendingEventLine + "\n");
        sawEventLine = true;
        currentEventLine = line;
        pendingEventLine = line;
      } else {
        if (pendingEventLine) {
          write(controller, pendingEventLine + "\n");
          pendingEventLine = "";
        }
        write(controller, line + "\n");
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
        hold?.clear();
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
          write(controller, pendingEventLine + "\n");
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
        // End of stream without a terminal event: still hand every held tail back in place.
        releaseHeld(controller);
      } catch (err) {
        console.error("[SSE-TRANSFORM] Error in flush:", err);
        hold?.clear();
        controller.error(err);
      }
    },
    cancel(_reason: any) {
      hold?.clear();
      if (onCancel) {
        onCancel();
      }
    },
  });
}
