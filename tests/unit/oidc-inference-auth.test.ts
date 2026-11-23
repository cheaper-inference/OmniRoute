/**
 * Generic OIDC inference auth on the client API (/v1/*).
 *
 * Covers token verification against a standards-compliant issuer (Keycloak
 * shape: realm_access.roles / resource_access), role → key-group mapping,
 * just-in-time shadow-key provisioning, and fail-closed behavior.
 *
 * No network: a locally generated RSA key pair signs the tokens and a stubbed
 * global `fetch` serves discovery + JWKS. Self-isolating DATA_DIR like the
 * Entra suite.
 */
import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT, exportJWK, generateKeyPair, type CryptoKey } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "oidc-inference-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "synthetic-oidc-inference-shadow-key-0001";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "oidc-inference-test-secret";

const ISSUER = "https://auth.example.com/realms/main";
const DISCOVERY_URL = `${ISSUER}/.well-known/openid-configuration`;
const JWKS_URI = "https://auth.example.com/realms/main/protocol/openid-connect/certs";
const AUDIENCE = "omniroute-inference";
const KID = "test-signing-key";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const {
  createKeyGroup,
  addKeyToGroup,
  removeKeyFromGroup,
  deleteKeyGroup,
  addGroupPermission,
  checkKeyModelAccess,
  getKeyGroupsForApiKey,
} = await import("../../src/lib/db/apiKeyGroups.ts");
const { getSsoIdentity, getSsoShadowSecret, hasOidcGroupBinding } =
  await import("../../src/lib/db/ssoIdentities.ts");
const { comboTargetPassesKeyModelPolicy } =
  await import("../../src/sse/handlers/chat/comboTargetKeyPolicy.ts");
const { createComboTargetKeyGate } = await import("../../src/sse/services/keyConnectionScope.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");
const { createApiKey, getApiKeyMetadata, isModelAllowedForKey, updateApiKeyPermissions } =
  await import("../../src/lib/db/apiKeys.ts");
const {
  evaluateOidcInferenceAuth,
  resetOidcInferenceResolutionCache,
  looksLikeOidcJwt,
  oidcInferenceIdentityKey,
} = await import("../../src/server/authz/oidcInference/evaluate.ts");
const { resetOidcDiscoveryCache, parseOidcInferenceSettings } =
  await import("../../src/server/authz/oidcInference/config.ts");
const { extractOidcRoles } = await import("../../src/server/authz/oidcInference/verifyToken.ts");
const { looksLikeEntraJwt } = await import("../../src/server/authz/entra/verifyToken.ts");
const { clientApiPolicy } = await import("../../src/server/authz/policies/clientApi.ts");
const { enforceClientApiRouteAuth } = await import("../../src/shared/utils/clientApiRouteAuth.ts");
const { AUTHZ_HEADER_AUTH_KIND, AUTHZ_HEADER_AUTH_ID } =
  await import("../../src/server/authz/headers.ts");
const { setSsoKeyActive } = await import("../../src/lib/db/ssoIdentities.ts");
const { POST: embeddingsPOST } = await import("../../src/app/api/v1/embeddings/route.ts");
const { POST: webFetchPOST } = await import("../../src/app/api/v1/web/fetch/route.ts");
const { POST: webMapPOST } = await import("../../src/app/api/v1/web/map/route.ts");
const { POST: inputTokensPOST } =
  await import("../../src/app/api/v1/responses/input_tokens/route.ts");
const { getUnifiedModelsResponse } = await import("../../src/app/api/v1/models/catalog.ts");

let signingKey: CryptoKey;
let jwksKeys: Record<string, unknown>[];

const realFetch = globalThis.fetch;

