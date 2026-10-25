import { applyCompressionAsync } from "../strategySelector.ts";
import { createCompressionStats } from "../stats.ts";
import type { CompressionConfig, CompressionResult } from "../types.ts";

type MessageLike = {
  role?: unknown;
  content?: unknown;
  tool_calls?: unknown;
  [key: string]: unknown;
};

function hasTextPromptContent(content: unknown): boolean {
  if (typeof content === "string") return true;
  return (
    Array.isArray(content) &&
    content.some(
      (part) =>
        !!part &&
        typeof part === "object" &&
        "text" in part &&
        typeof (part as { text?: unknown }).text === "string"
    )
  );
}

/** The current prompt is the final direct user message; replayed history is never selected. */
export function findCurrentPromptIndex(messages: MessageLike[]): number {
  for (let index = messages.length - 1; index >= 0; index--) {
    const message = messages[index];
    if (
      message.role === "user" &&
      hasTextPromptContent(message.content) &&
      !Array.isArray(message.tool_calls) &&
      !(typeof message.content === "string" && message.content.startsWith("[CCR retrieve "))
    ) {
      return index;
    }
  }
  return -1;
}

/**
 * Runs only the explicitly selected context-rollover engines against the newest direct
 * user message. The replayed request prefix is copied unchanged.
 */
export async function applyCurrentPromptPipeline(
  body: Record<string, unknown>,
  pipeline: string[],
  options: { model?: string; principalId?: string; provider?: string } = {}
): Promise<CompressionResult> {
  if (!Array.isArray(body.messages)) {
    return { body, compressed: false, stats: null };
  }
  const messages = body.messages as MessageLike[];
  const index = findCurrentPromptIndex(messages);
  if (index < 0) return { body, compressed: false, stats: null };

  const current = messages[index];
  if (pipeline.length === 0) {
    return {
      body,
      compressed: false,
      stats: createCompressionStats({ messages: [current] }, { messages: [current] }, "stacked", [
        "no-current-message-passes-selected",
      ]),
    };
  }

  const result = await applyCompressionAsync({ messages: [current] }, "stacked", {
    model: options.model,
    principalId: options.principalId,
    provider: options.provider,
    config: {
      enabled: true,
      stackedPipeline: pipeline.map((engine) => ({ engine })),
    } as CompressionConfig,
  });
  const rewritten = Array.isArray(result.body.messages)
    ? (result.body.messages as MessageLike[])
    : [];
  const stats =
    result.stats ??
    createCompressionStats(
      { messages: [current] },
      { messages: [current] },
      "stacked",
      pipeline.map((engine) => `${engine}-no-change`)
    );
  if (rewritten.length === 0) return { body, compressed: false, stats };
  const changed = JSON.stringify(rewritten[0]) !== JSON.stringify(current);
  if (!changed) return { body, compressed: false, stats };
  return {
    ...result,
    body: {
      ...body,
      messages: [...messages.slice(0, index), ...rewritten, ...messages.slice(index + 1)],
    },
  };
}
