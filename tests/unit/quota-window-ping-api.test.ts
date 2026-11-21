/**
 * /api/settings/quota-window-ping route plus its persistence store.
 *
 * Runs against a throwaway DATA_DIR SQLite file. "run" is exercised only through
 * paths that stop before any network I/O: the kill switch is off (skipped
 * kill_switch_off) and a live lease (409).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { WindowPingTargetInput } from "../../src/shared/types/quotaWindowPing.ts";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "quota-window-ping-api-"));
process.env.DATA_DIR = directory;
process.env.APP_LOG_TO_FILE = "false";

const route = await import("../../src/app/api/settings/quota-window-ping/route.ts");
const db = await import("../../src/lib/db/quotaWindowPing.ts");
const coreDb = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { nextWakeupAt } = await import("../../src/lib/services/codexWakeupSchedule.ts");
const { stopQuotaWindowPingScheduler } =
  await import("../../src/lib/services/quotaWindowPingScheduler.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");

test.after(async () => {
  stopQuotaWindowPingScheduler();
  const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
  flushProxyLogsSync();
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

test.beforeEach(() => {
  const sqlite = coreDb.getDbInstance();
  sqlite.prepare("DELETE FROM quota_ping_runs").run();
  sqlite.prepare("DELETE FROM quota_ping_targets").run();
});

const URL = "http://localhost/api/settings/quota-window-ping";

function post(body: unknown) {
  return makeManagementSessionRequest(URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: body as Record<string, unknown>,
  });
}

async function createConnection(provider: string, extra: Record<string, unknown> = {}) {
  return (await providersDb.createProviderConnection({
    provider,
    authType: "oauth",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    email: `${provider}-${Math.random().toString(36).slice(2)}@example.com`,
    isActive: true,
    ...extra,
  })) as { id: string };
}

function targetInput(
  connectionId: string,
  descriptorId: string,
  overrides: Record<string, unknown> = {}
): WindowPingTargetInput {
  return {
    connectionId,
    descriptorId,
    model: null,
    enabled: true,
    schedule: { kind: "interval", minutes: 60 },
    minLongerWindowRemainingPct: 0,
    dryRun: false,
    claudeBillableConfirmed: false,
    ...overrides,
  } as WindowPingTargetInput;
}

function jsonOf(response: Response) {
  return response.json() as Promise<Record<string, unknown>>;
}

test("GET and POST require management authentication", async () => {
  await settingsDb.updateSettings({ requireLogin: true, password: "test" });
  const get = await route.GET(new Request(URL));
  assert.equal(get.status, 401);
  const posted = await route.POST(
    new Request(URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "delete", id: "missing" }),
    })
  );
  assert.equal(posted.status, 401);
});

test("GET exposes the kill switch, descriptors, targets and runs", async () => {
  const response = await route.GET(await makeManagementSessionRequest(URL));
  assert.equal(response.status, 200);
  const body = await jsonOf(response);
  assert.equal(body.enabled, false);
  assert.deepEqual(body.targets, []);
  assert.deepEqual(body.runs, []);
  const descriptors = body.descriptors as Array<Record<string, unknown>>;
  const byId = new Map(descriptors.map((descriptor) => [descriptor.id, descriptor]));
  assert.equal(byId.get("codex:session")?.targetable, true);
  assert.equal(byId.get("claude:weekly-scoped")?.targetable, false);
  assert.equal(byId.get("claude:weekly-scoped")?.policy, "excluded");
  for (const descriptor of descriptors) {
    assert.equal("pingText" in descriptor, false);
    assert.equal("pingInstructions" in descriptor, false);
    assert.equal("pingModelCandidates" in descriptor, false);
  }
});

test("create, update and delete a target with fixed responses", async () => {
  const codex = await createConnection("codex");
  const created = await route.POST(
    await post({ action: "create", target: targetInput(codex.id, "codex:session") })
  );
  assert.equal(created.status, 201);
  const { target } = await jsonOf(created);
  assert.equal(target.provider, "codex");
  assert.equal(target.windowId, "session");
  assert.equal(target.enabled, true);
  assert.equal(typeof target.nextRunAt, "string");

  const duplicate = await route.POST(
    await post({ action: "create", target: targetInput(codex.id, "codex:session") })
  );
  assert.equal(duplicate.status, 409);

  const listed = await jsonOf(await route.GET(await makeManagementSessionRequest(URL)));
  assert.equal(listed.targets.length, 1);

  const updated = await route.POST(
    await post({
      action: "update",
      id: target.id,
      target: targetInput(codex.id, "codex:session", { enabled: false, schedule: null }),
    })
  );
  assert.equal(updated.status, 200);
  const updatedTarget = (await jsonOf(updated)).target;
  assert.equal(updatedTarget.enabled, false);
  assert.equal(updatedTarget.nextRunAt, null);

  const deleted = await route.POST(await post({ action: "delete", id: target.id }));
  assert.equal(deleted.status, 200);
  assert.deepEqual(await jsonOf(deleted), { ok: true });
  const afterDelete = await jsonOf(await route.GET(await makeManagementSessionRequest(URL)));
  assert.deepEqual(afterDelete.targets, []);
});

test("run records a skipped row when the kill switch is off and 409s on a live lease", async () => {
  await settingsDb.updateSettings({ quotaWindowPing: { enabled: false } });
  const codex = await createConnection("codex");
  const created = await route.POST(
    await post({ action: "create", target: targetInput(codex.id, "codex:session") })
  );
  assert.equal(created.status, 201);
  const { target } = await jsonOf(created);

  const runResponse = await route.POST(await post({ action: "run", id: target.id }));
  assert.equal(runResponse.status, 200);
  const run = (await jsonOf(runResponse)).run;
  assert.equal(run.trigger, "manual");
  assert.equal(run.status, "skipped");
  assert.equal(run.reason, "kill_switch_off");
  assert.equal(run.dryRun, false);

  const claim = db.claimWindowPingRun(target.id, "manual", Date.now(), nextWakeupAt);
  assert.equal(claim.kind, "claimed");
  if (claim.kind !== "claimed") return;
  const deleteWhileRunning = await route.POST(await post({ action: "delete", id: target.id }));
  assert.equal(deleteWhileRunning.status, 409);

  const conflict = await route.POST(await post({ action: "run", id: target.id }));
  assert.equal(conflict.status, 409);
  assert.equal(String((await jsonOf(conflict)).error?.message).includes("running"), true);
  assert.equal(
    db.listWindowPingRuns(10).some((row: { reason: string | null }) => row.reason === "in_flight"),
    true
  );

  db.finishWindowPingRun(claim.claim.run.id, Date.now(), {
    status: "skipped",
    reason: "in_flight",
    fingerprint: null,
  });

  const missing = await route.POST(
    await post({ action: "run", id: "00000000-0000-0000-0000-000000000000" })
  );
  assert.equal(missing.status, 404);
});

test("expired leases recover as skipped interrupted rows", async () => {
  const codex = await createConnection("codex");
  const target = db.createWindowPingTarget(
    targetInput(codex.id, "codex:session"),
    new Date(Date.now() + 60_000).toISOString()
  );
  const claim = db.claimWindowPingRun(target.id, "manual", Date.now(), nextWakeupAt);
  assert.equal(claim.kind, "claimed");
  if (claim.kind !== "claimed") return;

  // The runner renews the lease at dispatch: a live running row renews, a
  // recovered one cannot (so the runner must not send the request).
  assert.equal(db.renewWindowPingRunLease(claim.claim.run.id, Date.now()), true);
  const recovered = db.recoverWindowPingRuns(Date.now() + 10 * 60_000);
  assert.equal(recovered, 1);
  assert.equal(db.renewWindowPingRunLease(claim.claim.run.id, Date.now() + 10 * 60_000), false);
  const run = db.listWindowPingRuns(10)[0];
  assert.equal(run.status, "skipped");
  assert.equal(run.detail, "interrupted");
  assert.equal(run.finishedAt !== null, true);
});

test("validation rejections use 400 and fixed messages", async () => {
  const codex = await createConnection("codex");
  const claude = await createConnection("claude");
  const cases: Array<Record<string, unknown>> = [
    {
      action: "create",
      target: targetInput(codex.id, "codex:session", {
        schedule: { kind: "interval", minutes: 4 },
      }),
    },
    {
      action: "create",
      target: targetInput(codex.id, "codex:session", {
        schedule: { kind: "daily", time: "08:30", timezone: "Mars/Olympus", days: [1] },
      }),
    },
    {
      action: "create",
      target: targetInput(codex.id, "codex:session", { enabled: true, schedule: null }),
    },
    { action: "create", target: targetInput(claude.id, "claude:session") },
    { action: "create", target: targetInput(codex.id, "unknown:session") },
    { action: "create", target: targetInput(codex.id, "claude:weekly-scoped") },
    {
      action: "create",
      target: targetInput(codex.id, "codex:weekly", { minLongerWindowRemainingPct: 5 }),
    },
    { action: "explode", id: "x" },
  ];
  for (const body of cases) {
    const response = await route.POST(await post(body));
    assert.equal(response.status, 400, JSON.stringify(body));
  }

  const noConfirmation = await route.POST(
    await post({ action: "create", target: targetInput(claude.id, "claude:session") })
  );
  const noConfirmationBody = await jsonOf(noConfirmation);
  assert.equal(
    JSON.stringify(noConfirmationBody).includes(
      "Recorded-confirmation required for Claude scheduled pings"
    ),
    true
  );

  const confirmed = await route.POST(
    await post({
      action: "create",
      target: targetInput(claude.id, "claude:session", { claudeBillableConfirmed: true }),
    })
  );
  assert.equal(confirmed.status, 201);
});

test("the 100 target limit maps to 409", async () => {
  const codex = await createConnection("codex");
  for (let index = 0; index < 100; index += 1) {
    db.createWindowPingTarget(
      targetInput(`bulk-${index}`, "codex:session", { enabled: false, schedule: null }),
      null
    );
  }
  const response = await route.POST(
    await post({ action: "create", target: targetInput(codex.id, "codex:session") })
  );
  assert.equal(response.status, 409);
  const body = await jsonOf(response);
  assert.equal(String(body.error?.message).includes("Maximum"), true);
});

test("legacy codexAutoPing settings still parse and the new key persists", async () => {
  const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
  const { codexWakeupTaskInputSchema } =
    await import("../../src/shared/validation/codexWakeupSchemas.ts");

  assert.equal(
    updateSettingsSchema.safeParse({ codexAutoPing: { connections: { "conn-1": true } } }).success,
    true
  );
  assert.equal(
    codexWakeupTaskInputSchema.safeParse({
      name: "Morning",
      connectionIds: ["conn-1"],
      enabled: true,
      schedule: { kind: "daily", time: "08:30", timezone: "Asia/Tokyo", days: [1] },
    }).success,
    true
  );

  const settings = await settingsDb.getSettings();
  assert.deepEqual(settings.codexAutoPing, { connections: {} });
  assert.deepEqual(settings.quotaWindowPing, { enabled: false });

  const settingsRoute = await import("../../src/app/api/settings/route.ts");
  const patch = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { quotaWindowPing: { enabled: true } },
    })
  );
  assert.equal(patch.status, 200);
  const patched = await jsonOf(patch);
  assert.equal(
    Array.isArray(patched.ignoredKeys) && patched.ignoredKeys.includes("quotaWindowPing"),
    false
  );
  assert.deepEqual(patched.quotaWindowPing, { enabled: true });

  const get = await jsonOf(await route.GET(await makeManagementSessionRequest(URL)));
  assert.equal(get.enabled, true);
});
