// Same status contract as tests/unit/credits-signal-400-status-gate.test.ts, applied to
// the subscription/plan quota text signals ("usage limit reached", "plan limit",
// "weekly usage limit", ...). A 400 is how upstreams reject the caller's own input, and
// many of them quote that input back in error.message, so on 400 such a phrase counts
// only when the structured error code is a credit/quota code, or the provider is one
// whose documented 400 form is message-only (command-code, bai, openai-compatible-*).
// 429, 403 and every other status keep the plain text match.
import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("subscription-quota-400-status-gate");
const providersDb = await import("../../src/lib/db/providers.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");
const { shouldCoolDownSearchConnection } =
  await import("../../open-sse/handlers/search/searchProxy.ts");

const originalFetch = globalThis.fetch;
const ECHO_MARKER = "ECHO-MARKER-REQUEST";

// Typed invalid_request_error repeating a caller-chosen subscription-quota phrase.
const TYPED_ECHO_400 = {
  error: {
    message: "Unknown parameter: 'usage limit reached'.",
    type: "invalid_request_error",
  },
};
// Untyped 400 outside the param-validation patterns, same phrase family.
const UNTYPED_ECHO_400 = {
  error: {
    message: "Invalid value 'you have reached your usage limit' for model",
    type: "api_error",
  },
};
const ECHOED_PHRASES = [
  "Unknown parameter: 'usage limit reached'.",
  "Invalid value 'plan limit exceeded' for model",
  "Unknown parameter: 'this request exceeds your plan'.",
  "Unknown parameter: 'you have reached your weekly usage limit'.",
  "Unknown parameter: 'session usage limit'.",
  "Unknown parameter: 'usage limit reached, try again in 30 minutes'.",
];

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => h.cleanup());

function stubUpstream(echoBody: unknown) {
  const calls = { echo: 0, clean: 0 };
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    const sent = typeof init?.body === "string" ? init.body : "";
    if (sent.includes(ECHO_MARKER)) {
      calls.echo++;
      return new Response(JSON.stringify(echoBody), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    calls.clean++;
    return h.buildOpenAIResponse("served");
  }) as typeof fetch;
  return calls;
}

function chatRequest(content: string) {
  return h.buildRequest({
    body: {
      model: "openai/gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content }],
    },
  });
}

function isOnHold(conn: { rateLimitedUntil?: unknown; testStatus?: unknown } | null): boolean {
  const until = conn?.rateLimitedUntil;
  const untilMs = typeof until === "string" ? Date.parse(until) : Number(until ?? 0);
  return conn?.testStatus === "unavailable" || (Number.isFinite(untilMs) && untilMs > Date.now());
}

for (const [label, echoBody] of [
  ["typed invalid_request_error", TYPED_ECHO_400],
  ["untyped 400 outside the param-validation patterns", UNTYPED_ECHO_400],
] as const) {
  test(`${label}: a caller-echoed subscription-quota phrase never puts a shared openai connection on hold`, async () => {
    await h.resetStorage();
    const conns = [];
    for (let i = 0; i < 3; i++) {
      conns.push(await h.seedConnection("openai", { name: `shared-${i}` }));
    }
    const calls = stubUpstream(echoBody);

    for (let i = 0; i < 3; i++) {
      const res = await h.handleChat(chatRequest(`hello ${ECHO_MARKER} ${i}`));
      await res.text();
    }
    assert.ok(calls.echo >= 3, `expected the echo requests to reach upstream, got ${calls.echo}`);

    for (const conn of conns) {
      const after = await providersDb.getProviderConnectionById(conn.id);
      assert.equal(isOnHold(after), false, `connection ${after?.name} put on hold`);
      assert.notEqual(after?.lastErrorType, "quota_exhausted", `${after?.name} quota_exhausted`);
    }

    const clean = await h.handleChat(chatRequest("a clean request"));
    const body = await clean.text();
    assert.equal(clean.status, 200, `clean request was not served: ${body}`);
    assert.ok(calls.clean >= 1);
  });
}

test("echoed 400 subscription-quota phrases are not QUOTA_EXHAUSTED for openai", () => {
  for (const message of ECHOED_PHRASES) {
    const text = JSON.stringify({ error: { message, type: "invalid_request_error" } });
    assert.notEqual(
      classifyProviderError(400, text, "openai"),
      PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED,
      text
    );
    const result = checkFallbackError(400, text, 0, "gpt-4o-mini", "openai");
    assert.notEqual(result.reason, RateLimitReason.QUOTA_EXHAUSTED, text);
  }
});

test("search: an echoed 400 subscription-quota phrase does not cool down the connection", () => {
  assert.equal(
    shouldCoolDownSearchConnection(400, "Invalid query: 'usage limit reached for this plan'"),
    false
  );
});

test("control: 429 with the same subscription-quota text stays QUOTA_EXHAUSTED", () => {
  const text = JSON.stringify({ error: { message: "Usage limit reached for your plan." } });
  // OAuth provider and provider-less callers keep the 429 quota semantics.
  assert.equal(classifyProviderError(429, text, "claude"), PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED);
  assert.equal(classifyProviderError(429, text), PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED);
  const result = checkFallbackError(429, "Usage Limit Reached", 0, null, "claude");
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.cooldownMs, 60 * 60 * 1000);
  assert.equal(
    checkFallbackError(429, "you have reached your weekly usage limit", 0, null, "ollama-cloud")
      .reason,
    RateLimitReason.QUOTA_EXHAUSTED
  );
  assert.equal(shouldCoolDownSearchConnection(429, "usage limit reached"), true);
});

test("control: 403 subscription-quota text stays QUOTA_EXHAUSTED", () => {
  const text = JSON.stringify({
    error: { message: "You've reached your usage limit for this billing cycle." },
  });
  assert.equal(
    classifyProviderError(403, text, "kimi-coding"),
    PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );
});

test("control: a 400 with a structured quota code still counts on openai", () => {
  for (const code of ["insufficient_quota", "billing_hard_limit_reached"]) {
    const body = JSON.stringify({ error: { message: "Usage limit reached for your plan.", code } });
    assert.equal(
      classifyProviderError(400, body, "openai"),
      PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED,
      code
    );
    // The structured code held apart from the text (executor-parsed) also counts.
    const result = checkFallbackError(
      400,
      "Usage limit reached for your plan.",
      0,
      "gpt-4o-mini",
      "openai",
      null,
      null,
      { code }
    );
    assert.equal(result.shouldFallback, true, code);
    assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED, code);
    assert.equal(result.cooldownMs, 60 * 60 * 1000, code);
  }
  assert.equal(
    shouldCoolDownSearchConnection(
      400,
      JSON.stringify({ error: { message: "plan limit exceeded", code: "insufficient_quota" } })
    ),
    true
  );
});

test("control: a message-only 400 on an allow-listed provider still counts", () => {
  for (const provider of ["command-code", "bai", "openai-compatible-my-gateway"]) {
    const text = "Usage limit reached for your plan.";
    assert.equal(
      classifyProviderError(400, text, provider),
      PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED,
      provider
    );
    const result = checkFallbackError(400, text, 0, "m", provider);
    assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED, provider);
  }
});

test("the message-only allow-list is the id prefix, not a substring anywhere in the id", () => {
  assert.notEqual(
    classifyProviderError(400, "Usage limit reached", "my-openai-compatible-x"),
    PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );
});
