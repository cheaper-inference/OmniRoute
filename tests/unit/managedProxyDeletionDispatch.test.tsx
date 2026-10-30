// @vitest-environment node
import { beforeEach, expect, test, vi } from "vitest";
import { NextRequest } from "next/server";
import { assertManagedFixture } from "../_setup/managedProxyFixture.mjs";
assertManagedFixture();
const state = vi.hoisted(() => ({ login: true, dashboard: false, validKey: true }));
vi.mock("@/lib/db/readCache", () => ({ getCachedSettings: async () => ({}) }));
vi.mock("@/lib/gracefulShutdown", () => ({ isDraining: () => false }));
vi.mock("@/lib/config/runtimeSettings", () => ({
  getAuthzBypassSnapshot: () => ({ enabled: false, prefixes: [] }),
}));
vi.mock("@/shared/utils/apiAuth", () => ({
  isAuthRequired: async () => state.login,
  isDashboardSessionAuthenticated: async () => state.dashboard,
}));
vi.mock("@/lib/machineToken", () => ({
  getMachineTokenSync: () => "synthetic-cli-token",
  getLegacyCliTokenSync: () => "",
}));
vi.mock("@/shared/services/modelSyncScheduler", () => ({
  isModelSyncInternalRequest: () => false,
}));
vi.mock("@/lib/db/apiKeys", () => ({
  getApiKeyMetadata: async () => ({ id: "synthetic-key", scopes: ["manage"] }),
  validateApiKey: async () => state.validKey,
}));
vi.mock("@/sse/services/auth", () => ({
  extractApiKey: (request: Request) => request.headers.get("authorization")?.slice(7) || null,
  isValidApiKey: async () => state.validKey,
  readNonEmptyUrlToken: () => null,
}));
vi.mock("@/lib/db/accessTokens", () => ({ verifyAccessToken: () => null }));
vi.mock("@/lib/api/internalServiceAuth", () => ({
  isInternalServiceRequest: () => false,
  isTrustedLoopbackInternalServiceRequest: () => false,
}));
vi.mock("@omniroute/open-sse/services/ipFilter.ts", () => ({
  checkRequestIP: () => ({ allowed: true }),
}));
vi.mock("@/shared/utils/featureFlags", () => ({ isRequireApiKeyEnabled: () => true }));
vi.mock(
  "@omniroute/open-sse/utils/error.ts",
  async () => import("../../open-sse/utils/errorSanitization.ts")
);
const { runAuthzPipeline } = await import("../../src/server/authz/pipeline");
const { issueDashboardCsrfToken } = await import("../../src/server/authz/csrf");
const MARKER = "x-omniroute-proxy-delete-origin";
const DESTINATION = "/api/services/managed-proxy/registry-delete";
const SINGLE = "/api/settings/proxies";
const BATCH = `${SINGLE}/batch-delete`;

beforeEach(() => {
  Object.assign(state, { login: true, dashboard: false, validKey: true });
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "synthetic-peer-token";
  process.env.JWT_SECRET = "synthetic-csrf-secret";
});

function request(
  pathname = SINGLE,
  method = "DELETE",
  peer: string | null = "127.0.0.1",
  headers: Record<string, string> = {},
  basePath = ""
) {
  return new NextRequest(`http://localhost${basePath}${pathname}?id=fixture&force=1`, {
    method,
    nextConfig: { basePath },
    headers: {
      authorization: "Bearer synthetic-management-key",
      ...(peer ? { "x-omniroute-peer-ip": `synthetic-peer-token|${peer}` } : {}),
      [MARKER]: "/forged",
      ...headers,
    },
    ...(method === "POST"
      ? { body: JSON.stringify({ ids: ["first", "second"], force: true }) }
      : {}),
  });
}

function forwarded(response: Response) {
  const headers = new Headers();
  for (const [key, value] of response.headers)
    if (key.startsWith("x-middleware-request-"))
      headers.set(key.slice("x-middleware-request-".length), value);
  return headers;
}

