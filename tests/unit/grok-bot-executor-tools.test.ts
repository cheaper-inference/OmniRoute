import { before, after, describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  prepareExecutorFixture,
  cleanupExecutorFixture,
  GrokBotExecutor,
  _grokBotInternals,
  type FakeTransport,
  makeTransport,
  b64Row,
  installTransport,
  registeredNonceFromSend,
  makeInput,
  terminal,
  settledWatchEvents,
} from "../helpers/grokBotExecutorFixture.ts";
before(prepareExecutorFixture);
after(cleanupExecutorFixture);

describe("GrokBotExecutor tools and streaming", () => {
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
      // Nobody aborted the pending turn: the reader owns the body and bridge
      // until collection settles. A forced abort would sever the watch, so
      // the [DONE] + answer assertions below prove that ownership.
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
  for (const mode of ["plain-body", "bridge-reader"] as const) {
    it(`cancelling the ${mode} aborts its watch and awaits one remote cleanup`, async () => {
      const client = new AbortController();
      let watchSignal: AbortSignal | null | undefined;
      const { getTransport, setGrokBotTransportForTests } =
        await import("../../open-sse/executors/grok-bot.ts");
      const transport = getTransport("fixture");
      setGrokBotTransportForTests({
        rpc: transport.rpc.bind(transport),
        watch(method, payload, options) {
          watchSignal = options?.signal;
          return transport.watch(method, payload, options);
        },
      });
      t.watchEventsAsync = async function* () {
        await new Promise(() => {});
      };
      try {
        const response = (await executor.execute(
          makeInput(
            [{ role: "user", content: "hi" }],
            true,
            client.signal,
            mode === "bridge-reader" ? { url: "https://bridge.example.com" } : undefined
          )
        )) as Response;
        assert.equal(response.status, 200);
        assert.ok(watchSignal);
        if (mode === "bridge-reader") {
          const reader = response.body!.getReader();
          await reader.cancel("consumer stopped");
          assert.deepEqual(await reader.read(), { done: true, value: undefined });
        } else await response.body!.cancel("consumer stopped");
        assert.equal(watchSignal!.aborted, true, "body cancellation reaches the actual watch");
        assert.equal(t.calls.filter((c) => c.method === "DeleteGrokBotAgent").length, 1);
        await new Promise((resolve) => setImmediate(resolve));
      } finally {
        client.abort();
        t.watchEventsAsync = undefined;
      }
    });
  }

  it("caller abort on a plain stream emits no error or DONE and still cleans up", async () => {
    const client = new AbortController();
    t.watchEventsAsync = async function* () {
      await new Promise(() => {});
    };
    try {
      const response = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], true, client.signal)
      )) as Response;
      client.abort();
      assert.equal(await response.text(), "");
      assert.equal(t.calls.filter((c) => c.method === "DeleteGrokBotAgent").length, 1);
    } finally {
      client.abort();
      t.watchEventsAsync = undefined;
    }
  });
  it("keeps a streamed turn's bridge active until its body settles or cancels", async () => {
    t.watchEventsAsync = async function* () {
      await new Promise(() => {});
    };
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], true, undefined, {
        url: "https://bridge.example.com",
      })
    )) as Response;
    const { getGrokBotBridgeRegistry } =
      await import("../../open-sse/services/grokBotBridgeRegistry.ts");
    const registry = getGrokBotBridgeRegistry();
    const nonce = registeredNonceFromSend(t);
    try {
      const { handleGrokBridgeRequest } =
        await import("../../open-sse/services/grokBotBridgeProxy.ts");
      const sent = t.calls.find((call) => call.method === "SendGrokBotUserMessage")!;
      const config = JSON.parse(String(sent.payload.mcpConfigJson));
      const admission = await handleGrokBridgeRequest({
        nonce,
        registry,
        upstreamPath: "/mcp",
        request: new Request("https://bridge.example.com/mcp", {
          method: "POST",
          headers: {
            authorization: config.mcpServers.bridge.headers.Authorization,
            "content-type": "application/json",
          },
          body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
        }),
      });
      assert.equal(
        admission.status,
        200,
        "pending stream still admits its authenticated tool request"
      );
      assert.ok(Array.isArray((await admission.json()).result.tools));
      assert.equal(
        registry.lookup(nonce).kind,
        "active",
        "returning headers is not turn completion"
      );
      assert.equal(t.calls.filter((c) => c.method === "DeleteGrokBotAgent").length, 0);
    } finally {
      await response.body!.cancel();
      t.watchEventsAsync = undefined;
    }
    assert.equal(registry.lookup(nonce).kind, "closed-replay");
    assert.equal(t.calls.filter((c) => c.method === "DeleteGrokBotAgent").length, 1);
  });
});
