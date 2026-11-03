/**
 * #13954 — the agentic-stall classifier wired into the combo failover path.
 *
 * A mid-tool-loop turn answered with `stop` + narration + zero tool calls passes every
 * quality check, so the combo returned it and the harness read the turn as over. With
 * OMNIROUTE_AGENTIC_STALL_FAILOVER on, the combo now treats that 200 as a retryable
 * attempt failure:
 * - the next target gets the turn, on the priority loop and the round-robin loop;
 * - the pinned-context path falls through to the strategy instead of serving the stall;
 * - the stalled answer is held, so a turn no target can do better on still answers 200
 *   (the module's contract: a false positive costs one retry, never a 502);
 * - nothing charges the provider breaker or a model lockout;
 * - a target that opened a real tool call is released to the client right away, without
 *   waiting for its stream to end;
 * - with the flag off, none of this happens.
 */
import { afterEach, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-agentic-stall-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-agentic-stall-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { tryPinnedModelDispatch } = await import("../../open-sse/services/combo/dispatchPrelude.ts");
const { resolveComboSetupConfig } = await import("../../open-sse/services/comboConfig.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { getCircuitBreaker } = await import("../../src/shared/utils/circuitBreaker.ts");
const { getAllModelLockouts, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");

const FLAG = "OMNIROUTE_AGENTIC_STALL_FAILOVER";
const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

const STALL_TEXT = "Silent retry succeeded";
const TOOLS = [{ type: "function", function: { name: "read_file" } }];

const toolTailBody = (stream = false) => ({
  model: "combo-agentic-stall",
  stream,
  tools: TOOLS,
  messages: [
    { role: "user", content: "fix the bug" },
    { role: "assistant", content: null, tool_calls: [{ id: "c1" }] },
    { role: "tool", tool_call_id: "c1", content: "file contents" },
  ],
});

const anthropicToolTailBody = () => ({
  model: "combo-agentic-stall",
  stream: true,
  tools: TOOLS,
  messages: [
    { role: "user", content: "fix the bug" },
    { role: "user", content: [{ type: "tool_result", tool_use_id: "t1", content: "contents" }] },
  ],
});

function jsonAnswer(content: string, finishReason = "stop") {
  return new Response(
    JSON.stringify({
      id: "ok",
      object: "chat.completion",
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: finishReason }],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

function toolCallAnswer() {
  return new Response(
    JSON.stringify({
      id: "tool",
      object: "chat.completion",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: null,
            tool_calls: [{ id: "c2", function: { name: "read_file", arguments: "{}" } }],
          },
          finish_reason: "tool_calls",
        },
      ],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

const sseFrame = (value: unknown) => `data: ${JSON.stringify(value)}\n\n`;
const sseDelta = (delta: Record<string, unknown>, finishReason: string | null = null) =>
  sseFrame({ id: "c", choices: [{ index: 0, delta, finish_reason: finishReason }] });
const sseStall = (text: string) =>
  sseDelta({ role: "assistant", content: text }) + sseDelta({}, "stop") + "data: [DONE]\n\n";

const sseResponse = (body: BodyInit) =>
  new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } });

const anthropicEvent = (event: string, value: Record<string, unknown>) =>
  `event: ${event}\ndata: ${JSON.stringify({ type: event, ...value })}\n\n`;
const anthropicStall = (text: string) =>
  anthropicEvent("message_start", { message: { id: "m", role: "assistant", content: [] } }) +
  anthropicEvent("content_block_start", {
    index: 0,
    content_block: { type: "text", text: "" },
  }) +
  anthropicEvent("content_block_delta", {
    index: 0,
    delta: { type: "text_delta", text },
  }) +
  anthropicEvent("content_block_stop", { index: 0 }) +
  anthropicEvent("message_delta", { delta: { stop_reason: "end_turn", stop_sequence: null } }) +
  anthropicEvent("message_stop", {});

const failure503 = () =>
  new Response(JSON.stringify({ error: { message: "upstream down" } }), {
    status: 503,
    headers: { "Content-Type": "application/json" },
  });

async function runCombo(
  models: string[],
  respond: (modelStr: string, call: number) => Promise<Response> | Response,
  {
    body = toolTailBody() as Record<string, unknown>,
    strategy = "priority",
    config = { maxRetries: 0, retryDelayMs: 0 } as Record<string, unknown>,
  } = {}
) {
  const called: string[] = [];
  const combo = {
    name: `combo-agentic-stall-${Math.random()}`,
    strategy,
    models: models.map((model) => ({ model })),
    config,
  };
  const result = await handleComboChat({
    body,
    combo,
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      called.push(modelStr);
      return respond(modelStr, called.length);
    },
    log,
    settings: {},
    allCombos: [],
  });
  return { result, called };
}

type ChatJson = { choices: Array<{ message: { content: string | null } }> };

let previousFlag: string | undefined;
beforeEach(() => {
  previousFlag = process.env[FLAG];
  process.env[FLAG] = "1";
  clearAllModelLockouts();
});
afterEach(() => {
  if (previousFlag === undefined) delete process.env[FLAG];
  else process.env[FLAG] = previousFlag;
});
test.after(() => {
  clearAllModelLockouts();
  try {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

const TWO_TARGETS = ["openai/gpt-4o-mini", "anthropic/claude-sonnet-4-6"];

test("priority: a stalled target fails over and the next target serves the turn", async () => {
  const { result, called } = await runCombo(TWO_TARGETS, (_model, call) =>
    call === 1 ? jsonAnswer(STALL_TEXT) : toolCallAnswer()
  );
  assert.deepEqual(called, TWO_TARGETS);
  assert.equal(result.status, 200);
  const json = await result.json();
  assert.equal(json.id, "tool");
});

test("flag off: the stalled answer is returned and no other target is tried", async () => {
  delete process.env[FLAG];
  const { result, called } = await runCombo(TWO_TARGETS, () => jsonAnswer(STALL_TEXT));
  assert.deepEqual(called, [TWO_TARGETS[0]]);
  const json = (await result.json()) as ChatJson;
  assert.equal(json.choices[0].message.content, STALL_TEXT);
});

test("a turn with no tool result pending is never classified", async () => {
  const { result, called } = await runCombo(TWO_TARGETS, () => jsonAnswer(STALL_TEXT), {
    body: { model: "x", stream: false, messages: [{ role: "user", content: "hi" }] },
  });
  assert.deepEqual(called, [TWO_TARGETS[0]]);
  assert.equal(result.status, 200);
});

test("streaming OpenAI: a stalled stream fails over before reaching the client", async () => {
  const { result, called } = await runCombo(
    TWO_TARGETS,
    (_model, call) =>
      sseResponse(call === 1 ? sseStall(STALL_TEXT) : sseStall("a".repeat(400) + "\n\ndone")),
    { body: toolTailBody(true) }
  );
  assert.deepEqual(called, TWO_TARGETS);
  const text = await result.text();
  assert.ok(text.includes("aaaa"), "the client must get the second target's stream");
  assert.equal(text.includes(STALL_TEXT), false, "the stalled stream must not reach the client");
});

test("streaming Anthropic: a stalled message stream fails over", async () => {
  const { result, called } = await runCombo(
    TWO_TARGETS,
    (_model, call) =>
      sseResponse(call === 1 ? anthropicStall(STALL_TEXT) : anthropicStall("x".repeat(400))),
    { body: anthropicToolTailBody() }
  );
  assert.deepEqual(called, TWO_TARGETS);
  const text = await result.text();
  assert.equal(text.includes(STALL_TEXT), false);
});

test("streaming: a real tool call releases the response without waiting for the stream to end", async () => {
  let closeUpstream = noop;
  const encoder = new TextEncoder();
  const open = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          sseDelta({
            tool_calls: [{ index: 0, id: "c2", function: { name: "read_file", arguments: "" } }],
          })
        )
      );
      closeUpstream = () => controller.close();
    },
  });
  const outcome = await Promise.race([
    runCombo(TWO_TARGETS, () => sseResponse(open), { body: toolTailBody(true) }),
    new Promise<"held">((resolve) => setTimeout(() => resolve("held"), 3000).unref()),
  ]);
  closeUpstream();
  assert.notEqual(outcome, "held", "the combo must not wait for an open tool-call stream to end");
  if (outcome === "held") return;
  assert.deepEqual(outcome.called, [TWO_TARGETS[0]]);
  assert.ok((await outcome.result.text()).includes("read_file"));
});

