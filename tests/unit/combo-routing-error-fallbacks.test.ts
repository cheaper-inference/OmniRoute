import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { HandleComboChatOptions } from "../../open-sse/services/combo/types.ts";

const originalDataDir = process.env.DATA_DIR;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-routing-guard-fallbacks-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { readBudgetFailure } = await import("../../open-sse/services/combo/budgetExhaustion.ts");
const { runComboWithSafetyLatch } =
  await import("../../open-sse/services/combo/safetyStopLatch.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("an unreadable error body cannot fabricate context-overflow evidence", async () => {
  const upstreamError = new Error("upstream body failed");
  const original = new Response(
    new ReadableStream({
      start(controller) {
        controller.error(upstreamError);
      },
    }),
    { status: 413 }
  );

  assert.deepEqual(await readBudgetFailure(original), { status: 413, error: "" });
  assert.equal(original.bodyUsed, false);
  await assert.rejects(original.text(), (error) => error === upstreamError);
});

test("a readable context error keeps its evidence and original body", async () => {
  const text = "Input exceeds the context window";
  const original = new Response(text, { status: 400 });
  assert.deepEqual(await readBudgetFailure(original), { status: 400, error: text });
  assert.equal(await original.text(), text);
});

test("a non-JSON error cannot latch a fabricated provider safety refusal", async () => {
  const original = new Response("upstream unavailable", { status: 403 });
  let calls = 0;
  const success = Response.json({ choices: [{ message: { content: "fallback" } }] });
  const noop = () => {};
  const options: HandleComboChatOptions = {
    body: {},
    combo: { name: "unreadable-safety", strategy: "priority", models: ["first", "second"] },
    handleSingleModel: async () => (++calls === 1 ? original : success),
    log: { info: noop, warn: noop, error: noop, debug: noop },
  };

  const result = await runComboWithSafetyLatch(options, "unreadable-safety", async (scoped) => {
    const first = await scoped.handleSingleModel({}, "first");
    assert.equal(first, original);
    assert.equal(first.status, 403, "the ordinary error still reaches the strategy");
    assert.equal(await first.text(), "upstream unavailable");
    assert.equal(scoped.signal?.aborted, false, "no safety evidence means no safety latch");
    return scoped.handleSingleModel({}, "second");
  });

  assert.equal(result, success);
  assert.equal(calls, 2);
});

test("an unavailable connection lookup keeps the prior quota limit", async () => {
  const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
  const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
  const { resolveTargetTokenLimit } =
    await import("../../open-sse/services/combo/targetTokenLimit.ts");
  const { reserveQuota } = await import("../../src/lib/quota/quotaScheduler.ts");
  const { getProviderQuota } = await import("../../src/lib/quota/providerQuotaState.ts");
  const connection = await createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "routing-guard-fallback-test",
    apiKey: "offline-test-only",
    isActive: true,
    rateLimitOverrides: { tpm: 1000 },
  });
  const target = { connectionId: connection.id, provider: "glm", modelStr: "glm/glm-4.6" };
  const request = { messages: [{ role: "user", content: "test quota reservation" }] };
  assert.equal(await resolveTargetTokenLimit(target), 1000);
  reserveQuota(connection.id, target.modelStr, request, { tokenLimit: 1000 });

  try {
    invalidateDbCache();
    core.getDbInstance().exec("DROP TABLE provider_connections");
    const tokenLimit = await resolveTargetTokenLimit(target);
    assert.equal(tokenLimit, undefined);
    reserveQuota(connection.id, target.modelStr, request, { tokenLimit });
    assert.equal(getProviderQuota(connection.id, target.modelStr)?.tokenLimit, 1000);
  } finally {
    core.resetDbInstance();
  }
});
