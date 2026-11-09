import test from "node:test";
import assert from "node:assert/strict";

import { openAIToBedrockConverse } from "../../open-sse/executors/bedrock.ts";

const messages = [
  { role: "system", content: "Answer in French." },
  { role: "user", content: "Hello" },
];

// Models whose Converse API rejects a system block with "doesn't support system messages".
const NO_SYSTEM_MODELS = [
  "amazon.titan-text-premier-v1:0",
  "amazon.titan-text-express-v1",
  "cohere.command-text-v14",
  "cohere.command-light-text-v14",
  "mistral.mistral-7b-instruct-v0:2",
  "mistral.mixtral-8x7b-instruct-v0:1",
  "us.mistral.mixtral-8x7b-instruct-v0:1",
];

test("a model without system-prompt support gets the system text folded into the first user turn", () => {
  for (const model of NO_SYSTEM_MODELS) {
    const payload = openAIToBedrockConverse(model, { messages });
    assert.equal(payload.system, undefined, `${model}: no system block`);
    const first = payload.messages[0];
    assert.equal(first.role, "user", model);
    const text = (first.content ?? []).map((block) => block.text).join("\n");
    assert.match(text, /Answer in French\./, `${model}: system text kept`);
    assert.match(text, /Hello/, `${model}: user text kept`);
    assert.ok(text.indexOf("Answer in French.") < text.indexOf("Hello"), model);
  }
});

test("the fold also works when the history starts with an assistant turn", () => {
  const payload = openAIToBedrockConverse("amazon.titan-text-express-v1", {
    messages: [
      { role: "system", content: "Be brief." },
      { role: "assistant", content: "Earlier answer" },
      { role: "user", content: "Next question" },
    ],
  });
  assert.equal(payload.system, undefined);
  assert.equal(payload.messages[0].role, "user");
  assert.match(String(payload.messages[0].content[0].text), /Be brief\./);
});

test("models that accept a system block keep it", () => {
  for (const model of [
    "anthropic.claude-sonnet-4-6",
    "cohere.command-r-plus-v1:0",
    "mistral.mistral-large-2402-v1:0",
    "amazon.nova-pro-v1:0",
    "meta.llama3-1-70b-instruct-v1:0",
  ]) {
    const payload = openAIToBedrockConverse(model, { messages });
    assert.deepEqual(payload.system, [{ text: "Answer in French." }], model);
    assert.equal(payload.messages[0].content[0].text, "Hello", model);
  }
});

test("a request with no system message is unchanged for a model without system support", () => {
  const payload = openAIToBedrockConverse("amazon.titan-text-express-v1", {
    messages: [{ role: "user", content: "Hello" }],
  });
  assert.equal(payload.system, undefined);
  assert.deepEqual(payload.messages, [{ role: "user", content: [{ text: "Hello" }] }]);
});
