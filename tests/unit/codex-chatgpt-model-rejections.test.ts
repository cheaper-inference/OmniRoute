/**
 * Codex + ChatGPT-account unsupported-model refusal:
 *   "The 'gpt-6.1-sol' model is not supported when using Codex with a ChatGPT account."
 *
 * The message matches PROVIDER_MODEL_UNSUPPORTED_PATTERNS, so before this change it took the
 * #10460 branch (shouldFallback:false) and never rotated to a sibling codex account — and the
 * combo path locked it through the quota-family key (all gpt-5* / spark models down for 1h).
 *
 * These tests pin the corrected contract:
 *   1. rotation keeps working (per-account, exactly ONE lock per refusing account),
 *   2. the lock is exact-model only (siblings stay routable — T09 regression guard),
 *   3. no false positives (different model, non-codex provider, quota/auth wording),
 *   4. probe-origin failures never learn a lock,
 *   5. the rejection survives a restart (rehydration) and expires on its own TTL,
 *   6. the #10460 provider-wide behaviour is intact for the messages it does cover.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-chatgpt-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-chatgpt-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const locks = await import("../../open-sse/services/accountFallback.ts");
const auth = await import("../../src/sse/services/auth.ts");
const rejections = await import("../../open-sse/services/codexChatgptModelRejections.ts");
const { runAsProbe } = await import("../../src/shared/utils/probeOrigin.ts");
const { executeTargetAttempt } =
  await import("../../open-sse/services/combo/executeTargetAttempt.ts");

type AttemptLoopDeps = import("../../open-sse/services/combo/attemptLoopTypes.ts").AttemptLoopDeps;
type AttemptLoopState =
  import("../../open-sse/services/combo/attemptLoopTypes.ts").AttemptLoopState;
type ResolvedComboTarget = import("../../open-sse/services/combo/types.ts").ResolvedComboTarget;

const MODEL = "gpt-6.1-sol";
const SIBLING = "gpt-5.6-astra";
const SPARK = "codex-spark";
const MESSAGE = `The '${MODEL}' model is not supported when using Codex with a ChatGPT account.`;

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  locks.clearAllModelLockouts();
}

async function seedCodexConnection(name: string): Promise<string> {
  const connection = (await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name,
    email: `${name}@example.com`,
    apiKey: null,
    accessToken: `${name}-access`,
    refreshToken: `${name}-refresh`,
  })) as Record<string, unknown>;
  return String(connection.id);
}

async function persistedModels(connectionId: string): Promise<string[]> {
  return providersDb.readCodexUnsupportedModels(connectionId).map((entry) => entry.model);
}

test.beforeEach(resetStorage);

test.after(() => {
  locks.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("recognizes the exact upstream sentence and extracts the rejected model", () => {
  assert.equal(rejections.getCodexChatgptUnsupportedModel(MESSAGE), MODEL);
  // Quoting/casing/spacing vary between Codex client versions.
  assert.equal(
    rejections.getCodexChatgptUnsupportedModel(
      `The ${MODEL} model is not supported when using Codex with a ChatGPT account.`
    ),
    MODEL
  );
  assert.equal(
    rejections.getCodexChatgptUnsupportedModel(
      `the "${MODEL}" model is not supported when using codex with a chatgpt account`
    ),
    MODEL
  );
  assert.equal(
    rejections.getCodexChatgptUnsupportedModel("The requested model is not supported."),
    null
  );
});

test("rotates instead of stopping: markAccountUnavailable reports shouldFallback true", async () => {
  const connectionId = await seedCodexConnection("rotate-a");

  const result = await auth.markAccountUnavailable(connectionId, 400, MESSAGE, "codex", MODEL);

  assert.equal(result.shouldFallback, true, "#10460 branch must not claim this account-scoped 400");
  // Exact-model lock, in memory and persisted, with the bounded TTL.
  assert.equal(locks.isModelLocked("codex", connectionId, MODEL), true);
  assert.deepEqual(await persistedModels(connectionId), [MODEL]);
  const lock = locks
    .getAllModelLockouts()
    .find((entry) => entry.connectionId === connectionId && entry.model === MODEL);
  assert.ok(lock, "exact-model lock entry expected");
  assert.equal(lock.reason, "codex_chatgpt_model_not_supported");
  assert.equal(lock.until - Date.parse(lock.lockedAt), 6 * 60 * 60 * 1_000);
});

test("the lock is exact-model: sibling and spark models of the same account stay routable", async () => {
  const connectionId = await seedCodexConnection("scope-a");

  await auth.markAccountUnavailable(connectionId, 400, MESSAGE, "codex", MODEL);

  // T09 regression guard: a quota-family lock would take every gpt-5*/spark model down.
  assert.equal(locks.isModelLocked("codex", connectionId, SIBLING), false);
  assert.equal(locks.isModelLocked("codex", connectionId, SPARK), false);
  assert.deepEqual(await persistedModels(connectionId), [MODEL]);
});

