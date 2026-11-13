// DeepSeek rejects a request whose tools repeat a name (HTTP 400 "Tool names must be unique"),
// on the native API and on every gateway that serves a deepseek-* model. Keep the first
// definition of each name: tool_choice and message history refer to tools by name, so nothing
// else needs to change. Other models accept repeats and are left alone.

/** True for `deepseek-*` ids, with or without a provider prefix or a `(level)` suffix. */
function isDeepSeekModel(model: unknown): boolean {
  if (typeof model !== "string") return false;
  const base = model
    .replace(/\([^()]+\)\s*$/, "")
    .trim()
    .split("/")
    .pop();
  return /^deepseek-/i.test(base ?? "");
}

function toolName(tool: unknown): string | null {
  const record = tool as { name?: unknown; function?: { name?: unknown } } | null;
  const name = record?.function?.name ?? record?.name;
  return typeof name === "string" && name ? name : null;
}

export function dedupeDeepSeekTools<T>(tools: T[], model: unknown): T[] {
  if (!isDeepSeekModel(model)) return tools;
  const seen = new Set<string>();
  return tools.filter((tool) => {
    const name = toolName(tool);
    if (name === null) return true;
    if (seen.has(name)) return false;
    seen.add(name);
    return true;
  });
}
