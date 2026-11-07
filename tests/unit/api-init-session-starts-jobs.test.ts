/**
 * An authorized GET /api/init must still run the init: on a headless server it
 * is the only way to start cloud-sync and the budget-reset, token-health and
 * log_export jobs. ensureCloudSyncInitialized() sets a module-level flag after
 * its first run, and a test cannot reset it, so this case has its own file. The
 * name sorts after api-init-require-auth.test.ts: with --test-isolation=none
 * (test:unit:fast) Node runs the files of one process in path order, so the
 * anonymous cases there run before the init has ever run. Files that sort
 * after this one still see the flag set.
 *
 * The init runs under mock timers, so the startup timeouts it arms (cloud sync
 * 30s, model sync 90s, the codex catalog check) never fire; their stop()
 * functions do not clear them. The case stops the schedulers and restores the
 * env in its own t.after(). The second case checks the env and the schedulers,
 * and that no real timer was created from src/ between the init and the end of
 * the checks, even one that was later cleared or fired.
 */
import { createHook } from "node:async_hooks";
import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-api-init-starts-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ENV_KEYS = [
  "OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS",
  "OMNIROUTE_DISABLE_BACKGROUND_SERVICES",
] as const;

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const { getJobRegistry } = await import("../../src/lib/jobRegistry/index.ts");
const { getCloudSyncScheduler } = await import("../../src/shared/services/cloudSyncScheduler.ts");
const { stopModelSyncScheduler } = await import("../../src/shared/services/modelSyncScheduler.ts");
// Model sync imports this without awaiting it; load it now so that import
// settles while the case still runs under mock timers.
await import("../../src/shared/services/codexCatalogRevalidation.ts");
const route = await import("../../src/app/api/init/route.ts");

type Timeout = ReturnType<typeof setTimeout>;
type EnvSnapshot = Record<string, string | undefined>;
const snapshotEnv = (): EnvSnapshot => Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
// Real Node timeouts (unref'd ones included) armed while the init runs and
// not yet cleared or fired. Mock timers do not create these.
const liveTimeouts = new Map<number, string>();
// Every real timeout or interval created from src/ while tracking, fired or not.
const srcTimers: string[] = [];
let trackTimeouts = false;
const timeoutHook = createHook({
  init(id, type) {
    if (!trackTimeouts || type !== "Timeout") return;
    const stack = new Error().stack ?? "";
    liveTimeouts.set(id, stack);
    if (stack.includes("/src/")) srcTimers.push(stack);
  },
  destroy(id) {
    liveTimeouts.delete(id);
  },
}).enable();
let launchEnv: EnvSnapshot = {};
let caseStartEnv: EnvSnapshot = {};

// Root-level: in a shared process this runs when the whole process ends.
after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("authorized GET /api/init", () => {
  before(() => {
    launchEnv = snapshotEnv();
    // Known values, so the last case can tell whether the cleanup restored them.
    process.env.OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS = "0";
    process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "1";
  });

  after(() => {
    timeoutHook.disable();
    for (const [k, v] of Object.entries(launchEnv)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  });

  it("requireLogin=true: a dashboard session starts the background jobs", async (t) => {
    await settings.updateSettings({ requireLogin: true, password: "hashed-placeholder" });
    caseStartEnv = snapshotEnv();
    const savedEnv = ENV_KEYS.map((k) => [k, process.env[k]] as const);
    t.after(async () => {
      getJobRegistry().stopAll();
      stopModelSyncScheduler();
      (await getCloudSyncScheduler()).stop();
      for (const [k, v] of savedEnv) {
        if (v === undefined) delete process.env[k];
        else process.env[k] = v;
      }
    });
    // Let the real init run in this test process.
    process.env.OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS = "1";
    delete process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
    // Timers armed from here on are fake and are dropped when the case ends.
    t.mock.timers.enable({ apis: ["setTimeout", "setInterval"] });
    const registry = getJobRegistry();
    const register = t.mock.method(registry, "register");
    // Skip the jobs' first tick; this case only checks that init asks for them.
    const startAll = t.mock.method(registry, "startAll", async () => {});
    t.mock.method(console, "log", () => {});

    const req = await makeManagementSessionRequest("http://localhost/api/init");
    trackTimeouts = true;
    const res = await route.GET(req as unknown as Request);
    // Let model sync's unawaited import arm its codex timeout.
    for (let i = 0; i < 5; i++) await new Promise((r) => setImmediate(r));

    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { initialized: true });
    const registered = register.mock.calls.map((c) => (c.arguments[0] as { id: string }).id);
    assert.deepEqual(registered.sort(), ["budget_reset", "log_export", "token_health_check"]);
    assert.equal(startAll.mock.callCount(), 1);
    assert.equal((await getCloudSyncScheduler()).isRunning(), true, "cloud sync did not start");
  });

  it("the cleanup restored the env and left nothing running", async (t) => {
    // In a shared process api-init-require-auth.test.ts's root-level hooks
    // reset ENABLE around every test, so compare with the value at case start.
    assert.equal(caseStartEnv.OMNIROUTE_DISABLE_BACKGROUND_SERVICES, "1");
    assert.deepEqual(snapshotEnv(), caseStartEnv, "env not restored");
    assert.equal((await getCloudSyncScheduler()).isRunning(), false, "cloud sync still running");
    const registryTimers = (getJobRegistry() as unknown as { timers: Map<string, Timeout> }).timers;
    assert.equal(registryTimers.size, 0, "job timers still armed");
    // stopModelSyncScheduler() logs only when it finds a timer to clear.
    const log = t.mock.method(console, "log", () => {});
    stopModelSyncScheduler();
    assert.equal(log.mock.callCount(), 0, "model sync scheduler still armed");
    // Give a late, unawaited import time to arm a real timer, then stop tracking.
    await import("../../src/shared/services/codexCatalogRevalidation.ts");
    await new Promise((r) => setImmediate(r));
    trackTimeouts = false;
    assert.deepEqual(srcTimers, [], "the init armed real timers");
    assert.deepEqual([...liveTimeouts.values()], [], "the init left real timeouts armed");
  });
});
