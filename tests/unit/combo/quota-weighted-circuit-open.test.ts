import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { QuotaInfo } from "../../../open-sse/services/quotaPreflight.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qw-circuit-open-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = dataDir;

const coreDb = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const quotaCache = await import("../../../src/domain/quotaCache.ts");
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../../src/shared/utils/circuitBreaker.ts");
const { getInflight, incrementInflight, _clearInflightForTest } =
  await import("../../../open-sse/services/combo/quotaShareInflight.ts");

const { resolveProviderId } = await import("../../../src/shared/constants/providers.ts");
const { resolveResetAwareConfig } =
  await import("../../../open-sse/services/combo/quotaScoring.ts");
const { fetchResetAwareQuotaWithCache, orderTargetsByQuotaWeighted } =
  await import("../../../open-sse/services/combo/quotaStrategies.ts");
const { invalidateDbCache } = await import("../../../src/lib/db/readCache.ts");
const {
  pinNativeCodexTurn,
  getNativeCodexTurnPin,
  getNativeCodexTurnActiveGeneration,
  clearNativeCodexTurnPinsForTests,
} = await import("../../../open-sse/services/combo/nativeCodexTurnPin.ts");

const noopLog = { warn: () => {}, info: () => {}, debug: () => {}, error: () => {} };

test.afterEach(() => {
  resetAllCircuitBreakers();
  quotaCache.__clearForTests();
  _clearInflightForTest();
  clearNativeCodexTurnPinsForTests();
});

test.after(async () => {
  await new Promise<void>((resolve) => setImmediate(resolve));
  coreDb.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

type FixtureOptions = {
  openForMs?: number;
  isActive?: boolean;
  exhausted?: boolean;
  provider?: string;
  storedProvider?: string;
  model?: string;
  fetcher?: boolean;
  quota?: QuotaInfo | null;
  domainRemaining?: number | null;
  connection?: Record<string, unknown>;
};

async function createTarget(options: FixtureOptions = {}) {
  const provider = options.provider ?? `qw-circuit-open-${randomUUID()}`;
  const quotaProvider = resolveProviderId(provider);
  const model = `${provider}/${options.model ?? "model-x"}`;
  let quotaFetches = 0;
  const fetchQuota = async () => {
    quotaFetches++;
    return options.quota === undefined ? { used: 20, total: 100, percentUsed: 0.2 } : options.quota;
  };
  if (options.fetcher !== false) registerQuotaFetcher(quotaProvider, fetchQuota);
  const connection = await providersDb.createProviderConnection({
    provider: options.storedProvider ?? provider,
    authType: "apikey",
    name: `synthetic-${randomUUID()}`,
    apiKey: `synthetic-test-key-${randomUUID()}`,
    isActive: options.isActive !== false,
    testStatus: "active",
    ...options.connection,
  });
  const connectionId = String(connection.id);
  if (options.domainRemaining !== null) {
    quotaCache.setQuotaCache(connectionId, quotaProvider, {
      [options.model ?? "model-x"]: {
        remainingPercentage: options.exhausted ? 0 : (options.domainRemaining ?? 80),
        resetAt: new Date(Date.now() + 3600_000).toISOString(),
      },
    });
  }
  const breaker = getCircuitBreaker(provider, {
    failureThreshold: 1,
    resetTimeout: options.openForMs ?? 60_000,
  });
  if (options.openForMs !== undefined) breaker._onFailure();
  return {
    provider,
    quotaProvider,
    connectionId,
    connection,
    model,
    breaker,
    fetchQuota,
    quotaFetches: () => quotaFetches,
  };
}

type Fixture = Awaited<ReturnType<typeof createTarget>>;

function resolvedTarget(target: Fixture): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: target.model,
    executionKey: target.model,
    modelStr: target.model,
    provider: target.provider,
    providerId: target.quotaProvider,
    connectionId: target.connectionId,
    weight: 1,
    label: null,
  };
}

async function primeQuota(target: Fixture, config: Record<string, unknown> = {}) {
  await fetchResetAwareQuotaWithCache({
    provider: target.quotaProvider,
    connectionId: target.connectionId,
    connection: { ...target.connection, requestedModel: target.model },
    fetcher: target.fetchQuota,
    config: resolveResetAwareConfig(config),
    log: noopLog,
    comboName: "circuit-cache-fixture",
  });
}

