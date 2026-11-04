import { describe, it, expect, vi, beforeEach } from "vitest";
const deps = vi.hoisted(() => ({
  valid: vi.fn(),
  policy: vi.fn(),
  scope: vi.fn(),
  select: vi.fn(),
  fetch: vi.fn(),
  log: vi.fn(),
  usage: vi.fn(),
  recover: vi.fn(),
  unavailable: vi.fn(),
  connections: vi.fn(),
  metadata: vi.fn(),
  allowed: vi.fn(),
}));
vi.mock("@/sse/services/auth", () => ({
  extractApiKey: (r: Request) => r.headers.get("authorization")?.replace("Bearer ", ""),
  isValidApiKey: deps.valid,
  getProviderCredentialsWithQuotaPreflight: deps.select,
  clearRecoveredProviderState: deps.recover,
  markAccountUnavailable: deps.unavailable,
}));
vi.mock("@/shared/utils/apiKeyPolicy", () => ({ enforceApiKeyPolicy: deps.policy }));
vi.mock("@/sse/services/keyConnectionScope", () => ({
  resolveKeyConnectionScope: deps.scope,
  isKeyScopeBlockedCredentials: (c: Record<string, unknown>) => c.keyScopeBlocked === true,
}));
vi.mock("@/lib/usage/callLogs", () => ({ saveCallLog: deps.log }));
vi.mock("@/lib/usage/usageHistory", () => ({ saveRequestUsage: deps.usage }));
vi.mock("@/lib/db/providers", () => ({ getProviderConnections: deps.connections }));
vi.mock("@/lib/db/apiKeys", () => ({
  getApiKeyMetadata: deps.metadata,
  isModelAllowedForKey: deps.allowed,
}));
vi.mock("@/shared/constants/providers", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  resolveProviderId: (p: string) => p,
}));
vi.mock("@/middleware/promptInjectionGuard", () => ({
  withInjectionGuard: (handler: unknown) => handler,
}));
vi.mock("@/app/api/v1/_shared/specialtyCatalog", () => ({
  getSpecialtyModelsResponse: vi.fn(async () => Response.json({ data: [] })),
}));
vi.mock("@omniroute/open-sse/handlers/systemOne.ts", () => ({
  handleSystemOneProxy: vi.fn(async () => Response.json({ legacy: true })),
}));
vi.mock("@omniroute/open-sse/handlers/decisionTransport.ts", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  fetchDecision: deps.fetch,
}));
vi.mock("@/shared/network/safeOutboundFetch", () => ({ safeOutboundFetch: vi.fn() }));
vi.mock("@/shared/network/outboundUrlGuardPolicy", () => ({
  getProviderOutboundGuard: () => "public-only",
}));
vi.mock("@/lib/db/settings", () => ({ resolveProxyForConnection: vi.fn(async () => null) }));

import { getSpecialtyModelsResponse } from "@/app/api/v1/_shared/specialtyCatalog";
import { POST } from "@/app/api/v1/systemone/route";
import { handleSystemOneProxy } from "@omniroute/open-sse/handlers/systemOne.ts";
import { GET } from "@/app/api/v1/systemone/models/route";
import { validateDecisionProvider } from "@/lib/providers/validation/decision";
const body = {
  model: "basal/current",
  state: "private payload",
  questions: { a: { type: "noul", instructions: "Safe?" } },
};
const makeRequest = (key = "client-test") =>
  new Request("http://gateway/v1/systemone", {
    method: "POST",
    headers: key ? { authorization: `Bearer ${key}` } : {},
    body: JSON.stringify(body),
  });
