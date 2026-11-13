import test from "node:test";
import assert from "node:assert/strict";
const { antigravityToOpenAIRequest } =
  await import("../../open-sse/translator/request/antigravity-to-openai.ts");

test("user text next to a function response stays a user message", () => {
  const result = antigravityToOpenAIRequest(
    "gemini-3-pro",
    {
      request: {
        contents: [
          { role: "model", parts: [{ functionCall: { id: "call_1", name: "lookup", args: {} } }] },
          {
            role: "user",
            parts: [
              { functionResponse: { id: "call_1", name: "lookup", response: { result: "ok" } } },
              { text: "now continue please" },
            ],
          },
        ],
      },
    },
    false
  );
  assert.deepEqual(
    result.messages.map((message) => message.role),
    ["assistant", "tool", "user"]
  );
  assert.equal(result.messages.at(-1).content, "now continue please");
});
