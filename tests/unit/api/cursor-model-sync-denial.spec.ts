import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setImmediate as yieldIo } from "node:timers/promises";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";

const boundaries = vi.hoisted(() => ({
  cli: vi.fn(async () => [{ id: "gpt-5.3-codex", name: "Codex 5.3", owned_by: "cursor" }]),
  provider: vi.fn(),
}));
vi.mock("@/lib/providerModels/cursorAgent", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/providerModels/cursorAgent")>()),
  fetchCursorAgentModels: boundaries.cli,
}));
vi.mock("@/shared/network/safeOutboundFetch", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/shared/network/safeOutboundFetch")>()),
  safeOutboundFetch: boundaries.provider,
}));
vi.mock("@/lib/usage/callLogs", () => ({ saveCallLog: vi.fn(async () => undefined) }));
vi.mock("@/lib/cli-helper/codexProfileAutoSync", () => ({
  autoSyncCodexProfilesFromLiveCatalog: vi.fn(async () => ({ ok: false, reason: "fixture" })),
}));
vi.mock("@/lib/cli-helper/claudeProfileAutoSync", () => ({
  autoSyncClaudeProfilesFromLiveCatalog: vi.fn(async () => ({ ok: false, reason: "fixture" })),
}));

const dataDir = mkdtempSync(join(tmpdir(), "cursor-sync-denial-"));
const originalEnv = {
  DATA_DIR: process.env.DATA_DIR,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  OMNIROUTE_INTERNAL_SCHEME: process.env.OMNIROUTE_INTERNAL_SCHEME,
  OMNIROUTE_BASE_PATH: process.env.OMNIROUTE_BASE_PATH,
};
process.env.DATA_DIR = dataDir;
process.env.INITIAL_PASSWORD = "isolated-cursor-denial-password";
delete process.env.OMNIROUTE_INTERNAL_SCHEME;
delete process.env.OMNIROUTE_BASE_PATH;

const core = await import("@/lib/db/core");
const providers = await import("@/lib/db/providers");
const models = await import("@/lib/db/models");
const settings = await import("@/lib/db/settings");
const modelSync = await import("@/shared/services/modelSyncScheduler");
const syncRoute = await import("@/app/api/providers/[id]/sync-models/route");
const modelsRoute = await import("@/app/api/providers/[id]/models/route");
const { managementPolicy } = await import("@/server/authz/policies/management");
const { classifyRoute } = await import("@/server/authz/classify");
const {
  AUTHZ_HEADER_PEER_LOCALITY,
  AUTHZ_TRUSTED_HEADERS,
  PEER_IP_HEADER,
  VIA_PROXY_HEADER,
  CLIENT_IP_HEADER,
} = await import("@/server/authz/headers");
const denyHeader = modelSync.MODEL_SYNC_LOCAL_SPAWN_DENIED_HEADER;
const authHeader = modelSync.getModelSyncInternalAuthHeaderName();
const originalFetch = globalThis.fetch;
type TransportMode = "http" | "readiness-down" | "network-down";
let transportMode: TransportMode;
let delegatedHeaders: Headers[];
let onFirstProbe: (() => void) | undefined;

// The fixture's peer supplies locality after all client-owned trusted-header claims are removed.
function request(path: string, method: string, locality: string, input: HeadersInit): Request {
  const headers = new Headers(input);
  for (const key of [
    ...AUTHZ_TRUSTED_HEADERS,
    PEER_IP_HEADER,
    VIA_PROXY_HEADER,
    CLIENT_IP_HEADER,
  ]) {
    headers.delete(key);
  }
  headers.set(AUTHZ_HEADER_PEER_LOCALITY, locality);
  return new Request(`http://localhost${path}`, { method, headers });
}

async function connection(withToken = false) {
  return providers.createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    name: "isolated deny-marker fixture",
    ...(withToken ? { accessToken: "fixture-cursor-session" } : {}),
  });
}

function sync(id: string, locality: string, headers = modelSync.buildModelSyncInternalHeaders()) {
  return syncRoute.POST(
    request(`/api/providers/${id}/sync-models?quiet=1`, "POST", locality, headers),
    { params: Promise.resolve({ id }) }
  );
}

async function throughTransport(mode: TransportMode, operation: () => Promise<Response>) {
  transportMode = mode;
  if (mode === "http") return operation();
  vi.useFakeTimers({ toFake: ["Date", "setTimeout", "clearTimeout"] });
  try {
    const firstProbe = new Promise<void>((resolve) => {
      onFirstProbe = resolve;
    });
    const result = operation();
    await firstProbe;
    await vi.advanceTimersByTimeAsync(31_000);
    return await result;
  } finally {
    onFirstProbe = undefined;
    vi.useRealTimers();
  }
}

beforeAll(async () => {
  await settings.updateSettings({ requireLogin: true });
});

beforeEach(async () => {
  boundaries.cli.mockClear();
  boundaries.provider
    .mockReset()
    .mockRejectedValue(new Error("fixture HTTP discovery unavailable"));
  await models.deleteSyncedAvailableModelsForProvider("cursor");
  syncRoute.__resetLoopbackReadinessForTests();
  transportMode = "http";
  delegatedHeaders = [];
  globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
    expect(url.origin).toBe(new URL(modelSync.getModelSyncInternalBaseUrl()).origin);
    if (url.pathname.includes("__readiness_probe__")) {
      onFirstProbe?.();
      if (transportMode === "readiness-down") throw new TypeError("fixture ECONNREFUSED");
      return new Response(null, { status: 404 });
    }
    if (transportMode === "network-down") throw new TypeError("fixture fetch failed");
    const headers = new Headers(init?.headers);
    expect(headers.has(AUTHZ_HEADER_PEER_LOCALITY)).toBe(false);
    delegatedHeaders.push(headers);
    const inner = request(url.pathname + url.search, "GET", "loopback", headers);
    expect(modelSync.isModelSyncInternalRequest(inner)).toBe(true);
    return modelsRoute.GET(inner, { params: { id: url.pathname.split("/").at(-2) ?? "" } });
  }) as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.useRealTimers();
});