test("every target stalling still answers 200 with the last stalled turn", async () => {
  const { result, called } = await runCombo(TWO_TARGETS, (_model, call) =>
    jsonAnswer(`Silent retry ${call} succeeded`)
  );
  assert.deepEqual(called, TWO_TARGETS);
  assert.equal(result.status, 200);
  const json = (await result.json()) as ChatJson;
  assert.equal(json.choices[0].message.content, "Silent retry 2 succeeded");
});

test("a stalled target followed by a failing target returns the stalled turn", async () => {
  const { result, called } = await runCombo(TWO_TARGETS, (_model, call) =>
    call === 1 ? jsonAnswer(STALL_TEXT) : failure503()
  );
  assert.deepEqual(called, TWO_TARGETS);
  assert.equal(result.status, 200);
  const json = (await result.json()) as ChatJson;
  assert.equal(json.choices[0].message.content, STALL_TEXT);
});

test("a single-target combo returns the stall with no retry", async () => {
  const { result, called } = await runCombo([TWO_TARGETS[0]], () => jsonAnswer(STALL_TEXT));
  assert.deepEqual(called, [TWO_TARGETS[0]]);
  assert.equal(result.status, 200);
});

test("a stall trips neither the provider breaker nor a model lockout", async () => {
  const provider = "agenticstallprov";
  const before = getCircuitBreaker(provider).getStatus();
  await runCombo([`${provider}/model-a`, TWO_TARGETS[1]], (_model, call) =>
    call === 1 ? jsonAnswer(STALL_TEXT) : toolCallAnswer()
  );
  const after = getCircuitBreaker(provider).getStatus();
  assert.equal(after.state, "CLOSED");
  assert.equal(after.failureCount, before.failureCount);
  assert.equal(
    getAllModelLockouts().some((entry) => JSON.stringify(entry).includes("model-a")),
    false
  );
});

