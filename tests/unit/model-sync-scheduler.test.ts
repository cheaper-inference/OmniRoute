import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const initCloudSync = await import("../../src/lib/initCloudSync.ts");

async function resetStorage() {
  coreDb.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// Scheduler state is process-wide by design, so a case that leaves a timer armed
// would turn the next case's start into an "already running" no-op.
const canonicalScheduler = await import("../../src/shared/services/modelSyncScheduler.ts");

test.beforeEach(() => {
  canonicalScheduler.stopModelSyncScheduler();
});

test.afterEach(() => {
  canonicalScheduler.stopModelSyncScheduler();
});

function installTimerStubs() {
  const originalSetTimeout = globalThis.setTimeout;
  const originalSetInterval = globalThis.setInterval;
  const originalClearInterval = globalThis.clearInterval;
  const originalClearTimeout = globalThis.clearTimeout;
  const timeouts = [];
  const intervals = [];

  globalThis.setTimeout = (fn, ms) => {
    const handle = {
      fn,
      ms,
      cleared: false,
      unrefCalled: false,
      unref() {
        this.unrefCalled = true;
        return this;
      },
    };
    timeouts.push(handle);
    return handle;
  };

  globalThis.setInterval = (fn, ms) => {
    const handle = {
      fn,
      ms,
      cleared: false,
      unrefCalled: false,
      unref() {
        this.unrefCalled = true;
        return this;
      },
    };
    intervals.push(handle);
    return handle;
  };

  globalThis.clearTimeout = (handle) => {
    if (handle) {
      handle.cleared = true;
    }
  };

  globalThis.clearInterval = (handle) => {
    if (handle) {
      handle.cleared = true;
    }
  };

  return {
    timeouts,
    intervals,
    restore() {
      globalThis.setTimeout = originalSetTimeout;
      globalThis.setInterval = originalSetInterval;
      globalThis.clearInterval = originalClearInterval;
      globalThis.clearTimeout = originalClearTimeout;
    },
  };
}

async function loadScheduler(label) {
  const modulePath = path.join(process.cwd(), "src/shared/services/modelSyncScheduler.ts");
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

const defaultFetchCalls: string[] = [];

function installEmptySyncFetch(): () => void {
  const originalFetch = globalThis.fetch;
  defaultFetchCalls.length = 0;
  globalThis.fetch = async (input: RequestInfo | URL) => {
    defaultFetchCalls.push(String(input instanceof Request ? input.url : input));
    return new Response(JSON.stringify({ data: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  return () => {
    globalThis.fetch = originalFetch;
  };
}

let defaultFetchRestore: (() => void) | null = null;

type LoadedScheduler = {
  DEFAULT_INTERVAL_MS: number;
  MAX_TIMER_DELAY_MS: number;
  MODEL_SYNC_STAGGER_OFFSET_MS: number;
  startModelSyncScheduler: (baseUrl: string, intervalMs?: number) => boolean;
  stopModelSyncScheduler: () => void;
};

test.beforeEach(async () => {
  delete process.env.MODEL_SYNC_INTERVAL_HOURS;
  await resetStorage();
  // The phase callback runs a real sync cycle. Without this every timer test
  // would fire loopback requests at the placeholder base URL.
  defaultFetchRestore = installEmptySyncFetch();
});

test.afterEach(() => {
  defaultFetchRestore?.();
  defaultFetchRestore = null;
});

test.after(async () => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("modelSyncScheduler: internal auth headers validate only for scheduler requests", async () => {
  const {
    buildModelSyncInternalHeaders,
    getModelSyncInternalAuthHeaderName,
    isModelSyncInternalRequest,
  } = await import("../../src/shared/services/modelSyncScheduler.ts");

  const internalRequest = new Request("http://localhost/api/providers/test/sync-models", {
    method: "POST",
    headers: buildModelSyncInternalHeaders(),
  });
  assert.equal(isModelSyncInternalRequest(internalRequest), true);

  const externalRequest = new Request("http://localhost/api/providers/test/sync-models", {
    method: "POST",
    headers: { [getModelSyncInternalAuthHeaderName()]: "invalid-token" },
  });
  assert.equal(isModelSyncInternalRequest(externalRequest), false);
});

test("modelSyncScheduler resolves only loopback origins and uses the dashboard port", async () => {
  const previous = {
    OMNIROUTE_PORT: process.env.OMNIROUTE_PORT,
    PORT: process.env.PORT,
    DASHBOARD_PORT: process.env.DASHBOARD_PORT,
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    OMNIROUTE_BASE_PATH: process.env.OMNIROUTE_BASE_PATH,
    OMNIROUTE_INTERNAL_SCHEME: process.env.OMNIROUTE_INTERNAL_SCHEME,
    OMNIROUTE_TLS_CERT: process.env.OMNIROUTE_TLS_CERT,
    OMNIROUTE_TLS_KEY: process.env.OMNIROUTE_TLS_KEY,
  };
  process.env.OMNIROUTE_PORT = "20128";
  process.env.PORT = "22128";
  process.env.DASHBOARD_PORT = "22128";
  process.env.BASE_URL = "https://attacker.example";
  delete process.env.NEXT_PUBLIC_BASE_URL;
  delete process.env.NEXT_PUBLIC_APP_URL;
  process.env.OMNIROUTE_BASE_PATH = "/omniroute/";
  delete process.env.OMNIROUTE_INTERNAL_SCHEME;
  delete process.env.OMNIROUTE_TLS_CERT;
  delete process.env.OMNIROUTE_TLS_KEY;

  try {
    const scheduler = await loadScheduler("trusted-loopback-origin");
    assert.equal(scheduler.getModelSyncInternalBaseUrl(), "http://127.0.0.1:22128/omniroute");
    assert.equal(
      scheduler.resolveModelSyncInternalBaseUrl("https://attacker.example/steal"),
      "http://127.0.0.1:22128/omniroute"
    );
    assert.equal(
      scheduler.resolveModelSyncInternalBaseUrl("http://127.0.0.1:7777/nested/path"),
      "http://127.0.0.1:22128/omniroute"
    );
    assert.equal(
      scheduler.resolveModelSyncInternalBaseUrl("http://0.0.0.0:7777/nested/path"),
      "http://127.0.0.1:22128/omniroute"
    );
    assert.equal(
      scheduler.resolveModelSyncInternalBaseUrl("http://user:pass@localhost:7777"),
      "http://127.0.0.1:22128/omniroute"
    );
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("modelSyncScheduler does not infer the internal listener scheme from public URLs", async () => {
  const previous = {
    DASHBOARD_PORT: process.env.DASHBOARD_PORT,
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    OMNIROUTE_INTERNAL_SCHEME: process.env.OMNIROUTE_INTERNAL_SCHEME,
    OMNIROUTE_TLS_CERT: process.env.OMNIROUTE_TLS_CERT,
    OMNIROUTE_TLS_KEY: process.env.OMNIROUTE_TLS_KEY,
  };
  process.env.DASHBOARD_PORT = "22128";
  process.env.BASE_URL = "https://attacker.example";
  process.env.NEXT_PUBLIC_BASE_URL = "file:///tmp/not-http";
  process.env.NEXT_PUBLIC_APP_URL = "https://localhost:7777/ignored";
  delete process.env.OMNIROUTE_INTERNAL_SCHEME;
  delete process.env.OMNIROUTE_TLS_CERT;
  delete process.env.OMNIROUTE_TLS_KEY;

  try {
    const scheduler = await loadScheduler("safe-loopback-fallback");
    assert.equal(scheduler.getModelSyncInternalBaseUrl(), "http://127.0.0.1:22128");
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("modelSyncScheduler uses the listener-declared TLS scheme without trusting candidates", async () => {
  const previous = {
    DASHBOARD_PORT: process.env.DASHBOARD_PORT,
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    OMNIROUTE_BASE_PATH: process.env.OMNIROUTE_BASE_PATH,
    OMNIROUTE_INTERNAL_SCHEME: process.env.OMNIROUTE_INTERNAL_SCHEME,
    OMNIROUTE_TLS_CERT: process.env.OMNIROUTE_TLS_CERT,
    OMNIROUTE_TLS_KEY: process.env.OMNIROUTE_TLS_KEY,
  };
  process.env.DASHBOARD_PORT = "22128";
  process.env.BASE_URL = "https://attacker.example";
  delete process.env.NEXT_PUBLIC_BASE_URL;
  delete process.env.NEXT_PUBLIC_APP_URL;
  process.env.OMNIROUTE_BASE_PATH = "/omniroute";
  process.env.OMNIROUTE_INTERNAL_SCHEME = "https";
  delete process.env.OMNIROUTE_TLS_CERT;
  delete process.env.OMNIROUTE_TLS_KEY;

  try {
    const scheduler = await loadScheduler("trusted-native-tls");
    assert.equal(
      scheduler.resolveModelSyncInternalBaseUrl("https://attacker.example:7777/steal"),
      "https://localhost:22128/omniroute"
    );
    assert.equal(
      scheduler.resolveModelSyncInternalBaseUrl("https://127.0.0.1:7777/nested/path"),
      "https://localhost:22128/omniroute"
    );
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("modelSyncScheduler pins HTTPS transport to IPv4 while retaining localhost SNI", async () => {
  const scheduler = await loadScheduler("pinned-loopback-tls-connector");
  let forwardedOptions: Record<string, unknown> | undefined;
  const connector = scheduler.createPinnedModelSyncTlsConnector((options, callback) => {
    forwardedOptions = options;
    callback(new Error("stop before socket creation"), null);
  });

  connector(
    {
      hostname: "localhost",
      host: "localhost:22128",
      protocol: "https:",
      port: "22128",
    },
    () => undefined
  );

  assert.equal(forwardedOptions?.hostname, "127.0.0.1");
  assert.equal(forwardedOptions?.servername, "localhost");
});

test("runtime launchers publish the actual internal listener scheme", () => {
  const runNext = fs.readFileSync(path.join(process.cwd(), "scripts/dev/run-next.mjs"), "utf8");
  const standalone = fs.readFileSync(
    path.join(process.cwd(), "scripts/dev/standalone-server-ws.mjs"),
    "utf8"
  );

  assert.match(runNext, /OMNIROUTE_INTERNAL_SCHEME\s*=\s*["']http["']/);
  assert.match(standalone, /OMNIROUTE_INTERNAL_SCHEME\s*=\s*tlsOptions\s*\?\s*["']https["']/);
});

test("initCloudSync: startup initialization also starts model sync scheduler", () => {
  const filePath = path.join(process.cwd(), "src/lib/initCloudSync.ts");
  const source = fs.readFileSync(filePath, "utf8");

  assert.match(source, /startModelSyncScheduler\s*\(/);
});

test("cloud sync bootstrap is wired to server startup, not app layout imports", () => {
  const layoutSource = fs.readFileSync(path.join(process.cwd(), "src/app/layout.tsx"), "utf8");
  const instrumentationSource = fs.readFileSync(
    path.join(process.cwd(), "src/instrumentation-node.ts"),
    "utf8"
  );

  assert.doesNotMatch(layoutSource, /initCloudSync/);
  assert.match(instrumentationSource, /ensureCloudSyncInitialized/);
});

test("initCloudSync skips auto initialization during build and test processes unless explicitly re-enabled", () => {
  assert.equal(
    initCloudSync.shouldSkipCloudSyncInitialization({ NEXT_PHASE: "phase-production-build" }, [
      "node",
    ]),
    true
  );
  assert.equal(
    initCloudSync.shouldSkipCloudSyncInitialization({ NODE_ENV: "test" }, ["node", "--test"]),
    true
  );
  assert.equal(
    initCloudSync.shouldSkipCloudSyncInitialization(
      {
        NODE_ENV: "test",
        OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS: "1",
      },
      ["node", "--test"]
    ),
    false
  );
});

test("modelSyncScheduler starts once, honors env interval and syncs only active autoSync connections", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Auto Sync 1",
    apiKey: "sk-auto-1",
    providerSpecificData: { autoSync: true },
  });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Manual Sync",
    apiKey: "sk-manual",
    providerSpecificData: { autoSync: false },
  });
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Disabled Auto Sync",
    apiKey: "sk-auto-2",
    isActive: false,
    providerSpecificData: { autoSync: true },
  });

  process.env.MODEL_SYNC_INTERVAL_HOURS = "6";
  const timers = installTimerStubs();
  const fetchCalls = [];
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url, options) => {
    fetchCalls.push({ url, options });
    return new Response(JSON.stringify({ syncedModels: 4 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const scheduler = await loadScheduler("active-connections");

    scheduler.startModelSyncScheduler("http://127.0.0.1:7777", 1000);
    scheduler.startModelSyncScheduler("http://127.0.0.1:8888", 9999);

    assert.equal(timers.timeouts.length, 2);
    assert.equal(timers.timeouts[0].ms, scheduler.MODEL_SYNC_STARTUP_DELAY_MS);
    assert.equal(timers.timeouts[0].unrefCalled, true);
    // #13973: the recurring interval is phase-shifted against cleanup.ts's
    // own 6h scheduler — armed only after the offset, never at boot.
    assert.equal(timers.timeouts[1].ms, scheduler.MODEL_SYNC_STAGGER_OFFSET_MS);
    assert.equal(timers.timeouts[1].unrefCalled, true);
    assert.equal(timers.intervals.length, 0);
    timers.timeouts[1].fn();
    assert.equal(timers.intervals.length, 1);
    // The period itself is exactly the configured interval (no stagger added).
    assert.equal(timers.intervals[0].ms, 6 * 60 * 60 * 1000);
    assert.equal(timers.intervals[0].unrefCalled, true);

    await timers.timeouts[0].fn();

    assert.equal(fetchCalls.length, 1);
    assert.match(fetchCalls[0].url, /^http:\/\/127\.0\.0\.1:20128\//);
    assert.match(fetchCalls[0].url, /\/api\/providers\/.*\/sync-models$/);
    assert.equal(fetchCalls[0].options.method, "POST");
    assert.equal(fetchCalls[0].options.redirect, "error");
    assert.equal(fetchCalls[0].options.headers["Content-Type"], "application/json");
    assert.equal(
      fetchCalls[0].options.headers[scheduler.getModelSyncInternalAuthHeaderName()],
      scheduler.buildModelSyncInternalHeaders()[scheduler.getModelSyncInternalAuthHeaderName()]
    );

    const lastRun = await scheduler.getLastModelSyncTime();
    assert.match(lastRun, /^\d{4}-\d{2}-\d{2}T/);

    scheduler.stopModelSyncScheduler();
    assert.equal(timers.intervals[0].cleared, true);
  } finally {
    globalThis.fetch = originalFetch;
    timers.restore();
  }
});

test("#13973: phase offset delays the first periodic tick but never changes the configured period", async () => {
  const timers = installTimerStubs();
  const previousHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  process.env.MODEL_SYNC_INTERVAL_HOURS = "4";

  try {
    const scheduler = await loadScheduler("phase-offset-period");
    scheduler.startModelSyncScheduler("http://127.0.0.1:7777");
    // Let the fire-and-forget codex revalidation import settle while the timer
    // stubs are still installed, so its setTimeout(0) is captured here instead
    // of arming a real loopback poll that leaks fetches into later tests.
    await flushMicrotasks();

    // No recurring timer exists at boot: arming it at boot is what made it
    // collide with cleanup.ts's boot-anchored 6h interval.
    assert.equal(timers.intervals.length, 0);
    const phase = timers.timeouts.find((t) => t.ms === scheduler.MODEL_SYNC_STAGGER_OFFSET_MS);
    assert.ok(phase, "expected a one-shot phase timer of MODEL_SYNC_STAGGER_OFFSET_MS");
    assert.ok(scheduler.MODEL_SYNC_STAGGER_OFFSET_MS > 0);

    phase.fn();
    assert.equal(timers.intervals.length, 1);
    // The operator-configured MODEL_SYNC_INTERVAL_HOURS=4 must be honored exactly.
    assert.equal(timers.intervals[0].ms, 4 * 60 * 60 * 1000);

    // Stopping before the phase fires must cancel the pending arm too.
    scheduler.stopModelSyncScheduler();
    assert.equal(timers.intervals[0].cleared, true);

    timers.timeouts.length = 0;
    timers.intervals.length = 0;
    scheduler.startModelSyncScheduler("http://127.0.0.1:7777");
    await flushMicrotasks();
    const pending = timers.timeouts.find((t) => t.ms === scheduler.MODEL_SYNC_STAGGER_OFFSET_MS);
    scheduler.stopModelSyncScheduler();
    assert.equal(pending.cleared, true);
    assert.equal(timers.intervals.length, 0);
  } finally {
    if (previousHours === undefined) delete process.env.MODEL_SYNC_INTERVAL_HOURS;
    else process.env.MODEL_SYNC_INTERVAL_HOURS = previousHours;
    timers.restore();
  }
});

test("#20865: a non-positive MODEL_SYNC_INTERVAL_HOURS disables the scheduler", async () => {
  const previousHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  const originalFetch = globalThis.fetch;

  try {
    for (const value of ["0", "-0", "0.0", "0e5", "+0.0e-5", "0e309", "-1", "-1e309", "-1e-324"]) {
      const timers = installTimerStubs();
      const fetchCalls: string[] = [];
      let scheduler: LoadedScheduler | undefined;

      globalThis.fetch = async (url) => {
        fetchCalls.push(String(url));
        return new Response(JSON.stringify({ data: [] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      };
      process.env.MODEL_SYNC_INTERVAL_HOURS = value;

      try {
        scheduler = (await loadScheduler(`nonpositive-${value}`)) as LoadedScheduler;
        scheduler.startModelSyncScheduler("http://127.0.0.1:7777");
        await flushMicrotasks();

        assert.equal(
          timers.timeouts.length,
          0,
          `no one-shot timer may be armed when MODEL_SYNC_INTERVAL_HOURS=${value}`
        );
        assert.equal(
          timers.intervals.length,
          0,
          `no recurring timer may be armed when MODEL_SYNC_INTERVAL_HOURS=${value}`
        );
        assert.equal(
          fetchCalls.length,
          0,
          `no sync request may be issued when MODEL_SYNC_INTERVAL_HOURS=${value}`
        );
      } finally {
        scheduler?.stopModelSyncScheduler();
        globalThis.fetch = originalFetch;
        timers.restore();
      }
    }
  } finally {
    if (previousHours === undefined) delete process.env.MODEL_SYNC_INTERVAL_HOURS;
    else process.env.MODEL_SYNC_INTERVAL_HOURS = previousHours;
  }
});

async function assertSyncInitializationStatus(hours: string, enabled: boolean, prestart = false) {
  const priorHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
  const { getCloudSyncScheduler } = await import("../../src/shared/services/cloudSyncScheduler.ts");
  const cloud = await getCloudSyncScheduler();
  const route = await import(
    `../../src/app/api/sync/initialize/route.ts?hours=${hours}&boot=${prestart}`
  );
  const timers = installTimerStubs();
  const url = "http://127.0.0.1/api/sync/initialize";
  try {
    process.env.MODEL_SYNC_INTERVAL_HOURS = hours;
    if (prestart) scheduler.startModelSyncScheduler();
    const response = await route.POST(new Request(url, { method: "POST" }));
    const status = await route.GET(new Request(url));
    const modelTimerDelays = timers.timeouts
      .map(({ ms }) => ms)
      .filter((ms) => ms === 90_000 || ms === 2_700_000);

    assert.equal(response.status, 200);
    assert.equal(status.status, 200);
    assert.equal(cloud.isRunning(), true);
    assert.deepEqual(modelTimerDelays, enabled ? [90_000, 2_700_000] : []);
    const body = await response.json();
    const state = await status.json();
    assert.equal(body.success, true);
    assert.equal(state.initialized, true);
    assert.deepEqual(
      { enabled: body.modelSyncEnabled, initialized: state.modelSyncInitialized },
      { enabled, initialized: enabled },
      "both responses must agree with the model scheduler"
    );
  } finally {
    scheduler.stopModelSyncScheduler();
    cloud.stop();
    timers.restore();
    if (priorHours === undefined) delete process.env.MODEL_SYNC_INTERVAL_HOURS;
    else process.env.MODEL_SYNC_INTERVAL_HOURS = priorHours;
  }
}

test("sync initialization reports disabled model sync while cloud sync starts", async () => {
  await assertSyncInitializationStatus("0", false);
});

test("sync initialization reports enabled model sync when it starts the timers", async () => {
  await assertSyncInitializationStatus("0.5", true);
});

test("sync initialization reports enabled model sync when boot already started it", async () => {
  await assertSyncInitializationStatus("0.5", true, true);
});

// The default deployment sets no interval variable. A mutation that turns the
// start result into a truthiness check on the env var would report disabled here
// while GET reported a running scheduler, and every other POST case sets a value.
test("POST reports enabled model sync with the default config", async () => {
  const priorHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  delete process.env.MODEL_SYNC_INTERVAL_HOURS;
  const timers = installTimerStubs();
  const scheduler = await import(
    `../../src/shared/services/modelSyncScheduler.ts?defaultcfg=${Date.now()}`
  );
  const route = await import(`../../src/app/api/sync/initialize/route.ts?defaultcfg=${Date.now()}`);
  const url = "http://127.0.0.1/api/sync/initialize";
  try {
    const body = await (await route.POST(new Request(url, { method: "POST" }))).json();
    assert.equal(body.modelSyncEnabled, true, "the default config enables model sync");
    assert.equal(scheduler.isModelSyncSchedulerRunning(), true);
    const status = await (await route.GET(new Request(url))).json();
    assert.equal(status.modelSyncInitialized, true);
  } finally {
    scheduler.stopModelSyncScheduler();
    timers.restore();
    if (priorHours !== undefined) process.env.MODEL_SYNC_INTERVAL_HOURS = priorHours;
  }
});

// The repeat branch must report the real state in both directions: asserting only
// agreement with the first call lets a constant-true mutant through.
test("a repeat POST reports a disabled model sync as disabled", async () => {
  const priorHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  const timers = installTimerStubs();
  const scheduler = await import(
    `../../src/shared/services/modelSyncScheduler.ts?repeatdisabled=${Date.now()}`
  );
  const route = await import(
    `../../src/app/api/sync/initialize/route.ts?repeatdisabled=${Date.now()}`
  );
  const url = "http://127.0.0.1/api/sync/initialize";
  try {
    process.env.MODEL_SYNC_INTERVAL_HOURS = "0";
    const first = await (await route.POST(new Request(url, { method: "POST" }))).json();
    const second = await (await route.POST(new Request(url, { method: "POST" }))).json();
    assert.equal(first.modelSyncEnabled, false);
    assert.equal(
      second.modelSyncEnabled,
      false,
      "a repeat POST must not claim disabled sync is enabled"
    );
  } finally {
    scheduler.stopModelSyncScheduler();
    timers.restore();
    if (priorHours === undefined) delete process.env.MODEL_SYNC_INTERVAL_HOURS;
    else process.env.MODEL_SYNC_INTERVAL_HOURS = priorHours;
  }
});

// The pending first cycle is a timer like any other: stop() has to cancel it, or
// a stopped scheduler still fires a sync 90 seconds later.
test("stopping clears the pending startup cycle", async () => {
  const priorHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  const timers = installTimerStubs();
  const scheduler = await import(
    `../../src/shared/services/modelSyncScheduler.ts?stoppending=${Date.now()}`
  );
  try {
    process.env.MODEL_SYNC_INTERVAL_HOURS = "0.5";
    scheduler.startModelSyncScheduler();
    const startup = timers.timeouts.find((handle) => handle.ms === 90_000);
    assert.ok(startup, "the first cycle must be armed");
    scheduler.stopModelSyncScheduler();
    assert.equal(startup.cleared, true, "stop must cancel the pending first cycle");
    assert.equal(scheduler.isModelSyncSchedulerRunning(), false);
  } finally {
    scheduler.stopModelSyncScheduler();
    timers.restore();
    if (priorHours === undefined) delete process.env.MODEL_SYNC_INTERVAL_HOURS;
    else process.env.MODEL_SYNC_INTERVAL_HOURS = priorHours;
  }
});

// Cloud sync has the same problem the model half had: a process initialised by
// the boot path never ran a POST, so the route flag stayed false while its
// timers were running.
test("status reports cloud sync started without a POST", async () => {
  const timers = installTimerStubs();
  const { getCloudSyncScheduler } = await import("../../src/shared/services/cloudSyncScheduler.ts");
  const cloud = await getCloudSyncScheduler();
  const route = await import(`../../src/app/api/sync/initialize/route.ts?cloudonly=${Date.now()}`);
  try {
    await cloud.start();
    const status = await route.GET(new Request("http://127.0.0.1/api/sync/initialize"));
    const body = await status.json();
    assert.equal(
      body.initialized,
      true,
      "a running cloud scheduler must be reported as initialized"
    );
  } finally {
    cloud.stop();
    timers.restore();
  }
});

// Boot wiring and the first POST can both start cloud sync. The await inside
// start() must not let the second caller arm a second pair of timers.
test("concurrent cloud starts arm one pair of timers", async () => {
  const timers = installTimerStubs();
  const { getCloudSyncScheduler } = await import("../../src/shared/services/cloudSyncScheduler.ts");
  const cloud = await getCloudSyncScheduler();
  try {
    await Promise.all([cloud.start(), cloud.start()]);
    assert.equal(
      timers.timeouts.filter((t) => t.ms === 30_000).length,
      1,
      "one delayed first sync"
    );
    assert.equal(timers.intervals.length, 1, "one interval");
  } finally {
    cloud.stop();
    timers.restore();
  }
});

// A stopped cloud scheduler must not fire its delayed first sync afterwards: the
// 30 s timer is part of the lifecycle even though the interval is armed at once.
test("stopping the cloud scheduler cancels its delayed first sync", async () => {
  const timers = installTimerStubs();
  const { getCloudSyncScheduler } = await import("../../src/shared/services/cloudSyncScheduler.ts");
  const cloud = await getCloudSyncScheduler();
  try {
    await cloud.start();
    const startup = timers.timeouts.find((handle) => handle.ms === 30_000);
    assert.ok(startup, "the delayed first sync must be armed");
    cloud.stop();
    assert.equal(startup.cleared, true, "stop must cancel the delayed first sync");
    assert.equal(cloud.isRunning(), false);
  } finally {
    cloud.stop();
    timers.restore();
  }
});

// The cloud scheduler has the same duplication hazard: two module copies resolving
// their own instance would mean two intervals and a wrong status reading.
test("the cloud scheduler resolves to one instance across module copies", async () => {
  const stamp = Date.now();
  const first = await import(`../../src/shared/services/cloudSyncScheduler.ts?cloud=a&n=${stamp}`);
  const second = await import(`../../src/shared/services/cloudSyncScheduler.ts?cloud=b&n=${stamp}`);
  const a = await first.getCloudSyncScheduler();
  const b = await second.getCloudSyncScheduler();
  assert.equal(a, b, "both module copies must resolve the same cloud scheduler");
});

// A bundled server chunk can load a second copy of the scheduler module, so the
// state has to live outside module scope: a route reading its own copy would
// otherwise report a running scheduler as stopped.
test("scheduler state is shared across duplicated module copies", async () => {
  const priorHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  const timers = installTimerStubs();
  const stamp = Date.now();
  const first = await import(`../../src/shared/services/modelSyncScheduler.ts?copy=a&n=${stamp}`);
  const second = await import(`../../src/shared/services/modelSyncScheduler.ts?copy=b&n=${stamp}`);
  try {
    process.env.MODEL_SYNC_INTERVAL_HOURS = "0.5";
    first.startModelSyncScheduler();
    assert.equal(
      second.isModelSyncSchedulerRunning(),
      true,
      "a second module copy must see the timers armed by the first"
    );
    second.stopModelSyncScheduler();
    assert.equal(
      first.isModelSyncSchedulerRunning(),
      false,
      "stopping through one copy must clear the state the other reads"
    );
  } finally {
    first.stopModelSyncScheduler();
    timers.restore();
    if (priorHours === undefined) delete process.env.MODEL_SYNC_INTERVAL_HOURS;
    else process.env.MODEL_SYNC_INTERVAL_HOURS = priorHours;
  }
});

// The server boots through instrumentation -> initCloudSync, which starts the
// scheduler without ever calling POST. Status has to report that scheduler, not a
// route-local flag that only a POST would set.
test("status reports a scheduler started by the boot path, before any POST", async () => {
  const priorHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
  const route = await import(`../../src/app/api/sync/initialize/route.ts?bootonly=${Date.now()}`);
  const timers = installTimerStubs();
  try {
    process.env.MODEL_SYNC_INTERVAL_HOURS = "0.5";
    scheduler.startModelSyncScheduler();
    const status = await route.GET(new Request("http://127.0.0.1/api/sync/initialize"));
    const body = await status.json();
    assert.equal(
      body.modelSyncInitialized,
      true,
      "the boot-started scheduler must be reported as running"
    );
  } finally {
    scheduler.stopModelSyncScheduler();
    timers.restore();
    if (priorHours === undefined) delete process.env.MODEL_SYNC_INTERVAL_HOURS;
    else process.env.MODEL_SYNC_INTERVAL_HOURS = priorHours;
  }
});

// An idempotent retry has to answer the same question as the first call: the
// client asks whether model sync is enabled, and a message-only body leaves that
// undefined while GET reports the real state.
test("a repeat POST keeps reporting the model sync state", async () => {
  const priorHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
  const route = await import(`../../src/app/api/sync/initialize/route.ts?repeat=${Date.now()}`);
  const timers = installTimerStubs();
  const url = "http://127.0.0.1/api/sync/initialize";
  try {
    process.env.MODEL_SYNC_INTERVAL_HOURS = "0.5";
    const first = await (await route.POST(new Request(url, { method: "POST" }))).json();
    const second = await (await route.POST(new Request(url, { method: "POST" }))).json();
    assert.equal(second.modelSyncEnabled, first.modelSyncEnabled);
    assert.equal(typeof second.modelSyncEnabled, "boolean");
    assert.equal(second.success, true, "a repeat POST must keep the success flag");
  } finally {
    scheduler.stopModelSyncScheduler();
    timers.restore();
    if (priorHours === undefined) delete process.env.MODEL_SYNC_INTERVAL_HOURS;
    else process.env.MODEL_SYNC_INTERVAL_HOURS = priorHours;
  }
});

test("#20865: a fractional MODEL_SYNC_INTERVAL_HOURS keeps its value instead of reading as off", async () => {
  const previousHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  const timers = installTimerStubs();
  let scheduler: LoadedScheduler | undefined;
  process.env.MODEL_SYNC_INTERVAL_HOURS = "0.5";

  try {
    scheduler = (await loadScheduler("fractional-hours")) as LoadedScheduler;
    scheduler.startModelSyncScheduler("http://127.0.0.1:7777");
    await flushMicrotasks();

    const phase = timers.timeouts.find((t) => t.ms === scheduler.MODEL_SYNC_STAGGER_OFFSET_MS);
    assert.ok(phase, "expected the scheduler to arm its phase timer for 0.5 hours");
    // Remove only the phase handle: anything the callback schedules (the startup
    // cycle) has to run, otherwise the zero-request assertion proves nothing.
    timers.timeouts.splice(timers.timeouts.indexOf(phase), 1);
    phase.fn();
    await drainTimers(timers);
    // The phase callback starts the first cycle. With no auto-sync connection in
    // the store it must not touch the network at all -- and the autouse fetch
    // stub means a regression that does would hit the stub, not a real socket.
    // The startup cycle probes readiness once and then finds no auto-sync
    // connection. Any second request would mean it started syncing against the
    // stub, which is exactly the regression this guards.
    assert.deepEqual(
      defaultFetchCalls,
      ["http://127.0.0.1:20128/api/providers/__readiness_probe__/models"],
      "an empty cycle must probe readiness and stop there"
    );
    assert.equal(timers.intervals.length, 1);
    assert.equal(timers.intervals[0].ms, 30 * 60 * 1000);
  } finally {
    scheduler?.stopModelSyncScheduler();
    timers.restore();
    if (previousHours === undefined) delete process.env.MODEL_SYNC_INTERVAL_HOURS;
    else process.env.MODEL_SYNC_INTERVAL_HOURS = previousHours;
  }
});

test("#20865: an unusable MODEL_SYNC_INTERVAL_HOURS never arms a busy-loop timer", async () => {
  const previousHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  // Node's own limit, written out rather than read from the module: if the
  // exported constant ever regresses past it, the clamp stops working and this
  // assertion has to notice.
  const NODE_MAX_TIMER_DELAY_MS = 2_147_483_647;
  const CUSTOM_FALLBACK_MS = 4_242_000;
  const UNSAFE_CALLER_MS = 2_147_483_648;

  try {
    for (const [value, expectedMs, callerMs] of [
      // Valid exponent form: 1e3 hours is far past the timer limit, so it clamps.
      ["1e3", NODE_MAX_TIMER_DELAY_MS, undefined],
      // Malformed settings keep the caller's interval instead of disabling sync.
      ["Infinity", CUSTOM_FALLBACK_MS, CUSTOM_FALLBACK_MS],
      ["0,5", CUSTOM_FALLBACK_MS, CUSTOM_FALLBACK_MS],
      ["0.5h", CUSTOM_FALLBACK_MS, CUSTOM_FALLBACK_MS],
      // 1e309 is a valid hour count that can only be represented as Infinity: that
      // is the longest delay the timer allows, not a malformed setting.
      ["1e309", NODE_MAX_TIMER_DELAY_MS, CUSTOM_FALLBACK_MS],
      // 1e308 is a valid hour count that overflows when scaled to milliseconds:
      // that is "as long as the timer allows", not "back to six hours".
      ["1e308", NODE_MAX_TIMER_DELAY_MS, CUSTOM_FALLBACK_MS],
      // A positive literal too small to represent parses to zero; it is a tiny
      // delay, not a request to turn syncing off.
      ["1e-324", CUSTOM_FALLBACK_MS, CUSTOM_FALLBACK_MS],
      // A negative sign only means "off" when the literal itself parses; a
      // malformed negative setting keeps syncing instead of silently stopping.
      ["-0.5h", CUSTOM_FALLBACK_MS, CUSTOM_FALLBACK_MS],
      ["-Infinity", CUSTOM_FALLBACK_MS, CUSTOM_FALLBACK_MS],
      // 999 ms rounds below the one-second floor, so the caller's interval wins.
      ["0.0002775", CUSTOM_FALLBACK_MS, CUSTOM_FALLBACK_MS],
      // 999.72 ms rounds to one second: the floor applies to the rounded delay.
      ["0.0002777", 1_000, undefined],
      // The fallback itself is clamped: an out-of-range caller interval must not
      // reach setInterval untouched.
      ["0.0000000001", NODE_MAX_TIMER_DELAY_MS, UNSAFE_CALLER_MS],
      // Exactly one second is still a usable period and must be honored.
      ["0.0002777777777777778", 1_000, undefined],
    ] as const) {
      const timers = installTimerStubs();
      let scheduler: LoadedScheduler | undefined;
      process.env.MODEL_SYNC_INTERVAL_HOURS = value;

      try {
        scheduler = (await loadScheduler(`range-${value}`)) as LoadedScheduler;
        const loaded = scheduler;
        assert.ok(loaded);
        assert.equal(loaded.MAX_TIMER_DELAY_MS, NODE_MAX_TIMER_DELAY_MS);
        loaded.startModelSyncScheduler("http://127.0.0.1:7777", callerMs);
        await flushMicrotasks();

        const phase = timers.timeouts.find((t) => t.ms === loaded.MODEL_SYNC_STAGGER_OFFSET_MS);
        assert.ok(phase, `expected the scheduler to arm its phase timer for ${value}`);
        phase.fn();

        assert.equal(timers.intervals.length, 1);
        assert.equal(
          timers.intervals[0].ms,
          expectedMs,
          `MODEL_SYNC_INTERVAL_HOURS=${value} must keep the recurring delay inside the timer range`
        );
      } finally {
        scheduler?.stopModelSyncScheduler();
        timers.restore();
      }
    }
  } finally {
    if (previousHours === undefined) delete process.env.MODEL_SYNC_INTERVAL_HOURS;
    else process.env.MODEL_SYNC_INTERVAL_HOURS = previousHours;
  }
});

test("#20865: a caller-supplied interval is clamped like the environment value", async () => {
  const timers = installTimerStubs();
  const DEFAULT_MS = 21_600_000;
  let scheduler: LoadedScheduler | undefined;

  try {
    // No environment override: the caller's interval is what gets clamped.
    for (const [callerMs, expectedMs] of [
      [0, 1_000],
      [-5, 1_000],
      // Rounding is part of the contract: 1000.4 -> 1000, 1000.6 -> 1001.
      [999.4, 1_000],
      [999.5, 1_000],
      [1_000.4, 1_000],
      [1_000.6, 1_001],
      [Number.NaN, DEFAULT_MS],
      // "Longer than a timer can express" clamps to the maximum, it does not
      // quietly become six hours.
      [Number.POSITIVE_INFINITY, 2_147_483_647],
    ] as const) {
      timers.timeouts.length = 0;
      timers.intervals.length = 0;
      scheduler?.stopModelSyncScheduler();
      scheduler = (await loadScheduler(`caller-${String(callerMs)}`)) as LoadedScheduler;
      assert.ok(scheduler);
      scheduler.startModelSyncScheduler("http://127.0.0.1:7777", callerMs);
      await flushMicrotasks();

      const phase = timers.timeouts.find((t) => t.ms === scheduler?.MODEL_SYNC_STAGGER_OFFSET_MS);
      assert.ok(phase, `expected a phase timer for caller interval ${String(callerMs)}`);
      phase.fn();

      assert.equal(timers.intervals.length, 1);
      assert.equal(
        timers.intervals[0].ms,
        expectedMs,
        `caller interval ${String(callerMs)} must never reach setInterval unclamped`
      );
    }
  } finally {
    scheduler?.stopModelSyncScheduler();
    timers.restore();
  }
});

test("#20865: a leading plus sign in MODEL_SYNC_INTERVAL_HOURS stays valid", async () => {
  const previousHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  process.env.MODEL_SYNC_INTERVAL_HOURS = "  +4  ";
  const timers = installTimerStubs();
  let scheduler: LoadedScheduler | undefined;

  try {
    scheduler = (await loadScheduler("plus-sign")) as LoadedScheduler;
    assert.ok(scheduler);
    scheduler.startModelSyncScheduler("http://127.0.0.1:7777");
    await flushMicrotasks();

    const phase = timers.timeouts.find((t) => t.ms === scheduler?.MODEL_SYNC_STAGGER_OFFSET_MS);
    assert.ok(phase);
    phase.fn();
    assert.equal(timers.intervals.length, 1);
    assert.equal(timers.intervals[0].ms, 4 * 60 * 60 * 1000);
  } finally {
    scheduler?.stopModelSyncScheduler();
    timers.restore();
    if (previousHours === undefined) delete process.env.MODEL_SYNC_INTERVAL_HOURS;
    else process.env.MODEL_SYNC_INTERVAL_HOURS = previousHours;
  }
});

test("modelSyncScheduler skips empty cycles and tolerates failing sync requests", async () => {
  const timers = installTimerStubs();
  const originalFetch = globalThis.fetch;
  const fetchCalls = [];

  globalThis.fetch = async (url) => {
    fetchCalls.push(url);
    return new Response(JSON.stringify({ error: "upstream unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const emptyScheduler = await loadScheduler("empty-cycle");
    emptyScheduler.startModelSyncScheduler("http://127.0.0.1:5555", 10_000);
    await timers.timeouts[0].fn();
    assert.equal(fetchCalls.length, 0);
    assert.equal(await emptyScheduler.getLastModelSyncTime(), null);
    emptyScheduler.stopModelSyncScheduler();

    timers.timeouts.length = 0;
    timers.intervals.length = 0;

    await providersDb.createProviderConnection({
      provider: "gemini",
      authType: "apikey",
      name: "Auto Sync Failure",
      apiKey: "sk-auto-failure",
      providerSpecificData: { autoSync: true },
    });

    const failingScheduler = await loadScheduler("failing-cycle");
    failingScheduler.startModelSyncScheduler("http://127.0.0.1:5555", 10_000);
    await timers.timeouts[0].fn();

    assert.equal(fetchCalls.length, 1);
    assert.match(await failingScheduler.getLastModelSyncTime(), /^\d{4}-\d{2}-\d{2}T/);

    failingScheduler.stopModelSyncScheduler();
  } finally {
    globalThis.fetch = originalFetch;
    timers.restore();
  }
});

test("test 12: default interval is 6h; env hours override; no-arg uses default", async () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "src/shared/services/modelSyncScheduler.ts"),
    "utf8"
  );
  assert.match(source, /DEFAULT_INTERVAL_MS\s*=\s*6\s*\*\s*60\s*\*\s*60\s*\*\s*1000/);
  assert.doesNotMatch(source, /DEFAULT_INTERVAL_MS\s*=\s*24\s*\*\s*60\s*\*\s*60\s*\*\s*1000/);
  assert.match(source, /intervalMs\s*=\s*DEFAULT_INTERVAL_MS/);
  const { DEFAULT_INTERVAL_MS } = await import("../../src/shared/services/modelSyncScheduler.ts");
  assert.equal(DEFAULT_INTERVAL_MS, 6 * 60 * 60 * 1000);
});

test("test 12: MODEL_SYNC_INTERVAL_HOURS still wins over default", async () => {
  const previousHours = process.env.MODEL_SYNC_INTERVAL_HOURS;
  process.env.MODEL_SYNC_INTERVAL_HOURS = "2";
  const timers = installTimerStubs();
  let scheduler: LoadedScheduler | undefined;

  try {
    scheduler = (await loadScheduler("env-wins-over-default")) as LoadedScheduler;
    assert.ok(scheduler);
    // A caller-supplied interval must lose to the operator's setting.
    scheduler.startModelSyncScheduler("http://127.0.0.1:7777", 5_000);
    await flushMicrotasks();

    const phase = timers.timeouts.find((t) => t.ms === scheduler?.MODEL_SYNC_STAGGER_OFFSET_MS);
    assert.ok(phase);
    phase.fn();
    assert.equal(timers.intervals.length, 1);
    assert.equal(timers.intervals[0].ms, 2 * 60 * 60 * 1000);
  } finally {
    scheduler?.stopModelSyncScheduler();
    timers.restore();
    if (previousHours === undefined) delete process.env.MODEL_SYNC_INTERVAL_HOURS;
    else process.env.MODEL_SYNC_INTERVAL_HOURS = previousHours;
  }
});

async function drainTimers(timers: {
  timeouts: Array<{ fn: () => void; cleared: boolean }>;
}): Promise<void> {
  for (let round = 0; round < 12; round += 1) {
    await flushMicrotasks();
    const pending = timers.timeouts.splice(0, timers.timeouts.length);
    if (pending.length === 0) return;
    for (const handle of pending) {
      if (!handle.cleared) handle.fn();
    }
  }
  await flushMicrotasks();
  // Silently stopping would let a caller assert "no requests" while work is still
  // queued. Leaving timers behind after the budget is a failure, not a quiet exit.
  assert.equal(
    timers.timeouts.length,
    0,
    "timers kept rescheduling after the drain budget; the cycle never settled"
  );
}

async function flushMicrotasks(times = 20) {
  for (let i = 0; i < times; i++) {
    await new Promise((resolve) => setImmediate(resolve));
  }
}

// The in-flight guard is the only thing that stops a second tick from running a
// second cycle over the same connections. Deleting it must fail here rather than
// silently doubling upstream traffic. (The per-copy half is covered by the
// two-module-copy test above, which loads the module twice.)
test("a tick that lands during a running cycle is skipped", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Auto Overlap",
    apiKey: "sk-overlap",
    providerSpecificData: { autoSync: true },
  });

  const timers = installTimerStubs();
  const originalFetch = globalThis.fetch;
  let syncFetches = 0;
  let releaseGate: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    releaseGate = resolve;
  });

  globalThis.fetch = (async (url: unknown) => {
    if (String(url).includes("__readiness_probe__")) {
      return new Response(JSON.stringify({ data: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    syncFetches += 1;
    await gate;
    return new Response(JSON.stringify({ syncedModels: 1 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  try {
    const scheduler = await loadScheduler("overlap-skip");
    scheduler.startModelSyncScheduler("http://127.0.0.1:7777");
    const phase = timers.timeouts.find((t) => t.ms === scheduler.MODEL_SYNC_STAGGER_OFFSET_MS);
    assert.ok(phase, "the phase timer must be armed");
    phase.fn();
    const interval = timers.intervals[0];
    assert.ok(interval, "the recurring interval must be armed");
    interval.fn();
    await flushMicrotasks(6);
    interval.fn();
    await flushMicrotasks(6);
    releaseGate();
    await flushMicrotasks(12);
    assert.equal(
      syncFetches,
      1,
      "a tick landing during a running cycle must not start a second one"
    );
  } finally {
    globalThis.fetch = originalFetch;
    timers.restore();
    (await loadScheduler("overlap-skip-clean")).stopModelSyncScheduler();
    delete process.env.MODEL_SYNC_INTERVAL_HOURS;
  }
});

test("runSyncCycle keeps in-flight catalog fetches at or below the cycle concurrency cap", async () => {
  const connectionCount = 12;
  const cycleCap = 4;

  for (let i = 0; i < connectionCount; i++) {
    await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: `Auto Sync ${i}`,
      apiKey: `gw-auth-placeholder-${i}`,
      providerSpecificData: { autoSync: true },
    });
  }

  const timers = installTimerStubs();
  const originalFetch = globalThis.fetch;
  let inFlight = 0;
  let peak = 0;
  let releaseGate;
  const gate = new Promise((resolve) => {
    releaseGate = resolve;
  });

  globalThis.fetch = async () => {
    inFlight += 1;
    peak = Math.max(peak, inFlight);
    await gate;
    inFlight -= 1;
    return new Response(JSON.stringify({ syncedModels: 1 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const scheduler = await loadScheduler("bounded-cycle-concurrency");
    assert.equal(scheduler.MODEL_SYNC_CYCLE_CONCURRENCY, cycleCap);
    scheduler.startModelSyncScheduler("http://127.0.0.1:7777", 1000);
    const cycle = timers.timeouts[0].fn();
    await flushMicrotasks();

    assert.equal(peak, cycleCap);
    assert.equal(inFlight, cycleCap);

    releaseGate();
    await cycle;
    assert.equal(peak, cycleCap);
    scheduler.stopModelSyncScheduler();
  } finally {
    globalThis.fetch = originalFetch;
    timers.restore();
  }
});

test("first model-sync cycle waits until after the 30s startup cleanup window", async () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "src/shared/services/modelSyncScheduler.ts"),
    "utf8"
  );
  const { MODEL_SYNC_STARTUP_DELAY_MS } = await loadScheduler("startup-delay-constant");
  assert.equal(MODEL_SYNC_STARTUP_DELAY_MS, 90_000);
  assert.match(source, /MODEL_SYNC_STARTUP_DELAY_MS/);
  assert.doesNotMatch(source, /setTimeout\(\(\) => runSyncCycle\(trustedApiBaseUrl\), 5_000\)/);
});

test("syncConnectionModels logs removed synced and custom models separately", async (t) => {
  const { getModelSyncInternalBaseUrl, syncConnectionModels } =
    await import("../../src/shared/services/modelSyncScheduler.ts");
  const logged: string[] = [];
  t.mock.method(console, "log", (line: unknown) => logged.push(String(line)));
  const answer = (body: Record<string, unknown>) =>
    t.mock.method(globalThis, "fetch", async () => Response.json(body), { times: 1 });

  answer({ syncedModels: 40, modelChanges: { removed: 110 }, customModelChanges: { removed: 3 } });
  assert.equal(await syncConnectionModels("conn-1", "demo", getModelSyncInternalBaseUrl()), true);

  answer({ syncedModels: 40, modelChanges: { removed: 0 }, customModelChanges: { removed: 0 } });
  assert.equal(await syncConnectionModels("conn-2", "demo", getModelSyncInternalBaseUrl()), true);

  assert.equal(logged[0], "[ModelSync] demo (conn-1): ✓ 40 models (removed: 110 synced, 3 custom)");
  assert.equal(logged[1], "[ModelSync] demo (conn-2): ✓ 40 models");
});

test("CodeQL #1407: a failed sync logs with a constant format, so a provider id cannot act as one", async () => {
  const { syncConnectionModels, getModelSyncInternalBaseUrl } = await loadScheduler("log-format");
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  const warned: unknown[][] = [];
  globalThis.fetch = async () => {
    throw new Error("socket hang up");
  };
  console.warn = (...args: unknown[]) => {
    warned.push(args);
  };
  try {
    assert.equal(
      await syncConnectionModels("conn-fmt-1", "evil%s%o%c", getModelSyncInternalBaseUrl()),
      false
    );
  } finally {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
  }
  const entry = warned.find((args) => args.includes("evil%s%o%c"));
  assert.ok(entry, "the provider id is logged as a plain argument");
  assert.equal(typeof entry[0], "string");
  assert.ok(!String(entry[0]).includes("evil"), "the format string carries no caller data");
  assert.ok(entry.includes("socket hang up"), "the error message is still logged");
});
