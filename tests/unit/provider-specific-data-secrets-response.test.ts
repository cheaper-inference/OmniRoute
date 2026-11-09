// The providers API masks the primary `apiKey` of every connection, but
// `providerSpecificData` carries credentials of its own: the rotation pool in
// `extraApiKeys[]` (full upstream tokens) plus provider cookies / short-lived tokens
// written by refresh flows. The response sanitizer must treat them like `apiKey`:
//   - `extraApiKeys` entries come back masked with the same mask as `apiKey`
//     (revealed in full only when the operator enabled key reveal);
//   - every other credential-bearing field is stripped from the response;
//   - a PUT that echoes the masked list back (what the edit modal does) must keep
//     the stored tokens, never persist the placeholder, and still allow adding /
//     removing keys;
//   - non-secret providerSpecificData (tags, model lists, flags) is untouched.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-psd-secrets-response-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = "test-jwt-secret-psd-secrets-response";
process.env.INITIAL_PASSWORD = "admin-secret";
delete process.env.ALLOW_API_KEY_REVEAL;

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection, getProviderConnectionById } =
  await import("../../src/lib/db/providers.ts");
const { maskStoredApiKey } = await import("../../src/lib/apiKeyExposure.ts");
const { sanitizeProviderSpecificDataForResponse } =
  await import("../../src/lib/providers/requestDefaults.ts");
const listRoute = await import("../../src/app/api/providers/route.ts");
const byIdRoute = await import("../../src/app/api/providers/[id]/route.ts");

const PRIMARY_KEY = "sk-primary-0123456789abcdefghij";
const EXTRA_ONE = "sk-extra-one-0123456789abcdefgh";
const EXTRA_TWO = "sk-extra-two-0123456789abcdefgh";
const EXTRA_NEW = "sk-extra-new-0123456789abcdefgh";
const COPILOT_TOKEN = "ghu_copilotbearer_0123456789abcdef";
const SESSION_COOKIE = "__Secure-next-auth.session-token=eyJ.secret.cookie";
const CLIENT_SECRET = "kiro-client-secret-0123456789";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createKeyedConnection(extra: Record<string, unknown> = {}) {
  const suffix = Math.random().toString(16).slice(2);
  const created = (await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: `pool-${suffix}`,
    // Unique per connection: the apikey create path dedups by key value (#3023).
    apiKey: `${PRIMARY_KEY}-${suffix}`,
    isActive: true,
    providerSpecificData: {
      extraApiKeys: [EXTRA_ONE, EXTRA_TWO],
      tags: ["pool"],
      ...extra,
    },
  })) as Record<string, unknown>;
  assert.ok(typeof created.id === "string" && created.id.length > 0);
  assert.equal(created.apiKey, `${PRIMARY_KEY}-${suffix}`);
  return created as Record<string, unknown> & { id: string; apiKey: string };
}

async function getList(): Promise<Array<Record<string, unknown>>> {
  const response = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/providers?provider=openai")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { connections: Array<Record<string, unknown>> };
  return body.connections;
}

async function getDetail(id: string): Promise<Record<string, unknown>> {
  const response = await byIdRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/providers/${id}`),
    { params: Promise.resolve({ id }) }
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { connection: Record<string, unknown> };
  return body.connection;
}

async function putConnection(id: string, payload: Record<string, unknown>) {
  const response = await byIdRoute.PUT(
    await makeManagementSessionRequest(`http://localhost/api/providers/${id}`, {
      method: "PUT",
      body: payload,
    }),
    { params: Promise.resolve({ id }) }
  );
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(response.status, 200, `PUT failed: ${JSON.stringify(body)}`);
  return body.connection as Record<string, unknown>;
}

function psdOf(connection: Record<string, unknown>): Record<string, unknown> {
  const psd = connection.providerSpecificData;
  assert.ok(psd && typeof psd === "object", "providerSpecificData must be present");
  return psd as Record<string, unknown>;
}

test("GET /api/providers masks every extraApiKeys entry with the apiKey mask", async () => {
  const created = await createKeyedConnection();
  const connections = await getList();
  const listed = connections.find((c) => c.id === created.id);
  assert.ok(listed, "created connection must be listed");

  const serialized = JSON.stringify(listed);
  assert.ok(!serialized.includes(EXTRA_ONE), "list response must not carry the first extra key");
  assert.ok(!serialized.includes(EXTRA_TWO), "list response must not carry the second extra key");
  assert.equal(listed.apiKey, maskStoredApiKey(created.apiKey), "control: apiKey masked as before");
  assert.deepEqual(psdOf(listed).extraApiKeys, [
    maskStoredApiKey(EXTRA_ONE),
    maskStoredApiKey(EXTRA_TWO),
  ]);
  assert.deepEqual(psdOf(listed).tags, ["pool"], "non-secret providerSpecificData is intact");
});

test("GET /api/providers/[id] masks extraApiKeys the same way", async () => {
  const created = await createKeyedConnection();
  const detail = await getDetail(created.id);
  const serialized = JSON.stringify(detail);
  assert.ok(!serialized.includes(EXTRA_ONE));
  assert.ok(!serialized.includes(EXTRA_TWO));
  assert.deepEqual(psdOf(detail).extraApiKeys, [
    maskStoredApiKey(EXTRA_ONE),
    maskStoredApiKey(EXTRA_TWO),
  ]);
});

