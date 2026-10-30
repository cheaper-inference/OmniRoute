import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

const { startBridgeTurn, BRIDGE_TOOL_NAME } = await import(
  "../../open-sse/executors/grok-bot-bridge.ts"
);
const { GrokBotBridgeRegistry } = await import(
  "../../open-sse/services/grokBotBridgeRegistry.ts"
);

describe("grok bot bridge turn (registry-backed)", () => {
  let registry: InstanceType<typeof GrokBotBridgeRegistry>;

  beforeEach(() => {
    registry = new GrokBotBridgeRegistry();
  });

  async function postToolCall(port: number, nonce: string, challenge: string) {
    return fetch(`http://127.0.0.1:${port}/grok-bridge/${nonce}/mcp`, {
      method: "POST",
      headers: { authorization: `Bearer ${challenge}`, "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name: BRIDGE_TOOL_NAME },
      }),
    });
  }

  it("registers an active turn and serves MCP tools/list + tools/call over loopback", async () => {
    const turn = await startBridgeTurn({ publicBaseUrl: "https://bridge.example.com", registry });
    assert.match(turn.url, /^https:\/\/bridge\.example\.com\/grok-bridge\/[A-Za-z0-9_-]{22}\/mcp$/);
    const found = registry.lookup(turn.nonce);
    if (found.kind !== "active") {
      assert.fail(`nonce must be active, got: ${found.kind}`);
    }
    assert.equal(found.entry.challenge, turn.challenge);

    const list = await fetch(`http://127.0.0.1:${found.entry.port}/grok-bridge/${turn.nonce}/mcp`, {
      method: "POST",
      headers: { authorization: `Bearer ${turn.challenge}`, "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
    });
    assert.equal(list.status, 200);
    const listBody = (await list.json()) as { result: { tools: Array<{ name: string }> } };
    assert.equal(listBody.result.tools[0]?.name, BRIDGE_TOOL_NAME);

    const call = await postToolCall(found.entry.port, turn.nonce, turn.challenge);
    assert.equal(call.status, 200);
    assert.equal(turn.call(turn.challenge), "ok");
    assert.throws(() => turn.call(turn.challenge), /Repeat call rejected/);
    assert.throws(() => turn.call("wrong-value"), /Rejected challenge/);
  });

  it("keeps the tool name and arguments from tools/call", async () => {
    const turn = await startBridgeTurn({ publicBaseUrl: "https://bridge.example.com", registry });
    const found = registry.lookup(turn.nonce);
    if (found.kind !== "active") {
      assert.fail(`nonce must be active, got: ${found.kind}`);
    }
    const call = await fetch(`http://127.0.0.1:${found.entry.port}/grok-bridge/${turn.nonce}/mcp`, {
      method: "POST",
      headers: { authorization: "Bearer " + turn.challenge, "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name: BRIDGE_TOOL_NAME, arguments: { text: "ping" } },
      }),
    });
    assert.equal(call.status, 200);
    const body = (await call.json()) as { result: { content: Array<{ text: string }> } };
    assert.equal(body.result.content[0]?.text, "ok");
    assert.deepEqual(turn.invocations, [{ name: BRIDGE_TOOL_NAME, arguments: { text: "ping" } }]);
  });

  it("records one invocation when the same tools/call arrives twice", async () => {
    const turn = await startBridgeTurn({ publicBaseUrl: "https://bridge.example.com", registry });
    const found = registry.lookup(turn.nonce);
    if (found.kind !== "active") {
      assert.fail(`nonce must be active, got: ${found.kind}`);
    }
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name: BRIDGE_TOOL_NAME, arguments: { a: 2, b: 2 } },
    });
    const post = () => fetch(`http://127.0.0.1:${found.entry.port}/grok-bridge/${turn.nonce}/mcp`, {
      method: "POST",
      headers: { authorization: "Bearer " + turn.challenge, "content-type": "application/json" },
      body,
    });
    assert.equal((await post()).status, 200);
    assert.equal((await post()).status, 200);
    assert.deepEqual(turn.invocations, [{ name: BRIDGE_TOOL_NAME, arguments: { a: 2, b: 2 } }]);
  });

  it("advertises the tools it was given and accepts a call to one of them", async () => {
    const tools = [
      { name: "canary_value", description: "canary", inputSchema: { type: "object", properties: {} } },
      { name: "canary_echo", description: "echo", inputSchema: { type: "object", properties: { text: { type: "string" } } } },
    ];
    const turn = await startBridgeTurn({ publicBaseUrl: "https://bridge.example.com", registry, tools });
    const found = registry.lookup(turn.nonce);
    if (found.kind !== "active") {
      assert.fail(`nonce must be active, got: ${found.kind}`);
    }
    const list = await fetch(`http://127.0.0.1:${found.entry.port}/grok-bridge/${turn.nonce}/mcp`, {
      method: "POST",
      headers: { authorization: "Bearer " + turn.challenge, "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
    });
    const listBody = (await list.json()) as { result: { tools: Array<{ name: string }> } };
    assert.deepEqual(listBody.result.tools.map((tool) => tool.name), ["canary_value", "canary_echo"]);

    const call = await fetch(`http://127.0.0.1:${found.entry.port}/grok-bridge/${turn.nonce}/mcp`, {
      method: "POST",
      headers: { authorization: "Bearer " + turn.challenge, "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0", id: 2, method: "tools/call",
        params: { name: "canary_echo", arguments: { text: "ping" } },
      }),
    });
    assert.equal(call.status, 200);
    assert.deepEqual(turn.invocations, [{ name: "canary_echo", arguments: { text: "ping" } }]);
  });

  it("rejects direct hits with a missing or wrong bearer challenge", async () => {
    const turn = await startBridgeTurn({ publicBaseUrl: "https://bridge.example.com", registry });
    const found = registry.lookup(turn.nonce);
    if (found.kind !== "active") {
      assert.fail(`nonce must be active, got: ${found.kind}`);
    }
    const missing = await fetch(`http://127.0.0.1:${found.entry.port}/anything`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
    });
    assert.equal(missing.status, 400);
    const wrong = await fetch(`http://127.0.0.1:${found.entry.port}/anything`, {
      method: "POST",
      headers: { authorization: "Bearer wrong", "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
    });
    assert.equal(wrong.status, 400);
  });

  it("canary reports the tool as uncalled before any HTTP traffic", async () => {
    const turn = await startBridgeTurn({ publicBaseUrl: "https://bridge.example.com", registry });
    assert.throws(() => turn.call(turn.challenge), /Bridge tool was not called/);
  });

  it("normal close stops admissions and settles local teardown inside the drain budget", async () => {
    let closedReason = "";
    const turn = await startBridgeTurn({
      publicBaseUrl: "https://bridge.example.com/",
      registry,
      drainBudgetMs: 40,
      onLocallyClosed: (reason: string) => {
        closedReason = reason;
      },
    });
    assert.match(turn.url, /^https:\/\/bridge\.example\.com\/grok-bridge\//, "base trailing slash stripped");
    assert.equal(turn.close("normal"), true);
    // New admissions stop immediately even though drain is still running.
    const replay = registry.lookup(turn.nonce);
    assert.equal(replay.kind, "closed-replay");
    // After the drain budget the server is destroyed and the close settles.
    // Poll instead of sleeping a fixed delay: a test that sleeps instead of
    // polling is a flake under a loaded runner.
    const deadline = Date.now() + 2000;
    while (closedReason !== "normal" && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.equal(closedReason, "normal");
    const found = registry.lookup(turn.nonce);
    if (found.kind === "closed-replay") {
      const probe = await fetch(`http://127.0.0.1:${found.entry.port}/`, { method: "POST" }).catch(
        () => null
      );
      assert.equal(probe, null, "listener must be gone after drain teardown");
    }
  });

  it("cancel close tears the listener down immediately without waiting for the drain budget", async () => {
    const turn = await startBridgeTurn({
      publicBaseUrl: "https://bridge.example.com",
      registry,
      drainBudgetMs: 60_000,
    });
    const found = registry.lookup(turn.nonce);
    if (found.kind !== "active") {
      assert.fail(`nonce must be active, got: ${found.kind}`);
    }
    const port = found.entry.port;
    assert.equal(turn.close("cancel"), true);
    await new Promise((resolve) => setTimeout(resolve, 30));
    const probe = await fetch(`http://127.0.0.1:${port}/`, { method: "POST" }).catch(() => null);
    assert.equal(probe, null, "forced teardown must not wait for the drain budget");
  });

  it("turn-scoped signal abort converges on the cancel close path", async () => {
    const controller = new AbortController();
    const turn = await startBridgeTurn({
      publicBaseUrl: "https://bridge.example.com",
      registry,
      signal: controller.signal,
    });
    controller.abort();
    const found = registry.lookup(turn.nonce);
    assert.equal(found.kind, "closed-replay", "abort marks the nonce closing before any cleanup");
  });

  it("registration refusal closes the server before the error returns", async () => {
    // Fill the combined budget with active turns; the 101st start must be
    // refused and its listener must not outlive the refusal. (The absolute-cap
    // re-check math itself is registry-side, covered by the registry suite.)
    const fullRegistry = new GrokBotBridgeRegistry();
    const turns = [];
    for (let i = 0; i < 100; i += 1) {
      turns.push(
        await startBridgeTurn({ publicBaseUrl: "https://bridge.example.com", registry: fullRegistry })
      );
    }
    const err = await startBridgeTurn({
      publicBaseUrl: "https://bridge.example.com",
      registry: fullRegistry,
    }).then(
      () => null,
      (e) => e
    );
    assert.match(String(err), /bridge registration refused: capacity/);
    for (const turn of turns) turn.close("cancel");
  });
});
