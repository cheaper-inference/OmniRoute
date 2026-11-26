import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

let harness: Awaited<ReturnType<typeof createChatPipelineHarness>>;
let clearAllModelLockouts: () => void;
let resetDbInstance: () => void;

let getConfirmedModelUnavailability: typeof import("../../src/lib/db/modelAvailability.ts").getConfirmedModelUnavailability;
let recordModelAvailabilityObservation: typeof import("../../src/lib/db/modelAvailability.ts").recordModelAvailabilityObservation;
let updateProviderConnection: typeof import("../../src/lib/db/providers.ts").updateProviderConnection;

test.before(async () => {
  harness = await createChatPipelineHarness("model-availability");
  ({ clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts"));
  ({ resetDbInstance } = await import("../../src/lib/db/core.ts"));
  ({ getConfirmedModelUnavailability, recordModelAvailabilityObservation } =
    await import("../../src/lib/db/modelAvailability.ts"));
  ({ updateProviderConnection } = await import("../../src/lib/db/providers.ts"));
});
test.beforeEach(async () => {
  await harness.resetStorage();
  clearAllModelLockouts();
});
test.after(() => resetDbInstance());
test.after(async () => harness.cleanup());

function send(stream: boolean, text: string) {
  return harness.handleChat(
    harness.buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream,
        messages: [{ role: "user", content: text }],
      },
    })
  );
}

function absent(model = "gpt-4o-mini") {
  return Response.json(
    { error: { code: "model_not_found", param: "model", model } },
    { status: 404 }
  );
}

for (const stream of [false, true]) {
  test(`second independent upstream 404 suppresses dispatch after reopening (stream=${stream})`, async (t) => {
    setFlag(t, true);
    const realNow = Date.now;
    let offset = 0;
    t.mock.method(Date, "now", () => realNow() + offset);
    await harness.seedConnection("openai");
    let dispatches = 0;
    globalThis.fetch = async () => {
      dispatches++;
      return absent();
    };

    assert.equal((await send(stream, "first")).status, 404);
    assert.equal(dispatches, 1);
    offset += 3 * 60_000;
    clearAllModelLockouts();
    assert.equal((await send(stream, "second")).status, 404);
    assert.equal(dispatches, 2);
    offset += 3 * 60_000;
    clearAllModelLockouts();
    await harness.callLogsDb.waitForCallLogSaves(10_000);
    resetDbInstance();

    const skipped = await send(stream, "confirmed");
    assert.equal(skipped.status, 404);
    assert.equal(dispatches, 2, "confirmed model must avoid another upstream dispatch");
    assert.equal(skipped.headers.get("Retry-After"), null);
    assert.equal((await skipped.json()).error.code, "model_not_found");

    offset += 30 * 86_400_000;
    await send(stream, "expired");
    assert.equal(dispatches, 3);
  });
}

function scopeFor(connectionId: string, modelId = "gpt-4o-mini") {
  const row = harness.core
    .getDbInstance()
    .prepare(
      "SELECT model_availability_revision AS revision FROM provider_connections WHERE id = ?"
    )
    .get(connectionId) as { revision: string };
  return {
    providerId: "openai",
    connectionId,
    connectionRevision: row.revision,
    endpointKind: "chat_completions" as const,
    modelId,
  };
}

function observationCount(connectionId: string, modelId: string): number {
  const result = harness.core
    .getDbInstance()
    .prepare(
      "SELECT COUNT(*) AS count FROM model_availability_requests WHERE connection_id = ? AND model_id = ?"
    )
    .get(connectionId, modelId) as { count: number };
  return result.count;
}

function setFlag(t: TestContext, enabled: boolean) {
  const key = "MODEL_AVAILABILITY_EVIDENCE_ENABLED";
  const previous = process.env[key];
  process.env[key] = enabled ? "true" : "false";
  t.after(() => {
    if (previous === undefined) delete process.env[key];
    else process.env[key] = previous;
  });
}

