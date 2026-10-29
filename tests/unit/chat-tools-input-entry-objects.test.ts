import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// `tools` and `input` are `z.array(z.unknown())` in the route schema, like `messages`. #12643 made
// a `messages` entry that is not an object answer 400; a `null` entry in `tools` or `input` still
// reached `generateSessionId` and the translators and surfaced as a 500 (a TypeError on `null.name`
// or `null.role`).

const harness = await createChatPipelineHarness("chat-tools-input-entry-objects");
const { handleChat, buildRequest, resetStorage, seedConnection } = harness;

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

async function post(extra: Record<string, unknown>) {
  await seedConnection("anthropic", { apiKey: "sk-ant" });

  let upstreamCalled = false;
  globalThis.fetch = async () => {
    upstreamCalled = true;
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  };

  let status = 0;
  let message = "";
  try {
    const response = await handleChat(
      buildRequest({
        body: {
          model: "anthropic/claude-haiku-4-5",
          messages: [{ role: "user", content: "hi" }],
          ...extra,
        },
      })
    );
    status = response.status;
    message = ((await response.json()) as { error?: { message?: string } }).error?.message ?? "";
  } catch (error) {
    // A throw out of handleChat is what the route turns into a 500.
    status = 500;
    message = error instanceof Error ? error.message : String(error);
  }
  return { status, message, upstreamCalled };
}

test("tools: [null] is rejected with a clear 400", async () => {
  const { status, message, upstreamCalled } = await post({ tools: [null] });
  assert.equal(status, 400, `expected 400, got ${status}: ${message}`);
  assert.match(message, /tools: Expected array of objects/i);
  assert.equal(upstreamCalled, false, "must not forward upstream");
});

test("tools with a string or number entry are rejected with a clear 400", async () => {
  for (const tools of [[{ type: "function", function: { name: "f" } }, "oops"], [42]]) {
    const { status, message, upstreamCalled } = await post({ tools });
    assert.equal(status, 400, `expected 400 for ${JSON.stringify(tools)}, got ${status}: ${message}`);
    assert.match(message, /tools: Expected array of objects/i);
    assert.equal(upstreamCalled, false);
  }
});

test("input: [null] is rejected with a clear 400, plain string items stay valid", async () => {
  const bad = await post({ input: [null, { role: "user", content: "hi" }] });
  assert.equal(bad.status, 400, `expected 400, got ${bad.status}: ${bad.message}`);
  assert.match(bad.message, /input: Expected array of objects or strings/i);
  assert.equal(bad.upstreamCalled, false);

  const ok = await post({ input: ["plain turn", { role: "user", content: "hi" }] });
  assert.notEqual(ok.status, 400, `string items must not be rejected: ${ok.message}`);
});
