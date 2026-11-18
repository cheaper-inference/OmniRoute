/**
 * A 400 field-downgrade (strip the rejected field, retry) must survive a later
 * re-run of the same URL. The intra-URL 429 retry rebuilds the body from the
 * original request; the field the upstream already rejected must stay stripped.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { BaseExecutor } from "../../open-sse/executors/base.ts";

const realFetch = globalThis.fetch;
const realDelay = BaseExecutor.RETRY_CONFIG.delayMs;

function stub(handler: (body: string, n: number) => Response): string[] {
  const bodies: string[] = [];
  globalThis.fetch = (async (_url: RequestInfo | URL, init?: RequestInit) => {
    const body = String(init?.body ?? "");
    if (!body) return new Response("{}", { status: 200 });
    bodies.push(body);
    return handler(body, bodies.length);
  }) as typeof fetch;
  return bodies;
}

test.beforeEach(() => {
  BaseExecutor.RETRY_CONFIG.delayMs = 1;
});
test.afterEach(() => {
  BaseExecutor.RETRY_CONFIG.delayMs = realDelay;
  globalThis.fetch = realFetch;
});

test("top-level field stripped on a 400 stays stripped after a 429 re-run", async () => {
  const bodies = stub((body, n) => {
    if (body.includes('"verbosity"')) {
      return new Response('{"error":"verbosity: Extra inputs are not permitted"}', { status: 400 });
    }
    return n === 2 ? new Response('{"error":"slow down"}', { status: 429 }) : new Response("{}");
  });
  const res = await new DefaultExecutor("openai").execute({
    model: "gpt-4o",
    body: { model: "gpt-4o", messages: [{ role: "user", content: "hi" }], verbosity: "low" },
    stream: false,
    credentials: { apiKey: "test-key", connectionId: "rerun-1", providerSpecificData: {} },
  } as never);
  assert.deepEqual(
    bodies.map((b) => b.includes('"verbosity"')),
    [true, false, false]
  );
  assert.equal(res.response.status, 200);
});

test("messages[*] field stripped on a 400 stays stripped after a 429 re-run", async () => {
  const input = { role: "user", content: "hi", reasoning_content: "x" };
  const bodies = stub((body, n) => {
    if (body.includes('"reasoning_content"')) {
      return new Response(
        JSON.stringify({
          detail: [{ type: "extra_forbidden", loc: ["body", "messages", 0, "reasoning_content"] }],
        }),
        { status: 400 }
      );
    }
    return n === 2 ? new Response('{"error":"slow down"}', { status: 429 }) : new Response("{}");
  });
  const res = await new DefaultExecutor("openai").execute({
    model: "gpt-4o",
    body: { model: "gpt-4o", messages: [input] },
    stream: false,
    credentials: { apiKey: "test-key", connectionId: "rerun-2", providerSpecificData: {} },
  } as never);
  assert.deepEqual(
    bodies.map((b) => b.includes('"reasoning_content"')),
    [true, false, false]
  );
  assert.equal(res.response.status, 200);
  assert.equal(input.reasoning_content, "x", "the caller's message object is not mutated");
});
