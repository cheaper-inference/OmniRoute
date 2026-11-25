// Extracted from response/openai-responses.ts (file-size ratchet) — synthesizes
// tool_calls chunks from a response.completed event's output[] snapshot, for
// upstream providers that send a single batched completed event WITHOUT first
// emitting the individual response.output_item.added/.delta/.done events.
// Without this, state.toolCallIndex stays 0 and state.currentToolCallId stays
// null, so computeFinishReason returns "stop" instead of "tool_calls",
// breaking the agent loop for downstream Chat Completions clients.
import { fallbackToolCallId } from "../../helpers/toolCallHelper.ts";
import { normalizeToolName, stripEmptyOptionalToolArgs } from "./pureHelpers.ts";

type FinishReason = "tool_calls" | "stop" | "length" | "content_filter";

// Structural view of the shared translator state. Upstream payload fields stay
// unknown until the existing guards/helpers narrow them.
interface CompletionState {
  chatId?: string;
  created?: number;
  model?: string;
  toolCallIndex?: number;
  currentToolCallId?: unknown;
  incompleteReason?: unknown;
  toolCallCut?: boolean;
  roleEmitted?: boolean;
  finishReasonSent?: boolean;
  finishReason?: FinishReason;
  usage?: unknown;
}

interface AssistantRoleChunk {
  choices?: Array<{ delta?: unknown }>;
}

/**
 * Resolve the terminal finish_reason for a Responses→Chat stream.
 *
 * `currentToolCallId` is intentionally sticky for the current turn: it is set when a
 * function_call item is announced (`response.output_item.added`) and is only cleared once
 * the matching `response.output_item.done` advances `toolCallIndex`. If the stream ends
 * (flush or `response.completed`) after a tool call was emitted but BEFORE its
 * `output_item.done` arrived, `toolCallIndex` is still 0 while `currentToolCallId` is set.
 * Guarding on it as well lets us still finalize as `tool_calls` instead of `stop`, so
 * OpenAI-compatible clients continue tool-result processing instead of stopping prematurely.
 *
 * Lives here (not pureHelpers.ts) because it takes stream `state` — pureHelpers.ts is
 * guarded (tests/unit/response-openai-responses-purehelpers-split.test.ts) to have NO
 * state coupling at all.
 */
export function computeFinishReason(state: CompletionState): FinishReason {
  // A call still open at max_output_tokens / content_filter has partial arguments: report the cut.
  const callCut = state.toolCallCut === true;
  if (!callCut && ((state.toolCallIndex || 0) > 0 || state.currentToolCallId)) return "tool_calls";
  // #15489: a `response.incomplete` terminal is a truncated turn, not a clean stop.
  if (state.incompleteReason === "max_output_tokens") return "length";
  if (state.incompleteReason === "content_filter") return "content_filter";
  return "stop";
}

/**
 * OpenAI Chat Completions streams announce the assistant role on the FIRST delta
 * (e.g. `{ "role": "assistant", "content": "" }` or `{ "role": "assistant",
 * "tool_calls": [...] }`). The Responses API has no role-announcement event, so when
 * translating Responses → Chat we must synthesize it on the first emitted chunk.
 *
 * Strict streaming clients — notably @langchain/openai's `_convertDeltaToMessageChunk`
 * (used by n8n's AI Agent) — key off the first chunk's role to build an AIMessageChunk.
 * Without it, streamed tool_call deltas are dropped and the agent returns an empty
 * response, even though the underlying tool call is well-formed.
 */
// Shared by both branches of withAssistantRoleOnFirstDelta below: stamps
// role: "assistant" onto a single delta object when eligible, returning
// whether it did so (used to short-circuit the array branch's loop).
function setAssistantRoleIfEligible(state: CompletionState, delta: unknown): boolean {
  if (delta && typeof delta === "object" && !Array.isArray(delta)) {
    (delta as Record<string, unknown>).role = "assistant";
    state.roleEmitted = true;
    return true;
  }
  return false;
}

export function withAssistantRoleOnFirstDelta<TResult>(
  state: CompletionState,
  result: TResult
): TResult {
  if (!result || state.roleEmitted) return result;

  // Handle arrays of chunks (e.g. synthesized from response.completed output[])
  if (Array.isArray(result)) {
    for (const chunk of result) {
      if (setAssistantRoleIfEligible(state, (chunk as AssistantRoleChunk)?.choices?.[0]?.delta))
        break;
    }
    return result;
  }

  setAssistantRoleIfEligible(state, (result as AssistantRoleChunk).choices?.[0]?.delta);
  return result;
}