afterAll(async () => {
  // Drain queued catalog notifications before closing and deleting the fixture database.
  await import("@/lib/db/quotaPools");
  await yieldIo();
  core.resetDbInstance();
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  rmSync(dataDir, { recursive: true, force: true });
});

describe("authenticated deny-only model-sync context", () => {
  test("default internal headers preserve the existing scheduler contract", () => {
    const headers = modelSync.buildModelSyncInternalHeaders();
    expect(Object.keys(headers)).toEqual([authHeader]);
    expect(modelSync.buildModelSyncInternalHeaders({ denyLocalSpawn: false })).toEqual(headers);
    expect(modelSync.isModelSyncInternalRequest({ headers: new Headers(headers) })).toBe(true);
    expect(modelSync.isModelSyncLocalSpawnDenied({ headers: new Headers(headers) })).toBe(false);
  });

  test("the deny marker is interpreted only with a valid internal token", () => {
    const denied = modelSync.buildModelSyncInternalHeaders({ denyLocalSpawn: true });
    expect(new Headers(denied).get(denyHeader)).toBe("1");
    expect(modelSync.isModelSyncLocalSpawnDenied({ headers: new Headers(denied) })).toBe(true);
    for (const token of [undefined, "invalid-token"]) {
      const headers = new Headers({ [denyHeader]: "1" });
      if (token) headers.set(authHeader, token);
      expect(modelSync.isModelSyncLocalSpawnDenied({ headers })).toBe(false);
    }
  });

  for (const mode of ["http", "readiness-down", "network-down"] as const) {
    test(`a valid inherited denial survives local delegation through ${mode}`, async () => {
      const conn = await connection();
      const response = await throughTransport(mode, () =>
        sync(conn.id, "loopback", modelSync.buildModelSyncInternalHeaders({ denyLocalSpawn: true }))
      );
      expect(response.status).toBe(502);
      expect(boundaries.cli).not.toHaveBeenCalled();
      if (mode === "http") expect(delegatedHeaders[0].get(denyHeader)).toBe("1");
    });
  }

  for (const value of ["0", "false", "allow"]) {
    test(`a client marker value of ${value} cannot authorize remote CLI discovery`, async () => {
      const conn = await connection();
      const response = await sync(conn.id, "remote", {
        ...modelSync.buildModelSyncInternalHeaders(),
        [denyHeader]: value,
        [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
        host: "127.0.0.1",
        "x-forwarded-for": "127.0.0.1",
      });
      expect(response.status).toBe(502);
      expect(delegatedHeaders[0].get(denyHeader)).toBe("1");
      expect(boundaries.cli).not.toHaveBeenCalled();
    });
  }

  test("an internal token and forged allow value alone cannot authorize direct remote models", async () => {
    const conn = await connection();
    const response = await modelsRoute.GET(
      request(`/api/providers/${conn.id}/models?refresh=true`, "GET", "remote", {
        ...modelSync.buildModelSyncInternalHeaders(),
        [denyHeader]: "allow",
        [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
      }),
      { params: { id: conn.id } }
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ source: "local_catalog" });
    expect(boundaries.cli).not.toHaveBeenCalled();
  });

  test("the real policy rejects an invalid token carrying forged allow and locality", async () => {
    const conn = await connection();
    const path = `/api/providers/${conn.id}/models`;
    const incoming = request(path, "GET", "remote", {
      [authHeader]: "invalid-token",
      [denyHeader]: "allow",
      [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
      [PEER_IP_HEADER]: "forged|127.0.0.1",
    });
    const decision = await managementPolicy.evaluate({
      request: {
        method: incoming.method,
        headers: incoming.headers,
        url: incoming.url,
        socket: { remoteAddress: "203.0.113.8" },
      },
      classification: classifyRoute(path, "GET"),
      requestId: "cursor-denial-fixture",
    });
    expect(decision).toMatchObject({ allow: false, status: 401 });
    expect(boundaries.cli).not.toHaveBeenCalled();
  });

  test("sync rejects invalid internal authentication before creating a delegated token", async () => {
    const conn = await connection();
    const response = await sync(conn.id, "loopback", {
      [authHeader]: "invalid-token",
      [denyHeader]: "allow",
    });
    expect(response.status).toBe(401);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(boundaries.cli).not.toHaveBeenCalled();
  });

  test("a no-options internal local request retains direct CLI discovery", async () => {
    const conn = await connection();
    const response = await modelsRoute.GET(
      request(
        `/api/providers/${conn.id}/models?refresh=true`,
        "GET",
        "loopback",
        modelSync.buildModelSyncInternalHeaders()
      ),
      { params: { id: conn.id } }
    );
    expect(response.status).toBe(200);
    expect(boundaries.cli).toHaveBeenCalledTimes(1);
  });

  test("an authenticated denial still permits successful HTTP model discovery", async () => {
    const conn = await connection(true);
    boundaries.provider.mockResolvedValue(
      Response.json({
        models: [{ name: "gpt-5.3-codex", displayName: "Codex 5.3" }],
      })
    );
    const response = await sync(
      conn.id,
      "loopback",
      modelSync.buildModelSyncInternalHeaders({ denyLocalSpawn: true })
    );
    expect(response.status).toBe(200);
    expect(boundaries.provider).toHaveBeenCalledTimes(1);
    expect(boundaries.cli).not.toHaveBeenCalled();
  });
});