test("per-account rotation: a sibling account is still selected and only the refusing one is marked", async () => {
  const refusing = await seedCodexConnection("rotate-refusing");
  const healthy = await seedCodexConnection("rotate-healthy");

  const first = await auth.markAccountUnavailable(refusing, 400, MESSAGE, "codex", MODEL);
  assert.equal(first.shouldFallback, true);

  assert.equal(locks.isModelLocked("codex", refusing, MODEL), true);
  assert.equal(
    locks.isModelLocked("codex", healthy, MODEL),
    false,
    "the sibling account must keep serving the model"
  );
  assert.deepEqual(await persistedModels(healthy), []);
});

test("effort-suffixed request is covered by the same rejection", async () => {
  const connectionId = await seedCodexConnection("effort-a");

  const result = await auth.markAccountUnavailable(
    connectionId,
    400,
    MESSAGE,
    "codex",
    `${MODEL}-high`
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(locks.isModelLocked("codex", connectionId, `${MODEL}-high`), true);
});

test("a message naming a DIFFERENT model does not lock the requested one", async () => {
  const connectionId = await seedCodexConnection("different-model");

  const result = await auth.markAccountUnavailable(
    connectionId,
    400,
    MESSAGE,
    "codex",
    "gpt-5.6-astra"
  );

  // Falls through to the generic path; what matters is that no codex-ChatGPT lock was learned.
  assert.deepEqual(
    locks
      .getAllModelLockouts()
      .filter((entry) => entry.reason === "codex_chatgpt_model_not_supported"),
    []
  );
  assert.deepEqual(await persistedModels(connectionId), []);
  assert.equal(typeof result.shouldFallback, "boolean");
});

test("a non-codex provider using the same wording is untouched", async () => {
  const connection = (await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    accessToken: "gho_synthetic",
    isActive: true,
    testStatus: "active",
  })) as Record<string, unknown>;
  const connectionId = String(connection.id);

  const result = await auth.markAccountUnavailable(connectionId, 400, MESSAGE, "github", MODEL);

  assert.deepEqual(
    locks
      .getAllModelLockouts()
      .filter((entry) => entry.reason === "codex_chatgpt_model_not_supported"),
    []
  );
  // #10460 keeps its provider-wide behaviour for github.
  assert.equal(result.shouldFallback, false);
  assert.equal((result as { reason?: string }).reason, "provider_model_unsupported");
});

test("quota / auth wording next to the same words is not learned as an entitlement fact", () => {
  const noisy = [
    `${MESSAGE} Rate limit reached.`,
    `${MESSAGE} Quota exceeded for this workspace.`,
    `${MESSAGE} Invalid API key provided.`,
    `${MESSAGE} Unauthorized client.`,
  ];
  for (const text of noisy) {
    assert.equal(
      rejections.isCodexChatgptUnsupportedModelRejection({
        provider: "codex",
        status: 400,
        model: MODEL,
        errorText: text,
      }),
      false,
      `must not learn from: ${text}`
    );
  }
});

test("probe-origin failures never learn a codex rejection", async () => {
  const connectionId = await seedCodexConnection("probe-a");

  const result = await runAsProbe(() =>
    auth.markAccountUnavailable(connectionId, 400, MESSAGE, "codex", MODEL)
  );

  assert.deepEqual(
    locks
      .getAllModelLockouts()
      .filter((entry) => entry.reason === "codex_chatgpt_model_not_supported"),
    []
  );
  assert.deepEqual(await persistedModels(connectionId), []);
  assert.equal(result.shouldFallback, true);
});

