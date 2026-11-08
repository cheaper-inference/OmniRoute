import { EventEmitter } from "node:events";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { PassThrough } from "node:stream";
import { setImmediate as yieldIo } from "node:timers/promises";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";

const processBoundary = vi.hoisted(() => ({
  spawn: vi.fn(),
  unexpected: vi.fn(() => {
    throw new Error("unexpected subprocess in Cursor locality fixture");
  }),
}));

vi.mock("node:child_process", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:child_process")>();
  const replacements = {
    spawn: processBoundary.spawn,
    spawnSync: processBoundary.unexpected,
    exec: processBoundary.unexpected,
    execSync: processBoundary.unexpected,
    execFile: processBoundary.unexpected,
    execFileSync: processBoundary.unexpected,
    fork: processBoundary.unexpected,
  };
  return { ...actual, ...replacements, default: { ...actual, ...replacements } };
});

const providerBoundary = vi.hoisted(() => ({ fetch: vi.fn() }));
vi.mock("@/shared/network/safeOutboundFetch", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/shared/network/safeOutboundFetch")>()),
  safeOutboundFetch: providerBoundary.fetch,
}));
vi.mock("@/lib/usage/callLogs", () => ({ saveCallLog: vi.fn(async () => undefined) }));
vi.mock("@/lib/cli-helper/codexProfileAutoSync", () => ({
  autoSyncCodexProfilesFromLiveCatalog: vi.fn(async () => ({ ok: false, reason: "fixture" })),
}));
vi.mock("@/lib/cli-helper/claudeProfileAutoSync", () => ({
  autoSyncClaudeProfilesFromLiveCatalog: vi.fn(async () => ({ ok: false, reason: "fixture" })),
}));

// Set the isolated data directory before every application import. The fake binary is only a
// resolver fixture: the early child_process mock above intercepts its execution.
const dataDir = mkdtempSync(join(tmpdir(), "cursor-sync-locality-"));
const originalEnv = {
  DATA_DIR: process.env.DATA_DIR,
  PATH: process.env.PATH,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  OMNIROUTE_INTERNAL_SCHEME: process.env.OMNIROUTE_INTERNAL_SCHEME,
  OMNIROUTE_BASE_PATH: process.env.OMNIROUTE_BASE_PATH,
};
process.env.DATA_DIR = dataDir;
process.env.PATH = dataDir;
process.env.JWT_SECRET = "cursor-locality-isolated-session-secret";
process.env.INITIAL_PASSWORD = "cursor-locality-isolated-password";
delete process.env.OMNIROUTE_INTERNAL_SCHEME;
delete process.env.OMNIROUTE_BASE_PATH;
const fakeBinary = join(dataDir, "cursor-agent");
writeFileSync(fakeBinary, "fixture only; never execute\n");

const core = await import("@/lib/db/core");
const providers = await import("@/lib/db/providers");
const models = await import("@/lib/db/models");
const settings = await import("@/lib/db/settings");
const modelSync = await import("@/shared/services/modelSyncScheduler");
const syncRoute = await import("@/app/api/providers/[id]/sync-models/route");
const modelsRoute = await import("@/app/api/providers/[id]/models/route");
const { resolveCursorAgentBinary } = await import("@/lib/providerModels/cursorAgent");
const { managementPolicy } = await import("@/server/authz/policies/management");
const { classifyRoute } = await import("@/server/authz/classify");
const {
  AUTHZ_HEADER_PEER_LOCALITY,
  AUTHZ_TRUSTED_HEADERS,
  PEER_IP_HEADER,
  VIA_PROXY_HEADER,
  CLIENT_IP_HEADER,
} = await import("@/server/authz/headers");
const { mintDashboardSessionToken } = await import("@/shared/utils/dashboardSessionToken");

type Locality = "loopback" | "lan" | "remote" | "unrecognized" | undefined;
type TransportMode = "http" | "readiness-down" | "network-down" | "http-error";
type CatalogBody = {
  source?: string;
  warning?: string;
  error?: unknown;
  ok?: boolean;
  models?: Array<{ id: string }>;
};
const originalFetch = globalThis.fetch;
let sessionCookie: string;
let transportMode: TransportMode;
let readinessCalls: number;
let modelHttpCalls: number;
let innerRequests: Request[];
let innerBodies: CatalogBody[];
let onReadinessProbe: (() => void) | undefined;

function childWithCatalog() {
  const child = new EventEmitter();
  const stdout = new PassThrough();
  const stderr = new PassThrough();
  const result = Object.assign(child, { stdout, stderr, kill: vi.fn() });
  queueMicrotask(() => {
    stdout.write("Available models\n\nauto - Auto\ngpt-5.3-codex - Codex 5.3\n");
    child.emit("close", 0, null);
  });
  return result;
}

