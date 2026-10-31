import { getRegistryEntry } from "../config/providerRegistry.ts";
import { inheritTruncatedStreamPolicy } from "./truncatedStreamPolicy.ts";

type NativeProtocol = "openai" | "claude" | "openai-responses";
type OutputItemCounts = { messages: number; reasoning: number; tools: number; other: number };
type EmptyTurnExecution = {
  protocol: NativeProtocol;
  normalStop: boolean;
  messageStop: boolean;
  openedBlock: boolean;
  failed: boolean;
  eventCount: number;
  terminalType: string | null;
  terminalStatus: string | null;
  incompleteReason: string | null;
  outputItems: OutputItemCounts;
  streamedOutput: {
    items: OutputItemCounts;
    textDeltaEvents: number;
    refusalDeltaEvents: number;
    toolArgumentDeltaEvents: number;
  };
  nativeStreamComplete: boolean;
  unparsedFrames: number;
  oversizedFrames: number;
  outputTokens: number | null;
  reasoningTokens: number | null;
};

// Internal response identities only: no header can grant this policy. The
// execution boundary establishes origin; native bytes establish termination.
const executions = new WeakMap<Response, EmptyTurnExecution>();
const MAX_FRAME_CHARS = 1_048_576;

// Azure resource endpoints documented by the official Foundry API.
function azureProtocol(actual: URL): NativeProtocol | null {
  if (
    !/^[a-z0-9-]{1,63}\.(?:openai\.azure\.com|services\.ai\.azure\.com)$/.test(actual.hostname) ||
    actual.port
  )
    return null;
  if (actual.pathname === "/openai/v1/responses") return "openai-responses";
  if (
    actual.hostname.endsWith(".services.ai.azure.com") &&
    actual.pathname === "/anthropic/v1/messages"
  )
    return "claude";
  return null;
}

function executionProtocol(response: Response, requestUrl: string): NativeProtocol | null {
  try {
    const actual = new URL(response.url || requestUrl);
    if (actual.protocol !== "https:" || actual.username || actual.password) return null;
    const azure = azureProtocol(actual);
    if (azure) return azure;
    // These are protocol-native endpoints already used by the executors. A
    // compatible node or overridden base URL does not inherit their policy.
    for (const id of ["openai", "anthropic", "codex", "openrouter"]) {
      const entry = getRegistryEntry(id);
      if (!entry?.baseUrl) continue;
      const expected = new URL(entry.baseUrl);
      if (actual.origin === expected.origin && actual.pathname === expected.pathname) {
        return entry.format as NativeProtocol;
      }
    }
  } catch {
    // Unknown origins keep the existing empty-content guard.
  }
  return null;
}

function observeClaudePayload(state: EmptyTurnExecution, data: Record<string, unknown>) {
  if (
    data.type === "content_block_start" ||
    (Array.isArray(data.content) && data.content.length > 0)
  )
    state.openedBlock = true;
  const delta = data.delta as Record<string, unknown> | undefined;
  const reason = data.stop_reason ?? delta?.stop_reason;
  if (reason === "end_turn" || reason === "stop_sequence") state.normalStop = true;
  if (typeof reason === "string") state.terminalStatus = safeStopReason(reason);
  if (data.type === "message_stop" || data.type === "message") {
    state.messageStop = true;
    state.terminalType = "message_stop";
  }
}

function isCompletedResponsesPayload(
  data: Record<string, unknown>,
  response: Record<string, unknown> | undefined
): boolean {
  return (
    (data.type === "response.completed" && response?.status === "completed") ||
    (data.object === "response" && data.status === "completed")
  );
}

function countOutputItem(counts: OutputItemCounts, output: unknown) {
  if (!output || typeof output !== "object") return;
  const type = (output as Record<string, unknown>).type;
  if (type === "message") counts.messages++;
  else if (type === "reasoning") counts.reasoning++;
  else if (type === "function_call" || type === "custom_tool_call") counts.tools++;
  else counts.other++;
}

function nonemptyText(delta: unknown): boolean {
  return typeof delta === "string" && delta.trim().length > 0;
}