test("a persisted rejection is rehydrated after a restart", async () => {
  const connectionId = await seedCodexConnection("restart-a");
  const until = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  providersDb.persistCodexUnsupportedModel(connectionId, MODEL, until);

  // Simulate a process restart: in-memory locks are gone, the DB row is not.
  locks.clearAllModelLockouts();
  assert.equal(locks.isModelLocked("codex", connectionId, MODEL), false);

  const connection = await providersDb.getProviderConnectionById(connectionId);
  assert.ok(connection);
  rejections.rehydrateCodexChatgptModelLocks("codex", [
    {
      id: connectionId,
      providerSpecificData: (connection as Record<string, unknown>).providerSpecificData,
    },
  ]);

  assert.equal(locks.isModelLocked("codex", connectionId, MODEL), true);
});

test("rehydrating an expired persisted entry locks nothing", async () => {
  const connectionId = await seedCodexConnection("expired-a");
  providersDb.persistCodexUnsupportedModel(
    connectionId,
    MODEL,
    new Date(Date.now() - 1_000).toISOString()
  );

  // The persisted deadline is in the past, so it is not re-materialized.
  locks.clearAllModelLockouts();
  const rehydrated = rejections.rehydrateCodexChatgptModelLocks("codex", [
    {
      id: connectionId,
      providerSpecificData: {
        codexUnsupportedModelsUntil: { [MODEL]: new Date(Date.now() - 1_000).toISOString() },
      },
    },
  ]);
  assert.equal(rehydrated, 0);
  assert.equal(locks.isModelLocked("codex", connectionId, MODEL), false);
});

test("persisting an already-expired deadline stores nothing routable", async () => {
  const connectionId = await seedCodexConnection("expired-write-a");

  assert.equal(
    providersDb.persistCodexUnsupportedModel(
      connectionId,
      MODEL,
      new Date(Date.now() - 60_000).toISOString()
    ),
    true
  );
  // Pruned on write: an expired entry is never readable as an active rejection.
  assert.deepEqual(providersDb.readCodexUnsupportedModels(connectionId), []);
});

test("persisting keeps the later deadline and clearing removes the entry", async () => {
  const connectionId = await seedCodexConnection("ttl-a");
  const sooner = new Date(Date.now() + 60_000).toISOString();
  const later = new Date(Date.now() + 120_000).toISOString();

  assert.equal(providersDb.persistCodexUnsupportedModel(connectionId, MODEL, later), true);
  assert.equal(providersDb.persistCodexUnsupportedModel(connectionId, MODEL, sooner), true);
  const entries = providersDb.readCodexUnsupportedModels(connectionId);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].until, later, "a shorter refusal must never shorten the lock");

  assert.equal(providersDb.clearCodexUnsupportedModel(connectionId, MODEL), true);
  assert.deepEqual(providersDb.readCodexUnsupportedModels(connectionId), []);
  // Clearing an absent entry is a no-op, not a write.
  assert.equal(providersDb.clearCodexUnsupportedModel(connectionId, MODEL), false);
});

test("sibling models survive a persisted rejection on the same connection", async () => {
  const connectionId = await seedCodexConnection("sibling-a");
  providersDb.persistCodexUnsupportedModel(
    connectionId,
    MODEL,
    new Date(Date.now() + 60 * 60 * 1000).toISOString()
  );

  const connection = await providersDb.getProviderConnectionById(connectionId);
  rejections.rehydrateCodexChatgptModelLocks("codex", [
    {
      id: connectionId,
      providerSpecificData: (connection as Record<string, unknown>).providerSpecificData,
    },
  ]);

  assert.equal(locks.isModelLocked("codex", connectionId, MODEL), true);
  assert.equal(locks.isModelLocked("codex", connectionId, SIBLING), false);
  assert.equal(locks.isModelLocked("codex", connectionId, SPARK), false);
});

test("#10460 regression: provider-wide unsupported 400 still stops rotation for codex", async () => {
  const connectionId = await seedCodexConnection("10460-a");

  const result = await auth.markAccountUnavailable(
    connectionId,
    400,
    "The requested model is not supported.",
    "codex",
    "gpt-9-unknown"
  );

  assert.equal(result.shouldFallback, false);
  assert.equal((result as { reason?: string }).reason, "provider_model_unsupported");
  // Not mislabelled as the account-scoped ChatGPT rejection.
  assert.equal(locks.isModelLocked("codex", connectionId, "gpt-9-unknown"), false);
});