// Handler fixture for the ingress pipeline contract: delete ALL trusted client claims and
// transport-only peer stamps, then stamp only the actual fixture peer verdict. No Host,
// forwarded header, cookie or internal token can supply that verdict.
function ingressRequest(
  url: string,
  method: string,
  peerLocality: Locality,
  clientHeaders: HeadersInit = {}
): Request {
  const headers = new Headers(clientHeaders);
  for (const name of [
    ...AUTHZ_TRUSTED_HEADERS,
    PEER_IP_HEADER,
    VIA_PROXY_HEADER,
    CLIENT_IP_HEADER,
  ]) {
    headers.delete(name);
  }
  if (peerLocality !== undefined) headers.set(AUTHZ_HEADER_PEER_LOCALITY, peerLocality);
  return new Request(url, { method, headers });
}

async function policyDecision(request: Request, peerIp = "203.0.113.8") {
  return managementPolicy.evaluate({
    request: {
      method: request.method,
      headers: request.headers,
      url: request.url,
      socket: { remoteAddress: peerIp },
    },
    classification: classifyRoute(new URL(request.url).pathname, request.method),
    requestId: "cursor-locality-fixture",
  });
}

async function connection(
  options: {
    provider?: "cursor" | "cursor-api";
    autoFetchModels?: boolean;
    withToken?: boolean;
  } = {}
) {
  return providers.createProviderConnection({
    provider: options.provider ?? "cursor",
    authType: "oauth",
    name: "isolated Cursor locality fixture",
    isActive: true,
    ...(options.withToken ? { accessToken: "fixture-cursor-session" } : {}),
    providerSpecificData: { autoFetchModels: options.autoFetchModels ?? true },
  });
}

async function sync(id: string, locality: Locality, headers: HeadersInit = {}) {
  const request = ingressRequest(
    `https://management.invalid/api/providers/${id}/sync-models?quiet=1`,
    "POST",
    locality,
    { cookie: sessionCookie, ...Object.fromEntries(new Headers(headers)) }
  );
  const decision = await policyDecision(request, locality === "loopback" ? "127.0.0.1" : undefined);
  expect(decision.allow).toBe(true);
  return syncRoute.POST(request, { params: Promise.resolve({ id }) });
}

function directModels(id: string, locality: Locality, refresh = true) {
  return modelsRoute.GET(
    ingressRequest(
      `https://management.invalid/api/providers/${id}/models?refresh=${refresh}`,
      "GET",
      locality,
      { cookie: sessionCookie }
    ),
    { params: { id } }
  );
}

