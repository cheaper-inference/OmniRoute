import test from "node:test";
import assert from "node:assert/strict";
import { shouldRetrySameAccountTransport } from "../../src/sse/services/sameAccountTransportRetry.ts";
import { isAntigravityPreResponseTimeout } from "../../open-sse/services/antigravityTimeout.ts";
import { createUpstreamStartTimeoutError } from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";
import { handleAntigravityFallbackChainError } from "../../open-sse/executors/antigravity/proFallbackChain.ts";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import {
  seedAntigravityIdeVersionCache,
  clearAntigravityVersionCaches,
} from "../../open-sse/services/antigravityVersion.ts";

const code = "ANTIGRAVITY_PRE_RESPONSE_TIMEOUT";
test("confirmed timeout is never a same-account transport retry, even with reset text", () => {
  for (const provider of ["antigravity", "agy", undefined]) {
    assert.equal(
      shouldRetrySameAccountTransport({
        provider,
        status: 504,
        errorCode: code,
        errorType: "upstream_timeout",
        errorText: "connection reset",
        attempt: 0,
      }),
      false
    );
  }
  assert.equal(
    shouldRetrySameAccountTransport({ provider: "agy", status: 504, attempt: 0 }),
    false
  );
  assert.equal(isAntigravityPreResponseTimeout({ code }), true);
  assert.equal(isAntigravityPreResponseTimeout({ status: 504, type: "upstream_timeout" }), false);
});

test("outer pre-header timeout carries Antigravity-only marker without tagging other providers", () => {
  const antigravity = createUpstreamStartTimeoutError(
    12000,
    "antigravity",
    "gemini-3.8-flash-high"
  );
  assert.equal(isAntigravityPreResponseTimeout(antigravity), true);
  assert.equal((antigravity as Error & { code?: string }).code, code);
  const other = createUpstreamStartTimeoutError(12000, "codex", "gpt-test");
  assert.equal(isAntigravityPreResponseTimeout(other), false);
});

test("Codex still keeps its bounded 504 replay on non-Antigravity timeouts", () => {
  assert.equal(
    shouldRetrySameAccountTransport({
      provider: "codex",
      status: 504,
      errorType: "upstream_timeout",
      attempt: 0,
    }),
    true
  );
  assert.equal(
    shouldRetrySameAccountTransport({
      provider: "codex",
      status: 504,
      errorType: "upstream_timeout",
      attempt: 1,
    }),
    false
  );
});

test("transient 502, 503 and socket resets retain bounded same-account retry", () => {
  for (const status of [502, 503]) {
    assert.equal(
      shouldRetrySameAccountTransport({ provider: "antigravity", status, attempt: 0 }),
      true
    );
    assert.equal(
      shouldRetrySameAccountTransport({ provider: "antigravity", status, attempt: 1 }),
      false
    );
  }
  assert.equal(
    shouldRetrySameAccountTransport({ status: 500, errorText: "ECONNRESET", attempt: 0 }),
    true
  );
  for (const status of [499, 429, 401, 400]) {
    assert.equal(shouldRetrySameAccountTransport({ status, attempt: 0 }), false);
  }
});

test("forced connections and emitted output prohibit retries", () => {
  assert.equal(
    shouldRetrySameAccountTransport({ status: 503, attempt: 0, hasForcedConnection: true }),
    false
  );
  assert.equal(
    shouldRetrySameAccountTransport({ status: 502, attempt: 0, hasEmittedOutput: true }),
    false
  );
});

test("Pro candidate fallback preserves the exact timeout instead of hiding or replaying it", () => {
  const error = Object.assign(new Error("headers timeout"), { code });
  const outcome = handleAntigravityFallbackChainError(
    {
      model: "gemini-3.1-pro-low",
      body: {},
      stream: true,
      credentials: {},
    },
    error,
    "gemini-3.1-pro-low",
    0,
    ["gemini-3.1-pro-low", "gemini-3-pro-low"],
    null,
    "gemini-3.1-pro-low"
  );
  assert.equal(outcome.action, "throw");
  if (outcome.action === "throw") assert.equal(outcome.error, error);
});

test("executor sends a confirmed header timeout only once across all URLs and Pro ids", async () => {
  seedAntigravityIdeVersionCache("2.1.1");
  const original = globalThis.fetch;
  let sends = 0;
  globalThis.fetch = async () => {
    sends++;
    throw Object.assign(new Error("headers timeout"), { name: "TimeoutError", code });
  };
  try {
    const executor = new AntigravityExecutor();
    await assert.rejects(
      executor.execute({
        model: "gemini-3.1-pro-low",
        body: { messages: [{ role: "user", content: "fixture" }] },
        stream: true,
        credentials: { accessToken: "fixture", projectId: "fixture-project" },
      }),
      (error: unknown) => isAntigravityPreResponseTimeout(error)
    );
    assert.equal(sends, 1);
    assert.equal(executor.shouldRetry(504, 0), false);
    assert.equal(executor.shouldRetry(503, 0), executor.getFallbackCount() > 1);
  } finally {
    globalThis.fetch = original;
    clearAntigravityVersionCaches();
  }
});
