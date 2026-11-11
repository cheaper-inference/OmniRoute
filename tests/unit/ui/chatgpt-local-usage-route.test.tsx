// @vitest-environment node
import { beforeEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ auth: vi.fn(), connection: vi.fn(), usage: vi.fn() }));
vi.mock("@/lib/api/requireManagementAuth", () => ({ requireManagementAuth: mocks.auth }));
vi.mock("@/lib/db/providers", () => ({ getProviderConnectionById: mocks.connection }));
vi.mock("@/lib/db/connectionLocalUsage", () => ({ getConnectionLocalUsage: mocks.usage }));
import { GET } from "@/app/api/usage/local-summary/route";

beforeEach(() => {
  vi.resetAllMocks();
  mocks.auth.mockResolvedValue(null);
});
const request = () => new Request("https://example.test/api/usage/local-summary?connectionId=a");

it("requires management authentication before reading connection or usage data", async () => {
  mocks.auth.mockResolvedValue(new Response(null, { status: 401 }));
  expect((await GET(request())).status).toBe(401);
  expect(mocks.connection).not.toHaveBeenCalled();
  expect(mocks.usage).not.toHaveBeenCalled();
});
it("validates the connection ID and rejects other providers", async () => {
  expect((await GET(new Request("https://example.test/api/usage/local-summary"))).status).toBe(400);
  mocks.connection.mockResolvedValue({ id: "a", provider: "codex" });
  expect((await GET(request())).status).toBe(404);
  expect(mocks.usage).not.toHaveBeenCalled();
});
it("reads only the selected ChatGPT connection and prevents caching", async () => {
  mocks.connection.mockResolvedValue({ id: "a", provider: "chatgpt" });
  mocks.usage.mockReturnValue({ requests: 3 });
  const response = await GET(request());
  expect(await response.json()).toEqual({ requests: 3 });
  expect(mocks.usage).toHaveBeenCalledWith("a", "chatgpt");
  expect(response.headers.get("cache-control")).toBe("no-store");
});
it("reports database failures without leaking internals or false zero totals", async () => {
  mocks.connection.mockResolvedValue({ id: "a", provider: "chatgpt" });
  mocks.usage.mockImplementation(() => {
    throw new Error("secret at /private/storage.sqlite");
  });
  const response = await GET(request());
  expect(response.status).toBe(500);
  const body = await response.text();
  expect(body).not.toContain("secret");
  expect(body).not.toContain("at /");
  expect(body).not.toContain('"requests":0');
});
