import { coerceHistoricalToolCallArguments, createToolHistoryError } from "./toolArguments.ts";

type JsonRecord = Record<string, unknown>;
type ToolCallType = "function_call" | "custom_tool_call";
type ToolOutputType = "function_call_output" | "custom_tool_call_output";

type ToolItem = {
  index: number;
  type: ToolCallType | ToolOutputType;
};

const CALL_TYPES = new Set<ToolCallType>(["function_call", "custom_tool_call"]);
const OUTPUT_TYPES = new Set<ToolOutputType>(["function_call_output", "custom_tool_call_output"]);

function invalid(message: string, errorType = "invalid_tool_call_output"): never {
  throw createToolHistoryError(message, errorType);
}

// IDs are opaque ownership tokens, not presentation text. Validate without
// trimming, truncating or generating a replacement that could match another call.
export function requireResponsesCallId(value: unknown): string {
  if (
    typeof value !== "string" ||
    value.trim() === "" ||
    value.length > 64 ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    invalid(
      "Tool history item requires a valid non-blank call_id of at most 64 characters without controls"
    );
  }
  return value;
}

function expectedOutputType(callType: ToolCallType): ToolOutputType {
  return callType === "custom_tool_call" ? "custom_tool_call_output" : "function_call_output";
}

/** A tool call or tool output item of a Responses input, or null for any other item. */
function asToolItem(value: unknown): (JsonRecord & { type: ToolCallType | ToolOutputType }) | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const type = (value as JsonRecord).type;
  if (!CALL_TYPES.has(type as ToolCallType) && !OUTPUT_TYPES.has(type as ToolOutputType)) {
    return null;
  }
  return value as JsonRecord & { type: ToolCallType | ToolOutputType };
}

/**
 * Index the tool calls and tool outputs of a Responses input by call_id, rejecting invalid or
 * duplicate ids and unparseable function_call arguments.
 */
function collectToolItems(input: unknown[]): {
  calls: Map<string, ToolItem>;
  outputs: Map<string, ToolItem>;
} {
  const calls = new Map<string, ToolItem>();
  const outputs = new Map<string, ToolItem>();
  for (const [index, value] of input.entries()) {
    const item = asToolItem(value);
    if (!item) continue;
    const callId = requireResponsesCallId(item.call_id);
    if (CALL_TYPES.has(item.type as ToolCallType)) {
      if (calls.has(callId)) invalid("Duplicate tool call_id in Responses input");
      if (item.type === "function_call") {
        coerceHistoricalToolCallArguments(item.arguments, "");
      }
      calls.set(callId, { index, type: item.type });
    } else {
      if (outputs.has(callId)) invalid("Duplicate tool output call_id in Responses input");
      outputs.set(callId, { index, type: item.type });
    }
  }
  return { calls, outputs };
}

/**
 * Every output must answer a local call of the matching type that precedes it. An output with
 * no local call is accepted only when the history continues a stored previous response.
 */
function requireOutputsMatchCalls(
  calls: Map<string, ToolItem>,
  outputs: Map<string, ToolItem>,
  hasPreviousResponse: boolean
): void {
  for (const [callId, output] of outputs) {
    const call = calls.get(callId);
    if (!call) {
      if (!hasPreviousResponse) invalid("Tool output does not match a local tool call");
      continue;
    }
    if (output.type !== expectedOutputType(call.type as ToolCallType)) {
      invalid("Tool output does not match the tool call type");
    }
    if (output.index < call.index) {
      invalid("Tool output must follow its local tool call");
    }
  }
}

/** Validate a Responses input history before routing or executor repair can alter it. */
export function validateResponsesToolHistory(body: Record<string, unknown>): void {
  if (!Array.isArray(body.input)) return;

  const { calls, outputs } = collectToolItems(body.input);
  const hasPreviousResponse =
    typeof body.previous_response_id === "string" && body.previous_response_id.trim() !== "";
  requireOutputsMatchCalls(calls, outputs, hasPreviousResponse);
  for (const callId of calls.keys()) {
    if (!outputs.has(callId)) invalid("Historical tool call is missing its output");
  }
}
