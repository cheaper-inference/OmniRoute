import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "billing-session-"));
process.env.DATA_DIR = directory;
process.env.APP_LOG_TO_FILE = "false";
const core = await import("../../src/lib/db/core.ts");
const { saveRequestUsage } = await import("../../src/lib/usage/usageHistory.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

test("a usage write retains both billing snapshots and upstream agent-session attribution", async () => {
  await saveRequestUsage({
    provider: "fixture",
    model: "fixture-model",
    apiKeyId: "synthetic-caller",
    apiKeyName: "Synthetic caller",
    tokens: { input: 4, output: 0, cost_usd: 0.5 },
    calculatedCostUsd: 0.5,
    billingUnit: "page",
    billingQuantity: 125,
    billingUnitPriceUsd: 0.004,
    endpoint: "/v1/ocr",
    success: true,
    agentContext: {
      client: "synthetic-client",
      clientSessionId: "synthetic-session",
      projectName: "fixture",
      projectRepo: null,
      projectPath: null,
      projectSource: "header",
      gitBranch: null,
    },
  });
  const db = core.getDbInstance();
  const rows = db
    .prepare(
      `SELECT calculated_cost_usd,billing_unit,billing_quantity,
    billing_unit_price_usd,provider_cost_usd,agent_session_id FROM usage_history`
    )
    .all() as Array<{
    calculated_cost_usd: number;
    billing_unit: string;
    billing_quantity: number;
    billing_unit_price_usd: number;
    provider_cost_usd: number;
    agent_session_id: string;
  }>;
  assert.equal(rows.length, 1);
  assert.ok(rows[0].agent_session_id);
  assert.deepEqual(rows[0], {
    calculated_cost_usd: 0.5,
    billing_unit: "page",
    billing_quantity: 125,
    billing_unit_price_usd: 0.004,
    provider_cost_usd: 0.5,
    agent_session_id: rows[0].agent_session_id,
  });
  const sessions = db
    .prepare(`SELECT id,client_session_id,request_count FROM agent_sessions`)
    .all();
  assert.deepEqual(sessions, [
    {
      id: rows[0].agent_session_id,
      client_session_id: "synthetic-session",
      request_count: 1,
    },
  ]);
});
