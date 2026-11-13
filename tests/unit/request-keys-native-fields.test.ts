import test from "node:test";
import assert from "node:assert/strict";
import { composeIdempotencyKey } from "../../open-sse/handlers/chatCore/idempotency.ts";
import { computeRequestHash } from "../../open-sse/services/requestDedup.ts";

const key = (body: Record<string, unknown>) =>
  composeIdempotencyKey({
    rawKey: "request-1",
    provider: "claude",
    model: "model-a",
    messages: body.messages,
    body,
    apiKeyId: "key-1",
  });

test("idempotency keys differ when native Claude or Gemini intent differs", () => {
  const base = { messages: [{ role: "user", content: "hi" }] };
  const variants: Array<[string, Record<string, unknown>, Record<string, unknown>]> = [
    ["system", { ...base, system: "be brief" }, { ...base, system: "be long" }],
    [
      "thinking",
      { ...base, thinking: { type: "enabled", budget_tokens: 1024 } },
      { ...base, thinking: { type: "disabled" } },
    ],
    [
      "reasoning_effort",
      { ...base, reasoning_effort: "low" },
      { ...base, reasoning_effort: "high" },
    ],
    ["top_k", { ...base, top_k: 1 }, { ...base, top_k: 40 }],
    ["stop_sequences", { ...base, stop_sequences: ["a"] }, { ...base, stop_sequences: ["b"] }],
    [
      "contents",
      { contents: [{ role: "user", parts: [{ text: "one" }] }] },
      { contents: [{ role: "user", parts: [{ text: "two" }] }] },
    ],
    [
      "systemInstruction",
      { ...base, systemInstruction: { parts: [{ text: "a" }] } },
      { ...base, systemInstruction: { parts: [{ text: "b" }] } },
    ],
  ];
  for (const [field, left, right] of variants) assert.notEqual(key(left), key(right), field);
});

test("dedup hashes differ when a generation control differs", () => {
  const base = { model: "m", messages: [{ role: "user", content: "hi" }], temperature: 0 };
  const variants: Array<[string, Record<string, unknown>, Record<string, unknown>]> = [
    ["n", { n: 1 }, { n: 3 }],
    ["stop", { stop: ["a"] }, { stop: ["b"] }],
    ["seed", { seed: 1 }, { seed: 2 }],
    ["max_completion_tokens", { max_completion_tokens: 10 }, { max_completion_tokens: 9000 }],
    ["logprobs", { logprobs: true }, { logprobs: false }],
  ];
  for (const [field, left, right] of variants) {
    assert.notEqual(
      computeRequestHash({ ...base, ...left }),
      computeRequestHash({ ...base, ...right }),
      field
    );
  }
});
