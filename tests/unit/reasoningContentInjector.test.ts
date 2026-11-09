import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  isThinkingMessageModel,
  injectReasoningContentForThinkingModel,
} from "../../open-sse/utils/reasoningContentInjector.ts";

describe("reasoningContentInjector — xiaomi-tokenplan mimo family (9router#1321)", () => {
  it("recognizes xiaomi-tokenplan/mimo-v2.5-pro as a thinking-mode model", () => {
    assert.equal(isThinkingMessageModel("xiaomi-tokenplan/mimo-v2.5-pro"), true);
  });

  it("recognizes bare mimo model ids as thinking-mode models", () => {
    assert.equal(isThinkingMessageModel("mimo-v2.5-pro"), true);
  });

  it("still recognizes the existing thinking-mode families (deepseek/kimi/k2/minimax)", () => {
    assert.equal(isThinkingMessageModel("deepseek-v4-flash"), true);
    assert.equal(isThinkingMessageModel("kimi-k2"), true);
    assert.equal(isThinkingMessageModel("minimax-m2"), true);
  });

  it("does not flag unrelated model ids", () => {
    assert.equal(isThinkingMessageModel("gpt-4o"), false);
  });

  it("injects a reasoning_content placeholder for assistant messages when routed to mimo", () => {
    const body = {
      model: "xiaomi-tokenplan/mimo-v2.5-pro",
      messages: [
        { role: "user", content: "hi" },
        { role: "assistant", content: "hello" },
      ],
    };

    // Simulate the executor gate: only inject when the model is a thinking model.
    assert.equal(isThinkingMessageModel(body.model), true);

    const result = injectReasoningContentForThinkingModel(body) as typeof body;
    const assistantMsg = result.messages[1] as Record<string, unknown>;
    assert.equal(assistantMsg.reasoning_content, " ");
  });
});

describe("reasoningContentInjector — idempotent across reasoning carriers", () => {
  type Message = Record<string, unknown>;
  const user: Message = { role: "user", content: "hi" };
  const assistantWithToolCall: Message = {
    role: "assistant",
    content: "",
    tool_calls: [{ id: "call_1", type: "function", function: { name: "lookup", arguments: "{}" } }],
  };
  const injectAssistant = (assistant: Message) => {
    const body = { model: "deepseek-v4-flash-free", messages: [user, assistant] };
    const result = injectReasoningContentForThinkingModel(body) as { messages: Message[] };
    return { body, result, assistant: result.messages[1] };
  };

  it("does not add reasoning_content when only the reasoning alias is present", () => {
    const { body, result, assistant } = injectAssistant({
      ...assistantWithToolCall,
      reasoning: "chain",
    });
    assert.equal(result, body);
    assert.equal(Object.prototype.hasOwnProperty.call(assistant, "reasoning_content"), false);
    assert.equal(assistant.reasoning, "chain");
  });

  it("leaves a message carrying both reasoning and reasoning_content unchanged", () => {
    const { body, result, assistant } = injectAssistant({
      ...assistantWithToolCall,
      reasoning: "chain",
      reasoning_content: "echo",
    });
    assert.equal(result, body);
    assert.equal(assistant.reasoning_content, "echo");
    assert.equal(assistant.reasoning, "chain");
  });

  it("does not overwrite an array-valued reasoning_content", () => {
    const carrier = [{ type: "text", text: "x" }];
    const { body, result, assistant } = injectAssistant({
      ...assistantWithToolCall,
      reasoning_content: carrier,
    });
    assert.equal(result, body);
    assert.deepEqual(assistant.reasoning_content, carrier);
  });

  it("does not add reasoning_content when the reasoning alias is a non-empty array", () => {
    const carrier = [{ type: "text", text: "x" }];
    const { body, result, assistant } = injectAssistant({
      ...assistantWithToolCall,
      reasoning: carrier,
    });
    assert.equal(result, body);
    assert.equal(Object.prototype.hasOwnProperty.call(assistant, "reasoning_content"), false);
    assert.deepEqual(assistant.reasoning, carrier);
  });

  it("still injects the placeholder when no carrier is present", () => {
    const { assistant } = injectAssistant({ ...assistantWithToolCall });
    assert.equal(assistant.reasoning_content, " ");
  });

  it("still injects the placeholder when every carrier is empty or whitespace", () => {
    const { assistant } = injectAssistant({
      ...assistantWithToolCall,
      reasoning: "   ",
      reasoning_content: [],
    });
    assert.equal(assistant.reasoning_content, " ");
  });
});
