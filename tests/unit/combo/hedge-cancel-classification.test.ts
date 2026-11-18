/**
 * Behavioral evidence that a superseded hedge sibling is distinguishable from
 * a client disconnect:
 *
 *  - the combo loop's winner path cancels sibling targets with the
 *    COMBO_HEDGE_CANCELLED_REASON abort reason (not a bare abort), so every
 *    downstream layer (fetch rejection, stream teardown, attempt logging) can
 *    tell an internal supersession apart from "client closed the request";
 *  - the shared classification helpers recognize that reason in every shape it
 *    can arrive in (direct Error, raw string, wrapper `.cause` chain) while a
 *    bare DOMException abort, a per-model timeout reason and ordinary errors
 *    all stay unrecognized.
 *
 * Orchestration uses public handleComboChat + injected handleSingleModel (the
 * same seam as combo-target-timeout-standards.test.ts), not private mocks.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hedge-cancel-cls-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "hedge-cancel-cls-secret";

const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const {
  COMBO_HEDGE_CANCELLED_REASON,
  COMBO_PER_MODEL_TIMEOUT_REASON,
  isHedgeCancelledSignal,
  isHedgeCancelledReasonError,
} = await import("../../../open-sse/services/combo/comboAbortReasons.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function okResponse(content: string) {
  return new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content } }] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// ── Classification helpers ───────────────────────────────────────────────────

test("isHedgeCancelledReasonError: matches the reason in every arriving shape", () => {
  assert.equal(isHedgeCancelledReasonError(new Error(COMBO_HEDGE_CANCELLED_REASON)), true);
  assert.equal(isHedgeCancelledReasonError(COMBO_HEDGE_CANCELLED_REASON), true);
  // Executors/proxy layers re-wrap rejections; the reason must survive a cause chain.
  const wrapped = new Error("fetch failed", { cause: new Error(COMBO_HEDGE_CANCELLED_REASON) });
  assert.equal(isHedgeCancelledReasonError(wrapped), true);
  const doubleWrapped = new Error("request error", {
    cause: new Error("fetch failed", { cause: new Error(COMBO_HEDGE_CANCELLED_REASON) }),
  });
  assert.equal(isHedgeCancelledReasonError(doubleWrapped), true);
});

test("isHedgeCancelledReasonError: bare aborts, timeouts and ordinary errors stay unrecognized", () => {
  const bareAbort = new DOMException("This operation was aborted", "AbortError");
  assert.equal(isHedgeCancelledReasonError(bareAbort), false);
  assert.equal(isHedgeCancelledReasonError(new Error(COMBO_PER_MODEL_TIMEOUT_REASON)), false);
  assert.equal(isHedgeCancelledReasonError(new Error("upstream 502")), false);
  assert.equal(isHedgeCancelledReasonError(null), false);
  assert.equal(isHedgeCancelledReasonError(undefined), false);
  // Cyclic cause chains must terminate instead of looping.
  const cyclic: Error & { cause?: unknown } = new Error("a");
  cyclic.cause = cyclic;
  assert.equal(isHedgeCancelledReasonError(cyclic), false);
});

test("isHedgeCancelledSignal: only a hedge-reasoned abort matches", () => {
  const hedgeController = new AbortController();
  hedgeController.abort(new Error(COMBO_HEDGE_CANCELLED_REASON));
  assert.equal(isHedgeCancelledSignal(hedgeController.signal), true);

  const bareController = new AbortController();
  bareController.abort();
  assert.equal(isHedgeCancelledSignal(bareController.signal), false);

  const timeoutController = new AbortController();
  timeoutController.abort(new Error(COMBO_PER_MODEL_TIMEOUT_REASON));
  assert.equal(isHedgeCancelledSignal(timeoutController.signal), false);

  assert.equal(isHedgeCancelledSignal(new AbortController().signal), false);
  assert.equal(isHedgeCancelledSignal(null), false);
  assert.equal(isHedgeCancelledSignal(undefined), false);
});

// ── Orchestration: the winner path must cancel siblings with the reason ─────

test("handleComboChat: hedge winner cancels the hanging sibling with the hedge-cancel reason", async () => {
  let loserSignal: AbortSignal | null = null;

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "ping" }] },
    combo: {
      name: "hedge-cancel-reason",
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
        // Mirror what the executor/fetch does on abort: surface the signal's
        // own reason once it fires.
        return await new Promise<Response>((_resolve, reject) => {
          const sig = target?.modelAbortSignal ?? null;
          loserSignal = sig ?? null;
          const onAbort = () => {
            // Native fetch rejects with signal.reason — reject with it so the
            // leg-level classification sees exactly that error.
            reject(sig?.reason ?? new Error("aborted"));
          };
          if (sig?.aborted) {
            onAbort();
            return;
          }
          sig?.addEventListener("abort", onAbort, { once: true });
        });
      }
      return okResponse("hedge-winner");
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
  });

  assert.equal(res.status, 200, "the hedge sibling must serve the request");
  const body = (await res.json()) as { choices: Array<{ message: { content: string } }> };
  assert.equal(body.choices[0].message.content, "hedge-winner");

  assert.ok(loserSignal, "the hanging target must have observed its abort signal");
  assert.ok(loserSignal!.aborted, "the loser must be aborted once the winner resolves");
  assert.equal(
    isHedgeCancelledSignal(loserSignal),
    true,
    "the winner path must abort siblings with the hedge-cancel reason, not a bare abort"
  );
  assert.equal(
    isHedgeCancelledReasonError(loserSignal!.reason),
    true,
    "the loser's rejection (signal.reason, what fetch rejects with) must classify as hedge-cancelled"
  );
});

test("handleComboChat: a client disconnect still aborts targets bare (real client aborts stay 499-classifiable)", async () => {
  let loserSignal: AbortSignal | null = null;
  const clientController = new AbortController();

  const attempt = handleComboChat({
    body: { messages: [{ role: "user", content: "ping" }] },
    combo: {
      name: "hedge-client-abort",
      strategy: "priority",
      models: ["openai/slow-model"],
      config: {
        maxRetries: 0,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
      },
    },
    handleSingleModel: async (_b, _modelStr, target) => {
      return await new Promise<Response>((_resolve, reject) => {
        const sig = target?.modelAbortSignal ?? null;
        loserSignal = sig ?? null;
        const onAbort = () => reject(sig?.reason ?? new Error("aborted"));
        if (sig?.aborted) {
          onAbort();
          return;
        }
        sig?.addEventListener("abort", onAbort, { once: true });
      });
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
    signal: clientController.signal,
  });
  await new Promise((r) => setTimeout(r, 10));
  clientController.abort();
  await attempt;

  assert.ok(loserSignal?.aborted, "client disconnect must abort the in-flight target");
  assert.equal(
    isHedgeCancelledSignal(loserSignal),
    false,
    "a client disconnect must NOT be mistaken for a hedge cancellation"
  );
});
