import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-17878-"));
process.env.DATA_DIR = dataDir;

const coreDb = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const quotaCache = await import("../../../src/domain/quotaCache.ts");
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { expandTargetsByQuotaAwareConnections } =
  await import("../../../open-sse/services/combo/quotaStrategies.ts");

const noopLog = { warn: () => {}, info: () => {}, debug: () => {}, error: () => {} };

test.after(async () => {
  await new Promise<void>((resolve) => setImmediate(resolve));
  coreDb.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function runCombo(
  strategy: string,
  connections: Array<{
    rateLimitedUntil?: string;
    allowed?: boolean;
    isActive?: boolean;
    exhausted?: boolean;
  }>,
  options: { pin?: boolean; stepAllowlist?: boolean; empty?: boolean } = {}
): Promise<{ response: Response; calls: number; dispatched: string[]; connectionIds: string[] }> {
  const provider = `issue-17878-${randomUUID()}`;
  registerQuotaFetcher(provider, async () => ({ used: 10, total: 100, percentUsed: 0.1 }));
  const connectionIds: string[] = [];
  for (const entry of connections) {
    const row = await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: `connection-${connectionIds.length}`,
      apiKey: `key-${randomUUID()}`,
      isActive: entry.isActive !== false,
      ...(entry.rateLimitedUntil
        ? { rateLimitedUntil: entry.rateLimitedUntil, testStatus: "unavailable" }
        : {}),
    });
    connectionIds.push(row.id);
    if (entry.exhausted) {
      quotaCache.setQuotaCache(row.id, provider, {
        "model-x": {
          remainingPercentage: 0,
          resetAt: new Date(Date.now() + 3600_000).toISOString(),
        },
      });
    }
  }
  const allowedIds = connectionIds.filter((_, i) => connections[i].allowed !== false);
  const scoped = connections.some((entry) => entry.allowed === false);
  const model = `${provider}/model-x`;
  const models = options.empty
    ? []
    : options.pin || options.stepAllowlist
      ? [
          {
            model,
            ...(options.pin ? { connectionId: connectionIds[0] } : {}),
            ...(options.stepAllowlist ? { allowedConnectionIds: allowedIds } : {}),
          },
        ]
      : strategy === "headroom"
        ? [model, `${provider}/model-y`]
        : [model];
  let calls = 0;
  const dispatched: string[] = [];
  const response = await handleComboChat({
    body: { messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: `issue-17878-${strategy}-${randomUUID()}`,
      strategy,
      models,
      config: {
        maxRetries: 0,
        maxSetRetries: 0,
        disableSessionStickiness: true,
        connectionAwareExpansion: true,
      },
    },
    apiKeyAllowedConnections: scoped && !options.stepAllowlist ? allowedIds : null,
    handleSingleModel: async (_body, _model, target) => {
      calls++;
      dispatched.push(target && "connectionId" in target ? (target.connectionId ?? "") : "");
      return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
      });
    },
    isModelAvailable: async () => true,
    log: noopLog,
    settings: null,
    allCombos: null,
  });
  return { response, calls, dispatched, connectionIds };
}

const strategies = [
  "quota-weighted",
  "reset-aware",
  "reset-window",
  "headroom",
  "priority",
  "weighted",
  "p2c",
  "round-robin",
];

for (const strategy of strategies) {
  test(`#17878 ${strategy}: all cooling connections return 503 and earliest Retry-After`, async () => {
    const { response, calls } = await runCombo(strategy, [
      { rateLimitedUntil: new Date(Date.now() + 120_000).toISOString() },
      { rateLimitedUntil: new Date(Date.now() + 60_000).toISOString() },
    ]);
    assert.equal(calls, 0);
    assert.equal(response.status, 503, await response.clone().text());
    const retry = Number(response.headers.get("Retry-After"));
    assert.ok(retry >= 58 && retry <= 60, `expected earliest cooldown, got ${retry}`);
    const payload = (await response.json()) as {
      error: { code: string };
      diagnostics: { terminalReason: string; excluded: Array<{ reason: string }> };
    };
    assert.equal(payload.error.code, "all_targets_cooling_down");
    assert.equal(payload.diagnostics.terminalReason, "all_targets_cooling_down");
    assert.ok(payload.diagnostics.excluded.length > 0);
    assert.ok(
      payload.diagnostics.excluded.every((entry) => entry.reason === "connection_cooldown")
    );
  });

  test(`#17878 ${strategy}: healthy sibling runs while another connection cools`, async () => {
    const { response, calls, dispatched, connectionIds } = await runCombo(strategy, [
      { rateLimitedUntil: new Date(Date.now() + 60_000).toISOString() },
      {},
    ]);
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(calls, 1);
    assert.deepEqual(dispatched, [connectionIds[1]]);
  });
}

