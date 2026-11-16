import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";
import { SignJWT, exportJWK, generateKeyPair, type CryptoKey } from "jose";

const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "oidc-files-batches-scope-"));
process.env.DATA_DIR = testDir;
process.env.API_KEY_SECRET = "oidc-files-batches-test-secret";
process.env.STORAGE_ENCRYPTION_KEY = "synthetic-oidc-files-batches-shadow-key-0001";

const issuer = "https://auth.example.com/realms/scope-test";
const audience = "omniroute-scope-test";
const jwksUri = `${issuer}/certs`;
let signingKey: CryptoKey;
let jwk: Record<string, unknown>;
let groupId: string;
const originalFetch = globalThis.fetch;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { createKeyGroup, removeKeyFromGroup } = await import("../../src/lib/db/apiKeyGroups.ts");
const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
const { createFile } = await import("../../src/lib/db/files.ts");
const { getSsoIdentity } = await import("../../src/lib/db/ssoIdentities.ts");
const { AUTHZ_HEADER_AUTH_KIND, AUTHZ_HEADER_AUTH_ID } =
  await import("../../src/server/authz/headers.ts");
const { getApiKeyRequestScope, resolveListScope, canAccessOwnedRecord, resolveEffectiveApiKeyId } =
  await import("../../src/app/api/v1/_helpers/apiKeyScope.ts");
const files = await import("../../src/app/api/v1/files/route.ts");
const batches = await import("../../src/app/api/v1/batches/route.ts");

async function token(sub: string, audienceOverride = audience): Promise<string> {
  return new SignJWT({ realm_access: { roles: ["scope-reader"] } })
    .setProtectedHeader({ alg: "RS256", kid: "scope-key" })
    .setIssuer(issuer)
    .setAudience(audienceOverride)
    .setSubject(sub)
    .setExpirationTime("5m")
    .sign(signingKey);
}

function request(route: string, bearer?: string, headers: Record<string, string> = {}): Request {
  return new Request(`http://localhost/api/v1/${route}`, {
    headers: { ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}), ...headers },
  });
}

before(async () => {
  const pair = await generateKeyPair("RS256", { extractable: true });
  signingKey = pair.privateKey;
  jwk = { ...(await exportJWK(pair.publicKey)), kid: "scope-key", alg: "RS256", use: "sig" };
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (url === `${issuer}/.well-known/openid-configuration`) {
      return new Response(JSON.stringify({ issuer, jwks_uri: jwksUri }), { status: 200 });
    }
    if (url === jwksUri) {
      return new Response(JSON.stringify({ keys: [jwk] }), { status: 200 });
    }
    throw new Error(`Unexpected request: ${url}`);
  }) as typeof fetch;
  const group = createKeyGroup("Scope reader", "Scope test group");
  groupId = group.id;
  await updateSettings({
    entraSsoEnabled: false,
    oidcInferenceEnabled: true,
    oidcInferenceIssuer: issuer,
    oidcInferenceAudience: audience,
    oidcInferenceRoleMappings: [{ role: "scope-reader", keyGroupId: group.id }],
    oidcInferenceDefaultKeyGroupId: null,
  });
  invalidateDbCache("settings");
});

after(() => {
  globalThis.fetch = originalFetch;
  resetDbInstance();
  fs.rmSync(testDir, { recursive: true, force: true });
});

