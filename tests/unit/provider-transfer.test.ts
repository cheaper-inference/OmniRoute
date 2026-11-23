// Selective provider-account transfer: export → preview → per-item import.
// The transfer file must never carry a credential in plaintext, the preview must
// never echo one, and import must validate every decision before writing,
// keep destination-local policy and never delete anything.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-transfer-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  STORAGE_ENCRYPTION_KEY: process.env.STORAGE_ENCRYPTION_KEY,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "provider-transfer-api-key-secret";
process.env.JWT_SECRET = "provider-transfer-jwt-secret";
process.env.INITIAL_PASSWORD = "provider-transfer-password";
process.env.STORAGE_ENCRYPTION_KEY = "provider-transfer-storage-key-0123456789";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const transfer = await import("../../src/lib/transfer/providerTransfer.ts");
const sealed = await import("../../src/lib/transfer/sealedPayload.ts");
const schemas = await import("../../src/shared/validation/schemas/providerTransfer.ts");
const { isAlwaysProtectedPath } = await import("../../src/server/authz/routeGuard.ts");
const catalogRoute = await import("../../src/app/api/settings/transfer/catalog/route.ts");
const exportRoute = await import("../../src/app/api/settings/transfer/export/route.ts");
const previewRoute = await import("../../src/app/api/settings/transfer/preview/route.ts");
const importRoute = await import("../../src/app/api/settings/transfer/import/route.ts");

const PASSPHRASE = "correct horse battery staple";
const SECRETS = {
  openaiKey: "sk-transfer-openai-secret-0001",
  compatKey: "sk-transfer-compat-secret-0002",
  accessToken: "transfer-oauth-access-token-0003",
  refreshToken: "transfer-oauth-refresh-token-0004",
  cookie: "transfer-session-cookie-0005",
  header: "Bearer transfer-node-header-0006",
};

await updateSettings({ requireLogin: true });
const manageKey = await apiKeysDb.createApiKey("transfer-automation", "machine", ["manage"]);

type Json = Record<string, unknown>;

async function seed() {
  const node = await providersDb.createProviderNode({
    id: "openai-compatible-chat-transfer",
    type: "openai-compatible",
    name: "Transfer Node",
    prefix: "xfer",
    apiType: "chat",
    baseUrl: "https://llm.example.test/v1",
    customHeaders: { Authorization: SECRETS.header },
  });
  const openai = (await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Primary OpenAI",
    apiKey: SECRETS.openaiKey,
    priority: 7,
    testStatus: "unavailable",
    lastError: "boom",
  })) as Json;
  const compat = (await providersDb.createProviderConnection({
    provider: node.id,
    authType: "apikey",
    name: "Compat key",
    apiKey: SECRETS.compatKey,
    providerSpecificData: { prefix: "xfer", baseUrl: "https://llm.example.test/v1" },
  })) as Json;
  const oauth = (await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email: "owner@example.test",
    accessToken: SECRETS.accessToken,
    refreshToken: SECRETS.refreshToken,
    providerSpecificData: { sessionCookie: SECRETS.cookie },
  })) as Json;
  return { node, openai, compat, oauth };
}

const seeded = await seed();

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function assertNoSecrets(text: string, where: string) {
  for (const secret of Object.values(SECRETS)) {
    assert.ok(!text.includes(secret), `${where} must not contain ${secret}`);
  }
}

// Exported once from the seeded install; later tests mutate the database and
// re-import this same file, the way a second install would receive it.
const initialBundle = await (async () => {
  const bundle = await transfer.exportProviderTransferBundle({
    connectionIds: [String(seeded.openai.id), String(seeded.compat.id), String(seeded.oauth.id)],
    passphrase: PASSPHRASE,
  });
  // Round-trip through a file and the route schema, exactly as the dashboard does.
  return schemas.providerTransferBundleSchema.parse(JSON.parse(JSON.stringify(bundle)));
})();

async function exportAll() {
  return initialBundle;
}

function countConnections() {
  const db = core.getDbInstance();
  return (db.prepare("SELECT count(*) AS n FROM provider_connections").get() as { n: number }).n;
}

