import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { opaqueTokenFingerprint } from "@omniroute/open-sse/utils/opaqueTokenFingerprint.ts";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const scratch = process.env.DATA_DIR ?? tmpdir();
mkdirSync(scratch, { recursive: true });
const dataDir = mkdtempSync(join(scratch, "system-api-keys-"));
process.env.DATA_DIR = dataDir;
process.env.JWT_SECRET = "system-key-test-session";
process.env.API_KEY_SECRET = "system-key-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";
process.env.ALLOW_API_KEY_REVEAL = "true";
process.env.REQUIRE_API_KEY = "false";
process.env.CLOUD_URL = "false";
delete process.env.INITIAL_PASSWORD;
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;

const keys = await import("@/lib/db/apiKeys");
const { getDbInstance, resetDbInstance } = await import("@/lib/db/core");
const { updateSettings } = await import("@/lib/db/settings");
const { closeCallLogSaves, getCallLogs, waitForCallLogSaves } =
  await import("@/lib/usage/callLogs");
const { runWithRequiredApiKey, resolveRequiredApiKey } =
  await import("@/shared/utils/requiredApiKeyContext");

const origin = "http://localhost:20128";
const model = "openai/gpt-4.1";
const protectedScopes = ["admin", "manage", "mcp:connect", "policy:bypass-provider-quota", "*"];

await updateSettings({ requireLogin: false });

