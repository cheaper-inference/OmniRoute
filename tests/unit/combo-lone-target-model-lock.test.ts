/**
 * A combo's only target must not be parked for an hour by a model-scoped 400.
 * With no sibling target, the lock saves nothing and blocks the model even after
 * the upstream starts serving it again. With siblings, the lock stays.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-lone-lock-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-lone-lock-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { clearAllModelLockouts, isModelLocked } =
  await import("../../open-sse/services/accountFallback.ts");

test.beforeEach(() => {
  clearAllModelLockouts();
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };
const NOT_SUPPORTED = "The requested model is not supported.";

function run(models: string[], handleSingleModel: (body: unknown, modelStr: string) => Response) {
  return handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: { name: "lone-lock", strategy: "priority", models: models.map((m) => ({ model: m })) },
    handleSingleModel: async (body: unknown, modelStr: string) => handleSingleModel(body, modelStr),
    log,
    settings: {},
    allCombos: [],
  });
}

const reject400 = () =>
  Response.json(
    { error: { message: NOT_SUPPORTED, type: "invalid_request_error" } },
    { status: 400 }
  );
const ok = () =>
  Response.json({
    id: "ok",
    object: "chat.completion",
    choices: [{ message: { role: "assistant", content: "ok" } }],
  });

test("the only target of a combo is not locked after a model-scoped 400", async () => {
  let upstreamServes = false;
  const calls: string[] = [];
  const handler = (_body: unknown, modelStr: string) => {
    calls.push(modelStr);
    return upstreamServes ? ok() : reject400();
  };

  const first = await run(["github/claude-fable-5"], handler);
  assert.equal(first.status, 400);
  assert.equal(isModelLocked("github", "", "claude-fable-5"), false);

  upstreamServes = true;
  const second = await run(["github/claude-fable-5"], handler);
  assert.equal(second.status, 200, "the next request must reach the upstream again");
  assert.equal(calls.length, 2);
});

test("a target with a sibling is still locked after a model-scoped 400", async () => {
  const response = await run(["github/claude-fable-5", "claude/claude-fable-5"], (_b, modelStr) =>
    modelStr === "github/claude-fable-5" ? reject400() : ok()
  );
  assert.equal(response.status, 200);
  assert.equal(isModelLocked("github", "", "claude-fable-5"), true);
});