async function runCombo(
  targets: Fixture[],
  apiKeyAllowedConnections = targets.map((target) => target.connectionId),
  options: {
    models?: unknown[];
    config?: Record<string, unknown>;
    body?: Record<string, unknown>;
    comboName?: string;
    native?: boolean;
    onDispatch?: (connectionId: string) => void;
  } = {}
) {
  const dispatched: string[] = [];
  const response = await handleComboChat({
    body: options.body ?? { messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: options.comboName ?? `qw-circuit-open-${randomUUID()}`,
      strategy: "quota-weighted",
      models:
        options.models ??
        targets.map((target) => ({
          model: target.model,
          allowedConnectionIds: [target.connectionId],
        })),
      config: {
        maxRetries: 0,
        maxSetRetries: 0,
        disableSessionStickiness: true,
        connectionAwareExpansion: true,
        ...options.config,
      },
    },
    apiKeyAllowedConnections,
    clientManagedResponsesContext: options.native,
    handleSingleModel: async (_body, _model, target) => {
      const id = target && "connectionId" in target ? (target.connectionId ?? "") : "";
      dispatched.push(id);
      options.onDispatch?.(id);
      return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "x-omniroute-selected-connection-id": id },
      });
    },
    isModelAvailable: async () => true,
    log: noopLog,
    settings: null,
    allCombos: null,
  });
  return { response, dispatched };
}

async function assertBlocked(
  result: Awaited<ReturnType<typeof runCombo>>,
  status: 404 | 503,
  reason = "circuit_open"
) {
  assert.deepEqual(result.dispatched, []);
  assert.equal(result.response.status, status, await result.response.clone().text());
  const payload = (await result.response.json()) as {
    error: { code: string };
    diagnostics: { excluded: Array<{ reason: string }> };
  };
  assert.equal(payload.error.code, status === 503 ? "all_targets_cooling_down" : "model_not_found");
  if (status === 503) {
    assert.ok(payload.diagnostics.excluded.length > 0);
    assert.ok(payload.diagnostics.excluded.every((entry) => entry.reason === reason));
  } else {
    assert.equal(result.response.headers.get("Retry-After"), null);
  }
}

test("quota-weighted all-OPEN providers return temporary 503 with earliest Retry-After", async (t) => {
  const now = Date.now();
  t.mock.method(Date, "now", () => now);
  const targets = [
    await createTarget({ openForMs: 120_001 }),
    await createTarget({ openForMs: 60_001 }),
  ];
  for (const target of targets) assert.equal(target.breaker.getStatus().state, "OPEN");

  const { response, dispatched } = await runCombo(targets);
  assert.deepEqual(dispatched, []);
  for (const target of targets) {
    assert.equal(target.quotaFetches(), 0);
    assert.equal(getInflight(target.connectionId), 0);
  }
  assert.equal(response.status, 503, await response.clone().text());
  assert.equal(response.headers.get("Retry-After"), "61");
  const payload = (await response.json()) as {
    error: { code: string; type: string };
    recovery_hint: unknown;
    diagnostics: {
      attempted: number;
      attemptOrder: unknown[];
      terminalReason: string;
      excluded: Array<{ provider: string; model: string; reason: string }>;
      recovery: { action: string; next_step: string; retry_after_seconds: number };
    };
  };
  assert.equal(payload.error.code, "all_targets_cooling_down");
  assert.equal(payload.error.type, "service_unavailable");
  assert.equal(payload.diagnostics.terminalReason, "all_targets_cooling_down");
  assert.equal(payload.diagnostics.attempted, 0);
  assert.deepEqual(payload.diagnostics.attemptOrder, []);
  assert.deepEqual(
    payload.diagnostics.excluded,
    targets.map((target) => ({
      provider: target.provider,
      model: "model-x",
      reason: "circuit_open",
    }))
  );
  assert.equal(payload.diagnostics.recovery.action, "wait");
  assert.match(payload.diagnostics.recovery.next_step, /circuit breaker/);
  assert.equal(payload.diagnostics.recovery.retry_after_seconds, 61);
  assert.deepEqual(payload.recovery_hint, payload.diagnostics.recovery);
});