function observeStreamedOutput(state: EmptyTurnExecution, payload: Record<string, unknown>) {
  if (payload.type === "response.output_item.done") {
    countOutputItem(state.streamedOutput.items, payload.item);
  } else if (payload.type === "response.output_text.delta" && nonemptyText(payload.delta)) {
    state.streamedOutput.textDeltaEvents++;
  } else if (payload.type === "response.refusal.delta" && nonemptyText(payload.delta)) {
    state.streamedOutput.refusalDeltaEvents++;
  } else if (
    (payload.type === "response.function_call_arguments.delta" ||
      payload.type === "response.custom_tool_call_input.delta") &&
    nonemptyText(payload.delta)
  ) {
    state.streamedOutput.toolArgumentDeltaEvents++;
  }
}

function observeResponsesTerminal(state: EmptyTurnExecution, payload: Record<string, unknown>) {
  const response = payload.response as Record<string, unknown> | undefined;
  const eventType =
    typeof payload.type === "string" &&
    ["response.completed", "response.done", "response.failed", "response.incomplete"].includes(
      payload.type
    )
      ? payload.type
      : null;
  if (!eventType && payload.object !== "response") return;
  state.terminalType = eventType ?? "response";
  const terminal = response ?? payload;
  state.terminalStatus =
    typeof terminal.status === "string" &&
    ["completed", "failed", "cancelled", "incomplete", "in_progress"].includes(terminal.status)
      ? terminal.status
      : null;
  const incomplete = terminal.incomplete_details as Record<string, unknown> | undefined;
  state.incompleteReason =
    incomplete?.reason === "max_output_tokens" || incomplete?.reason === "content_filter"
      ? incomplete.reason
      : null;
  state.outputItems = { messages: 0, reasoning: 0, tools: 0, other: 0 };
  if (Array.isArray(terminal.output)) {
    for (const item of terminal.output) countOutputItem(state.outputItems, item);
  }
  const usage = terminal.usage as Record<string, unknown> | undefined;
  const details = usage?.output_tokens_details as Record<string, unknown> | undefined;
  state.outputTokens = finiteTokenCount(usage?.output_tokens);
  state.reasoningTokens = finiteTokenCount(details?.reasoning_tokens);
}

function safeStopReason(reason: unknown): string | null {
  return typeof reason === "string" &&
    [
      "stop",
      "end_turn",
      "stop_sequence",
      "length",
      "max_tokens",
      "tool_calls",
      "tool_use",
      "content_filter",
      "refusal",
      "pause_turn",
    ].includes(reason)
    ? reason
    : null;
}

function finiteTokenCount(tokens: unknown): number | null {
  return typeof tokens === "number" && Number.isSafeInteger(tokens) && tokens >= 0 ? tokens : null;
}

function observePayload(state: EmptyTurnExecution, value: unknown) {
  if (!value || typeof value !== "object") return;
  const data = value as Record<string, unknown>;
  const response = data.response as Record<string, unknown> | undefined;
  state.eventCount++;
  if (state.protocol === "openai-responses") {
    observeStreamedOutput(state, data);
    observeResponsesTerminal(state, data);
  }
  if (
    data.error ||
    response?.error ||
    data.type === "error" ||
    data.type === "response.failed" ||
    data.type === "response.incomplete" ||
    data.status === "failed" ||
    (state.protocol === "openai-responses" &&
      (response?.status === "failed" ||
        response?.status === "cancelled" ||
        response?.status === "incomplete"))
  ) {
    state.failed = true;
    return;
  }
  if (state.protocol === "openai") {
    const choices = data.choices as { finish_reason?: unknown }[] | undefined;
    if (
      Array.isArray(choices) &&
      choices.length > 0 &&
      choices.every((choice) => choice.finish_reason === "stop")
    )
      state.normalStop = true;
    const terminalChoice = Array.isArray(choices)
      ? choices.find((choice) => choice.finish_reason != null)
      : undefined;
    if (terminalChoice) {
      state.terminalType = "chat.completion";
      state.terminalStatus = safeStopReason(terminalChoice.finish_reason);
    }
  } else if (state.protocol === "claude") {
    observeClaudePayload(state, data);
  } else if (isCompletedResponsesPayload(data, response)) {
    state.normalStop = true;
  }
}