test("all connections rejected → the cooldown result reports model_not_supported", async () => {
  const connectionId = await seedCodexConnection("flag-a");
  await auth.markAccountUnavailable(connectionId, 400, MESSAGE, "codex", MODEL);

  const connection = await providersDb.getProviderConnectionById(connectionId);
  const flag = rejections.codexChatgptRejectionFlag(
    "codex",
    MODEL,
    [{ id: connectionId }],
    new Map([[connectionId, "modelLocked"]])
  );
  assert.deepEqual(flag, { modelNotSupported: true });
  assert.ok(connection);

  // A connection that is merely excluded is not evidence of a rejection.
  assert.deepEqual(
    rejections.codexChatgptRejectionFlag(
      "codex",
      MODEL,
      [{ id: connectionId }],
      new Map([[connectionId, "excluded"]])
    ),
    {}
  );
  // Other providers never claim the flag.
  assert.deepEqual(
    rejections.codexChatgptRejectionFlag("github", MODEL, [{ id: connectionId }], new Map()),
    {}
  );
});

// ---------------------------------------------------------------------------
// Combo dispatch: executeTargetAttempt must not fall through to the quota-family
// lock. Without the interception, `lockModelIfPerModelQuota()` → getModelLockKey()
// → getCodexModelScope() (default scope "codex") takes every gpt-5*/spark model of
// the account down for an hour because ONE model was refused on ONE plan.
// ---------------------------------------------------------------------------

function attemptState(overrides: Partial<AttemptLoopState> = {}): AttemptLoopState {
  return {
    orderedTargets: [],
    fallbackCount: 0,
    recordedAttempts: 0,
    comboErrors: [],
    lastError: null,
    lastStatus: null,
    earliestRetryAfter: null,
    comboExpired: false,
    exhaustedProviders: new Set(),
    exhaustedConnections: new Set(),
    transientRateLimitedProviders: new Set(),
    abortControllers: new Map([[0, new AbortController()]]),
    dispatchedTargets: new Set(),
    targetFailureTrust: new Map(),
    comboAttemptOrder: [],
    skippedForCircuitOpen: false,
    earliestCircuitOpenRetryMs: 0,
    globalAttempts: 0,
    observedFailure: false,
    allObservedFailuresQuota: true,
    observeFailure() {},
    ...overrides,
  };
}

function attemptDeps(overrides: Partial<AttemptLoopDeps> = {}): AttemptLoopDeps {
  return {
    strategy: "priority",
    combo: { name: "codex-combo", models: [] },
    config: {},
    log: { info() {}, warn() {}, debug() {}, error() {} },
    settings: null,
    resilienceSettings: {
      providerCooldown: { enabled: false },
    } as AttemptLoopDeps["resilienceSettings"],
    sticky: { targets: [], messageHash: null, stuck: false },
    effectiveSessionId: null,
    preScreenMap: new Map(),
    quotaCutoffResetWindowConfig: {} as AttemptLoopDeps["quotaCutoffResetWindowConfig"],
    maxRetries: 0,
    traceInvocationId: "inv-codex",
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async () => {
      throw new Error("handleSingleModel must be stubbed");
    },
    body: { messages: [{ role: "user", content: "hi" }] },
    startTime: Date.now(),
    releaseStickyPinOnFailure() {},
    clearStaleLKGP() {},
    ...overrides,
  };
}

function codexTarget(
  connectionId: string,
  model: string,
  overrides: Partial<ResolvedComboTarget> = {}
): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: "s1",
    executionKey: `ek-${connectionId}`,
    modelStr: `codex/${model}`,
    provider: "codex",
    providerId: null,
    connectionId,
    weight: 1,
    label: null,
    ...overrides,
  };
}

