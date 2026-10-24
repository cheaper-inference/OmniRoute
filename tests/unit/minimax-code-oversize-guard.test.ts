import test from "node:test";
import assert from "node:assert/strict";

async function loadGateway() {
  return import("../../open-sse/executors/minimaxCodeGateway.ts");
}

/**
 * The ceiling of the managed gateway is the window of the gateway: 1000000.
 * The model catalog of the MiniMax Code product declares 512000 for
 * MiniMax-M3 and MiniMax-M3.1-Flash and offers 1000000 as a second window
 * behind the `higher_usage` hint. The gateway answers inside the larger
 * window — a request of 1024056 input tokens was answered with 200 in 42.8 s
 * — so the guard must not refuse what the gateway answers.
 */
test("an oversized request is refused before it reaches the gateway", async () => {
  const { buildGatewayPayload, isGatewayPayloadOversized } = await loadGateway();
  const huge = "x".repeat(3_300_000);
  const payload = buildGatewayPayload(
    { messages: [{ role: "user", content: huge }] },
    "MiniMax-M3.1-Flash"
  );
  assert.equal(isGatewayPayloadOversized(payload), true);
});

test("a request of the size the gateway answered is not refused", async () => {
  const { buildGatewayPayload, isGatewayPayloadOversized } = await loadGateway();
  // 2.9M characters are about 966k estimated tokens, just under the window
  // of the gateway, which answered a request of 1024056 input tokens.
  const payload = buildGatewayPayload(
    { messages: [{ role: "user", content: "x".repeat(2_900_000) }] },
    "MiniMax-M3.1-Flash"
  );
  assert.equal(isGatewayPayloadOversized(payload), false);
});

test("the ceiling is the context window of the gateway", async () => {
  const { resolveGatewayInputLimit } = await loadGateway();
  // The gateway answered a request of 1024056 input tokens with 200.
  assert.equal(resolveGatewayInputLimit(), 1_000_000);
});

test("the narrower window of the catalog can be selected", async () => {
  const { buildGatewayPayload, resolveContextWindow, resolveGatewayInputLimit } =
    await loadGateway();
  const before = process.env.MINIMAX_CODE_CONTEXT_WINDOW;
  try {
    process.env.MINIMAX_CODE_CONTEXT_WINDOW = "512000";
    assert.equal(resolveContextWindow(), 512_000);
    assert.equal(resolveGatewayInputLimit(), 512_000);
    const payload = buildGatewayPayload(
      { messages: [{ role: "user", content: "hi" }] },
      "MiniMax-M3.1-Flash"
    );
    assert.equal(payload.context_window, 512_000);
  } finally {
    if (before === undefined) delete process.env.MINIMAX_CODE_CONTEXT_WINDOW;
    else process.env.MINIMAX_CODE_CONTEXT_WINDOW = before;
  }
});

test("a window the catalog does not offer is ignored", async () => {
  const { resolveContextWindow } = await loadGateway();
  const before = process.env.MINIMAX_CODE_CONTEXT_WINDOW;
  try {
    process.env.MINIMAX_CODE_CONTEXT_WINDOW = "123456";
    assert.equal(resolveContextWindow(), 1_000_000);
  } finally {
    if (before === undefined) delete process.env.MINIMAX_CODE_CONTEXT_WINDOW;
    else process.env.MINIMAX_CODE_CONTEXT_WINDOW = before;
  }
});

test("the default window is not sent as a field of the request", async () => {
  const { buildGatewayPayload } = await loadGateway();
  const payload = buildGatewayPayload(
    { messages: [{ role: "user", content: "hi" }] },
    "MiniMax-M3.1-Flash"
  );
  assert.equal(payload.context_window, undefined);
});

test("a refusal of the gateway for a request that does not fit is a 413", async () => {
  const { gatewayErrorStatus, isContextWindowFailure } = await loadGateway();
  // The gateway answers such a request with a 400 and
  // `invalid params, context window exceeds limit (2013)`.
  assert.equal(isContextWindowFailure("invalid params, context window exceeds limit (2013)"), true);
  assert.equal(
    gatewayErrorStatus(
      "invalid_request_error",
      "invalid params, context window exceeds limit (2013)"
    ),
    413
  );
  // A refusal that is not about the window keeps its own status.
  assert.equal(gatewayErrorStatus("invalid_request_error", "model not found"), 400);
});

