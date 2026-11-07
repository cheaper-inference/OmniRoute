import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "m365-native-routing-"));
process.env.DATA_DIR = dir;
const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const semaphore = await import("../../open-sse/services/accountSemaphore.ts");
const admission = await import("../../open-sse/handlers/chatCore/executorHelpers.ts");
const { classifyProviderError } = await import("../../open-sse/services/errorClassifier.ts");
const { getModelInfoCore, isKnownCatalogModelId } =
  await import("../../open-sse/services/model.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { runProviderExecutionPipeline } =
  await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");
const { shouldSkipCredentialRefresh } =
  await import("../../open-sse/handlers/chatCore/skipCredentialRefresh.ts");
async function selected(connectionId: string, requestedModel: string) {
  return (await auth.getProviderCredentials(
    provider,
    null,
    [connectionId],
    requestedModel
  )) as Record<string, unknown> | null;
}
const provider = "copilot-m365-web";
const model = "claude-opus";
const licensed = "gpt-5.5";
const body = (code: string) => JSON.stringify({ error: { code, message: code, param: model } });
async function connection() {
  return (await db.createProviderConnection({
    provider,
    authType: "oauth",
    accessToken: "synthetic",
    isActive: true,
    testStatus: "active",
  })) as { id: string };
}
test.after(() => {
  semaphore.resetAll();
  fallback.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("the generic documented ids do not claim bare routing for other providers", async () => {
  // Measured before this guard: `quick` and `claude-sonnet` resolved to copilot-m365-web with no
  // connection, `claude` turned ambiguous, and `claude-opus` lost the Anthropic fallback.
  for (const bare of ["quick", "claude-sonnet", "claude-opus-5.5"]) {
    assert.equal(isKnownCatalogModelId(bare), false, bare);
    const resolved = await getModelInfoCore(bare, {});
    assert.equal(resolved.provider, null, bare);
    assert.equal(resolved.errorType, "model_not_found", bare);
  }
  assert.equal((await getModelInfoCore("claude", {})).provider, "pollinations");
  assert.equal((await getModelInfoCore("gpt-5.3", {})).provider, "openai");
});
test("a bare Claude id still reaches an active Anthropic connection", async () => {
  const anthropic = await db.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    apiKey: "synthetic",
    isActive: true,
    testStatus: "active",
  });
  invalidateDbCache();
  try {
    const resolved = await getModelInfoCore("claude-opus", {});
    assert.deepEqual([resolved.provider, resolved.model], ["anthropic", "claude-opus"]);
  } finally {
    await db.deleteProviderConnection(String(anthropic.id));
    invalidateDbCache();
  }
});
test("an explicit prefix and the legacy ids keep reaching Microsoft 365 Copilot", async () => {
  for (const prefix of [provider, "m365copilot"]) {
    const resolved = await getModelInfoCore(`${prefix}/claude-opus`, {});
    assert.deepEqual([resolved.provider, resolved.model], [provider, "claude-opus"]);
  }
  assert.equal((await getModelInfoCore("copilot-m365", {})).provider, provider);
  assert.equal(isKnownCatalogModelId("copilot-m365-claude-opus"), true);
});
test("chatCore does not classify a model licence refusal as an account ban", () => {
  assert.notEqual(
    classifyProviderError(403, body("m365_model_not_licensed"), provider),
    "forbidden"
  );
});
test("native pipeline skips credential refresh without consuming model licence refusal body", async () => {
  const response = new Response(body("m365_model_not_licensed"), { status: 403 });
  let refreshes = 0;
  let persists = 0;
  let sends = 0;
  let credentials: Record<string, unknown> = {
    connectionId: "synthetic-account",
    accessToken: "old",
  };
  await runProviderExecutionPipeline({
    policy: { allowAccountRotation: false, allowModelFallback: false },
    target: {
      provider,
      requestedModel: model,
      sourceFormat: "openai",
      targetFormat: "openai",
      stream: true,
    },
    wire: {
      body: { model },
      currentModel: model,
      triedModels: new Set([model]),
      setBodyAndModel: () => {},
    },
    connection: {
      initialConnectionId: "synthetic-account",
      getCurrentConnectionId: () => "synthetic-account",
      getCredentials: () => credentials,
      replaceCredentials: (next) => {
        credentials = next;
      },
      onCredentialsRefreshed: () => {
        persists++;
      },
      assertManagedLeaseFence: () => {},
      getProviderCredentials: async () => null,
      refreshCredentials: async () => {
        refreshes++;
        return { accessToken: "refreshed" };
      },
    },
    state: {
      updatePendingStage: () => {},
      recordRateLimitHeaders: () => {},
      recordRateLimitBody: () => {},
      writeTerminalStatus: async () => {},
      persistConnectionPatch: async () => null,
      setConnectionRateLimitedUntil: () => {},
      lockModel: () => {},
      recordAntigravityQuotaState: fallback.recordCoreOwnedAntigravityQuotaState,
      markAccountSemaphoreBlocked: () => {},
      isolateProbeFailures: () => false,
    },
    sendProviderAttempt: async () => {
      sends++;
      return {
        response: response.clone(),
        url: "https://synthetic.invalid",
        headers: {},
        transformedBody: { model },
      };
    },
  });
  assert.equal(refreshes, 0, "model licence denial must not enter credential refresh");
  assert.equal(persists, 0);
  assert.equal(sends, 1);
  assert.equal(await shouldSkipCredentialRefresh(provider, response), true);
  assert.equal(await response.text(), body("m365_model_not_licensed"));
});

for (const code of [
  "m365_model_not_licensed",
  "PremiumModelUnavailableForLicense",
  "ClaudeUnavailableForLicense",
]) {
  test(`${code} locks only the requested connection/model`, async () => {
    const conn = await connection();
    const verdict = fallback.checkFallbackError(403, body(code), 0, model, provider);
    assert.equal(verdict.ruleScope, "model");
    assert.equal(verdict.skipProviderBreaker, true);
    await auth.markAccountUnavailable(conn.id, 403, body(code), provider, model);
    const row = await db.getProviderConnectionById(conn.id);
    assert.equal(row.testStatus, "active");
    assert.ok(!row.rateLimitedUntil);
    assert.ok(fallback.getModelLockoutInfo(provider, conn.id, model));
    assert.ok(!fallback.getModelLockoutInfo(provider, conn.id, licensed));
    const credentials = await selected(conn.id, licensed);
    assert.equal(credentials?.connectionId, conn.id);
    const denied = await selected(conn.id, model);
    assert.notEqual(denied?.connectionId, conn.id);
  });
}
for (const [code, scope] of [
  ["m365_model_not_licensed", "model"],
  ["PremiumModelUnavailableForLicense", "model"],
  ["ClaudeUnavailableForLicense", "model"],
  ["m365_account_not_licensed", "connection"],
  ["InvalidCopilotLicense", "connection"],
] as const) {
  test(`${code} refresh exemption preserves original body and precise scope`, async () => {
    const response = new Response(body(code), { status: 403 });
    assert.equal(await shouldSkipCredentialRefresh(provider, response), true);
    assert.equal(await response.text(), body(code));
    const policy = fallback.checkFallbackError(403, body(code), 0, model, provider);
    assert.equal(policy.ruleScope, scope);
    assert.notEqual(policy.permanent, true);
    assert.equal(
      await shouldSkipCredentialRefresh("codex", new Response(body(code), { status: 403 })),
      false
    );
    assert.equal(
      await shouldSkipCredentialRefresh(provider, new Response(body(code), { status: 401 })),
      false
    );
  });
}

for (const code of [
  "m365_throttled",
  "m365_throttle_hold",
  "unclassified_native_throttle",
  "priority_access_exhausted",
]) {
  test(`${code} preserves Retry-After with correct admission scope, including combo exhaustion`, async () => {
    const conn = await connection();
    const headers = new Headers({ "Retry-After": "3600" });
    const before = Date.now();
    const verdict = fallback.checkFallbackError(429, body(code), 0, model, provider, headers);
    assert.equal(verdict.ruleScope, code === "priority_access_exhausted" ? "model" : "connection");
    // Two Date.now() reads separate the reset from the hint: allow the same tick as below.
    assert.ok(
      verdict.cooldownMs >= 3599000 && verdict.cooldownMs <= 3600000,
      String(verdict.cooldownMs)
    );
    await auth.markAccountUnavailable(conn.id, 429, body(code), provider, model, null, {
      headers,
      isCombo: true,
      persistUnavailableState: false,
    });
    const row = await db.getProviderConnectionById(conn.id);
    if (code === "priority_access_exhausted") {
      assert.ok(!row.rateLimitedUntil);
      const lock = fallback.getModelLockoutInfo(provider, conn.id, model);
      assert.ok(lock);
      assert.ok(lock.remainingMs >= 3599000, JSON.stringify(lock));
      assert.equal((await selected(conn.id, licensed))?.connectionId, conn.id);
    } else {
      assert.ok(Date.parse(String(row.rateLimitedUntil)) >= before + 3599000);
      assert.notEqual((await selected(conn.id, licensed))?.connectionId, conn.id);
    }
  });
}
test("native selected credentials serialize an account, permit peers, and abort queued admission", async () => {
  const first = await connection();
  await db.updateProviderConnection(first.id, {
    maxConcurrent: 8,
    rateLimitMaxConcurrent: 9,
    rateLimitOverrides: { modelConcurrency: { [model]: 12, [licensed]: 15 } },
  });
  const other = await connection();
  const creds = await selected(first.id, licensed);
  assert.ok(creds);
  const cap = admission.resolveAccountSemaphoreMaxConcurrency(creds);
  assert.equal(cap, 1);
  assert.equal(admission.resolveAccountSemaphoreMaxConcurrency(creds, false), 1);
  assert.equal(admission.resolveModelSemaphoreMaxConcurrency(creds, licensed), 15);
  const crossModelCreds = await selected(first.id, model);
  assert.ok(crossModelCreds);
  assert.equal(admission.resolveAccountSemaphoreMaxConcurrency(crossModelCreds), 1);
  const key = admission.resolveAccountSemaphoreKey({
    provider,
    model,
    connectionId: first.id,
    credentials: creds,
  });
  const release = await semaphore.acquire(key!, { maxConcurrency: cap });
  let entered = false;
  const crossModelKey = admission.resolveAccountSemaphoreKey({
    provider,
    model: licensed,
    connectionId: first.id,
    credentials: crossModelCreds,
  });
  assert.equal(crossModelKey, key, "different models share the account admission key");
  const queued = semaphore
    .acquire(crossModelKey!, {
      maxConcurrency: admission.resolveAccountSemaphoreMaxConcurrency(crossModelCreds),
    })
    .then((done) => {
      entered = true;
      return done;
    });
  const peer = await semaphore.acquire(`${provider}:${other.id}`, { maxConcurrency: cap });
  await new Promise<void>((resolve) => setImmediate(resolve));
  assert.equal(entered, false);
  const abort = new AbortController();
  const cancelled = semaphore.acquire(key!, { maxConcurrency: cap, signal: abort.signal });
  abort.abort();
  await assert.rejects(cancelled, { name: "AbortError" });
  peer();
  release();
  (await queued)();
});

// A licence denial is recoverable (the model lock or connection cooldown above); it must never
// classify as FORBIDDEN, which bans the connection permanently. Pinned so a change to this
// provider's category or the classifier cannot silently start banning licensed accounts.
test("an account licence denial is recorded as what it is, not as throttling", async () => {
  const conn = await connection();
  await auth.markAccountUnavailable(
    conn.id,
    403,
    body("m365_account_not_licensed"),
    provider,
    model
  );
  const row = await db.getProviderConnectionById(conn.id);
  assert.equal(row.lastError, "M365 account not licensed");
  assert.equal(Number(row.errorCode), 403);
});
for (const code of ["m365_account_not_licensed", "m365_model_not_licensed"]) {
  test(`${code} never classifies as a permanent FORBIDDEN ban`, () => {
    const denial = body(code);
    for (const input of [denial, JSON.parse(denial), "Microsoft 365 Copilot access denied."]) {
      assert.notEqual(classifyProviderError(403, input, provider), "forbidden");
    }
  });
}
