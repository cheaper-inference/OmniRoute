/**
 * A client that disconnects (HTTP 499) did not break the provider. Combo health
 * must keep that row in the request count but not count it as a failure, so
 * aborted calls stop pulling a healthy combo and its targets below the
 * degraded thresholds. Real provider errors (5xx) must still lower the rate.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-health-client-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const comboMetrics = await import("../../open-sse/services/comboMetrics.ts");
const { buildComboHealthResponse } = await import("../../src/lib/usage/comboHealth.ts");
const { normalizeComboStep } = await import("../../src/lib/combos/steps.ts");

test.after(() => {
  comboMetrics.resetAllComboMetrics();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seed(statuses: number[]) {
  const input = {
    name: `client-faults-${Math.random().toString(36).slice(2)}`,
    strategy: "priority",
    models: [{ kind: "model", providerId: "openai", model: "openai/gpt-4o-mini" }],
  };
  const combo = await combosDb.createCombo(input);
  const step = normalizeComboStep(input.models[0], { comboName: input.name, index: 0 });
  const timestamp = new Date(Date.now() - 60_000).toISOString();
  for (const [index, status] of statuses.entries()) {
    await callLogs.saveCallLog({
      id: `${input.name}-${index}`,
      timestamp,
      method: "POST",
      path: "/v1/chat/completions",
      status,
      model: "openai/gpt-4o-mini",
      requestedModel: input.name,
      provider: "openai",
      duration: 100,
      tokens: { prompt_tokens: 10, completion_tokens: 5 },
      comboName: input.name,
      comboStepId: step.id,
      comboExecutionKey: step.id,
    });
  }
  const response = await buildComboHealthResponse({ range: "24h", comboId: String(combo.id) });
  const health = response.combos[0];
  return { performance: health.performance, target: health.targetHealth?.[0] };
}

test("499 client aborts do not lower combo or target success rate", async () => {
  const { performance, target } = await seed([200, 200, 200, 499, 499, 502]);
  // 3 ok + 2 aborts are not provider failures; only the 502 is.
  assert.equal(performance.totalRequests, 6, "aborts stay in the request count");
  assert.equal(performance.successRate, 0.8333);
  assert.equal(target?.requests, 6);
  assert.equal(target?.successRate, 83);
});

test("provider errors still lower the success rate", async () => {
  const { performance, target } = await seed([200, 502, 503, 504]);
  assert.equal(performance.successRate, 0.25);
  assert.equal(target?.successRate, 25);
});
