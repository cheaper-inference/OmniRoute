import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// F-C4-14: BaseExecutor.execute() parsed `transformedBody` from the first attempt's serialized
// body and never refreshed it after a recovery retry. chatCore logs and attributes the request
// from `result.transformedBody`, so the log showed a body the upstream never received last.
function mockContextEditingRejection() {
  const sent: Array<Record<string, unknown>> = [];
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = (async (_url: unknown, init: { body?: unknown } = {}) => {
    calls += 1;
    sent.push(JSON.parse(String(init.body ?? "{}")));
    if (calls === 1) {
      return new Response(
        JSON.stringify({
          error: { type: "invalid_request_error", message: "context_management is not supported" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  return { sent, restore: () => void (globalThis.fetch = original) };
}

test("result.transformedBody is the body of the last attempt after a context-editing retry", async () => {
  const { sent, restore } = mockContextEditingRejection();
  let result: Awaited<ReturnType<DefaultExecutor["execute"]>>;
  try {
    result = await new DefaultExecutor("claude").execute({
      model: "claude-opus-4-8",
      body: {
        model: "claude-opus-4-8",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: { apiKey: "claude-key" },
      contextEditing: { enabled: true },
    });
  } finally {
    restore();
  }

  assert.equal(sent.length, 2, "the 400 must trigger exactly one retry");
  assert.ok(sent[0].context_management !== undefined, "the first attempt carries the edit");
  assert.equal(sent[1].context_management, undefined, "the retry drops it");

  const reported = result.transformedBody as Record<string, unknown>;
  assert.equal(
    reported.context_management,
    undefined,
    "the reported body must not carry the edit the upstream rejected"
  );
  assert.deepEqual(reported, sent[1]);
});

test("result.transformedBody is unchanged when no recovery retry happens", async () => {
  const sent: Array<Record<string, unknown>> = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (_url: unknown, init: { body?: unknown } = {}) => {
    sent.push(JSON.parse(String(init.body ?? "{}")));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  let result: Awaited<ReturnType<DefaultExecutor["execute"]>>;
  try {
    result = await new DefaultExecutor("claude").execute({
      model: "claude-opus-4-8",
      body: {
        model: "claude-opus-4-8",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: { apiKey: "claude-key" },
      contextEditing: { enabled: true },
    });
  } finally {
    globalThis.fetch = original;
  }
  assert.equal(sent.length, 1);
  assert.deepEqual(result.transformedBody, sent[0]);
});

test("a retry keeps the tool-name map on the reported body", async () => {
  const { sent, restore } = mockContextEditingRejection();
  let result: Awaited<ReturnType<DefaultExecutor["execute"]>>;
  try {
    // An API key (not an OAuth token) so no identity bootstrap request precedes the chat request.
    result = await new DefaultExecutor("claude").execute({
      model: "claude-opus-4-8",
      body: {
        model: "claude-opus-4-8",
        messages: [{ role: "user", content: "hi" }],
        tools: [{ name: "mixture_of_agents", description: "d", input_schema: { type: "object" } }],
        max_tokens: 1,
      },
      stream: false,
      credentials: { apiKey: "claude-key" },
      clientHeaders: { "user-agent": "claude-cli/2.0.0 (external, cli)", "x-app": "cli" },
      contextEditing: { enabled: true },
    });
  } finally {
    restore();
  }
  assert.equal(sent.length, 2, "the 400 must trigger exactly one retry");
  assert.ok(sent[0].context_management !== undefined, "the first attempt carries the edit");
  assert.equal(sent[1].context_management, undefined, "the retry drops it");
  const reported = result.transformedBody as Record<string, unknown>;
  const map = reported._toolNameMap;
  assert.ok(map instanceof Map, "the cloak reverse map must survive the re-parse");
  assert.equal((map as Map<string, string>).get("MixtureOfAgents"), "mixture_of_agents");
  assert.equal(JSON.stringify(reported).includes("_toolNameMap"), false);
});