test("a normal request is not refused", async () => {
  const { buildGatewayPayload, isGatewayPayloadOversized } = await loadGateway();
  const payload = buildGatewayPayload(
    {
      messages: [
        { role: "user", content: "What time is it?" },
        { role: "assistant", content: "Checking." },
        { role: "user", content: "Thanks." },
      ],
    },
    "MiniMax-M3.1-Flash"
  );
  assert.equal(isGatewayPayloadOversized(payload), false);
});

test("a request whose tool schemas are oversized is refused", async () => {
  const { buildGatewayPayload, isGatewayPayloadOversized } = await loadGateway();
  // The tool catalog of an agentic client is the largest part of the request,
  // so the guard has to count it: the incident this guard was written for was
  // an oversized request whose bulk was tool schemas.
  const tools = Array.from({ length: 200 }, (_, i) => ({
    type: "function",
    function: {
      name: `tool_${i}`,
      description: "x".repeat(20_000),
      parameters: { type: "object", properties: { arg: { type: "string" } } },
    },
  }));
  const payload = buildGatewayPayload(
    { messages: [{ role: "user", content: "hi" }], tools },
    "MiniMax-M3.1-Flash"
  );
  assert.equal(isGatewayPayloadOversized(payload), true);
});

test("the token estimate grows with the prompt", async () => {
  const { buildGatewayPayload, estimateGatewayInputTokens } = await loadGateway();
  const small = buildGatewayPayload(
    { messages: [{ role: "user", content: "hi" }] },
    "MiniMax-M3.1-Flash"
  );
  const large = buildGatewayPayload(
    { messages: [{ role: "user", content: "hi".repeat(1000) }] },
    "MiniMax-M3.1-Flash"
  );
  assert.ok(estimateGatewayInputTokens(large) > estimateGatewayInputTokens(small));
});

test("the estimate stays under the ceiling for a realistic agent session", async () => {
  const { buildGatewayPayload, isGatewayPayloadOversized } = await loadGateway();
  const messages = Array.from({ length: 40 }, (_, i) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content: "a".repeat(4_000),
  }));
  const payload = buildGatewayPayload({ messages }, "MiniMax-M3.1-Flash");
  assert.equal(isGatewayPayloadOversized(payload), false);
});

/**
 * The local transport has the lower ceiling: the CLI adds its own agent
 * scaffolding to the prompt, so the request that reaches the model is larger
 * than the one that was sent. A request of ~322k input tokens ran there for
 * 236 s and came back as `limit_exceeded`, which locks the model out of the
 * fallbacks.
 */
test("the local transport refuses a request the gateway would answer", async () => {
  const { isLocalRequestOversized } = await import("../../open-sse/executors/minimax-code.ts");
  assert.equal(isLocalRequestOversized("x".repeat(900_000)), true);
  assert.equal(isLocalRequestOversized("x".repeat(300_000)), false);
});

test("the gateway input ceiling is the window of the gateway", async () => {
  const { resolveGatewayInputLimit } = await loadGateway();
  const previous = process.env.MINIMAX_CODE_MAX_INPUT_TOKENS;
  try {
    delete process.env.MINIMAX_CODE_MAX_INPUT_TOKENS;
    assert.equal(resolveGatewayInputLimit(), 1_000_000);
    // The operator can lower the ceiling for a stricter deployment ...
    process.env.MINIMAX_CODE_MAX_INPUT_TOKENS = "300000";
    assert.equal(resolveGatewayInputLimit(), 300_000);
    // ... but not raise it above the window of the gateway.
    process.env.MINIMAX_CODE_MAX_INPUT_TOKENS = "2000000";
    assert.equal(resolveGatewayInputLimit(), 1_000_000);
    // A value that is not a positive number keeps the guard in place.
    process.env.MINIMAX_CODE_MAX_INPUT_TOKENS = "0";
    assert.equal(resolveGatewayInputLimit(), 1_000_000);
    process.env.MINIMAX_CODE_MAX_INPUT_TOKENS = "not-a-number";
    assert.equal(resolveGatewayInputLimit(), 1_000_000);
  } finally {
    if (previous === undefined) delete process.env.MINIMAX_CODE_MAX_INPUT_TOKENS;
    else process.env.MINIMAX_CODE_MAX_INPUT_TOKENS = previous;
  }
});

