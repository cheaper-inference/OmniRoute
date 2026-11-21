import { before, after, describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  prepareExecutorFixture,
  cleanupExecutorFixture,
  GrokBotExecutor,
  _grokBotInternals,
  type FakeTransport,
  makeTransport,
  installTransport,
  makeInput,
} from "../helpers/grokBotExecutorFixture.ts";
before(prepareExecutorFixture);
after(cleanupExecutorFixture);

describe("GrokBotExecutor watch settlement", () => {
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
  it("terminates an expired empty watch instead of reconnecting with an aborted signal", async () => {
    const client = new AbortController();
    const { getTransport, setGrokBotTransportForTests } =
      await import("../../open-sse/executors/grok-bot.ts");
    const transport = getTransport("fixture");
    let watches = 0;
    setGrokBotTransportForTests({
      rpc: transport.rpc.bind(transport),
      watch(method, payload, options) {
        watches += 1;
        // Bound the failing baseline without hiding its unexpected reconnect.
        if (watches > 1) client.abort();
        return transport.watch(method, payload, options);
      },
    });
    t.watchEventsAsync = async function* () {
      yield {
        agentState: { live: [{ isRunning: true, staleAfterMs: 1, updatedAtMs: Date.now() }] },
      };
      await new Promise(() => {});
    };
    try {
      const response = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], false, client.signal)
      )) as Response;
      assert.equal(response.status, 502);
      assert.equal((await response.json()).error.type, "incomplete_turn");
      assert.equal(watches, 1);
      assert.equal(t.calls.filter((c) => c.method === "DeleteGrokBotAgent").length, 1);
    } finally {
      client.abort();
      t.watchEventsAsync = undefined;
    }
  });
});
