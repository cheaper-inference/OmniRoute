/**
 * /api/monitoring/model-health — auth downgrade (C1) and model source (H2).
 *
 * C1: the route called `isAuthenticated()` without `await`, so the returned
 *     Promise was always truthy and every caller — including anonymous ones —
 *     received connection ids/names, lockouts and per-key error state. The path
 *     is not a public read-only route, so the authz pipeline classifies it
 *     MANAGEMENT and an anonymous caller never reaches the handler; the handler
 *     itself also refuses anonymous callers rather than offering a reduced view
 *     that production could never serve.
 * H2: models were read from `conn.models`, a column that does not exist on
 *     provider_connections, so the endpoint always reported zero models. Models
 *     live in the synced available-models store keyed by connection id.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// DATA_DIR must be set before the DB core module evaluates its singleton.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-health-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const modelsDb = await import("../../../src/lib/db/models.ts");
const route = await import("../../../src/app/api/monitoring/model-health/route.ts");
const { resolveProviderId } = await import("../../../src/shared/constants/providers.ts");
const { classifyRoute } = await import("../../../src/server/authz/classify.ts");

const URL = "http://localhost:20128/api/monitoring/model-health";

test.before(async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    name: "OpenAI Key 1",
    authType: "apikey",
    apiKey: "sk-test-not-real",
  });
  const connections = await providersDb.getProviderConnections({ provider: "openai" });
  const connection = connections[0];
  assert.ok(connection?.id, "seeded connection must have an id");
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", String(connection.id), [
    { id: "gpt-4", name: "gpt-4" },
  ]);

  // A provider whose connection has no synced models at all — it must appear
  // with zero models rather than vanishing from the report.
  const anthropicProvider = resolveProviderId("anthropic");
  await providersDb.createProviderConnection({
    provider: anthropicProvider,
    name: "Anthropic Key 1",
    authType: "apikey",
    apiKey: "sk-ant-test-not-real",
  });

  // A banned key: its models must classify as AUTH_FAILED, not HEALTHY.
  const googleProvider = resolveProviderId("google");
  await providersDb.createProviderConnection({
    provider: googleProvider,
    name: "Google Key 1",
    authType: "apikey",
    apiKey: "google-test-not-real",
    testStatus: "banned",
  });
  const googleConn = (await providersDb.getProviderConnections({ provider: googleProvider }))[0];
  assert.ok(googleConn?.id, "seeded google connection must have an id");
  await modelsDb.replaceSyncedAvailableModelsForConnection(googleProvider, String(googleConn.id), [
    { id: "gemini-test-model", name: "Gemini Test" },
  ]);

  // Malformed synced entries (no usable id) must never surface as models.
  const mistralProvider = resolveProviderId("mistral");
  await providersDb.createProviderConnection({
    provider: mistralProvider,
    name: "Mistral Key 1",
    authType: "apikey",
    apiKey: "mistral-test-not-real",
  });
  const mistralConn = (await providersDb.getProviderConnections({ provider: mistralProvider }))[0];
  assert.ok(mistralConn?.id, "seeded mistral connection must have an id");
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    mistralProvider,
    String(mistralConn.id),
    [{}, { id: "", name: "" }, { id: "mistral-large-latest", name: "Mistral Large" }] as never
  );
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("C1: the authz pipeline classifies model-health as a MANAGEMENT route", () => {
  const classification = classifyRoute("/api/monitoring/model-health", "GET");
  assert.equal(
    classification.routeClass,
    "MANAGEMENT",
    "model-health exposes connection ids/names and lockouts: it must not be public"
  );
});

test("C1: an anonymous caller is refused, never handed connection detail", async () => {
  const res = await route.GET(new Request(URL));
  assert.equal(res.status, 401, "anonymous access must be rejected, as the pipeline does");

  const body = await res.json();
  assert.equal("providers" in body, false, "a refused caller must not receive any provider data");
});

test("H2: models are sourced from the synced available-models store", async () => {
  const res = await route.GET(await makeManagementSessionRequest(URL));
  assert.equal(res.status, 200);

  const body = await res.json();
  const openai = body.providers.find((p: { provider: string }) => p.provider === "openai");
  assert.ok(openai, "the seeded provider must appear");
  assert.ok(Array.isArray(openai.connections) && openai.connections.length >= 1);

  const models = openai.connections.flatMap((c: { models: { model: string }[] }) =>
    c.models.map((m) => m.model)
  );
  assert.deepEqual(models, ["gpt-4"], "models must come from the synced store, not conn.models");
});

test("C1: a management session receives the full per-connection view", async () => {
  const res = await route.GET(await makeManagementSessionRequest(URL));
  assert.equal(res.status, 200);

  const body = await res.json();
  const openai = body.providers.find((p: { provider: string }) => p.provider === "openai");
  assert.ok(openai.connections.length >= 1, "full view must include connections");
  assert.equal(typeof openai.connections[0].connectionId, "string");
  assert.ok(openai.connections[0].models.length >= 1);
});

test("summary counts every model state, including models on a failed connection", async () => {
  const res = await route.GET(await makeManagementSessionRequest(URL));
  assert.equal(res.status, 200);

  const body = await res.json();

  // openai gpt-4 (HEALTHY) + mistral's one valid model (HEALTHY); google's model
  // sits on a banned connection (AUTH_FAILED); anthropic has no models at all.
  assert.deepEqual(
    body.summary,
    {
      healthy: 2,
      degraded: 0,
      rateLimited: 0,
      authFailed: 1,
      providerDown: 0,
      connectionBlocked: 0,
      modelLocked: 0,
      unknown: 0,
    },
    "the summary must count each model exactly once, under its classified state"
  );

  const google = body.providers.find(
    (p: { provider: string }) => p.provider === resolveProviderId("google")
  );
  assert.ok(google, "the banned-key provider must appear");
  const googleStates = google.connections.flatMap((c: { models: { state: string }[] }) =>
    c.models.map((m) => m.state)
  );
  assert.deepEqual(googleStates, ["AUTH_FAILED"], "a banned key must not report healthy models");

  const anthropic = body.providers.find(
    (p: { provider: string }) => p.provider === resolveProviderId("anthropic")
  );
  assert.ok(anthropic, "a provider with no synced models must still appear");
  assert.equal(
    anthropic.connections.reduce((n: number, c: { models: unknown[] }) => n + c.models.length, 0),
    0
  );

  const mistral = body.providers.find(
    (p: { provider: string }) => p.provider === resolveProviderId("mistral")
  );
  const mistralModels = mistral.connections.flatMap((c: { models: { model: string }[] }) =>
    c.models.map((m) => m.model)
  );
  assert.deepEqual(
    mistralModels,
    ["mistral-large-latest"],
    "malformed synced entries must not surface as models"
  );
});
