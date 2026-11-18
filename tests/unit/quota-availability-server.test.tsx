import { afterEach, expect, it, vi } from "vitest";

const guard = vi.hoisted(() => {
  const attempts: string[] = [];
  const blocked = (name: string) =>
    vi.fn(() => {
      attempts.push(name);
      throw new Error(`Forbidden side effect: ${name}`);
    });
  return { blocked, attempts, fetchers: new Map<string, ReturnType<typeof vi.fn>>() };
});
vi.mock("@/lib/db/readCache", () => ({
  getCachedRawProviderConnections: vi.fn(async () => [
    { id: "healthy", provider: "openai", isActive: true },
    { id: "expired", provider: "openai", isActive: true },
    { id: "persisted", provider: "claude", isActive: true },
    { id: "ollama", provider: "ollama-cloud", isActive: true },
  ]),
  getCachedSettings: vi.fn(async () => ({ quotaPreflight: { enabled: true } })),
}));
vi.mock("@/lib/db/core", async () => ({
  ...(await import("@/lib/db/caseMapping")),
  isCloud: false,
  isBuildPhase: false,
  DATA_DIR:
    process.env.DATA_DIR ||
    (await import("node:path")).join(
      (await import("node:os")).tmpdir(),
      "omniroute-availability-test"
    ),
  getDbInstance: vi.fn(() => ({
    prepare: (sql: string) => {
      if (!/^\s*SELECT\b/i.test(sql)) guard.blocked(`DB write: ${sql}`)();
      return { get: () => undefined, all: () => [], run: guard.blocked("statement.run") };
    },
  })),
}));
vi.mock("@/lib/db/providers", () => ({
  getProviderNodes: vi.fn(async () => []),
  updateProviderConnection: guard.blocked("updateProviderConnection"),
}));
vi.mock("@/lib/db/providerLimits", () => ({
  setProviderLimitsCache: guard.blocked("setProviderLimitsCache"),
  setProviderLimitsCacheBatch: guard.blocked("setProviderLimitsCacheBatch"),
  deleteProviderLimitsCache: guard.blocked("deleteProviderLimitsCache"),
  getAllProviderLimitsCache: vi.fn(() => ({
    ollama: {
      fetchedAt: new Date().toISOString(),
      quotas: { included: { remainingPercentage: 0 }, purchased: { balance: 25 } },
    },
  })),
}));
vi.mock("@/lib/db/quotaSnapshots", () => ({
  getLatestQuotaSnapshotsForConnection: vi.fn((id: string) =>
    id === "persisted"
      ? [
          {
            connection_id: id,
            provider: "claude",
            window_key: "weekly",
            remaining_percentage: 0,
            is_exhausted: 1,
            next_reset_at: "2099-02-01T00:00:00Z",
            created_at: new Date().toISOString(),
          },
        ]
      : []
  ),
  saveQuotaSnapshot: guard.blocked("saveQuotaSnapshot"),
  cleanupOldSnapshots: guard.blocked("cleanupOldSnapshots"),
}));
vi.mock("@/lib/db/reasoningCache", async (original) => ({
  ...(await original<typeof import("@/lib/db/reasoningCache")>()),
  setReasoningCache: guard.blocked("setReasoningCache"),
  deleteReasoningCache: guard.blocked("deleteReasoningCache"),
  clearAllReasoningCache: guard.blocked("clearAllReasoningCache"),
  cleanupExpiredReasoning: guard.blocked("cleanupExpiredReasoning"),
}));
vi.mock("@/lib/db/quotaResetEvents", () => ({
  recordProviderQuotaResetEventIfChanged: guard.blocked("recordProviderQuotaResetEventIfChanged"),
}));
vi.mock("@/domain/quotaCache", async (original) => ({
  ...(await original<typeof import("@/domain/quotaCache")>()),
  setQuotaCache: guard.blocked("setQuotaCache"),
}));
vi.mock("@omniroute/open-sse/services/quotaPreflight.ts", async (original) => {
  const actual = await original<typeof import("@omniroute/open-sse/services/quotaPreflight.ts")>();
  return {
    ...actual,
    registerQuotaFetcher: vi.fn((provider: string) => {
      const spy = guard.blocked(`quota fetcher ${provider}`);
      guard.fetchers.set(provider, spy);
      actual.registerQuotaFetcher(provider, spy);
    }),
    getQuotaFetcher: vi.fn((provider: string) => actual.getQuotaFetcher(provider)),
    preflightQuota: guard.blocked("preflightQuota"),
  };
});
vi.mock("@/lib/usage/providerLimits", () => ({
  fetchLiveProviderLimits: guard.blocked("fetchLiveProviderLimits"),
  syncAllProviderLimits: guard.blocked("syncAllProviderLimits"),
  refreshAndUpdateCredentials: guard.blocked("refreshAndUpdateCredentials"),
}));
vi.mock("@/sse/services/tokenRefresh", () =>
  Object.fromEntries(
    [
      "refreshAccessToken",
      "refreshClaudeOAuthToken",
      "refreshGoogleToken",
      "refreshCodexToken",
      "refreshQoderToken",
      "refreshGitHubToken",
      "refreshCopilotToken",
      "refreshTokenByProvider",
      "checkAndRefreshToken",
      "refreshGitHubAndCopilotTokens",
    ].map((name) => [name, guard.blocked(name)])
  )
);
vi.mock("@omniroute/open-sse/services/tokenRefresh.ts", () =>
  Object.fromEntries(
    ["refreshAccessToken", "refreshTokenByProvider", "getAccessToken"].map((name) => [
      name,
      guard.blocked(name),
    ])
  )
);
vi.mock("@/app/api/providers/[id]/test/route", () =>
  Object.fromEntries(
    ["POST", "testOAuthConnection", "testSingleConnection"].map((name) => [
      name,
      guard.blocked(name),
    ])
  )
);
vi.mock("@/lib/usage/providerLimits/credentialRefresh", () => ({
  refreshAndUpdateCredentialsWithResolver: guard.blocked("refreshAndUpdateCredentialsWithResolver"),
}));
vi.mock("@/lib/kimi/tokenRefresh", () => ({
  refreshKimiProviderConnection: guard.blocked("refreshKimiProviderConnection"),
}));
vi.mock("@/lib/oauth/services/cursorLogin", () => ({
  refreshCursorAccessToken: guard.blocked("refreshCursorAccessToken"),
}));
vi.mock("@/lib/tokenHealthCheckCopilot", () => ({
  refreshGithubCopilotSubTokenIfNeeded: guard.blocked("refreshGithubCopilotSubTokenIfNeeded"),
}));
vi.mock("@/lib/api/modelTestRunner", () => ({
  runSingleModelTest: guard.blocked("runSingleModelTest"),
}));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
it("availability GET reads snapshots without fetchers, writes, refreshes or shared-cache mutation", async () => {
  const urls: string[] = [];
  const fetch = vi.fn((input: string | URL | Request) => {
    urls.push(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
    return Promise.reject(new Error("Network disabled in synthetic test"));
  });
  vi.stubGlobal("fetch", fetch);
  // Existing provider-limits GET triggers these same module-initialization version probes.
  const allowed = new Set([
    "https://registry.npmjs.org/@github/copilot/latest",
    "https://api.github.com/repos/openai/codex/releases/latest",
  ]);
  const route = await import("@/app/api/usage/availability/route");
  const reasoning = await import("@/lib/db/reasoningCache");
  // Existing provider-limits cold import also cleans expired reasoning rows once.
  expect(reasoning.cleanupExpiredReasoning).toHaveBeenCalledTimes(
    guard.attempts.filter((name) => name === "cleanupExpiredReasoning").length
  );
  const coldCleanupCalls = vi.mocked(reasoning.cleanupExpiredReasoning).mock.calls.length;
  expect(coldCleanupCalls).toBeLessThanOrEqual(1);
  expect(guard.attempts.filter((name) => name !== "cleanupExpiredReasoning")).toEqual([]);
  const coldUrls = [...urls];
  expect(coldUrls.filter((url) => !allowed.has(url))).toEqual([]);
  vi.mocked(reasoning.cleanupExpiredReasoning).mockClear();
  guard.attempts.length = 0;
  urls.length = 0;
  fetch.mockClear();
  const { registerQuotaFetchers } = await import("@/instrumentation-node");
  await registerQuotaFetchers();
  const preflight = await import("@omniroute/open-sse/services/quotaPreflight.ts");
  expect(guard.fetchers.size).toBeGreaterThan(0);
  expect([...preflight.getRegisteredQuotaFetchers().keys()].sort()).toEqual(
    [...guard.fetchers.keys()].sort()
  );
  for (const [provider, spy] of guard.fetchers)
    expect(preflight.getQuotaFetcher(provider)).toBe(spy);
  const { getQuotaCacheState } = await import("@/domain/quotaCacheState");
  const state = getQuotaCacheState();
  const previous = { cache: new Map(state.cache), healthyUntil: new Map(state.healthyUntil) };
  state.cache.set("healthy", {
    connectionId: "healthy",
    provider: "openai",
    quotas: {
      session: { remainingPercentage: 0, resetAt: "2099-02-01T00:00:00Z" },
    },
    modelQuotas: {},
    fetchedAt: Date.now(),
    exhausted: true,
    nextResetAt: "2099-02-01T00:00:00Z",
  });
  state.healthyUntil.set("healthy", Date.now() + 60_000);
  state.cache.set("expired", {
    connectionId: "expired",
    provider: "openai",
    quotas: {
      session: { remainingPercentage: 0, resetAt: "2000-01-01T00:00:00Z" },
    },
    modelQuotas: {},
    fetchedAt: Date.now(),
    exhausted: true,
    nextResetAt: "2000-01-01T00:00:00Z",
  });
  const before = structuredClone({ cache: state.cache, healthyUntil: state.healthyUntil });
  try {
    const response = await route.GET();
    expect(response.status).toBe(200);
    const second = await route.GET();
    expect(second.status).toBe(200);
    const body = await response.json();
    expect(body.connections).toHaveLength(4);
    expect(
      body.connections.find((c: { id: string }) => c.id === "healthy").account.allowanceReasons
    ).toContain("recentSuccess");
    expect(body.connections.find((c: { id: string }) => c.id === "persisted").account.usable).toBe(
      false
    );
    expect({ cache: state.cache, healthyUntil: state.healthyUntil }).toEqual(before);
    expect(urls.filter((url) => !allowed.has(url))).toEqual([]);
    expect(fetch.mock.calls.length).toBe(urls.length);
    for (const spy of guard.fetchers.values()) expect(spy).not.toHaveBeenCalled();
    const modules = await Promise.all([
      import("@/lib/db/core"),
      import("@/lib/db/providers"),
      import("@/lib/db/quotaSnapshots"),
      import("@/lib/db/quotaResetEvents"),
      import("@/domain/quotaCache"),
      import("@/lib/usage/providerLimits"),
      import("@/sse/services/tokenRefresh"),
      import("@omniroute/open-sse/services/tokenRefresh.ts"),
      import("@/app/api/providers/[id]/test/route"),
      import("@/lib/api/modelTestRunner"),
      import("@/lib/db/providerLimits"),
      import("@/lib/usage/providerLimits/credentialRefresh"),
      import("@/lib/kimi/tokenRefresh"),
      import("@/lib/oauth/services/cursorLogin"),
      import("@/lib/tokenHealthCheckCopilot"),
    ]);
    for (const exports of modules)
      for (const [name, value] of Object.entries(exports)) {
        if (
          vi.isMockFunction(value) &&
          !name.startsWith("getLatest") &&
          !name.startsWith("getAll") &&
          name !== "getProviderNodes" &&
          name !== "getDbInstance"
        )
          expect(value, name).not.toHaveBeenCalled();
      }
    expect(preflight.preflightQuota).not.toHaveBeenCalled();
    process.stdout.write(
      JSON.stringify({
        coldUrls,
        coldCleanupCalls,
        urls,
        registeredFetchers: guard.fetchers.size,
        forbiddenCalls: guard.attempts,
        sharedCacheUnchanged: true,
      }) + "\n"
    );
    expect({ cache: state.cache, healthyUntil: state.healthyUntil }).toEqual(before);
    expect(urls).toEqual([]);
    for (const name of [
      "setReasoningCache",
      "deleteReasoningCache",
      "clearAllReasoningCache",
      "cleanupExpiredReasoning",
    ] as const)
      expect(reasoning[name], name).not.toHaveBeenCalled();
    expect(guard.attempts).toEqual([]);
  } finally {
    state.cache = previous.cache;
    state.healthyUntil = previous.healthyUntil;
  }
}, 60_000);
