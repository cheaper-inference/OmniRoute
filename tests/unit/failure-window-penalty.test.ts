import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-failure-window-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "failure-window-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const fw = await import("../../src/sse/services/failureWindowPenalty.ts");

const FLAG = "OMNIROUTE_FAILURE_WINDOW_PENALTY";
const MODEL = "gpt-4.1";
const WINDOW_MS = 90_000;

async function seed(priority: number) {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: `fw-${priority}`,
    // A distinct key per row: createProviderConnection merges rows that share a key.
    apiKey: `test-key-placeholder-${priority}`,
    priority,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

test.beforeEach(() => {
  delete process.env[FLAG];
  fw.resetFailureWindows();
  accountFallback.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});
test.afterEach(() => {
  mock.restoreAll();
});
test.after(() => {
  delete process.env[FLAG];
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the window is fixed: steps count up, cap at 10, and the penalty ends by itself", () => {
  process.env[FLAG] = "true";
  const t0 = Date.now();
  mock.method(Date, "now", () => t0);
  for (let i = 0; i < 12; i++) fw.recordWindowedFailure("c1", MODEL);
  assert.equal(fw.getFailureWindowSteps("c1", MODEL), 10);
  assert.equal(fw.getFailureWindowSteps("c1", "other-model"), 0, "counted per model");
  mock.method(Date, "now", () => t0 + WINDOW_MS - 1);
  fw.recordWindowedFailure("c1", MODEL);
  assert.equal(
    fw.getFailureWindowSteps("c1", MODEL),
    10,
    "a late failure does not extend the window"
  );
  mock.method(Date, "now", () => t0 + WINDOW_MS + 1);
  assert.equal(fw.getFailureWindowSteps("c1", MODEL), 0);
});

test("sortByFailureWindow is stable and moves failing accounts behind healthy ones", () => {
  process.env[FLAG] = "true";
  fw.recordWindowedFailure("a", MODEL);
  fw.recordWindowedFailure("a", MODEL);
  fw.recordWindowedFailure("b", MODEL);
  const ids = fw.sortByFailureWindow([{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }], MODEL);
  assert.deepEqual(
    ids.map((c) => c.id),
    ["c", "d", "b", "a"]
  );
  assert.deepEqual(
    fw.sortByFailureWindow([{ id: "a" }, { id: "c" }], null).map((c) => c.id),
    ["a", "c"],
    "no model, no penalty"
  );
});

test("markAccountUnavailable counts a 500 but not a 429, 401 or 503", async () => {
  process.env[FLAG] = "true";
  const conn = await seed(1);
  for (const status of [429, 401, 503]) {
    await auth.markAccountUnavailable(conn.id, status, "x", "openai", MODEL);
    accountFallback.clearAllModelLockouts();
    await providersDb.updateProviderConnection(conn.id, {
      rateLimitedUntil: null,
      testStatus: "active",
    });
  }
  assert.equal(fw.getFailureWindowSteps(conn.id, MODEL), 0);
  await auth.markAccountUnavailable(conn.id, 500, "upstream exploded", "openai", MODEL);
  assert.equal(fw.getFailureWindowSteps(conn.id, MODEL), 1);
});

test("flag unset: nothing is counted and fill-first keeps its order (unchanged default)", async () => {
  const a = await seed(1);
  await seed(2);
  fw.recordWindowedFailure(a.id, MODEL);
  fw.recordWindowedFailure(a.id, MODEL);
  const selected = await auth.getProviderCredentials("openai", null, null, MODEL);
  assert.equal(selected?.connectionId, a.id);
});

test("flag on: fill-first skips an account with recent attributable failures, no cooldown needed", async () => {
  process.env[FLAG] = "true";
  const a = await seed(1);
  const b = await seed(2);
  assert.notEqual(a.id, b.id);
  fw.recordWindowedFailure(a.id, MODEL);
  const selected = await auth.getProviderCredentials("openai", null, null, MODEL);
  assert.equal(selected?.connectionId, b.id);
});

test("flag on: an only account is still used", async () => {
  process.env[FLAG] = "true";
  const a = await seed(1);
  fw.recordWindowedFailure(a.id, MODEL);
  const selected = await auth.getProviderCredentials("openai", null, null, MODEL);
  assert.equal(selected?.connectionId, a.id);
});
