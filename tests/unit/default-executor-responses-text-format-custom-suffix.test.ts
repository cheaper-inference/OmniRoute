import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// #16961: compatible node IDs can carry an operator-chosen suffix. The Responses
// `text.format` default must follow the anchored type (`openai-compatible-<type>-…`
// or providerSpecificData.apiType), never a substring match on "responses".

const bodyMissingFormat = () => ({ model: "m", input: "hi", text: { verbosity: "low" } });

test("chat node whose custom suffix contains 'responses' does not get text.format", () => {
  const executor = new DefaultExecutor("openai-compatible-chat-my-responses");
  const out = executor.defaultResponsesTextFormat(bodyMissingFormat());
  assert.deepEqual(out.text, { verbosity: "low" });
});

test("chat node with apiType=chat and 'responses' in its suffix does not get text.format", () => {
  const executor = new DefaultExecutor("openai-compatible-chat-responses-gw");
  const out = executor.defaultResponsesTextFormat(bodyMissingFormat(), {
    providerSpecificData: { apiType: "chat" },
  });
  assert.deepEqual(out.text, { verbosity: "low" });
});

test("responses node with a custom suffix still gets the text.format default", () => {
  const executor = new DefaultExecutor("openai-compatible-responses-my-gateway");
  const out = executor.defaultResponsesTextFormat(bodyMissingFormat());
  assert.deepEqual(out.text, { verbosity: "low", format: { type: "text" } });
});

test("apiType=responses wins over a legacy chat-shaped id", () => {
  const executor = new DefaultExecutor("openai-compatible-chat-abc");
  const out = executor.defaultResponsesTextFormat(bodyMissingFormat(), {
    providerSpecificData: { apiType: "responses" },
  });
  assert.deepEqual(out.text, { verbosity: "low", format: { type: "text" } });
});

test("transformRequest threads credentials into the text.format default", () => {
  const chat = new DefaultExecutor("openai-compatible-chat-my-responses");
  const chatOut = chat.transformRequest("m", bodyMissingFormat(), false, {
    providerSpecificData: { apiType: "chat", baseUrl: "https://gw.example/v1" },
  }) as { text?: unknown };
  assert.deepEqual(chatOut.text, { verbosity: "low" });

  const responses = new DefaultExecutor("openai-compatible-responses-uuid-1");
  const responsesOut = responses.transformRequest("m", bodyMissingFormat(), false, {
    providerSpecificData: { baseUrl: "https://gw.example/v1" },
  }) as { text?: unknown };
  assert.deepEqual(responsesOut.text, { verbosity: "low", format: { type: "text" } });
});
