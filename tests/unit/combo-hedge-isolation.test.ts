/* eslint-disable @typescript-eslint/no-explicit-any */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "combo-isolation-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { dispatchWithCooldownRetry } =
  await import("../../open-sse/services/combo/comboAttemptLoop.ts");
const { remainderIsHomogeneous, shouldAbortOnInputBoundFailure } =
  await import("../../open-sse/services/combo/executeTargetClassify.ts");
const { hasIdenticalModelErrorStreak } =
  await import("../../open-sse/services/combo/comboPredicates.ts");
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const noop = () => {};
test.after(() => fs.rmSync(dir, { recursive: true, force: true }));
async function run(mode: string, hedge = true) {
  const dispatched: number[] = [],
    cancelled: number[] = [];
  const state: any = {
    orderedTargets: ["qwen", "qwen", "qwen", "qwen", "luna", "gemini"].map((modelStr) => ({
      modelStr,
    })),
    comboExpired: false,
    comboErrors: [],
  };
  const response = await dispatchWithCooldownRetry({
    state,
    deps: {
      config: { hedging: hedge, hedgeDelayMs: 0, zeroLatencyOptimizationsEnabled: true },
      body: { messages: [] },
      strategy: "priority",
      log: { info: noop, warn: noop, error: noop },
      combo: { name: "isolation-test" },
    } as any,
    extra: {
      maxSetRetries: 0,
      comboTimeoutMs: 1000,
      comboStartTime: Date.now(),
      evaluateGates: async () => ({ kind: "proceed" }),
      executeAttempt: async ({ index }: any) => {
        dispatched.push(index);
        state.abortControllers
          .get(index)
          .signal.addEventListener("abort", () => cancelled.push(index));
        if (mode === "allfail")
          return {
            ok: false,
            response: index === 5 ? new Response("failed", { status: 502 }) : undefined,
          };
        if (index === 4) {
          await delay(20);
          return { ok: true, response: new Response("luna") };
        }
        if (index > 0 && index < 4) {
          state.comboErrors.push({ kind: "model", status: 409, error: "duplicate" });
          return { ok: false };
        }
        if (mode === "context" && index === 5) {
          assert.equal(
            shouldAbortOnInputBoundFailure({
              structuredError: { code: "context_length_exceeded" },
              remainderIsHomogeneous:
                remainderIsHomogeneous(state.orderedTargets, index, "gemini") &&
                state.orderedTargets.every((t: any) => t.modelStr === "gemini"),
            }),
            false
          );
          return { ok: false };
        }
        if (mode === "context" && index === 0) {
          await delay(60);
          return { ok: false };
        }
        await delay(70);
        return { ok: false };
      },
    },
  } as any);
  await delay(80);
  return { response, dispatched, cancelled };
}
const { handleComboChat } = await import("../../open-sse/services/combo.ts");

test("hedges launch different models before sibling accounts, preserving indices", async () => {
  const r = await run("duplicates");
  assert.equal(await r.response.text(), "luna");
  assert.deepEqual(r.dispatched.slice(0, 3), [0, 4, 5]);
  assert(r.cancelled.includes(0));
  assert(!r.cancelled.includes(4));
});
test("context failure cannot override pending heterogeneous success", async () => {
  const r = await run("context");
  assert.equal(await r.response.text(), "luna");
});
test("pending rate-limited branch cannot hold fast successful sibling", async () => {
  const r = await run("429");
  assert.equal(await r.response.text(), "luna");
  assert(r.cancelled.includes(0));
});
test("all failed settles without hanging", async () => {
  const r = await run("allfail");
  assert.equal(r.response.status, 502);
});
test("serial dispatch preserves original account order", async () => {
  const r = await run("duplicates", false);
  assert.equal(await r.response.text(), "luna");
  assert.deepEqual(r.dispatched, [0, 1, 2, 3, 4]);
});
test("duplicate conflicts are not malformed request evidence", () => {
  assert.equal(
    hasIdenticalModelErrorStreak(Array(3).fill({ kind: "model", status: 409, error: "duplicate" })),
    false
  );
  assert.equal(
    hasIdenticalModelErrorStreak(Array(3).fill({ kind: "model", status: 400, error: "malformed" })),
    true
  );
});
const log = { info: noop, warn: noop, error: noop, debug: noop };
const overflow = () =>
  new Response(
    JSON.stringify({
      error: { code: "context_length_exceeded", message: "Input exceeds context window" },
    }),
    { status: 400, headers: { "content-type": "application/json" } }
  );
