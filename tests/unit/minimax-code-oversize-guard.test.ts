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
