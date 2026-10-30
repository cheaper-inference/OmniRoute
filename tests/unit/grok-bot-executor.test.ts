import test, { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-grok-bot-exec-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { GrokBotExecutor, setGrokBotTransportForTests, _grokBotInternals } =
  await import("../../open-sse/executors/grok-bot.ts");

type WatchEvent = Record<string, unknown>;

type FakeTransport = {
  calls: { method: string; payload: Record<string, unknown> }[];
  rosterRows: Record<string, unknown>[];
  rosterEcho: boolean;
  discoveredTools: string[];
  legacyTools: string[];
  /** Cursor-shaped entries: name is prefixed, toolName holds the raw name. */
  prefixedTools: { name: string; toolName: string }[];
  lastAgentId: string;
  lastMessageId: string;
  failDelete: boolean;
  createBehavior: "ok" | "missing-agent" | "id-mismatch" | "wrong-harness" | "timeout";
  watchEvents: WatchEvent[];
  /** Test hook fired after the SendGrokBotUserMessage payload validates. */
  onSend?: (payload: Record<string, unknown>) => void | Promise<void>;
  /**
   * Async watch override for escalation tests: the fake races this iterator
   * against the watch signal so cancel propagates like the live transport.
   */
  watchEventsAsync?: () => AsyncIterable<unknown>;
  stampAgentId?: boolean;
};

function makeTransport(): FakeTransport {
  return {
    calls: [],
    rosterRows: [],
    rosterEcho: false,
    discoveredTools: ["bridge_value"],
    legacyTools: [],
    prefixedTools: [],
    lastAgentId: "",
    lastMessageId: "",
    failDelete: false,
    createBehavior: "ok",
    watchEvents: [],
    onSend: undefined,
    watchEventsAsync: undefined,
  };
}

/**
 * Race an async iterator against an AbortSignal, mirroring how the live
 * transport's fetch-driven watch iterator rejects on signal abort.
 */
async function* abortable<T>(
  iterable: AsyncIterable<T>,
  signal: AbortSignal | null
): AsyncIterable<T> {
  const iterator = iterable[Symbol.asyncIterator]();
  try {
    while (true) {
      if (signal?.aborted) throw new Error("aborted");
      const raceSignal = signal
        ? new Promise<never>((_, reject) =>
            signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true })
          )
        : null;
      const next = await (raceSignal
        ? Promise.race([iterator.next(), raceSignal])
        : iterator.next());
      if (next.done) return;
      yield next.value;
    }
  } finally {
    // Do not await: a generator suspended on a never-settling await blocks
    // return() forever, which would hang the abort propagation itself.
    void iterator.return?.();
  }
}

function b64Row(clientNonce: string, answer: string) {
  return {
    rows: {
      entries: [
        {
          entryId: `entry-echo-${Math.random().toString(36).slice(2)}`,
          body: Buffer.from(
            JSON.stringify({
              requestId: "req-1",
              clientNonce,
              kind: "send-message",
              message: { type: "text", content: "user prompt echo" },
            })
          ).toString("base64"),
        },
        {
          entryId: `entry-${Math.random().toString(36).slice(2)}`,
          body: Buffer.from(
            JSON.stringify({
              requestId: "req-1",
              clientNonce: null,
              kind: "send-message",
              message: { type: "text", content: answer },
            })
          ).toString("base64"),
        },
      ],
    },
  };
}

