// Opt-in (COMBO_BUDGET_CLASS_STATUS=1): when the combo attempt budget runs out, the final
// status follows the class of the recorded target failures (same policy as the other terminal
// paths) instead of a flat 503 "Maximum combo retry limit reached".
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-budget-class-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-budget-class-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

const FLAG = "COMBO_BUDGET_CLASS_STATUS";
const models = Array.from({ length: 40 }, (_, i) => `prov${i}/model-${i}`);

test.afterEach(() => {
  delete process.env[FLAG];
});
test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function rateLimited() {
  return new Response(
    JSON.stringify({ error: { message: "slow down", type: "rate_limit_error" } }),
    {
      status: 429,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function providerDown() {
  return new Response(JSON.stringify({ error: { message: "upstream broke" } }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}

async function exhaust(answer: (index: number) => Response) {
  let index = 0;
  const result = await handleComboChat({
    body: { model: "x", messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "budget-class",
      strategy: "priority",
      models: models.map((m) => ({ model: m })),
    },
    handleSingleModel: async () => answer(index++),
    log,
    settings: {},
    allCombos: [],
  });
  return { status: result.status, body: await result.clone().json() };
}

test("flag unset: an exhausted budget of rate-limited targets is still a flat 503", async () => {
  const { status, body } = await exhaust(rateLimited);
  assert.equal(status, 503);
  assert.equal(body.error.message, "Maximum combo retry limit reached");
});

test("flag on: an exhausted budget where every target was rate limited returns 429", async () => {
  process.env[FLAG] = "1";
  const { status, body } = await exhaust(rateLimited);
  assert.equal(status, 429);
  assert.ok(body.diagnostics, "the diagnostics trace is still attached");
});

test("flag on: a mix of failure classes keeps the aggregate 5xx, not a client 4xx", async () => {
  process.env[FLAG] = "1";
  const { status } = await exhaust((i) => (i % 2 === 0 ? rateLimited() : providerDown()));
  assert.ok(status >= 500, `mixed classes must stay 5xx, got ${status}`);
});
