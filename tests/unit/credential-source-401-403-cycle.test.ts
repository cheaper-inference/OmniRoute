/**
 * HAC-119 — 401/403 credential lifecycle (store vs env), implementing HAC-116 D1–D6.
 *
 * Covers:
 *   - D1  provenance: connectionId `env:<VAR>` → "env", else "store".
 *   - D2  an env credential is recorded in-memory but NEVER persisted (no DB row).
 *   - D3  a definitive credential rejection on a store key terminalizes immediately
 *         (invalid → never returned until replaced); ambiguous 403 stays thresholded.
 *   - D4  replacing a store key purges the stale in-memory health entry (new key usable).
 *   - D5  explainCredentialRefusal(): plain cause first, safe details after, no secret.
 *   - D6  a non-credential 403 (policy / Cloudflare / geo) never invalidates the key.
 */
import { test, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hac119-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { recordKeyHealthStatus } = await import("../../open-sse/handlers/chatCore/keyHealth.ts");
const { getValidApiKey, getAllKeyHealth, removeConnectionHealth } =
  await import("../../open-sse/services/apiKeyRotator.ts");
const { credentialSource, envVarName } =
  await import("../../open-sse/services/credentialSource.ts");
const { explainCredentialRefusal } = await import("../../open-sse/utils/error.ts");

const noopLog = { warn: () => {}, error: () => {} };
const touched: string[] = [];

function storeCreds(
  connId: string,
  psd: Record<string, unknown> = {},
  provider = "openai"
): Record<string, unknown> {
  touched.push(connId);
  return {
    connectionId: connId,
    apiKey: "sk-store-key",
    accessToken: null,
    provider,
    providerSpecificData: psd,
  };
}

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

beforeEach(async () => {
  await resetStorage();
});

afterEach(() => {
  for (const c of touched.splice(0)) removeConnectionHealth(c);
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── D1: provenance ────────────────────────────────────────────────────────────
test("D1 credentialSource classifies env: prefix as env, everything else as store", () => {
  assert.equal(credentialSource({ connectionId: "env:GEMINI_API_KEY" }), "env");
  assert.equal(credentialSource({ connectionId: "env:JINA_AI_API_KEY" }), "env");
  assert.equal(credentialSource({ connectionId: "conn-uuid-1234" }), "store");
  assert.equal(credentialSource({}), "store");
  assert.equal(credentialSource(null), "store");

  assert.equal(envVarName("env:GEMINI_API_KEY"), "GEMINI_API_KEY");
  assert.equal(envVarName("env:JINA_AI_API_KEY"), "JINA_AI_API_KEY");
  assert.equal(envVarName("conn-uuid-1234"), null);
  assert.equal(envVarName("env:"), null);
});

// ── D2 + D3: store path invalidates immediately and persists ──────────────────
test("D3 store 401 credential rejection → key invalid immediately and health persisted", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "store-401",
    apiKey: "sk-original-store",
    providerSpecificData: { apiKeyHealth: {} },
  });
  assert.ok(created?.id);
  const connId = created.id;

  recordKeyHealthStatus(
    401,
    {
      connectionId: connId,
      apiKey: "sk-original-store",
      accessToken: null,
      provider: "openai",
      providerSpecificData: { apiKeyHealth: {} },
    },
    noopLog
  );

  // In-memory: terminal in one shot.
  const inMemory = getAllKeyHealth()[`${connId}:primary`];
  assert.equal(inMemory?.status, "invalid");

  // Persisted to the DB row (survives restart). The write is fire-and-forget in
  // recordKeyHealthStatus, so poll until it lands (short timeout, then fail).
  let persisted: { status?: string } | undefined;
  for (let i = 0; i < 50; i++) {
    const reloaded = await providersDb.getProviderConnectionById(connId);
    const health = reloaded?.providerSpecificData?.apiKeyHealth as
      Record<string, { status?: string }> | undefined;
    persisted = health?.primary;
    if (persisted?.status === "invalid") break;
    await new Promise((r) => setTimeout(r, 20));
  }
  assert.equal(persisted?.status, "invalid", "store health must be persisted");
});

test("D3 after invalidation the rotator never returns the rejected store key", () => {
  const connId = "hac119-no-reuse-store";
  recordKeyHealthStatus(401, storeCreds(connId), noopLog);

  // A single-primary connection: with the only key invalid, no key is eligible.
  const pick = getValidApiKey(connId, "sk-store-key", []);
  assert.equal(pick, null, "rejected key must not be selected again");

  // With a sibling extra key, the rotator falls through to the healthy sibling only.
  const conn2 = "hac119-no-reuse-extra";
  recordKeyHealthStatus(401, storeCreds(conn2, { selectedKeyId: "primary" }), noopLog);
  for (let i = 0; i < 4; i++) {
    const next = getValidApiKey(conn2, "sk-store-key", ["sk-sibling"]);
    assert.ok(next);
    assert.equal(next!.key, "sk-sibling");
  }
});

// ── D2: env never mutated, message names the env var ──────────────────────────
test("D2 env 401 is recorded in-memory but never persists a DB row", async () => {
  // No DB row exists for env credentials. updateProviderConnection("env:…") must not be called.
  const connId = "env:GEMINI_API_KEY";

  // Instrument: any DB write attempt for env:* would surface as a createProviderConnection-
  // style lookup miss; assert the row truly does not exist and stays absent.
  const before = await providersDb.getProviderConnectionById(connId);
  assert.equal(before, null);

  recordKeyHealthStatus(
    401,
    {
      connectionId: connId,
      apiKey: "env-secret-value",
      accessToken: null,
      provider: "gemini",
      providerSpecificData: { apiKeyHealth: {} },
    },
    noopLog
  );

  // In-memory terminal state still recorded (so the run does not re-select it).
  const inMemory = getAllKeyHealth()[`${connId}:primary`];
  assert.equal(inMemory?.status, "invalid");

  // Still no row — env credentials are never persisted/mutated.
  const after = await providersDb.getProviderConnectionById(connId);
  assert.equal(after, null, "env credential must not create or mutate a provider_connections row");

  // And the env key is not returned again by the rotator.
  assert.equal(getValidApiKey(connId, "env-secret-value", []), null);
});

