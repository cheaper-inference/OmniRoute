/**
 * Quota window ping executor + runner contract: one minimal request per claimed run.
 *
 * The executor and every external effect are injected, time is injected, and the
 * store is in-memory, so these tests prove the request shape and the skip/execute
 * boundaries without a real DB, timer or network.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qwp-executor-"));

const { runWindowPingTarget } = await import("../../src/lib/services/quotaWindowPing.ts");
const { executeQuotaWindowPing, readClaudePingOutcome } =
  await import("../../src/lib/services/quotaWindowPingExecutor.ts");
const { getQuotaWindowDescriptor } = await import("../../src/shared/constants/quotaWindowPing.ts");
const { normalizeResetKey } = await import("../../src/lib/services/quotaAutoPing.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => resetDbInstance());

const NOW_MS = Date.parse("2026-01-01T12:00:00.000Z");
const NOW_ISO = new Date(NOW_MS).toISOString();
const FAR_RESET = new Date(NOW_MS + 5 * 60 * 60 * 1000).toISOString();
const FAR_FINGERPRINT = normalizeResetKey(FAR_RESET);
const COMPLETED_SSE =
  'event: response.completed\ndata: {"type":"response.completed","response":{"status":"completed"}}\n\n';

const iso = (ms: number) => new Date(ms).toISOString();

function makeTarget(overrides = {}) {
  return {
    id: "t1",
    connectionId: "c1",
    provider: "codex",
    model: null,
    windowId: "session",
    descriptorId: "codex:session",
    enabled: true,
    schedule: { kind: "interval", minutes: 5 },
    minLongerWindowRemainingPct: 0,
    dryRun: false,
    claudeBillableConfirmed: false,
    lastPingedFingerprint: null,
    lastPingAt: null,
    failureAt: null,
    nextRunAt: NOW_ISO,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
    ...overrides,
  };
}

function makeConnection(overrides = {}) {
  return {
    id: "c1",
    provider: "codex",
    authType: "oauth",
    accessToken: "access-token",
    isActive: true,
    testStatus: null,
    providerSpecificData: { workspaceId: "w1" },
    lastPingedResetKey: null,
    ...overrides,
  };
}

function makeReading(overrides = {}) {
  return {
    provider: "codex",
    complete: true,
    stale: false,
    message: null,
    windows: {
      session: {
        reported: true,
        resetAt: FAR_RESET,
        remainingPct: 40,
        exhausted: false,
        windowSeconds: 18000,
      },
      weekly: {
        reported: true,
        resetAt: FAR_RESET,
        remainingPct: 100,
        exhausted: false,
        windowSeconds: 604800,
      },
    },
    ...overrides,
  };
}

function makeRun(fields) {
  return {
    id: fields.id,
    targetId: fields.targetId,
    connectionId: fields.connectionId,
    descriptorId: fields.descriptorId,
    windowId: fields.windowId,
    trigger: fields.trigger,
    status: fields.status,
    reason: fields.reason ?? null,
    fingerprint: fields.fingerprint ?? null,
    dryRun: fields.dryRun ?? false,
    detail: fields.detail ?? null,
    startedAt: fields.startedAt ?? NOW_ISO,
    finishedAt: fields.finishedAt ?? null,
    leaseExpiresAt: fields.leaseExpiresAt ?? NOW_MS + 75_000,
  };
}

/** In-memory QuotaWindowPingStore that mirrors the DB claim/lease semantics. */
function makeStore(targets) {
  const map = new Map(targets.map((target) => [target.id, { ...target }]));
  const live = new Set();
  const runs = [];
  const calls = { claims: [], finishes: 0, recovered: 0, renews: [], pinged: [], failed: [] };
  let seq = 0;

  return {
    map,
    live,
    runs,
    calls,
    listWindowPingTargets() {
      return [...map.values()].map((target) => ({ ...target }));
    },
    getWindowPingTarget(id) {
      const target = map.get(id);
      return target ? { ...target } : null;
    },
    countEnabledWindowPingTargets() {
      return [...map.values()].filter((target) => target.enabled).length;
    },
    claimWindowPingRun(targetId, trigger, nowMs, computeNextRunAt) {
      calls.claims.push([targetId, trigger]);
      const target = map.get(targetId);
      if (!target) {
        const error = new Error("not_found");
        error.code = "not_found";
        throw error;
      }
      if (trigger === "scheduled") {
        const dueMs = target.nextRunAt ? Date.parse(target.nextRunAt) : NaN;
        if (!target.enabled || !target.schedule || !Number.isFinite(dueMs) || dueMs > nowMs) {
          return { kind: "not_due" };
        }
        target.nextRunAt = computeNextRunAt(target.schedule, nowMs);
      }
      if (live.has(targetId)) {
        const run = makeRun({
          id: `run-${++seq}`,
          targetId,
          connectionId: target.connectionId,
          descriptorId: target.descriptorId,
          windowId: target.windowId,
          trigger,
          status: "skipped",
          reason: "in_flight",
          dryRun: target.dryRun,
          startedAt: iso(nowMs),
          finishedAt: iso(nowMs),
          leaseExpiresAt: nowMs,
        });
        runs.push(run);
        return { kind: "in_flight", run: { ...run } };
      }
      const run = makeRun({
        id: `run-${++seq}`,
        targetId,
        connectionId: target.connectionId,
        descriptorId: target.descriptorId,
        windowId: target.windowId,
        trigger,
        status: "running",
        dryRun: target.dryRun,
        startedAt: iso(nowMs),
        leaseExpiresAt: nowMs + 75_000,
      });
      runs.push(run);
      live.add(targetId);
      return { kind: "claimed", claim: { run: { ...run }, target: { ...target } } };
    },
    finishWindowPingRun(runId, nowMs, outcome) {
      calls.finishes += 1;
      const run = runs.find((entry) => entry.id === runId);
      if (!run) return null;
      run.status = outcome.status;
      run.reason = outcome.reason;
      run.fingerprint = outcome.fingerprint;
      run.dryRun = outcome.dryRun === undefined ? run.dryRun : outcome.dryRun;
      run.detail = outcome.detail ?? null;
      run.finishedAt = iso(nowMs);
      live.delete(run.targetId);
      return { ...run };
    },
    renewWindowPingRunLease(runId, nowMs) {
      calls.renews.push([runId, nowMs]);
      const run = runs.find((entry) => entry.id === runId);
      if (!run || run.status !== "running") return false;
      run.leaseExpiresAt = nowMs + 75_000;
      return true;
    },
    recoverWindowPingRuns() {
      calls.recovered += 1;
      return 0;
    },
    listWindowPingRuns() {
      return runs.map((run) => ({ ...run }));
    },
    markWindowPingTargetPinged(targetId, fingerprint, nowMs) {
      calls.pinged.push([targetId, fingerprint]);
      const target = map.get(targetId);
      if (!target) return;
      target.lastPingedFingerprint = fingerprint;
      target.lastPingAt = iso(nowMs);
      target.failureAt = null;
    },
    markWindowPingTargetFailed(targetId, nowMs) {
      calls.failed.push(targetId);
      const target = map.get(targetId);
      if (target) target.failureAt = iso(nowMs);
    },
  };
}

