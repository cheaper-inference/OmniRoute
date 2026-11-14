import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #18425 (re-open of #12279): when a Codex account 429s mid-request, the in-request
// rotation (open-sse/handlers/chatCore/providerExecutionPipeline.ts) re-selects through the
// PLAIN getProviderCredentials, which never runs the quota preflight that the primary
// selection (src/sse/handlers/chat.ts) uses. The replacement can be an account the preflight
// would have blocked, so it serves one request and the next request settles elsewhere.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tfb-18425-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "tfb-18425-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const auth = await import("../../src/sse/services/auth.ts");
const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");
const { runProviderExecutionPipeline } =
  await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");

async function seed(name: string, priority: number) {
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name,
    email: `${name}@example.com`,
    accessToken: `${name}-access`,
    refreshToken: `${name}-refresh`,
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    isActive: true,
    testStatus: "active",
    priority,
    providerSpecificData: { quotaPreflightEnabled: true },
  });
}

async function scenario() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({ fallbackStrategy: "least-used" });
  const a = await seed("acct-a-limited", 1); // just took the 429
  const b = await seed("acct-b-depleted", 2); // never used, quota exhausted per fetcher
  const c = await seed("acct-c-healthy", 3);
  const resetAt = new Date(Date.now() + 120_000).toISOString();
  quotaPreflight.registerQuotaFetcher("codex", async (connectionId: string) => {
    const depleted = connectionId === b.id;
    const p = depleted ? 1 : 0.1;
    return {
      used: p * 100,
      total: 100,
      percentUsed: p,
      resetAt: depleted ? resetAt : null,
      windows: { session: { percentUsed: p, resetAt: depleted ? resetAt : null } },
    };
  });
  return { a, b, c };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#18425 auth level: the failover resolver skips the quota-exhausted account", async () => {
  const { a, c } = await scenario();
  const pre = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    null,
    "gpt-5.6-luna",
    { excludeConnectionIds: [a.id] }
  );
  assert.equal(pre.connectionId, c.id, "preflight selector must skip the exhausted account");
});

test("#18425 pipeline: Codex 429 failover must not rotate onto a quota-exhausted account", async () => {
  const { a, b, c } = await scenario();
  let currentId = a.id;
  const sentOn: string[] = [];
  const rotations: string[] = [];
  let sends = 0;
  const outcome = await runProviderExecutionPipeline({
    policy: { allowAccountRotation: true, allowModelFallback: false },
    target: {
      provider: "codex",
      requestedModel: "gpt-5.6-luna",
      sourceFormat: "openai",
      targetFormat: "openai",
      stream: false,
    },
    connection: {
      initialConnectionId: a.id,
      getCurrentConnectionId: () => currentId,
      getCredentials: () => ({ connectionId: currentId }),
      replaceCredentials: (next) => {
        currentId = String(next.connectionId);
      },
      onCredentialsRefreshed: () => {},
      assertManagedLeaseFence: () => {},
      allowedConnections: null,
      // Exactly what production wires (streamingResponse.ts / nonStreamingResponse.ts).
      getProviderCredentials: auth.getProviderCredentials as never,
      getProviderCredentialsWithQuotaPreflight: auth.getProviderCredentialsWithQuotaPreflight,
    },
    wire: {
      body: { model: "gpt-5.6-luna" },
      currentModel: "gpt-5.6-luna",
      triedModels: new Set(["gpt-5.6-luna"]),
      setBodyAndModel: () => {},
    },
    state: {
      updatePendingStage: () => {},
      recordRateLimitHeaders: () => {},
      recordRateLimitBody: () => {},
      writeTerminalStatus: async () => {},
      persistConnectionPatch: () => {},
      setConnectionRateLimitedUntil: () => {},
      lockModel: () => {},
      recordAntigravityQuotaState: async () => {},
      markAccountSemaphoreBlocked: () => {},
      isolateProbeFailures: () => false,
      onAuditAccountRotation: async (p: { newConnectionId: string }) => {
        rotations.push(p.newConnectionId);
      },
    } as never,
    sendProviderAttempt: async () => {
      sends += 1;
      sentOn.push(currentId);
      const [status, body] =
        sends === 1
          ? [429, { error: { type: "usage_limit_reached", message: "limit reached" } }]
          : [200, { choices: [{ message: {} }] }];
      return {
        response: new Response(JSON.stringify(body), {
          status,
          headers: { "content-type": "application/json", "retry-after": "60" },
        }),
        url: "https://upstream.test",
        headers: {},
        transformedBody: {},
      };
    },
  });

  assert.equal(outcome.kind, "response");
  assert.deepEqual(
    rotations,
    [c.id],
    `rotated to ${rotations} (b=${b.id} is exhausted, c=${c.id})`
  );
  assert.deepEqual(sentOn, [a.id, c.id]);
});