function baseChunk(state: CompletionState): Record<string, unknown> {
  return {
    id: state.chatId,
    object: "chat.completion.chunk",
    created: state.created,
    model: state.model || "gpt-4",
  };
}

/** Resolve the arguments string to emit — may arrive as a string or object. */
function resolveArgsStr(rawArgs: unknown, toolName: string, toolSchema: unknown): string {
  const argsToEmit = stripEmptyOptionalToolArgs(rawArgs, toolName, toolSchema);
  if (argsToEmit != null) {
    return typeof argsToEmit === "string" ? argsToEmit : JSON.stringify(argsToEmit);
  }
  if (rawArgs != null) {
    return typeof rawArgs === "string" ? rawArgs : JSON.stringify(rawArgs);
  }
  return "";
}

/**
 * Build the header + args chunks for one synthesized function_call item,
 * mutating `state` exactly as the incremental output_item.added/.done path
 * would (currentToolCallId, currentToolCallArgsBuffer, currentToolCallDeferred,
 * toolCallIndex), so downstream chunk math (computeFinishReason, subsequent
 * incremental events in the same turn) stays consistent.
 */
function buildToolCallChunks(
  state: ToolSnapshotState,
  fcItem: Record<string, unknown>
): Record<string, unknown>[] {
  const chunks: Record<string, unknown>[] = [];
  const callId = fcItem.call_id || fallbackToolCallId(state.toolCallIndex);
  const toolName = normalizeToolName(fcItem.name);
  const toolSchema = state.toolSchemas?.get(toolName);

  // Set state as output_item.added would
  state.currentToolCallId = callId;
  state.currentToolCallArgsBuffer = "";
  state.currentToolCallDeferred = false;

  // Emit the tool call header chunk (id, type, function.name)
  const currentIndex = state.toolCallIndex;
  chunks.push({
    ...baseChunk(state),
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            {
              index: currentIndex,
              id: callId,
              type: "function",
              function: { name: toolName || "", arguments: "" },
            },
          ],
        },
        finish_reason: null,
      },
    ],
  });

  const argsStr = resolveArgsStr(fcItem.arguments, toolName, toolSchema);
  if (argsStr) {
    state.currentToolCallArgsBuffer = argsStr;
    chunks.push({
      ...baseChunk(state),
      choices: [
        {
          index: 0,
          delta: { tool_calls: [{ index: currentIndex, function: { arguments: argsStr } }] },
          finish_reason: null,
        },
      ],
    });
  }

  // Advance state as output_item.done would
  state.toolCallIndex++;
  state.currentToolCallArgsBuffer = "";
  state.currentToolCallId = null;

  return chunks;
}

interface OpenCallEntry {
  index: number | null;
  name?: string;
  argsBuffer?: string;
  needsNormalization?: boolean;
  deferred?: boolean;
}

interface OpenCallState extends CompletionState {
  toolCallByCallId?: unknown;
  toolSchemas?: ReadonlyMap<string, unknown>;
}

type SnapshotCall = { arguments?: unknown; name?: unknown } | undefined;

function findSnapshotCall(snapshotOutput: unknown[], callId: string): SnapshotCall {
  return snapshotOutput.find(
    (item) => (item as { call_id?: unknown } | null)?.call_id === callId
  ) as SnapshotCall;
}

/** A deferred call claims its index once the snapshot names it; false while it stays unnamed. */
function releaseDeferredCall(
  state: OpenCallState,
  entry: OpenCallEntry,
  snapshot: SnapshotCall
): boolean {
  const resolvedName = normalizeToolName(snapshot?.name);
  if (!resolvedName) return false;
  entry.index = state.toolCallIndex ?? 0;
  state.toolCallIndex = entry.index + 1;
  entry.name = resolvedName;
  entry.deferred = false;
  return true;
}

function snapshotArgsOf(snapshot: SnapshotCall): string {
  return typeof snapshot?.arguments === "string" && snapshot.arguments.length > 0
    ? snapshot.arguments
    : "";
}

function openCallArgsStr(state: OpenCallState, toolName: string, raw: string): string {
  const stripped = raw
    ? stripEmptyOptionalToolArgs(raw, toolName, state.toolSchemas?.get(toolName))
    : "";
  return typeof stripped === "string" ? stripped : JSON.stringify(stripped ?? {});
}

