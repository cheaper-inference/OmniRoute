import { beforeEach, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  list: vi.fn(),
  key: vi.fn(),
  save: vi.fn(),
  remove: vi.fn(),
  costs: vi.fn(),
  clear: vi.fn(),
}));
vi.mock("@/lib/api/requireManagementAuth", () => ({ requireManagementAuth: mocks.auth }));
vi.mock("@/lib/db/openaiBilling", () => ({
  OPENAI_ORGANIZATION_ID: /^org-[A-Za-z0-9_-]{1,120}$/,
  listOpenAIBillingOrganizations: mocks.list,
  getOpenAIBillingKey: mocks.key,
  saveOpenAIBillingKey: mocks.save,
  deleteOpenAIBillingKey: mocks.remove,
}));
vi.mock("@/lib/usage/openaiCosts", () => ({
  fetchOpenAICosts: mocks.costs,
  clearOpenAICostCache: mocks.clear,
}));
import { GET, PUT, DELETE } from "../../../src/app/api/usage/openai-costs/route";

beforeEach(() => {
  vi.resetAllMocks();
  mocks.auth.mockResolvedValue(null);
  mocks.list.mockReturnValue(["org-one"]);
  mocks.key.mockReturnValue("secret-admin-key");
});

it("requires management authorization for every operation before reading secrets", async () => {
  mocks.auth.mockResolvedValue(new Response("Unauthorized", { status: 401 }));
  for (const handler of [GET, PUT, DELETE])
    expect((await handler(new Request("http://localhost/api/usage/openai-costs"))).status).toBe(
      401
    );
  expect(mocks.list).not.toHaveBeenCalled();
  expect(mocks.key).not.toHaveBeenCalled();
  expect(mocks.save).not.toHaveBeenCalled();
});

it("returns an organization's costs once without returning its key", async () => {
  mocks.costs.mockResolvedValue({ organizationId: "org-one", totalUsd: 3 });
  const response = await GET(new Request("http://localhost/api/usage/openai-costs?period=30d"));
  expect(response.headers.get("cache-control")).toBe("no-store");
  const text = await response.text();
  expect(text).not.toContain("secret-admin-key");
  expect(JSON.parse(text).organizations).toEqual([
    { organizationId: "org-one", costs: { organizationId: "org-one", totalUsd: 3 } },
  ]);
});

it("redacts upstream failures and never returns a zero on failure", async () => {
  mocks.costs.mockRejectedValue(new Error("secret-admin-key stack upstream"));
  const response = await GET(new Request("http://localhost/api/usage/openai-costs"));
  const text = await response.text();
  expect(text).not.toMatch(/secret-admin-key|stack|upstream/);
  expect(JSON.parse(text).organizations[0]).toEqual({
    organizationId: "org-one",
    costs: null,
    error: "billing_unavailable",
  });
});

it("rejects malformed configuration and periods before touching credentials", async () => {
  expect(
    (await GET(new Request("http://localhost/api/usage/openai-costs?period=all"))).status
  ).toBe(400);
  expect(
    (
      await PUT(
        new Request("http://localhost/api/usage/openai-costs", {
          method: "PUT",
          body: JSON.stringify({ organizationId: "bad", apiKey: "secret-admin-key" }),
        })
      )
    ).status
  ).toBe(400);
  expect(mocks.key).not.toHaveBeenCalled();
  expect(mocks.save).not.toHaveBeenCalled();
});

it("stores only the billing key and invalidates billing cache on rotation and removal", async () => {
  const request = new Request("http://localhost/api/usage/openai-costs", {
    method: "PUT",
    body: JSON.stringify({ organizationId: "org-one", apiKey: "secret-admin-key" }),
  });
  const saved = await PUT(request);
  expect(saved.status).toBe(200);
  expect(await saved.text()).not.toContain("secret-admin-key");
  expect(mocks.save).toHaveBeenCalledWith("org-one", "secret-admin-key");
  expect(
    (
      await DELETE(
        new Request("http://localhost/api/usage/openai-costs?organizationId=org-one", {
          method: "DELETE",
        })
      )
    ).status
  ).toBe(200);
  expect(mocks.remove).toHaveBeenCalledWith("org-one");
  expect(mocks.clear).toHaveBeenCalledTimes(2);
});
