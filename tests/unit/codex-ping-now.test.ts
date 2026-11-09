/**
 * Manual "Ping now" for one Codex OAuth connection.
 *
 * The service is exercised with injected deps (no real DB, network or timers beyond a
 * short test timeout); the route is exercised against a throwaway DATA_DIR for the
 * paths that never reach upstream (auth, validation, not-found, unsupported, inactive).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codex-ping-now-"));
process.env.DATA_DIR = directory;
process.env.APP_LOG_TO_FILE = "false";

const { pingCodexAccountNow, createManualPingState } =
  await import("../../src/lib/services/quotaAutoPingManual.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/providers/[id]/ping/route.ts");

test.after(async () => {
  const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
  flushProxyLogsSync();
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

const COMPLETED_SSE =
  'event: response.completed\ndata: {"type":"response.completed","response":{"status":"completed"}}\n\n';
const RESET_AT = "2026-01-01T17:00:30.000Z";

type Conn = Record<string, unknown>;

function baseDeps(overrides: Record<string, unknown> = {}, connection: Conn | null = null) {
  const calls = {
    execute: [] as Record<string, unknown>[],
    update: [] as [string, Record<string, unknown>][],
    usage: 0,
  };
  const row: Conn | null =
    connection === null
      ? {
          id: "codex-1",
          provider: "codex",
          authType: "oauth",
          isActive: true,
          accessToken: "token",
        }
      : connection;
  const deps = {
    getSettings: async () => ({}),
    getProviderConnections: async () => [],
    getProviderConnectionById: async (id: string) => (row && row.id === id ? row : null),
    updateProviderConnection: async (id: string, data: Record<string, unknown>) => {
      calls.update.push([id, data]);
      return null;
    },
    refreshAndUpdateCredentials: async (c: Conn) => ({ connection: c }),
    getCodexUsage: async () => {
      calls.usage += 1;
      return { quotas: { session: { used: 1, total: 100, remaining: 99, resetAt: RESET_AT } } };
    },
    throttleQuotaFetch: async () => {},
    resolveProxyForConnection: async () => ({ proxy: null }),
    runWithProxyContext: async (_proxy: unknown, callback: () => Promise<unknown>) => callback(),
    getExecutor: async () => ({
      execute: async (input: Record<string, unknown>) => {
        calls.execute.push(input);
        return { response: { ok: true, text: async () => COMPLETED_SSE } };
      },
    }),
    canExecuteProvider: () => true,
    isConnectionUnavailableToAuxiliaryActivity: async () => false,
    resolvePingModel: async () => "gpt-test-codex",
    ...overrides,
  };
  // The fixture only fakes what the service touches; cast once at the boundary.
  return { deps: deps as unknown as Parameters<typeof pingCodexAccountNow>[1], calls };
}

test("ping now sends one Codex ping immediately, without auto-ping opt-in or a prior reset", async () => {
  const { deps, calls } = baseDeps();
  const result = await pingCodexAccountNow("codex-1", deps, createManualPingState());
  assert.deepEqual(result, { status: "succeeded", reason: "completed" });
  assert.equal(calls.execute.length, 1);
  assert.equal(calls.execute[0].model, "gpt-test-codex");
  assert.ok(calls.execute[0].signal instanceof AbortSignal, "the ping carries an abort signal");
  assert.equal(calls.update.length, 1);
  assert.equal(calls.update[0][0], "codex-1");
  assert.equal(typeof calls.update[0][1].lastPingAt, "string");
  // Recording the window key keeps the opt-in scheduler from re-pinging the same window.
  assert.equal(calls.update[0][1].lastPingedResetKey, "2026-01-01T17:00:00.000Z");
});

test("ping now reports failed when the 200 stream never carries response.completed", async () => {
  const { deps, calls } = baseDeps({
    getExecutor: async () => ({
      execute: async () => ({
        response: {
          ok: true,
          text: async () => 'data: {"type":"error","message":"private upstream detail"}\n\n',
        },
      }),
    }),
  });
  const result = await pingCodexAccountNow("codex-1", deps, createManualPingState());
  assert.deepEqual(result, { status: "failed", reason: "not_completed" });
  assert.equal(calls.update.length, 0);
});

test("ping now skips without sending when the session or a blocking quota is exhausted", async () => {
  for (const quotas of [
    { session: { remaining: 0, resetAt: RESET_AT } },
    { session: { remaining: 50, resetAt: RESET_AT }, weekly: { remaining: 0 } },
  ]) {
    const { deps, calls } = baseDeps({ getCodexUsage: async () => ({ quotas }) });
    const result = await pingCodexAccountNow("codex-1", deps, createManualPingState());
    assert.deepEqual(result, { status: "skipped", reason: "quota_exhausted" });
    assert.equal(calls.execute.length, 0);
  }
});

test("ping now skips when the usage read has no session quota", async () => {
  const { deps, calls } = baseDeps({ getCodexUsage: async () => ({ message: "unavailable" }) });
  const result = await pingCodexAccountNow("codex-1", deps, createManualPingState());
  assert.deepEqual(result, { status: "skipped", reason: "quota_unavailable" });
  assert.equal(calls.execute.length, 0);
});

test("ping now rejects missing, non-Codex, non-OAuth and inactive connections before any I/O", async () => {
  const cases: [Conn | null, string, string][] = [
    [null, "missing", "not_found"],
    [{ id: "c", provider: "claude", authType: "oauth", isActive: true }, "c", "unsupported"],
    [{ id: "c", provider: "codex", authType: "apikey", isActive: true }, "c", "unsupported"],
    [{ id: "c", provider: "codex", authType: "oauth", isActive: false }, "c", "inactive"],
  ];
  for (const [connection, id, reason] of cases) {
    const { deps, calls } = baseDeps(
      {},
      connection ?? { id: "other", provider: "codex", authType: "oauth" }
    );
    const result = await pingCodexAccountNow(id, deps, createManualPingState());
    assert.deepEqual(result, { status: "skipped", reason });
    assert.equal(calls.usage, 0);
    assert.equal(calls.execute.length, 0);
  }
});

test("ping now honours exclusive leases and the provider circuit breaker", async () => {
  for (const overrides of [
    { isConnectionUnavailableToAuxiliaryActivity: async () => true },
    { canExecuteProvider: () => false },
  ]) {
    const { deps, calls } = baseDeps(overrides);
    const result = await pingCodexAccountNow("codex-1", deps, createManualPingState());
    assert.deepEqual(result, { status: "skipped", reason: "unavailable" });
    assert.equal(calls.usage, 0);
  }
});

test("ping now skips when no ping model is selectable", async () => {
  const { deps, calls } = baseDeps({ resolvePingModel: async () => null });
  const result = await pingCodexAccountNow("codex-1", deps, createManualPingState());
  assert.deepEqual(result, { status: "skipped", reason: "no_model" });
  assert.equal(calls.usage, 0);
});

test("ping now rejects an overlapping ping for the same account", async () => {
  const state = createManualPingState();
  state.inFlight.add("codex-1");
  const { deps, calls } = baseDeps();
  const result = await pingCodexAccountNow("codex-1", deps, state);
  assert.deepEqual(result, { status: "skipped", reason: "busy" });
  assert.equal(calls.usage, 0);
});

test("ping now gives up with a timeout and releases the account lock", async () => {
  const state = createManualPingState();
  const { deps } = baseDeps({
    getExecutor: async () => ({ execute: () => new Promise(() => {}) }),
  });
  const result = await pingCodexAccountNow("codex-1", deps, state, { timeoutMs: 20 });
  assert.deepEqual(result, { status: "failed", reason: "timeout" });
  assert.equal(state.inFlight.has("codex-1"), false);
});

test("ping now maps a thrown upstream error to a fixed reason without leaking it", async () => {
  const state = createManualPingState();
  const { deps } = baseDeps({
    getCodexUsage: async () => {
      throw new Error("boom at /secret/path.ts:1:1");
    },
  });
  const result = await pingCodexAccountNow("codex-1", deps, state);
  assert.deepEqual(result, { status: "failed", reason: "error" });
  assert.equal(JSON.stringify(result).includes("/secret"), false);
  assert.equal(state.inFlight.has("codex-1"), false);
});

test("ping now reports a failed credential refresh as auth_failed", async () => {
  const { deps, calls } = baseDeps({
    refreshAndUpdateCredentials: async () => {
      throw new Error("refresh token revoked");
    },
  });
  const result = await pingCodexAccountNow("codex-1", deps, createManualPingState());
  assert.deepEqual(result, { status: "failed", reason: "auth_failed" });
  assert.equal(calls.usage, 0);
});

// --- route ------------------------------------------------------------------

const context = (id: string) => ({ params: Promise.resolve({ id }) });
const pingRequest = (id: string) =>
  makeManagementSessionRequest(`http://localhost/api/providers/${id}/ping`, { method: "POST" });

test("POST /api/providers/[id]/ping requires management authentication", async () => {
  await settingsDb.updateSettings({ requireLogin: true, password: "test" });
  const response = await route.POST(
    new Request("http://localhost/api/providers/missing/ping", { method: "POST" }),
    context("missing")
  );
  assert.equal(response.status, 401);
});

test("POST /api/providers/[id]/ping validates the id and returns 404 for an unknown one", async () => {
  const invalid = await route.POST(await pingRequest("bad id!"), context("bad id!"));
  assert.equal(invalid.status, 400);
  const missing = await route.POST(await pingRequest("missing"), context("missing"));
  assert.equal(missing.status, 404);
  const body = await missing.json();
  assert.equal(body.reason, "not_found");
  assert.equal(String(body.error?.message ?? "").includes("at /"), false);
});

test("POST /api/providers/[id]/ping rejects non-Codex connections and skips inactive ones", async () => {
  const apiKey = await db.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-ping-now-test",
    isActive: true,
  });
  const unsupported = await route.POST(await pingRequest(apiKey.id), context(apiKey.id));
  assert.equal(unsupported.status, 400);
  assert.equal((await unsupported.json()).reason, "unsupported");

  const inactive = await db.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    accessToken: "token",
    email: "ping-now@example.com",
    isActive: false,
  });
  const skipped = await route.POST(await pingRequest(inactive.id), context(inactive.id));
  assert.equal(skipped.status, 200);
  assert.deepEqual(await skipped.json(), { status: "skipped", reason: "inactive" });
});