test("a ceiling above the window of the gateway does not raise it", async () => {
  const { buildGatewayPayload, isGatewayPayloadOversized } = await loadGateway();
  const previous = process.env.MINIMAX_CODE_MAX_INPUT_TOKENS;
  try {
    const huge = "x".repeat(3_300_000);
    const payload = buildGatewayPayload(
      { messages: [{ role: "user", content: huge }] },
      "MiniMax-M3.1-Flash"
    );
    process.env.MINIMAX_CODE_MAX_INPUT_TOKENS = "2000000";
    assert.equal(isGatewayPayloadOversized(payload), true);
  } finally {
    if (previous === undefined) delete process.env.MINIMAX_CODE_MAX_INPUT_TOKENS;
    else process.env.MINIMAX_CODE_MAX_INPUT_TOKENS = previous;
  }
});

/**
 * The estimate has to stay on the pessimistic side of the real token count.
 * A single chars-per-token ratio under-counts every script that packs more
 * than one symbol per token — the payload the guard lets through is the
 * payload the gateway rejects after minutes of work.
 */
test("the estimate does not under-count Russian text", async () => {
  const { buildGatewayPayload, isGatewayPayloadOversized, estimateGatewayInputTokens } =
    await loadGateway();
  // ~2.4M characters of Cyrillic: around 1.2M tokens, above the window.
  const payload = buildGatewayPayload(
    { messages: [{ role: "user", content: "ы".repeat(2_400_000) }] },
    "MiniMax-M3.1-Flash"
  );
  assert.ok(estimateGatewayInputTokens(payload) > 1_000_000);
  assert.equal(isGatewayPayloadOversized(payload), true);
});

test("the estimate does not under-count Chinese text", async () => {
  const { buildGatewayPayload, isGatewayPayloadOversized, estimateGatewayInputTokens } =
    await loadGateway();
  // 1.2M characters of CJK: around 1.2M tokens, above the window.
  const payload = buildGatewayPayload(
    { messages: [{ role: "user", content: "漢".repeat(1_200_000) }] },
    "MiniMax-M3.1-Flash"
  );
  assert.ok(estimateGatewayInputTokens(payload) > 1_000_000);
  assert.equal(isGatewayPayloadOversized(payload), true);
});

test("a request-scoped refusal is not in the model lockout list", async () => {
  const { DEFAULT_MODEL_LOCKOUT_SETTINGS } = await import("@/lib/resilience/modelLockoutSettings");
  // The statuses of a refusal that belongs to the request. A 502 would be
  // recorded as a model outage and lock the model out of the fallbacks — the
  // incident of 2026-10-21 took the MiniMax leg down for ~27 minutes.
  assert.equal(DEFAULT_MODEL_LOCKOUT_SETTINGS.errorCodes.includes(400), false);
  assert.equal(DEFAULT_MODEL_LOCKOUT_SETTINGS.errorCodes.includes(413), false);
  assert.equal(DEFAULT_MODEL_LOCKOUT_SETTINGS.errorCodes.includes(422), false);
  // The statuses of an outage stay in the list: the model really is down.
  assert.equal(DEFAULT_MODEL_LOCKOUT_SETTINGS.errorCodes.includes(502), true);
  assert.equal(DEFAULT_MODEL_LOCKOUT_SETTINGS.errorCodes.includes(503), true);
});

test("a missing credential is not in the model lockout list", async () => {
  const { DEFAULT_MODEL_LOCKOUT_SETTINGS } = await import("@/lib/resilience/modelLockoutSettings");
  // The local CLI refuses a run when it is not signed in. That refusal is a
  // property of the credential, not of the model: it must not lock the model
  // out of the fallbacks.
  assert.equal(DEFAULT_MODEL_LOCKOUT_SETTINGS.errorCodes.includes(401), false);
});
