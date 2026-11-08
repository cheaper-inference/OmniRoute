/**
 * JON-562 follow-up: the provider circuit breaker lives in a process-wide registry, and
 * getCircuitBreaker() replaces its callbacks on every call. The chat handler used to pass arrows
 * created inside the request function. A V8 closure keeps its whole function context, so the
 * breaker retained the last request's scope — body included (a 100k-token /v1/messages body
 * survived forced GC that way). The callbacks the breaker stores must therefore be the same
 * module-level functions on every request: a new function per request is the retention.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("breaker-callbacks-stable");
const { getCircuitBreaker } = await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;

test.beforeEach(async () => {
  await h.resetStorage();
  globalThis.fetch = (async () => h.buildOpenAIResponse("ok")) as typeof fetch;
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => h.cleanup());

async function send(content: string): Promise<void> {
  const response = await h.handleChat(
    h.buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content }],
      },
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  await response.text();
}

test("the provider breaker keeps the same callbacks across chat requests", async () => {
  await h.seedConnection("openai", { name: "breaker-callbacks", apiKey: "sk-breaker-callbacks" });

  await send(`first request ${"x".repeat(10_000)}`);
  const breaker = getCircuitBreaker("openai");
  const firstOnStateChange = breaker.onStateChange;
  const firstIsFailure = breaker.isFailure;
  assert.equal(typeof firstOnStateChange, "function", "the chat handler installs a state logger");

  await send(`second request ${"y".repeat(10_000)}`);
  assert.equal(
    getCircuitBreaker("openai"),
    breaker,
    "the registry hands back the same provider breaker"
  );
  assert.equal(
    breaker.onStateChange,
    firstOnStateChange,
    "onStateChange must not be a closure created per request (it would retain that request)"
  );
  assert.equal(
    breaker.isFailure,
    firstIsFailure,
    "isFailure must not be a closure created per request (it would retain that request)"
  );
});
