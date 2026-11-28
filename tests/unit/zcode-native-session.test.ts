import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NativeZcodeSessionBridge } from "../../open-sse/executors/zcode/nativeSession.ts";
import { sanitizeProviderUsageForRequest } from "../../open-sse/utils/usageTracking.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("ZCode's exact token usage is not replaced by an estimate from executor metadata", () => {
  const usage = { prompt_tokens: 20520, completion_tokens: 446, total_tokens: 20966 };
  const request = {
    model: "glm-5.3",
    messages: [{ role: "user", content: "x".repeat(9000) }],
  };
  const metadata = { model: "glm-5.3", buffered: true, plan: "account:zai-start-plan" };

  assert.equal(
    sanitizeProviderUsageForRequest(usage, request, FORMATS.OPENAI),
    usage,
    "the complete request makes the native reported token count plausible"
  );
  const incorrectlyEstimated = sanitizeProviderUsageForRequest(
    { ...usage },
    metadata,
    FORMATS.OPENAI
  );
  assert.notEqual(incorrectlyEstimated.prompt_tokens, usage.prompt_tokens);
});

test("native session returns caller tool, binds continuation, and consumes external result once", async () => {
  const root = await mkdtemp(join(tmpdir(), "native-session-test-"));
  let toolResult = "";
  let relayUrl = "";
  let headers: Record<string, string> = {};
  let toolRequest: Promise<void> | undefined;
  let closeCount = 0;
  let releasedWorkspaces = 0;
  let pendingUsageReads = 0;
  const bridge = new NativeZcodeSessionBridge({
    workspaceRoot: root,
    pollMs: 2,
    timeoutMs: 2000,
    clientFactory: () => ({
      async start() {},
      async close() {
        closeCount++;
      },
      async call(_channel, method, args) {
        const params = args[0] as Record<string, unknown>;
        if (method === "saveProject") return { id: "owned-project" };
        if (method === "createSession") {
          assert.deepEqual(params.toolAllowlist, ["mcp__omniroute__tool_0"]);
          const server = (
            params.mcpServers as Array<{
              url: string;
              protocolVersion: string;
              headers: Array<{ name: string; value: string }>;
            }>
          )[0];
          assert.equal(server.protocolVersion, "legacy");
          relayUrl = server.url;
          headers = Object.fromEntries(server.headers.map((h) => [h.name, h.value]));
          return { session: { sessionId: "owned-session" } };
        }
        if (method === "sendPrompt") {
          toolRequest = (async () => {
            await fetch(relayUrl, {
              method: "POST",
              headers,
              body: JSON.stringify({ jsonrpc: "2.0", id: 0, method: "tools/list" }),
            });
            const response = await fetch(relayUrl, {
              method: "POST",
              headers,
              body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "tools/call",
                params: { name: "tool_0", arguments: { value: 7 } },
              }),
            });
            const body = await response.json();
            toolResult = body.result.content[0].text;
          })();
          return { accepted: true };
        }
        if (method === "getTaskTokenUsage")
          return {
            inputTokens: 1000,
            outputTokens: 12,
            totalTokens: 1012,
            reasoningTokens: 3,
            cacheReadTokens: 900,
            cacheCreationTokens: 5,
          };
        if (method === "readSession") {
          if (!toolResult && pendingUsageReads++ === 0)
            return { session: { status: "running" }, messages: [] };
          return toolResult
            ? {
                session: { status: "idle" },
                messages: [
                  {
                    info: {
                      finish: "stop",
                      semantics: { kind: "assistant_response" },
                      tokens: {
                        total: 1012,
                        input: 1000,
                        output: 12,
                        reasoning: 3,
                        cache: { read: 900, write: 5 },
                      },
                    },
                    parts: [
                      { type: "reasoning", text: "Checked caller result" },
                      { type: "text", text: toolResult },
                    ],
                  },
                ],
              }
            : {
                session: { status: "running" },
                messages: [
                  {
                    info: {
                      finish: "tool-calls",
                      semantics: { kind: "assistant_response" },
                      tokens: {
                        total: 1012,
                        input: 1000,
                        output: 12,
                        reasoning: 3,
                        cache: { read: 900, write: 5 },
                      },
                    },
                    parts: [],
                  },
                ],
              };
        }
        if (method === "closeSession") return true;
        if (method === "disposeWorkspace") {
          assert.equal(params.releasePreparation, true);
          releasedWorkspaces++;
          return true;
        }
        throw new Error(`Unexpected method ${method}`);
      },
    }),
  });
  const base = {
    scope: "account-a:start:caller-a",
    selection: { providerId: "account:zai-start-plan", modelId: "GLM-5.3-Flash" },
    messages: [{ role: "user", content: "Use echo" }],
    tools: [{ name: "echo", inputSchema: { type: "object" } }],
  };
  try {
    const result = await bridge.execute(base);
    assert.equal(result.finishReason, "tool-calls");
    assert.deepEqual(result.usage, {
      inputTokens: 1000,
      outputTokens: 12,
      totalTokens: 1012,
      reasoningTokens: 3,
      cacheReadTokens: 900,
      cacheWriteTokens: 5,
    });
    assert.equal(toolResult, "", "native tool must remain suspended until caller returns a result");
    const call = (result.toolCalls as Array<{ id: string; name: string; input: unknown }>)[0];
    assert.equal(call.name, "echo");
    assert.deepEqual(call.input, { value: 7 });
    const messages = [
      ...base.messages,
      {
        role: "assistant",
        content: "",
        tool_calls: [
          {
            id: call.id,
            type: "function",
            function: { name: call.name, arguments: JSON.stringify(call.input) },
          },
        ],
      },
      { role: "tool", content: "unpredictable-client-value", tool_call_id: call.id },
    ];
    await assert.rejects(
      bridge.execute({ ...base, scope: "account-b:start:caller-a", messages }),
      /does not match/
    );
    assert.equal(toolResult, "", "invalid continuation must not consume the suspended tool");
    const final = await bridge.execute({ ...base, messages });
    assert.equal(final.text, "unpredictable-client-value");
    assert.deepEqual(final.usage, {
      inputTokens: 1000,
      outputTokens: 12,
      totalTokens: 1012,
      reasoningTokens: 3,
      cacheReadTokens: 900,
      cacheWriteTokens: 5,
    });
    assert.equal(final.reasoning, "Checked caller result");
    await toolRequest;
    assert.equal(closeCount, 1);
    assert.equal(releasedWorkspaces, 1, "completed request releases its native engine");
    assert.deepEqual(await readdir(root), [], "completed request workspace is removed");
  } finally {
    await bridge.close();
    await rm(root, { recursive: true, force: true });
  }
});