function confirm(scope: ReturnType<typeof scopeFor>, observedAtMs = Date.now()) {
  for (const id of [crypto.randomUUID(), crypto.randomUUID()]) {
    recordModelAvailabilityObservation(scope, {
      kind: "explicit_model_not_found",
      requestId: id,
      startedAtMs: observedAtMs - 1,
      observedAtMs,
    });
  }
}

test("the flag-off chat path sends upstream without reading or writing the evidence tables", async (t) => {
  setFlag(t, false);
  const connection = await harness.seedConnection("openai");
  confirm(scopeFor(String(connection.id)));
  const db = harness.core.getDbInstance();
  const prepare = db.prepare.bind(db);
  const queries: string[] = [];
  t.mock.method(db, "prepare", (sql: string) => {
    if (/model_availability_(evidence|requests)\b/.test(sql)) queries.push(sql);
    return prepare(sql);
  });
  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches++;
    return absent();
  };

  assert.equal((await send(false, "flag off")).status, 404);
  assert.equal(dispatches, 1);
  assert.deepEqual(queries, []);
});

test("a raw failure from an old credential revision cannot confirm the model", async (t) => {
  setFlag(t, true);
  const connection = await harness.seedConnection("openai", { apiKey: "test-key-before" });
  const connectionId = String(connection.id);
  const oldScope = scopeFor(connectionId);
  const waiting = Promise.withResolvers<void>();
  const release = Promise.withResolvers<void>();
  globalThis.fetch = async () => {
    waiting.resolve();
    await release.promise;
    return absent();
  };

  const inFlight = send(false, "old credential");
  await waiting.promise;
  try {
    await updateProviderConnection(connectionId, { apiKey: "test-key-after" });
  } finally {
    release.resolve();
  }
  assert.equal((await inFlight).status, 404);
  assert.notEqual(scopeFor(connectionId).connectionRevision, oldScope.connectionRevision);
  assert.equal(observationCount(connectionId, oldScope.modelId), 0);
});

test("deduplicated callers produce one observation for the actual rewritten wire ID", async (t) => {
  setFlag(t, true);
  const connection = await harness.seedConnection("openai");
  const { clearPayloadRulesConfigOverride, setPayloadRulesConfig } =
    await import("../../open-sse/services/payloadRules.ts");
  setPayloadRulesConfig({
    override: [{ models: [{ name: "gpt-4o-mini" }], params: { model: "actual-wire-id" } }],
  });
  t.after(clearPayloadRulesConfigOverride);

  const waiting = Promise.withResolvers<void>();
  const release = Promise.withResolvers<void>();
  const wireModels: string[] = [];
  globalThis.fetch = async (_url, init) => {
    const payload = JSON.parse(String(init?.body));
    wireModels.push(payload.model);
    waiting.resolve();
    await release.promise;
    return absent(payload.model);
  };

  const sendDeduped = () =>
    harness.handleChat(
      harness.buildRequest({
        body: {
          model: "openai/gpt-4o-mini",
          stream: false,
          temperature: 0,
          messages: [{ role: "user", content: "deduplicated" }],
        },
      })
    );
  const first = sendDeduped();
  const second = sendDeduped();
  await waiting.promise;
  try {
    // Let the second caller join while the first response is still in flight.
    await new Promise((resolve) => setTimeout(resolve, 150));
  } finally {
    release.resolve();
  }
  assert.deepEqual(
    (await Promise.all([first, second])).map((response) => response.status),
    [404, 404]
  );
  assert.deepEqual(wireModels, ["actual-wire-id"]);
  assert.equal(observationCount(String(connection.id), "gpt-4o-mini"), 0);
  assert.equal(observationCount(String(connection.id), "actual-wire-id"), 1);
});

