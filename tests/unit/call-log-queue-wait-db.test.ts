// queue_wait_ms through the real writers: a save/read round trip, the reconciliation a lineage that
// skipped the migration depends on, and the full chat path that stamps and persists it.
import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("call-log-queue-wait-db");
const { getDbInstance } = await import("../../src/lib/db/core.ts");
const { ensureCallLogsColumns } = await import("../../src/lib/db/schemaColumns.ts");
const { saveCallLog, waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const originalFetch = globalThis.fetch;

function latestQueueWait() {
  return (
    getDbInstance()
      .prepare("SELECT queue_wait_ms FROM call_logs ORDER BY timestamp DESC, rowid DESC")
      .get() as { queue_wait_ms: number | null } | undefined
  )?.queue_wait_ms;
}

async function save(entry: Record<string, unknown>) {
  await saveCallLog({
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "gpt-4o",
    provider: "openai",
    duration: 1,
    ...entry,
  });
  await waitForCallLogSaves(5000);
}

test.beforeEach(async () => {
  await harness.resetStorage();
  await harness.settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    hideAutoCombos: true,
    blockedProviders: ["aihorde"],
  });
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(async () => {
  globalThis.fetch = originalFetch;
  await harness.cleanup();
});

for (const [name, queueWaitMs, stored] of [
  ["a measured wait", 1234, 1234],
  ["a zero wait", 0, 0],
  ["no dispatch", null, null],
  ["a negative value", -5, null],
  ["a non-finite value", Number.NaN, null],
] as const) {
  test(`saveCallLog persists ${name} as ${stored}`, async () => {
    await save({ queueWaitMs });
    assert.equal(latestQueueWait(), stored);
  });
}

test("a row written without the field stores NULL", async () => {
  await save({});
  assert.equal(latestQueueWait(), null);
});

test("a lineage missing the column heals before the INSERT names it", async () => {
  const db = getDbInstance();
  db.exec("ALTER TABLE call_logs DROP COLUMN queue_wait_ms");
  ensureCallLogsColumns(db);
  await save({ queueWaitMs: 7 });
  assert.equal(latestQueueWait(), 7);
});

function completion() {
  return Response.json({
    id: "chatcmpl-queue-wait",
    object: "chat.completion",
    model: "gpt-4o",
    choices: [{ index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
    usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
  });
}

test("the chat path stamps the first dispatch and persists the wait on the row", async () => {
  await harness.seedConnection("openai");
  const before = Date.now();
  let dispatched = 0;
  globalThis.fetch = async () => {
    dispatched += 1;
    return completion();
  };
  const response = await harness.handleChat(
    harness.buildRequest({
      body: {
        model: "openai/gpt-4o",
        stream: false,
        messages: [{ role: "user", content: "offline queue wait" }],
      },
    })
  );
  assert.equal(response.status, 200);
  await response.text();
  await waitForCallLogSaves(10_000);
  assert.equal(dispatched, 1);
  const wait = latestQueueWait();
  assert.equal(typeof wait, "number", "the row must carry the measured wait, not NULL");
  assert.ok((wait as number) >= 0 && (wait as number) <= Date.now() - before);
});
