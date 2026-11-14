// maxWaitMs=0 is the documented "no queue deadline" sentinel (#14164). The gate in
// executeProviderRequest computes the remaining budget and passes it to withRateLimit;
// a numeric 0 there means "budget exhausted" and trips an immediate 503. The sentinel
// must therefore surface as `undefined` (no budget), not 0.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "or9r-queue-budget-0-"));
process.env.DATA_DIR = DIR;

const resilience = await import("../../src/lib/resilience/settings.ts");
const rl = await import("../../open-sse/services/rateLimitManager.ts");
const { remainingQueueBudgetMs } = await import("../../open-sse/handlers/chatCore/queueBudget.ts");
const { getTrustedLocalRateLimitError } =
  await import("../../open-sse/services/rateLimitManager/errors.ts");

test.after(async () => {
  await rl.__resetRateLimitManagerForTests();
  fs.rmSync(DIR, { recursive: true, force: true });
});

test("remainingQueueBudgetMs: maxWaitMs=0 sentinel maps to undefined, positive budget stays numeric", () => {
  assert.equal(remainingQueueBudgetMs(0, Date.now()), undefined);
  assert.equal(remainingQueueBudgetMs(-1, Date.now()), undefined);
  const startedAt = Date.now() - 50;
  const remaining = remainingQueueBudgetMs(5_000, startedAt);
  assert.ok(typeof remaining === "number" && remaining > 0 && remaining <= 5_000);
});

test("maxWaitMs=0 + idle connection: request must run, not 503 (executeProviderRequest.ts:318 flow)", async () => {
  await rl.applyRequestQueueSettings({
    ...resilience.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 0,
  });
  const conn = "queue-budget-zero-conn";
  rl.enableRateLimitProtection(conn);

  // Exactly what executeProviderRequest.ts:306-318 does:
  const maxWaitMs = rl.resolveRequestQueueMaxWaitMs("openai", undefined, conn);
  const remainingAfterGate = remainingQueueBudgetMs(maxWaitMs, Date.now());
  assert.equal(maxWaitMs, 0);

  let ran = false;
  let code: string | undefined;
  try {
    await rl.withRateLimit(
      "openai",
      conn,
      "gpt-4o",
      async () => {
        ran = true;
        return "ok";
      },
      null,
      remainingAfterGate
    );
  } catch (err) {
    code = getTrustedLocalRateLimitError(err)?.code;
  }
  assert.equal(code, undefined, `withRateLimit rejected with ${code}`);
  assert.equal(ran, true);
});