/** The chunk that closes one open call, or null when there is nothing to send for it. */
function drainOpenCall(
  state: OpenCallState,
  callId: string,
  entry: OpenCallEntry,
  snapshotOutput: unknown[]
): Record<string, unknown> | null {
  const snapshot = findSnapshotCall(snapshotOutput, callId);
  const header = entry.index == null;
  if (header && !releaseDeferredCall(state, entry, snapshot)) return null;
  const raw = snapshotArgsOf(snapshot) || entry.argsBuffer || "";
  if (!raw && !header) return null;
  const toolName = entry.name ?? "";
  const argsStr = openCallArgsStr(state, toolName, raw);
  const toolCall = header
    ? {
        index: entry.index,
        id: callId,
        type: "function",
        function: { name: toolName, arguments: argsStr },
      }
    : { index: entry.index, function: { arguments: argsStr } };
  entry.argsBuffer = "";
  entry.needsNormalization = false;
  return {
    ...baseChunk(state),
    choices: [{ index: 0, delta: { tool_calls: [toolCall] }, finish_reason: null }],
  };
}

/**
 * Arguments chunks for every call still open (no `output_item.done`), taken from the matching
 * item of a terminal snapshot or, when it has none, from the call's argument buffer (arguments
 * are held back until the call closes, so a complete snapshot value replaces a partial buffer).
 * A deferred call (no name yet, so nothing was sent for it) is released only when the snapshot
 * names it: it then claims an index and gets its header with the arguments, as `.done` would.
 * Used at end of stream and on `response.completed` / `response.incomplete`, so a call that
 * never got its `.done` does not reach the client with empty arguments.
 */
export function drainOpenToolCallArgs(
  state: OpenCallState,
  snapshotOutput: unknown[] = []
): Record<string, unknown>[] {
  if (!(state.toolCallByCallId instanceof Map)) return [];
  const chunks: Record<string, unknown>[] = [];
  for (const [callId, entry] of state.toolCallByCallId as Map<string, OpenCallEntry>) {
    const chunk = drainOpenCall(state, callId, entry, snapshotOutput);
    if (chunk) chunks.push(chunk);
  }
  return chunks;
}

/** Build the terminal chunk (finish_reason + usage) once all tool calls are synthesized. */
export function buildFinalChunk(state: CompletionState): Record<string, unknown> {
  state.finishReasonSent = true;
  const reason = computeFinishReason(state);
  state.finishReason = reason;

  const finalChunk: Record<string, unknown> = {
    ...baseChunk(state),
    choices: [{ index: 0, delta: {}, finish_reason: reason }],
  };
  if (state.usage && typeof state.usage === "object") {
    finalChunk.usage = state.usage;
  }
  return finalChunk;
}

interface ToolSnapshotState extends CompletionState {
  toolCallIndex: number;
  toolCallIdsSeen?: Set<unknown>;
  toolSchemas?: ReadonlyMap<string, unknown>;
  currentToolCallArgsBuffer?: string;
  currentToolCallDeferred?: boolean;
}

/** Synthesize one unseen tool without finalizing, allowing ordered text/tool recovery. */
export function synthesizeCompletedToolItem(
  state: ToolSnapshotState,
  value: unknown
): Record<string, unknown>[] {
  if (!value || typeof value !== "object" || Array.isArray(value) || state.finishReasonSent)
    return [];
  const item = value as Record<string, unknown>;
  if (item.type !== "function_call" || state.toolCallIdsSeen?.has(item.call_id)) return [];
  return buildToolCallChunks(state, item);
}

/**
 * Synthesize chat-completion-style tool_calls chunks for any `function_call`
 * items in `output` whose call_id was NOT already tracked via incremental
 * `output_item.added`/`.done` events (`state.toolCallIdsSeen`). This dedup
 * guard prevents double-emission when a provider streams incrementally AND
 * `response.completed` also echoes the same function_call items in its
 * output[] snapshot (standard Responses-API snapshot behavior).
 *
 * Mutates `state` exactly as the incremental path would (toolCallIndex,
 * currentToolCallId, currentToolCallArgsBuffer, currentToolCallDeferred,
 * finishReasonSent, finishReason), so downstream chunk math stays consistent.
 *
 * Returns the array of synthesized chunks, or `null` when there is nothing to
 * synthesize (no un-seen function_call items, or finish_reason already sent)
 * — the caller falls through to its own default finish_reason handling.
 */
export function synthesizeCompletedToolCalls(
  state: ToolSnapshotState,
  output: unknown
): Record<string, unknown>[] | null {
  const outputItems = Array.isArray(output) ? output : [];
  const synthesizedChunks = outputItems.flatMap((item: unknown) =>
    synthesizeCompletedToolItem(state, item)
  );
  if (!synthesizedChunks.length) return null;
  synthesizedChunks.push(buildFinalChunk(state));
  return synthesizedChunks;
}