describe("decision routes use real runtime policy wiring", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    deps.valid.mockResolvedValue(true);
    deps.policy.mockResolvedValue({
      apiKeyInfo: { id: "key1", name: "test", allowedConnections: ["c1"] },
      rejection: null,
    });
    deps.scope.mockResolvedValue({ allowedConnections: ["c1"], rejection: null });
    deps.select.mockResolvedValue({ connectionId: "c1", apiKey: "upstream-test" });
    deps.fetch.mockImplementation(async (_url, _c, init) =>
      Response.json(
        init.method === "POST"
          ? {
              answers: { a: { type: "noul", noul: 0.9 } },
              usage: { input_tokens: 10, output_tokens: 0, cost: 0.002 },
            }
          : { models: [{ name: "current" }] }
      )
    );
    deps.log.mockResolvedValue(undefined);
    deps.usage.mockResolvedValue(undefined);
    deps.metadata.mockResolvedValue({ allowedEndpoints: ["decisions"] });
    deps.allowed.mockResolvedValue(true);
    deps.connections.mockResolvedValue([
      { id: "c1", provider: "basal" },
      { id: "other", provider: "basal" },
    ]);
  });
  it.each(["typesafe/jev-latest", "openrouter/typesafe/jev-1.13", "jev-latest", undefined])(
    "retains the merged System One backend for %s",
    async (model) => {
      const response = await POST(
        new Request("http://gateway/v1/systemone", {
          method: "POST",
          headers: { authorization: "Bearer client-test" },
          body: JSON.stringify({
            ...body,
            model,
            questions: { a: { type: "noul", instructions: "Safe?" } },
          }),
        })
      );
      expect(response.status).toBe(200);
      expect(handleSystemOneProxy).toHaveBeenCalled();
      expect(deps.fetch).not.toHaveBeenCalled();
    }
  );
  it("requires a client key even in keyless mode", async () => {
    expect((await POST(makeRequest(""))).status).toBe(401);
    expect(deps.select).not.toHaveBeenCalled();
  });
  it("validates Basal through discovery without sending chat or paid inference", async () => {
    expect(await validateDecisionProvider({ provider: "basal" })).toEqual({ valid: true });
    expect(deps.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/v1/models",
      expect.any(Object),
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    expect(deps.fetch.mock.calls[0][2].method).toBeUndefined();
  });
  it("labels explicit Julia model configuration as unverified instead of probing a guessed URL", async () => {
    expect(
      await validateDecisionProvider({
        provider: "julia-local",
        providerSpecificData: {
          decision: { format: "systemone", endpoint: "http://julia:9000/ask", models: ["julia-1"] },
        },
      })
    ).toMatchObject({ valid: true, warning: expect.stringContaining("unverified") });
    expect(deps.fetch).not.toHaveBeenCalled();
  });
  it("rejects unavailable discovery during connection validation", async () => {
    deps.fetch.mockRejectedValue(new Error("unreachable"));
    expect(await validateDecisionProvider({ provider: "basal" })).toMatchObject({ valid: false });
  });
  it("rejects invalid credentials", async () => {
    deps.valid.mockResolvedValue(false);
    expect((await POST(makeRequest())).status).toBe(401);
  });
  it.each([403, 429])(
    "returns endpoint/model/rate policy rejection %s without upstream access",
    async (status) => {
      deps.policy.mockResolvedValue({ rejection: new Response(null, { status }) });
      expect((await POST(makeRequest())).status).toBe(status);
      expect(deps.select).not.toHaveBeenCalled();
    }
  );
  it("applies scoped quota preflight and binds accounting to caller and selected connection", async () => {
    expect((await POST(makeRequest())).status).toBe(200);
    expect(deps.select).toHaveBeenCalledWith("basal", null, ["c1"], "current");
    expect(deps.log).toHaveBeenCalledWith(
      expect.objectContaining({
        apiKeyId: "key1",
        connectionId: "c1",
        provider: "basal",
        path: "/v1/systemone",
      })
    );
    expect(deps.usage).toHaveBeenCalledWith(
      expect.objectContaining({
        apiKeyId: "key1",
        tokens: { input_tokens: 10, output_tokens: 0, cost_usd: 0.002 },
      }),
      { deduplicate: false }
    );
    expect(JSON.stringify(deps.log.mock.calls)).not.toContain("private payload");
    expect(JSON.stringify(deps.log.mock.calls)).not.toContain("upstream-test");
  });
  it.each([
    { result: null, status: 503 },
    { result: { allRateLimited: true }, status: 429 },
    { result: { keyScopeBlocked: true }, status: 403 },
  ])("fails closed for ineligible connection $status", async ({ result, status }) => {
    deps.select.mockResolvedValue(result);
    expect((await POST(makeRequest())).status).toBe(status);
    expect(deps.fetch).not.toHaveBeenCalled();
  });
  it("feeds upstream failures into existing model/connection cooldown", async () => {
    deps.fetch.mockImplementation(async (_url, _c, init) =>
      init.method === "POST"
        ? new Response(null, { status: 429 })
        : Response.json({ models: [{ name: "current" }] })
    );
    expect((await POST(makeRequest())).status).toBe(429);
    expect(deps.unavailable).toHaveBeenCalledWith(
      "c1",
      429,
      "Decision upstream HTTP 429",
      "basal",
      "current",
      null,
      expect.any(Object)
    );
  });
  it("filters discovery by connection, endpoint and model permissions", async () => {
    const response = await GET(makeRequest());
    expect(response.status).toBe(200);
    expect((await response.json()).data).toHaveLength(1);
    expect(deps.fetch).toHaveBeenCalledOnce();
    expect(deps.allowed).toHaveBeenCalledWith("client-test", "basal/current");
    expect(deps.select).not.toHaveBeenCalled();
  });
  it("never advertises a forbidden model", async () => {
    deps.allowed.mockResolvedValue(false);
    expect((await (await GET(makeRequest())).json()).data).toEqual([]);
  });
  it("reports partial discovery when a backend is unavailable", async () => {
    deps.fetch.mockRejectedValue(new Error("unreachable"));
    expect((await GET(makeRequest())).headers.get("X-OmniRoute-Catalog-Status")).toBe("partial");
  });
  it("enforces endpoint permission on catalog before making upstream requests", async () => {
    deps.policy.mockResolvedValue({ rejection: new Response(null, { status: 403 }) });
    expect((await GET(makeRequest())).status).toBe(403);
    expect(deps.fetch).not.toHaveBeenCalled();
  });
});