test("quota-weighted dispatches a healthy sibling while another provider is OPEN", async () => {
  const open = await createTarget({ openForMs: 60_000 });
  const healthy = await createTarget();
  const { response, dispatched } = await runCombo([open, healthy]);
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(dispatched, [healthy.connectionId]);
  assert.equal(open.quotaFetches(), 0);
  assert.equal(healthy.quotaFetches(), 1);
  assert.equal(getInflight(open.connectionId), 0);
  assert.equal(getInflight(healthy.connectionId), 0);
});

for (const unavailable of ["inactive", "API key denied", "quota exhausted"]) {
  test(`quota-weighted OPEN provider retains 404 when its account is ${unavailable}`, async () => {
    const target = await createTarget({
      openForMs: 60_000,
      isActive: unavailable !== "inactive",
      exhausted: unavailable === "quota exhausted",
    });
    const allowed = unavailable === "API key denied" ? [randomUUID()] : [target.connectionId];
    const { response, dispatched } = await runCombo([target], allowed);
    assert.equal(response.status, 404, await response.clone().text());
    assert.equal(response.headers.get("Retry-After"), null);
    assert.deepEqual(dispatched, []);
    assert.equal(target.quotaFetches(), 0);
    const payload = (await response.json()) as { error: { code: string } };
    assert.equal(payload.error.code, "model_not_found");
  });
}

for (const fetcher of [true, false]) {
  for (const status of ["banned", " ExPiReD ", " CREDITS_EXHAUSTED ", " DeAcTiVaTeD "]) {
    test(`OPEN ${fetcher ? "fetcher" : "no-fetcher"} account with status ${status.trim()} is not temporary`, async () => {
      const target = await createTarget({
        fetcher,
        openForMs: 60_000,
        connection: { testStatus: status },
      });
      await assertBlocked(await runCombo([target]), 404);
      assert.equal(target.quotaFetches(), 0);
    });
  }

  for (const restriction of [
    "empty pool",
    "inactive",
    "missing pin",
    "foreign pin",
    "step denial",
    "API denial",
  ]) {
    test(`OPEN ${fetcher ? "fetcher" : "no-fetcher"} account respects ${restriction}`, async () => {
      const target = await createTarget({
        fetcher,
        openForMs: 60_000,
        isActive: restriction !== "inactive",
      });
      const foreign = await createTarget({ fetcher: false });
      if (restriction === "empty pool")
        await providersDb.deleteProviderConnection(target.connectionId);
      const pin =
        restriction === "missing pin"
          ? randomUUID()
          : restriction === "foreign pin"
            ? foreign.connectionId
            : target.connectionId;
      const models = [
        {
          model: target.model,
          connectionId: pin,
          allowedConnectionIds: restriction === "step denial" ? [foreign.connectionId] : [pin],
        },
      ];
      const apiIds = restriction === "API denial" ? [foreign.connectionId] : [pin];
      await assertBlocked(await runCombo([target], apiIds, { models }), 404);
      assert.equal(target.quotaFetches(), 0);
    });
  }
}

for (const fetcher of [true, false]) {
  test(`OPEN ${fetcher ? "fetcher" : "no-fetcher"} with unknown quota and empty allowlists is temporary`, async () => {
    const target = await createTarget({
      fetcher,
      quota: null,
      domainRemaining: null,
      openForMs: 60_000,
    });
    await assertBlocked(
      await runCombo([target], [], {
        models: [{ model: target.model, allowedConnectionIds: [] }],
      }),
      503
    );
    assert.equal(target.quotaFetches(), 0);
    assert.equal(getInflight(target.connectionId), 0);
  });
}

test("no-fetcher account cooldown keeps the shorter OPEN breaker hint", async (t) => {
  const now = Date.now();
  t.mock.method(Date, "now", () => now);
  const target = await createTarget({
    fetcher: false,
    openForMs: 60_000,
    connection: {
      testStatus: "rate_limited",
      rateLimitedUntil: new Date(now + 120_000).toISOString(),
    },
  });
  const result = await runCombo([target]);
  assert.equal(result.response.headers.get("Retry-After"), "60");
  await assertBlocked(result, 503);
  assert.equal(target.quotaFetches(), 0);
  assert.equal(getInflight(target.connectionId), 0);
});

