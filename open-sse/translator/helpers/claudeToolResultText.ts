function textPart(block: unknown): string[] {
  if (typeof block === "string") return [block];
  if (block === null || typeof block !== "object") return [];
  const { type, text } = block as { type?: unknown; text?: unknown };
  return type === "text" && typeof text === "string" ? [text] : [];
}

export function unpairedClaudeToolResultText(
  toolUseId: string,
  content: unknown
): { type: "text"; text: string } {
  const blocks: unknown[] = Array.isArray(content) ? content : [content];
  const text = blocks.flatMap(textPart).join("\n");
  const label = `[Unpaired tool result ${toolUseId || "unknown"}]`;
  return { type: "text", text: text ? `${label}\n${text}` : label };
}
