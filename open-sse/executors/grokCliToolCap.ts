/**
 * Grok Build tool cap — xAI's cli-chat-proxy rejects requests with more than 200 tools.
 *
 * A blind `slice(0, max)` drops whatever sits at the end of the list: the hosted
 * `web_search` / `x_search` tools clients append after their functions, and the function a
 * `tool_choice` forces (Grok Build then rejects the turn because the chosen tool is gone).
 * This keeps the hosted tools, gives the remaining slots to the other tools in their
 * original order, and swaps the forced function into the last of those slots when the
 * truncation would have dropped it.
 */

const GROK_BUILD_HOSTED_TOOL_TYPES = new Set(["web_search", "x_search"]);

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function functionName(value: unknown): string {
  const record = asRecord(value);
  if (!record) return "";
  const name = record.name ?? asRecord(record.function)?.name;
  return typeof name === "string" ? name : "";
}

function isHostedTool(tool: unknown): boolean {
  const type = asRecord(tool)?.type;
  return typeof type === "string" && GROK_BUILD_HOSTED_TOOL_TYPES.has(type);
}

function forcedFunctionName(toolChoice: unknown): string {
  const choice = asRecord(toolChoice);
  if (!choice || choice.type !== "function") return "";
  return functionName(choice);
}

/**
 * Returns `tools` unchanged when it fits `max`; otherwise a new array of at most `max`
 * entries: the non-hosted tools (order kept) followed by the hosted ones.
 */
export function capGrokBuildTools(tools: unknown[], toolChoice: unknown, max: number): unknown[] {
  if (tools.length <= max) return tools;

  const hosted = tools.filter(isHostedTool).slice(0, max);
  const others = tools.filter((tool) => !isHostedTool(tool));
  const otherLimit = max - hosted.length;
  const kept = others.slice(0, otherLimit);

  const preferredName = forcedFunctionName(toolChoice);
  if (preferredName && otherLimit > 0) {
    const preferred = others.find((tool) => functionName(tool) === preferredName);
    if (preferred && !kept.includes(preferred)) kept[otherLimit - 1] = preferred;
  }

  return [...kept, ...hosted];
}