test("quota-fetcher cooldown retains its existing exclusion before the breaker filter", async () => {
  const target = await createTarget({
    openForMs: 60_000,
    connection: { rateLimitedUntil: new Date(Date.now() + 120_000).toISOString() },
  });
  const result = await runCombo([target]);
  assert.ok(Number(result.response.headers.get("Retry-After")) > 60);
  await assertBlocked(result, 503, "connection_cooldown");
});

const cacheConfig = { resetAwareQuotaCacheTtlMs: 1000, resetAwareQuotaCacheMaxStaleMs: 1000 };
for (const [name, age, ttl, expected] of [
  ["fresh", 500, 1000, 404],
  ["permitted stale", 1500, 1000, 404],
  ["expired", 2501, 1000, 503],
  ["TTL zero with positive stale allowance", 500, 0, 503],
] as const) {
  test(`OPEN provider reads ${name} exhausted strategy cache without fetching`, async (t) => {
    let now = Date.now();
    t.mock.method(Date, "now", () => now);
    const target = await createTarget({
      openForMs: 60_000,
      quota: { used: 100, total: 100, percentUsed: 1, limitReached: true },
      domainRemaining: null,
    });
    await primeQuota(target, cacheConfig);
    assert.equal(target.quotaFetches(), 1);
    now += age;
    await assertBlocked(
      await runCombo([target], undefined, {
        config: {
          ...cacheConfig,
          resetAwareQuotaCacheTtlMs: ttl,
          quotaWeightedScoring: name === "fresh" ? "pace" : "leftover",
        },
      }),
      expected
    );
    assert.equal(target.quotaFetches(), 1, "classification must neither fetch nor refresh");
  });
}

test("no-fetcher classification ignores an otherwise populated strategy cache", async () => {
  const target = await createTarget({
    fetcher: false,
    openForMs: 60_000,
    quota: { used: 100, total: 100, percentUsed: 1, limitReached: true },
    domainRemaining: null,
  });
  await primeQuota(target, cacheConfig);
  await assertBlocked(await runCombo([target], undefined, { config: cacheConfig }), 503);
  assert.equal(target.quotaFetches(), 1);
});

for (const [requested, expected] of [
  ["gemini-3.8-flash-high", 503],
  ["claude-sonnet-4-5", 404],
] as const) {
  test(`OPEN Antigravity uses domain quota for ${requested}`, async () => {
    const target = await createTarget({ provider: "agy", model: requested, openForMs: 60_000 });
    quotaCache.setQuotaCache(target.connectionId, "agy", {
      "gemini-3.8-flash-high": { remainingPercentage: 80 },
      claude_gpt_weekly: { remainingPercentage: 0 },
    });
    await assertBlocked(await runCombo([target]), expected);
    assert.equal(target.quotaFetches(), 0);
  });
}

test("strategy cache uses the requested quota-family key", async () => {
  const target = await createTarget({
    provider: "antigravity",
    storedProvider: "agy",
    model: "gemini-3.8-flash-high",
    openForMs: 60_000,
    quota: { used: 100, total: 100, percentUsed: 1, limitReached: true },
    domainRemaining: null,
  });
  const siblingModel = { ...target, model: "antigravity/claude-sonnet-4-5" };
  await primeQuota(siblingModel, cacheConfig);
  await assertBlocked(await runCombo([target], undefined, { config: cacheConfig }), 503);
  await primeQuota(target, cacheConfig);
  await assertBlocked(await runCombo([target], undefined, { config: cacheConfig }), 404);
  assert.equal(target.quotaFetches(), 2);
});

for (const [name, credits, model, refusal, expected] of [
  ["verified positive balance", { hasCredits: true, balance: 10 }, "gpt-5.3-codex", false, 503],
  ["opt-in only", null, "gpt-5.3-codex", false, 404],
  ["zero balance", { hasCredits: true, balance: 0 }, "gpt-5.3-codex", false, 404],
  [
    "overage refused",
    { hasCredits: true, balance: 10, overageLimitReached: true },
    "gpt-5.3-codex",
    false,
    404,
  ],
  ["Spark", { hasCredits: true, balance: 10 }, "gpt-5.3-codex-spark", false, 404],
  ["authoritative refusal", { hasCredits: true, balance: 10 }, "gpt-5.3-codex", true, 404],
  [
    "unlimited credit",
    { hasCredits: false, unlimited: true, balance: 0 },
    "gpt-5.3-codex",
    false,
    503,
  ],
  ["omitted balance", { hasCredits: true, balance: null }, "gpt-5.3-codex", false, 503],
] as const) {
  test(`OPEN Codex exhausted subscription respects ${name}`, async () => {
    const target = await createTarget({
      provider: "codex",
      model,
      openForMs: 60_000,
      exhausted: true,
      connection: { providerSpecificData: { allowPaidCredits: true } },
      quota: {
        used: 100,
        total: 100,
        percentUsed: 1,
        limitReached: true,
        ...(credits
          ? { paidCredits: { unlimited: false, overageLimitReached: false, ...credits } }
          : {}),
      },
    });
    await primeQuota(target, cacheConfig);
    if (refusal) quotaCache.markAccountExhaustedFromCredits(target.connectionId, "codex");
    await assertBlocked(await runCombo([target], undefined, { config: cacheConfig }), expected);
    assert.equal(target.quotaFetches(), 1);
  });
}

