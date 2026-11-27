/**
 * Regression tests for #21423 — persisted pre-request middleware hooks stored
 * in `middleware_hooks` must be compiled and registered on startup (and lazily
 * on first `initPreRequestRegistry()`), surviving restarts without requiring a
 * manual PUT re-save.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-21423-middleware-boot-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;

const core = await import("../../src/lib/db/core.ts");
const { createMiddlewareHook, deleteMiddlewareHook, getAllMiddlewareHooks } =
  await import("../../src/lib/db/middleware.ts");
const {
  clearAllHooks,
  createHookContext,
  getAllHooks,
  getHook,
  getRegistryStats,
  initPreRequestRegistry,
  runHooks,
} = await import("../../src/lib/middleware/registry.ts");
const { GET: listHooksRoute } = await import("../../src/app/api/middleware/hooks/route.ts");
const { PUT: updateHookRoute } = await import("../../src/app/api/middleware/hooks/[name]/route.ts");
const { HookPriority } = await import("../../src/lib/middleware/types.ts");

core.getDbInstance();

function simulateProcessRestart(): void {
  clearAllHooks();
  globalThis.__omniroutePreRequestRegistry = undefined;
}

function resetHooksTable(): void {
  for (const hook of getAllMiddlewareHooks()) {
    deleteMiddlewareHook(hook.name);
  }
  simulateProcessRestart();
}

function makeContext(model = "openai/gpt-4o") {
  return createHookContext({
    body: { messages: [{ role: "user", content: "hello" }] },
    headers: {},
    model,
  });
}

test.beforeEach(() => {
  resetHooksTable();
});

test.after(() => {
  clearAllHooks();
  globalThis.__omniroutePreRequestRegistry = undefined;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("persisted enabled hook is loaded on initPreRequestRegistry() after restart and executes in runHooks()", async () => {
  createMiddlewareHook({
    name: "rewrite-model-after-restart",
    description: "Rewrites gpt-4o to claude-sonnet",
    priority: HookPriority.HIGH,
    scope: { type: "global" },
    enabled: true,
    code: `
      if (context.model === "openai/gpt-4o") {
        context.body.rewritten = true;
        return { model: "claude/claude-sonnet-4-5" };
      }
      return {};
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    runCount: 0,
  });

  // Simulate container/process restart: in-memory singleton is gone, DB row remains.
  simulateProcessRestart();
  assert.equal(getAllHooks().length, 0, "precondition: fresh process starts with empty registry");

  initPreRequestRegistry();

  assert.equal(getAllHooks().length, 1, "persisted hook must be registered on init");
  assert.equal(getHook("rewrite-model-after-restart")?.enabled, true);

  const { context } = await runHooks(makeContext("openai/gpt-4o"));
  assert.equal(context.model, "claude/claude-sonnet-4-5");
  assert.equal(context.body.rewritten, true);
});

test("disabled hooks are loaded for accurate registry stats but skipped by runHooks()", async () => {
  createMiddlewareHook({
    name: "enabled-hook",
    description: "Runs",
    priority: 100,
    scope: { type: "global" },
    enabled: true,
    code: `return { body: { enabledRan: true } };`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    runCount: 0,
  });
  createMiddlewareHook({
    name: "disabled-hook",
    description: "Must not run",
    priority: 50,
    scope: { type: "global" },
    enabled: false,
    code: `return { body: { disabledRan: true } };`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    runCount: 0,
  });

  simulateProcessRestart();
  initPreRequestRegistry();

  const stats = getRegistryStats();
  assert.equal(stats.totalHooks, 2);
  assert.equal(stats.enabledHooks, 1);

  const { context } = await runHooks(makeContext());
  assert.equal(context.body.enabledRan, true);
  assert.equal(context.body.disabledRan, undefined);
});

test("a persisted hook with syntax errors does not prevent valid hooks from loading at startup", async () => {
  createMiddlewareHook({
    name: "broken-syntax-hook",
    description: "Invalid JS",
    priority: 10,
    scope: { type: "global" },
    enabled: true,
    code: `const x = (;`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    runCount: 0,
  });
  createMiddlewareHook({
    name: "healthy-hook",
    description: "Valid JS",
    priority: 20,
    scope: { type: "global" },
    enabled: true,
    code: `return { body: { healthyRan: true } };`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    runCount: 0,
  });

  simulateProcessRestart();
  initPreRequestRegistry();

  const { context } = await runHooks(makeContext());
  assert.equal(context.body.healthyRan, true);
});

test("initPreRequestRegistry() is idempotent once loaded and retries if an earlier DB read failed", async () => {
  createMiddlewareHook({
    name: "retryable-init-hook",
    description: "Loaded after transient boot failure",
    priority: 100,
    scope: { type: "global" },
    enabled: true,
    code: `return { body: { loadedAfterRetry: true } };`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    runCount: 0,
  });

  simulateProcessRestart();

  // First call fails transiently (e.g. DB not ready yet) -> must not lock registry as initialized.
  initPreRequestRegistry(() => {
    throw new Error("transient db not ready");
  });
  assert.equal(getAllHooks().length, 0);

  // Subsequent call succeeds and hydrates from DB.
  initPreRequestRegistry();
  assert.equal(getAllHooks().length, 1);

  // Third call is an idempotent no-op (does not re-invoke loader).
  let loaderCalls = 0;
  initPreRequestRegistry(() => {
    loaderCalls += 1;
    return [];
  });
  assert.equal(loaderCalls, 0);

  const { context } = await runHooks(makeContext());
  assert.equal(context.body.loadedAfterRetry, true);
});

test("GET /api/middleware/hooks reports matching dbCount and registryCount after restart, and PUT syncs non-code fields", async () => {
  createMiddlewareHook({
    name: "api-persisted-hook",
    description: "Persisted across restart",
    priority: 100,
    scope: { type: "global" },
    enabled: true,
    code: `return { body: { apiHookRan: true } };`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    runCount: 0,
  });

  simulateProcessRestart();

  const listRes = await listHooksRoute(new Request("http://127.0.0.1/api/middleware/hooks"));
  assert.equal(listRes.status, 200);
  const listJson = (await listRes.json()) as {
    hooks: Array<{ name: string }>;
    registryStats: { dbCount: number; registryCount: number };
  };
  assert.equal(listJson.registryStats.dbCount, 1);
  assert.equal(
    listJson.registryStats.registryCount,
    1,
    "GET /api/middleware/hooks must show persisted hooks registered after restart"
  );

  // Disable hook without sending `code` -> runtime registry must immediately reflect enabled=false.
  const disableRes = await updateHookRoute(
    new Request("http://127.0.0.1/api/middleware/hooks/api-persisted-hook", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: false }),
    }),
    { params: Promise.resolve({ name: "api-persisted-hook" }) }
  );
  assert.equal(disableRes.status, 200);

  const afterDisable = await runHooks(makeContext());
  assert.equal(
    afterDisable.context.body.apiHookRan,
    undefined,
    "PUT { enabled: false } must disable the hook in the runtime registry without requiring code"
  );

  // Re-enable with updated priority without sending `code`.
  const enableRes = await updateHookRoute(
    new Request("http://127.0.0.1/api/middleware/hooks/api-persisted-hook", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: true, priority: 42 }),
    }),
    { params: Promise.resolve({ name: "api-persisted-hook" }) }
  );
  assert.equal(enableRes.status, 200);
  assert.equal(getHook("api-persisted-hook")?.priority, 42);

  const afterEnable = await runHooks(makeContext());
  assert.equal(afterEnable.context.body.apiHookRan, true);
});

test("src/instrumentation-node.ts initializes pre-request middleware hooks at startup after DB boot", () => {
  const bootSource = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../src/instrumentation-node.ts"),
    "utf8"
  );
  assert.match(
    bootSource,
    /import\(["']@\/lib\/middleware\/registry["']\)/,
    "instrumentation-node.ts must import @/lib/middleware/registry"
  );
  const dbReadyIdx = bootSource.indexOf("await ensureDbReadyForBoot()");
  const initCallIdx = bootSource.indexOf("initPreRequestRegistry()");
  assert.ok(dbReadyIdx >= 0, "expected ensureDbReadyForBoot() in instrumentation-node.ts");
  assert.ok(
    initCallIdx > dbReadyIdx,
    "initPreRequestRegistry() must run after ensureDbReadyForBoot()"
  );
});