test("#17878 expired cooldown remains routable", async () => {
  const { response, calls } = await runCombo("quota-weighted", [
    { rateLimitedUntil: new Date(Date.now() - 60_000).toISOString() },
  ]);
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(calls, 1);
});

for (const strategy of ["quota-weighted", "priority"]) {
  test(`#17878 ${strategy}: pinned cooling account cannot escape to a healthy sibling`, async () => {
    const { response, calls } = await runCombo(
      strategy,
      [{ rateLimitedUntil: new Date(Date.now() + 60_000).toISOString() }, {}],
      { pin: true }
    );
    assert.equal(response.status, 503, await response.clone().text());
    assert.equal(calls, 0);
  });

  for (const stepAllowlist of [false, true]) {
    test(`#17878 ${strategy}: ${stepAllowlist ? "step" : "API key"} allowlist excludes cooling sibling`, async () => {
      const { response, calls } = await runCombo(
        strategy,
        [
          { rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(), allowed: false },
          { isActive: false },
        ],
        { stepAllowlist }
      );
      assert.equal(response.status, 404, await response.clone().text());
      assert.equal(response.headers.get("Retry-After"), null);
      assert.equal(calls, 0);
    });
  }
}

test("#17878 empty combo retains its configuration error", async () => {
  const { response, calls } = await runCombo(
    "quota-weighted",
    [{ rateLimitedUntil: new Date(Date.now() + 60_000).toISOString() }],
    { empty: true }
  );
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("Retry-After"), null);
  assert.equal(calls, 0);
});

test("#17878 exhausted quota is not reported as a recoverable account cooldown", async () => {
  const { response, calls } = await runCombo("reset-aware", [
    { rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(), exhausted: true },
  ]);
  assert.equal(response.status, 404, await response.clone().text());
  assert.equal(response.headers.get("Retry-After"), null);
  assert.equal(calls, 0);
});

test("#17878 expansion retains the reason and remaining cooldown on the request", async () => {
  const provider = `issue-17878-${randomUUID()}`;
  registerQuotaFetcher(provider, async () => null);
  const until = Date.now() + 60_000;
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "cooling",
    apiKey: "test-key",
    isActive: true,
    rateLimitedUntil: new Date(until).toISOString(),
  });
  const exclusions: Array<{
    provider: string;
    model: string;
    reason: "connection_cooldown";
    retryAfterMs: number | null;
  }> = [];
  const { expandedTargets } = await expandTargetsByQuotaAwareConnections(
    [
      {
        kind: "model",
        stepId: "step",
        executionKey: "step",
        modelStr: `${provider}/model-x`,
        provider,
        providerId: null,
        connectionId: connection.id,
        weight: 1,
        label: null,
      },
    ],
    "cooldown-diagnostics",
    noopLog,
    [connection.id],
    { exclusions }
  );
  assert.equal(expandedTargets.length, 0);
  assert.equal(exclusions.length, 1);
  assert.equal(exclusions[0].provider, provider);
  assert.equal(exclusions[0].model, "model-x");
  assert.equal(exclusions[0].reason, "connection_cooldown");
  assert.ok(exclusions[0].retryAfterMs! > 58_000 && exclusions[0].retryAfterMs! <= 60_000);
});

for (const strategy of ["fusion", "pipeline"]) {
  test(`#17878 ${strategy}: all cooling connections return retry response before dispatch`, async () => {
    const { response, calls } = await runCombo(strategy, [
      { rateLimitedUntil: new Date(Date.now() + 60_000).toISOString() },
    ]);
    assert.equal(response.status, 503, await response.clone().text());
    assert.ok(Number(response.headers.get("Retry-After")) > 0);
    assert.equal(calls, 0);
  });
}
