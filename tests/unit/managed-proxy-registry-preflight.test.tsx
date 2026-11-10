// @vitest-environment node
import { beforeEach, expect, test, vi } from "vitest";
const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  get: vi.fn(),
  used: vi.fn(),
  remove: vi.fn(),
  commit: vi.fn(),
}));
vi.mock("@/lib/db/proxies", () => ({
  getProxyById: mocks.get,
  getProxyWhereUsed: mocks.used,
  deleteProxyById: mocks.commit,
}));
vi.mock("@/lib/api/requireManagementAuth", () => ({ requireManagementAuth: mocks.auth }));
vi.mock("@/lib/api/managedProxyRegistry", () => ({
  managedProxyIdentity: () => ({ core: "xray", id: "managed-id" }),
}));
vi.mock("@/lib/services/managedProxy/remove", () => ({ removeManagedProxy: mocks.remove }));
import { deleteManagedRegistryProxy } from "../../src/lib/services/managedProxy/registryDeletion";
import { AUTHZ_HEADER_PEER_LOCALITY } from "../../src/server/authz/headers";
beforeEach(() => {
  vi.resetAllMocks();
  mocks.get.mockResolvedValue({ notes: "managed" });
  mocks.auth.mockResolvedValue(null);
  mocks.used.mockResolvedValue({ count: 1, assignments: [{ id: "assignment" }] });
  mocks.commit.mockResolvedValue(true);
  mocks.remove.mockImplementation(async (_core, _id, commit) => commit());
});
function request(locality = "loopback") {
  return new Request("http://localhost/api/services/managed-proxy/registry-delete", {
    headers: { [AUTHZ_HEADER_PEER_LOCALITY]: locality },
  });
}
test("remote managed deletion is a 403 before authentication or lifecycle work", async () => {
  await expect(deleteManagedRegistryProxy(request("remote"), "id", false)).rejects.toMatchObject({
    status: 403,
  });
  expect(mocks.auth).not.toHaveBeenCalled();
  expect(mocks.remove).not.toHaveBeenCalled();
});
test("missing management credentials preserve the 401 status", async () => {
  mocks.auth.mockResolvedValue(new Response(null, { status: 401 }));
  await expect(deleteManagedRegistryProxy(request(), "id", false)).rejects.toMatchObject({
    status: 401,
  });
  expect(mocks.remove).not.toHaveBeenCalled();
});
test("an assigned proxy rejects non-force deletion before touching the core", async () => {
  await expect(deleteManagedRegistryProxy(request(), "id", false)).rejects.toMatchObject({
    status: 409,
    code: "proxy_in_use",
  });
  expect(mocks.remove).not.toHaveBeenCalled();
  expect(mocks.commit).not.toHaveBeenCalled();
});
test("force keeps the transactional deletion check inside lifecycle commit", async () => {
  expect(await deleteManagedRegistryProxy(request(), "id", true)).toBe(true);
  expect(mocks.remove).toHaveBeenCalledTimes(1);
  expect(mocks.commit).toHaveBeenCalledWith("id", { force: true });
});