test("custom-node pool ownership accepts its prefix and rejects another node's pin", async () => {
  const prefix = `qw-node-${randomUUID()}`;
  const nodeId = `openai-compatible-chat-${randomUUID()}`;
  await providersDb.createProviderNode({
    id: nodeId,
    type: "openai-compatible-chat",
    prefix,
    name: prefix,
  });
  const target = await createTarget({
    provider: prefix,
    storedProvider: nodeId,
    fetcher: false,
    openForMs: 60_000,
  });
  await assertBlocked(await runCombo([target]), 503);
  const otherId = `openai-compatible-chat-${randomUUID()}`;
  await providersDb.createProviderNode({
    id: otherId,
    type: "openai-compatible-chat",
    prefix: `other-${prefix}`,
    name: "other",
  });
  const foreign = await createTarget({ storedProvider: otherId, fetcher: false });
  await assertBlocked(
    await runCombo([target], [foreign.connectionId], {
      models: [{ model: target.model, connectionId: foreign.connectionId }],
    }),
    404
  );
});

test("Antigravity project preference cannot turn an omitted exact pin into circuit_open", async () => {
  const omitted = await createTarget({
    provider: "antigravity",
    storedProvider: "agy",
    openForMs: 60_000,
  });
  await createTarget({ provider: "antigravity", connection: { projectId: "fixture-project" } });
  await assertBlocked(
    await runCombo([omitted], undefined, {
      models: [{ model: omitted.model, connectionId: omitted.connectionId }],
    }),
    404
  );
});

for (const state of ["HALF_OPEN", "CLOSED", "DEGRADED"] as const) {
  test(`OPEN provider recovering to ${state} during pool loading retains the original target`, async (t) => {
    const target = await createTarget({ fetcher: false, openForMs: 60_000 });
    const originalStatus = target.breaker.getStatus.bind(target.breaker);
    let first = true;
    t.mock.method(target.breaker, "getStatus", () => {
      const status = originalStatus();
      if (first) {
        first = false;
        queueMicrotask(() => {
          if (state === "HALF_OPEN") target.breaker.lastFailureTime = Date.now() - 60_001;
          else target.breaker._transition(state, "fixture-recovery");
        });
      }
      return status;
    });
    const original = Object.freeze(resolvedTarget(target));
    const exclusions = [];
    const ordered = await orderTargetsByQuotaWeighted(
      [original],
      "recovery",
      {},
      noopLog,
      null,
      exclusions
    );
    assert.deepEqual(ordered, [original]);
    assert.deepEqual(exclusions, []);
    assert.equal(target.breaker.getStatus().state, state);
    assert.equal(target.breaker.halfOpenAllowed, state === "HALF_OPEN" ? 1 : 0);
  });
}

test("expired OPEN and explicit HALF_OPEN remain dispatchable without classifier probes", async (t) => {
  const now = Date.now();
  t.mock.method(Date, "now", () => now);
  for (const expired of [true, false]) {
    const target = await createTarget({ openForMs: 60_000 });
    if (expired) target.breaker.lastFailureTime = now - 60_001;
    else target.breaker._transition("HALF_OPEN", "fixture");
    const before = target.breaker.halfOpenAllowed;
    const result = await runCombo([target]);
    assert.equal(result.response.status, 200, await result.response.clone().text());
    assert.deepEqual(result.dispatched, [target.connectionId]);
    assert.equal(target.breaker.halfOpenAllowed, expired ? 1 : before);
  }
});