function installTransport(t: FakeTransport) {
  setGrokBotTransportForTests({
    async rpc(method: string, payload: Record<string, unknown>) {
      t.calls.push({ method, payload });
      if (method === "CreateGrokBotTemporalAgent") {
        t.lastAgentId = String(payload.agentId);
        if (t.createBehavior === "timeout") {
          const e = new Error("The operation timed out.");
          e.name = "TimeoutError";
          throw e;
        }
        // Stub-side shape guards mirroring the live server contract (measured
        // 2026-09-23): harness must be the proto3 enum numeric form, and the
        // roster-display fields are required. Injecting the old shapes back
        // into the product code must turn these tests red.
        if (
          payload.harness !== 2 ||
          typeof payload.name !== "string" ||
          typeof payload.description !== "string" ||
          typeof payload.title !== "string" ||
          typeof payload.avatarShape !== "string" ||
          typeof payload.avatarColor !== "string" ||
          typeof payload.kickstartRequested !== "boolean" ||
          typeof payload.introductionSuppressed !== "boolean"
        ) {
          return {};
        }
        const agentId = payload.agentId;
        if (t.createBehavior === "missing-agent") return {};
        if (t.createBehavior === "id-mismatch")
          return { agent: { id: "row-x", legacyAgentId: "other", harness: "temporal" } };
        if (t.createBehavior === "wrong-harness")
          return { agent: { id: "row-x", legacyAgentId: agentId, harness: "persistent" } };
        // Live shape (measured 2026-09-23): client nonce echoes as legacyAgentId,
        // roster primary key lives in agent.id, harness echoes lowercase.
        return { agent: { id: "row-1", legacyAgentId: agentId, harness: "temporal" } };
      }
      if (method === "SendGrokBotUserMessage") {
        // Live contract: flat text + machineId + messageId + sentAtMs; the
        // nested message{} shape is rejected upstream.
        if (
          typeof payload.text !== "string" ||
          typeof payload.machineId !== "string" ||
          typeof payload.messageId !== "string" ||
          typeof payload.sentAtMs !== "string" ||
          payload.sessionId !== ""
        ) {
          throw new Error("SendGrokBotUserMessage invalid payload");
        }
        t.lastMessageId = String(payload.messageId);
        await t.onSend?.(payload);
        return { dispatched: true };
      }
      if (method === "DeleteGrokBotAgent") {
        if (t.failDelete) {
          return Promise.reject(new Error("upstream 500"));
        }
        return {};
      }
      if (method === "ListGrokBotAgents") {
        if (t.rosterEcho) {
          return { agents: [{ id: "row-9", agentId: t.lastAgentId }] };
        }
        return { agents: t.rosterRows };
      }
      if (method === "aiserver.v1.DashboardService/ListSandMcpTools") {
        const tools = [...t.discoveredTools.map((name) => ({ name })), ...t.prefixedTools];
        const response: Record<string, unknown> = {
          servers: [{ status: "connected", tools }],
        };
        if (t.legacyTools.length > 0) {
          response.tools = t.legacyTools.map((name) => ({ name }));
        }
        return response;
      }
      return {};
    },
    async *watch(
      method: string,
      payload: Record<string, unknown>,
      opts?: { signal?: AbortSignal | null }
    ) {
      t.calls.push({ method, payload });
      // Default: live-shaped frames (measured 2026-09-23). Overrides come from
      // t.watchEvents (compatibility paths) — a single `false` sentinel yields
      // nothing extra so tests can inject raw sequences.
      const cursor = (payload.cursors as Array<Record<string, unknown>> | undefined)?.[0];
      const agentId = cursor?.agentId;
      // The current call is already recorded, so a count of one means this is
      // the first watch of the turn. Later watches may carry the generation a
      // cursorTooOld or cleared frame named.
      const earlierWatches = t.calls.filter(
        (call) => call.method === "WatchGrokBotTranscripts"
      ).length;
      if (
        (earlierWatches === 1 && (cursor?.generation !== 0 || cursor?.afterUpdatedSeq !== "0")) ||
        payload.includeUnlistedAgents !== false ||
        payload.inlineBodyMaxBytes !== 65536
      ) {
        throw new Error("WatchGrokBotTranscripts invalid payload");
      }
      const stamp = (ev: unknown): unknown => {
        if (t.stampAgentId === false || typeof agentId !== "string") return ev;
        const frame = ev as {
          agent?: { agentId?: string };
          agentState?: { live?: Array<{ agentId?: string }> };
        };
        if (frame.agent && frame.agent.agentId === undefined) frame.agent.agentId = agentId;
        for (const live of frame.agentState?.live ?? []) {
          if (live.agentId === undefined) live.agentId = agentId;
        }
        return ev;
      };
      if (t.watchEventsAsync) {
        yield* abortable(
          (async function* () {
            for await (const ev of t.watchEventsAsync!()) yield stamp(ev);
          })(),
          opts?.signal ?? null
        );
        return;
      }
      if (t.watchEvents.length > 0) {
        for (const ev of t.watchEvents) yield stamp(ev);
        return;
      }
      if (typeof agentId !== "string") return;
      yield { agentState: { live: [{ agentId, isRunningTurn: true }] } };
      if (t.lastMessageId) {
        yield b64Row(t.lastMessageId, "answer");
        yield terminal("submit_answer", "answer");
      }
      yield { agentState: { live: [{ agentId, isRunningTurn: false }] } };
    },
  });
}

function registeredNonceFromSend(t: FakeTransport): string {
  // The discovery config recorded on SendGrokBotUserMessage carries the
  // registry-backed path URL; extract the nonce the turn registered.
  const send = t.calls.find((call) => call.method === "SendGrokBotUserMessage");
  assert.ok(send, "expected a SendGrokBotUserMessage call");
  const config = JSON.parse(String((send!.payload as Record<string, unknown>).mcpConfigJson));
  const url = String(config.mcpServers.bridge.url);
  const match = /\/grok-bridge\/([A-Za-z0-9_-]{22})\/mcp$/.exec(url);
  assert.ok(match, `expected a registered path URL, got ${url}`);
  return match![1]!;
}

function fakeBridgeUrl(tag: string): string {
  // 22-char nonce from the allowed class, deterministic per tag so
  // per-test URL dedupe (usedBridgeNonces) still distinguishes turns.
  const nonce = (tag + "abcdefghijklmnopqrstuv") // 22 chars total
    .replace(/[^A-Za-z0-9_-]/g, "x")
    .slice(0, 22)
    .padEnd(22, "x");
  return `https://bridge.example.test/grok-bridge/${nonce}/mcp`;
}

function makeInput(
  messages: unknown[],
  stream = false,
  signal?: AbortSignal,
  bridge?: { url: string; challenge?: string }
) {
  return {
    model: "grok-bot",
    stream,
    body: {
      model: "grok-bot",
      messages,
      stream,
      grokBotBridge: bridge,
    },
    credentials: {
      accessToken: "at",
      refreshToken: "rt",
      connectionId: "conn-1",
    },
    signal: signal ?? null,
    log: null,
  };
}

function terminal(name: "submit_answer", content: string): WatchEvent {
  return { entry: { kind: "tool-call", tool: { name, callId: "submit-1", content } } };
}

