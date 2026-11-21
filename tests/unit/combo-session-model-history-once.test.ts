// One successful combo target must record its session model once. The universal-handoff block
// used to record it twice with identical arguments, and a combo with context_cache_protection on
// the same session recorded it a third time. Each call is a separate INSERT into
// session_model_history; the only production read takes the latest row.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-session-model-once-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const handoffDb = await import("../../src/lib/db/contextHandoffs.ts");
const { scopeHandoffSessionId } =
  await import("../../open-sse/services/combo/handoffSessionScope.ts");
const { clearSessions } = await import("../../open-sse/services/sessionManager.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");
const { _resetAllDecks } = await import("../../src/shared/utils/shuffleDeck.ts");

const log = { info() {}, warn() {}, error() {}, debug() {} };

function okResponse() {
  return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function failResponse() {
  return new Response(JSON.stringify({ error: { message: "fail" } }), {
    status: 503,
    headers: { "content-type": "application/json" },
  });
}

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  clearSessions();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.afterEach(async () => {
  clearSessions();
  await new Promise((resolve) => setTimeout(resolve, 50));
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type ComboExtras = Record<string, unknown>;

/** Runs one request and returns the INSERT statements it executed into session_model_history. */
async function runOnce(
  sessionId: string,
  comboName: string,
  models: string[],
  extras: ComboExtras
) {
  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => unknown };
  const prepare = db.prepare.bind(db);
  let inserts = 0;
  db.prepare = (sql: string) => {
    if (/INSERT INTO session_model_history/.test(sql)) inserts += 1;
    return prepare(sql);
  };
  try {
    const result = await handleComboChat({
      body: { messages: [{ role: "user", content: "Continue" }] },
      combo: {
        name: comboName,
        strategy: "priority",
        models,
        config: { maxRetries: 0 },
        ...extras,
      },
      handleSingleModel: async (_body: unknown, modelStr: string) =>
        modelStr.endsWith("/failed") ? failResponse() : okResponse(),
      isModelAvailable: async () => true,
      log,
      settings: null,
      allCombos: null,
      relayOptions: { sessionId },
    });
    assert.equal(result.ok, true);
  } finally {
    db.prepare = prepare;
  }
  return inserts;
}

test("universal handoff records the session model once per successful target", async () => {
  const inserts = await runOnce("sess-once-handoff", "once-handoff", ["openai/only"], {
    universalHandoff: { enabled: true },
  });

  const stored = scopeHandoffSessionId("sess-once-handoff", null)!;
  assert.equal(inserts, 1, "one successful target is one history row");
  assert.equal(handoffDb.getLastSessionModel(stored, "once-handoff"), "openai/only");
});

test("universal handoff plus context cache protection on one session still records once", async () => {
  const inserts = await runOnce(
    "sess-once-both",
    "once-both",
    ["openai/failed", "anthropic/fallback"],
    {
      universalHandoff: { enabled: true },
      context_cache_protection: true,
    }
  );

  const stored = scopeHandoffSessionId("sess-once-both", null)!;
  assert.equal(inserts, 1);
  assert.equal(
    handoffDb.getLastSessionModel(stored, "once-both"),
    "anthropic/fallback",
    "the history keeps the fallback model that served the response"
  );
});

test("context cache protection alone still records its pin", async () => {
  const inserts = await runOnce("sess-once-pin", "once-pin", ["openai/only"], {
    universalHandoff: { enabled: false },
    context_cache_protection: true,
  });

  const stored = scopeHandoffSessionId("sess-once-pin", null)!;
  assert.equal(inserts, 1);
  assert.equal(handoffDb.getLastSessionModel(stored, "once-pin"), "openai/only");
});
