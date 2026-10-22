import test from "node:test";
import assert from "node:assert/strict";

async function loadGateway() {
  return import("../../open-sse/executors/minimaxCodeGateway.ts");
}

/**
 * Incident 2026-10-21: a request with ~322k input tokens was forwarded to the
 * managed gateway, ran for 236s and came back as `limit_exceeded`, which trips
 * the in-memory model lockout and takes the MiniMax leg out of every combo
 * for ~27 minutes. Oversized requests must be refused locally instead.
 */
test("an oversized request is refused before it reaches the gateway", async () => {
  const { buildGatewayPayload, isGatewayPayloadOversized } = await loadGateway();
  const huge = "x".repeat(900_000);
  const payload = buildGatewayPayload(
    { messages: [{ role: "user", content: huge }] },
    "MiniMax-M3.1-Flash"
  );
  assert.equal(isGatewayPayloadOversized(payload), true);
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
  const tools = Array.from({ length: 40 }, (_, i) => ({
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

test("the gateway input ceiling is an operator setting", async () => {
  const { resolveGatewayInputLimit } = await loadGateway();
  const previous = process.env.MINIMAX_CODE_MAX_INPUT_TOKENS;
  try {
    delete process.env.MINIMAX_CODE_MAX_INPUT_TOKENS;
    assert.equal(resolveGatewayInputLimit(), 200_000);
    // A deployment whose gateway accepts more can raise the ceiling.
    process.env.MINIMAX_CODE_MAX_INPUT_TOKENS = "500000";
    assert.equal(resolveGatewayInputLimit(), 500_000);
    // A value that is not a positive number keeps the guard in place.
    process.env.MINIMAX_CODE_MAX_INPUT_TOKENS = "0";
    assert.equal(resolveGatewayInputLimit(), 200_000);
    process.env.MINIMAX_CODE_MAX_INPUT_TOKENS = "not-a-number";
    assert.equal(resolveGatewayInputLimit(), 200_000);
  } finally {
    if (previous === undefined) delete process.env.MINIMAX_CODE_MAX_INPUT_TOKENS;
    else process.env.MINIMAX_CODE_MAX_INPUT_TOKENS = previous;
  }
});

test("a raised ceiling lets a bigger request through", async () => {
  const { buildGatewayPayload, isGatewayPayloadOversized } = await loadGateway();
  const previous = process.env.MINIMAX_CODE_MAX_INPUT_TOKENS;
  try {
    const huge = "x".repeat(900_000);
    const payload = buildGatewayPayload(
      { messages: [{ role: "user", content: huge }] },
      "MiniMax-M3.1-Flash"
    );
    process.env.MINIMAX_CODE_MAX_INPUT_TOKENS = "1000000";
    assert.equal(isGatewayPayloadOversized(payload), false);
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
  // ~500k characters of Cyrillic: around 250k tokens, well above the ceiling.
  const payload = buildGatewayPayload(
    { messages: [{ role: "user", content: "ы".repeat(500_000) }] },
    "MiniMax-M3.1-Flash"
  );
  assert.ok(estimateGatewayInputTokens(payload) > 200_000);
  assert.equal(isGatewayPayloadOversized(payload), true);
});

test("the estimate does not under-count Chinese text", async () => {
  const { buildGatewayPayload, isGatewayPayloadOversized, estimateGatewayInputTokens } =
    await loadGateway();
  // CJK is close to one token per character.
  const payload = buildGatewayPayload(
    { messages: [{ role: "user", content: "漢".repeat(300_000) }] },
    "MiniMax-M3.1-Flash"
  );
  assert.ok(estimateGatewayInputTokens(payload) > 200_000);
  assert.equal(isGatewayPayloadOversized(payload), true);
});

test("a request-scoped refusal is not in the model lockout list", async () => {
  const { DEFAULT_MODEL_LOCKOUT_SETTINGS } = await import(
    "@/lib/resilience/modelLockoutSettings"
  );
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
  const { DEFAULT_MODEL_LOCKOUT_SETTINGS } = await import(
    "@/lib/resilience/modelLockoutSettings"
  );
  // The local CLI refuses a run when it is not signed in. That refusal is a
  // property of the credential, not of the model: it must not lock the model
  // out of the fallbacks.
  assert.equal(DEFAULT_MODEL_LOCKOUT_SETTINGS.errorCodes.includes(401), false);
});
