import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codex-test-reset-"));
process.env.DATA_DIR = directory;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";
process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = "0";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
const cache = await import("../../src/domain/quotaCache.ts");
const auth = await import("../../src/sse/services/auth.ts");
const route = await import("../../src/app/api/providers/[id]/test-message/route.ts");
const codexUsage = await import("../../open-sse/services/usage/codex.ts");
const recovery = await import("../../src/sse/services/codexQuotaRecoveryRecheck.ts");
const fences = await import("../../src/lib/db/codexConnectionFences.ts");
const originalFetch = globalThis.fetch;
const ids: string[] = [];
let usageCalls = 0;
let liveUsed = 5;
function usageResponse() {
  return Response.json({
    plan_type: "pro",
    rate_limit: {
      primary_window: {
        used_percent: liveUsed,
        limit_window_seconds: 604800,
        reset_after_seconds: 600,
      },
    },
  });
}
function completion() {
  const response = {
    id: "resp_test",
    object: "response",
    status: "completed",
    model: "gpt-5.5",
    output: [
      {
        id: "msg_test",
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "ok", annotations: [] }],
      },
    ],
    usage: { input_tokens: 2, output_tokens: 1, total_tokens: 3 },
  };
  return new Response(
    `event: response.output_text.delta\ndata: ${JSON.stringify({ type: "response.output_text.delta", delta: "ok", output_index: 0, content_index: 0 })}\n\nevent: response.completed\ndata: ${JSON.stringify({ type: "response.completed", response })}\n\n`,
    { headers: { "content-type": "text/event-stream" } }
  );
}
async function seed() {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    accessToken: "synthetic-test-message",
    isActive: true,
    testStatus: "active",
    quotaWindowThresholds: { weekly: 10 },
    providerSpecificData: {
      connectionTestModel: "gpt-5.5",
      autoFetchModels: false,
      workspaceInfoFetchedAt: new Date().toISOString(),
      codexLimitPolicy: { use5h: false, useWeekly: true },
      limitPolicy: { enabled: true, thresholdPercent: 90 },
    },
  });
  ids.push(connection.id);
  const models = await import("../../src/lib/db/models.ts");
  await models.replaceSyncedAvailableModelsForConnection("codex", connection.id, [
    { id: "gpt-5.5", name: "gpt-5.5" },
  ]);
  cache.setQuotaCache(connection.id, "codex", {
    weekly: { remainingPercentage: 1, resetAt: new Date(Date.now() + 600_000).toISOString() },
  });
  return connection;
}
async function post(id: string) {
  return route.POST(
    await makeManagementSessionRequest(`http://localhost/api/providers/${id}/test-message`, {
      method: "POST",
    }),
    { params: Promise.resolve({ id }) }
  );
}
test.beforeEach(async () => {
  for (const id of ids.splice(0)) await providers.deleteProviderConnection(id);
  cache.__clearForTests();
  usageCalls = 0;
  liveUsed = 5;
  await settings.updateSettings({
    requireLogin: false,
    hidePaidModels: false,
    resilienceSettings: { quotaPreflight: { enabled: false } },
  });
  globalThis.fetch = async () => completion();
  codexUsage.setCodexUsageFetchForTests(async () => {
    usageCalls++;
    return usageResponse();
  });
});
test.after(async () => {
  globalThis.fetch = originalFetch;
  codexUsage.setCodexUsageFetchForTests(null);
  const callLogs = await import("../../src/lib/usage/callLogs.ts");
  await callLogs.waitForCallLogSaves(10_000);
  const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
  flushProxyLogsSync();
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});
for (const used of [5, 94]) {
  test(`successful Test message refreshes live ${used}% without bypassing cutoff`, async () => {
    const connection = await seed();
    liveUsed = used;
    const response = await post(connection.id);
    assert.equal(response.status, 200, await response.text());
    assert.equal(usageCalls, 1);
    const selected = await auth.getProviderCredentials("codex", null, [connection.id], "gpt-5.5");
    assert.equal(selected?.connectionId, used === 5 ? connection.id : undefined);
    assert.equal(selected?.allRateLimited, used === 94 ? true : undefined);
  });
}
test("failed post-test refresh returns 200 and grants only one cooldown-bypassing retry", async () => {
  const connection = await seed();
  const blocker = {
    connectionId: connection.id,
    windowNames: ["weekly"],
    observedAts: [Date.now() - 30_000],
  };
  const deps = {
    ownerEpoch: () => fences.readCodexQuotaOwner(connection.id)!.epoch,
    eligible: async () => true,
    refresh: async () => {
      usageCalls++;
      throw new Error("offline");
    },
  };
  await recovery.recheckCodexQuotaRecovery([blocker], deps);
  codexUsage.setCodexUsageFetchForTests(async () => {
    usageCalls++;
    throw new Error("offline");
  });
  assert.equal((await post(connection.id)).status, 200);
  assert.equal(usageCalls, 2);
  await recovery.recheckCodexQuotaRecovery([blocker], deps);
  await recovery.recheckCodexQuotaRecovery([blocker], deps);
  assert.equal(usageCalls, 3);
});
test("post-test timeout returns 200 and releases sending lock without deleting the shared flight", async (t) => {
  const connection = await seed();
  let finish!: () => void;
  let started!: () => void;
  const pending = new Promise<void>((resolve) => {
    finish = resolve;
  });
  const dispatched = new Promise<void>((resolve) => {
    started = resolve;
  });
  codexUsage.setCodexUsageFetchForTests(async () => {
    usageCalls++;
    started();
    await pending;
    return usageResponse();
  });
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const first = post(connection.id);
  await Promise.race([
    dispatched,
    first.then(() => {
      throw new Error("post-test refresh did not dispatch");
    }),
  ]);
  t.mock.timers.tick(5_000);
  assert.equal((await first).status, 200);
  assert.equal(usageCalls, 1, "timing out must leave the original flight alive");
  const second = post(connection.id);
  finish();
  assert.equal((await second).status, 200, "sending lock must not remain held after the deadline");
});
