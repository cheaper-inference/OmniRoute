/**
 * Dashboard side of the managed update (`MANAGED_UPDATE_ROLLBACK_ENABLED`, default off).
 *
 * `POST /api/system/version` hands the update to the detached coordinator and answers 202
 * with an operation id; `GET /api/system/version?operationId=<uuid>` reports the durable
 * outcome after the server restarts, behind management auth. With the flag off the route
 * keeps its previous contract untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { NextRequest } from "next/server";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-managed-route-"));
const ORIGINAL = {
  DATA_DIR: process.env.DATA_DIR,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  FLAG: process.env.MANAGED_UPDATE_ROLLBACK_ENABLED,
  NOTIFIER: process.env.OMNIROUTE_NO_UPDATE_NOTIFIER,
};
process.env.NODE_ENV = "test";
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "a".repeat(64);
// No outbound lookups from the GET handler in these tests.
process.env.OMNIROUTE_NO_UPDATE_NOTIFIER = "1";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const tx = await import("../../bin/cli/updateTransaction.mjs");
const managed = await import("../../src/lib/system/managedUpdate.ts");
const route = await import("../../src/app/api/system/version/route.ts");
const { APP_CONFIG } = await import("../../src/shared/constants/appConfig.ts");

const asNext = (request: Request) => request as unknown as NextRequest;

type LaunchInput = {
  plan: {
    operationId: string;
    previousVersion: string;
    targetVersion: string;
    readinessTimeoutMs: number;
  };
  runtime: unknown;
  environment: unknown;
};

const URL_BASE = "http://localhost:20128/api/system/version";
const OPERATION_ID = "0b8f3c1e-2d4a-4f6b-9c7d-1a2b3c4d5e6f";

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "managed-update-route-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

function seedState(overrides: Record<string, unknown> = {}) {
  const store = tx.createStateStore(TEST_DATA_DIR, OPERATION_ID);
  store.record({
    operationId: OPERATION_ID,
    status: "rolled-back",
    phase: "finished",
    previousVersion: "3.8.54",
    targetVersion: "3.8.55",
    runningVersion: "3.8.54",
    reason: "target-not-ready",
    startedAt: "2026-11-26T10:00:00.000Z",
    updatedAt: "2026-11-26T10:03:00.000Z",
    ...overrides,
  });
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.MANAGED_UPDATE_ROLLBACK_ENABLED = "true";
  await enableManagementAuth();
});

test.afterEach(() => {
  managed.setManagedUpdateHooksForTests(null);
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, envKey] of [
    ["DATA_DIR", "DATA_DIR"],
    ["INITIAL_PASSWORD", "INITIAL_PASSWORD"],
    ["API_KEY_SECRET", "API_KEY_SECRET"],
    ["FLAG", "MANAGED_UPDATE_ROLLBACK_ENABLED"],
    ["NOTIFIER", "OMNIROUTE_NO_UPDATE_NOTIFIER"],
  ] as const) {
    const value = ORIGINAL[key];
    if (value === undefined) delete process.env[envKey];
    else process.env[envKey] = value;
  }
});

// -----------------------------------------------------------------------------------------
// GET ?operationId=
// -----------------------------------------------------------------------------------------

test("the recovery verdict is not served to an anonymous caller", async () => {
  seedState();
  const anonymousStatusResponse = await route.GET(
    asNext(new Request(`${URL_BASE}?operationId=${OPERATION_ID}`))
  );
  assert.equal(anonymousStatusResponse.status, 401);
});

test("after the server restarts, an authenticated admin reads the rolled-back verdict by id", async () => {
  seedState();
  const reconnectedAdminResponse = await route.GET(
    asNext(await makeManagementSessionRequest(`${URL_BASE}?operationId=${OPERATION_ID}`))
  );
  assert.equal(reconnectedAdminResponse.status, 200);
  assert.match(reconnectedAdminResponse.headers.get("cache-control") ?? "", /no-store/);
  const body = await reconnectedAdminResponse.json();
  assert.equal(body.status, "rolled-back");
  assert.equal(body.operationId, OPERATION_ID);
  assert.equal(body.runningVersion, "3.8.54");
  assert.equal(body.targetVersion, "3.8.55");
  assert.equal(body.phase, "finished");
});

test("a manual-recovery verdict carries the preserved snapshot and the steps, and nothing else internal", async () => {
  seedState({
    status: "manual-recovery",
    runningVersion: null,
    snapshotPath: "/data/managed-update/x/data-snapshot",
    recovery: { steps: ["Stop the service", "Restore the snapshot"] },
    internalNote: "must not leak",
    environment: { SECRET: "must not leak" },
  });
  const res = await route.GET(
    asNext(await makeManagementSessionRequest(`${URL_BASE}?operationId=${OPERATION_ID}`))
  );
  const body = await res.json();
  assert.equal(body.status, "manual-recovery");
  assert.equal(body.snapshotPath, "/data/managed-update/x/data-snapshot");
  assert.deepEqual(body.recovery.steps, ["Stop the service", "Restore the snapshot"]);
  assert.equal(JSON.stringify(body).includes("must not leak"), false);
});

test("an unknown id is a 404 and a malformed id is a 400, both with sanitized bodies", async () => {
  const missing = await route.GET(
    asNext(
      await makeManagementSessionRequest(
        `${URL_BASE}?operationId=11111111-2222-4333-8444-555555555555`
      )
    )
  );
  assert.equal(missing.status, 404);
  const bad = await route.GET(
    asNext(await makeManagementSessionRequest(`${URL_BASE}?operationId=../../etc/passwd`))
  );
  assert.equal(bad.status, 400);
  const text = await bad.text();
  assert.equal(/stack|\.ts:|node_modules/.test(text), false);
});

test("a corrupted state file is a 404-class answer, never a stack trace", async () => {
  const dir = path.join(TEST_DATA_DIR, "managed-update", OPERATION_ID);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "state.json"), "{not json");
  const res = await route.GET(
    asNext(await makeManagementSessionRequest(`${URL_BASE}?operationId=${OPERATION_ID}`))
  );
  assert.equal(res.status, 404);
});

test("with the flag off the operationId parameter changes nothing: the usual version payload", async () => {
  process.env.MANAGED_UPDATE_ROLLBACK_ENABLED = "false";
  seedState();
  const res = await route.GET(
    asNext(await makeManagementSessionRequest(`${URL_BASE}?operationId=${OPERATION_ID}`))
  );
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.current, APP_CONFIG.version);
  assert.equal("operationId" in body, false);
  assert.equal("status" in body, false);
});

test("without the parameter the version payload is unchanged even with the flag on", async () => {
  const res = await route.GET(asNext(await makeManagementSessionRequest(URL_BASE)));
  assert.equal(res.status, 200);
  const body = await res.json();
  for (const key of ["current", "latest", "updateAvailable", "channel", "autoUpdateSupported"]) {
    assert.ok(key in body, key);
  }
  assert.equal("operationId" in body, false);
});

// -----------------------------------------------------------------------------------------
// launchManagedUpdate / readManagedUpdateOutcome
// -----------------------------------------------------------------------------------------

function okPreflight() {
  return async () => ({
    kind: "ok",
    runtime: {
      dataDir: TEST_DATA_DIR,
      packageRoot: "/usr/lib/node_modules/omniroute",
      shape: "daemon",
      port: 20128,
      oldPids: [4100],
      nodePath: "/usr/bin/node",
      npmPath: "npm",
    },
    environment: { PATH: "/usr/bin" },
  });
}

test("launchManagedUpdate hands a validated plan to the coordinator and answers accepted", async () => {
  const launches: LaunchInput[] = [];
  const accepted = await managed.launchManagedUpdate("3.8.55", {
    preflight: okPreflight(),
    launch: async (input: LaunchInput) => {
      launches.push(input);
      return { operationId: input.plan.operationId };
    },
    currentVersion: () => "3.8.54",
  });
  assert.equal(accepted.status, "accepted");
  assert.match(accepted.operationId, /^[0-9a-f-]{36}$/);
  assert.equal(launches.length, 1);
  assert.equal(launches[0].plan.targetVersion, "3.8.55");
  assert.equal(launches[0].plan.previousVersion, "3.8.54");
  assert.equal(launches[0].plan.operationId, accepted.operationId);
  assert.ok(launches[0].plan.readinessTimeoutMs >= 30_000);
});

test("launchManagedUpdate rejects anything but an exact version before any pre-flight", async () => {
  let preflights = 0;
  for (const bad of ["latest", "^3.8.55", "3.8.55 && id", "", "../3.8.55"]) {
    await assert.rejects(
      managed.launchManagedUpdate(bad, {
        preflight: async () => {
          preflights += 1;
          return okPreflight()();
        },
        launch: async () => ({ operationId: "x" }),
        currentVersion: () => "3.8.54",
      }),
      /version/i,
      bad
    );
  }
  assert.equal(preflights, 0);
});

test("launchManagedUpdate surfaces unsupported and refused as typed errors", async () => {
  await assert.rejects(
    managed.launchManagedUpdate("3.8.55", {
      preflight: async () => ({ kind: "unsupported", reason: "container" }),
      launch: async () => ({ operationId: "x" }),
      currentVersion: () => "3.8.54",
    }),
    (err: { kind?: string; reason?: string }) =>
      err.kind === "unsupported" && err.reason === "container"
  );
  await assert.rejects(
    managed.launchManagedUpdate("3.8.55", {
      preflight: async () => ({ kind: "refused", reason: "insufficient-disk-space" }),
      launch: async () => ({ operationId: "x" }),
      currentVersion: () => "3.8.54",
    }),
    (err: { kind?: string; reason?: string }) =>
      err.kind === "refused" && err.reason === "insufficient-disk-space"
  );
});

test("maybeLaunchManagedUpdate: flag off, other modes and unsupported hosts keep today's flow", async () => {
  const hooks = (kind: string) => ({
    preflight: async () => ({
      kind,
      reason: "container",
      ...(kind === "ok" ? { runtime: {}, environment: {} } : {}),
    }),
    launch: async () => ({ operationId: OPERATION_ID }),
    currentVersion: () => "3.8.54",
  });

  process.env.MANAGED_UPDATE_ROLLBACK_ENABLED = "false";
  let calls = 0;
  const off = await managed.maybeLaunchManagedUpdate(
    { mode: "npm", latest: "3.8.55" },
    {
      ...hooks("ok"),
      preflight: async () => {
        calls += 1;
        return okPreflight()();
      },
    }
  );
  assert.deepEqual(off, { kind: "not-applicable" });
  assert.equal(calls, 0, "no pre-flight, no probing at all while the flag is off");

  process.env.MANAGED_UPDATE_ROLLBACK_ENABLED = "true";
  for (const mode of ["source", "docker-compose", "docker-trigger", "docker-image"]) {
    const result = await managed.maybeLaunchManagedUpdate({ mode, latest: "3.8.55" }, hooks("ok"));
    assert.deepEqual(result, { kind: "not-applicable" }, mode);
  }
  const unsupported = await managed.maybeLaunchManagedUpdate(
    { mode: "npm", latest: "3.8.55" },
    hooks("unsupported")
  );
  assert.deepEqual(unsupported, { kind: "not-applicable" });
});

test("maybeLaunchManagedUpdate: refused is surfaced, accepted carries the operation id", async () => {
  const refused = await managed.maybeLaunchManagedUpdate(
    { mode: "npm", latest: "3.8.55" },
    {
      preflight: async () => ({ kind: "refused", reason: "insufficient-disk-space" }),
      launch: async () => ({ operationId: OPERATION_ID }),
      currentVersion: () => "3.8.54",
    }
  );
  assert.equal(refused.kind, "refused");
  assert.ok(refused.kind === "refused");
  assert.equal(refused.code, "insufficient-disk-space");
  assert.equal(typeof refused.message, "string");

  const accepted = await managed.maybeLaunchManagedUpdate(
    { mode: "npm", latest: "3.8.55" },
    {
      preflight: okPreflight(),
      launch: async (input: LaunchInput) => ({ operationId: input.plan.operationId }),
      currentVersion: () => "3.8.54",
    }
  );
  assert.ok(accepted.kind === "accepted");
  assert.match(accepted.operationId, /^[0-9a-f-]{36}$/);
});

test("maybeLaunchManagedUpdate never throws a launch failure through: it refuses with a sanitized message", async () => {
  const result = await managed.maybeLaunchManagedUpdate(
    { mode: "npm", latest: "3.8.55" },
    {
      preflight: okPreflight(),
      launch: async () => {
        throw new Error("EACCES: permission denied, open '/secret/path/managed-update/x'");
      },
      currentVersion: () => "3.8.54",
    }
  );
  assert.ok(result.kind === "refused");
  assert.equal(result.code, "launch-failed");
  assert.equal(/secret|EACCES/.test(result.message), false);
});

test("readManagedUpdateOutcome returns the verdict for a finished operation and null otherwise", async () => {
  assert.equal(await managed.readManagedUpdateOutcome(OPERATION_ID), null);
  seedState({ status: "running", phase: "installing", runningVersion: null });
  assert.equal(await managed.readManagedUpdateOutcome(OPERATION_ID), null);
  seedState();
  assert.deepEqual(await managed.readManagedUpdateOutcome(OPERATION_ID), {
    operationId: OPERATION_ID,
    status: "rolled-back",
    runningVersion: "3.8.54",
  });
  assert.equal(await managed.readManagedUpdateOutcome("not-a-uuid"), null);
});
