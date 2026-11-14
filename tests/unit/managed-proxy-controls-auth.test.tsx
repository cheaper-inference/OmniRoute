import { beforeEach, expect, test, vi } from "vitest";
const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  save: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
  read: vi.fn(),
  custom: vi.fn(),
  releases: vi.fn(),
  resolve: vi.fn(),
  change: vi.fn(),
  probe: vi.fn(),
  subscription: vi.fn(),
}));
vi.mock("@/lib/api/requireManagementAuth", () => ({ requireManagementAuth: mocks.auth }));
vi.mock("@/lib/db/proxies/managedRegistry", () => ({ commitManagedProxy: vi.fn() }));
vi.mock("@omniroute/open-sse/utils/proxyDispatcher", () => ({ clearDispatcherCache: vi.fn() }));
vi.mock("@/lib/services/managedProxy/manager", () => ({
  managedRoot: () => "/synthetic",
  managedEntries: () => [],
  saveManagedProxy: mocks.save,
  startManagedProxyCore: mocks.start,
  stopManagedProxyCore: mocks.stop,
}));
vi.mock("@/lib/services/registry", () => ({ getSupervisor: () => undefined }));
vi.mock("@/lib/services/managedProxy/selection", () => ({
  readCoreSelection: mocks.read,
  importCustomBinary: mocks.custom,
}));
vi.mock("@/lib/services/managedProxy/catalog", () => ({
  listCoreReleases: mocks.releases,
  resolveCoreRelease: mocks.resolve,
}));
vi.mock("@/lib/services/managedProxy/update", () => ({ changeManagedCore: mocks.change }));
vi.mock("@/lib/services/managedProxy/testSource", () => ({ testManagedSource: mocks.probe }));
vi.mock("@/lib/services/managedProxy/subscription", () => ({
  previewManagedSubscription: mocks.subscription,
}));
import { PATCH } from "../../src/app/api/services/managed-proxy/route";
import { AUTHZ_HEADER_PEER_LOCALITY } from "../../src/server/authz/headers";
const operations = [
  { action: "start", core: "xray" },
  { action: "stop", core: "xray" },
  { action: "releases", core: "xray", distribution: "mahsa" },
  { action: "update", core: "xray", distribution: "mahsa", version: "v1" },
  {
    action: "custom",
    core: "xray",
    path: "/synthetic/core",
    sha256: "a".repeat(64),
    acknowledgeUntrustedCode: true,
  },
  { action: "test", core: "xray", sourceLink: "vless://synthetic" },
  { action: "subscription", core: "xray", url: "https://example.invalid/sub" },
];
function request(body: unknown, locality = "loopback") {
  return new Request("https://localhost/api/services/managed-proxy", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", [AUTHZ_HEADER_PEER_LOCALITY]: locality },
    body: JSON.stringify(body),
  });
}
beforeEach(() => {
  vi.resetAllMocks();
  mocks.auth.mockResolvedValue(null);
  mocks.custom.mockResolvedValue({ source: "custom", sha256: "a".repeat(64) });
});
for (const operation of operations) {
  test(`${operation.action} rejects a remote peer before authentication or side effects`, async () => {
    const response = await PATCH(request(operation, "remote"));
    expect(response.status).toBe(403);
    for (const mock of Object.values(mocks)) expect(mock).not.toHaveBeenCalled();
  });
  test(`${operation.action} requires management authentication even on loopback`, async () => {
    mocks.auth.mockResolvedValue(new Response(null, { status: 401 }));
    expect((await PATCH(request(operation))).status).toBe(401);
    expect(mocks.auth).toHaveBeenCalledWith(expect.anything(), { alwaysRequireAuth: true });
    for (const [name, mock] of Object.entries(mocks))
      if (name !== "auth") expect(mock).not.toHaveBeenCalled();
  });
}
test("custom import refuses a missing trust acknowledgement", async () => {
  const { acknowledgeUntrustedCode: _omitted, ...input } = operations[4];
  expect((await PATCH(request(input))).status).toBe(400);
  expect(mocks.custom).not.toHaveBeenCalled();
});

test("unsaved test trims pasted source whitespace just like Save", async () => {
  mocks.probe.mockResolvedValue({ success: true, publicIp: "192.0.2.1", latencyMs: 1 });
  const response = await PATCH(
    request({ action: "test", core: "xray", sourceLink: " \nvless://synthetic\n " })
  );
  expect(response.status).toBe(200);
  expect(mocks.probe).toHaveBeenCalledWith(
    "xray",
    "vless://synthetic",
    undefined,
    undefined,
    undefined
  );
});
test("authorized custom import selects only the verified imported snapshot", async () => {
  const response = await PATCH(request(operations[4]));
  expect(response.status).toBe(200);
  expect(mocks.change).toHaveBeenCalledWith("xray", { source: "custom", sha256: "a".repeat(64) });
  expect(response.headers.get("cache-control")).toBe("no-store");
});
test("network errors do not expose subscription credentials or custom paths", async () => {
  mocks.subscription.mockRejectedValue(
    new Error("https://private.invalid/token-secret?key=secret")
  );
  const response = await PATCH(request(operations[6]));
  const text = await response.text();
  expect(text).not.toContain("private.invalid");
  expect(text).not.toContain("token-secret");
});
