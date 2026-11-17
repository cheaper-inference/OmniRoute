import { before, after, describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  prepareExecutorFixture,
  cleanupExecutorFixture,
  GrokBotExecutor,
  setGrokBotTransportForTests,
  _grokBotInternals,
  type FakeTransport,
  makeTransport,
  installTransport,
  fakeBridgeUrl,
  makeInput,
  settledWatchEvents,
} from "../helpers/grokBotExecutorFixture.ts";
before(prepareExecutorFixture);
after(cleanupExecutorFixture);

describe("GrokBotExecutor", () => {
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

  for (const failure of ["failed turn", "caller abort", "deadline"] as const) {
    it(`releases its stale watch timer after ${failure}`, async (context) => {
      const timers = new Set<ReturnType<typeof setTimeout>>();
      const realSetTimeout = globalThis.setTimeout;
      const realClearTimeout = globalThis.clearTimeout;
      context.mock.method(globalThis, "setTimeout", (...args: Parameters<typeof setTimeout>) => {
        const handle = realSetTimeout(...args);
        if (args[1] === 90_000) timers.add(handle);
        return handle;
      });
      context.mock.method(
        globalThis,
        "clearTimeout",
        (handle: Parameters<typeof clearTimeout>[0]) => {
          timers.delete(handle as ReturnType<typeof setTimeout>);
          realClearTimeout(handle);
        }
      );
      const controller = new AbortController();
      let now = Date.now();
      if (failure === "deadline") context.mock.method(Date, "now", () => now);
      t.watchEventsAsync = async function* () {
        yield { agentState: { live: [{ agentId: t.lastAgentId, isRunning: true }] } };
        if (failure === "failed turn") {
          yield { turnFailed: true };
        } else if (failure === "caller abort") {
          controller.abort();
          yield {};
        } else {
          now += 240_001;
          throw new Error("read dropped at deadline");
        }
      };
      try {
        const response = (await executor.execute(
          makeInput([{ role: "user", content: "hi" }], false, controller.signal)
        )) as Response;
        assert.ok(response.status >= 400);
        assert.equal(t.calls.filter((call) => call.method === "DeleteGrokBotAgent").length, 1);
        assert.equal(timers.size, 0, "settled watch must not retain its stale timer");
      } finally {
        // Keep the red baseline bounded: test-owned cleanup does not satisfy the assertion above.
        for (const timer of timers) realClearTimeout(timer);
      }
    });
  }

  it("owns native RPC payloads without forwarding JSON inference recovery fields or mutating input", async () => {
    t.watchEvents = settledWatchEvents("native answer");
    const input = makeInput([{ role: "user", content: "hi" }]);
    Object.assign(input.body, {
      reasoning_effort: "unsupported",
      thinking: { type: "enabled", budget_tokens: 1 },
      generationConfig: { thinkingConfig: { thinkingBudget: -1 } },
      max_tokens: 1,
    });
    const before = structuredClone(input.body);
    const response = (await executor.execute(input)) as Response;
    assert.equal(response.status, 200);
    assert.equal((await response.json()).choices[0].message.content, "native answer");
    const sends = t.calls.filter((call) => call.method === "SendGrokBotUserMessage");
    assert.equal(sends.length, 1);
    assert.equal(typeof sends[0].payload.text, "string");
    for (const { payload } of t.calls) {
      for (const key of ["reasoning_effort", "thinking", "generationConfig", "max_tokens"]) {
        assert.equal(Object.hasOwn(payload, key), false, key);
      }
    }
    assert.equal(t.calls.filter((call) => call.method === "CreateGrokBotTemporalAgent").length, 1);
    assert.equal(t.calls.filter((call) => call.method === "DeleteGrokBotAgent").length, 1);
    assert.deepEqual(input.body, before);
  });

  it("keeps one copy when the same answer arrives twice", async () => {
    const answer = "I will check the pipeline.";
    const row = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        message: { type: "text", content: answer },
      })
    ).toString("base64");
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { entry: { kind: "send-message", message: { type: "text", content: answer } } },
      { rows: { entries: [{ body: row }] } },
      { agent: { isRunningTurn: false } },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.choices[0].message.content, answer);
  });

  it("keeps both parts when a different sentence comes between repeats", async () => {
    const first = "first sentence.";
    const second = "second sentence.";
    const row = (text: string) =>
      Buffer.from(
        JSON.stringify({
          kind: "send-message",
          message: { type: "text", content: text },
        })
      ).toString("base64");
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { rows: { entries: [{ body: row(first) }] } },
      { rows: { entries: [{ body: row(second) }] } },
      { rows: { entries: [{ body: row(first) }] } },
      { agent: { isRunningTurn: false } },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.choices[0].message.content, first + second + first);
  });

  it("accepts a measured assistant row when running becomes false", async () => {
    const events = [
      { agentState: { live: [{ agentId: "replace", isRunning: true }] } },
      {
        rows: {
          entries: [
            {
              body: Buffer.from(
                JSON.stringify({
                  kind: "send-message",
                  clientNonce: null,
                  message: { type: "text", content: "OK" },
                })
              ).toString("base64"),
            },
          ],
        },
      },
      { agentState: { live: [{ agentId: "replace", isRunning: false }] } },
    ];
    setGrokBotTransportForTests({
      async rpc(method: string, payload: Record<string, unknown>) {
        t.calls.push({ method, payload });
        if (method === "CreateGrokBotTemporalAgent")
          return { agent: { id: "row-1", legacyAgentId: payload.agentId, harness: "temporal" } };
        return {};
      },
      async *watch() {
        const agentId = String(
          t.calls.find((call) => call.method === "CreateGrokBotTemporalAgent")?.payload.agentId
        );
        for (const event of events) {
          const encoded = JSON.stringify(event).replaceAll("replace", agentId);
          yield JSON.parse(encoded);
        }
      },
    });
    try {
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }])
      )) as Response;
      assert.equal((await res.clone().json()).error?.message ?? res.status, 200);
      assert.equal((await res.json()).choices[0].message.content, "OK");
    } finally {
      setGrokBotTransportForTests(null);
      installTransport(t);
    }
  });

  it("starts the public bridge for a normal tool request", async () => {
    const previous = process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://omni.minxihou.site/grok-bridge";
    let spawned = false;
    let seenBaseUrl = "";
    executor.setBridgeControllerForTests({
      async start(publicBaseUrl?: string) {
        seenBaseUrl = publicBaseUrl ?? "";
        return { url: fakeBridgeUrl("one"), call: () => "bridge-ok" };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("bridge-ok");
    try {
      const input = makeInput([{ role: "user", content: "use tool" }]);
      delete (input.body as { grokBotBridge?: unknown }).grokBotBridge;
      (input.body as { tools?: unknown[] }).tools = [
        { type: "function", function: { name: "lookup" } },
      ];
      const res = (await executor.execute(input)) as Response;
      const body = await res.json();
      assert.equal(body.choices[0].message.content, "bridge-ok");
      assert.equal(seenBaseUrl, "https://omni.minxihou.site/grok-bridge");
      assert.equal(spawned, false);
      assert.equal(
        t.calls.some((call) => call.method === "aiserver.v1.DashboardService/ListSandMcpTools"),
        true
      );
    } finally {
      if (previous === undefined) delete process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("rejects idle without explicit completion", async () => {
    t.watchEvents = [{ agent: { isRunningTurn: true } }, { agent: { isRunningTurn: false } }];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 502);
    assert.equal((await res.json()).error.type, "incomplete_turn");
  });

  it("traces watch frame shape without the answer text", async () => {
    const previous = process.env.GROK_BOT_WATCH_TRACE;
    process.env.GROK_BOT_WATCH_TRACE = "1";
    const lines: string[] = [];
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { entry: { kind: "send-message", message: { type: "text", content: "secret-answer" } } },
      { agent: { isRunningTurn: false } },
    ];
    try {
      const input = makeInput([{ role: "user", content: "hi" }]);
      (input as { log: { warn: (...args: unknown[]) => void } | null }).log = {
        warn: (...args) => lines.push(args.map(String).join(" ")),
      };
      const res = (await executor.execute(input)) as Response;
      assert.equal(res.status, 200);
      const trace = lines.filter((line) => line.includes("GROK_BOT_WATCH")).join("\n");
      assert.equal(trace.includes("entry=send-message"), true);
      assert.equal(trace.includes("secret-answer"), false);
    } finally {
      if (previous === undefined) delete process.env.GROK_BOT_WATCH_TRACE;
      else process.env.GROK_BOT_WATCH_TRACE = previous;
    }
  });

  it("returns a tool call when the turn ends without text", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = [{ agent: { isRunningTurn: true } }, { agent: { isRunningTurn: false } }];
      t.onSend = async (payload) => {
        const config = JSON.parse(String(payload.mcpConfigJson)) as {
          mcpServers: { bridge: { url: string; headers: { Authorization: string } } };
        };
        const match = /\/grok-bridge\/([A-Za-z0-9_-]{22})\/mcp$/.exec(config.mcpServers.bridge.url);
        if (!match) return;
        const challenge = config.mcpServers.bridge.headers.Authorization.slice("Bearer ".length);
        const { getGrokBotBridgeRegistry } =
          await import("../../open-sse/services/grokBotBridgeRegistry.ts");
        const found = getGrokBotBridgeRegistry().lookup(match[1]);
        if (found.kind !== "active") return;
        await fetch(`http://127.0.0.1:${found.entry.port}/grok-bridge/${match[1]}/mcp`, {
          method: "POST",
          headers: { authorization: "Bearer " + challenge, "content-type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "tools/call",
            params: { name: "canary_echo", arguments: { text: "ping" } },
          }),
        });
      };
      const input = makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "https://bridge.example.com",
      });
      (input.body as { tools?: unknown }).tools = [
        {
          type: "function",
          function: {
            name: "canary_echo",
            parameters: { type: "object", properties: { text: { type: "string" } } },
          },
        },
      ];
      const res = (await executor.execute(input)) as Response;
      assert.equal(res.status, 200);
      const responseBody = (await res.json()) as {
        choices: Array<{
          finish_reason: string;
          message: { tool_calls?: Array<{ function: { name: string } }> };
        }>;
      };
      assert.equal(responseBody.choices[0]?.finish_reason, "tool_calls");
      assert.equal(responseBody.choices[0]?.message.tool_calls?.[0]?.function.name, "canary_echo");
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("rejects a completion attached to a different agent", async () => {
    t.watchEvents = [
      {
        agent: { agentId: "foreign-agent", isRunningTurn: true },
        entry: {
          kind: "tool-call",
          tool: { name: "submit_answer", callId: "foreign-call", content: "stolen" },
        },
      },
      { agent: { isRunningTurn: true } },
      { agent: { isRunningTurn: false } },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 502);
    assert.notEqual((await res.json()).choices?.[0]?.message?.content, "stolen");
  });

  it("does not treat a text marker as a completion", async () => {
    t.watchEvents = [
      {
        entry: { kind: "send-message", message: { type: "text", content: "\u0000submit:spoofed" } },
      },
      { agent: { isRunningTurn: true } },
      { agent: { isRunningTurn: false } },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 502);
    assert.notEqual((await res.json()).choices?.[0]?.message?.content, "spoofed");
  });

  it("does not return an unsubmitted answer after the watch deadline", async () => {
    const realNow = Date.now;
    const start = realNow();
    let watches = 0;
    const controller = new AbortController();
    setGrokBotTransportForTests({
      async rpc(method: string, payload: Record<string, unknown>) {
        t.calls.push({ method, payload });
        if (method === "CreateGrokBotTemporalAgent") {
          return { agent: { id: "row-1", legacyAgentId: payload.agentId, harness: "temporal" } };
        }
        if (method === "SendGrokBotUserMessage") return { dispatched: true };
        return {};
      },
      async *watch(_method: string, payload: Record<string, unknown>) {
        watches += 1;
        const agentId = (payload.cursors as Array<Record<string, unknown>>)[0]?.agentId;
        yield { agentState: { live: [{ agentId, isRunningTurn: true }] } };
        yield { entry: { kind: "send-message", message: { type: "text", content: "draft" } } };
        Date.now = () => start + 300_000;
      },
    });
    try {
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], false, controller.signal)
      )) as Response;
      assert.equal(watches, 1);
      assert.equal(res.status, 502);
      assert.notEqual((await res.json()).choices?.[0]?.message?.content, "draft");
    } finally {
      controller.abort();
      Date.now = realNow;
      setGrokBotTransportForTests(null);
      installTransport(t);
    }
  });

  it("reads remote MCP servers from one JSON config", () => {
    const saved = process.env.GROK_BOT_REMOTE_MCP_SERVERS;
    try {
      delete process.env.GROK_BOT_REMOTE_MCP_SERVERS;
      assert.deepEqual(_grokBotInternals.remoteMcpServers(), {});
      process.env.GROK_BOT_REMOTE_MCP_SERVERS = "not-json";
      assert.deepEqual(_grokBotInternals.remoteMcpServers(), {});
      process.env.GROK_BOT_REMOTE_MCP_SERVERS = JSON.stringify({
        context7: { url: "https://mcp.context7.com/mcp" },
        exa: { url: "https://mcp.exa.ai/mcp", headers: { Authorization: "Bearer exa-test" } },
        firecrawl: {
          url: "https://mcp.firecrawl.dev/v2/mcp",
          headers: { Authorization: "Bearer fire-test" },
        },
        tavily: {
          url: "https://mcp.tavily.com/mcp",
          headers: { Authorization: "Bearer tav-test" },
        },
        jina: {
          url: "https://mcp.jina.ai/v1",
          headers: { Authorization: "Bearer jina-test", bad: 1 },
        },
        skipped: { headers: { Authorization: "Bearer unused" } },
      });
      const servers = _grokBotInternals.remoteMcpServers();
      assert.deepEqual(Object.keys(servers), ["context7", "exa", "firecrawl", "tavily", "jina"]);
      assert.deepEqual(servers.context7, { url: "https://mcp.context7.com/mcp" });
      assert.deepEqual(servers.jina.headers, { Authorization: "Bearer jina-test" });
    } finally {
      if (saved === undefined) delete process.env.GROK_BOT_REMOTE_MCP_SERVERS;
      else process.env.GROK_BOT_REMOTE_MCP_SERVERS = saved;
    }
  });

  it("keeps a system line bare and drops a numeric content", async () => {
    executor.setBridgeControllerForTests(null);
    const input = makeInput([{ role: "user", content: "hi" }]);
    (input.body as { messages: unknown[] }).messages = [
      { role: "system", content: "be brief" },
      { role: "user", content: 123 },
      { role: "assistant", content: "", tool_calls: "not-an-array" },
      { role: "user", content: "hi" },
    ];
    const res = (await executor.execute(input)) as Response;
    assert.equal(res.status, 200);
    const send = t.calls.find((call) => call.method === "SendGrokBotUserMessage");
    const text = String(send?.payload.text);
    assert.match(text, /^be brief\n/);
    assert.equal(text.includes("System:"), false);
    assert.equal(text.includes("123"), false);
    assert.equal(text.includes("Assistant called"), false);
    assert.match(text, /User: hi/);
  });

  it("skips a null entry in the message list", async () => {
    executor.setBridgeControllerForTests(null);
    const input = makeInput([{ role: "user", content: "hi" }]);
    (input.body as { messages: unknown[] }).messages = [null, { role: "user", content: "hi" }];
    const res = (await executor.execute(input)) as Response;
    assert.equal(res.status, 200);
    const send = t.calls.find((call) => call.method === "SendGrokBotUserMessage");
    assert.match(String(send?.payload.text), /User: hi/);
  });

  it("creates its own agent even when the connection carries a saved one", async () => {
    const saved = makeInput([{ role: "user", content: "again" }]) as ReturnType<
      typeof makeInput
    > & {
      credentials: { providerSpecificData?: Record<string, unknown> };
    };
    saved.credentials.providerSpecificData = {
      grokBotAgent: { agentId: "agent-saved", rowId: "row-saved" },
    };
    const res = (await executor.execute(saved)) as Response;
    assert.equal(res.status, 200);
    const create = t.calls.find((call) => call.method === "CreateGrokBotTemporalAgent");
    assert.ok(create, "inference must not adopt the console's durable agent");
    const send = t.calls.find((call) => call.method === "SendGrokBotUserMessage");
    assert.notEqual(send?.payload.agentId, "agent-saved");
    assert.equal(
      t.calls.find((call) => call.method === "DeleteGrokBotAgent")?.payload.id,
      "row-1",
      "the request deletes the agent it created"
    );
    assert.equal(
      t.calls.some(
        (call) => call.method === "DeleteGrokBotAgent" && call.payload.id === "row-saved"
      ),
      false,
      "the console agent is never deleted by inference"
    );
  });

  it("gives each request on one connection its own agent", async () => {
    executor.setBridgeControllerForTests(null);
    const first = (await executor.execute(
      makeInput([{ role: "user", content: "one" }])
    )) as Response;
    const second = (await executor.execute(
      makeInput([{ role: "user", content: "two" }])
    )) as Response;
    assert.equal(first.status, 200);
    assert.equal(second.status, 200);
    assert.equal(t.calls.filter((call) => call.method === "CreateGrokBotTemporalAgent").length, 2);
    const sent = t.calls.filter((call) => call.method === "SendGrokBotUserMessage");
    assert.equal(sent.length, 2);
    assert.notEqual(sent[0]?.payload.agentId, sent[1]?.payload.agentId);
    assert.equal(
      t.calls.filter((call) => call.method === "DeleteGrokBotAgent").length,
      2,
      "each request deletes the agent it created"
    );
  });

  it("answers a plain question and deletes the agent by row id", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = settledWatchEvents("hello back");
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(res.status, 200);
    const json = await res.json();
    assert.equal(json.choices[0].message.content, "hello back");
    const send = t.calls.find((c) => c.method === "SendGrokBotUserMessage");
    assert.ok(send, "send-message not called");
    const bridgeConfig = JSON.parse(String(send.payload.mcpConfigJson));
    assert.equal(bridgeConfig.mcpServers.bridge.url, "http://127.0.0.1:9/mcp");
    assert.match(String(send.payload.text), /GetMcpTools/);
    assert.match(String(send.payload.text), /Discovery of that one tool is allowed/);
    assert.match(String(send.payload.text), /discovery cannot find the tool/);
    assert.match(String(send.payload.text), /bridge_value tool/);
    assert.match(String(send.payload.text), /challenge test-challenge/);
    assert.match(String(send.payload.text), /returned value verbatim/);
    assert.match(String(send.payload.text), /TOOL_UNAVAILABLE/);
    assert.equal(
      t.calls.some((c) => c.method === "aiserver.v1.DashboardService/ListSandMcpTools"),
      true,
      "bridge request must discover tools before sending"
    );
    const discoveryIndex = t.calls.findIndex(
      (c) => c.method === "aiserver.v1.DashboardService/ListSandMcpTools"
    );
    const sendIndex = t.calls.findIndex((c) => c.method === "SendGrokBotUserMessage");
    assert.ok(discoveryIndex >= 0 && discoveryIndex < sendIndex);
    const discoveryConfig = JSON.parse(String(t.calls[discoveryIndex]?.payload.mcpConfigJson));
    assert.equal(discoveryConfig.mcpServers.bridge.url, "http://127.0.0.1:9/mcp");
    assert.deepEqual(t.calls[discoveryIndex]?.payload.serverIdentifiers, ["bridge"]);
    const deletes = t.calls.filter((call) => call.method === "DeleteGrokBotAgent");
    assert.equal(deletes.length, 1, "the turn deletes exactly one agent");
    assert.equal(
      deletes[0]?.payload.id,
      "row-1",
      "and targets the row id the create call returned"
    );
  });

  it("returns the bridge tool result instead of the model text", async () => {
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
  });

  it("rejects a bridge call instead of returning the model text", async () => {
    executor.setBridgeControllerForTests({
      async start() {
        return {
          url: fakeBridgeUrl("reject"),
          call() {
            throw new Error("Rejected challenge");
          },
        };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("model said something else");
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "wrong",
      })
    )) as Response;
    assert.equal(res.status, 502);
    assert.match(await res.text(), /bridge_rejected/);
  });

  it("reports a bridge tool that was not called", async () => {
    executor.setBridgeControllerForTests({
      async start() {
        return {
          url: fakeBridgeUrl("unused"),
        };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("TOOL_UNAVAILABLE");
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(res.status, 502);
    assert.match(await res.text(), /bridge_not_called/);
  });

  it("rejects a streamed tool turn that answers without calling the bridge", async () => {
    executor.setBridgeControllerForTests({
      async start() {
        return {
          url: "https://bridge.example.com/grok-bridge/plainstreamxxxxxxxxxx1/mcp",
          invocations: [],
        };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("I will use lookup for this.");
    const input = makeInput([{ role: "user", content: "check it" }], true, undefined, {
      url: "http://127.0.0.1:9/mcp",
      challenge: "test-challenge",
    });
    (input.body as { tools?: unknown[] }).tools = [
      { type: "function", function: { name: "lookup" } },
    ];
    const res = (await executor.execute(input)) as Response;
    const reader = res.body!.getReader();
    const chunks: Uint8Array[] = [];
    for (;;) {
      const next = await reader.read();
      if (next.done) break;
      chunks.push(next.value!);
    }
    const text = new TextDecoder().decode(Buffer.concat(chunks));
    assert.equal(res.status, 200);
    assert.match(text, /bridge_not_called/);
    assert.equal(text.includes("I will use lookup for this."), false);
  });

  it("returns plain text when the model names no tool", async () => {
    executor.setBridgeControllerForTests({
      async start() {
        return {
          url: "https://bridge.example.com/grok-bridge/plainstreamxxxxxxxxxx2/mcp",
          invocations: [],
        };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("nothing new since last time.");
    const input = makeInput([{ role: "user", content: "any result" }], true, undefined, {
      url: "http://127.0.0.1:9/mcp",
      challenge: "test-challenge",
    });
    (input.body as { tools?: unknown[] }).tools = [
      { type: "function", function: { name: "lookup" } },
    ];
    const res = (await executor.execute(input)) as Response;
    const reader = res.body!.getReader();
    const chunks: Uint8Array[] = [];
    for (;;) {
      const next = await reader.read();
      if (next.done) break;
      chunks.push(next.value!);
    }
    const text = new TextDecoder().decode(Buffer.concat(chunks));
    assert.equal(res.status, 200);
    assert.equal(text.includes("bridge_not_called"), false);
    assert.equal(text.includes("nothing new since last time."), true);
  });

  it("retries one new tunnel after the first tunnel fails", async () => {
    let starts = 0;
    executor.setBridgeControllerForTests({
      async start() {
        starts += 1;
        if (starts === 1) throw new Error("Bridge start failed");
        return {
          url: fakeBridgeUrl("retry"),
          call: () => "bridge-ok",
        };
      },
      async stop() {},
    });
    t.watchEvents = settledWatchEvents("model text");
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(res.status, 200);
    assert.equal(starts, 2);
    assert.equal((await res.json()).choices[0].message.content, "bridge-ok");
  });

  it("does not start a third tunnel after two failures", async () => {
    let starts = 0;
    executor.setBridgeControllerForTests({
      async start() {
        starts += 1;
        throw new Error("Bridge start failed");
      },
      async stop() {},
    });
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(res.status, 502);
    assert.equal(starts, 2);
  });

  it("streams SSE chunks and terminates with [DONE]", async () => {
    t.watchEvents = settledWatchEvents("streamed answer");
    const res = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], true)
    )) as Response;
    const text = await res.text();
    assert.match(text, /data: \{/);
    assert.match(text, /chat\.completion\.chunk/);
    assert.match(text, /data: \[DONE\]/);
  });

  it("streams a tool call when the turn ends without text", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = [{ agent: { isRunningTurn: true } }, { agent: { isRunningTurn: false } }];
      t.onSend = async (payload) => {
        const config = JSON.parse(String(payload.mcpConfigJson)) as {
          mcpServers: { bridge: { url: string; headers: { Authorization: string } } };
        };
        const match = /\/grok-bridge\/([A-Za-z0-9_-]{22})\/mcp$/.exec(config.mcpServers.bridge.url);
        if (!match) return;
        const challenge = config.mcpServers.bridge.headers.Authorization.slice("Bearer ".length);
        const { getGrokBotBridgeRegistry } =
          await import("../../open-sse/services/grokBotBridgeRegistry.ts");
        const found = getGrokBotBridgeRegistry().lookup(match[1]);
        if (found.kind !== "active") return;
        await fetch(`http://127.0.0.1:${found.entry.port}/grok-bridge/${match[1]}/mcp`, {
          method: "POST",
          headers: { authorization: "Bearer " + challenge, "content-type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "tools/call",
            params: { name: "canary_echo", arguments: { text: "ping" } },
          }),
        });
      };
      const input = makeInput([{ role: "user", content: "hi" }], true, undefined, {
        url: "https://bridge.example.com",
      });
      (input.body as { tools?: unknown }).tools = [
        {
          type: "function",
          function: {
            name: "canary_echo",
            parameters: { type: "object", properties: { text: { type: "string" } } },
          },
        },
      ];
      const res = (await executor.execute(input)) as Response;
      const text = await res.text();
      assert.match(text, /"name":"canary_echo"/);
      assert.match(text, /"finish_reason":"tool_calls"/);
      assert.match(text, /data: \[DONE\]/);
      assert.equal(text.includes("incomplete_turn"), false);
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("streams the assistant text ahead of the tool call", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      const textRow = Buffer.from(
        JSON.stringify({
          kind: "send-message",
          clientNonce: null,
          message: { type: "text", content: "calling now" },
        })
      ).toString("base64");
      t.watchEvents = [
        { agent: { isRunningTurn: true } },
        { rows: { entries: [{ body: textRow }] } },
        { agent: { isRunningTurn: false } },
      ];
      t.onSend = async (payload) => {
        const config = JSON.parse(String(payload.mcpConfigJson)) as {
          mcpServers: { bridge: { url: string; headers: { Authorization: string } } };
        };
        const match = /\/grok-bridge\/([A-Za-z0-9_-]{22})\/mcp$/.exec(config.mcpServers.bridge.url);
        if (!match) return;
        const challenge = config.mcpServers.bridge.headers.Authorization.slice("Bearer ".length);
        const { getGrokBotBridgeRegistry } =
          await import("../../open-sse/services/grokBotBridgeRegistry.ts");
        const found = getGrokBotBridgeRegistry().lookup(match[1]);
        if (found.kind !== "active") return;
        await fetch(`http://127.0.0.1:${found.entry.port}/grok-bridge/${match[1]}/mcp`, {
          method: "POST",
          headers: { authorization: "Bearer " + challenge, "content-type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "tools/call",
            params: { name: "canary_echo", arguments: { text: "ping" } },
          }),
        });
      };
      const input = makeInput([{ role: "user", content: "hi" }], true, undefined, {
        url: "https://bridge.example.com",
      });
      (input.body as { tools?: unknown }).tools = [
        {
          type: "function",
          function: {
            name: "canary_echo",
            parameters: { type: "object", properties: { text: { type: "string" } } },
          },
        },
      ];
      const res = (await executor.execute(input)) as Response;
      const text = await res.text();
      const contentAt = text.indexOf("calling now");
      const callAt = text.indexOf("canary_echo");
      assert.ok(contentAt >= 0 && callAt > contentAt);
      assert.match(text, /"finish_reason":"tool_calls"/);
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });
});