function makeExecutorResult(body) {
  return {
    status: 200,
    response: { ok: true, status: 200, text: async () => body },
    url: "https://upstream.example/ping",
  };
}

function makeDeps(options = {}) {
  const target = options.target ?? makeTarget();
  const store = options.store ?? makeStore([target]);
  const connection = options.connection ?? makeConnection();
  const reading = options.reading ?? makeReading();
  const executorResult = options.executorResult ?? makeExecutorResult(COMPLETED_SSE);
  const calls = {
    execute: [],
    saveCallLog: [],
    updates: [],
    settingsReads: 0,
    refreshes: 0,
    usageReads: 0,
    throttles: 0,
    executorProviders: [],
    proxyReads: 0,
  };
  const deps = {
    getSettings: async () => {
      calls.settingsReads += 1;
      return options.settings ?? { quotaWindowPing: { enabled: true } };
    },
    getProviderConnectionById: options.getProviderConnectionById ?? (async () => connection),
    updateProviderConnection: async (id, data) => {
      calls.updates.push([id, data]);
      return null;
    },
    refreshAndUpdateCredentials: async (current) => {
      calls.refreshes += 1;
      return { connection: options.refreshConnection ?? current };
    },
    fetchUsage: async () => {
      calls.usageReads += 1;
      return options.fetchReading ? options.fetchReading() : reading;
    },
    throttleQuotaFetch: async () => {
      calls.throttles += 1;
    },
    resolveProxyForConnection: async () => {
      calls.proxyReads += 1;
      if (options.proxyThrows) throw new Error("proxy unavailable");
      return { proxy: null };
    },
    runWithProxyContext: async (_proxy, callback) => callback(),
    getExecutor: async (provider) => {
      calls.executorProviders.push(provider);
      return {
        execute: async (input) => {
          calls.execute.push(input);
          if (options.executeJob) return options.executeJob(input);
          return executorResult;
        },
      };
    },
    resolvePingModel: options.resolvePingModel ?? (async () => "gpt-5.1-codex"),
    canExecuteProvider: options.canExecuteProvider ?? (() => true),
    isConnectionUnavailableToAuxiliaryActivity:
      options.isConnectionUnavailableToAuxiliaryActivity ?? (async () => false),
    saveCallLog: async (entry, metadataOnly) => {
      calls.saveCallLog.push({ entry, metadataOnly });
    },
    store,
  };
  return { deps, calls, store, target, connection };
}