for (const [pathname, method, routeClass] of [
  [SINGLE, "DELETE", "MANAGEMENT"],
  ["/api/v1/management/proxies", "DELETE", "CLIENT_API"],
  [BATCH, "POST", "MANAGEMENT"],
]) {
  test(`pipeline internally dispatches ${method} ${pathname} after original policy`, async () => {
    const input = request(pathname, method);
    const response = await runAuthzPipeline(input, { enforce: true });
    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("x-middleware-next")).toBeNull();
    expect(response.headers.get("x-middleware-rewrite")).toBe(
      `http://localhost${DESTINATION}?id=fixture&force=1`
    );
    const headers = forwarded(response);
    expect(headers.get(MARKER)).toBe(pathname);
    expect(headers.get("x-omniroute-route-class")).toBe(routeClass);
    expect(headers.get("x-omniroute-peer-locality")).toBe("loopback");
    expect(headers.get("x-omniroute-peer-ip")).toBeNull();
    expect(response.headers.get(MARKER)).toBeNull();
    expect(input.bodyUsed).toBe(false);
    if (method === "POST")
      expect(await input.json()).toEqual({ ids: ["first", "second"], force: true });
  }, 3000);
}

for (const peer of [null, "203.0.113.9", "192.168.1.2"]) {
  test(`ordinary CRUD is not rewritten for peer ${peer}`, async () => {
    const response = await runAuthzPipeline(request(SINGLE, "DELETE", peer), { enforce: true });
    expect(response.status).toBe(200);
    expect(response.headers.get("x-middleware-next")).toBe("1");
    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
    expect(forwarded(response).get(MARKER)).toBeNull();
  }, 3000);
}

test("proxy hops, spoofed locality, observation mode and adjacent methods never dispatch", async () => {
  for (const input of [
    request(SINGLE, "DELETE", null, { "x-omniroute-peer-locality": "loopback" }),
    request(SINGLE, "DELETE", "127.0.0.1", { "x-omniroute-via-proxy": "synthetic-peer-token|1" }),
    request(SINGLE, "PATCH"),
    request(BATCH, "DELETE"),
    request(`${SINGLE}/other`, "DELETE"),
    request(DESTINATION, "DELETE"),
  ]) {
    const response = await runAuthzPipeline(input, { enforce: true });
    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
    expect(forwarded(response).get(MARKER)).toBeNull();
  }
  const observed = await runAuthzPipeline(request(), { enforce: false });
  expect(observed.headers.get("x-middleware-next")).toBe("1");
  expect(forwarded(observed).get(MARKER)).toBeNull();
}, 3000);

test("original auth rejection and dashboard CSRF rejection precede dispatch", async () => {
  state.validKey = false;
  const denied = await runAuthzPipeline(request(), { enforce: true });
  expect(denied.status).toBe(403);
  expect(denied.headers.get("x-middleware-rewrite")).toBeNull();
  state.dashboard = true;
  const input = request(SINGLE, "DELETE", "127.0.0.1", {
    authorization: "",
    cookie: "auth_token=synthetic-dashboard-session",
    origin: "https://untrusted.invalid",
  });
  const csrfDenied = await runAuthzPipeline(input, { enforce: true });
  expect(csrfDenied.status).toBe(403);
  expect(csrfDenied.headers.get("x-middleware-rewrite")).toBeNull();
  input.headers.set("x-omniroute-csrf", issueDashboardCsrfToken(input)!.token);
  const accepted = await runAuthzPipeline(input, { enforce: true });
  expect(accepted.headers.get("x-middleware-rewrite")).not.toBeNull();
}, 3000);

test("rewrite preserves basePath, query and validated CLI subject without forwarding its token", async () => {
  const input = request(
    SINGLE,
    "DELETE",
    "127.0.0.1",
    {
      authorization: "",
      "x-omniroute-cli-token": "synthetic-cli-token",
    },
    "/omniroute"
  );
  const response = await runAuthzPipeline(input, { enforce: true });
  expect(response.headers.get("x-middleware-rewrite")).toBe(
    `http://localhost/omniroute${DESTINATION}?id=fixture&force=1`
  );
  const headers = forwarded(response);
  expect(headers.get("x-omniroute-cli-token")).toBeNull();
  expect(headers.get("x-omniroute-auth-kind")).toBe("management_key");
  expect(headers.get("x-omniroute-auth-label")).toBe("local-cli-token");
  expect(headers.get(MARKER)).toBe(SINGLE);
}, 3000);
