// @vitest-environment node
import { beforeEach, expect, test, vi } from "vitest";

// Exercise the ordinary registry boundary without loading the DB or a native core.
const state = vi.hoisted(() => ({ deleted: [] as string[], cacheClears: 0 }));
vi.mock("@/lib/db/proxies", () => ({
  getProxyById: async (id: string) => ({
    id,
    notes: id === "managed" ? '{"managedProxyId":"source","managedCore":"xray"}' : null,
  }),
  deleteProxyById: async (id: string) => {
    state.deleted.push(id);
    return true;
  },
}));
vi.mock("@omniroute/open-sse/utils/proxyDispatcher", () => ({
  clearDispatcherCache: () => {
    state.cacheClears++;
  },
}));

import { handleProxyBatchDelete, handleProxyDelete } from "../../src/lib/api/proxyDeletionHandlers";

beforeEach(() => {
  state.deleted = [];
  state.cacheClears = 0;
});

test.each(["", "&force=1"])(
  "generic deletion returns 401 for managed ownership (%s)",
  async (force) => {
    const response = await handleProxyDelete(
      new Request(`http://localhost/api/settings/proxies?id=managed${force}`, { method: "DELETE" })
    );
    expect(response.status).toBe(401);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("x-omniroute-proxy-delete-origin")).toBeNull();
    expect(await response.json()).toEqual({
      error: {
        message: "Managed proxy deletion requires the authenticated local managed-core endpoint",
        type: "invalid_request",
      },
      requestId: expect.any(String),
    });
    expect(state.deleted).toEqual([]);
    expect(state.cacheClears).toBe(0);
  }
);

test("generic mixed deletion preserves managed ownership while removing ordinary rows", async () => {
  const response = await handleProxyBatchDelete(
    new Request("http://localhost/api/settings/proxies/batch-delete", {
      method: "POST",
      body: JSON.stringify({ ids: ["managed", "ordinary"], force: true }),
    })
  );
  expect(response.status).toBe(200);
  expect(await response.json()).toMatchObject({
    success: true,
    deleted: 1,
    failed: 1,
    results: [
      { id: "managed", success: false },
      { id: "ordinary", success: true },
    ],
  });
  expect(state.deleted).toEqual(["ordinary"]);
  expect(state.cacheClears).toBe(1);
});