test("credential-bearing providerSpecificData fields are stripped from list and detail", async () => {
  const created = await createKeyedConnection({
    copilotToken: COPILOT_TOKEN,
    cookie: SESSION_COOKIE,
    clientSecret: CLIENT_SECRET,
    region: "us-east-1",
  });

  const listed = (await getList()).find((c) => c.id === created.id);
  assert.ok(listed);
  const detail = await getDetail(created.id);

  for (const [label, connection] of [
    ["list", listed],
    ["detail", detail],
  ] as const) {
    const serialized = JSON.stringify(connection);
    for (const secret of [COPILOT_TOKEN, SESSION_COOKIE, CLIENT_SECRET]) {
      assert.ok(!serialized.includes(secret), `${label} response leaks ${secret.slice(0, 12)}…`);
    }
    const psd = psdOf(connection);
    assert.equal(psd.copilotToken, undefined, `${label}: copilotToken must be stripped`);
    assert.equal(psd.cookie, undefined, `${label}: cookie must be stripped`);
    assert.equal(psd.clientSecret, undefined, `${label}: clientSecret must be stripped`);
    assert.equal(psd.region, "us-east-1", `${label}: non-secret region is kept`);
  }

  // The stored row still has the real values — stripping is response-only.
  const stored = (await getProviderConnectionById(created.id)) as Record<string, unknown>;
  assert.equal(psdOf(stored).copilotToken, COPILOT_TOKEN);
  assert.equal(psdOf(stored).cookie, SESSION_COOKIE);
});

test("PUT echoing the masked extraApiKeys list leaves the stored tokens unchanged", async () => {
  const created = await createKeyedConnection();
  const detail = await getDetail(created.id);
  const echoedPsd = psdOf(detail);
  assert.ok(
    Array.isArray(echoedPsd.extraApiKeys) &&
      echoedPsd.extraApiKeys.every((entry: unknown) => String(entry).includes("****")),
    "precondition: the detail response hands the client masked placeholders"
  );

  // Exactly what EditConnectionModal does on save: spread the response's
  // providerSpecificData and send the list it was given.
  const updated = await putConnection(created.id, {
    name: "renamed",
    providerSpecificData: { ...echoedPsd },
  });
  assert.equal(updated.name, "renamed");

  const stored = (await getProviderConnectionById(created.id)) as Record<string, unknown>;
  assert.deepEqual(
    psdOf(stored).extraApiKeys,
    [EXTRA_ONE, EXTRA_TWO],
    "masked placeholders must never replace the stored tokens"
  );
  assert.equal(stored.apiKey, created.apiKey, "control: primary key untouched");
});

test("PUT with masked + new + removed entries keeps the matching stored tokens", async () => {
  const created = await createKeyedConnection();
  const echoedPsd = psdOf(await getDetail(created.id));
  const masked = echoedPsd.extraApiKeys as string[];

  // Operator removed the second key and added a new one; the first comes back masked.
  await putConnection(created.id, {
    providerSpecificData: { ...echoedPsd, extraApiKeys: [masked[0], EXTRA_NEW] },
  });

  const stored = (await getProviderConnectionById(created.id)) as Record<string, unknown>;
  assert.deepEqual(psdOf(stored).extraApiKeys, [EXTRA_ONE, EXTRA_NEW]);
});

test("PUT never persists a masked placeholder that matches no stored key", async () => {
  const created = await createKeyedConnection();
  const echoedPsd = psdOf(await getDetail(created.id));

  await putConnection(created.id, {
    providerSpecificData: { ...echoedPsd, extraApiKeys: ["sk-unkn****zzzz", EXTRA_NEW] },
  });

  const stored = (await getProviderConnectionById(created.id)) as Record<string, unknown>;
  const extras = psdOf(stored).extraApiKeys as string[];
  assert.deepEqual(extras, [EXTRA_NEW]);
  assert.ok(
    extras.every((k) => !k.includes("****")),
    "no placeholder reached the database"
  );
});

test("PUT response masks extraApiKeys too", async () => {
  const created = await createKeyedConnection();
  const updated = await putConnection(created.id, { name: "renamed-again" });
  const serialized = JSON.stringify(updated);
  assert.ok(!serialized.includes(EXTRA_ONE));
  assert.ok(!serialized.includes(EXTRA_TWO));
});

test("sanitizer reveals extraApiKeys in full only when asked, mirroring apiKey reveal", () => {
  const psd = { extraApiKeys: [EXTRA_ONE, EXTRA_TWO], copilotToken: COPILOT_TOKEN, tags: ["x"] };
  const masked = sanitizeProviderSpecificDataForResponse(psd) as Record<string, unknown>;
  assert.deepEqual(masked.extraApiKeys, [maskStoredApiKey(EXTRA_ONE), maskStoredApiKey(EXTRA_TWO)]);
  assert.equal(masked.copilotToken, undefined);

  const revealed = sanitizeProviderSpecificDataForResponse(psd, { revealKeys: true }) as Record<
    string,
    unknown
  >;
  assert.deepEqual(revealed.extraApiKeys, [EXTRA_ONE, EXTRA_TWO]);
  assert.equal(revealed.copilotToken, undefined, "reveal only widens the apiKey-class fields");
  assert.deepEqual(revealed.tags, ["x"]);
});
