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

test("toKiroV3Payload keeps the camelCase CLI 3.x wire shape", () => {
  const legacy = {
    conversationState: {
      conversationId: "conv-123",
      currentMessage: {
        userInputMessage: { content: "hello", modelId: "claude-haiku-4.5" },
      },
      history: [
        { userInputMessage: { content: "earlier", modelId: "claude-haiku-4.5" } },
        { assistantResponseMessage: { content: "sure" } },
      ],
    },
    profileArn: "arn:aws:codewhisperer:us-east-1:123:profile/x",
    inferenceConfig: { maxTokens: 5 },
  };

  const v3 = toKiroV3Payload(legacy);
  assert.deepEqual(Object.keys(v3).sort(), ["conversationState", "profileArn"]);
  assert.equal(v3.profileArn, legacy.profileArn);
  assert.equal("user_input_message" in v3, false);
  assert.equal("conversation_id" in v3, false);

  const state = v3.conversationState as Record<string, unknown>;
  assert.equal(state.conversationId, "conv-123");
  assert.equal(state.chatTriggerType, "MANUAL");
  assert.equal(state.agentTaskType, "vibe");
  assert.deepEqual(state.history, legacy.conversationState.history);

  const current = (state.currentMessage as Record<string, unknown>).userInputMessage as Record<
    string,
    unknown
  >;
  assert.equal(current.content, "hello");
  assert.equal(current.modelId, "claude-haiku-4.5");
  assert.equal(current.origin, "KIRO_CLI");
});

test("getKiroV3RuntimeHeaders matches the captured kiro-cli 3.4.0 inference headers", () => {
  const headers = getKiroV3RuntimeHeaders();
  assert.equal(
    headers["X-Amz-Target"],
    "AmazonCodeWhispererStreamingService.GenerateAssistantResponse"
  );
  assert.equal(headers["Content-Type"], "application/x-amz-json-1.0");
  assert.equal(headers.Accept, "*/*");
  assert.match(headers["User-Agent"], /md\/appVersion-3\.4\.0 app\/AmazonQ-For-CLI$/);
  assert.match(headers["X-Amz-User-Agent"], /app\/AmazonQ-For-CLI$/);
  assert.equal(headers["X-Amzn-Kiro-Attempt"], "1;max=3");
  assert.equal(headers["X-Amzn-Kiro-Fallback"], "0;max=0");
  assert.equal(headers["Amz-Sdk-Request"], "attempt=1; max=3");
  assert.ok(headers["Amz-Sdk-Invocation-Id"]);
  assert.equal("anthropic-beta" in headers, false);
  assert.equal("x-amzn-bedrock-cache-control" in headers, false);
});

test("KiroExecutor posts CLI-style payloads to the branded runtime root", async () => {
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
    assert.equal(
      sentHeaders["X-Amz-Target"],
      "AmazonCodeWhispererStreamingService.GenerateAssistantResponse"
    );
    assert.equal(sentHeaders.Accept, "*/*");
    assert.match(sentHeaders["User-Agent"], /appVersion-3\.4\.0/);
    assert.equal("anthropic-beta" in sentHeaders, false);
    assert.equal("x-amzn-bedrock-cache-control" in sentHeaders, false);

    const sentBody = JSON.parse(String(calls[0].init.body));
    assert.equal(sentBody.conversationState.conversationId, "conv-456");
    assert.equal(sentBody.conversationState.currentMessage.userInputMessage.content, "hi");
    assert.equal("user_input_message" in sentBody, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