test.after(async () => {
  await closeCallLogSaves(10_000);
  const { flushProxyLogsSync } = await import("@/lib/proxyLogger");
  flushProxyLogsSync();
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

async function seedSystemKey() {
  const key = await keys.createApiKey("System inference", "system-key-test");
  getDbInstance().prepare("UPDATE api_keys SET source = 'system' WHERE id = ?").run(key.id);
  return key;
}

function keyParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

function operator(path: string, method = "GET", body?: Record<string, unknown>) {
  return makeManagementSessionRequest(origin + path, { method, body });
}

function assertRedacted(value: unknown, secret: string) {
  const json = JSON.stringify(value);
  assert.equal(json.includes(secret.slice(0, 12)), false, "credential prefix");
  assert.equal(json.includes(opaqueTokenFingerprint(secret)), false, "credential hash");
  assert.doesNotMatch(json, /"keyPrefix"|"keyHash"|"rawKey"/);
}

test("local catalog and anonymous launch stay open when only a system key exists", async () => {
  await seedSystemKey();
  const { getModelCatalogAuthRejection } = await import("@/app/api/v1/models/catalogRequest");
  const { AUTHZ_HEADER_PEER_LOCALITY } = await import("@/server/authz/headers");
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "system-key-test-peer-stamp";
  await updateSettings({ requireLogin: true, setupComplete: true });
  const request = new Request(origin + "/v1/models", {
    headers: { [AUTHZ_HEADER_PEER_LOCALITY]: "loopback" },
  });
  try {
    const posture = await keys.isLaunchAnonymousPostureOpen();
    const rejection = await getModelCatalogAuthRejection(request, { setupComplete: true }, {});
    assert.deepEqual([posture, rejection?.status ?? null], [true, null]);

    await keys.createApiKey("Client", "system-key-test");
    assert.equal(await keys.isLaunchAnonymousPostureOpen(), false);
    assert.equal(
      (await getModelCatalogAuthRejection(request, { setupComplete: true }, {}))?.status,
      401
    );
  } finally {
    await updateSettings({ requireLogin: false });
    delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  }
});

test("server creation fixes provenance and rejects privileged scopes", async () => {
  const created = await keys.createSystemApiKey("Server feature", "system-key-test");
  assert.equal((await keys.getApiKeyById(created.id))?.source, "system");
  const binding = await keys.resolveSystemApiKey(created.id);
  assert.ok(binding);
  assertRedacted(created, binding.apiKey);
  const { isValidApiKey } = await import("@/sse/services/auth");
  process.env.OMNIROUTE_API_KEY = binding.apiKey;
  try {
    assert.equal(await keys.validateApiKey(binding.apiKey), false);
    assert.equal(await isValidApiKey(binding.apiKey), false);
    assert.equal(await keys.getApiKeyMetadata(binding.apiKey), null);
  } finally {
    delete process.env.OMNIROUTE_API_KEY;
  }
  for (const scope of protectedScopes) {
    await assert.rejects(
      keys.createSystemApiKey("Privileged", "system-key-test", [scope]),
      keys.ApiKeyPolicyInvariantError
    );
  }
});

test("management lists and details retain policy metadata and omit system credentials", async () => {
  const key = await seedSystemKey();
  const list = await import("@/app/api/keys/route");
  const detail = await import("@/app/api/keys/[id]/route");
  for (const response of [
    await list.GET(await operator("/api/keys")),
    await list.GET(await operator("/api/keys?limit=100")),
    await detail.GET(await operator("/api/keys/" + key.id), keyParams(key.id)),
  ]) {
    assert.equal(response.status, 200);
    const body = await response.json();
    const row = body.keys?.find(({ id }: { id: string }) => id === key.id) ?? body;
    assert.equal(row.id, key.id);
    assert.equal(row.name, key.name);
    assert.equal(row.isActive, true);
    assert.deepEqual(row.allowedModels, []);
    assertRedacted(row, key.key);
  }
  assertRedacted(await keys.getApiKeyById(key.id), key.key);
});

test("reveal and regeneration refuse system keys in routes and the domain", async () => {
  const key = await seedSystemKey();
  const reveal = await import("@/app/api/keys/[id]/reveal/route");
  const regenerate = await import("@/app/api/keys/[id]/regenerate/route");
  const path = "/api/keys/" + key.id;
  const params = keyParams(key.id);
  const shown = await reveal.GET(await operator(path + "/reveal"), params);
  const rotated = await regenerate.POST(await operator(path + "/regenerate", "POST"), params);
  const row = await keys.getApiKeyById(key.id);
  const domainRotation = await keys.regenerateApiKey(key.id);
  assert.deepEqual(
    [shown.status, rotated.status, row?.key === "", domainRotation === null],
    [403, 403, true, true]
  );
  assertRedacted(await shown.json(), key.key);
  assertRedacted(await rotated.json(), key.key);
});

test("generic creation and policy edits cannot assign or change system provenance", async () => {
  const key = await seedSystemKey();
  const { POST } = await import("@/app/api/keys/route");
  const { PATCH } = await import("@/app/api/keys/[id]/route");
  const crafted = await POST(
    await operator("/api/keys", "POST", { name: "Client key", id: key.id, source: "system" })
  );
  assert.ok([400, 201].includes(crafted.status));
  if (crafted.status === 201) {
    const { id } = await crafted.json();
    assert.notEqual(id, key.id);
    assert.notEqual((await keys.getApiKeyById(id))?.source, "system");
  }

  const path = "/api/keys/" + key.id;
  for (const scope of protectedScopes) {
    await assert.rejects(
      keys.updateApiKeyPermissions(key.id, { scopes: [scope] }),
      keys.ApiKeyPolicyInvariantError
    );
  }
  const escalated = await PATCH(
    await operator(path, "PATCH", { scopes: ["admin"] }),
    keyParams(key.id)
  );
  assert.equal(escalated.status, 400);
  assert.equal((await escalated.json()).error.code, "SYSTEM_KEY_POLICY_INVALID");
  const edited = await PATCH(
    await operator(path, "PATCH", { source: "manual", dailyUsageLimitUsd: 1 }),
    keyParams(key.id)
  );
  assert.equal(edited.status, 200);
  const current = await keys.getApiKeyById(key.id);
  assert.equal(current?.source, "system");
  assert.equal(current?.dailyUsageLimitUsd, 1);
  assert.deepEqual(current?.scopes, []);
});

test("JSON restore rejects reserved sources, existing system IDs and credential collisions", async () => {
  const key = await seedSystemKey();
  const { runJsonMigration } = await import("@/lib/db/jsonMigration");
  const { POST } = await import("@/app/api/settings/import-json/route");
  const cases = [
    { id: "reserved-source", name: "Forged", key: "synthetic-client-key", source: "system" },
    { id: key.id, name: "Overwrite", source: "manual" },
    { id: "duplicate-secret", name: "Duplicate", key: key.key, keyHash: "forged-hash" },
    {
      id: "duplicate-hash",
      name: "Duplicate",
      key: "another-client-key",
      keyHash: opaqueTokenFingerprint(key.key),
    },
  ];
  for (const apiKey of cases) {
    assert.throws(() => runJsonMigration(getDbInstance(), { apiKeys: [apiKey] }), /system/i);
  }
  assert.equal(
    (await POST(await operator("/api/settings/import-json", "POST", { apiKeys: [cases[1]] })))
      .status,
    400
  );
  assert.equal((await keys.getApiKeyById(key.id))?.name, key.name);
});

test("individual key import cannot claim an existing system ID", async () => {
  const key = await seedSystemKey();
  const { importApiKey, ApiKeyImportConflictError } = await import("@/lib/db/apiKeyImport");
  assert.throws(
    () => importApiKey({ id: key.id, name: key.name, key: key.key }, "system-key-test"),
    ApiKeyImportConflictError
  );
});

test("CLI and eval selectors exclude system keys", async () => {
  const key = await seedSystemKey();
  const ordinary = await keys.createApiKey("Presentable inference", "system-key-test");
  const cli = await import("@/app/api/cli-tools/keys/route");
  const evals = await import("@/app/api/evals/route");
  for (const [handler, path, field] of [
    [cli.GET, "/api/cli-tools/keys", "keys"],
    [evals.GET, "/api/evals", "apiKeys"],
  ] as const) {
    const response = await handler(await operator(path));
    assert.equal(response.status, 200);
    const body = await response.json();
    const ids = body[field].map(({ id }: { id: string }) => id);
    assert.ok(ids.includes(ordinary.id));
    assert.equal(ids.includes(key.id), false, path);
    assertRedacted(body[field].find(({ id }: { id: string }) => id === key.id) ?? {}, key.key);
  }
});

test("settings export and config sync omit system key rows and credentials", async () => {
  const key = await seedSystemKey();
  const ordinary = await keys.createApiKey("Exportable", "system-key-test");
  const { GET } = await import("@/app/api/settings/export-json/route");
  const { buildConfigSyncBundle } = await import("@/lib/sync/bundle");
  const response = await GET(await operator("/api/settings/export-json"));
  assert.equal(response.status, 200);
  for (const rows of [(await response.json()).apiKeys, (await buildConfigSyncBundle()).apiKeys]) {
    const ids = rows.map(({ id }: { id: string }) => id);
    assert.ok(ids.includes(ordinary.id));
    assert.equal(ids.includes(key.id), false);
  }
});

test("external system credentials are refused in all header forms and cache modes", async () => {
  const key = await seedSystemKey();
  const { NextRequest } = await import("next/server");
  const { runAuthzPipeline } = await import("@/server/authz/pipeline");
  const { enforceClientApiRouteAuth } = await import("@/shared/utils/clientApiRouteAuth");
  const { enforceApiKeyPolicy } = await import("@/shared/utils/apiKeyPolicy");
  const internal = await runWithRequiredApiKey(
    { apiKeyId: key.id, resolve: keys.resolveSystemApiKey },
    async () => (await resolveRequiredApiKey())?.apiKeyInfo.id
  ).catch(() => undefined);
  const auth = [];
  for (const bypassCache of [false, false, true]) {
    auth.push(await keys.validateApiKey(key.key, { bypassCache }));
    auth.push(Boolean(await keys.getApiKeyMetadata(key.key, { bypassCache })));
  }
  const statuses = [];
  try {
    for (const headers of [
      new Headers({ authorization: "Bearer " + key.key }),
      new Headers({ "x-api-key": key.key }),
      new Headers({ "x-goog-api-key": key.key }),
    ]) {
      for (const requireKey of ["false", "true"]) {
        process.env.REQUIRE_API_KEY = requireKey;
        const req = new Request(origin + "/api/v1/chat/completions", { method: "POST", headers });
        for (const enforce of [true, false]) {
          statuses.push((await runAuthzPipeline(new NextRequest(req), { enforce })).status);
        }
        statuses.push((await enforceClientApiRouteAuth(req))?.status);
        statuses.push((await enforceApiKeyPolicy(req, model)).rejection?.status);
      }
    }
  } finally {
    process.env.REQUIRE_API_KEY = "false";
  }
  assert.deepEqual(auth, Array(6).fill(false));
  assert.deepEqual(statuses, Array(24).fill(401));
  assert.equal(internal, key.id);
});

test("bound system key enforces current model policy and attributes native chat usage", async (t) => {
  const key = await seedSystemKey();
  const { createProviderConnection } = await import("@/lib/db/providers");
  const { POST } = await import("@/app/api/v1/chat/completions/route");
  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Synthetic upstream",
    apiKey: "synthetic-upstream-key",
    isActive: true,
  });
  const upstream = t.mock.fn(() =>
    Response.json({
      id: "chatcmpl-system-key",
      object: "chat.completion",
      model: "gpt-4.1",
      choices: [{ index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
    })
  );
  const fetchMock = t.mock.method(
    globalThis,
    "fetch",
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input instanceof Request ? input.url : String(input);
      const method = init?.method ?? (input instanceof Request ? input.method : "GET");
      if (url === "https://api.openai.com/v1/chat/completions" && method === "POST") {
        return upstream();
      }
      return new Response(null, { status: 404 });
    }
  );
  const binding = { apiKeyId: key.id, resolve: keys.resolveSystemApiKey };
  const send = (content: string) =>
    runWithRequiredApiKey(
      binding,
      () =>
        POST(
          new Request(origin + "/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "x-correlation-id": `system-key-${content}`,
            },
            body: JSON.stringify({ model, messages: [{ role: "user", content }], stream: false }),
          })
        ),
      { nativeTransport: true }
    );

  await keys.updateApiKeyPermissions(key.id, { blockedModels: [model] });
  const denied = await send("blocked");
  assert.equal(denied.status, 403);
  assert.match(await denied.text(), /model.*not allowed/i);
  assert.equal(fetchMock.mock.callCount(), 0);

  await keys.updateApiKeyPermissions(key.id, { blockedModels: [], allowedModels: [model] });
  const allowed = await send("allowed");
  assert.equal(allowed.status, 200);
  await allowed.text();
  assert.equal(upstream.mock.callCount(), 1);
  assert.equal(await waitForCallLogSaves(10_000), true);
  const logs = await getCallLogs({ correlationId: "system-key-allowed" });
  const requests = logs.filter((entry) => entry.requestType !== "upstream_http_attempt");
  assert.equal(requests.length, 1);
  assert.equal(requests[0].apiKeyId, key.id);
  assert.equal(requests[0].status, 200);
});