test("combo attempt locks the exact model instead of the whole codex quota family", async () => {
  const connectionId = await seedCodexConnection("combo-a");
  const target = codexTarget(connectionId, MODEL);
  const state = attemptState({ orderedTargets: [target] });
  const deps = attemptDeps({
    handleSingleModelWithTimeout: async () =>
      new Response(JSON.stringify({ error: { message: MESSAGE } }), {
        status: 400,
        headers: {
          "content-type": "application/json",
          "x-omniroute-selected-connection-id": connectionId,
        },
      }),
  });

  await executeTargetAttempt({
    index: 0,
    state,
    deps,
    targetForAttempt: target,
    profile: {},
    protectedPriorityTarget: false,
  });

  // The exact model is locked in-memory…
  assert.equal(locks.isModelLocked("codex", connectionId, MODEL), true);
  // …and the siblings the quota-family lock would have taken down are untouched.
  assert.equal(locks.isModelLocked("codex", connectionId, SIBLING), false);
  assert.equal(locks.isModelLocked("codex", connectionId, SPARK), false);
  // Not mislabelled as the generic 1h capacity lock.
  const entry = locks
    .getAllModelLockouts()
    .find((lock) => lock.connectionId === connectionId && lock.model === MODEL);
  assert.equal(entry?.reason, "codex_chatgpt_model_not_supported");
  // Durability is the account loop's job (markAccountUnavailable → auth.ts persists): the combo
  // layer is in-memory only, so it never opens a second DB write into open-sse/services/combo/.
  assert.deepEqual(await persistedModels(connectionId), []);
});

test("combo attempt does not lock a provider-wide unsupported 400 as a codex rejection", async () => {
  const connectionId = await seedCodexConnection("combo-generic");
  const target = codexTarget(connectionId, "gpt-9-unknown");
  const state = attemptState({ orderedTargets: [target, codexTarget("c-other", "gpt-9-unknown")] });
  const deps = attemptDeps({
    handleSingleModelWithTimeout: async () =>
      new Response(
        JSON.stringify({ error: { message: "The requested model is not supported." } }),
        {
          status: 400,
          headers: {
            "content-type": "application/json",
            "x-omniroute-selected-connection-id": connectionId,
          },
        }
      ),
  });

  await executeTargetAttempt({
    index: 0,
    state,
    deps,
    targetForAttempt: target,
    profile: {},
    protectedPriorityTarget: false,
  });

  // The generic model-scoped branch still owns this case; no codex-specific learning.
  assert.deepEqual(await persistedModels(connectionId), []);
  assert.deepEqual(
    locks
      .getAllModelLockouts()
      .filter((lock) => lock.reason === "codex_chatgpt_model_not_supported"),
    []
  );
});

// The refusal never reaches the combo layer as the raw upstream sentence: the account loop
// (handleSingleModelChat) consumes it, markAccountUnavailable() learns the exact-model lock,
// and the exhausted pool answers with credentialCooldownResponse()'s synthesized
// `400 {"error":{"message":"The requested model is not supported.","code":"model_not_supported"}}`.
// That text ALSO matches isModelScoped400(), so without an explicit guard the combo layer would
// re-read our own marker as upstream evidence and take the whole codex quota family down for 1h —
// the exact bug this change removes, reintroduced one layer up.
test("the auth layer's synthesized model_not_supported 400 does not family-lock codex", async () => {
  const connectionId = await seedCodexConnection("combo-synth");
  const target = codexTarget(connectionId, MODEL);
  const state = attemptState({
    orderedTargets: [target, codexTarget("c-other", MODEL)],
  });
  const deps = attemptDeps({
    handleSingleModelWithTimeout: async () =>
      new Response(
        JSON.stringify({
          error: {
            message: "The requested model is not supported.",
            type: "invalid_request_error",
            code: "model_not_supported",
          },
        }),
        {
          status: 400,
          headers: {
            "content-type": "application/json",
            "x-omniroute-selected-connection-id": connectionId,
          },
        }
      ),
  });

  await executeTargetAttempt({
    index: 0,
    state,
    deps,
    targetForAttempt: target,
    profile: {},
    protectedPriorityTarget: false,
  });

  // Nothing is learned here: the exact-model lock is the auth layer's job, and this body is
  // this process's own summary, not upstream evidence.
  assert.equal(locks.isModelLocked("codex", connectionId, MODEL), false);
  assert.deepEqual(
    locks.getAllModelLockouts().filter((lock) => lock.connectionId === connectionId),
    []
  );
  // Siblings must stay routable — the quota-family key is what took them down.
  assert.equal(locks.isModelLocked("codex", connectionId, SIBLING), false);
  assert.equal(locks.isModelLocked("codex", connectionId, SPARK), false);
});
