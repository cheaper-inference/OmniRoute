// F-C2-11: the no-usage estimate fallback measured only choices[0].message.content. A Claude- or
// Responses-shaped reply measured as an empty string (length 2), so a 20,000-char answer was
// estimated at 1 output token, and a Gemini body gained a stray top-level `usage` key.
import test from "node:test";
import assert from "node:assert/strict";

const { applyClientUsageBuffer } =
  await import("../../open-sse/handlers/chatCore/clientUsageBuffer.ts");

function lengthSeen(response: Record<string, unknown>, format: string): number | null {
  let seen: number | null = null;
  applyClientUsageBuffer(response, { messages: [] }, format, {}, {
    addBufferToUsage: (usage: unknown) => usage,
    filterUsageForFormat: (usage: unknown) => usage,
    estimateUsage: (_body: unknown, length: number) => {
      seen = length;
      return { estimated: true };
    },
  } as never);
  return seen;
}

test("a Claude-shaped reply is measured by its own text", () => {
  const seen = lengthSeen({ content: [{ type: "text", text: "x".repeat(20_000) }] }, "claude");
  assert.ok(seen !== null && seen >= 20_000, `measured ${seen}`);
});

test("a Responses-shaped reply is measured by its own text", () => {
  const seen = lengthSeen(
    { output: [{ type: "message", content: [{ type: "output_text", text: "x".repeat(20_000) }] }] },
    "openai-responses"
  );
  assert.ok(seen !== null && seen >= 20_000, `measured ${seen}`);
});

test("a Gemini reply with usageMetadata does not gain a top-level usage key", () => {
  const response: Record<string, unknown> = {
    candidates: [{ content: { parts: [{ text: "hello" }] } }],
    usageMetadata: { promptTokenCount: 3, candidatesTokenCount: 2 },
  };
  applyClientUsageBuffer(response, { messages: [] }, "gemini");
  assert.equal("usage" in response, false);
});
