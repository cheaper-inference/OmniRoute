type JsonRecord = Record<string, unknown>;

// OpenAI accepts at most 4 stop sequences; Gemini accepts 5.
const OPENAI_MAX_STOP = 4;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/** Gemini `functionCallingConfig` to an OpenAI `tool_choice`. `AUTO`/`VALIDATED` are the OpenAI default. */
function geminiToolChoice(toolConfig: unknown): unknown {
  const config = asRecord(asRecord(toolConfig)?.functionCallingConfig);
  const mode = typeof config?.mode === "string" ? config.mode.toUpperCase() : "";
  if (mode === "NONE") return "none";
  if (mode !== "ANY") return undefined;
  const names = Array.isArray(config?.allowedFunctionNames) ? config.allowedFunctionNames : [];
  // shortcut: OpenAI names one function; a longer allow-list becomes "required", upgrade to allowed_tools if needed.
  return names.length === 1 && typeof names[0] === "string"
    ? { type: "function", function: { name: names[0] } }
    : "required";
}

/**
 * Forward `generationConfig.stopSequences` as `stop` and `toolConfig` as `tool_choice` onto an
 * OpenAI request. `tool_choice` is only set when the request has tools.
 */
export function applyGeminiStopAndToolChoice(
  result: JsonRecord & { tools?: unknown[] },
  generationConfig: unknown,
  toolConfig: unknown
): void {
  const sequences = asRecord(generationConfig)?.stopSequences;
  if (Array.isArray(sequences) && sequences.length > 0) {
    result.stop = sequences.slice(0, OPENAI_MAX_STOP);
  }
  const choice = result.tools?.length ? geminiToolChoice(toolConfig) : undefined;
  if (choice !== undefined) result.tool_choice = choice;
}