test("classification rechecks the target alias breaker, not the canonical pool breaker", async (t) => {
  const target = await createTarget({
    provider: "cx",
    storedProvider: "codex",
    openForMs: 60_000,
  });
  const canonical = getCircuitBreaker("codex");
  assert.equal(canonical.getStatus().state, "CLOSED");
  const aliasStatus = target.breaker.getStatus.bind(target.breaker);
  let checks = 0;
  t.mock.method(target.breaker, "getStatus", () => {
    const status = aliasStatus();
    if (++checks === 1) queueMicrotask(() => target.breaker.reset());
    return status;
  });
  const original = resolvedTarget(target);
  const ordered = await orderTargetsByQuotaWeighted([original], "alias-recovery", {}, noopLog);
  assert.deepEqual(ordered, [original]);
  assert.ok(checks >= 2);
});

for (const recover of [false, true]) {
  test(`failed pool lookup ${recover ? "still permits concurrent recovery" : "records no unverified circuit exclusion"}`, async (t) => {
    const target = await createTarget({ fetcher: false, openForMs: 60_000 });
    invalidateDbCache("connections");
    const db = coreDb.getDbInstance();
    const prepare = db.prepare.bind(db);
    let rejected = false;
    t.mock.method(db, "prepare", (sql: string) => {
      if (/FROM\s+provider_connections\b/i.test(sql)) {
        rejected = true;
        if (recover) queueMicrotask(() => target.breaker.reset());
        throw new Error("synthetic pool failure");
      }
      return prepare(sql);
    });
    const original = Object.freeze(resolvedTarget(target));
    const exclusions = [];
    const ordered = await orderTargetsByQuotaWeighted(
      [original],
      "failed-pool",
      {},
      noopLog,
      null,
      exclusions
    );
    assert.equal(rejected, true);
    assert.deepEqual(exclusions, []);
    assert.deepEqual(ordered, recover ? [original] : []);
  });
}

for (const sibling of [
  "all OPEN",
  "healthy",
  "HALF_OPEN",
  "missing affinity",
  "missing affinity OPEN",
  "invalid exact pin",
]) {
  test(`native turn with ${sibling} preserves existing affinity behavior`, async () => {
    const target = await createTarget({
      provider: "codex",
      model: "gpt-5.3-codex",
      openForMs: 60_000,
    });
    const body = {
      input: [{ role: "user", content: "hello" }],
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({ thread_id: randomUUID(), turn_id: randomUUID() }),
      },
    };
    const comboName = `native-qw-${randomUUID()}`;
    const missing = sibling.startsWith("missing affinity") || sibling === "invalid exact pin";
    const pinId = missing ? randomUUID() : target.connectionId;
    pinNativeCodexTurn({ body, comboName, target: resolvedTarget(target), connectionId: pinId });
    const before = { ...getNativeCodexTurnPin(body, comboName) };
    const generation = getNativeCodexTurnActiveGeneration(body, comboName);
    const targets = [target];
    if (sibling === "healthy" || sibling === "HALF_OPEN") {
      await providersDb.updateProviderConnection(target.connectionId, { isActive: false });
      targets.push(await createTarget({ provider: "codex", model: "gpt-5.3-codex" }));
    }
    if (sibling === "healthy" || sibling === "missing affinity") target.breaker.reset();
    if (sibling === "HALF_OPEN") target.breaker._transition("HALF_OPEN", "fixture");
    const result = await runCombo(targets, undefined, {
      body,
      comboName,
      native: true,
      ...(sibling === "invalid exact pin"
        ? { models: [{ model: target.model, connectionId: pinId }] }
        : {}),
    });
    if (sibling === "all OPEN" || sibling === "missing affinity OPEN") {
      await assertBlocked(result, 503);
      assert.deepEqual(getNativeCodexTurnPin(body, comboName), before);
    } else if (sibling === "invalid exact pin") {
      assert.notEqual(result.response.status, 503);
      assert.deepEqual(result.dispatched, []);
    } else {
      assert.equal(result.response.status, 200, await result.response.clone().text());
      assert.deepEqual(result.dispatched, [targets.at(-1)!.connectionId]);
    }
    assert.equal(getNativeCodexTurnActiveGeneration(body, comboName), generation);
  });
}