test("sealed envelope round-trips and rejects a wrong passphrase or a tampered file", async () => {
  const envelope = await sealed.sealJson({ hello: "world" }, PASSPHRASE, "aad");
  assert.deepEqual(await sealed.openSealedJson(envelope, PASSPHRASE, "aad"), { hello: "world" });
  await assert.rejects(
    sealed.openSealedJson(envelope, "wrong passphrase!!", "aad"),
    sealed.SealedPayloadError
  );
  await assert.rejects(
    sealed.openSealedJson(envelope, PASSPHRASE, "other-aad"),
    sealed.SealedPayloadError
  );
  const flipped = Buffer.from(envelope.data, "base64");
  flipped[0] ^= 0xff;
  await assert.rejects(
    sealed.openSealedJson({ ...envelope, data: flipped.toString("base64") }, PASSPHRASE, "aad"),
    sealed.SealedPayloadError
  );
});

test("export seals credentials, PII and the dependent provider node; cleartext is counts only", async () => {
  const bundle = await exportAll();
  const text = JSON.stringify(bundle);
  assertNoSecrets(text, "the transfer file");
  assert.ok(!text.includes("owner@example.test"), "emails stay inside the sealed payload");
  assert.equal(bundle.format, "omniroute-provider-transfer");
  assert.deepEqual(bundle.summary, { providerConnections: 3, providerNodes: 1 });

  const payload = await transfer.openProviderTransferBundle(bundle, PASSPHRASE);
  const openai = payload.providerConnections.find((c) => c.provider === "openai") as Json;
  assert.equal(openai.apiKey, SECRETS.openaiKey);
  for (const local of ["priority", "isActive", "testStatus", "lastError", "id", "createdAt"]) {
    assert.equal(local in openai, false, `${local} is destination-local and must not travel`);
  }
  assert.equal(payload.providerNodes.length, 1);
  assert.deepEqual(payload.providerNodes[0].customHeaders, { Authorization: SECRETS.header });
});

test("a hand-edited file cannot plant a provider node under a built-in provider id", async () => {
  const forged = await sealed.sealJson(
    {
      providerConnections: [],
      providerNodes: [{ sourceId: "openai", type: "openai-compatible", name: "Forged" }],
    },
    PASSPHRASE,
    `${schemas.PROVIDER_TRANSFER_FORMAT}:v${schemas.PROVIDER_TRANSFER_VERSION}`
  );
  const bundle = { format: schemas.PROVIDER_TRANSFER_FORMAT, version: 1, sealed: forged } as const;
  await assert.rejects(
    transfer.openProviderTransferBundle(
      schemas.providerTransferBundleSchema.parse(bundle),
      PASSPHRASE
    ),
    /Unexpected provider node/
  );
});

test("export rejects a selection that no longer exists", async () => {
  await assert.rejects(
    transfer.exportProviderTransferBundle({
      connectionIds: ["missing-id"],
      passphrase: PASSPHRASE,
    }),
    transfer.ProviderTransferInputError
  );
});

test("preview reports identical items on the same install and never echoes a secret", async () => {
  const bundle = await exportAll();
  const plan = await transfer.previewProviderTransfer(bundle, PASSPHRASE);
  assertNoSecrets(JSON.stringify(plan), "the preview");
  assert.equal(plan.summary.deletions, 0);
  assert.deepEqual(
    plan.providerConnections.map((item) => item.status),
    ["identical", "identical", "identical"]
  );
  assert.equal(plan.providerNodes[0].status, "identical");
  assert.ok(plan.providerConnections.every((item) => item.recommended === "skip"));
});

test("planner: new, conflict and unsupported items", async () => {
  const payload = {
    providerNodes: [],
    providerConnections: [
      { sourceId: "a", provider: "openai", authType: "apikey", name: "New", apiKey: "k-new" },
      { sourceId: "b", provider: "openai", authType: "apikey", name: "Same name", apiKey: "k-b" },
      { sourceId: "c", provider: "openai-compatible-chat-gone", authType: "apikey", apiKey: "x" },
      { sourceId: "d", provider: "not-a-real-provider", authType: "apikey", apiKey: "y" },
    ],
  };
  const existing = {
    nodes: [],
    connections: [
      { id: "t1", provider: "openai", authType: "apikey", name: "Same name", apiKey: "other" },
    ],
  };
  const plan = transfer.planProviderTransfer(payload, existing);
  const byId = Object.fromEntries(plan.providerConnections.map((item) => [item.sourceId, item]));
  assert.equal(byId.a.status, "new");
  assert.deepEqual(byId.a.actions, ["add", "skip"]);
  assert.equal(byId.b.status, "conflict");
  assert.equal(byId.b.targetId, "t1");
  assert.deepEqual(byId.b.actions, ["skip", "replace"]);
  assert.equal(byId.c.status, "unsupported", "a compatible provider without its node");
  assert.equal(byId.d.status, "unsupported", "an unknown provider id");
  assert.deepEqual(byId.d.actions, ["skip"]);
});

