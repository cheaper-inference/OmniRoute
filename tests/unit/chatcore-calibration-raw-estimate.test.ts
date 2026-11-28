// F-C2-08: the calibration must learn actual / RAW estimate. Before the fix it learned from the
// already-calibrated estimate and the factor settled at sqrt(ratio) instead of ratio.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cal-raw-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { resetEstimatorCalibrationForTests, getEstimatorCalibrationFactor } =
  await import("../../open-sse/services/estimatorCalibration.ts");

const PROVIDER = "calraw-prov";
const MODEL = "calraw-model";
// 48,000 chars -> raw estimate 12,000. The provider really counts 1.6x that.
const CHARS = 48_000;
const REPORTED = 19_200;
const originalFetch = globalThis.fetch;

function request() {
  const body = {
    model: MODEL,
    messages: [{ role: "user", content: "x".repeat(CHARS) }],
    stream: false,
  };
  return {
    body,
    modelInfo: { provider: PROVIDER, model: MODEL, extendedContext: false },
    credentials: {
      apiKey: ["cal", "raw", "key"].join("-"),
      providerSpecificData: { baseUrl: "https://calraw.example.test" },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body,
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    log: { debug() {}, info() {}, warn() {}, error() {} },
  };
}

test.before(() => {
  process.env.CONTEXT_LENGTH_CALRAW_PROV = "1000000";
  delete process.env.OMNIROUTE_ESTIMATOR_CALIBRATION;
  resetEstimatorCalibrationForTests();
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        choices: [{ message: { content: "ok" } }],
        usage: { prompt_tokens: REPORTED, completion_tokens: 5 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
});

test.after(() => {
  globalThis.fetch = originalFetch;
  delete process.env.CONTEXT_LENGTH_CALRAW_PROV;
  resetEstimatorCalibrationForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the learned factor approaches actual / raw estimate, not its square root", async () => {
  for (let i = 0; i < 8; i++) {
    const result = await handleChatCore(request());
    assert.equal(result.success, true, `request ${i + 1}`);
  }
  const factor = getEstimatorCalibrationFactor(PROVIDER, MODEL, false);
  assert.ok(Math.abs(factor - 1.6) < 0.05, `learned factor ${factor} should be about 1.6`);
});
