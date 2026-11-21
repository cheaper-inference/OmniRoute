import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// F-C3-33: chat.ts calls handleChatCore once per account-fallback attempt, and the plugin
// onRequest gate ran inside handleChatCore, so one client request failed over to a second
// account ran the plugin twice. A plugin that counts requests then counts a failover twice.
const harness = await createChatPipelineHarness("plugin-onrequest-once");
const { registerHook, unregisterHook } = await import("../../src/lib/plugins/hooks.ts");
const { runPluginRequestGate } =
  await import("../../open-sse/handlers/chatCore/pluginRequestGate.ts");

const PLUGIN = "onrequest-once-counter";

test.afterEach(async () => {
  unregisterHook("onRequest", PLUGIN);
  await harness.resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function runFailoverRequest(
  firstAccountStatus: number
): Promise<{ upstreamCalls: number; status: number }> {
  let upstreamCalls = 0;
  globalThis.fetch = (async () => {
    upstreamCalls += 1;
    return upstreamCalls === 1
      ? jsonResponse(firstAccountStatus, { error: { message: "overloaded" } })
      : harness.buildOpenAIResponse("ok");
  }) as typeof fetch;
  await harness.seedConnection("openai", { name: "a", apiKey: "sk-a", priority: 1 });
  await harness.seedConnection("openai", { name: "b", apiKey: "sk-b", priority: 2 });
  const response = await harness.handleChat(
    harness.buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );
  await response.text();
  return { upstreamCalls, status: response.status };
}

test("the plugin onRequest hook runs once when the first account fails over", async () => {
  let hookCalls = 0;
  registerHook("onRequest", PLUGIN, () => {
    hookCalls += 1;
  });
  const { upstreamCalls, status } = await runFailoverRequest(503);
  assert.equal(upstreamCalls, 2, "the request must fail over to the second account");
  assert.equal(status, 200);
  assert.equal(hookCalls, 1);
});

test("a body rewritten by the onRequest hook reaches the account that serves the failover", async () => {
  registerHook("onRequest", PLUGIN, (ctx: { body?: { messages?: unknown[] } }) => ({
    body: { ...ctx.body, messages: [{ role: "user", content: "rewritten-by-plugin" }] },
  }));
  const sentBodies: string[] = [];
  let upstreamCalls = 0;
  globalThis.fetch = (async (_url: unknown, init?: { body?: unknown }) => {
    upstreamCalls += 1;
    sentBodies.push(String(init?.body ?? ""));
    return upstreamCalls === 1
      ? jsonResponse(503, { error: { message: "overloaded" } })
      : harness.buildOpenAIResponse("ok");
  }) as typeof fetch;
  await harness.seedConnection("openai", { name: "a", apiKey: "sk-a", priority: 1 });
  await harness.seedConnection("openai", { name: "b", apiKey: "sk-b", priority: 2 });
  const response = await harness.handleChat(
    harness.buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );
  await response.text();
  assert.equal(upstreamCalls, 2);
  assert.equal(sentBodies.length, 2);
  for (const sent of sentBodies) {
    assert.match(sent, /rewritten-by-plugin/, "every attempt must send the plugin's body");
  }
});

// The memo is narrow on purpose: a retry that changes the provider or the model, a block, or a
// rewrite still reaches the plugin.
function gateArgs(
  headers: Record<string, string> | undefined,
  overrides: Record<string, unknown> = {}
) {
  return {
    requestId: "req-1",
    body: { messages: [{ role: "user", content: "hi" }] },
    model: "gpt-4o-mini",
    provider: "openai",
    apiKeyInfo: null,
    headers,
    ...overrides,
  } as Parameters<typeof runPluginRequestGate>[0];
}

function countingHook(result: () => unknown = () => undefined) {
  const state = { calls: 0 };
  registerHook("onRequest", PLUGIN, () => {
    state.calls += 1;
    return result();
  });
  return state;
}

test("the gate skips a repeat call for the same request, provider and model", async () => {
  const hook = countingHook();
  const headers = { "x-test": "1" };
  await runPluginRequestGate(gateArgs(headers));
  const second = await runPluginRequestGate(gateArgs(headers));
  assert.equal(hook.calls, 1);
  assert.equal(second.blocked, false);
});

test("the gate runs again when the provider or the model changes", async () => {
  const hook = countingHook();
  const headers = { "x-test": "1" };
  await runPluginRequestGate(gateArgs(headers));
  await runPluginRequestGate(gateArgs(headers, { provider: "anthropic" }));
  await runPluginRequestGate(gateArgs(headers, { model: "gpt-4o" }));
  assert.equal(hook.calls, 3);
});

test("the gate runs again for another client request", async () => {
  const hook = countingHook();
  await runPluginRequestGate(gateArgs({ "x-test": "1" }));
  await runPluginRequestGate(gateArgs({ "x-test": "1" }));
  assert.equal(hook.calls, 2);
});

test("a caller without a headers snapshot always runs the hook", async () => {
  const hook = countingHook();
  await runPluginRequestGate(gateArgs(undefined));
  await runPluginRequestGate(gateArgs(undefined));
  assert.equal(hook.calls, 2);
});

test("a blocking hook is asked again on every call", async () => {
  const hook = countingHook(() => ({ blocked: true }));
  const headers = { "x-test": "1" };
  const first = await runPluginRequestGate(gateArgs(headers));
  const second = await runPluginRequestGate(gateArgs(headers));
  assert.equal(first.blocked, true);
  assert.equal(second.blocked, true);
  assert.equal(hook.calls, 2);
});

test("a body-rewriting hook is asked again on every call", async () => {
  const hook = countingHook(() => ({
    body: { messages: [{ role: "user", content: "rewritten" }] },
  }));
  const headers = { "x-test": "1" };
  const first = await runPluginRequestGate(gateArgs(headers));
  const second = await runPluginRequestGate(gateArgs(headers));
  assert.equal(hook.calls, 2);
  assert.equal(first.blocked, false);
  assert.equal(second.blocked, false);
  if (!first.blocked && !second.blocked) {
    assert.deepEqual(first.body, { messages: [{ role: "user", content: "rewritten" }] });
    assert.deepEqual(second.body, first.body);
  }
});

test("a hook that rewrites the body in place and returns the same object is asked again", async () => {
  const hook = { calls: 0 };
  registerHook("onRequest", PLUGIN, (ctx: { body: { messages?: unknown[] } }) => {
    hook.calls += 1;
    ctx.body.messages = [{ role: "user", content: "rewritten-in-place" }];
    return { body: ctx.body };
  });
  const headers = { "x-test": "1" };
  await runPluginRequestGate(gateArgs(headers));
  // The failover attempt gets its own top-level body object: the in-place rewrite of the first
  // attempt is not on it, so the hook must run again.
  const second = await runPluginRequestGate(gateArgs(headers));
  assert.equal(hook.calls, 2);
  assert.equal(second.blocked, false);
  if (!second.blocked) {
    assert.deepEqual((second.body as { messages: unknown[] }).messages, [
      { role: "user", content: "rewritten-in-place" },
    ]);
  }
});
