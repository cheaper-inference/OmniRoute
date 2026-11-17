/**
 * The streaming leg and the combo loop must treat a hedge-cancelled attempt as
 * a supersession, never as a client abort or an upstream failure:
 *
 *  - runStreamingResponse: a rejection carrying the hedge-cancel reason (direct,
 *    raw string, `.cause`-wrapped) persists no attempt row and returns the
 *    status-599 `hedge_cancelled` sentinel, while a bare AbortError still maps
 *    to a persisted 499;
 *  - handleComboChat: a hedge loser returning that sentinel leaves the combo's
 *    failure bookkeeping (failure logs, provider cooldown) untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hedge-cancel-leg-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "hedge-cancel-leg-secret";

const { runStreamingResponse } =
  await import("../../../open-sse/handlers/chatCore/streamingResponse.ts");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { COMBO_HEDGE_CANCELLED_REASON } =
  await import("../../../open-sse/services/combo/comboAbortReasons.ts");
const { createErrorResult } = await import("../../../open-sse/utils/error.ts");
const { clearCooldownState, getCooldownEntryCount } =
  await import("../../../open-sse/services/providerCooldownTracker.ts");

const noop = () => {};

function streamingDeps(rejection: unknown) {
  const persisted: unknown[] = [];
  const failureUsage: unknown[] = [];
  const handled: unknown[] = [];
  const deps = {
    apiKeyInfo: null,
    persistAttemptLogs: (entry: unknown) => persisted.push(entry),
    persistFailureUsage: (...args: unknown[]) => failureUsage.push(args),
    resolveEffectiveServiceTier: () => undefined,
    executeProviderRequest: async () => {
      throw rejection;
    },
    assertManagedLeaseFence: noop,
    body: { messages: [{ role: "user", content: "hi" }] },
    clientRawRequest: { headers: {} },
    comboStrategy: "priority",
    connectionId: "conn-1",
    credentials: {},
    effectiveModel: "slow-model",
    getCurrentConnectionId: () => "conn-1",
    getManagedLeaseFenceErrorCode: () => null,
    isCombo: true,
    log: { info: noop, warn: noop, debug: noop, error: noop },
    managedLease: null,
    model: "slow-model",
    pendingConnId: "conn-1",
    pendingRequestId: "req-1",
    pendingScope: {},
    provider: "openai",
    providerRequestCapture: { latest: () => undefined, body: (b: unknown) => b },
    reqLogger: { logTargetRequest: noop },
    resilienceSettings: {},
    sourceFormat: "openai",
    stream: true,
    streamController: { handleError: (e: unknown) => handled.push(e) },
    syncExecuteTranslatedBody: noop,
    targetFormat: "openai",
    translatedBody: { model: "slow-model", messages: [{ role: "user", content: "hi" }] },
    currentModel: "slow-model",
    triedModels: new Set<string>(["slow-model"]),
  };
  return { deps, persisted, failureUsage, handled };
}

async function runLeg(rejection: unknown) {
  const ctx = streamingDeps(rejection);
  const outcome = (await runStreamingResponse(ctx.deps)) as {
    response: { status?: number; errorCode?: string };
  };
  return { ...ctx, outcome };
}

for (const [label, make] of [
  ["direct Error", () => new Error(COMBO_HEDGE_CANCELLED_REASON)],
  ["raw string", () => COMBO_HEDGE_CANCELLED_REASON],
  [
    ".cause-wrapped",
    () => new Error("fetch failed", { cause: new Error(COMBO_HEDGE_CANCELLED_REASON) }),
  ],
] as const) {
  test(`streaming leg: hedge-cancel rejection (${label}) persists no row and returns the 599 sentinel`, async () => {
    const { outcome, persisted, failureUsage, handled } = await runLeg(make());
    assert.equal(outcome.response.status, 599);
    assert.equal(outcome.response.errorCode, "hedge_cancelled");
    assert.equal(persisted.length, 0, "no attempt/call-log row for a superseded attempt");
    assert.equal(failureUsage.length, 0, "no failure usage row either");
    assert.equal(handled.length, 1, "the stream controller is torn down once");
  });
}

test("streaming leg: a bare AbortError (real client disconnect) still persists a 499", async () => {
  const { outcome, persisted } = await runLeg(
    new DOMException("This operation was aborted", "AbortError")
  );
  assert.equal(outcome.response.status, 499);
  assert.equal(persisted.length, 1, "client aborts keep their attempt row");
  assert.equal((persisted[0] as { status: number }).status, 499);
});

test("combo: a hedge winner aborts and cancels a losing Claude thinking stream", async () => {
  const enc = new TextEncoder();
  let upstreamAborted = false;
  let responseBodyCancelled = false;

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "think" }], stream: true },
    combo: {
      name: "hedge-cancels-thinking-stream",
      strategy: "priority",
      models: ["openai/slow-model", "claude/fast-model"],
      config: {
        maxRetries: 0,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        zeroLatencyOptimizationsEnabled: true,
        hedging: true,
        hedgeDelayMs: 20,
      },
    },
    handleSingleModel: async (_b, modelStr, target) => {
      if (modelStr === "openai/slow-model") {
        const body = new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(
              enc.encode(
                'event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"thinking","thinking":""}}\n\n'
              )
            );
          },
          pull() {
            return new Promise<void>(() => {});
          },
          cancel() {
            responseBodyCancelled = true;
          },
        });
        target?.modelAbortSignal?.addEventListener(
          "abort",
          () => {
            upstreamAborted = true;
          },
          { once: true }
        );
        return new Response(body, {
          status: 200,
          headers: { "content-type": "text/event-stream" },
        });
      }
      return new Response(
        JSON.stringify({ choices: [{ message: { role: "assistant", content: "winner" } }] }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    },
    isModelAvailable: async () => true,
    log: { info: noop, warn: noop, debug: noop, error: noop },
    settings: null,
    allCombos: null,
  });

  assert.equal(result.status, 200);
  assert.equal(
    ((await result.json()) as { choices: { message: { content: string } }[] }).choices[0].message
      .content,
    "winner"
  );
  await new Promise((resolve) => setTimeout(resolve, 80));
  assert.equal(upstreamAborted, true, "the losing target's upstream fetch must receive abort");
  assert.equal(responseBodyCancelled, true, "the losing response body must be cancelled");
});

test("combo: a hedge loser aborted during its quality check is not recorded as a success", async () => {
  const enc = new TextEncoder();
  const logs: string[] = [];
  const log = {
    info: (_t: string, m: string) => logs.push(m),
    warn: (_t: string, m: string) => logs.push(m),
    debug: noop,
    error: (_t: string, m: string) => logs.push(m),
  };

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "think" }], stream: true },
    combo: {
      name: "hedge-loser-not-success",
      strategy: "priority",
      models: ["openai/slow-model", "claude/fast-model"],
      config: {
        maxRetries: 0,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        zeroLatencyOptimizationsEnabled: true,
        hedging: true,
        hedgeDelayMs: 20,
      },
    },
    handleSingleModel: async (_b, modelStr) => {
      if (modelStr === "openai/slow-model") {
        const body = new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(
              enc.encode(
                'event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"thinking","thinking":""}}\n\n'
              )
            );
          },
          pull() {
            return new Promise<void>(() => {});
          },
        });
        return new Response(body, {
          status: 200,
          headers: { "content-type": "text/event-stream" },
        });
      }
      return new Response(
        JSON.stringify({ choices: [{ message: { role: "assistant", content: "winner" } }] }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
  });

  assert.equal(result.status, 200);
  assert.equal(
    ((await result.json()) as { choices: { message: { content: string } }[] }).choices[0].message
      .content,
    "winner"
  );
  await new Promise((resolve) => setTimeout(resolve, 80));
  assert.equal(
    logs.some((m) => /Model claude\/fast-model succeeded/.test(m)),
    true,
    "the winner is recorded as a success"
  );
  assert.equal(
    logs.some((m) => /Model openai\/slow-model succeeded/.test(m)),
    false,
    "the aborted loser must not be recorded as a success"
  );
});

test("combo: a hedge loser returning the 599 sentinel adds no failure bookkeeping", async () => {
  clearCooldownState();
  const logs: string[] = [];
  const log = {
    info: (_t: string, m: string) => logs.push(m),
    warn: (_t: string, m: string) => logs.push(m),
    debug: noop,
    error: (_t: string, m: string) => logs.push(m),
  };
  let calls = 0;
  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "ping" }] },
    combo: {
      name: "hedge-sentinel-inert",
      strategy: "priority",
      models: ["openai/slow-model", "claude/fast-model"],
      config: {
        maxRetries: 0,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        zeroLatencyOptimizationsEnabled: true,
        hedging: true,
        hedgeDelayMs: 20,
      },
    },
    handleSingleModel: async (_b, modelStr, target) => {
      calls++;
      if (modelStr === "openai/slow-model") {
        return await new Promise<Response>((resolve) => {
          const sig = target?.modelAbortSignal ?? null;
          const done = () =>
            resolve(
              createErrorResult(599, "Superseded by hedge sibling", null, "hedge_cancelled")
                .response
            );
          if (sig?.aborted) return done();
          sig?.addEventListener("abort", done, { once: true });
        });
      }
      return new Response(
        JSON.stringify({ choices: [{ message: { role: "assistant", content: "winner" } }] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    },
    isModelAvailable: async () => true,
    log,
    settings: { resilienceSettings: { providerCooldown: { enabled: true } } },
    allCombos: null,
  });
  assert.equal(res.status, 200);
  await res.body?.cancel();
  // Let the loser's sentinel settle through executeTargetAttempt.
  await new Promise((r) => setTimeout(r, 50));
  assert.equal(calls, 2, "both hedge legs ran");
  assert.equal(
    logs.some((m) => /failed, trying next/i.test(m)),
    false,
    "the superseded loser must not log a failure"
  );
  assert.equal(getCooldownEntryCount(), 0, "no provider cooldown for a superseded sibling");
});