test("import: add restores a deleted account, replace keeps local policy, nothing is deleted", async () => {
  const bundle = await exportAll();
  const openaiId = String(seeded.openai.id);
  const oauthId = String(seeded.oauth.id);

  await providersDb.deleteProviderConnection(openaiId);
  await providersDb.updateProviderConnection(oauthId, { name: "Renamed here", isActive: false });
  const before = await providersDb.getProviderConnectionById(oauthId);
  const extra = (await providersDb.createProviderConnection({
    provider: "groq",
    authType: "apikey",
    name: "Unrelated",
    apiKey: "gsk-unrelated",
  })) as Json;
  const countBefore = countConnections();

  const plan = await transfer.previewProviderTransfer(bundle, PASSPHRASE);
  const oauthItem = plan.providerConnections.find((item) => item.sourceId === oauthId);
  assert.equal(oauthItem?.status, "conflict");

  const result = await transfer.applyProviderTransfer(bundle, PASSPHRASE, {
    [`connection:${oauthId}`]: "replace",
  });
  assert.equal(result.deletions, 0);
  assert.equal(result.applied.providerConnections, 2);
  assert.equal(countConnections(), countBefore + 1, "only the deleted account comes back");
  assert.ok(await providersDb.getProviderConnectionById(String(extra.id)), "unrelated row kept");

  const restored = (
    (await providersDb.getProviderConnections({ provider: "openai" })) as Json[]
  )[0];
  assert.equal(restored.apiKey, SECRETS.openaiKey, "credential re-encrypted and readable");
  assert.notEqual(restored.testStatus, "unavailable", "runtime state does not travel");
  const rawRow = core
    .getDbInstance()
    .prepare("SELECT api_key FROM provider_connections WHERE id = ?")
    .get(String(restored.id)) as { api_key: string };
  assert.match(rawRow.api_key, /^enc:v1:/, "stored encrypted at rest");

  const replaced = (await providersDb.getProviderConnectionById(oauthId)) as Json;
  assert.equal(replaced.name ?? null, (seeded.oauth.name as string | null) ?? null);
  assert.equal(replaced.isActive, false, "destination active flag is preserved");
  assert.equal(replaced.priority, (before as Json).priority, "destination priority is preserved");
  assert.equal(replaced.refreshToken, SECRETS.refreshToken);
});

test("import validates every decision before writing anything", async () => {
  const bundle = await exportAll();
  const countBefore = countConnections();
  await assert.rejects(
    transfer.applyProviderTransfer(bundle, PASSPHRASE, {
      [`connection:${seeded.openai.id}`]: "skip",
      [`connection:${seeded.compat.id}`]: "add",
    }),
    transfer.ProviderTransferInputError
  );
  await assert.rejects(
    transfer.applyProviderTransfer(bundle, PASSPHRASE, { "connection:unknown": "skip" }),
    transfer.ProviderTransferInputError
  );
  assert.equal(countConnections(), countBefore);
});

test("import refuses an account whose provider node is being skipped", async () => {
  const bundle = await exportAll();
  await providersDb.deleteProviderConnection(String(seeded.compat.id));
  await providersDb.deleteProviderNode(String(seeded.node.id));
  const countBefore = countConnections();
  await assert.rejects(
    transfer.applyProviderTransfer(bundle, PASSPHRASE, {
      [`node:${seeded.node.id}`]: "skip",
    }),
    /needs its provider node/
  );
  assert.equal(countConnections(), countBefore);

  const result = await transfer.applyProviderTransfer(bundle, PASSPHRASE, {});
  assert.equal(result.applied.providerNodes, 1);
  const node = (await providersDb.getProviderNodeById(String(seeded.node.id))) as Json;
  assert.equal(node.prefix, "xfer");
  const compat = (await providersDb.getProviderConnections({ provider: node.id })) as Json[];
  assert.equal(compat[0].apiKey, SECRETS.compatKey);
});

