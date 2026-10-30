/**
 * Anthropic-compatible relays that ban assistant prefill:
 *   400 "This model does not support assistant message prefill. The conversation must end
 *        with a user message."
 *
 * 1. `providerSpecificData.requireUserLastMessage` (opt-in, plain anthropic-compatible-*)
 *    drops trailing assistant turns at the executor's final pre-send step.
 * 2. The 400 itself is request-shape: it must not be read as "model unavailable" (which
 *    locked a healthy model for 1h on both combo targets and 503'd the next request).
 *
 * Run: node --import tsx/esm --test tests/unit/anthropic-compatible-prefill.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-anthropic-prefill-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "anthropic-prefill-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { stripTrailingAssistantTurns, requiresUserLastMessage, isAssistantPrefillUnsupported400 } =
  await import("../../open-sse/services/assistantPrefill.ts");
const { isModelScoped400 } = await import("../../open-sse/services/modelAccessDenied.ts");
const {
  isProviderModelUnsupported400,
  checkFallbackError,
  clearAllModelLockouts,
  getModelLockoutInfo,
} = await import("../../open-sse/services/accountFallback.ts");
const { isRequestScoped400 } =
  await import("../../open-sse/services/accountFallback/requestScoped400.ts");
const { shouldSkipConnDisable } = await import("../../open-sse/services/combo/comboPredicates.ts");
const { comboTargetDecision } =
  await import("../../open-sse/services/combo/statusDecisionTable.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { validateProviderSpecificData } =
  await import("../../src/shared/validation/providerSpecificData.ts");
const { normalizeProviderSpecificData } =
  await import("../../src/lib/providers/requestDefaults.ts");

const PREFILL_MSG =
  "This model does not support assistant message prefill. The conversation must end with a user message.";
const PREFILL_ENVELOPE = JSON.stringify({
  type: "error",
  error: { type: "invalid_request_error", message: PREFILL_MSG },
});

type Msg = Record<string, unknown>;
const user = (text: string): Msg => ({ role: "user", content: [{ type: "text", text }] });
const assistantText = (text: string): Msg => ({
  role: "assistant",
  content: [{ type: "text", text }],
});
// Incident shape: thinking + text whose XML only *looks* like a tool call.
const assistantThinkingXml = (): Msg => ({
  role: "assistant",
  content: [
    { type: "thinking", thinking: "plan", signature: "sig" },
    {
      type: "text",
      text: 'done <invoke name="compress"><parameter name="x">1</parameter></invoke><dcp-message-id>m1</dcp-message-id>',
    },
  ],
});
const toolUse = (id: string): Msg => ({
  role: "assistant",
  content: [{ type: "tool_use", id, name: "read", input: {} }],
});
const toolResult = (id: string): Msg => ({
  role: "user",
  content: [
    { type: "tool_result", tool_use_id: id, content: "ok", cache_control: { type: "ephemeral" } },
  ],
});

test.after(() => {
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── helper ───────────────────────────────────────────────────────────────────

test("strips a trailing text assistant", () => {
  const r = stripTrailingAssistantTurns([user("q"), assistantText("a")]);
  assert.equal(r.removedTurns, 1);
  assert.deepEqual(
    r.messages.map((m) => m.role),
    ["user"]
  );
});

test("strips thinking + text with XML tool-look-alike (not a structured tool_use)", () => {
  const r = stripTrailingAssistantTurns([user("q"), assistantThinkingXml()]);
  assert.equal(r.removedTurns, 1);
  assert.equal(r.messages.at(-1)?.role, "user");
});

test("strips several consecutive trailing assistant turns", () => {
  const r = stripTrailingAssistantTurns([
    user("q"),
    assistantText("a1"),
    assistantThinkingXml(),
    assistantText("a3"),
  ]);
  assert.equal(r.removedTurns, 3);
  assert.equal(r.messages.length, 1);
});

test("user-last history is returned unchanged (same reference)", () => {
  const msgs = [user("q"), assistantText("a"), user("q2")];
  const r = stripTrailingAssistantTurns(msgs);
  assert.equal(r.messages, msgs);
  assert.equal(r.removedTurns, 0);
});

test("completed tool pairs and their cache_control survive", () => {
  const msgs = [user("q"), toolUse("t1"), toolResult("t1"), assistantText("final")];
  const r = stripTrailingAssistantTurns(msgs);
  assert.equal(r.messages.length, 3);
  assert.deepEqual(r.messages[2], toolResult("t1"));
});

test("unanswered trailing tool_use is removed without leaving orphan tool_result", () => {
  const msgs = [user("q"), toolUse("t1"), toolResult("t1"), toolUse("t2")];
  const r = stripTrailingAssistantTurns(msgs);
  assert.equal(r.messages.at(-1)?.role, "user");
  assert.equal(r.messages.length, 3);
});

test("assistant-only history is never emptied nor given an invented user turn", () => {
  const msgs = [assistantText("a")];
  const r = stripTrailingAssistantTurns(msgs);
  assert.equal(r.messages, msgs);
  assert.equal(r.noUserTurn, true);
  assert.equal(r.removedTurns, 0);
});

test("does not mutate the input array or messages", () => {
  const msgs = [user("q"), assistantText("a")];
  const snapshot = structuredClone(msgs);
  stripTrailingAssistantTurns(msgs);
  assert.deepEqual(msgs, snapshot);
});

test("requiresUserLastMessage is strict-boolean opt-in", () => {
  assert.equal(requiresUserLastMessage({ requireUserLastMessage: true }), true);
  assert.equal(requiresUserLastMessage({ requireUserLastMessage: "true" }), false);
  assert.equal(requiresUserLastMessage({}), false);
  assert.equal(requiresUserLastMessage(null), false);
});

// ── settings plumbing ───────────────────────────────────────────────────────

test("validation accepts a boolean requireUserLastMessage and rejects other types", () => {
  const issues: unknown[] = [];
  const ctx = { addIssue: (i: unknown) => issues.push(i) } as never;
  validateProviderSpecificData({ requireUserLastMessage: true }, ctx);
  assert.equal(issues.length, 0);
  validateProviderSpecificData({ requireUserLastMessage: "yes" }, ctx);
  assert.equal(issues.length, 1);
});

test("normalization keeps a boolean flag and drops a non-boolean one", () => {
  assert.equal(
    (
      normalizeProviderSpecificData("anthropic-compatible-x", {
        requireUserLastMessage: true,
      }) as Msg
    ).requireUserLastMessage,
    true
  );
  assert.equal(
    "requireUserLastMessage" in
      (normalizeProviderSpecificData("anthropic-compatible-x", {
        requireUserLastMessage: "1",
        x: 1,
      }) as Msg),
    false
  );
});

// ── executor wiring (real DefaultExecutor.execute, fetch captured) ─────────

function captureFetch() {
  const bodies: Msg[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (_url: unknown, init: { body?: unknown } = {}) => {
    bodies.push(JSON.parse(String(init.body ?? "{}")));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  return { bodies, restore: () => void (globalThis.fetch = original) };
}

async function sendThroughExecutor(flag: boolean | undefined, stream: boolean, messages: Msg[]) {
  const { bodies, restore } = captureFetch();
  const body = { model: "claude-sonnet-5-5", max_tokens: 16, messages };
  try {
    await new DefaultExecutor("anthropic-compatible-prefilltest").execute({
      model: "claude-sonnet-5-5",
      body,
      stream,
      credentials: {
        apiKey: "relay-key",
        providerSpecificData: {
          baseUrl: "https://relay.example/v1",
          ...(flag === undefined ? {} : { requireUserLastMessage: flag }),
        },
      },
    } as never);
  } finally {
    restore();
  }
  return { sent: bodies[0], body };
}

for (const stream of [false, true]) {
  test(`executor (stream=${stream}): flag on → trailing assistant dropped before send`, async () => {
    const messages = [user("q"), assistantThinkingXml()];
    const original = structuredClone(messages);
    const { sent, body } = await sendThroughExecutor(true, stream, messages);
    const sentMsgs = sent.messages as Msg[];
    assert.equal(sentMsgs.at(-1)?.role, "user");
    assert.equal(sentMsgs.length, 1);
    // Caller's body (shared by combo targets / logging snapshot) is untouched.
    assert.deepEqual(body.messages, original);
  });
}

test("executor: flag off → legitimate prefill forwarded unchanged", async () => {
  const { sent } = await sendThroughExecutor(undefined, false, [user("q"), assistantText("{")]);
  assert.equal((sent.messages as Msg[]).at(-1)?.role, "assistant");
});

test("executor: flag on keeps tool pairs and cache_control", async () => {
  const { sent } = await sendThroughExecutor(true, false, [
    user("q"),
    toolUse("t1"),
    toolResult("t1"),
    assistantText("final"),
  ]);
  const sentMsgs = sent.messages as Msg[];
  assert.equal(sentMsgs.length, 3);
  assert.deepEqual(sentMsgs[2], toolResult("t1"));
});

test("executor: two connections with different flags get independent payloads", async () => {
  const messages = [user("q"), assistantText("a")];
  const on = await sendThroughExecutor(true, false, messages);
  const off = await sendThroughExecutor(false, false, messages);
  assert.equal((on.sent.messages as Msg[]).length, 1);
  assert.equal((off.sent.messages as Msg[]).length, 2);
  assert.equal(messages.length, 2);
});

// ── classification ──────────────────────────────────────────────────────────

for (const [label, text] of [
  ["plain", PREFILL_MSG],
  ["status-prefixed", `[400]: ${PREFILL_MSG}`],
  ["JSON envelope", PREFILL_ENVELOPE],
] as const) {
  test(`prefill 400 (${label}) is request-shape, not model availability`, () => {
    assert.equal(isAssistantPrefillUnsupported400(400, text), true);
    assert.equal(isModelScoped400(text), false);
    assert.equal(isProviderModelUnsupported400(400, text), false);
    assert.equal(isRequestScoped400(400, text), true);
    assert.equal(comboTargetDecision(400, text), "advance");
    const fb = checkFallbackError(400, text, 0, "claude-sonnet-5-5", "anthropic-compatible-x");
    assert.equal(fb.cooldownMs, 0);
    assert.equal(
      shouldSkipConnDisable(
        { status: 400, rawMessage: text },
        false,
        false,
        "anthropic-compatible-x"
      ),
      true
    );
  });
}

test("genuine model-unavailable 400s are still recognized", () => {
  assert.equal(isModelScoped400("The requested model is not supported."), true);
  assert.equal(isProviderModelUnsupported400(400, "model claude-x is not supported"), true);
  assert.equal(isModelScoped400("model x does not support Responses API"), true);
  assert.equal(isAssistantPrefillUnsupported400(400, "model x does not support tools"), false);
  assert.equal(isAssistantPrefillUnsupported400(429, PREFILL_MSG), false);
});

// ── combo: no lockout poisoning ─────────────────────────────────────────────

const log = { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
const lockoutSettings = {
  modelLockout: {
    enabled: true,
    errorCodes: [400, 403, 404, 429, 502, 503, 504],
    baseCooldownMs: 120_000,
    maxCooldownMs: 300_000,
    maxBackoffSteps: 10,
    useExponentialBackoff: false,
  },
};
const TARGETS = [
  { provider: "anthropic-compatible-relay-a", model: "claude-sonnet-5-5" },
  { provider: "anthropic-compatible-relay-b", model: "claude-sonnet-5-5" },
];

for (const [label, errorBody] of [
  ["JSON envelope", PREFILL_ENVELOPE],
  ["bare text", PREFILL_MSG],
] as const) {
  test(`combo: prefill 400 (${label}) on both targets locks neither model`, async () => {
    clearAllModelLockouts();
    const tried: string[] = [];
    const run = (failing: boolean) =>
      handleComboChat({
        body: { messages: [{ role: "user", content: "q" }] },
        combo: {
          name: `prefill-${label}`,
          strategy: "priority",
          models: TARGETS.map((t) => `${t.provider}/${t.model}`),
          config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
        },
        handleSingleModel: async (_b: unknown, modelStr: string) => {
          tried.push(modelStr);
          return failing
            ? new Response(errorBody, { status: 400 })
            : Response.json({ id: "ok", choices: [{ message: { content: "ok" } }] });
        },
        isModelAvailable: async () => true,
        log,
        settings: lockoutSettings,
        allCombos: null,
      } as never);

    const first = await run(true);
    assert.equal(first.status, 400);
    for (const t of TARGETS) {
      assert.equal(getModelLockoutInfo(t.provider, "", t.model), null, `${t.provider} locked`);
    }
    // The next well-formed request must actually reach an upstream (no 503 skip).
    tried.length = 0;
    const second = await run(false);
    assert.equal(second.status, 200);
    assert.equal(tried.length, 1);
  });
}