test("mixed completion releases its winner reservation without touching unrelated inflight", async () => {
  const open = await createTarget({ openForMs: 60_000 });
  const healthy = await createTarget();
  incrementInflight(open.connectionId);
  const result = await runCombo([open, healthy], undefined, {
    onDispatch: (id) => {
      assert.equal(id, healthy.connectionId);
      assert.equal(getInflight(id), 1);
    },
  });
  assert.equal(result.response.status, 200);
  assert.equal(getInflight(healthy.connectionId), 0);
  assert.equal(getInflight(open.connectionId), 1);
});

test("OPEN breaker Retry-After preserves durations beyond the account-cooldown cap", async (t) => {
  const now = Date.now();
  t.mock.method(Date, "now", () => now);
  const target = await createTarget({ openForMs: 36 * 3600_000 });
  const result = await runCombo([target]);
  assert.equal(result.response.headers.get("Retry-After"), String(36 * 3600));
  await assertBlocked(result, 503);
});

for (const reason of ["terminal", "quota exhausted"]) {
  test(`no-fetcher account cooldown does not hide ${reason} behind circuit_open`, async () => {
    const target = await createTarget({
      fetcher: false,
      openForMs: 60_000,
      exhausted: reason === "quota exhausted",
      connection: {
        testStatus: reason === "terminal" ? "expired" : "active",
        rateLimitedUntil: new Date(Date.now() + 120_000).toISOString(),
      },
    });
    await assertBlocked(await runCombo([target]), 404);
  });
}

async function createPinnedPool(count = 4) {
  const provider = `qw-pool-load-${randomUUID()}`;
  const fixtures: Fixture[] = [];
  for (let i = 0; i < count; i++) {
    fixtures.push(await createTarget({ provider, fetcher: false, openForMs: 60_000 }));
  }
  const allowedIds = fixtures.map((fixture) => fixture.connectionId);
  const targets = fixtures.map((fixture) => ({
    ...resolvedTarget(fixture),
    allowedConnectionIds: allowedIds,
  }));
  return { fixtures, allowedIds, targets, breaker: fixtures[0].breaker };
}

test("OPEN classifier loads one pool for pinned accounts despite shared-cache invalidation", async (t) => {
  const { targets, allowedIds, breaker } = await createPinnedPool();
  const getStatus = breaker.getStatus.bind(breaker);
  t.mock.method(breaker, "getStatus", () => {
    const status = getStatus();
    invalidateDbCache("connections");
    return status;
  });
  const db = coreDb.getDbInstance();
  const prepare = db.prepare.bind(db);
  let poolQueries = 0;
  t.mock.method(db, "prepare", (sql: string) => {
    if (/FROM\s+provider_connections\b/i.test(sql)) poolQueries++;
    return prepare(sql);
  });
  const exclusions = [];
  const ordered = await orderTargetsByQuotaWeighted(
    targets,
    "indexed-pool",
    {},
    noopLog,
    allowedIds,
    exclusions
  );
  assert.deepEqual(ordered, []);
  assert.equal(exclusions.length, targets.length);
  assert.equal(poolQueries, 1, "one classifier pool load per provider per ordering call");
  await orderTargetsByQuotaWeighted(targets, "next-ordering-call", {}, noopLog, allowedIds);
  assert.equal(poolQueries, 2, "a later ordering call must load its own pool index");
});

test("shared OPEN pool keeps missing, foreign and denied pins non-cooling", async () => {
  const { fixtures, targets } = await createPinnedPool(3);
  const [valid, stepDenied, apiDenied] = fixtures;
  const foreign = await createTarget({ fetcher: false });
  const missingId = randomUUID();
  const sharedIds = [valid.connectionId, stepDenied.connectionId, missingId, foreign.connectionId];
  const pinned = [
    { ...targets[0], allowedConnectionIds: sharedIds },
    { ...targets[0], connectionId: missingId, allowedConnectionIds: sharedIds },
    { ...targets[0], connectionId: foreign.connectionId, allowedConnectionIds: sharedIds },
    { ...targets[1], allowedConnectionIds: [valid.connectionId] },
    { ...targets[2], allowedConnectionIds: [apiDenied.connectionId] },
  ];
  const exclusions = [];
  const ordered = await orderTargetsByQuotaWeighted(
    pinned,
    "shared-pool-pins",
    {},
    noopLog,
    sharedIds,
    exclusions
  );
  assert.deepEqual(ordered, []);
  assert.equal(exclusions.length, 1, "only the real permitted pin justifies circuit_open");
  assert.equal(exclusions[0].reason, "circuit_open");
});