test("real classifier: last-model context overflow leaves earlier hedge alive", async () => {
  const called: string[] = [];
  const response = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "real-context-hedge",
      strategy: "priority",
      models: [{ model: "providerA/large" }, { model: "providerB/small" }],
      config: {
        hedging: true,
        hedgeDelayMs: 0,
        zeroLatencyOptimizationsEnabled: true,
        maxRetries: 0,
        maxSetRetries: 0,
      },
    },
    handleSingleModel: async (_body: any, model: string) => {
      called.push(model);
      if (model === "providerB/small") return overflow();
      await delay(30);
      return new Response(JSON.stringify({ choices: [{ message: { content: "winner" } }] }), {
        headers: { "content-type": "application/json" },
      });
    },
    log,
    settings: {},
    allCombos: [],
  } as any);
  assert.equal(response.status, 200);
  assert.equal(called.length, 2);
});
test("real classifier: serial homogeneous suffix still stops after first overflow", async () => {
  const called: string[] = [];
  const response = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "serial-context-suffix",
      strategy: "priority",
      models: [{ model: "providerA/a" }, { model: "providerB/b" }, { model: "providerB/b" }],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: any, model: string) => {
      called.push(model);
      return model === "providerA/a" ? new Response("unavailable", { status: 502 }) : overflow();
    },
    log,
    settings: {},
    allCombos: [],
  } as any);
  assert.equal(response.status, 400);
  assert.deepEqual(called, ["providerA/a", "providerB/b"]);
});

for (const reverse of [false, true]) {
  test(`thrown branch and model400 aggregate consistently (${reverse})`, async () => {
    const state: any = {
      orderedTargets: [{ modelStr: "a" }, { modelStr: "b" }],
      comboErrors: [],
      recordedAttempts: 0,
      comboExpired: false,
    };
    const response = await dispatchWithCooldownRetry({
      state,
      deps: {
        config: { hedging: true, hedgeDelayMs: 0, zeroLatencyOptimizationsEnabled: true },
        body: { messages: [] },
        strategy: "priority",
        log,
        combo: { name: "throw-aggregation" },
      } as any,
      extra: {
        maxSetRetries: 0,
        comboTimeoutMs: 1000,
        comboStartTime: Date.now(),
        evaluateGates: async () => ({ kind: "proceed" }),
        executeAttempt: async ({ index }: any) => {
          await delay((index === 0) === reverse ? 2 : 10);
          if (index === 0) throw new Error("synthetic");
          state.comboErrors.push({
            model: "b",
            status: 400,
            error: "unsupported model",
            kind: "model",
          });
          state.recordedAttempts++;
          state.lastStatus = 400;
          state.lastError = "unsupported model";
          return { ok: false };
        },
      },
    } as any);
    assert.equal(response.status, 502);
    assert.equal(state.comboErrors.length, 2);
  });
}

test("genuine fatal global response cancels pending siblings", async () => {
  const state: any = {
    orderedTargets: [{ modelStr: "a" }, { modelStr: "b" }],
    comboErrors: [],
    comboExpired: false,
  };
  let cancelled = false;
  const response = await dispatchWithCooldownRetry({
    state,
    deps: {
      config: { hedging: true, hedgeDelayMs: 0, zeroLatencyOptimizationsEnabled: true },
      body: { messages: [] },
      strategy: "priority",
      log,
      combo: { name: "fatal-cleanup" },
    } as any,
    extra: {
      maxSetRetries: 0,
      comboTimeoutMs: 1000,
      comboStartTime: Date.now(),
      evaluateGates: async () => ({ kind: "proceed" }),
      executeAttempt: async ({ index }: any) => {
        if (index === 1)
          return { ok: false, response: new Response("malformed global request", { status: 400 }) };
        state.abortControllers.get(index).signal.addEventListener("abort", () => {
          cancelled = true;
        });
        await delay(40);
        return { ok: false };
      },
    },
  } as any);
  assert.equal(response.status, 400);
  assert.equal(cancelled, true);
});
test("all nonterminal failures aggregate only after all branches settle", async () => {
  const state: any = {
    orderedTargets: [{ modelStr: "a" }, { modelStr: "b" }],
    comboErrors: [],
    recordedAttempts: 0,
    comboExpired: false,
  };
  let settled = 0;
  const response = await dispatchWithCooldownRetry({
    state,
    deps: {
      config: { hedging: true, hedgeDelayMs: 0, zeroLatencyOptimizationsEnabled: true },
      body: { messages: [] },
      strategy: "priority",
      log,
      combo: { name: "all-local-fail" },
    } as any,
    extra: {
      maxSetRetries: 0,
      comboTimeoutMs: 1000,
      comboStartTime: Date.now(),
      evaluateGates: async () => ({ kind: "proceed" }),
      executeAttempt: async ({ index }: any) => {
        await delay(index === 0 ? 20 : 5);
        settled++;
        state.comboErrors.push({
          model: String(index),
          status: 502,
          error: "provider unavailable",
          kind: "provider",
        });
        state.recordedAttempts++;
        state.lastStatus = 502;
        state.lastError = "provider unavailable";
        return { ok: false };
      },
    },
  } as any);
  assert.equal(settled, 2);
  assert.equal(response.status, 502);
});

test("local turn conflicts never disable accounts; upstream conflicts retain normal handling", async () => {
  const { shouldSkipConnDisable } =
    await import("../../open-sse/services/combo/comboPredicates.ts");
  for (const provider of ["groq", "codex", "antigravity"]) {
    assert.equal(
      shouldSkipConnDisable({ status: 409, errorCode: "turn_in_progress" }, false, false, provider),
      true
    );
    assert.equal(
      shouldSkipConnDisable({ status: 409, errorType: "turn_in_progress" }, false, false, provider),
      true
    );
    assert.equal(
      shouldSkipConnDisable(
        { status: 409, errorCode: "upstream_conflict" },
        false,
        false,
        provider
      ),
      false
    );
  }
});