for (const stream of [false, true]) {
  test(`only accepted responses clear evidence and probe failures do not add it (stream=${stream})`, async (t) => {
    setFlag(t, true);
    const connection = await harness.seedConnection("openai");
    const scope = scopeFor(String(connection.id));
    confirm(scope);
    const { runAsProbe } = await import("../../src/shared/utils/probeOrigin.ts");

    globalThis.fetch = async () => absent();
    assert.equal((await runAsProbe(() => send(stream, "probe 404"))).status, 404);
    assert.equal(observationCount(scope.connectionId, scope.modelId), 2);
    clearAllModelLockouts();

    globalThis.fetch = async () =>
      new Response("{", { headers: { "Content-Type": "application/json" } });
    const invalid = await runAsProbe(() => send(stream, "unusable 200"));
    await invalid.text();
    assert.ok(getConfirmedModelUnavailability(scope, Date.now()));
    clearAllModelLockouts();

    globalThis.fetch = async () => harness.buildOpenAIResponse("healthy", scope.modelId);
    const accepted = await runAsProbe(() => send(stream, "accepted 200"));
    assert.equal(accepted.status, 200);
    await accepted.text();
    assert.equal(getConfirmedModelUnavailability(scope, Date.now()), null);
  });
}

test("combos skip confirmed targets without replacing a genuine cooldown hint", async (t) => {
  setFlag(t, true);
  const connection = await harness.seedConnection("openai", { name: "missing", apiKey: "missing" });
  const cooling = await harness.seedConnection("openai", {
    name: "cooling",
    apiKey: "cooling",
    rateLimitedUntil: new Date(Date.now() + 20_000).toISOString(),
  });
  const healthy = await harness.seedConnection("openai", { name: "healthy", apiKey: "healthy" });
  const now = Date.now();
  await updateProviderConnection(String(cooling.id), {
    rateLimitedUntil: new Date(now + 20_000).toISOString(),
  });
  t.mock.method(Date, "now", () => now);
  const scope = scopeFor(String(connection.id));
  confirm(scope, now);
  const targets = [connection, cooling, healthy].map(({ id }) => ({
    model: "openai/gpt-4o-mini",
    connectionId: String(id),
  }));
  for (const [name, models] of [
    ["availability-healthy", targets],
    ["availability-cooling", targets.slice(0, 2)],
  ] as const) {
    await harness.combosDb.createCombo({
      name,
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0 },
      models: [...models],
    });
  }

  const actualDispatches: string[] = [];
  globalThis.fetch = async (_url, init) => {
    actualDispatches.push(new Headers(init?.headers).get("authorization") ?? "");
    return harness.buildOpenAIResponse("healthy");
  };
  const sendCombo = (model: string) =>
    harness.handleChat(
      harness.buildRequest({
        body: { model, stream: false, messages: [{ role: "user", content: model }] },
      })
    );
  const successful = await sendCombo("availability-healthy");
  assert.equal(successful.status, 200);
  assert.equal(successful.headers.get("Retry-After"), null);
  assert.deepEqual(actualDispatches, ["Bearer healthy"]);
  const temporarilyUnavailable = await sendCombo("availability-cooling");
  assert.equal(temporarilyUnavailable.headers.get("Retry-After"), "20");
  assert.deepEqual(actualDispatches, ["Bearer healthy"]);
});

test("a chat-completions confirmation cannot suppress the same model on Responses", async (t) => {
  setFlag(t, true);
  const connection = await harness.seedConnection("openai");
  const scope = scopeFor(String(connection.id), "o1-pro");
  confirm(scope);
  const wireEndpoints: string[] = [];
  globalThis.fetch = async (url) => {
    wireEndpoints.push(new URL(String(url)).pathname);
    return absent("o1-pro");
  };

  const response = await harness.handleChat(
    harness.buildRequest({
      body: {
        model: "openai/o1-pro",
        stream: false,
        messages: [{ role: "user", content: "native Responses" }],
      },
    })
  );
  assert.equal(response.status, 404);
  assert.deepEqual(wireEndpoints, ["/v1/responses"]);
  assert.ok(getConfirmedModelUnavailability(scope, Date.now()));
  assert.equal(
    getConfirmedModelUnavailability({ ...scope, endpointKind: "responses" }, Date.now()),
    null
  );
  assert.equal(observationCount(scope.connectionId, scope.modelId), 3);
});
