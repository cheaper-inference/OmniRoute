type ClaudeContentBlock = Record<string, unknown>;
type ClaudeMessage = {
  role: string;
  content: ClaudeContentBlock[];
};

// Anthropic requires each user tool_result turn to immediately follow the
// assistant turn containing the matching tool_use. OpenAI-compatible clients can
// send intervening user text before a later role:"tool" message, so repair the
// ordering here while preserving unmatched output for the Claude-format pass.
export function enforceToolResultAdjacency(messages: ClaudeMessage[]): ClaudeMessage[] {
  const assistantsByToolUseId = indexAssistantToolUses(messages);
  const resultsByAssistant = new Map<ClaudeMessage, ClaudeContentBlock[]>();
  const strippedMessages: ClaudeMessage[] = [];

  for (const msg of messages) {
    stripAndCollectToolResults(msg, assistantsByToolUseId, resultsByAssistant, strippedMessages);
  }

  return insertAdjacentToolResults(strippedMessages, resultsByAssistant);
}

// A tool_use id is only unique within one assistant turn (agent sessions reuse
// ids across turns), so every occurrence is queued in arrival order and each
// tool_result consumes the oldest assistant that still lacks a result for it.
function indexAssistantToolUses(messages: ClaudeMessage[]): Map<string, ClaudeMessage[]> {
  const assistantsByToolUseId = new Map<string, ClaudeMessage[]>();
  for (const msg of messages) {
    if (msg.role !== "assistant" || !Array.isArray(msg.content)) continue;
    for (const block of msg.content) {
      if (block.type !== "tool_use" || !block.id) continue;
      const id = String(block.id);
      const queue = assistantsByToolUseId.get(id);
      if (queue) queue.push(msg);
      else assistantsByToolUseId.set(id, [msg]);
    }
  }
  return assistantsByToolUseId;
}

function stripAndCollectToolResults(
  msg: ClaudeMessage,
  assistantsByToolUseId: Map<string, ClaudeMessage[]>,
  resultsByAssistant: Map<ClaudeMessage, ClaudeContentBlock[]>,
  strippedMessages: ClaudeMessage[]
): void {
  if (msg.role !== "user" || !Array.isArray(msg.content)) {
    strippedMessages.push(msg);
    return;
  }

  const remainingBlocks: ClaudeContentBlock[] = [];
  for (const block of msg.content) {
    if (block.type !== "tool_result") {
      remainingBlocks.push(block);
      continue;
    }

    if (!collectMatchedToolResult(block, assistantsByToolUseId, resultsByAssistant)) {
      const toolUseId = typeof block.tool_use_id === "string" ? block.tool_use_id : "";
      const serialized =
        typeof block.content === "string"
          ? block.content
          : (JSON.stringify(block.content ?? "") ?? "");
      remainingBlocks.push({
        type: "text",
        text: `[Unpaired tool result ${toolUseId || "unknown"}]\n${serialized}`,
      });
    }
  }

  if (remainingBlocks.length > 0) {
    strippedMessages.push({ ...msg, content: remainingBlocks });
  }
}

function collectMatchedToolResult(
  block: ClaudeContentBlock,
  assistantsByToolUseId: Map<string, ClaudeMessage[]>,
  resultsByAssistant: Map<ClaudeMessage, ClaudeContentBlock[]>
): boolean {
  const toolUseId = typeof block.tool_use_id === "string" ? block.tool_use_id : "";
  const assistant = toolUseId ? assistantsByToolUseId.get(toolUseId)?.shift() : undefined;
  if (!assistant) return false;

  const grouped = resultsByAssistant.get(assistant) ?? [];
  if (grouped.some((toolResult) => toolResult.tool_use_id === toolUseId)) return false;

  grouped.push(block);
  resultsByAssistant.set(assistant, grouped);
  return true;
}

function insertAdjacentToolResults(
  messages: ClaudeMessage[],
  resultsByAssistant: Map<ClaudeMessage, ClaudeContentBlock[]>
): ClaudeMessage[] {
  const reordered: ClaudeMessage[] = [];
  for (const msg of messages) {
    reordered.push(msg);
    const adjacentResults = orderedResultsForAssistant(msg, resultsByAssistant);
    if (adjacentResults.length > 0) reordered.push({ role: "user", content: adjacentResults });
  }
  return reordered;
}

function orderedResultsForAssistant(
  msg: ClaudeMessage,
  resultsByAssistant: Map<ClaudeMessage, ClaudeContentBlock[]>
): ClaudeContentBlock[] {
  if (msg.role !== "assistant" || !Array.isArray(msg.content)) return [];

  const grouped = resultsByAssistant.get(msg) ?? [];
  return msg.content.flatMap((block) => {
    if (block.type !== "tool_use" || !block.id) return [];
    return grouped.filter((toolResult) => toolResult.tool_use_id === String(block.id));
  });
}