describe("OIDC files and batches ownership", () => {
  it("binds a verified bearer to its shadow key on file/batch lists, with or without a proxy stamp", async () => {
    const jwt = await token("owner-a");
    const direct = await getApiKeyRequestScope(request("files", jwt));
    assert.equal(direct.rejection, null);
    assert.equal(direct.keyState, "valid");
    const oid = `oidc:${createHash("sha256").update(issuer).digest("hex").slice(0, 16)}:owner-a`;
    assert.equal(direct.apiKeyId, getSsoIdentity(oid)?.apiKeyId);
    assert.ok(direct.apiKeyId);
    assert.notEqual(direct.apiKey, jwt);
    assert.deepEqual(resolveListScope(direct), { mode: "api_key", apiKeyId: direct.apiKeyId });
    assert.equal(resolveEffectiveApiKeyId(direct, null), direct.apiKeyId);
    assert.equal(canAccessOwnedRecord(direct, direct.apiKeyId), true);
    assert.equal(canAccessOwnedRecord(direct, "foreign-key"), false);

    const stamped = await getApiKeyRequestScope(
      request("batches", jwt, {
        [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
        [AUTHZ_HEADER_AUTH_ID]: oid,
      })
    );
    assert.equal(stamped.rejection, null);
    assert.equal(stamped.apiKeyId, direct.apiKeyId);
    assert.deepEqual(resolveListScope(stamped), { mode: "api_key", apiKeyId: direct.apiKeyId });

    createFile({
      bytes: 1,
      filename: "mine",
      purpose: "batch",
      content: Buffer.from("a"),
      mimeType: "text/plain",
      apiKeyId: direct.apiKeyId,
    });
    createFile({
      bytes: 1,
      filename: "foreign",
      purpose: "batch",
      content: Buffer.from("b"),
      mimeType: "text/plain",
      apiKeyId: "foreign-key",
    });
    const listed = await files.GET(request("files", jwt));
    assert.equal(listed.status, 200);
    assert.equal((await listed.json()).total_count, 1);
    const batchList = await batches.GET(request("batches", jwt));
    assert.equal(batchList.status, 200);
  });

  it("rejects forged SSO stamps and a wrong-audience JWT without falling back to anonymous", async () => {
    const jwt = await token("owner-b");
    const oid = `oidc:${createHash("sha256").update(issuer).digest("hex").slice(0, 16)}:owner-b`;
    const forged = await getApiKeyRequestScope(
      request("files", undefined, {
        [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
        [AUTHZ_HEADER_AUTH_ID]: oid,
      })
    );
    assert.equal(forged.rejection?.status, 401);
    const wrongIdentity = await getApiKeyRequestScope(
      request("batches", jwt, {
        [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
        [AUTHZ_HEADER_AUTH_ID]: `${oid}-someone-else`,
      })
    );
    assert.equal(wrongIdentity.rejection?.status, 401);
    const wrongAudience = await getApiKeyRequestScope(
      request("files", await token("owner-b", "wrong"))
    );
    assert.equal(wrongAudience.rejection?.status, 401);
  });

  it("rejects a bearer after its OIDC shadow-key binding changes", async () => {
    const jwt = await token("removed-role");
    const scope = await getApiKeyRequestScope(request("files", jwt));
    assert.ok(scope.apiKeyId);
    assert.equal(removeKeyFromGroup(scope.apiKeyId, groupId), true);
    const afterRemoval = await getApiKeyRequestScope(request("files", jwt));
    assert.equal(afterRemoval.apiKeyId, null);
    assert.equal(afterRemoval.rejection?.status, 403);
  });

  it("uses the validated x-api-key owner when a foreign JWT is also present", async () => {
    const key = await createApiKey("mixed-scope", "machine-mixed-scope", []);
    const foreign = await new SignJWT({ realm_access: { roles: ["scope-reader"] } })
      .setProtectedHeader({ alg: "RS256", kid: "scope-key" })
      .setIssuer("https://foreign.example.com/realms/other")
      .setAudience(audience)
      .setSubject("foreign-owner")
      .setExpirationTime("5m")
      .sign(signingKey);
    for (const route of ["files", "batches"]) {
      const scope = await getApiKeyRequestScope(request(route, foreign, { "x-api-key": key.key }));
      assert.equal(scope.rejection, null);
      assert.equal(scope.apiKeyId, key.id);
      assert.equal(scope.keyState, "valid");
      assert.equal(canAccessOwnedRecord(scope, key.id), true);
      assert.equal(canAccessOwnedRecord(scope, "foreign-key"), false);
    }
  });

  it("keeps static keys and keyless requests on their existing paths", async () => {
    const key = await createApiKey("static-scope", "machine-static-scope", []);
    const staticScope = await getApiKeyRequestScope(request("files", key.key));
    assert.equal(staticScope.apiKeyId, key.id);
    assert.equal(staticScope.keyState, "valid");
    const keyless = await getApiKeyRequestScope(request("files"));
    assert.equal(keyless.apiKeyId, null);
    assert.equal(keyless.keyState, "none");
    assert.equal(keyless.rejection, null);
  });
});
