/**
 * A 400 field-downgrade must survive the intra-URL 429 re-run for a Claude-compatible
 * relay with active thinking too. The re-run rebuilds the body; the Claude block then
 * re-adds `context_management` (paired with active thinking). The learned strip has to
 * run after that block, or the relay rejects the same field a second time.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { BaseExecutor } from "../../open-sse/executors/base.ts";

const realFetch = globalThis.fetch;
const realDelay = BaseExecutor.RETRY_CONFIG.delayMs;

test.beforeEach(() => {
  BaseExecutor.RETRY_CONFIG.delayMs = 1;
});
test.afterEach(() => {
  BaseExecutor.RETRY_CONFIG.delayMs = realDelay;
  globalThis.fetch = realFetch;
});

test("context_management stripped on a 400 stays stripped after a 429 re-run with active thinking", async () => {
  const bodies: string[] = [];
  globalThis.fetch = (async (_url: RequestInfo | URL, init?: RequestInit) => {
    const body = String(init?.body ?? "");
    if (!body) return new Response("{}", { status: 200 });
    bodies.push(body);
    if (body.includes('"context_management"')) {
      return new Response('{"error":"context_management: Extra inputs are not permitted"}', {
        status: 400,
      });
    }
    return bodies.length === 2
      ? new Response('{"error":"slow down"}', { status: 429 })
      : new Response("{}", { status: 200 });
  }) as typeof fetch;

  const res = await new DefaultExecutor("anthropic-compatible-cc-rerun").execute({
    model: "claude-sonnet-4-5",
    body: {
      model: "claude-sonnet-4-5",
      max_tokens: 4096,
      messages: [{ role: "user", content: "hi" }],
      thinking: { type: "enabled", budget_tokens: 2048 },
    },
    stream: false,
    credentials: {
      apiKey: "relay-key",
      connectionId: "rerun-thinking-1",
      providerSpecificData: { baseUrl: "https://relay.example/v1" },
    },
  } as never);

  assert.deepEqual(
    bodies.map((b) => b.includes('"context_management"')),
    [true, false, false],
    `sent ${bodies.length} bodies, context_management flags: ${bodies.map((b) => b.includes("context_management"))}`
  );
  assert.equal(res.response.status, 200);
});