test("due Codex target sends exactly one minimal request and records the shared key", async () => {
  const { deps, calls, store } = makeDeps();

  const outcome = await runWindowPingTarget("t1", "scheduled", deps, () => NOW_MS);

  assert.ok(outcome);
  assert.equal(outcome.run.status, "succeeded");
  assert.equal(outcome.run.reason, "completed");
  assert.equal(outcome.run.fingerprint, FAR_FINGERPRINT);
  assert.equal(calls.execute.length, 1);
  const input = calls.execute[0];
  assert.equal(input.model, "gpt-5.1-codex");
  assert.equal(input.stream, true);
  assert.deepEqual(input.body, {
    model: "gpt-5.1-codex",
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "hi" }],
      },
    ],
    instructions: "Reply with OK.",
    reasoning: { effort: "none", summary: "auto" },
    store: false,
    stream: true,
  });
  assert.deepEqual(Object.keys(input.credentials).sort(), [
    "accessToken",
    "connectionId",
    "providerSpecificData",
  ]);
  assert.equal(input.credentials.accessToken, "access-token");
  assert.equal(input.credentials.connectionId, "c1");
  assert.equal("refreshToken" in input.credentials, false);
  assert.equal("skipUpstreamRetry" in input, false);

  // The one call-log marker: metadata-only, quota_window_ping, no token/cost payload.
  assert.equal(calls.saveCallLog.length, 1);
  const { entry, metadataOnly } = calls.saveCallLog[0];
  assert.equal(metadataOnly, true);
  assert.equal(entry.requestType, "quota_window_ping");
  assert.equal(entry.path, "https://upstream.example/ping");
  assert.equal(entry.status, 200);
  assert.equal(entry.provider, "codex");
  assert.equal(entry.connectionId, "c1");
  assert.equal("tokens" in entry, false);
  assert.equal("cost" in entry, false);

  // Shared cross-feature dedupe channel: one quota window, one ping across features.
  assert.deepEqual(calls.updates, [
    ["c1", { lastPingedResetKey: FAR_FINGERPRINT, lastPingAt: NOW_ISO }],
  ]);
  assert.deepEqual(store.calls.pinged, [["t1", FAR_FINGERPRINT]]);
  assert.equal(store.map.get("t1").lastPingedFingerprint, FAR_FINGERPRINT);
  // The claim lease is renewed at dispatch time: the claim covers the claim instant,
  // not the unbounded pre-ping phase.
  assert.deepEqual(store.calls.renews, [["run-1", NOW_MS]]);
});