test("native session rejects a successful answer when caller tools never connected", async () => {
  const root = await mkdtemp(join(tmpdir(), "native-session-missing-tools-"));
  const bridge = new NativeZcodeSessionBridge({
    workspaceRoot: root,
    pollMs: 1,
    timeoutMs: 1000,
    clientFactory: () => ({
      async start() {},
      async close() {},
      async call(_channel, method) {
        if (method === "saveProject") return { id: "project" };
        if (method === "createSession") return { session: { sessionId: "session" } };
        if (method === "readSession")
          return {
            session: { status: "idle" },
            messages: [
              {
                info: { finish: "stop", semantics: { kind: "assistant_response" } },
                parts: [{ type: "text", text: "No tool available" }],
              },
            ],
          };
        return {};
      },
    }),
  });
  try {
    await assert.rejects(
      bridge.execute({
        scope: "cold-host",
        selection: { providerId: "account:zai-start-plan", modelId: "GLM-5.3-Flash" },
        messages: [{ role: "user", content: "Call echo" }],
        tools: [{ name: "echo", inputSchema: { type: "object" } }],
      }),
      { status: 503, message: "ZCode caller tools did not connect" }
    );
    assert.deepEqual(await readdir(root), []);
  } finally {
    await bridge.close();
    await rm(root, { recursive: true, force: true });
  }
});

test("native Start quota1005 is a tariff429 rather than a provider outage", async () => {
  const root = await mkdtemp(join(tmpdir(), "native-quota-test-"));
  const bridge = new NativeZcodeSessionBridge({
    workspaceRoot: root,
    clientFactory: () => ({
      async start() {},
      async close() {},
      async call(_channel, method) {
        if (method === "saveProject") return { id: "quota-project" };
        if (method === "createSession") return { session: { sessionId: "quota-session" } };
        if (method === "readSession")
          return {
            session: { status: "error" },
            projection: {
              lastError: {
                code: "1005",
                message: "exceed quota limit",
                attribution: { providerErrorCode: "1005" },
              },
            },
          };
        return {};
      },
    }),
  });
  try {
    await assert.rejects(
      bridge.execute({
        scope: "quota-account:start",
        selection: { providerId: "account:zai-start-plan", modelId: "GLM-5.3-Flash" },
        messages: [{ role: "user", content: "Probe" }],
        tools: [],
      }),
      { status: 429, message: "ZCode tariff quota or rate limit reached" }
    );
  } finally {
    await bridge.close();
    await rm(root, { recursive: true, force: true });
  }
});
