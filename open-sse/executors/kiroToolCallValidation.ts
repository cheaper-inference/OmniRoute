import { TEXT_ENCODER } from "./kiro/eventstream.ts";

/**
 * Validation + buffering helpers for Kiro's nested `tool_call` wrapper payloads.
 *
 * Extracted from kiro.ts (file-size gate, #9314) — pure functions, no dependency on
 * KiroExecutor instance state.
 */

export type JsonRecord = Record<string, unknown>;

export const KIRO_TOOL_CALL_WRAPPER = "tool_call";

export type PendingKiroWrapperToolCall = {
  toolCallId: string;
  toolName: string;
  inputKind?: "string" | "object";
  inputText?: string;
  inputObject?: Record<string, unknown>;
};

export function parseKiroToolInput(toolInput: unknown): unknown {
  if (typeof toolInput !== "string") return toolInput;
  try {
    return JSON.parse(toolInput);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid Kiro tool_call payload: input must be valid JSON (${message})`);
  }
}

export function validateKiroToolName(toolUse: JsonRecord): string {
  const toolName = typeof toolUse.name === "string" ? toolUse.name.trim() : "";
  if (!toolName) throw new Error("Invalid Kiro toolUseEvent: missing tool name");
  return toolName;
}

export function validateKiroToolCallWrapperInput(toolInput: unknown): void {
  if (toolInput === undefined) {
    throw new Error("Invalid Kiro tool_call payload: missing input");
  }
  const input = parseKiroToolInput(toolInput);
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error(
      "Invalid Kiro tool_call payload: input must be an object with name and arguments"
    );
  }
  const record = input as JsonRecord;
  if (typeof record.name !== "string" || !record.name.trim()) {
    throw new Error("Invalid Kiro tool_call payload: missing nested MCP tool name at input.name");
  }
  if (!Object.prototype.hasOwnProperty.call(record, "arguments")) {
    throw new Error(
      "Invalid Kiro tool_call payload: missing nested MCP tool arguments at input.arguments"
    );
  }
}

/**
 * Does the translated Kiro request declare a client tool whose name collides with
 * the MCP wrapper (`tool_call`)? Agent runtimes such as OpenClaw and Hermes expose
 * their own deferred-tool bridge under that name (#18675). A call to it carries the
 * client's schema, not `{name, arguments}`, so it must pass through untouched.
 *
 * openai-to-kiro always places the tool list on the current message (and strips it
 * from history), so that is the only place checked. Pass the translated body as
 * built by openai-to-kiro (before the executor's allowlist): names it synthesized
 * from history in `_kiroSynthesizedToolNames` were never declared by the client.
 */
export function kiroRequestDeclaresToolCallWrapperName(transformedBody: unknown): boolean {
  const asRecord = (value: unknown): JsonRecord | null =>
    value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
  const synthesized = asRecord(transformedBody)?._kiroSynthesizedToolNames;
  if (synthesized instanceof Map && synthesized.has(KIRO_TOOL_CALL_WRAPPER)) return false;
  const userInput = asRecord(
    asRecord(asRecord(asRecord(transformedBody)?.conversationState)?.currentMessage)
      ?.userInputMessage
  );
  const tools = asRecord(userInput?.userInputMessageContext)?.tools;
  if (!Array.isArray(tools)) return false;
  return tools.some((tool) => {
    const name = asRecord(asRecord(tool)?.toolSpecification)?.name;
    return typeof name === "string" && name.trim() === KIRO_TOOL_CALL_WRAPPER;
  });
}

export function validateKiroToolUse(
  toolUse: JsonRecord,
  options: { clientDeclaresWrapperName?: boolean } = {}
): void {
  const toolName = validateKiroToolName(toolUse);
  if (toolName === KIRO_TOOL_CALL_WRAPPER && !options.clientDeclaresWrapperName) {
    validateKiroToolCallWrapperInput(toolUse.input);
  }
}

export function appendBufferedKiroToolInput(
  toolCall: PendingKiroWrapperToolCall,
  toolInput: unknown
): void {
  if (toolInput === undefined) return;
  if (typeof toolInput === "string") {
    if (toolCall.inputKind && toolCall.inputKind !== "string") {
      throw new Error("Invalid Kiro tool_call payload: mixed input fragment types");
    }
    toolCall.inputKind = "string";
    toolCall.inputText = `${toolCall.inputText || ""}${toolInput}`;
    return;
  }
  if (toolInput && typeof toolInput === "object" && !Array.isArray(toolInput)) {
    if (toolCall.inputKind && toolCall.inputKind !== "object") {
      throw new Error("Invalid Kiro tool_call payload: mixed input fragment types");
    }
    toolCall.inputKind = "object";
    toolCall.inputObject = toolInput as Record<string, unknown>;
  }
}

export function getBufferedKiroToolInput(toolCall: PendingKiroWrapperToolCall): unknown {
  return toolCall.inputKind === "string" ? toolCall.inputText || "" : toolCall.inputObject;
}

export function encodeSse(value: string): Uint8Array {
  return TEXT_ENCODER.encode(value);
}