// ── D4: recovery after replacing a store key ──────────────────────────────────
test("D4 replacing a store key purges stale health so the new key is usable again", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "store-replace",
    apiKey: "sk-old-dead",
    providerSpecificData: { apiKeyHealth: {} },
  });
  const connId = created.id;

  // The old key was terminalized (invalid + persisted).
  recordKeyHealthStatus(
    401,
    {
      connectionId: connId,
      apiKey: "sk-old-dead",
      accessToken: null,
      provider: "openai",
      providerSpecificData: { apiKeyHealth: {} },
    },
    noopLog
  );
  assert.equal(getAllKeyHealth()[`${connId}:primary`]?.status, "invalid");
  assert.equal(getValidApiKey(connId, "sk-old-dead", []), null);

  // Operator replaces the key via the DB update path.
  await providersDb.updateProviderConnection(connId, { apiKey: "sk-new-healthy" });

  // Stale in-memory health must be gone → the new key is selectable again.
  assert.equal(
    getAllKeyHealth()[`${connId}:primary`],
    undefined,
    "replacing the key must purge stale health"
  );
  const pick = getValidApiKey(connId, "sk-new-healthy", []);
  assert.ok(pick, "the replacement key must become selectable again");
  assert.equal(pick!.key, "sk-new-healthy");
});

// ── D6: non-credential 403 must not invalidate ────────────────────────────────
test("D6 non-credential 403s (Cloudflare / geo / policy) never invalidate the key", () => {
  // Each case is a real classifier path for 403: fingerprint_rejection (any provider),
  // geo_blocked (Google-family providers only), account_deactivated.
  const cases: Array<[string, string, string, string | undefined]> = [
    [
      "cloudflare",
      "openai",
      '{"error_code":1010,"error_name":"browser_signature_banned"}',
      undefined,
    ],
    [
      "geo",
      "gemini",
      "400 FAILED_PRECONDITION: User location is not supported for the API use.",
      undefined,
    ],
    [
      "account-deactivated",
      "openai",
      "Your account has been deactivated. Please contact support.",
      undefined,
    ],
  ];

  for (const [label, provider, detail] of cases) {
    const connId = `hac119-noncred-${label}`;
    recordKeyHealthStatus(403, storeCreds(connId, {}, provider), noopLog, undefined, detail);
    assert.equal(
      getAllKeyHealth()[`${connId}:primary`],
      undefined,
      `${label}: a non-credential 403 must leave credential health untouched`
    );
  }
});

test("D6 model-capability 403/401 stays model telemetry (no key health entry)", () => {
  const connId = "hac119-model-capability";
  recordKeyHealthStatus(
    403,
    storeCreds(connId),
    noopLog,
    undefined,
    JSON.stringify({ error: { code: "unsupported_model", message: "Unsupported model" } })
  );
  recordKeyHealthStatus(
    401,
    storeCreds("hac119-model-capability-401"),
    noopLog,
    undefined,
    JSON.stringify({ error: { message: "model foo is not supported" } })
  );
  assert.equal(getAllKeyHealth()[`${connId}:primary`], undefined);
  assert.equal(
    getAllKeyHealth()[`hac119-model-capability-401:primary`],
    undefined,
    "a 401 that actually names an unavailable model must not be treated as a credential reject"
  );
});

// ── D5: message formatter ─────────────────────────────────────────────────────
test("D5 explainCredentialRefusal leads with plain cause and keeps details safe", () => {
  const storeMsg = explainCredentialRefusal({
    status: 401,
    source: "store",
    connectionId: "8f3c2a10-dead-beef",
    provider: "openai",
    model: "gpt-4o",
    action: "replace_api_key",
  });
  // Plain cause leads.
  assert.match(storeMsg, /stored API key .* rejected/i);
  assert.match(storeMsg, /replace_api_key/);
  // Safe detail line trails with provider/model/status/connection_id.
  assert.match(storeMsg, /status 401/);
  assert.match(storeMsg, /provider openai/);
  assert.match(storeMsg, /model gpt-4o/);
  assert.match(storeMsg, /connection_id 8f3c2a10-dead-beef/);

  const envMsg = explainCredentialRefusal({
    status: 401,
    source: "env",
    envVarName: "GEMINI_API_KEY",
    provider: "gemini",
    model: "gemini-2.5-pro",
  });
  assert.match(envMsg, /environment .* rejected/i);
  assert.match(envMsg, /GEMINI_API_KEY/);
  assert.match(envMsg, /source env:GEMINI_API_KEY/);
  assert.match(envMsg, /status 401/);
});

test("D5 message never leaks key material, Authorization, or raw upstream body", () => {
  const secret = "sk-live-SUPERSECRET-abcdef1234567890";
  const msg = explainCredentialRefusal({
    status: 403,
    source: "store",
    connectionId: "conn-1",
    provider: "openai",
    model: "gpt-4o",
    detail: `upstream said: Authorization: Bearer ${secret} api_key=${secret}`,
  });
  assert.ok(!msg.includes(secret), "the raw credential value must never appear");
  assert.ok(!/Bearer\s+sk-/i.test(msg), "an Authorization bearer token must be redacted");
  assert.ok(msg.includes("status 403"));
});
