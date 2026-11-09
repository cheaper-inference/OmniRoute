/**
 * GET /api/init was on the PUBLIC route list and had no auth of its own, so an
 * anonymous caller passed the middleware even with requireLogin=true. Its first
 * call starts the cloud-sync scheduler, model sync and the budget-reset,
 * token-health and log_export jobs. The route is now MANAGEMENT-classified and
 * the handler calls requireManagementAuth() before doing anything.
 *
 * Every case resets settings and env in beforeEach, so the cases do not depend
 * on each other or on their order. The case where an authorized call really
 * runs the init lives in api-init-session-starts-jobs.test.ts, because the
 * init sets a module-level flag that would leak into the other cases. That
 * file sorts after this one, so when files share a process (Node runs them in
 * path order) these cases run before the init has ever run.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-api-init-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ENV_KEYS = ["OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS", "OMNIROUTE_HEADLESS"] as const;
const ORIGINAL_ENV = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const { classifyRoute } = await import("../../src/server/authz/classify.ts");
const { isPublicApiRoute } = await import("../../src/shared/constants/publicApiRoutes.ts");
const { getJobRegistry } = await import("../../src/lib/jobRegistry/index.ts");
const { getCloudSyncScheduler } = await import("../../src/shared/services/cloudSyncScheduler.ts");
const { stopModelSyncScheduler } = await import("../../src/shared/services/modelSyncScheduler.ts");
const route = await import("../../src/app/api/init/route.ts");

function restoreEnv() {
  for (const [k, v] of Object.entries(ORIGINAL_ENV)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
}

function jobIds(): string[] {
  return getJobRegistry()
    .listJobs()
    .map((j) => j.id);
}

test.beforeEach(async () => {
  restoreEnv();
  await settings.updateSettings({ requireLogin: true, password: "hashed-placeholder" });
});

test.afterEach(restoreEnv);

test.after(async () => {
  restoreEnv();
  // Only reached if a broken gate let the real init run.
  getJobRegistry().stopAll();
  stopModelSyncScheduler();
  (await getCloudSyncScheduler()).stop();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("/api/init is not a public route", () => {
  assert.equal(isPublicApiRoute("/api/init", "GET"), false);
  assert.equal(isPublicApiRoute("/api/init/", "GET"), false);
  assert.equal(classifyRoute("/api/init", "GET").routeClass, "MANAGEMENT");
});

test("requireLogin=true: anonymous GET /api/init is 401 and starts nothing", async (t) => {
  // Let initialization run in this test process, so a broken gate would show.
  process.env.OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS = "1";
  // With this set in the shell the init is skipped and the case proves nothing.
  const disableBefore = process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
  delete process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
  t.after(() => {
    if (disableBefore !== undefined)
      process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = disableBefore;
  });
  const registry = getJobRegistry();
  const register = t.mock.method(registry, "register");
  const start = t.mock.method(registry, "start");
  const startAll = t.mock.method(registry, "startAll");
  const log = t.mock.method(console, "log", () => {});
  const jobsBefore = jobIds();

  const res = await route.GET(new Request("http://localhost/api/init"));
  // Let a late, unawaited init reach the registry before checking.
  await new Promise((r) => setTimeout(r, 300));

  assert.equal(res.status, 401);
  assert.equal((await getCloudSyncScheduler()).isRunning(), false, "cloud sync started");
  const modelSyncLines = log.mock.calls.filter((c) =>
    String(c.arguments[0]).includes("[ModelSync]")
  );
  assert.deepEqual(modelSyncLines, [], "model sync scheduler started");
  assert.equal(register.mock.callCount(), 0, "a job was registered");
  assert.equal(start.mock.callCount(), 0, "a job was started");
  assert.equal(startAll.mock.callCount(), 0, "jobs were started");
  assert.deepEqual(jobIds(), jobsBefore);
});

test("headless + requireLogin=true: anonymous GET /api/init is still 401", async () => {
  process.env.OMNIROUTE_HEADLESS = "1";
  const res = await route.GET(new Request("http://localhost/api/init"));
  assert.equal(res.status, 401);
});

test("requireLogin=true: a bogus bearer token or session cookie is rejected", async () => {
  const withBearer = await route.GET(
    new Request("http://localhost/api/init", {
      headers: { authorization: "Bearer not-a-real-key" },
    })
  );
  assert.equal(withBearer.status, 403);
  const withCookie = await route.GET(
    new Request("http://localhost/api/init", { headers: { cookie: "auth_token=not-a-jwt" } })
  );
  assert.equal(withCookie.status, 401);
});

test("requireLogin=true: if the auth check throws, the init does not run", async () => {
  // A request whose headers cannot be read makes requireManagementAuth() throw.
  const broken = {
    url: "http://localhost/api/init",
    method: "GET",
    get headers(): Headers {
      throw new Error("headers unavailable");
    },
  } as unknown as Request;
  let status: number | undefined;
  try {
    status = (await route.GET(broken)).status;
  } catch {
    // Throwing is fine: the init did not run.
  }
  if (status !== undefined) assert.ok(status >= 400, `got ${status}`);
});

test("requireLogin=true: a dashboard session gets past the gate", async () => {
  const req = await makeManagementSessionRequest("http://localhost/api/init");
  const res = await route.GET(req as unknown as Request);
  assert.equal(res.status, 200);
  // Background tasks stay off in test processes, so the init itself is skipped
  // here; api-init-session-starts-jobs.test.ts covers the real init.
  assert.deepEqual(await res.json(), { initialized: false });
});

test("requireLogin=false: anonymous GET /api/init is allowed (open mode)", async () => {
  await settings.updateSettings({ requireLogin: false });
  const res = await route.GET(new Request("http://localhost/api/init"));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { initialized: false });
});

test("headless + requireLogin=false: anonymous GET /api/init is allowed (open mode)", async () => {
  process.env.OMNIROUTE_HEADLESS = "1";
  await settings.updateSettings({ requireLogin: false });
  const res = await route.GET(new Request("http://localhost/api/init"));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { initialized: false });
});
