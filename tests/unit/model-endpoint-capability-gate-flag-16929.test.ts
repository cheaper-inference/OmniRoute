/**
 * #16929 — every client-visible effect of endpoint capability tags is opt-in via
 * MODEL_ENDPOINT_CAPABILITY_GATE_ENABLED (default off):
 *   - the local 400 on /v1/chat/completions and the other /v1 routes,
 *   - hiding unrunnable models from /v1/models,
 *   - the dashboard model-test 422.
 * Flag off must be the release-tip behavior (dispatch proceeds, model listed, no
 * 422) and must not cost an extra catalog DB read per request.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const FLAG = "MODEL_ENDPOINT_CAPABILITY_GATE_ENABLED";
delete process.env[FLAG];

const harness = await createChatPipelineHarness("endpoint-capability-gate-16929");
const { handleChat, buildRequest, resetStorage, seedConnection, core } = harness;

const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { getRequestedModelEndpointMismatch } =
  await import("../../src/lib/providerModels/modelEndpointGuard.ts");
const { isUnifiedChatSourceModelSelectable } =
  await import("../../src/app/api/v1/models/catalogModelPolicy.ts");
const embeddingsRoute = await import("../../src/app/api/v1/embeddings/route.ts");
const modelTestRoute = await import("../../src/app/api/models/test/route.ts");

const TRANSCRIBE = "gemini-3.5-transcribe"; // inferred audio-transcriptions, no gemini adapter
const EMBEDDING = "text-embedding-004"; // declared embeddings-only

async function seedGeminiCatalog() {
  const connection = await seedConnection("gemini", { apiKey: "gem-16929-key" });
  await replaceSyncedAvailableModelsForConnection("gemini", connection.id, [
    {
      id: TRANSCRIBE,
      name: TRANSCRIBE,
      source: "imported",
      supportedEndpoints: ["audio-transcriptions"],
      endpointCapabilitySource: "inferred",
    },
    {
      id: EMBEDDING,
      name: EMBEDDING,
      source: "imported",
      supportedEndpoints: ["embeddings"],
      endpointCapabilitySource: "declared",
    },
  ]);
  return connection;
}

function withFlag(value: "true" | undefined) {
  if (value === undefined) delete process.env[FLAG];
  else process.env[FLAG] = value;
}

/** Counts SQL statements that are not the (cached) feature-flag override read. */
function countNonFlagSql(): { count: () => number; restore: () => void } {
  const db = core.getDbInstance() as { prepare: (sql: string) => unknown };
  const original = db.prepare;
  let n = 0;
  db.prepare = function (sql: string) {
    if (!/namespace = \?/.test(sql) || !/key = \?/.test(sql)) n++;
    return original.call(this, sql);
  };
  return {
    count: () => n,
    restore: () => {
      db.prepare = original;
    },
  };
}

test.beforeEach(async () => {
  withFlag(undefined);
  await resetStorage();
  await seedGeminiCatalog();
});

test.after(async () => {
  withFlag(undefined);
  await harness.cleanup();
});

test("flag defaults to off in the definition registry", async () => {
  const { FEATURE_FLAG_DEFINITIONS } =
    await import("../../src/shared/constants/featureFlagDefinitions.ts");
  const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === FLAG);
  assert.ok(def, `${FLAG} must be defined`);
  assert.equal(def.defaultValue, "false");
  assert.equal(def.type, "boolean");
});

test("guard: flag off never rejects and reads no catalog; flag on rejects", async () => {
  const sql = countNonFlagSql();
  try {
    assert.equal(await getRequestedModelEndpointMismatch(`gemini/${EMBEDDING}`, "chat"), null);
    assert.equal(sql.count(), 0, "flag off must not read the synced catalog / combos");
  } finally {
    sql.restore();
  }

  withFlag("true");
  const counter = countNonFlagSql();
  try {
    const mismatch = await getRequestedModelEndpointMismatch(`gemini/${EMBEDDING}`, "chat");
    assert.match(mismatch || "", /does not serve POST \/v1\/chat\/completions/);
    assert.match(mismatch || "", /Use POST \/v1\/embeddings instead/);
    assert.ok(counter.count() > 0, "sanity: the SQL counter observes the flag-on catalog read");
  } finally {
    counter.restore();
  }
  assert.equal(await getRequestedModelEndpointMismatch(`gemini/${EMBEDDING}`, "embeddings"), null);
});

test("/v1/chat/completions: flag off dispatches as before, flag on answers 400 locally", async () => {
  let upstreamCalls = 0;
  globalThis.fetch = async () => {
    upstreamCalls++;
    return new Response(JSON.stringify({ error: { message: "upstream stub" } }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  };
  const body = { model: `gemini/${EMBEDDING}`, messages: [{ role: "user", content: "hi" }] };

  const off = await handleChat(buildRequest({ body }));
  const offText = await off.text();
  assert.doesNotMatch(offText, /does not serve/, "flag off must not apply the endpoint gate");
  assert.ok(upstreamCalls > 0, "flag off must dispatch upstream exactly like the release tip");

  withFlag("true");
  upstreamCalls = 0;
  const on = await handleChat(buildRequest({ body }));
  assert.equal(on.status, 400);
  const onBody = (await on.json()) as { error?: { message?: string } };
  assert.match(onBody.error?.message ?? "", /does not serve POST \/v1\/chat\/completions/);
  assert.equal(upstreamCalls, 0, "flag on must reject before any upstream call");
});

test("/v1/embeddings: flag off keeps the tip path, flag on answers 400 locally", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({ embedding: { values: [0.1, 0.2] }, embeddings: [{ values: [0.1] }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  const makeReq = () =>
    new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: `gemini/${TRANSCRIBE}`, input: "hello" }),
    });

  const off = await embeddingsRoute.POST(makeReq(), {});
  assert.doesNotMatch(await off.text(), /does not serve/);

  withFlag("true");
  const on = await embeddingsRoute.POST(makeReq(), {});
  assert.equal(on.status, 400);
  const onText = await on.text();
  assert.match(onText, /does not serve POST \/v1\/embeddings/);
  assert.match(onText, /Use POST \/v1\/audio\/transcriptions instead/);
});

test("/v1/models policy: flag off keeps an unrunnable tagged model listed, flag on hides it", () => {
  const transcribe = {
    id: TRANSCRIBE,
    supportedEndpoints: ["audio-transcriptions"],
    endpointCapabilitySource: "inferred",
  };
  assert.equal(isUnifiedChatSourceModelSelectable("gemini", transcribe), true);
  withFlag("true");
  assert.equal(isUnifiedChatSourceModelSelectable("gemini", transcribe), false);
  // Defaulted / legacy provenance never hides, even with the flag on.
  assert.equal(
    isUnifiedChatSourceModelSelectable("gemini", {
      ...transcribe,
      endpointCapabilitySource: undefined,
    }),
    true
  );
});

test("model test route: flag off never answers 422, flag on does", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "upstream stub" } }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  const makeReq = () =>
    new Request("http://localhost/api/models/test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ providerId: "gemini", modelId: TRANSCRIBE }),
    });

  const off = await modelTestRoute.POST(makeReq());
  assert.notEqual(off.status, 422, "flag off must keep the tip's model-test behavior");
  assert.notEqual(off.status, 401, "precondition: management auth is disabled by the harness");

  withFlag("true");
  const on = await modelTestRoute.POST(makeReq());
  assert.equal(on.status, 422);
  const onBody = (await on.json()) as { error?: string };
  assert.match(onBody.error ?? "", /no runnable adapter/);
});