describe("discovery connection record validation", () => {
  it("marks malformed database rows partial without forwarding credentials", async () => {
    deps.valid.mockResolvedValue(true);
    deps.policy.mockResolvedValue({ rejection: null });
    deps.metadata.mockResolvedValue({ allowedEndpoints: ["decisions"] });
    deps.scope.mockResolvedValue({ allowedConnections: ["c1"], rejection: null });
    deps.connections.mockResolvedValue([
      { id: "c1", provider: null },
      { id: 42, provider: "basal" },
    ]);
    deps.fetch.mockClear();
    const response = await GET(makeRequest());
    expect(response.headers.get("X-OmniRoute-Catalog-Status")).toBe("partial");
    expect((await response.json()).data).toEqual([]);
    expect(deps.fetch).not.toHaveBeenCalled();
  });
});

describe("universal native decision catalog", () => {
  it("discovers Cloud decisions only on allowed connections and preserves key model scope", async () => {
    deps.valid.mockResolvedValue(true);
    deps.policy.mockResolvedValue({ rejection: null });
    deps.scope.mockResolvedValue({ allowedConnections: ["sub"], rejection: null });
    deps.metadata.mockResolvedValue({});
    deps.allowed.mockResolvedValue(true);
    deps.connections.mockResolvedValue([
      { id: "sub", provider: "ollama-cloud", apiKey: "sub-test" },
      { id: "credits", provider: "ollama-cloud", apiKey: "credits-test" },
    ]);
    deps.fetch.mockImplementation(async (url: string, credentials: Record<string, unknown>) => {
      expect(credentials.connectionId).toBe("sub");
      return Response.json(
        url.endsWith("/api/show")
          ? { capabilities: ["decision", "vision"] }
          : { models: [{ name: "clef:27b" }, { name: "chat-only" }] }
      );
    });
    // A capability response for both rows above is deliberate: names are never gates.
    const response = await GET(
      new Request("http://gateway/v1/systemone/models", {
        headers: { authorization: "Bearer client-test" },
      })
    );
    expect(response.status).toBe(200);
    const data = (await response.json()).data;
    expect(data[0].id).toBe("ollamacloud/clef:27b");
    expect(data[0].supported_endpoints).toEqual(["systemone"]);
    expect(deps.allowed).toHaveBeenCalledWith("client-test", "ollamacloud/clef:27b");
  });
});

it("unions the scoped legacy TypeSafe and OpenRouter catalog with native results", async () => {
  deps.valid.mockResolvedValue(true);
  deps.policy.mockResolvedValue({ rejection: null });
  deps.scope.mockResolvedValue({ allowedConnections: ["c1"], rejection: null });
  deps.metadata.mockResolvedValue({});
  deps.connections.mockResolvedValue([]);
  vi.mocked(getSpecialtyModelsResponse).mockResolvedValueOnce(
    Response.json({
      data: [
        { id: "typesafe/jev-latest", type: "decisions" },
        { id: "openrouter/typesafe/jev-1.13", type: "decisions" },
      ],
    })
  );
  const response = await GET(
    new Request("http://gateway/v1/systemone/models", {
      headers: { authorization: "Bearer client-test" },
    })
  );
  expect((await response.json()).data.map((row: { id: string }) => row.id)).toEqual([
    "typesafe/jev-latest",
    "openrouter/typesafe/jev-1.13",
  ]);
});

it("lists the native Supersonic default model using only its scoped API-key connection", async () => {
  deps.valid.mockResolvedValue(true);
  deps.policy.mockResolvedValue({ rejection: null });
  deps.scope.mockResolvedValue({ allowedConnections: ["julia-account"], rejection: null });
  deps.metadata.mockResolvedValue({});
  deps.allowed.mockResolvedValue(true);
  deps.connections.mockResolvedValue([
    { id: "julia-account", provider: "supersoniclabs", apiKey: "test" },
  ]);
  deps.fetch.mockClear();
  const response = await GET(
    new Request("http://gateway/v1/systemone/models", {
      headers: { authorization: "Bearer client-test" },
    })
  );
  expect(response.status).toBe(200);
  expect((await response.json()).data).toEqual([
    expect.objectContaining({ id: "supersoniclabs/julia-1", supported_endpoints: ["systemone"] }),
  ]);
  expect(deps.fetch).not.toHaveBeenCalled();
  deps.allowed.mockResolvedValue(false);
  const denied = await GET(
    new Request("http://gateway/v1/systemone/models", {
      headers: { authorization: "Bearer client-test" },
    })
  );
  expect((await denied.json()).data).toEqual([]);
});