function observePart(state: EmptyTurnExecution, part: string, isSse: boolean) {
  const json = isSse ? (part.startsWith("data:") ? part.slice(5).trim() : "") : part;
  if (!json || json === "[DONE]") return;
  try {
    observePayload(state, JSON.parse(json));
  } catch {
    state.unparsedFrames++;
    // An incomplete/unrecognized frame cannot establish a normal stop.
  }
}

export function markEmptyTurnExecution(
  response: Response,
  requestUrl: string,
  credentials: Record<string, unknown>
): Response {
  if (
    !response.ok ||
    !response.body ||
    !credentials?.connectionId ||
    !(credentials.apiKey || credentials.accessToken)
  )
    return response;
  const protocol = executionProtocol(response, requestUrl);
  if (!protocol) return response;
  const state: EmptyTurnExecution = {
    protocol,
    normalStop: false,
    messageStop: false,
    openedBlock: false,
    failed: false,
    eventCount: 0,
    terminalType: null,
    terminalStatus: null,
    incompleteReason: null,
    outputItems: { messages: 0, reasoning: 0, tools: 0, other: 0 },
    streamedOutput: {
      items: { messages: 0, reasoning: 0, tools: 0, other: 0 },
      textDeltaEvents: 0,
      refusalDeltaEvents: 0,
      toolArgumentDeltaEvents: 0,
    },
    nativeStreamComplete: false,
    unparsedFrames: 0,
    oversizedFrames: 0,
    outputTokens: null,
    reasoningTokens: null,
  };
  const decoder = new TextDecoder();
  const isSse = (response.headers.get("content-type") || "").includes("text/event-stream");
  let pending = "";
  function consume(text: string, done = false) {
    // A failed turn stays untrusted, but its later terminal still explains why.
    // Only an observer size-limit failure disables further bounded parsing.
    if (state.oversizedFrames > 0) return;
    pending += text;
    if (pending.length > MAX_FRAME_CHARS) {
      state.failed = true;
      state.oversizedFrames++;
      pending = "";
      return;
    }
    if (!isSse && !done) return;
    const parts = isSse ? pending.split(/\r?\n/) : [pending];
    pending = isSse && !done ? parts.pop() || "" : "";
    for (const part of parts) {
      observePart(state, part, isSse);
    }
  }
  const body = response.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        consume(decoder.decode(chunk, { stream: true }));
        controller.enqueue(chunk);
      },
      flush() {
        consume(decoder.decode(), true);
        state.nativeStreamComplete = true;
      },
    })
  );
  const observed = new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
  executions.set(observed, state);
  return observed;
}

/** True only after an executed native protocol supplied its ordinary terminal. */
export function hasTrustedEmptyTurn(response: Response): boolean {
  const state = executions.get(response);
  return (
    !!state &&
    !state.failed &&
    state.normalStop &&
    (state.protocol !== "claude" || (state.messageStop && !state.openedBlock))
  );
}

export function getEmptyTurnDiagnostics(response: Response) {
  const state = executions.get(response);
  if (!state) return { nativeExecutionObserved: false };
  return {
    nativeExecutionObserved: true,
    protocol: state.protocol,
    eventCount: state.eventCount,
    normalStop: state.normalStop,
    failed: state.failed,
    terminalType: state.terminalType,
    terminalStatus: state.terminalStatus,
    incompleteReason: state.incompleteReason,
    outputItems: { ...state.outputItems },
    streamedOutput: { ...state.streamedOutput, items: { ...state.streamedOutput.items } },
    nativeStreamComplete: state.nativeStreamComplete,
    unparsedFrames: state.unparsedFrames,
    oversizedFrames: state.oversizedFrames,
    outputTokens: state.outputTokens,
    reasoningTokens: state.reasoningTokens,
  };
}

/**
 * Copy the per-Response turn verdicts onto a wrapper: the trusted empty-turn record and
 * the cut-stream marker (#18460 follow-up, `truncatedStreamPolicy.ts`). Every chatCore /
 * chat.ts wrapper already routes through here, so both travel the same path to the combo.
 */
export function inheritEmptyTurnPolicy(source: Response, target: Response): Response {
  const execution = executions.get(source);
  if (execution) executions.set(target, execution);
  return inheritTruncatedStreamPolicy(source, target);
}
