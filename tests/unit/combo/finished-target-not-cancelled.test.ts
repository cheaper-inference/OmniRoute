/**
 * A combo target that has already finished must never be cancelled afterwards.
 *
 * In a sequential (non-hedged) fallback the first target fails and settles before
 * the next one is dispatched. When the next target wins, the combo loop cancels the
 * targets that are still in flight with the "hedge-cancelled" reason. A target
 * that already finished is not in flight: cancelling its abort signal makes the
 * per-attempt stream controller still listening on it log a bogus
 * "disconnect: hedge-cancelled" line for an attempt that ended long before.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-finished-target-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "finished-target-secret";

const { handleComboChat } = await import("../../../open-sse/services/combo.ts");

const noop = () => {};

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("combo: a target that already failed is not cancelled when a later target wins", async () => {
  let failedTargetSignal: AbortSignal | null | undefined;

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }], stream: false },
    combo: {
      name: "sequential-fallback-keeps-finished-target",
      strategy: "priority",
      models: ["openai/offline-model", "claude/live-model"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body, modelStr, target) => {
      if (modelStr === "openai/offline-model") {
        failedTargetSignal = target?.modelAbortSignal;
        return new Response(
          JSON.stringify({
            error: { message: "No worker is currently serving the model", type: "server_error" },
          }),
          { status: 503, headers: { "content-type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ choices: [{ message: { role: "assistant", content: "fallback" } }] }),
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
    "fallback"
  );
  assert.ok(failedTargetSignal, "the failed target must have received an abort signal");
  assert.equal(
    failedTargetSignal.aborted,
    false,
    `a target that already finished must not be cancelled (reason: ${String(
      failedTargetSignal.reason?.message ?? failedTargetSignal.reason
    )})`
  );
});

test("combo: the safety timeout cancels the hung target but not the one that already failed", async () => {
  let failedTargetSignal: AbortSignal | null | undefined;
  let hungTargetSignal: AbortSignal | null | undefined;

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }], stream: false },
    combo: {
      name: "safety-timeout-keeps-finished-target",
      strategy: "priority",
      models: ["openai/offline-model", "claude/hung-model"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, comboTimeoutMs: 300 },
    },
    handleSingleModel: async (_body, modelStr, target) => {
      if (modelStr === "openai/offline-model") {
        failedTargetSignal = target?.modelAbortSignal;
        return new Response(
          JSON.stringify({
            error: { message: "No worker is currently serving the model", type: "server_error" },
          }),
          { status: 503, headers: { "content-type": "application/json" } }
        );
      }
      hungTargetSignal = target?.modelAbortSignal;
      // Never answers on its own; settles only once the combo cancels it.
      return new Promise<Response>((resolve) => {
        hungTargetSignal?.addEventListener(
          "abort",
          () =>
            resolve(
              new Response(JSON.stringify({ error: { message: "aborted" } }), {
                status: 499,
                headers: { "content-type": "application/json" },
              })
            ),
          { once: true }
        );
      });
    },
    isModelAvailable: async () => true,
    log: { info: noop, warn: noop, debug: noop, error: noop },
    settings: null,
    allCombos: null,
  });

  assert.equal(result.status, 504, "the combo must time out");
  assert.ok(hungTargetSignal, "the hung target must have received an abort signal");
  assert.equal(hungTargetSignal.aborted, true, "the safety timeout must cancel the hung target");
  assert.ok(failedTargetSignal, "the failed target must have received an abort signal");
  assert.equal(
    failedTargetSignal.aborted,
    false,
    "the safety timeout must not cancel a target that already finished"
  );
});
