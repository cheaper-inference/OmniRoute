import { before, after, describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  prepareExecutorFixture,
  cleanupExecutorFixture,
  TEST_DATA_DIR,
  GrokBotExecutor,
  setGrokBotTransportForTests,
  _grokBotInternals,
  type FakeTransport,
  makeTransport,
  installTransport,
  fakeBridgeUrl,
  makeInput,
  terminal,
  settledWatchEvents,
} from "../helpers/grokBotExecutorFixture.ts";
before(prepareExecutorFixture);
after(cleanupExecutorFixture);

describe("GrokBotExecutor bridge lifecycle", () => {
  let t: FakeTransport;

  let executor: InstanceType<typeof GrokBotExecutor>;

  beforeEach(() => {
    t = makeTransport();
    installTransport(t);
    _grokBotInternals.resetPendingCleanupsForTests();
    // Production shape (spec deployment step 9): the public bridge URL is
    // configured; tests that exercise the stop switch or env-absent paths
    // override/delete it locally.
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    executor = new GrokBotExecutor();
  });

  it("stops the request bridge after the turn and does not send when start fails", async () => {
    const events: string[] = [];
    executor.setBridgeControllerForTests({
      async start() {
        events.push("start");
        return { url: fakeBridgeUrl("one") };
      },
      async stop() {
        events.push("stop");
      },
    });
    t.watchEvents = settledWatchEvents("hello back");
    try {
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], false, undefined, {
          url: "http://127.0.0.1:9/mcp",
          challenge: "test-challenge",
        })
      )) as Response;
      assert.equal(res.status, 200);
      assert.deepEqual(events, ["start", "stop"]);
      const started = t.calls.find(
        (c) => c.method === "aiserver.v1.DashboardService/ListSandMcpTools"
      );
      const startedConfig = JSON.parse(String(started?.payload.mcpConfigJson));
      assert.equal(startedConfig.mcpServers.bridge.url, fakeBridgeUrl("one"));
      const sent = t.calls.find((c) => c.method === "SendGrokBotUserMessage");
      const sentConfig = JSON.parse(String(sent?.payload.mcpConfigJson));
      assert.equal(sentConfig.mcpServers.bridge.url, fakeBridgeUrl("one"));
      executor.setBridgeControllerForTests({
        async start() {
          return { url: "https://bridge.example.test/mcp" };
        },
        async stop() {},
      });
      const reused = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], false, undefined, {
          url: "http://127.0.0.1:9/mcp",
          challenge: "test-challenge",
        })
      )) as Response;
      assert.ok(reused.status >= 400);
      executor.setBridgeControllerForTests({
        async start() {
          return { url: fakeBridgeUrl("one") };
        },
        async stop() {},
      });
      const repeated = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], false, undefined, {
          url: "http://127.0.0.1:9/mcp",
          challenge: "test-challenge",
        })
      )) as Response;
      assert.ok(repeated.status >= 400);
      executor.setBridgeControllerForTests({
        async start() {
          return { url: "http://127.0.0.1:9/mcp" };
        },
        async stop() {
          events.push("stop-after-local");
        },
      });
      const local = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], false, undefined, {
          url: "http://127.0.0.1:9/mcp",
          challenge: "test-challenge",
        })
      )) as Response;
      assert.ok(local.status >= 400);
      assert.equal(events.includes("stop-after-local"), true);
      executor.setBridgeControllerForTests({
        async start() {
          throw new Error("bridge start failed");
        },
        async stop() {
          events.push("stop-after-failure");
        },
      });
      const failed = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], false, undefined, {
          url: "http://127.0.0.1:9/mcp",
          challenge: "test-challenge",
        })
      )) as Response;
      assert.ok(failed.status >= 400);
      assert.equal(t.calls.filter((c) => c.method === "SendGrokBotUserMessage").length, 1);
      assert.equal(events.includes("stop-after-failure"), true);
      executor.setBridgeControllerForTests({
        async start() {
          return { url: fakeBridgeUrl("stop") };
        },
        async stop() {
          throw new Error("bridge stop failed");
        },
      });
      const stopFailed = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], false, undefined, {
          url: "http://127.0.0.1:9/mcp",
          challenge: "test-challenge",
        })
      )) as Response;
      assert.equal(stopFailed.status, 200);
      assert.equal(executor.bridgeLifecycleForTests().includes("stop-failed"), true);
    } finally {
      executor.setBridgeControllerForTests(null);
    }
  });

  it("uses the request bridge URL when no controller is injected", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = settledWatchEvents("hello back");
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(res.status, 200);
    const started = t.calls.find(
      (c) => c.method === "aiserver.v1.DashboardService/ListSandMcpTools"
    );
    const startedConfig = JSON.parse(String(started?.payload.mcpConfigJson));
    assert.equal(startedConfig.mcpServers.bridge.url, "http://127.0.0.1:9/mcp");
  });

  it("does not use another executor instance bridge controller", async () => {
    executor.setBridgeControllerForTests(null);
    let started = false;
    const other = new GrokBotExecutor();
    other.setBridgeControllerForTests({
      async start() {
        started = true;
        return { url: "http://127.0.0.1:9/mcp" };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("hello back");
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(res.status, 200);
    assert.equal(started, false);
  });

  it("does not start a bridge controller for a plain request", async () => {
    let started = false;
    executor.setBridgeControllerForTests({
      async start() {
        started = true;
        return { url: "http://127.0.0.1:9/mcp" };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("plain answer");
    try {
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }])
      )) as Response;
      assert.equal(res.status, 200);
      assert.equal(started, false);
      assert.deepEqual(executor.bridgeLifecycleForTests(), []);
    } finally {
      executor.setBridgeControllerForTests(null);
    }
  });

  it("does not attach a bridge config unless the request bridge is required", async () => {
    t.watchEvents = settledWatchEvents("plain answer");
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const send = t.calls.find((c) => c.method === "SendGrokBotUserMessage");
    assert.ok(send, "send-message not called");
    assert.equal(send.payload.mcpConfigJson, undefined);
  });

  it("includes configured remote MCP servers in the sent config", async () => {
    process.env.GROK_BOT_REMOTE_MCP_SERVERS = JSON.stringify({
      context7: { url: "https://mcp.context7.com/mcp" },
      exa: { url: "https://mcp.exa.ai/mcp", headers: { Authorization: "Bearer exa-test" } },
    });
    t.watchEvents = settledWatchEvents("plain answer");
    try {
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }])
      )) as Response;
      assert.equal(res.status, 200);
      const send = t.calls.find((c) => c.method === "SendGrokBotUserMessage");
      const servers = JSON.parse(String(send?.payload.mcpConfigJson)).mcpServers;
      assert.deepEqual(Object.keys(servers), ["context7", "exa"]);
      assert.equal(servers.exa.headers.Authorization, "Bearer exa-test");
    } finally {
      delete process.env.GROK_BOT_REMOTE_MCP_SERVERS;
    }
  });

  it("rejects a loopback bridge URL when the default controller is in place", async () => {
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(res.status, 502);
    const body = await res.json();
    assert.equal(
      body.error.message,
      "Request bridge URL must use a public HTTPS path-nonce endpoint"
    );
    assert.equal(
      t.calls.some((call) => call.method === "SendGrokBotUserMessage"),
      false
    );
  });

  it("rejects a bridge URL that is not loopback", async () => {
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "https://evil.example.com/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(res.status, 502);
    assert.equal((await res.json()).error.message.includes("loopback"), true);
    assert.equal(
      t.calls.some((call) => call.method === "SendGrokBotUserMessage"),
      false
    );
  });

  it("rejects a controller-less bridge that has no challenge", async () => {
    executor.setBridgeControllerForTests(null);
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
      })
    )) as Response;
    assert.equal(res.status, 502);
    const body = await res.json();
    assert.equal(body.error.message, "Request bridge challenge is missing");
  });

  it("does not send when the request bridge URL is missing", async () => {
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.ok(res.status >= 400, `expected error status, got ${res.status}`);
    assert.equal(
      t.calls.some((c) => c.method === "SendGrokBotUserMessage"),
      false,
      "message must not be sent without a bridge URL"
    );
  });

  it("does not block a plain request when bridge discovery is marked missed", async () => {
    t.discoveredTools = [];
    t.watchEvents = settledWatchEvents("plain answer");
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    assert.equal(
      t.calls.some((c) => c.method === "SendGrokBotUserMessage"),
      true,
      "plain request must still be sent"
    );
  });

  it("does not send a bridge config with a non-loopback URL", async () => {
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "https://example.invalid/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.ok(res.status >= 400, `expected error status, got ${res.status}`);
    assert.equal(
      t.calls.some((c) => c.method === "SendGrokBotUserMessage"),
      false,
      "non-loopback bridge URL must not be sent"
    );
  });

  it("does not send a bridge request without a one-time challenge", async () => {
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "",
      })
    )) as Response;
    assert.ok(res.status >= 400, `expected error status, got ${res.status}`);
    assert.equal(
      t.calls.some((c) => c.method === "SendGrokBotUserMessage"),
      false,
      "bridge request must not be sent without a challenge"
    );
  });

  it("does not send when the request bridge tool is not discovered", async () => {
    t.discoveredTools = [];
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.ok(res.status >= 400, `expected error status, got ${res.status}`);
    assert.equal(
      t.calls.some((c) => c.method === "SendGrokBotUserMessage"),
      false,
      "message must not be sent when bridge discovery fails"
    );
  });

  it("discovers the bridge tool when Cursor prefixes the name", async () => {
    t.discoveredTools = [];
    t.prefixedTools = [{ name: "bridge-bridge_value", toolName: "bridge_value" }];
    executor.setBridgeControllerForTests({
      async start() {
        return { url: fakeBridgeUrl("result"), call: () => "bridge-ok" };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("model said something else");
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(
      res.status,
      200,
      `expected the prefixed tool to count as discovered, got ${res.status}`
    );
    assert.equal(
      t.calls.some((c) => c.method === "SendGrokBotUserMessage"),
      true,
      "message must be sent when the prefixed bridge tool is discovered"
    );
    const prefixedSend = t.calls.find((c) => c.method === "SendGrokBotUserMessage");
    assert.match(
      String(prefixedSend?.payload.text),
      /bridge_value tool/,
      "the prompt must use the raw tool name the model can invoke"
    );
    assert.doesNotMatch(String(prefixedSend?.payload.text), /bridge-bridge_value/);
  });

  it("discovers a client tool when Cursor prefixes it", async () => {
    t.discoveredTools = [];
    t.prefixedTools = [{ name: "bridge-canary_value", toolName: "canary_value" }];
    executor.setBridgeControllerForTests({
      async start() {
        return { url: fakeBridgeUrl("result"), call: () => "bridge-ok" };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("model said something else");
    const input = makeInput([{ role: "user", content: "hi" }], false, undefined, {
      url: "http://127.0.0.1:9/mcp",
      challenge: "test-challenge",
    });
    (input.body as { tools?: unknown }).tools = [
      { type: "function", function: { name: "canary_value", parameters: { type: "object" } } },
    ];
    const res = (await executor.execute(input)) as Response;
    assert.equal(
      res.status,
      200,
      `expected the prefixed client tool to count as discovered, got ${res.status}`
    );
    assert.equal(
      t.calls.some((c) => c.method === "SendGrokBotUserMessage"),
      true,
      "message must be sent when the client tool is discovered"
    );
  });

  it("names the tool from toolName when the advertised name is missing", async () => {
    t.discoveredTools = [];
    t.prefixedTools = [{ name: "", toolName: "bridge_value" }];
    executor.setBridgeControllerForTests({
      async start() {
        return { url: fakeBridgeUrl("result"), call: () => "bridge-ok" };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("model said something else");
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(res.status, 200);
    const sent = t.calls.find((c) => c.method === "SendGrokBotUserMessage");
    assert.match(String(sent?.payload.text), /bridge_value tool/);
    assert.doesNotMatch(String(sent?.payload.text), /bridge-bridge_value/);
  });

  it("rejects a tool whose name merely ends with the bridge suffix", async () => {
    t.discoveredTools = [];
    t.prefixedTools = [{ name: "evil-bridge_value", toolName: "evil-bridge_value" }];
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.ok(res.status >= 400, `expected a lookalike tool to be rejected, got ${res.status}`);
    assert.equal(
      t.calls.some((c) => c.method === "SendGrokBotUserMessage"),
      false,
      "a lookalike tool name must not count as the bridge tool"
    );
  });

  it("discovers the bridge tool via a legacy flat tools array alongside servers", async () => {
    // Both shapes populated at once: servers carry an unrelated tool, the
    // legacy flat array carries the bridge tool. The executor must merge
    // both paths and discover it.
    t.discoveredTools = ["unrelated_tool"];
    t.legacyTools = ["bridge_value"];
    executor.setBridgeControllerForTests({
      async start() {
        return {
          url: fakeBridgeUrl("result"),
          call: () => "bridge-ok",
        };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("model said something else");
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(res.status, 200);
    assert.equal((await res.json()).choices[0].message.content, "bridge-ok");
    t.legacyTools = [];
  });

  it("discovers the bridge tool via a legacy flat tools array alone", async () => {
    t.discoveredTools = [];
    t.legacyTools = ["bridge_value"];
    executor.setBridgeControllerForTests({
      async start() {
        return {
          url: fakeBridgeUrl("result"),
          call: () => "bridge-ok",
        };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("model said something else");
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(res.status, 200);
    assert.equal((await res.json()).choices[0].message.content, "bridge-ok");
    t.legacyTools = [];
  });

  for (const behavior of ["missing-agent", "id-mismatch", "wrong-harness"] as const) {
    it(`fails without sending a message when create returns ${behavior}`, async () => {
      t.createBehavior = behavior;
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }])
      )) as Response;
      assert.ok(res.status >= 400, `expected error status, got ${res.status}`);
      assert.equal(
        t.calls.some((c) => c.method === "SendGrokBotUserMessage"),
        false,
        "message must not be sent on create failure"
      );
    });
  }

  it("rejects when credential refresh cannot supply an access token", async (context) => {
    const refresh = context.mock.method(executor, "refreshCredentials", async () => null);
    const input = makeInput([{ role: "user", content: "hi" }]);
    (input.credentials as { accessToken?: string }).accessToken = "";
    const res = (await executor.execute(input)) as Response;
    assert.equal(res.status, 401);
    assert.equal(refresh.mock.callCount(), 1);
    assert.equal(
      t.calls.some((call) => call.method === "CreateGrokBotTemporalAgent"),
      false
    );
  });

  it("rejects missing access and refresh tokens without making an upstream request", async () => {
    const input = makeInput([{ role: "user", content: "hi" }]);
    input.credentials.accessToken = "";
    input.credentials.refreshToken = "";
    const response = (await executor.execute(input)) as Response;
    assert.equal(response.status, 401);
    assert.equal(t.calls.length, 0);
  });

  it("rejects an explicit bridge that has no url", async () => {
    const input = makeInput([{ role: "user", content: "hi" }], false, undefined, { url: "" });
    const res = (await executor.execute(input)) as Response;
    assert.equal(res.status, 502);
    assert.equal((await res.json()).error.message.includes("URL is missing"), true);
  });

  it("queues a cleanup when create times out, then reconciles via roster on next call", async () => {
    t.createBehavior = "timeout";
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.ok(res.status >= 400);
    assert.equal(_grokBotInternals.pendingCleanupCount(), 1);

    t.createBehavior = "ok";
    t.rosterEcho = true;
    t.watchEvents = settledWatchEvents("second try");
    const res2 = (await executor.execute(
      makeInput([{ role: "user", content: "again" }])
    )) as Response;
    assert.equal(res2.status, 200);
    const deletes = t.calls.filter((c) => c.method === "DeleteGrokBotAgent");
    assert.deepEqual(deletes[0].payload, { id: "row-9" });
    assert.equal(_grokBotInternals.pendingCleanupCount(), 0);
  });

  it("keeps the queue item when the roster call itself fails", async () => {
    t.createBehavior = "timeout";
    await executor.execute(makeInput([{ role: "user", content: "hi" }]));
    assert.equal(_grokBotInternals.pendingCleanupCount(), 1);
    t.createBehavior = "ok";
    setGrokBotTransportForTests({
      async rpc(method: string, payload: Record<string, unknown>) {
        t.calls.push({ method, payload });
        if (method === "CreateGrokBotTemporalAgent") {
          t.lastAgentId = String(payload.agentId);
          return {
            agent: { id: "row-1", legacyAgentId: payload.agentId, harness: "temporal" },
          };
        }
        if (method === "ListGrokBotAgents") throw new Error("network down");
        if (method === "DeleteGrokBotAgent") return {};
        return {};
      },
      async *watch() {
        for (const ev of settledWatchEvents("x")) yield ev;
      },
    });
    const res2 = (await executor.execute(
      makeInput([{ role: "user", content: "again" }])
    )) as Response;
    assert.equal(res2.status, 200);
    assert.equal(
      _grokBotInternals.pendingCleanupCount(),
      1,
      "queue item must survive roster failure"
    );
  });

  it("queues the agent for retry when the delete call fails", async () => {
    t.failDelete = true;
    t.watchEvents = settledWatchEvents("ok");
    try {
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }])
      )) as Response;
      assert.equal(res.status, 200);
      assert.equal(
        _grokBotInternals.pendingCleanupCount(),
        1,
        "a failed delete is queued so the sweeper can retry it"
      );

      // Drain the queue so the shared queue file does not leak into later tests.
      t.failDelete = false;
      const drainStart = t.calls.length;
      const drained = (await executor.execute(
        makeInput([{ role: "user", content: "next" }])
      )) as Response;
      assert.equal(drained.status, 200, "the drain request must succeed on its own");
      const drainedDeletes = t.calls
        .slice(drainStart)
        .filter((c) => c.method === "DeleteGrokBotAgent");
      assert.equal(
        drainedDeletes.length,
        2,
        "the drain request deletes the queued agent and its own"
      );
      assert.equal(_grokBotInternals.pendingCleanupCount(), 0);
    } finally {
      t.failDelete = false;
    }
  });

  it("queues the agent when the create response carries no roster id", async () => {
    t.watchEvents = settledWatchEvents("ok");
    setGrokBotTransportForTests({
      async rpc(method: string, payload: Record<string, unknown>) {
        t.calls.push({ method, payload });
        if (method === "CreateGrokBotTemporalAgent") {
          // No `id`: the agent exists upstream but nothing names its roster row.
          return { agent: { legacyAgentId: String(payload.agentId), harness: "temporal" } };
        }
        if (method === "SendGrokBotUserMessage") return { dispatched: true };
        if (method === "ListGrokBotAgents") return { agents: [] };
        if (method === "DeleteGrokBotAgent") return {};
        return {};
      },
      async *watch() {
        for (const ev of settledWatchEvents("ok")) {
          yield ev as unknown as Record<string, unknown>;
        }
      },
    } as never);
    try {
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }])
      )) as Response;
      assert.equal(res.status, 200);
      assert.equal(
        t.calls.some((c) => c.method === "DeleteGrokBotAgent"),
        false,
        "nothing can be deleted without a roster row id"
      );
      assert.equal(
        _grokBotInternals.pendingCleanupCount(),
        1,
        "the agentId-only item is queued for the sweeper to resolve"
      );
    } finally {
      setGrokBotTransportForTests(null);
      installTransport(t);
      const queuePath = path.join(TEST_DATA_DIR, "grok-bot-pending-cleanups.json");
      fs.rmSync(queuePath, { force: true });
    }
  });

  it("deletes the agent when discovery fails after a successful send (review finding 4d-R1)", async () => {
    t.watchEvents = settledWatchEvents("unused");
    const callsBefore = t.calls.length;
    setGrokBotTransportForTests({
      async rpc(method: string, payload: Record<string, unknown>) {
        t.calls.push({ method, payload });
        if (method === "CreateGrokBotTemporalAgent") {
          t.lastAgentId = String(payload.agentId);
          return {
            agent: { id: "row-1", legacyAgentId: payload.agentId, harness: "temporal" },
          };
        }
        if (method === "SendGrokBotUserMessage") return { dispatched: true };
        if (method === "aiserver.v1.DashboardService/ListSandMcpTools")
          throw new Error("discovery boom");
        if (method === "DeleteGrokBotAgent") return {};
        return {};
      },
      async *watch() {
        for (const ev of settledWatchEvents("unused")) yield ev;
      },
    });
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "https://bridge.example.com",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.ok(res.status >= 400);
    const after = t.calls.slice(callsBefore);
    assert.equal(
      after.filter((c) => c.method === "DeleteGrokBotAgent").length,
      1,
      "a failed discovery still deletes the request's agent"
    );
  });

  it("deletes each request's agent and leaves no cleanup debt", async () => {
    t.watchEvents = settledWatchEvents("answer");
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    assert.equal(_grokBotInternals.pendingCleanupCount(), 0);

    t.watchEvents = settledWatchEvents("again");
    const before = t.calls.length;
    const res2 = (await executor.execute(
      makeInput([{ role: "user", content: "again" }])
    )) as Response;
    assert.equal(res2.status, 200);
    const after = t.calls.slice(before);
    assert.equal(
      after.filter((c) => c.method === "CreateGrokBotTemporalAgent").length,
      1,
      "a second request creates its own agent"
    );
    assert.equal(
      after.filter((c) => c.method === "DeleteGrokBotAgent").length,
      1,
      "and deletes it when the turn ends"
    );
    assert.equal(_grokBotInternals.pendingCleanupCount(), 0);
  });

  it("replays full history into the outgoing prompt", async () => {
    t.watchEvents = settledWatchEvents("second answer");
    await executor.execute(makeInput([{ role: "user", content: "MARKER_abc" }]));
    t.watchEvents = settledWatchEvents("ok");
    await executor.execute(
      makeInput([
        { role: "user", content: "MARKER_abc" },
        { role: "assistant", content: "first answer" },
        { role: "user", content: "again" },
      ])
    );
    const sends = t.calls.filter((c) => c.method === "SendGrokBotUserMessage");
    const text = sends[1].payload.text;
    assert.ok(
      typeof text === "string" && text.includes("MARKER_abc"),
      "second prompt must contain first-turn content"
    );
  });

  it("treats an absent running flag as finished after seeing the agent run", async () => {
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { entry: { kind: "send-message", message: { type: "text", content: "done" } } },
      terminal("submit_answer", "done"),
      { agent: {} },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
  });

  it("threads the connection token into its own transport (no cross-request sharing)", async () => {
    // Regression test for review finding r5: the access token must reach the
    // transport via the factory parameter, never via shared module state, so
    // two concurrent requests with different tokens cannot clobber each other.
    const seenByToken: Record<string, string[]> = {};
    setGrokBotTransportForTests((accessToken: string) => {
      seenByToken[accessToken] = seenByToken[accessToken] ?? [];
      return {
        async rpc(method: string, payload: Record<string, unknown>) {
          seenByToken[accessToken].push(method);
          if (method === "CreateGrokBotTemporalAgent") {
            return {
              agent: { id: "row-1", legacyAgentId: String(payload.agentId), harness: "temporal" },
            };
          }
          if (method === "DeleteGrokBotAgent") return {};
          return {};
        },
        async *watch(_method: string, payload: Record<string, unknown>) {
          // Minimal live-shaped settlement so the turn ends promptly.
          const agentId = (payload.cursors as Array<Record<string, unknown>>)?.[0]?.agentId;
          yield { agentState: { live: [{ agentId, isRunningTurn: true }] } };
          yield { agentState: { live: [{ agentId, isRunningTurn: false }] } };
        },
      } as never;
    });
    const execA = new GrokBotExecutor();
    const execB = new GrokBotExecutor();
    const inputA = {
      ...makeInput([{ role: "user", content: "a" }]),
      credentials: { accessToken: "token-A", refreshToken: "r", connectionId: "cA" },
    };
    const inputB = {
      ...makeInput([{ role: "user", content: "b" }]),
      credentials: { accessToken: "token-B", refreshToken: "r", connectionId: "cB" },
    };
    await Promise.allSettled([execA.execute(inputA), execB.execute(inputB)]);
    assert.deepEqual(seenByToken["token-A"], [
      "CreateGrokBotTemporalAgent",
      "SendGrokBotUserMessage",
      "DeleteGrokBotAgent",
    ]);
    assert.deepEqual(seenByToken["token-B"], [
      "CreateGrokBotTemporalAgent",
      "SendGrokBotUserMessage",
      "DeleteGrokBotAgent",
    ]);
    setGrokBotTransportForTests(null);
    installTransport(t);
  });

  it("gives each executor instance its own machineId", async () => {
    const machines = new Set<string>();
    setGrokBotTransportForTests((_accessToken: string) => {
      return {
        async rpc(method: string, payload: Record<string, unknown>) {
          if (method === "CreateGrokBotTemporalAgent") {
            return { agent: { id: "row-1", legacyAgentId: payload.agentId, harness: "temporal" } };
          }
          if (method === "SendGrokBotUserMessage") {
            machines.add(String(payload.machineId));
            return { dispatched: true };
          }
          if (method === "DeleteGrokBotAgent") return {};
          return {};
        },
        async *watch(_method: string, payload: Record<string, unknown>) {
          const agentId = (payload.cursors as Array<Record<string, unknown>>)[0]?.agentId;
          yield { agentState: { live: [{ agentId, isRunningTurn: true }] } };
          yield { agentState: { live: [{ agentId, isRunningTurn: false }] } };
        },
      } as never;
    });
    const execA = new GrokBotExecutor();
    const execB = new GrokBotExecutor();
    await execA.execute(makeInput([{ role: "user", content: "a" }]));
    await execB.execute(makeInput([{ role: "user", content: "b" }]));
    assert.equal(machines.size, 2, "each executor instance must have a distinct machineId");
    setGrokBotTransportForTests(null);
    installTransport(t);
  });

  it("stream mode deletes the agent only after the SSE body finishes", async () => {
    // Regression test for review finding r7: the non-stream path deletes after
    // await collect, but the stream path used to delete in execute's finally
    // while the watch stream was still live.
    const events: string[] = [];
    let releaseTurn!: () => void;
    const gate = new Promise<void>((r) => {
      releaseTurn = r;
    });
    // Release the turn shortly after the watch starts; the assertion then
    // checks the delete landed after settlement regardless of chunk timing.
    const releaseTimer = setTimeout(() => releaseTurn(), 50);
    setGrokBotTransportForTests(
      () =>
        ({
          async rpc(method: string, payload: Record<string, unknown>) {
            events.push(`rpc:${method}`);
            if (method === "CreateGrokBotTemporalAgent") {
              return {
                agent: { id: "row-1", legacyAgentId: String(payload.agentId), harness: "temporal" },
              };
            }
            if (method === "SendGrokBotUserMessage") return { dispatched: true };
            if (method === "DeleteGrokBotAgent") return {};
            return {};
          },
          async *watch(_method: string, payload: Record<string, unknown>) {
            const agentId = (payload.cursors as Array<Record<string, unknown>>)[0]?.agentId;
            events.push("watch:start");
            yield { agentState: { live: [{ agentId, isRunningTurn: true }] } };
            await gate;
            events.push("watch:settled");
            yield terminal("submit_answer", "streamed");
            yield { agentState: { live: [{ agentId, isRunningTurn: false }] } };
          },
        }) as never
    );
    const res = (await new GrokBotExecutor().execute(
      makeInput([{ role: "user", content: "hi" }], true)
    )) as Response;
    if (!res.body) {
      throw new Error("expected a readable SSE body");
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let text = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      text += dec.decode(value, { stream: true });
    }
    clearTimeout(releaseTimer);
    assert.match(text, /chat\.completion\.chunk/);
    assert.match(text, /data: \[DONE\]/);
    const settledAt = events.indexOf("watch:settled");
    const deleteAt = events.indexOf("rpc:DeleteGrokBotAgent");
    assert.ok(settledAt >= 0, "watch must settle");
    assert.ok(
      deleteAt > settledAt,
      "the agent outlives the SSE body and is deleted after the turn settles"
    );
    setGrokBotTransportForTests(null);
    installTransport(t);
  });

  it("drain keeps items enqueued mid-drain instead of overwriting them", async () => {
    // Regression test for review finding r8: the old writeQueue(remaining)
    // snapshot written after the delete loop silently dropped cleanup items
    // enqueued by a concurrent path while the drain was awaiting deletes.
    const queuePath = path.join(TEST_DATA_DIR, "grok-bot-pending-cleanups.json");
    const item1 = {
      connectionId: "conn-1",
      agentId: "agent-old",
      createdAt: "2026-09-23T00:00:00.000Z",
    };
    const item2 = {
      connectionId: "conn-1",
      agentId: "agent-mid",
      createdAt: "2026-09-23T00:00:01.000Z",
    };
    fs.writeFileSync(queuePath, JSON.stringify([item1]));
    let wrote = false;
    setGrokBotTransportForTests(
      () =>
        ({
          async rpc(method: string, payload: Record<string, unknown>) {
            if (method === "ListGrokBotAgents") {
              if (!wrote) {
                wrote = true;
                // Simulate a concurrent enqueue landing mid-drain.
                fs.writeFileSync(queuePath, JSON.stringify([item1, item2]));
              }
              return { agents: [{ id: "row-9", agentId: item1.agentId }] };
            }
            if (method === "CreateGrokBotTemporalAgent") {
              return {
                agent: { id: "row-1", legacyAgentId: String(payload.agentId), harness: "temporal" },
              };
            }
            if (method === "SendGrokBotUserMessage") return { dispatched: true };
            if (method === "DeleteGrokBotAgent") return {};
            return {};
          },
          async *watch(_method: string, payload: Record<string, unknown>) {
            const agentId = (payload.cursors as Array<Record<string, unknown>>)[0]?.agentId;
            yield { agentState: { live: [{ agentId, isRunningTurn: true }] } };
            yield { entry: { kind: "send-message", message: { type: "text", content: "ok" } } };
            yield terminal("submit_answer", "ok");
            yield { agentState: { live: [{ agentId, isRunningTurn: false }] } };
          },
        }) as never
    );
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const remainingOnDisk = JSON.parse(fs.readFileSync(queuePath, "utf-8")) as Array<{
      agentId?: string;
    }>;
    assert.deepEqual(
      remainingOnDisk.map((i) => i.agentId),
      ["agent-mid"],
      "mid-drain enqueue must survive the drain"
    );
    setGrokBotTransportForTests(null);
    installTransport(t);
  });

  it("collects the assistant answer from live-shaped rows frames", async () => {
    // No watchEvents override: the default generator replays the measured
    // live shape (agentState.live running flags + base64 rows entries whose
    // clientNonce matches the send messageId).
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const json = await res.json();
    assert.equal(json.choices[0].message.content, "answer");
    const watchCall = t.calls.find((c) => c.method === "WatchGrokBotTranscripts");
    assert.ok(watchCall, "watch not called");
  });

  it("aborts the watch on cancel but still deletes the agent", async () => {
    const ac = new AbortController();
    t.watchEvents = [{ agent: { agentId: "nonce-1", isRunningTurn: true } }, { __abort: true }];
    setGrokBotTransportForTests({
      async rpc(method: string, payload: Record<string, unknown>) {
        t.calls.push({ method, payload });
        if (method === "CreateGrokBotTemporalAgent") {
          t.lastAgentId = String(payload.agentId);
          queueMicrotask(() => ac.abort());
          return {
            agent: { id: "row-1", legacyAgentId: payload.agentId, harness: "temporal" },
          };
        }
        if (method === "DeleteGrokBotAgent") return {};
        if (method === "ListGrokBotAgents") return { agents: t.rosterRows };
        return {};
      },
      async *watch() {
        yield t.watchEvents[0];
        while (!ac.signal.aborted) {
          await new Promise((r) => setTimeout(r, 5));
        }
        throw new Error("aborted");
      },
    });
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, ac.signal)
    )) as Response;
    assert.ok(res.status >= 400);
    assert.equal(
      t.calls.filter((c) => c.method === "DeleteGrokBotAgent").length,
      1,
      "a cancelled turn still deletes its agent"
    );
  });
  it("a plain concurrent turn never stops another turn's bridge", async () => {
    const { getTransport } = await import("../../open-sse/executors/grok-bot.ts");
    const first = makeTransport();
    const second = makeTransport();
    let ready!: () => void;
    const started = new Promise<void>((resolve) => {
      ready = resolve;
    });
    let release!: () => void;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    first.watchEventsAsync = async function* () {
      yield { agent: { isRunningTurn: true } };
      ready();
      await held;
      yield { entry: { kind: "send-message", message: { type: "text", content: "first answer" } } };
      yield { agent: { isRunningTurn: false } };
    };
    installTransport(first);
    const firstTransport = getTransport("first");
    installTransport(second);
    const secondTransport = getTransport("second");
    setGrokBotTransportForTests((token) => (token === "first" ? firstTransport : secondTransport));
    let stops = 0;
    executor.setBridgeControllerForTests({
      async start() {
        return { url: fakeBridgeUrl("concurrent") };
      },
      async stop() {
        stops += 1;
      },
    });
    const inputA = makeInput([{ role: "user", content: "A" }], false, undefined, {
      url: "https://bridge.example.com",
    });
    inputA.credentials.accessToken = "first";
    const pendingA = executor.execute(inputA);
    try {
      await started;
      const inputB = makeInput([{ role: "user", content: "B" }]);
      inputB.credentials.accessToken = "second";
      const responseB = (await executor.execute(inputB)) as Response;
      assert.equal(responseB.status, 200);
      assert.equal(stops, 0, "B never acquired bridge ownership");
    } finally {
      release();
      const responseA = (await pendingA) as Response;
      assert.equal(responseA.status, 200);
      assert.equal(first.calls.filter((c) => c.method === "DeleteGrokBotAgent").length, 1);
    }
  });

  it("a failed start uses its own controller while another bridge turn succeeds", async () => {
    const { getTransport } = await import("../../open-sse/executors/grok-bot.ts");
    const first = makeTransport();
    const second = makeTransport();
    let ready!: () => void;
    const started = new Promise<void>((resolve) => {
      ready = resolve;
    });
    let release!: () => void;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    first.watchEventsAsync = async function* () {
      yield { agent: { isRunningTurn: true } };
      ready();
      await held;
      yield { entry: { kind: "send-message", message: { type: "text", content: "first answer" } } };
      yield { agent: { isRunningTurn: false } };
    };
    installTransport(first);
    const firstTransport = getTransport("first");
    installTransport(second);
    const secondTransport = getTransport("second");
    setGrokBotTransportForTests((token) => (token === "first" ? firstTransport : secondTransport));
    let factories = 0;
    let closesA = 0;
    let stopsA = 0;
    let stopsB = 0;
    executor.setBridgeControllerForTests(() => {
      factories += 1;
      return factories === 1
        ? {
            async start() {
              return {
                url: fakeBridgeUrl("concurrent"),
                close() {
                  closesA += 1;
                },
              };
            },
            async stop() {
              stopsA += 1;
            },
          }
        : {
            async start() {
              throw new Error("B startup failed");
            },
            async stop() {
              stopsB += 1;
            },
          };
    });
    const inputA = makeInput([{ role: "user", content: "A" }], false, undefined, {
      url: "https://bridge.example.com",
    });
    inputA.credentials.accessToken = "first";
    const pendingA = executor.execute(inputA);
    try {
      await started;
      const inputB = makeInput([{ role: "user", content: "B" }], false, undefined, {
        url: "https://bridge.example.com",
      });
      inputB.credentials.accessToken = "second";
      const responseB = (await executor.execute(inputB)) as Response;
      assert.equal(responseB.status, 502);
      assert.equal(factories, 2);
      assert.equal(stopsA, 0);
      assert.equal(closesA, 0);
      assert.ok(stopsB > 0, "B cleans only its own failed start");
    } finally {
      release();
      const responseA = (await pendingA) as Response;
      assert.equal(responseA.status, 200);
      assert.equal(closesA, 1);
      assert.equal(stopsA, 0);
      assert.equal(first.calls.filter((c) => c.method === "DeleteGrokBotAgent").length, 1);
    }
  });
});
