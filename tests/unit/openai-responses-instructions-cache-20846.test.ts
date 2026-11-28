import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { openaiToOpenAIResponsesRequest } from "../../open-sse/translator/request/openai-responses/toResponses.ts";

test("#20846 DefaultExecutor moves top-level instructions into input as a leading developer item on the OpenAI Responses path", () => {
  const executor = new DefaultExecutor("openai");
  const systemPrompt = "You are a helpful coding assistant.";
  const inputBody = {
    model: "gpt-6.2-sol",
    instructions: systemPrompt,
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "Hello" }],
      },
    ],
    stream: true,
  };

  const result = executor.transformRequest("gpt-6.2-sol", inputBody, true, {}) as Record<
    string,
    unknown
  >;

  assert.equal("instructions" in result, false);
  assert.deepEqual(result.input, [
    {
      type: "message",
      role: "developer",
      content: [{ type: "input_text", text: systemPrompt }],
    },
    {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: "Hello" }],
    },
  ]);
  // Original caller body is not mutated
  assert.equal(inputBody.instructions, systemPrompt);
  assert.equal(inputBody.input.length, 1);
});

test("#20846 translated Chat Completions system prompt is moved from instructions back to input for OpenAI Responses", () => {
  const executor = new DefaultExecutor("openai");
  const systemPrompt = "Follow repository rules.";
  const translated = openaiToOpenAIResponsesRequest(
    "gpt-6.2-sol",
    {
      model: "gpt-6.2-sol",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Run tests" },
      ],
    },
    true,
    {}
  ) as Record<string, unknown>;

  assert.equal(translated.instructions, systemPrompt);

  const result = executor.transformRequest("gpt-6.2-sol", translated, true, {}) as Record<
    string,
    unknown
  >;

  assert.equal("instructions" in result, false);
  const input = result.input as Array<Record<string, unknown>>;
  assert.equal(input.length, 2);
  assert.deepEqual(input[0], {
    type: "message",
    role: "developer",
    content: [{ type: "input_text", text: systemPrompt }],
  });
  assert.equal(input[1].role, "user");
});

test("#20846 string input is normalized when instructions are prepended", () => {
  const executor = new DefaultExecutor("openai");
  const result = executor.transformRequest(
    "gpt-6.2-sol",
    {
      model: "gpt-6.2-sol",
      instructions: "Be concise.",
      input: "Explain prompt caching.",
    },
    true,
    {}
  ) as Record<string, unknown>;

  assert.equal("instructions" in result, false);
  assert.deepEqual(result.input, [
    {
      type: "message",
      role: "developer",
      content: [{ type: "input_text", text: "Be concise." }],
    },
    {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: "Explain prompt caching." }],
    },
  ]);
});

test("#20846 stateful Responses requests (previous_response_id or conversation) keep instructions untouched", () => {
  const executor = new DefaultExecutor("openai");

  const withPrevId = executor.transformRequest(
    "gpt-6.2-sol",
    {
      model: "gpt-6.2-sol",
      previous_response_id: "resp_123",
      instructions: "System instructions",
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "Next" }] }],
    },
    true,
    {}
  ) as Record<string, unknown>;

  assert.equal(withPrevId.instructions, "System instructions");
  assert.equal((withPrevId.input as unknown[]).length, 1);

  const withConversation = executor.transformRequest(
    "gpt-6.2-sol",
    {
      model: "gpt-6.2-sol",
      conversation: "conv_456",
      instructions: "System instructions",
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "Next" }] }],
    },
    true,
    {}
  ) as Record<string, unknown>;

  assert.equal(withConversation.instructions, "System instructions");
  assert.equal((withConversation.input as unknown[]).length, 1);
});

test("#20846 Chat Completions bodies and non-OpenAI providers are left unchanged", () => {
  const openaiExecutor = new DefaultExecutor("openai");
  const chatBody = {
    model: "gpt-5.4",
    instructions: "Ignored on chat body",
    messages: [{ role: "user", content: "Hi" }],
  };
  const chatResult = openaiExecutor.transformRequest("gpt-5.4", chatBody, true, {}) as Record<
    string,
    unknown
  >;
  assert.equal(chatResult.instructions, "Ignored on chat body");
  assert.equal(chatResult.input, undefined);

  const otherExecutor = new DefaultExecutor("openai-compatible-responses-custom");
  const otherResult = otherExecutor.transformRequest(
    "gpt-6.2-sol",
    {
      model: "gpt-6.2-sol",
      instructions: "Keep on other providers",
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "Hi" }] }],
    },
    true,
    { providerSpecificData: { apiType: "responses", baseUrl: "https://example.com/v1" } }
  ) as Record<string, unknown>;
  assert.equal(otherResult.instructions, "Keep on other providers");
  assert.equal((otherResult.input as unknown[]).length, 1);
});

test("#20846 body without input is left unchanged and blank instructions are dropped without adding a message", () => {
  const executor = new DefaultExecutor("openai");

  const withoutInput = executor.transformRequest(
    "gpt-6.2-sol",
    {
      model: "gpt-6.2-sol",
      instructions: "Be concise.",
    },
    true,
    {}
  ) as Record<string, unknown>;
  assert.equal(withoutInput.instructions, "Be concise.");
  assert.equal("input" in withoutInput, false);

  for (const blank of ["", " \n\t "]) {
    const withBlank = executor.transformRequest(
      "gpt-6.2-sol",
      {
        model: "gpt-6.2-sol",
        instructions: blank,
        input: "Hello",
      },
      true,
      {}
    ) as Record<string, unknown>;
    assert.equal("instructions" in withBlank, false);
    assert.equal(withBlank.input, "Hello");
  }
});