test("Claude target sends the exact non-streaming message body with max_tokens 1", async () => {
  const target = makeTarget({
    provider: "claude",
    descriptorId: "claude:session",
    windowId: "session (5h)",
  });
  const connection = makeConnection({ provider: "claude", id: "c1" });
  const reading = makeReading({
    provider: "claude",
    windows: {
      "session (5h)": {
        reported: true,
        resetAt: FAR_RESET,
        remainingPct: 60,
        exhausted: false,
        windowSeconds: 18000,
      },
      "weekly (7d)": {
        reported: true,
        resetAt: FAR_RESET,
        remainingPct: 100,
        exhausted: false,
        windowSeconds: 604800,
      },
    },
  });
  const executorResult = {
    status: 200,
    response: {
      ok: true,
      status: 200,
      json: async () => ({ type: "message", stop_reason: "max_tokens" }),
    },
    url: "https://api.anthropic.com/v1/messages",
  };
  const { deps, calls } = makeDeps({
    target,
    connection,
    reading,
    executorResult,
    resolvePingModel: async () => "claude-sonnet-4-5",
  });

  const outcome = await runWindowPingTarget("t1", "scheduled", deps, () => {
    return NOW_MS;
  });

  assert.equal(outcome?.run.status, "succeeded");
  assert.equal(calls.execute.length, 1);
  const input = calls.execute[0];
  assert.equal(input.stream, false);
  assert.deepEqual(input.body, {
    model: "claude-sonnet-4-5",
    max_tokens: 1,
    messages: [{ role: "user", content: "hi" }],
  });
  assert.equal(calls.executorProviders[0], "claude");
  assert.equal(calls.saveCallLog.length, 1);
});

test("Claude outcome requires a complete message object", async () => {
  const responseFor = (payload) => ({ json: async () => payload });

  assert.equal(
    await readClaudePingOutcome(responseFor({ type: "message", stop_reason: "end_turn" })),
    "completed"
  );
  assert.equal(
    await readClaudePingOutcome(responseFor({ type: "message", stop_reason: "max_tokens" })),
    "completed"
  );
  assert.equal(await readClaudePingOutcome(responseFor({ type: "message" })), "incomplete");
  assert.equal(await readClaudePingOutcome(responseFor({ type: "error", error: {} })), "failed");
  assert.equal(await readClaudePingOutcome(responseFor("not-json")), "incomplete");
  assert.equal(
    await readClaudePingOutcome({ json: async () => Promise.reject(new Error("aborted")) }),
    "incomplete"
  );
});

test("Codex completion signal: only response.completed succeeds", async () => {
  const cases = [
    ["response.completed", COMPLETED_SSE, "succeeded"],
    ["error", 'event: error\ndata: {"type":"error"}\n\n', "failed"],
    [
      "response.failed",
      'event: response.failed\ndata: {"type":"response.failed","response":{"status":"failed"}}\n\n',
      "failed",
    ],
    [
      "response.incomplete",
      'event: response.incomplete\ndata: {"type":"response.incomplete","response":{"status":"incomplete"}}\n\n',
      "failed",
    ],
    ["EOF without a terminal event", "", "failed"],
  ];

  for (const [name, body, expected] of cases) {
    const calls = [];
    const deps = {
      getExecutor: async () => ({
        execute: async (input) => {
          calls.push(input);
          return { response: { ok: true, status: 200, text: async () => body } };
        },
      }),
      saveCallLog: async () => {},
      isConnectionUnavailableToAuxiliaryActivity: async () => false,
    };
    const descriptor = getQuotaWindowDescriptor("codex:session");
    const result = await executeQuotaWindowPing(
      {
        target: makeTarget(),
        descriptor,
        connection: makeConnection(),
        pingModel: "gpt-5.1-codex",
        signal: new AbortController().signal,
      },
      deps
    );
    assert.equal(result.status, expected, name);
    assert.equal(result.reason, expected === "succeeded" ? "completed" : "not_completed", name);
    assert.equal(calls.length, 1, `${name}: no retry`);
  }
});

test("HTTP failure is not_completed and cancels the response body", async () => {
  let cancelled = 0;
  const deps = {
    getExecutor: async () => ({
      execute: async () => ({
        response: {
          ok: false,
          status: 429,
          body: {
            cancel: async () => {
              cancelled += 1;
            },
          },
        },
      }),
    }),
    saveCallLog: async () => {},
    isConnectionUnavailableToAuxiliaryActivity: async () => false,
  };
  const result = await executeQuotaWindowPing(
    {
      target: makeTarget(),
      descriptor: getQuotaWindowDescriptor("codex:session"),
      connection: makeConnection(),
      pingModel: "gpt-5.1-codex",
      signal: new AbortController().signal,
    },
    deps
  );
  assert.equal(result.status, "failed");
  assert.equal(result.reason, "not_completed");
  assert.equal(result.httpStatus, 429);
  assert.equal(cancelled, 1);
});

