/**
 * OMNIROUTE_COMBO_MAX_DEADLINE_FAILURES — opt-in sub-budget for
 * stream-readiness deadline failures in a combo run.
 *
 * The global-attempts cap is calibrated for fast failures (429/5xx swap-outs
 * that cost seconds). A readiness-deadline failure instead burns a full
 * readiness window plus a heavyweight body re-dispatch on every rotation, so
 * a handful of them multiplies user latency and gateway memory while the
 * global cap still has headroom. Unset (default) = disabled: the budget
 * clamp returns 0 and the combo keeps today's rotation behavior.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-18721-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-18721-test-secret";

const { clampDeadlineFailureBudget, isReadinessDeadlineFailure } =
  await import("../../open-sse/services/combo/comboPredicates.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { ensureStreamReadiness } = await import("../../open-sse/utils/streamReadiness.ts");
const { readAttemptFailure } = await import("../../open-sse/services/combo/attemptFailure.ts");
const { isModelLocked } = await import("../../open-sse/services/accountFallback.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };
const ENV_KEY = "OMNIROUTE_COMBO_MAX_DEADLINE_FAILURES";

/** A real readiness-deadline failure: a stream that never emits a non-ping event. */
async function stalledReadinessFailure(): Promise<Response> {
  const stalled = new Response(new ReadableStream<Uint8Array>({ start() {} }), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
  const readiness = await ensureStreamReadiness(stalled, { timeoutMs: 20 });
  assert.equal(readiness.ok, false, "a stalled stream must fail the readiness window");
  return readiness.response;
}

async function runCombo(tag: string, targets: number) {
  const models = Array.from({ length: targets }, (_, i) => `ddl${tag}p${i}/model-${i}`);
  const called: string[] = [];
  const response = await handleComboChat({
    body: { model: "x", messages: [{ role: "user", content: "hi" }], stream: true },
    combo: {
      name: `c18721-${tag}`,
      strategy: "priority",
      models: models.map((model) => ({ model })),
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      called.push(modelStr);
      return stalledReadinessFailure();
    },
    log,
    settings: { modelLockout: { enabled: true } },
    allCombos: [],
  });
  return { response, called, models };
}

test("budget: unset/empty/null → 0 (disabled, the default)", () => {
  assert.equal(clampDeadlineFailureBudget(undefined), 0);
  assert.equal(clampDeadlineFailureBudget(null), 0);
  assert.equal(clampDeadlineFailureBudget(""), 0);
});

test("budget: positive integer passes through", () => {
  assert.equal(clampDeadlineFailureBudget("3"), 3);
  assert.equal(clampDeadlineFailureBudget(5), 5);
  assert.equal(clampDeadlineFailureBudget("1"), 1);
});

test("budget: zero, negatives and junk → 0 (disabled); fractions floor like the attempts clamp", () => {
  for (const junk of ["0", "-3", "junk", ""]) {
    assert.equal(
      clampDeadlineFailureBudget(junk),
      0,
      `expected disabled for ${JSON.stringify(junk)}`
    );
  }
  assert.equal(clampDeadlineFailureBudget("2.9"), 2, "floors, mirroring clampGlobalAttempts");
});

test("budget: values above the hard cap are clamped", () => {
  const clamped = clampDeadlineFailureBudget("99999");
  assert.ok(clamped > 0 && clamped < 99999, "clamped into the attempts hard cap range");
});

test("classifier: matches the structured code of a REAL readiness failure, not its message", async () => {
  const failure = await readAttemptFailure(await stalledReadinessFailure(), {
    log,
    modelStr: "p/m",
  });
  assert.equal(failure.response.status, 504);
  // The human message never carries the marker — only error.code does.
  assert.doesNotMatch(failure.errorText, /STREAM_READINESS_TIMEOUT/);
  assert.equal(failure.structuredError?.code, "STREAM_READINESS_TIMEOUT");
  assert.equal(isReadinessDeadlineFailure(504, failure.structuredError?.code), true);
});

test("classifier: fast failures, other 504 shapes and early EOF do not count", () => {
  assert.equal(isReadinessDeadlineFailure(429, "STREAM_READINESS_TIMEOUT"), false);
  assert.equal(isReadinessDeadlineFailure(502, "STREAM_READINESS_TIMEOUT"), false);
  assert.equal(isReadinessDeadlineFailure(504, "STREAM_EARLY_EOF"), false);
  assert.equal(isReadinessDeadlineFailure(504, "upstream_timeout"), false);
  assert.equal(isReadinessDeadlineFailure(504, undefined), false);
  assert.equal(isReadinessDeadlineFailure(504, null), false);
});

test("combo: budget=2 stops after two real readiness failures with a clean 504", async () => {
  const previous = process.env[ENV_KEY];
  process.env[ENV_KEY] = "2";
  try {
    const { response, called, models } = await runCombo("a", 4);
    assert.deepEqual(called, models.slice(0, 2), "exactly two targets dispatched");
    assert.equal(response.status, 504);
    const body = await response.clone().json();
    assert.match(body.error.message, /readiness deadline failed on 2 targets/);
    // The target that exhausted the budget is charged like every earlier one.
    for (const model of models.slice(0, 2)) {
      const [provider, rawModel] = model.split("/");
      assert.equal(isModelLocked(provider, "", rawModel), true, `${model} must be locked out`);
    }
  } finally {
    if (previous === undefined) delete process.env[ENV_KEY];
    else process.env[ENV_KEY] = previous;
  }
});

test("combo: unset budget keeps rotating through every target", async () => {
  const previous = process.env[ENV_KEY];
  delete process.env[ENV_KEY];
  try {
    const { response, called, models } = await runCombo("b", 4);
    assert.deepEqual(called, models, "every target is still tried when the budget is off");
    assert.doesNotMatch(
      (await response.clone().text()) || "",
      /readiness deadline failed on \d+ targets/
    );
  } finally {
    if (previous !== undefined) process.env[ENV_KEY] = previous;
  }
});