function settledWatchEvents(answer: string): WatchEvent[] {
  // `agent` frames without agentId exercise the compatibility parsing path;
  // live-shaped agentState.live frames are covered by the default watch
  // generator in installTransport.
  return [
    { agent: { isRunningTurn: true } },
    { entry: { kind: "send-message", message: { type: "text", content: answer } } },
    terminal("submit_answer", answer),
    { agent: { isRunningTurn: false } },
  ];
}

describe("GrokBotExecutor", () => {
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
      t.calls.some((call) => call.method === "DeleteGrokBotAgent" && call.payload.id === "row-saved"),
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

  it("rejects a request with no access token", async () => {
    const input = makeInput([{ role: "user", content: "hi" }]);
    (input.credentials as { accessToken?: string }).accessToken = "";
    const res = (await executor.execute(input)) as Response;
    assert.equal(res.status, 401);
    assert.equal(
      t.calls.some((call) => call.method === "CreateGrokBotTemporalAgent"),
      false
    );
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

  it("rejects explicit bridge input while the stop switch is active (spec test 36)", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    try {
      // Default controller in place (production shape); env cleared = stop switch.
      t.watchEvents = settledWatchEvents("unused");
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], false, undefined, {
          url: "https://bridge.example.com",
          challenge: "test-challenge",
        })
      )) as Response;
      assert.ok(
        res.status >= 400,
        "explicit bridge input must be rejected while the stop switch is active"
      );
      const body = (await res.json()) as { error?: { message?: string } };
      assert.equal(body.error?.message, "Request bridge is disabled");
      assert.equal(
        t.calls.some((c) => c.method === "aiserver.v1.DashboardService/ListSandMcpTools"),
        false,
        "no bridge turn may start while the stop switch is active"
      );
    } finally {
      if (previous !== undefined) globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("controller path does not require the legacy request challenge", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = settledWatchEvents("hello back");
      t.onSend = async (payload) => {
        const config = JSON.parse(String(payload.mcpConfigJson)) as {
          mcpServers: { bridge: { url: string; headers: { Authorization: string } } };
        };
        const match = /\/grok-bridge\/([A-Za-z0-9_-]{22})\/mcp$/.exec(config.mcpServers.bridge.url);
        assert.ok(match);
        if (!match) return;
        const challenge = config.mcpServers.bridge.headers.Authorization.slice("Bearer ".length);
        const { getGrokBotBridgeRegistry } =
          await import("../../open-sse/services/grokBotBridgeRegistry.ts");
        const found = getGrokBotBridgeRegistry().lookup(match[1]);
        if (found.kind !== "active") return;
        await fetch(`http://127.0.0.1:${found.entry.port}/grok-bridge/${match[1]}/mcp`, {
          method: "POST",
          headers: { authorization: `Bearer ${challenge}`, "content-type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "tools/call",
            params: { name: "bridge_value" },
          }),
        });
      };
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], false, undefined, {
          url: "https://bridge.example.com",
        })
      )) as Response;
      assert.equal(res.status, 200, JSON.stringify(await res.json().catch(() => ({}))));
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("replaces a non-object tool schema with an empty object schema", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = settledWatchEvents("done");
      let schema: unknown = "unset";
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
        const list = await fetch(
          `http://127.0.0.1:${found.entry.port}/grok-bridge/${match[1]}/mcp`,
          {
            method: "POST",
            headers: { authorization: "Bearer " + challenge, "content-type": "application/json" },
            body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
          }
        );
        const listBody = (await list.json()) as {
          result: { tools: Array<{ inputSchema: unknown }> };
        };
        schema = listBody.result.tools[0]?.inputSchema;
        await fetch(`http://127.0.0.1:${found.entry.port}/grok-bridge/${match[1]}/mcp`, {
          method: "POST",
          headers: { authorization: "Bearer " + challenge, "content-type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 2,
            method: "tools/call",
            params: { name: "canary_echo" },
          }),
        });
      };
      const input = makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "https://bridge.example.com",
      });
      (input.body as { tools?: unknown }).tools = [
        { type: "function", function: { name: "canary_echo", parameters: "not-a-schema" } },
      ];
      const res = (await executor.execute(input)) as Response;
      assert.equal(res.status, 200);
      assert.deepEqual(schema, { type: "object", properties: {} });
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("advertises the client tools on the bridge instead of bridge_value", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = settledWatchEvents("hello back");
      let listed: string[] = [];
      let sent = "";
      t.onSend = async (payload) => {
        sent = String(payload.text ?? "");
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
        const list = await fetch(
          `http://127.0.0.1:${found.entry.port}/grok-bridge/${match[1]}/mcp`,
          {
            method: "POST",
            headers: { authorization: "Bearer " + challenge, "content-type": "application/json" },
            body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
          }
        );
        const listBody = (await list.json()) as { result: { tools: Array<{ name: string }> } };
        listed = listBody.result.tools.map((tool) => tool.name);
        await fetch(`http://127.0.0.1:${found.entry.port}/grok-bridge/${match[1]}/mcp`, {
          method: "POST",
          headers: { authorization: "Bearer " + challenge, "content-type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 2,
            method: "tools/call",
            params: { name: "canary_echo", arguments: { text: "ping" } },
          }),
        });
      };
      const input = makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "https://bridge.example.com",
      });
      (input.body as { tools?: unknown; tool_choice?: unknown }).tools = [
        {
          type: "function",
          function: {
            name: "canary_echo",
            description: "echo",
            parameters: { type: "object", properties: { text: { type: "string" } } },
          },
        },
      ];
      (input.body as { tool_choice?: unknown; parallel_tool_calls?: boolean }).tool_choice = {
        type: "function",
        function: { name: "canary_echo" },
      };
      (input.body as { parallel_tool_calls?: boolean }).parallel_tool_calls = false;
      const res = (await executor.execute(input)) as Response;
      assert.equal(res.status, 200);
      assert.deepEqual(listed, ["canary_echo"]);
      assert.equal(sent.includes("call it once"), false);
      assert.match(sent, /Call canary_echo before answering/);
      assert.match(sent, /Call one tool, wait for its result/);
      const responseBody = (await res.json()) as {
        choices: Array<{
          finish_reason: string;
          message: { tool_calls?: Array<{ function: { name: string; arguments: string } }> };
        }>;
      };
      assert.equal(responseBody.choices[0]?.finish_reason, "tool_calls");
      assert.equal(responseBody.choices[0]?.message.tool_calls?.[0]?.function.name, "canary_echo");
      assert.equal(
        responseBody.choices[0]?.message.tool_calls?.[0]?.function.arguments,
        JSON.stringify({ text: "ping" })
      );
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("does not open a bridge for an empty tool list or tool_choice none", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = settledWatchEvents("plain answer");
      for (const body of [
        { tools: [] as unknown[] },
        {
          tools: [{ type: "function", function: { name: "canary_echo", parameters: {} } }],
          tool_choice: "none",
        },
      ]) {
        t.calls.length = 0;
        const input = makeInput([{ role: "user", content: "hi" }]);
        Object.assign(input.body as object, body);
        const res = (await executor.execute(input)) as Response;
        assert.equal(res.status, 200);
        const sent = t.calls.find((call) => call.method === "SendGrokBotUserMessage");
        assert.equal(sent?.payload.mcpConfigJson, undefined);
      }
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("tells the model to call some tool when tool_choice is required", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = settledWatchEvents("done");
      let sent = "";
      t.onSend = async (payload) => {
        sent = String(payload.text ?? "");
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
            params: { name: "canary_echo" },
          }),
        });
      };
      const input = makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "https://bridge.example.com",
      });
      (input.body as { tools?: unknown; tool_choice?: unknown }).tools = [
        {
          type: "function",
          function: { name: "canary_echo", parameters: { type: "object", properties: {} } },
        },
      ];
      (input.body as { tool_choice?: unknown }).tool_choice = "required";
      const res = (await executor.execute(input)) as Response;
      assert.equal(res.status, 200);
      assert.match(sent, /Call at least one of them before answering/);
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("streams the tool call as chunks ending with finish_reason tool_calls", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = settledWatchEvents("hello back");
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
          function: { name: "canary_echo", description: "echo", parameters: { type: "object" } },
        },
      ];
      const res = (await executor.execute(input)) as Response;
      assert.equal(res.status, 200);
      const reader = res.body!.getReader();
      const dec = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += dec.decode(value, { stream: true });
      }
      assert.match(text, /"name":"canary_echo"/);
      assert.match(text, /"finish_reason":"tool_calls"/);
      assert.match(text, /data: \[DONE\]/);
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("sends a tool result back as its own line, not as a user line", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = settledWatchEvents("done");
      let sent = "";
      t.onSend = async (payload) => {
        sent = String(payload.text ?? "");
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
            params: { name: "bridge_value" },
          }),
        });
      };
      const res = (await executor.execute(
        makeInput(
          [
            { role: "user", content: "hi" },
            {
              role: "assistant",
              content: null,
              tool_calls: [
                {
                  id: "call_0",
                  type: "function",
                  function: { name: "canary_echo", arguments: '{"text":"ping"}' },
                },
              ],
            },
            { role: "tool", tool_call_id: "call_0", content: "pong" },
          ],
          false,
          undefined,
          { url: "https://bridge.example.com" }
        )
      )) as Response;
      assert.equal(res.status, 200);
      assert.match(sent, /Tool result \(call_0\): pong/);
      assert.match(sent, /Assistant called canary_echo \(call_0\) with \{"text":"ping"\}/);
      assert.equal(sent.includes("User: pong"), false);
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("stringifies object tool-call arguments instead of printing object Object", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = settledWatchEvents("done");
      let sent = "";
      t.onSend = async (payload) => {
        sent = String(payload.text ?? "");
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
            params: { name: "canary_echo" },
          }),
        });
      };
      const input = makeInput(
        [
          {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_0",
                type: "function",
                function: { name: "canary_echo", arguments: { text: "ping" } },
              },
            ],
          },
          { role: "user", content: "again" },
        ],
        false,
        undefined,
        { url: "https://bridge.example.com" }
      );
      (input.body as { tools?: unknown }).tools = [
        {
          type: "function",
          function: { name: "canary_echo", parameters: { type: "object", properties: {} } },
        },
      ];
      const res = (await executor.execute(input)) as Response;
      assert.equal(res.status, 200);
      assert.match(sent, /Assistant called canary_echo \(call_0\) with \{"text":"ping"\}/);
      assert.equal(sent.includes("[object Object]"), false);
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("returns both tool calls from one turn", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = settledWatchEvents("done");
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
        for (const [name, args] of [
          ["canary_value", {}],
          ["canary_echo", { text: "ping" }],
        ] as Array<[string, object]>) {
          await fetch(`http://127.0.0.1:${found.entry.port}/grok-bridge/${match[1]}/mcp`, {
            method: "POST",
            headers: { authorization: "Bearer " + challenge, "content-type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: name,
              method: "tools/call",
              params: { name, arguments: args },
            }),
          });
        }
      };
      const input = makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "https://bridge.example.com",
      });
      (input.body as { tools?: unknown }).tools = [
        { type: "function", function: { name: "canary_value", parameters: { type: "object" } } },
        { type: "function", function: { name: "canary_echo", parameters: { type: "object" } } },
      ];
      const res = (await executor.execute(input)) as Response;
      assert.equal(res.status, 200);
      const responseBody = (await res.json()) as {
        choices: Array<{ message: { tool_calls?: Array<{ function: { name: string } }> } }>;
      };
      const names = responseBody.choices[0]?.message.tool_calls?.map((call) => call.function.name);
      assert.deepEqual(names, ["canary_value", "canary_echo"]);
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("keeps a tool call that arrives after the assistant text", async () => {
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
        choices: Array<{ message: { tool_calls?: Array<{ function: { name: string } }> } }>;
      };
      const names = responseBody.choices[0]?.message.tool_calls?.map((call) => call.function.name);
      assert.deepEqual(names, ["canary_echo"]);
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("keeps a tool call that lands between the text frame and the end of the turn", async () => {
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
      let bridgeReady: () => void = () => {};
      const bridgeOpened = new Promise<void>((resolve) => {
        bridgeReady = resolve;
      });
      t.onSend = () => bridgeReady();
      t.watchEventsAsync = async function* () {
        yield { agent: { isRunningTurn: true } };
        yield { rows: { entries: [{ body: textRow }] } };
        await bridgeOpened;
        const config = JSON.parse(
          String(
            t.calls.find((call) => call.method === "SendGrokBotUserMessage")?.payload.mcpConfigJson
          )
        ) as {
          mcpServers: { bridge: { url: string; headers: { Authorization: string } } };
        };
        const match = /\/grok-bridge\/([A-Za-z0-9_-]{22})\/mcp$/.exec(config.mcpServers.bridge.url);
        if (match) {
          const challenge = config.mcpServers.bridge.headers.Authorization.slice("Bearer ".length);
          const { getGrokBotBridgeRegistry } =
            await import("../../open-sse/services/grokBotBridgeRegistry.ts");
          const found = getGrokBotBridgeRegistry().lookup(match[1]);
          if (found.kind === "active") {
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
          }
        }
        yield { agent: { isRunningTurn: false } };
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
          message: { content?: string | null; tool_calls?: Array<{ function: { name: string } }> };
        }>;
      };
      assert.equal(responseBody.choices[0]?.message.content, "calling now");
      assert.deepEqual(
        responseBody.choices[0]?.message.tool_calls?.map((call) => call.function.name),
        ["canary_echo"]
      );
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("keeps text from an array content block", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = settledWatchEvents("done");
      let sent = "";
      t.onSend = async (payload) => {
        sent = String(payload.text ?? "");
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
            params: { name: "canary_echo" },
          }),
        });
      };
      const input = makeInput(
        [
          {
            role: "user",
            content: [
              { type: "text", text: "first line" },
              { type: "image_url", image_url: { url: "data:image/png;base64,xx" } },
              { type: "text", text: "second line" },
            ],
          },
        ],
        false,
        undefined,
        { url: "https://bridge.example.com" }
      );
      (input.body as { tools?: unknown }).tools = [
        {
          type: "function",
          function: { name: "canary_echo", parameters: { type: "object", properties: {} } },
        },
      ];
      const res = (await executor.execute(input)) as Response;
      assert.equal(res.status, 200);
      assert.match(sent, /User: first line\n\[image attached: image\/png\]\nsecond line/);
      assert.equal(sent.includes("base64"), false);
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("default bridge controller starts registry turns with path-nonce URLs", async () => {
    const { createDefaultBridgeController } = await import("../../open-sse/executors/grok-bot.ts");
    const controller = createDefaultBridgeController();
    const first = await controller.start("https://bridge.example.com");
    assert.match(
      first.url,
      /^https:\/\/bridge\.example\.com\/grok-bridge\/[A-Za-z0-9_-]{22}\/mcp$/
    );
    assert.match(first.challenge ?? "", /^[A-Za-z0-9_-]{16,}$/);
    // The canary requires the tool to have been driven over HTTP first.
    assert.throws(() => first.call(first.challenge ?? ""), /Bridge tool was not called/);
    const second = await controller.start("https://bridge.example.com");
    assert.notEqual(first.url, second.url);
    // Close every turn so the process-wide singleton registry never carries
    // leaked active entries into later tests.
    first.close("cancel");
    await controller.stop();
    const refused = await controller.start("").then(
      () => null,
      (err) => err
    );
    assert.match(String(refused), /Public bridge base URL is required/);
  });

  it("executor flow: discovery and execution configs carry the challenge header", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      t.watchEvents = settledWatchEvents("hello back");
      // Drive the real loopback tool server the way the public route would
      // after its challenge check: parse nonce + bearer from the execution
      // config, then POST tools/call to the registered port.
      let sendChallenge = "";
      t.onSend = async (payload) => {
        // The prompt instruction and the wire Authorization must carry the
        // same challenge the local gate verifies (spec step 1).
        const sendChallengeMatch = /challenge ([A-Za-z0-9_-]+)\./.exec(String(payload.text ?? ""));
        assert.ok(sendChallengeMatch, "send payload prompt must name the challenge");
        sendChallenge = sendChallengeMatch[1];
        const config = JSON.parse(String(payload.mcpConfigJson)) as {
          mcpServers: { bridge: { url: string; headers: { Authorization: string } } };
        };
        const match = /\/grok-bridge\/([A-Za-z0-9_-]{22})\/mcp$/.exec(config.mcpServers.bridge.url);
        assert.ok(match, "HOOK-FAIL: execution config must use the path-nonce form");
        const nonce = match[1];
        const challenge = config.mcpServers.bridge.headers.Authorization.slice("Bearer ".length);
        const { getGrokBotBridgeRegistry } =
          await import("../../open-sse/services/grokBotBridgeRegistry.ts");
        const found = getGrokBotBridgeRegistry().lookup(nonce);
        assert.equal(found.kind, "active", "HOOK-FAIL: nonce not active");
        if (found.kind !== "active") return;
        const response = await fetch(
          `http://127.0.0.1:${found.entry.port}/grok-bridge/${nonce}/mcp`,
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${challenge}`,
              "content-type": "application/json",
            },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: "tools/call",
              params: { name: "bridge_value" },
            }),
          }
        );
        assert.equal(
          response.status,
          200,
          `HOOK-FAIL: local server responded ${response.status}: ${await response.text().catch(() => "?")}`
        );
      };
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], false, undefined, {
          url: "https://bridge.example.com",
          challenge: "test-challenge",
        })
      )) as Response;
      assert.equal(res.status, 200, JSON.stringify(await res.json().catch(() => ({}))));
      const pathNonce = /^https:\/\/bridge\.example\.com\/grok-bridge\/[A-Za-z0-9_-]{22}\/mcp$/;
      const discovery = t.calls.find(
        (c) => c.method === "aiserver.v1.DashboardService/ListSandMcpTools"
      );
      const discoveryConfig = JSON.parse(String(discovery?.payload.mcpConfigJson));
      assert.match(String(discoveryConfig.mcpServers.bridge.url), pathNonce);
      assert.match(String(discoveryConfig.mcpServers.bridge.headers.Authorization), /^Bearer .+$/);
      const send = t.calls.find((c) => c.method === "SendGrokBotUserMessage");
      const sendConfig = JSON.parse(String(send?.payload.mcpConfigJson));
      assert.match(String(sendConfig.mcpServers.bridge.url), pathNonce);
      // Spec lifecycle step 6: the execution stage carries the identical
      // authorization header explicitly, not via upstream inheritance.
      assert.match(String(sendConfig.mcpServers.bridge.headers.Authorization), /^Bearer .+$/);
      assert.equal(
        sendConfig.mcpServers.bridge.headers.Authorization,
        discoveryConfig.mcpServers.bridge.headers.Authorization
      );
      // The finally path closes the turn through the registry (draining
      // strength) instead of blocking on tunnel teardown.
      assert.equal(
        "Bearer " + sendChallenge,
        String(sendConfig.mcpServers.bridge.headers.Authorization),
        "prompt challenge and wire Authorization must be the same value"
      );
      assert.equal(executor.bridgeLifecycleForTests().includes("close"), true);
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
    }
  });

  it("read() transfers ownership: a stream read within the deadline completes normally", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      _grokBotInternals.setUnreadTimeoutForTests(40);
      let releaseWatch: (() => void) | null = null;
      t.watchEventsAsync = () =>
        (async function* () {
          await new Promise<void>((resolve) => {
            releaseWatch = resolve;
          });
          // Echo row must carry the sent messageId so the executor skips it.
          yield b64Row(t.lastMessageId ?? "unused", "owned answer");
          yield terminal("submit_answer", "owned answer");
        })();
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], true, undefined, {
          url: "https://bridge.example.com",
        })
      )) as Response;
      assert.equal(res.status, 200);
      // First read transfers ownership. Stay pending past the 40ms deadline:
      // no forced abort may fire while a reader owns the body.
      const reader = res.body!.getReader();
      // Start the read without blocking on it: pull() fires synchronously
      // with read(), transferring ownership before the deadline elapses.
      const firstPromise = reader.read();
      await new Promise((resolve) => setTimeout(resolve, 100));
      // Nobody aborted the pending turn: the reader owns the body now. The
      // turn drains at execute() return by design; a forced abort would
      // sever the watch, so the [DONE] + answer assertions below are the
      // ownership proof.
      releaseWatch?.();
      const first = await firstPromise;
      assert.equal(first.done, false);
      const chunks: Uint8Array[] = [first.value!];
      for (;;) {
        const next = await reader.read();
        if (next.done) break;
        chunks.push(next.value!);
      }
      const text = new TextDecoder().decode(Buffer.concat(chunks));
      assert.equal(text.includes("[DONE]"), true);
      assert.equal(text.includes("owned answer"), true);
      const { getGrokBotBridgeRegistry } =
        await import("../../open-sse/services/grokBotBridgeRegistry.ts");
      assert.equal(
        getGrokBotBridgeRegistry().lookup(registeredNonceFromSend(t)).kind,
        "closed-replay"
      );
    } finally {
      _grokBotInternals.setUnreadTimeoutForTests(null);
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
      t.watchEventsAsync = undefined;
    }
  });

  it("client cancel on a bridge stream ends with no frame, no [DONE], and closes the nonce", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    let releaseWatch: (() => void) | null = null;
    try {
      t.watchEventsAsync = () =>
        (async function* () {
          await new Promise<void>((resolve) => {
            releaseWatch = resolve;
          });
        })();
      const client = new AbortController();
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], true, client.signal, {
          url: "https://bridge.example.com",
        })
      )) as Response;
      assert.equal(res.status, 200);
      // Poll until the watch is attached (condition, not a blind sleep).
      for (
        let i = 0;
        i < 100 && !t.calls.some((c) => c.method === "WatchGrokBotTranscripts");
        i += 1
      ) {
        await new Promise((resolve) => setTimeout(resolve, 5));
      }
      client.abort();
      await new Promise((resolve) => setTimeout(resolve, 20));
      releaseWatch?.();
      const text = await new Response(res.body).text();
      // Spec step 8 cancel path: no error frame and no [DONE].
      assert.equal(text.includes("[DONE]"), false);
      assert.equal(text.includes('"error"'), false);
      const { getGrokBotBridgeRegistry } =
        await import("../../open-sse/services/grokBotBridgeRegistry.ts");
      assert.equal(
        getGrokBotBridgeRegistry().lookup(registeredNonceFromSend(t)).kind,
        "closed-replay"
      );
    } finally {
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
      t.watchEventsAsync = undefined;
    }
  });

  it("force-aborts an unread bridge stream at the unread deadline and closes the nonce", async () => {
    const previous = globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    try {
      _grokBotInternals.setUnreadTimeoutForTests(40);
      t.watchEventsAsync = () =>
        (async function* () {
          await new Promise(() => {
            /* pending forever */
          });
        })();
      const res = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], true, undefined, {
          url: "https://bridge.example.com",
        })
      )) as Response;
      assert.equal(res.status, 200);
      // Nobody reads the body; the 40ms unread deadline must fire.
      await new Promise((resolve) => setTimeout(resolve, 100));
      const text = await new Response(res.body).text();
      assert.equal(text, "");
      const { getGrokBotBridgeRegistry } =
        await import("../../open-sse/services/grokBotBridgeRegistry.ts");
      assert.equal(
        getGrokBotBridgeRegistry().lookup(registeredNonceFromSend(t)).kind,
        "closed-replay"
      );
    } finally {
      _grokBotInternals.setUnreadTimeoutForTests(null);
      if (previous === undefined) delete globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL;
      else globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = previous;
      t.watchEventsAsync = undefined;
    }
  });

  it("cuts an oversized history down to the upstream text cap", async () => {
    executor.setBridgeControllerForTests(null);
    const old = "OLD-" + "a".repeat(150_000);
    const recent = "RECENT-" + "b".repeat(150_000);
    const input = makeInput([{ role: "user", content: "hi" }]);
    (input.body as { messages: unknown[] }).messages = [
      { role: "user", content: old },
      { role: "user", content: recent },
    ];
    const res = (await executor.execute(input)) as Response;
    assert.equal(res.status, 200);
    const send = t.calls.find((call) => call.method === "SendGrokBotUserMessage");
    const text = String(send?.payload.text);
    assert.ok(text.length <= 190_000, "prompt length " + text.length);
    assert.equal(text.includes("OLD-"), false);
    assert.equal(text.includes("RECENT-"), true);
    assert.match(text, /Answer only from this conversation/);
  });

  it("stays within the cap when one message is longer than the budget", async () => {
    executor.setBridgeControllerForTests(null);
    const huge = "Z".repeat(250_000);
    const input = makeInput([{ role: "user", content: "hi" }]);
    (input.body as { messages: unknown[] }).messages = [{ role: "user", content: huge }];
    const res = (await executor.execute(input)) as Response;
    assert.equal(res.status, 200);
    const send = t.calls.find((call) => call.method === "SendGrokBotUserMessage");
    const text = String(send?.payload.text);
    assert.ok(text.length <= 190_000, "prompt length " + text.length);
    assert.match(text, /Answer only from this conversation/);
    assert.equal(text.includes("Z"), true);
  });

  it("reconnects a watch at the generation a cursorTooOld frame names", async () => {
    executor.setBridgeControllerForTests(null);
    let watchCount = 0;
    t.watchEventsAsync = async function* () {
      watchCount += 1;
      if (watchCount === 1) {
        yield { cursorTooOld: { agentId: "agent-1", generation: 5, sessionId: "" } };
        return;
      }
      yield { agent: { isRunningTurn: true } };
      yield { entry: { kind: "send-message", message: { type: "text", content: "pong" } } };
      yield { agent: { isRunningTurn: false } };
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const watches = t.calls.filter((call) => call.method === "WatchGrokBotTranscripts");
    assert.equal(watches.length, 2);
    const second = (watches[1]?.payload.cursors as Array<Record<string, unknown>>)[0];
    assert.equal(second?.generation, 5);
  });

  it("does not return text while an earlier row is still missing its body", async () => {
    executor.setBridgeControllerForTests(null);
    const later = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "second" },
      })
    ).toString("base64");
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { rows: { entries: [{ seq: "7" }] } },
      { rows: { entries: [{ seq: "8", body: later }] } },
      { agent: { isRunningTurn: false } },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 502);
    const responseBody = (await res.json()) as { error?: { type?: string } };
    assert.equal(responseBody.error?.type, "incomplete_turn");
  });

  it("ends a turn on the stale timer when isRunning never flips", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield {
        agentState: { live: [{ isRunning: true, staleAfterMs: 1000, updatedAtMs: Date.now() }] },
      };
      yield { rows: { entries: [{ body }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("rejects a turn the server says failed even after text arrived", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { entry: { kind: "send-message", message: { type: "text", content: "partial" } } },
      { turnFailed: { agentId: "agent-1" } },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 502);
    const responseBody = (await res.json()) as { error?: { type?: string } };
    assert.equal(responseBody.error?.type, "incomplete_turn");
  });

  it("does not let a stale timer from the first watch abort the reconnected one", async () => {
    executor.setBridgeControllerForTests(null);
    let watchCount = 0;
    t.watchEventsAsync = async function* () {
      watchCount += 1;
      if (watchCount === 1) {
        yield {
          agentState: { live: [{ isRunning: true, staleAfterMs: 50, updatedAtMs: Date.now() }] },
        };
        yield { cursorTooOld: { generation: 3, sessionId: "" } };
        return;
      }
      yield { agent: { isRunningTurn: true } };
      yield { entry: { kind: "send-message", message: { type: "text", content: "pong" } } };
      yield { agent: { isRunningTurn: false } };
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("keeps the stale timer across a watch that ends before the window", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    let watchCount = 0;
    t.watchEventsAsync = async function* () {
      watchCount += 1;
      if (watchCount === 1) {
        yield {
          agentState: { live: [{ isRunning: true, staleAfterMs: 80, updatedAtMs: Date.now() }] },
        };
        yield { rows: { entries: [{ body }] } };
        return;
      }
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("waits for the text row when isRunning drops first", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEvents = [
      { agentState: { live: [{ isRunning: true, staleAfterMs: 5000, updatedAtMs: Date.now() }] } },
      { agentState: { live: [{ isRunning: false, staleAfterMs: 5000, updatedAtMs: Date.now() }] } },
      { rows: { entries: [{ body }] } },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("returns when the text arrives before any running frame", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEvents = [
      { rows: { entries: [{ body }] } },
      { agentState: { live: [{ staleAfterMs: 90000, updatedAtMs: Date.now() }] } },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("returns the text row when no live entry says the turn is still running", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield { rows: { entries: [{ body }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("keeps reading while the same frame says the turn is still running", async () => {
    executor.setBridgeControllerForTests(null);
    const first = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    const second = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong!" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield {
        agentState: { live: [{ isRunning: true, staleAfterMs: 90000, updatedAtMs: Date.now() }] },
        rows: { entries: [{ body: first }] },
      };
      yield { rows: { entries: [{ body: second }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pongpong!");
  });

  it("does not arm the short timer when the agent frame says the turn is running", async () => {
    executor.setBridgeControllerForTests(null);
    const first = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    const second = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "!" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield { agent: { isRunningTurn: true }, rows: { entries: [{ body: first }] } };
      await new Promise((resolve) => setTimeout(resolve, 2500));
      yield { rows: { entries: [{ body: second }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong!");
  });

  it("returns the text it has when a row body never arrives", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield { rows: { entries: [{ seq: "7" }, { seq: "8", body }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("ignores a live frame that does not name an agent", async () => {
    executor.setBridgeControllerForTests(null);
    t.stampAgentId = false;
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield { agentState: { live: [{ isRunning: true }] } };
      yield { agentState: { live: [{ isRunning: false }] } };
      yield { rows: { entries: [{ body }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("ignores a live frame that names a different agent", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield { agentState: { live: [{ agentId: "other", isRunning: true }] } };
      yield { agentState: { live: [{ agentId: "other", isRunning: false }] } };
      yield { rows: { entries: [{ body }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("reconnects from the last updatedSeq instead of the start", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    let round = 0;
    t.watchEventsAsync = async function* () {
      round += 1;
      if (round === 1) {
        yield { rows: { entries: [{ seq: "1", body, updatedSeq: "5" }] } };
        return;
      }
      yield { agent: { isRunningTurn: true } };
      yield { agent: { isRunningTurn: false } };
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const watches = t.calls.filter((call) => call.method === "WatchGrokBotTranscripts");
    const second = watches[1]?.payload.cursors as Array<{ afterUpdatedSeq?: string }> | undefined;
    assert.equal(second?.[0]?.afterUpdatedSeq, "5");
  });
});

test.after(async () => {
  await cleanupTempDataDir(TEST_DATA_DIR);
});
