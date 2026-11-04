/**
 * /api/settings/codex-wakeups — management auth, Zod validation, account checks and
 * sanitized errors. Only paths that never reach upstream are exercised here: a "run"
 * targets a deactivated account, so the per-account ping is skipped before any I/O.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codex-wakeups-route-"));
process.env.DATA_DIR = directory;
process.env.APP_LOG_TO_FILE = "false";

const route = await import("../../src/app/api/settings/codex-wakeups/route.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const service = await import("../../src/lib/services/codexWakeups.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(async () => {
  service.stopCodexWakeups();
  const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
  flushProxyLogsSync();
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

const URL = "http://localhost/api/settings/codex-wakeups";

function post(body: unknown) {
  return makeManagementSessionRequest(URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: body as Record<string, unknown>,
  });
}

function task(connectionIds: string[], overrides: Record<string, unknown> = {}) {
  return {
    name: "Morning",
    connectionIds,
    enabled: true,
    schedule: { kind: "daily", time: "08:30", timezone: "UTC", days: [1, 2, 3, 4, 5] },
    ...overrides,
  };
}

type Row = { id: string };

async function codexAccount(extra: Record<string, unknown> = {}): Promise<Row> {
  return (await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    accessToken: "token",
    email: `wakeup-${Math.random().toString(36).slice(2)}@example.com`,
    isActive: true,
    ...extra,
  })) as Row;
}

test("GET and POST require management authentication", async () => {
  await settingsDb.updateSettings({ requireLogin: true, password: "test" });
  const get = await route.GET(new Request(URL));
  assert.equal(get.status, 401);
  const postResponse = await route.POST(
    new Request(URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "delete", id: "x" }),
    })
  );
  assert.equal(postResponse.status, 401);
});

test("invalid payloads are rejected with 400 and no stack trace", async () => {
  for (const body of [
    { action: "create", task: task(["a"], { schedule: { kind: "interval", minutes: 1 } }) },
    { action: "explode" },
    { action: "create", task: task([]) },
  ]) {
    const response = await route.POST(await post(body));
    assert.equal(response.status, 400);
    const json = await response.json();
    assert.equal(JSON.stringify(json).includes("at /"), false);
  }
  const malformed = await route.POST(
    await makeManagementSessionRequest(URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not json",
    })
  );
  assert.equal(malformed.status, 400);
});

test("create refuses accounts that are not active Codex OAuth connections", async () => {
  const apiKey = (await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-wakeup-route",
    isActive: true,
  })) as Row;
  const response = await route.POST(await post({ action: "create", task: task([apiKey.id]) }));
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(String(json.error?.message ?? "").includes("at /"), false);
});

test("create, list, run, update and delete a wakeup task", async () => {
  const account = await codexAccount();
  const created = await route.POST(await post({ action: "create", task: task([account.id]) }));
  assert.equal(created.status, 201);
  const { task: saved } = await created.json();
  assert.equal(saved.name, "Morning");
  assert.equal(typeof saved.nextRunAt, "string");

  const listed = await (await route.GET(await makeManagementSessionRequest(URL))).json();
  assert.equal(listed.tasks.length, 1);
  assert.deepEqual(listed.runs, []);

  // Deactivate before running so the per-account ping is skipped without network I/O.
  await providersDb.updateProviderConnection(account.id, { isActive: false });
  const run = await route.POST(await post({ action: "run", id: saved.id }));
  assert.equal(run.status, 202);
  assert.equal((await run.json()).run.trigger, "manual");
  await service.waitForCodexWakeupRuns(service.getSharedCodexWakeupState());
  const afterRun = await (await route.GET(await makeManagementSessionRequest(URL))).json();
  assert.equal(afterRun.runs[0].status, "skipped");
  assert.deepEqual(
    afterRun.runs[0].results.map((r: { reason: string }) => r.reason),
    ["inactive"]
  );

  // Disabling a task does not require its accounts to be active any more.
  const disabled = await route.POST(
    await post({ action: "update", id: saved.id, task: task([account.id], { enabled: false }) })
  );
  assert.equal(disabled.status, 200);
  const disabledTask = (await disabled.json()).task;
  assert.equal(disabledTask.enabled, false);
  assert.equal(disabledTask.nextRunAt, null);

  const removed = await route.POST(await post({ action: "delete", id: saved.id }));
  assert.equal(removed.status, 200);
  const missing = await route.POST(await post({ action: "delete", id: saved.id }));
  assert.equal(missing.status, 404);
  const missingRun = await route.POST(await post({ action: "run", id: saved.id }));
  assert.equal(missingRun.status, 404);
});