test("every skip reason executes zero requests and zero call logs", async () => {
  const cases = [
    {
      name: "target_disabled (scheduled is never claimed)",
      setup: () => makeDeps({ target: makeTarget({ enabled: false }) }),
      expect: null,
      usageReads: 0,
    },
    {
      name: "kill_switch_off",
      setup: () => makeDeps({ settings: { quotaWindowPing: { enabled: false } } }),
      expect: "kill_switch_off",
      usageReads: 0,
    },
    {
      name: "account_disabled",
      setup: () => makeDeps({ connection: makeConnection({ isActive: false }) }),
      expect: "account_disabled",
      usageReads: 0,
    },
    {
      name: "breaker_open",
      setup: () => makeDeps({ canExecuteProvider: () => false }),
      expect: "breaker_open",
      usageReads: 0,
    },
    {
      name: "breaker_cooling",
      setup: () => makeDeps({ target: makeTarget({ failureAt: iso(NOW_MS - 60_000) }) }),
      expect: "breaker_cooling",
      usageReads: 0,
    },
    {
      name: "exclusive_lease",
      setup: () => makeDeps({ isConnectionUnavailableToAuxiliaryActivity: async () => true }),
      expect: "exclusive_lease",
      usageReads: 0,
    },
    {
      name: "in_flight",
      setup: () => {
        const target = makeTarget();
        const context = makeDeps({ target });
        context.store.live.add("t1");
        return context;
      },
      expect: "in_flight",
      usageReads: 0,
    },
    {
      name: "no_model",
      setup: () => makeDeps({ resolvePingModel: async () => null }),
      expect: "no_model",
      usageReads: 0,
    },
    {
      name: "telemetry_stale",
      setup: () => makeDeps({ reading: makeReading({ message: "usage unavailable" }) }),
      expect: "telemetry_stale",
      usageReads: 1,
    },
    {
      name: "window_exhausted",
      setup: () => {
        const reading = makeReading();
        reading.windows.session.remainingPct = 0;
        reading.windows.session.exhausted = true;
        return makeDeps({ reading });
      },
      expect: "window_exhausted",
      usageReads: 1,
    },
    {
      name: "window_active",
      setup: () =>
        makeDeps({
          reading: makeReading({
            windows: {
              session: {
                reported: true,
                resetAt: iso(NOW_MS + 60 * 60 * 1000),
                remainingPct: 40,
                exhausted: false,
                windowSeconds: 18000,
              },
              weekly: {
                reported: true,
                resetAt: iso(NOW_MS + 60 * 60 * 1000),
                remainingPct: 100,
                exhausted: false,
                windowSeconds: 604800,
              },
            },
          }),
        }),
      expect: "window_active",
      usageReads: 1,
    },
    {
      name: "longer_window_exhausted",
      setup: () => {
        const reading = makeReading();
        reading.windows.weekly.exhausted = true;
        return makeDeps({ reading });
      },
      expect: "longer_window_exhausted",
      usageReads: 1,
    },
    {
      name: "longer_window_below_threshold",
      setup: () => {
        const reading = makeReading();
        reading.windows.weekly.remainingPct = 20;
        return makeDeps({
          target: makeTarget({ minLongerWindowRemainingPct: 50 }),
          reading,
        });
      },
      expect: "longer_window_below_threshold",
      usageReads: 1,
    },
    {
      name: "already_pinged_reset (target fingerprint)",
      setup: () => makeDeps({ target: makeTarget({ lastPingedFingerprint: FAR_FINGERPRINT }) }),
      expect: "already_pinged_reset",
      usageReads: 1,
    },
    {
      name: "already_pinged_reset (legacy last_pinged_reset_key)",
      setup: () =>
        makeDeps({ connection: makeConnection({ lastPingedResetKey: FAR_FINGERPRINT }) }),
      expect: "already_pinged_reset",
      usageReads: 1,
    },
  ];

  for (const entry of cases) {
    const { deps, calls } = entry.setup();
    const outcome = await runWindowPingTarget("t1", "scheduled", deps, () => NOW_MS);

    assert.equal(calls.execute.length, 0, `${entry.name}: zero execute`);
    assert.equal(calls.saveCallLog.length, 0, `${entry.name}: zero call log`);
    assert.equal(calls.usageReads, entry.usageReads, `${entry.name}: usage read placement`);
    if (entry.expect === null) {
      assert.equal(outcome, null, `${entry.name}: no claim`);
    } else {
      assert.ok(outcome, entry.name);
      assert.equal(outcome.run.status, "skipped", entry.name);
      assert.equal(outcome.run.reason, entry.expect, entry.name);
      assert.equal(outcome.decision.reason, entry.expect, entry.name);
    }
  }
});