function expectCliProbe() {
  expect(processBoundary.spawn).toHaveBeenCalledTimes(1);
  const binary = resolveCursorAgentBinary();
  expect(basename(binary ?? "")).toBe("cursor-agent");
  expect(processBoundary.spawn).toHaveBeenCalledWith(binary, ["--list-models"], {
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function withFailedTransport<T>(
  mode: TransportMode,
  operation: () => Promise<T>
): Promise<T> {
  transportMode = mode;
  vi.useFakeTimers({ toFake: ["Date", "setTimeout", "clearTimeout"] });
  try {
    const firstProbe = new Promise<void>((resolve) => {
      onReadinessProbe = resolve;
    });
    const result = operation();
    // Session verification uses real WebCrypto I/O. Start virtual time only after
    // authentication has completed and the first transport probe actually began.
    await firstProbe;
    await vi.advanceTimersByTimeAsync(31_000);
    return await result;
  } finally {
    onReadinessProbe = undefined;
    vi.useRealTimers();
  }
}

beforeAll(async () => {
  await settings.updateSettings({ requireLogin: true });
  sessionCookie = `auth_token=${await mintDashboardSessionToken(
    new TextEncoder().encode(process.env.JWT_SECRET)
  )}`;
});

beforeEach(async () => {
  processBoundary.spawn.mockReset().mockImplementation(childWithCatalog);
  processBoundary.unexpected.mockClear();
  providerBoundary.fetch.mockReset().mockImplementation(async () => {
    throw new Error("fixture AvailableModels unavailable");
  });
  await models.deleteSyncedAvailableModelsForProvider("cursor");
  await models.deleteSyncedAvailableModelsForProvider("cursor-api");
  syncRoute.__resetLoopbackReadinessForTests();
  transportMode = "http";
  readinessCalls = 0;
  modelHttpCalls = 0;
  innerRequests = [];
  innerBodies = [];
  globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
    expect(url.origin).toBe(new URL(modelSync.getModelSyncInternalBaseUrl()).origin);
    expect(init?.redirect).toBe("error");
    if (url.pathname.includes("__readiness_probe__")) {
      readinessCalls++;
      onReadinessProbe?.();
      if (transportMode === "readiness-down") throw new TypeError("fixture ECONNREFUSED");
      return new Response(null, { status: 404 });
    }
    modelHttpCalls++;
    if (transportMode === "network-down") throw new TypeError("fixture fetch failed");
    if (transportMode === "http-error")
      return Response.json({ error: "fixture HTTP failure" }, { status: 503 });
    expect(url.searchParams.get("refresh")).toBe("true");
    expect(url.searchParams.get("excludeCustom")).toBe("true");
    // The self-fetch's TCP peer is loopback regardless of the original caller.
    const inner = ingressRequest(url.href, init?.method ?? "GET", "loopback", init?.headers);
    expect(modelSync.isModelSyncInternalRequest(inner)).toBe(true);
    expect((await policyDecision(inner, "127.0.0.1")).allow).toBe(true);
    innerRequests.push(inner);
    const id = decodeURIComponent(url.pathname.split("/").at(-2) ?? "");
    const response = await modelsRoute.GET(inner, { params: { id } });
    innerBodies.push((await response.clone().json()) as CatalogBody);
    return response;
  }) as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.useRealTimers();
  expect(processBoundary.unexpected).not.toHaveBeenCalled();
});

afterAll(async () => {
  await import("@/lib/db/quotaPools");
  await yieldIo();
  core.resetDbInstance();
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  rmSync(dataDir, { recursive: true, force: true });
});

describe("Cursor model-sync preserves the original local-execution permission", () => {
  for (const locality of ["remote", "lan", undefined, "unrecognized"] as const) {
    test(`HTTP delegation refuses CLI discovery from ${String(locality)} origin`, async () => {
      const conn = await connection();
      await sync(conn.id, locality);
      expect(modelHttpCalls).toBe(1);
      expect(innerRequests[0].headers.get(AUTHZ_HEADER_PEER_LOCALITY)).toBe("loopback");
      expect(processBoundary.spawn).not.toHaveBeenCalled();
    });
  }

  test("sync refresh cannot turn autoFetchModels:false into remote CLI permission", async () => {
    const conn = await connection({ autoFetchModels: false });
    await sync(conn.id, "remote");
    expect(modelHttpCalls).toBe(1);
    expect(processBoundary.spawn).not.toHaveBeenCalled();
  });

  test("failed HTTP discovery cannot grant a remote caller CLI permission", async () => {
    const conn = await connection({ withToken: true });
    await sync(conn.id, "remote");
    expect(providerBoundary.fetch).toHaveBeenCalledTimes(1);
    expect(processBoundary.spawn).not.toHaveBeenCalled();
  });

  test("local HTTP sync reaches the real Cursor CLI helper", async () => {
    const conn = await connection();
    const response = await sync(conn.id, "loopback");
    expect(response.status).toBe(200);
    expect(innerBodies[0].source).toBe("api");
    expectCliProbe();
  });

  test("intentional scheduler sync retains CLI discovery", async () => {
    const conn = await connection();
    const internal = modelSync.buildModelSyncInternalHeaders();
    expect(modelSync.isModelSyncInternalRequest({ headers: new Headers(internal) })).toBe(true);
    const response = await sync(conn.id, "loopback", { ...internal, cookie: "" });
    expect(response.status).toBe(200);
    expectCliProbe();
  });

  for (const mode of ["readiness-down", "network-down"] as const) {
    for (const locality of mode === "readiness-down"
      ? (["remote", "lan", undefined, "unrecognized", "loopback"] as const)
      : (["remote", "loopback"] as const)) {
      test(`${mode} in-process fallback preserves ${locality} permission`, async () => {
        const conn = await connection();
        const response = await withFailedTransport(mode, () => sync(conn.id, locality));
        expect(innerRequests).toHaveLength(0);
        expect(modelHttpCalls).toBe(mode === "network-down" ? 3 : 0);
        expect(readinessCalls).toBe(mode === "network-down" ? 1 : 120);
        if (locality === "loopback") {
          expectCliProbe();
          expect(response.status).toBe(200);
        } else {
          expect(processBoundary.spawn).not.toHaveBeenCalled();
          expect(response.status).toBe(502);
        }
      });
    }

    test(`${mode} preserves intentional internal scheduler permission`, async () => {
      const conn = await connection();
      const response = await withFailedTransport(mode, () =>
        sync(conn.id, "loopback", { ...modelSync.buildModelSyncInternalHeaders(), cookie: "" })
      );
      expectCliProbe();
      expect(response.status).toBe(200);
    });
  }

  test("an HTTP error is returned without retrying or invoking the in-process fallback", async () => {
    const conn = await connection();
    transportMode = "http-error";
    const response = await sync(conn.id, "loopback");
    expect(response.status).toBe(503);
    expect(modelHttpCalls).toBe(1);
    expect(processBoundary.spawn).not.toHaveBeenCalled();
  });

  test("client-supplied trusted locality and forwarded loopback claims cannot grant permission", async () => {
    const conn = await connection();
    await sync(conn.id, "remote", {
      host: "localhost",
      "x-forwarded-for": "127.0.0.1",
      [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
      [PEER_IP_HEADER]: "forged|127.0.0.1",
      [VIA_PROXY_HEADER]: "forged|0",
    });
    expect(processBoundary.spawn).not.toHaveBeenCalled();
  });

  for (const suffix of ["models", "sync-models"]) {
    test(`real management policy rejects invalid internal auth for ${suffix} when login is enabled`, async () => {
      modelSync.buildModelSyncInternalHeaders();
      const request = ingressRequest(
        `http://localhost/api/providers/fixture/${suffix}`,
        suffix === "models" ? "GET" : "POST",
        "remote",
        {
          [modelSync.getModelSyncInternalAuthHeaderName()]: "invalid-token",
          [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
          "x-omniroute-auth-kind": "management_key",
          "x-omniroute-auth-id": "model-sync",
          [PEER_IP_HEADER]: "forged|127.0.0.1",
        }
      );
      expect(modelSync.isModelSyncInternalRequest(request)).toBe(false);
      expect(await policyDecision(request)).toMatchObject({ allow: false, status: 401 });
      expect(processBoundary.spawn).not.toHaveBeenCalled();
    });
  }

  test("an invalid internal token alongside a valid dashboard session cannot grant CLI permission", async () => {
    const conn = await connection();
    await sync(conn.id, "remote", {
      [modelSync.getModelSyncInternalAuthHeaderName()]: "invalid-token",
    });
    expect(processBoundary.spawn).not.toHaveBeenCalled();
  });

  for (const locality of ["remote", "lan", undefined, "unrecognized"] as const) {
    test(`direct models gate refuses CLI from ${String(locality)}`, async () => {
      const conn = await connection();
      const response = await directModels(conn.id, locality);
      const body = (await response.json()) as CatalogBody;
      expect(response.status).toBe(200);
      expect(body.source).toBe("local_catalog");
      expect(body.warning).toMatch(/requires a local request/);
      expect(processBoundary.spawn).not.toHaveBeenCalled();
    });
  }

  test("direct local models discovery reaches the actual subprocess boundary", async () => {
    const conn = await connection();
    const response = await directModels(conn.id, "loopback");
    expect(response.status).toBe(200);
    expectCliProbe();
  });

  test("remote sync still accepts successful HTTP discovery", async () => {
    const conn = await connection({ withToken: true });
    providerBoundary.fetch.mockResolvedValue(
      Response.json({
        models: [{ name: "gpt-5.3-codex", displayName: "Codex 5.3" }],
      })
    );
    const response = await sync(conn.id, "remote");
    expect(response.status).toBe(200);
    expect((await response.json()) as CatalogBody).toMatchObject({ ok: true });
    expect(innerBodies[0]).toMatchObject({ source: "api" });
    expect(providerBoundary.fetch).toHaveBeenCalledTimes(1);
    expect(processBoundary.spawn).not.toHaveBeenCalled();
  });

  test("remote direct refresh keeps the cached catalog when HTTP discovery fails", async () => {
    const conn = await connection({ withToken: true });
    await models.replaceSyncedAvailableModelsForConnection("cursor", conn.id, [
      { id: "gpt-5.3-codex", name: "Cached Codex" },
    ]);
    const response = await directModels(conn.id, "remote");
    const body = (await response.json()) as CatalogBody;
    expect(response.status).toBe(200);
    expect(body.source).toBe("cache");
    expect(body.models?.some((entry) => entry.id === "gpt-5.3-codex")).toBe(true);
    expect(processBoundary.spawn).not.toHaveBeenCalled();
  });

  test("remote direct request honors disabled auto-fetch without probing", async () => {
    const conn = await connection({ autoFetchModels: false, withToken: true });
    const response = await directModels(conn.id, "remote", false);
    expect(response.status).toBe(200);
    expect(providerBoundary.fetch).not.toHaveBeenCalled();
    expect(processBoundary.spawn).not.toHaveBeenCalled();
  });

  test("cursor-api never borrows the host CLI catalog, including local sync", async () => {
    const conn = await connection({ provider: "cursor-api", withToken: true });
    await sync(conn.id, "loopback");
    expect(providerBoundary.fetch).toHaveBeenCalledTimes(1);
    expect(processBoundary.spawn).not.toHaveBeenCalled();
  });
});