function installFetchStub(): void {
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (url === DISCOVERY_URL) {
      return new Response(
        JSON.stringify({
          issuer: ISSUER,
          authorization_endpoint: `${ISSUER}/protocol/openid-connect/auth`,
          token_endpoint: `${ISSUER}/protocol/openid-connect/token`,
          jwks_uri: JWKS_URI,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (url === JWKS_URI) {
      return new Response(JSON.stringify({ keys: jwksKeys }), {
        status: 200,
        headers: { "Content-Type": "application/json" } as Record<string, string>,
      });
    }
    throw new Error(`Unexpected fetch in test: ${url}`);
  }) as typeof fetch;
}

interface TokenOverrides {
  audience?: string;
  issuer?: string;
  sub?: string;
  realmRoles?: string[];
  clientRoles?: Record<string, string[]>;
  expiresAt?: number;
  omitExpiry?: boolean;
  signWithWrongKey?: boolean;
  alg?: string;
  username?: string;
}

let wrongKey: CryptoKey;

async function mintToken(overrides: TokenOverrides = {}): Promise<string> {
  const payload: Record<string, unknown> = {
    iss: overrides.issuer ?? ISSUER,
    aud: overrides.audience ?? AUDIENCE,
    sub: overrides.sub ?? "user-123",
    preferred_username: overrides.username ?? "alice",
    iat: Math.floor(Date.now() / 1000),
  };
  if (!overrides.omitExpiry)
    payload.exp = overrides.expiresAt ?? Math.floor(Date.now() / 1000) + 300;
  if (overrides.realmRoles) payload.realm_access = { roles: overrides.realmRoles };
  if (overrides.clientRoles) payload.resource_access = overrides.clientRoles;

  const key = overrides.signWithWrongKey ? wrongKey : signingKey;
  const kid = overrides.signWithWrongKey ? "wrong-key" : KID;
  return new SignJWT(payload).setProtectedHeader({ alg: "RS256", kid, typ: "JWT" }).sign(key);
}

async function enableSso(overrides: Record<string, unknown> = {}): Promise<void> {
  await updateSettings({
    oidcInferenceEnabled: true,
    oidcInferenceIssuer: ISSUER,
    oidcInferenceAudience: AUDIENCE,
    oidcInferenceRoleMappings: [
      { role: "omniroute", keyGroupId: baseKeyGroupId },
      { role: "omniroute-plus", keyGroupId: plusKeyGroupId },
    ],
    oidcInferenceDefaultKeyGroupId: null,
    ...overrides,
  });
  invalidateDbCache("settings");
}

let baseKeyGroupId: string;
let plusKeyGroupId: string;

before(async () => {
  const pair = await generateKeyPair("RS256", { extractable: true });
  signingKey = pair.privateKey;
  const wrongPair = await generateKeyPair("RS256", { extractable: true });
  wrongKey = wrongPair.privateKey;
  const publicJwk = await exportJWK(pair.publicKey);
  jwksKeys = [{ ...publicJwk, kid: KID, alg: "RS256", use: "sig" }];
  installFetchStub();

  baseKeyGroupId = createKeyGroup("OIDC base", "role omniroute").id;
  plusKeyGroupId = createKeyGroup("OIDC plus", "role omniroute-plus").id;

  await enableSso();
});

beforeEach(() => {
  resetOidcInferenceResolutionCache();
  resetOidcDiscoveryCache();
});

after(() => {
  globalThis.fetch = realFetch;
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

describe("looksLikeOidcJwt — the coexist pre-filter", () => {
  it("rejects an OmniRoute API key", () => {
    assert.equal(looksLikeOidcJwt("sk-1234567890abcdef-abc123-deadbeef"), false);
  });

  it("rejects HS256 tokens and non-JWT strings", () => {
    assert.equal(looksLikeOidcJwt("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4In0.c2ln"), false);
    assert.equal(looksLikeOidcJwt("garbage"), false);
    assert.equal(looksLikeOidcJwt("a.b.c"), false);
  });

  it("accepts an RS256 JWT with a kid", async () => {
    assert.equal(looksLikeOidcJwt(await mintToken()), true);
  });
});

describe("extractOidcRoles", () => {
  it("unions realm_access.roles and every resource_access client's roles", () => {
    const roles = extractOidcRoles({
      realm_access: { roles: ["omniroute", "default-roles-main"] },
      resource_access: {
        "claude-desktop": { roles: ["omniroute-plus"] },
        account: { roles: ["manage-account"] },
      },
    });
    assert.deepEqual(
      new Set(roles),
      new Set(["omniroute", "default-roles-main", "omniroute-plus", "manage-account"])
    );
  });

  it("returns empty for tokens without role claims", () => {
    assert.deepEqual(extractOidcRoles({ sub: "x" }), []);
  });
});

describe("config parsing", () => {
  it("parses role mappings, dropping malformed entries", () => {
    const config = parseOidcInferenceSettings({
      oidcInferenceEnabled: true,
      oidcInferenceIssuer: " https://auth.example.com/realms/main ",
      oidcInferenceAudience: "omniroute-inference",
      oidcInferenceRoleMappings: [
        { role: "omniroute", keyGroupId: "g1" },
        { role: "", keyGroupId: "g2" },
        "nonsense",
      ],
      oidcInferenceDefaultKeyGroupId: "",
    });
    assert.equal(config.enabled, true);
    assert.equal(config.issuer, "https://auth.example.com/realms/main");
    assert.deepEqual(config.roleMappings, [{ role: "omniroute", keyGroupId: "g1" }]);
    assert.equal(config.defaultKeyGroupId, null);
  });
});

describe("client API policy — Keycloak RS256 bearer", () => {
  it("routes a Keycloak token to OIDC even when Entra is also enabled", async () => {
    await enableSso();
    await updateSettings({
      entraSsoEnabled: true,
      entraTenantId: "00000000-0000-4000-8000-000000000001",
      entraApiAudience: "api://other-gateway",
    });
    invalidateDbCache("settings");
    const token = await mintToken({ sub: "both-providers", realmRoles: ["omniroute"] });
    assert.equal(looksLikeEntraJwt(token), true);
    const outcome = await clientApiPolicy.evaluate({
      request: new Request("http://localhost/api/v1/models", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      classification: {
        routeClass: "CLIENT_API",
        reason: "client_api_v1",
        normalizedPath: "/api/v1/models",
      },
      requestId: "both-sso-providers",
    });
    assert.equal(outcome.allow, true, JSON.stringify(outcome));
    if (outcome.allow)
      assert.equal(outcome.subject.id, oidcInferenceIdentityKey(ISSUER, "both-providers"));
  });

  it("does not stamp a Unicode display name into HTTP headers", async () => {
    await enableSso();
    const token = await mintToken({
      sub: "unicode-label",
      username: "测试用户",
      realmRoles: ["omniroute"],
    });
    const outcome = await clientApiPolicy.evaluate({
      request: new Request("http://localhost/api/v1/messages", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      classification: {
        routeClass: "CLIENT_API",
        reason: "client_api_v1",
        normalizedPath: "/api/v1/messages",
      },
      requestId: "unicode-label",
    });
    assert.equal(outcome.allow, true, JSON.stringify(outcome));
    if (outcome.allow) {
      assert.equal(outcome.subject.kind, "sso_user");
      assert.equal(outcome.subject.label, undefined);
    }
  });

  it("rejects a forged SSO stamp even when REQUIRE_API_KEY is disabled", async () => {
    const previous = process.env.REQUIRE_API_KEY;
    process.env.REQUIRE_API_KEY = "false";
    try {
      const forged = new Request("http://localhost/v1/messages", {
        method: "POST",
        headers: {
          [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
          [AUTHZ_HEADER_AUTH_ID]: oidcInferenceIdentityKey(ISSUER, "both-providers"),
        },
      });
      assert.equal((await enforceClientApiRouteAuth(forged))?.status, 401);
    } finally {
      if (previous === undefined) delete process.env.REQUIRE_API_KEY;
      else process.env.REQUIRE_API_KEY = previous;
    }
  });

  it("routes a Keycloak-shaped RS256 JWT to OIDC when Entra is disabled", async () => {
    await updateSettings({ entraSsoEnabled: false });
    invalidateDbCache("settings");
    const token = await mintToken({ sub: "policy-user", realmRoles: ["omniroute"] });
    // Both prefilters match RS256 + kid. The Entra match must not block OIDC
    // when the Entra integration is disabled (the default on Keycloak installs).
    assert.equal(looksLikeEntraJwt(token), true);
    assert.equal(looksLikeOidcJwt(token), true);
    const outcome = await clientApiPolicy.evaluate({
      request: new Request("http://localhost/api/v1/models", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      classification: {
        routeClass: "CLIENT_API",
        reason: "client_api_v1",
        normalizedPath: "/api/v1/models",
      },
      requestId: "oidc-policy-regression",
    });
    assert.equal(outcome.allow, true, JSON.stringify(outcome));
    if (!outcome.allow) return;
    assert.equal(outcome.subject.kind, "sso_user");
    const handlerRequest = new Request("http://localhost/v1/messages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        [AUTHZ_HEADER_AUTH_KIND]: outcome.subject.kind,
        [AUTHZ_HEADER_AUTH_ID]: outcome.subject.id,
      },
    });
    assert.equal(await enforceClientApiRouteAuth(handlerRequest), null);
    const forged = new Request("http://localhost/v1/messages", {
      method: "POST",
      headers: {
        [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
        [AUTHZ_HEADER_AUTH_ID]: outcome.subject.id,
      },
    });
    assert.equal((await enforceClientApiRouteAuth(forged))?.status, 401);
    const wrongSubject = new Request("http://localhost/v1/messages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
        [AUTHZ_HEADER_AUTH_ID]: "oidc:forged:someone-else",
      },
    });
    assert.equal((await enforceClientApiRouteAuth(wrongSubject))?.status, 401);
    const forgedWithValidKey = new Request("http://localhost/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": getSsoShadowSecret(outcome.subject.id)!,
        [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
        [AUTHZ_HEADER_AUTH_ID]: "oidc:forged:someone-else",
      },
    });
    assert.equal((await enforceClientApiRouteAuth(forgedWithValidKey))?.status, 401);

    // The route must not keep accepting a stamp after the shadow key is
    // deactivated between middleware and handler authorization.
    const identity = getSsoIdentity(outcome.subject.id);
    assert.ok(identity);
    assert.equal(setSsoKeyActive(identity.apiKeyId, false), true);
    const revoked = await enforceClientApiRouteAuth(handlerRequest);
    assert.equal(revoked?.status, 401);
    assert.equal((await revoked?.json()).error.type, "authentication_error");
  });
});

describe("client API policy — mixed issuer credentials", () => {
  it("accepts a valid x-api-key alongside an unrelated asymmetric JWT", async () => {
    await enableSso();
    const created = await createApiKey("mixed-issuer-test", "mixed-issuer-machine", []);
    const foreign = await mintToken({ issuer: "https://foreign.example/realms/other" });
    const outcome = await clientApiPolicy.evaluate({
      request: new Request("http://localhost/api/v1/models", {
        headers: { Authorization: `Bearer ${foreign}`, "x-api-key": created.key },
      }),
      classification: {
        routeClass: "CLIENT_API",
        reason: "client_api_v1",
        normalizedPath: "/api/v1/models",
      },
      requestId: "foreign-jwt-with-key",
    });
    assert.equal(outcome.allow, true, JSON.stringify(outcome));
    if (outcome.allow) assert.equal(outcome.subject.kind, "client_api_key");
  });

  it("does not fall back to a static key when the configured issuer's token is invalid", async () => {
    await enableSso();
    const created = await createApiKey("matching-issuer-test", "matching-issuer-machine", []);
    const invalid = await mintToken({ audience: "api://wrong-audience" });
    const outcome = await clientApiPolicy.evaluate({
      request: new Request("http://localhost/api/v1/models", {
        headers: { Authorization: `Bearer ${invalid}`, "x-api-key": created.key },
      }),
      classification: {
        routeClass: "CLIENT_API",
        reason: "client_api_v1",
        normalizedPath: "/api/v1/models",
      },
      requestId: "matching-jwt-with-key",
    });
    assert.equal(outcome.allow, false);
    if (!outcome.allow) assert.equal(outcome.status, 401);
  });
});

describe("OIDC inference — client API route boundaries", () => {
  const routes = [
    {
      name: "embeddings",
      path: "/v1/embeddings",
      body: { model: "nonexistent-embedding", input: "hello" },
      post: (request: Request) => embeddingsPOST(request, {}),
    },
    {
      name: "web fetch",
      path: "/v1/web/fetch",
      body: { url: "https://example.com", provider: "firecrawl" },
      post: webFetchPOST,
    },
    {
      name: "web map",
      path: "/v1/web/map",
      body: { url: "https://example.com" },
      post: webMapPOST,
    },
    {
      name: "input tokens",
      path: "/v1/responses/input_tokens",
      body: { model: "smart", input: "hello" },
      post: inputTokensPOST,
    },
  ];

  for (const route of routes) {
    it(`${route.name} accepts verified OIDC but rejects a forged SSO stamp`, async () => {
      await enableSso();
      const previous = process.env.REQUIRE_API_KEY;
      process.env.REQUIRE_API_KEY = "true";
      try {
        const token = await mintToken({ sub: `route-${route.name}`, realmRoles: ["omniroute"] });
        const verdict = await evaluateOidcInferenceAuth(token);
        assert.equal(verdict.ok, true);
        if (!verdict.ok) return;
        const headers = {
          "content-type": "application/json",
          [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
          [AUTHZ_HEADER_AUTH_ID]: verdict.oid,
        };
        const request = (authorization?: string) =>
          new Request(`http://localhost${route.path}`, {
            method: "POST",
            headers: { ...headers, ...(authorization ? { Authorization: authorization } : {}) },
            body: JSON.stringify(route.body),
          });
        assert.notEqual((await route.post(request(`Bearer ${token}`))).status, 401);
        assert.equal((await route.post(request())).status, 401);
      } finally {
        if (previous === undefined) delete process.env.REQUIRE_API_KEY;
        else process.env.REQUIRE_API_KEY = previous;
      }
    });
  }

  it("models catalog admits verified OIDC bearer without accepting a forged stamp", async () => {
    await enableSso();
    const token = await mintToken({ sub: "route-catalog", realmRoles: ["omniroute"] });
    const verdict = await evaluateOidcInferenceAuth(token);
    assert.equal(verdict.ok, true);
    if (!verdict.ok) return;
    const { updateSettings } = await import("../../src/lib/db/settings.ts");
    await updateSettings({ password: "catalog-auth-test", requireLogin: true });
    const identity = getSsoIdentity(verdict.oid);
    assert.ok(identity);
    addGroupPermission(baseKeyGroupId, "openai/*", "allow");
    await updateApiKeyPermissions(identity.apiKeyId, {
      modelAccessMode: "restricted",
      allowedModels: ["openai/*"],
    } as Parameters<typeof updateApiKeyPermissions>[1]);
    const headers = {
      [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
      [AUTHZ_HEADER_AUTH_ID]: verdict.oid,
    };
    const valid = await getUnifiedModelsResponse(
      new Request("http://test.example.com/v1/models", {
        headers: { ...headers, Authorization: `Bearer ${token}` },
      })
    );
    assert.equal(valid.status, 200);
    const listed = ((await valid.json()) as { data: Array<{ id: string }> }).data;
    const shadowSecret = getSsoShadowSecret(verdict.oid);
    assert.ok(shadowSecret);
    const shadowCatalog = await getUnifiedModelsResponse(
      new Request("http://test.example.com/v1/models", {
        headers: { Authorization: `Bearer ${shadowSecret}` },
      })
    );
    assert.equal(shadowCatalog.status, 200);
    const shadowRows = ((await shadowCatalog.json()) as { data: Array<{ id: string }> }).data;
    assert.deepEqual(
      listed.map((model) => model.id),
      shadowRows.map((model) => model.id),
      "OIDC catalog must inherit exactly the shadow key's catalog restrictions"
    );
    const forged = await getUnifiedModelsResponse(
      new Request("http://test.example.com/v1/models", { headers })
    );
    assert.equal(forged.status, 401);
    const wrongSubject = await getUnifiedModelsResponse(
      new Request("http://test.example.com/v1/models", {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
          [AUTHZ_HEADER_AUTH_ID]: "oidc:forged:other-user",
        },
      })
    );
    assert.equal(wrongSubject.status, 401);
  });
});

describe("evaluateOidcInferenceAuth — happy path", () => {
  it("provisions a shadow key in the mapped group for a realm role", async () => {
    const verdict = await evaluateOidcInferenceAuth(await mintToken({ realmRoles: ["omniroute"] }));
    assert.equal(verdict.ok, true);
    if (!verdict.ok) return;
    const identity = getSsoIdentity(verdict.oid);
    assert.ok(identity, "sso identity row created");
    const groups = identity ? getKeyGroupsForApiKey(identity.apiKeyId).map((g) => g.id) : [];
    assert.equal(groups.includes(baseKeyGroupId), true);
    const secret = getSsoShadowSecret(verdict.oid);
    assert.ok(secret?.startsWith("sk-"), "encrypted shadow secret is decrypted for policy");
    const metadata = await getApiKeyMetadata(secret);
    assert.equal(metadata?.id, identity.apiKeyId);
    assert.equal(verdict.label, "alice");
  });

  it("applies the shadow key group's model allow-list with storage encryption enabled", async () => {
    addGroupPermission(baseKeyGroupId, "smart", "allow");
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ sub: "model-limited", realmRoles: ["omniroute"] })
    );
    assert.equal(verdict.ok, true);
    if (!verdict.ok) return;
    const identity = getSsoIdentity(verdict.oid)!;
    const secret = getSsoShadowSecret(verdict.oid);
    assert.ok(secret);
    assert.equal((await getApiKeyMetadata(secret))?.id, identity.apiKeyId);
    assert.equal(checkKeyModelAccess(identity.apiKeyId, "smart").allowed, true);
    assert.equal(checkKeyModelAccess(identity.apiKeyId, "unknown-model").allowed, false);
    assert.equal(await isModelAllowedForKey(secret, "unknown-model"), false);
    const request = new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await mintToken({ sub: "model-limited", realmRoles: ["omniroute"] })}`,
        [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
        [AUTHZ_HEADER_AUTH_ID]: verdict.oid,
      },
    });
    const forbidden = await enforceApiKeyPolicy(request, "unknown-model");
    assert.equal(forbidden.rejection?.status, 403, "group restrictions must apply at route policy");
    const comboGate = createComboTargetKeyGate(forbidden, "combo-smart");
    assert.ok(comboGate, "OIDC group-only keys need a pre-dispatch combo gate");
    assert.equal(await comboGate("unknown-model"), false);
    assert.equal(await comboGate("smart"), true);
    assert.equal(
      await comboTargetPassesKeyModelPolicy({
        apiKey: secret,
        apiKeyInfo: { ...(await getApiKeyMetadata(secret)), id: identity.apiKeyId },
        requestedModelStr: "combo-smart",
        targetModelStr: "unknown-model",
        isModelAllowedForKey,
      }),
      false,
      "chat combo preflight must not treat group-only keys as unrestricted"
    );
  });

  it("maps the plus role to the plus group, and multiple roles to both", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ sub: "both", realmRoles: ["omniroute", "omniroute-plus"] })
    );
    assert.equal(verdict.ok, true);
    if (!verdict.ok) return;
    const identity = getSsoIdentity(verdict.oid)!;
    const groups = getKeyGroupsForApiKey(identity.apiKeyId).map((g) => g.id);
    assert.equal(groups.includes(baseKeyGroupId), true);
    assert.equal(groups.includes(plusKeyGroupId), true);
  });

  it("accepts client roles from resource_access", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({
        sub: "client-roles",
        clientRoles: { "claude-desktop": { roles: ["omniroute"] } as unknown as string[] },
      })
    );
    assert.equal(verdict.ok, true);
  });
});

describe("evaluateOidcInferenceAuth — fail closed", () => {
  it("denies a user whose roles map to nothing (403, not wide open)", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ sub: "norole", realmRoles: ["default-roles-main"] })
    );
    assert.equal(verdict.ok, false);
    if (verdict.ok) return;
    const f = verdict as { status: number; code: string };
    assert.equal(f.status, 403);
    assert.equal(f.code, "AUTH_OIDC_INFERENCE_NO_ROLE");
  });

  it("invalidates a cached success when the configured audience changes", async () => {
    await enableSso();
    const token = await mintToken({ sub: "audience-rotation", realmRoles: ["omniroute"] });
    assert.equal((await evaluateOidcInferenceAuth(token)).ok, true);
    await enableSso({ oidcInferenceAudience: "another-inference-audience" });
    try {
      const verdict = await evaluateOidcInferenceAuth(token);
      assert.equal(verdict.ok, false);
      if (!verdict.ok) assert.equal(verdict.status, 401);
    } finally {
      await enableSso();
    }
  });

  it("invalidates cached role authorization when the mapping changes", async () => {
    await enableSso();
    const token = await mintToken({ sub: "role-rotation", realmRoles: ["omniroute"] });
    assert.equal((await evaluateOidcInferenceAuth(token)).ok, true);
    await enableSso({
      oidcInferenceRoleMappings: [{ role: "different-role", keyGroupId: plusKeyGroupId }],
    });
    try {
      const verdict = await evaluateOidcInferenceAuth(token);
      assert.equal(verdict.ok, false);
      if (!verdict.ok) assert.equal(verdict.status, 403);
    } finally {
      await enableSso();
    }
  });

  it("returns unavailable when the JWKS endpoint fails without calling the token invalid", async () => {
    const token = await mintToken({ sub: "jwks-503", realmRoles: ["omniroute"] });
    // A distinct JWKS URL forces a network fetch rather than a prior test's
    // cached signing key; the issuer itself remains unchanged.
    const unavailableJwks = `${JWKS_URI}?unavailable=1`;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (url === DISCOVERY_URL) {
        return Response.json({ issuer: ISSUER, jwks_uri: unavailableJwks });
      }
      if (url === unavailableJwks) return new Response("unavailable", { status: 503 });
      throw new Error(`Unexpected fetch: ${url}`);
    }) as typeof fetch;
    try {
      const verdict = await evaluateOidcInferenceAuth(token);
      assert.equal(verdict.ok, false);
      if (!verdict.ok) {
        assert.equal(verdict.status, 503);
        assert.equal(verdict.code, "AUTH_OIDC_INFERENCE_UNAVAILABLE");
      }
    } finally {
      resetOidcDiscoveryCache();
      installFetchStub();
    }
  });

  it("reports ambiguous JWKS keys as unavailable rather than invalid credentials", async () => {
    const token = await mintToken({ sub: "duplicate-kid", realmRoles: ["omniroute"] });
    const duplicateJwks = `${JWKS_URI}?duplicate-kid=1`;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (url === DISCOVERY_URL) {
        return Response.json({ issuer: ISSUER, jwks_uri: duplicateJwks });
      }
      if (url === duplicateJwks) return Response.json({ keys: [jwksKeys[0], jwksKeys[0]] });
      throw new Error(`Unexpected fetch: ${url}`);
    }) as typeof fetch;
    try {
      const verdict = await evaluateOidcInferenceAuth(token);
      assert.equal(verdict.ok, false);
      if (!verdict.ok) {
        assert.equal(verdict.status, 503);
        assert.equal(verdict.code, "AUTH_OIDC_INFERENCE_UNAVAILABLE");
      }
    } finally {
      resetOidcDiscoveryCache();
      installFetchStub();
    }
  });

  it("rejects a wrong audience", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ audience: "api://other", realmRoles: ["omniroute"] })
    );
    assert.equal(verdict.ok, false);
    if (verdict.ok) return;
    const f = verdict as { status: number; code: string };
    assert.equal(f.status, 401);
  });

  it("rejects a signed token without an expiration claim", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ sub: "no-exp", realmRoles: ["omniroute"], omitExpiry: true })
    );
    assert.equal(verdict.ok, false);
    if (!verdict.ok) assert.equal(verdict.status, 401);
  });

  it("preserves an issuer whose canonical URL ends with a slash", async () => {
    await enableSso({ oidcInferenceIssuer: `${ISSUER}/` });
    try {
      const verdict = await evaluateOidcInferenceAuth(
        await mintToken({ issuer: `${ISSUER}/`, sub: "slash-issuer", realmRoles: ["omniroute"] })
      );
      assert.equal(verdict.ok, true);
    } finally {
      await enableSso();
    }
  });

  it("rejects a foreign issuer", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ issuer: "https://evil.example.com/realms/main", realmRoles: ["omniroute"] })
    );
    assert.equal(verdict.ok, false);
    if (verdict.ok) return;
    const f = verdict as { status: number; code: string };
    assert.equal(f.status, 401);
  });

  it("rejects a signature from an unknown key", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ signWithWrongKey: true, realmRoles: ["omniroute"] })
    );
    assert.equal(verdict.ok, false);
    if (verdict.ok) return;
    const f = verdict as { status: number; code: string };
    assert.equal(f.status, 401);
  });

  it("rejects an expired token", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ realmRoles: ["omniroute"], expiresAt: Math.floor(Date.now() / 1000) - 100 })
    );
    assert.equal(verdict.ok, false);
    if (verdict.ok) return;
    const f = verdict as { status: number; code: string };
    assert.equal(f.code, "AUTH_OIDC_INFERENCE_EXPIRED");
  });

  it("refuses to run when disabled or half-configured", async () => {
    await updateSettings({ oidcInferenceEnabled: false });
    await invalidateDbCache();
    const disabled = await evaluateOidcInferenceAuth(
      await mintToken({ realmRoles: ["omniroute"] })
    );
    assert.equal(disabled.ok, false);

    await enableSso({ oidcInferenceAudience: "" });
    const halfConfigured = await evaluateOidcInferenceAuth(
      await mintToken({ realmRoles: ["omniroute"] })
    );
    assert.equal(halfConfigured.ok, false);
    if (halfConfigured.ok) return;
    const hf = halfConfigured as { status: number; code: string };
    assert.equal(hf.code, "AUTH_OIDC_INFERENCE_INCOMPLETE");

    await enableSso();
  });
});

describe("OIDC group binding — fail closed", () => {
  it("rejects the last-group deletion on cache hit and at the downstream policy boundary", async () => {
    await enableSso();
    const token = await mintToken({ sub: "deleted-group", realmRoles: ["omniroute"] });
    const first = await evaluateOidcInferenceAuth(token);
    assert.equal(first.ok, true);
    if (!first.ok) return;
    const identity = getSsoIdentity(first.oid)!;
    assert.equal(removeKeyFromGroup(identity.apiKeyId, baseKeyGroupId), true);
    assert.equal(hasOidcGroupBinding(first.oid), false);
    assert.equal(getSsoShadowSecret(first.oid), null);
    const replay = await evaluateOidcInferenceAuth(token);
    assert.equal(replay.ok, false);
    const policy = await enforceApiKeyPolicy(
      new Request("http://localhost/v1/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
          [AUTHZ_HEADER_AUTH_KIND]: "sso_user",
          [AUTHZ_HEADER_AUTH_ID]: first.oid,
        },
      }),
      "premium"
    );
    assert.equal(policy.rejection?.status, 403);
  });

  it("rejects a deleted bound group even after the identity was authenticated", async () => {
    const disposableGroup = createKeyGroup("OIDC disposable", "deleted binding").id;
    await enableSso({
      oidcInferenceRoleMappings: [{ role: "disposable", keyGroupId: disposableGroup }],
    });
    const token = await mintToken({ sub: "deleted-bound-group", realmRoles: ["disposable"] });
    const first = await evaluateOidcInferenceAuth(token);
    assert.equal(first.ok, true);
    if (!first.ok) return;
    assert.equal(deleteKeyGroup(disposableGroup), true);
    assert.equal(getSsoShadowSecret(first.oid), null);
    const policy = await enforceApiKeyPolicy(
      new Request("http://localhost/v1/messages", {
        headers: { [AUTHZ_HEADER_AUTH_KIND]: "sso_user", [AUTHZ_HEADER_AUTH_ID]: first.oid },
      }),
      "premium"
    );
    assert.equal(policy.rejection?.status, 403);
    await enableSso();
  });

  it("rejects different group-scoped tokens for one subject without rewriting the shared key", async () => {
    await enableSso();
    const baseToken = await mintToken({ sub: "different-roles", realmRoles: ["omniroute"] });
    const plusToken = await mintToken({ sub: "different-roles", realmRoles: ["omniroute-plus"] });
    const base = await evaluateOidcInferenceAuth(baseToken);
    assert.equal(base.ok, true);
    if (!base.ok) return;
    const identity = getSsoIdentity(base.oid)!;
    const plus = await evaluateOidcInferenceAuth(plusToken);
    assert.equal(plus.ok, false);
    if (!plus.ok) {
      assert.equal(plus.status, 403);
      assert.equal(plus.code, "AUTH_OIDC_INFERENCE_GROUP_BINDING_CHANGED");
    }
    assert.deepEqual(
      getKeyGroupsForApiKey(identity.apiKeyId).map((group) => group.id),
      [baseKeyGroupId]
    );
    assert.equal((await evaluateOidcInferenceAuth(baseToken)).ok, true);
  });

  it("rejects any unexpected extra membership even when one expected group remains", async () => {
    await enableSso();
    const token = await mintToken({ sub: "extra-membership", realmRoles: ["omniroute"] });
    const first = await evaluateOidcInferenceAuth(token);
    assert.equal(first.ok, true);
    if (!first.ok) return;
    const identity = getSsoIdentity(first.oid)!;
    assert.equal(addKeyToGroup(identity.apiKeyId, plusKeyGroupId), true);
    assert.equal((await evaluateOidcInferenceAuth(token)).ok, false);
    const policy = await enforceApiKeyPolicy(
      new Request("http://localhost/v1/messages", {
        headers: { [AUTHZ_HEADER_AUTH_KIND]: "sso_user", [AUTHZ_HEADER_AUTH_ID]: first.oid },
      }),
      "premium"
    );
    assert.equal(policy.rejection?.status, 403);
  });
});

describe("identity key", () => {
  it("is distinct per issuer and stable per subject", () => {
    const a = oidcInferenceIdentityKey(ISSUER, "user-1");
    const b = oidcInferenceIdentityKey("https://other.example.com/realms/x", "user-1");
    assert.notEqual(a, b);
    assert.equal(a, oidcInferenceIdentityKey(ISSUER, "user-1"));
  });
});
