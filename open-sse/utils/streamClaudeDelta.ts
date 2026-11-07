import { appendBoundedText } from "./streamHelpers.ts";

type ClaudeDeltaState = {
  accumulatedContent?: string;
  accumulatedReasoning?: string;
};

export function collectClaudeDelta(delta: unknown, state?: ClaudeDeltaState) {
  const record =
    delta && typeof delta === "object" && !Array.isArray(delta)
      ? (delta as Record<string, unknown>)
      : {};
  const text = record.text;
  const thinking = record.thinking;
  let contentLength = 0;

  if (typeof text === "string" && text) {
    contentLength += text.length;
    if (state?.accumulatedContent !== undefined)
      state.accumulatedContent = appendBoundedText(state.accumulatedContent, text);
  }
  if (typeof thinking === "string" && thinking) {
    contentLength += thinking.length;
    if (state?.accumulatedReasoning !== undefined)
      state.accumulatedReasoning = appendBoundedText(state.accumulatedReasoning, thinking);
  }

  return { contentLength, hasText: typeof text === "string" };
}