// ──────────────── Routes ────────────────

const BASE = "http://localhost:20128/api/settings/transfer";

test("routes are hard-gated and refuse unauthenticated callers and machine keys", async () => {
  for (const sub of ["catalog", "export", "preview", "import"]) {
    assert.equal(isAlwaysProtectedPath(`/api/settings/transfer/${sub}`), true, sub);
  }
  const anonymous = await catalogRoute.GET(new Request(`${BASE}/catalog`));
  assert.equal(anonymous.status, 401);
  assert.ok(!JSON.stringify(await anonymous.json()).includes("at /"));

  const keyed = await exportRoute.POST(
    new Request(`${BASE}/export`, {
      method: "POST",
      headers: { authorization: `Bearer ${manageKey.key}`, "content-type": "application/json" },
      body: JSON.stringify({}),
    })
  );
  assert.equal(keyed.status, 403);
  for (const route of [previewRoute, importRoute]) {
    const response = await route.POST(
      new Request(`${BASE}/x`, { method: "POST", body: JSON.stringify({}) })
    );
    assert.equal(response.status, 401);
  }
});

test("catalog lists accounts without any credential", async () => {
  const response = await catalogRoute.GET(await makeManagementSessionRequest(`${BASE}/catalog`));
  assert.equal(response.status, 200);
  const text = await response.text();
  assertNoSecrets(text, "the catalog");
  const body = JSON.parse(text) as { providerConnections: Json[] };
  assert.ok(body.providerConnections.some((c) => c.provider === "openai"));
  assert.ok(body.providerConnections.every((c) => !("apiKey" in c) && !("accessToken" in c)));
});

test("export route requires the explicit acknowledgment and a long passphrase", async () => {
  const connectionIds = [String(seeded.oauth.id)];
  const missingAck = await exportRoute.POST(
    await makeManagementSessionRequest(`${BASE}/export`, {
      method: "POST",
      body: { connectionIds, passphrase: PASSPHRASE },
    })
  );
  assert.equal(missingAck.status, 400);
  const shortPass = await exportRoute.POST(
    await makeManagementSessionRequest(`${BASE}/export`, {
      method: "POST",
      body: { connectionIds, passphrase: "short", acknowledgeCredentialExport: true },
    })
  );
  assert.equal(shortPass.status, 400);

  const ok = await exportRoute.POST(
    await makeManagementSessionRequest(`${BASE}/export`, {
      method: "POST",
      body: { connectionIds, passphrase: PASSPHRASE, acknowledgeCredentialExport: true },
    })
  );
  assert.equal(ok.status, 200);
  assert.match(ok.headers.get("content-disposition") || "", /attachment/);
  const text = await ok.text();
  assertNoSecrets(text, "the exported file");

  const preview = await previewRoute.POST(
    await makeManagementSessionRequest(`${BASE}/preview`, {
      method: "POST",
      body: { bundle: JSON.parse(text), passphrase: PASSPHRASE },
    })
  );
  assert.equal(preview.status, 200);
  assertNoSecrets(await preview.text(), "the preview response");

  const wrong = await previewRoute.POST(
    await makeManagementSessionRequest(`${BASE}/preview`, {
      method: "POST",
      body: { bundle: JSON.parse(text), passphrase: "not the passphrase" },
    })
  );
  assert.equal(wrong.status, 400);
  const wrongBody = (await wrong.json()) as { error: { message: string } };
  assert.match(wrongBody.error.message, /passphrase/i);
  assert.ok(!wrongBody.error.message.includes("at /"));

  const imported = await importRoute.POST(
    await makeManagementSessionRequest(`${BASE}/import`, {
      method: "POST",
      body: { bundle: JSON.parse(text), passphrase: PASSPHRASE, decisions: {} },
    })
  );
  assert.equal(imported.status, 200);
  const importedText = await imported.text();
  assertNoSecrets(importedText, "the import response");
  assert.equal((JSON.parse(importedText) as Json).deletions, 0);
});
