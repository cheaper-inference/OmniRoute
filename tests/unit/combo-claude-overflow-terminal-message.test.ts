/**
 * When a combo spends its attempt budget on context-window rejections, the terminal 400 says so.
 * If the last rejection already carried Anthropic's compactable wording with both counts (the
 * final token-budget gate writes it on the Claude wire), the terminal 400 must keep that wording
 * so Claude Code compacts instead of stopping. Other overflow text keeps the generic message.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-claude-overflow-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-claude-overflow-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { buildContextBudgetResponse, CONTEXT_OVERFLOW_BUDGET_MESSAGE } =
  await import("../../open-sse/services/combo/budgetExhaustion.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };
const DIAG = {
  poolSize: 2,
  attempted: 2,
  excluded: [],
  attemptOrder: [],
  terminalReason: "max_attempts_exceeded",
};
const CLAUDE_PHRASE = "prompt is too long: 210724 tokens > 200000 maximum";

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the terminal 400 keeps the compactable phrase from the last rejection", async () => {
  const entry = { status: 400, error: CLAUDE_PHRASE };
  const response = buildContextBudgetResponse(CLAUDE_PHRASE, [entry, entry], DIAG);
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.error.message, CLAUDE_PHRASE);
  assert.equal(body.error.code, "context_length_exceeded");
  assert.ok(body.diagnostics, "diagnostics stay attached");
});

test("the phrase is found inside a raw JSON error body", async () => {
  const raw = JSON.stringify({
    error: { message: CLAUDE_PHRASE, code: "context_length_exceeded" },
  });
  const response = buildContextBudgetResponse(raw, [{ status: 400, error: raw }], DIAG);
  const body = await response.json();

  assert.equal(body.error.message, CLAUDE_PHRASE);
});

test("overflow text without both counts keeps the generic terminal message", async () => {
  const text = "Input exceeds the context window for prov/model";
  const response = buildContextBudgetResponse(text, [{ status: 400, error: text }], DIAG);
  const body = await response.json();

  assert.equal(body.error.message, CONTEXT_OVERFLOW_BUDGET_MESSAGE);
});

test("a spent combo budget on Claude-wire rejections ends with the compactable phrase", async () => {
  const models = Array.from({ length: 40 }, (_, i) => `prov${i}/model-${i}`);
  let calls = 0;
  const result = await handleComboChat({
    body: { model: "x", messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "c-claude-overflow",
      strategy: "priority",
      models: models.map((m) => ({ model: m })),
    },
    // Each target states its own window, so the rejections differ and the combo keeps going
    // until the shared attempt budget is spent.
    handleSingleModel: async () => {
      calls += 1;
      const message = `prompt is too long: 210724 tokens > ${100_000 + calls} maximum`;
      return new Response(JSON.stringify({ error: { code: "context_length_exceeded", message } }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    },
    log,
    settings: {},
    allCombos: [],
  });
  const body = await result.clone().json();

  assert.equal(result.status, 400);
  assert.equal(body.error.code, "context_length_exceeded");
  assert.match(body.error.message, /^prompt is too long: 210724 tokens > \d+ maximum$/);
  assert.ok(body.diagnostics, "diagnostics stay attached");
});
