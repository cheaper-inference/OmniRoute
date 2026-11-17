import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import type { CleanupSweeperOptions } from "../../open-sse/executors/grok-bot-cleanup-sweeper.ts";
type Rotation = { accessToken: string; refreshToken: string };

// Execute the production module, transpiled without changing its control flow.
// Every import is isolated: no real DB, timers, providers, secrets or network.
function loadModule<T>(relative: string, modules: Record<string, unknown>, context = {}) {
  const source = readFileSync(new URL(relative, import.meta.url), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const exports: Record<string, unknown> = {};
  runInNewContext(
    code,
    {
      exports,
      require: (id: string) => {
        if (id in modules) return modules[id];
        // Boot keeps gaining modules; a new one is isolation noise here, not a
        // behaviour the harness is asserting. Explicit stubs always win.
        if (id.startsWith("@/") || id.startsWith("@omniroute/"))
          return new Proxy(
            {},
            {
              get: (_target, prop) =>
                // A function on "then" would make the namespace look like a thenable
                // and hang any await on it.
                typeof prop === "symbol" || prop === "then" ? undefined : () => undefined,
            }
          );
        throw new Error(`Unmocked module: ${id}`);
      },
      ...context,
    },
    { filename: relative }
  );
  return exports as T;
}

function bootHarness({
  disabled = false,
  failSweeper = false,
  persistSuccess = true,
  failDb = false,
  failPrefixScan = false,
  connectionProvider = "grok-bot",
  missingConnection = false,
  leased = false,
} = {}) {
  const events: string[] = [];
  const warnings: unknown[][] = [];
  const logs: unknown[][] = [];
  let releaseDb!: () => void;
  const db = new Promise<void>((resolve) => {
    releaseDb = resolve;
  });
  let sweeperOptions: CleanupSweeperOptions | undefined;
  const settings = { cliVersionOverrides: { codex: "9.9.9" } };
  const noop = () => undefined;
  const modules: Record<string, unknown> = {};
  function add(id: string, exports: Record<string, unknown> = {}) {
    modules[id] = exports;
  }
  const noops: Record<string, string[]> = {
    "@/lib/healthzLag": ["startEventLoopStallRecorder"],
    "@omniroute/open-sse/services/requestDedup.ts": ["getInflightCount"],
    "@/lib/startup/nonLoopbackApiKeyGuard": ["warnIfInferenceServerExposed"],
    "@omniroute/open-sse/utils/proxyFetch.ts": [],
    "@/lib/proxyEvents/proxyTransitionBridge": [],
    "@/lib/proxySubscription/proxyTransitionSubscriber": ["registerSelectorTransitionSubscriber"],
    "@omniroute/open-sse/services/quotaTrackersBatch.ts": ["registerQuotaTrackersBatch"],
    "@/lib/providers/noAuthAutoRoutingReadiness": ["registerNoAuthAutoRoutingReadiness"],
    "@/lib/env/runtimeEnv": ["enforceWebRuntimeEnv"],
    "@/lib/db/encryption": ["assertEncryptionKeyConfiguredForProduction", "probeStoredSecrets"],
    "@/lib/usage/migrations": [],
    "@/lib/consoleInterceptor": ["initConsoleInterceptor"],
    "@/lib/gracefulShutdown": ["initGracefulShutdown"],
    "@/lib/apiBridgeServer": ["initApiBridgeServer"],
    "@/domain/quotaCache": ["startBackgroundRefresh"],
    "@/lib/initCloudSync": ["ensureCloudSyncInitialized"],
    "@/shared/services/providerLimitsSyncScheduler": ["startProviderLimitsSyncScheduler"],
    "@/lib/config/hotReload": ["startRuntimeConfigHotReload"],
    "@/lib/spend/batchWriter": ["startSpendBatchWriter"],
    "@/lib/db/cleanup": ["startCleanupScheduler"],
    "@/lib/guardrails": ["registerDefaultGuardrails"],
    "@/lib/skills/builtins": ["registerBuiltinSkills"],
    "@/lib/proxyHealth/scheduler": [],
    "@/lib/services/quotaAutoPing": ["startQuotaAutoPing"],
    "@/lib/services/codexWakeups": ["startCodexWakeups"],
    "@/lib/services/codexResetCreditAutospend": ["startCodexResetCreditAutospend"],
    "@omniroute/open-sse/services/batchProcessor": ["initBatchProcessor"],
    "@/lib/db/sessionAccountAffinity": ["startSessionAccountAffinityCleanup"],
    "@omniroute/open-sse/services/thinkingBudget.ts": ["hydrateThinkingBudgetConfig"],
    "@omniroute/open-sse/services/taskAwareRouter.ts": ["hydrateTaskRoutingConfig"],
    "@/lib/credentialHealth/scheduler": ["initCredentialHealthCheck"],
    "@/lib/db/vacuumScheduler": ["initVacuumScheduler"],
    "@/lib/quota/connectionRecovery": ["initConnectionRecoveryScheduler"],
    "@/lib/contextWindowResolver": ["startContextWindowReconcile"],
    "@/lib/memory/typedDecay": ["startMemoryDecaySweep"],
    "@/lib/memory/index": ["initMemoryBackends"],
    "@/lib/jobs/backupScheduleJob": ["startBackupScheduleJob"],
  };
  for (const [id, names] of Object.entries(noops))
    add(id, Object.fromEntries(names.map((name) => [name, noop])));
  for (const [module, names] of Object.entries({
    codexQuotaFetcher: ["registerCodexQuotaFetcher"],
    bailianQuotaFetcher: ["registerBailianCodingPlanQuotaFetcher"],
    qwenTokenPlanQuotaFetcher: ["registerQwenTokenPlanQuotaFetcher"],
    crofUsageFetcher: ["registerCrofUsageFetcher"],
    deepseekQuotaFetcher: ["registerDeepseekQuotaFetcher"],
    moonshotQuotaFetcher: ["registerMoonshotQuotaFetcher", "registerMoonshotFetchersForNodes"],
    openrouterQuotaFetcher: ["registerOpenrouterQuotaFetcher"],
    opencodeQuotaFetcher: ["registerOpencodeQuotaFetcher"],
    grokQuotaFetcher: ["registerGrokWebQuotaFetcher"],
    genericQuotaFetcher: ["registerGenericQuotaFetchers"],
  }))
    add(
      `@omniroute/open-sse/services/${module}`,
      Object.fromEntries(names.map((name) => [name, noop]))
    );
  add("@/lib/serverLifecycle", {
    markServerStarting: () => events.push("starting"),
    markServerReady: () => events.push("ready"),
  });
  add("@/lib/instrumentationBootError", {
    normalizeBootError: (e: unknown) => (e instanceof Error ? e : new Error(String(e))),
  });
  add("@/lib/system/headless", { isHeadless: () => true, skipInHeadless: () => true });
  add("@/lib/db/core", {
    ensureDbInitialized: async () => {
      events.push("db-start");
      await db;
      if (failDb) throw new Error("driver unavailable");
      events.push("db-ready");
    },
    // The startup secret probe asks the same module for the handle once the DB
    // is ready; an empty table scan keeps encryption off in the test.
    getDbInstance: () => ({ prepare: () => ({ all: () => [] }) }),
  });
  add("@/lib/db/secrets", { getPersistedSecret: noop, persistSecret: noop });
  add("@/lib/db/providers", {
    getProviderNodes: () => [],
    getProviderConnections: () => [],
    clearStaleCrashCooldowns: () => ({ cleared: 0 }),
    getProviderConnectionById: (id: string) => {
      assert.equal(id, "conn-1");
      events.push("resolved");
      return missingConnection
        ? null
        : { provider: connectionProvider, refreshToken: "fixture-refresh-secret" };
    },
  });
  add("@/lib/exclusiveLeaseIsolation", {
    isConnectionUnavailableToAuxiliaryActivity: async () => leased,
  });
  add("@/lib/db/combos", { getCombos: () => [] });
  add("@/lib/combos/modelNameCollision", { scanCombosForModelCollisions: () => [] });
  add("@/lib/providers/providerPrefixCollision", {
    warnProviderPrefixCollisionsAtBoot: async () => {
      events.push("prefix-scanned");
      if (failPrefixScan) throw new Error("prefix scan unavailable");
    },
  });
  add("@/lib/admissionVirtualLanes", { warmAdaptiveVirtualLanesIntoRuntime: noop });
  add("@/lib/db/settings", { getSettings: () => settings });
  add("@/lib/config/runtimeSettings", { applyRuntimeSettings: () => [] });
  add("@/lib/auth/managementPassword", {
    ensurePersistentManagementPasswordHash: () => ({ settings }),
  });
  add("@/lib/skills/executor", { skillExecutor: {} });
  add("@/lib/quota/quotaSessionRecovery", {
    startQuotaSessionRecovery: () => events.push("quota-recovery"),
  });
  add("@/lib/providers/codexConnectionDefaults", {
    migrateCodexConnectionDefaultsFromLegacySettings: () => ({ migrated: false }),
  });
  add("@/lib/modelAliasSeed", {
    seedDefaultModelAliases: () => ({ applied: [], skipped: [], removed: [], failed: [] }),
  });
  add("@/lib/env/backgroundServices", {
    isBackgroundServicesDisabled: () => disabled,
  });
  add("@omniroute/open-sse/config/cliVersions.ts", {
    hydrateCliVersionOverrides: (value: unknown) => {
      assert.equal(value, settings);
      events.push("cli-hydrated");
      return true;
    },
  });
  add("@/sse/services/tokenRefresh", {
    getAccessToken: async (
      provider: string,
      credentials: { connectionId: string; refreshToken: string },
      persist: (result: Rotation) => Promise<void>
    ) => {
      assert.equal(provider, "grok-bot");
      assert.equal(credentials.connectionId, "conn-1");
      assert.equal(credentials.refreshToken, "fixture-refresh-secret");
      events.push("refreshed");
      await persist({ accessToken: "new-access", refreshToken: "fixture-rotated-secret" });
      return { accessToken: "new-access" };
    },
    updateProviderCredentials: async (id: string, result: Rotation) => {
      assert.equal(id, "conn-1");
      assert.equal(result.refreshToken, "fixture-rotated-secret");
      events.push("persisted");
      return persistSuccess;
    },
  });
  add("@/lib/compliance/index", { initAuditLog: noop, cleanupExpiredLogs: () => ({}) });
  add("@omniroute/open-sse/services/autoRefreshDaemon", { autoRefreshDaemon: { start: noop } });
  add("@/app/api/v1/models/catalog", { getUnifiedModelsResponse: noop });
  add("@/lib/catalog/openrouterCatalog", { getOpenRouterCatalog: noop });
  add("@omniroute/open-sse/executors/grok-bot.ts", { getTransport: noop });
  add("@omniroute/open-sse/executors/grok-bot-cleanup-sweeper.ts", {
    startGrokBotCleanupSweeper: (options: CleanupSweeperOptions) => {
      events.push("sweeper");
      if (failSweeper) throw new Error("sweeper unavailable");
      sweeperOptions = options;
    },
  });
  const app = loadModule<typeof import("../../src/instrumentation-node.ts")>(
    "../../src/instrumentation-node.ts",
    modules,
    {
      process: {
        title: "test",
        env: {
          JWT_SECRET: "test-only",
          API_KEY_SECRET: "test-only",
          OMNIROUTE_DISABLE_BACKGROUND_SERVICES: disabled ? "true" : "false",
        },
      },
      console: {
        log: (...args: unknown[]) => logs.push(args),
        info: (...args: unknown[]) => logs.push(args),
        warn: (...args: unknown[]) => warnings.push(args),
        error: (...args: unknown[]) => warnings.push(args),
      },
      Request,
    }
  );
  return {
    app,
    events,
    warnings,
    logs,
    releaseDb,
    options: () => {
      assert.ok(sweeperOptions);
      return sweeperOptions;
    },
  };
}

async function reachDb(h: ReturnType<typeof bootHarness>) {
  const boot = h.app.registerNodejs();
  for (let i = 0; i < 200 && !h.events.includes("db-start"); i++) await Promise.resolve();
  assert.ok(h.events.includes("db-start"));
  return { boot };
}

test("Grok cleanup waits for DB readiness and preserves release CLI/quota boot", async () => {
  const h = bootHarness();
  const { boot } = await reachDb(h);
  assert.ok(!h.events.includes("sweeper"), "must not start cleanup while DB is pending");
  assert.ok(!h.events.includes("prefix-scanned"), "must not scan prefixes while DB is pending");
  h.releaseDb();
  await boot;
  assert.ok(h.events.indexOf("db-ready") < h.events.indexOf("sweeper"));
  assert.equal(h.events.filter((event) => event === "prefix-scanned").length, 1);
  assert.ok(h.events.indexOf("db-ready") < h.events.indexOf("prefix-scanned"));
  assert.ok(h.events.includes("cli-hydrated"));
  assert.ok(h.events.includes("quota-recovery"));
  assert.equal(h.events.at(-1), "ready");
  assert.deepEqual(h.warnings, []);
});

test("disabled background services skip Grok and quota recovery, not CLI hydration/readiness", async () => {
  const h = bootHarness({ disabled: true });
  const { boot } = await reachDb(h);
  h.releaseDb();
  await boot;
  assert.ok(!h.events.includes("sweeper"));
  assert.ok(!h.events.includes("quota-recovery"));
  assert.equal(h.events.filter((event) => event === "prefix-scanned").length, 1);
  assert.ok(h.events.includes("cli-hydrated"));
  assert.equal(h.events.at(-1), "ready");
  assert.deepEqual(h.warnings, []);
});

test("provider-prefix scan failure warns without blocking remaining boot work", async () => {
  const h = bootHarness({ failPrefixScan: true });
  const { boot } = await reachDb(h);
  h.releaseDb();
  await boot;
  assert.equal(h.events.filter((event) => event === "prefix-scanned").length, 1);
  assert.ok(h.events.includes("cli-hydrated"));
  assert.ok(h.events.includes("quota-recovery"));
  assert.equal(h.events.at(-1), "ready");
  assert.deepEqual(h.warnings, [
    ["[STARTUP] Could not scan provider-prefix collisions (non-fatal)."],
  ]);
});

test("Grok startup failure remains non-fatal", async () => {
  const h = bootHarness({ failSweeper: true });
  const { boot } = await reachDb(h);
  h.releaseDb();
  await boot;
  assert.equal(h.events.at(-1), "ready");
  assert.ok(h.events.includes("cli-hydrated"));
  assert.equal(h.warnings.length, 1);
  assert.ok(String(h.warnings[0]).includes("Grok Bot cleanup sweeper unavailable"));
});

test("boot refresh wiring passes connection identity and persists rotated credentials", async () => {
  const h = bootHarness();
  const { boot } = await reachDb(h);
  h.releaseDb();
  await boot;
  const options = h.options();
  assert.equal(typeof options.refresh, "function");
  await options.refresh!({ connectionId: "conn-1", refreshToken: "fixture-refresh-secret" });
  assert.ok(h.events.includes("persisted"));
});

function queuedSweeper() {
  const item = {
    connectionId: "conn-1",
    agentId: "agent-1",
    rowId: "row-1",
    createdAt: new Date().toISOString(),
  };
  let removed = false;
  const sweeper = loadModule<typeof import("../../open-sse/executors/grok-bot-cleanup-sweeper.ts")>(
    "../../open-sse/executors/grok-bot-cleanup-sweeper.ts",
    {
      "../services/tokenRefresh.ts": {
        getAccessToken: () => {
          throw new Error("must use boot's persistence-aware refresh");
        },
      },
      "./grok-bot-cleanup-queue.ts": {
        readQueue: () => [item],
        removeFromQueue: () => {
          removed = true;
        },
      },
    }
  );
  return { sweeper, removed: () => removed };
}

test("actual sweep passes identity through boot helper and writes rotation before remote cleanup", async () => {
  const h = bootHarness();
  const { boot } = await reachDb(h);
  h.releaseDb();
  await boot;
  const q = queuedSweeper();
  await q.sweeper.sweepGrokBotCleanupsOnce({
    ...h.options(),
    log: { warn: (...args: unknown[]) => h.logs.push(args) },
    transportFor: (token: string) => {
      assert.equal(token, "new-access");
      assert.ok(h.events.includes("persisted"));
      return {
        rpc: async () => {
          h.events.push("remote-delete");
        },
      };
    },
  });
  assert.ok(q.removed());
  assert.ok(h.events.indexOf("resolved") < h.events.indexOf("refreshed"));
  assertNoSecrets(h);
  assert.ok(h.events.indexOf("persisted") < h.events.indexOf("remote-delete"));
});

test("persistence failure keeps cleanup queued and never issues remote delete", async () => {
  const h = bootHarness({ persistSuccess: false });
  const { boot } = await reachDb(h);
  h.releaseDb();
  await boot;
  const q = queuedSweeper();
  let remoteCalls = 0;
  await q.sweeper.sweepGrokBotCleanupsOnce({
    ...h.options(),
    log: { warn: (...args: unknown[]) => h.logs.push(args) },
    transportFor: () => {
      remoteCalls++;
      return { rpc: async () => undefined };
    },
  });
  assert.ok(h.events.includes("persisted"));
  assert.equal(remoteCalls, 0);
  assert.equal(q.removed(), false);
  assertNoSecrets(h);
});

test("fatal DB initialization prevents Grok startup and server readiness", async () => {
  const h = bootHarness({ failDb: true });
  const { boot } = await reachDb(h);
  h.releaseDb();
  await assert.rejects(boot, /driver unavailable/);
  assert.ok(!h.events.includes("sweeper"));
  assert.ok(!h.events.includes("prefix-scanned"));
  assert.ok(!h.events.includes("ready"));
  assert.equal(h.warnings.length, 1);
});

function assertNoSecrets(h: ReturnType<typeof bootHarness>) {
  const output = JSON.stringify([...h.logs, ...h.warnings]);
  for (const secret of ["fixture-refresh-secret", "fixture-rotated-secret", "new-access"]) {
    assert.ok(!output.includes(secret), "startup/sweep logs must not contain credentials");
  }
}

for (const scenario of ["missing", "non-grok"] as const) {
  test(`${scenario} connection cannot send credentials to Grok or persist a rotation`, async () => {
    const h = bootHarness({
      missingConnection: scenario === "missing",
      connectionProvider: scenario === "non-grok" ? "codex" : "grok-bot",
    });
    const { boot } = await reachDb(h);
    h.releaseDb();
    await boot;
    const q = queuedSweeper();
    let remoteCalls = 0;
    await q.sweeper.sweepGrokBotCleanupsOnce({
      ...h.options(),
      log: { warn: (...args: unknown[]) => h.logs.push(args) },
      transportFor: () => {
        remoteCalls++;
        return { rpc: async () => undefined };
      },
    });
    assert.ok(h.events.includes("resolved"));
    assert.ok(!h.events.includes("refreshed"));
    assert.ok(!h.events.includes("persisted"));
    assert.equal(remoteCalls, 0);
    assert.ok(q.removed());
    assertNoSecrets(h);
  });
}

test("an active exclusive lease retains queued cleanup without token refresh or remote dispatch", async () => {
  const h = bootHarness({ leased: true });
  const { boot } = await reachDb(h);
  h.releaseDb();
  await boot;
  const q = queuedSweeper();
  let remoteCalls = 0;
  await q.sweeper.sweepGrokBotCleanupsOnce({
    ...h.options(),
    transportFor: () => {
      remoteCalls++;
      return { rpc: async () => undefined };
    },
  });
  assert.equal(q.removed(), false);
  assert.equal(h.events.includes("resolved"), false);
  assert.equal(h.events.includes("refreshed"), false);
  assert.equal(h.events.includes("persisted"), false);
  assert.equal(remoteCalls, 0);
  assertNoSecrets(h);
});
