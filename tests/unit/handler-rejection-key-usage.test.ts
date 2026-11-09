// A request rejected by key policy (budget, model denied) or by a guardrail is logged through
// logHandlerRejection. It wrote only a call_logs row, so a key whose traffic was all rejected
// showed zero requests in the per-key usage report, which reads usage_history.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-handler-rejection-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { logAdmissionRejection } = await import("../../src/sse/handlers/admissionRejectionLog.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  usageHistory.clearPendingRequests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const entry = (apiKeyId: string | null) => ({
  path: "/v1/chat/completions",
  model: "gpt-4o",
  requestBody: { model: "gpt-4o" },
  apiKeyId,
  apiKeyName: apiKeyId ? "team-key" : null,
  correlationId: "req-1",
});
const rejection = () =>
  new Response(JSON.stringify({ error: { code: "budget_exceeded", message: "over budget" } }), {
    status: 429,
  });

async function keyRows(apiKeyId: string) {
  const rows = (await usageHistory.getUsageDb()).data.history;
  return rows.filter((r: { apiKeyId?: string | null }) => r.apiKeyId === apiKeyId);
}

test("a policy rejection of a known key counts in usage_history as a failed request", async () => {
  await logAdmissionRejection(rejection(), entry("key-rejected-only"));
  const rows = await keyRows("key-rejected-only");
  assert.equal(rows.length, 1);
  assert.equal(rows[0].success, false);
  assert.equal(String(rows[0].status), "429");
});

test("a rejection with no identified key writes no usage_history row", async () => {
  await logAdmissionRejection(rejection(), entry(null));
  const rows = (await usageHistory.getUsageDb()).data.history;
  assert.equal(rows.length, 0);
});
