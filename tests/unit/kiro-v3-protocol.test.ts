import test from "node:test";
import assert from "node:assert/strict";

import { KiroExecutor } from "../../open-sse/executors/kiro.ts";
import {
  getKiroV3RuntimeHeaders,
  isKiroV3Protocol,
  toKiroV3Payload,
} from "../../open-sse/services/kiroV3Protocol.ts";

const V3_CREDENTIALS = {
  accessToken: "kiro-token",
  providerSpecificData: {
    authMethod: "builder-id",
    region: "us-east-1",
    useV3Protocol: true,
  },
};

test("isKiroV3Protocol is opt-in and never defaults on", () => {
  assert.equal(isKiroV3Protocol(null), false);
  assert.equal(isKiroV3Protocol({}), false);
  assert.equal(isKiroV3Protocol({ providerSpecificData: { useV3Protocol: false } }), false);
  assert.equal(isKiroV3Protocol(V3_CREDENTIALS), true);
});

test("toKiroV3Payload converts the legacy Kiro payload to the CLI 3.x wire shape", () => {
  const legacy = {
    conversationState: {
      chatTriggerType: "MANUAL",
      conversationId: "conv-123",
      currentMessage: {
        userInputMessage: {
          content: "hello",
          modelId: "claude-haiku-4.5",
          origin: "AI_EDITOR",
          userInputMessageContext: {
            tools: [
              {
                toolSpecification: {
                  name: "lookup",
                  description: "Find a thing",
                  inputSchema: { json: { type: "object" } },
                },
              },
            ],
            toolResults: [{ toolUseId: "tu-1", status: "success", content: [{ text: "ok" }] }],
          },
        },
      },
      history: [
        { userInputMessage: { content: "earlier", modelId: "claude-haiku-4.5" } },
        { assistantResponseMessage: { content: "sure", toolUses: [{ toolUseId: "tu-1" }] } },
      ],
    },
    profileArn: "arn:aws:codewhisperer:us-east-1:123:profile/x",
    inferenceConfig: { maxTokens: 5 },
    additionalModelRequestFields: { output_config: { effort: "high" } },
  };

  const v3 = toKiroV3Payload(legacy);
  assert.deepEqual(Object.keys(v3).sort(), [
    "agent_continuation_id",
    "conversation_id",
    "history",
    "user_input_message",
  ]);
  assert.equal(v3.conversation_id, "conv-123");
  assert.equal(v3.agent_continuation_id, null);

  const current = v3.user_input_message as Record<string, unknown>;
  assert.equal(current.content, "hello");
  assert.equal(current.model_id, "claude-haiku-4.5");
  assert.equal(current.images, null);
  assert.equal(current.user_intent, null);

  const context = current.user_input_message_context as Record<string, unknown>;
  assert.ok(context.env_state);
  assert.equal(context.git_state, null);
  const tools = context.tools as Array<Record<string, unknown>>;
  assert.ok(tools[0].ToolSpecification, "tools use the capitalized ToolSpecification key");
  const toolSpec = tools[0].ToolSpecification as Record<string, unknown>;
  assert.deepEqual(toolSpec.input_schema, { json: { type: "object" } });
  const results = context.tool_results as Array<Record<string, unknown>>;
  assert.equal(results[0].tool_use_id, "tu-1");
  assert.equal("toolUseId" in results[0], false);

  const history = v3.history as Array<Record<string, unknown>>;
  assert.equal(history.length, 2);
  const userTurn = history[0].UserInputMessage as Record<string, unknown>;
  assert.equal(userTurn.content, "earlier");
  const assistantTurn = history[1].AssistantResponseMessage as Record<string, unknown>;
  assert.deepEqual(assistantTurn.tool_uses, [{ tool_use_id: "tu-1" }]);
});

test("getKiroV3RuntimeHeaders matches the captured kiro-cli 3.4.0 inference headers", () => {
  const headers = getKiroV3RuntimeHeaders();
  assert.match(headers["User-Agent"], /md\/appVersion-3\.4\.0 app\/AmazonQ-For-CLI$/);
  assert.match(headers["X-Amz-User-Agent"], /app\/AmazonQ-For-CLI$/);
  assert.equal(headers["Content-Type"], "application/x-amz-json-1.0");
  assert.equal(headers["X-Amzn-Kiro-Fallback"], "0;max=0");
});

test("KiroExecutor posts v3 payloads to the branded runtime root", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; init: RequestInit }> = [];

  executor.transformEventStreamToSSE = () =>
    new Response("data: [DONE]\n\n", {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });

  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ url: String(url), init });
    return new Response("ok", { status: 200 });
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "claude-haiku-4.5",
      body: {
        conversationState: {
          conversationId: "conv-456",
          currentMessage: {
            userInputMessage: { content: "hi", modelId: "claude-haiku-4.5" },
          },
          history: [],
        },
      },
      stream: true,
      credentials: V3_CREDENTIALS,
    } as never);

    assert.equal(result.response.status, 200);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://runtime.us-east-1.kiro.dev/");

    const sentHeaders = calls[0].init.headers as Record<string, string>;
    assert.equal(sentHeaders["X-Amzn-Kiro-Fallback"], "0;max=0");
    assert.match(sentHeaders["User-Agent"], /appVersion-3\.4\.0/);

    const sentBody = JSON.parse(String(calls[0].init.body));
    assert.equal(sentBody.conversation_id, "conv-456");
    assert.equal(sentBody.user_input_message.content, "hi");
    assert.equal("conversationState" in sentBody, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
