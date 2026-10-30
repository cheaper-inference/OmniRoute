type ToolRecord = Record<string, unknown>;

function isPlainObject(value: unknown): value is ToolRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * Return the record that holds an OpenAI tool's definition (name, description, schema).
 *
 * Tools arrive in three wrapped shapes from real clients:
 *   (a) openai-spec function: { type: "function", function: { name, ... } }
 *   (b) bare/loose function:  { function: { name, ... } }   (no parent `type`)
 *   (c) Chat Completions custom: { type: "custom", custom: { name, input_schema | format } }
 * `function` is unwrapped whenever present, regardless of the parent `type`, so the
 * bare shape keeps working. A custom wrapper is unwrapped only when `custom` is an object;
 * a Claude-format tool that merely declares `type: "custom"` with its fields at the top
 * level (Claude Code v2.1+) has no `custom` key and is returned as is. Reading the name off
 * an un-unwrapped wrapper yields no name and silently drops the tool.
 */
export function unwrapOpenAIToolDefinition(tool: ToolRecord): ToolRecord {
  const source = tool.type === "custom" && isPlainObject(tool.custom) ? tool.custom : tool;
  return (source.function ?? source) as ToolRecord;
}
