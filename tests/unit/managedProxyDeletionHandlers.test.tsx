// @vitest-environment node
import { beforeEach, expect, test, vi } from "vitest";
import { assertManagedFixture } from "../_setup/managedProxyFixture.mjs";
assertManagedFixture();
const state = vi.hoisted(() => ({
  login: true,
  dashboard: false,
  removed: [] as string[],
  committed: [] as Array<{ id: string; force: boolean }>,
  cacheClears: 0,
}));
vi.mock("@/shared/utils/apiAuth", () => ({
  isAuthRequired: async () => state.login,
  isDashboardSessionAuthenticated: async () => state.dashboard,
}));
vi.mock("@/sse/services/auth", () => ({
  extractApiKey: () => null,
  isValidApiKey: async () => false,
}));
vi.mock("@/lib/db/apiKeys", () => ({ getApiKeyMetadata: async () => null }));
vi.mock("@/lib/db/accessTokens", () => ({
  verifyAccessToken: (token: string) =>
    token === "oma_fixture_write" ? { id: "fixture", name: "fixture", scope: "write" } : null,
}));
vi.mock("@/lib/middleware/cliTokenAuth", () => ({ isCliTokenAuthValid: async () => false }));
vi.mock("@/lib/api/internalServiceAuth", () => ({
  isTrustedLoopbackInternalServiceRequest: () => false,
}));
vi.mock("@/lib/db/proxies", () => ({
  getProxyById: async (id: string) =>
    id === "missing"
      ? null
      : {
          id,
          notes: id.startsWith("managed")
            ? JSON.stringify({ managedProxyId: id, managedCore: "singbox" })
            : null,
        },
  deleteProxyById: async (id: string, { force }: { force: boolean }) => {
    if (id === "missing") return false;
    if (id === "managed-commit-failure") throw new Error("synthetic registry failure");
    state.committed.push({ id, force });
    return true;
  },
}));
vi.mock("@/lib/services/managedProxy/remove", () => ({
  removeManagedProxy: async (_core: string, id: string, commit: () => Promise<boolean>) => {
    state.removed.push(id);
    return commit();
  },
}));
vi.mock("@omniroute/open-sse/utils/proxyDispatcher", () => ({
  clearDispatcherCache: () => {
    state.cacheClears++;
  },
}));
const endpoint = await import("../../src/app/api/services/managed-proxy/registry-delete/route");
const { handleProxyDelete } = await import("../../src/lib/api/proxyDeletionHandlers");
const { POST: batchDelete } = await import("../../src/app/api/settings/proxies/batch-delete/route");
const DESTINATION = "/api/services/managed-proxy/registry-delete";
const SINGLE = "/api/settings/proxies";
const BATCH = `${SINGLE}/batch-delete`;
const MARKER = "x-omniroute-proxy-delete-origin";

beforeEach(() => {
  Object.assign(state, {
    login: true,
    dashboard: false,
    removed: [],
    committed: [],
    cacheClears: 0,
  });
});

function request({
  method = "DELETE",
  origin = SINGLE,
  locality = "loopback",
  id = "managed-first",
  headers = {},
  body,
}: {
  method?: string;
  origin?: string;
  locality?: string;
  id?: string;
  headers?: Record<string, string>;
  body?: string;
} = {}) {
  return new Request(`http://localhost${DESTINATION}?id=${id}&force=1`, {
    method,
    headers: { [MARKER]: origin, "x-omniroute-peer-locality": locality, ...headers },
    ...(body !== undefined ? { body } : {}),
  });
}

const credentials: Array<Record<string, string>> = [
  { authorization: "Bearer oma_fixture_write" },
  { "x-omniroute-auth-kind": "management_key", "x-omniroute-auth-label": "local-cli-token" },
];
for (const headers of credentials) {
  test(`original deletion credentials remain valid: ${Object.keys(headers)[0]}`, async () => {
    const response = await endpoint.DELETE(request({ headers }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(state.removed).toEqual(["managed-first"]);
    expect(state.committed).toEqual([{ id: "managed-first", force: true }]);
  }, 3000);
}

test("destination rejects absent/spoofed origin, locality and method pairs before registry work", async () => {
  state.dashboard = true;
  for (const input of [
    request({ origin: "" }),
    request({ origin: "/api/keys" }),
    request({ locality: "" }),
    request({ locality: "remote" }),
    request({ locality: "lan" }),
    request({ method: "POST", origin: SINGLE }),
    request({ origin: BATCH }),
  ])
    expect((await endpoint.DELETE(input)).status).toBe(403);
  expect(state.removed).toEqual([]);
  expect(state.committed).toEqual([]);
}, 3000);

test("login-off retains ordinary deletion but managed deletion still requires credentials", async () => {
  state.login = false;
  expect((await endpoint.DELETE(request({ id: "ordinary" }))).status).toBe(200);
  expect((await endpoint.DELETE(request())).status).toBe(500);
  expect(state.removed).toEqual([]);
  expect(state.committed).toEqual([{ id: "ordinary", force: true }]);
  state.login = true;
  expect((await endpoint.DELETE(request())).status).toBe(401);
}, 3000);

test("mixed batch preserves order, force, partial success and cache invalidation", async () => {
  state.dashboard = true;
  const response = await endpoint.POST(
    request({
      method: "POST",
      origin: BATCH,
      body: JSON.stringify({
        ids: ["ordinary", "missing", "managed-first", "managed-commit-failure"],
        force: true,
      }),
    })
  );
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({
    success: true,
    deleted: 2,
    failed: 2,
    results: [
      { id: "ordinary", success: true },
      { id: "missing", success: false, error: "Proxy not found" },
      { id: "managed-first", success: true },
      { id: "managed-commit-failure", success: false, error: "synthetic registry failure" },
    ],
  });
  expect(state.removed).toEqual(["managed-first", "managed-commit-failure"]);
  expect(state.committed).toEqual([
    { id: "ordinary", force: true },
    { id: "managed-first", force: true },
  ]);
  expect(state.cacheClears).toBe(1);
}, 3000);

test("single and batch validation fail before deleting any entry", async () => {
  state.dashboard = true;
  expect((await endpoint.DELETE(request({ id: "" }))).status).toBe(400);
  expect((await endpoint.DELETE(request({ id: "missing" }))).status).toBe(404);
  for (const body of [
    "{",
    JSON.stringify({ ids: [] }),
    JSON.stringify({ ids: ["ordinary"], force: "yes" }),
  ])
    expect((await endpoint.POST(request({ method: "POST", origin: BATCH, body }))).status).toBe(
      400
    );
  expect(state.removed).toEqual([]);
  expect(state.committed).toEqual([]);
}, 3000);

test("generic remote deletion keeps ordinary CRUD but cannot invoke the managed lifecycle", async () => {
  state.dashboard = true;
  const ordinary = new Request(`http://localhost${SINGLE}?id=ordinary`, { method: "DELETE" });
  expect((await handleProxyDelete(ordinary)).status).toBe(200);
  const managed = new Request(`http://localhost${SINGLE}?id=managed-first`, { method: "DELETE" });
  expect((await handleProxyDelete(managed)).status).toBe(500);
  const batch = await batchDelete(
    new Request(`http://localhost${BATCH}`, {
      method: "POST",
      body: JSON.stringify({ ids: ["managed-first", "ordinary"] }),
    })
  );
  const result = await batch.json();
  expect(result.deleted).toBe(1);
  expect(result.failed).toBe(1);
  expect(state.removed).toEqual([]);
  expect(state.committed.every(({ id }) => id === "ordinary")).toBe(true);
}, 3000);