test("a protected priority target keeps its answer", async () => {
  const called: string[] = [];
  const combo = {
    name: `combo-agentic-stall-protected-${Math.random()}`,
    strategy: "priority",
    models: [
      {
        kind: "model" as const,
        model: TWO_TARGETS[0],
        providerId: "openai",
        fallbackOnlyOnQuotaExhaustion: true,
      },
      { kind: "model" as const, model: TWO_TARGETS[1], providerId: "anthropic" },
    ],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const result = await handleComboChat({
    body: toolTailBody(),
    combo,
    allCombos: [combo],
    settings: null,
    log,
    isModelAvailable: async () => true,
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      called.push(modelStr);
      return jsonAnswer(STALL_TEXT);
    },
  });
  assert.deepEqual(called, [TWO_TARGETS[0]]);
  assert.equal(result.status, 200);
});

test("round-robin: a stalled target fails over to the next model", async () => {
  const { result, called } = await runCombo(
    TWO_TARGETS,
    (_model, call) => (call === 1 ? jsonAnswer(STALL_TEXT) : toolCallAnswer()),
    { strategy: "round-robin" }
  );
  assert.equal(called.length, 2);
  assert.equal(new Set(called).size, 2, "the turn must move to a different model");
  const json = await result.json();
  assert.equal(json.id, "tool");
});

test("round-robin: flag off returns the stalled answer", async () => {
  delete process.env[FLAG];
  const { result, called } = await runCombo(TWO_TARGETS, () => jsonAnswer(STALL_TEXT), {
    strategy: "round-robin",
  });
  assert.equal(called.length, 1);
  assert.equal(result.status, 200);
});

test("round-robin: a stall followed by a failure returns the stalled turn", async () => {
  const { result, called } = await runCombo(
    TWO_TARGETS,
    (_model, call) => (call === 1 ? jsonAnswer(STALL_TEXT) : failure503()),
    { strategy: "round-robin" }
  );
  assert.equal(called.length, 2);
  assert.equal(result.status, 200);
  const json = (await result.json()) as ChatJson;
  assert.equal(json.choices[0].message.content, STALL_TEXT);
});

async function dispatchPinned(answer: Response) {
  const pinnedModel = TWO_TARGETS[0];
  // An active connection keeps the pin honored: a provider with none is durably down,
  // which falls through to the strategy for an unrelated reason.
  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: `agentic-stall-pin-${Math.random()}`,
    isActive: true,
    apiKey: "fixture-openai-key",
  });
  const combo = {
    name: `combo-agentic-stall-pin-${Math.random()}`,
    strategy: "priority",
    models: TWO_TARGETS.map((model) => ({ model })),
    config: {},
  };
  let dispatched = 0;
  const served = await tryPinnedModelDispatch({
    body: toolTailBody(),
    combo,
    pinnedModel,
    allCombos: [combo],
    config: resolveComboSetupConfig(combo, {}),
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async () => {
      dispatched++;
      return answer;
    },
    log,
  });
  assert.equal(dispatched, 1, "the pin must be honored before its answer is judged");
  return served;
}

test("pinned context: a stalled pin falls through to the combo strategy", async () => {
  assert.equal(await dispatchPinned(jsonAnswer(STALL_TEXT)), null);
});

test("pinned context: a healthy pin and the flag off are both served as-is", async () => {
  const healthy = toolCallAnswer();
  assert.equal(await dispatchPinned(healthy), healthy);
  delete process.env[FLAG];
  const stalled = jsonAnswer(STALL_TEXT);
  assert.equal(await dispatchPinned(stalled), stalled);
});
