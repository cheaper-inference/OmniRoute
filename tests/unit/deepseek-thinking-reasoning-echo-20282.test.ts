import test from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";

test("Issue #20282: deepseek registry entry declares requiresReasoningContentEcho", () => {
  const entry = getRegistryEntry("deepseek");
  assert.ok(entry, "deepseek provider entry must exist");
  assert.equal(
    entry.requiresReasoningContentEcho,
    true,
    "deepseek provider must declare requiresReasoningContentEcho"
  );
});

test("Issue #20282: DefaultExecutor('deepseek') injects reasoning_content placeholder for thinking models when prior assistant turn lacks it", async () => {
  const executor = new DefaultExecutor("deepseek");

  const body = {
    model: "deepseek-v4-pro",
    messages: [
      { role: "user", content: "Check git status and explain" },
      {
        role: "assistant",
        content: "Let me check the repository status.",
        tool_calls: [
          {
            id: "call_abc123",
            type: "function",
            function: { name: "git_status", arguments: "{}" },
          },
        ],
        // Note: reasoning_content is absent because this turn was produced by another combo target (e.g. grok / sonnet)
      },
      {
        role: "tool",
        tool_call_id: "call_abc123",
        content: "On branch main, working tree clean",
      },
    ],
  };

  const transformed = (await (
    executor as unknown as {
      transformRequest(
        model: string,
        body: unknown,
        stream?: boolean,
        credentials?: unknown
      ): Promise<Record<string, unknown>>;
    }
  ).transformRequest("deepseek-v4-pro", body, false)) as {
    messages: Array<Record<string, unknown>>;
  };

  const assistantTurn = transformed.messages.find((m) => m.role === "assistant");
  assert.ok(assistantTurn, "assistant message must be present");
  assert.equal(
    assistantTurn.reasoning_content,
    " ",
    "assistant tool-call turn lacking reasoning_content must receive placeholder ' ' for deepseek thinking models"
  );
  assert.equal(
    assistantTurn.content,
    "Let me check the repository status.",
    "assistant text content must be preserved"
  );
});

test("Issue #20282: DefaultExecutor('deepseek') preserves authentic reasoning_content if already present", async () => {
  const executor = new DefaultExecutor("deepseek");

  const body = {
    model: "deepseek-v4-pro",
    messages: [
      { role: "user", content: "Hello" },
      {
        role: "assistant",
        content: "Hi there!",
        reasoning_content: "Authentic deepseek chain of thought",
      },
    ],
  };

  const transformed = (await (
    executor as unknown as {
      transformRequest(
        model: string,
        body: unknown,
        stream?: boolean,
        credentials?: unknown
      ): Promise<Record<string, unknown>>;
    }
  ).transformRequest("deepseek-v4-pro", body, false)) as {
    messages: Array<Record<string, unknown>>;
  };

  const assistantTurn = transformed.messages.find((m) => m.role === "assistant");
  assert.equal(
    assistantTurn?.reasoning_content,
    "Authentic deepseek chain of thought",
    "pre-existing reasoning_content must not be replaced"
  );
});