test("a mixed-case terminal connection status is refused before credential refresh", async () => {
  const { deps, calls } = makeDeps({ connection: makeConnection({ testStatus: "Expired" }) });

  const outcome = await runWindowPingTarget("t1", "scheduled", deps, () => NOW_MS);

  assert.equal(outcome?.run.status, "skipped");
  assert.equal(outcome?.run.reason, "account_disabled");
  assert.equal(calls.refreshes, 0);
  assert.equal(calls.execute.length, 0);
});

test("dry run finishes skipped/would_ping and sends nothing", async () => {
  const { deps, calls, store } = makeDeps({
    target: makeTarget({ dryRun: true }),
  });

  const outcome = await runWindowPingTarget("t1", "scheduled", deps, () => NOW_MS);

  assert.equal(outcome?.run.status, "skipped");
  assert.equal(outcome?.run.reason, "would_ping");
  assert.equal(outcome?.run.dryRun, true);
  assert.equal(calls.execute.length, 0);
  assert.equal(calls.saveCallLog.length, 0);
  assert.equal(calls.updates.length, 0);
  assert.equal(store.calls.pinged.length, 0);
  assert.equal(store.map.get("t1").lastPingedFingerprint, null);
  // The schedule still advances so a dry-run target follows it.
  assert.notEqual(store.map.get("t1").nextRunAt, NOW_ISO);
});

test("the ping executes inside the connection proxy context", async () => {
  const context = makeDeps();
  let depth = 0;
  let sawContext = false;
  context.deps.runWithProxyContext = async (_proxy, callback) => {
    depth += 1;
    try {
      return await callback();
    } finally {
      depth -= 1;
    }
  };
  context.deps.getExecutor = async () => ({
    execute: async () => {
      sawContext = depth > 0;
      return makeExecutorResult(COMPLETED_SSE);
    },
  });

  const outcome = await runWindowPingTarget("t1", "scheduled", context.deps, () => NOW_MS);

  assert.equal(outcome?.run.status, "succeeded");
  assert.equal(sawContext, true, "the executor runs under runWithProxyContext");
  assert.equal(depth, 0);
});

test("a proxy-context failure during the ping is fail-closed", async () => {
  const context = makeDeps();
  let contexts = 0;
  context.deps.runWithProxyContext = async (_proxy, callback) => {
    contexts += 1;
    if (contexts === 2) throw new Error("proxy context unavailable");
    return callback();
  };

  const outcome = await runWindowPingTarget("t1", "scheduled", context.deps, () => NOW_MS);

  assert.equal(contexts, 2);
  assert.equal(outcome?.run.status, "failed");
  assert.equal(outcome?.run.reason, "error");
  assert.equal(context.calls.execute.length, 0);
  assert.deepEqual(context.store.calls.failed, ["t1"]);
});

test("a proxy resolver failure is fail-closed: no executor call, failed/error", async () => {
  const { deps, calls, store } = makeDeps({ proxyThrows: true });

  const outcome = await runWindowPingTarget("t1", "scheduled", deps, () => NOW_MS);

  assert.equal(outcome?.run.status, "failed");
  assert.equal(outcome?.run.reason, "error");
  assert.equal(calls.execute.length, 0);
  assert.equal(calls.saveCallLog.length, 0);
  assert.deepEqual(store.calls.failed, ["t1"]);
});

test("the executor re-checks the lease before dispatch", async () => {
  const calls = [];
  const deps = {
    getExecutor: async () => ({
      execute: async (input) => {
        calls.push(input);
        return { response: { ok: true, status: 200, text: async () => COMPLETED_SSE } };
      },
    }),
    saveCallLog: async () => {},
    isConnectionUnavailableToAuxiliaryActivity: async () => true,
  };
  const result = await executeQuotaWindowPing(
    {
      target: makeTarget(),
      descriptor: getQuotaWindowDescriptor("codex:session"),
      connection: makeConnection(),
      pingModel: "gpt-5.1-codex",
      signal: new AbortController().signal,
    },
    deps
  );
  assert.equal(result.status, "skipped");
  assert.equal(result.reason, "exclusive_lease");
  assert.equal(calls.length, 0);
});

