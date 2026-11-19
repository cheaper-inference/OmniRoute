/**
 * True when a `tool_choice` forces a tool call: `"required"` / `"any"`, or an object of
 * type `any`, `tool` or `function` (a named tool). `"auto"`, `"none"` and unset are not forced.
 */
export function isForcedToolChoice(toolChoice: unknown): boolean {
  return (
    toolChoice === "required" ||
    toolChoice === "any" ||
    (toolChoice !== null &&
      typeof toolChoice === "object" &&
      !Array.isArray(toolChoice) &&
      ["any", "tool", "function"].includes(
        String((toolChoice as Record<string, unknown>).type || "").toLowerCase()
      ))
  );
}