for (const recover of [false, true]) {
  test(`request-local failed OPEN pool loads once and ${recover ? "rechecks reused failure after recovery" : "records no exclusion"}`, async (t) => {
    const { targets, breaker } = await createPinnedPool(3);
    const db = coreDb.getDbInstance();
    const prepare = db.prepare.bind(db);
    let attempts = 0;
    t.mock.method(db, "prepare", (sql: string) => {
      if (/FROM\s+provider_connections\b/i.test(sql)) {
        attempts++;
        throw new Error("synthetic shared pool failure");
      }
      return prepare(sql);
    });
    const getStatus = breaker.getStatus.bind(breaker);
    let reads = 0;
    t.mock.method(breaker, "getStatus", () => {
      const status = getStatus();
      invalidateDbCache("connections");
      // First target fails closed to classification; recovery occurs while the
      // second target awaits the same failed load.
      if (++reads === 3 && recover) queueMicrotask(() => breaker.reset());
      return status;
    });
    let warnings = 0;
    const exclusions = [];
    const ordered = await orderTargetsByQuotaWeighted(
      targets,
      "shared-failed-pool",
      {},
      { warn: () => warnings++ },
      null,
      exclusions
    );
    assert.equal(attempts, 1);
    assert.equal(warnings, 1);
    assert.deepEqual(exclusions, []);
    assert.deepEqual(new Set(ordered), new Set(recover ? targets.slice(1) : []));
  });
}

test("shared OPEN pool retains model-specific quota eligibility", async () => {
  const target = await createTarget({
    provider: "antigravity",
    storedProvider: "agy",
    model: "gemini-3.8-flash-high",
    openForMs: 60_000,
    connection: { projectId: "fixture-project" },
  });
  quotaCache.setQuotaCache(target.connectionId, "agy", {
    "gemini-3.8-flash-high": { remainingPercentage: 80 },
    claude_gpt_weekly: { remainingPercentage: 0 },
  });
  const first = resolvedTarget(target);
  const second = { ...first, modelStr: "antigravity/claude-sonnet-4-5" };
  const exclusions = [];
  const ordered = await orderTargetsByQuotaWeighted(
    [first, second],
    "shared-model-scope",
    {},
    noopLog,
    null,
    exclusions
  );
  assert.deepEqual(ordered, []);
  assert.deepEqual(
    exclusions.map((entry) => entry.model),
    ["gemini-3.8-flash-high"]
  );
  assert.equal(target.quotaFetches(), 0);
});

test("OPEN allowlist Sets preserve permissive malformed input and exact ID matching", async () => {
  const target = await createTarget({ fetcher: false, openForMs: 60_000 });
  for (const allowed of [null, [], ["", null, 7], [` ${target.connectionId} `]]) {
    for (const scope of ["step", "API key"]) {
      const exclusions = [];
      const original = resolvedTarget(target);
      const ids = allowed as string[] | null;
      const step = scope === "step" ? { ...original, allowedConnectionIds: ids } : original;
      await orderTargetsByQuotaWeighted(
        [step],
        "allowlist-normalization",
        {},
        noopLog,
        scope === "API key" ? ids : null,
        exclusions
      );
      assert.equal(exclusions.length, allowed?.length === 1 ? 0 : 1, scope);
    }
  }
});

test("unbound no-fetcher OPEN pool applies API permissions to real pool candidates", async () => {
  const target = await createTarget({ fetcher: false, openForMs: 60_000 });
  const unbound = { ...resolvedTarget(target), connectionId: null };
  for (const [allowedIds, expectedExclusions] of [
    [[target.connectionId], 1],
    [[randomUUID()], 0],
  ] as const) {
    const exclusions = [];
    const ordered = await orderTargetsByQuotaWeighted(
      [unbound],
      "unbound-api-permissions",
      {},
      noopLog,
      [...allowedIds],
      exclusions
    );
    assert.deepEqual(ordered, []);
    assert.equal(exclusions.length, expectedExclusions);
  }
  assert.equal(target.quotaFetches(), 0);
  assert.equal(getInflight(target.connectionId), 0);
});