test("timeout aborts the request and reports timeout", async () => {
  const controller = new AbortController();
  let executed = 0;
  const callLogs = [];
  const deps = {
    getExecutor: async () => ({
      execute: async ({ signal }) => {
        executed += 1;
        await new Promise((_resolve, reject) => {
          if (signal.aborted) return reject(new Error("aborted"));
          signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
        });
      },
    }),
    saveCallLog: async (entry, metadataOnly) => {
      callLogs.push({ entry, metadataOnly });
    },
    isConnectionUnavailableToAuxiliaryActivity: async () => false,
  };

  const pending = executeQuotaWindowPing(
    {
      target: makeTarget(),
      descriptor: getQuotaWindowDescriptor("codex:session"),
      connection: makeConnection(),
      pingModel: "gpt-5.1-codex",
      signal: controller.signal,
    },
    deps
  );
  setTimeout(() => controller.abort(), 5);
  const result = await pending;

  assert.equal(executed, 1);
  assert.equal(result.status, "failed");
  assert.equal(result.reason, "timeout");
  assert.equal(result.httpStatus, null);
  assert.equal(callLogs.length, 1);
  assert.equal(callLogs[0].entry.status, 0);
  assert.equal(callLogs[0].entry.requestType, "quota_window_ping");
});

test("the process map blocks a second same-process run of the same target", async () => {
  const store = makeStore([makeTarget()]);
  // Simulate a store that always grants a claim, so only the process map can stop
  // the second call (the real DB claim would already return in_flight).
  let seq = 500;
  store.claimWindowPingRun = (targetId, trigger, nowMs) => {
    const target = store.map.get(targetId);
    const run = makeRun({
      id: `forced-${++seq}`,
      targetId,
      connectionId: target.connectionId,
      descriptorId: target.descriptorId,
      windowId: target.windowId,
      trigger,
      status: "running",
      startedAt: iso(nowMs),
      leaseExpiresAt: nowMs + 75_000,
    });
    store.runs.push(run);
    return { kind: "claimed", claim: { run: { ...run }, target: { ...target } } };
  };

  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  const { deps, calls } = makeDeps({
    store,
    executeJob: async () => {
      await gate;
      return makeExecutorResult(COMPLETED_SSE);
    },
  });

  const first = runWindowPingTarget("t1", "scheduled", deps, () => NOW_MS);
  while (calls.execute.length === 0) await new Promise((resolve) => setTimeout(resolve, 0));

  const second = await runWindowPingTarget("t1", "scheduled", deps, () => NOW_MS);
  assert.equal(second?.run.status, "skipped");
  assert.equal(second?.run.reason, "in_flight");
  assert.equal(calls.execute.length, 1, "the second call sends no request");

  release();
  const firstOutcome = await first;
  assert.equal(firstOutcome?.run.status, "succeeded");
});

test("the same reset is executed once; a completed ping blocks the next run", async () => {
  const { deps, calls } = makeDeps();

  const first = await runWindowPingTarget("t1", "scheduled", deps, () => NOW_MS);
  assert.equal(first?.run.status, "succeeded");

  // Make the interval target due again without changing the reported reset.
  const target = deps.store.map.get("t1");
  target.nextRunAt = NOW_ISO;
  const second = await runWindowPingTarget("t1", "scheduled", deps, () => NOW_MS);

  assert.equal(second?.run.status, "skipped");
  assert.equal(second?.run.reason, "already_pinged_reset");
  assert.equal(calls.execute.length, 1);
  assert.equal(calls.saveCallLog.length, 1);
});

test("a lease recovered by another process during the pre-ping phase is not dispatched", async () => {
  const store = makeStore([makeTarget()]);
  // Another process recovered the claim while this one was still in the pre-ping phase.
  store.renewWindowPingRunLease = () => false;
  const { deps, calls } = makeDeps({ store });

  const outcome = await runWindowPingTarget("t1", "scheduled", deps, () => NOW_MS);

  assert.equal(outcome?.decision.reason, "in_flight");
  assert.equal(calls.execute.length, 0, "no second request for the same window");
  assert.equal(calls.saveCallLog.length, 0);
  assert.equal(calls.usageReads, 1);
});
